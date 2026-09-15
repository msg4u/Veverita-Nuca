# Veverița Nuca și Roata Fermecată a Anului 🐿️🍂

**Veverița Nuca și Roata Fermecată a Anului** este o aplicație web interactivă și un material educațional inovator, conceput special pentru copii cu vârste între **4 și 7 ani**. Proiectul transformă învățarea despre succesiunea anotimpurilor, schimbările din natură și trecerea timpului într-o experiență interactivă captivantă, ghidată de personajul prietenos, Veverița Nuca.

Aplicația utilizează inteligența artificială generativă prin intermediul platformei Google AI Studio pentru a oferi răspunsuri dinamice și interactive adaptate celor mici.

🔗 **Link Aplicație:** [https://veverita-nuca-si-roata-fermecata.ai.studio/](https://veverita-nuca-si-roata-fermecata.ai.studio/)

---

## 🚀 Caracteristici principale

- **Învățare prin Joc (Gamification):** Copiii explorează anotimpurile într-un mod vizual prin intermediul unei "roți fermecate".
- **Design Adaptat Vârstei:** Interfață grafică atractivă, simplificată și intuitivă pentru copii preșcolari și din clasele primare.
- **Asistent AI Integrat:** Interacțiuni personalizate ghidate de Veverița Nuca pentru a explica fenomenele naturii pe înțelesul tuturor.
- **Ecosistem Modern:** Performanță ridicată și timpi de încărcare minimi, esențiali pentru menținerea atenției copiilor.

---

## 🛠️ Tehnologii utilizate

Proiectul este dezvoltat folosind o stivă frontend modernă și rapidă:

- **[Vite](https://vitejs.dev)** – Instrument de build ultra-rapid pentru aplicații web moderne.
- **[TypeScript](https://typescript.org)** – Asigură un cod robust, stabil și ușor de întreținut prin tipizare statică.
- **[Bun](https://bun.sh)** – Runtime JavaScript all-in-one și manager de pachete ultra-rapid (suportă și Node.js/npm).

---

## 💻 Instalare și Rulare Locală

Urmează pașii de mai jos pentru a configura și rula proiectul pe mașina ta locală:

### 1. Clonarea repository-ului
```bash
git clone https://github.com
cd Veverita-Nuca
```

### 2. Instalarea dependențelor
Dacă folosești **Bun** (recomandat conform fișierului `bun.lock`):
```bash
bun install
```
Sau dacă preferi **npm**:
```bash
npm install
```

### 3. Configurarea variabilelor de mediu
Creează un fișier `.env` local pornind de la cel de exemplu pentru a introduce cheile necesare API-ului Google AI Studio:
```bash
cp .env.example .env
```

### 4. Rularea în modul de dezvoltare
Pornește serverul local de dezvoltare:
```bash
bun run dev
# sau
npm run dev
```
Aplicația va rula local și poate fi accesată în browser la adresa generată în terminal (de regulă `http://localhost:5173`).

### 5. Construirea versiunii de producție
Pentru a compila și optimiza codul în folderul `dist`:
```bash
bun run build
# sau
npm run build
```

---

## 📁 Structura Proiectului

```text
├── src/               # Codul sursă al aplicației (interfață, logică, stiluri)
├── .env.example       # Model pentru configurarea variabilelor de mediu
├── bun.lock           # Fișierul de blocare a dependențelor pentru Bun
├── index.html         # Fișierul HTML principal al aplicației
├── metadata.json      # Metadate specifice integrării cu Google AI Studio
├── package.json       # Scripturile de rulare și lista dependențelor
├── tsconfig.json      # Configurația compilatorului TypeScript
└── vite.config.ts     # Configurația managerului de build Vite
```

---

## 📝 Licență și Contribuții

Acest proiect a fost inițiat pe baza template-ului oficial `google-gemini/aistudio-repository-template`.

Dacă dorești să aduci îmbunătățiri, să raportezi bug-uri sau să adaugi funcționalități noi pentru copii, te rugăm să deschizi un **Issue** sau să trimiți un **Pull Request**.

Concept creat cu ❤️ pentru copii și părinți deopotrivă.
