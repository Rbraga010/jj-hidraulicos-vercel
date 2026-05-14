// Generator de Portfolio PDF — J&J Bombas e Equipamentos Hidráulicos
// Estilo: moderno, escuro, industrial, sofisticado

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// ════════ BRANDING ════════
const COLORS = {
  navy:   '#0a1929',   // fundo principal
  navyL:  '#142a44',   // navy lighter
  navyM:  '#0e2238',   // navy medium
  steel:  '#2c5f7c',   // azul aço
  steelL: '#3a7ca5',   // azul aço claro
  red:    '#c0392b',   // vermelho J&J
  redL:   '#e74c3c',   // vermelho claro (accent)
  white:  '#ffffff',
  silver: '#a5b4c4',   // texto secundário
  gray:   '#6b7c8e',   // texto terciário
  line:   '#1e3553',   // bordas/divisores
};

const PUB = path.join(__dirname, '..', 'public');
const SVC = path.join(PUB, 'services');
const OUT = path.join(PUB, 'portfolio-jj-hidraulicos.pdf');

// Página A4
const PW = 595.28;
const PH = 841.89;
const MX = 42; // margem horizontal

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 0, bottom: 0, left: 0, right: 0 },
  info: {
    Title: 'Portfólio — J&J Bombas e Equipamentos Hidráulicos',
    Author: 'J&J Hidráulicos',
    Subject: 'Portfólio Empresarial — Serviços e Soluções Hidráulicas',
    Keywords: 'hidráulica, bombas, manutenção, J&J',
  },
});

doc.pipe(fs.createWriteStream(OUT));

// ════════ HELPERS ════════
function bgNavy() {
  doc.rect(0, 0, PW, PH).fill(COLORS.navy);
}

function accentLine(x, y, w, h = 3) {
  doc.rect(x, y, w, h).fill(COLORS.red);
}

function softGlow(cx, cy, r, color = COLORS.steel, alpha = 0.08) {
  doc.save();
  doc.opacity(alpha);
  doc.circle(cx, cy, r).fill(color);
  doc.restore();
}

function pageFooter(pageNum, total) {
  const y = PH - 32;
  doc.save();
  doc.fontSize(8).fillColor(COLORS.gray).font('Helvetica');
  doc.text('J&J HIDRÁULICOS  ·  PORTFÓLIO 2026', MX, y, { width: PW - MX * 2, align: 'left' });
  doc.text(`${pageNum} / ${total}`, MX, y, { width: PW - MX * 2, align: 'right' });
  doc.restore();
}

function sectionLabel(text, y) {
  // pequena linha vermelha + label uppercase em vermelho claro
  doc.rect(MX, y + 4, 28, 1.5).fill(COLORS.red);
  doc.fontSize(9).fillColor(COLORS.redL).font('Helvetica-Bold');
  doc.text(text.toUpperCase(), MX + 36, y, { characterSpacing: 2.5 });
}

function sectionTitle(text, y, size = 28) {
  doc.fontSize(size).fillColor(COLORS.white).font('Helvetica-Bold');
  doc.text(text, MX, y, { width: PW - MX * 2 });
}

function safeImage(imgPath, x, y, opts) {
  try {
    if (fs.existsSync(imgPath)) {
      doc.image(imgPath, x, y, opts);
      return true;
    }
  } catch (e) {
    console.warn('imagem falhou:', imgPath, e.message);
  }
  return false;
}

// ═══════════════════════════════════════════════
// PÁGINA 1 — CAPA
// ═══════════════════════════════════════════════
bgNavy();

// Imagem de fundo (about-bg) à direita com fade
const aboutBg = path.join(PUB, 'about-bg.png');
if (fs.existsSync(aboutBg)) {
  doc.save();
  doc.opacity(0.35);
  doc.image(aboutBg, PW * 0.35, 0, { width: PW * 0.7, height: PH });
  doc.restore();
}

// Gradiente sintético (faixas verticais escuras) para overlay
for (let i = 0; i < 40; i++) {
  const alpha = 0.95 - (i * 0.022);
  if (alpha <= 0) break;
  doc.save();
  doc.opacity(alpha);
  doc.rect(0, 0, MX * 2 + (i * 10), PH).fill(COLORS.navy);
  doc.restore();
}

// Glow sutil
softGlow(PW * 0.85, PH * 0.15, 200, COLORS.red, 0.10);
softGlow(PW * 0.15, PH * 0.85, 280, COLORS.steel, 0.08);

// Logo
const logo = path.join(PUB, 'logo-lg.png');
if (fs.existsSync(logo)) {
  doc.image(logo, MX, 90, { width: 110 });
}

// Linha vermelha pequena
accentLine(MX, 230, 60, 3);

// Tagline pequena
doc.fontSize(10).fillColor(COLORS.redL).font('Helvetica-Bold');
doc.text('MAIS DE 20 ANOS DE EXCELÊNCIA', MX, 250, { characterSpacing: 3 });

// Título grande
doc.fontSize(46).fillColor(COLORS.white).font('Helvetica-Bold');
doc.text('Especialistas em', MX, 290);

doc.fontSize(46).fillColor(COLORS.red).font('Helvetica-Bold');
doc.text('Bombas', MX, 340, { continued: true });
doc.fillColor(COLORS.white).text(' e Equipamentos', { continued: false });

doc.fontSize(46).fillColor(COLORS.steelL).font('Helvetica-Bold');
doc.text('Hidráulicos', MX, 390);

// Subtítulo
doc.fontSize(13).fillColor(COLORS.silver).font('Helvetica');
doc.text(
  'Manutenção preventiva, recuperação de bombas de palheta\ne assistência técnica 24h em todo o Brasil.',
  MX, 460,
  { width: 400, lineGap: 4 }
);

// Caixa info inferior
const boxY = PH - 200;
doc.rect(MX, boxY, PW - MX * 2, 100)
   .lineWidth(1)
   .strokeColor(COLORS.line)
   .fillAndStroke(COLORS.navyM, COLORS.line);

doc.fontSize(9).fillColor(COLORS.gray).font('Helvetica-Bold');
doc.text('PORTFÓLIO EMPRESARIAL', MX + 24, boxY + 22, { characterSpacing: 2 });

doc.fontSize(18).fillColor(COLORS.white).font('Helvetica-Bold');
doc.text('Soluções Hidráulicas de Alta Performance', MX + 24, boxY + 40);

doc.fontSize(11).fillColor(COLORS.silver).font('Helvetica');
doc.text('Apresentação completa dos nossos serviços e capacidades técnicas.', MX + 24, boxY + 70);

// Footer da capa
doc.fontSize(8).fillColor(COLORS.gray).font('Helvetica');
doc.text('JJ-HIDRAULICOS.COM.BR  ·  WHATSAPP +55 15 99833-8067', MX, PH - 32, {
  width: PW - MX * 2, align: 'left'
});
doc.text('2026', MX, PH - 32, { width: PW - MX * 2, align: 'right' });

// ═══════════════════════════════════════════════
// PÁGINA 2 — SOBRE
// ═══════════════════════════════════════════════
doc.addPage();
bgNavy();
softGlow(PW * 0.8, 100, 220, COLORS.steel, 0.10);

sectionLabel('Quem somos', 70);
sectionTitle('Tradição e Tecnologia\na Serviço da Sua Operação', 92, 28);

doc.fontSize(12).fillColor(COLORS.silver).font('Helvetica');
doc.text(
  'Com mais de duas décadas de mercado, a J&J é referência nacional em manutenção e recuperação de sistemas hidráulicos. Atuamos com excelência técnica, agilidade e compromisso, atendendo indústrias, agronegócio, construção, mineração e setores estratégicos em todo o território brasileiro.',
  MX, 175,
  { width: PW - MX * 2, lineGap: 5, align: 'justify' }
);

// Números — 4 cards
const stats = [
  { n: '1.000+', l: 'Serviços\nRealizados' },
  { n: '20+',    l: 'Anos de\nExperiência' },
  { n: '24h',    l: 'Atendimento\nEmergencial' },
  { n: '100%',   l: 'Compromisso\ncom Qualidade' },
];

const statY = 290;
const statW = (PW - MX * 2 - 36) / 4;
stats.forEach((s, i) => {
  const x = MX + i * (statW + 12);
  doc.rect(x, statY, statW, 110)
     .lineWidth(1)
     .strokeColor(COLORS.line)
     .fillAndStroke(COLORS.navyM, COLORS.line);
  // top accent
  doc.rect(x, statY, statW, 2).fill(COLORS.red);
  doc.fontSize(28).fillColor(COLORS.white).font('Helvetica-Bold');
  doc.text(s.n, x, statY + 22, { width: statW, align: 'center' });
  doc.fontSize(9).fillColor(COLORS.silver).font('Helvetica-Bold');
  doc.text(s.l.toUpperCase(), x, statY + 64, { width: statW, align: 'center', characterSpacing: 1.5, lineGap: 2 });
});

// Features
const features = [
  { t: 'Atendimento 24 Horas',  d: 'Suporte emergencial a qualquer hora, 7 dias por semana.' },
  { t: 'Atuação Nacional',       d: 'Cobertura técnica em todo o território brasileiro.' },
  { t: 'Equipe Qualificada',     d: 'Técnicos certificados com formação atualizada.' },
  { t: '+1.000 Serviços',        d: 'Excelência comprovada e satisfação total dos clientes.' },
];

const fY = 440;
features.forEach((f, i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const x = MX + col * ((PW - MX * 2) / 2 + 6);
  const y = fY + row * 86;
  const w = (PW - MX * 2) / 2 - 6;

  doc.rect(x, y, w, 74)
     .lineWidth(1)
     .strokeColor(COLORS.line)
     .fillAndStroke(COLORS.navyM, COLORS.line);
  // accent vertical
  doc.rect(x, y, 3, 74).fill(COLORS.red);

  doc.fontSize(12).fillColor(COLORS.white).font('Helvetica-Bold');
  doc.text(f.t, x + 18, y + 16, { width: w - 30 });
  doc.fontSize(10).fillColor(COLORS.silver).font('Helvetica');
  doc.text(f.d, x + 18, y + 36, { width: w - 30, lineGap: 2 });
});

// Citação inferior
const qY = PH - 130;
doc.fontSize(48).fillColor(COLORS.red).font('Helvetica-Bold').opacity(0.4);
doc.text('"', MX, qY - 20);
doc.opacity(1);
doc.fontSize(13).fillColor(COLORS.white).font('Helvetica-Oblique');
doc.text(
  'Nossa missão é manter a sua operação rodando com segurança, performance e previsibilidade.',
  MX + 32, qY,
  { width: PW - MX * 2 - 32, lineGap: 4 }
);
doc.fontSize(10).fillColor(COLORS.redL).font('Helvetica-Bold');
doc.text('— J&J HIDRÁULICOS', MX + 32, qY + 50, { characterSpacing: 2 });

pageFooter(2, 6);

// ═══════════════════════════════════════════════
// PÁGINA 3-4 — SERVIÇOS (5 + 4)
// ═══════════════════════════════════════════════
const SERVICES = [
  { t: 'Manutenção Preventiva',                d: 'Inspeção periódica completa para prevenir falhas, garantir vida útil e reduzir custos operacionais.', img: 'manutencao-preventiva.jpg' },
  { t: 'Recuperação de Bombas',                d: 'Desmontagem, análise, substituição de componentes e teste de bancada. Pistões, engrenagens, palhetas fixa e variável.', img: 'recuperacao-bombas.jpg' },
  { t: 'Manutenção Corretiva 24h',             d: 'Atendimento emergencial para falhas críticas. Diagnóstico preciso e reparo ágil para reduzir paradas.', img: 'manutencao-corretiva.jpg' },
  { t: 'Reparo de Cilindros Hidráulicos',      d: 'Brunimento da camisa, troca de vedações, recuperação de hastes. Qualquer porte e aplicação.', img: 'reparo-cilindros.jpg' },
  { t: 'Mangueiras e Conexões',                d: 'Substituição e fabricação com peças certificadas. Engates rápidos e linhas de alta pressão.', img: 'mangueiras-conexoes.jpg' },
  { t: 'Filtragem e Limpeza de Óleo',          d: 'Filtração industrial, análise de contaminação e recomendação técnica de tratamento.', img: 'filtragem-limpeza.jpg' },
  { t: 'Unidades Hidráulicas',                 d: 'Projeto, montagem, manutenção e reformas de unidades industriais e móveis sob medida.', img: 'unidades-hidraulicas.jpg' },
  { t: 'Válvulas e Comandos',                  d: 'Reparo de válvulas direcionais, proporcionais, blocos manifold e comandos hidráulicos.', img: 'valvulas-comandos.jpg' },
  { t: 'Consultoria Técnica',                  d: 'Dimensionamento, laudos técnicos, retrofit e adequação às normas de segurança vigentes.', img: 'consultoria-tecnica.jpg' },
];

function drawServiceCard(x, y, w, h, svc) {
  // fundo card
  doc.rect(x, y, w, h)
     .lineWidth(1)
     .strokeColor(COLORS.line)
     .fillAndStroke(COLORS.navyM, COLORS.line);

  // imagem (60% altura)
  const imgH = h * 0.58;
  const imgPath = path.join(SVC, svc.img);
  if (safeImage(imgPath, x + 1, y + 1, { width: w - 2, height: imgH - 1, cover: [w - 2, imgH - 1] })) {
    // overlay escuro inferior na imagem
    doc.save();
    doc.opacity(0.55);
    doc.rect(x + 1, y + imgH - 30, w - 2, 30).fill(COLORS.navy);
    doc.restore();
  }

  // accent linha
  doc.rect(x, y + imgH, w, 2).fill(COLORS.red);

  // título
  doc.fontSize(11.5).fillColor(COLORS.white).font('Helvetica-Bold');
  doc.text(svc.t, x + 14, y + imgH + 12, { width: w - 28, lineGap: 1 });

  // descrição
  doc.fontSize(8.5).fillColor(COLORS.silver).font('Helvetica');
  doc.text(svc.d, x + 14, y + imgH + 42, { width: w - 28, lineGap: 2 });
}

function drawServicesPage(title, subtitle, services, pageNum, totalPages, startIdx) {
  doc.addPage();
  bgNavy();
  softGlow(PW * 0.9, PH * 0.05, 200, COLORS.red, 0.08);

  sectionLabel('Nossos Serviços', 70);
  sectionTitle(title, 92, 24);
  doc.fontSize(11).fillColor(COLORS.silver).font('Helvetica');
  doc.text(subtitle, MX, 152, { width: PW - MX * 2, lineGap: 3 });

  // Grid 3x2 ou 3x1
  const cols = 3;
  const rows = Math.ceil(services.length / cols);
  const gap = 12;
  const cardW = (PW - MX * 2 - gap * (cols - 1)) / cols;
  const cardH = 218;
  const gridY = 200;

  services.forEach((s, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = MX + col * (cardW + gap);
    const y = gridY + row * (cardH + gap);
    drawServiceCard(x, y, cardW, cardH, s);
  });

  pageFooter(pageNum, totalPages);
}

drawServicesPage(
  'Soluções Hidráulicas\nde Alta Performance',
  'Da manutenção preventiva à recuperação completa de bombas, cilindros e unidades de potência. Atuamos com todas as marcas e portes.',
  SERVICES.slice(0, 6),
  3, 6
);

drawServicesPage(
  'Serviços Complementares',
  'Cobertura técnica completa para garantir a continuidade e segurança da sua operação hidráulica.',
  SERVICES.slice(6),
  4, 6
);

// ═══════════════════════════════════════════════
// PÁGINA 5 — DEPOIMENTOS
// ═══════════════════════════════════════════════
doc.addPage();
bgNavy();
softGlow(PW * 0.15, PH * 0.5, 250, COLORS.red, 0.08);
softGlow(PW * 0.85, PH * 0.85, 250, COLORS.steel, 0.10);

sectionLabel('Depoimentos', 70);
sectionTitle('O Que Nossos Clientes Dizem', 92, 26);
doc.fontSize(11).fillColor(COLORS.silver).font('Helvetica');
doc.text('Confiança construída em mais de duas décadas de excelência técnica.', MX, 145, { width: PW - MX * 2 });

const testimonials = [
  { t: 'Serviço de qualidade, e rápida resposta. Estamos satisfeitos com o serviço.', n: 'Ettiene Laiane', r: '@ettienelaiane' },
  { t: 'Ótimo serviço, com boa qualidade.',                                            n: 'Rosimeire Pinheiro', r: '@rosimeire.pinheiro.758' },
  { t: 'Os melhores!',                                                                  n: 'Duda Almeida', r: '@duda_almeid_' },
  { t: 'Muito bom o serviço deles.',                                                    n: 'Simone', r: '@simone.obstetricia' },
  { t: 'Ótimo trabalho!',                                                               n: 'Karina Pinheiro', r: '@karininhapinheiro' },
  { t: 'Nada vence o trabalho. Sensacional!',                                           n: 'Kleber', r: '@klekleber' },
];

const tCols = 2;
const tGap = 14;
const tCardW = (PW - MX * 2 - tGap) / tCols;
const tCardH = 152;
const tStartY = 200;

testimonials.forEach((tm, i) => {
  const col = i % tCols;
  const row = Math.floor(i / tCols);
  const x = MX + col * (tCardW + tGap);
  const y = tStartY + row * (tCardH + tGap);

  doc.rect(x, y, tCardW, tCardH)
     .lineWidth(1)
     .strokeColor(COLORS.line)
     .fillAndStroke(COLORS.navyM, COLORS.line);

  // aspas grandes vermelhas
  doc.fontSize(54).fillColor(COLORS.red).font('Helvetica-Bold').opacity(0.35);
  doc.text('"', x + 16, y + 4);
  doc.opacity(1);

  // texto
  doc.fontSize(11).fillColor(COLORS.white).font('Helvetica-Oblique');
  doc.text(tm.t, x + 20, y + 52, { width: tCardW - 40, lineGap: 3 });

  // separador
  doc.rect(x + 20, y + tCardH - 44, 24, 2).fill(COLORS.red);

  // nome
  doc.fontSize(11).fillColor(COLORS.white).font('Helvetica-Bold');
  doc.text(tm.n, x + 20, y + tCardH - 34);
  doc.fontSize(9).fillColor(COLORS.steelL).font('Helvetica');
  doc.text(tm.r, x + 20, y + tCardH - 18);

  // estrelas
  doc.fontSize(10).fillColor('#f1c40f').font('Helvetica');
  doc.text('★ ★ ★ ★ ★', x + tCardW - 80, y + tCardH - 22);
});

pageFooter(5, 6);

// ═══════════════════════════════════════════════
// PÁGINA 6 — CONTATO
// ═══════════════════════════════════════════════
doc.addPage();
bgNavy();
softGlow(PW * 0.5, PH * 0.5, 380, COLORS.red, 0.10);

sectionLabel('Vamos Conversar', 90);
sectionTitle('Pronto Para Resolver\nSeu Problema Hidráulico?', 112, 30);
doc.fontSize(13).fillColor(COLORS.silver).font('Helvetica');
doc.text(
  'Fale com José Neto e receba um orçamento personalizado. Atendimento em todo o Brasil, com agilidade e qualidade técnica.',
  MX, 215,
  { width: PW - MX * 2, lineGap: 4 }
);

// Bloco contato — caixa grande
const cY = 320;
const cH = 280;
doc.rect(MX, cY, PW - MX * 2, cH)
   .lineWidth(1)
   .strokeColor(COLORS.line)
   .fillAndStroke(COLORS.navyM, COLORS.line);
// accent top
doc.rect(MX, cY, PW - MX * 2, 3).fill(COLORS.red);

// Logo dentro
if (fs.existsSync(logo)) {
  doc.image(logo, MX + 30, cY + 30, { width: 70 });
}

// Título da box
doc.fontSize(20).fillColor(COLORS.white).font('Helvetica-Bold');
doc.text('J&J Hidráulicos', MX + 30, cY + 115);
doc.fontSize(10).fillColor(COLORS.steelL).font('Helvetica-Bold');
doc.text('BOMBAS E EQUIPAMENTOS HIDRÁULICOS', MX + 30, cY + 138, { characterSpacing: 2 });

// Linha divisora
doc.moveTo(MX + 30, cY + 165).lineTo(PW - MX - 30, cY + 165).strokeColor(COLORS.line).lineWidth(1).stroke();

// Canais
const ch = [
  { label: 'WHATSAPP',  value: '+55 (15) 99833-8067' },
  { label: 'INSTAGRAM', value: '@jejhidraulica' },
  { label: 'SITE',      value: 'jj-hidraulicos-vercel.vercel.app' },
  { label: 'ATENDIMENTO', value: '24 horas · 7 dias por semana' },
];

const chStartY = cY + 185;
ch.forEach((c, i) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  const x = MX + 30 + col * ((PW - MX * 2 - 60) / 2);
  const y = chStartY + row * 42;

  doc.fontSize(8).fillColor(COLORS.gray).font('Helvetica-Bold');
  doc.text(c.label, x, y, { characterSpacing: 2 });

  doc.fontSize(13).fillColor(COLORS.white).font('Helvetica-Bold');
  doc.text(c.value, x, y + 14);
});

// CTA caixa vermelha
const ctaY = cY + cH + 24;
doc.rect(MX, ctaY, PW - MX * 2, 70).fill(COLORS.red);
doc.fontSize(16).fillColor(COLORS.white).font('Helvetica-Bold');
doc.text('SOLICITE SEU ORÇAMENTO AGORA', MX, ctaY + 18, { width: PW - MX * 2, align: 'center', characterSpacing: 1.5 });
doc.fontSize(11).fillColor(COLORS.white).font('Helvetica');
doc.text('WhatsApp +55 (15) 99833-8067  ·  Resposta rápida garantida', MX, ctaY + 44, { width: PW - MX * 2, align: 'center' });

pageFooter(6, 6);

// ═══════════════════════════════════════════════
doc.end();
console.log('✓ PDF gerado em', OUT);
