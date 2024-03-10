# Kino veebirakendus

### Kirjeldus
Kino rakendus võimaldab kasutajatel leida ja broneerida filme ning istekohti kinosaalis. Rakendus pakub erinevaid filtreerimisvõimalusi, et soovitada kasutajatele just neile huvipakkuvaid filme ja istekohti.

### Tehnoloogiad
Rakenduse backendiks on Spring Boot ja frontend React + TailwindCSS.

<hr>

### Rakenduse Funktsioonid 
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

<hr>

### Backend Endpointid
* GET /auth - Kõikide kasutajate kuvamine
* POST /auth/signup - Kasutaja registreerimine
* POST /auth/signin - Sisselogimine
* GET /auth/me võtab küpsistest jwt tokeni ja tagastab kasutaja andmed
* POST /auth/{userId}/addMovie/{movieId}" kasutajale filmi lisamine vaatamise ajalukku


* GET /movies - Kõikide filmide kuvamine
* GET /movies/{id} - Filmide üksikasjad
* PUT /movies/{id} - Filmi andmete muutmine

<hr>

### Kuidas ülesande lahendasin

Alustasin ülesande lahendamist planeerimisega, et välja mõelda klassid ja struktuur.
Backendi struktuuri selgitus: 
1. controller: MovieController, UserController, mis vastutavad HTTP päringute eest.
2. Service: UserService, MovieService on äriloogika jaoks, et erinevaid operatsioone teostada. Näiteks filmide lisamine, leidmine jne.
3. Model: User, Movie on nn põhikomponendi klassid, mis hoiavad filmide, kasutajatega seotud infot.
4. Repository: MovieRepository, UserRepository võimaldavad andmebaasiga suhtlemist. "Andmebaasiks" on JPA (Java Persistence API), eeldasin et pole vaja ala postgres vms andmebaasi siia lisada. See tähendab ka, et andmed ei salvestu kui rakendus kinni pannakse. Lisasin mõned hardcode-itud filmid, et alati midagi olemas oleks.
5. Security, autentimisega seotud failid.

<br><br>
Implementeerimist alustasin backendist. Tegin kõigepeale filmide endpointid, et saaks filme lisada ja neid GET requestiga kätte saada. Tegin ka kasutajale endpointid. Siis tegin Reactiga frontendis filmide tabeli ja integreerisin backendiga st kuvasin filmitabelisse filmid ja filmidele detailse vaate. <br>
Rakendus vajas ka autentimist, kuna on olemas kasutajad, kellel vaatamise ajalugu ja kes peavad saama sisse logida/registreeruda. Selleks lisasin juurde Spring security koos jwt-ga. Selle jaoks sain abi siit (ainult backendi pool): https://www.geeksforgeeks.org/spring-security-login-page-with-react/  Täiendasin seda, lisades vajalikud funktsioonid, parandasin ära ka errorid, mis tekkisid. <br>
Seejärel liikusin veel frontendi arendamise juurde. Lõin kasutaja profiili, sisselogimise/registreerimse lehe ja integreerisin selle backendiga. Autentimise protsess oli pigem keerulisem, pidin ka väikse testi tegema, et kontrollida, kas jwt tokenist saab eraldada õiget infot. 

