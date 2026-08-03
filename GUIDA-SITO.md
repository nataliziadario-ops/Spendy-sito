# Sito Spendy — guida alla pubblicazione

Tutto quello che serve è dentro questa cartella. Non c'è niente da installare, niente da compilare: sono file che il browser apre così come sono.

---

## 1. Cosa c'è nel pacchetto

| File | A cosa serve |
|---|---|
| `index.html` | La pagina iniziale: copertina col telefono 3D, "come funziona", invito a scaricare |
| `funzioni.html` | La pagina interna: cosa c'è dentro, Spendy Premium, dati e domande frequenti |
| `privacy.html` | Informativa privacy — **obbligatoria** per pubblicare su Google Play |
| `termini.html` | Termini d'uso |
| `robots.txt` | Dice ai motori di ricerca che il sito si può indicizzare |
| `assets/stile.css` | Il foglio di stile condiviso tra le pagine |
| `assets/script.js` | Le animazioni e i comportamenti, condivisi tra le pagine |
| `assets/favicon.svg` | L'iconcina che si vede nella scheda del browser |
| `assets/og-image.png` | L'immagine che compare quando qualcuno condivide il link su WhatsApp, Telegram, Facebook |

Per vedere il sito subito: apri `index.html` con doppio clic. Si apre nel browser e funziona già tutto.

---

## 2. Le 4 cose da compilare PRIMA di pubblicare

Cerca queste scritte nei file e sostituiscile. Sono poche e sono tutte in maiuscolo, così non ti sfuggono.

**In `index.html`:**

1. **Il link al Play Store.** Tutti i bottoni "Scarica per Android" hanno `href="#"` come segnaposto. Quando l'app è approvata, cerca `data-link="android"` **in entrambe le pagine** (`index.html` e `funzioni.html`) e sostituisci `#` con il link del Play Store.

2. **L'indirizzo email.** Cerca `INDIRIZZO@EMAIL.IT` nel piè di pagina di entrambe le pagine.

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

**Verificato con test automatici (88 controlli, tutti superati):**
- lo script si esegue senza errori su entrambe le pagine (con ripiego anche per browser molto vecchi);
- nessun link rotto, né dentro le pagine né tra una pagina e l'altra;
- il menu a scomparsa per telefono esiste su entrambe le pagine e contiene tutte le voci;
- le bolle di colore sono presenti in entrambe le pagine, fisse e pulsanti;
- il carosello mobile dei passaggi è collegato al cambio di schermata del telefono;
- le freccette ai lati del telefono esistono, si animano, si spengono a inizio e fine corsa e muovono anche il carosello;
- lo sfioramento sopra il telefono cambia schermata solo se è orizzontale (quello verticale continua a scorrere la pagina);
- il codice del giroscopio ascolta i sensori, calibra il punto zero e spegne l'ondeggiamento automatico quando prende il controllo;
- se il browser è vecchio e non supporta le animazioni allo scorrimento, i contenuti restano comunque tutti visibili (nessuna sezione invisibile per errore);
- le domande frequenti si aprono una alla volta;
- l'impaginazione si riduce correttamente a una colonna su telefono;
- chi ha attivato "riduci animazioni" nel sistema vede il sito fermo;
- i tasti si possono raggiungere con la tastiera e il bordo di selezione è visibile;
- nessun numero inventato sull'app (utenti, recensioni, prezzi): il sito non dichiara cifre che non possiamo dimostrare.

**Non ho potuto verificare da qui — controlla tu quando lo apri:**
- **il giroscopio su un telefono vero**: la reattività va giudicata in mano — se risulta troppo nervoso o troppo pigro si tara con due numeri. Su iPhone in particolare va provato il giro completo: tocco sul bottone → richiesta di permesso del sistema → movimento;
- **l'aspetto reale**: in questo ambiente non ho un browser, quindi ho controllato la struttura ma non ho visto la pagina renderizzata. Aprila su computer e su telefono prima di diffonderla;
- la resa dei caratteri se il dispositivo è offline (i caratteri arrivano da Google Fonts; se non si caricano il sito resta leggibile con i caratteri di sistema, ma cambia un po' l'aspetto);
- come appare l'anteprima quando condividi il link su WhatsApp (funziona solo dopo che il sito è online con un indirizzo vero).

**Una nota sui dati mostrati nelle finte schermate.** Gli importi che si vedono nello scontrino e dentro il telefono sono esempi inventati a scopo illustrativo, come si fa in tutte le vetrine di app. Se preferisci, sostituiscili con numeri più realistici per un utente italiano medio: sono scritti in chiaro dentro `index.html`, cerca `receipt-rows` e `class="shot"`.

---

## 6. Perché il sito è fatto così (in due parole)

Il sito riprende l'app: grafite scuro (#121619 di fondo, #1F2329 per le schede) e lime (#A8E636, leggermente spento rispetto al #B6FF2E dell'app per non abbagliare su schermi grandi). È diviso in due pagine: la iniziale racconta e convince, `funzioni.html` approfondisce (funzioni, Premium, dati, domande).

- **Le bolle di colore** (lime, verde-acqua, viola) vagano e pulsano su tutto il sito, in entrambe le pagine, dietro ai contenuti.
- **La copertina** ha il telefono Android al centro con effetto 3D marcato che segue il mouse. Da telefono, dove il mouse non c'è, il telefono ondeggia da solo.
- **Gli effetti col cursore** (solo da computer): faro luminoso che segue il mouse, schede che si illuminano sotto il puntatore, bottone principale "magnetico".
- **Come funziona, da computer**: il telefono resta fermo mentre scorri i 5 passaggi e cambia schermata da solo. **Da telefono**: i 5 passaggi diventano schede da sfogliare col dito, la schermata cambia mentre sfogli, e puoi anche sfogliare direttamente sopra il telefono o toccare le freccette animate ai suoi lati.
- **Il giroscopio**: da telefono vero, il telefono in copertina si inclina seguendo come inclini il dispositivo. Si attiva da solo su Android; richiede che il sito sia online in HTTPS (GitHub Pages e Netlify lo sono — aprendo il file in locale potrebbe non funzionare). Su iPhone Apple richiede un consenso: compare automaticamente un bottone "Tocca per far muovere il telefono con il tuo" sotto il telefono — al tocco il sistema chiede il permesso e, se accettato, il movimento parte anche lì. Su Android il bottone non compare mai.
- **Tutti gli importi nelle schermate sono inventati** a scopo illustrativo: nessun dato reale dei tuoi screenshot è stato riusato.
- Chi ha "riduci animazioni" attivo nel sistema vede il sito fermo ma completo.

Quando avrai screenshot definitivi dell'app, si possono mettere le immagini vere dentro il telefono al posto delle schermate ricostruite: basta chiedermelo nella prossima sessione.
