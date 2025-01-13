# Ievads
### Problēmas nostadne:
<p>Universitātē vienlaicīgi atrodas liels cilvēku skaits, tādēļ ir svarīgi sekot gaisa kvalitātei telpās, jo tā būtiski ietekmē studentu un personāla labsajūtu, veselību un produktivitāti. Tāpēc ir nepieciešama sistēma, kas spētu nepārtraukti mērīt CO₂ līmeni un citus radītājus, analizēt iegūtus datus, taisīt gaisa kvalitātes prognozi un veidot vizualizāciju.

  ### Darba un novērtēšanas mērķis:
  <p> Darba mērķis ir izstrādāt mājaslapu, ar kuras palīdzību būs iespēja sekot līdz gaisa kvalitātei. Ir nepieciešams nodrošināt iespēju, balstoties uz iegūtiem datiem no sensoriem, veikt datu analīzi un nodrošināt pēc iespējās precīzāku prognozi. 
Novērtēšanas mērķis ir pārbaudīt izstrādātās sistēmas funkcionalitāti, lietošanas ērtumu un atbilstību mūsu darba mērķim.

# Līdzīgo risinājumu pārskats
<table>
  <tr>
    <th>Nr.</th>
    <th>Risinājums</th>
    <th>Īss apraksts</th>
    <th>Svarīgākās iezīmes</th>
    <th>Ierobežojumi</th>
  </tr>
  <tr>
    <td>1</td>
    <td>Air Quality Monitoring System</td>
    <td>Automātiskās sistēmas, kas mēra vairākus gaisa parametrus: CO₂ līmenis, mitrums, smalko daļiņu koncentrācija, temperatūra, gaistošie organiskie savienojumi (GOS).</td>
    <td>-darbojas reālajā laikā režīmā;
    <p>-atspoguļo aktuālus datus;</p>
    -brīdina par novirzi no normas;</td>
    <td>Šī sistēma pati par sevi ir tikai informatīva, tā sniedz datus par gaisa kvalitāti un var brīdināt par normas novirzēm, taču pati nevar atrisināt situāciju.</td>
  </tr>
  <tr>
    <td>2</td>
    <td>High Accuracy NDIR CO2 Sensor
CM1106H-NS</td>
    <td>Ļoti precīzs Co2 sensors, kurš mēra Co2 koncentrāciju gaisā. Viņam nav nepieciešama apkalpošana jo viņš pats sevi māk nokalibrēt un pielāgot apstākļiem</td>
    <td>Mūžs apmēram 15 gadi. Strādā temperatūrās no -10 līdz +50 grādiem. Automātiskā kalibrēšana. Spēj strādāt gaisa mitrumā no 0 - 95%</td>
    <td>Šis ir sensors kurš nodod informāciju tālāk iekārtām, kas spēj regulēt gaisa kvalitāti, bet pats neko nedara. Mēra tikai Co2.</td>
  </tr>
  <tr>
    <td>3</td>
    <td>IQAir AirVisual Pro</td>
    <td>Sensors, kurš izmanto augstas precizitātes lāzeri gaisa kvalitātes noteikšanai reāllaikā, mēra vairākus parametrus. </td>
    <td>- Mēra vairākus parametrus vienlaicīgi
    <p>-Sniedz klientam personalizētus padomus</p>
    -Spēj identificēt piesārņojuma avotu</td>
    <td>Gan pats produkts, gan tā uzturēšana ir dārga, regulāro filtru maiņas dēļ</td>
  </tr>
  <tr>
    <td>4</td>
    <td>uHoo</td>
    <td>Vairāku sensoru ierīce gaisa kvalitātes noteikšanai rēallaikā, mērot dažādus parametrus, kā CO2, CO, tostarp arī Ozona līmeni, gaisa mitrumu un spiedienu.</td>
    <td>- Reāllaika brīdinājumi par gaisa kvalitāti
    <p>- Plaša gaisa kvalitātes pārraudzība</p>
    - Augsta precizitāte</td>
    <td>Dārgāka cena salīdzinot ar citiem tirgū pieejamajiem sensoriem.</td>
  </tr>
  <tr>
    <td>5</td>
    <td>Awair Element</td>
    <td>Maza ierīce, kas mēra istabas temperatūru, mitrumu, CO2 koncentrāciju, smalko cieto daļiņu daudzumu un organisko savienojumu daudzumu gaisā. Izmanto fēnu un lāzera sensoru.</td>
    <td>- Mēra gaisa kvalitātes parametrus reāllaikā.
    <p>- Viegli uzstādama un pārvietojama.</p>
    - Informāciju var nolasīt no ierīces vai lietojot telefona lietotni.
    <p>- Dod padomus, kā uzlabot gaisa kvalitāti.</p></td>
    <td>- Pats neuzlabo gaisa kvalitāti.
    <p>- Cena ir dārgāka, salīdzinot ar citiem produktiem.</p>
    - Jāmaksā abonements, ja grib uzglabāt gaisa kvalitātes datus, nevis tikai redzēt reāllaika infomāciju.</td>
  </tr>
</table>

# Tehniskais risinājums

## Prasības
<table>
  <tr>
    <td>1</td>
    <td>Mājaslapa</td>
    <td>Sniedz lietotājam iespēju ērti apskatīt gaisa kvalitāti telpā un ātri novērtēt situāciju.</td>
  </tr>
  <tr>
    <td>2</td>
    <td>Gaisa kvalitātes prognoze</td>
    <td>Palīdz lietotājam uzraudzīt gaisa kvalitāti un pieņemt lēmumus telpu gaisa kvalitātes kontolei.</td>
  </tr>
  <tr>
    <td>3</td>
    <td>Ieraksti par iepriekšējiem datiem</td>
    <td>Ļauj lietotājam apskatīt vēsturiskos gaisa kvalitātes datus, lai pārliecinātos par uzlabojumiem.</td>
  </tr>
  <tr>
    <td>4</td>
    <td>Gaisa kvalitātes grafiki</td>
    <td>Padara informācijas novērtēšanu ērtāku un vizuāli saprotamāku.</td>
  </tr>
  <tr>
    <td>5</td>
    <td>Paziņojumi par sliktu gaisa kvalitāti</td>
    <td>Informē lietotāju, kad gaisa kvalitāte ir zemā līmenī, lai pasargātu veselību.</td>
  </tr>
</table>

## Algoritms
![Algoritms](https://github.com/viktorijagrietniece/ProLabFinal/raw/main/algoritms.png)

## Konceptu modelis
![Konceptu modelis](https://github.com/viktorijagrietniece/ProLab/raw/master/konceptu_modelis.png)

## Tehnoloģiju steks
![Tehnoloģiju steks](https://github.com/viktorijagrietniece/ProLabFinal/raw/main/tehnologiju_steks_final.png)

## Programmatūras apraksts
Lai programmatūra izpildītu visus uzstādītos nosacījumus, tika izveidota pieslēgšanās lapa, kurā lietotāji var pieslēgties, vai, ja tiem nav profila, reģistŗēties. Reģistrētie lietotāji tiek pielaisti galvenajai lapai, kurā tie spēj apskatīt sensoru rādījumus, pievienot un dzēst sensorus, ja tiem ir admina pieeja, kā arī apskatīt sensoru iegūtos datus ar atpakaļ ejošu datumu un saņemt brīdinājumus par gaisa kvalitātes mainīgo novirzi no ieteiktajām normām.

# Novērtējums
## Novērtēšanas plans
### Risinājuma novērtēšanas plāns

#### Mērķis
Izmantojot Raspberry PI ievāktos sensoru datus par gaisa mitrumu, temperatūru un CO2 daudzumu, veikt prognozi katrai no mērvienībām ar pietiekami lielu precizitāti, lai veiktu gaisa kvalitātes kontroli.

#### Ieejas dati
- **Datums**
- **Laiks**
- **Oglekļa dioksīda līmenis**
- **Temperatūra**
- **Mitruma līmenis**

#### Novērtēšanas mēri
Vidējā kļūda starp prognozētajām gaisa kvalitātes mainīgo vērtībām un sensoru iegūtajiem rezultātiem.

#### Izejas mainīgie
- CO2, mitruma un temperatūras prognozes

#### Eksperimenta plāns
Tiek iegūtas prognozētās vērtības gaisa kvalitātes mainīgajiem, kas tiek salīdzinātas ar faktiskajām gaisa vērtībām attiecīgajā laika posmā. Tiktu aprēķināta vidējā kļūda starp prognozētajām un faktiskajām vērtībām katram no mainīgajiem. Galā tiek aprēķināta vidējā kļūda pieciem individuāliem kļūdas aprēķiniem, lai noteiktu vidējo kļūdas vērtību procentos.

#### Eksperimenta tabula

| Nr. | CO2 Prediction | CO2 Actual | Temperature Prediction | Temp Actual | Humidity Prediction | Humidity Actual | CO2 Error | Temp Error | Humidity Error |
|-----|----------------|------------|-------------------------|-------------|----------------------|-----------------|-----------|------------|----------------|
| 1   |                |            |                         |             |                      |                 |           |            |                |
| 2   |                |            |                         |             |                      |                 |           |            |                |
| 3   |                |            |                         |             |                      |                 |           |            |                |
| 4   |                |            |                         |             |                      |                 |           |            |                |
| 5   |                |            |                         |             |                      |                 |           |            |                |
| **SUM Error** | | | | | | | | | |

## Novērtēšanas rezultāti

| Nr. | CO2 Predic | CO2 Actual | Temp Pred | Temp Actual | Humidity Pred | Humidity Actual | CO2 Error | Temperature Error | Humidity Error |
|-----|------------|------------|-----------|-------------|---------------|-----------------|-----------|------------|----------------|
| 1   | 874.454    | 873.66     | 23.3      | 23.4        | 42.57         | 43.6            | 0.090882  | 0.42735    | 2.362385321    |
| 2   | 853.616    | 853.7      | 23.24     | 23.6        | 41.867        | 43.4            | 0.00984   | 1.525424   | 3.535258065    |
| 3   | 836.772    | 854.18     | 23.437    | 23.4        | 41.703        | 43.7            | 2.037978  | 0.15812    | 4.56979405     |
| 4   | 837.137    | 892.46     | 23.223    | 23.3        | 41.883        | 43.5            | 6.198933  | 0.330472   | 3.717214379    |
| 5   | 875.684    | 862.01     | 23.11     | 23.6        | 41.647        | 43.6            | 1.586293  | 0.276271   | 4.479357798    |
| **SUM Error** |            |            |           |             |               |                 | **1.984785** | **0.903527** | **3.732207323** |

Iegūtajos prognozētajos gaisa kvalitātes mainīgo rezultātos var novērot, ka iegūtā vidējā kļūda ogļskābes dioksīda prognozei ir 1.98%, attiecīgi temperatūrai kļūda ir 0.9% un mitrumam 3.73%. 
Tā kā visu mainīgo kļūdas iekļaujas <5% intervālā, varam secināt, ka gaisa kvalitātes mainīgo prognoze darbojās salīdzinoši precīzi.

# Secinājumi
Darba gaitā tika izstrādāta programmatūra, kas izpilda iepriekš izvirzītos nosacījumus gaisa monitoringa lietotnei. Prognozēšanas rezultāti uzrāda labas programmatūras prognozēšanas spējas - kļūdai uz prognozētajam vērtībām nepārsniedzot 5% slieksni.
