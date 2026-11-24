# Algoritmizace – zpracování textu

## 1. Co je to algoritmus a proč ho vytváříme
Tvorba počítačového programu probíhá ve dvou hlavních fázích:
1. Vymyšlení přesného postupu řešení (**algoritmu**).
2. Přepsání tohoto postupu do kódu v konkrétním **programovacím jazyce**.

> **Definice:** **Algoritmus** je přesný postup, který je potřeba k vykonání určité činnosti. Počítač nemá vlastní inteligenci a dělá pouze to, co mu přesně přikážeme.

### Vlastnosti (podmínky) správného algoritmu
* **Konečnost (začátek a konec):** Po konečném počtu kroků musí algoritmus dojít od počátku do konce. Pokud podmínka chybí, program se zacyklí, „zatuhne“ nebo havaruje z důvodu přetečení paměti.
* **Věcná správnost:** Algoritmus musí používat správné vzorce a postupy. Při porušení program zdánlivě pracuje, ale dává chybné výsledky.
  * *Zápis zlomků:* Zlomkovou čáru nahrazujeme lomítkem `/` a musíme správně použít závorky kvůli přednosti operací, např. `X := (A+B) / (C+D)`.
  * *Zápis funkcí a odmocnin:* Znak odmocniny se nahrazuje funkcí `SQRT(...)`. Argumenty odmocnin i goniometrických funkcí musí být vždy v závorce.
* **Jednoznačnost:** V každém kroku musí být naprosto jasné, jaký krok bude následovat. Je nutné pokrýt všechny možné větve rozhodování a ošetřit **podmínky řešitelnosti** (např. dělení nulou, záporný výraz pod odmocninou v oboru reálných čísel).
* **Obecnost:** Algoritmus by měl řešit co nejširší skupinu úloh (např. sečítat jakákoli dvě čísla `A + B`, nikoli jen konkrétní `1 + 1`).
* **Opakovatelnost (determinismus):** Při zadání stejných vstupních dat musí algoritmus vždy dospět ke stejným výsledkům. Výsledek nesmí záviset na neinicializovaných (neznámých) proměnných.
* **Srozumitelnost:** Zápis musí být čitelný pro programátory i pro samotného autora při pozdějších úpravách. Pomáhají tomu standardní metody zápisu, komentáře a popis významu proměnných.

---

## 2. Možnosti zápisu algoritmů

| Forma zápisu | Použití a charakteristika | Výhody | Nevýhody |
| :--- | :--- | :--- | :--- |
| **Slovní vyjádření** | Návody, recepty, prvotní komunikace analytika se zákazníkem (laikem). | Srozumitelné i pro laiky bez znalosti programování. | Nejméně přehledné, těžko se hlídá jednoznačnost a přesnost. |
| **Matematický zápis** | Úlohy popsatelné matematickými vzorci a vztahy. | Jednoznačný pro odborníky (techniky, výzkumníky). | Málo podrobný pro počítač (neobsahuje ošetření okrajových podmínek). |
| **Rozhodovací tabulky** | Situace s více kombinacemi vstupů a jednoduchým řešením (např. rozvrh hodin, daňové pásmo, pravdivostní tabulky `AND`/`OR`). | Velmi přehledné, jednoznačné a snadno pochopitelné. | Nehodí se pro složitější postupy vyžadující delší vysvětlení. |
| **Vývojové diagramy** | Grafický symbolický jazyk složený ze značek spojených orientovanými hranami (šipkami). | Názorné, přehledné, skvělé pro týmovou spolupráci a dokumentaci. | Počítač jim přímo nerozumí (nutno přepsat do kódu). |
| **Počítačový program** | Zápis v programovacím jazyce, který **překladač** převede do strojového kódu. | Jediná forma, které rozumí člověk i počítač. | Rozumí jí jen znalec daného jazyka, méně přehledné. |

*(Poznámka: Pro návrh databází a objektové programování se využívají i metody strukturální a objektové analýzy.)*

---

## 3. Základní značky vývojových diagramů
Postup ve vývojovém diagramu se kreslí standardně **odshora dolů a zleva doprava**.

* **Mezní značka (ovál):** Označuje `Začátek` (vystupuje z něj 1 šipka dolů) nebo `Konec` (vstupuje do něj 1 šipka shora) programu či podprogramu.
* **Vstup / Výstup (kosodélník):** Komunikace s uživatelem či soubory. Pro načtení dat se používá `Čti: ...`, pro výpis výsledků `Zobraz: ...`. Má 1 vstup a 1 výstup.
* **Zpracování (obdélník):** Sekvenční blok pro výpočty a transformaci dat (např. `A := A + B`). Má 1 vstup a 1 výstup, nedochází v něm k větvení.
* **Rozhodovací blok (kosočtverec):** Slouží k větvení algoritmu na základě podmínky uvnitř. Má 1 horní vstup a 2 výstupy: `+` (nebo *ano/yes* – podmínka splněna) a `-` (nebo *ne/no* – podmínka nesplněna).
* **Příprava (šestiúhelník):** Zahájení (případně i ukončení) cyklu o známém počtu opakování.
* **Spojka (kolečko s číslem):** Spojuje přerušené části diagramu (např. při přechodu na další sloupec či stránku); obě související spojky mají stejné číslo.
* **Podprogram (obdélník se svislými čarami po stranách):** Samostatně zpracovaná, opakující se část programu, která zjednodušuje strukturu a ladění.

---

# Testové otázky

### Část A: Výběr z možností (pouze 1 správná odpověď)

**1. Jak se v programu projeví algoritmus, ve kterém byla porušena podmínka věcné správnosti?**
* a) Program se nikdy nespustí a překladač nahlásí syntaktickou chybu.
* b) Program se zacyklí a bude nutné ho násilně ukončit.
* c) Program zdánlivě pracuje bez problému, ale poskytuje chybné výsledky.
* d) Program skončí ihned po načtení prvního vstupního údaje.

**2. Který z následujících zápisů správně převádí matematický zlomek $\frac{A+B}{C+D}$ do programátorského zápisu?**
* a) `X := A+B / C+D`
* b) `X := (A+B) / (C+D)`
* c) `X := A+B / (C+D)`
* d) `X := (A+B) / C+D`

**3. Jak se ve vývojovém diagramu značí blok pro načtení vstupních dat od uživatele?**
* a) Obdélníkem s textem `Načti:`
* b) Kosočtvercem s textem `Vstup:`
* c) Kosodélníkem s textem `Čti:`
* d) Oválem s textem `Začátek:`

**4. Která vlastnost algoritmu zajišťuje, že při zadání stejných vstupních dat dostaneme vždy stejný výsledek?**
* a) Obecnost
* b) Srozumitelnost
* c) Jednoznačnost
* d) Opakovatelnost

**5. Jaký je hlavní účel překladače?**
* a) Převádí vývojový diagram na slovní popis pro zákazníka.
* b) Překládá program napsaný v programovacím jazyce do strojového kódu.
* c) Automaticky opravuje logické chyby a podmínky řešitelnosti v algoritmu.
* d) Převádí cizojazyčné komentáře v kódu do češtiny.

---

### Část B: Otevřené otázky

**6. Vyjmenujte všech 6 základních podmínek (vlastností), které musí splňovat správný algoritmus.**

**7. Jaké dvě hlavní podmínky řešitelnosti musíme v algoritmech nejčastěji ošetřit pomocí větvení, aby program při výpočtu nehavaroval?**

**8. Vysvětlete rozdíl mezi logickým součinem (`AND`) a logickým součtem (`OR`) dvou proměnných A a B.**

**9. K čemu slouží ve vývojovém diagramu značka „Spojka“ a jakým pravidlem se řídí její označování?**

---

### Klíč správných odpovědí

* **1:** **c)** (Chyba se na první pohled nepozná, protože výpočet proběhne, ale se špatným vzorcem.)
* **2:** **b)** (Zlomková čára určuje prioritu, kterou musíme nahradit závorkami v čitateli i ve jmenovateli.)
* **3:** **c)** (Kosodélník s příkazem `Čti:` slouží pro vstup dat.)
* **4:** **d)** (Opakovatelnost zaručuje stejné chování a výsledky při stejných podmínkách a vstupech.)
* **5:** **b)** (Počítač rozumí pouze strojovému kódu, do kterého program převede překladač.)
* **6:** Začátek a konec (konečnost), věcná správnost, jednoznačnost, obecnost, opakovatelnost, srozumitelnost.
* **7:** Jmenovatel zlomku se nesmí rovnat nule (dělení nulou) a výraz pod odmocninou nesmí být záporný (v oboru reálných čísel).
* **8:** Logický součin (`A AND B`) má hodnotu 1 pouze tehdy, jsou-li obě proměnné A i B rovny 1. Logický součet (`A OR B`) má hodnotu 1 tehdy, když je alespoň jedna z proměnných (nebo obě) rovna 1.
* **9:** Slouží ke spojení dvou částí vývojového diagramu, které nelze nakreslit souvisle (např. na konci stránky nebo kvůli křížení čar). Spojka na konci přerušení a na začátku pokračování musí být označena stejným číslem.
