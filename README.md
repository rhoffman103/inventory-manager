# Inventory Manager

Inventory Manager is a mockup for a specialized manufacturing process. 
Managers can add new products to the database to create new job jackets and update the running schedule.
Operators get an updated schedule to add new product, scrap and downtime while keeping track of a job jackets progress.

For demo purposes, you can log into this app with a "managers" and "operators" account.

>Manager: manager@123.com password: pass12
>
>Operator: operator@123.com password: pass12

I used this project to experiement and explore some technologies, mostly Reacts new hooks with the updated context api and firebases nosql firestore.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The electron.js enviornment was recreated by these steps [elecron and cra](https://medium.com/@kitze/%EF%B8%8F-from-react-to-an-electron-app-ready-for-production-a0468ecb1da3)

## scripts

```npm run start``` serves react in the browser and firebase functions.

```npm run electron-start``` serves react in electron and firebase functions.

## Tech Used

client-side
 * react
 * firebase
 * electron
 * react-bootstrap
 * moment js
 * react-beautiful-dnd

database
  * cloud firestore

backend
 * firebase functions
 * express js