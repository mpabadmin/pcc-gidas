'use strict';
const W_LIST = [50, 60, 70, 80, 90, 100, 120];
const tabBtn = (lb, r, on, rep) => `<button class="${on ? 'on' : ''}" data-act="go"${rep ? ' data-rep="1"' : ''} data-r="${r}">${esc(lb)}</button>`;
const ul = a => '<ul>' + a.map(x => '<li>' + esc(x) + '</li>').join('') + '</ul>';
const drugById = id => (E.vaistai || []).find(x => x.id === id);
const skillById = id => (E.igudziai || []).find(x => String(x.id) === String(id));
const fazeById = id => (E.fazes || []).find(x => x.id === id);
const ratings = () => LS.get('pcc-ivert', {});
const progBar = (n, tot) => `<div class="prog"><i style="width:${tot ? Math.round(n / tot * 100) : 0}%"></i></div>`;
// Paciento svoris: wNow() – nurodytas (0 – nenurodytas), wCalc() – skaičiavimui (nenurodžius – 80 kg)
const wNow = () => { const w = +LS.get('pcc-svoris', 0); return w > 0 ? w : 0; };
const wCalc = () => wNow() || 80;
const wChips = w => '<div class="chips" role="group" aria-label="Paciento svoris">' + W_LIST.map(x => `<button class="${x === w ? 'on' : ''}" data-act="w" data-w="${x}" aria-pressed="${x === w}">${x}</button>`).join('') + '</div>' +
  (w ? '' : '<p class="muted mt0">Svoris nenurodytas – dozės skaičiuojamos 80 kg (numatytas).</p>');
const rateBadge = (R, id) => R[id] ? `<span class="tag ${R[id] >= 3 ? 'grn' : 'amb'}">${R[id]} / 4</span>` : '';
const listDone = id => {
  const L = (E.sarasai || {})[id]; if (!L) return [0, 0];
  const d = ckAll()[id] || []; let n = 0, t = 0;
  (L.items || []).forEach((it, i) => { if (it.h || !ok(it.g)) return; t++; if (d.indexOf(i) >= 0) n++; });
  return [n, t];
};
const listRow = id => {
  const L = (E.sarasai || {})[id]; if (!L) return '';
  const [n, t] = listDone(id);
  return row(listRoute(id), L.title, '', n ? `<span class="tag ${n === t ? 'grn' : 'amb'}">${n} / ${t}</span>` : '');
};
function doseShort(v, w) {
  const d = (v.dozes || [])[0]; if (!d) return v.klase || '';
  return d.k + ': ' + (d.c ? calcD(d, w) + ' (' + w + ' kg)' + (d.c.alt ? ' · ' + d.c.alt : '') : d.d);
}
// Skaičiuoklės rezultatas: jei gido tekste dozė – riba („iki 3 mg/kg“), rodoma „iki …“, ne kaip skiriama dozė
function calcD(d, w) { return (/^\s*(iki|ne daugiau|maks)/i.test(d.d || '') ? 'iki ' : '') + calc(d.c, w); }
function tocHtml(html) {
  const hs = []; let i = 0;
  const out = html.replace(/<h3>([\s\S]*?)<\/h3>/g, (m, t) => { const id = 'h' + (i++); hs.push([id, strip(t)]); return `<h3 id="${id}">${t}</h3>`; });
  if (hs.length < 3) return html;
  return '<div class="toc">' + hs.map(([id, t]) => `<button data-act="toc" data-t="${id}">${esc(t)}</button>`).join('') + '</div>' + out;
}
const videos = a => (a || []).length ? '<h2>Vaizdo įrašai</h2>' + a.map(videoHtml).join('') : '';
const brand = () => '<div class="brand"><img class="lg-d" src="img/logo-balt.png" alt="LŠS Vilniaus 1040 medicinos šaulių kuopa"><img class="lg-l" src="img/logo-juod.png" alt="LŠS Vilniaus 1040 medicinos šaulių kuopa"><span><b>PCC gidas</b><br>Ilgalaikė sužeistojo priežiūra lauke</span><button class="ghelp" data-g="open" aria-label="Kaip naudotis"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18Z"/><path d="M9.5 9.3a2.6 2.6 0 0 1 5 .9c0 1.7-2.5 2.3-2.5 3.8"/><path d="M12 17h.01"/></svg><span>Kaip naudotis</span></button></div>';
const installed = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone;
// Plytelių piktogramos ir plytelė: paantraštė rodoma tik kai yra būsena (užpildyta, skaičiai) – be pasikartojančių aprašymų
const ic = d => `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICO = {
  scan: ic('<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><path d="M8 9h8M8 12h8M8 15h5"/>'),
  mist: ic('<rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="11" r="2"/><path d="M6 16c.6-1.4 1.5-2 2.5-2s1.9.6 2.5 2M14 10h4M14 14h3"/>'),
  sitrep: ic('<path d="M9 3h6v3H9z"/><path d="M8 4.5H6a1 1 0 0 0-1 1V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5.5a1 1 0 0 0-1-1h-2M9 11h6M9 15h4"/>'),
  contrep: ic('<circle cx="12" cy="12" r="7"/><path d="M12 2v5M12 17v5M2 12h5M17 12h5"/>'),
  salute: ic('<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
  gks: ic('<circle cx="12" cy="12" r="9"/><path d="M8.5 14.5c1 1.2 2.2 1.8 3.5 1.8s2.5-.6 3.5-1.8M9 9.5h.01M15 9.5h.01"/>'),
  mascal: ic('<circle cx="7" cy="7" r="2.5"/><circle cx="17" cy="7" r="2.5"/><path d="M3 20c0-3 2-5 4-5s4 2 4 5M13 20c0-3 2-5 4-5s4 2 4 5"/>'),
  vz: ic('<path d="M10.5 4.5a5 5 0 0 1 7 7l-6 6a5 5 0 0 1-7-7z"/><path d="M8 8l8 8"/>'),
  burn: ic('<path d="M12 3c2 3 5 5 5 9a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-8z"/>'),
  drop: ic('<path d="M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11z"/>'),
  bag: ic('<path d="M7 3h10v9a5 5 0 0 1-10 0z"/><path d="M7 7h10M12 17v4"/>'),
  syr: ic('<path d="M14 4l6 6M17 7l-9 9-3.5 1 1-3.5 9-9M4 20l1.5-1.5M10 9l2 2M8 11l2 2"/>'),
  scen: ic('<path d="M8 5v14l11-7z"/>'),
  cards: ic('<rect x="3" y="7" width="13" height="13" rx="2"/><path d="M8 4h11a2 2 0 0 1 2 2v11"/>'),
  exam: ic('<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M9 2h6"/>'),
  eval: ic('<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V2.8h6V4M9 12l2 2 4-4"/>'),
  vit: ic('<path d="M3 12h4l3-8 4 16 3-8h4"/>'),
  care: ic('<rect x="4" y="4" width="16" height="17" rx="2"/><path d="M8 2v4M16 2v4M4 10h16M8 14h2M12 14h2M8 17h2"/>'),
  clock: ic('<circle cx="12" cy="12" r="9"/><path d="M12 3v2M21 12h-2M12 21v-2M3 12h2M12 12V8M12 12l3 2"/><circle cx="12" cy="12" r="5.5" stroke-dasharray="1.5 2.5"/>'),
  tele: ic('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>'),
  tq: ic('<rect x="3" y="9" width="18" height="6" rx="2"/><path d="M12 9V4M9 4h6M8 12h.01M16 12h.01"/>'),
  evac: ic('<path d="M3 17h13l3-5h2v5h-2M3 17V9h9v8M7 9V6h4M6.5 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM16.5 20a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>'),
  qr: ic('<rect x="4" y="4" width="6" height="6"/><rect x="14" y="4" width="6" height="6"/><rect x="4" y="14" width="6" height="6"/><path d="M14 14h2v2h-2zM18 18h2v2h-2zM14 18h2M18 14h2"/>'),
  qrin: ic('<path d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4M8 12h8"/>')
};
// Nukentėjusiojo kortelė (DD1380) ir popierinės kortelės nuskaitymas – atskiros plytelės
const cardTile = (href, cls) => { const st = stOf(() => MC); return tile(href, ICO.mist, 'Nukentėju\u00adsiojo kortelė', 'DD1380' + (st ? ' · ' + st : ''), 'Nukentėjusiojo kortelė DD1380', cls || 'wr'); };
const scanTile = cls => tile('#/skenuoti', ICO.scan, 'Nuskaityti kortelę', 'popierinė DD1380', 'Nuskaityti popierinę kortelę DD1380', cls || 'wr');
const tile = (href, ti, b, sm, lb, cls) => `<a class="tool${cls ? ' ' + cls : ''}" href="${href}" aria-label="${esc((lb || b) + (sm ? ': ' + sm : ''))}"><span class="ti">${ti}</span><b>${esc(b)}</b>${sm ? '<small>' + esc(sm) + '</small>' : ''}</a>`;
const stOf = m => { try { return m().status(); } catch (e) { return ''; } }; // tools.js gali būti neįkeltas
const installRow = () => installed() ? '' : row('#/idiegimas', 'Įdiegti programėlę', 'Veikia be interneto');

// Įgūdžių grupės: E.igudziuGrupes [[raidė, pavadinimas], …] arba – žinomi March grupių pavadinimai / grupės kodas (tvarka – kaip duomenyse)
const GRUPES0 = { K: 'Principai, stebėjimas, dokumentai', G: 'Gaivinimas ir skysčiai', A: 'Kvėpavimo takai ir ventiliacija', S: 'Skausmas ir sedacija', N: 'Slauga', W: 'Žaizdos, galūnės, infekcija', Y: 'Ypatingos būklės', E: 'Telekonsultacija ir evakuacija' };
const grupes = () => { if (Array.isArray(E.igudziuGrupes) && E.igudziuGrupes.length) return E.igudziuGrupes.map(g => Array.isArray(g) ? g : [g.id, g.pav]); const o = []; (E.igudziai || []).forEach(s => { if (s.grupe != null && !o.some(g => g[0] === s.grupe)) o.push([s.grupe, GRUPES0[s.grupe] || String(s.grupe)]); }); return o; };
const grupesPav = g => (grupes().find(x => x[0] === g) || ['', ''])[1];
const skillOrder = () => { const G = grupes(); return G.reduce((a, [g]) => a.concat((E.igudziai || []).filter(s => s.grupe === g)), []).concat((E.igudziai || []).filter(s => !G.some(g => g[0] === s.grupe))); };
// Fazės spalva: duomenų f.cls arba pagal eilės numerį (f1–f6); užrašas plytelėje – f.zenklas arba f.id
const phCls = f => { const L = E.fazes || [], x = typeof f === 'string' ? L.find(y => y.id === f) : f; if (!x) return ''; return x.cls || 'f' + ((L.indexOf(x) % 6) + 1); };
const phLbl = f => String(f.zenklas || f.id);
const figHtml = f => `<figure class="fig"><a href="${esc(f.src)}" target="_blank" rel="noopener"><img loading="lazy" src="${esc(f.src)}" alt="${esc(f.cap)}" onerror="this.closest('figure').classList.add('noimg')"></a><figcaption>${esc(f.cap)}<small>Iliustracija: Joint Trauma System (Deployed Medicine)${f.orig ? ` · <a href="${esc(f.orig)}" target="_blank" rel="noopener">tccc.org.ua</a>` : ''}</small></figcaption></figure>`;
// „#14“, „#5–#7“ įgūdžių tekstuose – nuorodos į įgūdžius (jei įgūdis yra ir matomas)
const skRefs = t => esc(t).replace(/#(\d{1,2})(?![\d])/g, (m, n) => { const k = skillById(+n); return k && ok(k.lygis) ? `<a href="#/igudis/${n}">#${n}</a>` : m; });
// Įrankiai (būsena rodoma po pavadinimu)
const toolRows = () => typeof MC === 'undefined' ? '' :
  row('#/pacientas', 'Pacientas', MC.status()) + row('#/9line', '9-Line MEDEVAC', NL.status()) + row('#/sitrep', 'SITREP – padėties pranešimas', SR.status()) + ((E.scenarijai || []).length ? row('#/scenarijai', 'Treniruočių scenarijai', SC.status()) : '') +
  (VL.has() ? row('#/vertinimas', 'Vertinimo lapas', VL.status()) : '') + row('#/korteles', 'Dozių kortelės', FC.status());
const lvTag = s => !s.lygis ? '' : isAdv(s.lygis) ? tag(s.lygis) : `<span class="tag grn" title="${LVT[s.lygis] || ''}">${esc(lvName(s.lygis))}</span>`;
const advAny = () => (E.vaistai || []).some(v => isAdv(v.lygis)) || (E.igudziai || []).some(s => isAdv(s.lygis)) || Object.keys(E.sarasai || {}).some(k => ((E.sarasai[k] || {}).items || []).some(it => isAdv(it.g)));
const pcSt = (f, d) => { try { return typeof PC !== 'undefined' ? f() : d || ''; } catch (e) { return d || ''; } };

const V = {
  // v3: viena pradžia – tik piktogramos (fazės, sužeistasis, perdavimas). Sąrašai, vaistai, nustatymai – apatinėje juostoje ir antraštėje.
  home() {
    return brand() + disclaimer() + pcSt(() => PC.homeBanner(), REM.banners()) +
      ((E.fazes || []).length ? '<h2>Fazė</h2>' + V.phaseTiles() : '') +
      '<h2>Sužeistasis</h2>' + V.careTiles() +
      '<h2>Perdavimas</h2>' + V.toolTiles();
  },

  phaseTiles() {
    const L = E.fazes || [];
    if (!L.length) return '';
    const PI = {
      STAB: ['<path d="M3 12h4l2-5 4 10 2-5h6"/>', 'Perėmimas'],
      VAL: ['<path d="M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM12 7v5l3 2"/>', 'Kas valandą'],
      PAROS: ['<path d="M4 5h16v16H4zM4 10h16M9 3v4M15 3v4"/>', 'Paromis'],
      YPAT: ['<path d="M12 3l10 18H2zM12 10v5M12 18h.01"/>', 'Ypatingos'],
      EVAK: ['<path d="M3 4h18M12 4v4M6 12a6 4 0 0 1 6-4h3a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2zM8 19h12M10 15v4M16 15v4M3 10l3 2"/>', 'Evakuacija ir perdavimas']
    };
    return `<div class="phases big n${L.length}">` + L.map(f => { const x = PI[f.id] || ['', f.sub || ''];
      return `<a class="phase ${phCls(f)}" href="#/f/${esc(f.id)}" aria-label="${esc(phLbl(f) + ' – ' + f.pav)}">${x[0] ? '<svg class="pi" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + x[0] + '</svg>' : ''}<b>${esc(phLbl(f))}</b><span>${esc(x[1])}</span></a>`; }).join('') + '</div>';
  },

  // Treniruotė: atsitiktinė situacija, dozių patikra, įsivertinimo lapas, situacijos pagal fazę, pažanga, temos
  train(q) {
    const S = (E.scenarijai || []).filter(s => s && Array.isArray(s.q) && s.q.length && ok(s.lygis)), f = (q && q.t) || '';
    const B = LS.get(TCFG.pre + 'scen', {}) || {};
    const PH = { 'Perėmimas': 'STAB', 'Gaivinimas': 'STAB', 'Kvėpavimas': 'STAB', 'Skausmas': 'VAL', 'Slauga': 'PAROS', 'Žaizdos': 'PAROS', 'Galva': 'YPAT', 'Nudegimai': 'YPAT', 'Suspaudimas': 'YPAT', 'Evakuacija': 'EVAK' };
    const phOf = s => PH[s.tema] || '', F = (E.fazes || []).filter(x => S.some(s => phOf(s) === x.id));
    let due = 0; try { const m = String(FC.status()).match(/Laukia kartoti: (\d+)/); due = m ? +m[1] : 0; } catch (e) {}
    let h = '<h1>Treniruotė</h1><div class="trt">' +
      (S.length ? `<button class="tra" data-act="sc-rand"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16v16H4zM8.5 8.5h.01M15.5 8.5h.01M12 12h.01M8.5 15.5h.01M15.5 15.5h.01"/></svg><span><b>Atsitiktinė situacija</b><br><small>${lt(S.length, ['situacija', 'situacijos', 'situacijų'])}</small></span></button>` : '') +
      `<a class="trd" href="#/korteles"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.5 4.5a5 5 0 0 1 7 7l-6 6a5 5 0 0 1-7-7zM8 8l8 8"/></svg>${due ? '<span class="bdg" aria-label="Laukia kartoti: ' + due + '">' + due + '</span>' : ''}<span><b>Dozių patikra</b><br><small>${esc(stOf(() => FC))}</small></span></a>` +
      (VL.has() ? `<a class="trv" href="#/vertinimas"><span class="ti">${ICO.eval}</span><span class="tx"><b>Įsivertinimo lapas</b><small>Instruktoriui · T / N, K punktai</small></span><span class="ar">›</span></a>` : '') + '</div>';
    if (F.length) h += '<div class="trf" role="group" aria-label="Fazė">' + `<a href="#/treniruote" data-act="go" data-rep="1" data-r="#/treniruote" class="${f ? '' : 'on'}" aria-current="${f ? 'false' : 'true'}"><b>Visos</b><small>${S.length}</small></a>` +
      F.map(x => `<a href="#/treniruote?t=${esc(x.id)}" data-act="go" data-rep="1" data-r="#/treniruote?t=${esc(x.id)}" class="${phCls(x)}${f === x.id ? ' on' : ''}" aria-current="${f === x.id}" aria-label="${esc(x.pav)}"><b>${esc(phLbl(x))}</b><small>${S.filter(s => phOf(s) === x.id).length}</small></a>`).join('') + '</div>';
    h += S.filter(s => !f || phOf(s) === f).map(s => { const b = B[s.id], n = s.q.length;
      return `<a class="scr" href="#/scenarijai/${esc(s.id)}"><i class="${phOf(s) ? phCls(phOf(s)) : ''}"></i><b>${esc(s.pav)}</b>${b != null ? `<span class="tag ${b === n ? 'grn' : 'amb'}">${b} / ${n}</span>` : ''}${lvTag(s)}</a>`; }).join('');
    h += '<h2>Mokymasis</h2>' + row('#/igudziai', 'Mano pažanga', 'Įgūdžių įsivertinimas 1–4') + ((E.temos || []).length ? row('#/temos', 'Temos', 'Medžiaga, įgūdžiai, sąrašai ir vaistai pagal temą') : '');
    return h;
  },

  // Sužeistojo įrankiai (PCC): stebėjimo lapas, skysčiai, vaistai, priežiūra, paros laikrodis, turniketai, evakuacija – dabartiniam pacientui
  careTiles() {
    return '<div class="tools t3">' +
      tile('#/pacientas?t=rod', ICO.vit, 'Rodikliai', pcSt(() => PC.st('rod'))) + tile('#/pacientas?t=sks', ICO.drop, 'Skysčiai', pcSt(() => PC.st('sks'))) +
      tile('#/pacientas?t=vst', ICO.syr, 'Vaistai', pcSt(() => PC.st('vst')), 'Vaistai ir veiksmai') + tile('#/pacientas?t=prz', ICO.care, 'Priežiūra', pcSt(() => PC.st('prz')), 'Priežiūros grafikas') +
      tile('#/laikrodis', ICO.clock, 'Paros laikrodis', pcSt(() => PC.st('clock')), 'Paros priežiūros laikrodis') +
      tile('#/gks', ICO.gks, 'GKS', stOf(() => GK).replace(/^Paskutinė: /, ''), 'GKS skaičiuoklė') + tile('#/turniketai', ICO.tq, 'Turniketai', pcSt(() => PC.st('tq'))) + tile('#/evakuacija', ICO.evac, 'Evakuacija', pcSt(() => PC.st('evac')), 'Pasiruošimas evakuacijai') + '</div>';
  },
  // Perdavimas: telekonsultacija, MIST, 9-Line, SITREP, QR
  toolTiles() {
    return '<div class="tools t3">' +
      cardTile('#/pacientas?t=kortele', 'wr') + scanTile('wr') + tile('#/telekonsultacija', ICO.tele, 'Telekonsult.', pcSt(() => PC.st('tc')), 'Telekonsultacija ir ATMISTER') +
      tile('#/9line', '9', '9-Line', stOf(() => NL), '9-Line MEDEVAC') + tile('#/sitrep', ICO.sitrep, 'SITREP', stOf(() => SR)) +
      tile('#/qr-priimti', ICO.qrin, 'Priimti QR', '', 'Priimti pacientą QR kodu') + '</div>';
  },

  topicCards() {
    const R = ratings();
    return '<div class="tgrid">' + (E.temos || []).map(t => {
      const ids = (t.igudziai || []).filter(id => { const s = skillById(id); return s && ok(s.lygis); });
      const r = ids.filter(id => R[id]).length;
      return `<a class="tcard" href="#/tema/${esc(t.id)}"><span class="tz ${esc(t.cls || '')}">${esc(t.zenklas || '')}</span><b>${esc(t.pav)}</b><small>${esc(t.sub || '')}</small>${ids.length ? '<small class="muted">Įgūdžiai: ' + r + ' / ' + ids.length + '</small>' + progBar(r, ids.length) : ''}</a>`;
    }).join('') + '</div>';
  },

  topics() { return '<h1>Temos</h1><p class="muted">Mokymosi medžiaga, įgūdžiai, sąrašai ir vaistai – kartu.</p>' + V.topicCards(); },

  topic(id) {
    const t = (E.temos || []).find(x => x.id === id);
    if (!t) return notFound();
    const P = E.puslapiai || {}, R = ratings();
    const sk = (t.igudziai || []).map(skillById).filter(s => s && ok(s.lygis));
    const r = sk.filter(s => R[s.id]).length;
    let h = `<h1>${esc(t.pav)}</h1>` + (t.sub ? `<p class="muted">${esc(t.sub)}</p>` : '');
    const pg = (t.puslapiai || []).filter(x => P[x]);
    if (pg.length) h += '<h2>Mokymosi medžiaga</h2>' + pg.map(x => row('#/p/' + x, P[x].title, P[x].sub)).join('');
    if (sk.length) h += `<h2>Įgūdžiai · įsivertinta ${r} / ${sk.length}</h2>` + progBar(r, sk.length) +
      sk.map(s => row('#/igudis/' + s.id, s.pav, '#' + s.id + (s.lygis ? ' · ' + lvName(s.lygis) : '') + ((s.video || []).length ? ' · ▶ ' + s.video.length : ''), rateBadge(R, s.id))).join('');
    const ls = (t.sarasai || []).filter(x => (E.sarasai || {})[x]);
    if (ls.length) h += '<h2>Kontroliniai sąrašai</h2>' + ls.map(listRow).join('');
    const dr = (t.vaistai || []).map(drugById).filter(v => v && ok(v.lygis));
    if (dr.length) h += '<h2>Vaistai</h2>' + dr.map(v => row('#/vaistas/' + v.id, v.name, v.klase, tag(v.lygis))).join('');
    return h;
  },

  lists() {
    let h = '<h1>Kontroliniai sąrašai</h1><p class="muted">Žymėjimai priklauso dabartiniam sužeistajam; išvalyti – sąrašo apačioje.</p>' +
      (VL.has() ? row('#/vertinimas', 'Vertinimo lapas', VL.status()) : '');
    const seen = {};
    (E.fazes || []).forEach(f => {
      h += `<h2>${esc(phLbl(f))} – ${esc(f.pav)}</h2>` + (f.lists || []).map(id => { seen[id] = 1; return listRow(id); }).join('');
    });
    const rest = Object.keys(E.sarasai || {}).filter(id => !seen[id]);
    if (rest.length) h += '<h2>Kiti</h2>' + rest.map(listRow).join('');
    return h;
  },

  phase(id, t) {
    const f = fazeById(id);
    if (!f) return notFound();
    const lists = (f.lists || []).filter(l => (E.sarasai || {})[l]);
    if (!lists.length) return `<div class="phead ${phCls(f)}"><b>${esc(phLbl(f))}</b><h1 class="pht">${esc(f.pav)}</h1></div>` + (f.aprasymas ? `<p class="muted">${esc(f.aprasymas)}</p>` : '');
    t = Math.min(Math.max(0, t | 0), lists.length - 1);
    const S = E.sarasai || {}, lid = lists[t];
    const sub = [f.en, lists.length > 1 ? (S[lid] || {}).short || '' : ''].filter(Boolean).join(' · ');
    let h = `<div class="phead ${phCls(f)}"><b>${esc(phLbl(f))}</b><h1 class="pht" data-title="${esc(phLbl(f) + (lists.length > 1 ? ' · ' + ((S[lid] || {}).short || '') : '') + ' – ' + f.pav)}">${esc(f.pav)}${sub ? ' <small>' + esc(sub) + '</small>' : ''}</h1></div>`;
    h += '<div class="tmini-box">' + timersMini() + '</div>';
    if (f.aprasymas) h += `<button class="phib" data-act="ckinfo" aria-expanded="false" aria-controls="ix-f-${esc(f.id)}"><i class="cki" aria-hidden="true">i</i>Apie fazę</button>` + infoTxt(esc(f.aprasymas), 'f-' + f.id);
    if (lists.length > 1) h += '<div class="tabs ph">' + lists.map((l, i) => {
      const [n, tot] = listDone(l);
      return `<button class="${i === t ? 'on' : ''}${n && n === tot ? ' done' : ''}" data-act="go" data-rep="1" data-r="#/f/${esc(id)}?t=${i}" aria-current="${i === t ? 'step' : 'false'}">${esc((S[l] || {}).short || l)}</button>`;
    }).join('') + '</div>';
    if (S[lid] && S[lid].intro) h += '<p class="muted">' + br(S[lid].intro) + '</p>';
    h += renderList(lid);
    const strip0 = x => String(x || '').replace(new RegExp('^' + String(phLbl(f)).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ':\\s*'), '');
    if (t < lists.length - 1) h += `<button class="row nxt" data-act="go" data-rep="1" data-r="#/f/${esc(id)}?t=${t + 1}">Toliau: ${esc(strip0((S[lists[t + 1]] || {}).title))}<span class="ar">›</span></button>`;
    else {
      const i = (E.fazes || []).indexOf(f), nf = (E.fazes || [])[i + 1];
      if (nf) h += `<button class="row nxt" data-act="go" data-r="#/f/${esc(nf.id)}">Kita fazė: ${esc(phLbl(nf))} – ${esc(nf.pav)}<span class="ar">›</span></button>`;
    }
    if (!f.beIranku) h += '<div class="tools sm">' + tile('#/pacientas?t=rod', ICO.vit, 'Rodikliai') + tile('#/pacientas?t=perduoti', ICO.tele, 'Perduoti') + '</div>';
    return h;
  },

  list(id) {
    const L = (E.sarasai || {})[id];
    if (!L) return notFound();
    let h = `<h1>${esc(L.title)}</h1>`;
    if (L.intro) h += '<p class="muted">' + br(L.intro) + '</p>';
    return h + renderList(id);
  },

  drugs() {
    const D = (E.vaistai || []).filter(v => ok(v.lygis)), w = wCalc();
    let h = '<h1>Vaistai</h1><p class="muted">' + esc(E.vaistaiIntro || 'Dozės – pagal kuopos vaistų korteles ir vieneto SOP. CMC – kovos medikas, CPP – paramedikas ar gydytojas.') + '</p>';
    const G = E.vaistuGrupes || [], drow = v => row('#/vaistas/' + v.id, v.name, doseShort(v, w), tag(v.lygis));
    G.forEach(g => {
      const a = D.filter(v => v.grupe === g.id);
      if (!a.length) return;
      h += '<h2>' + esc(g.pav) + '</h2>' + a.map(drow).join('');
    });
    const other = D.filter(v => !G.some(g => g.id === v.grupe));
    if (other.length) h += (G.length ? '<h2>Kita</h2>' : '') + other.map(drow).join('');
    if (!D.length) h += '<p class="muted">Vaistų sąrašas dar neįkeltas.</p>';
    return h + '<p class="muted">Vaistai skiriami tik pagal kompetenciją, vieneto protokolus ir gydytojo (telekonsultacijos) nurodymus.</p>' +
      (E.vaistaiPuslapis && (E.puslapiai || {})[E.vaistaiPuslapis] ? row('#/p/' + E.vaistaiPuslapis, E.puslapiai[E.vaistaiPuslapis].title) : '');
  },

  drug(id) {
    const v = drugById(id);
    if (!v) return notFound();
    const w = wCalc();
    const doseHtml = d => `<div class="dose"><div class="lb">${esc(d.k)}${d.c ? ' · ' + esc(d.d) : ''}</div><div class="big">${esc(d.c ? calcD(d, w) : d.d)}</div>${d.p ? '<div class="lb">' + br(d.p) + '</div>' : ''}</div>`;
    let h = `<h1>${esc(v.name)}</h1>` + (v.klase ? `<p class="muted">${esc(v.klase)}</p>` : '');
    h += (v.tccc26 ? '<span class="tag grn">TCCC 2026</span>' : v.ne26 ? '<span class="tag amb">Ne TCCC 2026</span>' : '') + lvTag(v);
    if (v.kam) h += `<p class="muted mt0">Kas skiria: ${esc(v.kam)}</p>`;
    if (v.ind) h += `<p class="ind">${esc(v.ind)}</p>`;
    if ((v.dozes || []).some(d => d.c)) h += '<h2>Paciento svoris, kg</h2>' + wChips(wNow());
    if ((v.dozes || []).length) h += '<h2>Dozė</h2>' + v.dozes.map(doseHtml).join('');
    const iw = v.ispejimai || [];
    if (iw.length) h += '<div class="warn wl"><b>Įspėjimai</b>' + (iw.length > 1 ? ul(iw) : '<div>' + esc(iw[0]) + '</div>') + '</div>';
    let more = '';
    if (v.kontra) more += `<div class="kv"><b>Kontraindikacijos</b><span>${esc(v.kontra)}</span></div>`;
    if (v.pradzia) more += `<div class="kv"><b>Veikimo pradžia</b><span>${br(v.pradzia)}</span></div>`;
    if (v.trukme) more += `<div class="kv"><b>Veikimo trukmė</b><span>${br(v.trukme)}</span></div>`;
    if (v.pakuote) more += `<div class="kv"><b>Pakuotė</b><span>${br(v.pakuote)}</span></div>`;
    if ((v.pastabos || []).length) more += '<h3>Pastabos</h3>' + ul(v.pastabos);
    if (v.saltinis) more += '<p class="muted" style="margin-top:10px">Šaltiniai: ' + esc(v.saltinis) + '</p>';
    if ((v.nuorodos || []).length) more += v.nuorodos.map(([t, u]) => `<a class="row" href="${esc(u)}" target="_blank" rel="noopener"><div>${esc(t)}</div><span class="ar">↗</span></a>`).join('');
    if (more) h += `<details class="alt"><summary>Kontraindikacijos ir daugiau</summary>${more}</details>`;
    h += V.drugLt(v);
    const alt = (Array.isArray(v.alt) ? v.alt : []).filter(a => a && (!a.id || (drugById(a.id) && ok(drugById(a.id).lygis))));
    if (alt.length) h += '<h2>Alternatyva</h2>' + alt.map(a => a.id ? row('#/vaistas/' + a.id, drugById(a.id).name, a.t) : `<p class="muted">${esc(a.t)}</p>`).join('');
    const sus = (v.susije || []).filter(s => !alt.some(a => a.id === s));
    if (sus.length) h += '<h2>Susiję vaistai</h2>' + sus.map(s => { const o = drugById(s); return o && ok(o.lygis) ? row('#/vaistas/' + o.id, o.name, o.klase, tag(o.lygis)) : ''; }).join('');
    return h;
  },

  // Lietuvoje registruoti preparatai (VVKT) – kaip ETC gide
  drugLt(v) {
    const L = v.lt; if (!L || typeof L !== 'object' || !((L.p || []).length || L.ne || L.pa)) return '';
    const ST = { T: ['Tiekiamas', 'grn'], L: ['Lygiagretus importas', 'grn'], U: ['Be registracijos numerio', 'amb'], N: ['Netiekiamas', 'red'] };
    let h = (L.p || []).map(p => { const s = ST[p.s] || ['', '']; return `<div class="ltp"><div class="ltn"><b>${esc(p.n)}</b>${s[0] ? `<span class="tag ${s[1]}">${s[0]}</span>` : ''}</div><div class="ltd">${esc(p.d)}${p.r ? ' · ' + esc(p.r) : ''}</div></div>`; }).join('');
    if (L.ne) h += `<div class="ltp"><div class="ltn"><span class="tag red">Netiekiami</span></div><div class="ltd">${esc(L.ne)}</div></div>`;
    if (L.pa) h += `<p class="ltpa">${esc(L.pa)}</p>`;
    h += '<p class="muted ltsrc">VVKT vaistinių preparatų registras. Tiekimas keičiasi – naudokite tai, kas yra komplekte, ir tikrinkite koncentraciją ant ampulės.</p>';
    return `<details class="alt"><summary>Lietuvoje: preparatai ir pakuotės</summary>${h}</details>`;
  },

  skills(q) {
    const all = (E.igudziai || []).filter(s => ok(s.lygis)), R = ratings();
    const ph = (E.fazes || []).filter(f => all.some(s => (s.fazes || []).indexOf(f.id) >= 0)).map(f => [f.id, phLbl(f)]);
    const F = [['', 'Visi']].concat(ph, [['N', 'Neįsivertinti']]);
    const f = q.f || '';
    const S = all.filter(s => !f || (f === 'N' ? !R[s.id] : (s.fazes || []).indexOf(f) >= 0));
    const rated = all.filter(s => R[s.id]).length;
    let h = `<h1>Įgūdžiai</h1><p class="muted">${lt(all.length, ['įgūdis', 'įgūdžiai', 'įgūdžių'])} · įsivertinta ${rated}</p>` + progBar(rated, all.length);
    if ((E.scenarijai || []).length) h += row('#/scenarijai', 'Treniruočių scenarijai', SC.status());
    h += '<div class="tabs">' + F.map(([k, l]) => tabBtn(l, '#/igudziai' + (k ? '?f=' + encodeURIComponent(k) : ''), k === f, true)).join('') + '</div>';
    const G = grupes();
    const sRow = s => row('#/igudis/' + s.id, s.pav, '#' + s.id + (s.lygis ? ' · ' + lvName(s.lygis) : '') + ((s.vaizdai || []).length ? ' · ▣ ' + s.vaizdai.length : '') + ((s.video || []).length ? ' · ▶ ' + s.video.length : ''), rateBadge(R, s.id));
    G.forEach(([g, gp]) => {
      const a = S.filter(s => s.grupe === g);
      if (!a.length) return;
      h += '<h2>' + esc(gp) + '</h2>' + a.map(sRow).join('');
    });
    const rest = S.filter(s => !G.some(g => g[0] === s.grupe));
    if (rest.length) h += rest.map(sRow).join('');
    return h + (S.length ? '' : '<p class="muted">Nėra įgūdžių pagal šį filtrą.</p>');
  },

  skill(id) {
    const s = skillById(id);
    if (!s) return notFound();
    const r = ratings()[s.id] || 0;
    const all = skillOrder().filter(x => ok(x.lygis)), i = all.indexOf(s);
    let h = `<h1>${esc(s.pav)}</h1><span class="tag">#${esc(s.id)}</span>${lvTag(s)}` + (s.fazes || []).map(f => { const x = fazeById(f); return `<span class="tag ${phCls(f)}">${esc(x ? phLbl(x) : f)}</span>`; }).join('');
    if (s.aprasas) h += `<p class="lead">${esc(s.aprasas)}</p>`;
    const ulr = a => '<ul>' + a.map(x => '<li>' + skRefs(x) + '</li>').join('') + '</ul>';
    if (!ok(s.lygis)) h += '<div class="warn">' + esc(lvName(s.lygis)) + ' įgūdis – aukštesnis nei nustatymų „Mano lygis“ (' + esc(lvName(lvl())) + '), todėl jo nėra sąrašuose.</div>';
    if ((s.zingsniai || []).length) h += '<h2>Žingsniai</h2><ol class="steps">' + s.zingsniai.map(x => '<li>' + skRefs(x) + '</li>').join('') + '</ol>';
    if ((s.esme || []).length) h += '<div class="card esme"><b>Svarbu</b>' + ulr(s.esme) + '</div>';
    if ((s.klaidos || []).length) h += '<div class="warn wl"><b>Dažnos klaidos ir pavojai</b>' + ulr(s.klaidos) + '</div>';
    h += (Array.isArray(s.irankiai) ? s.irankiai : []).filter(x => Array.isArray(x) && x[0]).map(([r, t, sub]) => row(r, t, sub)).join('');
    if ((s.vaizdai || []).length) h += '<div class="figs">' + s.vaizdai.map(figHtml).join('') + '</div>';
    h += videos(s.video);
    if (s.kortele) h += `<a class="row" href="${esc(s.kortele.url)}" target="_blank" rel="noopener"><div>Įgūdžio kortelė<small>${esc(s.kortele.pav)}</small></div><span class="ar">↗</span></a>`;
    if ((s.saltiniai || []).length) h += '<p class="muted">Šaltiniai: ' + esc(s.saltiniai.join('; ')) + '</p>';
    h += '<h2>Mano įsivertinimas</h2><div class="chips">' + [1, 2, 3, 4].map(x => `<button class="${x === r ? 'on' : ''}" data-act="rate" data-id="${esc(s.id)}" data-v="${x}">${x}</button>`).join('') + '</div>';
    h += '<p class="muted">1 – nežinau · 2 – žinau teoriją · 3 – atlieku su pagalba · 4 – atlieku savarankiškai</p>';
    const prev = i >= 0 ? all[i - 1] : null, next = i >= 0 ? all[i + 1] : null;
    h += '<div class="pn">' + (prev ? `<a class="btn" href="#/igudis/${esc(prev.id)}">‹ #${esc(prev.id)}</a>` : '<span></span>') + '<a class="btn" href="#/igudziai">Visi įgūdžiai</a>' + (next ? `<a class="btn" href="#/igudis/${esc(next.id)}">#${esc(next.id)} ›</a>` : '<span></span>') + '</div>';
    return h;
  },

  page(id) {
    const p = (E.puslapiai || {})[id];
    if (!p) return notFound();
    return `<h1>${esc(p.title)}</h1>` + (p.sub ? '<p class="muted">' + esc(p.sub) + '</p>' : '') + tocHtml(p.html || '') + videos(p.video) +
      (p.saltinis ? '<p class="muted" style="margin-top:12px">Šaltiniai: ' + esc(p.saltinis) + '</p>' : '');
  },

  search(q) {
    return `<h1>Paieška</h1><input type="search" id="qs" placeholder="Vaistas, įgūdis, veiksmas" autocomplete="off" value="${esc(q)}" aria-label="Paieška"><div id="res">${results(q)}</div>`;
  },

  install() {
    const U = 'pcc.1040medkuopa.lt', N = 'PCC gidas';
    let h = '<h1>Kaip įsidiegti programėlę</h1><p class="muted">Programėlė įsidiegia iš naršyklės – parduotuvės nereikia. Įdiegta ji atsidaro visame ekrane ir veikia be interneto.</p>';
    if (installed()) h += '<div class="card">Ši programėlė jau įdiegta šiame įrenginyje.</div>';
    else if (installEv) h += '<button class="btn pri" data-act="install">Įdiegti dabar</button>';
    h += '<h2>Android (Chrome)</h2><ol class="steps">' +
      `<li>Atidarykite <b>${U}</b> naršyklėje <b>Chrome</b>.</li>` +
      '<li>Jei apačioje pasirodo pasiūlymas „Įdiegti programą“ – paspauskite jį. Jei ne – viršuje dešinėje paspauskite meniu <b>⋮</b>.</li>' +
      '<li>Pasirinkite <b>„Įdiegti programą“</b> arba <b>„Pridėti prie pradžios ekrano“</b> ir patvirtinkite.</li>' +
      `<li>Ženkliukas <b>„${N}“</b> atsiras pradžios ekrane.</li></ol>` +
      '<p class="muted">Samsung naršyklėje: meniu ☰ → „Pridėti puslapį prie“ → „Pradžios ekranas“.</p>' +
      '<h2>iPhone / iPad</h2>' +
      '<p class="muted">iPhone neturi mygtuko „Įdiegti“ – programėlė pridedama per „Bendrinti“. Tinka Safari arba Chrome (iOS 16.4 ar naujesnė). Jei nuorodą atidarėte Messenger, Facebook ar kitoje programėlėje, pirmiausia atidarykite ją naršyklėje: <b>⋯</b> arba kompaso ženkliukas → <b>„Atidaryti Safari“</b> (angl. „Open in Safari“).</p>' +
      '<p><b>Safari</b></p><ol class="steps">' +
      `<li>Adreso juostoje įveskite <b>${U}</b> ir palaukite, kol puslapis visiškai įsikels.</li>` +
      '<li>Paspauskite <b>„Bendrinti“</b> – kvadratą su rodykle aukštyn. iOS 26: pirmiausia paspauskite <b>⋯</b> apačioje, tada <b>„Bendrinti“</b>. Senesnėse iOS mygtukas yra apačioje per vidurį.</li>' +
      '<li>Sąraše slinkite žemyn ir pasirinkite <b>„Įtraukti į pradžios ekraną“</b> (angl. „Add to Home Screen“). Nematote – paspauskite <b>„Rodyti daugiau“</b> (angl. „View More“) arba sąrašo apačioje <b>„Redaguoti veiksmus…“</b> ir jį pridėkite.</li>' +
      `<li>Pavadinimą palikite <b>„${N}“</b>. Jei matote jungiklį <b>„Atidaryti kaip žiniatinklio programą“</b> (angl. „Open as Web App“) – jis turi būti įjungtas.</li>` +
      '<li>Paspauskite <b>„Įtraukti“</b> (angl. „Add“) viršuje dešinėje – ženkliukas atsiras pradžios ekrane.</li></ol>' +
      '<p><b>Chrome</b></p><ol class="steps">' +
      `<li>Atidarykite <b>${U}</b>.</li>` +
      '<li>Adreso juostoje paspauskite <b>„Bendrinti“</b> (kvadratas su rodykle aukštyn) arba meniu <b>⋯</b> → <b>„Bendrinti…“</b>.</li>' +
      '<li>Pasirinkite <b>„Įtraukti į pradžios ekraną“</b> (jei reikia – slinkite žemyn arba „Daugiau“), tada <b>„Įtraukti“</b>.</li></ol>' +
      '<p class="muted">Toliau programėlę atidarykite iš pradžios ekrano ženkliuko, ne iš naršyklės – tada ji veikia visame ekrane ir be interneto. Įdiegtą programėlę ištrinti galima kaip įprastą: palaikykite ženkliuką → „Pašalinti“.</p>' +
      '<h2>Po įdiegimo</h2><ul><li>Pirmą kartą atidarykite su internetu – turinys išsisaugos telefone.</li><li>Programėlė atsinaujina pati, kai atidaroma su internetu.</li><li>Priminimai veikia, kol programėlė atidaryta.</li></ul>' +
      `<h2>Pasidalinkite</h2><p class="muted">Nuskenuokite telefono kamera:</p><img class="qr" src="img/qr.svg" alt="QR kodas: ${U}"><p style="text-align:center"><b>${U}</b></p>`;
    return h;
  },

  settings() {
    const b = (act, t, s) => `<button class="row" data-act="${act}"><div>${t}<small>${s}</small></div></button>`;
    let h = '<h1>Nustatymai</h1>' + disclaimer() + '<a class="row" href="#" data-g="open"><div>Kaip naudotis<small>Trumpa instrukcija su pagrindiniais mygtukais</small></div><span class="ar">›</span></a>' + GL.settingRow();
    if (advAny()) h += '<h2>Mano lygis</h2>' + lvlPick();
    h += '<h2>Aš</h2>' + (typeof MC !== 'undefined' && MC.profileView ? MC.profileView() : '') + pcSt(() => PC.settings());
    h += '<h2>Sužeistasis</h2>' + row('#/pacientas', 'Pacientas', 'Rodikliai, skysčiai, priežiūra, perdavimas') + b('new-pt', '+ Kitas sužeistasis', 'Ankstesni lieka sąraše') + REM.settings() + pcSt(() => PC.dataSettings()) + OP.settings();
    if (FB.configured() || FB.pending()) {
      h += '<h2>Atsiliepimai</h2>' + (FB.configured() ? b('fb', 'Pranešti apie klaidą ar pasiūlyti', 'Komentaras ir ekrano vaizdas') : '');
      const nOut = FB.pending();
      if (nOut) h += b('fb-flush', 'Neišsiųsti pranešimai: ' + nOut, 'Siųsti dabar (reikia interneto)');
    }
    h += '<h2>Mokymasis</h2>' + (VL.has() ? row('#/vertinimas', 'Vertinimo lapas', VL.status()) : '') + row('#/korteles', 'Dozių kortelės', FC.status()) + ((E.scenarijai || []).length ? row('#/scenarijai', 'Treniruočių scenarijai', SC.status()) : '') + b('reset-ivert', 'Ištrinti įsivertinimus', 'Visi 1–4 balai bus pašalinti');
    h += '<h2>Programėlė</h2>';
    if (installed()) h += '<p class="muted">Programėlė įdiegta ir veikia be interneto (vaizdo įrašams reikia interneto).</p>';
    else if (installEv) h += b('install', 'Įdiegti į telefoną', '');
    else h += row('#/idiegimas', 'Kaip įsidiegti telefone', 'Android, iPhone, QR');
    const nImg = allImgs().length, have = LS.get('pcc-img', 0);
    if (nImg) h += b('img-dl', have >= nImg ? 'Iliustracijos išsaugotos telefone ✓' : 'Išsaugoti iliustracijas naudojimui be interneto', have >= nImg ? lt(nImg, ['vaizdas', 'vaizdai', 'vaizdų']) + ' · paspauskite, jei norite atnaujinti' : lt(nImg, ['vaizdas', 'vaizdai', 'vaizdų']) + ' · rekomenduojama per Wi-Fi');
    h += b('upd', 'Tikrinti naujinimus', 'Atsisiunčiama naujausia versija · reikia interneto ryšio');
    const verM = String(E.versija || '').match(/^(\S+)\s+(v[\d.]+)\s*\((.*)\)$/);
    h += '<h2>Apie</h2><p class="muted">' + (verM ? 'Versija ' + esc(verM[2]) + ' · ' + esc(verM[1]) : 'Versija ' + esc(E.versija || '—')) + '. Parengė LŠS Vilniaus 1040 medicinos šaulių kuopa pagal JTS PCC gaires (CPG ID 91, 70, 94) ir PFC dokumentavimo rekomendacijas. Atminties priemonė, ne oficiali gairė.</p>' +
      (verM ? '<details class="alt"><summary>Kas naujo</summary><p class="muted">' + esc(verM[3]) + '</p></details>' : '');
    h += pcSt(() => PC.sourceRows());
    // Kitos 1040 med. kuopos programėlės
    const app = (u, p, t, s) => `<a class="row apr" href="${u}" target="_blank" rel="noopener"><svg class="api" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${p}"/></svg><div>${t}<small>${s}</small></div><span class="ar">↗</span></a>`;
    h += '<h2>Kitos programėlės</h2>' +
      app('https://sim.1040medkuopa.lt', 'M3 5h18v12H3zM8 21h8M12 17v4M5 11h3l2-3 2 6 2-3h5', 'SIM', 'Paciento monitoriaus simuliatorius treniruotėms') +
      app('https://etc.1040medkuopa.lt', 'M9 3h6v6h6v6h-6v6H9v-6H3V9h6z', 'ETC gidas', 'Ligoninės traumos komandai') +
      app('https://march.1040medkuopa.lt', 'M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z', 'March gidas', 'TCCC: CUF, TFC, TACEVAC') +
      app('https://apps.1040medkuopa.lt', 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z', 'Visos programėlės', 'apps.1040medkuopa.lt – aprašymai ir įdiegimas');
    return h;
  }
};
