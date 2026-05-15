// Generator de Portfolio PDF — J&J Bombas e Equipamentos Hidráulicos
// Estilo: moderno, escuro, industrial, sofisticado | Foco: SERVIÇOS

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// ════════ BRANDING ════════
const COLORS = {
  navy:   '#0a1929',
  navyL:  '#142a44',
  navyM:  '#0e2238',
  steel:  '#2c5f7c',
  steelL: '#3a7ca5',
  red:    '#c0392b',
  redL:   '#e74c3c',
  white:  '#ffffff',
  silver: '#a5b4c4',
  gray:   '#6b7c8e',
  line:   '#1e3553',
};

const PUB = path.join(__dirname, '..', 'public');
const SVC = path.join(PUB, 'services');
const OUT = path.join(PUB, 'portfolio-jj-hidraulicos.pdf');

// Página A4
const PW = 595.28;
const PH = 841.89;
const MX = 42;

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
    console.warn('img falhou:', imgPath, e.message);
  }
  return false;
}

const TOTAL_PAGES = 6;

// ═══════════════════════════════════════════════
// PÁGINA 1 — CAPA
// ═══════════════════════════════════════════════
bgNavy();

const aboutBg = path.join(PUB, 'about-bg.png');
if (fs.existsSync(aboutBg)) {
  doc.save();
  doc.opacity(0.35);
  doc.image(aboutBg, PW * 0.35, 0, { width: PW * 0.7, height: PH });
  doc.restore();
}

for (let i = 0; i < 40; i++) {
  const alpha = 0.95 - (i * 0.022);
  if (alpha <= 0) break;
  doc.save();
  doc.opacity(alpha);
  doc.rect(0, 0, MX * 2 + (i * 10), PH).fill(COLORS.navy);
  doc.restore();
}

softGlow(PW * 0.85, PH * 0.15, 200, COLORS.red, 0.10);
softGlow(PW * 0.15, PH * 0.85, 280, COLORS.steel, 0.08);

const logo = path.join(PUB, 'logo-lg.png');
if (fs.existsSync(logo)) {
  doc.image(logo, MX, 90, { width: 110 });
}

accentLine(MX, 230, 60, 3);
doc.fontSize(10).fillColor(COLORS.redL).font('Helvetica-Bold');
doc.text('MAIS DE 20 ANOS DE EXCELÊNCIA', MX, 250, { characterSpacing: 3 });

doc.fontSize(46).fillColor(COLORS.white).font('Helvetica-Bold');
doc.text('Especialistas em', MX, 290);

doc.fontSize(46).fillColor(COLORS.red).font('Helvetica-Bold');
doc.text('Bombas', MX, 340, { continued: true });
doc.fillColor(COLORS.white).text(' e Equipamentos', { continued: false });

doc.fontSize(46).fillColor(COLORS.steelL).font('Helvetica-Bold');
doc.text('Hidráulicos', MX, 390);

doc.fontSize(13).fillColor(COLORS.silver).font('Helvetica');
doc.text(
  'Manutenção preventiva, recuperação de bombas de palheta\ne assistência técnica 24h em todo o Brasil.',
  MX, 460,
  { width: 400, lineGap: 4 }
);

const boxY = PH - 200;
doc.rect(MX, boxY, PW - MX * 2, 100)
   .lineWidth(1)
   .strokeColor(COLORS.line)
   .fillAndStroke(COLORS.navyM, COLORS.line);
doc.fontSize(9).fillColor(COLORS.gray).font('Helvetica-Bold');
doc.text('PORTFÓLIO DE SERVIÇOS', MX + 24, boxY + 22, { characterSpacing: 2 });
doc.fontSize(18).fillColor(COLORS.white).font('Helvetica-Bold');
doc.text('Soluções Hidráulicas de Alta Performance', MX + 24, boxY + 40);
doc.fontSize(11).fillColor(COLORS.silver).font('Helvetica');
doc.text('Apresentação completa dos nossos serviços e capacidades técnicas.', MX + 24, boxY + 70);

doc.fontSize(8).fillColor(COLORS.gray).font('Helvetica');
doc.text('JJ-HIDRAULICOS.COM.BR  ·  WHATSAPP +55 15 99833-8067', MX, PH - 32, {
  width: PW - MX * 2, align: 'left'
});
doc.text('2026', MX, PH - 32, { width: PW - MX * 2, align: 'right' });

// ═══════════════════════════════════════════════
// PÁGINA 2 — SOBRE (compacta)
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
     .lineWidth(1).strokeColor(COLORS.line).fillAndStroke(COLORS.navyM, COLORS.line);
  doc.rect(x, statY, statW, 2).fill(COLORS.red);
  doc.fontSize(28).fillColor(COLORS.white).font('Helvetica-Bold');
  doc.text(s.n, x, statY + 22, { width: statW, align: 'center' });
  doc.fontSize(9).fillColor(COLORS.silver).font('Helvetica-Bold');
  doc.text(s.l.toUpperCase(), x, statY + 64, { width: statW, align: 'center', characterSpacing: 1.5, lineGap: 2 });
});

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
     .lineWidth(1).strokeColor(COLORS.line).fillAndStroke(COLORS.navyM, COLORS.line);
  doc.rect(x, y, 3, 74).fill(COLORS.red);
  doc.fontSize(12).fillColor(COLORS.white).font('Helvetica-Bold');
  doc.text(f.t, x + 18, y + 16, { width: w - 30 });
  doc.fontSize(10).fillColor(COLORS.silver).font('Helvetica');
  doc.text(f.d, x + 18, y + 36, { width: w - 30, lineGap: 2 });
});

// CTA inferior — anuncia próximas páginas de serviços
const ctaY = PH - 140;
doc.rect(MX, ctaY, PW - MX * 2, 70)
   .lineWidth(1).strokeColor(COLORS.red).fillAndStroke(COLORS.navyM, COLORS.red);
doc.rect(MX, ctaY, 4, 70).fill(COLORS.red);
doc.fontSize(11).fillColor(COLORS.redL).font('Helvetica-Bold');
doc.text('CONHEÇA NOSSO PORTFÓLIO COMPLETO', MX + 22, ctaY + 16, { characterSpacing: 2 });
doc.fontSize(15).fillColor(COLORS.white).font('Helvetica-Bold');
doc.text('9 serviços especializados para manter sua operação rodando.', MX + 22, ctaY + 36, { width: PW - MX * 2 - 44 });

pageFooter(2, TOTAL_PAGES);

// ═══════════════════════════════════════════════
// SERVIÇOS — dados
// ═══════════════════════════════════════════════
const SERVICES = [
  { t: 'Manutenção Preventiva', img: 'manutencao-preventiva.jpg',
    d: 'Inspeção periódica completa para prevenir falhas, garantir vida útil e reduzir custos operacionais.',
    b: ['Cronograma técnico personalizado','Relatórios detalhados de inspeção','Redução de paradas não programadas','Aumento da vida útil dos componentes'] },
  { t: 'Recuperação de Bombas', img: 'recuperacao-bombas.jpg',
    d: 'Desmontagem, análise, substituição de componentes e teste de bancada. Pistões, engrenagens, palhetas fixa e variável.',
    b: ['Todas as marcas e modelos','Bancada de testes própria','Garantia técnica','Peças originais e equivalentes'] },
  { t: 'Manutenção Corretiva 24h', img: 'manutencao-corretiva.jpg',
    d: 'Atendimento emergencial para falhas críticas. Diagnóstico preciso e reparo ágil para reduzir paradas.',
    b: ['Plantão 24 horas, 7 dias por semana','Equipe técnica deslocada','Diagnóstico em campo','Atendimento em todo o Brasil'] },
  { t: 'Reparo de Cilindros Hidráulicos', img: 'reparo-cilindros.jpg',
    d: 'Brunimento da camisa, troca de vedações, recuperação de hastes. Qualquer porte e aplicação.',
    b: ['Brunimento de precisão','Recuperação de hastes','Vedações certificadas','Cilindros de todos os portes'] },
  { t: 'Mangueiras e Conexões', img: 'mangueiras-conexoes.jpg',
    d: 'Substituição e fabricação com peças certificadas. Engates rápidos e linhas de alta pressão.',
    b: ['Fabricação sob medida','Peças certificadas','Engates rápidos','Alta e baixa pressão'] },
  { t: 'Filtragem e Limpeza de Óleo', img: 'filtragem-limpeza.jpg',
    d: 'Filtração industrial, análise de contaminação e recomendação técnica de tratamento.',
    b: ['Análise de contaminação','Filtração industrial','Tratamento técnico','Redução de desgaste'] },
  { t: 'Unidades Hidráulicas', img: 'unidades-hidraulicas.jpg',
    d: 'Projeto, montagem, manutenção e reformas de unidades industriais e móveis sob medida.',
    b: ['Projeto sob medida','Montagem industrial','Reformas completas','Aplicações móveis e fixas'] },
  { t: 'Válvulas e Comandos', img: 'valvulas-comandos.jpg',
    d: 'Reparo de válvulas direcionais, proporcionais, blocos manifold e comandos hidráulicos.',
    b: ['Válvulas direcionais','Proporcionais e servo','Blocos manifold','Comandos completos'] },
  { t: 'Consultoria Técnica', img: 'consultoria-tecnica.jpg',
    d: 'Dimensionamento, laudos técnicos, retrofit e adequação às normas de segurança vigentes.',
    b: ['Dimensionamento técnico','Laudos especializados','Adequação às normas','Retrofit de sistemas'] },
];

// ═══════════════════════════════════════════════
// PÁGINA 3 — OVERVIEW DOS 9 SERVIÇOS (grid 3x3 visual)
// ═══════════════════════════════════════════════
doc.addPage();
bgNavy();
softGlow(PW * 0.9, PH * 0.05, 200, COLORS.red, 0.08);
softGlow(PW * 0.1, PH * 0.9, 250, COLORS.steel, 0.10);

sectionLabel('Nossos Serviços', 56);
sectionTitle('9 Soluções Especializadas\nem Sistemas Hidráulicos', 78, 22);
doc.fontSize(10).fillColor(COLORS.silver).font('Helvetica');
doc.text('Cobertura técnica completa para manter sua operação produtiva e segura.', MX, 138, { width: PW - MX * 2 });

// Grid 3x3
const cols = 3, rows = 3;
const gap = 10;
const cardW = (PW - MX * 2 - gap * (cols - 1)) / cols;
const cardH = 178;
const gridY = 175;

SERVICES.forEach((s, i) => {
  const col = i % cols;
  const row = Math.floor(i / cols);
  const x = MX + col * (cardW + gap);
  const y = gridY + row * (cardH + gap);

  // fundo card
  doc.rect(x, y, cardW, cardH)
     .lineWidth(1).strokeColor(COLORS.line).fillAndStroke(COLORS.navyM, COLORS.line);

  // imagem ocupa toda parte superior
  const imgH = cardH * 0.62;
  const imgPath = path.join(SVC, s.img);
  if (safeImage(imgPath, x + 1, y + 1, { width: cardW - 2, height: imgH - 1, cover: [cardW - 2, imgH - 1] })) {
    doc.save();
    doc.opacity(0.55);
    doc.rect(x + 1, y + imgH - 26, cardW - 2, 26).fill(COLORS.navy);
    doc.restore();
  }

  // numero do serviço sobre a imagem
  doc.fontSize(9).fillColor(COLORS.redL).font('Helvetica-Bold').opacity(0.9);
  doc.text(`0${i + 1}`, x + 10, y + 8, { characterSpacing: 1 });
  doc.opacity(1);

  // accent vermelho
  doc.rect(x, y + imgH, cardW, 2).fill(COLORS.red);

  // título do serviço
  doc.fontSize(10).fillColor(COLORS.white).font('Helvetica-Bold');
  doc.text(s.t, x + 12, y + imgH + 12, { width: cardW - 24, lineGap: 1 });
});

pageFooter(3, TOTAL_PAGES);

// ═══════════════════════════════════════════════
// FUNÇÃO — Página de detalhes (3 serviços por página, cards grandes)
// ═══════════════════════════════════════════════
function drawDetailPage(title, subtitle, services, pageNum, startIdx) {
  doc.addPage();
  bgNavy();
  softGlow(PW * 0.9, PH * 0.1, 220, COLORS.steel, 0.10);

  sectionLabel('Serviços em Detalhe', 56);
  sectionTitle(title, 78, 22);
  doc.fontSize(10).fillColor(COLORS.silver).font('Helvetica');
  doc.text(subtitle, MX, 138, { width: PW - MX * 2 });

  // 3 cards horizontais grandes (full width, altura ~200)
  const cardH = 200;
  const gapV = 14;
  const startY = 170;

  services.forEach((s, i) => {
    const idx = startIdx + i;
    const y = startY + i * (cardH + gapV);
    const w = PW - MX * 2;

    // fundo
    doc.rect(MX, y, w, cardH)
       .lineWidth(1).strokeColor(COLORS.line).fillAndStroke(COLORS.navyM, COLORS.line);

    // imagem ocupa lado esquerdo (40% largura)
    const imgW = w * 0.4;
    const imgPath = path.join(SVC, s.img);
    safeImage(imgPath, MX + 1, y + 1, { width: imgW - 1, height: cardH - 2, cover: [imgW - 1, cardH - 2] });

    // accent vertical entre imagem e texto
    doc.rect(MX + imgW, y, 3, cardH).fill(COLORS.red);

    // overlay gradient na imagem (escurece lado direito da imagem para suavizar transição)
    doc.save();
    doc.opacity(0.4);
    doc.rect(MX + imgW - 40, y, 40, cardH).fill(COLORS.navy);
    doc.restore();

    // número do serviço
    doc.fontSize(10).fillColor(COLORS.redL).font('Helvetica-Bold');
    doc.text(`SERVIÇO  0${idx}`, MX + 12, y + 14, { characterSpacing: 2.5 });
    // estrelinha de qualidade
    doc.fontSize(10).fillColor('#f1c40f').font('Helvetica');
    doc.text('★ ★ ★ ★ ★', MX + 12, y + cardH - 26);

    // texto à direita
    const tx = MX + imgW + 22;
    const tw = w - imgW - 36;

    doc.fontSize(17).fillColor(COLORS.white).font('Helvetica-Bold');
    doc.text(s.t, tx, y + 18, { width: tw, lineGap: 1 });

    // separador
    doc.rect(tx, y + 50, 30, 2).fill(COLORS.red);

    doc.fontSize(10).fillColor(COLORS.silver).font('Helvetica');
    doc.text(s.d, tx, y + 64, { width: tw, lineGap: 3 });

    // benefícios (bullets)
    const bY = y + 122;
    s.b.forEach((bullet, bi) => {
      const bCol = bi % 2;
      const bRow = Math.floor(bi / 2);
      const bx = tx + bCol * (tw / 2);
      const by = bY + bRow * 18;
      // bullet check
      doc.fontSize(10).fillColor(COLORS.redL).font('Helvetica-Bold');
      doc.text('✓', bx, by);
      doc.fontSize(9).fillColor(COLORS.white).font('Helvetica');
      doc.text(bullet, bx + 12, by + 1, { width: (tw / 2) - 16 });
    });
  });

  pageFooter(pageNum, TOTAL_PAGES);
}

// ═══════════════════════════════════════════════
// PÁGINAS 4 e 5 — DETALHES (3 + 3) | Página 6 = serviços 7,8,9... ajuste:
// 9 serviços / 3 por página = 3 páginas de detalhe (4, 5 e parte da 6)
// Decisão: 2 páginas de detalhe (3 + 3 = 6 serviços top) + página de detalhe compacto com restantes
// ═══════════════════════════════════════════════

drawDetailPage(
  'Manutenção e Recuperação',
  'Os pilares do nosso serviço: prevenir, recuperar e atender em qualquer situação.',
  SERVICES.slice(0, 3), 4, 1
);

drawDetailPage(
  'Componentes e Sistemas',
  'Cobertura técnica em cilindros, linhas de pressão e óleo hidráulico.',
  SERVICES.slice(3, 6), 5, 4
);

// ═══════════════════════════════════════════════
// PÁGINA 6 — 3 SERVIÇOS RESTANTES + CONTATO COMPACTO
// ═══════════════════════════════════════════════
doc.addPage();
bgNavy();
softGlow(PW * 0.5, PH * 0.5, 380, COLORS.red, 0.08);

sectionLabel('Serviços em Detalhe', 56);
sectionTitle('Engenharia e Soluções Avançadas', 78, 22);
doc.fontSize(10).fillColor(COLORS.silver).font('Helvetica');
doc.text('Projeto, comando e consultoria técnica para sistemas hidráulicos completos.', MX, 138, { width: PW - MX * 2 });

// 3 cards menores em coluna (não usa toda a página, deixa espaço pra contato)
const remainServices = SERVICES.slice(6, 9);
const rCardH = 110;
const rGap = 10;
const rStartY = 170;
remainServices.forEach((s, i) => {
  const idx = 7 + i;
  const y = rStartY + i * (rCardH + rGap);
  const w = PW - MX * 2;

  doc.rect(MX, y, w, rCardH)
     .lineWidth(1).strokeColor(COLORS.line).fillAndStroke(COLORS.navyM, COLORS.line);

  const imgW = w * 0.3;
  safeImage(path.join(SVC, s.img), MX + 1, y + 1, { width: imgW - 1, height: rCardH - 2, cover: [imgW - 1, rCardH - 2] });

  doc.rect(MX + imgW, y, 3, rCardH).fill(COLORS.red);

  const tx = MX + imgW + 20;
  const tw = w - imgW - 32;

  doc.fontSize(9).fillColor(COLORS.redL).font('Helvetica-Bold');
  doc.text(`SERVIÇO  0${idx}`, tx, y + 12, { characterSpacing: 2.5 });

  doc.fontSize(14).fillColor(COLORS.white).font('Helvetica-Bold');
  doc.text(s.t, tx, y + 28, { width: tw });

  doc.fontSize(9).fillColor(COLORS.silver).font('Helvetica');
  doc.text(s.d, tx, y + 52, { width: tw, lineGap: 2 });

  // bullets compactos
  doc.fontSize(8).fillColor(COLORS.white).font('Helvetica');
  const bullets = s.b.slice(0, 4).map(b => `· ${b}`).join('    ');
  doc.fillColor(COLORS.silver).text(bullets, tx, y + rCardH - 22, { width: tw });
});

// Bloco contato no rodapé
const cY = rStartY + remainServices.length * (rCardH + rGap) + 18;
doc.rect(MX, cY, PW - MX * 2, PH - cY - 56)
   .lineWidth(1).strokeColor(COLORS.line).fillAndStroke(COLORS.navyM, COLORS.line);
doc.rect(MX, cY, PW - MX * 2, 3).fill(COLORS.red);

if (fs.existsSync(logo)) {
  doc.image(logo, MX + 22, cY + 22, { width: 58 });
}

doc.fontSize(11).fillColor(COLORS.redL).font('Helvetica-Bold');
doc.text('PRONTO PARA RESOLVER SEU PROBLEMA HIDRÁULICO?', MX + 96, cY + 24, { characterSpacing: 1.5 });
doc.fontSize(17).fillColor(COLORS.white).font('Helvetica-Bold');
doc.text('Fale com José Neto', MX + 96, cY + 42);
doc.fontSize(10).fillColor(COLORS.silver).font('Helvetica');
doc.text('Orçamento personalizado e atendimento em todo o Brasil.', MX + 96, cY + 64);

// Linha de contatos
const contactY = cY + 96;
const contacts = [
  { l: 'WHATSAPP',  v: '+55 (15) 99833-8067' },
  { l: 'INSTAGRAM', v: '@jejhidraulica' },
  { l: 'SITE',      v: 'jj-hidraulicos-vercel.vercel.app' },
];
const colW = (PW - MX * 2 - 44) / 3;
contacts.forEach((c, i) => {
  const x = MX + 22 + i * colW;
  doc.fontSize(8).fillColor(COLORS.gray).font('Helvetica-Bold');
  doc.text(c.l, x, contactY, { characterSpacing: 2 });
  doc.fontSize(11).fillColor(COLORS.white).font('Helvetica-Bold');
  doc.text(c.v, x, contactY + 14);
});

pageFooter(6, TOTAL_PAGES);

// ═══════════════════════════════════════════════
doc.end();
console.log('✓ PDF gerado em', OUT);
