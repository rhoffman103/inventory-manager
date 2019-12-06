# Inventory Manager

Inventory Manager is a mockup for a specialized manufacturing process. The MVP will allow Admin(s) to be able to create work orders and update the schedule for production. The production floor will have a simple UI to add finished product, scrap and downtime, while keeping track of the progress.

For demo purposes, you can log into this app with a "managers" and "operators" account.

>Manager: manager@123.com password: pass12
>
>Operator: operator@123.com password: pass12



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