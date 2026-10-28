// PCC gidas – FAZĖS, KONTROLINIAI SĄRAŠAI, MOKYMOSI PUSLAPIAI IR TEMOS
// Pagrindas: JTS CPG „Prolonged Casualty Care Guidelines“ (ID 91, 2021), „Nursing Interventions, Wound Care, and Splint Management in PCC“ (ID 70, 2025),
// „Telemedicine Guidance in the Deployed Setting“ (ID 94, 2023), JTS PFC gairės (DCR, analgezija ir sedacija, galvos trauma, nudegimai, suspaudimo sindromas, žaizdos),
// TCCC gairės 2026-05-01. Jei šaltiniai skiriasi – vadovaujamasi TCCC 2026, tada JTS CPG.
// Sąrašo punktas: { t: tekstas, s: [papunkčiai], g: 'CMC' | 'CPP' – kam skirta (be g – visa PCC komanda, įskaitant CLS), k: true – svarbiausias,
//   sk: įgūdžio Nr. (nuoroda), r: kitas maršrutas (pvz. '#/vaistas/ketaminas'), i: paaiškinimas mokymosi režimui (HTML), tm: 'turn' | 'trauma' – laiko žymė }
// { h: 'Antraštė' } – skyriaus antraštė sąraše.
// Lygiai (kaip March gide): CLS – kovos gelbėtojas / komandos narys (slauga, stebėjimas); CMC – kovos medikas; CPP – kovos paramedikas, gydytojas ar
//   anesteziologijos-intensyviosios terapijos slaugytojas su išplėstine kompetencija. Nustatymas „tik CLS“ slepia CMC ir CPP punktus.
window.ETC = window.ETC || {};

(function () {
const E = window.ETC;
const sk = (n, t) => `<a href="#/igudis/${n}">${t || 'Įgūdis #' + n}</a>`;
const vs = (id, t) => `<a href="#/vaistas/${id}">${t}</a>`;

E.versija = '2026-10-28 v2 (perkelta į March gido architektūrą: 5 fazės ir 21 kontrolinis sąrašas, 39 įgūdžiai, 30 treniruočių scenarijų, 24 vaistai su viena dozavimo schema, 15 mokymosi puslapių, PCC įsivertinimo lapas; šaltiniai – JTS PCC / PFC gairės ir TCCC 2026)';
E.programa = 'PCC gidas';
// Pranešimų priėmimas – ta pati Google lentelė kaip March ir ETC gidų (pranešimai žymimi „PCC gidas“)
E.atsiliepimai = { url: 'https://script.google.com/macros/s/AKfycbyUpzDmAClJ40FMltkHi21Ozc4PpItRr3u6yy4rU0DKNGe7JkRBnOr0y42wLwpJcBau/exec' };

// ───────── FAZĖS ─────────
E.fazes = [
  { id: 'STAB', cls: 'fSTAB', pav: 'Perėmimas ir stabilizavimas', en: 'Transition to PCC · 0–2 val.', sub: 'MARCH-PAWS iš naujo, gaivinimas, planas', lists: ['st-perimti', 'st-gaivinimas', 'st-kvepavimas', 'st-planas', 'st-gebejimai'],
    aprasymas: 'Evakuacija vėluoja – TCCC pereina į ilgalaikę priežiūrą. Pirmiausia iš naujo patikrinkite visas atliktas intervencijas, užbaikite gaivinimą, paskirstykite vaidmenis ir iš karto prašykite evakuacijos bei telekonsultacijos.' },
  { id: 'VAL', cls: 'fVAL', pav: 'Valandinė priežiūra', en: 'Hourly care · 2–24 val.', sub: 'Pakartotinis vertinimas, skysčiai, skausmas', lists: ['v-kasval', 'v-skysciai', 'v-skausmas', 'v-galunes', 'v-hipotermija', 'v-tele'],
    aprasymas: 'Stebėjimas ir pakartotinis vertinimas pagal grafiką: rodiklių tendencijos, diurezė, skausmas ir sedacija, turniketai ir įtvarai, šiluma. Telekonsultacija – anksti ir dažnai.' },
  { id: 'PAROS', cls: 'fPAR', pav: 'Paromis', en: 'Prolonged care · > 24 val.', sub: 'Slauga, žaizdos, infekcija', lists: ['p-slauga', 'p-zaizdos', 'p-infekcija', 'p-komfortas'],
    aprasymas: 'Kai evakuacija vėluoja paromis, komplikacijų prevencija tampa tokia pat svarbi kaip gaivinimas: pragulos, pneumonija, trombozė, infekcija, dehidratacija, mityba ir psichologinė būklė.' },
  { id: 'YPAT', cls: 'fYPAT', pav: 'Ypatingos būklės', en: 'Special conditions', sub: 'Galva, nudegimai, suspaudimas, ventiliacija', lists: ['y-galva', 'y-nudegimai', 'y-crush', 'y-dpv'],
    aprasymas: 'Būklės, kurioms PCC metu reikia atskiro plano: galvos smegenų trauma, nudegimai, suspaudimo sindromas ir hiperkalemija, ventiliuojamas ar intubuotas sužeistasis.' },
  { id: 'EVAK', cls: 'fEVAC', pav: 'Evakuacija ir perdavimas', en: 'Prepare for evacuation · handover', sub: 'Pakavimas, skrydis, perdavimas', lists: ['e-pasiruosimas', 'e-perdavimas'],
    aprasymas: 'Evakuacija prasideda dar prieš ją: sužeistasis paruošiamas ilgesnei nei planuota kelionei, dokumentai keliauja kartu, perdavimas – struktūruotas.' }
];

E.sarasai = {
  // ───────── STAB ─────────
  'st-perimti': {
    title: 'Perėmimas: MARCH-PAWS iš naujo', short: 'Perėmimas',
    intro: '„Padarei – patikrink dar kartą.“ PCC nepakeičia TCCC, o jį tęsia.',
    items: [
      { t: 'Saugi, šilta, apšviesta vieta; izoliacija nuo žemės', k: true },
      { t: 'Perimkite MIST ir kortelę (DD 1380); traumos laikas', tm: 'trauma', sk: 1 },
      { t: 'M: kiekvienas turniketas ir tvarstis – ar kraujavimas sustojęs, ar nepasislinko', k: true, sk: 27, tm: 'turn' },
      { t: 'A: kvėpavimo takai laisvi; priemonė (NPA, krikotiroidotomija) veikia', k: true, sk: 11 },
      { t: 'R: lipdukai laikosi, įtampos pneumotorakso požymių nėra; SpO₂ ≥ 92 %', k: true, sk: 12 },
      { t: 'C: radialinis pulsas, sąmonė, AKS; šokas – gaivinimas', k: true, sk: 6 },
      { t: 'H: apvalkalas sausas ir sandarus; galvos trauma – GKS ir vyzdžiai', sk: 31 },
      { t: 'P · A · W · S: skausmas, antibiotikas, žaizdos, įtvarai – kas padaryta ir kada', sk: 29 },
      { t: 'Išsami apžiūra nuo galvos iki kojų → problemų sąrašas → planas', g: 'CMC', k: true, sk: 4 },
      { t: 'Pradėkite PCC stebėjimo lapą', k: true, sk: 3 }
    ]
  },
  'st-gaivinimas': {
    title: 'Gaivinimas (DCR) ir jo tikslai', short: 'Gaivinimas',
    items: [
      { t: 'Šoko požymiai: sAKS < 100, pulsas > 100, šaltos galūnės, lėtas kapiliarų prisipildymas, sutrikusi sąmonė', k: true, sk: 6 },
      { t: 'TXA 2 g IV / IO – jei dar negavo ir ≤ 3 val. nuo sužeidimo', g: 'CMC', r: '#/vaistas/txa', tm: 'trauma' },
      { t: 'Kraujas: pilnas kraujas → 1 : 1 : 1 → 1 : 1 → plazma ar eritrocitai; kristaloidai – paskutinė išeitis', g: 'CMC', k: true, sk: 7,
        s: ['Grupei tapatus – tik patvirtinus Eldon kortele; kariniu ženkleliu nesiremti', 'Pilti per šildytuvą; kraujo ir vaistų viena linija neleisti'] },
      { t: 'Kalcis po pirmo vieneto, toliau po kas 4 vienetų', g: 'CMC', r: '#/vaistas/kalcis' },
      { t: 'Tikslas: radialinis pulsas ar gerėjanti sąmonė → sAKS > 90 → sAKS 100–110 mm Hg', k: true, s: ['Galvos trauma – sAKS ≥ 110 mm Hg', 'Pasiekus tikslą – gaivinimą nutraukti'],
        i: 'Minimum – geriau – geriausia (JTS PCC). Nepasiekus tikslo ar vėl blogėjant – telekonsultacija (' + sk(36) + ').' },
      { t: 'Diurezė > 0,5 ml/kg/val. – kateteris ar graduotas indas', g: 'CMC', sk: 10 },
      { t: 'Pagerėjo ir vėl blogėja – praleistas kraujavimas, hipotermija, acidozė', s: ['Nereaguoja – abipusė dekompresija, tamponada; telekonsultacija'] },
      { t: 'Hipotenzija išlieka po kraujo ir kraujavimo kontrolės – vazopresorius tik pagal protokolą ar telekonsultaciją', g: 'CPP', r: '#/vaistas/noradrenalinas' }
    ]
  },
  'st-kvepavimas': {
    title: 'Kvėpavimo takai, kvėpavimas, deguonis', short: 'Kvėpavimas',
    items: [
      { t: 'SpO₂ ≥ 92 %; ventiliuojamam EtCO₂ 35–45 mm Hg (galvos trauma – 35–40)', k: true, sk: 12 },
      { t: 'Ambu maišas – visada su PEEP vožtuvu', k: true, sk: 12 },
      { t: 'Deguonis: koncentratorius ar balionas; skaičiuokite, kiek valandų užteks', g: 'CMC' },
      { t: 'Atsiurbimas pagal poreikį; mažiausias veiksmingas slėgis', g: 'CMC', sk: 11 },
      { t: 'Vamzdelis: padėtis (EtCO₂), tvirtinimas, manžetė ~20 mm Hg manometru', g: 'CPP', sk: 14 },
      { t: 'Ventiliatorius: tūris 6–8 ml/kg numatomo svorio, PEEP ≥ 5 cm H₂O', g: 'CPP', sk: 13 },
      { t: 'Staiga blogėja – atjungti, maišas, DOPE: pasislinkimas, užsikimšimas, pneumotoraksas, įranga', g: 'CPP', k: true, sk: 13 },
      { t: 'Galvūgalis ~30°, jei leidžia būklė' }
    ]
  },
  'st-planas': {
    title: 'PCC planas: komanda, resursai, ryšys', short: 'Planas',
    intro: 'Mažiau resursų reiškia ne mažiau planavimo, o daugiau prioritetų ir kontrolės.',
    items: [
      { t: 'Vaidmenys: atsakingas už sužeistąjį, stebintis, resursai, ryšys ir evakuacija, dokumentavimas', k: true, sk: 5 },
      { t: 'Evakuacijos prašymas pateiktas iš karto; skubumas peržiūrimas', k: true, r: '#/9line' },
      { t: 'Telekonsultacija – anksti, ne tik pablogėjus', k: true, sk: 36 },
      { t: 'Inventorizacija: kraujas, skysčiai, vaistai, deguonis, baterijos, vanduo, maistas, šiluma', sk: 5, s: ['Kiek valandų užteks? Kada papildymas?'] },
      { t: 'Ryšio PACE planas – priežiūrai ir technikai', sk: 36 },
      { t: 'Stebėjimo dažnis pagal būklę: kritinė 15–30 min, rimta 4 val., nekritinė 12 val.', sk: 2 },
      { t: 'Pamainos ir poilsis; CLS perima apmokytas slaugos užduotis' },
      { t: 'Eskalavimo kriterijai aiškūs visiems' },
      { t: 'Atsarginė vieta ir evakuacijos iš punkto planas', s: ['Punktas gali būti atakuojamas'] }
    ]
  },
  'st-gebejimai': {
    title: '10 PCC gebėjimų – ar turime?', short: '10 gebėjimų',
    intro: 'PFC darbo grupės 10 esminių gebėjimų. Pažymėkite, ką galite užtikrinti bent minimaliu lygiu.',
    items: [
      { t: 'Stebėjimas ir tendencijos: AKS, stetoskopas, SpO₂, diurezė, dokumentavimas', k: true, sk: 2, s: ['Geriau – kapnometrija; geriausia – monitorius, įrašantis rodiklius'] },
      { t: 'Gaivinimas be kristaloidų: šviežio kraujo perpylimo rinkinys', g: 'CMC', k: true, sk: 7, s: ['Geriau – palaikomieji skysčiai, liofilizuota plazma, šildytuvas; geriausia – kraujo produktai ir ištirti donorai'] },
      { t: 'Ventiliacija ir oksigenacija: PEEP vožtuvas', g: 'CMC', sk: 12, s: ['Geriau – koncentratorius; geriausia – ventiliatorius su deguonimi'] },
      { t: 'Kvėpavimo takai: krikotiroidotomija su ketaminu', g: 'CMC', sk: 14, s: ['Geriau – ilgalaikė sedacija; geriausia – intubacija ir jos priežiūra'] },
      { t: 'Skausmas ir sedacija: titruojamas IV nuskausminimas', g: 'CMC', sk: 16, s: ['Geriau – ketamino sedacija su midazolamu; geriausia – ilgalaikės sedacijos patirtis'] },
      { t: 'Apžiūra: kruopšti apžiūra, ieškant paslėptų sužalojimų', g: 'CMC', sk: 4, s: ['Geriau – ultragarsas ir greitieji tyrimai'] },
      { t: 'Slauga: švarus, šiltas, sausas, paminkštintas; kateterio ir žaizdų priežiūra', k: true, sk: 19, s: ['Geriau – galvūgalis, žaizdų plovimas, drėgni–sausi tvarsčiai, skrandžio dekompresija'] },
      { t: 'Chirurginės intervencijos: krūtinės drenas, krikotiroidotomija', g: 'CPP', s: ['Geriau – fasciotomija, žaizdų tvarkymas, amputacija'] },
      { t: 'Telekonsultacija: patikimas ryšys, pristatymas, rodiklių tendencijos', k: true, sk: 36, s: ['Geriau – tyrimai ir ultragarso vaizdai; geriausia – vaizdo ryšys'] },
      { t: 'Pasiruošimas skrydžiui: skrydžio fiziologiniai stresoriai', sk: 37, s: ['Geriau – kritinių pacientų transportavimo mokymas'] }
    ]
  },

  // ───────── VAL ─────────
  'v-kasval': {
    title: 'Kas valandą: mini vizitas', short: 'Kas valandą',
    intro: '„Koks buvo prieš valandą? Koks dabar? Kas pasikeitė?“',
    items: [
      { t: 'Bendras vaizdas: gerėja, stabilus ar blogėja?', k: true, sk: 2 },
      { t: 'Rodikliai pagal grafiką – į lapą su laiku; palyginti su ankstesniu', k: true, sk: 3 },
      { t: 'Turniketai, tvarsčiai: naujo kraujavimo nėra', k: true, sk: 27 },
      { t: 'Kvėpavimo takai ir vamzdeliai vietoje; SpO₂, EtCO₂', sk: 11 },
      { t: 'Diurezė per valandą – užrašyta', g: 'CMC', sk: 10 },
      { t: 'Galvos trauma: GKS ir vyzdžiai', sk: 32 },
      { t: 'Skausmas (0–10) ir RASS sedatuotam', sk: 17 },
      { t: 'Šiluma: apvalkalas sausas, temperatūra', sk: 31 },
      { t: 'Kitos vaistų dozės laikas – ar nevėluoja', g: 'CMC' },
      { t: 'Sąmoningas: 10 gilių įkvėpimų, kosulys; gėrimas', sk: 22 }
    ]
  },
  'v-skysciai': {
    title: 'Skysčiai ir diurezė', short: 'Skysčiai',
    items: [
      { t: 'Įvesta ir išskirta: kritinei kas 1–2 val., nekritinei – per dieną; suma kas 24 val.', k: true, sk: 3 },
      { t: 'Diurezė ~0,5 ml/kg/val. (≥ 30 ml/val.); be kateterio – > 180 ml per 6 val.', k: true, sk: 10, s: ['Nudegimai – 30–50 ml/val.', 'Suspaudimo sindromas – 100–200 ml/val.'] },
      { t: 'Gali gerti – geria: ~100–125 ml/val., rehidratacijos tirpalas, ne tik vanduo', k: true, sk: 9 },
      { t: 'Negali gerti – IV / IO 100–150 ml/val. pagal diurezę', g: 'CMC', sk: 9, r: '#/vaistas/kristaloidai' },
      { t: 'Tirpalas: Plasma-Lyte A → Ringerio laktatas → 0,9 % NaCl; 5 % gliukozės venkite', g: 'CMC' },
      { t: 'Kateteris: maišas žemiau pūslės, be sulenkimų; ištuštinant kiekis užrašomas', sk: 10 },
      { t: 'Diurezė mažėja – perfuzija, skysčiai, kateterio praeinamumas, kiti netekimai', k: true },
      { t: 'Rudas, raudonas ar juodas šlapimas – mioglobinas', sk: 35 }
    ]
  },
  'v-skausmas': {
    title: 'Skausmas ir sedacija', short: 'Skausmas',
    intro: 'Pirmiausia nuskausminti, tada sedatuoti. Titruoti po mažiau, kartoti dažniau.',
    items: [
      { t: 'Prieš vaistą: AVPU / GKS ir skausmas į lapą', k: true, sk: 16 },
      { t: 'Gali nuryti – paracetamolis ir meloksikamas pagal grafiką', r: '#/vaistas/paracetamolis' },
      { t: 'Ketaminas IV / IO – titruoti; į nosį PCC metu vengti', g: 'CMC', k: true, sk: 16, r: '#/vaistas/ketaminas' },
      { t: 'Nuolatinis skausmas ar ventiliacija – ketamino infuzija, RASS', g: 'CPP', sk: 17 },
      { t: 'Tikslai: KD > 12, EtCO₂ < 50, SpO₂ > 94 %, sAKS > 90 mm Hg', k: true, sk: 18 },
      { t: 'Per gili sedacija – stabdyti, kvėpavimo takai, ventiliacija; opioidas – naloksonas', g: 'CMC', sk: 18, r: '#/vaistas/naloksonas' },
      { t: 'Pykinimas – ondansetronas 4 mg', g: 'CMC', r: '#/vaistas/ondansetronas' },
      { t: 'Prieš žaizdų priežiūrą – nuskausminti iš anksto', sk: 25 }
    ]
  },
  'v-galunes': {
    title: 'Turniketai, įtvarai, kompartmentai', short: 'Galūnės',
    items: [
      { t: 'Turniketas: konversija < 2 val., jei nėra šoko, žaizda stebima, ne amputacija', g: 'CMC', k: true, sk: 27, tm: 'turn' },
      { t: '2–6 val. – svarstyti: kalcis, insulinas su gliukoze, EKG paruošti; telekonsultacija', g: 'CMC', k: true, sk: 35 },
      { t: '> 6 val. – nenuimti', k: true },
      { t: 'Po spaudžiamuoju tvarsčiu – distalinis pulsas ir odos spalva', sk: 27 },
      { t: 'Įtvarai: pulsas kas 6 val. (be sąmonės – kas 2 val.)', k: true, sk: 28 },
      { t: 'Ar skauda įtvaras, ne lūžis? Spaudimas, tirpimas, oda po juostele', sk: 28 },
      { t: 'Kompartmento sindromas: didėjantis skausmas, skausmas judinant pasyviai', k: true, sk: 28, s: ['Atlaisvinti įtvarą → neišnyksta – nuimti, medikas, telekonsultacija'] }
    ]
  },
  'v-hipotermija': {
    title: 'Hipotermija ir perkaitimas', short: 'Šiluma',
    items: [
      { t: 'Izoliacija nuo žemės; šlapi drabužiai pakeisti; uždengta su galva', k: true, sk: 31 },
      { t: 'Aktyvus šildymas – krūtinės priekis ir pažastys, ne tiesiai ant odos', k: true, sk: 31 },
      { t: 'Šildanti antklodė (Ready-Heat) – keisti po > 10 val.' },
      { t: 'Temperatūra: pagal grafiką → kaktos indikatorius → vidinė' },
      { t: 'Skysčiai ir kraujas – per šildytuvą', g: 'CMC' },
      { t: 'Atidengus apžiūrai – iš karto uždengti' },
      { t: 'Karštis: pavėsis, šalmas ir liemenė nuimti, vėdinti; karščio smūgis – skubus vėsinimas', s: ['Paracetamolio ir NVNU perkaitimui neskirti'] }
    ]
  },
  'v-tele': {
    title: 'Telekonsultacija', short: 'Telekonsultacija',
    intro: 'Skambinkite anksti ir dažnai. Telekonsultacija nepakeičia evakuacijos.',
    items: [
      { t: 'Skubu: šoko indeksas > 1, kvėpavimo nepakankamumas, sepsis, sutrikusi sąmonė, sunki galvos trauma', k: true, sk: 36 },
      { t: 'Skambina komandos narys – medikas lieka prie sužeistojo', k: true },
      { t: 'Nusiųsta: stebėjimo lapas, santrauka, nuotraukos (0,5–1 MB, be blykstės, su masteliu)', sk: 36 },
      { t: 'Pradžia: realus ar treniruotė, kokio specialisto reikia, atgalinio ryšio numeris' },
      { t: 'Pristatymas pagal scenarijų: santrauka, sužalojimai, gydymas, anamnezė, prašymas, tendencijos, apžiūra, skysčiai, ištekliai', k: true, sk: 36 },
      { t: 'Rekomendacijos užrašytos ir pakartotos', k: true },
      { t: 'Atviru kanalu – tik lytis ir amžius; be veido, tatuiruočių, geožymų' },
      { t: 'Atsarginė ryšio priemonė paruošta' }
    ]
  },

  // ───────── PAROS ─────────
  'p-slauga': {
    title: 'Slaugos grafikas', short: 'Slauga',
    intro: 'JTS slaugos grafikas (ID 70, B priedas): nekritinė / kritinė būklė.',
    items: [
      { h: 'Kas 1–2 val.' },
      { t: 'Vartyti ir patikrinti paminkštinimą: kas 2 val. / kas 1–2 val.; ant kieto – kas 1 val.', k: true, sk: 19 },
      { t: 'Kosulys ir gilus kvėpavimas – kas valandą (sąmoningam)', sk: 22 },
      { t: 'Blauzdų masažas ir kulkšnių judesiai – kas 2 val.', sk: 22 },
      { t: 'Be sąmonės – inkontinencija kas 2 val.', sk: 21 },
      { h: 'Kas 4–8 val.' },
      { t: 'Burna, nosis, lūpos: kas 12 val. / kas 4 val.', k: true, sk: 20 },
      { t: 'Vamzdeliai ir linijos – kas 4 val.', g: 'CMC', sk: 8 },
      { t: 'Nenaudojamas IV praplauti – kas 4–8 val.', g: 'CMC', sk: 8 },
      { t: 'Maistas ir gėrimas – kas 4–6 val.', sk: 23 },
      { t: 'Įtvarai: kas 6 val. / kas 2 val.', sk: 28 },
      { t: 'Sąnarių judesiai – kas 8 val.', sk: 22 },
      { h: 'Kas 12–24 val.' },
      { t: 'Žaizdos ir tvarsčiai: kas 24 val. / kas 12 val.', g: 'CMC', k: true, sk: 25 },
      { t: 'Prausti ir nusausinti – kas 24 val.', sk: 21 },
      { t: 'Kateterio priežiūra – kas 24 val.', sk: 10 },
      { t: 'IO – pašalinti po 24 val. (iki 48 val.)', g: 'CMC', sk: 8 }
    ]
  },
  'p-zaizdos': {
    title: 'Žaizdų priežiūra', short: 'Žaizdos',
    items: [
      { t: 'Nuskausminti iš anksto (IV – 15–30 min, per burną – ≥ 60 min)', k: true, sk: 25 },
      { t: 'Rankų higiena, švarus paviršius, toliau nuo purvo', sk: 30 },
      { t: 'Plovimas: sterilus NaCl ar vanduo → geriamasis vanduo → virintas ≥ 3 min', g: 'CMC', k: true, sk: 25, s: ['Maža – 1–3 l; vidutinė – 4–8 l; didelė ar labai nešvari – ≥ 9 l'] },
      { t: 'Neužsiūti lauko žaizdų; abejojant – atvira', k: true, sk: 25 },
      { t: 'Gilioms – NPWT arba drėgnas–sausas tvarstis 1–2 kartus per dieną', g: 'CPP', sk: 26 },
      { t: 'Spalva, išskyros, kvapas, skausmas – į lapą; nuotrauka telekonsultacijai', sk: 25 },
      { t: 'Negyvybingų audinių šalinimas – tik apmokytam, su telekonsultacija', g: 'CPP' }
    ]
  },
  'p-infekcija': {
    title: 'Infekcija ir antibiotikai', short: 'Infekcija',
    items: [
      { t: 'Antibiotikas skirtas ir kita dozė laiku', k: true, sk: 29, s: ['Gali nuryti – cefadroksilis 1 g kartą per parą', 'Negali – ceftriaksonas 2 g kartą per parą (CMC)'], r: '#/vaistas/cefadroksilis' },
      { t: 'Vietiniai požymiai: didėjantis skausmas, paraudimas, pūliai, kvapas', k: true, sk: 29 },
      { t: 'Sisteminiai: karščiavimas, tachikardija, hipotenzija, sumišimas – telekonsultacija', k: true, sk: 36 },
      { t: 'Įtarus infekciją – žaizdą atverti, išplauti; antibiotiką parenka gydytojas', g: 'CPP', r: '#/vaistas/ertapenemas' },
      { t: 'Stabligė: skiepijimas nežinomas ar senas – Tdap ir TIG', g: 'CPP', r: '#/vaistas/stablige' },
      { t: 'Pirštinės – kiekvienam sužeistajam naujos; švirkštai – vienam pacientui', sk: 30 },
      { t: 'Atliekos ir aštrūs daiktai – pagal SOP', sk: 30 }
    ]
  },
  'p-komfortas': {
    title: 'Komfortas ir gyvenimo pabaiga', short: 'Komfortas',
    items: [
      { t: 'Paaiškinti, kas vyksta; prieš kiekvieną veiksmą – įspėti', k: true, sk: 24 },
      { t: 'Nepalikti vieno; mažinti triukšmą; leisti miegoti', sk: 24 },
      { t: 'Skausmas, šaltis, troškulys – klausti kas kartą', sk: 24 },
      { t: 'Neišgyvenami sužalojimai – sprendimą nutraukti gaivinimą derinti su medicinos vadovybe', g: 'CMC', sk: 39 },
      { t: 'Skausmas ir kančia malšinami iki galo, mirties nepagreitinant', g: 'CMC', k: true, sk: 39 },
      { t: 'Iš mirusio kraujo perpylimui neimti', sk: 39 },
      { t: 'Pasirūpinti komanda: aptarimas, poilsis', sk: 39 }
    ]
  },

  // ───────── YPAT ─────────
  'y-galva': {
    title: 'Galvos smegenų trauma', short: 'Galva',
    items: [
      { t: 'GKS ir vyzdžiai – ne rečiau kaip kas valandą', k: true, sk: 32 },
      { t: 'Galvūgalis 30–60° (jei nėra šoko), kaklas tiesiai', k: true },
      { t: 'SpO₂ > 94 %; sAKS ≥ 110 mm Hg; EtCO₂ 35–40 mm Hg', k: true, sk: 32 },
      { t: 'Temperatūra 35,6–37,5 °C; gliukozė ~10 mmol/l (< 5,6 – gydyti)', g: 'CMC', r: '#/vaistas/gliukoze' },
      { t: 'Išvaržos požymiai – hipertoninis NaCl, skubi telekonsultacija', g: 'CMC', k: true, r: '#/vaistas/nacl-hipert', s: ['Laikinai EtCO₂ 30 mm Hg ≤ 20 min'] },
      { t: 'Traukuliai – midazolamas 5 mg kas 5 min; toliau levetiracetamas', g: 'CPP', r: '#/vaistas/midazolamas' },
      { t: 'Atvira galvos žaizda – antibiotikas', g: 'CPP', r: '#/vaistas/ceftriaksonas' },
      { t: 'Sedaciją minimizuoti; GKS užrašyti prieš kiekvieną dozę' },
      { t: 'Blogėja – didinti evakuacijos skubumą', k: true, sk: 36 }
    ]
  },
  'y-nudegimai': {
    title: 'Nudegimai', short: 'Nudegimai',
    items: [
      { t: 'Pirmiausia MARCH; plotas – tik II ir III laipsnio (devynių taisyklė, delnas ≈ 1 %)', k: true, sk: 33 },
      { t: '> 20 % ar įkvėpimo trauma – IV / IO iš karto, pradžioje 500 ml/val.', g: 'CMC', k: true, sk: 33 },
      { t: '10 taisyklė: KPP % × 10 ml/val. (+100 ml/val. kiekvienam 10 kg virš 80)', g: 'CMC', k: true, r: '#/vaistas/kristaloidai' },
      { t: 'Diurezė 30–50 ml/val.; greitis ±25 % kas 1–2 val.', g: 'CMC', k: true, sk: 10 },
      { t: 'Iki ~30 % ir gali gerti – elektrolitų tirpalas pagal grafiką', sk: 33 },
      { t: 'Sunki įkvėpimo trauma ar > 40 % – intubacija; tvirtinti juosta', g: 'CPP', sk: 14 },
      { t: 'Žaizdos: kasdien nuplauti, sidabro kremas ar Silverlon; minimum – švari sausa danga', sk: 33 },
      { t: 'Hipotermija – tikėtina; < 36 °C aktyviai šildyti', k: true, sk: 31 },
      { t: 'Žiedinis gilus nudegimas su kvėpavimo ar kraujotakos sutrikimu – eskarotomija', g: 'CPP', sk: 34 },
      { t: 'Antibiotikų profilaktiškai nereikia (nebent kitos atviros žaizdos)' }
    ]
  },
  'y-crush': {
    title: 'Suspaudimo sindromas ir hiperkalemija', short: 'Suspaudimas',
    intro: 'Telekonsultaciją pradėkite kuo anksčiau – valdymas sudėtingas.',
    items: [
      { t: 'Rizika: prispausta ≥ 1 val., turniketas > 2 val., kompartmento sindromas', k: true, sk: 35 },
      { t: 'Prieš išlaisvinimą – 2 l kristaloidų, toliau 1 l/val.', g: 'CMC', k: true, r: '#/vaistas/kristaloidai' },
      { t: 'Nėra IV – ORS per burną pagal grafiką; tik vanduo netinka', sk: 35 },
      { t: '> 2 val. ir gydymo pradėti negalima – du turniketai greta prieš išlaisvinimą', g: 'CMC', tm: 'turn' },
      { t: 'Diurezė 100–200 ml/val.; šlapimo spalva', k: true, sk: 10 },
      { t: 'EKG: bradikardija, smailūs T, platus QRS, ekstrasistolės', g: 'CMC', k: true, s: ['Kas 15 min pirmas 1–2 val., toliau kas 30 min, stabiliai – kas valandą', 'Normali EKG hiperkalemijos neatmeta'] },
      { t: 'Hiperkalemija: kalcis', g: 'CMC', r: '#/vaistas/kalcis' },
      { t: 'Toliau: insulinas su gliukoze, salbutamolis', g: 'CPP', r: '#/vaistas/insulinas' },
      { t: 'Galūnė šalta, nejautri, įtempta, be pulso – turniketai lieka, telekonsultacija' }
    ]
  },
  'y-dpv': {
    title: 'Ventiliuojamas ar intubuotas sužeistasis', short: 'Ventiliacija',
    items: [
      { t: 'Vamzdelio padėtis po kiekvieno perkėlimo: EtCO₂ kreivė, garsai, gylio žymė', g: 'CPP', k: true, sk: 14 },
      { t: 'Manžetė ~20 mm Hg manometru; tvirtinimas juosta', g: 'CPP', sk: 14 },
      { t: 'Ventiliatorius: 6–8 ml/kg numatomo svorio, PEEP ≥ 5, SpO₂ ≥ 92 %, slėgis ≤ 30–35 cm H₂O', g: 'CPP', k: true, sk: 13 },
      { t: 'Signalai patikrinti; deguonies ir baterijų atsargos – valandomis', g: 'CPP', sk: 13 },
      { t: 'Sedacija: ketamino infuzija, RASS', g: 'CPP', sk: 17, r: '#/vaistas/ketaminas' },
      { t: 'Atsiurbimas tik esant indikacijai; steriliai; ≤ 15 s', g: 'CMC', sk: 11 },
      { t: 'Burnos priežiūra kas 4 val.; galvūgalis ~30°', k: true, sk: 20 },
      { t: 'Zondas: dekompresija; 48–72 val. – maitinimas', g: 'CMC', sk: 15 },
      { t: 'Akys apsaugotos nuo išdžiūvimo; lubrikanto želės – ne', sk: 20 },
      { t: 'Staiga blogėja – DOPE', g: 'CPP', k: true, sk: 13 }
    ]
  },

  // ───────── EVAK ─────────
  'e-pasiruosimas': {
    title: 'Pasiruošimas evakuacijai', short: 'Pasiruošimas',
    intro: 'Evakuacija prasideda dar prieš ją. Ruoškitės ilgesnei nei planuota kelionei.',
    items: [
      { t: '9-Line pateiktas, skubumas peržiūrėtas pagal būklę', k: true, r: '#/9line' },
      { t: 'Pilnas pakartotinis vertinimas prieš išvykimą', k: true, sk: 1 },
      { t: 'Turniketai, tvarsčiai, įtvarai patikrinti; turniketų laikai pažymėti', k: true, tm: 'turn' },
      { t: 'Linijos, vamzdeliai, kateteris, zondas pritvirtinti; kateterio maišas ištuštintas', k: true, sk: 37 },
      { t: 'Vaistai, skysčiai, kraujas, deguonis, baterijos – su atsarga', g: 'CMC', sk: 37 },
      { t: 'Hipotermijos apsauga: izoliacija, šildymas, vėjas, drėgmė', sk: 31 },
      { t: 'Neštuvai: diržai ne ant lūžių, paminkštinimas, akių ir ausų apsauga', sk: 37 },
      { t: 'Skrydis: dujos plečiasi (pneumotoraksas, manžetės), daugiau hipoksijos', g: 'CMC', sk: 37 },
      { t: 'Ginklas, šaudmenys, jautrūs daiktai – pagal SOP' }
    ]
  },
  'e-perdavimas': {
    title: 'Perdavimas', short: 'Perdavimas',
    items: [
      { t: 'Tiesiogiai priimančiam medikui; MIST (ATMIST)', k: true, sk: 38, r: '#/mist' },
      { t: 'Pirmiausia kas tęstina: turniketų laikai, paskutinės dozės, infuzijos ir greičiai, alergijos', k: true, sk: 38 },
      { t: 'Tendencijos: rodikliai, GKS, diurezė, skysčių balansas per 24 val.' },
      { t: 'Problemų sąrašas, telekonsultacijų rekomendacijos, neatlikti darbai', sk: 38 },
      { t: 'DD 1380 ir stebėjimo lapas – kartu su sužeistuoju', k: true, sk: 3 },
      { t: 'Atsakyti į klausimus prieš išvykstant' },
      { t: 'Perpylus šviežią kraują – donoras ir gavėjas registruoti pagal SOP', g: 'CMC' },
      { t: 'Po užduoties – AAR ir priemonių papildymas' }
    ]
  }
};

// ───────── MOKYMOSI PUSLAPIAI ─────────
E.puslapiai = {
  pagrindai: {
    title: 'PCC pagrindai', sub: 'Kas yra ilgalaikė priežiūra lauke ir kada ji prasideda',
    html:
      '<p><b>Prolonged Casualty Care (PCC)</b> – sužeistojo priežiūra lauke ilgesnį laiką, kai evakuacija ar užduoties reikalavimai viršija turimus pajėgumus. PCC remiasi TCCC ir jį tęsia, kai aukštesnio lygio pagalba laikinai nepasiekiama.</p>' +
      '<p>Pagrindinis klausimas: <b>ar vis dar galime suteikti tai, ko sužeistajam reikia, su tuo, ką turime?</b> Jei ne – pereinama į PCC mąstymą ir planuojama priežiūra 6, 12, 24 val. ar ilgiau.</p>' +
      '<h3>Eiga</h3><ol><li><b>Įvertinti</b> – kas kelia grėsmę dabar?</li><li><b>Stabilizuoti</b> – ką galime padaryti turimomis priemonėmis?</li><li><b>Stebėti</b> – kokie pokyčiai rodo blogėjimą?</li><li><b>Tęsti</b> – kaip užtikrinti priežiūrą, resursus ir ryšį?</li><li><b>Perduoti</b> – ką būtina perduoti kitam lygiui?</li></ol>' +
      '<h3>MARC2H3-PAWS-L</h3><p>JTS PCC gairių struktūra: <b>M</b> – masyvus kraujavimas ir MASCAL, <b>A</b> – kvėpavimo takai, <b>R</b> – kvėpavimas, <b>C</b> – kraujotaka ir ryšys (<i>Communication</i>), <b>H</b> – hipotermija, perkaitimas, galvos trauma, <b>P</b> – skausmas, <b>A</b> – antibiotikai, <b>W</b> – žaizdos (slauga, nudegimai), <b>S</b> – įtvėrimas, <b>L</b> – logistika.</p>' +
      '<h3>Minimum – geriau – geriausia</h3><p>Kiekviena rekomendacija pateikiama trimis lygiais pagal turimus išteklius. Minimalus standartas galioja visada – ir turint geriausias priemones.</p>' +
      '<h3>Lygiai programėlėje</h3><div class="tw"><table><tr><th>Lygis</th><th>Kas</th><th>Pavyzdžiai</th></tr>' +
      '<tr><td><b>CLS</b></td><td>Kovos gelbėtojas, komandos narys</td><td>Stebėjimas ir lapas, vartymas, burnos priežiūra, higiena, šiluma, įtvarų patikra, telekonsultacijos skambutis</td></tr>' +
      '<tr><td><b>CMC</b></td><td>Kovos medikas</td><td>+ IV / IO, kraujas, TXA, kalcis, ketaminas, kateteris, žaizdų plovimas, antibiotikai</td></tr>' +
      '<tr><td><b>CPP</b></td><td>Paramedikas, gydytojas, AITS slaugytojas</td><td>+ ventiliatorius, ketamino infuzija ir sedacija, intubacija, NPWT, eskarotomija, gydytojo skiriami vaistai</td></tr></table></div>' +
      '<h3>TCCC ir PCC</h3><div class="tw"><table><tr><th></th><th>TCCC</th><th>PCC</th></tr>' +
      '<tr><td>Tikslas</td><td>Gyvybę gelbstinti pagalba</td><td>Saugiai tęsti priežiūrą, kai evakuacija vėluoja</td></tr>' +
      '<tr><td>Laikas</td><td>Ankstyvas etapas</td><td>Valandos – paros</td></tr>' +
      '<tr><td>Akcentas</td><td>Greitas grėsmių pašalinimas</td><td>Stebėjimas, pakartotinis vertinimas, slauga</td></tr>' +
      '<tr><td>Organizavimas</td><td>Pagal taktinę fazę</td><td>Sistema: žmonės, atsargos, dokumentai, ryšys, evakuacija</td></tr></table></div>',
    saltinis: 'JTS CPG „Prolonged Casualty Care Guidelines“ (ID 91, 2021); kuopos paskaita „Slauga taktinėje aplinkoje (PCC)“ (2026-09-21)'
  },
  gebejimai: {
    title: '10 PCC gebėjimų', sub: 'Ką komanda turi gebėti, kai evakuacija vėluoja',
    html:
      '<p>PFC darbo grupės (2015) 10 esminių gebėjimų – pagrindas planuojant mokymą ir aprūpinimą.</p>' +
      '<div class="tw"><table><tr><th>Gebėjimas</th><th>Minimum</th><th>Geriausia</th></tr>' +
      '<tr><td>1. Stebėjimas ir tendencijos</td><td>AKS, stetoskopas, SpO₂, kateteris, dokumentavimas</td><td>Monitorius, įrašantis rodiklius</td></tr>' +
      '<tr><td>2. Gaivinimas be kristaloidų</td><td>Šviežio kraujo perpylimo rinkinys</td><td>Kraujo produktai ir ištirti donorai</td></tr>' +
      '<tr><td>3. Ventiliacija ir oksigenacija</td><td>PEEP vožtuvas</td><td>Ventiliatorius su deguonimi</td></tr>' +
      '<tr><td>4. Kvėpavimo takai</td><td>Krikotiroidotomija su ketaminu</td><td>Intubacija, ilgalaikė sedacija ir priežiūra</td></tr>' +
      '<tr><td>5. Skausmas ir sedacija</td><td>Titruojamas IV nuskausminimas</td><td>Ilgalaikės sedacijos patirtis</td></tr>' +
      '<tr><td>6. Apžiūra ir diagnostika</td><td>Kruopšti apžiūra rankomis</td><td>Ultragarsas, greitieji tyrimai</td></tr>' +
      '<tr><td>7. Slauga ir higiena</td><td>Švarus, šiltas, sausas, paminkštintas</td><td>Žaizdų plovimas, skrandžio dekompresija</td></tr>' +
      '<tr><td>8. Chirurginės intervencijos</td><td>Krūtinės drenas, krikotiroidotomija</td><td>Fasciotomija, žaizdų tvarkymas, amputacija</td></tr>' +
      '<tr><td>9. Telekonsultacija</td><td>Ryšys, pristatymas, tendencijos</td><td>Vaizdo ryšys</td></tr>' +
      '<tr><td>10. Pasiruošimas skrydžiui</td><td>Skrydžio stresorių supratimas</td><td>Kritinių pacientų transportavimo patirtis</td></tr></table></div>' +
      '<p><a class="btn" href="#/s/st-gebejimai">Kontrolinis sąrašas</a></p>',
    saltinis: 'PFC WG „10 Essential Core Capabilities for Prolonged Field Care“ (prolongedfieldcare.org, 2015)'
  },
  stebejimas: {
    title: 'Stebėjimas ir dokumentavimas', sub: 'Dažnis, tendencijos, stebėjimo lapas',
    html:
      '<p>Vienkartinio įvertinimo PCC metu nepakanka. Svarbiausia – dinamika: ar sužeistasis gerėja, stabilus ar blogėja.</p>' +
      '<h3>Kaip dažnai</h3><div class="tw"><table><tr><th>Būklė</th><th>Gyvybiniai rodikliai</th><th>Įvesta / išskirta</th></tr>' +
      '<tr><td>Kritinė</td><td>Kas 15–30 min, kol stabilizuojasi</td><td>Kas 1–2 val., suma kas 24 val.</td></tr>' +
      '<tr><td>Rimta, bet stabili</td><td>Kas 4 val.</td><td>Per dieną, suma kas 24 val.</td></tr>' +
      '<tr><td>Nekritinė</td><td>Kas 12 val.</td><td>Per dieną, suma kas 24 val.</td></tr></table></div>' +
      '<p>Po gaivinimo – kas 15 min; stabiliai ilgiau nei 2 val. – kas 30–60 min. Galvos trauma – GKS ir vyzdžiai ne rečiau kaip kas valandą.</p>' +
      '<h3>Ką matuoti</h3><p>Nuo ankstyviausių šoko požymių: sąmonė, KD, pulsas, periferinis pulsas, AKS; taip pat SpO₂, temperatūra, diurezė, skausmas, sedatuotam – RASS.</p>' +
      '<h3>Dokumentavimo lygiai</h3><ul><li><b>Minimum</b> – kortelė DD 1380.</li><li><b>Geriau</b> – PCC stebėjimo lapas (kai kortelės laukeliai užpildyti, o evakuacija negreit).</li><li><b>Geriausia</b> – stebėjimo lapas ir slaugos grafikas; po perdavimo – AAR.</li></ul>' +
      '<p>„Jeigu informacija liko tik mano galvoje – ji gali būti prarasta kartu su manimi.“</p>',
    saltinis: 'JTS CPG ID 70 (2025); JTS CPG ID 91 (2021); JTS CPG „Damage Control Resuscitation in PFC“ (ID 73); kuopos paskaita „Slauga taktinėje aplinkoje (PCC)“'
  },
  gaivinimas: {
    title: 'Gaivinimas PCC metu (DCR)', sub: 'Kraujas, kalcis, TXA, tikslai ir kada sustoti',
    html:
      '<p>PCC gaivinimo principai tie patys kaip TCCC: pirmiausia sustabdyti kraujavimą ir perpilti kraują. Kraujas veiksmingiausias per ~30 min nuo sužeidimo.</p>' +
      '<h3>Produktų eilė</h3><ol><li>Pilnas kraujas (mažo titro O; šviežias – iš ištirtų donorų)</li><li>Plazma : eritrocitai : trombocitai 1 : 1 : 1</li><li>Plazma : eritrocitai 1 : 1</li><li>Plazma ar eritrocitai</li><li>Kristaloidai – paskutinė išeitis: blogina koaguliopatiją</li></ol>' +
      '<p>Liofilizuota plazma tinka pradėti gaivinimą, kol ruošiamas kraujas. Grupei tapatus kraujas – tik patvirtinus grupę Eldon kortele; karinio ženklelio duomenys klaidingi ~4 % atvejų.</p>' +
      '<h3>Vaistai</h3><ul><li>' + vs('txa', 'TXA') + ' – 2 g IV / IO, ne vėliau kaip per 3 val. (TCCC 2026).</li><li>' + vs('kalcis', 'Kalcis') + ' – po pirmo vieneto, toliau po kas 4 vienetų.</li></ul>' +
      '<h3>Tikslai</h3><div class="tw"><table><tr><th>Minimum</th><th>Geriau</th><th>Geriausia</th></tr><tr><td>Čiuopiamas radialinis pulsas ar gerėjanti sąmonė</td><td>sAKS > 90 mm Hg</td><td>sAKS 100–110 mm Hg</td></tr></table></div>' +
      '<p>Galvos trauma – sAKS ≥ 110 mm Hg. Diurezė > 0,5 ml/kg/val. Pasiekus tikslą – gaivinimą nutraukite ir pereikite prie palaikomųjų skysčių ar gėrimo (diurezė 0,3–0,5 ml/kg/val.).</p>' +
      '<h3>Atsakas į gaivinimą</h3><ul><li><b>Reaguoja</b> – rodikliai gerėja ir išlieka.</li><li><b>Reaguoja trumpam</b> – pagerėja ir vėl blogėja: ieškokite praleisto kraujavimo, hipotermijos, acidozės, kartokite gaivinimą.</li><li><b>Nereaguoja</b> – prieš tai patikrinkite kraujavimo kontrolę, abipusę krūtinės dekompresiją, tamponadą. Ar tęsti – spręskite su telekonsultacija.</li></ul>' +
      '<p>Hipotenzija išlieka po kraujo ir kraujavimo kontrolės – ' + vs('noradrenalinas', 'vazopresorius') + ' tik pagal protokolą ar telekonsultaciją.</p>',
    saltinis: 'JTS CPG „Damage Control Resuscitation in PFC“ (ID 73, 2018); JTS CPG ID 91 (2021); JTS CPG „Whole Blood Transfusion“ (ID 21); TCCC gairės 2026-05-01'
  },
  kvepavimas: {
    title: 'Kvėpavimo takai ir ventiliacija', sub: 'PEEP, deguonis, ventiliatorius, vamzdelio priežiūra',
    html:
      '<h3>Tikslai</h3><ul><li>SpO₂ ≥ 92 % (galvos trauma – > 94 %).</li><li>Ventiliuojamam EtCO₂ 35–45 mm Hg (galvos trauma – 35–40).</li></ul>' +
      '<h3>Minimum – geriau – geriausia</h3><ul><li><b>Minimum</b> – ambu maišas su PEEP vožtuvu, NPA.</li><li><b>Geriau</b> – deguonies koncentratorius.</li><li><b>Geriausia</b> – portatyvus ventiliatorius su deguonimi.</li></ul>' +
      '<h3>Ventiliatoriaus pradžia</h3><p>Tūrio ar slėgio kontrolė; kvėpavimo tūris 6–8 ml/kg <b>numatomo</b> kūno svorio (nuo 8 – per 2 val. iki 6); PEEP ≥ 5 cm H₂O; FiO₂ – mažiausias, kuriuo SpO₂ ≥ 92 %; įkvėpimo slėgis ≤ 30–35 cm H₂O. Mechaninė ventiliacija ir sedacija PCC metu gali tęstis iki 96 val.</p>' +
      '<h3>Staiga blogėja – DOPE</h3><p>Atjunkite nuo ventiliatoriaus, ventiliuokite maišu ir tikrinkite: <b>D</b> – vamzdelis pasislinko, <b>O</b> – užsikimšo, <b>P</b> – pneumotoraksas, <b>E</b> – įrangos gedimas.</p>' +
      '<h3>Priežiūra</h3><ul><li>Manžetė – 10 ml švirkštu, atleisti stūmoklį; ~20 mm Hg manometru.</li><li>Tvirtinti medvilnine juosta; HME filtras, uždaras atsiurbimas.</li><li>Atsiurbti tik esant indikacijai: prieš tai FiO₂ 100 % 30–60 s, ≤ 15 s, tarp kartų ≥ 30 s.</li><li>Burnos priežiūra kas 4 val.; galvūgalis ~30°; zondas skrandžiui.</li></ul>',
    saltinis: 'JTS CPG ID 91 (2021); JTS CPG „Management of Acute Respiratory Failure“ (2014); JTS CPG ID 70 (2025); PFC WG 10 gebėjimų (2015)'
  },
  skausmas: {
    title: 'Nuskausminimas ir sedacija PCC metu', sub: 'Titruoti po mažiau, kartoti dažniau',
    html:
      '<h3>Prioritetai</h3><ol><li>Išlaikyti gyvybę: šoke ar esant kvėpavimo distresui vengti AKS ir kvėpavimą slopinančių vaistų.</li><li>Malšinti skausmą.</li><li>Tik tada – sedacija.</li><li>Saugumas.</li></ol>' +
      '<h3>Principai</h3><ul><li>Pirmenybė IV / IO; į nosį PCC metu – vengti.</li><li>Ketaminas, opioidai ir benzodiazepinai stiprina vienas kitą – kiekvieno reikia mažiau.</li><li>Viename maiše – tik vienas vaistas.</li><li>Nuolatinis pagrindas – ' + vs('paracetamolis', 'paracetamolis') + ' ir ' + vs('meloksikamas', 'meloksikamas') + ', jei gali nuryti.</li></ul>' +
      '<h3>Ketaminas</h3><ul><li>Nuskausminimas (CMC) – TCCC 2026: 25 mg IV / IO kas 30 min arba 100 mg IM.</li><li>Sedacija (CPP) – JTS PFC: 1 mg/kg IV / IO, infuzija 1 mg/kg/val. (intubuotam 1–2), 750 mg / 250 ml = 3 mg/ml.</li></ul><p>' + vs('ketaminas', 'Ketaminas – dozės') + '</p>' +
      '<h3>Tikslai ir stebėjimas</h3><p>KD > 12, EtCO₂ < 50 mm Hg, SpO₂ > 94 %, sAKS > 90 mm Hg. Rodikliai, GKS ir skausmas – kas 5 min iki tikslo, toliau kas 15 min.</p>' +
      '<div class="tw"><table><tr><th>RASS</th><th>Būklė</th></tr><tr><td>+1…+4</td><td>Neramus … kovingas</td></tr><tr><td>0</td><td>Budrus ir ramus</td></tr><tr><td>−1</td><td>Mieguistas</td></tr><tr><td>−2</td><td>Lengva sedacija</td></tr><tr><td>−3</td><td>Vidutinė sedacija</td></tr><tr><td>−4</td><td>Gili sedacija</td></tr><tr><td>−5</td><td>Nereaguoja</td></tr></table></div>' +
      '<p>Per gili sedacija – stabdyti, kvėpavimo takai, ventiliacija; opioidui – ' + vs('naloksonas', 'naloksonas') + ' po 40 mcg.</p>',
    saltinis: 'JTS CPG „Analgesia and Sedation Management during PFC“ (tccc.org.ua, 2023); JTS CPG ID 91 (2021); TCCC gairės 2026-05-01'
  },
  slauga: {
    title: 'Slauga: priežiūros grafikas', sub: 'Komplikacijų prevencija, kai evakuacija vėluoja',
    html:
      '<p>Slaugos prioritetai: gyvybės išsaugojimas → stabilumo išlaikymas → komplikacijų prevencija (hipotermija, pragulos, trombozė, pneumonija, infekcija, dehidratacija) → komfortas → pasiruošimas kitam etapui.</p>' +
      '<div class="tw"><table><tr><th>Užduotis</th><th>Nekritinė</th><th>Kritinė</th></tr>' +
      '<tr><td>Vartymas, paminkštinimas</td><td>Kas 2 val.</td><td>Kas 1–2 val.</td></tr>' +
      '<tr><td>Burna, nosis, lūpos</td><td>Kas 12 val.</td><td>Kas 4 val.</td></tr>' +
      '<tr><td>Kosulys, gilus kvėpavimas</td><td>Kas valandą</td><td>Pagal būklę</td></tr>' +
      '<tr><td>Blauzdų masažas</td><td>Kas 2 val.</td><td>Kas 2 val.</td></tr>' +
      '<tr><td>Sąnarių judesiai</td><td>Kas 8 val.</td><td>Kas 8 val.</td></tr>' +
      '<tr><td>Maistas</td><td>Kas 4–6 val.</td><td>Pagal būklę</td></tr>' +
      '<tr><td>Vamzdeliai, linijos</td><td>Kas 4 val.</td><td>Kas 4 val.</td></tr>' +
      '<tr><td>Nenaudojamų IV plovimas</td><td>Kas 4–8 val.</td><td>Kas 4–8 val.</td></tr>' +
      '<tr><td>Įtvarai</td><td>Kas 6 val.</td><td>Kas 2 val.</td></tr>' +
      '<tr><td>Žaizdos, tvarsčiai</td><td>Kas 24 val.</td><td>Kas 12 val.</td></tr>' +
      '<tr><td>Prausimas, kateterio priežiūra</td><td>Kas 24 val.</td><td>Kas 24 val.</td></tr></table></div>' +
      '<p>Ant kieto paviršiaus vartyti kas valandą; galvūgalis ~30°. Gerti skatinti nuolat (~100–125 ml/val.), ne pagal fiksuotą intervalą.</p>' +
      '<p>Slaugos užduotis atlieka ir apmokyti CLS – tai atlaisvina mediką kitiems sužeistiesiems ar poilsiui.</p>',
    saltinis: 'JTS CPG „Nursing Interventions, Wound Care, and Splint Management in PCC“ (ID 70, 2025), B priedas; kuopos paskaita „Slauga taktinėje aplinkoje (PCC)“'
  },
  zaizdos: {
    title: 'Žaizdos ir infekcija', sub: 'Plovimas, tvarsčiai, uždarymas, antibiotikai',
    html:
      '<p>Visos lauko žaizdos laikomos nešvariomis (užterštos dirvožemiu, išmatomis ar senesnės nei 6 val.).</p>' +
      '<h3>Plovimas</h3><div class="tw"><table><tr><th>Žaizda</th><th>Kiekis</th></tr><tr><td>Maža ar švari</td><td>1–3 l</td></tr><tr><td>Vidutinė ar nešvari</td><td>4–8 l</td></tr><tr><td>Didelė ar labai nešvari</td><td>≥ 9 l</td></tr></table></div>' +
      '<p>Skystis: sterilus NaCl ar vanduo → švarus geriamasis vanduo → virintas ≥ 3 min. Slėgis – 6–15 psi (35 ml švirkštas su 19 G kateteriu ~8 psi); didesnis žaloja audinius. Jodo, alkoholio ar antibiotikų priedai nemažina infekcijos.</p>' +
      '<h3>Uždarymas</h3><p>Abejojant – žaizda paliekama atvira. Su audinių netekimu ir dūrinės – atviros. Uždelstas užsiuvimas – po 3–7 d., jei nėra infekcijos. Infekavusi uždaryta žaizda atveriama.</p>' +
      '<h3>Tvarsčiai gilioms žaizdoms</h3><ul><li><b>Geriausia</b> – NPWT (komercinis 75–125 mm Hg), keisti kas 2–3 d., infekuotą – kasdien.</li><li><b>Geriau</b> – drėgnas–sausas tvarstis 1–2 kartus per dieną.</li><li><b>Minimum</b> – storas sausas tvarstis, švarią palikti 4–7 d.</li></ul>' +
      '<h3>Infekcija</h3><p>Vietiniai požymiai – didėjantis skausmas, paraudimas, pūliai; sisteminiai – karščiavimas, tachikardija, hipotenzija, sumišimas. Negyjanti per 2 sav. – infekcija, prasta perfuzija ar mityba.</p>' +
      '<h3>Antibiotikai</h3><ul><li>TCCC 2026: ' + vs('cefadroksilis', 'cefadroksilis') + ' 1 g per burną arba ' + vs('ceftriaksonas', 'ceftriaksonas') + ' 2 g IV / IO / IM kartą per parą.</li><li>Gydytojo sprendimu (JTS PFC): ' + vs('ertapenemas', 'ertapenemas') + ', ' + vs('cefazolinas', 'cefazolinas') + ', ' + vs('moksifloksacinas', 'moksifloksacinas') + '; infekcijos gydymas 7–10 d.</li><li>' + vs('stablige', 'Stabligės profilaktika') + ' – pagal skiepijimą.</li></ul>',
    saltinis: 'JTS CPG „Acute Traumatic Wound Management in PFC“ (tccc.org.ua, 2023); JTS CPG ID 70 (2025); TCCC gairės 2026-05-01'
  },
  galva: {
    title: 'Galvos smegenų trauma PCC metu', sub: 'Tikslai, neurologinė patikra, išvarža, traukuliai',
    html:
      '<p>Baigtį blogina antrinis pažeidimas: vienas hipoksijos ar hipotenzijos epizodas.</p>' +
      '<h3>Tikslai</h3><div class="tw"><table><tr><td>SpO₂</td><td>> 94 %</td></tr><tr><td>sAKS</td><td>≥ 110 mm Hg</td></tr><tr><td>EtCO₂ (ventiliuojamam)</td><td>35–40 mm Hg</td></tr><tr><td>Temperatūra</td><td>35,6–37,5 °C</td></tr><tr><td>Gliukozė</td><td>~10 mmol/l; < 5,6 – gydyti</td></tr><tr><td>Natris (jei matuojama)</td><td>145–160 mmol/l</td></tr></table></div>' +
      '<h3>Intrakranijinis spaudimas</h3><ul><li><b>Minimum</b> – galvūgalis 30–60°, kaklas tiesiai; skausmas, nerimas, karščiavimas kontroliuojami.</li><li><b>Geriau</b> – sedacija ir analgezija (RASS −1…−2).</li><li><b>Geriausia</b> – osmoterapija: ' + vs('nacl-hipert', 'hipertoninis NaCl') + ' (pirmenybinis) arba ' + vs('manitolis', 'manitolis') + ' (tik be kraujavimo ir esant sAKS > 110).</li></ul>' +
      '<p>Gresiant išvaržai (vienpusis išsiplėtęs vyzdys, Cushing triada) – laikinai hiperventiliuoti iki EtCO₂ 30 mm Hg ne ilgiau kaip 20 min ir skubiai konsultuotis.</p>' +
      '<h3>Traukuliai</h3><p>' + vs('midazolamas', 'Midazolamas') + ' 5 mg kas 5 min; toliau – ' + vs('levetiracetamas', 'levetiracetamas') + ' (gydytojas).</p>' +
      '<h3>Kita</h3><ul><li>GKS ir vyzdžiai – ne rečiau kaip kas valandą.</li><li>Atvira galvos žaizda – antibiotikas 5 d.; uždarai – nereikia.</li><li>Sedaciją minimizuoti, kad matytumėte neurologiją.</li></ul>',
    saltinis: 'JTS CPG „TBI Management in PFC“ (tccc.org.ua, 2023); JTS CPG ID 91 (2021); TCCC gairės 2026-05-01'
  },
  nudegimai: {
    title: 'Nudegimai PCC metu', sub: '10 taisyklė, diurezė, žaizdos, eskarotomija',
    html:
      '<p>> 20 % KPP ar įkvėpimo trauma – gyvybei pavojinga. Plotas – tik II ir III laipsnio (devynių taisyklė, delnas su pirštais ≈ 1 %). Klaida > 10 % žalinga abiem kryptimis.</p>' +
      '<h3>Skysčiai – 10 taisyklė</h3><p>Pradžia: <b>KPP % × 10 = ml/val.</b> (40–80 kg); +100 ml/val. kiekvienam 10 kg virš 80. Kol vertinate – 500 ml/val. Boliusas – tik esant hipotenzijai; vėlavus – „nesivyti“.</p>' +
      '<p>Diurezė 30–50 ml/val. (elektros trauma, rabdomiolizė – 70–100); greitį keisti ±25 % kas 1–2 val. Be kateterio – > 180 ml per 6 val. Negalint matuoti – pulsas < 140, gera perfuzija, aiški sąmonė.</p>' +
      '<p>Iki ~30 % galima gaivinti per burną elektrolitų tirpalu pagal grafiką; per zondą 300–500 ml/val.; per tiesiąją žarną iki 500 ml/val. Tik vanduo – hiponatremija.</p>' +
      '<h3>Kvėpavimo takai</h3><p>Sunki dūmų įkvėpimo trauma ar > 40 % – intubacija; supraglotinės priemonės netinka. Vamzdelį tvirtinti juosta, atsiurbti ~kas valandą su 3–5 ml NaCl.</p>' +
      '<h3>Žaizdos</h3><ul><li><b>Geriausia</b> – kasdien nuplauti chlorheksidinu, sidabro kremas ar mafenidas; arba Silverlon (3–5 d.).</li><li><b>Geriau</b> – antibakterinis muilas ir bet koks tvarstis.</li><li><b>Minimum</b> – švari paklodė ar sausa marlė; pūslių nepradurti.</li></ul>' +
      '<h3>Eskarotomija</h3><p>Krūtinė – žiedinis gilus nudegimas, trukdantis kvėpuoti; galūnė – žiedinis gilus nudegimas su silpnėjančiu ar išnykusiu pulsu, kai evakuacija vėluoja. Atlieka apmokytas, geriausia su telekonsultacija.</p>' +
      '<p>Hipotermija tikėtina visiems; antibiotikų profilaktiškai nereikia.</p>',
    saltinis: 'JTS CPG „Burn Wound Management in PFC“ (tccc.org.ua, 2023)'
  },
  crush: {
    title: 'Suspaudimo sindromas ir hiperkalemija', sub: 'Skysčiai prieš išlaisvinimą, diurezė, EKG',
    html:
      '<p>Prispaudus didelę raumenų masę ≥ 1 val., atsilaisvinus išsiskiria kalis ir mioglobinas: mirtinos aritmijos ir inkstų pažeidimas. Tas pats – atleidus turniketą po > 2 val., esant kompartmento sindromui.</p>' +
      '<h3>Skysčiai</h3><ul><li><b>Geriausia</b> – IV / IO kristaloidai prieš išlaisvinimą: 2 l boliusas, toliau 1 l/val.</li><li><b>Geriau</b> – elektrolitų tirpalas per burną pagal grafiką.</li><li><b>Minimum</b> – per tiesiąją žarną iki 500 ml/val. ir per burną.</li></ul>' +
      '<p>Diurezė 100–200 ml/val. Žemiau tikslo > 2 val. esant 1 l/val. – inkstai pažeisti. Raudonas, rudas ar juodas šlapimas – didėjanti rizika.</p>' +
      '<h3>Hiperkalemija</h3><p>EKG: bradikardija (pagrindinis), smailūs T, ilgėjantis PR, platus QRS, ekstrasistolės. Normali EKG jos neatmeta. Stebėti kas 15 min pirmas 1–2 val., toliau kas 30 min, stabiliai – kas valandą.</p>' +
      '<div class="tw"><table><tr><th>Vaistas</th><th>Pradžia</th><th>Trukmė</th></tr><tr><td>' + vs('kalcis', 'Kalcis') + '</td><td>Iš karto</td><td>30–60 min</td></tr><tr><td>' + vs('insulinas', 'Insulinas + gliukozė') + '</td><td>~20 min</td><td>4–6 val.</td></tr><tr><td>' + vs('salbutamolis', 'Salbutamolis') + '</td><td>~30 min</td><td>~2 val.</td></tr></table></div>' +
      '<h3>Galūnė</h3><p>Šalta, nejautri, įtempta, be pulso – greičiausiai negyvybinga: du turniketai lieka, telekonsultacija. Vėsinti garinimu, ne ledu ar sniegu.</p>',
    saltinis: 'JTS CPG „Crush Syndrome in PFC“ (tccc.org.ua, 2023); JTS CPG „Damage Control Resuscitation in PFC“ (ID 73)'
  },
  hipotermija: {
    title: 'Hipotermija ir perkaitimas', sub: 'Šilumos palaikymas paromis',
    html:
      '<p>Hipotermija blogina krešėjimą: kraujavimas, hipotermija ir acidozė – mirtina triada. Lengviau išvengti nei gydyti.</p>' +
      '<h3>Prevencija</h3><ul><li>Izoliuoti nuo žemės, šlapius drabužius keisti sausais, uždengti su galva, saugoti nuo vėjo ir drėgmės.</li><li>Aktyvus šildymas – ant krūtinės priekio ir pažastų; niekada tiesiai ant odos ar spaudžiamų vietų.</li><li>Šildanti antklodė (Ready-Heat) – keisti po > 10 val.</li><li>Skysčiai ir kraujas – per šildytuvą (iki 150 ml/min, 38 °C).</li></ul>' +
      '<h3>Temperatūra</h3><p>Minimum – matuoti pagal grafiką; geriau – nuolatinis kaktos indikatorius; geriausia – nuolatinė vidinė.</p>' +
      '<h3>Perkaitimas</h3><p>Pavėsis, nuimti šalmą ir liemenę, vėdinti; gerti, jei sąmoningas ir nevemia. Karščio smūgis – skubus vėsinimas: šlapinti (minimum), šlapinti ir vėdinti (geriau), panardinti į vandenį (geriausia). Paracetamolio, aspirino ir ibuprofeno perkaitimui neskirti – tik karščiavimui. Traukuliai – benzodiazepinas.</p>',
    saltinis: 'JTS CPG ID 91 (2021) – hipotermija ir perkaitimas'
  },
  tele: {
    title: 'Telekonsultacija', sub: 'Kada, kaip pasiruošti, ką pasakyti',
    html:
      '<p>Pagalbos prašymas – geroji praktika, kai evakuacija neaiški ar neįmanoma. Telekonsultacija nepakeičia evakuacijos.</p>' +
      '<h3>Kada</h3><ul><li><b>Įprasta</b> (atsakymas per 24 val.) – normalūs rodikliai, rizikos pablogėti nėra.</li><li><b>Skubi</b> – reikia specialisto patarimo realiu laiku (pvz., sudėtinga žaizda).</li><li><b>Neatidėliotina</b> – šokas (šoko indeksas > 1), kvėpavimo nepakankamumas, sepsis, sutrikusi sąmonė, sunki galvos trauma, organų nepakankamumas.</li></ul>' +
      '<h3>Ryšys</h3><ul><li><b>Minimum</b> – balsu, skaitant iš kortelės.</li><li><b>Geriau</b> – balsu ir kartu siunčiamos nuotraukos bei stebėjimo lapas.</li><li><b>Geriausia</b> – vaizdo ryšys pagal scenarijų, nuotraukos ir tendencijos.</li></ul>' +
      '<h3>Pristatymo tvarka</h3><ol><li>Įžanga: kas skambina, realus ar treniruotė, atgalinio ryšio numeris</li><li>Santrauka: amžius, lytis, mechanizmas, laikas nuo traumos, evakuacijos laikas</li><li>Sužalojimai ir problemos</li><li>Gydymas</li><li>Anamnezė ir alergijos</li><li>Prašymas – ko reikia</li><li>Rodiklių tendencijos</li><li>Apžiūra pagal sistemas</li><li>Skysčiai ir diurezė per 24 val.</li><li>Ištekliai</li></ol>' +
      '<p>Rekomendacijas užsirašykite ir pakartokite. Nuotraukos – 0,5–1 MB, be blykstės, su mastelio objektu, toli ir arti. Atviru kanalu – tik lytis ir amžius; be veido, tatuiruočių ir geožymų. Turėkite PACE planą ir atsarginę ryšio priemonę.</p>',
    saltinis: 'JTS CPG „Telemedicine Guidance in the Deployed Setting“ (ID 94, 2023); PFC Documentation: Telemedical Consultation Guide (2023)'
  },
  evakuacija: {
    title: 'Pasiruošimas evakuacijai ir perdavimas', sub: 'Pakavimas, skrydis, struktūruotas perdavimas',
    html:
      '<p>Evakuacijos prašymas teikiamas perimant sužeistąjį, o skubumas peržiūrimas keičiantis būklei. Ruoškitės ilgesnei nei planuota kelionei.</p>' +
      '<h3>Prieš išvykimą</h3><ul><li>Pilnas pakartotinis vertinimas; turniketai, tvarsčiai, linijos, vamzdeliai, kateteris – pritvirtinti.</li><li>Vaistai, skysčiai, kraujas, deguonis, baterijos – su atsarga vėlavimui.</li><li>Hipotermijos apsauga; neštuvų diržai ne ant lūžių; akių ir ausų apsauga.</li><li>Dokumentai kartu: DD 1380, stebėjimo lapas.</li></ul>' +
      '<h3>Skrydis</h3><p>Krentant slėgiui plečiasi dujos (pneumotoraksas, manžetės, balionėliai) ir didėja hipoksija; vibracija, triukšmas ir šaltis apsunkina stebėjimą.</p>' +
      '<h3>Perdavimas</h3><p>Tiesiogiai priimančiam medikui: MIST (ar ATMIST) – mechanizmas ir laikas, sužalojimai, požymiai ir jų tendencijos, gydymas. Pirmiausia – kas tęstina: turniketų laikai, paskutinės dozės, infuzijos ir greičiai, alergijos. Skysčių balansas, problemų sąrašas, telekonsultacijų rekomendacijos. Atsakykite į klausimus prieš išvykdami.</p>' +
      '<p>Dokumentavimo lygiai: DD 1380 (minimum) → stebėjimo lapas (geriau) → AAR po perdavimo (geriausia).</p>',
    saltinis: 'JTS CPG ID 91 (2021); PFC WG 10 gebėjimų (2015); kuopos paskaita „Slauga taktinėje aplinkoje (PCC)“; TCCC gairės 2026-05-01'
  },
  vaistaiPCC: {
    title: 'PCC vaistai trumpai', sub: 'Kas, kam ir pagal kokį šaltinį',
    html:
      '<p>Kiekvienam vaistui – viena schema: TCCC 2026 → JTS CPG → gamintojo PCS. Dozės – skiltyje <a href="#/vaistai">Vaistai</a>.</p>' +
      '<div class="tw"><table><tr><th>Kada</th><th>Vaistas</th><th>Lygis</th></tr>' +
      '<tr><td>Skausmas</td><td>Paracetamolis, meloksikamas; ketaminas IV / IO</td><td>CLS / CMC</td></tr>' +
      '<tr><td>Ilga sedacija, ventiliacija</td><td>Ketamino infuzija ± midazolamas</td><td>CPP</td></tr>' +
      '<tr><td>Per gili sedacija (opioidas)</td><td>Naloksonas 40 mcg</td><td>CMC</td></tr>' +
      '<tr><td>Kraujavimas, transfuzija</td><td>TXA (≤ 3 val.), kalcis</td><td>CMC</td></tr>' +
      '<tr><td>Palaikomieji skysčiai, nudegimai, suspaudimas</td><td>Kristaloidai</td><td>CMC</td></tr>' +
      '<tr><td>Atviros žaizdos</td><td>Cefadroksilis, ceftriaksonas</td><td>CLS / CMC</td></tr>' +
      '<tr><td>Infekcija, atvira galvos trauma, suspaudimas</td><td>Ertapenemas, cefazolinas, moksifloksacinas</td><td>Gydytojas</td></tr>' +
      '<tr><td>Išvaržos požymiai</td><td>Hipertoninis NaCl; manitolis</td><td>CMC / gydytojas</td></tr>' +
      '<tr><td>Traukuliai</td><td>Midazolamas → levetiracetamas</td><td>CPP / gydytojas</td></tr>' +
      '<tr><td>Hiperkalemija</td><td>Kalcis → insulinas su gliukoze → salbutamolis</td><td>CMC / gydytojas</td></tr>' +
      '<tr><td>Hipotenzija po kraujo</td><td>Noradrenalinas</td><td>Gydytojas</td></tr></table></div>' +
      '<p class="muted">Vaistai skiriami tik pagal kompetenciją, vieneto protokolus ir gydytojo (telekonsultacijos) nurodymus.</p>',
    saltinis: 'TCCC gairės 2026-05-01; JTS PCC ir PFC gairės (žr. kiekvieno vaisto šaltinius)'
  }
};

// ───────── MOKYMOSI TEMOS ─────────
E.temos = [
  { id: 'pagrindai', zenklas: 'PCC', cls: 'fSTAB', pav: 'PCC pagrindai', sub: 'Kada prasideda, principai, 10 gebėjimų, komanda', puslapiai: ['pagrindai', 'gebejimai'], igudziai: [1, 5, 4], sarasai: ['st-perimti', 'st-planas', 'st-gebejimai'] },
  { id: 'stebejimas', zenklas: 'MON', pav: 'Stebėjimas ir dokumentavimas', sub: 'Dažnis, tendencijos, stebėjimo lapas', puslapiai: ['stebejimas'], igudziai: [2, 3], sarasai: ['v-kasval'] },
  { id: 'gaivinimas', zenklas: 'C', pav: 'Gaivinimas ir skysčiai', sub: 'Kraujas, tikslai, prieigos, diurezė', puslapiai: ['gaivinimas'], igudziai: [6, 7, 8, 9, 10], sarasai: ['st-gaivinimas', 'v-skysciai'], vaistai: ['txa', 'kalcis', 'kristaloidai', 'noradrenalinas'] },
  { id: 'kvepavimas', zenklas: 'A·R', pav: 'Kvėpavimo takai ir ventiliacija', sub: 'PEEP, ventiliatorius, vamzdelis, zondas', puslapiai: ['kvepavimas'], igudziai: [11, 12, 13, 14, 15], sarasai: ['st-kvepavimas', 'y-dpv'] },
  { id: 'skausmas', zenklas: 'P', pav: 'Nuskausminimas ir sedacija', sub: 'Ketaminas, infuzija, RASS, pavojai', puslapiai: ['skausmas', 'vaistaiPCC'], igudziai: [16, 17, 18], sarasai: ['v-skausmas'], vaistai: ['ketaminas', 'paracetamolis', 'meloksikamas', 'fentanilis', 'midazolamas', 'naloksonas', 'ondansetronas'] },
  { id: 'slauga', zenklas: 'N', cls: 'fPAR', pav: 'Slauga', sub: 'Vartymas, burna, higiena, mityba, komfortas', puslapiai: ['slauga'], igudziai: [19, 20, 21, 22, 23, 24], sarasai: ['p-slauga', 'p-komfortas'] },
  { id: 'zaizdos', zenklas: 'W', pav: 'Žaizdos, galūnės, infekcija', sub: 'Plovimas, NPWT, turniketai, įtvarai, antibiotikai', puslapiai: ['zaizdos'], igudziai: [25, 26, 27, 28, 29, 30], sarasai: ['p-zaizdos', 'p-infekcija', 'v-galunes'], vaistai: ['cefadroksilis', 'ceftriaksonas', 'ertapenemas', 'cefazolinas', 'moksifloksacinas', 'stablige', 'lidokainas'] },
  { id: 'ypatingos', zenklas: 'H+', cls: 'fYPAT', pav: 'Galva, nudegimai, suspaudimas, šiluma', sub: 'Tikslai, 10 taisyklė, hiperkalemija, hipotermija', puslapiai: ['galva', 'nudegimai', 'crush', 'hipotermija'], igudziai: [31, 32, 33, 34, 35], sarasai: ['y-galva', 'y-nudegimai', 'y-crush', 'v-hipotermija'], vaistai: ['nacl-hipert', 'manitolis', 'levetiracetamas', 'insulinas', 'salbutamolis', 'gliukoze'] },
  { id: 'evakuacija', zenklas: 'EVAK', cls: 'fEVAC', pav: 'Telekonsultacija ir evakuacija', sub: 'Scenarijus, pakavimas, skrydis, perdavimas', puslapiai: ['tele', 'evakuacija'], igudziai: [36, 37, 38, 39], sarasai: ['v-tele', 'e-pasiruosimas', 'e-perdavimas'] }
];
})();

// PCC įsivertinimo lapas – sudarytas pagal JTS CPG ID 91, 70, 94 ir PFC gaires (ne oficialus egzaminavimo lapas; patvirtina kuopos gydytojas).
window.ETC.vertinimai = [{
  id: 'pcc', title: 'PCC įsivertinimo lapas', sub: 'Prolonged Casualty Care – sužeistojo perėmimas ir 24 val. priežiūra',
  rule: 'Teigiamas įvertinimas – atlikti visi „K“ raide pažymėti punktai.',
  src: 'Sudaryta pagal JTS CPG „Prolonged Casualty Care Guidelines“ (ID 91), „Nursing Interventions… in PCC“ (ID 70), „Telemedicine… Deployed Setting“ (ID 94) ir JTS PFC gaires; kuopos gydytojo nepatvirtinta',
  items: [
    { n: '1', t: 'Perėmė sužeistąjį ir pakartotinai įvertino MARCH-PAWS', k: true, s: [
      { n: 'a', t: 'Perėmė MIST ir kortelę DD 1380; užrašė traumos ir turniketų laikus', k: true },
      { n: 'b', t: 'Patikrino kiekvieną turniketą ir tvarstį', k: true },
      { n: 'c', t: 'Įvertino kvėpavimo takus, kvėpavimą, kraujotaką, hipotermiją ir galvos traumą' },
      { n: 'd', t: 'Atliko išsamią apžiūrą ir sudarė problemų sąrašą' }] },
    { n: '2', t: 'Organizavo PCC', s: [
      { n: 'a', t: 'Paskirstė vaidmenis: stebėjimas, resursai, ryšys, dokumentavimas' },
      { n: 'b', t: 'Iš karto pateikė evakuacijos prašymą', k: true },
      { n: 'c', t: 'Inventorizavo atsargas ir apskaičiavo, kiek valandų užteks' }] },
    { n: '3', m: 'C', t: 'Valdė gaivinimą', s: [
      { n: 'a', t: 'Pasirinko tinkamą kraujo produktą ir patikrino suderinamumą', k: true },
      { n: 'b', t: 'Skyrė kalcį po pirmo vieneto; TXA – tik ≤ 3 val.' },
      { n: 'c', t: 'Įvardijo gaivinimo tikslus ir laiku jį nutraukė' }] },
    { n: '4', t: 'Stebėjo ir dokumentavo', k: true, s: [
      { n: 'a', t: 'Parinko stebėjimo dažnį pagal būklę', k: true },
      { n: 'b', t: 'Pildė stebėjimo lapą su laikais: rodikliai, GKS, skausmas, vaistai, intervencijos', k: true },
      { n: 'c', t: 'Skaičiavo įvestą ir išskirtą; diurezę ml/kg/val.' },
      { n: 'd', t: 'Atpažino blogėjimo tendenciją ir reagavo' }] },
    { n: '5', m: 'A', t: 'Užtikrino kvėpavimo takus ir ventiliaciją', s: [
      { n: 'a', t: 'Naudojo PEEP vožtuvą; palaikė SpO₂ ≥ 92 %' },
      { n: 'b', t: 'Atsiurbė pagal indikaciją, laikydamasis laiko ribų' }] },
    { n: '6', m: 'P', t: 'Malšino skausmą ir valdė sedaciją', s: [
      { n: 'a', t: 'Prieš vaistą užrašė AVPU / GKS ir skausmą', k: true },
      { n: 'b', t: 'Titravo ketaminą ir stebėjo kvėpavimą' },
      { n: 'c', t: 'Įvardijo per gilios sedacijos požymius ir veiksmus' }] },
    { n: '7', t: 'Atliko slaugos užduotis pagal grafiką', k: true, s: [
      { n: 'a', t: 'Vartė ir patikrino paminkštinimą', k: true },
      { n: 'b', t: 'Atliko burnos priežiūrą; pasirūpino akimis' },
      { n: 'c', t: 'Skatino kvėpavimo pratimus ir gėrimą' },
      { n: 'd', t: 'Prižiūrėjo kateterį ir IV prieigas' }] },
    { n: '8', m: 'W', t: 'Prižiūrėjo žaizdas ir galūnes', s: [
      { n: 'a', t: 'Nuskausmino iš anksto ir išplovė žaizdą tinkamu kiekiu', k: true },
      { n: 'b', t: 'Neužsiuvo lauko žaizdos' },
      { n: 'c', t: 'Patikrino įtvarus ir kompartmento sindromo požymius' },
      { n: 'd', t: 'Įvertino turniketo konversijos galimybę ir laiką' }] },
    { n: '9', m: 'A', t: 'Skyrė antibiotiką laiku ir ieškojo infekcijos požymių' },
    { n: '10', m: 'H', t: 'Apsaugojo nuo hipotermijos visą priežiūros laiką', k: true },
    { n: '11', t: 'Atliko telekonsultaciją', k: true, s: [
      { n: 'a', t: 'Iš anksto nusiuntė lapą ir nuotraukas' },
      { n: 'b', t: 'Pristatė pagal scenarijų', k: true },
      { n: 'c', t: 'Užsirašė ir pakartojo rekomendacijas', k: true }] },
    { n: '12', t: 'Paruošė evakuacijai ir perdavė', k: true, s: [
      { n: 'a', t: 'Pritvirtino linijas, vamzdelius, kateterį; paruošė atsargas kelionei' },
      { n: 'b', t: 'Perdavė struktūruotai: kas tęstina, tendencijos, problemų sąrašas', k: true },
      { n: 'c', t: 'Perdavė DD 1380 ir stebėjimo lapą' }] }
  ]
}];
