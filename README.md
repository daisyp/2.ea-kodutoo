# 2. kodutöö – kirjutamise mängu täiendamine

Mängu eesmärk on võimalikult kiiresti ekraanile tekkivaid sõnu ära trükkida. Sõnad on võetud [Eesti Keele Instituudi lehelt](http://www.eki.ee/tarkvara/wordlist/) – [lemmad2013](http://www.eki.ee/tarkvara/wordlist/lemmad2013.txt). Aluseks tuleb võtta kood **[eesrakenduste-arendamine-2018k/klahvimine](https://github.com/eesrakenduste-arendamine-2018k/klahvimine)**. 

### Tähtpäev 26.03.2018 23:59

## Mäng

1. Autorid: Daisy Pukkonen | Kurmo Rootsi 
2. Mängu on lisatud täiendavad funktsionaalsused:  
    * eraldi on mängu tutvustav leht, saab sisestada mängija nime ning alustada mängu, saab näha highscore'i, muuta taustavärvi(dark/light mode switch), info nupu all autorid ning mängu kirjeldus; 
    * mängijate kohta hoitakse meeles ja salvestakse skoor, kasutades [localStorage]; 
    * skoori arvutus on lahendatud keerulisemalt kui seda on juba olemasolev arvatud sõnade loetlemine; 
    * eraldi näidatakse välja 10 parima mängija skoori; 
    * mängu lisafunktsioon:
        * eraldi on öörežiim (muudab taustavärvi heledaks/tumedaks)
		
## Skeem rakenduse tööprotsessidest

![alt text](https://www.upload.ee/image/8230956/start.JPG)
![alt text](https://www.upload.ee/image/8239577/29547174_1657611087626351_1705142854_n.jpg)

## Skoori moodustamise kirjeldus

Skoor moodustub õigesti vastatud sõnade arvust ning sajalasest punktikaotuse funktsioonist.
Alustatakse 50 eluga, ning iga valesti läinud tähemärgiga (mis on sõna esimene tähemärk) kaotatakse 1 elu.
Skoor moodustub 0 punkti alustusega ning punkte teenitakse score=1*game_multiplier, ning õige tähega liidetakse game_multiplier'ile +=3.6
