# Agent Sites

Landing page comercial da **Agent Sites**, uma solução da **Agent-AI** para pequenos negócios terem presença digital profissional por assinatura.

## Proposta

**Seu negócio online por assinatura.**

O site apresenta o plano principal de **R$ 99/mês**, incluindo site responsivo, hospedagem, domínio, integração com WhatsApp, manutenção, suporte e estrutura básica para Google.

## Recursos

- Landing page responsiva e mobile-first
- Identidade visual azul, cinza e branca
- Demonstração visual de site no hero
- Comparativo “sem site” e “com Agent Sites”
- Processo comercial em quatro etapas
- Simulador interativo de três perguntas
- Recomendação personalizada por tipo de negócio
- Mensagem de orçamento gerada automaticamente
- CTA para campanha de portfólio
- FAQ em acordeão
- Menu mobile e animações de entrada
- Sem backend e sem dependências de build

## Estrutura

```text
agentsite/
├── index.html
├── styles.css
├── script.js
└── README.md
```

## Rodar localmente

Abra `index.html` diretamente no navegador ou use um servidor estático:

```bash
python -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## Configurar o WhatsApp

No início de `script.js`, substitua o número de exemplo:

```js
const CONFIG = {
  whatsappNumber: "5545999999999",
};
```

Use apenas números no formato `DDI + DDD + número`. Exemplo brasileiro: `5545999999999`.

Enquanto o número continuar como exemplo, os botões abrem o compartilhamento do WhatsApp com a mensagem pronta, sem destinatário fixo.

## Publicar no GitHub Pages

1. Abra **Settings** no repositório.
2. Entre em **Pages**.
3. Em **Build and deployment**, selecione **Deploy from a branch**.
4. Escolha a branch `main` e a pasta `/ (root)`.
5. Salve.

## Personalização rápida

- Textos e seções: `index.html`
- Cores, tipografia e responsividade: `styles.css`
- WhatsApp, simulador e interações: `script.js`

---

Agent Sites. Uma solução Agent-AI.