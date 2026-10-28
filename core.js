'use strict';
// PCC gidas – ilgalaikė sužeistojo priežiūra lauke (Prolonged Casualty Care). 1040 medkuopa.
// core.js: būsena (localStorage 'pcc-*'), skaičiavimai (skysčių balansas, diurezė, priežiūros grafikas), pagalbinės UI funkcijos.

const VER = 'v1 · 2026-10-28';
const MIN = 60e3, HR = 3600e3;

// ───────── šaltiniai ─────────
const SRC = {
  pcc: ['JTS CPG „Prolonged Casualty Care Guidelines“ (ID 91, 2021-12-21)', 'https://jts.health.mil/assets/docs/cpgs/prolonged_casualty_care_guidelines_21_dec_2021_id91.pdf'],
  nurse: ['JTS CPG „Nursing Interventions, Wound Care, and Splint Management in PCC“ (ID 70, 2025-07-08)', 'https://jts.health.mil/assets/docs/cpgs/Nursing_Interventions_PCC_08_July_2025_ID70_v1.1.pdf'],
  plan: ['JTS „PCC Nursing Care Plan“ (forma)', 'https://jts.health.mil/assets/docs/forms/PCC-Nursing-Care-Plan_fillable.pdf'],
  tele: ['JTS CPG „Telemedicine Guidance in the Deployed Setting“ (ID 94, 2023-09-19)', 'https://jts.health.mil/assets/docs/cpgs/Telemedicine_Deployed_Setting_19_Sep_2023_ID94_v1.2.pdf'],
  doc: ['PFC Documentation: Telemedical Consultation Guide, PFC Casualty Card v25 (2023)', 'https://prolongedfieldcare.org/wp-content/uploads/2023/07/PFC-Documentation-10-July-2023.pdf'],
  ua: ['TCCC (tccc.org.ua): PCC gairės, slauga, dokumentavimas', 'https://tccc.org.ua/en/guide/prolonged-casualty-care-guidelines-part-1-pcc'],
  etc: ['ETC gidas – vaistų dozės', 'https://etc.1040medkuopa.lt/#/vaistai'],
  march: ['March gidas – TCCC vaistai', 'https://march.1040medkuopa.lt/']
};
const srcLine = (...keys) => '<p class="src">Šaltinis: ' + keys.map(k => `<a href="${SRC[k][1]}" target="_blank" rel="noopener">${esc(SRC[k][0])}</a>`).join('; ') + '</p>';

// ───────── pagalbinės ─────────
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pad = n => String(n).padStart(2, '0');
const hm = t => { const d = new Date(t); return pad(d.getHours()) + ':' + pad(d.getMinutes()); };
const dhm = t => { const d = new Date(t), n = new Date(); return (d.toDateString() === n.toDateString() ? '' : pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ') + hm(t); };
const dur = ms => { const m = Math.max(0, Math.round(ms / MIN)); if (m < 60) return m + ' min'; const h = Math.floor(m / 60); return h + ' val.' + (m % 60 ? ' ' + (m % 60) + ' min' : ''); };
const fmt1 = x => String(Math.round(x * 10) / 10).replace('.', ',');
const fmt2 = x => String(Math.round(x * 100) / 100).replace('.', ',');
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const now = () => Date.now();

const LS = {
  get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { toast('Nepavyko išsaugoti (atmintis pilna?)'); } },
  del(k) { try { localStorage.removeItem(k); } catch (e) {} }
};
const K = { data: 'pcc-data', set: 'pcc-nust', akt: 'pcc-akt' };

// ───────── nustatymai ─────────
const defSet = () => ({ theme: 'field', night: false, sound: true, vib: true, opsec: 0, call: '', unit: '', contact: '' });
function S() { return Object.assign(defSet(), LS.get(K.set, {}) || {}); }
function setS(p) { LS.set(K.set, Object.assign(S(), p)); }

// ───────── duomenys ─────────
const defPt = n => ({ id: uid(), nm: 'Sužeistasis #' + n, no: n, created: now(), tInj: 0, kg: 0, sex: '', age: '', status: '', mech: '', inj: '', allerg: '', hist: '',
  crit: 'crit', trend: '', burns: false, tbi: false, evac: { cat: '', eta: 0 }, vint: 15, vit: [], io: [], meds: [], tq: [], care: {}, off: {}, evck: {}, tc: { req: '', exam: '', res: '', rec: '' } });
function D() {
  const d = LS.get(K.data, null);
  if (!d || !Array.isArray(d.pts)) return { pts: [], cur: '', n: 0 };
  d.pts = d.pts.map(p => Object.assign(defPt(0), p, { evac: Object.assign({ cat: '', eta: 0 }, p.evac || {}), tc: Object.assign({ req: '', exam: '', res: '', rec: '' }, p.tc || {}) }));
  d.n = d.n || d.pts.length;
  return d;
}
function saveD(d) { LS.set(K.data, d); LS.set(K.akt, now()); }
function pt(d, id) { return d.pts.find(p => p.id === id); }
function update(id, fn) { const d = D(), p = pt(d, id); if (!p) return null; fn(p, d); saveD(d); return p; }

// ───────── gyvybiniai rodikliai ─────────
// [raktas, pavadinimas, vienetai, min, max, žingsnis/kablelis]
const VF = [['hr', 'Pulsas', '/min', 0, 250], ['sys', 'AKS s', 'mm Hg', 0, 300], ['dia', 'AKS d', 'mm Hg', 0, 200], ['rr', 'KD', '/min', 0, 70], ['spo2', 'SpO₂', '%', 0, 100], ['temp', 'T', '°C', 25, 43, 1], ['gcs', 'GKS', '', 3, 15]];
const AVPU = ['A', 'V', 'P', 'U'];
const CRT = [['<2', '< 2 s'], ['2-3', '2–3 s'], ['>3', '> 3 s']];
const abn = (k, v) => {
  if (v === '' || v == null) return false;
  const n = +v;
  switch (k) {
    case 'hr': return n > 120 || n < 50;
    case 'sys': return n < 90 || n > 180;
    case 'rr': return n > 29 || n < 10;
    case 'spo2': return n < 92;               // PCC CPG: SpO₂ tikslas 92 %
    case 'temp': return n < 36 || n > 38.5;
    case 'gcs': return n < 15;
    case 'pain': return n >= 7;
    case 'avpu': return v !== 'A';
    case 'crt': return v !== '<2';
    default: return false;
  }
};
const RANK = { avpu: { A: 0, V: 1, P: 2, U: 3 }, crt: { '<2': 0, '2-3': 1, '>3': 2 } };
// ar b blogesnis už ankstesnį a (kaip ETC būklės juostoje); grąžina 'down' / 'up' / ''
function worse(k, a, b) {
  if (a === '' || a == null || b === '' || b == null) return '';
  if (RANK[k]) return RANK[k][b] > RANK[k][a] ? 'down' : '';
  const x = +a, y = +b; if (isNaN(x) || isNaN(y)) return '';
  if (k === 'spo2' || k === 'gcs' || k === 'sys' || k === 'dia') return y < x ? 'down' : '';
  if (k === 'temp') return Math.abs(y - 37) > Math.abs(x - 37) + 0.05 ? (y < x ? 'down' : 'up') : '';
  return y > x ? 'up' : '';
}
const shock = v => v.hr && v.sys ? Math.round(v.hr / v.sys * 10) / 10 : null; // šoko indeksas
const mapOf = v => v.sys && v.dia ? Math.round((+v.sys + 2 * v.dia) / 3) : null;
const vitText = v => [v.avpu ? 'AVPU ' + v.avpu : '', v.gcs ? 'GKS ' + v.gcs : '', v.hr ? 'P ' + v.hr : '', v.sys ? 'AKS ' + v.sys + (v.dia ? '/' + v.dia : '') : '', v.rr ? 'KD ' + v.rr : '', v.spo2 ? 'SpO₂ ' + v.spo2 + ' %' : '', v.temp ? 'T ' + fmt1(v.temp) + ' °C' : '', v.crt ? 'KPL ' + v.crt.replace('-', '–') + ' s' : '', v.pain !== '' && v.pain != null ? 'skausmas ' + v.pain + '/10' : ''].filter(Boolean).join(', ');

// ───────── skysčių balansas ─────────
const IN_T = [['krist', 'Kristaloidai'], ['kraujas', 'Kraujas / produktai'], ['burna', 'Per burną'], ['kitas', 'Kita']];
const OUT_T = [['slap', 'Šlapimas'], ['dren', 'Drenas'], ['vem', 'Vėmimas'], ['kraujn', 'Kraujo netekimas'], ['ism', 'Išmatos'], ['kitas', 'Kita']];
const ioName = (k, t) => ((k === 'in' ? IN_T : OUT_T).find(x => x[0] === t) || [0, t])[1];
function ioTot(p, from, to) {
  let i = 0, o = 0, u = 0;
  p.io.forEach(e => { if (e.t < from || e.t > to) return; if (e.k === 'in') i += +e.ml || 0; else { o += +e.ml || 0; if (e.type === 'slap') u += +e.ml || 0; } });
  return { in: i, out: o, net: i - o, u };
}
function careStart(p) { const ts = [p.tInj, ...p.vit.map(v => v.t), ...p.io.map(e => e.t), p.created].filter(x => +x > 0); return Math.min(...ts); }
// diurezė per paskutines h val. (jei priežiūra trumpesnė – per priežiūros laiką)
function urine(p, h, t) {
  t = t || now();
  const start = careStart(p), win = Math.max(MIN * 15, Math.min(h * HR, t - start));
  const ml = p.io.filter(e => e.k === 'out' && e.type === 'slap' && e.t > t - win && e.t <= t).reduce((s, e) => s + (+e.ml || 0), 0);
  const hrs = win / HR, mlh = ml / hrs, kg = +p.kg || 0;
  const lo = 0.5, hi = p.burns ? 1 : null;
  const mlkg = kg ? mlh / kg : null;
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
const careSrc = { neuro: 'pcc', sild: 'pcc', mini: 'pcc' };
const VINT = [[15, '15 min'], [30, '30 min'], [60, '1 val.'], [240, '4 val.'], [720, '12 val.']];
function careIvl(p, c) { // minutėmis; 0 – netaikoma
  if (c[0] === 'vit' || c[0] === 'mini') return +p.vint || 15;
  const h = p.crit === 'crit' ? c[3] : c[2];
  return h ? h * 60 : 0;
}
function careOn(p, c) {
  if (p.off[c[0]]) return false;
  if (c[5] === 'tbi' && !p.tbi) return false;
  if (c[5] === 'heat' && !p.care.sild) return false; // tik kai pažymėta, kad uždėta
  return careIvl(p, c) > 0;
}
function lastDone(p, k) { if (k === 'vit') { const v = p.vit[p.vit.length - 1]; return v ? v.t : 0; } return +p.care[k] || 0; }
// būsena: { k, nm, ivl, last, due, st: 'ok'|'soon'|'due'|'over'|'new' }
function careState(p, t) {
  t = t || now();
  return CARE.filter(c => careOn(p, c)).map(c => {
    const ivl = careIvl(p, c), last = lastDone(p, c[0]), base = last || p.created || careStart(p), due = base + ivl * MIN;
    const left = due - t, st = left > 15 * MIN ? 'ok' : left > 0 ? 'soon' : left > -Math.max(15 * MIN, ivl * MIN * 0.25) ? 'due' : 'over';
    return { k: c[0], nm: c[1], note: c[4], ivl, last, due, st };
  });
}
// vaistai: kitos dozės laikas
function medState(p, t) {
  t = t || now();
  const latest = {};
  p.meds.forEach(m => { if (m.kind === 'med' && m.ivl > 0) { const k = m.name.toLowerCase(); if (!latest[k] || latest[k].t < m.t) latest[k] = m; } });
  return Object.values(latest).filter(m => !m.stop).map(m => { const due = m.t + m.ivl * MIN, left = due - t; return { m, due, st: left > 15 * MIN ? 'ok' : left > 0 ? 'soon' : left > -15 * MIN ? 'due' : 'over' }; });
}
// visi priminimai (visiems sužeistiesiems)
function dueAll(t) {
  const d = D(), out = [];
  d.pts.forEach(p => {
    careState(p, t).forEach(c => { if (c.st === 'due' || c.st === 'over') out.push({ p, k: 'care:' + c.k, nm: c.k === 'vit' ? 'Gyvybiniai rodikliai' : c.nm.split(':')[0].split(',')[0], st: c.st, due: c.due, tab: 'prz' }); });
    medState(p, t).forEach(x => { if (x.st === 'due' || x.st === 'over') out.push({ p, k: 'med:' + x.m.name, nm: x.m.name, st: x.st, due: x.due, tab: 'vst' }); });
  });
  return out.sort((a, b) => a.due - b.due);
}

// ───────── turniketai (PCC CPG ID 91) ─────────
const LIMBS = ['D ranka', 'K ranka', 'D koja', 'K koja', 'Jungtis'];
function tqState(q, t) { const h = ((q.conv || t || now()) - q.t) / HR; return q.conv ? 'conv' : h < 2 ? 'early' : h < 6 ? 'win' : 'late'; }

// ───────── UI pagalbinės ─────────
let toastT = 0;
function toast(msg, undo) {
  const el = document.getElementById('toast'); if (!el) return;
  el.innerHTML = esc(msg) + (undo ? ' <button data-act="undo">Atšaukti</button>' : '');
  el.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('on'), undo ? 7000 : 2600);
}
async function copyText(t) {
  try { await navigator.clipboard.writeText(t); toast('Nukopijuota'); }
  catch (e) { const a = document.createElement('textarea'); a.value = t; document.body.appendChild(a); a.select(); try { document.execCommand('copy'); toast('Nukopijuota'); } catch (x) { toast('Nepavyko nukopijuoti'); } a.remove(); }
}
async function shareText(title, t) {
  if (navigator.share) { try { await navigator.share({ title, text: t }); return; } catch (e) { if (e && e.name === 'AbortError') return; } }
  copyText(t);
}
function readMode(title, lines) {
  const r = document.getElementById('read');
  r.innerHTML = `<button class="x" data-act="read-close" aria-label="Uždaryti">×</button><h3>${esc(title)}</h3>` + lines.map(([l, v]) => `<p><small>${esc(l)}</small>${esc(v || '—')}</p>`).join('');
  r.classList.add('on'); r.scrollTop = 0;
}
// signalas ir vibracija
let actx = null;
function beep() {
  const s = S(); if (s.vib && navigator.vibrate) { try { navigator.vibrate([200, 100, 200]); } catch (e) {} }
  if (!s.sound) return;
  try { actx = actx || new (window.AudioContext || window.webkitAudioContext)(); const o = actx.createOscillator(), g = actx.createGain(); o.frequency.value = 880; g.gain.value = 0.15; o.connect(g); g.connect(actx.destination); o.start(); o.stop(actx.currentTime + 0.25); } catch (e) {}
}
