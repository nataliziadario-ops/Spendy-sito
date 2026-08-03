# Sito Spendy — guida alla pubblicazione

Tutto quello che serve è dentro questa cartella. Non c'è niente da installare, niente da compilare: sono file che il browser apre così come sono.

---

## 1. Cosa c'è nel pacchetto

| File | A cosa serve |
|---|---|
| `index.html` | Il sito vero e proprio (una pagina sola, con tutte le sezioni) |
| `privacy.html` | Informativa privacy — **obbligatoria** per pubblicare su Google Play |
| `termini.html` | Termini d'uso |
| `robots.txt` | Dice ai motori di ricerca che il sito si può indicizzare |
| `assets/favicon.svg` | L'iconcina che si vede nella scheda del browser |
| `assets/og-image.png` | L'immagine che compare quando qualcuno condivide il link su WhatsApp, Telegram, Facebook |

Per vedere il sito subito: apri `index.html` con doppio clic. Si apre nel browser e funziona già tutto.

---

## 2. Le 4 cose da compilare PRIMA di pubblicare

Cerca queste scritte nei file e sostituiscile. Sono poche e sono tutte in maiuscolo, così non ti sfuggono.

**In `index.html`:**

1. **Il link al Play Store.** Tutti i bottoni "Scarica per Android" hanno `href="#"` come segnaposto. Quando l'app è approvata, cerca `data-link="android"` (compare 3 volte: navigazione, copertina e chiusura) e sostituisci `#` con il link del Play Store.

2. **L'indirizzo email.** Cerca `INDIRIZZO@EMAIL.IT` (è nel piè di pagina, alla voce "Assistenza").

**In `privacy.html` e `termini.html`:**

3. **`DATA`** → la data in cui pubblichi (esempio: 10 agosto 2026).
4. **`NOME E COGNOME`** e **`INDIRIZZO@EMAIL.IT`** → i tuoi dati come titolare.

> ⚠️ **Privacy e termini sono modelli di partenza, non un parere legale.** Il contenuto rispecchia come funziona davvero Spendy (dati in locale, sincronizzazione facoltativa con Google, nessun collegamento bancario), ma prima di pubblicare falli leggere a chi se ne intende. Google Play controlla che l'informativa privacy sia coerente con quello che l'app fa davvero.

---

## 3. Come metterlo online

### Strada A — GitHub Pages (gratis, coerente con il resto)

**Importante:** non mettere questi file nel repository `Spese-Tracker`, altrimenti rischi di sostituire l'app con il sito. Crea un repository nuovo.

1. Su GitHub, `New repository` → nome `spendy-sito` → pubblico → `Create`.
2. Nella pagina del repository vuoto, clicca `uploading an existing file`.
3. Trascina dentro **tutti** i file di questa cartella, cartella `assets` compresa. Conferma con `Commit changes`.
4. `Settings` → `Pages` → in *Source* scegli `Deploy from a branch`, ramo `main`, cartella `/ (root)` → `Save`.
5. Dopo un paio di minuti il sito è online su
   `https://nataliziadario-ops.github.io/spendy-sito/`

### Strada B — Netlify (la più veloce, un minuto)

Vai su `app.netlify.com/drop`, trascina la cartella dentro la finestra, e il sito è online. Da lì puoi anche collegare un dominio tuo (tipo `spendy.it`) senza toccare niente.

### Se compri un dominio

Il sito è pronto: qualsiasi hosting va bene, basta caricare i file mantenendo la struttura delle cartelle (`assets` deve restare una sottocartella).

---

## 4. Gli indirizzi da dare a Google Play

Quando compili la scheda dell'app ti chiederanno questi due link:

- Informativa privacy: `https://IL-TUO-SITO/privacy.html`
- Sito dello sviluppatore: `https://IL-TUO-SITO/`

---

## 5. Cosa ho verificato e cosa no

**Verificato con test automatici (56 controlli, tutti superati):**
- il sito si carica senza errori JavaScript;
- nessun link interno rotto;
- se il browser è vecchio e non supporta le animazioni allo scorrimento, i contenuti restano comunque tutti visibili (nessuna sezione invisibile per errore);
- le domande frequenti si aprono una alla volta;
- l'impaginazione si riduce correttamente a una colonna su telefono;
- chi ha attivato "riduci animazioni" nel sistema vede il sito fermo;
- i tasti si possono raggiungere con la tastiera e il bordo di selezione è visibile;
- nessun numero inventato sull'app (utenti, recensioni, prezzi): il sito non dichiara cifre che non possiamo dimostrare.

**Non ho potuto verificare da qui — controlla tu quando lo apri:**
- **l'aspetto reale**: in questo ambiente non ho un browser, quindi ho controllato la struttura ma non ho visto la pagina renderizzata. Aprila su computer e su telefono prima di diffonderla;
- la resa dei caratteri se il dispositivo è offline (i caratteri arrivano da Google Fonts; se non si caricano il sito resta leggibile con i caratteri di sistema, ma cambia un po' l'aspetto);
- come appare l'anteprima quando condividi il link su WhatsApp (funziona solo dopo che il sito è online con un indirizzo vero).

**Una nota sui dati mostrati nelle finte schermate.** Gli importi che si vedono nello scontrino e dentro il telefono sono esempi inventati a scopo illustrativo, come si fa in tutte le vetrine di app. Se preferisci, sostituiscili con numeri più realistici per un utente italiano medio: sono scritti in chiaro dentro `index.html`, cerca `receipt-rows` e `class="shot"`.

---

## 6. Perché il sito è fatto così (in due parole)

Il sito riprende l'app: grafite scuro (#121619 di fondo, #1F2329 per le schede) e lime (#A8E636, leggermente spento rispetto al #B6FF2E dell'app per non abbagliare su schermi grandi).

- **La copertina** ha il telefono Android al centro con effetto 3D: si inclina seguendo il mouse, con i bagliori lime e verde-acqua che si muovono in parallasse dietro, e due schedine fluttuanti ai lati.
- **Gli effetti col cursore**: un faro luminoso che segue il mouse nella copertina, le schede che si illuminano sotto il puntatore, il bottone principale che si "attacca" leggermente al cursore.
- **Il telefono della sezione centrale** resta fermo mentre scorri e cambia tra 5 schermate ricostruite dai tuoi screenshot (tastierino, panoramica, ricorrenti, salvadanai, statistiche Premium). Nel tastierino l'importo si digita da solo.
- **Tutti gli importi nelle schermate sono inventati** a scopo illustrativo, come richiesto: nessun dato reale dei tuoi screenshot è stato riusato.
- Chi ha "riduci animazioni" attivo nel sistema vede il sito fermo ma completo.

Quando avrai screenshot definitivi dell'app, si possono mettere le immagini vere dentro il telefono al posto delle schermate ricostruite: basta chiedermelo nella prossima sessione.
