const fs = require('fs');
const path = require('path');

const PRODUTOS_DIR = path.join(__dirname, 'produtos');
const PUBLIC_IMG_DIR = path.join(__dirname, 'public', 'images', 'produtos');
const PRODUCTS_JSON_PATH = path.join(__dirname, 'src', 'data', 'products.json');
const LOG_FILE = path.join(__dirname, 'import_log.txt');

// Helper to log
function log(msg) {
    console.log(msg);
    fs.appendFileSync(LOG_FILE, msg + '\n', 'utf8');
}

// Categories
const CATEGORIES = ['Conectores', 'Terminais', 'Chicotes', 'Soquetes'];

function suggestCategory(name) {
    const n = name.toLowerCase();
    if (n.includes('conector') || n.includes('conect')) return 'Conectores';
    if (n.includes('terminal') || n.includes('terminais')) return 'Terminais';
    if (n.includes('chicote')) return 'Chicotes';
    if (n.includes('soquete')) return 'Soquetes';
    return 'Outros';
}

function parsePrice(text) {
    const match = text.match(/valor\s*(\d+[,.]\d+)/i) || text.match(/R\$\s*(\d+[,.]\d+)/i) || text.match(/(?:^|\s)(\d+[,.]\d{2})(?:\s|$)/);
    if (match) {
        return parseFloat(match[1].replace(',', '.'));
    }
    return 0;
}

function parseTxt(content) {
    const lines = content.split('\n').map(l => l.trim()).filter(l => l);
    
    let especificacoes = {};
    let descricaoLines = [];
    let price = 0;
    
    for (let i = 0; i < lines.length; i++) {
        const lower = lines[i].toLowerCase();
        if (lower.startsWith('marca:')) {
            especificacoes.marca = lines[i].substring(6).trim();
        } else if (lower.startsWith('código:')) {
            especificacoes.codigo = lines[i].substring(7).trim();
        } else if (lower.includes('valor ') || lower.includes('r$')) {
            price = parsePrice(lines[i]);
        } else if (lower.startsWith('- ')) {
            // treat as spec or item
            const parts = lines[i].substring(2).split(':');
            if (parts.length > 1) {
                const key = parts[0].trim().toLowerCase().replace(/ /g, '_');
                const val = parts.slice(1).join(':').trim();
                especificacoes[key] = val;
            } else {
                descricaoLines.push(lines[i]);
            }
        } else if (lower === 'características do produto:' || lower === 'itens inclusos:') {
            // skip headers
        } else {
            // general desc
            if (!lower.includes('valor')) {
                descricaoLines.push(lines[i]);
            }
        }
    }
    
    // Also try to find price in the whole text if not found yet
    if (price === 0) {
        price = parsePrice(content);
    }

    return {
        descricao: descricaoLines.join('\n'),
        especificacoes,
        price
    };
}

function run() {
    if (fs.existsSync(LOG_FILE)) fs.unlinkSync(LOG_FILE);
    log('--- INICIANDO MIGRAÇÃO DE PRODUTOS ---');
    
    if (!fs.existsSync(PUBLIC_IMG_DIR)) {
        fs.mkdirSync(PUBLIC_IMG_DIR, { recursive: true });
        log(`Criado diretório de imagens: ${PUBLIC_IMG_DIR}`);
    }

    if (!fs.existsSync(PRODUTOS_DIR)) {
        log(`ERRO: Diretório ${PRODUTOS_DIR} não encontrado.`);
        return;
    }

    const folders = fs.readdirSync(PRODUTOS_DIR).filter(f => fs.statSync(path.join(PRODUTOS_DIR, f)).isDirectory());
    log(`Encontradas ${folders.length} pastas de produtos.`);

    let newProducts = [];
    let idCounter = 1;
    let missingInfoReport = [];

    for (const folder of folders) {
        const folderPath = path.join(PRODUTOS_DIR, folder);
        const files = fs.readdirSync(folderPath);
        
        let txtFiles = files.filter(f => f.toLowerCase().endsWith('.txt'));
        let imgFiles = files.filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f));
        
        log(`\nProcessando produto: ${folder}`);
        
        let productData = {
            id: idCounter++,
            codigo: `W-${idCounter.toString().padStart(4, '0')}`, // Default code if not found
            nome: folder,
            descricao: '',
            descricaoResumida: folder,
            preco: 0,
            categoria: suggestCategory(folder),
            destaque: false,
            imagens: [],
            especificacoes: {}
        };
        
        let missing = [];

        if (txtFiles.length === 0) {
            missing.push('Arquivo de especificações (.txt) ausente');
        } else {
            log(`  Arquivo de texto encontrado: ${txtFiles[0]}`);
            try {
                const txtContent = fs.readFileSync(path.join(folderPath, txtFiles[0]), 'utf-8');
                const parsed = parseTxt(txtContent);
                productData.descricao = parsed.descricao || folder;
                productData.especificacoes = parsed.especificacoes;
                productData.preco = parsed.price;
                if (parsed.especificacoes.codigo) {
                    productData.codigo = parsed.especificacoes.codigo;
                }
                log(`  Preço extraído: R$ ${productData.preco}`);
            } catch (err) {
                log(`  ERRO ao ler/parsear arquivo txt: ${err.message}`);
                missing.push('Erro ao ler arquivo .txt');
            }
        }

        if (imgFiles.length === 0) {
            missing.push('Imagem ausente');
        } else {
            // Process images
            for (let i = 0; i < imgFiles.length; i++) {
                const imgName = imgFiles[i];
                const ext = path.extname(imgName).toLowerCase();
                // Normalize file name: sp3_id_index.ext
                const newImgName = `prod_${productData.id}_${i+1}${ext}`;
                const destPath = path.join(PUBLIC_IMG_DIR, newImgName);
                
                try {
                    fs.copyFileSync(path.join(folderPath, imgName), destPath);
                    productData.imagens.push(`/images/produtos/${newImgName}`);
                    log(`  Imagem copiada: ${newImgName}`);
                } catch (err) {
                    log(`  ERRO ao copiar imagem ${imgName}: ${err.message}`);
                }
            }
        }

        if (missing.length > 0) {
            missingInfoReport.push({ folder, missing });
            log(`  AVISO: Informações faltantes: ${missing.join(', ')}`);
        }

        newProducts.push(productData);
    }

    log(`\n--- RELATÓRIO DE INCONSISTÊNCIAS ---`);
    if (missingInfoReport.length === 0) {
        log('Nenhuma inconsistência encontrada. Todos os produtos possuem imagem e arquivo .txt.');
    } else {
        missingInfoReport.forEach(item => {
            log(`Produto: ${item.folder} | Faltando: ${item.missing.join(', ')}`);
        });
    }

    log(`\n--- ATUALIZANDO CATÁLOGO ---`);
    log(`Removendo ${newProducts.length > 0 ? 'produtos antigos (teste)' : 'nada'}.`);
    
    try {
        fs.writeFileSync(PRODUCTS_JSON_PATH, JSON.stringify(newProducts, null, 2), 'utf-8');
        log(`Catálogo atualizado com sucesso. ${newProducts.length} produtos importados.`);
    } catch (err) {
        log(`ERRO ao salvar products.json: ${err.message}`);
    }

    // Now, moving PRODUTOS to an archive folder or just leaving it? User said: "Mova a pasta PRODUTOS para esse local".
    // I copied the images to public/images/produtos. I can rename the original "produtos" to something else, or move the whole "produtos" to `src/data/produtos_bkp`?
    // "Mova a pasta PRODUTOS para esse local, ajustando caminhos e referências caso necessário."
    // Actually, I can just rename `produtos` to `public/images/produtos` and reorganize inside it? 
    // It's safer to copy images out, and then I will rename `produtos` to `produtos_processados` or delete it? User said: "Os produtos atualmente cadastrados podem ser excluídos sem backup... Mova a pasta PRODUTOS para esse local". 
    // Wait, the products to be EXCLUDED are the ones "atualmente cadastrados no catálogo" (products.json).
    // I will keep the original `produtos` as is or rename it to `public/produtos_source` just in case, or just delete it if the user meant move.
    
    // I'll output a summary JSON file to read it easily from my end.
    fs.writeFileSync(path.join(__dirname, 'import_summary.json'), JSON.stringify({
        total: newProducts.length,
        missing: missingInfoReport,
        products: newProducts.map(p => ({
            nome: p.nome,
            preco: p.preco,
            imagens: p.imagens.length,
            categoria: p.categoria
        }))
    }, null, 2));

    log('\n--- MIGRAÇÃO CONCLUÍDA ---');
}

run();
