# Algoritmy a algoritmizace

Statická česká učební stránka o algoritmizaci a zpracování textu. Projekt nevyžaduje instalaci ani backend.

## Soubory

- `index.html` – struktura a obsah stránky
- `style.css` – vzhled, responzivita a animace
- `script.js` – navigace, progress testu a vyhodnocení
- `algo1.md` – hlavní zdroj
- `citace.md` – přehled použitých zdrojů

## Lokální spuštění

Otevřete `index.html` přímo v prohlížeči, nebo z kořenového adresáře spusťte lokální server:

```powershell
py -m http.server 8000
```

Poté otevřete `http://localhost:8000`.

## Bezpečnost stránky

Stránka je čistá statická aplikace. Nenahraje žádné externí knihovny, nevytváří přesměrování ani neodesílá odpovědi testu na server. Otevřené odpovědi se zpracují pouze v JavaScriptu v prohlížeči. HTML obsahuje omezení Content Security Policy a přísné omezení zdrojů pouze na vlastní soubory projektu.

## Publikování na GitHub Pages

1. Vytvořte repozitář a nahrajte všechny soubory z kořenové složky projektu.
2. Otevřete na GitHubu **Settings → Pages**.
3. V části **Build and deployment** zvolte **Deploy from a branch**.
4. Vyberte větve `main` a složku `/ (root)`.
5. Uložte nastavení. GitHub po chvíli zveřejní stránku na adrese:

   `https://<uzivatelsky-nazev>.github.io/<nazev-repozitare>/`
