/* =====================================================
   CONFIGURAÇÃO DO SITE — é aqui que você muda valores,
   WhatsApp, Instagram e endereço. Não precisa mexer
   no resto do código.
   ===================================================== */
/* Obs.: depois de ligar o painel /admin, o que você salvar lá vale mais do que este arquivo. */
window.SITE = {
  links: {
    whatsapp: "5561981155167",   // números com DDI+DDD, ex.: "5561999999999"
    instagram: "raidias.naildesigner"   // usuário sem @
  },
  photos: {   // fotos padrão (o painel /admin pode trocar por outras)
    hero: "/assets/img/hero.webp", about: "/assets/img/about.webp", cta: "/assets/img/cta.webp",
    svc1: "/assets/img/svc1.webp", svc2: "/assets/img/svc2.webp", svc3: "/assets/img/svc3.webp", svc4: "/assets/img/svc4.webp",
    aboutNails: "/assets/img/aboutNails.webp", pricesHeader: "/assets/img/pricesHeader.webp"
  },
  endereco: "Studio Raiane Dias, QN 204 Sl 104 - Samambaia, Brasília - DF, 72316-072",
  precos: {
    esq: { t: "Serviços", r: [
      ["Blindagem + esmaltação em gel", 75],
      ["Banho de gel", 100],
      ["Banho de gel + nail art", 120],
      ["Alongamento tradicional", 140],
      ["Alongamento + nail art", 160],
      ["Alongamento extremo", 200],
      ["Alon. extremo + nail art", 230]
    ]},
    dir: { t: "Remoção, reposição e manutenção", r: [
      ["Remoção de alongamento", 50],
      ["Reposição de unha", 20],
      ["Manutenção", 120],
      ["Manutenção", 110],
      ["Manutenção", 130],
      ["Manutenção", 170],
      ["Manutenção", 200]
    ]}
  }
};
