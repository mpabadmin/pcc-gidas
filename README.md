# PCC gidas – 1040 medkuopa

Ilgalaikė sužeistojo priežiūra lauke (Prolonged Casualty Care). Tokia pati architektūra ir išvaizda kaip [March gide](https://march.1040medkuopa.lt): režimai Taikymas / Mokymasis, fazės ir kontroliniai sąrašai, įgūdžiai, mokymosi puslapiai, temos, vaistai, scenarijai, egzaminuotojo režimas, dozių kortelės, paciento failas su MIST kortele, 9-Line, SITREP, perdavimas QR kodu.

PCC priedai (`pcc.js`, paciento failo skiltys): stebėjimo lapas (blogėjimo žymėjimas, tendencijos), skysčių balansas ir diurezė (ml/kg/val.), vaistų ir veiksmų žurnalas su kartojimo priminimais, priežiūros grafikas (JTS CPG ID 70), turniketų laikų langai (< 2 val., 2–6 val., > 6 val.), telekonsultacija (JTS CPG ID 94, PFC) ir ATMISTER, pasiruošimas evakuacijai, priminimai, duomenų kopijavimas / įkėlimas.

Statinė PWA, veikia be interneto. Duomenys saugomi tik telefone (`localStorage`, raktai `pcc-*`).

Adresas: https://pcc.1040medkuopa.lt (GitHub Pages iš `main`, failas `CNAME`).

## Failai
- `index.html` – CSS ir apvalkalas; `core.js`, `views.js`, `app.js` – maršrutai ir ekranai (March); `tools.js` – MIST, 9-Line, scenarijai, paciento failas, priminimai, QR; `pacientas.js` – paciento ekranas; `priedai.js` – egzaminas, dozių kortelės, OPSEC, pirštinių režimas, vertinimo lapas; `sitrep.js`; `fb.js` – atsiliepimai (rodoma tik kai `E.atsiliepimai.url`).
- `pcc.js` – PCC priedai ir `TCFG.hub` (paciento ekrano skiltys).
- Turinys (March formatu): `sarasai.js`, `igudziai.js`, `scenarijai.js`, `vaistai.js` – tik turinys. Programėlės priedai prie turinio – `pcc-cfg.js` (įkeliamas po duomenų): `E.atsiliepimai`, `E.qd` (greitosios dozės – tik pažodžiui iš vaistai.js teksto), `E.daznVaistai`, `E.evakSarasas`. Kiti nebūtini laukai: `E.greitai`, `E.igudziuGrupes`, `E.vaistaiIntro`, `E.vaistaiPuslapis`, `f.zenklas`, `f.cls`, įgūdžio `irankiai`, sąrašo punkto `rl`.

Šaltiniai: JTS CPG „Prolonged Casualty Care Guidelines“ (ID 91, 2021), „Nursing Interventions, Wound Care, and Splint Management in PCC“ (ID 70, 2025), „Telemedicine Guidance in the Deployed Setting“ (ID 94, 2023), PFC Documentation (2023).

Atnaujinant: pakeisti `VERSION` faile `sw.js` ir `E.versija` faile `sarasai.js`. Testas: `python3 /home/claude/work/pcc/t_pcc2.py`.
