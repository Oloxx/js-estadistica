# js-estadistica

Aquest projecte realitza una anàlisi de rendiment de diversos algorismes d'ordenació (*Quicksort*, *Bubblesort* i *Mergesort*) aplicats a arrays amb diferents nivells d'ordenació (*totalment ordenat*, *totalment desordenat* i *parcialment ordenat*). Les proves es fan utilitzant JavaScript i els resultats es guarden en format JSON, que posteriorment es converteixen a un fitxer `.RData` per facilitar l'anàlisi en R.

---

## **Arxius Inclosos**

1. **`sorting_algorithms.js`**  
   Script en JavaScript que:
   - Implementa els algorismes d'ordenació.
   - Genera arrays amb diferents nivells d'ordenació.
   - Mesura el temps d'execució dels algorismes.
   - Desa els resultats en un fitxer `resultats.json`.

2. **`jsonToRData.R`**  
   Script en R que:
   - Llegeix el fitxer `resultats.json`.
   - Converteix les dades en un objecte `data.frame` o `tibble`.
   - Desa el resultat en un fitxer `.RData`.

3. **`resultats.json`**  
   Fitxer generat pel script de JavaScript amb els resultats de les proves.

4. **`resultats.RData`**  
   Fitxer generat pel script d'R que conté les dades en un format natiu per a R.

---

## **Instruccions d'Ús**

### **1. Executar el codi JavaScript**
   - Assegura't de tenir instal·lat [Node.js](https://nodejs.org) i executa la següent comanda per instal·lar les dependències necessàries:
    ```bash
    npm install
    ```
   - Executa el script `sorting_algorithms.js` per generar el fitxer JSON amb els resultats.
     ```bash
     node sorting_algorithms.js
     ```
   - El fitxer `resultats.json` es guardarà al mateix directori.

### **2. Convertir el JSON a RData**
   - Assegura't de tenir instal·lat R o RStudio.
   - Executa el script `jsonToRData.R` per convertir el fitxer JSON a `.RData`.
   - El fitxer `resultats.RData` es guardarà al mateix directori.

### **3. Carregar les dades a R**
   - Carrega el fitxer `.RData` a una sessió d'R per començar a analitzar les dades.
     ```r
     load("resultats.RData")
     print(data)
     ```

---

## **Estructura de les Dades**

Les dades generades contenen les següents variables:

- **`Seed`**: Valor de la *seed* utilitzada per generar els arrays aleatoris.
- **`Nivell_Ordenacio`**: Nivell d'ordenació de les dades:
  - *Totalment ordenat*
  - *Totalment desordenat*
  - *Parcialment ordenat*
- **`Algorisme`**: Algoritme d'ordenació utilitzat:
  - *QuickSort*
  - *BubbleSort*
  - *MergeSort*
- **`temps`**: Temps d'execució de l'algoritme en mil·lisegons.
- **`Mida_Dades`**: Quantitat d'elements de l'array.
- **`RAM`**: Memòria RAM total del sistema durant l'execució (en GB).
- **`CPU`**: Model de la CPU utilitzada per executar les proves.
- **`Llenguatge`**: Llenguatge utilitzat (JavaScript).