// PCC gidas – TRENIRUOČIŲ SCENARIJAI (tools.js SC). Kiekvienas atsakymas paremtas gido turiniu (ref – nuorodos į įgūdžius, sąrašus, vaistus, puslapius).
// Visi scenarijai – kariniai: uždelsta evakuacija dėl dronų, artilerijos, oro sąlygų, apsupties; Role 1 punktai, slėptuvės, bunkeriai.
// Laukai: id, pav, tema, lygis (CLS | CMC | CPP), q: [{sit, gp (gyvybės požymiai; „Laikas“ – nuo sužeidimo), klaus, opt: [{t, ok}], why, ref}].
window.ETC = window.ETC || {};

window.ETC.scenarijai = [
 {
  "id": "p1",
  "pav": "Kelias po dronų priežiūra",
  "tema": "Perėmimas",
  "lygis": "CMC",
  "q": [
   {
    "sit": "Kuopos medicinos punktas apkase. Atneštas karys po minosvaidžio sprogimo: turniketas ant kairės šlaunies uždėtas CUF metu ant uniformos prieš 1 val. 20 min. Evakuacijos kelią kontroliuoja priešo FPV dronai – evakuacija atidėta mažiausiai 6 val.",
    "gp": {
     "Laikas": "T+1 val. 20 min",
     "AVPU": "A",
     "ŠSD": "108",
     "AKS": "112/70",
     "SpO₂": "96 %",
     "KD": "18",
     "Skausmas": "7/10"
    },
    "klaus": "Ką darote pirmiausia, perimdami sužeistąjį?",
    "opt": [
     {
      "t": "Iš naujo patikrinate visas TCCC intervencijas pagal MARCH-PAWS",
      "ok": true
     },
     {
      "t": "Pradedate slaugos grafiką: vartymą ir burnos priežiūrą",
      "ok": false
     },
     {
      "t": "Pirmiausia skambinate telekonsultacijai ir laukiate nurodymų",
      "ok": false
     }
    ],
    "why": "„Padarei – patikrink dar kartą“: PCC prasideda nuo visų atliktų intervencijų patikros pagal MARCH-PAWS. Slaugos grafikas – vėliau; telekonsultacijos prašoma anksti, bet jos laukiant sužeistasis nepaliekamas be pakartotinio vertinimo.",
    "ref": [
     "#/igudis/1",
     "#/s/st-perimti"
    ]
   },
   {
    "sit": "MARCH patikra: kito kraujavimo nėra, šoko požymių nėra, šlaunies žaizda matoma ir ją galima stebėti, amputacijos nėra.",
    "gp": {
     "Laikas": "T+1 val. 30 min",
     "AVPU": "A",
     "ŠSD": "102",
     "AKS": "118/74",
     "Radialinis pulsas": "stiprus"
    },
    "klaus": "Ką darote su turniketu?",
    "opt": [
     {
      "t": "Paliekate iki evakuacijos – konvertuoti gali tik chirurgas Role 2",
      "ok": false
     },
     {
      "t": "Nuimate iš karto ir stebite, ar žaizda vėl nepradės kraujuoti",
      "ok": false
     },
     {
      "t": "Naujas ant odos virš žaizdos, tamponavimas, tada senąjį atleidžiate",
      "ok": true
     }
    ],
    "why": "Konversija – kuo anksčiau, < 2 val., jei nėra šoko, žaizdą galima stebėti ir tai ne amputacija. Pirmiausia uždedamas naujas turniketas ant odos 5–7,5 cm virš žaizdos, kraujavimas stabdomas kitais būdais, tik tada turniketas atleidžiamas ir paliekamas vietoje.",
    "ref": [
     "#/igudis/27",
     "#/s/v-galunes"
    ]
   },
   {
    "sit": "Konversija pavyko. Po 2 val. rodikliai stabilūs, sužeistasis kalba, geria. Evakuacija – po 10 val.",
    "gp": {
     "Laikas": "T+4 val.",
     "AVPU": "A",
     "ŠSD": "96",
     "AKS": "122/76",
     "SpO₂": "97 %",
     "KD": "16",
     "T": "36,4 °C"
    },
    "klaus": "Kaip dažnai matuojate gyvybinius rodiklius dabar?",
    "opt": [
     {
      "t": "Kas 4 val. – rimta, bet stabili būklė",
      "ok": true
     },
     {
      "t": "Kas 12 val. – būklė nekritinė",
      "ok": false
     },
     {
      "t": "Tik jei sužeistasis pasiskųs",
      "ok": false
     }
    ],
    "why": "JTS ID 70: kritinė – kas 15–30 min, kol stabilizuojasi; rimta, bet stabili – kas 4 val.; nekritinė – kas 12 val. Sužeistasis po turniketo konversijos su didele žaizda – rimtos būklės.",
    "ref": [
     "#/igudis/2",
     "#/p/stebejimas"
    ]
   }
  ]
 },
 {
  "id": "p2",
  "pav": "Rūkas ir gyvasis kraujo bankas",
  "tema": "Gaivinimas",
  "lygis": "CMC",
  "q": [
   {
    "sit": "Tirštas rūkas, sraigtasparniai neskraido; antžeminė evakuacija – po 8 val. Karys su penetruojančia pilvo žaizda (skeveldra). Šaltai laikyto kraujo nėra, bet būryje yra trys iš anksto ištirti O grupės mažo titro donorai.",
    "gp": {
     "Laikas": "T+40 min",
     "AVPU": "V",
     "ŠSD": "132",
     "AKS": "82/50",
     "Radialinis pulsas": "silpnas",
     "SpO₂": "94 %",
     "KD": "26"
    },
    "klaus": "Ką skiriate gaivinimui?",
    "opt": [
     {
      "t": "2 l kristaloidų, kol atsiras radialinis pulsas",
      "ok": false
     },
     {
      "t": "Šviežią pilną kraują iš ištirto O grupės donoro",
      "ok": true
     },
     {
      "t": "Nieko – laukiate evakuacijos, kad nesukeltumėte kraujavimo",
      "ok": false
     }
    ],
    "why": "Šoke – kraujas: kai nėra šaltai laikyto mažo titro O kraujo, kitas pasirinkimas – iš anksto ištirtų donorų šviežias kraujas. Kristaloidai – tik paskutinė išeitis, jie blogina koaguliopatiją.",
    "ref": [
     "#/igudis/7",
     "#/igudis/6",
     "#/p/gaivinimas"
    ]
   },
   {
    "sit": "Perpiltas pirmas vienetas. TXA 2 g suleistas prieš 20 min.",
    "gp": {
     "Laikas": "T+1 val. 20 min",
     "AVPU": "V",
     "ŠSD": "118",
     "AKS": "94/58",
     "Radialinis pulsas": "čiuopiamas"
    },
    "klaus": "Ką skiriate po pirmo kraujo vieneto?",
    "opt": [
     {
      "t": "Kalcio dar ne – tik po ketvirto vieneto",
      "ok": false
     },
     {
      "t": "Antrą TXA dozę 2 g lėtai IV",
      "ok": false
     },
     {
      "t": "30 ml 10 % kalcio gliukonato lėtai IV / IO",
      "ok": true
     }
    ],
    "why": "TCCC 2026: po pirmo kraujo vieneto – 1 g kalcio: 30 ml 10 % kalcio gliukonato (arba 10 ml 10 % kalcio chlorido), toliau – po kas 4 vienetų (JTS DCR PFC). TXA – viena 2 g dozė.",
    "ref": [
     "#/vaistas/kalcis",
     "#/s/st-gaivinimas"
    ]
   },
   {
    "sit": "Antram vienetui siūlomas donoras, kurio kariniame ženklelyje – A grupė. Sužeistojo ženklelyje – taip pat A. Laiko ir žmonių pakanka.",
    "gp": {},
    "klaus": "Kaip elgiatės?",
    "opt": [
     {
      "t": "Grupę patvirtinate Eldon kortele ir donorui, ir sužeistajam",
      "ok": true
     },
     {
      "t": "Ženkleliai sutampa – perpilate grupei tapatų kraują",
      "ok": false
     },
     {
      "t": "A grupės kraują perpilate tik po telekonsultacijos",
      "ok": false
     }
    ],
    "why": "Karinio ženklelio grupė klaidinga ~4 % atvejų – ja nesiremiama. Grupei tapatus kraujas – tik patvirtinus grupę Eldon kortele donorui ir gavėjui (geriausia – du žmonės, dvi kortelės). Chaose – O grupė visiems.",
    "ref": [
     "#/igudis/7",
     "#/p/gaivinimas"
    ]
   }
  ]
 },
 {
  "id": "p3",
  "pav": "Kada sustoti",
  "tema": "Gaivinimas",
  "lygis": "CMC",
  "q": [
   {
    "sit": "Po dviejų pilno kraujo vienetų ir kalcio sužeistasis su šlaunies ir sėdmens žaizdomis atsigavo. Kraujavimas suvaldytas. Svoris – 80 kg, kateteris įvestas.",
    "gp": {
     "Laikas": "T+3 val.",
     "AVPU": "A",
     "ŠSD": "98",
     "AKS": "106/68",
     "Radialinis pulsas": "stiprus",
     "Diurezė": "45 ml/val.",
     "T": "36,2 °C"
    },
    "klaus": "Ką darote su gaivinimu?",
    "opt": [
     {
      "t": "Perpilate dar vieną vienetą, kad būtų atsarga kelionei",
      "ok": false
     },
     {
      "t": "Tikslas pasiektas – nutraukiate, toliau palaikomieji ar gėrimas",
      "ok": true
     },
     {
      "t": "Tęsiate gaivinimą kristaloidais po 1 l kas valandą",
      "ok": false
     }
    ],
    "why": "Tikslai pasiekti: sAKS 100–110 mm Hg, radialinis pulsas, diurezė > 0,5 ml/kg/val. (80 kg – > 40 ml/val.). Pasiekus tikslą gaivinimas nutraukiamas; toliau – palaikomieji skysčiai ar gėrimas.",
    "ref": [
     "#/igudis/6",
     "#/igudis/9",
     "#/p/gaivinimas"
    ]
   },
   {
    "sit": "Po 3 val. būklė vėl blogėja; tvarsčiai sausi.",
    "gp": {
     "Laikas": "T+6 val.",
     "AVPU": "A",
     "ŠSD": "124",
     "AKS": "88/54",
     "Diurezė": "15 ml/val.",
     "T": "35,1 °C"
    },
    "klaus": "Kaip vertinate ir ką darote?",
    "opt": [
     {
      "t": "Reaguoja trumpam: ieškote kraujavimo, šildote, kartojate gaivinimą",
      "ok": true
     },
     {
      "t": "Nereaguoja į gaivinimą: tolesnis aktyvus gydymas beprasmis",
      "ok": false
     },
     {
      "t": "Tai dehidratacija: duodate gerti rehidratacijos tirpalo ir stebite",
      "ok": false
     }
    ],
    "why": "Pagerėjo ir vėl blogėja – „reaguoja trumpam“: ieškokite praleisto kraujavimo, hipotermijos ir acidozės, kartokite gaivinimą. T 35,1 °C – hipotermija blogina krešėjimą.",
    "ref": [
     "#/igudis/6",
     "#/igudis/31",
     "#/p/gaivinimas"
    ]
   },
   {
    "sit": "Rastas ir sustabdytas kraujavimas iš sėdmens. Kraujas baigėsi, donorų nebėra. Telekonsultacija rengiama.",
    "gp": {
     "Laikas": "T+7 val.",
     "AVPU": "V",
     "ŠSD": "138",
     "AKS": "72/40",
     "Radialinis pulsas": "nečiuopiamas"
    },
    "klaus": "Ką darote?",
    "opt": [
     {
      "t": "Noradrenalinas iš karto, kol bus telekonsultacija",
      "ok": false
     },
     {
      "t": "Kristaloidai mažais boliusais, kol atsiras radialinis pulsas",
      "ok": true
     },
     {
      "t": "Nieko neskiriate – kristaloidai draudžiami",
      "ok": false
     }
    ],
    "why": "Kristaloidai – paskutinė išeitis, bet jie tinka smarkiai nukraujavusiam, kai nėra radialinio pulso ir kraujo produktų (JTS DCR PFC). Vazopresorius – tik po kraujo ir kraujavimo kontrolės, pagal protokolą ar telekonsultaciją.",
    "ref": [
     "#/vaistas/kristaloidai",
     "#/igudis/6",
     "#/igudis/36"
    ]
   }
  ]
 },
 {
  "id": "p4",
  "pav": "Ambu maišas visą naktį",
  "tema": "Kvėpavimas",
  "lygis": "CMC",
  "q": [
   {
    "sit": "Sužeistajam dėl veido traumos atlikta krikotiroidotomija. Ventiliatoriaus nėra; yra ambu maišas, deguonies koncentratorius ir kapnografas. Evakuacija – rytą, po 9 val.",
    "gp": {
     "Laikas": "T+2 val.",
     "AVPU": "U",
     "ŠSD": "104",
     "AKS": "124/78",
     "SpO₂": "90 %",
     "KD": "12 (ventiliuojama)"
    },
    "klaus": "Ką būtinai prijungiate prie ambu maišo?",
    "opt": [
     {
      "t": "Antrą maišą atsargai",
      "ok": false
     },
     {
      "t": "Filtrą be deguonies",
      "ok": false
     },
     {
      "t": "PEEP vožtuvą ir deguonį",
      "ok": true
     }
    ],
    "why": "Minimalus PCC ventiliacijos standartas – PEEP vožtuvas ant kiekvieno ambu maišo; geriau – deguonies koncentratorius. Tikslas – SpO₂ ≥ 92 %.",
    "ref": [
     "#/igudis/12",
     "#/s/st-kvepavimas"
    ]
   },
   {
    "sit": "Ventiliuojantis karys stengiasi „padėti“ ir spaudžia maišą dažnai.",
    "gp": {
     "Laikas": "T+3 val.",
     "SpO₂": "97 %",
     "EtCO₂": "24 mm Hg",
     "KD": "26 (ventiliuojama)"
    },
    "klaus": "Ką pasakote ventiliuojančiam?",
    "opt": [
     {
      "t": "Viskas gerai – SpO₂ puikus",
      "ok": false
     },
     {
      "t": "Ventiliuoti lėčiau: tikslas EtCO₂ 35–45 mm Hg",
      "ok": true
     },
     {
      "t": "Ventiliuoti dar dažniau, kad SpO₂ būtų 100 %",
      "ok": false
     }
    ],
    "why": "EtCO₂ 24 mm Hg – hiperventiliacija: mažėja smegenų perfuzija. Tikslas – EtCO₂ 35–45 mm Hg (galvos trauma – 35–40), SpO₂ ≥ 92 %.",
    "ref": [
     "#/igudis/12",
     "#/p/kvepavimas"
    ]
   },
   {
    "sit": "Perkeliant neštuvus, staiga krenta SpO₂, išnyksta EtCO₂ kreivė, maišas spaudžiasi lengvai, girdisi oro nuotėkis prie kaklo.",
    "gp": {
     "Laikas": "T+5 val.",
     "SpO₂": "82 %",
     "EtCO₂": "kreivės nėra",
     "ŠSD": "128"
    },
    "klaus": "Kas labiausiai tikėtina?",
    "opt": [
     {
      "t": "Vamzdelis pasislinko iš trachėjos",
      "ok": true
     },
     {
      "t": "Išsivystė įtampos pneumotoraksas",
      "ok": false
     },
     {
      "t": "Sugedo deguonies koncentratorius",
      "ok": false
     }
    ],
    "why": "DOPE: išnykusi EtCO₂ kreivė, lengvas maišas ir oro nuotėkis po perkėlimo – vamzdelio pasislinkimas. Pneumotoraksui būdingas didėjantis pasipriešinimas, o deguonies trūkumas nepanaikintų EtCO₂ kreivės.",
    "ref": [
     "#/igudis/14",
     "#/igudis/13"
    ]
   }
  ]
 },
 {
  "id": "p5",
  "pav": "Ventiliatorius atvežtas",
  "tema": "Kvėpavimas",
  "lygis": "CPP",
  "q": [
   {
    "sit": "Naktį atgabentas portatyvus ventiliatorius. Intubuotas sužeistasis – 180 cm ūgio, apie 100 kg (numatomas kūno svoris ~75 kg).",
    "gp": {
     "Laikas": "T+8 val.",
     "SpO₂": "93 %",
     "EtCO₂": "41 mm Hg",
     "AKS": "118/72"
    },
    "klaus": "Koks pradinis kvėpavimo tūris?",
    "opt": [
     {
      "t": "800 ml – 8 ml/kg faktinio svorio",
      "ok": false
     },
     {
      "t": "450–600 ml – 6–8 ml/kg numatomo svorio",
      "ok": true
     },
     {
      "t": "1000 ml – kad būtų pakankamai deguonies",
      "ok": false
     }
    ],
    "why": "Kvėpavimo tūris – 6–8 ml/kg numatomo (pagal ūgį), ne faktinio svorio; pradėjus nuo 8 ml/kg – per 2 val. sumažinti iki 6. PEEP ≥ 5 cm H₂O.",
    "ref": [
     "#/igudis/13",
     "#/p/kvepavimas"
    ]
   },
   {
    "sit": "Po 2 val. – didelio slėgio signalas, krenta SpO₂ ir AKS, dešinėje kvėpavimas negirdimas, trachėja nepasislinkusi, vamzdelis vietoje.",
    "gp": {
     "Laikas": "T+10 val.",
     "SpO₂": "84 %",
     "AKS": "84/50",
     "ŠSD": "134"
    },
    "klaus": "Ką darote?",
    "opt": [
     {
      "t": "Didinate PEEP ir FiO₂, kad pakiltų SpO₂, ir stebite",
      "ok": false
     },
     {
      "t": "Didinate sedaciją – sužeistasis „kovoja“ su aparatu",
      "ok": false
     },
     {
      "t": "Atjungiate, ventiliuojate maišu, dekompresuojate dešinę pusę",
      "ok": true
     }
    ],
    "why": "DOPE – P: didėjantis slėgis, hipotenzija, vienpusis kvėpavimo garsų nebuvimas – įtampos pneumotoraksas. Atjungti, ventiliuoti maišu, dekompresuoti. Teigiamo slėgio ventiliacija pneumotoraksą greitina.",
    "ref": [
     "#/igudis/13",
     "#/s/y-dpv"
    ]
   },
   {
    "sit": "Ryte gausios išskyros vamzdelyje, SpO₂ pradėjo kristi.",
    "gp": {
     "Laikas": "T+16 val.",
     "SpO₂": "89 %",
     "EtCO₂": "46 mm Hg"
    },
    "klaus": "Kaip atsiurbiate vamzdelį?",
    "opt": [
     {
      "t": "Steriliai; prieš tai FiO₂ 100 %, siurbiate traukdami ≤ 15 s",
      "ok": true
     },
     {
      "t": "Švariai; siurbiate be pertraukų, kol išsiurbsite viską",
      "ok": false
     },
     {
      "t": "Steriliai; rutiniškai kas valandą, net jei išskyrų nėra",
      "ok": false
     }
    ],
    "why": "Atsiurbiama tik esant indikacijai, steriliai: prieš tai FiO₂ 100 % 30–60 s, siurbiama tik traukiant, ≤ 15 s, tarp kartų ≥ 30 s (JTS ID 70).",
    "ref": [
     "#/igudis/11"
    ]
   }
  ]
 },
 {
  "id": "p6",
  "pav": "Ketaminas ilgam laukimui",
  "tema": "Skausmas",
  "lygis": "CMC",
  "q": [
   {
    "sit": "Atviras blauzdos lūžis, įtvaras uždėtas. Evakuacija – po 12 val. dėl artilerijos ugnies. Sužeistasis negali tęsti užduoties; IV prieiga yra.",
    "gp": {
     "Laikas": "T+1 val.",
     "AVPU": "A",
     "ŠSD": "104",
     "AKS": "128/80",
     "KD": "18",
     "Skausmas": "8/10"
    },
    "klaus": "Ką darote prieš pirmą ketamino dozę?",
    "opt": [
     {
      "t": "Paaiškinate, kad skausmas praeis, ir laukiate",
      "ok": false
     },
     {
      "t": "Užrašote AVPU ir skausmą, sužeistąjį nuginkluojate",
      "ok": true
     },
     {
      "t": "Pirmiausia suleidžiate midazolamo nerimui mažinti",
      "ok": false
     }
    ],
    "why": "Prieš ketaminą – AVPU / GKS ir skausmas į lapą (vėliau atskirsite vaisto poveikį nuo blogėjimo) ir nuginklavimas. Benzodiazepinų kartu su ketaminu CMC lygiu neskirti (TCCC 2026).",
    "ref": [
     "#/igudis/16",
     "#/vaistas/ketaminas"
    ]
   },
   {
    "sit": "Turite ir IV prieigą, ir ketamino purškalą į nosį.",
    "gp": {
     "AVPU": "A",
     "Skausmas": "8/10"
    },
    "klaus": "Kaip skiriate ketaminą PCC metu?",
    "opt": [
     {
      "t": "Į nosį kas 15 min – patogiausia ilgam laukimui",
      "ok": false
     },
     {
      "t": "Į raumenis 100 mg kas 30 min, nes IV gali užsikimšti",
      "ok": false
     },
     {
      "t": "IV lėtai, titruodami ir kartodami pagal poreikį",
      "ok": true
     }
    ],
    "why": "JTS PFC: PCC metu pirmenybė IV / IO, į nosį – vengti; titruoti po mažiau, kartoti dažniau. TCCC 2026 IV dozė – 25 mg (0,2–0,3 mg/kg) lėtai, kartoti kas 30 min.",
    "ref": [
     "#/igudis/16",
     "#/vaistas/ketaminas"
    ]
   },
   {
    "sit": "Po trečios dozės per trumpą laiką sužeistasis sunkiai pažadinamas, kvėpuoja retai.",
    "gp": {
     "AVPU": "P",
     "KD": "8",
     "SpO₂": "86 %",
     "ŠSD": "92"
    },
    "klaus": "Ką darote?",
    "opt": [
     {
      "t": "Stabdote dozes, atveriate takus, ventiliuojate maišu",
      "ok": true
     },
     {
      "t": "Suleidžiate naloksono 0,4 mg IV ir stebite kvėpavimą",
      "ok": false
     },
     {
      "t": "Laukiate – ketaminas kvėpavimo beveik neslopina",
      "ok": false
     }
    ],
    "why": "KD < 10 ir krentantis SpO₂ – stabdyti, „uostymo“ padėtis, NPA, ventiliacija maišu. Naloksonas atstato opioidų, ne ketamino poveikį.",
    "ref": [
     "#/igudis/18",
     "#/igudis/16"
    ]
   }
  ]
 },
 {
  "id": "p7",
  "pav": "Ketamino infuzija",
  "tema": "Skausmas",
  "lygis": "CPP",
  "q": [
   {
    "sit": "Intubuotas sužeistasis (80 kg) po krikotiroidotomijos; evakuacija – po 20 val. Telekonsultacijos gydytojas rekomenduoja ketamino infuziją.",
    "gp": {
     "Laikas": "T+3 val.",
     "AKS": "126/78",
     "ŠSD": "108",
     "SpO₂": "95 %",
     "EtCO₂": "38 mm Hg"
    },
    "klaus": "Kaip ruošiate tirpalą?",
    "opt": [
     {
      "t": "750 mg ketamino į 250 ml 0,9 % NaCl (3 mg/ml)",
      "ok": true
     },
     {
      "t": "750 mg ketamino ir 10 mg midazolamo į vieną 250 ml maišą",
      "ok": false
     },
     {
      "t": "750 mg ketamino į 50 ml 0,9 % NaCl (15 mg/ml)",
      "ok": false
     }
    ],
    "why": "JTS PFC: 750 mg į 250 ml 0,9 % NaCl = 3 mg/ml. Viename maiše – tik vienas vaistas.",
    "ref": [
     "#/igudis/17",
     "#/vaistas/ketaminas"
    ]
   },
   {
    "sit": "Po prisotinamosios dozės (1 mg/kg) pradedate palaikomąją infuziją 1 mg/kg/val.",
    "gp": {
     "AKS": "124/76",
     "ŠSD": "100"
    },
    "klaus": "Koks greitis, kai tirpalas 3 mg/ml?",
    "opt": [
     {
      "t": "~8 ml/val.",
      "ok": false
     },
     {
      "t": "~80 ml/val.",
      "ok": false
     },
     {
      "t": "~27 ml/val.",
      "ok": true
     }
    ],
    "why": "80 kg × 1 mg/kg/val. = 80 mg/val.; 80 ÷ 3 mg/ml ≈ 27 ml/val. Greitis skaičiuojamas pagal maišo, ne ampulės koncentraciją.",
    "ref": [
     "#/igudis/17"
    ]
   },
   {
    "sit": "Infuzija veikia. Vertinate sedacijos gylį.",
    "gp": {
     "EtCO₂": "39 mm Hg",
     "AKS": "120/74"
    },
    "klaus": "Koks sedacijos tikslas intubuotam?",
    "opt": [
     {
      "t": "RASS 0 – budrus ir ramus",
      "ok": false
     },
     {
      "t": "Gili sedacija ir sinchronija su ventiliatoriumi",
      "ok": true
     },
     {
      "t": "Lengvas neramumas (RASS +1), kad matytumėte neurologiją",
      "ok": false
     }
    ],
    "why": "Intubuotam tikslas – išlaikyti kvėpavimo takų priemonę (gili sedacija), sinchronija su ventiliatoriumi ir stabilus AKS. Neintubuotam – ramus ir pažadinamas.",
    "ref": [
     "#/igudis/17",
     "#/p/skausmas"
    ]
   }
  ]
 },
 {
  "id": "p8",
  "pav": "Per gili sedacija",
  "tema": "Skausmas",
  "lygis": "CPP",
  "q": [
   {
    "sit": "Naktį budintis medikas pagal vieneto SOP suleido fentanilio, o kitas – midazolamo nerimui. Sužeistasis sunkiai pažadinamas.",
    "gp": {
     "AVPU": "P",
     "KD": "6",
     "SpO₂": "84 %",
     "EtCO₂": "62 mm Hg",
     "AKS": "96/60"
    },
    "klaus": "Ką darote pirmiausia?",
    "opt": [
     {
      "t": "Matuojate gliukozę ir laukiate rezultato",
      "ok": false
     },
     {
      "t": "Atveriate takus, NPA, ventiliuojate maišu su PEEP",
      "ok": true
     },
     {
      "t": "Suleidžiate dar midazolamo – jis neramus ir kovoja",
      "ok": false
     }
    ],
    "why": "Kvėpavimo slopinimas: KD < 10, krentantis SpO₂, EtCO₂ > 50. Pirmiausia – kvėpavimo takai ir ventiliacija. Opioidai ir benzodiazepinai stiprina vienas kitą.",
    "ref": [
     "#/igudis/18",
     "#/s/v-skausmas"
    ]
   },
   {
    "sit": "Ventiliuojant SpO₂ gerėja. Nusprendžiate skirti naloksono.",
    "gp": {
     "SpO₂": "93 %",
     "KD": "6 (savas)"
    },
    "klaus": "Kaip skiriate naloksoną?",
    "opt": [
     {
      "t": "Neskiriate – naloksonas atšauktų ir midazolamą",
      "ok": false
     },
     {
      "t": "Kartojate fentanilį mažesne doze nuo ažitacijos",
      "ok": false
     },
     {
      "t": "Praskiestą iki 40 mcg/ml – po 40 mcg IV iki kvėpavimo",
      "ok": true
     }
    ],
    "why": "JTS PCC (ID 91): 0,4 mg praskiesti 9 ml NaCl (40 mcg/ml) ir titruoti po 40 mcg, kol atsistato kvėpavimas, išlaikant nuskausminimą. Apnėjai JTS PFC leidžia ir 0,4–2 mg (iki 10 mg); March gide – 0,4 mg. Naloksonas midazolamo neatšaukia; opioido kartoti negalima.",
    "ref": [
     "#/vaistas/naloksonas",
     "#/igudis/18"
    ]
   },
   {
    "sit": "Po 120 mcg kvėpavimas atsistatė. Po 40 min vėl retėja.",
    "gp": {
     "KD": "9",
     "SpO₂": "90 %",
     "AVPU": "V"
    },
    "klaus": "Kodėl taip nutiko?",
    "opt": [
     {
      "t": "Naloksonas baigė veikti anksčiau nei opioidas",
      "ok": true
     },
     {
      "t": "Naloksonas sukėlė alerginę reakciją",
      "ok": false
     },
     {
      "t": "Midazolamas pradėjo veikti tik dabar",
      "ok": false
     }
    ],
    "why": "Naloksonas gali baigti veikti anksčiau nei opioidas – stebėkite ir kartokite po 40 mcg. Midazolamo poveikis prasideda per kelias minutes.",
    "ref": [
     "#/igudis/18",
     "#/vaistas/naloksonas"
    ]
   }
  ]
 },
 {
  "id": "p9",
  "pav": "Antra para slėptuvėje",
  "tema": "Slauga",
  "lygis": "CLS",
  "q": [
   {
    "sit": "Rūsyje įrengtas punktas. Be sąmonės sužeistasis su galvos trauma guli ant standžių neštuvų jau 30 val. Evakuacija vis atidedama.",
    "gp": {
     "Laikas": "T+30 val.",
     "AVPU": "U",
     "GKS": "7",
     "ŠSD": "88",
     "AKS": "132/80",
     "T": "36,8 °C"
    },
    "klaus": "Kaip dažnai jį vartote?",
    "opt": [
     {
      "t": "Kas 4 val. – kad netrukdytumėte",
      "ok": false
     },
     {
      "t": "Kas 1 val. – kietas paviršius",
      "ok": true
     },
     {
      "t": "Nevartote – be sąmonės sužeistojo nejudinti",
      "ok": false
     }
    ],
    "why": "JTS ID 70: vartyti kas 2 val., be sąmonės – kas 1–2 val., ant kieto paviršiaus – kas 1 val. Galvūgalis ~30°.",
    "ref": [
     "#/igudis/19",
     "#/s/p-slauga"
    ]
   },
   {
    "sit": "Vartydami pastebite ant kryžkaulio raudoną dėmę, kuri paspaudus nebalsta.",
    "gp": {},
    "klaus": "Ką darote?",
    "opt": [
     {
      "t": "Stipriai masažuojate, kad pagerėtų kraujotaka",
      "ok": false
     },
     {
      "t": "Nieko – gulint ant nugaros tai normalu",
      "ok": false
     },
     {
      "t": "Pažymite, atleidžiate spaudimą, paminkštinate",
      "ok": true
     }
    ],
    "why": "Neblykštantis paraudimas – pragulos pradžia: pažymėti, atleisti spaudimą ir papildomai paminkštinti. Masažas pažeistą odą žaloja dar labiau.",
    "ref": [
     "#/igudis/19"
    ]
   },
   {
    "sit": "Planuojate burnos ir akių priežiūrą.",
    "gp": {
     "AVPU": "U"
    },
    "klaus": "Kas teisinga be sąmonės sužeistajam?",
    "opt": [
     {
      "t": "Burna – ne rečiau kaip kas 4 val.; į akis lubrikanto želės nedėti",
      "ok": true
     },
     {
      "t": "Burna – kas 12 val.; akis patepti chirurginiu lubrikantu",
      "ok": false
     },
     {
      "t": "Burnos nevalyti – gali aspiruoti",
      "ok": false
     }
    ],
    "why": "Be sąmonės – burnos priežiūra ne rečiau kaip kas 4 val. (mažina pneumonijos riziką), siurbimas po ranka. Chirurginis lubrikantas (Surgilube) toksiškas ragenai.",
    "ref": [
     "#/igudis/20"
    ]
   }
  ]
 },
 {
  "id": "p10",
  "pav": "Troškulys ir tamsus šlapimas",
  "tema": "Slauga",
  "lygis": "CLS",
  "q": [
   {
    "sit": "Karys su sutvarstyta dilbio žaizda laukia evakuacijos 36 val. Sąmoningas, nevemia. Šlapinasi retai, šlapimo mažai.",
    "gp": {
     "Laikas": "T+36 val.",
     "AVPU": "A",
     "ŠSD": "108",
     "AKS": "118/74",
     "T": "37,4 °C"
    },
    "klaus": "Ką duodate gerti?",
    "opt": [
     {
      "t": "Kuo daugiau gryno vandens, kad greitai atsigautų",
      "ok": false
     },
     {
      "t": "Litrą vandens su ½ šaukštelio druskos ir 5–6 cukraus",
      "ok": true
     },
     {
      "t": "Nieko per burną – gerti galima tik po operacijos",
      "ok": false
     }
    ],
    "why": "JTS ID 70: tik vanduo dideliais kiekiais – hiponatremijos rizika; geriau – improvizuotas tirpalas, geriausia – ORS. Galintis nuryti ir nevemiantis turi gerti.",
    "ref": [
     "#/igudis/9",
     "#/igudis/23"
    ]
   },
   {
    "sit": "Sužeistasis sako, kad gers, „kai norės“.",
    "gp": {},
    "klaus": "Kiek ir kaip turėtų gerti?",
    "opt": [
     {
      "t": "Po 1 l iš karto kas 8 val.",
      "ok": false
     },
     {
      "t": "Tik tada, kai jaučia troškulį",
      "ok": false
     },
     {
      "t": "Nuolat gurkšniais, ~100–125 ml/val.",
      "ok": true
     }
    ],
    "why": "Poreikis ramybėje ~2,1–2,6 l per parą (~100–125 ml/val.); gerti skatinama nuolat, ne pagal fiksuotą intervalą. Sužeistasis pats prašo per retai.",
    "ref": [
     "#/igudis/23",
     "#/s/v-skysciai"
    ]
   },
   {
    "sit": "Yra sausų davinių (MRE).",
    "gp": {},
    "klaus": "Kaip maitinate?",
    "opt": [
     {
      "t": "Mažomis porcijomis kas 4–6 val.",
      "ok": true
     },
     {
      "t": "Vieną kartą per parą visą davinį",
      "ok": false
     },
     {
      "t": "Nemaitinate – užteks skysčių",
      "ok": false
     }
    ],
    "why": "JTS ID 70: maistas, baltymai ar papildai – kas 4–6 val., 5–6 mažesnės porcijos per dieną; tikslas – suvalgyti ≥ 50–75 % porcijos.",
    "ref": [
     "#/igudis/23"
    ]
   }
  ]
 },
 {
  "id": "p11",
  "pav": "Prieiga antrą parą",
  "tema": "Slauga",
  "lygis": "CMC",
  "q": [
   {
    "sit": "IO adata blauzdikaulyje įvesta prieš 26 val.; periferinis kateteris neveikia. Dabar vena randama.",
    "gp": {
     "Laikas": "T+26 val.",
     "AVPU": "A",
     "ŠSD": "96",
     "AKS": "120/76"
    },
    "klaus": "Ką darote su IO?",
    "opt": [
     {
      "t": "Paliekate – IO patikimesnė už veną",
      "ok": false
     },
     {
      "t": "Įvedate IV ir IO pašalinate",
      "ok": true
     },
     {
      "t": "Praplaunate ir paliekate dar parai",
      "ok": false
     }
    ],
    "why": "JTS ID 70: IO pašalinama po 24 val. (jei vena sunkiai randama – iki 48 val.). IO – laikina prieiga.",
    "ref": [
     "#/igudis/8"
    ]
   },
   {
    "sit": "Naujas IV kateteris kol kas nenaudojamas.",
    "gp": {},
    "klaus": "Kaip jį prižiūrite?",
    "opt": [
     {
      "t": "Plaunate tik prieš kitą vaistą",
      "ok": false
     },
     {
      "t": "Plaunate 0,9 % NaCl kas 4–8 val., ≥ 5 ml",
      "ok": true
     },
     {
      "t": "Kas 2 val. keičiate kateterį nauju",
      "ok": false
     }
    ],
    "why": "Nenaudojama prieiga plaunama 0,9 % NaCl: minimum kas 8 val., geriausia kas 4 val., ne mažiau kaip 2 kateterio tūriai (periferiniam ~5 ml). Periferinis keičiamas tik dėl infekcijos, užsikimšimo ar infiltracijos.",
    "ref": [
     "#/igudis/8",
     "#/s/p-slauga"
    ]
   },
   {
    "sit": "Kolega siūlo panaudoti likusį praskiestą vaistą švirkšte, ruoštą kitam sužeistajam.",
    "gp": {},
    "klaus": "Ką atsakote?",
    "opt": [
     {
      "t": "Galima, jei švirkštas paženklintas",
      "ok": false
     },
     {
      "t": "Galima, jei nepraėjo 24 val.",
      "ok": false
     },
     {
      "t": "Ne – pradėtas švirkštas tik vienam sužeistajam",
      "ok": true
     }
    ],
    "why": "Pradėti švirkštai – paženklinti (data, laikas), naudojami tik tam pačiam sužeistajam ir po 24 val. išmetami.",
    "ref": [
     "#/igudis/8",
     "#/igudis/30"
    ]
   }
  ]
 },
 {
  "id": "p12",
  "pav": "Kateteris ant neštuvų",
  "tema": "Slauga",
  "lygis": "CMC",
  "q": [
   {
    "sit": "Sužeistasis (80 kg) su kateteriu. Pastebite, kad šlapimo maišas guli jam ant pilvo.",
    "gp": {
     "Laikas": "T+10 val.",
     "AVPU": "A",
     "ŠSD": "102",
     "AKS": "110/70"
    },
    "klaus": "Kur turi būti maišas?",
    "opt": [
     {
      "t": "Žemiau šlapimo pūslės, be sulenkimų",
      "ok": true
     },
     {
      "t": "Ant pilvo – kad nuolat matytumėte",
      "ok": false
     },
     {
      "t": "Bet kur, jei sistema uždara ir sausa",
      "ok": false
     }
    ],
    "why": "Maišas laikomas žemiau šlapimo pūslės, vamzdelis be sulenkimų, pritvirtintas prie šlaunies – kitaip šlapimas teka atgal.",
    "ref": [
     "#/igudis/10"
    ]
   },
   {
    "sit": "Per paskutines 2 val. maiše – 30 ml šlapimo.",
    "gp": {
     "ŠSD": "116",
     "AKS": "98/62",
     "Diurezė": "15 ml/val."
    },
    "klaus": "Kaip vertinate?",
    "opt": [
     {
      "t": "Normalu – sužeistasis tiesiog mažai geria",
      "ok": false
     },
     {
      "t": "Kateteris nebereikalingas – jį išimate",
      "ok": false
     },
     {
      "t": "Per maža: tikrinate kateterį, perfuziją, skysčius",
      "ok": true
     }
    ],
    "why": "15 ml/val. ÷ 80 kg ≈ 0,19 ml/kg/val. – mažiau nei tikslas ~0,5 ml/kg/val. Tikrinkite kateterio praeinamumą, perfuziją (kraujavimas?) ir skysčius.",
    "ref": [
     "#/igudis/10",
     "#/igudis/6"
    ]
   },
   {
    "sit": "Planuojate kateterio priežiūrą.",
    "gp": {},
    "klaus": "Kaip dažnai?",
    "opt": [
     {
      "t": "Kartą per savaitę arba keičiant maišą",
      "ok": false
     },
     {
      "t": "Kas 24 val. ir po tuštinimosi",
      "ok": true
     },
     {
      "t": "Tik keičiant patį kateterį",
      "ok": false
     }
    ],
    "why": "JTS ID 70: kateterio priežiūra – ne rečiau kaip kas 24 val., po tuštinimosi ir kaupiantis išskyroms; maišas ištuštinamas kas 24 val. ar prisipildžius. Kateteris šalinamas kuo anksčiau.",
    "ref": [
     "#/igudis/10",
     "#/s/p-slauga"
    ]
   }
  ]
 },
 {
  "id": "p13",
  "pav": "Žaizda be sterilaus NaCl",
  "tema": "Žaizdos",
  "lygis": "CMC",
  "q": [
   {
    "sit": "Skeveldros žaizda šlaunyje (~10 cm), užteršta žemėmis, praėjo 30 val. Sterilaus NaCl nėra, yra švaraus geriamojo vandens ir galimybė virinti.",
    "gp": {
     "Laikas": "T+30 val.",
     "AVPU": "A",
     "T": "37,2 °C",
     "Skausmas": "5/10"
    },
    "klaus": "Kuo plaunate?",
    "opt": [
     {
      "t": "Švariu geriamuoju vandeniu",
      "ok": true
     },
     {
      "t": "Neplaunate – be sterilaus tirpalo užkrėsite",
      "ok": false
     },
     {
      "t": "Vandeniu su jodu ir alkoholiu",
      "ok": false
     }
    ],
    "why": "JTS žaizdų PFC: geriausia – sterilus NaCl ar vanduo; geriau – švarus geriamasis vanduo; minimum – virintas ≥ 3 min ir atvėsintas. Jodo, alkoholio priedai infekcijos nemažina.",
    "ref": [
     "#/igudis/25",
     "#/p/zaizdos"
    ]
   },
   {
    "sit": "Žaizda vidutinio dydžio, nešvari.",
    "gp": {},
    "klaus": "Kiek skysčio reikia?",
    "opt": [
     {
      "t": "~250 ml",
      "ok": false
     },
     {
      "t": "4–8 l",
      "ok": true
     },
     {
      "t": "≥ 20 l",
      "ok": false
     }
    ],
    "why": "Maža ar švari – 1–3 l; vidutinė ar nešvari – 4–8 l; didelė ar labai nešvari – ≥ 9 l.",
    "ref": [
     "#/igudis/25"
    ]
   },
   {
    "sit": "Po plovimo žaizdos kraštai gražūs. Kolega siūlo užsiūti.",
    "gp": {},
    "klaus": "Ką darote?",
    "opt": [
     {
      "t": "Užsiuvate – taip sumažės infekcijos rizika",
      "ok": false
     },
     {
      "t": "Sandariai suklijuojate odos juostelėmis",
      "ok": false
     },
     {
      "t": "Paliekate atvirą; užsiūti – po 3–7 d., jei švari",
      "ok": true
     }
    ],
    "why": "Lauko žaizdos su audinių netekimu ir dūrinės paliekamos atviros; abejojant – atvira. Uždelstas užsiuvimas – po 3–7 d., jei nėra infekcijos.",
    "ref": [
     "#/igudis/25",
     "#/s/p-zaizdos"
    ]
   }
  ]
 },
 {
  "id": "p14",
  "pav": "Trečios paros karščiavimas",
  "tema": "Žaizdos",
  "lygis": "CMC",
  "q": [
   {
    "sit": "Trečia para. Blauzdos žaizda parausta, paraudimas plinta, tvarstyje – pūliai. Sužeistasis karščiuoja, apatiškas.",
    "gp": {
     "Laikas": "T+62 val.",
     "AVPU": "V",
     "ŠSD": "118",
     "AKS": "102/64",
     "T": "38,9 °C",
     "KD": "24"
    },
    "klaus": "Kaip vertinate?",
    "opt": [
     {
      "t": "Normali gijimo reakcija trečią parą",
      "ok": false
     },
     {
      "t": "Infekcija su sisteminiais požymiais",
      "ok": true
     },
     {
      "t": "Alergija tvarsčiui ar antibiotikui",
      "ok": false
     }
    ],
    "why": "Vietiniai (paraudimas, pūliai) ir sisteminiai (karščiavimas, tachikardija, sumišimas) požymiai – infekcija, galimas sepsis.",
    "ref": [
     "#/igudis/29",
     "#/s/p-infekcija"
    ]
   },
   {
    "sit": "Sužeistasis vartoja cefadroksilį 1 g kartą per parą.",
    "gp": {},
    "klaus": "Ką darote?",
    "opt": [
     {
      "t": "Dvigubinate cefadroksilio dozę ir stebite parą",
      "ok": false
     },
     {
      "t": "Nutraukiate antibiotiką, kad pamatytumėte eigą",
      "ok": false
     },
     {
      "t": "Atveriate, išplaunate; antibiotiką parenka gydytojas",
      "ok": true
     }
    ],
    "why": "Įtarus infekciją – žaizdą atverti, išplauti, telekonsultacija. Antibiotiką ir trukmę parenka gydytojas (pvz., ertapenemas 1 g IV kartą per parą, 7–10 d.).",
    "ref": [
     "#/igudis/29",
     "#/vaistas/ertapenemas",
     "#/igudis/36"
    ]
   },
   {
    "sit": "Ruošiate telekonsultaciją.",
    "gp": {
     "ŠSD": "124",
     "AKS": "96/60"
    },
    "klaus": "Kokia telekonsultacijos skuba?",
    "opt": [
     {
      "t": "Įprasta – atsakymo galima laukti 24 val.",
      "ok": false
     },
     {
      "t": "Neatidėliotina – sepsis, šoko indeksas > 1",
      "ok": true
     },
     {
      "t": "Nereikia – užteks antibiotiko",
      "ok": false
     }
    ],
    "why": "Šoko indeksas 124 ÷ 96 ≈ 1,3 > 1 ir sepsio požymiai – neatidėliotina telekonsultacija; evakuacijos skubumą peržiūrėkite.",
    "ref": [
     "#/igudis/36",
     "#/p/tele"
    ]
   }
  ]
 },
 {
  "id": "p15",
  "pav": "Turniketas keturias valandas",
  "tema": "Žaizdos",
  "lygis": "CPP",
  "q": [
   {
    "sit": "Turniketas ant blauzdos – 4 val. (uždėtas CUF metu). Evakuaciją trukdo artilerija. Šoko nėra, žaizdą galima stebėti, ne amputacija.",
    "gp": {
     "Laikas": "T+4 val.",
     "AVPU": "A",
     "ŠSD": "98",
     "AKS": "124/78"
    },
    "klaus": "Ką darote?",
    "opt": [
     {
      "t": "Nuimate iš karto – kuo greičiau, tuo daugiau galūnei naudos",
      "ok": false
     },
     {
      "t": "Svarstote konversiją, paruošę kalcį, insuliną ir EKG",
      "ok": true
     },
     {
      "t": "Neliečiate – po 2 val. konversija visada draudžiama",
      "ok": false
     }
    ],
    "why": "Po 2 val. konversiją galima svarstyti (2–6 val.), bet reperfuzija gali sukelti hiperkalemiją – iš anksto paruoškite kalcį, insuliną su gliukoze, EKG ir konsultuokitės. > 6 val. – nenuimti.",
    "ref": [
     "#/igudis/27",
     "#/igudis/35"
    ]
   },
   {
    "sit": "Atleidus turniketą, po 10 min EKG keičiasi.",
    "gp": {
     "ŠSD": "50",
     "AKS": "104/66",
     "EKG": "smailūs T, platėjantis QRS"
    },
    "klaus": "Ką skiriate pirmiausia?",
    "opt": [
     {
      "t": "10 ml 10 % kalcio gliukonato IV per 2–3 min",
      "ok": true
     },
     {
      "t": "1 l kristaloidų greita srove",
      "ok": false
     },
     {
      "t": "Atropiną 1 mg IV dėl bradikardijos",
      "ok": false
     }
    ],
    "why": "Hiperkalemija su EKG pokyčiais – pirmiausia kalcis: JTS Crush PFC – 10 ml 10 % kalcio gliukonato per 2–3 min, kartoti pagal poreikį (poveikis iš karto, trunka 30–60 min). ETC gide hiperkalemijai – 30 ml.",
    "ref": [
     "#/vaistas/kalcis",
     "#/s/y-crush"
    ]
   },
   {
    "sit": "Po kalcio EKG kiek pagerėjo. Telekonsultacijos gydytojas nurodo mažinti kalį.",
    "gp": {
     "ŠSD": "62",
     "EKG": "smailūs T"
    },
    "klaus": "Ką skiriate?",
    "opt": [
     {
      "t": "20 VV insulino be gliukozės",
      "ok": false
     },
     {
      "t": "10 VV insulino be gliukozės, gliukozę – tik jei krenta",
      "ok": false
     },
     {
      "t": "10 VV paprasto insulino ir iš karto 50 ml 50 % gliukozės",
      "ok": true
     }
    ],
    "why": "JTS Crush PFC: 10 VV paprasto insulino, iš karto po to 25 g gliukozės (50 ml 50 %); poveikis po ~20 min, trunka 4–6 val. Gliukozę stebėti – hipoglikemijos rizika.",
    "ref": [
     "#/vaistas/insulinas",
     "#/igudis/35"
    ]
   }
  ]
 },
 {
  "id": "p16",
  "pav": "Įtvaras ir didėjantis skausmas",
  "tema": "Žaizdos",
  "lygis": "CLS",
  "q": [
   {
    "sit": "Blauzdikaulio lūžis įtvertas prieš 14 val. Skausmas didėja nepaisant ketamino; labai skauda judinant pirštus pasyviai. Distalinis pulsas čiuopiamas.",
    "gp": {
     "Laikas": "T+14 val.",
     "AVPU": "A",
     "ŠSD": "112",
     "Skausmas": "9/10"
    },
    "klaus": "Ką įtariate?",
    "opt": [
     {
      "t": "Kompartmento sindromą",
      "ok": true
     },
     {
      "t": "Įprastą lūžio skausmą – pulsas juk yra",
      "ok": false
     },
     {
      "t": "Pripratimą prie ketamino",
      "ok": false
     }
    ],
    "why": "Pirmasis kompartmento sindromo požymis – skausmas, ypač didėjantis ar judinant pasyviai. Pulsas išnyksta vėlai – jo buvimas sindromo neatmeta.",
    "ref": [
     "#/igudis/28",
     "#/s/v-galunes"
    ]
   },
   {
    "sit": "Įtvaras atrodo užveržtas – koja patinusi.",
    "gp": {},
    "klaus": "Ką darote?",
    "opt": [
     {
      "t": "Didinate ketamino dozę ir vertinate po 30 min",
      "ok": false
     },
     {
      "t": "Atlaisvinate įtvarą; neišnyksta – nuimate, telekonsultacija",
      "ok": true
     },
     {
      "t": "Pakeliate koją aukštai ir uždedate ledo paketų",
      "ok": false
     }
    ],
    "why": "JTS ID 70: atlaisvinti ar pataisyti įtvarą ir vertinti; simptomai išlieka – įtvarą nuimti ir kreiptis į aukštesnio lygio mediką. Fasciotomija – tik apmokytam, su telekonsultacija.",
    "ref": [
     "#/igudis/28"
    ]
   },
   {
    "sit": "Laukiant konsultacijos koja karšta ir patinusi.",
    "gp": {},
    "klaus": "Kaip vėsinate?",
    "opt": [
     {
      "t": "Garinimu ar aplinkos oru, ne ledu ar sniegu",
      "ok": true
     },
     {
      "t": "Sniegu tiesiai ant odos",
      "ok": false
     },
     {
      "t": "Šaldymo paketais 2 val. be pertraukos",
      "ok": false
     }
    ],
    "why": "JTS Crush PFC: galūnė vėsinama garinimu ar aplinka; ledo ir sniego nenaudoti.",
    "ref": [
     "#/igudis/28",
     "#/igudis/35"
    ]
   }
  ]
 },
 {
  "id": "p17",
  "pav": "Galva po FPV drono",
  "tema": "Galva",
  "lygis": "CMC",
  "q": [
   {
    "sit": "FPV dronas sprogo prie apkaso. Karys su galvos trauma, GKS 11. Evakuacija – po 10 val., kelias stebimas.",
    "gp": {
     "Laikas": "T+1 val.",
     "AVPU": "V",
     "GKS": "11",
     "ŠSD": "92",
     "AKS": "104/66",
     "SpO₂": "91 %",
     "KD": "16"
    },
    "klaus": "Kurie tikslai teisingi PCC metu?",
    "opt": [
     {
      "t": "SpO₂ > 85 %, sAKS > 80 mm Hg",
      "ok": false
     },
     {
      "t": "SpO₂ ≥ 92 %, sAKS > 110 mm Hg",
      "ok": true
     },
     {
      "t": "SpO₂ 100 %, sAKS > 160 mm Hg",
      "ok": false
     }
    ],
    "why": "Galvos trauma PCC metu: sAKS > 110 mm Hg (JTS TBI PFC; TCCC 2026 – > 100), SpO₂ ≥ 92 % (TCCC 2026; JTS – > 90 %, ventiliuojamam > 95 %), ventiliuojamam EtCO₂ 35–40 mm Hg. SpO₂ 91 % ir sAKS 104 – žemiau tikslo.",
    "ref": [
     "#/igudis/32",
     "#/s/y-galva"
    ]
   },
   {
    "sit": "Deguonis ir skysčiai pagerino rodiklius.",
    "gp": {
     "GKS": "11",
     "SpO₂": "96 %",
     "AKS": "118/74"
    },
    "klaus": "Kaip dažnai tikrinate GKS ir vyzdžius?",
    "opt": [
     {
      "t": "Kartą per pamainą",
      "ok": false
     },
     {
      "t": "Tik jei pasikeis elgesys",
      "ok": false
     },
     {
      "t": "Ne rečiau kaip kas valandą",
      "ok": true
     }
    ],
    "why": "JTS: GKS ir vyzdžiai – ne rečiau kaip kas valandą ir prieš kiekvieną sedaciją; užrašyti į lapą.",
    "ref": [
     "#/igudis/32",
     "#/igudis/3"
    ]
   },
   {
    "sit": "Šoko nėra, stuburo trauma neįtariama.",
    "gp": {},
    "klaus": "Kaip paguldote?",
    "opt": [
     {
      "t": "Plokščiai, kojos pakeltos",
      "ok": false
     },
     {
      "t": "Galvūgalis 30–60°, kaklas tiesiai",
      "ok": true
     },
     {
      "t": "Ant pilvo, galva nuleista",
      "ok": false
     }
    ],
    "why": "Minimalios intrakranijinio spaudimo priemonės: galvūgalis 30–60° (jei nėra šoko), kaklas tiesiai, kontroliuojami skausmas, nerimas, karščiavimas.",
    "ref": [
     "#/igudis/32",
     "#/p/galva"
    ]
   }
  ]
 },
 {
  "id": "p18",
  "pav": "Išsiplėtęs vyzdys",
  "tema": "Galva",
  "lygis": "CMC",
  "q": [
   {
    "sit": "Šeštą valandą sužeistojo GKS krito nuo 11 iki 7, dešinysis vyzdys išsiplėtęs ir nereaguoja. Atvykęs gydytojas jį intubavo, ventiliuojama maišu.",
    "gp": {
     "Laikas": "T+6 val.",
     "GKS": "7",
     "ŠSD": "52",
     "AKS": "168/92",
     "SpO₂": "96 %",
     "EtCO₂": "38 mm Hg"
    },
    "klaus": "Ką skiriate?",
    "opt": [
     {
      "t": "250 ml 3 % NaCl per ≥ 10 min",
      "ok": true
     },
     {
      "t": "1 l 0,9 % NaCl greita srove",
      "ok": false
     },
     {
      "t": "Didinate sedaciją ir laukiate",
      "ok": false
     }
    ],
    "why": "Išvaržos požymiai (vienpusis išsiplėtęs vyzdys, Cushing triada – bradikardija ir hipertenzija) – hipertoninis NaCl 250 ml 3 % ar 5 % per ≥ 10 min (TCCC 2026).",
    "ref": [
     "#/vaistas/nacl-hipert",
     "#/igudis/32"
    ]
   },
   {
    "sit": "Laukiant poveikio, ventiliuojamas sužeistasis.",
    "gp": {
     "EtCO₂": "38 mm Hg"
    },
    "klaus": "Ką darote su ventiliacija?",
    "opt": [
     {
      "t": "EtCO₂ 20 mm Hg kelias valandas",
      "ok": false
     },
     {
      "t": "Nekeičiate – hiperventiliacija draudžiama visada",
      "ok": false
     },
     {
      "t": "Laikinai iki EtCO₂ 30 mm Hg ne ilgiau kaip 20 min",
      "ok": true
     }
    ],
    "why": "JTS TBI PFC: gresiant išvaržai – laikinai hiperventiliuoti iki EtCO₂ 30 mm Hg ne ilgiau kaip 20 min ir skubiai konsultuotis. Ilga hiperventiliacija sukelia smegenų išemiją.",
    "ref": [
     "#/igudis/32",
     "#/p/galva"
    ]
   },
   {
    "sit": "Po NaCl vyzdys kiek susiaurėjo.",
    "gp": {
     "GKS": "8",
     "ŠSD": "64",
     "AKS": "150/88"
    },
    "klaus": "Kas toliau?",
    "opt": [
     {
      "t": "Skubi telekonsultacija ir didesnis evakuacijos skubumas",
      "ok": true
     },
     {
      "t": "Tęsiate kaip anksčiau – būklė jau gerėja",
      "ok": false
     },
     {
      "t": "Kartojate NaCl kas 20 min, kol vyzdžiai susilygins",
      "ok": false
     }
    ],
    "why": "Galvos traumos blogėjimas – didinti evakuacijos skubumą ir konsultuotis su neurochirurgu. TCCC 2026 – ne daugiau kaip 2 dozės; daugiau – tik po telekonsultacijos.",
    "ref": [
     "#/igudis/36",
     "#/vaistas/nacl-hipert"
    ]
   }
  ]
 },
 {
  "id": "p19",
  "pav": "Traukuliai punkte",
  "tema": "Galva",
  "lygis": "CPP",
  "q": [
   {
    "sit": "Sužeistajam su galvos trauma prasidėjo generalizuoti traukuliai. IV prieiga yra.",
    "gp": {
     "Laikas": "T+9 val.",
     "AVPU": "U",
     "ŠSD": "128",
     "AKS": "146/88",
     "SpO₂": "90 %"
    },
    "klaus": "Ką skiriate?",
    "opt": [
     {
      "t": "Levetiracetamą 2000 mg IV greita injekcija",
      "ok": false
     },
     {
      "t": "Midazolamą 5 mg IV, kas 5 min, kol liausis",
      "ok": true
     },
     {
      "t": "Ketaminą 100 mg IM ir stebite 30 min",
      "ok": false
     }
    ],
    "why": "JTS TBI PFC: traukuliai – midazolamas 5 mg IV / IO / IM kas 5 min, kol liausis. Kvėpavimo takai ir deguonis – kartu.",
    "ref": [
     "#/vaistas/midazolamas",
     "#/igudis/32"
    ]
   },
   {
    "sit": "Traukuliai liovėsi po antros dozės.",
    "gp": {
     "AVPU": "P",
     "SpO₂": "95 %"
    },
    "klaus": "Ko reikia toliau (gydytojo sprendimu)?",
    "opt": [
     {
      "t": "Levetiracetamas 2000 mg per 15 min, po to 500 mg kas 12 val.",
      "ok": true
     },
     {
      "t": "Midazolamas 5 mg kas valandą profilaktiškai",
      "ok": false
     },
     {
      "t": "Nieko – traukuliai liovėsi",
      "ok": false
     }
    ],
    "why": "Geriausia (JTS TBI PFC): po midazolamo – palaikomasis levetiracetamas 2000 mg IV / IO per 15 min, toliau 500 mg kas 12 val.",
    "ref": [
     "#/vaistas/levetiracetamas"
    ]
   },
   {
    "sit": "Gliukozė po traukulių – 4,8 mmol/l.",
    "gp": {
     "Gliukozė": "4,8 mmol/l"
    },
    "klaus": "Ką darote?",
    "opt": [
     {
      "t": "Nieko – tai normali gliukozė",
      "ok": false
     },
     {
      "t": "Insulino 10 VV ir matuojate po valandos",
      "ok": false
     },
     {
      "t": "25 g gliukozės IV, po valandos – matavimas",
      "ok": true
     }
    ],
    "why": "JTS TBI PFC: tikslas ~10 mmol/l; < 5,6 mmol/l – 20 g per burną arba 25 g IV / IO, po valandos pakartoti.",
    "ref": [
     "#/vaistas/gliukoze",
     "#/s/y-galva"
    ]
   }
  ]
 },
 {
  "id": "p20",
  "pav": "Degęs šarvuotis",
  "tema": "Nudegimai",
  "lygis": "CMC",
  "q": [
   {
    "sit": "Ištrauktas iš degusio šarvuočio vairuotojas (90 kg). Nudegimai: I laipsnio veidas, II–III laipsnio abi kojos priekiu ir krūtinė.",
    "gp": {
     "Laikas": "T+30 min",
     "AVPU": "A",
     "ŠSD": "118",
     "AKS": "128/82",
     "SpO₂": "96 %",
     "Skausmas": "9/10"
    },
    "klaus": "Kokius nudegimus skaičiuojate plotui?",
    "opt": [
     {
      "t": "Visus, įskaitant I laipsnio veidą",
      "ok": false
     },
     {
      "t": "Tik III laipsnio",
      "ok": false
     },
     {
      "t": "Tik II ir III laipsnio",
      "ok": true
     }
    ],
    "why": "Plotas – tik II ir III laipsnio nudegimai; I laipsnio neskaičiuojamas (per daug skysčių). Klaida > 10 % žalinga abiem kryptimis.",
    "ref": [
     "#/igudis/33",
     "#/p/nudegimai"
    ]
   },
   {
    "sit": "Plotas – 30 % KPP. Evakuacija – ne anksčiau kaip po 12 val.",
    "gp": {
     "ŠSD": "116",
     "AKS": "124/80"
    },
    "klaus": "Koks pradinis skysčių greitis?",
    "opt": [
     {
      "t": "400 ml/val.",
      "ok": true
     },
     {
      "t": "300 ml/val.",
      "ok": false
     },
     {
      "t": "1000 ml/val.",
      "ok": false
     }
    ],
    "why": "10 taisyklė: 30 % × 10 = 300 ml/val.; 90 kg – 10 kg virš 80, todėl +100 ml/val. = 400 ml/val. Boliusas – tik esant hipotenzijai.",
    "ref": [
     "#/igudis/33",
     "#/vaistas/kristaloidai"
    ]
   },
   {
    "sit": "Po 2 val. diurezė maža.",
    "gp": {
     "Laikas": "T+3 val.",
     "ŠSD": "124",
     "AKS": "112/70",
     "Diurezė": "18 ml/val."
    },
    "klaus": "Ką darote?",
    "opt": [
     {
      "t": "Greitį mažinate – bus edema",
      "ok": false
     },
     {
      "t": "Greitį didinate 25 %",
      "ok": true
     },
     {
      "t": "Duodate 2 l boliusą",
      "ok": false
     }
    ],
    "why": "Tikslas – 30–50 ml/val.; greitis keičiamas ±25 % kas 1–2 val. (400 → 500 ml/val.). Boliusas – tik esant hipotenzijai.",
    "ref": [
     "#/igudis/33",
     "#/igudis/10"
    ]
   }
  ]
 },
 {
  "id": "p21",
  "pav": "Žiedinis nudegimas",
  "tema": "Nudegimai",
  "lygis": "CPP",
  "q": [
   {
    "sit": "Viso dilbio žiedinis gilus (III laipsnio) nudegimas. Per 6 val. radialinis pulsas silpnėjo, dabar beveik nečiuopiamas. Evakuacija – po 18 val. dėl oro sąlygų.",
    "gp": {
     "Laikas": "T+7 val.",
     "AVPU": "A",
     "ŠSD": "108",
     "AKS": "122/76",
     "Radialinis pulsas": "silpnas (dešinėje)"
    },
    "klaus": "Ko reikia?",
    "opt": [
     {
      "t": "Eskarotomijos – geriausia su telekonsultacija",
      "ok": true
     },
     {
      "t": "Laukti evakuacijos – pulsas dar čiuopiamas",
      "ok": false
     },
     {
      "t": "Stipriau sutvarstyti, kad sumažėtų tinimas",
      "ok": false
     }
    ],
    "why": "JTS nudegimų PFC: galūnės eskarotomija – esant žiediniam giliam nudegimui su silpnėjančiu ar išnykusiu distaliniu pulsu, kai evakuacija vėluoja. Atlieka apmokytas, geriausia su telekonsultacija.",
    "ref": [
     "#/igudis/34",
     "#/s/y-nudegimai"
    ]
   },
   {
    "sit": "Ruošiatės procedūrai.",
    "gp": {},
    "klaus": "Kas būtina prieš pjūvį?",
    "opt": [
     {
      "t": "Tik sterilios pirštinės – nudegęs audinys neskauda",
      "ok": false
     },
     {
      "t": "Turniketas virš nudegimo visai procedūrai",
      "ok": false
     },
     {
      "t": "Nuskausminimas ir sedacija, hemostatiniai tvarsčiai – bus kraujavimas",
      "ok": true
     }
    ],
    "why": "Tikėkitės kraujavimo ir skausmo: nuskausminimas ir sedacija, sterilus rinkinys, hemostatiniai tvarsčiai. Pjūvis – per nudegusį audinį iki riebalų.",
    "ref": [
     "#/igudis/34",
     "#/igudis/17"
    ]
   },
   {
    "sit": "Kolega klausia, ar skirti antibiotiką profilaktiškai. Kitų žaizdų nėra.",
    "gp": {},
    "klaus": "Ką atsakote?",
    "opt": [
     {
      "t": "Taip, visiems nudegusiems po eskarotomijos",
      "ok": false
     },
     {
      "t": "Nereikia, nebent yra kitų atvirų žaizdų",
      "ok": true
     },
     {
      "t": "Tik jei nudegimo plotas didesnis nei 10 %",
      "ok": false
     }
    ],
    "why": "JTS nudegimų PFC: profilaktinių antibiotikų nereikia, nebent yra kitų atvirų žaizdų (pvz., atvirų lūžių).",
    "ref": [
     "#/igudis/33"
    ]
   }
  ]
 },
 {
  "id": "p22",
  "pav": "Dūmai bunkeryje",
  "tema": "Nudegimai",
  "lygis": "CPP",
  "q": [
   {
    "sit": "Po termobarinio smūgio bunkeryje – karys su 45 % nudegimais. Apdegę nosies plaukai, užkimęs balsas, suodžiai burnoje.",
    "gp": {
     "Laikas": "T+40 min",
     "AVPU": "A",
     "ŠSD": "124",
     "AKS": "118/74",
     "SpO₂": "91 %",
     "KD": "28"
    },
    "klaus": "Kaip užtikrinate kvėpavimo takus?",
    "opt": [
     {
      "t": "Supraglotine priemone – greičiau",
      "ok": false
     },
     {
      "t": "Laukiate, kol pablogės",
      "ok": false
     },
     {
      "t": "Anksti intubuojate (CPP)",
      "ok": true
     }
    ],
    "why": "JTS nudegimų PFC: sunki įkvėpimo trauma ir > 40 % – intubacija; supraglotinės priemonės netinka. Minimum – krikotiroidotomija, ketaminas, maišas su PEEP.",
    "ref": [
     "#/igudis/33",
     "#/s/y-nudegimai"
    ]
   },
   {
    "sit": "Intubuota. Veidas nudegęs.",
    "gp": {},
    "klaus": "Kaip tvirtinate vamzdelį?",
    "opt": [
     {
      "t": "Lipnia juostele per skruostus",
      "ok": false
     },
     {
      "t": "Medvilnine juosta",
      "ok": true
     },
     {
      "t": "Nereikia – manžetė laiko",
      "ok": false
     }
    ],
    "why": "Nudegusiam veidui – medvilninė juosta, ne lipni juostelė.",
    "ref": [
     "#/igudis/14"
    ]
   },
   {
    "sit": "Vamzdelyje kaupiasi suodžių išskyros.",
    "gp": {
     "SpO₂": "93 %",
     "EtCO₂": "44 mm Hg"
    },
    "klaus": "Kaip dažnai atsiurbiate?",
    "opt": [
     {
      "t": "Maždaug kas valandą, su 3–5 ml NaCl",
      "ok": true
     },
     {
      "t": "Kartą per parą",
      "ok": false
     },
     {
      "t": "Niekada – pažeisite gleivinę",
      "ok": false
     }
    ],
    "why": "JTS nudegimų PFC: esant įkvėpimo traumai, atsiurbti maždaug kas valandą, įlašinant 3–5 ml NaCl. Kylantis EtCO₂ – galimas vamzdelio užsikimšimas.",
    "ref": [
     "#/igudis/11"
    ]
   }
  ]
 },
 {
  "id": "p23",
  "pav": "Sugriuvęs pastatas",
  "tema": "Suspaudimas",
  "lygis": "CMC",
  "q": [
   {
    "sit": "Dronas pataikė į pastatą. Kario koja prispausta betono plokšte jau 3 val. Išlaisvinti pavyks po 30 min. IV prieiga yra.",
    "gp": {
     "Laikas": "T+3 val.",
     "AVPU": "A",
     "ŠSD": "110",
     "AKS": "116/72",
     "Skausmas": "8/10"
    },
    "klaus": "Ką darote prieš išlaisvinimą?",
    "opt": [
     {
      "t": "Laikotės hipotenzinio gaivinimo – skysčių neduodate",
      "ok": false
     },
     {
      "t": "Skysčius pradėsite tik išlaisvinus",
      "ok": false
     },
     {
      "t": "2 l kristaloidų boliusas, toliau 1 l/val.",
      "ok": true
     }
    ],
    "why": "JTS Crush PFC: TCCC hipotenzinio gaivinimo principas suspaudimo atveju netaikomas (jei nėra nesustabdomo kraujavimo). Prieš išlaisvinimą – 2 l boliusas, toliau 1 l/val.",
    "ref": [
     "#/igudis/35",
     "#/vaistas/kristaloidai"
    ]
   },
   {
    "sit": "Išlaisvinta. Įvestas kateteris.",
    "gp": {
     "Laikas": "T+4 val.",
     "ŠSD": "104",
     "AKS": "120/76"
    },
    "klaus": "Koks diurezės tikslas?",
    "opt": [
     {
      "t": "100–200 ml/val.",
      "ok": true
     },
     {
      "t": "0,5 ml/kg/val.",
      "ok": false
     },
     {
      "t": "30–50 ml/val.",
      "ok": false
     }
    ],
    "why": "Suspaudimo sindromas – diurezė 100–200 ml/val. (skysčių greitis titruojamas). Žemiau tikslo > 2 val. esant 1 l/val. – galimas inkstų pažeidimas.",
    "ref": [
     "#/igudis/35",
     "#/igudis/10"
    ]
   },
   {
    "sit": "Šlapimas tamsiai rudas.",
    "gp": {
     "Diurezė": "120 ml/val.",
     "ŠSD": "96"
    },
    "klaus": "Ką tai reiškia?",
    "opt": [
     {
      "t": "Hematurija – šlapimo pūslės trauma, kateterį išimate",
      "ok": false
     },
     {
      "t": "Mioglobinas: tęsiate skysčius, stebite EKG",
      "ok": true
     },
     {
      "t": "Koncentruotas šlapimas – skysčius mažinate",
      "ok": false
     }
    ],
    "why": "Raudonas, rudas ar juodas šlapimas – mioglobinas ir didėjanti rizika. Tęskite skysčius, stebėkite diurezę ir EKG.",
    "ref": [
     "#/igudis/35",
     "#/s/y-crush"
    ]
   }
  ]
 },
 {
  "id": "p24",
  "pav": "Bradikardija po išlaisvinimo",
  "tema": "Suspaudimas",
  "lygis": "CPP",
  "q": [
   {
    "sit": "Praėjus 40 min po išlaisvinimo monitorius rodo retą pulsą ir platų QRS.",
    "gp": {
     "Laikas": "T+5 val.",
     "ŠSD": "46",
     "AKS": "92/58",
     "EKG": "platus QRS, smailūs T",
     "AVPU": "V"
    },
    "klaus": "Ką skiriate pirmiausia?",
    "opt": [
     {
      "t": "Kalcį: 10 ml 10 % gliukonato per 2–3 min",
      "ok": true
     },
     {
      "t": "Salbutamolį 10 mg purkštuvu per kaukę",
      "ok": false
     },
     {
      "t": "Insuliną 10 VV su 25 g gliukozės",
      "ok": false
     }
    ],
    "why": "Hiperkalemija su EKG pokyčiais – pirmiausia kalcis: stabilizuoja širdį iš karto. Insulinas ir salbutamolis kalį mažina vėliau (~20–30 min).",
    "ref": [
     "#/vaistas/kalcis",
     "#/igudis/35"
    ]
   },
   {
    "sit": "Po kalcio pulsas 62, QRS siauresnis.",
    "gp": {
     "ŠSD": "62",
     "EKG": "smailūs T"
    },
    "klaus": "Kas toliau?",
    "opt": [
     {
      "t": "Nieko – EKG pagerėjo, problema išspręsta",
      "ok": false
     },
     {
      "t": "Insulinas su gliukoze ir salbutamolis purkštuvu",
      "ok": true
     },
     {
      "t": "Kartojate kalcį kas 5 min visą valandą",
      "ok": false
     }
    ],
    "why": "Kalcis kalio nemažina ir veikia 30–60 min. Toliau: insulinas su gliukoze (4–6 val.) ir salbutamolis 10 mg (~2 val.); jų poveikis sumuojasi.",
    "ref": [
     "#/vaistas/insulinas",
     "#/vaistas/salbutamolis"
    ]
   },
   {
    "sit": "Planuojate stebėjimą.",
    "gp": {},
    "klaus": "Kaip dažnai vertinate EKG ir rodiklius?",
    "opt": [
     {
      "t": "Kas 4 val., kaip stabiliam sužeistajam",
      "ok": false
     },
     {
      "t": "Kas 15 min, vėliau retinant iki kas valandos",
      "ok": true
     },
     {
      "t": "Tik jei sužeistasis pasiskųs ar pablogės",
      "ok": false
     }
    ],
    "why": "JTS Crush PFC: kas 15 min pirmas 1–2 val., toliau kas 30 min, stabiliai ar šlapimui šviesėjant – kas valandą. Po insulino – gliukozė.",
    "ref": [
     "#/igudis/35",
     "#/s/y-crush"
    ]
   }
  ]
 },
 {
  "id": "p25",
  "pav": "Telekonsultacija dronų zonoje",
  "tema": "Evakuacija",
  "lygis": "CLS",
  "q": [
   {
    "sit": "Medikas gaivina sužeistąjį, kurio būklė blogėja. Jūs – CLS. Ryšys su telekonsultacijos gydytoju yra.",
    "gp": {
     "ŠSD": "128",
     "AKS": "96/58",
     "SpO₂": "93 %"
    },
    "klaus": "Kas skambina?",
    "opt": [
     {
      "t": "Medikas – tik jis žino detales",
      "ok": false
     },
     {
      "t": "Jūs, kol medikas lieka prie sužeistojo",
      "ok": true
     },
     {
      "t": "Niekas – skambins, kai būklė stabilizuosis",
      "ok": false
     }
    ],
    "why": "JTS ID 94: jei pagrindinis teikėjas atlieka gyvybę gelbstinčius veiksmus, skambina komandos narys; nepalikite blogėjančio sužeistojo. Šoko indeksas > 1 – neatidėliotina telekonsultacija.",
    "ref": [
     "#/igudis/36",
     "#/s/v-tele"
    ]
   },
   {
    "sit": "Turite 2 min iki skambučio.",
    "gp": {},
    "klaus": "Ką nusiunčiate prieš skambutį?",
    "opt": [
     {
      "t": "Stebėjimo lapą ir žaizdų bei viso paciento nuotraukas",
      "ok": true
     },
     {
      "t": "Nieko – viską pasakysite žodžiu",
      "ok": false
     },
     {
      "t": "Sužeistojo veido nuotrauką su vardu ir pavarde",
      "ok": false
     }
    ],
    "why": "Prieš skambutį – stebėjimo lapas, santrauka, nuotraukos (0,5–1 MB, be blykstės, su mastelio objektu). Atviru kanalu – tik lytis ir amžius, be veido ir tatuiruočių.",
    "ref": [
     "#/igudis/36",
     "#/p/tele"
    ]
   },
   {
    "sit": "Gydytojas pateikė 4 rekomendacijas.",
    "gp": {},
    "klaus": "Ką darote?",
    "opt": [
     {
      "t": "Įsimenate ir padėkojate",
      "ok": false
     },
     {
      "t": "Perduodate medikui vėliau savais žodžiais",
      "ok": false
     },
     {
      "t": "Užsirašote ir pakartojate jas gydytojui",
      "ok": true
     }
    ],
    "why": "Uždaras ciklas: rekomendacijas užsirašykite ir pakartokite (readback), neaiškumus klauskite iš karto. Rekomendacijas ir laiką – į lapą.",
    "ref": [
     "#/igudis/36"
    ]
   }
  ]
 },
 {
  "id": "p26",
  "pav": "Šaltas bunkeris",
  "tema": "Slauga",
  "lygis": "CLS",
  "q": [
   {
    "sit": "Žiema, nešildomas bunkeris. Sužeistasis po gaivinimo krauju guli ant neštuvų, drabužiai šlapi.",
    "gp": {
     "Laikas": "T+3 val.",
     "AVPU": "A",
     "ŠSD": "104",
     "AKS": "108/68",
     "T": "35,2 °C"
    },
    "klaus": "Ką darote pirmiausia?",
    "opt": [
     {
      "t": "Uždedate šildymo paketus tiesiai ant odos",
      "ok": false
     },
     {
      "t": "Izoliuojate nuo žemės, keičiate drabužius, uždengiate",
      "ok": true
     },
     {
      "t": "Duodate karštos arbatos ir uždengiate kojas",
      "ok": false
     }
    ],
    "why": "Pirmiausia – izoliacija nuo žemės, sausi drabužiai, apvalkalas su galva, apsauga nuo vėjo ir drėgmės. Aktyvus šildymas niekada tiesiai ant odos.",
    "ref": [
     "#/igudis/31",
     "#/s/v-hipotermija"
    ]
   },
   {
    "sit": "Turite šildančią antklodę (Ready-Heat).",
    "gp": {},
    "klaus": "Kur ją dedate ir kiek laiko naudojate?",
    "opt": [
     {
      "t": "Ant krūtinės priekio ir pažastų virš drabužių; keisti po > 10 val.",
      "ok": true
     },
     {
      "t": "Po nugara ant spaudžiamų vietų; keisti kas 24 val.",
      "ok": false
     },
     {
      "t": "Ant kojų tiesiai ant odos; keisti kas 2 val.",
      "ok": false
     }
    ],
    "why": "JTS PCC: aktyvus šildymas – ant krūtinės priekio ir pažastų, ne tiesiai ant odos ir ne ant spaudžiamų vietų; Ready-Heat keisti po > 10 val.",
    "ref": [
     "#/igudis/31"
    ]
   },
   {
    "sit": "Reikia tęsti kraujo perpylimą.",
    "gp": {
     "T": "35,6 °C"
    },
    "klaus": "Kaip?",
    "opt": [
     {
      "t": "Per šildytuvą",
      "ok": true
     },
     {
      "t": "Kambario temperatūros, bet lėčiau",
      "ok": false
     },
     {
      "t": "Pašildę maišelį ant krosnelės",
      "ok": false
     }
    ],
    "why": "Kraujas ir skysčiai – per šildytuvą (JTS PCC: iki 150 ml/min, 38 °C).",
    "ref": [
     "#/igudis/31",
     "#/igudis/7"
    ]
   }
  ]
 },
 {
  "id": "p27",
  "pav": "Naktinis išvykimas",
  "tema": "Evakuacija",
  "lygis": "CMC",
  "q": [
   {
    "sit": "Po 30 val. pagaliau atvyksta sraigtasparnis. Sužeistasis su kateteriu, IV linija, šlaunies žaizda ir įtvaru.",
    "gp": {
     "Laikas": "T+30 val.",
     "AVPU": "A",
     "ŠSD": "96",
     "AKS": "118/74",
     "SpO₂": "95 %"
    },
    "klaus": "Ką darote prieš įkeliant?",
    "opt": [
     {
      "t": "Skubiai įkeliate – sraigtasparnis ilgai nelauks",
      "ok": false
     },
     {
      "t": "Pakartotinis vertinimas, linijos ir kateteris pritvirtinti",
      "ok": true
     },
     {
      "t": "Nuimate įtvarą, kad būtų lengviau įkelti",
      "ok": false
     }
    ],
    "why": "Prieš išvykimą – pilnas pakartotinis vertinimas; turniketai, tvarsčiai, linijos, vamzdeliai ir kateteris pritvirtinami, kateterio maišas ištuštinamas.",
    "ref": [
     "#/igudis/37",
     "#/s/e-pasiruosimas"
    ]
   },
   {
    "sit": "Sužeistajam ankstesnę parą atlikta adatinė dekompresija; dabar būklė stabili.",
    "gp": {},
    "klaus": "Į ką atsižvelgiate dėl skrydžio?",
    "opt": [
     {
      "t": "Skrydis sraigtasparniu būklės neveikia",
      "ok": false
     },
     {
      "t": "Dujos plečiasi: stebėti pneumotoraksą ir manžetes",
      "ok": true
     },
     {
      "t": "Prieš skrydį ištraukti visus kateterius ir drenus",
      "ok": false
     }
    ],
    "why": "Krentant slėgiui plečiasi dujos (pneumotoraksas, manžetės, balionėliai) ir didėja hipoksija – stebėkite ir būkite pasiruošę dekompresijai.",
    "ref": [
     "#/igudis/37"
    ]
   },
   {
    "sit": "Planuojama 40 min skrydžio, bet galimas nusileidimas tarpinėje vietoje.",
    "gp": {},
    "klaus": "Kiek atsargų imate?",
    "opt": [
     {
      "t": "Tiksliai 40 min skrydžiui – svoris ribotas",
      "ok": false
     },
     {
      "t": "Nieko – sraigtasparnyje viskas yra",
      "ok": false
     },
     {
      "t": "Su atsarga vėlavimui: vaistai, deguonis, baterijos",
      "ok": true
     }
    ],
    "why": "Ruoškitės ilgesnei nei planuota kelionei: vaistai, skysčiai, kraujas, deguonis ir baterijos – su atsarga.",
    "ref": [
     "#/igudis/37",
     "#/s/e-pasiruosimas"
    ]
   }
  ]
 },
 {
  "id": "p28",
  "pav": "Perdavimas po 40 valandų",
  "tema": "Evakuacija",
  "lygis": "CMC",
  "q": [
   {
    "sit": "Perduodate sužeistąjį Role 2 komandai po 40 val. priežiūros. Jam lašinama ketamino infuzija, prieš 6 val. – ceftriaksonas, turniketas konvertuotas.",
    "gp": {
     "Laikas": "T+40 val.",
     "AVPU": "V",
     "ŠSD": "92",
     "AKS": "122/76"
    },
    "klaus": "Ką pasakote pirmiausia?",
    "opt": [
     {
      "t": "Visą 40 val. istoriją chronologine tvarka",
      "ok": false
     },
     {
      "t": "Kas tęstina: infuzija, paskutinės dozės, alergijos",
      "ok": true
     },
     {
      "t": "Kodėl evakuacija vėlavo ir kas dėl to kaltas",
      "ok": false
     }
    ],
    "why": "Perdavime pirmiausia – kas tęstina: turniketų laikai, paskutinės dozės ir kitų laikas, infuzijos ir greičiai, alergijos; toliau – MIST ir tendencijos.",
    "ref": [
     "#/igudis/38",
     "#/s/e-perdavimas"
    ]
   },
   {
    "sit": "Priimantis medikas prašo dokumentų.",
    "gp": {},
    "klaus": "Ką perduodate?",
    "opt": [
     {
      "t": "DD 1380 ir stebėjimo lapą kartu su sužeistuoju",
      "ok": true
     },
     {
      "t": "Tik žodžiu – lapai lieka punkte",
      "ok": false
     },
     {
      "t": "Tik DD 1380 – stebėjimo lapas vidinis",
      "ok": false
     }
    ],
    "why": "Kortelė DD 1380 ir stebėjimo lapas keliauja kartu su sužeistuoju; žodinis perdavimas be laikų – informacijos praradimas.",
    "ref": [
     "#/igudis/38",
     "#/igudis/3"
    ]
   },
   {
    "sit": "Sužeistajam buvo perpiltas šviežias kraujas iš dviejų būrio donorų.",
    "gp": {},
    "klaus": "Ką dar būtina padaryti?",
    "opt": [
     {
      "t": "Nieko – kraujas jau perpiltas ir veikia",
      "ok": false
     },
     {
      "t": "Abu donorus evakuoti kartu su sužeistuoju",
      "ok": false
     },
     {
      "t": "Donorus ir gavėją užregistruoti pagal SOP",
      "ok": true
     }
    ],
    "why": "JTS DCR PFC: perpilti produktai, donorų ir gavėjo duomenys registruojami; skubiai paimto kraujo gavėjai įtraukiami į infekcijų stebėsenos programą.",
    "ref": [
     "#/igudis/38",
     "#/igudis/7"
    ]
   }
  ]
 },
 {
  "id": "p29",
  "pav": "Trys sužeistieji, viena para",
  "tema": "Perėmimas",
  "lygis": "CLS",
  "q": [
   {
    "sit": "Būrio atramos punkte – trys sužeistieji, vienas medikas ir keturi CLS. Evakuacija – ne anksčiau kaip po 24 val. Jūs – būrio vado pavaduotojas.",
    "gp": {},
    "klaus": "Ką darote pirmiausia organizuodami?",
    "opt": [
     {
      "t": "Visi keturi CLS padeda medikui prie sunkiausiojo",
      "ok": false
     },
     {
      "t": "Paskiriate vaidmenis: stebėjimas, ryšys, resursai, dokumentai",
      "ok": true
     },
     {
      "t": "Laukiate vado nurodymų ir nieko nekeičiate",
      "ok": false
     }
    ],
    "why": "PCC metu kiekvienas turi žinoti, kas atsako už sužeistąjį, kas stebi, kas valdo resursus, kas palaiko ryšį dėl evakuacijos, kas dokumentuoja.",
    "ref": [
     "#/igudis/5",
     "#/s/st-planas"
    ]
   },
   {
    "sit": "Vienas sužeistasis gauna deguonį iš baliono; monitorių baterijos – pusė įkrovos.",
    "gp": {},
    "klaus": "Ką darote su resursais?",
    "opt": [
     {
      "t": "Apskaičiuojate, kiek valandų užteks, planuojate papildymą",
      "ok": true
     },
     {
      "t": "Naudojate kaip įprasta, kol atsargos baigsis",
      "ok": false
     },
     {
      "t": "Išjungiate monitorius – užteks pulso apčiuopos",
      "ok": false
     }
    ],
    "why": "Inventorizacija ir skaičiavimas: kiek valandų užteks, kada papildymas, kas bus, jei priemonę sunaudosime dabar.",
    "ref": [
     "#/igudis/5"
    ]
   },
   {
    "sit": "Po 16 val. medikas nemiegojęs ir daro klaidų skaičiuodamas dozes.",
    "gp": {},
    "klaus": "Ką darote?",
    "opt": [
     {
      "t": "Medikas dirba toliau – be jo neapsieisime",
      "ok": false
     },
     {
      "t": "Pamainos: CLS perima slaugą, medikas ilsisi",
      "ok": true
     },
     {
      "t": "Nutraukiate visų vaistų skyrimą iki evakuacijos",
      "ok": false
     }
    ],
    "why": "„Herojiškai dirbti iki išsekimo“ – ne taktika. Pamainos ir poilsis; apmokyti CLS perima slaugos užduotis.",
    "ref": [
     "#/igudis/5",
     "#/p/pagrindai"
    ]
   }
  ]
 },
 {
  "id": "p30",
  "pav": "Neišgyvenamas sužalojimas",
  "tema": "Slauga",
  "lygis": "CMC",
  "q": [
   {
    "sit": "Sužeistasis su atvira galvos trauma (matoma smegenų medžiaga), GKS 3, abu vyzdžiai išsiplėtę. Kraujo nebeliko, kiti du sužeistieji irgi jo reikalauja. Evakuacija – po 12 val.",
    "gp": {
     "Laikas": "T+4 val.",
     "GKS": "3",
     "ŠSD": "44",
     "AKS": "186/98"
    },
    "klaus": "Ką darote prieš nutraukdami gaivinimą?",
    "opt": [
     {
      "t": "Bandote susisiekti su medicinos vadovybe (telekonsultacija)",
      "ok": true
     },
     {
      "t": "Nutraukiate nieko neinformavę",
      "ok": false
     },
     {
      "t": "Tęsiate gaivinimą iki evakuacijos bet kokia kaina",
      "ok": false
     }
    ],
    "why": "JTS DCR PFC: prieš nutraukiant gaivinimą bandoma susisiekti su medicinos vadovybe; nepavykus – sprendžia vietoje esantis medikas, įvertinęs išteklius, evakuacijos laiką ir kitų sužeistųjų poreikius.",
    "ref": [
     "#/igudis/39",
     "#/s/p-komfortas"
    ]
   },
   {
    "sit": "Nuspręsta nebetęsti gaivinimo.",
    "gp": {},
    "klaus": "Kaip toliau prižiūrite sužeistąjį?",
    "opt": [
     {
      "t": "Paliekate be priežiūros ir rūpinatės kitais",
      "ok": false
     },
     {
      "t": "Malšinate skausmą, mirties nepagreitindami",
      "ok": true
     },
     {
      "t": "Suleidžiate didelę opioido dozę, kad nekentėtų",
      "ok": false
     }
    ],
    "why": "Sprendimas nutraukti gaivinimą nereiškia priežiūros pabaigos: visos protingos priemonės skausmui ir kančiai mažinti, bet ne mirtinos dozės.",
    "ref": [
     "#/igudis/39"
    ]
   },
   {
    "sit": "Kitam sužeistajam trūksta kraujo. Kolega siūlo paimti jį iš mirštančiojo.",
    "gp": {},
    "klaus": "Ką atsakote?",
    "opt": [
     {
      "t": "Gerai – kraujas vis tiek nebereikalingas",
      "ok": false
     },
     {
      "t": "Tik jei grupės sutampa",
      "ok": false
     },
     {
      "t": "Ne – ieškosime kitų donorų",
      "ok": true
     }
    ],
    "why": "Iš mirusio ar mirštančio sužeistojo kraujo neimama: rūgštinis, nekrešantis kraujas gali pabloginti gavėjo būklę.",
    "ref": [
     "#/igudis/39",
     "#/igudis/7"
    ]
   }
  ]
 }
];
