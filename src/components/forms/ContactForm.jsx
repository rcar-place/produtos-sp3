// ============================================
// SP3 CONECTORES — ContactForm Component
// ============================================

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, User, Building2, Phone, Mail, MessageSquare } from 'lucide-react';
import Button from '../ui/Button';
import { openWhatsAppContactForm } from '../../services/whatsapp';
import './ContactForm.css';

// Validation Schema
const contactSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  empresa: z.string().optional(),
  telefone: z.string().min(10, 'Telefone inválido').max(15, 'Telefone inválido'),
  email: z.string().email('E-mail inválido'),
  mensagem: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
});

/**
 * Contact form with validation
 */
export default function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nome: '',
      empresa: '',
      telefone: '',
      email: '',
      mensagem: '',
    },
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      
      // Formata os dados e abre a nova aba com o WhatsApp
      openWhatsAppContactForm(data);
      
      setSubmitStatus('success');
      reset();
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      className="contact-form"
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      id="contact-form"
    >
      <div className="contact-form__grid">
        {/* Nome */}
        <div className={`contact-form__field ${errors.nome ? 'contact-form__field--error' : ''}`}>
          <label className="contact-form__label" htmlFor="contact-nome">
            <User size={16} />
            Nome *
          </label>
          <input
            id="contact-nome"
            type="text"
            className="contact-form__input"
            placeholder="Seu nome completo"
            {...register('nome')}
          />
          {errors.nome && (
            <span className="contact-form__error">{errors.nome.message}</span>
          )}
        </div>

        {/* Empresa */}
        <div className="contact-form__field">
          <label className="contact-form__label" htmlFor="contact-empresa">
            <Building2 size={16} />
            Empresa
          </label>
          <input
            id="contact-empresa"
            type="text"
            className="contact-form__input"
            placeholder="Nome da empresa"
            {...register('empresa')}
          />
        </div>

        {/* Telefone */}
        <div className={`contact-form__field ${errors.telefone ? 'contact-form__field--error' : ''}`}>
          <label className="contact-form__label" htmlFor="contact-telefone">
            <Phone size={16} />
            Telefone *
          </label>
          <input
            id="contact-telefone"
            type="tel"
            className="contact-form__input"
            placeholder="(11) 99999-9999"
            {...register('telefone')}
          />
          {errors.telefone && (
            <span className="contact-form__error">{errors.telefone.message}</span>
          )}
        </div>

        {/* Email */}
        <div className={`contact-form__field ${errors.email ? 'contact-form__field--error' : ''}`}>
          <label className="contact-form__label" htmlFor="contact-email">
            <Mail size={16} />
            E-mail *
          </label>
          <input
            id="contact-email"
            type="email"
            className="contact-form__input"
            placeholder="seu@email.com"
            {...register('email')}
          />
          {errors.email && (
            <span className="contact-form__error">{errors.email.message}</span>
          )}
        </div>
      </div>

      {/* Mensagem */}
      <div className={`contact-form__field ${errors.mensagem ? 'contact-form__field--error' : ''}`}>
        <label className="contact-form__label" htmlFor="contact-mensagem">
          <MessageSquare size={16} />
          Mensagem *
        </label>
        <textarea
          id="contact-mensagem"
          className="contact-form__textarea"
          placeholder="Descreva sua necessidade..."
          rows={5}
          {...register('mensagem')}
        />
        {errors.mensagem && (
          <span className="contact-form__error">{errors.mensagem.message}</span>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        icon={<Send size={18} />}
        loading={isSubmitting}
        fullWidth
      >
        Enviar Mensagem
      </Button>

      {/* Status Messages */}
      <AnimatePresence>
        {submitStatus && (
          <motion.div
            className={`contact-form__status contact-form__status--${submitStatus}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {submitStatus === 'success' ? (
              <>
                <CheckCircle size={20} />
                <span>Mensagem enviada com sucesso! Entraremos em contato em breve.</span>
              </>
            ) : (
              <>
                <AlertCircle size={20} />
                <span>Erro ao enviar mensagem. Tente novamente.</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
}
