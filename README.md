# Chroma — Website

Statische Website (kein Build-Schritt nötig): `index.html`, `ueber-mich.html`, `impressum.html`, `datenschutz.html`, `styles.css`, `script.js`. Fotos sind aktuell noch Platzhalter (Farbverläufe + Beschriftung) — sobald echte Produktfotos existieren, einfach `<img>`-Tags anstelle der `.color-photo` / `.hero-half` Divs einsetzen.

## Vor dem Live-Schalten noch ausfüllen

- Alle Vorkommen von `https://YOUR-SHOP.payrexx.com` durch den echten Payrexx-Shop-Link ersetzen (Nav, Farbkarten, Footer-CTA).
- Preise `[CHF ___]` in den Farbkarten.
- `impressum.html`: Name/Firma, Adresse, E-Mail, ggf. UID.
- `datenschutz.html`: verantwortliche Stelle, ggf. Analytics-Hinweis, Link zur Payrexx-Datenschutzerklärung.
- `ueber-mich.html`: Kontakt-E-Mail, Text nach Wunsch anpassen.
- FAQ-Antwort zum Versand ins Ausland.

Beides sind Entwürfe ohne Rechtsberatung — vor dem Launch prüfen (lassen), siehe auch die separate Notiz zu den regulatorischen Anforderungen im Projekt.

## Deployment auf Netlify

**Schnelltest (kein Account nötig):** Auf app.netlify.com/drop diesen ganzen Ordner per Drag & Drop hochladen. Netlify vergibt sofort eine Test-URL (`irgendwas.netlify.app`) — gut zum Anschauen, aber ohne eigene Domain und ohne einfaches Re-Deployment bei Änderungen.

**Für den echten Betrieb (empfohlen):**
1. Code in ein GitHub-Repository pushen (privat oder öffentlich, beides geht).
2. Auf netlify.com einloggen/registrieren → "Add new site" → "Import an existing project" → GitHub-Repo auswählen.
3. Build-Einstellungen: kein Build-Command nötig, Publish-Verzeichnis ist der Ordner-Root (`.` bzw. leer lassen, da reines HTML/CSS/JS).
4. Nach dem ersten Deploy: Site settings → Domain management → "Add a domain" → `chroma-light.com` eingeben.

## Domain verknüpfen

Netlify zeigt dir danach zwei Möglichkeiten:

- **Netlify-Nameserver verwenden** (einfachste Variante): Du trägst bei deinem Registrar die von Netlify angegebenen Nameserver ein, Netlify verwaltet danach die komplette DNS-Zone.
- **Bestehende DNS-Einträge anpassen**: Ein `A`-Record für `chroma-light.com` auf die von Netlify angegebene IP, plus ein `CNAME` für `www` auf `<dein-site-name>.netlify.app`.

Die exakten Schritte beim Registrar hängen davon ab, wo die Domain registriert ist — dazu gibt's separat eine kurze Anleitung, sobald der Registrar bekannt ist.
