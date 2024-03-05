### Kino veebirakendus

## Kirjeldus
Kino rakendus võimaldab kasutajatel leida ja broneerida filme ning istekohti kinosaalis. Rakendus pakub erinevaid filtreerimisvõimalusi, et soovitada kasutajatele just neile huvipakkuvaid filme ja istekohti.

### Tehnoloogiad
Rakenduse backendiks on Spring Boot ja frontend React + TailwindCSS.

### Funktsioonid
1. Filmi Soovitamine
1.1 Kinokava kuvamine: Kasutajad näevad kinokavasid koos filmide ja seansside ajakavaga.
1.2 Filtreerimisvõimalused: Kasutajad saavad filtreerida kinokava erinevate kriteeriumide järgi, näiteks žanri, vanusepiirangu, algusaja ja keele järgi.
1.3 Kui kasutaja on sisse logitud: Soovitus vaatamisajaloo põhjal: Kasutajad saavad valida soovituste vaatamise oma ajaloo põhjal, võttes arvesse varasemaid kinokülastusi.

2. Istekohtade Soovitamine

2.1 Filmivalik: Kasutaja valib soovitud filmi ja määrab ostetavate piletite arvu.
2.2 Istekohtade soovitamine: Rakendus soovitab kasutajale istekohti, võttes arvesse mitut piletit ja kasutajate eelistusi.
2.3 

### Backend Endpointid
* GET /auth - Kõikide kasutajate kuvamine
* POST /auth/signup - Kasutaja registreerimine
* POST /auth/signin - Sisselogimine 
* GET /movies - Kõikide filmide kuvamine
* GET /movies/{id} - Filmide üksikasjad
* PUT /movies/{id} - Filmide muutmine
