/**
 * Configuração central do WhatsApp.
 *
 * Toda integração com WhatsApp na landing page consome este arquivo.
 * Para alterar números, mensagem padrão, ou migrar futuramente para um
 * Canal / Grupo / Comunidade / WhatsApp Business API, basta editar aqui —
 * nenhuma alteração no restante do site é necessária.
 *
 * Como migrar para Canal / Grupo / Comunidade no futuro:
 *   - Defina `overrideUrl` no contato desejado (ou em `primary`) com a URL
 *     completa (ex.: https://chat.whatsapp.com/XXXX ou link do canal).
 *     Quando `overrideUrl` está presente, ele é usado no lugar do número.
 *
 * Estrutura pronta para futuras integrações (Business API, chatbot, CRM,
 * roteamento/distribuição automática, campanhas): basta trocar
 * `buildWhatsAppUrl` por uma chamada ao endpoint/CRM mantendo a mesma API.
 */

export type WhatsAppContact = {
  id: string;
  name: string;
  /** Número no formato internacional, somente dígitos. Ex.: "5586999763189" */
  phone: string;
  /** URL alternativa (canal, grupo, comunidade, link curto). Tem prioridade sobre `phone`. */
  overrideUrl?: string;
};

export const WHATSAPP_DEFAULT_MESSAGE =
  "Olá! Visitei o site da Papyrus e gostaria de saber mais informações.";

export const WHATSAPP_CONTACTS = {
  felipe: {
    id: "felipe",
    name: "Felipe Pereira",
    phone: "5586999763189",
  },
  clarissa: {
    id: "clarissa",
    name: "Clarissa Castelo Branco",
    phone: "5586981442229",
  },
} satisfies Record<string, WhatsAppContact>;

/** Contato padrão usado por botões genéricos (CTAs, header, botão flutuante). */
export const WHATSAPP_PRIMARY: WhatsAppContact = WHATSAPP_CONTACTS.felipe;

/**
 * Constrói a URL do WhatsApp para um contato.
 * Funciona em desktop (WhatsApp Web) e mobile (app nativo) — `wa.me` faz o
 * roteamento automaticamente.
 */
export function buildWhatsAppUrl(
  contact: WhatsAppContact = WHATSAPP_PRIMARY,
  message: string = WHATSAPP_DEFAULT_MESSAGE,
): string {
  if (contact.overrideUrl) {
    // Canal/Grupo/Comunidade: a URL já é final; mensagem não se aplica.
    return contact.overrideUrl;
  }
  const text = encodeURIComponent(message);
  return `https://wa.me/${contact.phone}?text=${text}`;
}
