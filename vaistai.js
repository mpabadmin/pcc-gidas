// PCC gidas – VAISTAI. ⚠ STUB – laikinas pavyzdinis turinys be tikrų dozių (formatas kaip March gide: id, name, klase, grupe, lygis, ind, kontra, dozes [{ k, d, p, c }], ispejimai, pakuote, pastabos, susije, saltinis, nuorodos).
// Nebūtina: E.vaistuGrupes, E.qd = { vaisto id: [[būdas, kiekis, vienetai], …] } – greitosios dozės vaisto languose, E.daznVaistai = ['id', …] – pradžios ekranui.
window.ETC = window.ETC || {};
(function () {
const E = window.ETC;
E.vaistuGrupes = [{ id: 'stub', pav: 'Pavyzdžiai (STUB)' }];
E.vaistai = [
  { id: 'stub-a', name: 'Vaistas A (STUB)', klase: 'STUB klasė', grupe: 'stub', lygis: 'CMC', ind: 'STUB indikacija.', dozes: [{ k: 'STUB', d: 'pagal kuopos vaistų kortelę' }], saltinis: 'STUB' },
  { id: 'stub-b', name: 'Vaistas B (STUB)', klase: 'STUB klasė', grupe: 'stub', lygis: 'CPP', ind: 'STUB indikacija.', dozes: [{ k: 'STUB', d: 'pagal kuopos vaistų kortelę' }], saltinis: 'STUB' }
];
})();
