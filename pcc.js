'use strict';
// ───────── PCC gidas – ilgalaikės sužeistojo priežiūros lauke priedai (PC) ─────────
// Stebėjimo lapas (rodikliai, blogėjimo žymėjimas, tendencijos), skysčių balansas ir diurezė, vaistų ir veiksmų žurnalas su kartojimo priminimais,
// priežiūros grafikas (JTS CPG ID 70), turniketų laikų langai (< 2 val., 2–6 val., > 6 val.), telekonsultacija (JTS CPG ID 94, PFC) ir ATMISTER,
// pasiruošimas evakuacijai, duomenų kopijavimas / įkėlimas. Paciento ekrano skiltys – per TCFG.hub (pacientas.js), priminimai – per TCFG.remHook (REM).
//
// Duomenys: TCFG.pre + 'pcc' = { [pid]: įrašas } – pid kaip MIST kortelės (PT). Sužeistojo tapatybė, mechanizmas, sužalojimai, alergijos, evakuacijos
// kategorija ir turniketai – MIST kortelėje (MC); svoris ir traumos laikas – paciento raktai (TCFG.pt 'svoris', 'laikai').
// Sinchronizavimas su MIST kortele: rodikliai → S dalis (c.vit); skysčiai (kristaloidai, kraujas) ir vaistai → C lentelė (src 'pcc:id');
// veiksmai → T pastabos; MIST kortelėje įvesti požymiai ir vaistai rodomi stebėjimo lape ir žurnale (pasvirai, be trynimo).
// Dozių kode nėra: vaistų pavadinimai ir greitosios dozės – iš duomenų (E.vaistai, E.qd).
const PC = (() => {
  const KEY = TCFG.pre + 'pcc', SKEY = TCFG.pre + 'pcc-nust', MK = TCFG.pre + 'mist';
  const MIN = 60e3, HR = 3600e3;

  // ───────── šaltiniai ─────────
  const SRC = {
    pcc: ['JTS CPG „Prolonged Casualty Care Guidelines“ (ID 91, 2021-12-21)', 'https://jts.health.mil/assets/docs/cpgs/prolonged_casualty_care_guidelines_21_dec_2021_id91.pdf'],
    nurse: ['JTS CPG „Nursing Interventions, Wound Care, and Splint Management in PCC“ (ID 70, 2025-07-08)', 'https://jts.health.mil/assets/docs/cpgs/Nursing_Interventions_PCC_08_July_2025_ID70_v1.1.pdf'],
    plan: ['JTS „PCC Nursing Care Plan“ (forma)', 'https://jts.health.mil/assets/docs/forms/PCC-Nursing-Care-Plan_fillable.pdf'],
    tele: ['JTS CPG „Telemedicine Guidance in the Deployed Setting“ (ID 94, 2023-09-19)', 'https://jts.health.mil/assets/docs/cpgs/Telemedicine_Deployed_Setting_19_Sep_2023_ID94_v1.2.pdf'],
    doc: ['PFC Documentation: Telemedical Consultation Guide, PFC Casualty Card v25 (2023)', 'https://prolongedfieldcare.org/wp-content/uploads/2023/07/PFC-Documentation-10-July-2023.pdf'],
    ua: ['TCCC (tccc.org.ua): PCC gairės, slauga, dokumentavimas', 'https://tccc.org.ua/en/guide/prolonged-casualty-care-guidelines-part-1-pcc']
  };
  const srcLine = (...keys) => '<p class="pcsrc">Šaltinis: ' + keys.map(k => `<a href="${SRC[k][1]}" target="_blank" rel="noopener">${esc(SRC[k][0])}</a>`).join('; ') + '</p>';

  // ───────── pagalbinės ─────────
  const pad = n => String(n).padStart(2, '0');
  const dhm = t => { const d = new Date(t), n = new Date(); return (d.toDateString() === n.toDateString() ? '' : pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ') + hm(t); };
  const dur = ms => { const m = Math.max(0, Math.round(ms / MIN)); if (m < 60) return m + ' min'; const h = Math.floor(m / 60); return h + ' val.' + (m % 60 ? ' ' + (m % 60) + ' min' : ''); };
  const hmm = ms => { const m = Math.max(0, Math.floor(ms / MIN)); return Math.floor(m / 60) + ':' + pad(m % 60); };
  const fmt1 = x => String(Math.round(x * 10) / 10).replace('.', ',');
  const fmt2 = x => String(Math.round(x * 100) / 100).replace('.', ',');
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const now = () => Date.now();
  const ivlTxt = m => m >= 60 ? (m % 60 ? fmt1(m / 60) : m / 60) + ' val.' : m + ' min';
  const ch = (act, k, on, lb, ex) => `<button class="${on ? 'on' : ''}${ex ? ' ' + ex : ''}" data-act="${act}" data-k="${esc(k)}" aria-pressed="${!!on}">${esc(lb)}</button>`;
  const keepY = () => { const y = scrollY; render(); scrollTo(0, y); };
  const S = () => { const o = LS.get(SKEY, {}); return o && typeof o === 'object' ? o : {}; };

  // ───────── saugykla ─────────
  const blank = () => ({ created: now(), age: '', status: '', hist: '', crit: 'crit', trend: '', burns: false, tbi: false, eta: 0, vint: 15,
    vit: [], io: [], meds: [], care: {}, off: {}, evck: {}, tc: { req: '', exam: '', res: '', rec: '' }, tqx: {} });
  const obj = v => v && typeof v === 'object' && !Array.isArray(v) ? v : {};
  function all() { return obj(LS.get(KEY, {})); }
  function norm(r) {
    const b = blank(), o = Object.assign(b, obj(r));
    ['vit', 'io', 'meds'].forEach(k => { o[k] = Array.isArray(o[k]) ? o[k].filter(x => x && typeof x === 'object' && +x.t > 0) : []; });
    ['care', 'off', 'evck', 'tqx'].forEach(k => { o[k] = obj(o[k]); });
    o.tc = Object.assign({ req: '', exam: '', res: '', rec: '' }, obj(o.tc));
    o.created = +o.created || now(); o.vint = +o.vint || 15; o.eta = +o.eta || 0;
    return o;
  }
  // įrašas sukuriamas (ir išsaugomas) pirmą kartą atvėrus pacientą – nuo to laiko skaičiuojamas priežiūros grafikas
  function ensure(pid) { const o = all(); if (o[pid]) return norm(o[pid]); const r = blank(); o[pid] = r; LS.set(KEY, o); return norm(r); }
  function upd(pid, fn) { const o = all(), r = norm(o[pid]); fn(r); o[pid] = r; LS.set(KEY, o); return r; }

  // ───────── dabartinis (ar nurodytas) sužeistasis ─────────
  function X(pid) {
    try { PT.sync(); } catch (e) { return null; }
    const L = PT.list(), p = pid ? L.pts.find(q => q.pid === pid) : L.pts[L.cur]; if (!p) return null;
    const c = p.card, la = obj(PT.get(p.pid, 'laikai')), kg = +PT.get(p.pid, 'svoris') || 0;
    const tInj = +la.trauma || (MC.trTs ? MC.trTs(c) : 0) || 0, r = ensure(p.pid);
    const x = { pid: p.pid, n: p.i + 1, tot: L.pts.length, label: p.label, c, r, kg, tInj, cur: p.i === L.cur };
    x.vits = allVits(x);
    return x;
  }
  // MIST kortelės keitimas (bet kuriam pacientui pagal pid)
  function mcCard(pid, fn) { const st = MC.state(), c = st.pts.find(p => p.pid === pid); if (!c) return false; fn(c); LS.set(MK, st); return true; }
  const laikai = pid => obj(PT.get(pid, 'laikai'));

  // ───────── gyvybiniai rodikliai ─────────
  // [raktas, pavadinimas, vienetai, min, max, dešimtainis]
  const VF = [['hr', 'Pulsas', '/min', 0, 250], ['sys', 'AKS s', 'mm Hg', 0, 300], ['dia', 'AKS d', 'mm Hg', 0, 200], ['rr', 'KD', '/min', 0, 70], ['spo2', 'SpO₂', '%', 0, 100], ['temp', 'T', '°C', 25, 43, 1], ['gcs', 'GKS', '', 3, 15]];
  const AVPU = [['A', 'budrus'], ['V', 'balsas'], ['P', 'skausmas'], ['U', 'nereaguoja']];
  const CRT = [['<2', '< 2 s'], ['2-3', '2–3 s'], ['>3', '> 3 s']];
  const abn = (k, v) => {
    if (v === '' || v == null) return false;
    const n = +v;
    switch (k) {
      case 'hr': return n > 120 || n < 50;
      case 'sys': return n < 90 || n > 180;
      case 'rr': return n > 29 || n < 10;
      case 'spo2': return n < 92; // PCC CPG: SpO₂ tikslas ≥ 92 %
      case 'temp': return n < 36 || n > 38.5;
      case 'gcs': return n < 15;
      case 'pain': return n >= 7;
      case 'avpu': return v !== 'A';
      case 'crt': return v !== '<2';
      default: return false;
    }
  };
  const RANK = { avpu: { A: 0, V: 1, P: 2, U: 3 }, crt: { '<2': 0, '2-3': 1, '>3': 2 } };
  // ar b blogesnis už ankstesnį a: 'down' / 'up' / ''
  function worse(k, a, b) {
    if (a === '' || a == null || b === '' || b == null) return '';
    if (RANK[k]) return RANK[k][b] > RANK[k][a] ? 'down' : '';
    const x = +a, y = +b; if (isNaN(x) || isNaN(y)) return '';
    if (k === 'spo2' || k === 'gcs' || k === 'sys' || k === 'dia') return y < x ? 'down' : '';
    if (k === 'temp') return Math.abs(y - 37) > Math.abs(x - 37) + 0.05 ? (y < x ? 'down' : 'up') : '';
    return y > x ? 'up' : '';
  }
  const shockIdx = v => v.hr && v.sys ? Math.round(v.hr / v.sys * 10) / 10 : null;
  const mapOf = v => v.sys && v.dia ? Math.round((+v.sys + 2 * v.dia) / 3) : null;
  const has = v => v !== '' && v != null;
  const vitText = v => [v.avpu ? 'AVPU ' + v.avpu : '', has(v.gcs) ? 'GKS ' + v.gcs : '', has(v.hr) ? 'P ' + v.hr : '', has(v.sys) ? 'AKS ' + v.sys + (has(v.dia) ? '/' + v.dia : '') : '', has(v.rr) ? 'KD ' + v.rr : '', has(v.spo2) ? 'SpO₂ ' + v.spo2 + ' %' : '', has(v.temp) ? 'T ' + fmt1(v.temp) + ' °C' : '', v.crt ? 'KPL ' + v.crt.replace('-', '–') + ' s' : '', has(v.pain) ? 'skausmas ' + v.pain + '/10' : ''].filter(Boolean).join(', ');
  const num = s => { const m = /^\s*(\d{1,3})/.exec(String(s == null ? '' : s)); return m ? +m[1] : ''; };
  // MIST kortelėje įvesti požymiai (be atitikmens stebėjimo lape) – rodomi kaip „MIST“ stulpeliai
  function mistVits(x) {
    const own = {}; x.r.vit.forEach(v => { own[hm(v.t)] = 1; });
    return (x.c.vit || []).filter(v => v && v.ts && !own[v.ts] && PT.hmTs(v.ts)).map((v, i) => {
      const bp = String(v.bp || '').split('/');
      return { id: 'mc' + i, t: PT.hmTs(v.ts), mc: 1, avpu: /^[AVPU]$/.test(v.av) ? v.av : '', hr: num(v.hr), sys: num(bp[0]), dia: num(bp[1]), rr: num(v.rr), spo2: num(v.spo2), gcs: /^\d+$/.test(v.gcs || '') ? +v.gcs : '', pain: /^\d+$/.test(String(v.pain)) ? +v.pain : '' };
    });
  }
  function allVits(x) { return x.r.vit.concat(mistVits(x)).sort((a, b) => a.t - b.t); }
  const lastV = (L, k) => { for (let i = L.length - 1; i >= 0; i--) { if (has(L[i][k])) return L[i][k]; } return ''; };
  const toMist = v => ({ ts: hm(v.t), av: v.avpu || '', hr: has(v.hr) ? String(v.hr) : '', rr: has(v.rr) ? String(v.rr) : '', bp: has(v.sys) ? v.sys + (has(v.dia) ? '/' + v.dia : '') : '', spo2: has(v.spo2) ? String(v.spo2) : '', gcs: has(v.gcs) ? String(v.gcs) : '', gcsD: '', pain: has(v.pain) ? String(v.pain) : '' });

  // ───────── skysčių balansas ─────────
  const IN_T = [['krist', 'Kristaloidai'], ['kraujas', 'Kraujas / produktai'], ['burna', 'Per burną'], ['kitas', 'Kita']];
  const OUT_T = [['slap', 'Šlapimas'], ['dren', 'Drenas'], ['vem', 'Vėmimas'], ['kraujn', 'Kraujo netekimas'], ['ism', 'Išmatos'], ['kitas', 'Kita']];
  const ioName = (k, t) => ((k === 'in' ? IN_T : OUT_T).find(x => x[0] === t) || [0, t])[1];
  function ioTot(r, from, to) {
    let i = 0, o = 0, u = 0;
    r.io.forEach(e => { if (e.t < from || e.t > to) return; if (e.k === 'in') i += +e.ml || 0; else { o += +e.ml || 0; if (e.type === 'slap') u += +e.ml || 0; } });
    return { in: i, out: o, net: i - o, u };
  }
  function careStart(x) { const ts = [x.tInj, ...x.vits.map(v => v.t), ...x.r.io.map(e => e.t), x.r.created].filter(t => +t > 0); return Math.min(...ts); }
  // diurezė per paskutines h val. (jei priežiūra trumpesnė – per priežiūros laiką)
  function urine(x, h, t) {
    t = t || now();
    const start = careStart(x), win = Math.max(MIN * 15, Math.min(h * HR, t - start));
    const ml = x.r.io.filter(e => e.k === 'out' && e.type === 'slap' && e.t > t - win && e.t <= t).reduce((s, e) => s + (+e.ml || 0), 0);
    const hrs = win / HR, mlh = ml / hrs, kg = +x.kg || 0, lo = 0.5, hi = x.r.burns ? 1 : null, mlkg = kg ? mlh / kg : null;
    return { ml, hrs, mlh: Math.round(mlh), mlkg: mlkg == null ? null : Math.round(mlkg * 100) / 100, st: mlkg == null ? '' : mlkg < lo ? 'lo' : hi && mlkg > hi ? 'hi' : 'ok', lo, hi };
  }

  // ───────── priežiūros grafikas (JTS CPG ID 70, B priedas) ─────────
  // [raktas, pavadinimas, intervalas val. nekritinei, kritinei (null – nereikia), pastaba, sąlyga]
  const CARE = [
    ['vit', 'Gyvybiniai rodikliai', null, null, 'Kritinė – kas 15–30 min; rimta – kas 4 val.; nekritinė – kas 12 val.'],
    ['mini', 'Mini vizitas', null, null, 'Stabilus? Gerėja ar blogėja? Turniketai, tvarsčiai, hipotermija, skausmas'],
    ['vart', 'Vartyti, patikrinti paminkštinimą (pakaušis, alkūnės, kulnai, kryžkaulis)', 2, 2, 'Ant kieto paviršiaus – kas 1 val.; be sąmonės – kas 1–2 val., galva pakelta ~30°'],
    ['burna', 'Burnos, nosies, lūpų priežiūra', 12, 4, 'Sąmoningas – valytis dantis kas 12 val.'],
    ['kos', 'Skatinti kosėti, giliai kvėpuoti', 1, null, 'Sąmoningam'],
    ['vamz', 'Apžiūrėti vamzdelius, linijas, drenus', 4, 4, ''],
    ['plauti', 'Praplauti nenaudojamas IV linijas', 6, 6, 'Kas 4–8 val.'],
    ['itv', 'Įtvarai: distalinis pulsas, oda, skausmas', 6, 2, 'Kompartmento sindromas – didėjantis skausmas, skausmas pasyviai judinant'],
    ['zaiz', 'Žaizdos ir tvarsčiai', 24, 12, 'Keisti ar sutvirtinti pagal poreikį'],
    ['kat', 'Šlapimo kateterio priežiūra, maišas žemiau šlapimo pūslės', 24, 24, ''],
    ['val', 'Maitinimas, gėrimas', 5, null, 'Kas 4–6 val.; sąmoningam – ~100–125 ml/val. per burną'],
    ['jud', 'Sąnarių judesiai, kojų masažas', 8, 8, ''],
    ['oda', 'Nuprausti, nusausinti odą', 24, 24, ''],
    ['neuro', 'Neurologinė apžiūra ir vyzdžiai (galvos trauma)', 1, 1, 'Ne rečiau kaip kas valandą', 'tbi'],
    ['sild', 'Pakeisti šildančią antklodę (Ready-Heat)', 10, 10, 'Po > 10 val.', 'heat']
  ];
  const CRIT = [['crit', 'Kritinė'], ['ser', 'Rimta'], ['non', 'Nekritinė']];
  const TREND = [['geryn', 'Gerėja'], ['stab', 'Stabili'], ['blog', 'Blogėja']];
  const VINT = [[15, '15 min'], [30, '30 min'], [60, '1 val.'], [240, '4 val.'], [720, '12 val.']];
  const shortNm = nm => nm.split(':')[0].split(',')[0].replace(/ \(.*\)$/, '');
  function careIvl(r, c) { if (c[0] === 'vit' || c[0] === 'mini') return +r.vint || 15; const h = r.crit === 'crit' ? c[3] : c[2]; return h ? h * 60 : 0; }
  function careOn(r, c) {
    if (r.off[c[0]]) return false;
    if (c[5] === 'tbi' && !r.tbi) return false;
    if (c[5] === 'heat' && !r.care.sild) return false; // tik kai pažymėta, kad uždėta
    return careIvl(r, c) > 0;
  }
  function lastDone(x, k) { if (k === 'vit') { const v = x.vits[x.vits.length - 1]; return v ? v.t : 0; } return +x.r.care[k] || 0; }
  // { k, nm, note, ivl, last, due, st: 'ok' | 'soon' | 'due' | 'over' }
  function careState(x, t) {
    t = t || now();
    return CARE.filter(c => careOn(x.r, c)).map(c => {
      const ivl = careIvl(x.r, c), last = lastDone(x, c[0]), base = last || x.r.created, due = base + ivl * MIN, left = due - t;
      const st = left > 15 * MIN ? 'ok' : left > 0 ? 'soon' : left > -Math.max(15 * MIN, ivl * MIN * 0.25) ? 'due' : 'over';
      return { k: c[0], nm: c[1], note: c[4], ivl, last, due, st };
    });
  }
  // vaistai: kitos dozės laikas (paskutinis to vaisto įrašas su kartojimo intervalu)
  function medState(x, t) {
    t = t || now();
    const latest = {};
    x.r.meds.forEach(m => { if (m.kind === 'med') { const k = String(m.name).toLowerCase(); if (!latest[k] || latest[k].t < m.t) latest[k] = m; } });
    return Object.values(latest).filter(m => +m.ivl > 0).map(m => { const due = m.t + m.ivl * MIN, left = due - t; return { m, due, st: left > 15 * MIN ? 'ok' : left > 0 ? 'soon' : left > -15 * MIN ? 'due' : 'over' }; });
  }

  // ───────── turniketai (PCC CPG ID 91): MIST kortelės galūnių turniketai + konversijos laikas ─────────
  // < 2 val. – konvertuoti kuo greičiau; 2–6 val. – konversijos langas (apmokytas medikas); > 6 val. – nenuimti iki chirurginės pagalbos
  function tqs(x) {
    const out = [];
    MC.TQ.forEach(([k, lt]) => {
      const q = (x.c.tq || {})[k]; if (!q || !q.on) return;
      const e = x.r.tqx[k] && x.r.tqx[k].tm === q.tm ? x.r.tqx[k] : null;
      const t = (e && +e.ts) || PT.hmTs(q.tm) || 0;
      out.push({ k, limb: lt, tm: q.tm, t, conv: e ? +e.conv || 0 : 0 });
    });
    return out;
  }
  const tqState = (q, t) => { if (q.conv) return 'conv'; if (!q.t) return 'early'; const h = ((t || now()) - q.t) / HR; return h < 2 ? 'early' : h < 6 ? 'win' : 'late'; };
  const tqTxt = q => { const s = tqState(q); return s === 'conv' ? 'konvertuotas ' + hm(q.conv) : s === 'early' ? 'konversija iki ' + (q.t ? hm(q.t + 2 * HR) : '2 val.') : s === 'win' ? 'konversijos langas 2–6 val.' : 'NENUIMTI – > 6 val.'; };
  function laikaiTurn(pid) { // turniketo laikmatis – anksčiausias uždėtas (dabartiniam pacientui)
    const L = PT.list(); if ((L.pts[L.cur] || {}).pid !== pid) return;
    const x = X(pid), T = laikai(pid), on = tqs(x).filter(q => q.t);
    if (on.length) T.turn = Math.min(...on.map(q => q.t)); else if ((x.c.tx || []).indexOf('tqj') < 0) delete T.turn;
    LS.set(TCFG.laikai, T);
  }

  // ───────── priminimai (REM kabliukas): priežiūra, rodikliai, vaistai, turniketų langai ─────────
  function remHook(p, push, t) {
    const x = X(p.pid); if (!x) return;
    const cs = careState(x, t), due = cs.filter(c => c.st === 'due' || c.st === 'over');
    const v = due.find(c => c.k === 'vit');
    if (v) push('pvit:' + x.pid + ':' + v.due, v.st === 'over' ? 'r' : 'a', 'Gyvybiniai rodikliai', (v.last ? 'paskutiniai ' + hm(v.last) + ' · ' : '') + 'kas ' + ivlTxt(v.ivl), '#/pacientas?t=rod');
    const o = due.filter(c => c.k !== 'vit');
    if (o.length) push('pcare:' + x.pid + ':' + o.map(c => c.k).join(','), o.some(c => c.st === 'over') ? 'r' : 'a', 'Priežiūra – ' + plural(o.length, ['darbas', 'darbai', 'darbų']), o.slice(0, 3).map(c => shortNm(c.nm)).join(', ') + (o.length > 3 ? '…' : ''), '#/pacientas?t=prz');
    medState(x, t).forEach(m => { if (m.st === 'due' || m.st === 'over') push('pmed:' + x.pid + ':' + m.m.name + ':' + m.due, m.st === 'over' ? 'r' : 'a', m.m.name + ' – kita dozė', 'paskutinė ' + hm(m.m.t) + ' · kas ' + ivlTxt(m.m.ivl), '#/pacientas?t=vst'); });
    tqs(x).forEach(q => {
      if (q.conv || !q.t) return;
      const el = t - q.t, left2 = q.t + 2 * HR - t;
      if (el >= 6 * HR) push('ptq:' + x.pid + ':' + q.k + ':' + q.t + ':6', 'r', 'Turniketas > 6 val. – nenuimti', q.limb + ' · uždėtas ' + hm(q.t), '#/turniketai');
      else if (el >= 2 * HR) push('ptq:' + x.pid + ':' + q.k + ':' + q.t + ':2', 'a', 'Turniketas – konversijos langas 2–6 val.', q.limb + ' · ' + dur(el) + ' · iki 6 val. liko ' + dur(q.t + 6 * HR - t), '#/turniketai');
      else if (left2 <= 15 * MIN) push('ptq:' + x.pid + ':' + q.k + ':' + q.t + ':1', 'a', 'Turniketas – 2 val. riba', q.limb + ' · liko ' + dur(left2), '#/turniketai');
    });
  }
  const isPcc = k => /^p(vit|care|med|tq):/.test(String(k || ''));
  const remAll = only => { try { return REM.items(only); } catch (e) { return []; } };
  const CLOCK = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M9 2h6"/></svg>';
  const remRow = x => `<div class="rem rem-${x.lvl}" role="status">${CLOCK}<div class="remt"><b>${esc(x.title)}</b><small>${esc(x.sub)}</small></div><button class="remb" data-act="rem-go" data-k="${esc(x.pid)}" data-r="${esc(x.go)}">Atidaryti</button><button class="remx" data-act="rem-x" data-k="${esc(x.key)}" aria-label="Atlikta – paslėpti">✓</button></div>`;
  // Pradžios ekranui: iki 2 priminimų – visi, daugiau – viena suvestinė juosta į „Priminimai“
  function homeBanner() {
    const it = remAll(); if (!it.length) return '';
    if (it.length <= 2) return REM.banners();
    const lv = it.some(x => x.lvl === 'r') ? 'r' : 'a';
    return `<a class="rem rem-${lv}" href="#/priminimai">${CLOCK}<div class="remt"><b>${plural(it.length, ['priminimas', 'priminimai', 'priminimų'])}</b><small>${esc(it.slice(0, 2).map(x => x.title).join(' · '))}…</small></div><span class="remb" style="display:flex;align-items:center">Visi ›</span></a>`;
  }
  // Apatinės navigacijos „Priminimai“ ženkliukas
  function nav() {
    const a = document.querySelector('#nav a[data-s="priminimai"]'); if (!a) return;
    const it = remAll(), b = a.querySelector('.nbdg'); if (!b) return;
    b.textContent = it.length ? String(it.length) : ''; b.classList.toggle('red', it.some(x => x.lvl === 'r')); b.classList.toggle('due', it.length > 0);
    a.setAttribute('aria-label', 'Priminimai' + (it.length ? ', ' + it.length : ''));
  }
  const barExtra = hx => { const n = remAll(hx.p.pid).length; return n ? `<small class="hbbad">⚠ ${n}</small>` : ''; };

  // ───────── eilutės ─────────
  function stTxt(st, due) { return st === 'over' ? 'vėluoja ' + dur(now() - due) : st === 'due' ? 'dabar' : st === 'soon' ? 'po ' + dur(due - now()) : hm(due); }
  const cls = st => st === 'over' ? 'over' : st === 'due' ? 'due' : '';
  function careRow(x, c) {
    const vit = c.k === 'vit';
    return `<div class="pcli ${cls(c.st)}"><div class="x">${esc(c.nm)}<small>kas ${ivlTxt(c.ivl)}${c.last ? ' · atlikta ' + hm(c.last) : ''}${c.note && mode === 'learn' ? ' · ' + esc(c.note) : ''}</small></div><span class="st">${stTxt(c.st, c.due)}</span>` +
      `<button class="ok" data-act="${vit ? 'pc-vit' : 'pc-care'}" data-k="${c.k}" data-p="${esc(x.pid)}" aria-label="${vit ? 'Matuoti' : 'Atlikta dabar'}">${vit ? '+' : '✓'}</button></div>`;
  }
  function medRow(x, m) {
    return `<div class="pcli ${cls(m.st)}"><div class="x">${esc(m.m.name)}<small>${esc([m.m.dose, m.m.route].filter(Boolean).join(' ') + ' · kas ' + ivlTxt(m.m.ivl) + ' · paskutinė ' + hm(m.m.t))}</small></div><span class="st">${stTxt(m.st, m.due)}</span><button class="ok" data-act="pc-again" data-k="${esc(m.m.id)}" data-p="${esc(x.pid)}" aria-label="Suleista dabar">✓</button></div>`;
  }
  function dueList(x, n) {
    const a = careState(x).filter(c => c.st !== 'ok').map(c => ({ due: c.due, h: careRow(x, c) })).concat(medState(x).filter(m => m.st !== 'ok').map(m => ({ due: m.due, h: medRow(x, m) })));
    return a.sort((p, q) => p.due - q.due).slice(0, n || 99).map(o => o.h).join('');
  }

  // ───────── tendencijos ir stebėjimo lapas ─────────
  const SPK = [['hr', 'Pulsas'], ['sys', 'AKS s'], ['rr', 'KD'], ['spo2', 'SpO₂'], ['temp', 'T °C'], ['gcs', 'GKS'], ['pain', 'Skausmas']];
  function spark(vals) {
    const pts = vals.slice(-12); if (pts.length < 2) return '';
    const xs = pts.map(v => v[0]), ys = pts.map(v => +v[1]), x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const Xf = q => x1 === x0 ? 50 : (q - x0) / (x1 - x0) * 96 + 2, Yf = q => y1 === y0 ? 15 : 28 - (q - y0) / (y1 - y0) * 26, last = pts[pts.length - 1];
    return `<svg viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"><polyline points="${pts.map(v => Xf(v[0]).toFixed(1) + ',' + Yf(+v[1]).toFixed(1)).join(' ')}"/><circle cx="${Xf(last[0]).toFixed(1)}" cy="${Yf(+last[1]).toFixed(1)}" r="2.2"/></svg>`;
  }
  function sparks(L) {
    return '<div class="pcspk">' + SPK.map(([k, nm]) => {
      const vals = L.filter(v => has(v[k])).map(v => [v.t, v[k]]); if (!vals.length) return '';
      const l = vals[vals.length - 1][1], prev = vals.length > 1 ? vals[vals.length - 2][1] : null, w = prev != null && worse(k, prev, l);
      const show = k === 'sys' ? l + (has(lastV(L, 'dia')) ? '/' + lastV(L, 'dia') : '') : k === 'temp' ? fmt1(l) : l;
      return `<div><small>${nm}</small><b class="${abn(k, l) ? 'ab' : ''}">${esc(show)}${w ? (w === 'up' ? ' ▲' : ' ▼') : ''}</b>${spark(vals)}</div>`;
    }).join('') + (lastV(L, 'avpu') ? `<div><small>AVPU${lastV(L, 'crt') ? ' · KPL' : ''}</small><b class="${abn('avpu', lastV(L, 'avpu')) ? 'ab' : ''}">${esc(lastV(L, 'avpu'))}${lastV(L, 'crt') ? ' · ' + esc(lastV(L, 'crt').replace('-', '–')) : ''}</b></div>` : '') + '</div>';
  }
  const VROWS = [['avpu', 'AVPU'], ['gcs', 'GKS'], ['hr', 'Pulsas'], ['sys', 'AKS s'], ['dia', 'AKS d'], ['rr', 'KD'], ['spo2', 'SpO₂'], ['temp', 'T'], ['crt', 'KPL'], ['pain', 'Skausm.']];
  function vitTable(L0) {
    const L = L0.slice(-12), cols = L.slice().reverse(), rows = VROWS.filter(([k]) => L.some(v => has(v[k])));
    let h = '<div class="pcvt"><table><thead><tr><th></th>' + cols.map(v => `<th>${hm(v.t)}${v.mc ? '<br>MIST' : ''}</th>`).join('') + '</tr></thead><tbody>';
    rows.forEach(([k, nm]) => {
      h += `<tr><td class="t">${nm}</td>` + cols.map(v => {
        const idx = L.indexOf(v); let prev = null; for (let i = idx - 1; i >= 0; i--) { if (has(L[i][k])) { prev = L[i][k]; break; } }
        const val = v[k]; if (!has(val)) return '<td class="nil">·</td>';
        const w = prev != null ? worse(k, prev, val) : '';
        return `<td class="${abn(k, val) ? 'ab' : ''}${w ? ' wr' + (w === 'up' ? ' up' : '') : ''}${v.mc ? ' mc' : ''}"${w ? ' title="blogiau nei ankstesnis"' : ''}>${esc(k === 'temp' ? fmt1(val) : k === 'crt' ? String(val).replace('-', '–') : val)}</td>`;
      }).join('') + '</tr>';
    });
    h += '<tr><td class="t"></td>' + cols.map(v => v.mc ? '<td class="t"></td>' : `<td class="t"><button class="del" data-act="pc-vdel" data-k="${esc(v.id)}" aria-label="Ištrinti matavimą ${hm(v.t)}">×</button></td>`).join('') + '</tr>';
    return h + '</tbody></table></div><p class="muted">Rėmelis ir ▲▼ – blogiau nei ankstesnis matavimas' + (L.some(v => v.mc) ? '; MIST – įvesta kortelėje' : '') + '.</p>';
  }
  function uoBox(x, U, w) {
    if (!x.kg) return `<div class="pcuo"><span>Šlapimas per ${w} val.: ${U.ml} ml (${U.mlh} ml/val.)</span><small>Įveskite svorį – bus skaičiuojama ml/kg/val.</small><button class="btn sm" data-act="pc-kg">Svoris</button></div>`;
    const tg = x.r.burns ? '0,5–1' : '≥ 0,5';
    return `<div class="pcuo ${U.st}"><b>${fmt2(U.mlkg)} ml/kg/val.</b><span>${U.mlh} ml/val. · ${U.ml} ml per ${fmt1(U.hrs)} val. · ${x.kg} kg · tikslas ${tg}</span><small>${U.st === 'lo' ? 'Mažiau nei tikslas – vertinkite perfuziją, skysčius, kateterį' : U.st === 'hi' ? 'Daugiau nei tikslas – mažinkite skysčių greitį' : 'Tikslas pasiektas'}</small></div>`;
  }
  function tqBlock(x, full) {
    const L = tqs(x), tj = (x.c.tx || []).indexOf('tqj') >= 0;
    let h = '';
    if (L.length || tj) h += '<div class="pcl">' + L.map(q => {
      const s = tqState(q);
      return `<div class="pcli ${s === 'late' ? 'over' : s === 'win' ? 'due' : s === 'conv' ? 'conv' : ''}"><div class="x">${esc(q.limb)} · ${q.t ? hm(q.t) : esc(q.tm || '—')}<small>${q.t ? dur((q.conv || now()) - q.t) + ' · ' : ''}${tqTxt(q)}</small></div>` +
        (s === 'conv' ? '' : `<button class="btn sm" data-act="pc-tqconv" data-k="${q.k}">Konvertuotas</button>`) + (full ? `<button class="del" data-act="pc-tqdel" data-k="${q.k}" aria-label="Pašalinti turniketą">×</button>` : '') + '</div>';
    }).join('') + (tj ? '<div class="pcli"><div class="x">Jungties turniketas<small>pažymėta MIST kortelėje</small></div></div>' : '') + '</div>';
    else if (full) h += '<p class="muted">Turniketų nėra.</p>';
    const free = MC.TQ.filter(([k]) => !((x.c.tq || {})[k] || {}).on);
    if (free.length) h += '<div class="opts pctq">' + free.map(([k, lt]) => `<button data-act="pc-tqadd" data-k="${k}">+ ${esc(lt)}</button>`).join('') + '</div>';
    if (full) h += '<p class="muted">Konversija – kuo greičiau, kai leidžia situacija ir yra kraujavimo kontrolės priemonė; 2–6 val. – tik apmokytas medikas, stebint kraujavimą; > 6 val. – nenuimti iki chirurginės pagalbos.</p>' + srcLine('pcc');
    return h;
  }

  // ───────── vaistų ir veiksmų žurnalas ─────────
  const MIVL = [[0, 'Nekartoti'], [30, '30 min'], [60, '1 val.'], [240, '4 val.'], [360, '6 val.'], [480, '8 val.'], [720, '12 val.'], [1440, '24 val.']];
  const ROUTES = ['IV', 'IO', 'IM', 'PO', 'IN', 'Kita'];
  const INTS = ['Turniketo konversija', 'Šlapimo kateteris', 'Pleuros drenas', 'Pirštinė torakostomija', 'Intubacija', 'Krikotiroidotomija', 'Kraujo perpylimas', 'IV / IO prieiga', 'Tvarsčio keitimas', 'Žaizdos plovimas', 'Įtvaras', 'Šildymas'];
  const dname = v => v.id === 'txa' ? 'TXA' : String(v.name || v.id).replace(/ \(.*\)$/, '');
  const drugOf = nm => { nm = String(nm || '').trim().toLowerCase(); return nm ? (E.vaistai || []).find(v => [v.id, v.name, dname(v)].some(s => String(s || '').toLowerCase() === nm)) : null; };
  const MGRP = { skausmas: 'an', antibiotikai: 'ab' };
  // MIST kortelės C lentelės eilutės, įvestos ne per žurnalą (pvz. MIST vaisto langu)
  const mistRows = x => (x.c.rows || []).filter(r => r && !/^pcc:/.test(String(r.src || '')) && [r.name, r.dose].some(s => String(s || '').trim()));
  function journal(x) {
    const own = x.r.meds.map(m => ({ t: m.t, h: `<div class="pcli"><span class="tm">${dhm(m.t)}</span><div class="x">${m.kind === 'int' ? '✚ ' : ''}${esc(m.name)}<small>${esc([m.dose, m.route, m.ivl ? 'kas ' + ivlTxt(m.ivl) : '', m.note].filter(Boolean).join(' · '))}</small></div><button class="del" data-act="pc-mdel" data-k="${esc(m.id)}" aria-label="Ištrinti">×</button></div>` }));
    const mc = mistRows(x).map(r => ({ t: PT.hmTs(r.time) || 0, h: `<div class="pcli"><span class="tm">${esc(r.time || '—')}</span><div class="x">${esc(r.name)}<small>${esc([r.dose, r.route, 'MIST kortelė'].filter(Boolean).join(' · '))}</small></div></div>` }));
    return own.concat(mc).sort((a, b) => b.t - a.t).map(o => o.h).join('');
  }
  function treatTxt(x) {
    const q = tqs(x).map(t => 'turniketas ' + t.limb.toLowerCase() + ' ' + (t.t ? hm(t.t) : t.tm) + (t.conv ? ', konvertuotas ' + hm(t.conv) : ''));
    const m = x.r.meds.filter(e => e.kind === 'med').sort((a, b) => a.t - b.t).map(e => hm(e.t) + ' ' + e.name + (e.dose ? ' ' + e.dose : '') + (e.route ? ' ' + e.route : ''));
    const r = mistRows(x).map(e => [e.time, e.name, e.dose, e.route].map(s => String(s || '').trim()).filter(Boolean).join(' '));
    const T = MC.txText ? MC.txText(x.c) : '';
    return q.concat(m, r, T ? [T] : []).join('; ') || '—';
  }

  // ───────── perdavimo tekstai ─────────
  const prof = () => obj(LS.get(TCFG.pre + 'as', {}));
  const sexName = c => c.sex === 'V' ? 'vyras' : c.sex === 'M' ? 'moteris' : '';
  const mechTxt = c => [(c.mech || []).join(', '), String(c.mechTxt || '').trim()].filter(Boolean).join('; ');
  const evacName = c => { const e = (MC.EVAC || []).find(y => y[0] === c.evac); return e ? e[1] + ' (' + e[2] + ')' : ''; };
  const etaTxt = (r, t) => r.eta ? (r.eta > t ? 'po ' + dur(r.eta - t) + ' (' + hm(r.eta) + ')' : hm(r.eta)) : '';
  function trendTxt(x) { const L = x.vits.slice(-4); return L.length ? L.map(v => hm(v.t) + ' ' + vitText(v)).join('\n  ') : '—'; }
  function teleLines(x) {
    const s = S(), p = prof(), t = now(), T = ioTot(x.r, t - 24 * HR, t), U = urine(x, 2), c = x.c, r = x.r;
    const tr = (TREND.find(y => y[0] === r.trend) || ['', 'eiga nenurodyta'])[1].toLowerCase(), cr = (CRIT.find(y => y[0] === r.crit) || ['', ''])[1].toLowerCase();
    return [
      ['Įžanga', [[p.name, p.id].filter(Boolean).join(', ') || 'Šaukinys —', p.unit, s.contact ? 'ryšys ' + s.contact : ''].filter(Boolean).join(', ') + '. Realus atvejis / treniruotė: ___'],
      ['Santrauka', [[x.label, r.age ? r.age + ' m.' : '', sexName(c), r.status].filter(Boolean).join(', '), mechTxt(c) ? 'Mechanizmas: ' + mechTxt(c) : '', 'Nuo traumos ' + (x.tInj ? dur(t - x.tInj) : '—'), 'Evakuacija: ' + (etaTxt(r, t) || 'nežinoma'), 'Būklė ' + cr + ', ' + tr].filter(Boolean).map(y => y.replace(/\.$/, '') + '.').join(' ')],
      ['Sužalojimai, problemos', MC.injText(c) || '—'],
      ['Gydymas', treatTxt(x)],
      ['Anamnezė', 'Alergijos: ' + (String(c.allerg || '').trim() || 'nežinoma') + '. Ligos, operacijos: ' + (r.hist || 'nežinoma') + '.'],
      ['Prašymas', r.tc.req || '—'],
      ['Rodikliai (tendencija)', trendTxt(x)],
      ['Apžiūra', r.tc.exam || '—'],
      ['Skysčiai per 24 val.', 'įvesta ' + T.in + ' ml, išskirta ' + T.out + ' ml, balansas ' + (T.net > 0 ? '+' : '') + T.net + ' ml; diurezė ' + (x.kg && U.mlkg != null ? fmt2(U.mlkg) + ' ml/kg/val.' : U.mlh + ' ml/val.') + (x.kg ? ', svoris ' + x.kg + ' kg' : '')],
      ['Ištekliai', r.tc.res || '—']
    ];
  }
  const teleText = x => 'TELEKONSULTACIJA\n' + teleLines(x).map(([l, v]) => l.toUpperCase() + ': ' + v).join('\n');
  function atmistLines(x) {
    const L = x.vits[x.vits.length - 1], t = now(), T = ioTot(x.r, careStart(x), t), c = x.c, r = x.r;
    return [
      ['A – amžius, lytis, anamnezė', [r.age ? r.age + ' m.' : '', sexName(c), String(c.allerg || '').trim() ? 'alergijos: ' + String(c.allerg).trim() : '', r.hist].filter(Boolean).join(', ') || '—'],
      ['T – traumos laikas', x.tInj ? hm(x.tInj) + ' (prieš ' + dur(t - x.tInj) + ')' : '—'],
      ['M – mechanizmas', mechTxt(c) || '—'],
      ['I – sužalojimai', MC.injText(c) || '—'],
      ['S – požymiai', L ? vitText(L) + (r.trend ? '; ' + (TREND.find(y => y[0] === r.trend) || ['', ''])[1].toLowerCase() : '') : '—'],
      ['T – gydymas', treatTxt(x) + '. Skysčiai: įvesta ' + T.in + ' ml, išskirta ' + T.out + ' ml'],
      ['E – evakuacija', [evacName(c), etaTxt(r, t)].filter(Boolean).join(', ') || '—'],
      ['R – ko reikės', r.tc.res || '—']
    ];
  }
  const atmistText = x => 'ATMISTER\n' + atmistLines(x).map(([l, v]) => l.split(' – ')[0] + ' – ' + v).join('\n');
  const readLines = L => L.map(([l, v]) => `<small>${esc(l)}</small>${esc(v || '—')}`);

  // ───────── pasiruošimas evakuacijai ─────────
  const EVCK = [
    ['req', 'Evakuacijos prašymas pateiktas (9-Line), prioritetas peržiūrėtas', 'Galvos trauma blogėja – prioritetą didinti'],
    ['sup', 'Vaistai, skysčiai, kraujas ir priemonės kelionei paruošti', 'Su atsarga vėlavimui'],
    ['tq', 'Turniketai, tvarsčiai, įtvarai patikrinti; turniketų laikas pažymėtas', ''],
    ['line', 'Linijos, vamzdeliai, kateteris, drenai pritvirtinti', ''],
    ['hypo', 'Apsauga nuo hipotermijos: izoliacija, šildymas, vėjo ir drėgmės apsauga', 'Aktyvaus šildymo tiesiai ant odos nedėti'],
    ['pack', 'Pakuotas ir pritvirtintas neštuvuose; akių, ausų apsauga', ''],
    ['doc', 'Dokumentai kartu: MIST kortelė, stebėjimo lapas', ''],
    ['ho', 'Perdavimas parengtas (ATMISTER), pirmiausia – vaistai', ''],
    ['wpn', 'Ginklas, šaudmenys ir jautrūs daiktai perduoti pagal SOP', '']
  ];
  const evDone = r => EVCK.filter(([k]) => r.evck[k]).length;
  function evacBlock(x) {
    const r = x.r;
    let h = `<div class="cl"><div class="muted cnt">${evDone(r)} / ${EVCK.length}</div><div class="prog"><i style="width:${Math.round(evDone(r) / EVCK.length * 100)}%"></i></div>` +
      EVCK.map(([k, t, s]) => `<div class="ck${r.evck[k] ? ' on' : ''}" data-act="pc-evck" data-k="${k}" role="checkbox" aria-checked="${!!r.evck[k]}" tabindex="0"><span class="bx">✓</span><div class="t"><span class="tt">${esc(t)}</span>${s ? `<div class="muted">${esc(s)}</div>` : ''}</div></div>`).join('') + '</div>';
    h += '<h2>Kategorija ir laikas</h2><div class="opts">' + (MC.EVAC || []).map(([k, lt, en]) => ch('pc-evac', k, x.c.evac === k, lt + ' · ' + en)).join('') + '</div>' +
      `<div class="acts"><button class="btn" data-act="pc-eta">Evakuacija: ${r.eta ? hm(r.eta) + (r.eta > now() ? ' (po ' + dur(r.eta - now()) + ')' : '') : 'laikas —'}</button></div>`;
    return h + srcLine('pcc');
  }

  // ───────── skiltys ─────────
  const btns = a => '<div class="pcbtns">' + a.map(([act, k, lb, pri]) => `<button class="btn${pri ? ' pri' : ''}" data-act="${act}"${k ? ` data-k="${k}"` : ''}>${esc(lb)}</button>`).join('') + '</div>';
  const critChips = r => '<div class="chips pccrit" role="group" aria-label="Būklė">' + CRIT.map(([k, t]) => ch('pc-crit', k, r.crit === k, t, k)).join('') + '</div>';
  function secApz(x, H) {
    const r = x.r, c = x.c, t = now();
    let h = H.quick(false) + critChips(r) + '<div class="chips" role="group" aria-label="Eiga">' + TREND.map(([k, lb]) => ch('pc-trend', k, r.trend === k, lb)).join('') + '</div>';
    const inj = MC.injText(c), ev = [evacName(c), etaTxt(r, t)].filter(Boolean).join(' · ');
    h += '<div class="card pcsec"><div class="pckv">' + (inj ? `<b>Sužalojimai</b><span>${esc(inj)}</span>` : '') + `<b>Alergijos</b><span>${esc(String(c.allerg || '').trim() || '—')}</span>` +
      (r.age || r.status ? `<b>Asmuo</b><span>${esc([r.age ? r.age + ' m.' : '', r.status].filter(Boolean).join(', '))}</span>` : '') + `<b>Evakuacija</b><span>${esc(ev || '—')}</span></div>` +
      '<div class="acts"><button class="btn sm" data-act="pc-pt">✎ Duomenys</button></div></div>';
    const d = dueList(x, 5); if (d) h += '<h2>Artėja ir vėluoja</h2><div class="pcl">' + d + '</div>';
    if (x.vits.length) h += '<h2>Paskutiniai rodikliai · ' + hm(x.vits[x.vits.length - 1].t) + '</h2>' + sparks(x.vits);
    if (r.io.some(e => e.type === 'slap')) h += uoBox(x, urine(x, 2), 2);
    h += '<h2>Turniketai</h2>' + tqBlock(x, false);
    return h;
  }
  function secRod(x) {
    const r = x.r;
    let h = btns([['pc-vit', '', '+ Matavimas', 1]]) + '<div class="lbl">Matuoti kas</div><div class="chips" role="group" aria-label="Matavimų intervalas">' + VINT.map(([m, t]) => ch('pc-vint', m, +r.vint === m, t)).join('') + '</div>';
    h += '<p class="muted">Kritinė – kas 15–30 min, kol stabilizuojasi; rimta – kas 4 val.; nekritinė – kas 12 val.</p>';
    if (!x.vits.length) return h + '<p class="muted">Matavimų dar nėra.</p>' + srcLine('nurse', 'doc');
    h += sparks(x.vits) + vitTable(x.vits);
    const L = x.vits[x.vits.length - 1], si = shockIdx(L), mp = mapOf(L);
    if (si || mp) h += `<p class="muted">${mp ? 'VAKS ' + mp + ' mm Hg' : ''}${si && mp ? ' · ' : ''}${si ? 'šoko indeksas ' + fmt1(si) + (si >= 1 ? ' – <b>≥ 1</b>' : '') : ''}</p>`;
    h += '<p class="muted">Tikslai: SpO₂ ≥ 92 %; sAKS > 90 (geriau 100–110) mm Hg arba čiuopiamas radialinis pulsas; galvos trauma – sAKS > 90, neurologinė apžiūra kas valandą.</p>';
    return h + srcLine('pcc', 'nurse', 'doc');
  }
  function secSks(x) {
    const r = x.r, t = now(), st = careStart(x), w = +S().uoh || 2;
    const A = [ioTot(r, t - HR, t), ioTot(r, st, t), ioTot(r, t - 24 * HR, t)];
    let h = btns([['pc-io', 'in', '+ Įvesta', 1], ['pc-io', 'out', '+ Išskirta', 1]]);
    h += '<div class="pctot"><div class="h">1 val.</div><div class="h">Nuo ' + (x.tInj ? 'traumos' : 'pradžios') + '</div><div class="h">24 val.</div>' +
      A.map(y => `<div><small>Įvesta</small><b>${y.in}</b></div>`).join('') + A.map(y => `<div><small>Išskirta</small><b>${y.out}</b></div>`).join('') +
      A.map(y => `<div><small>Balansas</small><b>${y.net > 0 ? '+' : ''}${y.net}</b></div>`).join('') + '</div><p class="muted">ml</p>';
    h += '<h2>Diurezė</h2><div class="chips" role="group" aria-label="Laikotarpis">' + [1, 2, 4, 6].map(n => ch('pc-uoh', n, w === n, n + ' val.')).join('') + '</div>';
    h += uoBox(x, urine(x, w), w);
    h += '<div class="chips">' + ch('pc-burns', '1', r.burns, (r.burns ? '✓ ' : '') + 'Nudegimai (tikslas 0,5–1 ml/kg/val.)') + '</div>';
    h += '<p class="muted">Palaikomieji skysčiai: intubuotam ar sedatuotam – 100–150 ml/val. IV/IO pagal diurezę; sąmoningam – ~100–125 ml/val. per burną. Laisvo vandens (5 % gliukozės) venkite.</p>';
    if (r.io.length) h += '<h2>Įrašai</h2><div class="pcl">' + r.io.slice().sort((a, b) => b.t - a.t).map(e => `<div class="pcli"><span class="tm">${dhm(e.t)}</span><div class="x">${e.k === 'in' ? '↓' : '↑'} ${esc(ioName(e.k, e.type))}${e.note ? `<small>${esc(e.note)}</small>` : ''}</div><b>${e.k === 'in' ? '+' : '−'}${e.ml}</b><button class="del" data-act="pc-iodel" data-k="${esc(e.id)}" aria-label="Ištrinti">×</button></div>`).join('') + '</div>';
    return h + srcLine('pcc', 'nurse');
  }
  function secVst(x) {
    const ms = medState(x).sort((a, b) => a.due - b.due);
    let h = btns([['pc-med', 'med', '+ Vaistas', 1], ['pc-med', 'int', '+ Veiksmas']]);
    if (ms.length) h += '<h2>Kitos dozės</h2><div class="pcl">' + ms.map(m => medRow(x, m)).join('') + '</div>';
    h += '<p class="muted">PCC: titruoti po mažiau, kartoti dažniau; pirmenybė IV/IO; naloksoną laikykite po ranka.</p>';
    const j = journal(x);
    h += '<h2>Žurnalas</h2>' + (j ? '<div class="pcl">' + j + '</div>' : '<p class="muted">Įrašų dar nėra.</p>');
    return h + ((E.vaistai || []).length ? row('#/vaistai', 'Vaistai', 'Dozės, įspėjimai') : '') + srcLine('pcc');
  }
  function secPrz(x) {
    const r = x.r, cs = careState(x);
    let h = critChips(r) + '<p class="muted">Intervalai pagal būklę: kritinė – trumpesni.</p>';
    h += '<div class="pcl">' + cs.map(c => careRow(x, c)).join('') + '</div>';
    h += '<div class="chips">' + ch('pc-tbi', '1', r.tbi, (r.tbi ? '✓ ' : '') + 'Galvos trauma') + ch('pc-heat', '1', !!r.care.sild, (r.care.sild ? '✓ ' : '') + 'Šildanti antklodė') + '</div>';
    const offs = CARE.filter(c => r.off[c[0]]);
    h += '<details class="alt"><summary>Netaikomi punktai' + (offs.length ? ' (' + offs.length + ')' : '') + '</summary><div class="opts">' +
      CARE.filter(c => !c[5] && c[0] !== 'vit').map(c => ch('pc-off', c[0], !!r.off[c[0]], (r.off[c[0]] ? '✓ ' : '') + shortNm(c[1]))).join('') + '</div><p class="muted">Pažymėti punktai nerodomi ir nepriminami.</p></details>';
    return h + srcLine('nurse', 'plan', 'pcc');
  }
  function teleBlock(x) {
    const tc = x.r.tc, ta = (k, lb, ph, n) => `<label class="lbl" for="pc-tc-${k}">${lb}</label><textarea class="inp" id="pc-tc-${k}" data-pc="tc:${k}" data-dict rows="${n || 2}" placeholder="${esc(ph || '')}">${esc(tc[k])}</textarea>`;
    let h = '<p class="muted">Prieš skambutį nusiųskite stebėjimo lapą ir nuotraukas. Skambina komandos narys – medikas lieka prie sužeistojo. Rekomendacijas pakartokite.</p>';
    h += ta('req', 'Prašymas – kokios pagalbos reikia', 'pvz. ar tęsti skysčius, antibiotikas, evakuacijos prioritetas') + ta('exam', 'Apžiūra pagal sistemas', 'Neuro; galūnės; širdis, pulsai; plaučiai; oda, žaizdos; pilvas', 3) + ta('res', 'Ištekliai', 'Prieigos, monitorius, skysčiai, kraujas, vaistai, ryšys');
    h += `<pre class="pcout" id="pc-tc-out">${esc(teleText(x))}</pre>`;
    h += '<div class="acts"><button class="btn pri" data-act="pc-tcread">Skaityti</button><button class="btn" data-act="pc-tccopy">Kopijuoti</button><button class="btn" data-act="pc-tcshare">Bendrinti</button></div>';
    h += ta('rec', 'Konsultanto rekomendacijos (užsirašykite ir pakartokite)', '', 3) + srcLine('doc', 'tele');
    h += '<h2>ATMISTER perdavimas</h2>' + `<pre class="pcout" id="pc-at-out">${esc(atmistText(x))}</pre>` +
      '<div class="acts"><button class="btn pri" data-act="pc-atread">Skaityti</button><button class="btn" data-act="pc-atcopy">Kopijuoti</button><button class="btn" data-act="pc-atshare">Bendrinti</button></div><p class="muted">Perduodant pirmiausia – vaistai.</p>';
    return h;
  }
  function secPerduoti(x) {
    let h = '<h2>Telekonsultacija</h2>' + teleBlock(x);
    h += '<h2>MIST ir QR</h2>' + MC.outView();
    h += '<h2>Evakuacija</h2>' + row('#/evakuacija', 'Pasiruošimas evakuacijai', evDone(x.r) + ' / ' + EVCK.length + (x.r.eta ? ' · ' + hm(x.r.eta) : ''));
    h += tcfgRows([['#/9line', '9-Line MEDEVAC', NL.status()], ['#/sitrep', 'SITREP – padėties pranešimas', SR.status()], ['#/qr-priimti', 'Priimti pacientą QR kodu', 'Nuskaityti kito telefono kodą']]);
    h += '<button class="btn dng" data-act="op-wipe" style="width:100%;margin-top:14px">Ištrinti visų sužeistųjų duomenis</button>';
    return h;
  }
  const SEC = { apz: secApz, rod: secRod, sks: secSks, vst: secVst, prz: secPrz, perduoti: secPerduoti };
  function sec(k, hx, H) { const x = X(hx && hx.p ? hx.p.pid : ''); if (!x) return notFound(); return SEC[k](x, H); }

  // Hub laikų plytelės: trauma (keičiama MIST laiko langu), evakuacija, turniketas
  function timers() {
    const x = X(); if (!x) return '';
    const t = now(), q = tqs(x).filter(z => !z.conv && z.t).sort((a, b) => a.t - b.t)[0], qs = q ? tqState(q) : '';
    const card = (cl, lb, v, s, a) => `<button class="hbtm ${cl}" ${a} aria-label="${esc(lb + ': ' + v + (s ? ', ' + s : ''))}"><small>${lb}</small><b>${esc(v)}</b>${s ? `<small>${esc(s)}</small>` : ''}</button>`;
    return '<div class="hbtms">' +
      card('', 'Nuo traumos', x.tInj ? hmm(t - x.tInj) : '—', x.tInj ? hm(x.tInj) : 'nustatyti', 'data-act="hb-sh" data-sh="time" data-f="trauma"') +
      card(x.r.eta && x.r.eta < t ? 'red' : '', 'Evakuacija', x.r.eta ? (x.r.eta > t ? hmm(x.r.eta - t) : 'vėluoja') : '—', x.r.eta ? hm(x.r.eta) : 'nustatyti', 'data-act="pc-eta"') +
      card(qs === 'late' ? 'red' : qs === 'win' ? 'amb' : q ? 'amb' : '', 'Turniketas', q ? hmm(t - q.t) : '—', q ? q.limb : 'neuždėtas', 'data-act="go" data-r="#/turniketai"') + '</div>';
  }
  // Atskiri puslapiai (plytelės): telekonsultacija, turniketai, evakuacija – dabartiniam pacientui
  function page(k) {
    const x = X(); if (!x) return notFound();
    const bar = PT.bar().replace(/<a class="ptf"[^>]*>[^<]*<\/a>/, '');
    const T = { tc: 'Telekonsultacija', tq: 'Turniketai', evac: 'Pasiruošimas evakuacijai' };
    let h = bar + `<h1>${T[k]}<small class="muted" style="display:block;font-weight:400;font-size:14px">${esc(x.label)}</small></h1>`;
    if (k === 'tq') h += remAll(x.pid).filter(y => /^ptq:/.test(y.key)).map(remRow).join('');
    if (k === 'tc') h += teleBlock(x);
    else if (k === 'tq') h += tqBlock(x, true);
    else h += evacBlock(x);
    return h + row('#/pacientas', 'Paciento failas', 'Rodikliai, skysčiai, priežiūra, perdavimas');
  }
  // Priminimai: visų sužeistųjų vėluojantys ir artėjantys darbai
  function remView() {
    const L = PT.list(), multi = L.pts.length > 1;
    let h = '<h1>Priminimai</h1>';
    const other = remAll().filter(x => !isPcc(x.key));
    h += other.map(remRow).join('');
    let any = false, soon = [];
    L.pts.forEach(p => {
      const x = X(p.pid); if (!x) return;
      const cs = careState(x), ms = medState(x), tq = tqs(x).filter(q => !q.conv && q.t && tqState(q) !== 'early');
      const due = cs.filter(c => c.st === 'due' || c.st === 'over'), md = ms.filter(m => m.st === 'due' || m.st === 'over');
      cs.filter(c => c.st === 'soon').forEach(c => soon.push([x, c.nm, c.due])); ms.filter(m => m.st === 'soon').forEach(m => soon.push([x, m.m.name, m.due]));
      if (!due.length && !md.length && !tq.length) return;
      any = true;
      h += `<h2>${esc((multi ? '#' + x.n + ' ' : '') + x.label)}</h2><div class="pcl">` +
        tq.map(q => { const s = tqState(q); return `<a class="pcli ${s === 'late' ? 'over' : 'due'}" href="#/turniketai" data-act="pc-sel" data-p="${esc(x.pid)}" data-r="#/turniketai"><div class="x">Turniketas · ${esc(q.limb)}<small>${hm(q.t)} · ${dur(now() - q.t)} · ${tqTxt(q)}</small></div><span class="ar">›</span></a>`; }).join('') +
        due.sort((a, b) => a.due - b.due).map(c => careRow(x, c)).join('') + md.map(m => medRow(x, m)).join('') + '</div>';
    });
    if (!any && !other.length) h += '<p class="muted">Vėluojančių darbų nėra.</p>';
    if (soon.length) h += '<h2>Artėja (15 min)</h2><div class="pcl">' + soon.sort((a, b) => a[2] - b[2]).map(([x, nm, due]) => `<a class="pcli" href="#/pacientas?t=prz" data-act="pc-sel" data-p="${esc(x.pid)}" data-r="#/pacientas?t=prz"><div class="x">${esc(shortNm(nm))}<small>${esc((multi ? '#' + x.n + ' ' : '') + x.label)}</small></div><span class="tm">${hm(due)}</span></a>`).join('') + '</div>';
    return h + '<p class="muted">Priminimai veikia, kai programėlė atverta. ✓ – atlikta dabar.</p>';
  }

  // Plytelių būsena (pradžios ekranas)
  function st(k) {
    const x = X(); if (!x) return '';
    const r = x.r, t = now();
    switch (k) {
      case 'rod': { const v = x.vits[x.vits.length - 1]; return v ? hm(v.t) + (has(v.hr) ? ' · P ' + v.hr : '') + (has(v.sys) ? ' · AKS ' + v.sys : '') : ''; }
      case 'sks': { if (!r.io.length) return ''; const T = ioTot(r, careStart(x), t); return (T.net > 0 ? '+' : '') + T.net + ' ml'; }
      case 'vst': { const m = medState(x).sort((a, b) => a.due - b.due)[0]; return m ? m.m.name + ' ' + (m.st === 'over' || m.st === 'due' ? 'dabar' : hm(m.due)) : r.meds.length ? plural(r.meds.length, ['įrašas', 'įrašai', 'įrašų']) : ''; }
      case 'prz': { const n = careState(x).filter(c => c.st === 'due' || c.st === 'over').length; return n ? 'vėluoja ' + n : ''; }
      case 'tq': { const q = tqs(x).filter(z => !z.conv && z.t).sort((a, b) => a.t - b.t)[0]; return q ? q.limb + ' ' + hmm(t - q.t) : ''; }
      case 'evac': return evDone(r) ? evDone(r) + ' / ' + EVCK.length : r.eta ? hm(r.eta) : '';
      case 'tc': return r.tc.req || r.tc.exam ? 'pildoma' : '';
    }
    return '';
  }

  // ───────── apatiniai langai (MIST kortelės langų išvaizda: .mqsh, klaviatūra, laiko lustai) ─────────
  let SH = null, shEl = null, shPrev = null, shInert = [], skipPop = false;
  const TBACK = [[0, 'Dabar'], [5, '−5 min'], [10, '−10'], [15, '−15'], [30, '−30']];
  const tRow = (list) => '<div class="mqrow mqtm" role="group" aria-label="Laikas">' + (list || TBACK).map(([m, l]) => `<button class="mqc${SH.toff === m ? ' on' : ''}" data-pa="toff" data-v="${m}" aria-pressed="${SH.toff === m}">${l}</button>`).join('') + '</div>';
  const shTs = () => now() - (+SH.toff || 0) * MIN;
  const kpad = (sa, left, right) => '<div class="mqkp" role="group" aria-label="Skaičių klaviatūra">' + ['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(d => `<button data-pa="${sa}" data-v="${d}">${d}</button>`).join('') +
    left + `<button data-pa="${sa}" data-v="0">0</button>` + right + '</div>';
  const kDel = sa => `<button data-pa="${sa}" data-v="del" aria-label="Ištrinti">⌫</button>`;
  const VFS = [['hr', 'Pulsas', '/min'], ['bp', 'AKS', 'mm Hg'], ['rr', 'KD', '/min'], ['spo2', 'SpO₂', '%'], ['temp', 'T', '°C'], ['gcs', 'GKS', '3–15'], ['pain', 'Skausm.', '0–10']];
  function body() {
    const s = SH, x = X(s.pid);
    if (!x) return { title: '', h: '', foot: '' };
    switch (s.kind) {
      case 'vit': {
        const V = s.v, P0 = x.vits[x.vits.length - 1] || null;
        const shown = k => k === 'bp' ? (V.sys ? V.sys + '/' + (V.dia || '') : '—') : (V[k] !== '' && V[k] != null ? V[k] : '—');
        const prevOf = k => { if (!P0) return ''; if (k === 'bp') return has(P0.sys) ? P0.sys + (has(P0.dia) ? '/' + P0.dia : '') : ''; return has(P0[k]) ? String(k === 'temp' ? fmt1(P0[k]) : P0[k]) : ''; };
        const ab = k => k === 'bp' ? abn('sys', V.sys) : abn(k, String(V[k] || '').replace(',', '.'));
        let h = tRow() + '<div class="mqavpu" role="radiogroup" aria-label="Sąmonė (AVPU)">' + AVPU.map(([k, t]) => `<button role="radio" aria-checked="${V.avpu === k}" class="${V.avpu === k ? 'on' : ''}" data-pa="av" data-v="${k}"><b>${k}</b><small>${t}</small></button>`).join('') + '</div>' +
          '<div class="mqvf n7" role="tablist" aria-label="Rodiklis">' + VFS.map(([k, lb]) => `<button role="tab" aria-selected="${s.fk === k}" class="${s.fk === k ? 'on' : ''}${ab(k) ? ' ab' : ''}" data-pa="fk" data-v="${k}"><span>${lb}</span><b>${esc(shown(k))}</b>${prevOf(k) ? `<small class="mqpv">anksčiau ${esc(prevOf(k))}</small>` : ''}</button>`).join('') + '</div>';
        const f = VFS.find(y => y[0] === s.fk);
        if (s.fk === 'bp') h += `<div class="mqdisp"><button class="mqbp${s.bpd ? '' : ' cur'}" data-pa="bpd" data-v="0" aria-label="Sistolinis">${esc(V.sys || '—')}</button><span>/</span><button class="mqbp${s.bpd ? ' cur' : ''}" data-pa="bpd" data-v="1" aria-label="Diastolinis">${esc(V.dia || '—')}</button><small>mm Hg · ${s.bpd ? 'diastolinis' : 'sistolinis'}</small></div>` + kpad('kp', kDel('kp'), '<button data-pa="kp" data-v="next" class="nx">Toliau ›</button>');
        else if (s.fk === 'pain') h += `<div class="mqdisp"><b class="cur">${esc(has(V.pain) ? V.pain : '—')}</b><small>skausmas 0–10</small></div><div class="mqpain" role="radiogroup" aria-label="Skausmo skalė">` + Array.from({ length: 11 }, (_, i) => `<button role="radio" aria-checked="${V.pain === String(i)}" class="${V.pain === String(i) ? 'on' : ''}" data-pa="pain" data-v="${i}">${i}</button>`).join('') + '</div>';
        else h += `<div class="mqdisp"><b class="cur${ab(s.fk) ? ' ab' : ''}">${esc(has(V[s.fk]) && V[s.fk] !== '' ? V[s.fk] : '—')}</b><small>${esc(f[2])}</small></div>` +
          (s.fk === 'temp' ? kpad('kp', '<button data-pa="kp" data-v=",">,</button>', kDel('kp')) + '<div class="mqrow"><button class="mqc" data-pa="kp" data-v="next">Toliau ›</button></div>' : kpad('kp', kDel('kp'), '<button data-pa="kp" data-v="next" class="nx">Toliau ›</button>'));
        h += '<div class="mqlab">Kapiliarų prisipildymas</div><div class="mqrow">' + CRT.map(([k, t]) => `<button class="mqc${V.crt === k ? ' on' : ''}" data-pa="crt" data-v="${esc(k)}" aria-pressed="${V.crt === k}">${t}</button>`).join('') + '</div>';
        return { title: 'Rodikliai', h, foot: `<button class="btn pri mqsave" data-pa="save">Įrašyti ${hm(shTs())} matavimą</button>` };
      }
      case 'io': {
        const L = s.k === 'in' ? IN_T : OUT_T, q = s.k === 'in' ? [100, 250, 500, 1000] : [50, 100, 200, 500];
        let h = '<div class="mqrow">' + L.map(([k, t]) => `<button class="mqc${s.typ === k ? ' on' : ''}" data-pa="typ" data-v="${k}" aria-pressed="${s.typ === k}">${t}</button>`).join('') + '</div>' +
          `<div class="mqdisp"><b class="cur">${esc(s.ml || '0')}</b><small>ml</small></div><div class="mqrow">` + q.map(m => `<button class="mqc${String(m) === s.ml ? ' on' : ''}" data-pa="q" data-v="${m}">${m} ml</button>`).join('') + '</div>' +
          kpad('ml', '<button data-pa="ml" data-v="clr" aria-label="Išvalyti">C</button>', kDel('ml')) + '<div class="mqlab">Laikas</div>' + tRow(TBACK.concat([[60, '−1 val.']])) +
          `<label class="mqf">Pastaba<input class="inp" data-si="note" data-dict value="${esc(s.note)}" placeholder="${s.k === 'in' ? 'pvz. Ringerio laktatas, pilnas kraujas O' : 'pvz. drenas D'}" autocomplete="off"></label>`;
        const ok2 = +s.ml > 0;
        return { title: s.k === 'in' ? 'Įvesta (skysčiai)' : 'Išskirta', h, foot: `<button class="btn pri mqsave" data-pa="save"${ok2 ? '' : ' disabled'}>${ok2 ? 'Įrašyti: ' + esc(ioName(s.k, s.typ)) + ' ' + s.ml + ' ml · ' + hm(shTs()) : 'Įveskite kiekį'}</button>` };
      }
      case 'med': {
        const isInt = s.mk === 'int', v = !isInt && drugOf(s.name), qd = v ? ((TCFG.qd || {})[v.id] || []) : [];
        const names = isInt ? INTS : (E.vaistai || []).filter(y => typeof ok !== 'function' || ok(y.lygis)).map(dname);
        let h = `<label class="mqf">${isInt ? 'Veiksmas' : 'Vaistas'}<input class="inp" id="pc-mname" data-si="name" data-dict value="${esc(s.name)}" placeholder="${isInt ? 'Veiksmas' : 'Vaisto pavadinimas'}" autocomplete="off"></label>` +
          (names.length ? '<div class="mqrow">' + names.map(n => `<button class="mqc sm${s.name === n ? ' on' : ''}" data-pa="name" data-v="${esc(n)}">${esc(n)}</button>`).join('') + '</div>' : '');
        if (!isInt) {
          if (qd.length) h += '<div class="mqlab">Dozė (iš gido)</div><div class="mqrow">' + qd.map(([r, a, u]) => `<button class="mqc big${s.dose === a + ' ' + u && s.route === r ? ' on' : ''}" data-pa="qd" data-v="${esc(r + '|' + a + ' ' + u)}"><b>${esc(a + ' ' + u)}</b><small>${esc(r)}</small></button>`).join('') + '</div>';
          h += `<label class="mqf">Dozė<input class="inp" data-si="dose" value="${esc(s.dose)}" placeholder="pvz. 1 g" autocomplete="off"></label>` +
            '<div class="mqlab">Būdas</div><div class="mqrow">' + ROUTES.map(r => `<button class="mqc${s.route === r ? ' on' : ''}" data-pa="route" data-v="${r}" aria-pressed="${s.route === r}">${r}</button>`).join('') + '</div>' +
            '<div class="mqlab">Kartoti kas</div><div class="mqrow">' + MIVL.map(([m, t]) => `<button class="mqc${s.ivl === m ? ' on' : ''}" data-pa="ivl" data-v="${m}" aria-pressed="${s.ivl === m}">${t}</button>`).join('') + '</div>' +
            (v ? `<div class="mqrow"><a class="mqc" href="#/vaistas/${esc(v.id)}">Dozės gide ›</a></div>` : '');
        }
        h += '<div class="mqlab">Laikas</div>' + tRow() + `<label class="mqf">Pastaba<input class="inp" data-si="note" data-dict value="${esc(s.note)}" autocomplete="off"></label>`;
        const nm = String(s.name || '').trim();
        return { title: isInt ? 'Veiksmas' : 'Vaistas', h, foot: `<button class="btn pri mqsave" data-pa="save"${nm ? '' : ' disabled'}>${nm ? 'Įrašyti: ' + esc([nm, s.dose, isInt ? '' : s.route].filter(Boolean).join(' ')) + ' · ' + hm(shTs()) : 'Įveskite pavadinimą'}</button>` };
      }
      case 'kg': {
        const h = '<div class="mqrow">' + [60, 70, 80, 90, 100, 110, 120].map(k => `<button class="mqc${String(k) === s.buf ? ' on' : ''}" data-pa="kgq" data-v="${k}">${k} kg</button>`).join('') + '</div>' +
          `<div class="mqdisp"><b class="cur">${esc(s.buf || '—')}</b><small>kg</small></div>` + kpad('kg', '<button data-pa="kg" data-v="clr" aria-label="Išvalyti">C</button>', kDel('kg'));
        const ok2 = +s.buf >= 3 && +s.buf <= 250;
        return { title: 'Svoris', h, foot: `<button class="btn pri mqsave" data-pa="save"${ok2 ? '' : ' disabled'}>${ok2 ? 'Gerai · ' + s.buf + ' kg' : 'Svoris 3–250 kg'}</button>` };
      }
      case 'eta': {
        const b = s.buf || '', d = (b + '____').slice(0, 4), val = b.length === 4 ? b.slice(0, 2) + ':' + b.slice(2) : '', ok2 = /^([01]\d|2[0-3]):[0-5]\d$/.test(val);
        const h = (x.r.eta ? `<p class="muted mqhint">Dabar: <b>${hm(x.r.eta)}</b></p>` : '') + '<div class="mqrow">' + [[30, '+30 min'], [60, '+1 val.'], [120, '+2'], [240, '+4'], [480, '+8'], [720, '+12'], [1440, '+24']].map(([m, l]) => `<button class="mqc" data-pa="rel" data-v="${m}">${l}</button>`).join('') + '</div>' +
          `<div class="mqdisp"><b class="cur">${(d.slice(0, 2) + ':' + d.slice(2)).replace(/_/g, '–')}</b><small>valandos : minutės</small></div>` + kpad('tkp', '<button data-pa="tkp" data-v="clr" aria-label="Išvalyti">C</button>', kDel('tkp'));
        return { title: 'Numatomas evakuacijos laikas', h, foot: '<div class="mqg2">' + (x.r.eta ? '<button class="btn mqsave" data-pa="etaclr">Išvalyti</button>' : '') + `<button class="btn pri mqsave" data-pa="save"${ok2 ? '' : ' disabled'}>${ok2 ? 'Gerai · ' + val : 'Įveskite laiką'}</button></div>` };
      }
      case 'pt': {
        const c = x.c, r = x.r, inp = (k, lb, v, ph) => `<label class="mqf">${lb}<input class="inp" data-si="${k}" data-dict value="${esc(v)}" placeholder="${esc(ph || '')}" autocomplete="off"></label>`;
        let h = inp('c:id', 'ID, šaukinys', c.id, 'be vardo ir pavardės') +
          '<div class="mqrow">' + [['V', 'Vyras'], ['M', 'Moteris']].map(([k, t]) => `<button class="mqc${c.sex === k ? ' on' : ''}" data-pa="sex" data-v="${k}">${t}</button>`).join('') + '</div>' +
          inp('r:age', 'Amžius', r.age, 'metai') +
          '<div class="mqrow">' + ['LT karys', 'Sąjungininkas', 'Civilis', 'Priešo karys'].map(t => `<button class="mqc sm${r.status === t ? ' on' : ''}" data-pa="status" data-v="${esc(t)}">${esc(t)}</button>`).join('') + '</div>' +
          '<div class="mqlab">Mechanizmas</div><div class="mqrow">' + (MC.MECH || []).map(([m]) => `<button class="mqc sm${(c.mech || []).indexOf(m) >= 0 ? ' on' : ''}" data-pa="mech" data-v="${esc(m)}">${esc(m)}</button>`).join('') + '</div>' +
          inp('c:mechTxt', 'Mechanizmas – patikslinimas', c.mechTxt, 'pvz. minosvaidžio mina') + inp('c:injTxt', 'Sužalojimai, problemos', c.injTxt, 'schemos žymės – MIST kortelėje') +
          inp('c:allerg', 'Alergijos', c.allerg, 'nežinoma / nėra / …') + inp('r:hist', 'Ligos, operacijos, vaistai', r.hist, '');
        h += `<div class="mqrow"><button class="mqc" data-pa="totr">⏱ Trauma ${x.tInj ? dhm(x.tInj) : '—'}</button><button class="mqc" data-pa="tokg">⚖ ${x.kg ? x.kg + ' kg' : 'Svoris'}</button><button class="mqc" data-pa="toeta">Evakuacija ${r.eta ? hm(r.eta) : '—'}</button></div>`;
        h += '<div class="mqlab">Evakuacijos kategorija</div><div class="mqrow">' + (MC.EVAC || []).map(([k, lt, en]) => `<button class="mqc sm${c.evac === k ? ' on' : ''}" data-pa="evac" data-v="${k}">${esc(lt + ' · ' + en)}</button>`).join('') + '</div>';
        h += '<div class="mqrow">' + `<button class="mqc${r.tbi ? ' on' : ''}" data-pa="tbi">${r.tbi ? '✓ ' : ''}Galvos trauma</button><button class="mqc${r.burns ? ' on' : ''}" data-pa="burns">${r.burns ? '✓ ' : ''}Nudegimai</button></div>`;
        return { title: 'Sužeistojo duomenys', h, foot: '<button class="btn pri mqsave" data-pa="close">Gerai</button>' };
      }
      case 'imp':
        return { title: 'Įkelti duomenis', h: '<p class="muted mqhint">Įklijuokite kitame telefone nukopijuotus duomenis. Sužeistieji bus pridėti prie esamų.</p><textarea class="inp" id="pc-imp" rows="6"></textarea>', foot: '<button class="btn pri mqsave" data-pa="save">Įkelti</button>' };
    }
    return { title: '', h: '', foot: '' };
  }
  function draw(first) {
    if (!SH || !shEl) return;
    const sb = shEl.querySelector('.mqshb'), y = sb ? sb.scrollTop : 0, a = document.activeElement, key = a && shEl.contains(a) && a.dataset ? [a.dataset.pa, a.dataset.v, a.dataset.si].join('|') : '';
    const B = body();
    shEl.innerHTML = '<div class="mqbg" data-pa="close" aria-hidden="true"></div>' +
      `<section class="mqsh" role="dialog" aria-modal="true" aria-labelledby="pcsht" tabindex="-1"><div class="mqshh">${SH.back ? '<button class="x" data-pa="back" aria-label="Atgal">‹</button>' : ''}<b id="pcsht">${esc(B.title)}</b><button class="x" data-pa="close" aria-label="Uždaryti">×</button></div>` +
      `<div class="mqshb">${B.h}</div><div class="mqshf">${B.foot}</div></section>`;
    document.documentElement.classList.add('mqopen');
    [document.querySelector('body > header'), app, document.getElementById('nav'), document.getElementById('glback')].forEach(e => { if (e && !e.hasAttribute('inert')) { e.setAttribute('inert', ''); shInert.push(e); } });
    try { if (typeof DICT !== 'undefined') DICT.enhance(shEl); } catch (e) {}
    const nb = shEl.querySelector('.mqshb'); if (nb && !first) nb.scrollTop = y;
    let f = key ? Array.from(shEl.querySelectorAll('[data-pa],[data-si]')).find(el => [el.dataset.pa, el.dataset.v, el.dataset.si].join('|') === key && !el.disabled) : null;
    if (!f) f = shEl.querySelector('.mqsh');
    try { f.focus({ preventScroll: true }); } catch (e) {}
  }
  function open(st, o) {
    o = o || {};
    const x = X(st.pid); if (!x) return;
    SH = Object.assign({ toff: 0 }, st, { pid: x.pid });
    if (!shEl) {
      shEl = document.createElement('div'); shEl.id = 'pcsh';
      shEl.addEventListener('click', e => { const el = e.target.closest('[data-pa]'); if (el && shEl.contains(el)) { e.preventDefault(); sact(el); } });
      shEl.addEventListener('input', e => sinput(e.target));
      document.body.appendChild(shEl);
    }
    if (!o.swap) {
      shPrev = document.activeElement;
      try { if (o.replace && history.state && history.state.hb) history.replaceState(Object.assign({}, history.state, { hb: 0, pcs: 1 }), ''); else history.pushState(Object.assign({}, history.state, { pcs: 1 }), ''); } catch (e) {}
    }
    draw(true);
  }
  function close(viaPop) {
    if (!SH) return;
    SH = null; if (shEl) shEl.innerHTML = '';
    document.documentElement.classList.remove('mqopen');
    shInert.forEach(e => e.removeAttribute('inert')); shInert = [];
    if (!viaPop && history.state && history.state.pcs) { skipPop = true; try { history.back(); } catch (e) { skipPop = false; } }
    const p = shPrev; shPrev = null;
    keepY();
    if (p && p.isConnected && p.focus) { try { p.focus({ preventScroll: true }); } catch (e) {} }
  }
  addEventListener('popstate', e => { if (skipPop) { skipPop = false; return; } if (SH && !(e.state && e.state.pcs)) close(true); });
  addEventListener('hashchange', () => { if (SH) { SH = null; if (shEl) shEl.innerHTML = ''; document.documentElement.classList.remove('mqopen'); shInert.forEach(e => e.removeAttribute('inert')); shInert = []; } });
  addEventListener('keydown', e => { if (SH && e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); if (SH.back) back(); else close(false); } }, true);
  const swap = st => { const b = SH ? Object.assign({}, SH) : null; open(Object.assign(st, { back: b }), { swap: true }); };
  const back = () => { const b = SH && SH.back; if (b) { SH = b; draw(true); } else close(false); };
  function sinput(t) {
    if (!SH || !t.dataset || !t.dataset.si) return;
    const k = t.dataset.si, v = t.value;
    if (k.indexOf('c:') === 0) { mcCard(SH.pid, c => { c[k.slice(2)] = v; }); return; }
    if (k.indexOf('r:') === 0) { upd(SH.pid, r => { r[k.slice(2)] = v; }); return; }
    SH[k] = v;
    const f = shEl.querySelector('.mqshf'); if (f && (k === 'name' || k === 'dose')) { const B = body(); f.innerHTML = B.foot; }
  }
  function sact(el) {
    const d = el.dataset, v = d.v, s = SH; if (!s) return;
    switch (d.pa) {
      case 'close': return close(false);
      case 'back': return back();
      case 'toff': s.toff = +v || 0; return draw();
      // rodikliai
      case 'av': s.v.avpu = s.v.avpu === v ? '' : v; return draw();
      case 'fk': s.fk = v; s.bpd = 0; return draw();
      case 'bpd': s.bpd = +v; return draw();
      case 'crt': s.v.crt = s.v.crt === v ? '' : v; return draw();
      case 'pain': s.v.pain = s.v.pain === v ? '' : v; vNext(); return draw();
      case 'kp': {
        if (v === 'next') { vNext(); return draw(); }
        const k = s.fk === 'bp' ? (s.bpd ? 'dia' : 'sys') : s.fk, cur = String(s.v[k] || '');
        if (v === 'del') s.v[k] = cur.slice(0, -1);
        else if (v === ',') { if (s.fk === 'temp' && cur && cur.indexOf(',') < 0) s.v[k] = cur + ','; }
        else s.v[k] = (cur + v).slice(0, s.fk === 'temp' ? 4 : 3);
        return draw();
      }
      case 'save': return save();
      // skysčiai
      case 'typ': s.typ = v; return draw();
      case 'q': s.ml = v; return draw();
      case 'ml': s.ml = v === 'del' ? String(s.ml || '').slice(0, -1) : v === 'clr' ? '' : (String(s.ml || '') + v).replace(/^0+/, '').slice(0, 5); return draw();
      // vaistai
      case 'name': s.name = v; { const dv = drugOf(v), q = dv ? ((TCFG.qd || {})[dv.id] || []) : []; if (q.length === 1 && !s.dose) { s.route = q[0][0]; s.dose = q[0][1] + ' ' + q[0][2]; } } return draw();
      case 'qd': { const [r, a] = v.split('|'); s.route = r; s.dose = a; return draw(); }
      case 'route': s.route = s.route === v ? '' : v; return draw();
      case 'ivl': s.ivl = +v || 0; return draw();
      // svoris, laikas
      case 'kgq': s.buf = v; return draw();
      case 'kg': s.buf = v === 'del' ? String(s.buf || '').slice(0, -1) : v === 'clr' ? '' : (String(s.buf || '') + v).slice(0, 3); return draw();
      case 'tkp': s.buf = v === 'del' ? String(s.buf || '').slice(0, -1) : v === 'clr' ? '' : (String(s.buf || '') + v).slice(0, 4); return draw();
      case 'rel': { const t = now() + (+v) * MIN; upd(s.pid, r => { r.eta = t; }); toast('Evakuacija ' + hm(t)); return back(); }
      case 'etaclr': upd(s.pid, r => { r.eta = 0; }); toast('Evakuacijos laikas išvalytas'); return back();
      // duomenys
      case 'sex': mcCard(s.pid, c => { c.sex = c.sex === v ? '' : v; }); return draw();
      case 'status': upd(s.pid, r => { r.status = r.status === v ? '' : v; }); return draw();
      case 'mech': mcCard(s.pid, c => { const i = (c.mech || []).indexOf(v); c.mech = c.mech || []; if (i >= 0) c.mech.splice(i, 1); else c.mech.push(v); }); return draw();
      case 'evac': mcCard(s.pid, c => { c.evac = c.evac === v ? '' : v; }); return draw();
      case 'tbi': upd(s.pid, r => { r.tbi = !r.tbi; }); return draw();
      case 'burns': upd(s.pid, r => { r.burns = !r.burns; }); return draw();
      case 'tokg': return swap({ kind: 'kg', pid: s.pid, buf: String(X(s.pid).kg || '') });
      case 'toeta': return swap({ kind: 'eta', pid: s.pid, buf: '' });
      case 'totr': { close(true); MC.sheet('time', { field: 'trauma' }); return; } // be history.back(): MIST laiko langas atsidaro iškart
    }
  }
  function vNext() {
    const s = SH, V = s.v;
    if (s.fk === 'bp' && !s.bpd && V.sys) { s.bpd = 1; return; }
    const i = VFS.findIndex(y => y[0] === s.fk); s.bpd = 0;
    if (i < VFS.length - 1) s.fk = VFS[i + 1][0];
  }
  function save() {
    const s = SH, x = X(s.pid); if (!x) return;
    switch (s.kind) {
      case 'vit': {
        const v = { id: uid(), t: shTs() };
        const raw = { hr: s.v.hr, sys: s.v.sys, dia: s.v.dia, rr: s.v.rr, spo2: s.v.spo2, temp: s.v.temp, gcs: s.v.gcs };
        for (const [k, nm, , mn, mx] of VF) {
          const r0 = String(raw[k] || '').replace(',', '.'); if (r0 === '') continue;
          const n = +r0; if (isNaN(n) || n < mn || n > mx) { s.fk = k === 'sys' || k === 'dia' ? 'bp' : k; s.bpd = k === 'dia' ? 1 : 0; draw(); return toast(nm + ': ' + mn + '–' + mx); }
          v[k] = k === 'temp' ? Math.round(n * 10) / 10 : Math.round(n);
        }
        if (v.sys && v.dia && v.dia >= v.sys) { s.fk = 'bp'; s.bpd = 1; draw(); return toast('Diastolinis turi būti mažesnis'); }
        ['avpu', 'crt'].forEach(k => { if (s.v[k]) v[k] = s.v[k]; });
        if (has(s.v.pain) && s.v.pain !== '') v.pain = +s.v.pain;
        if (Object.keys(v).length <= 2) return toast('Įveskite bent vieną rodiklį');
        upd(s.pid, r => { r.vit.push(v); r.vit.sort((a, b) => a.t - b.t); if (r.vit.length > 500) r.vit = r.vit.slice(-500); });
        mcCard(s.pid, c => { c.vit = (c.vit || []).filter(y => y.ts !== hm(v.t)); c.vit.push(toMist(v)); c.vit.sort((a, b) => (PT.hmTs(a.ts) || 0) - (PT.hmTs(b.ts) || 0)); });
        close(false); toast('Rodikliai įrašyti ' + hm(v.t)); return;
      }
      case 'io': {
        const ml = parseInt(s.ml, 10); if (!(ml > 0 && ml <= 10000)) return toast('Įveskite kiekį ml');
        const e = { id: uid(), k: s.k, type: s.typ, ml, t: shTs(), note: String(s.note || '').trim() };
        upd(s.pid, r => { r.io.push(e); });
        if (e.k === 'in' && (e.type === 'krist' || e.type === 'kraujas')) mcCard(s.pid, c => { c.rows = (c.rows || []).concat([{ g: e.type === 'kraujas' ? 'bl' : 'fl', name: e.note || ioName('in', e.type), dose: ml + ' ml', route: '', time: hm(e.t), src: 'pcc:' + e.id }]); });
        close(false); toast('Įrašyta: ' + ioName(e.k, e.type) + ' ' + ml + ' ml'); return;
      }
      case 'med': {
        const name = String(s.name || '').trim(); if (!name) return toast('Įveskite pavadinimą');
        const m = { id: uid(), kind: s.mk, name, dose: String(s.dose || '').trim(), route: s.mk === 'int' ? '' : s.route || '', ivl: s.mk === 'int' ? 0 : s.ivl || 0, t: shTs(), note: String(s.note || '').trim() };
        upd(s.pid, r => { r.meds.push(m); });
        logMist(s.pid, m);
        close(false); toast('Įrašyta: ' + name); return;
      }
      case 'kg': {
        const kg = parseInt(s.buf, 10); if (!(kg >= 3 && kg <= 250)) return toast('Svoris 3–250 kg');
        const L = PT.list(); if ((L.pts[L.cur] || {}).pid === s.pid) LS.set(TCFG.pre + 'svoris', kg);
        toast('Svoris ' + kg + ' kg'); return back();
      }
      case 'eta': {
        const b = s.buf || ''; if (!/^\d{4}$/.test(b)) return toast('Įveskite VVMM');
        const hh = +b.slice(0, 2), mm = +b.slice(2); if (hh > 23 || mm > 59) return toast('Neteisingas laikas');
        const d0 = new Date(); d0.setHours(hh, mm, 0, 0); let t = d0.getTime(); if (t < now() - MIN) t += 24 * HR;
        upd(s.pid, r => { r.eta = t; }); toast('Evakuacija ' + hm(t)); return back();
      }
      case 'imp': return importText(document.getElementById('pc-imp').value);
    }
  }
  // Žurnalo įrašas → MIST kortelė: vaistas – C lentelės eilutė (src 'pcc:id'), veiksmas – T pastabose
  function logMist(pid, m) {
    mcCard(pid, c => {
      if (m.kind === 'med') { const v = drugOf(m.name); c.rows = (c.rows || []).concat([{ g: v ? (v.id === 'nacl-hipert' ? 'fl' : MGRP[v.grupe] || 'ot') : 'ot', name: m.name, dose: m.dose, route: m.route, time: hm(m.t), src: 'pcc:' + m.id }]); }
      else { const tok = m.name + (m.note ? ' (' + m.note + ')' : '') + ' ' + hm(m.t); if (String(c.txTxt || '').indexOf(tok) < 0) c.txTxt = [String(c.txTxt || '').trim(), tok].filter(Boolean).join('; '); }
    });
  }
  function unlogMist(pid, m) {
    mcCard(pid, c => {
      c.rows = (c.rows || []).filter(r => r.src !== 'pcc:' + m.id);
      if (m.kind === 'int') { const tok = m.name + (m.note ? ' (' + m.note + ')' : '') + ' ' + hm(m.t); c.txTxt = String(c.txTxt || '').split('; ').filter(y => y !== tok).join('; '); }
    });
  }
  // Greiti veiksmai iš paciento ekrano / juostos (TCFG.hub.quickAct)
  function quick(k, o) {
    const x = X(); if (!x) return;
    if (k === 'pv') return open({ kind: 'vit', pid: x.pid, v: {}, fk: 'hr', bpd: 0 }, o);
    if (k === 'pin' || k === 'pout') return open({ kind: 'io', pid: x.pid, k: k === 'pin' ? 'in' : 'out', typ: k === 'pin' ? 'krist' : 'slap', ml: '', note: '' }, o);
    if (k === 'pmed' || k === 'pint') return open({ kind: 'med', pid: x.pid, mk: k === 'pint' ? 'int' : 'med', name: '', dose: '', route: k === 'pint' ? '' : 'IV', ivl: 0, note: '' }, o);
  }

  // ───────── veiksmai puslapyje (data-act="pc-…") ─────────
  function act(el) {
    const d = el.dataset, k = d.k;
    const pid = d.p || (X() || {}).pid; if (!pid) return;
    const up = fn => { upd(pid, fn); keepY(); };
    switch (d.act) {
      case 'pc-vit': if (d.p) PT.selectPid(d.p); return quick('pv');
      case 'pc-io': return quick(k === 'out' ? 'pout' : 'pin');
      case 'pc-med': return quick(k === 'int' ? 'pint' : 'pmed');
      case 'pc-kg': return open({ kind: 'kg', pid, buf: String(X(pid).kg || '') });
      case 'pc-eta': return open({ kind: 'eta', pid, buf: '' });
      case 'pc-pt': return open({ kind: 'pt', pid });
      case 'pc-imp': return open({ kind: 'imp', pid });
      case 'pc-crit': return up(r => { r.crit = k; r.vint = k === 'crit' ? 15 : k === 'ser' ? 240 : 720; });
      case 'pc-trend': return up(r => { r.trend = r.trend === k ? '' : k; });
      case 'pc-vint': return up(r => { r.vint = +k; });
      case 'pc-uoh': { const s = S(); s.uoh = +k; LS.set(SKEY, s); return keepY(); }
      case 'pc-burns': return up(r => { r.burns = !r.burns; });
      case 'pc-tbi': return up(r => { r.tbi = !r.tbi; });
      case 'pc-heat': return up(r => { if (r.care.sild) delete r.care.sild; else r.care.sild = now(); });
      case 'pc-off': return up(r => { if (r.off[k]) delete r.off[k]; else r.off[k] = 1; });
      case 'pc-care': { upd(pid, r => { r.care[k] = now(); }); toast('Atlikta ' + hm(now())); if (navigator.vibrate) navigator.vibrate(20); return keepY(); }
      case 'pc-again': { const x = X(pid), m = x && x.r.meds.find(y => y.id === k); if (!m) return; PT.selectPid(pid); return open({ kind: 'med', pid, mk: 'med', name: m.name, dose: m.dose, route: m.route, ivl: m.ivl, note: '' }); }
      case 'pc-sel': PT.selectPid(pid); if (location.hash === d.r) keepY(); else location.hash = d.r; return;
      case 'pc-evck': return up(r => { r.evck[k] = !r.evck[k]; });
      case 'pc-evac': mcCard(pid, c => { c.evac = c.evac === k ? '' : k; }); return keepY();
      case 'pc-vdel': {
        const x = X(pid), v = x && x.r.vit.find(y => y.id === k); if (!v) return;
        upd(pid, r => { r.vit = r.vit.filter(y => y.id !== k); });
        let mv = null; mcCard(pid, c => { const i = (c.vit || []).findIndex(y => y.ts === hm(v.t)); if (i >= 0) { mv = c.vit[i]; c.vit.splice(i, 1); } });
        keepY(); toastAct('Matavimas ištrintas', 'Atšaukti', () => { upd(pid, r => { r.vit.push(v); r.vit.sort((a, b) => a.t - b.t); }); if (mv) mcCard(pid, c => { c.vit.push(mv); c.vit.sort((a, b) => (PT.hmTs(a.ts) || 0) - (PT.hmTs(b.ts) || 0)); }); keepY(); });
        return;
      }
      case 'pc-iodel': {
        const x = X(pid), e = x && x.r.io.find(y => y.id === k); if (!e) return;
        upd(pid, r => { r.io = r.io.filter(y => y.id !== k); }); MC.dropSrc('pcc:' + e.id);
        keepY(); toastAct('Įrašas ištrintas', 'Atšaukti', () => { upd(pid, r => { r.io.push(e); r.io.sort((a, b) => a.t - b.t); }); if (e.k === 'in' && (e.type === 'krist' || e.type === 'kraujas')) mcCard(pid, c => { c.rows.push({ g: e.type === 'kraujas' ? 'bl' : 'fl', name: e.note || ioName('in', e.type), dose: e.ml + ' ml', route: '', time: hm(e.t), src: 'pcc:' + e.id }); }); keepY(); });
        return;
      }
      case 'pc-mdel': {
        const x = X(pid), m = x && x.r.meds.find(y => y.id === k); if (!m) return;
        upd(pid, r => { r.meds = r.meds.filter(y => y.id !== k); }); unlogMist(pid, m);
        keepY(); toastAct('Įrašas ištrintas', 'Atšaukti', () => { upd(pid, r => { r.meds.push(m); r.meds.sort((a, b) => a.t - b.t); }); logMist(pid, m); keepY(); });
        return;
      }
      // turniketai
      case 'pc-tqadd': {
        const t = now(), tm = hm(t);
        mcCard(pid, c => { c.tq = c.tq || {}; c.tq[k] = { on: true, tm }; if ((c.tx || []).indexOf('tq') < 0) c.tx = (c.tx || []).concat('tq'); });
        upd(pid, r => { r.tqx[k] = { tm, ts: t, conv: 0 }; }); laikaiTurn(pid);
        toast('Turniketas: ' + MC.tqName(k) + ' · ' + tm); return keepY();
      }
      case 'pc-tqconv': {
        const x = X(pid), q = x && tqs(x).find(z => z.k === k); if (!q) return;
        const t = now(), m = { id: uid(), kind: 'int', name: 'Turniketo konversija', dose: '', route: '', ivl: 0, t, note: q.limb.toLowerCase() };
        upd(pid, r => { r.tqx[k] = { tm: q.tm, ts: q.t, conv: t }; r.meds.push(m); }); logMist(pid, m);
        toast('Konvertuotas ' + hm(t)); return keepY();
      }
      case 'pc-tqdel': {
        if (!confirm('Pašalinti turniketo įrašą (' + MC.tqName(k) + ')?')) return;
        mcCard(pid, c => { if (c.tq) delete c.tq[k]; if (!MC.TQ.some(([q]) => (c.tq || {})[q] && c.tq[q].on)) c.tx = (c.tx || []).filter(y => y !== 'tq'); });
        upd(pid, r => { delete r.tqx[k]; }); laikaiTurn(pid); return keepY();
      }
      // perdavimas
      case 'pc-tcread': { const x = X(pid); return readMode('Telekonsultacija', readLines(teleLines(x)), [['Kopijuoti', () => copyText(teleText(x))]]); }
      case 'pc-tccopy': return copyText(teleText(X(pid)));
      case 'pc-tcshare': return shareText('Telekonsultacija', teleText(X(pid)));
      case 'pc-atread': { const x = X(pid); return readMode('ATMISTER', readLines(atmistLines(x)), [['Kopijuoti', () => copyText(atmistText(x))]]); }
      case 'pc-atcopy': return copyText(atmistText(X(pid)));
      case 'pc-atshare': return shareText('ATMISTER', atmistText(X(pid)));
      case 'pc-exp': return copyText(JSON.stringify(exportAll()));
    }
  }
  function onInput(t) {
    const k = t.dataset.pc || '';
    if (k.indexOf('tc:') === 0) {
      const x = X(); if (!x) return;
      upd(x.pid, r => { r.tc[k.slice(3)] = t.value; });
      const y = X(), o = document.getElementById('pc-tc-out'), a = document.getElementById('pc-at-out');
      if (o) o.textContent = teleText(y); if (a) a.textContent = atmistText(y);
    } else if (k.indexOf('set:') === 0) { const s = S(); s[k.slice(4)] = t.value; LS.set(SKEY, s); }
  }
  // Periodiškai: priminimų ženkliukas ir „vėluoja … min“ tekstai (kai niekas neredaguojama)
  function tick() {
    nav();
    const r = route().p[0], ae = document.activeElement;
    if (['pacientas', 'priminimai', 'turniketai', 'evakuacija'].indexOf(r) < 0) return;
    if (SH || (MC.sheetOpen && MC.sheetOpen()) || HUB.isOpen() || (ae && /INPUT|TEXTAREA|SELECT/.test(ae.tagName))) return;
    const rd = document.getElementById('rd'); if (rd && !rd.hidden) return;
    keepY();
  }

  // ───────── duomenys: kopijavimas / įkėlimas, QR ─────────
  function exportAll() {
    PT.sync(); const L = PT.list(), o = all();
    return { app: 'pcc-gidas', v: 2, t: now(), pts: L.pts.map(p => { const c = Object.assign({}, p.card); delete c.pid; return { card: c, pcc: o[p.pid] || null, laikai: PT.get(p.pid, 'laikai'), kg: +PT.get(p.pid, 'svoris') || 0 }; }) };
  }
  function importText(txt) {
    let o; try { o = JSON.parse(txt); } catch (e) { return toast('Netinkami duomenys'); }
    const L = o && Array.isArray(o.pts) ? o.pts : null; if (!L || !L.length) return toast('Sužeistųjų nerasta');
    let n = 0;
    L.forEach(p => {
      if (!p || typeof p !== 'object' || !p.card || typeof p.card !== 'object') return;
      const c = Object.assign({}, p.card); delete c.pid;
      const pid = PT.add(c); n++;
      if (p.laikai && typeof p.laikai === 'object') LS.set(TCFG.laikai, p.laikai);
      if (+p.kg > 0 && +p.kg < 400) LS.set(TCFG.pre + 'svoris', +p.kg);
      if (p.pcc && typeof p.pcc === 'object') importRec(pid, p.pcc, false);
    });
    close(true); toast('Įkelta: ' + n); location.hash = '#/pacientas?t=apz';
  }
  const exportRec = pid => { const r = all()[pid]; if (!r) return null; const o = norm(r); return o; };
  const hasData = () => { const x = X(); return !!(x && (x.r.vit.length || x.r.io.length || x.r.meds.length || Object.keys(x.r.care).length || x.r.tc.req || x.r.tc.exam)); };
  function importRec(pid, o, merge) {
    if (!pid || !o || typeof o !== 'object') return;
    const inc = norm(o);
    const o2 = all();
    if (!merge || !o2[pid]) { inc.created = +inc.created || now(); o2[pid] = inc; LS.set(KEY, o2); return; }
    upd(pid, r => {
      ['vit', 'io', 'meds'].forEach(k => { const ids = r[k].map(y => y.id); inc[k].forEach(y => { if (ids.indexOf(y.id) < 0) r[k].push(y); }); r[k].sort((a, b) => a.t - b.t); });
      ['care', 'evck', 'tqx'].forEach(k => { Object.keys(inc[k]).forEach(q => { if (!r[k][q]) r[k][q] = inc[k][q]; }); });
      ['age', 'status', 'hist'].forEach(k => { if (!r[k] && inc[k]) r[k] = inc[k]; });
      Object.keys(inc.tc).forEach(q => { if (!r.tc[q] && inc.tc[q]) r.tc[q] = inc.tc[q]; });
      if (!r.eta && inc.eta) r.eta = inc.eta;
    });
  }
  const recSummary = o => { const r = norm(o); return [r.vit.length ? plural(r.vit.length, ['matavimas', 'matavimai', 'matavimų']) : '', r.io.length ? plural(r.io.length, ['skysčių įrašas', 'skysčių įrašai', 'skysčių įrašų']) : '', r.meds.length ? plural(r.meds.length, ['vaistas / veiksmas', 'vaistai / veiksmai', 'vaistų / veiksmų']) : ''].filter(Boolean).join(' · ') || 'stebėjimo lapas'; };

  // ───────── nustatymai, paieška, šaltiniai ─────────
  const settings = () => `<label class="lbl" for="pc-contact">Ryšys (dažnis, tel.) – telekonsultacijos įžangai</label><input class="inp" id="pc-contact" data-pc="set:contact" value="${esc(S().contact || '')}" autocomplete="off">`;
  const dataSettings = () => '<h2>Duomenų perkėlimas</h2><div class="acts"><button class="btn" data-act="pc-exp">Kopijuoti duomenis</button><button class="btn" data-act="pc-imp">Įkelti duomenis</button></div><p class="muted">Visų sužeistųjų kortelės, stebėjimo lapai ir laikai – tekstu kitam telefonui (pvz. per šifruotą pokalbį). Vienam pacientui – QR kodas (Perduoti).</p>';
  const sourceRows = () => Object.keys(SRC).map(k => `<a class="row" href="${SRC[k][1]}" target="_blank" rel="noopener"><div>${esc(SRC[k][0])}<small>${esc(SRC[k][1].replace(/^https?:\/\//, '').split('/')[0])}</small></div><span class="ar">↗</span></a>`).join('');
  const remSettings = () => '<h2>Priminimai</h2><p class="muted">Priežiūros grafikas (JTS CPG ID 70), gyvybiniai rodikliai pagal būklę, vaistų kartojimas, turniketų langai (2 ir 6 val.) ir TXA riba primenami automatiškai – juosta, ženkliukas „Priminimai“, vibracija. Veikia, kol programėlė atidaryta' + (/iPhone|iPad/.test(navigator.userAgent) ? ' (iPhone – tik atidarius)' : '') + '.</p>';
  const searchTools = () => [
    ['#/pacientas?t=rod', 'Stebėjimo lapas – rodikliai', 'Pulsas, AKS, KD, SpO₂, T, GKS; blogėjimas, tendencijos', 'rodikliai stebėjimo lapas flowsheet gyvybiniai požymiai pulsas spaudimas aks saturacija temperatūra gks avpu šoko indeksas'],
    ['#/pacientas?t=sks', 'Skysčių balansas ir diurezė', 'Įvesta / išskirta, 1 val., nuo traumos, 24 val.; ml/kg/val.', 'skysčiai balansas diurezė šlapimas ml kg val įvesta išskirta infuzija kraujas drenas'],
    ['#/pacientas?t=vst', 'Vaistų ir veiksmų žurnalas', 'Kitos dozės priminimas', 'vaistai žurnalas dozė kartoti veiksmai intervencijos kateteris drenas'],
    ['#/pacientas?t=prz', 'Priežiūros grafikas', 'Vartymas, burnos priežiūra, linijos, žaizdos, maitinimas (JTS ID 70)', 'priežiūra slauga grafikas vartyti pragulos burna linijos žaizdos tvarsčiai kateteris maitinimas neurologinė nursing'],
    ['#/turniketai', 'Turniketai – laikų langai', 'Konversija iki 2 val., 2–6 val. langas, > 6 val. nenuimti', 'turniketas turniketai konversija laikas 2 val 6 val nenuimti'],
    ['#/telekonsultacija', 'Telekonsultacija ir ATMISTER', 'Pranešimas gydytojui konsultantui, perdavimas', 'telekonsultacija telemedicina konsultacija gydytojas skambutis atmister perdavimas handover'],
    ['#/evakuacija', 'Pasiruošimas evakuacijai', 'Kontrolinis sąrašas, kategorija, laikas', 'evakuacija pasiruošimas medevac pakavimas neštuvai sąrašas'],
    ['#/priminimai', 'Priminimai', 'Vėluojantys ir artėjantys darbai', 'priminimai vėluoja darbai laikmatis']
  ];

  return { st, sec, timers, page, remView, homeBanner, nav, barExtra, quick, act, onInput, tick, settings, dataSettings, sourceRows, remSettings, searchTools,
    remHook, isPcc, exportRec, importRec, hasData, recSummary, exportAll, importText,
    // testams ir kitiems moduliams
    X, careState, medState, urine, ioTot, tqs, tqState, teleText, atmistText, worse, abn };
})();

// ───────── Paciento ekranas (pacientas.js) ir priminimai (REM): PCC nustatymai ─────────
TCFG.remHook = (p, push, now) => PC.remHook(p, push, now);
TCFG.remSettings = () => PC.remSettings();
TCFG.hub = {
  get listDefaults() { return (E.fazes || []).map(f => (f.lists || [])[0]).filter(id => id && (E.sarasai || {})[id]).slice(0, 3); },
  listOf: (p, q) => { if (p[0] === 's') return p[1] || ''; if (p[0] !== 'f') return ''; const f = (E.fazes || []).find(x => x.id === p[1]); return f ? (f.lists || [])[+q.t || 0] || '' : ''; },
  listSkip: () => false,
  weight: true, // svoris – diurezei (ml/kg/val.) ir dozių skaičiuoklei
  get drugs() { return Array.isArray(E.daznVaistai) ? E.daznVaistai : (E.vaistai || []).slice(0, 6).map(v => v.id); },
  drugOk: v => ok(v.lygis), drugTag: v => isAdv(v.lygis) ? tag(v.lygis) : '',
  noBar: ['pacientas', 'mist', 'qr-priimti', 'egzaminas', 'vertinimas', 'telekonsultacija', 'turniketai', 'evakuacija'],
  quick: [['pv', '+ Rodikliai', 1], ['pin', '+ Įvesta', 1], ['pout', '+ Išskirta', 1], ['pmed', '+ Vaistas', 1], ['tq', '+ Turniketas'], ['mk', '+ Žymė schemoje']],
  sheetQuick: [['pv', '+ Rodikliai', 1], ['pmed', '+ Vaistas', 1], ['pin', '+ Įvesta'], ['pout', '+ Išskirta'], ['prz', 'Priežiūra'], ['perduoti', 'Perduoti']],
  quickKeys: ['pv', 'pin', 'pout', 'pmed', 'pint'],
  quickAct: (k, o) => PC.quick(k, o),
  go: { prz: '#/pacientas?t=prz', rod: '#/pacientas?t=rod', sks: '#/pacientas?t=sks', vst: '#/pacientas?t=vst' },
  handoff: () => [],
  timers: () => PC.timers(),
  tabs: [['apz', 'Apžvalga'], ['rod', 'Rodikliai'], ['sks', 'Skysčiai'], ['vst', 'Vaistai'], ['prz', 'Priežiūra'], ['kortele', 'MIST'], ['perduoti', 'Perduoti']],
  overview: (x, H) => PC.sec('apz', x, H),
  sections: { rod: (x, H) => PC.sec('rod', x, H), sks: (x, H) => PC.sec('sks', x, H), vst: (x, H) => PC.sec('vst', x, H), prz: (x, H) => PC.sec('prz', x, H), perduoti: (x, H) => PC.sec('perduoti', x, H) },
  barExtra: x => PC.barExtra(x)
};
