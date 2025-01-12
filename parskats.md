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
<table>
  <tr>
    <td>1</td>
    <td>Mājaslapa</td>
    <td>Sniedz lietotājam iespēju ērti apskatīt gaisa kvalitāti telpā un ātri novērtēt situāciju.</td>
    <td>
      - Nodrošina ērtu piekļuvi informācijai.<br>
      - Var izmantot jebkurā ierīcē ar interneta pieslēgumu.<br>
      - Informācija tiek attēlota lietotājam saprotamā formātā.
    </td>
    <td>
      - Nepieciešams interneta pieslēgums.<br>
      - Informācija nav pieejama bez tehniskas ierīces.
    </td>
  </tr>
  <tr>
    <td>2</td>
    <td>Gaisa kvalitātes prognoze</td>
    <td>Palīdz lietotājam pieņemt lēmumu, vai nepieciešams ieslēgt ventilāciju.</td>
    <td>
      - Nodrošina prognozes tuvākajām stundām.<br>
      - Palīdz optimizēt ventilācijas lietošanu un enerģijas patēriņu.<br>
      - Prognozes balstītas uz iepriekšējiem datiem un algoritmiem.
    </td>
    <td>
      - Prognozes precizitāte var būt atkarīga no datu kvalitātes.<br>
      - Nepieciešama datu uzkrāšana un apstrāde.
    </td>
  </tr>
  <tr>
    <td>3</td>
    <td>Ieraksti par iepriekšējiem datiem</td>
    <td>Ļauj lietotājam apskatīt vēsturiskos gaisa kvalitātes datus, lai pārliecinātos par uzlabojumiem.</td>
    <td>
      - Nodrošina piekļuvi vēsturiskajiem datiem.<br>
      - Palīdz analizēt gaisa kvalitātes tendences.<br>
      - Dati pieejami grafiku vai tabulu formātā.
    </td>
    <td>
      - Nepieciešama liela datu glabāšanas vieta.<br>
      - Analīzei jābūt vizuāli saprotamai lietotājam.
    </td>
  </tr>
  <tr>
    <td>4</td>
    <td>Gaisa kvalitātes grafiki</td>
    <td>Padara informācijas novērtēšanu ērtāku un vizuāli saprotamāku.</td>
    <td>
      - Vizuāli attēlo datus.<br>
      - Palīdz ātri pamanīt izmaiņas gaisa kvalitātē.<br>
      - Nodrošina interaktīvas analīzes iespējas.
    </td>
    <td>
      - Sarežģīta datu interpretācija lietotājiem bez tehniskām zināšanām.<br>
      - Nepieciešama atbilstoša grafiku atjaunināšana.
    </td>
  </tr>
  <tr>
    <td>5</td>
    <td>Paziņojumi par sliktu gaisa kvalitāti</td>
    <td>Informē lietotāju, kad gaisa kvalitāte ir zemā līmenī, lai aizsargātu veselību.</td>
    <td>
      - Nodrošina tūlītējus brīdinājumus.<br>
      - Palīdz ātri reaģēt uz izmaiņām.<br>
      - Var pielāgot paziņojumu biežumu un sliekšņus.
    </td>
    <td>
      - Nepieciešams atbilstošs sensora aprīkojums.<br>
      - Var rasties nepatiesi pozitīvi vai negatīvi paziņojumi.
    </td>
  </tr>
</table>

## Prasības
## Algoritms
## Konceptu modelis
![Konceptu modelis](https://github.com/viktorijagrietniece/ProLab/raw/master/konceptu_modelis.png)
## Tehnoloģiju steks
![Tehnoloģiju steks](https://github.com/viktorijagrietniece/ProLabFinal/raw/main/tehnologiju_steks_final.png)
## Programmatūras apraksts

# Novērtējums
## Novērtēšanas plans
## Novērtēšanas rezultāti

# Secinājumi
