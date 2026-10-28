// PCC gidas – FAZĖS, KONTROLINIAI SĄRAŠAI, MOKYMOSI PUSLAPIAI IR TEMOS
// ⚠ STUB – laikinas pavyzdinis turinys architektūrai ir testams. Tikrą turinį (tuo pačiu formatu kaip March gide) įkelia turinio failas.
// Formatas – kaip March gido sarasai.js: E.fazes [{ id, cls?, pav, en, sub, lists, aprasymas }], E.sarasai { id: { title, short, intro, items: [{ t, s, g, k, sk, r, rl, i } | { h }] } },
// E.puslapiai { id: { title, sub, html, saltinis } }, E.temos [{ id, zenklas, cls?, pav, sub, puslapiai, igudziai, sarasai, vaistai }], nebūtina window.ETC.vertinimai.
window.ETC = window.ETC || {};
(function () {
const E = window.ETC;
E.versija = '2026-10-28 v2 (STUB turinys – March architektūra: režimai, fazės, sąrašai, įgūdžiai, paciento failas su stebėjimo lapu, skysčiais, priežiūra ir telekonsultacija)';
E.programa = 'PCC gidas';
E.fazes = [
  { id: 'P1', pav: 'Pirmos valandos', en: 'Stabilization', sub: 'STUB: MARCH PAWS, prieigos', lists: ['stub-pradzia', 'stub-prieziura'], aprasymas: 'STUB fazės aprašymas.' },
  { id: 'P2', pav: 'Priežiūra lauke', en: 'Prolonged care', sub: 'STUB: stebėjimas, slauga', lists: ['stub-prieziura'], aprasymas: 'STUB fazės aprašymas.' },
  { id: 'P3', pav: 'Evakuacija', en: 'Evacuation', sub: 'STUB: perdavimas', lists: ['stub-evak'], aprasymas: 'STUB fazės aprašymas.' }
];
E.sarasai = {
  'stub-pradzia': { title: 'P1: Pradinis įvertinimas (STUB)', short: 'Įvertinimas', intro: 'STUB sąrašas.', items: [
    { h: 'Pradžia' },
    { t: 'STUB punktas: pakartotinė MARCH PAWS apžiūra', k: true, sk: 1 },
    { t: 'STUB punktas: rodikliai į stebėjimo lapą', r: '#/pacientas?t=rod' },
    { t: 'STUB punktas: turniketų laikai', r: '#/turniketai', rl: 'Turniketai' }
  ] },
  'stub-prieziura': { title: 'P2: Slauga (STUB)', short: 'Slauga', items: [
    { t: 'STUB punktas: priežiūros grafikas', r: '#/pacientas?t=prz' },
    { t: 'STUB punktas: skysčių balansas', r: '#/pacientas?t=sks', g: 'CMC' }
  ] },
  'stub-evak': { title: 'P3: Perdavimas (STUB)', short: 'Perdavimas', items: [
    { t: 'STUB punktas: telekonsultacija', r: '#/telekonsultacija', rl: 'Telekonsultacija' },
    { t: 'STUB punktas: 9-Line', r: '#/9line' }
  ] }
};
E.puslapiai = {
  'stub-pcc': { title: 'PCC pagrindai (STUB)', sub: 'Pavyzdinis puslapis', html: '<h3>Pirma</h3><p>STUB tekstas.</p><h3>Antra</h3><p>STUB tekstas.</p><h3>Trečia</h3><p>STUB tekstas.</p>', saltinis: 'STUB' },
  'stub-slauga': { title: 'Slauga lauke (STUB)', sub: 'Pavyzdinis puslapis', html: '<p>STUB tekstas.</p>' }
};
E.temos = [
  { id: 'stub-tema', zenklas: 'PCC', pav: 'PCC pagrindai (STUB)', sub: 'Pavyzdinė tema', puslapiai: ['stub-pcc', 'stub-slauga'], igudziai: [1, 2], sarasai: ['stub-pradzia'], vaistai: ['stub-a'] }
];
})();
