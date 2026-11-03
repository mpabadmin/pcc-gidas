'use strict';
// ── Trumpa instrukcija „Kaip naudotis“: rodoma pirmą kartą atidarius pradžios ekraną, vėliau – mygtukas „?“ (pradžioje) ir Nustatymuose ──
// Bendras visoms 1040 medkuopos programėlėms; turinys – STEPS žemiau. Mygtukai su data-g="open" atidaro instrukciją.
const GUIDE = (() => {
  const KEY = 'pcc-guide', VER = 3;
  const IC = {
    search: 'M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14Z|M20 20l-4-4', moon: 'M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z',
    chat: 'M20.5 11.5a8.5 8.5 0 0 1-12.3 7.6L3.5 20.5l1.4-4.6a8.5 8.5 0 1 1 15.6-4.4z', refresh: 'M20 11a8 8 0 0 0-14.3-4.9L4 8|M4 3v5h5|M4 13a8 8 0 0 0 14.3 4.9L20 16|M20 21v-5h-5',
    gear: 'M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0|M16 4v4M10 10v4M18 16v4', wave: 'M22 12h-2.5a2 2 0 0 0-1.9 1.5l-2.4 8.3a.25.25 0 0 1-.5 0L9.2 2.2a.25.25 0 0 0-.5 0L6.4 10.5A2 2 0 0 1 4.5 12H2',
    stop: 'M6 6h12v12H6z', help: 'M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18Z|M9.5 9.3a2.6 2.6 0 0 1 5 .9c0 1.7-2.5 2.3-2.5 3.8|M12 17h.01'
  };
  const svg = (k, c) => `<svg class="${c || 'gdi'}" viewBox="0 0 24 24" aria-hidden="true">${(IC[k] || k).split('|').map(d => `<path d="${d}"/>`).join('')}</svg>`;
  const txt = s => s.replace(/\{(\w+)\}/g, (m, k) => IC[k] ? svg(k, 'gdii') : m);
  const STEPS = [
  { ic: 'M12 3l8 3v6c0 4.5-3.4 8-8 9-4.6-1-8-4.5-8-9V6z|M12 8v5|M12 16h.01', t: 'Tik pagalbinė priemonė', p: 'PCC gidas primena, ką išmokote. <b>Jis neatstoja oficialių kursų</b>, vieneto SOP, telekonsultacijos ir gydytojo nurodymų.' },
  { ic: 'M12 3l7 4v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V7z|M12 8v6M9 11h6', t: 'PCC gidas', p: 'Ilgalaikė sužeistojo priežiūra lauke, kai evakuacija vėluoja valandas ar paras. Skirta apmokytiems kovos medikams ir paramedikams. Veikia be interneto.' },
  { ic: 'M4 6h16M4 12h16M4 18h10', t: 'Priežiūros etapai', p: 'Pradžioje – penki etapai, kiekviename kontroliniai sąrašai.', x: () => '<ul><li><b>STAB</b> – perėmimas ir stabilizavimas.</li><li><b>VAL</b> – kas valandą: vertinimas, skysčiai, skausmas.</li><li><b>PAROS</b> – slauga, žaizdos, infekcija.</li><li><b>YPAT</b> – galva, nudegimai, suspaudimas, ventiliacija.</li><li><b>EVAK</b> – pakavimas, skrydis, perdavimas.</li></ul>' },
  { ic: 'M22 12h-4l-3 9L9 3l-3 9H2', t: 'Stebėjimo lapas', p: '<b>Sužeistasis</b>: rodikliai, skysčiai, vaistai ir priežiūra įrašomi su laiku, matosi tendencijos. Pradėkite nuo svorio ir pirmų rodiklių.' },
  { ic: 'M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18Z|M12 7v5l3 2', t: 'Priminimai', p: 'Įrašius pirmus duomenis, programėlė pati primena: rodiklių matavimą, vaistų kartojimą, turniketų langus (2 ir 6 val.). Apačioje – <b>„Priminimai“</b>, telefonas suvibruoja.' },
  { ic: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4z|M14 14h2v2h-2zM18 18h2v2h-2z', t: 'Perdavimas', p: '<b>Nukentėjusiojo kortelė (DD1380), Telekonsultacija, 9-Line, SITREP</b> – paruošti tekstai. <b>Nuskaityti kortelę</b> – popierinės DD1380 nuotrauka perkeliama į programėlę. <b>Priimti QR</b> – nuskaityti kito telefono kodą. Užpildžius kortelę, ją QR kodu perduosite iš paciento lango (<b>Perduoti</b>).' },
  { ic: 'M4 8h12v12H4z|M8 4h12v12|M7 13h6|M7 16h4', t: 'Apatinė juosta ir lygis', p: '<b>Pacientas</b> – stebėjimo lapas, <b>Priminimai</b>, <b>Vaistai</b>, <b>Įgūdžiai</b> su video, <b>Treniruotė</b> – situacijos, dozių patikra, įsivertinimo lapas. Viršuje pasirinkite lygį: <b>CLS</b> – tik komandos veiksmai, <b>CMC</b> – ir kovos mediko, <b>CPP</b> – viskas.' },
  { ic: 'help', t: 'Mygtukai viršuje', p: '{search} – paieška, {moon} – raudonas naktinis režimas, {chat} – pranešti apie klaidą, <svg class="gdii" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1"/></svg> – nustatymai. Mygtukas <b>ⓘ</b> prie punkto – paaiškinimas. Instrukciją vėl atidarysite mygtuku <b>„Kaip naudotis“</b> pradžioje.' }
];
  let i = 0, el = null, last = null;
  const seen = () => { try { return +JSON.parse(localStorage.getItem(KEY) || '0') >= VER; } catch (e) { return false; } };
  const mark = () => { try { localStorage.setItem(KEY, JSON.stringify(VER)); } catch (e) {} };
  function draw() {
    const S = STEPS[i], n = STEPS.length, end = i === n - 1;
    el.innerHTML = `<div class="gdc" role="dialog" aria-modal="true" aria-labelledby="gdt"><div class="gdh"><div class="gdd">${STEPS.map((x, j) => `<button data-g="go" data-i="${j}" class="${j === i ? 'on' : ''}" aria-label="${j + 1} iš ${n}"></button>`).join('')}</div><button class="gdx" data-g="close">${end ? 'Uždaryti' : 'Praleisti'}</button></div>` +
      `<div class="gdb"><div class="gdic">${svg(S.ic)}</div><h2 id="gdt">${S.t}</h2><p>${txt(S.p)}</p>${S.x ? S.x() : ''}</div>` +
      `<div class="gdf">${i ? '<button class="gdbk" data-g="prev">Atgal</button>' : '<span></span>'}<button class="gdgo" data-g="${end ? 'close' : 'next'}">${end ? 'Pradėti' : 'Toliau'}</button></div></div>`;
    const b = el.querySelector('.gdgo'); if (b) b.focus({ preventScroll: true });
  }
  function open(at) {
    if (el) return;
    last = document.activeElement; i = Math.max(0, Math.min(STEPS.length - 1, +at || 0));
    el = document.createElement('div'); el.className = 'gd'; document.body.appendChild(el); document.body.classList.add('gdon');
    draw();
  }
  function close() {
    if (!el) return;
    mark(); el.remove(); el = null; document.body.classList.remove('gdon');
    if (last && last.focus) try { last.focus({ preventScroll: true }); } catch (e) {}
    if (typeof GUIDE_DONE === 'function') try { GUIDE_DONE(); } catch (e) {}
  }
  const go = d => { i = Math.max(0, Math.min(STEPS.length - 1, i + d)); draw(); };
  document.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('[data-g]'); if (!b) { if (el && e.target === el) close(); return; }
    e.preventDefault(); e.stopPropagation();
    const g = b.dataset.g;
    if (g === 'open') return open();
    if (!el) return;
    if (g === 'next') go(1); else if (g === 'prev') go(-1); else if (g === 'go') { i = +b.dataset.i; draw(); } else if (g === 'close') close();
    else if (STEPS[i].on) { STEPS[i].on(g, b); draw(); }
  }, true);
  document.addEventListener('keydown', e => { if (!el) return; if (e.key === 'Escape') close(); else if (e.key === 'ArrowRight') go(1); else if (e.key === 'ArrowLeft') go(-1); });
  let tx = null;
  document.addEventListener('touchstart', e => { if (el && e.target.closest('.gdc')) tx = e.touches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', e => { if (!el || tx == null) return; const d = e.changedTouches[0].clientX - tx; tx = null; if (Math.abs(d) > 60) go(d < 0 ? 1 : -1); }, { passive: true });
  // pirmą kartą – kai atidaromas pradžios ekranas (automatiniuose testuose nerodoma)
  const home = () => !location.hash || location.hash === '#/' || location.hash === '#';
  const maybe = () => { if (!el && !seen() && !navigator.webdriver && home()) open(); };
  addEventListener('hashchange', () => setTimeout(maybe, 400));
  setTimeout(maybe, 700);
  return { open, close, seen, svg };
})();
