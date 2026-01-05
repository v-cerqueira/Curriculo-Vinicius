# Currículo — Vinícius Cerqueira

**Currículo e portfólio** de Vinícius Cerqueira — projetos, tecnologias e instruções para rodar localmente.

---

## Sobre
Sou desenvolvedor focado em aplicações web modernas — este repositório contém o código do meu portfólio pessoal e currículo online. Aqui você encontra o site construído com ferramentas modernas para demonstrar projetos, habilidades e formas de contato.

## Destaques
- Tecnologias principais: **React**, **TypeScript**, **Vite**, **Tailwind CSS**, **Node/Express**. 🔧
- Arquitetura: SPA com rotas simples, componentes reutilizáveis e foco em performance.
- Conteúdo: páginas de apresentação, seções de projetos, habilidades e contato.

## Como executar (desenvolvimento)
1. Instale dependências (recomendo `pnpm`):

```bash
# usando pnpm (recomendado)
pnpm install
pnpm dev

# ou com npx se não tiver pnpm global
npx pnpm@latest install
npx -y vite --host
```

2. Abra http://localhost:3000/ no navegador.

## Build para produção
```bash
pnpm build
pnpm start
```

> Observação: se `pnpm` não estiver disponível, você pode instalar via `npm i -g pnpm` ou usar `npx` como mostrado acima.

## Deploy
Recomendo utilizar **Vercel** ou **Netlify** para deploy automático a partir do branch `main`. O projeto já contém configuração simples de build (`vite build`) e `dist` para publicação.

## Contato
- **Nome:** Vinícius Cerqueira
- **Email:** vcerqueiraads@gmail.com

## Licença
Este repositório está licenciado como **MIT**. Veja `package.json` para detalhes.

---

Se quiser, posso:
- adicionar badges (build / license),
- criar um `README` com seções mais completas (experiência, certificações, links para projetos),
- configurar deploy automático no Vercel.

Me diga qual próximo passo prefere. 🚀