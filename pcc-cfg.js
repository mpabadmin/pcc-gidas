'use strict';
// PCC gidas – programėlės nustatymai prie turinio (ne medicininis turinys). Įkeliama po duomenų failų (sarasai.js, vaistai.js …),
// kad duomenų failai liktų tokie, kokius parengė turinio rengėjas. Keičiant turinį – patikrinti, ar E.qd reikšmės vis dar yra vaistai.js dozių tekste.
window.ETC = window.ETC || {};
(function () {
const E = window.ETC;
// Pranešimų priėmimas – ta pati Google lentelė kaip March ir ETC gidų (pranešimai žymimi E.programa = „PCC gidas“)
if (!E.atsiliepimai) E.atsiliepimai = { url: 'https://script.google.com/macros/s/AKfycbyUpzDmAClJ40FMltkHi21Ozc4PpItRr3u6yy4rU0DKNGe7JkRBnOr0y42wLwpJcBau/exec' };
// Greitosios dozės vaisto languose: [būdas, kiekis, vienetai] – tik reikšmės, kurios pažodžiui yra vaistai.js dozių tekste (tikrina t_pcc2.py)
if (!E.qd) E.qd = {
  ketaminas: [['IV', '25', 'mg'], ['IM', '100', 'mg']], meloksikamas: [['PO', '15', 'mg']], fentanilis: [['IV', '50', 'mcg']], txa: [['IV', '2', 'g']], kalcis: [['IV', '30', 'ml'], ['IV', '10', 'ml']],
  cefadroksilis: [['PO', '1', 'g']], ceftriaksonas: [['IV', '2', 'g'], ['IM', '2', 'g']], ertapenemas: [['IV', '1', 'g']], moksifloksacinas: [['PO', '400', 'mg']], cefazolinas: [['IV', '2', 'g']],
  'nacl-hipert': [['IV', '250', 'ml']], levetiracetamas: [['IV', '2000', 'mg']], ondansetronas: [['ODT', '4', 'mg'], ['IV', '4', 'mg']], naloksonas: [['IV', '40', 'mcg']]
};
// Pradžios ekrano „Dažniausi vaistai“ (esamų vaistų id; nesantys praleidžiami)
if (!E.daznVaistai) E.daznVaistai = ['ketaminas', 'paracetamolis', 'txa', 'ceftriaksonas', 'kristaloidai', 'ondansetronas'];
// Evakuacijos pasiruošimo kontrolinis sąrašas (turinio sąrašo id); nėra – rodomas trumpas numatytasis
if (!E.evakSarasas) E.evakSarasas = 'e-pasiruosimas';
})();
