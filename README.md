# Kino veebirakendus

## Kirjeldus
Kino rakendus võimaldab kasutajatel leida ja broneerida filme ning istekohti kinosaalis. Rakendus pakub erinevaid filtreerimisvõimalusi, et soovitada kasutajatele just neile huvipakkuvaid filme ja istekohti.

## Tehnoloogiad
Rakenduse backendiks on Spring Boot ja frontend React + TailwindCSS.

## Kasutamine
### Spring booti rakenduse käivitamine
1. Vaata, et oleks olemas JDK 21 ja Intellij IDEA.
2. Impordi project.
3. Käivita rakendus CgiTestApplication.java failist. Rakendus kasutab porti 8080.
### Reacti käivitamine
1. Vaata, et oleks olemas NodeJS.
2. Mine frontend folderisse `cd frontend`
3. Installimiseks `npm install`
4. Rakenduse käivitamiseks `npm run dev` (dev server). Rakendus kasutab porti 5173.
## Rakenduse Funktsioonid 
<br>

**1. Filmi Soovitamine** <br>

1.1 Kinokava kuvamine: Kasutajad näevad kinokavasid koos filmide ja seansside ajakavaga. <br>
1.2 Filtreerimisvõimalused: Kasutajad saavad filtreerida kinokava erinevate kriteeriumide järgi, näiteks žanri, vanusepiirangu, keele järgi. <br>
1.3 Kasutaja registreerimine <br>
1.4 Kasutaja sisse logimine <br>
1.5 Sisselogitud kasutajad saavad valida soovituste vaatamise oma ajaloo põhjal, võttes arvesse varasemaid kinokülastusi. <br>
1.6 Enda profiili vaatamine sh ka varasemalt vaadatud filme. <br>

**2. Istekohtade Soovitamine** <br>

2.1 Kasutaja saab valida soovitud filmi. <br>
2.2 Kasutaja saab valida piletite arvu. <br>
2.2 Rakendus soovitab kasutajale istekohti, võttes arvesse mitut piletit ja seda, et istekohad võiksid olla võimalikult keskel ja mitme pileti valimisel kõrvuti. <br>
2.3 Film lisatakse kasutaja ajalukku kui ta on sisselogitud ja "ostab" pileti. <br>


## Backend Endpointid
* GET /auth - Kõikide kasutajate tagastamine
* POST /auth/signup - Kasutaja registreerimine
* POST /auth/signin - Sisselogimine
* DELETE /auth/logout - Välja logimine
* GET /auth/me - tagastab kasutaja, kes on sisse loginud.
* POST /auth/{userId}/addMovie/{movieId}" kasutajale filmi lisamine vaatamise ajalukku


* GET /movies - Kõikide filmide kuvamine
* GET /movies/{id} - Filmide üksikasjad
* PUT /movies/{id} - Filmi andmete muutmine
* DELETE /movies/{id} - filmi kustutamine


## Kuidas ülesande lahendasin

Alustasin ülesande lahendamist planeerimisega, et välja mõelda klassid ja struktuur.
Backendi struktuuri selgitus: 
1. controller: MovieController, UserController, mis vastutavad HTTP päringute eest.
2. Service: UserService, MovieService on äriloogika jaoks, et erinevaid operatsioone teostada. Näiteks filmide lisamine, leidmine jne.
3. Model: User, Movie on nn põhikomponendi klassid, mis hoiavad filmide, kasutajatega seotud infot.
4. Repository: MovieRepository, UserRepository võimaldavad andmebaasiga suhtlemist. "Andmebaasiks" on JPA (Java Persistence API), eeldasin et pole vaja ala postgres vms andmebaasi siia lisada. See tähendab ka, et andmed ei salvestu kui rakendus kinni pannakse. Lisasin mõned hardcode-itud filmid, et alati midagi olemas oleks.
5. Security, autentimisega seotud failid.

<br><br>
Implementeerimist alustasin backendist. Tegin kõigepeale filmide endpointid, et saaks filme lisada ja nende infot GET requestiga kätte saada. Tegin ka kasutajale endpointid. Siis tegin Reactiga frontendis filmide tabeli ja integreerisin backendiga st kuvasin filmitabelisse filmid ja tegin filmidele detailse vaate. <br>
Rakendus vajas ka autentimist, kuna on olemas kasutajad, kellel peab olema vaatamise ajalugu ja kes peavad saama sisse logida ja registreeruda. Selleks lisasin juurde Spring security koos jwt-ga. Selle jaoks sain abi siit juhendist (ainult backendi pool): https://www.geeksforgeeks.org/spring-security-login-page-with-react/ Aga see oli veidi poolik ja vajas täiendust/kohandamist selle rakenduse jaoks ja mõndade vigade parandamist.  <br>
Seejärel liikusin veel frontendi arendamise juurde. Lõin kasutaja profiili, sisselogimise/registreerimse lehe ja integreerisin selle backendiga. Autentimise protsess oli pigem keerulisem, pidin ka mõned testid tegema, et kontrollida, kas kõik töötab. 
Lõpuks hakkasin implementeerima istekohtade algoritmi. Alguses proovisin niisama midagi teha, aga väga head lahendust ei tulnud. Istekohtade algoritmi koha pealt pidin natuke mõtlema, aga aitas see, et panin paberile idee kirja. Jagasin ülesande väikesteks osadeks ja siis selle põhjal tegin koodi valmis. <br>
Lisaksin ka juurde ühe API kaudu IMDB filmide reitingud. API kaudu saab reitingu nii, et kõigepealt on request filmi pealkirja järgi ja sealt sab IMDB ID. Selle IDga saab reitingu, mis kuvatakse siis kui 'piletit' ostma hakatakse. 

## Filmi soovitamine
### Funktsioonid
- `calculateGenreFrequency`: Arvutab žanrite sageduse kasutaja vaatamiste ajaloos. <br>
- `calculateGenreWeights`: Arvutab žanrite kaalud sageduse põhjal. <br>
- `calculateMovieScores`: Arvutab filmide skoorid žanrite kaalude alusel. <br>
- `filterRecommendedMovies`: Filtridab soovitatud filme positiivsete skooride alusel. <br>
- `sortMoviesByScore`: Sorteerib soovitatud filmid skoori järgi kahanevas järjekorras. <br>
- `handleRecommendMovies`: Põhifunktsioon filmide soovitamiseks kasutaja ajaloo põhjal. <br>

### Funktsioonid
- `generateRandomSeats()`: See funktsioon genereerib juhuslikult broneeritud istekohad. Tagastab: Istekohtade maatriksi, kus iga istekoha olekuks on märgitud broneeritud või mittebroneeritud. <br>
- `generateRecommendedSeats()` -  Leiab parimad istekohad, mis asuvad võimalikult keskel ja on järjest. Tagastab: Parimate istekohtade massiivi. <br>
Kui sobivaid kohti ei leita, kuvatakse teade "Nii palju vabu kohti pole järjest." <br>
- `findBestSeatsInRow(row, numSelectedSeats)` See abifunktsioon leiab ühest reast parimad järjestikused istekohad. <br>
Parameetrid: <br>
row: Reaindeks, millest soovitakse parimaid istekohti leida. <br>
numSelectedSeats: Mitu järjestikust istekohta on vaja leida. <br>
Tagastab: Parimate istekohtade massiivi sellel real. <br>
Eeldasin ka, et keegi üle 10 pileti ei osta, st sellises juhul ei saaks istmed kõrvuti olla. 


