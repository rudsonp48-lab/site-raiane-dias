# Site da Raiane Dias · Nail Designer

Site (link da bio) feito para celular, com um **painel em `/admin`** para mudar valores, fotos, WhatsApp e Instagram sem mexer em código.

## Como funciona
- O site (`/`) abre com os valores e fotos padrão do `config.js` e, em seguida, busca o que foi salvo no painel (`/api/content`).
- O painel (`/admin`) pede senha, mostra uma prévia do site no formato de celular e salva em **Vercel Blob** (armazenamento do próprio Vercel).
- Quando você clica em **Salvar e publicar**, o site já passa a mostrar as mudanças. Não precisa publicar de novo.

## Publicar (uma vez só)
1. Suba esta pasta para um repositório no GitHub.
2. No Vercel: **Add New → Project → Import** do repositório. Framework: **Other**. Sem build command.
3. No projeto do Vercel, abra **Storage**, crie um **Blob** e conecte ao projeto. Isso cria sozinho a variável `BLOB_READ_WRITE_TOKEN`.
4. Em **Settings → Environment Variables**, crie `ADMIN_PASSWORD` com a senha que você quiser para o painel.
5. Faça um **Redeploy** (para o Vercel enxergar as novas variáveis).
6. Abra `https://SEU-SITE.vercel.app/admin`, entre com a senha e pronto.
7. O endereço público é `https://site-raiane-dias.vercel.app` (já aplicado em `index.html`).

## Observações
- Guarde a senha do painel. Se esquecer, é só trocar `ADMIN_PASSWORD` no Vercel e fazer redeploy.
- Fotos antigas trocadas pelo painel continuam guardadas no Blob (ocupam pouco espaço).
- Sem o Blob conectado, o site continua funcionando normalmente com os valores e fotos do `config.js`.

## Estrutura
- `index.html` — o site · `config.js` — valores e fotos padrão
- `admin/index.html` — painel
- `api/` — `content` (lê), `login`, `save`, `upload` (exigem senha)
- `lib/` — autenticação e validação
