// ============================================
// SP3 CONECTORES — ProductSpecs Component
// ============================================

import { memo } from 'react';
import { motion } from 'framer-motion';
import './ProductSpecs.css';

/**
 * Product specifications table
 * @param {Object} props
 * @param {Object} props.specs - Key-value pairs of specifications
 */
function ProductSpecs({ specs = {} }) {
  const specLabels = {
    marca: 'Marca',
    codigo: 'Código',
    conector: 'Conector',
    terminais: 'Terminais',
    material: 'Material',
    cor: 'Cor',
    vias: 'Vias',
    aplicacao: 'Aplicação',
    tensao: 'Tensão',
    corrente_maxima: 'Corrente Máxima',
    tamanho: 'Tamanho',
    secao_fio: 'Seção do Fio',
    quantidade: 'Quantidade',
    comprimento: 'Comprimento',
    garantia: 'Garantia',
    tipo_lampada: 'Tipo de Lâmpada',
    temperatura_max: 'Temperatura Máx.',
    comprimento_fio: 'Comprimento do Fio',
    protecao: 'Proteção',
    tipos: 'Tipos Incluídos',
    embalagem: 'Embalagem',
    vedacao: 'Vedação',
  };

  const entries = Object.entries(specs);

  if (entries.length === 0) return null;

  return (
    <motion.div
      className="product-specs"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <h3 className="product-specs__title">Especificações Técnicas</h3>
      <div className="product-specs__table">
        {entries.map(([key, value], index) => (
          <div
            key={key}
            className={`product-specs__row ${index % 2 === 0 ? 'product-specs__row--even' : ''}`}
          >
            <span className="product-specs__label">
              {specLabels[key] || key}
            </span>
            <span className="product-specs__value">{value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default memo(ProductSpecs);
