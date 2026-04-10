import { useState, useEffect, useRef } from "react";

const WL = "https://wa.me/5515998338067?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento.";
const AP = "jj2024admin";
const HVID = "/hero-video.mp4";
const INSTA = "https://www.instagram.com/jejhidraulica?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";
const LOGO_SM = "/logo.png";
const LOGO_LG = "/logo-lg.png";

const Logo = ({ size = 44, showText = true, dark = false }) => (
  <div style={{ display:"flex",alignItems:"center",gap:12 }}>
    <img src={LOGO_SM} alt="J&J" style={{ width:size,height:size*1.2,objectFit:"contain",flexShrink:0,borderRadius:10,background:dark?"transparent":"#fff",padding:dark?0:3,boxShadow:dark?"none":"0 2px 8px rgba(0,0,0,.12)" }} />
    {showText && <div>
      <div style={{ fontFamily:"'Poppins',sans-serif",fontSize:size*.32,fontWeight:700,color:dark?"#0a1929":"#fff",lineHeight:1.15,letterSpacing:".3px" }}>J&J <span style={{fontWeight:400,opacity:.7}}>Hidráulicos</span></div>
      <div style={{ fontFamily:"'Poppins',sans-serif",fontSize:size*.15,color:dark?"#2C5F7C":"#7f9bb3",textTransform:"uppercase",letterSpacing:2,fontWeight:500,marginTop:1 }}>Bombas e Equipamentos</div>
    </div>}
  </div>
);

const LogoLg = ({ size = 200 }) => (
  <img src={LOGO_LG} alt="J&J Bombas e Equipamentos Hidráulicos" style={{ width:size,height:size*1.2,objectFit:"contain",borderRadius:16,background:"#fff",padding:6,boxShadow:"0 4px 20px rgba(0,0,0,.1)" }} />
);

const SERVICES = [
  { title:"Manutenção Preventiva", desc:"Inspeção periódica completa para prevenir falhas, garantir vida útil e reduzir custos operacionais.", icon:"🔧", img:"/services/manutencao-preventiva.jpg" },
  { title:"Recuperação de Bombas", desc:"Desmontagem, análise, substituição de componentes e teste de bancada. Todas as marcas. Pistões, engrenagens internas, palhetas fixa e variável.", icon:"⚙️", img:"/services/recuperacao-bombas.jpg" },
  { title:"Manutenção Corretiva 24h", desc:"Atendimento emergencial para falhas críticas. Diagnóstico preciso e reparo ágil.", icon:"🚨", img:"/services/manutencao-corretiva.jpg" },
  { title:"Reparo de Cilindros Hidráulicos", desc:"Brunimento da camisa, troca de vedações, recuperação de hastes. Qualquer porte.", icon:"🔩", img:"/services/reparo-cilindros.jpg" },
  { title:"Mangueiras e Conexões", desc:"Substituição com peças certificadas. Engates rápidos.", icon:"🔗", img:"/services/mangueiras-conexoes.jpg" },
  { title:"Filtragem e Limpeza de Reservatório de Óleo", desc:"Filtração e recomendação técnica de tratamento.", icon:"🧪", img:"/services/filtragem-limpeza.jpg" },
  { title:"Unidades Hidráulicas", desc:"Projeto, montagem, manutenção e reformas industriais e móveis.", icon:"🏭", img:"/services/unidades-hidraulicas.jpg" },
  { title:"Válvulas e Comandos", desc:"Reparo de válvulas direcionais, proporcionais, blocos manifold e comandos hidráulicos.", icon:"🎛️", img:"/services/valvulas-comandos.jpg" },
  { title:"Consultoria Técnica", desc:"Dimensionamento, laudos técnicos e adequação às normas de segurança.", icon:"📋", img:"/services/consultoria-tecnica.jpg" },
];

const TESTIMONIALS = [
  { name:"Carlos Mendes",role:"Ger. Manutenção — Metalúrgica Sorocabana",text:"A J&J resolveu em 6 horas um problema que nos custava 3 dias de parada. Equipe extremamente técnica e comprometida." },
  { name:"Fernanda Oliveira",role:"Dir. Operações — AgroBrasil",text:"Mais de 2 anos de parceria sem uma única falha no cronograma. A confiança que temos na J&J nos permite focar no que importa." },
  { name:"Roberto Almeida",role:"Proprietário — Construtora Almeida",text:"Atendem em qualquer lugar do Brasil com a mesma qualidade. Suporte emergencial em 3 estados diferentes." },
  { name:"Patrícia Santos",role:"Coord. Facilities — Shopping Iguatemi",text:"Profissionalismo de outro nível. O José Neto entende como ninguém do assunto. Do contato à entrega, impecável." },
  { name:"Marcos Vieira",role:"Eng. Mecânico — Petrobrás",text:"Contratamos para parada programada e entregaram 2 dias antes do prazo. Qualidade irrepreensível nos 14 cilindros." },
  { name:"Ana Cristina",role:"Ger. Industrial — Usina Santa Helena",text:"Na safra, cada hora parada custa caro. A J&J entende essa urgência. Parceiro indispensável há 5 anos." },
];

const STATS = [{n:"1.000+",l:"Serviços Realizados"},{n:"20+",l:"Anos de Experiência"},{n:"24h",l:"Atendimento"},{n:"100%",l:"Satisfação"}];

const WI = ({ s=28 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;

const getStoredCRM = () => { try { const d = localStorage.getItem("jj_crm5"); return d ? JSON.parse(d) : { clients:[],services:[],budgets:[],prospects:[] }; } catch { return { clients:[],services:[],budgets:[],prospects:[] }; } };

const css = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
:root{--navy:#0a1929;--nl:#0f2744;--nm:#163254;--bb:#2C5F7C;--bbl:#3a7ca5;--bbg:#4da8da;--br:#C0392B;--brl:#E74C3C;--wh:#fff;--sl:#a8b2c1;--sd:#6b7b8d;--gd:#d4a853;--gl:rgba(255,255,255,.05);--gb:rgba(255,255,255,.08);--gbh:rgba(255,255,255,.14);--sx:0 25px 60px rgba(0,0,0,.5);--r:16px;--f:'Poppins',sans-serif}
*{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}body{font-family:var(--f);background:var(--navy);color:var(--wh);overflow-x:hidden;-webkit-font-smoothing:antialiased}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:var(--navy)}::-webkit-scrollbar-thumb{background:var(--bb);border-radius:3px}
.noise{position:fixed;inset:0;z-index:0;pointer-events:none;opacity:.03;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
@keyframes fadeUp{from{opacity:0;transform:translateY(35px)}to{opacity:1;transform:translateY(0)}}
@keyframes pdot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(1.6)}}
@keyframes orbf{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(20px,-30px) scale(1.05)}66%{transform:translate(-15px,20px) scale(.95)}}
@keyframes scrl{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes gpulse{0%,100%{box-shadow:0 0 20px rgba(192,57,43,.08)}50%{box-shadow:0 0 40px rgba(192,57,43,.2)}}
@keyframes fwa{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes countUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
.fu{animation:fadeUp .8s ease-out both}.fd1{animation-delay:.1s}.fd2{animation-delay:.2s}.fd3{animation-delay:.3s}

.nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:16px 48px;display:flex;align-items:center;justify-content:space-between;transition:all .4s;background:#ffffff}
.nav.scr{background:#ffffff;backdrop-filter:blur(24px);border-bottom:1px solid rgba(44,95,124,.1);padding:10px 48px;box-shadow:0 2px 20px rgba(0,0,0,.08)}
.navl{display:flex;gap:36px;align-items:center}.navl a{color:#0a1929;text-decoration:none;font-size:14px;font-weight:500;letter-spacing:.3px;transition:color .3s;position:relative}.navl a:hover{color:var(--bb)}.navl a::after{content:'';position:absolute;bottom:-6px;left:0;width:0;height:2px;background:linear-gradient(90deg,var(--br),var(--brl));transition:width .3s;border-radius:1px}.navl a:hover::after{width:100%}
.ncta{background:linear-gradient(135deg,var(--br),var(--brl));color:var(--wh);border:none;padding:11px 26px;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:all .3s;text-decoration:none;display:inline-flex;align-items:center;gap:8px;box-shadow:0 4px 20px rgba(192,57,43,.35);font-family:var(--f)}.ncta:hover{transform:translateY(-2px);box-shadow:0 8px 35px rgba(192,57,43,.5)}

.hero{position:relative;min-height:100vh;display:flex;align-items:center;padding:130px 48px 100px;overflow:hidden}
.hero-bg{display:none}
.hero-overlay{position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,rgba(10,25,41,.75) 0%,rgba(10,25,41,.85) 50%,rgba(10,25,41,.95) 100%)}
.ho1{position:absolute;right:8%;top:18%;width:450px;height:450px;border-radius:50%;background:radial-gradient(circle,rgba(44,95,124,.15) 0%,transparent 70%);filter:blur(80px);animation:orbf 8s ease-in-out infinite;z-index:1}
.ho2{position:absolute;right:22%;bottom:12%;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(192,57,43,.1) 0%,transparent 70%);filter:blur(60px);animation:orbf 10s ease-in-out infinite reverse;z-index:1}
.hgr{position:absolute;inset:0;z-index:1;opacity:.03;background-image:linear-gradient(rgba(255,255,255,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.3) 1px,transparent 1px);background-size:80px 80px}
.hc{position:relative;z-index:5;max-width:700px}

.hb{display:inline-flex;align-items:center;gap:10px;background:rgba(44,95,124,.15);border:1px solid rgba(44,95,124,.3);padding:10px 22px;border-radius:100px;margin-bottom:28px;font-size:11px;color:var(--bbg);letter-spacing:2px;text-transform:uppercase;font-weight:600;backdrop-filter:blur(10px)}
.hbd{width:7px;height:7px;border-radius:50%;background:var(--brl);animation:pdot 2s infinite}
.hero h1{font-family:var(--f);font-size:clamp(38px,5vw,68px);font-weight:800;line-height:1.08;margin-bottom:24px;letter-spacing:-1px}
.ar{color:var(--brl)}.ablu{color:var(--bbg)}
.hsub{font-size:17px;color:var(--sl);line-height:1.75;margin-bottom:40px;max-width:560px;font-weight:400}
.ha{display:flex;gap:16px;flex-wrap:wrap}
.bp{background:linear-gradient(135deg,var(--br),var(--brl));color:var(--wh);border:none;padding:16px 36px;border-radius:14px;font-size:16px;font-weight:600;cursor:pointer;transition:all .4s;text-decoration:none;display:inline-flex;align-items:center;gap:12px;box-shadow:0 8px 35px rgba(192,57,43,.35);font-family:var(--f);position:relative;overflow:hidden}
.bp::before{content:'';position:absolute;top:0;left:-100%;width:100%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent);animation:shimmer 3s infinite}
.bp:hover{transform:translateY(-3px) scale(1.02);box-shadow:0 14px 50px rgba(192,57,43,.5)}
.bgh{background:transparent;border:1.5px solid var(--gbh);color:var(--wh);padding:16px 36px;border-radius:14px;font-size:16px;font-weight:500;cursor:pointer;transition:all .4s;text-decoration:none;display:inline-flex;align-items:center;gap:10px;font-family:var(--f)}.bgh:hover{background:rgba(255,255,255,.06);border-color:var(--bbl);transform:translateY(-2px)}

/* ═══ STATS - SEÇÃO 2 VIBRANTE ═══ */
.stats-section{position:relative;z-index:10;padding:100px 48px;background:linear-gradient(180deg,var(--navy) 0%,var(--nl) 50%,var(--navy) 100%);overflow:hidden}
.stats-section::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 0%,rgba(44,95,124,.15) 0%,transparent 60%);pointer-events:none}
.stats-section::after{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:800px;height:800px;border-radius:50%;background:radial-gradient(circle,rgba(192,57,43,.06) 0%,transparent 50%);pointer-events:none;filter:blur(40px)}
.stats-inner{max-width:1200px;margin:0 auto}
.stats-header{text-align:center;margin-bottom:60px;position:relative;z-index:1}
.stats-header h2{font-size:clamp(30px,3.5vw,46px);font-weight:800;color:var(--wh);margin-bottom:12px;letter-spacing:-.5px}
.stats-header p{font-size:16px;color:var(--sl);font-weight:400;max-width:500px;margin:0 auto}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;position:relative;z-index:1}
.stat-card{background:rgba(255,255,255,.04);backdrop-filter:blur(16px);border:1px solid var(--gb);border-radius:20px;padding:40px 24px;text-align:center;transition:all .4s;position:relative;overflow:hidden}
.stat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--bb),var(--br));opacity:0;transition:opacity .4s}
.stat-card:hover{transform:translateY(-8px);background:rgba(255,255,255,.07);border-color:var(--bbl);box-shadow:0 20px 50px rgba(0,0,0,.25)}.stat-card:hover::before{opacity:1}
.stat-num{font-size:52px;font-weight:800;line-height:1;margin-bottom:10px;background:linear-gradient(135deg,var(--wh) 0%,var(--br) 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.stat-lbl{font-size:11px;color:var(--sl);text-transform:uppercase;letter-spacing:2.5px;font-weight:600}
.stat-line{width:40px;height:2px;background:linear-gradient(90deg,var(--bb),var(--br));border-radius:2px;margin:14px auto 0;opacity:.4}

.sec{padding:120px 48px;position:relative;scroll-margin-top:80px}
.slbl{display:inline-flex;align-items:center;gap:10px;color:var(--brl);font-size:11px;text-transform:uppercase;letter-spacing:3px;font-weight:700;margin-bottom:16px}
.sln{width:40px;height:1.5px;background:var(--br);border-radius:1px}
.stt{font-family:var(--f);font-size:clamp(30px,3.5vw,48px);font-weight:700;margin-bottom:16px;line-height:1.15;letter-spacing:-.5px}
.ssb{font-size:16px;color:var(--sl);max-width:620px;line-height:1.75;margin-bottom:64px;font-weight:400}

/* ═══ SERVICES VITRINE 3 COLUNAS ═══ */
.svcs{background:linear-gradient(180deg,var(--navy) 0%,var(--nl) 100%)}
.sg{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;max-width:1260px}
.sc{background:var(--gl);border:1px solid var(--gb);border-radius:20px;overflow:hidden;transition:all .5s cubic-bezier(.23,1,.32,1);cursor:default;position:relative;display:flex;flex-direction:column}
.sc:hover{transform:translateY(-10px);border-color:var(--bbl);box-shadow:0 25px 60px rgba(0,0,0,.4),0 0 30px rgba(44,95,124,.1)}
.sct{height:160px;background:linear-gradient(135deg,var(--nm),var(--nl));display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;background-size:cover;background-position:center}
.sct::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 20%,rgba(10,25,41,.9) 100%)}
.sci{font-size:52px;position:relative;z-index:1;filter:drop-shadow(0 4px 12px rgba(0,0,0,.3))}
.sctp{position:absolute;inset:0;opacity:.06;background-image:radial-gradient(circle at 20% 50%,var(--bbl) 1px,transparent 1px),radial-gradient(circle at 80% 20%,var(--brl) 1px,transparent 1px);background-size:40px 40px,60px 60px}
.scb{padding:24px;flex:1;display:flex;flex-direction:column}
.sctt{font-size:17px;font-weight:700;margin-bottom:8px}
.scd{font-size:13px;color:var(--sl);line-height:1.7;font-weight:400;flex:1}
.sca{position:absolute;bottom:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--bb),var(--br));transform:scaleX(0);transition:transform .4s;transform-origin:left}
.sc:hover .sca{transform:scaleX(1)}
.sc-cta{display:inline-flex;align-items:center;gap:6px;color:var(--bbg);font-size:12px;font-weight:600;margin-top:14px;text-decoration:none;transition:color .3s;letter-spacing:.3px}
.sc-cta:hover{color:var(--wh)}

/* TESTIMONIALS */
.tsec{padding:120px 0;overflow:hidden;scroll-margin-top:80px;position:relative;background:linear-gradient(180deg,var(--nl) 0%,var(--navy) 100%)}
.thdr{padding:0 48px;margin-bottom:64px}
.ttw{position:relative;width:100%;overflow-x:auto;overflow-y:hidden;scrollbar-width:none;-ms-overflow-style:none}.ttw::-webkit-scrollbar{display:none}
.ttw::before,.ttw::after{content:'';position:absolute;top:0;bottom:0;width:180px;z-index:5;pointer-events:none}
.ttw::before{left:0;background:linear-gradient(90deg,var(--navy),transparent)}.ttw::after{right:0;background:linear-gradient(270deg,var(--navy),transparent)}
.ttr{display:flex;gap:28px;width:max-content;cursor:grab}.ttr:active{cursor:grabbing}.ttr.dragging .tc{pointer-events:none}
.tc{flex-shrink:0;width:420px;background:linear-gradient(145deg,rgba(192,57,43,.14) 0%,rgba(192,57,43,.04) 35%,rgba(255,255,255,.03) 100%);border:1px solid rgba(192,57,43,.14);border-radius:24px;padding:36px;position:relative;overflow:hidden;transition:all .4s;animation:gpulse 5s ease-in-out infinite}
.tc::before{content:'';position:absolute;top:-40%;right:-40%;width:180%;height:180%;background:radial-gradient(circle at 30% 30%,rgba(192,57,43,.07) 0%,transparent 50%);pointer-events:none}
.tc:hover{border-color:rgba(192,57,43,.3);transform:scale(1.02)}
.tq{font-size:48px;color:var(--br);opacity:.2;line-height:1;margin-bottom:4px;font-weight:800}
.ttx{font-size:15px;color:var(--sl);line-height:1.85;margin-bottom:24px;font-style:italic;position:relative;z-index:1;font-weight:400}
.ta{display:flex;align-items:center;gap:14px;position:relative;z-index:1}
.tav{width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,var(--br),var(--bb));display:flex;align-items:center;justify-content:center;font-weight:700;font-size:18px;color:var(--wh);box-shadow:0 4px 15px rgba(192,57,43,.3)}
.tnm{font-weight:600;font-size:15px}.trl{font-size:12px;color:var(--sd);margin-top:2px}.tst{display:flex;gap:2px;color:var(--gd);font-size:13px;margin-top:4px}

.asec{background:url('/about-bg.png') right center/contain no-repeat var(--navy);position:relative}.asec::before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,var(--navy) 50%,rgba(10,25,41,.7) 100%);pointer-events:none}
.agr{display:grid;grid-template-columns:1fr;gap:64px;align-items:center;max-width:700px;position:relative;z-index:1}
.afs{display:flex;flex-direction:column;gap:16px}
.af{display:flex;gap:16px;align-items:flex-start;padding:20px;background:var(--gl);border:1px solid var(--gb);border-radius:var(--r);transition:all .3s}.af:hover{border-color:var(--bbl);background:rgba(255,255,255,.06)}
.afi{width:50px;height:50px;border-radius:14px;flex-shrink:0;background:linear-gradient(135deg,var(--bb),var(--bbl));display:flex;align-items:center;justify-content:center;font-size:22px;box-shadow:0 4px 15px rgba(44,95,124,.3)}
.aft{font-weight:600;font-size:15px;margin-bottom:4px}.afd{font-size:13px;color:var(--sl);line-height:1.6}
.avis{position:relative;height:500px;border-radius:24px;overflow:hidden;background:url('/about-bg.png') center/cover no-repeat;border:1px solid rgba(44,95,124,.15);display:flex;align-items:flex-end;justify-content:center;flex-direction:column;gap:12px;box-shadow:0 8px 40px rgba(0,0,0,.15)}.avis::before{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,25,41,.2) 0%,rgba(10,25,41,.75) 100%)}

.ctasec{padding:120px 48px;text-align:center;position:relative;overflow:hidden;background:linear-gradient(180deg,var(--navy) 0%,var(--nl) 50%,var(--navy) 100%)}
.ctaorb{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(192,57,43,.1) 0%,transparent 65%);filter:blur(60px);pointer-events:none}

.ft{padding:64px 48px 28px;border-top:1px solid var(--gb);background:var(--navy)}
.ftc{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:48px;margin-bottom:48px}
.ftb{max-width:320px}.ftbd{font-size:13px;color:var(--sd);line-height:1.7;margin-top:14px}
.ftct{font-weight:600;font-size:12px;margin-bottom:18px;text-transform:uppercase;letter-spacing:1.5px}
.ftl{display:block;color:var(--sd);text-decoration:none;font-size:13px;margin-bottom:10px;transition:color .3s}.ftl:hover{color:var(--wh)}
.ftbt{border-top:1px solid var(--gb);padding-top:24px;display:flex;justify-content:space-between;font-size:11px;color:var(--sd)}
.fta{cursor:pointer;opacity:.25;transition:opacity .3s;user-select:none}.fta:hover{opacity:.6}
.waf{position:fixed;bottom:30px;right:30px;z-index:99;width:66px;height:66px;border-radius:50%;background:linear-gradient(135deg,#25D366,#128C7E);display:flex;align-items:center;justify-content:center;box-shadow:0 6px 25px rgba(37,211,102,.45);cursor:pointer;transition:all .3s;text-decoration:none;color:white;animation:fwa 3s ease-in-out infinite}.waf:hover{transform:scale(1.12);box-shadow:0 8px 40px rgba(37,211,102,.65)}

/* CRM */
.ao{position:fixed;inset:0;z-index:200;background:var(--navy);overflow-y:auto}
.alb{position:fixed;inset:0;z-index:200;background:rgba(10,25,41,.96);backdrop-filter:blur(24px);display:flex;align-items:center;justify-content:center}
.alx{background:var(--nl);border:1px solid var(--gb);border-radius:24px;padding:52px;width:420px;max-width:92vw;box-shadow:var(--sx)}
.alt{font-size:24px;font-weight:700;margin-bottom:8px;text-align:center}
.als{font-size:14px;color:var(--sd);text-align:center;margin-bottom:32px}
.ai{width:100%;padding:14px 18px;border-radius:12px;border:1px solid var(--gb);background:var(--gl);color:var(--wh);font-size:15px;outline:none;transition:border-color .3s;font-family:var(--f)}.ai:focus{border-color:var(--bbl)}.ai::placeholder{color:var(--sd)}
.abt{width:100%;padding:14px;border-radius:12px;border:none;background:linear-gradient(135deg,var(--bb),var(--bbl));color:var(--wh);font-size:15px;font-weight:600;cursor:pointer;transition:all .3s;margin-top:16px;font-family:var(--f)}.abt:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(44,95,124,.4)}
.abr{background:linear-gradient(135deg,var(--br),var(--brl))}.abr:hover{box-shadow:0 8px 25px rgba(192,57,43,.4)}
.asd{position:fixed;left:0;top:0;bottom:0;width:260px;background:var(--nl);border-right:1px solid var(--gb);padding:28px 0;z-index:201;display:flex;flex-direction:column}
.aslg{padding:0 24px 24px;border-bottom:1px solid var(--gb);margin-bottom:16px}
.ani{display:flex;align-items:center;gap:12px;padding:13px 24px;color:var(--sl);font-size:14px;font-weight:500;cursor:pointer;transition:all .3s;border-left:3px solid transparent}.ani:hover{color:var(--wh);background:rgba(255,255,255,.03)}.ani.act{color:var(--wh);background:rgba(44,95,124,.12);border-left-color:var(--bbl)}
.amn{margin-left:260px;padding:36px;min-height:100vh}
.ahd{display:flex;justify-content:space-between;align-items:center;margin-bottom:36px}
.apt{font-size:24px;font-weight:700}
.acs{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;margin-bottom:32px}
.asc{background:var(--gl);border:1px solid var(--gb);border-radius:var(--r);padding:24px;transition:all .3s}.asc:hover{border-color:var(--bbl)}
.ascl{font-size:11px;color:var(--sd);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;font-weight:600}
.ascv{font-size:30px;font-weight:700}
.cb{color:var(--bbg)}.cr{color:var(--brl)}.cg{color:var(--gd)}.cgr{color:#2ecc71}
.atw{background:var(--gl);border:1px solid var(--gb);border-radius:var(--r);overflow:hidden}
.ath{display:flex;justify-content:space-between;align-items:center;padding:20px 24px;border-bottom:1px solid var(--gb)}
.attl{font-weight:600;font-size:15px}
.atb{width:100%;border-collapse:collapse}
.atb th{text-align:left;padding:12px 24px;font-size:11px;color:var(--sd);text-transform:uppercase;letter-spacing:1px;font-weight:600;border-bottom:1px solid var(--gb);background:rgba(0,0,0,.15)}
.atb td{padding:14px 24px;font-size:13px;border-bottom:1px solid rgba(255,255,255,.03);color:var(--sl)}
.atb tr:hover td{background:rgba(255,255,255,.02)}
.bdg{display:inline-block;padding:4px 12px;border-radius:100px;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.5px}
.bbl{background:rgba(44,95,124,.2);color:var(--bbg)}.bbr{background:rgba(192,57,43,.2);color:var(--brl)}.bbg{background:rgba(39,174,96,.2);color:#2ecc71}.bby{background:rgba(212,168,83,.2);color:var(--gd)}
.afg{margin-bottom:18px}.afl{display:block;font-size:13px;color:var(--sl);margin-bottom:6px;font-weight:500}
.asel{width:100%;padding:12px 16px;border-radius:10px;border:1px solid var(--gb);background:var(--navy);color:var(--wh);font-size:14px;outline:none;font-family:var(--f)}
.ata{width:100%;padding:12px 16px;border-radius:10px;border:1px solid var(--gb);background:var(--gl);color:var(--wh);font-size:14px;outline:none;resize:vertical;min-height:80px;font-family:var(--f)}
.amb{position:fixed;inset:0;background:rgba(0,0,0,.65);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;z-index:300}
.aml{background:var(--nl);border:1px solid var(--gb);border-radius:20px;padding:36px;width:520px;max-width:92vw;max-height:85vh;overflow-y:auto;box-shadow:var(--sx)}
.amlt{font-size:20px;font-weight:700;margin-bottom:24px}
.amla{display:flex;gap:12px;margin-top:20px}.amla .abt{width:auto;padding:12px 28px}
.ppb{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.ppc{background:var(--gl);border:1px solid var(--gb);border-radius:var(--r);padding:16px;min-height:280px}
.ppch{font-size:11px;text-transform:uppercase;letter-spacing:1px;font-weight:600;margin-bottom:14px;padding-bottom:12px;border-bottom:1px solid var(--gb);display:flex;justify-content:space-between;align-items:center}
.ppn{width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700}
.ppcd{background:rgba(0,0,0,.2);border:1px solid var(--gb);border-radius:12px;padding:12px;margin-bottom:8px;cursor:pointer;transition:all .3s}.ppcd:hover{border-color:var(--bbl);transform:translateY(-2px)}
.ppcn{font-weight:600;font-size:13px;margin-bottom:3px;color:var(--wh)}.ppci{font-size:11px;color:var(--sd)}.ppcv{font-size:12px;color:var(--gd);font-weight:600;margin-top:4px}
@media(max-width:1100px){.sg{grid-template-columns:repeat(2,1fr)}.agr{grid-template-columns:1fr}.ppb{grid-template-columns:repeat(2,1fr)}.stats-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:768px){.nav{padding:12px 20px}.navl{display:none}.hero{padding:100px 20px 60px}.sec{padding:80px 20px}.stats-section{padding:60px 20px}.stats-grid{grid-template-columns:1fr 1fr;gap:16px}.stat-num{font-size:36px}.sg{grid-template-columns:1fr}.tc{width:320px}.asd{display:none}.amn{margin-left:0}.ppb{grid-template-columns:1fr}.ft{padding:40px 20px 20px}.hlf{display:none}}
`;

export default function App() {
  const [scrolled,setScrolled]=useState(false);
  const [showAdmin,setShowAdmin]=useState(false);
  const [adminAuth,setAdminAuth]=useState(false);
  const [adminPwd,setAdminPwd]=useState("");
  const [adminErr,setAdminErr]=useState("");
  const [adminPage,setAdminPage]=useState("dashboard");
  const [crmData,setCrmData]=useState(getStoredCRM);
  const [modal,setModal]=useState(null);
  const [formData,setFormData]=useState({});
  const tcr=useRef(0);const ttr=useRef(null);

  const trigA=()=>{tcr.current++;clearTimeout(ttr.current);ttr.current=setTimeout(()=>{tcr.current=0;},800);if(tcr.current>=3){tcr.current=0;setShowAdmin(true);}};
  const logA=()=>{if(adminPwd===AP){setAdminAuth(true);setAdminErr("");}else setAdminErr("Senha incorreta");};
  const addR=(t,r)=>{const id=Date.now().toString(36)+Math.random().toString(36).slice(2,6);setCrmData(p=>({...p,[t]:[...p[t],{...r,id,createdAt:new Date().toISOString()}]}));setModal(null);setFormData({});};
  const delR=(t,id)=>setCrmData(p=>({...p,[t]:p[t].filter(r=>r.id!==id)}));
  const updR=(t,id,u)=>setCrmData(p=>({...p,[t]:p[t].map(r=>r.id===id?{...r,...u}:r)}));

  if(showAdmin&&!adminAuth)return(<><style>{css}</style><div className="alb"><div className="alx">
    <div style={{textAlign:"center",marginBottom:24}}><Logo size={48}/></div>
    <div className="alt">Área Restrita</div><div className="als">Painel CRM — José Neto</div>
    <input className="ai" type="password" placeholder="Senha de acesso" value={adminPwd} onChange={e=>setAdminPwd(e.target.value)} onKeyDown={e=>e.key==="Enter"&&logA()}/>
    {adminErr&&<div style={{color:"var(--brl)",fontSize:13,marginTop:8}}>{adminErr}</div>}
    <button className="abt" onClick={logA}>Acessar Painel</button>
    <button className="abt abr" style={{marginTop:8}} onClick={()=>{setShowAdmin(false);setAdminPwd("");setAdminErr("");}}>Voltar ao Site</button>
  </div></div></>);

  if(showAdmin&&adminAuth)return(<><style>{css}</style><CRM crmData={crmData} adminPage={adminPage} setAdminPage={setAdminPage} onClose={()=>{setShowAdmin(false);setAdminAuth(false);setAdminPwd("");}} addR={addR} delR={delR} updR={updR} modal={modal} setModal={setModal} fd={formData} setFD={setFormData}/></>);

  const td=[...TESTIMONIALS,...TESTIMONIALS,...TESTIMONIALS,...TESTIMONIALS];
  const twRef=useRef(null);
  useEffect(()=>{
    const el=twRef.current;if(!el)return;
    let raf,dragging=false,startX,scrollL,userInt=false,timer;
    const speed=0.6;
    const auto=()=>{if(!userInt&&el){el.scrollLeft+=speed;if(el.scrollLeft>=el.scrollWidth/2)el.scrollLeft=0;}raf=requestAnimationFrame(auto);};
    raf=requestAnimationFrame(auto);
    const resetAuto=()=>{userInt=true;clearTimeout(timer);timer=setTimeout(()=>{userInt=false;},3000);};
    const onDown=e=>{dragging=true;startX=(e.pageX||e.touches?.[0]?.pageX)-el.offsetLeft;scrollL=el.scrollLeft;el.querySelector('.ttr')?.classList.add('dragging');resetAuto();};
    const onMove=e=>{if(!dragging)return;e.preventDefault();const x=(e.pageX||e.touches?.[0]?.pageX)-el.offsetLeft;el.scrollLeft=scrollL-(x-startX);};
    const onUp=()=>{dragging=false;el.querySelector('.ttr')?.classList.remove('dragging');};
    el.addEventListener('mousedown',onDown);el.addEventListener('mousemove',onMove);el.addEventListener('mouseup',onUp);el.addEventListener('mouseleave',onUp);
    el.addEventListener('touchstart',onDown,{passive:true});el.addEventListener('touchmove',onMove,{passive:false});el.addEventListener('touchend',onUp);
    el.addEventListener('wheel',resetAuto,{passive:true});
    return()=>{cancelAnimationFrame(raf);clearTimeout(timer);el.removeEventListener('mousedown',onDown);el.removeEventListener('mousemove',onMove);el.removeEventListener('mouseup',onUp);el.removeEventListener('mouseleave',onUp);el.removeEventListener('touchstart',onDown);el.removeEventListener('touchmove',onMove);el.removeEventListener('touchend',onUp);el.removeEventListener('wheel',resetAuto);};
  },[]);

  return(<><style>{css}</style><div className="noise"/>
    <nav className={`nav ${scrolled?"scr":""}`}><Logo size={40} dark/><div className="navl"><a href="#servicos">Serviços</a><a href="#depoimentos">Depoimentos</a><a href="#quemsomos">Quem Somos</a><a href={WL} target="_blank" rel="noopener" className="ncta"><WI s={18}/> Orçamento</a></div></nav>

    <section className="hero">
      <video autoPlay muted loop playsInline src={HVID} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",zIndex:0}}/>
      <div className="hero-overlay"/>
      
      <div className="hc">
        <div className="hb fu"><span className="hbd"/>Mais de 20 anos de excelência</div>
        <h1 className="fu fd1">Especialistas em<br/><span className="ar">Bombas</span> e Equipamentos<br/><span className="ablu">Hidráulicos</span></h1>
        <p className="hsub fu fd2">Manutenção preventiva, recuperação de bombas de palheta e assistência técnica com atendimento 24h em todo o Brasil.</p>
        <div className="ha fu fd3"><a href={WL} target="_blank" rel="noopener" className="bp"><WI s={22}/> Falar com Especialista</a><a href="#servicos" className="bgh">Nossos Serviços →</a></div>
      </div>
    </section>

    {/* SEÇÃO 2 - VIBRANTE */}
    <section className="stats-section">
      <div className="stats-inner">
        <div className="stats-header">
          <h2>Números que Falam por Nós</h2>
          <p>Resultados construídos com dedicação e excelência técnica ao longo de duas décadas</p>
        </div>
        <div className="stats-grid">
          {STATS.map((s,i)=>(<div key={i} className="stat-card">
            <div className="stat-num">{s.n}</div>
            <div className="stat-lbl">{s.l}</div>
            <div className="stat-line"/>
          </div>))}
        </div>
      </div>
    </section>

    <section id="servicos" className="sec svcs">
      <div className="slbl"><span className="sln"/> Nossos Serviços</div>
      <h2 className="stt">Soluções Hidráulicas<br/>de Alta Performance</h2>
      <p className="ssb">Da manutenção preventiva à recuperação completa. Bombas de palheta, cilindros, unidades de potência e muito mais.</p>
      <div className="sg">{SERVICES.map((s,i)=>(<div key={i} className="sc"><div className="sct" style={s.img?{backgroundImage:`url(${s.img})`}:{}}>{!s.img&&<><div className="sctp"/><span className="sci">{s.icon}</span></>}</div><div className="scb"><div className="sctt">{s.title}</div><div className="scd">{s.desc}</div><a href={WL} target="_blank" rel="noopener" className="sc-cta">Solicitar orçamento →</a></div><div className="sca"/></div>))}</div>
    </section>

    <section id="depoimentos" className="tsec">
      <div className="thdr"><div className="slbl"><span className="sln"/> Depoimentos</div><h2 className="stt">O Que Nossos Clientes Dizem</h2><p className="ssb">Confiança construída em mais de duas décadas de excelência técnica.</p></div>
      <div className="ttw" ref={twRef}><div className="ttr">{td.map((t,i)=>(<div key={i} className="tc"><div className="tq">"</div><div className="ttx">{t.text}</div><div className="ta"><div className="tav">{t.name[0]}</div><div><div className="tnm">{t.name}</div><div className="trl">{t.role}</div><div className="tst">★★★★★</div></div></div></div>))}</div></div>
    </section>

    <section id="quemsomos" className="sec asec">
      <div className="agr">
        <div>
          <div className="slbl"><span className="sln"/> Quem Somos</div>
          <h2 className="stt">Tradição e Tecnologia a Serviço da Sua Operação</h2>
          <p className="ssb" style={{marginBottom:28}}>Com mais de duas décadas, a J&J é referência nacional em manutenção e recuperação de sistemas hidráulicos.</p>
          <div className="afs">{[{i:"🕐",t:"Atendimento 24 Horas",d:"Suporte emergencial a qualquer hora, 7 dias por semana."},{i:"🇧🇷",t:"Atuação Nacional",d:"Cobertura em todo o território brasileiro."},{i:"🏆",t:"Equipe Qualificada",d:"Técnicos com certificações atualizadas."},{i:"✅",t:"+1.000 Serviços",d:"Excelência comprovada e satisfação total."}].map((f,i)=>(<div key={i} className="af"><div className="afi">{f.i}</div><div><div className="aft">{f.t}</div><div className="afd">{f.d}</div></div></div>))}</div>
        </div>
      </div>
    </section>

    <section className="ctasec">
      <div className="ctaorb"/>
      <div className="slbl" style={{justifyContent:"center"}}><span className="sln"/> Vamos Conversar <span className="sln"/></div>
      <h2 className="stt" style={{textAlign:"center"}}>Pronto Para Resolver Seu<br/>Problema Hidráulico?</h2>
      <p className="ssb" style={{textAlign:"center",maxWidth:600,margin:"0 auto 44px"}}>Fale com José Neto e receba um orçamento personalizado.</p>
      <a href={WL} target="_blank" rel="noopener" className="bp" style={{fontSize:18,padding:"20px 48px"}}><WI s={24}/> Solicitar Orçamento</a>
    </section>

    <section style={{padding:"60px 48px",textAlign:"center",background:"linear-gradient(180deg,var(--navy),var(--nl))",position:"relative"}}>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:16}}>
        <div style={{fontSize:32}}>📸</div>
        <div style={{fontSize:22,fontWeight:700}}>Siga a J&J no Instagram</div>
        <div style={{fontSize:14,color:"var(--sl)",maxWidth:400}}>Acompanhe nossos serviços, bastidores e dicas de manutenção hidráulica</div>
        <a href={INSTA} target="_blank" rel="noopener" style={{display:"inline-flex",alignItems:"center",gap:10,background:"linear-gradient(135deg,#833AB4,#E1306C,#F77737)",color:"#fff",padding:"14px 32px",borderRadius:12,textDecoration:"none",fontWeight:600,fontSize:15,marginTop:8,boxShadow:"0 6px 25px rgba(225,48,108,.3)",transition:"all .3s",fontFamily:"var(--f)"}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          @jejhidraulica
        </a>
      </div>
    </section>
    <footer className="ft">
      <div className="ftc">
        <div className="ftb"><Logo size={38}/><div className="ftbd">Especialistas em manutenção preventiva, recuperação de bombas de palheta e sistemas hidráulicos. Atendimento 24h.</div></div>
        <div><div className="ftct">Serviços</div>{["Manutenção Preventiva","Recuperação de Bombas","Cilindros Hidráulicos","Consultoria Técnica"].map(s=><a key={s} href="#servicos" className="ftl">{s}</a>)}</div>
        <div><div className="ftct">Contato</div><a href={WL} target="_blank" rel="noopener" className="ftl">📱 (15) 99833-8067</a><a href={WL} target="_blank" rel="noopener" className="ftl">👤 José Neto — Comercial</a><span className="ftl">🇧🇷 Nacional</span><a href={INSTA} target="_blank" rel="noopener" className="ftl">📸 @jejhidraulica</a></div>
      </div>
      <div className="ftbt"><span className="fta" onClick={trigA}>© 2026 J&J Bombas e Equipamentos Hidráulicos</span><span>Todos os direitos reservados</span></div>
    </footer>
    <a href={WL} target="_blank" rel="noopener" className="waf"><WI s={32}/></a>
  </>);
}

function CRM({crmData,adminPage,setAdminPage,onClose,addR,delR,updR,modal,setModal,fd,setFD}){
  const ni=[{id:"dashboard",l:"📊 Dashboard"},{id:"clients",l:"👥 Clientes"},{id:"services",l:"🔧 Serviços"},{id:"budgets",l:"📋 Orçamentos"},{id:"prospects",l:"🎯 Prospecção"}];
  const sts=["lead","contato","negociacao","fechado"];
  const stl={lead:"Lead",contato:"Contato Feito",negociacao:"Em Negociação",fechado:"Fechado ✅"};
  const stc={lead:"var(--sl)",contato:"var(--bbg)",negociacao:"var(--gd)",fechado:"#2ecc71"};
  const tls={dashboard:"Dashboard",clients:"Clientes",services:"Serviços",budgets:"Orçamentos",prospects:"Pipeline"};
  const aa=[...crmData.clients.map(c=>({type:"Cliente",desc:c.name,date:c.createdAt})),...crmData.services.map(s=>({type:"Serviço",desc:s.description,date:s.createdAt})),...crmData.budgets.map(b=>({type:"Orçamento",desc:`R$ ${b.value} — ${b.clientName||""}`,date:b.createdAt})),...crmData.prospects.map(p=>({type:"Prospect",desc:p.name,date:p.createdAt}))].sort((a,b)=>new Date(b.date)-new Date(a.date)).slice(0,10);
  const Em=({m})=><tr><td colSpan={8} style={{textAlign:"center",padding:40,color:"var(--sd)"}}>{m}</td></tr>;
  const FF=({k,label,type="text"})=>(<div className="afg"><label className="afl">{label}</label>{type==="textarea"?<textarea className="ata" value={fd[k]||""} onChange={e=>setFD(p=>({...p,[k]:e.target.value}))} placeholder={label}/>:<input className="ai" type={type} value={fd[k]||""} onChange={e=>setFD(p=>({...p,[k]:e.target.value}))} placeholder={label}/>}</div>);
  const SF=({k,label,opts})=>(<div className="afg"><label className="afl">{label}</label><select className="asel" value={fd[k]||opts[0]?.v} onChange={e=>setFD(p=>({...p,[k]:e.target.value}))}>{opts.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}</select></div>);
  const CS=()=>(<div className="afg"><label className="afl">Cliente</label><select className="asel" value={fd.clientName||""} onChange={e=>setFD(p=>({...p,clientName:e.target.value}))}><option value="">Selecione</option>{crmData.clients.map(c=><option key={c.id} value={c.name}>{c.name} — {c.company}</option>)}</select></div>);
  const IS=({value,onChange,opts})=><select value={value} onChange={onChange} style={{background:"var(--navy)",color:"var(--wh)",border:"1px solid var(--gb)",borderRadius:6,padding:"4px 8px",fontSize:12,fontFamily:"var(--f)"}}>{opts.map(o=><option key={o.v} value={o.v}>{o.l}</option>)}</select>;
  const Del=({onClick})=><button onClick={onClick} style={{background:"none",border:"none",color:"var(--brl)",cursor:"pointer",fontSize:12,fontWeight:600}}>Excluir</button>;

  return(<div className="ao">
    <div className="asd"><div className="aslg"><Logo size={34}/><div style={{fontSize:10,color:"var(--brl)",textTransform:"uppercase",letterSpacing:2,fontWeight:600,marginTop:8}}>CRM Interno</div></div>
      {ni.map(n=><div key={n.id} className={`ani ${adminPage===n.id?"act":""}`} onClick={()=>setAdminPage(n.id)}>{n.l}</div>)}
      <div style={{flex:1}}/><div className="ani" onClick={onClose} style={{color:"var(--brl)"}}>← Voltar ao Site</div>
    </div>
    <div className="amn">
      <div className="ahd"><div className="apt">{tls[adminPage]}</div><div style={{fontSize:13,color:"var(--sd)"}}>José Neto • {new Date().toLocaleDateString("pt-BR")}</div></div>

      {adminPage==="dashboard"&&<><div className="acs">{[{l:"Clientes",v:crmData.clients.length,c:"cb"},{l:"Serviços",v:crmData.services.length,c:"cr"},{l:"Orçamentos",v:crmData.budgets.length,c:"cg"},{l:"Prospecção",v:crmData.prospects.length,c:"cgr"}].map((s,i)=><div key={i} className="asc"><div className="ascl">{s.l}</div><div className={`ascv ${s.c}`}>{s.v}</div></div>)}</div>
        <div className="atw"><div className="ath"><span className="attl">Últimas Atividades</span></div><table className="atb"><thead><tr><th>Tipo</th><th>Descrição</th><th>Data</th></tr></thead><tbody>{aa.map((a,i)=><tr key={i}><td><span className={`bdg ${a.type==="Cliente"?"bbl":a.type==="Serviço"?"bbr":a.type==="Orçamento"?"bby":"bbg"}`}>{a.type}</span></td><td>{a.desc}</td><td>{new Date(a.date).toLocaleDateString("pt-BR")}</td></tr>)}{aa.length===0&&<Em m="Nenhuma atividade"/>}</tbody></table></div></>}

      {adminPage==="clients"&&<div className="atw"><div className="ath"><span className="attl">Clientes ({crmData.clients.length})</span><button className="abt" style={{width:"auto",padding:"10px 20px",marginTop:0}} onClick={()=>{setFD({});setModal("client");}}>+ Novo</button></div><table className="atb"><thead><tr><th>Nome</th><th>Empresa</th><th>Tel</th><th>Email</th><th>Cidade</th><th></th></tr></thead><tbody>{crmData.clients.map(c=><tr key={c.id}><td style={{color:"var(--wh)",fontWeight:600}}>{c.name}</td><td>{c.company}</td><td>{c.phone}</td><td>{c.email}</td><td>{c.city}</td><td><Del onClick={()=>delR("clients",c.id)}/></td></tr>)}{crmData.clients.length===0&&<Em m="Nenhum cliente"/>}</tbody></table></div>}

      {adminPage==="services"&&<div className="atw"><div className="ath"><span className="attl">Serviços ({crmData.services.length})</span><button className="abt" style={{width:"auto",padding:"10px 20px",marginTop:0}} onClick={()=>{setFD({status:"pendente"});setModal("service");}}>+ Novo</button></div><table className="atb"><thead><tr><th>Cliente</th><th>Descrição</th><th>Status</th><th>Data</th><th></th></tr></thead><tbody>{crmData.services.map(s=><tr key={s.id}><td style={{color:"var(--wh)",fontWeight:600}}>{s.clientName}</td><td>{s.description}</td><td><IS value={s.status} onChange={e=>updR("services",s.id,{status:e.target.value})} opts={[{v:"pendente",l:"Pendente"},{v:"andamento",l:"Em Andamento"},{v:"concluido",l:"Concluído"}]}/></td><td>{new Date(s.createdAt).toLocaleDateString("pt-BR")}</td><td><Del onClick={()=>delR("services",s.id)}/></td></tr>)}{crmData.services.length===0&&<Em m="Nenhum serviço"/>}</tbody></table></div>}

      {adminPage==="budgets"&&<div className="atw"><div className="ath"><span className="attl">Orçamentos ({crmData.budgets.length})</span><button className="abt" style={{width:"auto",padding:"10px 20px",marginTop:0}} onClick={()=>{setFD({status:"enviado"});setModal("budget");}}>+ Novo</button></div><table className="atb"><thead><tr><th>Cliente</th><th>Descrição</th><th>Valor</th><th>Status</th><th>Data</th><th></th></tr></thead><tbody>{crmData.budgets.map(b=><tr key={b.id}><td style={{color:"var(--wh)",fontWeight:600}}>{b.clientName}</td><td>{b.description}</td><td style={{color:"var(--gd)",fontWeight:600}}>R$ {b.value}</td><td><IS value={b.status} onChange={e=>updR("budgets",b.id,{status:e.target.value})} opts={[{v:"enviado",l:"Enviado"},{v:"aprovado",l:"Aprovado"},{v:"recusado",l:"Recusado"}]}/></td><td>{new Date(b.createdAt).toLocaleDateString("pt-BR")}</td><td><Del onClick={()=>delR("budgets",b.id)}/></td></tr>)}{crmData.budgets.length===0&&<Em m="Nenhum orçamento"/>}</tbody></table></div>}

      {adminPage==="prospects"&&<><div style={{marginBottom:20,display:"flex",justifyContent:"flex-end"}}><button className="abt" style={{width:"auto",padding:"10px 20px",marginTop:0}} onClick={()=>{setFD({stage:"lead"});setModal("prospect");}}>+ Novo</button></div>
        <div className="ppb">{sts.map(st=>{const it=crmData.prospects.filter(p=>p.stage===st);return(<div key={st} className="ppc"><div className="ppch"><span style={{color:stc[st]}}>{stl[st]}</span><span className="ppn" style={{background:stc[st]+"22",color:stc[st]}}>{it.length}</span></div>{it.map(p=>(<div key={p.id} className="ppcd" onClick={()=>{const nx=sts[Math.min(sts.indexOf(p.stage)+1,sts.length-1)];if(nx!==p.stage)updR("prospects",p.id,{stage:nx});}}><div className="ppcn">{p.name}</div><div className="ppci">{p.company}</div>{p.value&&<div className="ppcv">R$ {p.value}</div>}<div style={{marginTop:6,display:"flex",gap:6}}><Del onClick={e=>{e.stopPropagation();delR("prospects",p.id);}}/><span style={{fontSize:10,color:"var(--sd)"}}>Clique → avançar</span></div></div>))}</div>);})}</div></>}
    </div>

    {modal==="client"&&<div className="amb" onClick={()=>setModal(null)}><div className="aml" onClick={e=>e.stopPropagation()}><div className="amlt">Novo Cliente</div><FF k="name" label="Nome"/><FF k="company" label="Empresa"/><FF k="phone" label="Telefone"/><FF k="email" label="E-mail" type="email"/><FF k="city" label="Cidade/UF"/><FF k="notes" label="Obs." type="textarea"/><div className="amla"><button className="abt" onClick={()=>addR("clients",fd)}>Salvar</button><button className="abt abr" onClick={()=>setModal(null)}>Cancelar</button></div></div></div>}
    {modal==="service"&&<div className="amb" onClick={()=>setModal(null)}><div className="aml" onClick={e=>e.stopPropagation()}><div className="amlt">Novo Serviço</div><CS/><FF k="description" label="Descrição" type="textarea"/><SF k="status" label="Status" opts={[{v:"pendente",l:"Pendente"},{v:"andamento",l:"Em Andamento"},{v:"concluido",l:"Concluído"}]}/><div className="amla"><button className="abt" onClick={()=>addR("services",fd)}>Salvar</button><button className="abt abr" onClick={()=>setModal(null)}>Cancelar</button></div></div></div>}
    {modal==="budget"&&<div className="amb" onClick={()=>setModal(null)}><div className="aml" onClick={e=>e.stopPropagation()}><div className="amlt">Novo Orçamento</div><CS/><FF k="description" label="Descrição" type="textarea"/><FF k="value" label="Valor (R$)"/><SF k="status" label="Status" opts={[{v:"enviado",l:"Enviado"},{v:"aprovado",l:"Aprovado"},{v:"recusado",l:"Recusado"}]}/><div className="amla"><button className="abt" onClick={()=>addR("budgets",fd)}>Salvar</button><button className="abt abr" onClick={()=>setModal(null)}>Cancelar</button></div></div></div>}
    {modal==="prospect"&&<div className="amb" onClick={()=>setModal(null)}><div className="aml" onClick={e=>e.stopPropagation()}><div className="amlt">Novo Prospect</div><FF k="name" label="Nome"/><FF k="company" label="Empresa"/><FF k="phone" label="Tel"/><FF k="value" label="Valor Est. (R$)"/><SF k="stage" label="Estágio" opts={sts.map(s=>({v:s,l:stl[s]}))}/><FF k="notes" label="Obs." type="textarea"/><div className="amla"><button className="abt" onClick={()=>addR("prospects",fd)}>Salvar</button><button className="abt abr" onClick={()=>setModal(null)}>Cancelar</button></div></div></div>}
  </div>);
}
