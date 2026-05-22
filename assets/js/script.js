/*
REGOLE
- Le risposte vanno scritte in JavaScript sotto questi commenti.
- Pattern fondamentale: stato -> render() -> eventi.
  Tutto cio' che vedi a schermo dipende dallo stato.
  Gli eventi modificano lo stato e poi chiamano render().
- Apri index.html nel browser. Apri la console (DevTools) per gli errori.
- Cerca su MDN solo i concetti dichiarati come "cerca tu":
  localStorage, Blob/URL.createObjectURL, FileReader.
  Tutto il resto e' stato visto in settimana.
- Niente AI per generare codice. Niente template scaricati.
*/

/* STATO
   In cima al file definisci poche variabili globali:
   - un array di oggetti come dato principale (es. libri, ricette, film, ...)
   - una variabile per il filtro corrente
   - una variabile per l'ordinamento corrente
   - una variabile per la stringa di ricerca corrente
*/

/* SCRIVI QUI LA TUA RISPOSTA */

/* RENDER()
   Una sola funzione che ridipinge la lista. A ogni chiamata:
   1) parte dall'array completo,
   2) filtra,
   3) ordina,
   4) svuota il container DOM,
   5) ricrea gli elementi DOM per gli oggetti risultanti.
   Aggiorna anche conteggi e statistiche.
   Salva lo stato in localStorage in fondo a render() (cerca tu come funziona).
*/

/* SCRIVI QUI LA TUA RISPOSTA */

/* FORM CON VALIDAZIONE
   addEventListener("submit") sul form.
   event.preventDefault().
   Leggi i valori con .value.trim().
   Se uno dei campi obbligatori e' vuoto, mostra errore e return.
   Altrimenti push allo stato, form.reset(), render().
   Id univoco con Date.now().
*/

/* SCRIVI QUI LA TUA RISPOSTA */

/* INTERAZIONI BASE — eliminare, modificare, contare
   - Elimina: filter per id, render(). Event delegation sul container.
   - Modifica in-place: button "Modifica". Al click il testo diventa <input>,
     si conferma con Invio o blur.
   - Conteggi dinamici dentro render().
*/

/* SCRIVI QUI LA TUA RISPOSTA */

/* RICERCA, FILTRO, ORDINAMENTO
   - Ricerca live: <input> con event "input". Salva in stato e render().
   - Filtro: <select> con event "change". Salva in stato e render().
   - Ordinamento: due button (o select). Salva in stato e render().
   I tre si compongono dentro render() in fila.
*/

/* SCRIVI QUI LA TUA RISPOSTA */

/* NOTIFICHE TEMPORANEE
   Funzione notifica(testo) che imposta il testo del <div id="notifica">,
   lo mostra (display: block), poi dopo 3000ms (setTimeout) lo nasconde.
*/

/* SCRIVI QUI LA TUA RISPOSTA */

/* TEMA CHIARO/SCURO
   Un button che chiama document.body.classList.toggle("dark").
   In CSS scrivi le regole opposte (es. body.dark { background: #111; ... }).
*/

/* SCRIVI QUI LA TUA RISPOSTA */

/* PERSISTENZA — localStorage (cerca tu su MDN)
   - In fondo a render(), salva lo stato:
       localStorage.setItem("dati", JSON.stringify(stato));
   - All'avvio, prima della prima render(), carica:
       const salvato = localStorage.getItem("dati");
       if (salvato) stato = JSON.parse(salvato);
*/

/* SCRIVI QUI LA TUA RISPOSTA */

/* RIORDINO ↑ ↓
   Due button su ogni elemento. Click su ↑ scambia con il precedente nell'array,
   ↓ con il successivo. Event delegation. Poi render().
*/

/* SCRIVI QUI LA TUA RISPOSTA */

/* STATISTICHE GRAFICHE
   Almeno due indicatori: contatori grandi e/o barre orizzontali
   (<div> con width: X% in base al dato). Aggiorna dentro render().
*/

/* SCRIVI QUI LA TUA RISPOSTA */

/* MULTI-VISTA — lista / card / tabella
   Una variabile globale "vista" che render() legge per decidere quale HTML
   produrre. Tre button cambiano "vista" e chiamano render().
*/

/* SCRIVI QUI LA TUA RISPOSTA */

/* CATEGORIE
   Aggiungi un campo categoria nello schema. Nel form un <select> per sceglierla.
   In render(), raggruppa con reduce in { categoria: [elementi] } e disegna un
   header per categoria con sotto la lista di quella categoria.
*/

/* SCRIVI QUI LA TUA RISPOSTA */

let zaino = [];
let filtroCerca = "";
let filtroRarita = "tutti";
let filtroOrdine = "";

function filtraZaino() {
  let risultati = [];
  for (let i = 0; i < zaino.length; i++) {
    let item = zaino[i];
    let passaNome = item.nome.toLowerCase().includes(filtroCerca.toLowerCase());
    let passaRarita = filtroRarita === "tutti" || item.rarita === filtroRarita;
    if (passaNome && passaRarita) {
      risultati.push(item);
    }
  }
  return risultati;
}

function ordinaOggetti(arrayDaOrdinare) {
  arrayDaOrdinare.sort(function (a, b) {
    if (filtroOrdine === "") {
      return a.nome.localeCompare(b.nome);
    } else if (filtroOrdine === "nome-desc") {
      return b.nome.localeCompare(a.nome);
    } else if (filtroOrdine === "quantita-desc") {
      return b.quantita - a.quantita;
    } else if (filtroOrdine === "quantita-asc") {
      return a.quantita - b.quantita;
    }
    return 0;
  });
  return arrayDaOrdinare;
}

function calcolaTotalePezzi(arrayOggetti) {
  let totale = 0;
  for (let i = 0; i < arrayOggetti.length; i++) {
    totale += arrayOggetti[i].quantita;
  }
  return totale;
}

function emojiRarita(rarita) {
  if (rarita === "epico") return "🟣";
  if (rarita === "leggendario") return "🟡";
  return "🟢";
}

function mostraNotifica(testo) {
  let notificaDiv = document.getElementById("notifica");
  if (!notificaDiv) {
    notificaDiv = document.createElement("div");
    notificaDiv.id = "notifica";
    notificaDiv.style.position = "fixed";
    notificaDiv.style.top = "20px";
    notificaDiv.style.right = "20px";
    notificaDiv.style.padding = "12px 24px";
    notificaDiv.style.backgroundColor = "#2c3a21";
    notificaDiv.style.color = "#ffffff";
    notificaDiv.style.borderRadius = "6px";
    notificaDiv.style.boxShadow = "0 4px 6px rgba(0,0,0,0.2)";
    notificaDiv.style.zIndex = "9999";
    notificaDiv.style.fontWeight = "bold";
    document.body.appendChild(notificaDiv);
  }
  notificaDiv.textContent = testo;
  notificaDiv.style.display = "block";

  setTimeout(function () {
    notificaDiv.style.display = "none";
  }, 3000);
}

function aggiornaBarreGrafiche() {
  let comuni = 0,
    epici = 0,
    leggendari = 0,
    totaleGenerale = 0;
  for (let i = 0; i < zaino.length; i++) {
    totaleGenerale += zaino[i].quantita;
    if (zaino[i].rarita === "comune") comuni += zaino[i].quantita;
    if (zaino[i].rarita === "epico") epici += zaino[i].quantita;
    if (zaino[i].rarita === "leggendario") leggendari += zaino[i].quantita;
  }

  let barraComune = document.getElementById("barra-comune");
  let barraEpico = document.getElementById("barra-epico");
  let barraLeggendario = document.getElementById("barra-leggendario");
  if (totaleGenerale === 0) {
    if (barraComune) barraComune.style.width = "0%";
    if (barraEpico) barraEpico.style.width = "0%";
    if (barraLeggendario) barraLeggendario.style.width = "0%";
  } else {
    if (barraComune)
      barraComune.style.width = (comuni / totaleGenerale) * 100 + "%";
    if (barraEpico)
      barraEpico.style.width = (epici / totaleGenerale) * 100 + "%";
    if (barraLeggendario)
      barraLeggendario.style.width = (leggendari / totaleGenerale) * 100 + "%";
  }
}

function render() {
  let oggettiFiltrati = filtraZaino();
  let oggettiPronti = ordinaOggetti(oggettiFiltrati);

   document.getElementById("totale-oggetti").innerText =
    calcolaTotalePezzi(oggettiPronti);

  let listaContainer = document.getElementById("lista-inventario");
  while (listaContainer.firstChild) {
    listaContainer.removeChild(listaContainer.firstChild);
  }

  for (let i = 0; i < oggettiPronti.length; i++) {
    let item = oggettiPronti[i];

    let itemDiv = document.createElement("div");
    itemDiv.className = "item-inventario";
    itemDiv.setAttribute("data-id", item.id);

    let infoDiv = document.createElement("div");
    infoDiv.className = "item-info";
    let infoSpan = document.createElement("span");
    infoSpan.textContent =
      emojiRarita(item.rarita) + " " + item.nome + " (x" + item.quantita + ")";
    infoDiv.appendChild(infoSpan);

    let azioniDiv = document.createElement("div");
    azioniDiv.className = "item-azioni";

    let btnSu = document.createElement("button");
    btnSu.className = "btn-azione btn-su";
    btnSu.textContent = "↑";

    let btnGiu = document.createElement("button");
    btnGiu.className = "btn-azione btn-giu";
    btnGiu.textContent = "↓";

    let btnModifica = document.createElement("button");
    btnModifica.className = "btn-azione btn-modifica";
    btnModifica.textContent = "Modifica";

    let btnElimina = document.createElement("button");
    btnElimina.className = "btn-azione btn-elimina";
    btnElimina.textContent = "Elimina";

    azioniDiv.appendChild(btnSu);
    azioniDiv.appendChild(btnGiu);
    azioniDiv.appendChild(btnModifica);
    azioniDiv.appendChild(btnElimina);

    itemDiv.appendChild(infoDiv);
    itemDiv.appendChild(azioniDiv);
    listaContainer.appendChild(itemDiv);
  }

  aggiornaBarreGrafiche();

  localStorage.setItem("zaino_dati", JSON.stringify(zaino));
}

document
  .getElementById("form-raccolta")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let nomeInput = document.getElementById("input-nome").value.trim();
    let quantitaInput = parseInt(
      document.getElementById("input-quantita").value);
    let raritaInput = document.getElementById("select-rarita").value;

    if (
      nomeInput === "" ||
      isNaN(quantitaInput) ||
      quantitaInput < 1 ||
      raritaInput === ""
    ) {
      alert("Compila tutti i campi obbligatori correttamente.");
      return;
    }

    zaino.push({
      id: Date.now(),
      nome: nomeInput,
      quantita: quantitaInput,
      rarita: raritaInput,
    });

    document.getElementById("form-raccolta").reset();
    mostraNotifica("Oggetto aggiunto con successo!");
    render();
  });

document
  .getElementById("lista-inventario")
  .addEventListener("click", function (event) {
    let clickTarget = event.target;
    let itemDiv = clickTarget.closest(".item-inventario");
    if (!itemDiv) return;

    let idSelezionato = parseInt(itemDiv.getAttribute("data-id"));
    let indice = -1;
    for (let i = 0; i < zaino.length; i++) {
      if (zaino[i].id === idSelezionato) indice = i;
    }
    if (indice === -1) return;

    if (clickTarget.classList.contains("btn-elimina")) {
      zaino.splice(indice, 1);
      mostraNotifica("Oggetto rimosso dallo zaino.");
      render();
      return;
    }

    if (clickTarget.classList.contains("btn-su")) {
      if (
        filtroCerca !== "" ||
        filtroRarita !== "tutti" ||
        filtroOrdine !== ""
      ) {
        mostraNotifica(
          "Azzera filtri e ordinamento alfabetico per spostare l'oggetto!",
        );
        return;
      }
      if (indice > 0) {
        let temp = zaino[indice];
        zaino[indice] = zaino[indice - 1];
        zaino[indice - 1] = temp;
        render();
      }
      return;
    }

    if (clickTarget.classList.contains("btn-giu")) {
      if (
        filtroCerca !== "" ||
        filtroRarita !== "tutti" ||
        filtroOrdine !== "nome-asc"
      ) {
        mostraNotifica(
          "Azzera filtri e ordinamento alfabetico per spostare l'oggetto!",
        );
        return;
      }
      if (indice < zaino.length - 1) {
        let temp = zaino[indice];
        zaino[indice] = zaino[indice + 1];
        zaino[indice + 1] = temp;
        render();
      }
      return;
    }

    if (clickTarget.classList.contains("btn-modifica")) {
      let infoSpan = itemDiv.querySelector(".item-info span");
      let inputModifica = document.createElement("input");
      inputModifica.type = "text";
      inputModifica.value = zaino[indice].nome;
      inputModifica.style.padding = "2px 5px";
      inputModifica.style.fontSize = "14px";
      infoSpan.replaceWith(inputModifica);
      inputModifica.focus();

      function chiudiModifica() {
        let nuovoNome = inputModifica.value.trim();
        if (nuovoNome !== "") {
          zaino[indice].nome = nuovoNome;
          mostraNotifica("Nome modificato!");
        }
        render();
      }

      inputModifica.addEventListener("keydown", function (e) {
        if (e.key === "Enter") chiudiModifica();
      });
      inputModifica.addEventListener("blur", chiudiModifica);
    }
  });

document.getElementById("filtro-cerca").addEventListener("input", function (e) {
  filtroCerca = e.target.value;
  render();
});

document
  .getElementById("filtro-rarita")
  .addEventListener("change", function (e) {
    filtroRarita = e.target.value;
    render();
  });

document
  .getElementById("filtro-ordine")
  .addEventListener("change", function (e) {
    filtroOrdine = e.target.value;
    render();
  });

document.getElementById("btn-tema").addEventListener("click", function () {
  document.body.classList.toggle("dark");
  let temaAttivo = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("tema", temaAttivo);
});

let datiSalvati = localStorage.getItem("zaino_dati");
if (datiSalvati) {
  zaino = JSON.parse(datiSalvati);
}
let temaSalvato = localStorage.getItem("tema");
if (temaSalvato === "dark") {
  document.body.classList.add("dark");
}
render();
