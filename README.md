# LNG Cargo Properties Calculator

A web-based calculator that determines the physical, energy, and gas-phase properties of an LNG cargo from a measured composition, liquid volume, and temperature. Built for cargo surveyors, terminal operators, ship officers, and commercial analysts who need authoritative property estimates aligned with industry-standard methods.

**Open in browser:** `https://lng.ivaylokrastev.com`

---

## What it calculates

From three measured inputs, the tool produces twelve commercially and operationally significant cargo properties, plus an extensive panel of intermediate values for audit and verification.

### Inputs
- **Molar composition** — mole fractions of eleven components: CH₄, C₂H₆, C₃H₈, i-C₄H₁₀, n-C₄H₁₀, i-C₅H₁₂, n-C₅H₁₂, C₆+, N₂, CO₂, O₂
- **Liquid temperature** — cargo temperature at the time of measurement, in °C
- **Liquid volume** — measured liquid volume in m³ (locale-aware input accepts `145,000`, `145 000`, `145000.00`, etc.)
- **Calculation standard** — ISO (international) or GPA Midstream (US/North America)
- **Reference temperatures** — combustion and metering reference temperatures (fixed at 60 °F in GPA mode; user-selectable in ISO mode: 0, 15, 15.55, 20, or 25 °C combustion; 0, 15, 15.55, or 20 °C metering)

### Outputs (result cards)
1. **Density at observed temperature** — kg/m³ (+ t/m³ subtitle)
2. **Cargo mass** — tonnes (+ kg, and lb in GPA mode)
3. **Average molar mass** — kg/kmol (+ relative density subtitle)
4. **GHV mass basis (Hm)** — kWh/kg (+ MMBTU/tonne and MJ/kg subtitle)
5. **GHV volumetric (real gas)** — kWh/Sm³ or BTU/SCF (+ MJ/m³ subtitle)
6. **Total energy** — MMBTU (+ MWh and TJ subtitle)
7. **Conversion coefficient** — MMBTU/m³
8. **Wobbe Index (real gas)** — kWh/Sm³ or BTU/SCF (+ Zmix subtitle)
9. **Total gas volume equivalent** — Sm³ or SCF
10. **LNG-to-gas expansion ratio** — dimensionless
11. **Boiling point** — °C at atmospheric pressure (101.325 kPa)
12. **Equilibrium vapor pressure** — mbar gauge (+ kPa abs and bar subtitle)

### Intermediate & additional values
An expandable panel exposes the underlying 24 derived quantities used in the calculation chain — k₁, k₂, Vc, Hc, Zmix, summation factors, real-gas and ideal-gas GHV in multiple unit systems, Wobbe Index ideal-gas and real-gas in MJ/m³ and BTU/SCF, and others. A component contributions table shows the per-component xᵢMᵢ, xᵢVᵢ, xᵢHvᵢ, mass fractions, summation factors, and partial saturation pressures.

---

## Standards & methods

The calculation engine implements established industry-standard methods:

- **ISO 6578:2017** — *Refrigerated hydrocarbon liquids — Static measurement — Calculation procedure.* Provides the Klosek-McKinley volume-correction method for LNG liquid density (Formula 9), and the mass and energy calculation chain (Formulas 1, 4, 12).
- **ISO 6976:2016** — *Natural gas — Calculation of calorific values, density, relative density and Wobbe indices from composition.* Provides ideal-gas molar gross calorific values (Table 3), summation factors for the real-gas compression factor (Table 2), and dry-air compression factors (Annex A Table A.4).
- **GPA Midstream 2145-16** — *Table of Physical Properties for Hydrocarbons and Other Compounds of Interest to the Natural Gas and Natural Gas Liquids Industries.* Provides BTU/SCF heating values at 60 °F / 14.696 psia, summation factors, and molar masses for US-convention custody transfer.
- **Klosek-McKinley method** (NIST, 1970s) — the liquid-density correlation used under both standards, validated against experimental LNG data to ±0.1 %.
- **Antoine vapor-pressure correlation** — with NIST Chemistry WebBook and Yaws' Handbook constants, used for the equilibrium vapor pressure and boiling-point inversion.
- **IUPAC 2007 atomic weights** — for molar mass computation (C = 12.0107, H = 1.00794, N = 14.0067, O = 15.9994, S = 32.065).

The dual-standard design means the calculator matches the way cargo Certificates of Quality are actually issued: select **GPA** when reconciling a US-terminal COQ (Sabine Pass, Corpus Christi, Cameron, Freeport, Plaquemines, Elba Island, Port Arthur); select **ISO** when reconciling a European, Asian, Middle Eastern, or Australian COQ.

---

## Features

- **Extensive in-app theory documentation.** Ten step-by-step derivations of every calculation, with source formulas attributed to their originating standards and clauses. Every result card has a `?` icon that scrolls to the corresponding theory step.
- **Full unit-system coverage.** Every quantity where multiple conventions exist (MJ/kg, kWh/kg, MMBTU/tonne, Btu/lb; MJ/m³, kWh/Sm³, BTU/SCF; Sm³, Nm³, SCF) is computed and exposed.
- **Real-gas correction** using the compression factor Z from ISO 6976:2016 Table 2 summation factors (or GPA 2145-16 equivalents).
- **Sanity warnings.** Out-of-scope cargo temperature, composition summation deviation, and excess CO₂ content (solubility flag at 100 ppm) trigger visible warnings without blocking calculation.
- **Clean printout.** Browser print produces a four-page cargo report (Molar Composition · Cargo Parameters · Calculation Results · Intermediate Values) with "Calculations provided for reference purposes only." in the page footer.
- **Offline-first.** Once loaded, the app runs entirely in-browser with no network dependency. Installable as a PWA on Windows, macOS, Linux, Android, and iOS for quick access.
- **Locale-robust inputs.** Liquid volume accepts both US notation (`145,000`) and European notation (`145.000` or `145 000`).
- **Embedded JetBrains Mono font** for consistent, legible typography of numerical data across every device and operating system.

---

## Installation

### As a web app
Open the deployment URL in any modern browser. The calculator runs immediately in the tab.

### As an installed app
- **Chrome / Edge / Brave (desktop & Android):** click the install icon (⊕) that appears in the address bar, or select "Install app" from the browser menu.
- **Safari (iOS / iPadOS):** tap the share button → "Add to Home Screen."
- **Safari (macOS 14+):** File → "Add to Dock."

Once installed, the app works fully offline and launches as a standalone window without browser chrome.

---

## Applicability and limitations

The calculator is designed for fully-refrigerated LNG at cargo conditions, not for pressurized or semi-refrigerated systems. The valid scope:

- Average molar mass ≤ 20 kg/kmol
- Nitrogen < 5 mol%, butanes < 5 mol%, pentanes+ < 1 mol%
- Temperature range: −167.15 °C to −155.15 °C (extrapolated outside this range)
- Vapor pressures near atmospheric — typical LNG carrier membrane tanks at 100–250 mbar gauge are well within scope
- C₆+ content approximated as a linear extrapolation from n-pentane (valid for typical < 0.01 mol% commercial levels)
- Antoine vapor-pressure correlations most accurate in the 80–150 % range of each component's normal boiling point
- CO₂ above 0.01 mol% (100 ppm) triggers a solubility flag — solid-phase CO₂ may be present

Full applicability discussion and numerical accuracy expectations are documented in the in-app theory panel.

---

## Legal and attribution

### Disclaimer
The calculator is provided for reference and informational purposes only. Results are based on physical correlations and industry-standard methods with known accuracy bounds (±0.1 % for density under validated conditions); nonetheless, they should not be treated as authoritative custody-transfer figures or substituted for measurements produced by certified metering systems, official cargo surveyors, or the terminal-issued Certificates of Quality. Commercial decisions and regulatory submissions should always rely on the appropriate official documents.

### Source standards
This tool does not reproduce or distribute any copyrighted standards documents. It implements publicly documented calculation methods using the numerical physical constants defined in the underlying standards — constants which are physical facts of nature (densities, heating values, molar masses, vapor pressures) and therefore not subject to copyright protection as expressive content.

Users requiring the full text, formal specifications, or authoritative interpretation of the underlying standards should obtain **ISO 6578:2017**, **ISO 6976:2016**, and **GPA Midstream 2145-16** directly from the respective publishers (ISO at iso.org, GPA Midstream at gpamidstream.org).

No affiliation, endorsement, or certification by ISO, GPA Midstream, NIST, IUPAC, JetBrains, or any LNG terminal operator is claimed or implied.

### Font licensing
The calculator embeds the JetBrains Mono font subset, distributed under the SIL Open Font License, Version 1.1. The license notice is preserved inline within the application's source.

### Author
© 2026 Ivaylo Krastev · [ivaylokrastev.com](http://ivaylokrastev.com)

All Rights Reserved. The calculator's source code, design, and original documentation are the intellectual property of the author.

### License
This project is released under the MIT License — see [LICENSE](LICENSE) for details.

The embedded JetBrains Mono font is licensed separately under the SIL Open Font License 1.1; its license notice is preserved in the application source and is distinct from the MIT license covering the calculator's own code.
