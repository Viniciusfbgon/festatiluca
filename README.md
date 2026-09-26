# Tyga & Lucca — o convite

Landing page em React 18 + Vite, JavaScript, CSS Modules, Framer Motion e canvas-confetti. Uma página, sem router, com as três fotos originais e layout adaptado para celular.

## Rodar localmente

Instale Node.js 22.12+ (ou 24 LTS), depois:

```bash
npm install
npm run dev
```

No PowerShell, se a execução de `npm.ps1` estiver bloqueada, use `npm.cmd install` e `npm.cmd run dev`.

```bash
npm test        # agenda, fuso horário, WhatsApp e acessibilidade do modal
npm run build  # gera dist/
npm run preview
```

## Editar a festa

Todas as informações estão em **`src/config.js`**: nomes, data, início e término, horário, dress code, local, endereço, mapa, telefone, textos e URL pública. Title, descrição e Open Graph são preenchidos a partir dessa configuração durante o build.

- O evento começa em **26/09/2026 às 20h** e termina em **27/09/2026 às 3h**, no fuso de Brasília (`-03:00`).
- O local é **Tizé Bar e Butequim**, com o botão **Abrir no mapa** conectado ao Google Maps. Edite `venue`, `address` e `mapsUrl` para atualizar essas informações.
- Confirmações são direcionadas a **+55 (31) 97574-6400**. `whatsappNumber` recebe país + DDD + número, somente dígitos.
- O convidado precisa enviar a mensagem no WhatsApp para concluir a confirmação. O site não coleta nem armazena nomes; não há backend.
- O dress code sugerido é **Do seu jeito**; altere no arquivo se preferir.
- O estado revelado é salvo apenas neste navegador. Para testar o primeiro acesso, limpe os dados do site ou use uma janela anônima. O local escondido é uma interação visual; o código de um site estático é público.

## Fotos

As imagens usam `import.meta.env.BASE_URL`, compatível com `/festatiluca/`:

| Arquivo                   | Imagem                                                |
| ------------------------- | ----------------------------------------------------- |
| `public/images/hero.jpg`  | Primeira foto: Tyga e Lucca na balada com luzes azuis |
| `public/images/foto2.jpg` | Retrato com parede clara e janela                     |
| `public/images/foto3.jpg` | Foto no jardim com flores e céu azul                  |

A foto do hero tem prioridade de carregamento; as outras usam lazy loading. As fontes são hospedadas junto ao site, sem chamadas ao Google Fonts. O confete só é carregado no primeiro clique. Como melhoria futura, converta as fotos para WebP/AVIF e use `<picture>` mantendo JPG como fallback e para Open Graph.

## Publicar no GitHub Pages

1. Crie um repositório chamado `festatiluca` no GitHub (neste projeto: `Viniciusfbgon/festatiluca`).
2. Em **Settings → Pages → Build and deployment → Source**, selecione **GitHub Actions**.
3. Se estiver começando de uma pasta sem Git:

   ```bash
   git init -b main
   git remote add origin git@github.com:Viniciusfbgon/festatiluca.git
   ```

4. Envie os arquivos:

   ```bash
   git add .
   git commit -m "Create Tyga and Lucca invitation"
   git push -u origin main
   ```

5. Aguarde **Actions → Publicar convite no GitHub Pages** terminar.
6. Acesse **https://viniciusfbgon.github.io/festatiluca/**.

O workflow `.github/workflows/deploy.yml` roda a cada push em `main` (ou manualmente), executa `npm ci`, testes, `npm run build`, envia `dist` com `actions/upload-pages-artifact` e publica com `actions/deploy-pages`. Commit o `package-lock.json` junto do projeto.

Se mudar o nome do repositório, atualize `base` em `vite.config.js` e `siteUrl` em `src/config.js`. O `og:image` usa uma URL absoluta para a foto do hero. O WhatsApp pode manter em cache a primeira prévia compartilhada.

## Acessibilidade e validação

Modal com `aria-modal`, título, fundo inerte, foco preso, restauração de foco, Escape e fechamento por clique fora. Formulário com rótulos e radios nativos. Foco visível e link para pular ao conteúdo. Com `prefers-reduced-motion`, o convite mantém fades e desliga zoom, movimento magnético, transições de deslocamento e confetes.

Auditoria Lighthouse mobile realizada no build de produção local em 26/09/2026: **91 em desempenho, 100 em acessibilidade, 100 em boas práticas e 100 em SEO**, com CLS 0. Os 9 testes automatizados cobrem agenda, WhatsApp, teclado do modal e persistência, inclusive quando o localStorage está bloqueado. A foto final só começa a carregar perto da seção, evitando disputar banda com o hero.

Para repetir a auditoria, inicie `npm run preview` e execute `npx lighthouse http://127.0.0.1:4173/festatiluca/` (Chrome instalado; para Edge, configure a variável `CHROME_PATH` com o executável). A pontuação depende do dispositivo, da rede e do ambiente de hospedagem; o resultado local não garante a mesma nota em toda medição.

Referências de deploy: [Vite — GitHub Pages](https://vite.dev/guide/static-deploy#github-pages) e [GitHub — custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
