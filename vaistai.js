// PCC gidas – VAISTAI
// Viena schema kiekvienam vaistui. Šaltinių prioritetas: TCCC gairės 2026-05-01 → JTS CPG (PCC / PFC) → gamintojo PCS.
// Kai vaistas turi kelias indikacijas (pvz., ketaminas: nuskausminimas pagal TCCC 2026, sedacija pagal JTS PFC), kiekvienai – viena eilutė dozes sąraše.
// Laukai: grupe – paskirtis; lygis – kaip March gide (CLS | CMC | CPP; „tik CLS“ slepia CMC ir CPP); tipas: 'pagr' – TCCC 2026 ar pagrindinis PCC vaistas,
//   'papild' – papildomas, skiriamas gydytojo sprendimu; tccc26: true – yra TCCC 2026 gairėse; ne26: true – TCCC 2026 nėra (March rodo žymą „Ne TCCC 2026“);
//   kam – kas skiria (rodo ETC gido vaizdas); dozes – [{k, d, p, c}]; c – skaičiuoklė (per | min, max – mg/kg; conc – mg/ml; u – vienetai), March core.js calc;
//   ispejimai, pradzia, trukme, pakuote, pastabos, susije, saltinis, nuorodos – [pavadinimas, URL]; alt – [{id, t}].
// lt – Lietuvoje registruoti preparatai, perimta iš ETC gido (VVKT VAPRIS, tikrinta 2026-10-14): p – [{n, d, r, s: T | L | U | N}], ne – netiekiami, pa – pastaba.
// Patikrinta: 2026-10-28 (JTS PCC CPG ID 91, ID 70, PFC gairės tccc.org.ua: analgezija ir sedacija, TBI, nudegimai, suspaudimo sindromas, žaizdos; TCCC 2026).
window.ETC = window.ETC || {};

window.ETC.vaistuGrupes = [
  {
    "id": "skausmas",
    "pav": "Nuskausminimas ir sedacija"
  },
  {
    "id": "kraujas",
    "pav": "Kraujavimas, gaivinimas, skysčiai"
  },
  {
    "id": "antibiotikai",
    "pav": "Antibiotikai ir infekcija"
  },
  {
    "id": "galva",
    "pav": "Galvos smegenų trauma"
  },
  {
    "id": "hiperkalemija",
    "pav": "Suspaudimo sindromas ir hiperkalemija"
  },
  {
    "id": "kita",
    "pav": "Kita: vėmimas, gliukozė, perdozavimas"
  }
];

window.ETC.vaistai = [
  {
    "id": "ketaminas",
    "name": "Ketaminas",
    "klase": "Nuskausminimas ir sedacija",
    "grupe": "skausmas",
    "lygis": "CMC",
    "tipas": "pagr",
    "tccc26": true,
    "kam": "Nuskausminimas – kovos medikas (CMC); infuzija ir sedacija – CPP / gydytojas",
    "ind": "Vidutinis ar stiprus skausmas (TCCC 2026). PCC: ilgalaikė sedacija ventiliuojamam ar intubuotam, sunkiai valdomas skausmas, procedūros (JTS PFC).",
    "kontra": "Alergija. TCCC 2026: galvos smegenų ar akies trauma ketamino nedraudžia (PCS galvos traumą nurodo kaip kontraindikaciją – sprendžia medikas).",
    "dozes": [
      {
        "k": "Nuskausminimas IV / IO (TCCC 2026)",
        "d": "25 mg (≈ 0,2–0,3 mg/kg) lėtai per 1 min",
        "p": "Kartoti kas 30 min pagal poreikį – kol skausmas sumažėja arba atsiranda nistagmas."
      },
      {
        "k": "Nuskausminimas IM (TCCC 2026)",
        "d": "100 mg",
        "p": "Kai nėra IV / IO."
      },
      {
        "k": "Nuskausminimas į nosį (TCCC 2026)",
        "d": "50 mg",
        "p": "Tik 100 mg/ml – 0,5 ml. PCC metu į nosį – vengti, pirmenybė IV / IO (JTS PFC)."
      },
      {
        "k": "Sedacija: prisotinamoji (JTS PFC, CPP)",
        "d": "1 mg/kg IV / IO per 60 s",
        "c": {
          "per": 1,
          "conc": 50
        },
        "p": "ml – neskiesto 50 mg/ml tirpalo."
      },
      {
        "k": "Sedacija: infuzija (JTS PFC, CPP)",
        "d": "neintubuotam 1 mg/kg/val.; intubuotam 1–2 mg/kg/val.",
        "p": "750 mg į 250 ml 0,9 % NaCl = 3 mg/ml; 80 kg, 1 mg/kg/val. ≈ 27 ml/val. Titruoti po 0,25 mg/kg/val.: proveržio skausmas 2 kartus per valandą – didinti; 2 val. be proveržio – mažinti. Pilnas poveikis – per ~1 val."
      }
    ],
    "ispejimai": [
      "Prieš skiriant – AVPU / GKS ir skausmas į lapą; nuginkluoti.",
      "Stebėti kvėpavimo takus, kvėpavimą ir kraujotaką; KD < 10 – stabdyti, „uostymo“ padėtis, ventiliacija.",
      "Nuskausminant (CMC) benzodiazepinų neskirti (TCCC 2026). Sedacijos infuzijai CPP gali papildyti midazolamu (JTS PFC).",
      "Tikrinkite ampulės stiprumą (50 ar 100 mg/ml); viename maiše – tik vienas vaistas."
    ],
    "pradzia": "30 s – 1 min (IV)\n2–5 min (IM)",
    "trukme": "10–20 min (IV)\n20–30 min (IM); infuzija – pilnas poveikis per ~1 val.",
    "pakuote": "Ampulės 50 mg/ml arba 100 mg/ml",
    "pastabos": [
      "Ketaminas, opioidai ir benzodiazepinai stiprina vienas kitą – kiekvieno reikia mažiau (JTS PFC).",
      "Pykinimui – ondansetronas."
    ],
    "susije": [
      "midazolamas",
      "ondansetronas",
      "paracetamolis",
      "naloksonas"
    ],
    "saltinis": "TCCC gairės 2026-05-01 (TFC 11) – nuskausminimas; JTS CPG „Analgesia and Sedation Management during PFC“ (2023) – sedacija ir infuzija; PCS (Ketalar)",
    "nuorodos": [
      [
        "TCCC gairės 2026-05-01 (PDF, Deployed Medicine)",
        "https://learning-media.allogy.com/api/v1/pdf/18ccfdfc-a076-47e9-8a34-376efdd81b43/contents"
      ],
      [
        "JTS CPG „Analgesia and Sedation Management during PFC“ (tccc.org.ua, 2023)",
        "https://tccc.org.ua/en/guide/analgesia-and-sedation-management-during-prolonged-field-care-pcc"
      ],
      [
        "PCS – Ketalar (ketaminas) (JK eMC)",
        "https://www.medicines.org.uk/emc/product/5202/smpc"
      ]
    ],
    "lt": {
      "p": [
        {
          "n": "Ketamin Inresa",
          "d": "50 mg/ml · ampulė 10 ml (500 mg) · neregistruotas (vardinis)",
          "s": "N"
        },
        {
          "n": "Ketamin",
          "d": "50 mg/ml · ampulė 5 ml (250 mg) · neregistruotas (vardinis)",
          "s": "N"
        }
      ],
      "ne": "",
      "pa": "Lietuvoje registruoto injekcinio ketamino nėra: registre tik du neregistruoti (vardiniai) įrašai, abu šiuo metu netiekiami. 10 mg/ml ketamino registre nėra. Psichotropinė medžiaga."
    },
    "alt": [
      {
        "id": "fentanilis",
        "t": "nuskausminimui, jei numato SOP (CPP)"
      }
    ]
  },
  {
    "id": "paracetamolis",
    "name": "Paracetamolis",
    "klase": "Nuskausminamasis (CWMP)",
    "grupe": "skausmas",
    "lygis": "CLS",
    "tipas": "pagr",
    "tccc26": true,
    "kam": "Visiems (CWMP)",
    "ind": "Skausmas – kovinių žaizdų vaistų paketo (CWMP) dalis; PCC metu – nuolatinis nuskausminimo pagrindas, mažinantis kitų vaistų poreikį.",
    "kontra": "PCS: padidėjęs jautrumas paracetamoliui.",
    "dozes": [
      {
        "k": "Per burną (TCCC 2026)",
        "d": "1000–1300 mg kas 8 val.",
        "p": "CWMP – 2 × 650 mg prailginto atpalaidavimo tabletės."
      }
    ],
    "ispejimai": [
      "Nevartoti kartu su kitais paracetamolio turinčiais vaistais (PCS).",
      "Perkaitimui (karščio smūgiui) neskirti – tik karščiavimui (JTS PCC)."
    ],
    "pakuote": "Tabletės 650 mg (prailginto atpalaidavimo) arba 500 mg",
    "susije": [
      "meloksikamas",
      "ketaminas"
    ],
    "saltinis": "TCCC gairės 2026-05-01 (TFC 11); JTS CPG ID 91 (perkaitimas); PCS (paracetamolis)",
    "nuorodos": [
      [
        "TCCC gairės 2026-05-01 (PDF, Deployed Medicine)",
        "https://learning-media.allogy.com/api/v1/pdf/18ccfdfc-a076-47e9-8a34-376efdd81b43/contents"
      ],
      [
        "JTS CPG „Prolonged Casualty Care Guidelines“ (ID 91, 2021)",
        "https://jts.health.mil/assets/docs/cpgs/prolonged_casualty_care_guidelines_21_dec_2021_id91.pdf"
      ],
      [
        "PCS – paracetamolis 500 mg (JK eMC)",
        "https://www.medicines.org.uk/emc/product/5164/smpc"
      ]
    ],
    "lt": {
      "p": [
        {
          "n": "Paracetamol B.Braun",
          "d": "10 mg/ml · infuzinis tirpalas 100 ml (1 g)",
          "r": "B.Braun",
          "s": "T"
        },
        {
          "n": "Paracetamol Kabi",
          "d": "10 mg/ml · 100 ml (1 g)",
          "r": "Fresenius Kabi",
          "s": "T"
        },
        {
          "n": "Paracetamol Actavis, PARACETAMOL-GRINDEKS, Paracetamolis SANITAS, APAP",
          "d": "tabletės 500 mg (nereceptiniai)",
          "s": "T"
        }
      ],
      "ne": "",
      "pa": ""
    }
  },
  {
    "id": "meloksikamas",
    "name": "Meloksikamas",
    "klase": "Nuskausminamasis, NVNU (CWMP)",
    "grupe": "skausmas",
    "lygis": "CLS",
    "tipas": "pagr",
    "tccc26": true,
    "kam": "Visiems (CWMP)",
    "ind": "Skausmas – CWMP dalis, kartu su paracetamoliu.",
    "kontra": "PCS: alergija NVNU ar aspirinui; virškinamojo trakto kraujavimas ar opa; kraujavimo sutrikimai; sunkus kepenų, inkstų ar širdies nepakankamumas.",
    "dozes": [
      {
        "k": "Per burną (TCCC 2026)",
        "d": "15 mg kartą per parą",
        "p": "Ne daugiau kaip 15 mg per parą."
      }
    ],
    "ispejimai": [
      "Šokas, hipovolemija, suspaudimo sindromas – inkstų pažeidimo rizika (PCS): skirti tik stabiliam, pakankamai skysčių gaunančiam.",
      "Nederinti su kitais NVNU.",
      "Akies obuolio trauma – NVNU vengti (JTS akių PFC)."
    ],
    "pakuote": "Tabletės 15 mg",
    "susije": [
      "paracetamolis"
    ],
    "saltinis": "TCCC gairės 2026-05-01 (TFC 11); PCS (meloksikamas); JTS „Ocular Injuries in PFC“ (2026)",
    "nuorodos": [
      [
        "TCCC gairės 2026-05-01 (PDF, Deployed Medicine)",
        "https://learning-media.allogy.com/api/v1/pdf/18ccfdfc-a076-47e9-8a34-376efdd81b43/contents"
      ],
      [
        "PCS – meloksikamas 15 mg (JK eMC)",
        "https://www.medicines.org.uk/emc/product/101306/smpc"
      ]
    ],
    "lt": {
      "p": [
        {
          "n": "Movalis, Recoxa, MELOX",
          "d": "tabletės 15 mg",
          "s": "T"
        },
        {
          "n": "Mexolan, Recoxa, MELOX",
          "d": "15 mg/1,5 ml (10 mg/ml) · ampulė 1,5 ml, tik į raumenis",
          "s": "T"
        }
      ],
      "ne": "",
      "pa": ""
    }
  },
  {
    "id": "fentanilis",
    "name": "Fentanilis",
    "klase": "Opioidas (ne TCCC 2026)",
    "grupe": "skausmas",
    "lygis": "CPP",
    "tipas": "papild",
    "ne26": true,
    "kam": "CPP / gydytojas – tik jei numato vieneto SOP",
    "ind": "PCC: proveržio skausmas ar papildymas prie ketamino infuzijos (JTS PFC). TCCC 2026 fentanilio nebenumato.",
    "kontra": "PCS: alergija opioidams, kvėpavimo slopinimas, obstrukcinė kvėpavimo takų liga, MAO inhibitoriai (per 2 sav.). Šokas ar kvėpavimo distresas – pirmenybė ketaminui.",
    "dozes": [
      {
        "k": "IV / IO (JTS PFC)",
        "d": "50 mcg (25–100 mcg) kas 30 min – 2 val. pagal poreikį",
        "p": "50 mcg/ml – 1 ml. Leisti per 30–60 s. IM – nerekomenduojama."
      }
    ],
    "ispejimai": [
      "Naloksonas – po ranka.",
      "Nederinti su benzodiazepinais, nebent nurodė gydytojas.",
      "Greita injekcija – raumenų, taip pat krūtinės, rigidiškumas (PCS)."
    ],
    "pradzia": "1–2 min (IV)",
    "trukme": "30–60 min (IV)",
    "pakuote": "Ampulės 50 mcg/ml (2 ml = 100 mcg)",
    "pastabos": [
      "Narkotinė medžiaga – apskaita pagal SOP.",
      "Skiriasi nuo March gido: March (TCCC 2024) – dar 100 mcg į nosį; PCC metu į nosį vengti ir IM nerekomenduojama (JTS PFC). Lygis CPP – kaip March."
    ],
    "susije": [
      "naloksonas",
      "ketaminas"
    ],
    "saltinis": "JTS CPG „Analgesia and Sedation Management during PFC“ (2023); PCS (fentanilis)",
    "nuorodos": [
      [
        "JTS CPG „Analgesia and Sedation Management during PFC“ (tccc.org.ua, 2023)",
        "https://tccc.org.ua/en/guide/analgesia-and-sedation-management-during-prolonged-field-care-pcc"
      ],
      [
        "PCS – fentanilis 50 mcg/ml (JK eMC)",
        "https://www.medicines.org.uk/emc/product/100051/smpc"
      ]
    ],
    "lt": {
      "p": [
        {
          "n": "Fentanyl Kalceks",
          "d": "50 mcg/ml · ampulė 2 ml (100 mcg)",
          "r": "Kalceks",
          "s": "T"
        },
        {
          "n": "Fentanyl-hameln",
          "d": "50 mcg/ml · ampulė 2 ml",
          "s": "L"
        },
        {
          "n": "Fentanyl PANPHARMA",
          "d": "50 mcg/ml · ampulė 2 ml",
          "s": "L"
        }
      ],
      "ne": "Instanyl, PecFent (nosies purškalai) – registruoti, netiekiami",
      "pa": "Narkotinė medžiaga. 10 ml ampulės – tik netiekiami lygiagretaus importo įrašai."
    },
    "alt": [
      {
        "id": "ketaminas",
        "t": "pirmo pasirinkimo nuskausminimui"
      }
    ]
  },
  {
    "id": "midazolamas",
    "name": "Midazolamas",
    "klase": "Benzodiazepinas",
    "grupe": "skausmas",
    "lygis": "CPP",
    "tipas": "papild",
    "tccc26": true,
    "kam": "CPP / gydytojas; traukuliams – ir CMC pagal SOP",
    "ind": "Sedacijos papildymas prie ketamino infuzijos (JTS PFC); ketamino emergencijos reakcija (TCCC 2026); traukuliai (JTS TBI PFC).",
    "kontra": "PCS: padidėjęs jautrumas benzodiazepinams; sunkus kvėpavimo nepakankamumas ar ūminis kvėpavimo slopinimas (neventiliuojamam).",
    "dozes": [
      {
        "k": "Sedacija / emergencijos reakcija IV / IO",
        "d": "0,5–2 mg lėtai; intubuotam – 1–4 mg",
        "p": "Kartoti kas 5 min iki tikslo arba KD < 10 (JTS PFC)."
      },
      {
        "k": "Traukuliai IV / IO / IM (JTS TBI PFC)",
        "d": "5 mg kas 5 min, kol traukuliai liausis",
        "p": "Toliau – levetiracetamas (gydytojas)."
      }
    ],
    "ispejimai": [
      "Su opioidais ar ketaminu stiprina kvėpavimo slopinimą – maišas su kauke ir PEEP po ranka.",
      "Šoke – mažinti dozę.",
      "Nuskausminant ketaminu CMC lygiu – neskirti (TCCC 2026)."
    ],
    "pradzia": "apie 2 min (IV)\n5–10 min (IM)",
    "trukme": "30–90 min (IV)",
    "pakuote": "Ampulės 5 mg / 1 ml (5 mg/ml); buteliukas 5 mg / 5 ml (1 mg/ml)",
    "susije": [
      "ketaminas",
      "levetiracetamas"
    ],
    "saltinis": "JTS CPG „Analgesia and Sedation Management during PFC“ (2023); JTS CPG „TBI Management in PFC“ (2023); TCCC gairės 2026-05-01; PCS (midazolamas)",
    "nuorodos": [
      [
        "JTS CPG „Analgesia and Sedation Management during PFC“ (tccc.org.ua, 2023)",
        "https://tccc.org.ua/en/guide/analgesia-and-sedation-management-during-prolonged-field-care-pcc"
      ],
      [
        "JTS CPG „TBI Management in PFC“ (tccc.org.ua, 2023)",
        "https://tccc.org.ua/en/guide/traumatic-brain-injury-management-in-prolonged-field-care-pcc"
      ],
      [
        "TCCC gairės 2026-05-01 (PDF, Deployed Medicine)",
        "https://learning-media.allogy.com/api/v1/pdf/18ccfdfc-a076-47e9-8a34-376efdd81b43/contents"
      ],
      [
        "PCS – midazolamas injekcinis (JK eMC)",
        "https://www.medicines.org.uk/emc/product/6420/smpc"
      ]
    ],
    "lt": {
      "p": [
        {
          "n": "Midazolam B.Braun",
          "d": "5 mg/ml · ampulė 1 ml; 1 mg/ml · ampulė 5 ml",
          "r": "B.Braun",
          "s": "T"
        },
        {
          "n": "Midazolam Kalceks",
          "d": "5 mg/ml · ampulė 1 ml; 1 mg/ml · ampulė 5 ml",
          "r": "Kalceks",
          "s": "T"
        },
        {
          "n": "FULSED",
          "d": "5 mg/ml · ampulė 1 ml",
          "r": "Sun Pharmaceutical",
          "s": "T"
        }
      ],
      "ne": "Buccolam (burnos gleivinės tirpalas) – registruotas, netiekiamas",
      "pa": "Psichotropinė medžiaga. Tos pačios ampulės būna 1 ir 5 mg/ml – tikrinkite."
    }
  },
  {
    "id": "txa",
    "name": "Traneksamo rūgštis (TXA)",
    "klase": "Antifibrinolitikas",
    "grupe": "kraujas",
    "lygis": "CMC",
    "tipas": "pagr",
    "tccc26": true,
    "kam": "Kovos medikas (CMC)",
    "ind": "Tikėtina transfuzija (šokas, didelė amputacija, penetruojanti liemens trauma, stiprus kraujavimas) arba reikšminga galvos trauma (TCCC 2026).",
    "kontra": "PCS: padidėjęs jautrumas; ūminė trombozė; traukulių anamnezė.",
    "dozes": [
      {
        "k": "IV / IO (TCCC 2026)",
        "d": "2 g lėtai – kuo anksčiau, ne vėliau kaip per 3 val. nuo sužeidimo",
        "p": "4 ampulės po 500 mg / 5 ml = 20 ml. Antros dozės nėra (JTS PCC – galvos trauma)."
      }
    ],
    "ispejimai": [
      "Po 3 val. nuo sužeidimo neskirti – didina mirtingumą.",
      "Per greitai – hipotenzija; atsargiai, jei AKS jau žemas."
    ],
    "pakuote": "Ampulės 500 mg / 5 ml (100 mg/ml)",
    "susije": [
      "kalcis"
    ],
    "saltinis": "TCCC gairės 2026-05-01 (TFC 6); JTS CPG ID 91; PCS (Cyklokapron)",
    "nuorodos": [
      [
        "TCCC gairės 2026-05-01 (PDF, Deployed Medicine)",
        "https://learning-media.allogy.com/api/v1/pdf/18ccfdfc-a076-47e9-8a34-376efdd81b43/contents"
      ],
      [
        "JTS CPG „Prolonged Casualty Care Guidelines“ (ID 91, 2021)",
        "https://jts.health.mil/assets/docs/cpgs/prolonged_casualty_care_guidelines_21_dec_2021_id91.pdf"
      ],
      [
        "PCS – Cyklokapron (JK eMC)",
        "https://www.medicines.org.uk/emc/product/1077/smpc"
      ]
    ],
    "lt": {
      "p": [
        {
          "n": "Ugurol",
          "d": "100 mg/ml · ampulė 5 ml (500 mg)",
          "s": "L"
        },
        {
          "n": "TRANEXAMSAURE EBERTH",
          "d": "100 mg/ml · ampulė 5 ml",
          "s": "L"
        },
        {
          "n": "Mefitax; Ugurol (Limedika)",
          "d": "100 mg/ml · ampulė 5 ml",
          "s": "U"
        },
        {
          "n": "Tranexamic acid Kabi",
          "d": "10 mg/ml (paruoštas) · 100 ml (1 g)",
          "r": "Fresenius Kabi",
          "s": "T"
        }
      ],
      "ne": "Tranexamic acid Baxter, Unifarma (100 mg/ml) – registruoti, netiekiami",
      "pa": "Atkreipkite dėmesį į koncentraciją: Kabi 10 mg/ml – 10 kartų skystesnis už ampules."
    }
  },
  {
    "id": "kalcis",
    "name": "Kalcio gliukonatas 10 %",
    "klase": "Elektrolitai",
    "grupe": "kraujas",
    "lygis": "CMC",
    "tipas": "pagr",
    "tccc26": true,
    "kam": "Kovos medikas (CMC)",
    "ind": "Perpylus kraujo produktą – po pirmo vieneto (TCCC 2026), toliau po kas 4 vienetų (JTS DCR PFC). Hiperkalemija su EKG pokyčiais (suspaudimo sindromas, turniketo atleidimas).",
    "kontra": "PCS: hiperkalcemija; vartojantiems digoksiną – tik gyvybei pavojingos būklės atveju.",
    "dozes": [
      {
        "k": "Transfuzija IV / IO (TCCC 2026)",
        "d": "30 ml 10 % kalcio gliukonato (arba 10 ml 10 % kalcio chlorido) lėtai",
        "p": "Transfuzija. TCCC tai vadina „1 g kalcio“: gliukonato – 3 ampulės po 10 ml. Tęsiant transfuziją – ta pati dozė po kas 4 vienetų (JTS DCR PFC)."
      },
      {
        "k": "Hiperkalemija (JTS Crush PFC)",
        "d": "10 ml 10 % kalcio gliukonato IV per 2–3 min",
        "p": "Kartoti pagal EKG ir poreikį. Poveikis iš karto, trunka 30–60 min; kalio nemažina – toliau insulinas su gliukoze."
      }
    ],
    "ispejimai": [
      "Ne ta pačia linija su krauju ir ne kartu su ceftriaksonu – kita prieiga arba praplauti (PCS).",
      "Kalcio chloridas – tik į gerai veikiančią prieigą: ekstravazacija sukelia nekrozę."
    ],
    "pakuote": "Ampulės 10 ml, 10 % (100 mg/ml)",
    "pastabos": [
      "Skiriasi nuo ETC gido: hiperkalemijai ETC – 30 ml 10 % gliukonato per 10 min (JTS hiperkalemijos CPG, CGO, UK RA); čia – JTS Crush PFC dozė."
    ],
    "susije": [
      "txa",
      "insulinas"
    ],
    "saltinis": "TCCC gairės 2026-05-01 (TFC 6); JTS CPG „Damage Control Resuscitation in PFC“; JTS CPG „Crush Syndrome in PFC“ (2023); PCS (kalcio gliukonatas 10 %)",
    "nuorodos": [
      [
        "TCCC gairės 2026-05-01 (PDF, Deployed Medicine)",
        "https://learning-media.allogy.com/api/v1/pdf/18ccfdfc-a076-47e9-8a34-376efdd81b43/contents"
      ],
      [
        "JTS CPG „Damage Control Resuscitation in PFC“ (ID 73, tccc.org.ua)",
        "https://tccc.org.ua/en/guide/damage-control-resuscitation-in-prolonged-field-care-pcc"
      ],
      [
        "JTS CPG „Crush Syndrome in PFC“ (tccc.org.ua, 2023)",
        "https://tccc.org.ua/en/guide/crush-syndrome-under-prolonged-field-care-pcc"
      ],
      [
        "PCS – kalcio gliukonatas 10 % (JK eMC)",
        "https://www.medicines.org.uk/emc/product/6264/smpc"
      ]
    ],
    "lt": {
      "p": [
        {
          "n": "Calcii gluconas",
          "d": "10 % · ampulė 10 ml",
          "s": "U"
        },
        {
          "n": "Calciumgluconat B. Braun 10%",
          "d": "100 mg/ml · ampulė 10 ml",
          "s": "U"
        }
      ],
      "ne": "",
      "pa": "Lietuvoje registruoto injekcinio kalcio gliukonato nėra – registre tik tiekiami įrašai be registracijos numerio. Kalcio chlorido injekcijų (bolusui) registre nėra."
    }
  },
  {
    "id": "kristaloidai",
    "name": "Kristaloidai (Ringerio laktatas, Plasma-Lyte A, 0,9 % NaCl)",
    "klase": "Infuziniai tirpalai",
    "grupe": "kraujas",
    "lygis": "CMC",
    "tipas": "pagr",
    "ne26": true,
    "kam": "Kovos medikas (CMC)",
    "ind": "PCC: palaikomieji skysčiai negalinčiam gerti; nudegimų gaivinimas; suspaudimo sindromas. Hemoraginiam šokui – tik kai nėra kraujo produktų.",
    "kontra": "Hemoraginis šokas, kai yra kraujo – kristaloidai blogina koaguliopatiją (JTS DCR PFC).",
    "dozes": [
      {
        "k": "Palaikomieji (JTS ID 70)",
        "d": "100–150 ml/val. IV / IO, titruojant pagal diurezę",
        "p": "Intubuotam ar sedatuotam – papildomai prie gaivinimo skysčių. Pirmenybė: Plasma-Lyte A → Ringerio laktatas → 0,9 % NaCl."
      },
      {
        "k": "Nudegimai > 20 % (JTS nudegimų PFC)",
        "d": "KPP % × 10 ml/val. (40–80 kg); +100 ml/val. kiekvienam 10 kg virš 80",
        "p": "Kol vertinate – 500 ml/val. Diurezė 30–50 ml/val.; greitį keisti ±25 % kas 1–2 val."
      },
      {
        "k": "Suspaudimo sindromas (JTS PFC)",
        "d": "2 l boliusas prieš išlaisvinimą, toliau 1 l/val.",
        "p": "Diurezė 100–200 ml/val."
      }
    ],
    "ispejimai": [
      "Gaivinimo skysčius – per šildytuvą.",
      "Laisvo vandens (5 % gliukozės) venkite – hiponatremija."
    ],
    "pakuote": "Maišai 500 ml ir 1000 ml",
    "saltinis": "JTS CPG ID 70 (2025); JTS CPG „Burn Wound Management in PFC“ (2023); JTS CPG „Crush Syndrome in PFC“ (2023); JTS CPG „Damage Control Resuscitation in PFC“",
    "nuorodos": [
      [
        "JTS CPG „Nursing Interventions, Wound Care, and Splint Management in PCC“ (ID 70, 2025)",
        "https://jts.health.mil/assets/docs/cpgs/Nursing_Interventions_PCC_08_July_2025_ID70_v1.1.pdf"
      ],
      [
        "JTS CPG „Burn Wound Management in PFC“ (tccc.org.ua, 2023)",
        "https://tccc.org.ua/en/guide/burn-wound-management-under-prolonged-field-care-pcc"
      ],
      [
        "JTS CPG „Crush Syndrome in PFC“ (tccc.org.ua, 2023)",
        "https://tccc.org.ua/en/guide/crush-syndrome-under-prolonged-field-care-pcc"
      ],
      [
        "JTS CPG „Damage Control Resuscitation in PFC“ (ID 73, tccc.org.ua)",
        "https://tccc.org.ua/en/guide/damage-control-resuscitation-in-prolonged-field-care-pcc"
      ]
    ]
  },
  {
    "id": "noradrenalinas",
    "name": "Noradrenalinas",
    "klase": "Vazopresorius",
    "grupe": "kraujas",
    "lygis": "CPP",
    "tipas": "papild",
    "ne26": true,
    "kam": "Gydytojo sprendimu (telekonsultacija)",
    "ind": "sAKS lieka < 100–110 mm Hg po gaivinimo krauju ir kraujavimo kontrolės (JTS PCC); spinalinis šokas – kartu su kristaloidais.",
    "kontra": "Nesustabdytas kraujavimas ir hipovolemija – pirmiausia kraujas ir kraujavimo kontrolė.",
    "dozes": [
      {
        "k": "Infuzija (JTS PCC)",
        "d": "0,1–0,4 mcg/kg/min",
        "p": "Tik pagal patvirtintą protokolą ar telekonsultacijos nurodymu; skiedimą ir greitį tikslina gydytojas."
      }
    ],
    "ispejimai": [
      "Ekstravazacija – audinių nekrozė: tik į gerai veikiančią prieigą.",
      "Švirkšte ar maiše – aiškiai paženklinta koncentracija."
    ],
    "pakuote": "Ampulės 1 mg/ml",
    "pastabos": [
      "Skiriasi nuo ETC gido: ETC – 0,05–1 mcg/kg/min (PCS); čia – JTS PCC CPG 0,1–0,4 mcg/kg/min."
    ],
    "saltinis": "JTS CPG ID 91 (2021) – kraujotaka; PCS (noradrenalinas)",
    "nuorodos": [
      [
        "JTS CPG „Prolonged Casualty Care Guidelines“ (ID 91, 2021)",
        "https://jts.health.mil/assets/docs/cpgs/prolonged_casualty_care_guidelines_21_dec_2021_id91.pdf"
      ],
      [
        "PCS – noradrenalinas 1 mg/ml (JK eMC)",
        "https://www.medicines.org.uk/emc/product/13172/smpc"
      ]
    ],
    "lt": {
      "p": [
        {
          "n": "Norepinephrine Kabi",
          "d": "1 mg/ml · ampulė 4 ml",
          "r": "Fresenius Kabi",
          "s": "T"
        },
        {
          "n": "Norepinephrine Kalceks",
          "d": "1 mg/ml · ampulė 4 ml",
          "r": "Kalceks",
          "s": "T"
        }
      ],
      "ne": "",
      "pa": "Tikrinkite ant ampulės, ar 1 mg/ml nurodyta bazei ar tartratui (2 mg tartrato = 1 mg bazės)."
    }
  },
  {
    "id": "cefadroksilis",
    "name": "Cefadroksilis",
    "klase": "Geriamasis antibiotikas (cefalosporinas)",
    "grupe": "antibiotikai",
    "lygis": "CLS",
    "tipas": "pagr",
    "tccc26": true,
    "kam": "Visiems (gali nuryti)",
    "ind": "Atviros kovinės žaizdos, kai sužeistasis gali nuryti; penetruojanti akies trauma (TCCC 2026).",
    "kontra": "PCS: padidėjęs jautrumas cefalosporinams; sunki reakcija į penicilinus ar kitus beta laktamus.",
    "dozes": [
      {
        "k": "Per burną (TCCC 2026)",
        "d": "1 g kartą per parą",
        "p": "500 mg kapsulės – 2 kapsulės. Trukmė PCC metu – pagal gydytoją."
      }
    ],
    "ispejimai": [
      "Alergija penicilinams – praneškite gydytojui."
    ],
    "pakuote": "Kapsulės 500 mg",
    "pastabos": [
      "Negali nuryti – ceftriaksonas.",
      "Nudegimams be kitų žaizdų antibiotikų nereikia."
    ],
    "susije": [
      "ceftriaksonas"
    ],
    "saltinis": "TCCC gairės 2026-05-01 (TFC 12); PCS (cefadroksilis)",
    "nuorodos": [
      [
        "TCCC gairės 2026-05-01 (PDF, Deployed Medicine)",
        "https://learning-media.allogy.com/api/v1/pdf/18ccfdfc-a076-47e9-8a34-376efdd81b43/contents"
      ],
      [
        "PCS – cefadroksilis 500 mg (JK eMC)",
        "https://www.medicines.org.uk/emc/product/6543/smpc"
      ]
    ],
    "lt": {
      "p": [
        {
          "n": "Duracef",
          "d": "kapsulės 500 mg; disperguojamosios tabletės 1 g",
          "r": "Bausch Health",
          "s": "T"
        },
        {
          "n": "Biodroxil",
          "d": "kapsulės 500 mg",
          "r": "Sandoz",
          "s": "T"
        }
      ],
      "ne": "",
      "pa": ""
    }
  },
  {
    "id": "ceftriaksonas",
    "name": "Ceftriaksonas",
    "klase": "Parenterinis antibiotikas (cefalosporinas)",
    "grupe": "antibiotikai",
    "lygis": "CMC",
    "tipas": "pagr",
    "tccc26": true,
    "kam": "Kovos medikas (CMC)",
    "ind": "Atviros kovinės žaizdos, kai sužeistasis negali nuryti; penetruojanti akies trauma (TCCC 2026). Atvira galvos trauma (JTS TBI PFC).",
    "kontra": "PCS: padidėjęs jautrumas cefalosporinams; sunki alergija kitiems beta laktamams.",
    "dozes": [
      {
        "k": "IV / IO / IM (TCCC 2026)",
        "d": "2 g kartą per parą",
        "p": "IV – lėtai per 5 min arba infuzija ≥ 30 min; IM – į vieną vietą ≤ 1 g. Atvira galvos trauma – 5 d. (JTS TBI PFC)."
      }
    ],
    "ispejimai": [
      "Su kalcio tirpalais nemaišyti ir neleisti kartu ta pačia linija (PCS)."
    ],
    "pakuote": "Milteliai flakone 1 g arba 2 g",
    "susije": [
      "cefadroksilis",
      "kalcis"
    ],
    "saltinis": "TCCC gairės 2026-05-01 (TFC 12); JTS CPG „TBI Management in PFC“ (2023); PCS (ceftriaksonas)",
    "nuorodos": [
      [
        "TCCC gairės 2026-05-01 (PDF, Deployed Medicine)",
        "https://learning-media.allogy.com/api/v1/pdf/18ccfdfc-a076-47e9-8a34-376efdd81b43/contents"
      ],
      [
        "JTS CPG „TBI Management in PFC“ (tccc.org.ua, 2023)",
        "https://tccc.org.ua/en/guide/traumatic-brain-injury-management-in-prolonged-field-care-pcc"
      ],
      [
        "PCS – ceftriaksonas 2 g (JK eMC)",
        "https://www.medicines.org.uk/emc/product/15078/smpc"
      ]
    ],
    "lt": {
      "p": [
        {
          "n": "Medaxone",
          "d": "1 g · milteliai, flakonas",
          "r": "Medochemie",
          "s": "T"
        },
        {
          "n": "Ceftriaxone Kabi",
          "d": "1 g · flakonas",
          "r": "Fresenius Kabi",
          "s": "T"
        },
        {
          "n": "Rezaxon",
          "d": "1 g · flakonas",
          "r": "Eletis Pharma",
          "s": "T"
        }
      ],
      "ne": "Ceftriaxone MIP, Ceftriaxone Venus Pharma 2 g – registruoti, netiekiami",
      "pa": "Tiekiami tik 1 g flakonai – 2 g dozei reikia 2 flakonų."
    }
  },
  {
    "id": "ertapenemas",
    "name": "Ertapenemas",
    "klase": "Antibiotikas (karbapenemas)",
    "grupe": "antibiotikai",
    "lygis": "CPP",
    "tipas": "papild",
    "ne26": true,
    "kam": "Gydytojo sprendimu (telekonsultacija)",
    "ind": "PCC: suspaudimo sindromo žaizdos (geriausias pasirinkimas), infekuotos žaizdos, invazinė nudegimų infekcija, kai kitų nėra (JTS PFC).",
    "kontra": "PCS: alergija karbapenemams; sunki alergija kitiems beta laktamams.",
    "dozes": [
      {
        "k": "IV / IO (JTS PFC)",
        "d": "1 g kartą per parą",
        "p": "Infekcijos gydymas – 7–10 d. (JTS žaizdų PFC)."
      }
    ],
    "ispejimai": [
      "Nederinti su valproatu (PCS)."
    ],
    "pakuote": "1 g flakonas",
    "susije": [
      "moksifloksacinas",
      "ceftriaksonas"
    ],
    "saltinis": "JTS CPG „Crush Syndrome in PFC“, „Acute Traumatic Wound Management in PFC“, „Burn Wound Management in PFC“ (2023); PCS (Invanz)",
    "nuorodos": [
      [
        "JTS CPG „Crush Syndrome in PFC“ (tccc.org.ua, 2023)",
        "https://tccc.org.ua/en/guide/crush-syndrome-under-prolonged-field-care-pcc"
      ],
      [
        "JTS CPG „Acute Traumatic Wound Management in PFC“ (tccc.org.ua, 2023)",
        "https://tccc.org.ua/en/guide/acute-traumatic-wound-management-prolonged-field-care-setting-pcc"
      ],
      [
        "PCS – Invanz (ertapenemas), EMA",
        "https://www.ema.europa.eu/en/documents/product-information/invanz-epar-product-information_en.pdf"
      ]
    ],
    "lt": {
      "p": [],
      "ne": "Invanz, Ertapenem SUN, Ertapenem QILU 1 g – registruoti, netiekiami",
      "pa": "Lietuvoje šiuo metu netiekiamas."
    }
  },
  {
    "id": "moksifloksacinas",
    "name": "Moksifloksacinas",
    "klase": "Antibiotikas (fluorochinolonas)",
    "grupe": "antibiotikai",
    "lygis": "CPP",
    "tipas": "papild",
    "ne26": true,
    "kam": "Gydytojo sprendimu (telekonsultacija)",
    "ind": "PCC: nešvarių žaizdų profilaktika ar infekcijos gydymas per burną, kai cefalosporinai netinka (JTS žaizdų PFC).",
    "kontra": "PCS: < 18 m., nėštumas, QT pailgėjimas, nekoreguota hipokalemija, kiti QT ilginantys vaistai, ankstesnė chinolonų sukelta sausgyslių pažaida.",
    "dozes": [
      {
        "k": "Per burną (JTS PFC)",
        "d": "400 mg kartą per parą",
        "p": "Infekcijos gydymas – 7–10 d."
      }
    ],
    "ispejimai": [
      "Sausgyslių skausmas, psichikos ar neuropatijos simptomai – nutraukti (PCS)."
    ],
    "pakuote": "Tabletės 400 mg",
    "susije": [
      "ertapenemas",
      "cefadroksilis"
    ],
    "saltinis": "JTS CPG „Acute Traumatic Wound Management in PFC“ (2023); PCS (moksifloksacinas)",
    "nuorodos": [
      [
        "JTS CPG „Acute Traumatic Wound Management in PFC“ (tccc.org.ua, 2023)",
        "https://tccc.org.ua/en/guide/acute-traumatic-wound-management-prolonged-field-care-setting-pcc"
      ],
      [
        "PCS – moksifloksacinas 400 mg (JK eMC)",
        "https://www.medicines.org.uk/emc/product/6771/smpc"
      ]
    ],
    "lt": {
      "p": [
        {
          "n": "Moxifloxacin Sandoz",
          "d": "tabletės 400 mg",
          "r": "Sandoz",
          "s": "T"
        },
        {
          "n": "FLOXELAN",
          "d": "tabletės 400 mg",
          "r": "Medochemie",
          "s": "T"
        }
      ],
      "ne": "Avelox, Moflaxa 400 mg/250 ml infuzinis tirpalas – registruoti, netiekiami",
      "pa": ""
    }
  },
  {
    "id": "cefazolinas",
    "name": "Cefazolinas",
    "klase": "Parenterinis antibiotikas (cefalosporinas)",
    "grupe": "antibiotikai",
    "lygis": "CPP",
    "tipas": "papild",
    "ne26": true,
    "kam": "Gydytojo sprendimu (telekonsultacija)",
    "ind": "PCC: nešvarių žaizdų profilaktika, atvira galvos trauma, celiulitas aplink nudegimą (JTS PFC).",
    "kontra": "Alergija cefalosporinams; sunki alergija penicilinams.",
    "dozes": [
      {
        "k": "IV / IO (JTS PFC)",
        "d": "2 g kas 8 val.",
        "p": "Nešvarios žaizdos profilaktika – 24 val.; atvira galvos trauma – 5 d. (JTS)."
      }
    ],
    "ispejimai": [
      "Paklauskite apie alergijas prieš pirmą dozę."
    ],
    "pakuote": "Milteliai flakone 1 g arba 2 g",
    "susije": [
      "ceftriaksonas"
    ],
    "saltinis": "JTS CPG „Acute Traumatic Wound Management in PFC“, „TBI Management in PFC“ (2023)",
    "nuorodos": [
      [
        "JTS CPG „Acute Traumatic Wound Management in PFC“ (tccc.org.ua, 2023)",
        "https://tccc.org.ua/en/guide/acute-traumatic-wound-management-prolonged-field-care-setting-pcc"
      ],
      [
        "JTS CPG „TBI Management in PFC“ (tccc.org.ua, 2023)",
        "https://tccc.org.ua/en/guide/traumatic-brain-injury-management-in-prolonged-field-care-pcc"
      ]
    ]
  },
  {
    "id": "stablige",
    "name": "Stabligės profilaktika (Tdap, TIG)",
    "klase": "Vakcina ir imunoglobulinas",
    "grupe": "antibiotikai",
    "lygis": "CPP",
    "tipas": "papild",
    "ne26": true,
    "kam": "Gydytojo sprendimu (telekonsultacija)",
    "ind": "Kovinės žaizdos, kai skiepijimas nežinomas, nepilnas ar senas (JTS žaizdų PFC).",
    "kontra": "Ankstesnė sunki reakcija į vakciną.",
    "dozes": [
      {
        "k": "Pagal skiepijimą (JTS PFC)",
        "d": "Nežinomas ar nepilnas: Tdap + TIG (užterštai karo žaizdai – 500 VV; švariai didelei – 250 VV)",
        "p": "Smulki švari žaizda – tik Tdap. Pilnas, revakcinacija prieš 5–10 m. – Tdap užterštai žaizdai; > 10 m. – Tdap; neseniai – nieko."
      }
    ],
    "ispejimai": [
      "Skiepijimo duomenis tikslinkite pagal medicininius įrašus."
    ],
    "pastabos": [
      "TIG 500 VV užterštai karo žaizdai – taip nurodo JTS žaizdų PFC (2023); įprasta profilaktinė dozė – 250 VV. Patvirtina gydytojas."
    ],
    "saltinis": "JTS CPG „Acute Traumatic Wound Management in PFC“ (2023)",
    "nuorodos": [
      [
        "JTS CPG „Acute Traumatic Wound Management in PFC“ (tccc.org.ua, 2023)",
        "https://tccc.org.ua/en/guide/acute-traumatic-wound-management-prolonged-field-care-setting-pcc"
      ]
    ]
  },
  {
    "id": "nacl-hipert",
    "name": "Hipertoninis NaCl",
    "klase": "3 % arba 5 % (arba 23,4 %)",
    "grupe": "galva",
    "lygis": "CMC",
    "tipas": "pagr",
    "tccc26": true,
    "kam": "Kovos medikas (CMC)",
    "ind": "Galvos smegenų išvaržos požymiai: asimetriški ar fiksuoti išsiplėtę vyzdžiai, patologinė laikysena (TCCC 2026). Profilaktiškai neskirti.",
    "kontra": "Neskirti profilaktiškai ir kaip tūrio skysčio.",
    "dozes": [
      {
        "k": "IV / IO (TCCC 2026)",
        "d": "250 ml 3 % arba 5 % NaCl (arba 30 ml 23,4 %) per ≥ 10 min, po to praplauti",
        "p": "Nėra atsako – kartoti po 20 min (maks. 2 dozės). Daugiau – tik po telekonsultacijos (JTS TBI PFC)."
      }
    ],
    "ispejimai": [
      "Ekstravazacija – nutraukti."
    ],
    "pakuote": "Pagal vieneto rinkinį",
    "pastabos": [
      "PCC tikslai galvos traumai: SpO₂ ≥ 92 % (ventiliuojamam > 95 %), sAKS > 110 mm Hg, EtCO₂ 35–40 mm Hg, galvūgalis 30–60° (JTS TBI PFC; SpO₂ riba – TCCC 2026).",
      "Be laboratorijos 250 ml 3 % NaCl padidina natrį ~2–3 mmol/l (80 kg; JTS TBI PFC)."
    ],
    "susije": [
      "manitolis",
      "levetiracetamas"
    ],
    "saltinis": "TCCC gairės 2026-05-01 (TFC 8); JTS CPG „TBI Management in PFC“ (2023)",
    "nuorodos": [
      [
        "TCCC gairės 2026-05-01 (PDF, Deployed Medicine)",
        "https://learning-media.allogy.com/api/v1/pdf/18ccfdfc-a076-47e9-8a34-376efdd81b43/contents"
      ],
      [
        "JTS CPG „TBI Management in PFC“ (tccc.org.ua, 2023)",
        "https://tccc.org.ua/en/guide/traumatic-brain-injury-management-in-prolonged-field-care-pcc"
      ]
    ],
    "lt": {
      "p": [
        {
          "n": "Sodium chloride Fresenius 10 %",
          "d": "100 mg/ml · koncentratas, flakonas 100 ml",
          "r": "Fresenius Kabi",
          "s": "T"
        },
        {
          "n": "Sodium Chloride B.Braun 5,85 %",
          "d": "58,5 mg/ml · koncentratas, buteliukas 100 ml",
          "r": "B.Braun",
          "s": "T"
        }
      ],
      "ne": "",
      "pa": "3 %, 5 % ir 7,5 % NaCl infuzinių tirpalų Lietuvos registre nėra, 10 % NaCl 10 ml ampulių – taip pat. Registruoti tik koncentratai – paruošimas pagal ligoninės / kuopos SOP."
    }
  },
  {
    "id": "manitolis",
    "name": "Manitolis",
    "klase": "Osmosinis diuretikas",
    "grupe": "galva",
    "lygis": "CPP",
    "tipas": "papild",
    "ne26": true,
    "kam": "Gydytojo sprendimu (telekonsultacija)",
    "ind": "Padidėjęs intrakranijinis spaudimas, kai hipertoninio NaCl nėra ar nepakanka (JTS pirmenybę teikia NaCl).",
    "kontra": "Kraujavimas, hipovolemija, sAKS ≤ 110 mm Hg (JTS TBI PFC).",
    "dozes": [
      {
        "k": "IV / IO (JTS TBI PFC)",
        "d": "1 g/kg per 20 min · ml 20 % tirpalo",
        "c": {
          "per": 1,
          "u": "g",
          "conc": 0.2
        },
        "p": "Toliau – 0,5 g/kg kas 3 val. pagal poreikį (gydytojas)."
      }
    ],
    "ispejimai": [
      "Stipri diurezė – gali kristi AKS: šlapimo kateteris, diurezę kompensuoti.",
      "Tik esant padidėjusio spaudimo požymiams, ne profilaktiškai."
    ],
    "pakuote": "20 % tirpalas",
    "pastabos": [
      "Skiriasi nuo ETC gido: ETC – 0,5 g/kg (0,25–1 g/kg; ETC vadovas 5.0); čia – JTS TBI PFC 1 g/kg."
    ],
    "susije": [
      "nacl-hipert"
    ],
    "saltinis": "JTS CPG „TBI Management in PFC“ (2023)",
    "nuorodos": [
      [
        "JTS CPG „TBI Management in PFC“ (tccc.org.ua, 2023)",
        "https://tccc.org.ua/en/guide/traumatic-brain-injury-management-in-prolonged-field-care-pcc"
      ]
    ]
  },
  {
    "id": "levetiracetamas",
    "name": "Levetiracetamas",
    "klase": "Prieštraukulinis",
    "grupe": "galva",
    "lygis": "CPP",
    "tipas": "papild",
    "ne26": true,
    "kam": "Gydytojo sprendimu (telekonsultacija)",
    "ind": "Galvos trauma: palaikomasis gydymas po traukulių, nutrauktų midazolamu (JTS TBI PFC).",
    "kontra": "Alergija.",
    "dozes": [
      {
        "k": "IV / IO (JTS TBI PFC)",
        "d": "2000 mg per 15 min, toliau 500 mg kas 12 val.",
        "p": "Pirmiausia traukulius nutraukti midazolamu."
      }
    ],
    "ispejimai": [
      "Sedacija apsunkina neurologinį vertinimą – GKS užrašyti prieš skiriant."
    ],
    "susije": [
      "midazolamas"
    ],
    "saltinis": "JTS CPG „TBI Management in PFC“ (2023)",
    "nuorodos": [
      [
        "JTS CPG „TBI Management in PFC“ (tccc.org.ua, 2023)",
        "https://tccc.org.ua/en/guide/traumatic-brain-injury-management-in-prolonged-field-care-pcc"
      ]
    ]
  },
  {
    "id": "insulinas",
    "name": "Insulinas ir gliukozė (hiperkalemija)",
    "klase": "Trumpo veikimo (paprastas) insulinas + gliukozė",
    "grupe": "hiperkalemija",
    "lygis": "CPP",
    "tipas": "papild",
    "ne26": true,
    "kam": "Gydytojo sprendimu (telekonsultacija)",
    "ind": "Hiperkalemija: EKG pokyčiai (bradikardija, smailūs T, platus QRS, daugėjančios ekstrasistolės), silpnėjantis pulsas ar K > 5,5 mmol/l ir didėja – suspaudimo sindromas, turniketo atleidimas.",
    "kontra": "Hipoglikemija.",
    "dozes": [
      {
        "k": "IV / IO (JTS Crush PFC)",
        "d": "10 VV paprasto insulino, iš karto po to 50 ml 50 % gliukozės (25 g)",
        "p": "Poveikis po ~20 min, trunka 4–6 val. Kartu – kalcis (stabilizuoja širdį)."
      }
    ],
    "ispejimai": [
      "Hipoglikemijos rizika – gliukozę matuoti kas valandą, jei galima.",
      "Poveikis laikinas – kartoti pagal EKG ir telekonsultaciją."
    ],
    "pradzia": "~20 min",
    "trukme": "4–6 val.",
    "susije": [
      "kalcis",
      "salbutamolis",
      "gliukoze"
    ],
    "saltinis": "JTS CPG „Crush Syndrome in PFC“ (2023)",
    "nuorodos": [
      [
        "JTS CPG „Crush Syndrome in PFC“ (tccc.org.ua, 2023)",
        "https://tccc.org.ua/en/guide/crush-syndrome-under-prolonged-field-care-pcc"
      ]
    ]
  },
  {
    "id": "salbutamolis",
    "name": "Salbutamolis (hiperkalemija)",
    "klase": "Beta₂ agonistas",
    "grupe": "hiperkalemija",
    "lygis": "CPP",
    "tipas": "papild",
    "ne26": true,
    "kam": "Gydytojo sprendimu (telekonsultacija)",
    "ind": "Hiperkalemija – papildomai prie insulino su gliukoze (JTS Crush PFC).",
    "kontra": "Alergija.",
    "dozes": [
      {
        "k": "Purkštuvu (JTS Crush PFC)",
        "d": "10 mg (4 ampulės po 2,5 mg)",
        "p": "Poveikis po ~30 min, trunka ~2 val.; sumuojasi su insulino poveikiu."
      }
    ],
    "ispejimai": [
      "Tachikardija, tremoras."
    ],
    "pradzia": "~30 min",
    "trukme": "~2 val.",
    "susije": [
      "insulinas",
      "kalcis"
    ],
    "saltinis": "JTS CPG „Crush Syndrome in PFC“ (2023)",
    "nuorodos": [
      [
        "JTS CPG „Crush Syndrome in PFC“ (tccc.org.ua, 2023)",
        "https://tccc.org.ua/en/guide/crush-syndrome-under-prolonged-field-care-pcc"
      ]
    ]
  },
  {
    "id": "ondansetronas",
    "name": "Ondansetronas",
    "klase": "Vėmimą slopinantis",
    "grupe": "kita",
    "lygis": "CMC",
    "tipas": "pagr",
    "tccc26": true,
    "kam": "Kovos medikas (CMC)",
    "ind": "Pykinimas ir vėmimas (pvz., po ketamino); akies obuolio trauma – vėmimui išvengti.",
    "kontra": "PCS: vengti esant įgimtam ilgo QT sindromui.",
    "dozes": [
      {
        "k": "ODT / IV / IO / IM (TCCC 2026)",
        "d": "4 mg kas 8 val. pagal poreikį",
        "p": "IV – lėtai, ne greičiau kaip per 30 s (PCS)."
      }
    ],
    "ispejimai": [
      "Vemiantį saugokite nuo aspiracijos – šoninė padėtis."
    ],
    "pakuote": "Tirpstančios tabletės 4 mg; ampulės 2 mg/ml",
    "susije": [
      "ketaminas"
    ],
    "saltinis": "TCCC gairės 2026-05-01 (TFC 11); PCS (ondansetronas)",
    "nuorodos": [
      [
        "TCCC gairės 2026-05-01 (PDF, Deployed Medicine)",
        "https://learning-media.allogy.com/api/v1/pdf/18ccfdfc-a076-47e9-8a34-376efdd81b43/contents"
      ],
      [
        "PCS – ondansetronas (JK eMC)",
        "https://www.medicines.org.uk/emc/product/13193/smpc"
      ]
    ],
    "lt": {
      "p": [
        {
          "n": "Ondansetron Kalceks",
          "d": "2 mg/ml · ampulė 4 ml (8 mg)",
          "r": "Kalceks",
          "s": "T"
        },
        {
          "n": "Ondansetron Accord",
          "d": "2 mg/ml · ampulė 4 ml (8 mg)",
          "r": "Accord",
          "s": "T"
        },
        {
          "n": "Ondansetron Baxter",
          "d": "2 mg/ml · ampulės 2 ml (4 mg) ir 4 ml (8 mg)",
          "r": "Baxter",
          "s": "T"
        }
      ],
      "ne": "Burnoje disperguojamos tabletės (Ondansetron STADA 4 / 8 mg) – registruotos, netiekiamos; Zofran – netiekiamas",
      "pa": "Tiekiamos 8 mg plėvele dengtos tabletės (nuryjamos)."
    }
  },
  {
    "id": "gliukoze",
    "name": "Gliukozė (hipoglikemija)",
    "klase": "50 % arba 10 % tirpalas; per burną",
    "grupe": "kita",
    "lygis": "CMC",
    "tipas": "papild",
    "ne26": true,
    "kam": "Kovos medikas (CMC)",
    "ind": "Gliukozė < 5,6 mmol/l galvos traumai (JTS TBI PFC); < 4,4 mmol/l kitiems (JTS ID 70); ilgai nemaitinamas sužeistasis.",
    "kontra": "",
    "dozes": [
      {
        "k": "Per burną arba IV / IO (JTS TBI PFC)",
        "d": "20 g per burną arba 25 g IV / IO (50 ml 50 % arba 250 ml 10 %)",
        "p": "Po 1 val. pakartoti matavimą."
      }
    ],
    "ispejimai": [
      "50 % tirpalas dirgina veną – į gerai veikiančią prieigą."
    ],
    "pastabos": [
      "Nemaitinamam gliukozę matuoti kas 8 val. (JTS ID 70).",
      "Galvos traumai tikslas ~10 mmol/l (JTS TBI PFC).",
      "Skiriasi nuo ETC gido: ETC – 200 ml 10 % gliukozės per 15 min (NHS / JBDS); čia – JTS TBI PFC 25 g (50 ml 50 % arba 250 ml 10 %)."
    ],
    "susije": [
      "insulinas"
    ],
    "saltinis": "JTS CPG „TBI Management in PFC“ (2023); JTS CPG ID 70 (2025)",
    "nuorodos": [
      [
        "JTS CPG „TBI Management in PFC“ (tccc.org.ua, 2023)",
        "https://tccc.org.ua/en/guide/traumatic-brain-injury-management-in-prolonged-field-care-pcc"
      ],
      [
        "JTS CPG „Nursing Interventions, Wound Care, and Splint Management in PCC“ (ID 70, 2025)",
        "https://jts.health.mil/assets/docs/cpgs/Nursing_Interventions_PCC_08_July_2025_ID70_v1.1.pdf"
      ]
    ]
  },
  {
    "id": "lidokainas",
    "name": "Lidokainas (vietinis)",
    "klase": "Vietinis anestetikas",
    "grupe": "kita",
    "lygis": "CMC",
    "tipas": "papild",
    "ne26": true,
    "kam": "CMC / CPP – žaizdų priežiūrai",
    "ind": "Vietinė nejautra žaizdų plovimui, tvarkymui ir siuvimui (JTS žaizdų PFC).",
    "kontra": "Alergija vietiniams anestetikams.",
    "dozes": [
      {
        "k": "Infiltracija (JTS PFC)",
        "d": "ne daugiau kaip 3 mg/kg (su adrenalinu – ne daugiau kaip 7 mg/kg)",
        "p": "80 kg – ne daugiau kaip 240 mg (24 ml 1 % tirpalo). Poveikis po 10–15 min. Su adrenalinu atsargiai: nosies galiukas, ausis, varpa, pirštai."
      }
    ],
    "ispejimai": [
      "Neviršyti didžiausios dozės – toksiškumas (traukuliai, aritmija)."
    ],
    "pakuote": "1 % (10 mg/ml) arba 2 % (20 mg/ml)",
    "saltinis": "JTS CPG „Acute Traumatic Wound Management in PFC“ (2023)",
    "nuorodos": [
      [
        "JTS CPG „Acute Traumatic Wound Management in PFC“ (tccc.org.ua, 2023)",
        "https://tccc.org.ua/en/guide/acute-traumatic-wound-management-prolonged-field-care-setting-pcc"
      ]
    ]
  },
  {
    "id": "naloksonas",
    "name": "Naloksonas",
    "klase": "Opioidų antagonistas",
    "grupe": "kita",
    "lygis": "CMC",
    "tipas": "pagr",
    "ne26": true,
    "kam": "Kovos medikas (CMC)",
    "ind": "Opioidų sukelta per gili sedacija ar kvėpavimo slopinimas (JTS PCC ID 91, JTS PFC analgezija).",
    "kontra": "Alergija.",
    "dozes": [
      {
        "k": "IV / IO – titruoti (JTS PCC ID 91)",
        "d": "po 40 mcg, kol atsistato kvėpavimas",
        "p": "0,4 mg praskiesti 9 ml 0,9 % NaCl = 40 mcg/ml; leisti po 1 ml lėtai, išlaikant nuskausminimą."
      }
    ],
    "ispejimai": [
      "Gali baigti veikti anksčiau nei opioidas – stebėti, ar slopinimas negrįžta.",
      "Per greitas atstatymas – stiprus skausmas, ažitacija (PCS: abstinencija, hipertenzija, aritmijos, plaučių edema)."
    ],
    "pakuote": "Ampulės 0,4 mg / 1 ml",
    "pastabos": [
      "Titravimas pasirinktas, nes PCC sužeistajam reikia išlaikyti nuskausminimą (JTS PCC ID 91; JTS PFC analgezijos B–C priedai).",
      "JTS PFC analgezijos D priedas: 0,4–2 mg IV / IM / IN, kartoti kas 2–3 min, iki 10 mg – tinka apnėjai ar kai nuskausminimas nesvarbus. Skiriasi nuo March gido: March – 0,4 mg."
    ],
    "susije": [
      "fentanilis",
      "ketaminas"
    ],
    "saltinis": "JTS CPG ID 91 (2021) – nuskausminimas ir sedacija; JTS CPG „Analgesia and Sedation Management during PFC“ (2023), B–D priedai; PCS (naloksonas)",
    "nuorodos": [
      [
        "JTS CPG „Prolonged Casualty Care Guidelines“ (ID 91, 2021)",
        "https://jts.health.mil/assets/docs/cpgs/prolonged_casualty_care_guidelines_21_dec_2021_id91.pdf"
      ],
      [
        "JTS CPG „Analgesia and Sedation Management during PFC“ (tccc.org.ua, 2023)",
        "https://tccc.org.ua/en/guide/analgesia-and-sedation-management-during-prolonged-field-care-pcc"
      ],
      [
        "PCS – naloksonas 400 mcg/ml (JK eMC)",
        "https://www.medicines.org.uk/emc/product/6589/smpc"
      ]
    ],
    "lt": {
      "p": [
        {
          "n": "FORVEL",
          "d": "0,4 mg/ml · ampulė 1 ml",
          "r": "Medochemie",
          "s": "T"
        }
      ],
      "ne": "Nyxoid 1,8 mg nosies purškalas – registruotas, netiekiamas",
      "pa": ""
    }
  }
];
