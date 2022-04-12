# FEP JS 01 - JS Basics

<img src="./assets/JavaScript-logo.png" alt="JS Logo" width="200px" height="200px">


## Install en Run

Dit is de Backend voor de opdracht FEP1-JS03-01. Clone deze repository en run vervolgens 
```
npm install
```
Hierna kun je met
```
npm run start
```
de server starten. Optioneel kun je nog een port opgeven. De construct hiervoor is:
```
npm run start [-- -p <Port Number>]
```
Standaard in development mode, wat inhoud dat CORS (Cross Origin Resouce Shareing) aan staat (zie deze [YouTube video](https://youtu.be/4KHiSt0oLJ0) voor meer informatie omtrent CORS).
Met het commando:
```
npm run start:prod [-- -p <Port Number>]
```
kun je de server in de productie modus starten wat beinhoud dat CORS niet ondersteund wordt.
Je (gebuilde) frontend code zou dan in de map public bij de server moeten komen te staan.

## REST API
| Method | URL | Description |
| --- | --- | --- |
| GET | /v1/subject | returns an array of all the subjects objects
| GET | /v1/subject/{key} | returns an object of a single subject for the given key value. A 404 error will be returned in case that no subject with this key exists.
| POST | /v1/subject/:key | Allows you to add a subject |
| GET | /v1/reset | Allows you to reset the subjects back to their initial dummy data.