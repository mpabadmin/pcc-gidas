'use strict';
// views.js – ekranai ir apatiniai langai. Priklauso nuo core.js.

const ICO = {
  pts: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="7" r="3.5"/><path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5"/><path d="M17 4.5a3.2 3.2 0 0 1 0 6M19 14.8c1.4.9 2.2 2.6 2.5 5.2"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/></svg>',
  set: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  cur: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h4l3-8 4 16 3-8h4"/></svg>'
};
const TABS = [['apz', 'Apžvalga'], ['rod', 'Rodikliai'], ['sks', 'Skysčiai'], ['vst', 'Vaistai'], ['prz', 'Priežiūra'], ['prd', 'Perduoti']];
const CRIT = [['crit', 'Kritinė'], ['ser', 'Rimta'], ['non', 'Nekritinė']];
const TREND = [['geryn', 'Gerėja'], ['stab', 'Stabili'], ['blog', 'Blogėja']];
const EVC = [['A', 'A – neatidėliotina'], ['B', 'B – skubi'], ['C', 'C – prioritetinė'], ['D', 'D – įprastinė']];
const chip = (act, k, on, t, extra) => `<button data-act="${act}" data-k="${esc(k)}" class="${on ? 'on' : ''}" aria-pressed="${!!on}"${extra || ''}>${esc(t)}</button>`;
const lastV = (p, k) => { for (let i = p.vit.length - 1; i >= 0; i--) { const v = p.vit[i][k]; if (v !== '' && v != null) return v; } return ''; };
const sinceInj = p => p.tInj ? dur(now() - p.tInj) : '—';

const V = {
  // ───────── sužeistųjų sąrašas ─────────
  list() {
    const d = D();
    let h = dueBanner();
    if (!d.pts.length) h += '<div class="card"><b>Ilgalaikė priežiūra lauke</b><p class="muted">Stebėjimo lapas, skysčių balansas, priežiūros grafikas ir telekonsultacija, kai evakuacija vėluoja.</p></div>';
    h += d.pts.slice().reverse().map(p => {
      const due = careState(p).filter(c => c.st === 'due' || c.st === 'over').length + medState(p).filter(x => x.st === 'due' || x.st === 'over').length;
      const v = p.vit[p.vit.length - 1], eta = p.evac.eta ? (p.evac.eta > now() ? 'evak. po ' + dur(p.evac.eta - now()) : 'evak. ' + hm(p.evac.eta)) : '';
      return `<a class="card pt" href="#/p/${p.id}"><b>${esc(p.nm)}</b>${p.inj ? `<div class="muted">${esc(p.inj)}</div>` : ''}<div class="meta">` +
        `<span class="tag ${p.crit === 'crit' ? 'red' : p.crit === 'ser' ? 'amb' : 'grn'}">${esc((CRIT.find(c => c[0] === p.crit) || ['', ''])[1])}</span>` +
        (p.tInj ? `<span class="tag">⏱ ${sinceInj(p)}</span>` : '') + (v ? `<span class="tag">Rodikliai ${hm(v.t)}</span>` : '') +
        (p.evac.cat ? `<span class="tag">${esc(p.evac.cat)}${eta ? ' · ' + eta : ''}</span>` : eta ? `<span class="tag">${eta}</span>` : '') +
        (due ? `<span class="tag red">⚠ ${due}</span>` : '') + '</div></a>';
    }).join('');
    h += '<div class="acts"><button class="btn pri wide" data-act="pt-new">+ Sužeistasis</button></div>';
    return h;
  },

  // ───────── sužeistojo ekranas ─────────
  pt(id, tab) {
    const d = D(), p = pt(d, id);
    if (!p) return '<p>Sužeistasis nerastas.</p><a class="btn" href="#/">Sužeistieji</a>';
    const cs = careState(p), ms = medState(p);
    const nPrz = cs.filter(c => c.st === 'due' || c.st === 'over').length, nVst = ms.filter(x => x.st === 'due' || x.st === 'over').length;
    let h = '<div class="tabs" role="tablist">' + TABS.map(([k, t]) => `<a href="#/p/${id}?t=${k}" role="tab" aria-selected="${k === tab}" class="${k === tab ? 'on' : ''}">${t}${k === 'prz' && nPrz ? `<span class="dot">${nPrz}</span>` : ''}${k === 'vst' && nVst ? `<span class="dot">${nVst}</span>` : ''}</a>`).join('') + '</div>';
    h += (V['t_' + tab] || V.t_apz)(p, cs, ms);
    return h;
  },

  t_apz(p, cs, ms) {
    let h = '<div class="card">' +
      `<div class="kv"><b>Nuo traumos</b><span>${p.tInj ? sinceInj(p) + ' (' + dhm(p.tInj) + ')' : '<button class="btn sm" data-act="ed-tinj">Nustatyti traumos laiką</button>'}</span>` +
      `<b>Svoris</b><span>${p.kg ? p.kg + ' kg' : '<button class="btn sm" data-act="ed-kg">Įvesti</button>'}</span>` +
      (p.mech ? `<b>Mechanizmas</b><span>${esc(p.mech)}</span>` : '') + (p.inj ? `<b>Sužalojimai</b><span>${esc(p.inj)}</span>` : '') +
      (p.allerg ? `<b>Alergijos</b><span>${esc(p.allerg)}</span>` : '') +
      `<b>Evakuacija</b><span>${p.evac.cat ? esc(p.evac.cat) + ' · ' : ''}${p.evac.eta ? (p.evac.eta > now() ? 'po ' + dur(p.evac.eta - now()) + ' (' + hm(p.evac.eta) + ')' : hm(p.evac.eta)) : '—'}</span></div>` +
      '<div class="acts"><button class="btn sm" data-act="ed-pt">✎ Duomenys</button></div></div>';
    h += '<div class="chips" role="group" aria-label="Būklė">' + CRIT.map(([k, t]) => chip('crit', k, p.crit === k, t)).join('') + '</div>';
    h += '<div class="chips" role="group" aria-label="Eiga">' + TREND.map(([k, t]) => chip('trend', k, p.trend === k, t)).join('') + '</div>';
    const due = cs.filter(c => c.st !== 'ok').concat(ms.filter(x => x.st !== 'ok').map(x => ({ k: 'med', nm: x.m.name, st: x.st, due: x.due, mid: x.m.id })));
    if (due.length) h += '<h2>Artėja ir vėluoja</h2><div class="list">' + due.slice(0, 5).map(c => dueRow(p, c)).join('') + '</div>';
    h += '<div class="acts"><button class="btn pri" data-act="vit-new">+ Rodikliai</button><button class="btn" data-act="io-new" data-k="in">+ Įvesta</button><button class="btn" data-act="io-new" data-k="out">+ Išskirta</button><button class="btn" data-act="med-new" data-k="med">+ Vaistas</button></div>';
    if (p.vit.length) h += '<h2>Paskutiniai rodikliai · ' + hm(p.vit[p.vit.length - 1].t) + '</h2>' + sparks(p);
    const U = urine(p, 2);
    if (p.io.some(e => e.type === 'slap')) h += uoBox(p, U, 2);
    h += tqBlock(p);
    return h;
  },

  t_rod(p) {
    let h = '<div class="acts"><button class="btn pri wide" data-act="vit-new">+ Matavimas</button></div>';
    h += '<div class="lb">Matuoti kas</div><div class="chips" role="group" aria-label="Matavimų intervalas">' + VINT.map(([m, t]) => chip('vint', m, +p.vint === m, t)).join('') + '</div>';
    h += '<p class="muted">Kritinė – kas 15–30 min, kol stabilizuojasi; rimta – kas 4 val.; nekritinė – kas 12 val.</p>';
    if (!p.vit.length) return h + '<p class="muted">Matavimų dar nėra.</p>' + srcLine('nurse', 'doc');
    h += sparks(p) + vitTable(p);
    const L = p.vit[p.vit.length - 1], si = shock(L), mp = mapOf(L);
    if (si || mp) h += `<p class="muted">${mp ? 'VAKS ' + mp + ' mm Hg' : ''}${si && mp ? ' · ' : ''}${si ? 'šoko indeksas ' + fmt1(si) + (si >= 1 ? ' – <b>≥ 1</b>' : '') : ''}</p>`;
    h += '<p class="muted">Tikslai: SpO₂ ≥ 92 %; sAKS > 90 (geriau 100–110) mm Hg arba čiuopiamas radialinis pulsas; galvos trauma – sAKS > 90, neurologinė apžiūra kas valandą.</p>';
    return h + srcLine('pcc', 'nurse', 'doc');
  },

  t_sks(p) {
    const t = now(), st = careStart(p), w = +S().uoh || 2;
    const A = [ioTot(p, t - HR, t), ioTot(p, st, t), ioTot(p, t - 24 * HR, t)];
    let h = '<div class="acts"><button class="btn pri" data-act="io-new" data-k="in">+ Įvesta</button><button class="btn pri" data-act="io-new" data-k="out">+ Išskirta</button></div>';
    h += '<div class="tot"><div class="h">1 val.</div><div class="h">Nuo ' + (p.tInj ? 'traumos' : 'pradžios') + '</div><div class="h">24 val.</div>' +
      A.map(x => `<div><small>Įvesta</small><b>${x.in}</b></div>`).join('') + A.map(x => `<div><small>Išskirta</small><b>${x.out}</b></div>`).join('') +
      A.map(x => `<div><small>Balansas</small><b>${x.net > 0 ? '+' : ''}${x.net}</b></div>`).join('') + '</div><p class="muted">ml</p>';
    h += '<h2>Diurezė</h2><div class="chips" role="group" aria-label="Laikotarpis">' + [1, 2, 4, 6].map(x => chip('uoh', x, w === x, x + ' val.')).join('') + '</div>';
    h += uoBox(p, urine(p, w), w);
    h += '<div class="chips">' + chip('burns', '1', p.burns, (p.burns ? '✓ ' : '') + 'Nudegimai (tikslas 0,5–1 ml/kg/val.)') + '</div>';
    h += '<p class="muted">Palaikomieji skysčiai: intubuotam ar sedatuotam – 100–150 ml/val. IV/IO pagal diurezę; sąmoningam – ~100–125 ml/val. per burną. Laisvo vandens (5 % gliukozės) venkite.</p>';
    if (p.io.length) h += '<h2>Įrašai</h2><div class="list">' + p.io.slice().sort((a, b) => b.t - a.t).map(e => `<div class="li"><span class="tm">${dhm(e.t)}</span><div class="x">${e.k === 'in' ? '↓' : '↑'} ${esc(ioName(e.k, e.type))}${e.note ? `<small>${esc(e.note)}</small>` : ''}</div><b>${e.k === 'in' ? '+' : '−'}${e.ml}</b><button class="del" data-act="io-del" data-k="${e.id}" aria-label="Ištrinti">×</button></div>`).join('') + '</div>';
    return h + srcLine('pcc', 'nurse');
  },

  t_vst(p, cs, ms) {
    let h = '<div class="acts"><button class="btn pri" data-act="med-new" data-k="med">+ Vaistas</button><button class="btn" data-act="med-new" data-k="int">+ Veiksmas</button></div>';
    if (ms.length) h += '<h2>Kitos dozės</h2><div class="list">' + ms.sort((a, b) => a.due - b.due).map(x => dueRow(p, { k: 'med', nm: x.m.name, st: x.st, due: x.due, mid: x.m.id, sub: (x.m.dose ? x.m.dose + ' ' : '') + (x.m.route || '') + ' · kas ' + ivlTxt(x.m.ivl) })).join('') + '</div>';
    h += `<p class="muted">Dozės – <a href="${SRC.etc[1]}" target="_blank" rel="noopener">ETC gide ↗</a> ir <a href="${SRC.march[1]}" target="_blank" rel="noopener">March gide ↗</a>. PCC: titruoti po mažiau, kartoti dažniau; pirmenybė IV/IO; naloksoną laikykite po ranka.</p>`;
    if (p.meds.length) h += '<h2>Žurnalas</h2><div class="list">' + p.meds.slice().sort((a, b) => b.t - a.t).map(m => `<div class="li"><span class="tm">${dhm(m.t)}</span><div class="x">${m.kind === 'int' ? '✚ ' : '💊 '}${esc(m.name)}<small>${esc([m.dose, m.route, m.ivl ? 'kas ' + ivlTxt(m.ivl) : '', m.note].filter(Boolean).join(' · '))}</small></div><button class="del" data-act="med-del" data-k="${m.id}" aria-label="Ištrinti">×</button></div>`).join('') + '</div>';
    else h += '<p class="muted">Įrašų dar nėra.</p>';
    return h + srcLine('pcc', 'etc');
  },

  t_prz(p, cs) {
    let h = '<div class="chips" role="group" aria-label="Būklė">' + CRIT.map(([k, t]) => chip('crit', k, p.crit === k, t)).join('') + '</div>';
    h += '<p class="muted">Intervalai pagal būklę: kritinė – trumpesni.</p>';
    h += '<div class="list">' + cs.map(c => careRow(p, c)).join('') + '</div>';
    h += '<div class="chips">' + chip('tbi', '1', p.tbi, (p.tbi ? '✓ ' : '') + 'Galvos trauma') + chip('heat', '1', !!p.care.sild, (p.care.sild ? '✓ ' : '') + 'Šildanti antklodė uždėta') + '</div>';
    const offs = CARE.filter(c => p.off[c[0]]);
    h += '<details><summary>Netaikomi punktai' + (offs.length ? ' (' + offs.length + ')' : '') + '</summary><div class="chips">' +
      CARE.filter(c => !c[5] && c[0] !== 'vit').map(c => chip('care-off', c[0], !!p.off[c[0]], (p.off[c[0]] ? '✓ ' : '') + c[1].split(':')[0].split(',')[0])).join('') + '</div><p class="muted">Pažymėti punktai nerodomi ir nepriminami.</p></details>';
    return h + srcLine('nurse', 'plan', 'pcc');
  },

  t_prd(p) {
    const tc = p.tc;
    let h = '<h2>Telekonsultacija</h2><p class="muted">Prieš skambutį nusiųskite stebėjimo lapą ir nuotraukas. Skambina komandos narys – medikas lieka prie sužeistojo. Rekomendacijas pakartokite (readback).</p>';
    h += `<label class="lb" for="tc-req">Prašymas – kokios pagalbos reikia</label><textarea class="inp" id="tc-req" data-tc="req" rows="2" placeholder="pvz. ar tęsti skysčius, antibiotikas, evakuacijos prioritetas">${esc(tc.req)}</textarea>`;
    h += `<label class="lb" for="tc-exam">Apžiūra pagal sistemas</label><textarea class="inp" id="tc-exam" data-tc="exam" rows="3" placeholder="Neuro; galūnės; širdis, pulsai; plaučiai; oda, žaizdos; pilvas">${esc(tc.exam)}</textarea>`;
    h += `<label class="lb" for="tc-res">Ištekliai</label><textarea class="inp" id="tc-res" data-tc="res" rows="2" placeholder="Prieigos, monitorius, skysčiai, kraujas, vaistai, KT įranga, ryšys">${esc(tc.res)}</textarea>`;
    h += `<pre class="out" id="tc-out">${esc(teleText(p))}</pre>`;
    h += '<div class="acts"><button class="btn pri" data-act="tc-read">Skaityti</button><button class="btn" data-act="tc-copy">Kopijuoti</button><button class="btn" data-act="tc-share">Bendrinti</button></div>';
    h += `<label class="lb" for="tc-rec">Konsultanto rekomendacijos (užsirašykite ir pakartokite)</label><textarea class="inp" id="tc-rec" data-tc="rec" rows="3">${esc(tc.rec)}</textarea>`;
    h += srcLine('doc', 'tele');
    h += '<h2>ATMISTER perdavimas</h2>' + `<pre class="out" id="at-out">${esc(atmistText(p))}</pre>` +
      '<div class="acts"><button class="btn pri" data-act="at-read">Skaityti</button><button class="btn" data-act="at-copy">Kopijuoti</button><button class="btn" data-act="at-share">Bendrinti</button></div>';
    h += '<p class="muted">Perduodant pirmiausia – vaistai.</p>';
    h += '<h2>Pasiruošimas evakuacijai</h2>' + EVCK.map(([k, t, s]) => `<label class="ck"><input type="checkbox" data-act="evck" data-k="${k}"${p.evck[k] ? ' checked' : ''}><span>${esc(t)}${s ? `<small>${esc(s)}</small>` : ''}</span></label>`).join('');
    h += srcLine('pcc');
    h += '<div class="acts"><button class="btn dng" data-act="pt-del">Ištrinti sužeistąjį</button></div>';
    return h;
  },

  // ───────── priminimai ─────────
  prim() {
    const a = dueAll(), d = D();
    let h = '<h2>Priminimai</h2>';
    if (!a.length) h += '<p class="muted">Vėluojančių darbų nėra.</p>';
    else h += '<div class="list">' + a.map(x => `<div class="li ${x.st === 'over' ? 'over' : 'due'}"><div class="x"><a href="#/p/${x.p.id}?t=${x.tab}">${esc(x.p.nm)}</a><small>${esc(x.nm)}</small></div><span class="st">${x.st === 'over' ? 'vėluoja ' + dur(now() - x.due) : 'dabar'}</span>${x.k.startsWith('care:') && x.k !== 'care:vit' ? `<button class="ok" data-act="care-done" data-k="${esc(x.k.slice(5))}" data-p="${x.p.id}" aria-label="Atlikta">✓</button>` : ''}</div>`).join('') + '</div>';
    const soon = [];
    d.pts.forEach(p => { careState(p).forEach(c => { if (c.st === 'soon') soon.push([p, c.nm, c.due]); }); medState(p).forEach(x => { if (x.st === 'soon') soon.push([p, x.m.name, x.due]); }); });
    if (soon.length) h += '<h2>Artėja (15 min)</h2><div class="list">' + soon.sort((a, b) => a[2] - b[2]).map(([p, nm, due]) => `<div class="li"><div class="x"><a href="#/p/${p.id}">${esc(p.nm)}</a><small>${esc(nm.split(':')[0])}</small></div><span class="tm">${hm(due)}</span></div>`).join('') + '</div>';
    return h;
  },

  // ───────── nustatymai ─────────
  set() {
    const s = S();
    let h = '<h2>Aš</h2><p class="muted">Telekonsultacijos įžangai.</p>' +
      `<label class="lb" for="s-call">Šaukinys, pareigos</label><input class="inp" id="s-call" data-set="call" value="${esc(s.call)}" autocomplete="off">` +
      `<label class="lb" for="s-unit">Padalinys, vieta</label><input class="inp" id="s-unit" data-set="unit" value="${esc(s.unit)}" autocomplete="off">` +
      `<label class="lb" for="s-contact">Ryšys (dažnis, tel.)</label><input class="inp" id="s-contact" data-set="contact" value="${esc(s.contact)}" autocomplete="off">`;
    h += '<h2>Ekranas ir signalai</h2><div class="chips">' + chip('theme', 'field', s.theme === 'field', 'Tamsus') + chip('theme', 'light', s.theme === 'light', 'Šviesus') + chip('night', '1', s.night, (s.night ? '✓ ' : '') + 'Naktinis raudonas') + '</div>' +
      '<div class="chips">' + chip('sound', '1', s.sound, (s.sound ? '✓ ' : '') + 'Garsas') + chip('vib', '1', s.vib, (s.vib ? '✓ ' : '') + 'Vibracija') + '</div>' +
      '<p class="muted">Priminimai veikia, kai programėlė atverta.</p>';
    h += '<h2>Duomenys</h2><div class="acts"><button class="btn" data-act="exp">Kopijuoti duomenis</button><button class="btn" data-act="imp">Įkelti duomenis</button></div>' +
      '<div class="lb">Automatiškai ištrinti nenaudojant</div><div class="chips">' + [[0, 'Niekada'], [12, '12 val.'], [24, '24 val.'], [72, '72 val.']].map(([k, t]) => chip('opsec', k, +s.opsec === k, t)).join('') + '</div>' +
      '<div class="acts"><button class="btn dng wide" data-act="wipe">Ištrinti visus duomenis</button></div><p class="muted">Duomenys saugomi tik šiame telefone.</p>';
    h += '<h2>Apie</h2><p class="muted">PCC gidas ' + VER + '. Parengė 1040 medkuopa pagal JTS PCC gaires. Atminties priemonė, ne oficiali gairė; dozės – pagal kuopos vaistų korteles.</p>';
    h += '<h2>Šaltiniai</h2><div class="list">' + Object.keys(SRC).map(k => `<a class="li" href="${SRC[k][1]}" target="_blank" rel="noopener"><div class="x">${esc(SRC[k][0])}<small>${esc(SRC[k][1].replace(/^https?:\/\//, '').split('/')[0])}</small></div><span>↗</span></a>`).join('') + '</div>';
    h += '<img class="logo lt" src="img/logo-balt.png" alt="1040 medkuopa"><img class="logo dk" src="img/logo-juod.png" alt="1040 medkuopa">';
    return h;
  }
};

const EVCK = [
  ['req', 'Evakuacijos prašymas pateiktas (9-Line), prioritetas peržiūrėtas', 'Galvos trauma blogėja – prioritetą didinti'],
  ['sup', 'Vaistai, skysčiai, kraujas ir priemonės kelionei paruošti', 'Su atsarga vėlavimui'],
  ['tq', 'Turniketai, tvarsčiai, įtvarai patikrinti; turniketų laikas pažymėtas', ''],
  ['line', 'Linijos, vamzdeliai, kateteris, drenai pritvirtinti', ''],
  ['hypo', 'Apsauga nuo hipotermijos: izoliacija, šildymas, vėjo ir drėgmės apsauga', 'Aktyvaus šildymo tiesiai ant odos nedėti'],
  ['pack', 'Pakuotas ir pritvirtintas neštuvuose; akių, ausų apsauga', ''],
  ['doc', 'Dokumentai kartu: MIST / DD 1380 kortelė, stebėjimo lapas', ''],
  ['ho', 'Perdavimas parengtas (ATMISTER), pirmiausia – vaistai', ''],
  ['wpn', 'Ginklas, šaudmenys ir jautrūs daiktai perduoti pagal SOP', '']
];

const ivlTxt = m => m >= 60 ? (m % 60 ? fmt1(m / 60) : m / 60) + ' val.' : m + ' min';
function stTxt(st, due) { return st === 'over' ? 'vėluoja ' + dur(now() - due) : st === 'due' ? 'dabar' : st === 'soon' ? 'po ' + dur(due - now()) : dhm(due); }
function dueRow(p, c) {
  const cls = c.st === 'over' ? 'over' : c.st === 'due' ? 'due' : '';
  if (c.k === 'med') return `<div class="li ${cls}"><div class="x">💊 ${esc(c.nm)}${c.sub ? `<small>${esc(c.sub)}</small>` : ''}</div><span class="st">${stTxt(c.st, c.due)}</span><button class="ok" data-act="med-again" data-k="${c.mid}" aria-label="Suleista dabar">✓</button></div>`;
  return careRow(p, c);
}
function careRow(p, c) {
  const cls = c.st === 'over' ? 'over' : c.st === 'due' ? 'due' : '';
  const act = c.k === 'vit' ? 'vit-new' : 'care-done';
  return `<div class="li ${cls}"><div class="x">${esc(c.nm)}<small>kas ${ivlTxt(c.ivl)}${c.last ? ' · atlikta ' + hm(c.last) : ''}${c.note ? ' · ' + esc(c.note) : ''}</small></div><span class="st">${stTxt(c.st, c.due)}</span><button class="ok" data-act="${act}" data-k="${c.k}" data-p="${p.id}" aria-label="${c.k === 'vit' ? 'Matuoti' : 'Atlikta dabar'}">${c.k === 'vit' ? '+' : '✓'}</button></div>`;
}
function dueBanner() {
  const a = dueAll(); if (!a.length) return '';
  return `<a class="banner" href="#/prim">⚠<span>${a.length} ${a.length === 1 ? 'darbas vėluoja' : 'darbai vėluoja'}: ${esc(a.slice(0, 2).map(x => x.p.nm.replace('Sužeistasis ', '') + ' ' + x.nm).join(', '))}${a.length > 2 ? '…' : ''}</span>›</a>`;
}
// ── rodiklių tendencijos ──
const SPK = [['hr', 'Pulsas'], ['sys', 'AKS s'], ['rr', 'KD'], ['spo2', 'SpO₂'], ['temp', 'T °C'], ['gcs', 'GKS'], ['pain', 'Skausmas']];
function spark(vals) {
  const pts = vals.slice(-12); if (pts.length < 2) return '';
  const xs = pts.map(v => v[0]), ys = pts.map(v => +v[1]), x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  const X = x => x1 === x0 ? 50 : (x - x0) / (x1 - x0) * 96 + 2, Y = y => y1 === y0 ? 15 : 28 - (y - y0) / (y1 - y0) * 26;
  const last = pts[pts.length - 1];
  return `<svg viewBox="0 0 100 30" preserveAspectRatio="none" aria-hidden="true"><polyline points="${pts.map(v => X(v[0]).toFixed(1) + ',' + Y(+v[1]).toFixed(1)).join(' ')}"/><circle cx="${X(last[0]).toFixed(1)}" cy="${Y(+last[1]).toFixed(1)}" r="2.2"/></svg>`;
}
function sparks(p) {
  return '<div class="spk">' + SPK.map(([k, nm]) => {
    const vals = p.vit.filter(v => v[k] !== '' && v[k] != null).map(v => [v.t, v[k]]); if (!vals.length) return '';
    const L = vals[vals.length - 1][1], prev = vals.length > 1 ? vals[vals.length - 2][1] : null, w = prev != null && worse(k, prev, L);
    const show = k === 'sys' ? L + (lastV(p, 'dia') ? '/' + lastV(p, 'dia') : '') : k === 'temp' ? fmt1(L) : L;
    return `<div><small>${nm}</small><b class="${abn(k, L) ? 'ab' : ''}">${esc(show)}${w ? (w === 'up' ? ' ▲' : ' ▼') : ''}</b>${spark(vals)}</div>`;
  }).join('') + (lastV(p, 'avpu') ? `<div><small>AVPU · KPL</small><b class="${abn('avpu', lastV(p, 'avpu')) ? 'ab' : ''}">${esc(lastV(p, 'avpu'))}${lastV(p, 'crt') ? ' · ' + esc(lastV(p, 'crt').replace('-', '–')) : ''}</b></div>` : '') + '</div>';
}
const VROWS = [['avpu', 'AVPU'], ['gcs', 'GKS'], ['hr', 'Pulsas'], ['sys', 'AKS s'], ['dia', 'AKS d'], ['rr', 'KD'], ['spo2', 'SpO₂'], ['temp', 'T'], ['crt', 'KPL'], ['pain', 'Skausm.']];
function vitTable(p) {
  const L = p.vit.slice(-12), cols = L.slice().reverse();
  const rows = VROWS.filter(([k]) => L.some(v => v[k] !== '' && v[k] != null));
  let h = '<div class="vt"><table><thead><tr><th></th>' + cols.map(v => `<th>${hm(v.t)}</th>`).join('') + '</tr></thead><tbody>';
  rows.forEach(([k, nm]) => {
    h += `<tr><td class="t">${nm}</td>` + cols.map(v => {
      const idx = L.indexOf(v); let prev = null; for (let i = idx - 1; i >= 0; i--) { if (L[i][k] !== '' && L[i][k] != null) { prev = L[i][k]; break; } }
      const x = v[k]; if (x === '' || x == null) return '<td class="nil">·</td>';
      const w = prev != null ? worse(k, prev, x) : '';
      return `<td class="${abn(k, x) ? 'ab' : ''}${w ? ' wr' + (w === 'up' ? ' up' : '') : ''}"${w ? ' title="blogiau nei ankstesnis"' : ''}>${esc(k === 'temp' ? fmt1(x) : k === 'crt' ? x.replace('-', '–') : x)}</td>`;
    }).join('') + '</tr>';
  });
  h += '<tr><td class="t"></td>' + cols.map(v => `<td class="t"><button class="del" data-act="vit-del" data-k="${v.id}" aria-label="Ištrinti matavimą ${hm(v.t)}" style="min-width:40px;min-height:36px;font-size:15px">×</button></td>`).join('') + '</tr>';
  return h + '</tbody></table></div><p class="muted">Rėmelis ir ▲▼ – blogiau nei ankstesnis matavimas.</p>';
}
function uoBox(p, U, w) {
  if (!p.kg) return '<div class="uo"><span>Šlapimas per ' + w + ' val.: ' + U.ml + ' ml (' + U.mlh + ' ml/val.)</span><small>Įveskite svorį – bus skaičiuojama ml/kg/val.</small><button class="btn sm" data-act="ed-kg">Svoris</button></div>';
  const tg = p.burns ? '0,5–1' : '≥ 0,5';
  return `<div class="uo ${U.st}"><b>${fmt2(U.mlkg)} ml/kg/val.</b><span>${U.mlh} ml/val. · ${U.ml} ml per ${fmt1(U.hrs)} val. · tikslas ${tg}</span><small>${U.st === 'lo' ? 'Mažiau nei tikslas – vertinkite perfuziją, skysčius, kateterį' : U.st === 'hi' ? 'Daugiau nei tikslas – mažinkite skysčių greitį' : 'Tikslas pasiektas'}</small></div>`;
}
function tqBlock(p) {
  let h = '<h2>Turniketai</h2>';
  if (p.tq.length) h += '<div class="list">' + p.tq.map(q => {
    const s = tqState(q), el = dur((q.conv || now()) - q.t);
    const tx = s === 'conv' ? 'konvertuotas ' + hm(q.conv) : s === 'early' ? 'konversija – po 2 val.' : s === 'win' ? 'konversijos langas 2–6 val.' : 'NENUIMTI – > 6 val.';
    return `<div class="li ${s === 'late' ? 'over' : s === 'win' ? 'due' : ''}"><div class="x">${esc(q.limb)} · ${hm(q.t)}<small>${el} · ${tx}</small></div>${s === 'conv' ? '' : `<button class="btn sm" data-act="tq-conv" data-k="${q.id}">Konvertuotas</button>`}<button class="del" data-act="tq-del" data-k="${q.id}" aria-label="Ištrinti">×</button></div>`;
  }).join('') + '</div>';
  h += '<div class="chips">' + LIMBS.map(l => chip('tq-add', l, false, '+ ' + l)).join('') + '</div>';
  return h + srcLine('pcc');
}

// ───────── tekstai perdavimui ─────────
function trendTxt(p) {
  const L = p.vit.slice(-4); if (!L.length) return '—';
  return L.map(v => hm(v.t) + ' ' + vitText(v)).join('\n  ');
}
function treatTxt(p, from) {
  const m = p.meds.filter(x => x.t >= from).sort((a, b) => a.t - b.t).map(x => hm(x.t) + ' ' + x.name + (x.dose ? ' ' + x.dose : '') + (x.route ? ' ' + x.route : ''));
  const q = p.tq.map(x => 'turniketas ' + x.limb + ' ' + hm(x.t) + (x.conv ? ', konvertuotas ' + hm(x.conv) : ''));
  return q.concat(m).join('; ') || '—';
}
function teleLines(p) {
  const s = S(), t = now(), T = ioTot(p, t - 24 * HR, t), U = urine(p, 2);
  const tr = (TREND.find(x => x[0] === p.trend) || ['', 'nenurodyta'])[1].toLowerCase(), cr = (CRIT.find(x => x[0] === p.crit) || ['', ''])[1].toLowerCase();
  return [
    ['Įžanga', [s.call || 'Šaukinys —', s.unit, s.contact ? 'ryšys ' + s.contact : ''].filter(Boolean).join(', ') + '. Realus atvejis / treniruotė: ___'],
    ['Santrauka', [[p.nm, p.age ? p.age + ' m.' : '', p.sex, p.status].filter(Boolean).join(', '), p.mech ? 'Mechanizmas: ' + p.mech : '', 'Nuo traumos ' + (p.tInj ? dur(t - p.tInj) : '—'), 'Evakuacija: ' + (p.evac.eta ? (p.evac.eta > t ? 'po ' + dur(p.evac.eta - t) : hm(p.evac.eta)) : 'nežinoma'), 'Būklė ' + cr + ', ' + tr].filter(Boolean).map(x => x.replace(/\.$/, '') + '.').join(' ')],
    ['Sužalojimai, problemos', p.inj || '—'],
    ['Gydymas', treatTxt(p, 0)],
    ['Anamnezė', 'Alergijos: ' + (p.allerg || 'nežinoma') + '. Ligos, operacijos: ' + (p.hist || 'nežinoma') + '.'],
    ['Prašymas', p.tc.req || '—'],
    ['Rodikliai (tendencija)', trendTxt(p)],
    ['Apžiūra', p.tc.exam || '—'],
    ['Skysčiai per 24 val.', 'įvesta ' + T.in + ' ml, išskirta ' + T.out + ' ml, balansas ' + (T.net > 0 ? '+' : '') + T.net + ' ml; diurezė ' + (p.kg && U.mlkg != null ? fmt2(U.mlkg) + ' ml/kg/val.' : U.mlh + ' ml/val.') + (p.kg ? ', svoris ' + p.kg + ' kg' : '')],
    ['Ištekliai', p.tc.res || '—']
  ];
}
const teleText = p => 'TELEKONSULTACIJA\n' + teleLines(p).map(([l, v]) => l.toUpperCase() + ': ' + v).join('\n');
function atmistLines(p) {
  const L = p.vit[p.vit.length - 1], t = now(), T = ioTot(p, careStart(p), t);
  return [
    ['A – amžius, lytis, anamnezė', [p.age ? p.age + ' m.' : '', p.sex, p.allerg ? 'alergijos: ' + p.allerg : '', p.hist].filter(Boolean).join(', ') || '—'],
    ['T – traumos laikas', p.tInj ? hm(p.tInj) + ' (prieš ' + dur(t - p.tInj) + ')' : '—'],
    ['M – mechanizmas', p.mech || '—'],
    ['I – sužalojimai', p.inj || '—'],
    ['S – požymiai', L ? vitText(L) + (p.trend ? '; ' + (TREND.find(x => x[0] === p.trend) || ['', ''])[1].toLowerCase() : '') : '—'],
    ['T – gydymas', treatTxt(p, 0) + '. Skysčiai: įvesta ' + T.in + ' ml, išskirta ' + T.out + ' ml'],
    ['E – evakuacija', (p.evac.cat || '—') + (p.evac.eta ? ', ' + hm(p.evac.eta) : '')],
    ['R – ko reikės', p.tc.res || '—']
  ];
}
const atmistText = p => 'ATMISTER\n' + atmistLines(p).map(([l, v]) => l.split(' – ')[0] + ' – ' + v).join('\n');
