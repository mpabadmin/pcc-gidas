# PCC gidas – turinio failai (v2.1, 2026-10-28)

Turinys PCC gidui (1040 medkuopa), parašytas **March gido duomenų formatais**. Įdėkite failus į perstatytos programėlės šaknį vietoje March failų.

| Failas | Formatas | Kiekis |
|---|---|---|
| `sarasai.js` | kaip March: `E.versija`, `E.programa`, `E.fazes`, `E.sarasai`, `E.puslapiai`, `E.temos`, `window.ETC.vertinimai` | 5 fazės, 21 kontrolinis sąrašas (183 punktai), 15 mokymosi puslapių, 9 temos, 1 įsivertinimo lapas (12 punktų) |
| `igudziai.js` | kaip March: vienas JSON objektas eilutėje | 39 įgūdžiai (CLS 16 · CMC 18 · CPP 5) |
| `scenarijai.js` | kaip March: JSON, 1 tarpo įtrauka | 30 scenarijų `p1`–`p30`, 90 klausimų (po 3 atsakymus, vienas teisingas) |
| `vaistai.js` | kaip ETC: `vaistuGrupes` + `vaistai`, JSON, 2 tarpų įtrauka, baigiasi `];\n` | 24 vaistai, 6 grupės |
| `_build/` | šaltiniai (`ig.js`, `sc.js`, `vs.js`), generatorius `build.js`, tikrintuvas `validate.js` | – |

Atnaujinti: redaguokite `_build/*.js` → `node _build/build.js` → `node _build/validate.js` (`sarasai.js` redaguojamas tiesiogiai).

## Patikra

- `node _build/validate.js`: visi failai įkeliami (`global.window = {}`), JSON dalys praeina `JSON.parse`, tikrinamos visos nuorodos (`sk`, `r`, `ref`, `#N` įgūdžiuose, temų įgūdžiai, sąrašai ir vaistai, `susije`, `alt`), lygiai, fazės, „tik vienas teisingas“, atsakymų ilgių balansas (teisingo pozicija a/b/c – 30/35/25). Klaidų ir įspėjimų nėra.
- Dūmų testas: failai įdėti į March gido kopiją ir atvaizduoti Chromium naršyklėje 23 maršrutai (`#/f/STAB` … `#/scenarijai/p20`, `#/vertinimas`) – 0 konsolės klaidų.

## Pagrindiniai sprendimai

**Fazės** (`E.fazes`, `id` – ASCII, naudojamas `#/f/ID`): `STAB` Perėmimas ir stabilizavimas (0–2 val.) · `VAL` Valandinė priežiūra (2–24 val.) · `PAROS` Paromis (> 24 val.) · `YPAT` Ypatingos būklės (galva, nudegimai, suspaudimas, ventiliacija) · `EVAK` Evakuacija ir perdavimas. `YPAT` – ne laiko fazė, o atskiras planas būklėms, kurios tęsiasi per visas fazes.

**Lygiai** – palikta March semantika, kad veiktų esamas `isAdv` / `tikCLS` filtras be kodo pakeitimų:
- `CLS` (be `g`) – visa PCC komanda, įskaitant CLS: stebėjimas, lapas, slauga, šiluma, įtvarų patikra, telekonsultacijos skambutis;
- `CMC` – kovos medikas: IV / IO, kraujas, TXA, kalcis, ketaminas, kateteris, žaizdų plovimas, antibiotikai;
- `CPP` – paramedikas, gydytojas ar AITS slaugytojas: ventiliatorius, ketamino infuzija ir sedacija, intubacija, NPWT, eskarotomija, gydytojo skiriami vaistai.

**Vaistai**: viena schema vaistui (TCCC 2026 → JTS CPG → PCS). Kelios indikacijos – atskiros `dozes` eilutės (ketaminas: nuskausminimas TCCC 2026, sedacija JTS PFC). Neįmanoma patikrinti → dozės nėra („pagal gydytoją“). `lygis` (March filtras) + `kam` (ETC vaizdas); `tccc26` / `ne26` (March žyma). `lt` perimta iš ETC gido (VVKT, 2026-10-14). Skaičiuoklė `c` – tik March `calc` palaikomi laukai (be `hour` / `minute`).

## Ką turi pritaikyti programėlės kodas

1. `views.js` `GRUPES` įgūdžiams: `[['K','Principai, stebėjimas, dokumentai'],['G','Gaivinimas ir skysčiai'],['A','Kvėpavimo takai ir ventiliacija'],['S','Skausmas ir sedacija'],['N','Slauga'],['W','Žaizdos, galūnės, infekcija'],['Y','Ypatingos būklės'],['E','Telekonsultacija ir evakuacija']]`.
2. Įgūdžių filtro skirtukai (`views.js skills`, dabar `CUF/TFC/TACEVAC`) → `STAB/VAL/PAROS/YPAT/EVAK`.
3. CSS klasės fazėms ir temoms: `fSTAB`, `fVAL`, `fPAR`, `fYPAT`, `fEVAC` (siūloma: fSTAB = fCUF spalva, fVAL = fTFC, fEVAC = fTAC, fPAR ir fYPAT – naujos).
4. Vaisto puslapis: rodyti `kam`, `pradzia`, `trukme`, `alt`, `lt` (kaip ETC), jei norima; March vaizdas juos ignoruoja be klaidų. Tekstuose „Pagal TCCC 2026 gaires“, „March gidas“, „CLS vertinimo lapas“ – kode, ne duomenyse.
5. Sąrašų `r` naudoja `#/vaistas/…`, `#/9line`, `#/mist`; jei PCC programėlė 9-Line / MIST neturi – pakeisti ar pašalinti (`st-planas`, `e-pasiruosimas`, `e-perdavimas`).
6. `tm: 'turn' | 'trauma'` – kaip March (turniketo ir traumos laikas).

## Šaltiniai

- JTS CPG „Prolonged Casualty Care Guidelines“ (ID 91, 2021-12-21) – https://jts.health.mil/assets/docs/cpgs/prolonged_casualty_care_guidelines_21_dec_2021_id91.pdf
- JTS CPG „Nursing Interventions, Wound Care, and Splint Management in PCC“ (ID 70, 2025-07-08) – https://jts.health.mil/assets/docs/cpgs/Nursing_Interventions_PCC_08_July_2025_ID70_v1.1.pdf
- JTS CPG „Telemedicine Guidance in the Deployed Setting“ (ID 94, 2023) – https://jts.health.mil/assets/docs/cpgs/Telemedicine_Deployed_Setting_19_Sep_2023_ID94_v1.2.pdf
- JTS CPG „Damage Control Resuscitation in PFC“ (ID 73, 2018) – https://tccc.org.ua/en/guide/damage-control-resuscitation-in-prolonged-field-care-pcc (naudotas ir kuopos diske esantis PDF)
- JTS CPG „Analgesia and Sedation Management during PFC“ (2023) – https://tccc.org.ua/en/guide/analgesia-and-sedation-management-during-prolonged-field-care-pcc
- JTS CPG „TBI Management in PFC“ (2023) – https://tccc.org.ua/en/guide/traumatic-brain-injury-management-in-prolonged-field-care-pcc
- JTS CPG „Burn Wound Management in PFC“ (2023) – https://tccc.org.ua/en/guide/burn-wound-management-under-prolonged-field-care-pcc
- JTS CPG „Crush Syndrome in PFC“ (2023) – https://tccc.org.ua/en/guide/crush-syndrome-under-prolonged-field-care-pcc
- JTS CPG „Acute Traumatic Wound Management in PFC“ (2023) – https://tccc.org.ua/en/guide/acute-traumatic-wound-management-prolonged-field-care-setting-pcc
- JTS „Ocular Injuries and Vision-Threatening Conditions in PFC“ (infografikas, 2026) – https://jts.health.mil/assets/docs/cpgs/Ocular_PFC_infographic_07_May_2026-FINAL.pdf
- JTS CPG „Management of Acute Respiratory Failure“ (2014) – https://webarchive.library.unt.edu/web/20161018234341/http:/usaisr.amedd.army.mil/cpgs/Acute_Respiratory_Failure_16Apr2014.pdf
- JTS CPP įgūdžio kortelė 26 „Automated Ventilation“ (2023) – https://tccc.org.ua/files/downloads/tccc-cpp-skill-card-26-automated-ventilation-en.pdf
- JTS CPG „Whole Blood Transfusion“ (ID 21) – kuopos diske esantis PDF
- PFC WG „10 Essential Core Capabilities for PFC“ (2015) – https://prolongedfieldcare.org/2015/02/09/10-essential-core-capabilities-for-prolonged-field-care/
- JTS PCC gairės, 1 dalis (tccc.org.ua) – https://tccc.org.ua/en/guide/prolonged-casualty-care-guidelines-part-1-pcc
- PFC Documentation: Telemedical Consultation Guide (2023) – https://prolongedfieldcare.org/wp-content/uploads/2023/07/PFC-Documentation-10-July-2023.pdf (formatas pagal PCC v1)
- TCCC gairės 2026-05-01 – https://learning-media.allogy.com/api/v1/pdf/18ccfdfc-a076-47e9-8a34-376efdd81b43/contents (dozės sutikrintos su March / ETC vaistai.js)
- Gamintojų PCS (JK eMC, EMA) – nuorodos prie kiekvieno vaisto
- Kuopos paskaitos: „Slauga taktinėje aplinkoje (PCC)“ (2026-09-21), „Bendrieji higienos ir infekcijų kontrolės principai“ (2026)

## Peržiūros pataisos (2026-10-28, v2.1)

- **Naloksonas**: viena schema – titruoti po 40 mcg IV / IO (0,4 mg + 9 ml NaCl). Šaltinis – JTS PCC CPG ID 91 (tekstas tikrintas: „dilute 0.4 mg in 9 mL… give 40 mcg IV/IO PRN“) ir JTS PFC analgezijos B–C priedai; pasirinkta, nes PCC sužeistajam reikia išlaikyti nuskausminimą. D priedo 0,4–2 mg (iki 10 mg) ir March 0,4 mg – paminėti pastabose, scenarijuje p8 nebežymimi kaip klaida.
- **Galvos traumos tikslai** visur vienodi: SpO₂ ≥ 92 % (TCCC 2026; JTS TBI PFC – > 90 %), ventiliuojamam > 95 %, sAKS > 110 mm Hg (JTS TBI PFC; TCCC 2026 – > 100). Skirtumai nurodyti puslapyje, įgūdyje #32, sąraše `y-galva`, scenarijuje p17.
- **Kalcis**: transfuzijai – 30 ml (TCCC 2026); hiperkalemijai – 10 ml 10 % gliukonato per 2–3 min (JTS Crush PFC) – vaisto puslapyje, įgūdyje #35, sąraše `y-crush`, scenarijuose p15, p24. p2 nebežymi 10 ml kaip klaidos.
- **Scenarijų lygiai**: p8 ir p15 → CPP.
- **Ketaminas**: pridėta TCCC 2026 IN 50 mg (kaip March) su JTS PFC pastaba „PCC metu vengti“.
- **Skiriasi nuo ETC / March gido** (pastabose): manitolis 1 g/kg (ETC 0,5), gliukozė 25 g (ETC 200 ml 10 %), noradrenalinas 0,1–0,4 (ETC 0,05–1 mcg/kg/min), fentanilis be IN (March – 100 mcg IN; lygis CPP kaip March), kalcis hiperkalemijai 10 ml (ETC 30 ml), naloksonas titruojamas (March 0,4 mg).
- **Stabligė**: TIG 500 VV užterštai karo žaizdai / 250 VV švariai didelei – kaip JTS žaizdų PFC; pastaba, kad įprasta dozė 250 VV.
- **Lidokainas**: „ne daugiau kaip 3 mg/kg (80 kg – ne daugiau kaip 240 mg)“, be skaičiuoklės.

## Klausimai kuopos gydytojui

1. **Galvos trauma**: sAKS > 110 mm Hg (JTS TBI PFC) vs > 100 (TCCC 2026); SpO₂ ≥ 92 % (TCCC) vs > 90 % (JTS TBI PFC), ventiliuojamam > 95 %. Patvirtinti.
2. **Kalcis hiperkalemijai**: 10 ml (JTS Crush PFC) vs 30 ml (ETC gidas: JTS hiperkalemijos CPG, CGO, UK RA). Kuopai – viena dozė?
3. **Naloksonas**: titruoti po 40 mcg (JTS PCC) vs 0,4 mg (March) vs 0,4–2 mg (JTS PFC D priedas). Kuri schema kuopai?
4. **Ketaminas**: nuskausminimui – TCCC 2026 (25 mg IV / 100 mg IM / 50 mg IN), ne JTS PFC proveržio schema (10–20 mg kas 5 min); procedūrinė 0,5–1 mg/kg (ID 70) neįtraukta. Sedacija – JTS PFC (1 mg/kg; 1–2 mg/kg/val.).
5. **Midazolamas su ketaminu**: TCCC 2026 CMC lygiu draudžia, JTS PFC CPP lygiu leidžia – atskirta lygiais.
6. **Fentanilis** (ne TCCC 2026) – tik CPP, „jei numato SOP“ (JTS PFC 50 mcg IV); morfinas ir hidromorfonas neįtraukti.
7. **Antibiotikų trukmė PCC metu** (cefadroksilis, ceftriaksonas) – TCCC nenurodo („pagal gydytoją“). Ertapenemas Lietuvoje netiekiamas – kuo keisti?
8. **Manitolis**: JTS TBI PFC 1 g/kg (+0,5 g/kg kas 3 val.) vs ETC 0,5 g/kg.
9. **Gliukozė**: 25 g IV (JTS TBI PFC) vs 200 ml 10 % (ETC, NHS / JBDS); **noradrenalinas** 0,1–0,4 (JTS PCC) vs 0,05–1 mcg/kg/min (ETC, PCS).
10. **Stabligė**: TIG 500 VV užterštai karo žaizdai (JTS žaizdų PFC) ar 250 VV (įprasta)?
11. **Hipertoninis NaCl** > 2 dozių – tik telekonsultacijos metu (JTS TBI PFC).
12. **Gydytojo vaistai** (levetiracetamas, insulinas, salbutamolis, noradrenalinas, cefazolinas, Tdap / TIG, lidokainas) – ar yra rinkinyje? Jų Lietuvos preparatai netikrinti.
13. **Ventiliatoriaus pradžia** – iš JTS ARF CPG (2014); suderinti su kuopos ventiliatoriaus SOP.
14. **Improvizuoto NPWT slėgis** JTS nenurodytas.
15. **Telekonsultacijos kanalas**: JTS ADVISOR – JAV linija; LK / NATO kanalas ir PACE planas?
16. **Gyvasis kraujo bankas**: titro riba (< 1:256), donorų tyrimų dažnis (90–120 d.) – suderinti su LK SOP.
17. **Lygių priskyrimas**: Foley, IO šalinimas, žaizdų plovimas – CMC; NPWT, eskarotomija, ketamino infuzija – CPP?
18. **PCC įsivertinimo lapas** – ne oficialus; reikia patvirtinimo arba kuopos formos.
