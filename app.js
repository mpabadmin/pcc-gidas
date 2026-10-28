'use strict';
// app.js – maršrutai, įvykiai, apatiniai langai, priminimai.

let route = { v: 'list' }, UNDO = null, SH = null, notified = new Set(), lastAkt = 0;
const $ = id => document.getElementById(id);

function parse() {
  const h = location.hash.replace(/^#\/?/, ''), [path, qs] = h.split('?'), q = new URLSearchParams(qs || ''), seg = path.split('/');
  if (seg[0] === 'p' && seg[1]) return { v: 'pt', id: seg[1], tab: TABS.some(t => t[0] === q.get('t')) ? q.get('t') : 'apz' };
  if (seg[0] === 'prim') return { v: 'prim' };
  if (seg[0] === 'nust') return { v: 'set' };
  return { v: 'list' };
}
function applyTheme() {
  const s = S();
  document.body.classList.toggle('field', s.theme !== 'light');
  document.body.classList.toggle('night', !!s.night);
  const m = document.querySelector('meta[name=theme-color]'); if (m) m.content = s.theme === 'light' ? '#F7F6F2' : '#1C1C1B';
}
function render() {
  route = parse();
  const d = D(), app = $('app');
  let ttl = 'PCC gidas', sub = 'Ilgalaikė priežiūra lauke', back = '';
  if (route.v === 'pt') { const p = pt(d, route.id); ttl = p ? p.nm : 'Sužeistasis'; sub = p && p.tInj ? 'Nuo traumos ' + dur(now() - p.tInj) : ''; back = '#/'; if (p && d.cur !== p.id) { d.cur = p.id; LS.set(K.data, d); } }
  if (route.v === 'prim') { ttl = 'Priminimai'; sub = ''; }
  if (route.v === 'set') { ttl = 'Nustatymai'; sub = ''; }
  $('ttl').innerHTML = esc(ttl) + (sub ? `<small>${esc(sub)}</small>` : '');
  $('back').hidden = !back; if (back) $('back').href = back;
  const y = scrollY;
  app.innerHTML = route.v === 'pt' ? V.pt(route.id, route.tab) : route.v === 'prim' ? V.prim() : route.v === 'set' ? V.set() : V.list();
  nav(d);
  return y;
}
function rerender() { const y = scrollY; render(); scrollTo(0, y); }
function nav(d) {
  const n = dueAll().length, cur = d.cur && pt(d, d.cur);
  const a = (href, on, ic, t, dot) => `<a href="${href}" class="${on ? 'on' : ''}"${on ? ' aria-current="page"' : ''}>${ic}<span>${t}</span>${dot ? `<span class="dot">${dot}</span>` : ''}</a>`;
  $('nav').innerHTML = a('#/', route.v === 'list', ICO.pts, 'Sužeistieji') + (cur ? a('#/p/' + cur.id, route.v === 'pt', ICO.cur, esc(cur.nm.replace('Sužeistasis ', '')).slice(0, 14)) : '') +
    a('#/prim', route.v === 'prim', ICO.bell, 'Priminimai', n || '') + a('#/nust', route.v === 'set', ICO.set, 'Nustatymai');
}

// ───────── apatiniai langai ─────────
function openSheet(state) { SH = state; drawSheet(); $('sheet').classList.add('open'); $('sheet').setAttribute('aria-hidden', 'false'); }
function closeSheet() { SH = null; $('sheet').classList.remove('open'); $('sheet').setAttribute('aria-hidden', 'true'); $('sheetPn').innerHTML = ''; }
const hd = t => `<div class="hd"><b>${esc(t)}</b><button class="ib" data-act="sheet-close" aria-label="Uždaryti">×</button></div>`;
const KP = (extra) => '<div class="kp">' + ['1', '2', '3', '4', '5', '6', '7', '8', '9', extra || ',', '0', '⌫'].map(k => `<button data-act="kp" data-k="${k}"${k === '⌫' ? ' aria-label="Trinti"' : ''}>${k}</button>`).join('') + '</div>';
const timeChips = (t, list) => '<div class="chips" role="group" aria-label="Laikas">' + list.map(([m, l]) => chip('sh-t', m, Math.abs(t - (SH.t0 + m * MIN)) < 30e3, l)).join('') + `<span class="tag">${hm(t)}</span></div>`;
const TBACK = [[0, 'Dabar'], [-5, '−5 min'], [-10, '−10'], [-15, '−15'], [-30, '−30']];
const MEDS = ['Ketaminas', 'Fentanilis', 'Morfinas', 'Paracetamolis', 'Meloksikamas', 'Ertapenemas', 'Moksifloksacinas', 'Ceftriaksonas', 'TXA', 'Kalcis', 'Ondansetronas', 'Naloksonas', 'Hipertoninis NaCl', 'Levetiracetamas'];
const INTS = ['Turniketo konversija', 'Šlapimo kateteris', 'Pleuros drenas', 'Pirštinė torakostomija', 'Intubacija', 'Krikotiroidotomija', 'Kraujo perpylimas', 'IV / IO prieiga', 'Tvarsčio keitimas', 'Žaizdos plovimas', 'Įtvaras', 'Šildymas'];
const ROUTES = ['IV', 'IO', 'IM', 'PO', 'IN', 'Kita'];
const MIVL = [[0, 'Nekartoti'], [30, '30 min'], [60, '1 val.'], [240, '4 val.'], [360, '6 val.'], [480, '8 val.'], [720, '12 val.'], [1440, '24 val.']];

function drawSheet() {
  const s = SH, pn = $('sheetPn'); if (!s) return;
  let h = '';
  if (s.type === 'vit') {
    h = hd('Gyvybiniai rodikliai') + timeChips(s.t, TBACK);
    h += '<div class="flds">' + VF.map(([k, nm, u]) => `<button class="fld${s.f === k ? ' on' : ''}" data-act="vf" data-k="${k}"><small>${nm}${u ? ' ' + u : ''}</small><b>${esc(s.v[k] || '')}</b></button>`).join('') + '</div>';
    h += `<div class="disp" aria-live="polite">${esc((VF.find(x => x[0] === s.f) || ['', ''])[1])}: ${esc(s.v[s.f] || '')}<span style="opacity:.4">|</span></div>` + KP() +
      '<div class="acts"><button class="btn" data-act="vf-next">Toliau ›</button></div>';
    h += '<div class="lb">AVPU</div><div class="chips">' + AVPU.map(a => chip('vs-avpu', a, s.v.avpu === a, a)).join('') + '</div>';
    h += '<div class="lb">Kapiliarų prisipildymas</div><div class="chips">' + CRT.map(([k, t]) => chip('vs-crt', k, s.v.crt === k, t)).join('') + '</div>';
    h += '<div class="lb">Skausmas 0–10</div><div class="chips">' + Array.from({ length: 11 }, (_, i) => chip('vs-pain', i, s.v.pain === String(i), String(i))).join('') + '</div>';
    h += '<div class="acts"><button class="btn pri wide" data-act="vit-save">Įrašyti</button></div>';
  } else if (s.type === 'io') {
    const L = s.k === 'in' ? IN_T : OUT_T;
    h = hd(s.k === 'in' ? 'Įvesta (skysčiai)' : 'Išskirta') + '<div class="chips">' + L.map(([k, t]) => chip('io-type', k, s.typ === k, t)).join('') + '</div>';
    h += `<div class="disp">${esc(s.ml || '0')} ml</div><div class="chips">` + (s.k === 'in' ? [100, 250, 500, 1000] : [50, 100, 200, 500]).map(x => chip('io-q', x, String(x) === s.ml, x + ' ml')).join('') + '</div>' + KP('');
    h += timeChips(s.t, TBACK.concat([[-60, '−1 val.']]));
    h += `<label class="lb" for="sh-note">Pastaba</label><input class="inp" id="sh-note" data-sf="note" value="${esc(s.note)}" placeholder="${s.k === 'in' ? 'pvz. Ringerio laktatas, pilnas kraujas O' : 'pvz. drenas D'}" autocomplete="off">`;
    h += '<div class="acts"><button class="btn pri wide" data-act="io-save">Įrašyti</button></div>';
  } else if (s.type === 'med') {
    const L = s.kind === 'int' ? INTS : MEDS;
    h = hd(s.kind === 'int' ? 'Veiksmas' : 'Vaistas') + `<input class="inp" id="sh-name" data-sf="name" value="${esc(s.name)}" placeholder="${s.kind === 'int' ? 'Veiksmas' : 'Vaisto pavadinimas'}" autocomplete="off">` +
      '<div class="chips">' + L.map(n => chip('med-name', n, s.name === n, n)).join('') + '</div>';
    if (s.kind === 'med') {
      h += `<label class="lb" for="sh-dose">Dozė</label><input class="inp" id="sh-dose" data-sf="dose" value="${esc(s.dose)}" placeholder="pvz. 20 mg" autocomplete="off">`;
      h += '<div class="lb">Būdas</div><div class="chips">' + ROUTES.map(r => chip('med-route', r, s.route === r, r)).join('') + '</div>';
      h += '<div class="lb">Kartoti kas</div><div class="chips">' + MIVL.map(([m, t]) => chip('med-ivl', m, s.ivl === m, t)).join('') + '</div>';
      if (/^txa/i.test(s.name)) h += '<p class="muted">PCC gairės, galvos trauma: vienkartinis 2 g IV/IO, antros dozės nereikia.</p>';
      h += `<p class="muted">Dozės – <a href="${SRC.etc[1]}" target="_blank" rel="noopener">ETC gide ↗</a></p>`;
    }
    h += timeChips(s.t, TBACK);
    h += `<label class="lb" for="sh-mnote">Pastaba</label><input class="inp" id="sh-mnote" data-sf="note" value="${esc(s.note)}" autocomplete="off">`;
    h += '<div class="acts"><button class="btn pri wide" data-act="med-save">Įrašyti</button></div>';
  } else if (s.type === 'pt') {
    const p = pt(D(), s.pid); if (!p) return closeSheet();
    const inp = (k, lb, ph) => `<label class="lb" for="pf-${k}">${lb}</label><input class="inp" id="pf-${k}" data-pf="${k}" value="${esc(p[k])}" placeholder="${esc(ph || '')}" autocomplete="off">`;
    const ta = (k, lb, ph) => `<label class="lb" for="pf-${k}">${lb}</label><textarea class="inp" id="pf-${k}" data-pf="${k}" rows="2" placeholder="${esc(ph || '')}">${esc(p[k])}</textarea>`;
    h = hd('Sužeistojo duomenys') + inp('nm', 'Vardas, ID, šaukinys') + '<div class="chips">' + [['V', 'Vyras'], ['M', 'Moteris']].map(([k, t]) => chip('pf-sex', t, p.sex === t, t)).join('') + '</div>' +
      inp('age', 'Amžius', 'metai') + '<div class="chips">' + ['LT karys', 'Sąjungininkas', 'Civilis', 'Priešo karys'].map(t => chip('pf-status', t, p.status === t, t)).join('') + '</div>' +
      inp('mech', 'Mechanizmas', 'pvz. sprogimas, šautinė žaizda') + ta('inj', 'Sužalojimai, problemos') + inp('allerg', 'Alergijos', 'nežinoma / nėra / …') + inp('hist', 'Ligos, operacijos, vaistai');
    h += `<div class="acts"><button class="btn" data-act="ed-tinj">⏱ Trauma ${p.tInj ? dhm(p.tInj) : '—'}</button><button class="btn" data-act="ed-kg">⚖ ${p.kg ? p.kg + ' kg' : 'Svoris'}</button></div>`;
    h += '<div class="lb">Evakuacijos kategorija</div><div class="chips">' + EVC.map(([k, t]) => chip('pf-evc', k, p.evac.cat === k, t)).join('') + '</div>';
    h += `<div class="acts"><button class="btn" data-act="ed-eta">🚁 Evakuacija ${p.evac.eta ? hm(p.evac.eta) : '—'}</button></div>`;
    h += '<div class="chips">' + chip('tbi', '1', p.tbi, (p.tbi ? '✓ ' : '') + 'Galvos trauma') + chip('burns', '1', p.burns, (p.burns ? '✓ ' : '') + 'Nudegimai') + '</div>';
    h += '<div class="acts"><button class="btn pri wide" data-act="sheet-close">Gerai</button></div>';
  } else if (s.type === 'time') {
    const isEta = s.field === 'eta', list = isEta ? [[30, '+30 min'], [60, '+1 val.'], [120, '+2'], [240, '+4'], [480, '+8'], [720, '+12'], [1440, '+24']] : [[0, 'Dabar'], [-15, '−15 min'], [-30, '−30'], [-60, '−1 val.'], [-120, '−2'], [-240, '−4'], [-480, '−8']];
    h = hd(isEta ? 'Numatomas evakuacijos laikas' : 'Traumos laikas') + '<div class="chips">' + list.map(([m, l]) => chip('tm-rel', m, false, l)).join('') + '</div>';
    h += `<div class="disp">${esc(fmtBuf(s.buf))}</div>` + KP('') + '<div class="acts"><button class="btn" data-act="tm-clear">Išvalyti</button><button class="btn pri" data-act="tm-set">Nustatyti</button></div><p class="muted">Įveskite VVMM, pvz. 1420.</p>';
  } else if (s.type === 'kg') {
    h = hd('Svoris, kg') + '<div class="chips">' + [60, 70, 80, 90, 100, 110, 120].map(x => chip('kg-q', x, String(x) === s.buf, x + ' kg')).join('') + '</div>' + `<div class="disp">${esc(s.buf || '')} kg</div>` + KP('') + '<div class="acts"><button class="btn pri wide" data-act="kg-set">Nustatyti</button></div>';
  } else if (s.type === 'imp') {
    h = hd('Įkelti duomenis') + '<p class="muted">Įklijuokite kitame telefone nukopijuotus duomenis. Sužeistieji bus pridėti prie esamų.</p><textarea class="inp" id="imp-txt" rows="6"></textarea><div class="acts"><button class="btn pri wide" data-act="imp-do">Įkelti</button></div>';
  }
  pn.innerHTML = h;
}
const fmtBuf = b => { b = (b || '').padEnd(4, '_'); return b.slice(0, 2) + ':' + b.slice(2, 4); };

// ───────── veiksmai ─────────
function act(el) {
  const a = el.dataset.act, k = el.dataset.k, r = route, pid = el.dataset.p || (r.v === 'pt' ? r.id : '') || (SH && SH.pid);
  const up = fn => { update(pid, fn); rerender(); };
  switch (a) {
    case 'sheet-close': closeSheet(); rerender(); return;
    case 'read-close': $('read').classList.remove('on'); return;
    case 'night': setS({ night: !S().night }); applyTheme(); return;
    case 'undo': return undo();
    case 'pt-new': { const d = D(); d.n = (d.n || 0) + 1; const p = defPt(d.n); d.pts.push(p); d.cur = p.id; saveD(d); location.hash = '#/p/' + p.id; setTimeout(() => openSheet({ type: 'pt', pid: p.id }), 50); return; }
    case 'pt-del': {
      const d = D(), i = d.pts.findIndex(p => p.id === pid); if (i < 0) return;
      if (!confirm('Ištrinti ' + d.pts[i].nm + ' ir visus jo įrašus?')) return;
      UNDO = { type: 'pt', p: d.pts[i], i }; d.pts.splice(i, 1); if (d.cur === pid) d.cur = ''; saveD(d); location.hash = '#/'; toast('Ištrinta', true); return;
    }
    case 'ed-pt': return openSheet({ type: 'pt', pid });
    case 'ed-tinj': { const p = pt(D(), pid); return openSheet({ type: 'time', pid, field: 'tInj', buf: '', back: SH && SH.type === 'pt' }); }
    case 'ed-eta': return openSheet({ type: 'time', pid, field: 'eta', buf: '', back: true });
    case 'ed-kg': { const p = pt(D(), pid); return openSheet({ type: 'kg', pid, buf: p && p.kg ? String(p.kg) : '', back: SH && SH.type === 'pt' }); }
    case 'crit': return up(p => { p.crit = k; p.vint = k === 'crit' ? 15 : k === 'ser' ? 240 : 720; });
    case 'trend': return up(p => { p.trend = p.trend === k ? '' : k; });
    case 'vint': return up(p => { p.vint = +k; });
    case 'uoh': setS({ uoh: +k }); rerender(); return;
    case 'burns': update(pid, p => { p.burns = !p.burns; }); SH ? drawSheet() : rerender(); return;
    case 'tbi': update(pid, p => { p.tbi = !p.tbi; }); SH ? drawSheet() : rerender(); return;
    case 'heat': return up(p => { if (p.care.sild) delete p.care.sild; else p.care.sild = now(); });
    case 'care-off': return up(p => { if (p.off[k]) delete p.off[k]; else p.off[k] = 1; });
    case 'care-done': { update(pid, p => { p.care[k] = now(); }); notified.forEach(x => { if (x.startsWith(pid + ':care:' + k)) notified.delete(x); }); toast('Atlikta ' + hm(now())); rerender(); return; }
    case 'tq-add': return up(p => { p.tq.push({ id: uid(), limb: k, t: now() }); });
    case 'tq-conv': return up(p => { const q = p.tq.find(x => x.id === k); if (q) q.conv = now(); p.meds.push({ id: uid(), kind: 'int', name: 'Turniketo konversija', note: q ? q.limb : '', t: now(), ivl: 0 }); });
    case 'tq-del': { if (!confirm('Ištrinti turniketo įrašą?')) return; return up(p => { p.tq = p.tq.filter(x => x.id !== k); }); }
    case 'evck': return update(pid, p => { p.evck[k] = el.checked; });
    // rodikliai
    case 'vit-new': return openSheet({ type: 'vit', pid, t0: now(), t: now(), v: {}, f: 'hr' });
    case 'vf': SH.f = k; return drawSheet();
    case 'vf-next': { const i = VF.findIndex(x => x[0] === SH.f); SH.f = VF[(i + 1) % VF.length][0]; return drawSheet(); }
    case 'vs-avpu': SH.v.avpu = SH.v.avpu === k ? '' : k; return drawSheet();
    case 'vs-crt': SH.v.crt = SH.v.crt === k ? '' : k; return drawSheet();
    case 'vs-pain': SH.v.pain = SH.v.pain === k ? '' : k; return drawSheet();
    case 'vit-save': return vitSave();
    case 'vit-del': { const p = pt(D(), pid), v = p && p.vit.find(x => x.id === k); if (!v) return; UNDO = { type: 'vit', pid, e: v }; up(p => { p.vit = p.vit.filter(x => x.id !== k); }); toast('Matavimas ištrintas', true); return; }
    // skysčiai
    case 'io-new': return openSheet({ type: 'io', pid, k, typ: k === 'in' ? 'krist' : 'slap', ml: '', t0: now(), t: now(), note: '' });
    case 'io-type': SH.typ = k; return drawSheet();
    case 'io-q': SH.ml = k; return drawSheet();
    case 'io-save': {
      const ml = parseInt(SH.ml, 10); if (!(ml > 0 && ml <= 10000)) return toast('Įveskite kiekį ml');
      const e = { id: uid(), k: SH.k, type: SH.typ, ml, t: SH.t, note: (SH.note || '').trim() };
      update(SH.pid, p => { p.io.push(e); }); closeSheet(); toast('Įrašyta: ' + ioName(e.k, e.type) + ' ' + ml + ' ml'); rerender(); return;
    }
    case 'io-del': { const p = pt(D(), pid), e = p && p.io.find(x => x.id === k); if (!e) return; UNDO = { type: 'io', pid, e }; up(p => { p.io = p.io.filter(x => x.id !== k); }); toast('Įrašas ištrintas', true); return; }
    // vaistai
    case 'med-new': return openSheet({ type: 'med', pid, kind: k, name: '', dose: '', route: k === 'med' ? 'IV' : '', ivl: 0, t0: now(), t: now(), note: '' });
    case 'med-name': SH.name = k; return drawSheet();
    case 'med-route': SH.route = k; return drawSheet();
    case 'med-ivl': SH.ivl = +k; return drawSheet();
    case 'med-save': {
      const name = (SH.name || '').trim(); if (!name) return toast('Įveskite pavadinimą');
      const m = { id: uid(), kind: SH.kind, name, dose: (SH.dose || '').trim(), route: SH.route || '', ivl: SH.ivl || 0, t: SH.t, note: (SH.note || '').trim() };
      update(SH.pid, p => { p.meds.push(m); }); closeSheet(); toast('Įrašyta: ' + name); rerender(); return;
    }
    case 'med-again': { const p = pt(D(), pid), m = p && p.meds.find(x => x.id === k); if (!m) return; return openSheet({ type: 'med', pid, kind: 'med', name: m.name, dose: m.dose, route: m.route, ivl: m.ivl, t0: now(), t: now(), note: '' }); }
    case 'med-del': { const p = pt(D(), pid), e = p && p.meds.find(x => x.id === k); if (!e) return; UNDO = { type: 'med', pid, e }; up(p => { p.meds = p.meds.filter(x => x.id !== k); }); toast('Įrašas ištrintas', true); return; }
    // laikas ir svoris
    case 'sh-t': SH.t = SH.t0 + (+k) * MIN; return drawSheet();
    case 'kp': return kp(k);
    case 'tm-rel': return timeSet(now() + (+k) * MIN);
    case 'tm-clear': return timeSet(0);
    case 'tm-set': {
      if (!/^\d{4}$/.test(SH.buf || '')) return toast('Įveskite VVMM');
      const hh = +SH.buf.slice(0, 2), mm = +SH.buf.slice(2); if (hh > 23 || mm > 59) return toast('Neteisingas laikas');
      const d0 = new Date(); d0.setHours(hh, mm, 0, 0); let t = d0.getTime();
      if (SH.field === 'tInj' && t > now() + MIN) t -= 24 * HR; if (SH.field === 'eta' && t < now() - MIN) t += 24 * HR;
      return timeSet(t);
    }
    case 'kg-q': SH.buf = k; return drawSheet();
    case 'kg-set': { const kg = parseInt(SH.buf, 10); if (!(kg >= 3 && kg <= 250)) return toast('Svoris 3–250 kg'); const b = SH.back, id = SH.pid; update(id, p => { p.kg = kg; }); b ? openSheet({ type: 'pt', pid: id }) : closeSheet(); rerender(); return; }
    case 'pf-sex': update(pid, p => { p.sex = p.sex === k ? '' : k; }); return drawSheet();
    case 'pf-status': update(pid, p => { p.status = p.status === k ? '' : k; }); return drawSheet();
    case 'pf-evc': update(pid, p => { p.evac.cat = p.evac.cat === k ? '' : k; }); return drawSheet();
    // perdavimas
    case 'tc-read': { const p = pt(D(), pid); return readMode('Telekonsultacija', teleLines(p)); }
    case 'tc-copy': return copyText(teleText(pt(D(), pid)));
    case 'tc-share': return shareText('Telekonsultacija', teleText(pt(D(), pid)));
    case 'at-read': return readMode('ATMISTER', atmistLines(pt(D(), pid)));
    case 'at-copy': return copyText(atmistText(pt(D(), pid)));
    case 'at-share': return shareText('ATMISTER', atmistText(pt(D(), pid)));
    // nustatymai
    case 'theme': setS({ theme: k }); applyTheme(); rerender(); return;
    case 'sound': setS({ sound: !S().sound }); rerender(); return;
    case 'vib': setS({ vib: !S().vib }); rerender(); return;
    case 'opsec': setS({ opsec: +k }); rerender(); return;
    case 'exp': return copyText(JSON.stringify({ app: 'pcc-gidas', v: 1, pts: D().pts }));
    case 'imp': return openSheet({ type: 'imp' });
    case 'imp-do': {
      let o; try { o = JSON.parse($('imp-txt').value); } catch (e) { return toast('Netinkami duomenys'); }
      const L = Array.isArray(o) ? o : o && Array.isArray(o.pts) ? o.pts : null; if (!L || !L.length) return toast('Sužeistųjų nerasta');
      const d = D(); L.forEach(p => { if (!p || typeof p !== 'object') return; const q = Object.assign(defPt(++d.n), p); if (d.pts.some(x => x.id === q.id)) q.id = uid(); d.pts.push(q); });
      saveD(d); closeSheet(); toast('Įkelta: ' + L.length); location.hash = '#/'; rerender(); return;
    }
    case 'wipe': if (!confirm('Ištrinti VISUS sužeistųjų duomenis šiame telefone?')) return; LS.del(K.data); UNDO = null; notified.clear(); toast('Duomenys ištrinti'); location.hash = '#/'; rerender(); return;
  }
}
function kp(k) {
  const s = SH; if (!s) return;
  const edit = (cur, max) => k === '⌫' ? cur.slice(0, -1) : (cur + k).slice(0, max);
  if (s.type === 'vit') {
    const f = VF.find(x => x[0] === s.f), cur = s.v[s.f] || '';
    if (k === ',' && (!f[5] || cur.includes(','))) return;
    s.v[s.f] = edit(cur, f[5] ? 4 : 3);
  } else if (s.type === 'io') { if (k !== ',') s.ml = edit(s.ml || '', 5); }
  else if (s.type === 'time') { if (k !== ',') s.buf = edit(s.buf || '', 4); }
  else if (s.type === 'kg') { if (k !== ',') s.buf = edit(s.buf || '', 3); }
  drawSheet();
}
function timeSet(t) {
  const s = SH, b = s.back, id = s.pid;
  update(id, p => { if (s.field === 'eta') p.evac.eta = t; else p.tInj = t; });
  b ? openSheet({ type: 'pt', pid: id }) : closeSheet(); rerender();
}
function vitSave() {
  const s = SH, v = { id: uid(), t: s.t };
  for (const [k, nm, , mn, mx] of VF) {
    const raw = (s.v[k] || '').replace(',', '.'); if (raw === '') continue;
    const n = +raw; if (isNaN(n) || n < mn || n > mx) { s.f = k; drawSheet(); return toast(nm + ': ' + mn + '–' + mx); }
    v[k] = k === 'temp' ? Math.round(n * 10) / 10 : Math.round(n);
  }
  if (v.sys && v.dia && v.dia >= v.sys) { s.f = 'dia'; drawSheet(); return toast('Diastolinis turi būti mažesnis'); }
  ['avpu', 'crt'].forEach(k => { if (s.v[k]) v[k] = s.v[k]; });
  if (s.v.pain !== undefined && s.v.pain !== '') v.pain = +s.v.pain;
  if (Object.keys(v).length <= 2) return toast('Įveskite bent vieną rodiklį');
  update(s.pid, p => { p.vit.push(v); p.vit.sort((a, b) => a.t - b.t); if (p.vit.length > 500) p.vit = p.vit.slice(-500); });
  notified.forEach(x => { if (x.startsWith(s.pid + ':care:vit')) notified.delete(x); });
  closeSheet(); toast('Rodikliai įrašyti ' + hm(v.t)); rerender();
}
function undo() {
  const u = UNDO; if (!u) return; UNDO = null;
  if (u.type === 'pt') { const d = D(); d.pts.splice(Math.min(u.i, d.pts.length), 0, u.p); saveD(d); }
  else update(u.pid, p => { const L = u.type === 'vit' ? p.vit : u.type === 'io' ? p.io : p.meds; L.push(u.e); L.sort((a, b) => a.t - b.t); });
  $('toast').classList.remove('on'); rerender();
}

// ───────── priminimai ir OPSEC ─────────
function opsecCheck() {
  const s = S(), last = +LS.get(K.akt, 0) || 0;
  if (s.opsec > 0 && last && now() - last > s.opsec * HR && D().pts.length) { LS.del(K.data); toast('Duomenys ištrinti (nenaudota ' + s.opsec + ' val.)'); }
}
function tick() {
  const a = dueAll(); let fresh = false;
  a.forEach(x => { const key = x.p.id + ':' + x.k + ':' + Math.round(x.due / MIN); if (!notified.has(key)) { notified.add(key); fresh = true; } });
  if (fresh && document.visibilityState === 'visible') beep();
  const typing = document.activeElement && /INPUT|TEXTAREA/.test(document.activeElement.tagName);
  if (!SH && !typing && !$('read').classList.contains('on')) rerender(); else nav(D());
}

// ───────── įvykiai ─────────
document.addEventListener('click', e => {
  if (now() - lastAkt > 60e3) { lastAkt = now(); LS.set(K.akt, now()); }
  const el = e.target.closest('[data-act]'); if (!el) return;
  if (el.tagName === 'A') return; // nuorodos
  if (el.type !== 'checkbox') e.preventDefault();
  act(el);
});
document.addEventListener('input', e => {
  const t = e.target;
  if (t.dataset.sf && SH) { SH[t.dataset.sf] = t.value; if (t.dataset.sf === 'name' && SH.type === 'med') { const c = t.selectionStart; drawSheet(); const n = $('sh-name'); if (n) { n.focus(); n.setSelectionRange(c, c); } } return; }
  if (t.dataset.pf && SH) { update(SH.pid, p => { p[t.dataset.pf] = t.value; }); return; }
  if (t.dataset.tc && route.v === 'pt') { update(route.id, p => { p.tc[t.dataset.tc] = t.value; }); const p = pt(D(), route.id), o = $('tc-out'), at = $('at-out'); if (o) o.textContent = teleText(p); if (at) at.textContent = atmistText(p); return; }
  if (t.dataset.set) { setS({ [t.dataset.set]: t.value }); }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { if ($('read').classList.contains('on')) $('read').classList.remove('on'); else if (SH) { closeSheet(); rerender(); } }
});
window.addEventListener('hashchange', () => { if (SH) closeSheet(); $('read').classList.remove('on'); render(); scrollTo(0, 0); });
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') { opsecCheck(); tick(); } });

applyTheme(); opsecCheck(); render();
setInterval(tick, 20e3);
if ('serviceWorker' in navigator && location.protocol !== 'file:') window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
