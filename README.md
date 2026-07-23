# Proposta Express — Landing page

Landing page responsiva em React + TypeScript, com seleção de planos e cadastro de teste integrado ao WhatsApp.

## Rodar localmente

```bash
npm install
npm run dev
```

## Configurar o WhatsApp corporativo

1. Duplique o arquivo `.env.example` com o nome `.env`.
2. Informe o número com DDI e DDD, usando somente dígitos:

```env
VITE_WHATSAPP_NUMBER=5511999999999
```

Ao enviar o cadastro, a página abre uma conversa com uma mensagem contendo plano, nome, telefone, e-mail e CPF/CNPJ. Sem um número configurado, o WhatsApp abre o seletor de contato com a mensagem pronta.

## Produção

```bash
npm run build
npm run preview
```

Os planos e preços ficam no array `plans` em `src/App.tsx`.
