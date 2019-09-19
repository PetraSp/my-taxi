# FREE NOW Frontend Test
Please finish the tasks specified below and send us the code as a '.zip' file afterwards.
Keep the following in mind while implementing the given tasks:
- The task is chosen to be simple enough to be finished within a maximum of four hours.
  The goal is to give you the chance to give us an impression of your coding style, coding skills and architectural knowledge.
  We do not only want to have the tasks solved, but solved in a beautiful way.
- Do it as you would do it in a real world project! Keep the app maintainable and extendable.
- When you've finished your work please delete the "node_modules" folders. We'll run `npm install` when we receive your test.
- Please send us the result as a .zip-file to career@free-now.com.

Good Luck!

## Tasks:
###Task 1: Retrieving Data & List
Write a JavaScript app that displays a list of vehicles for both FREE NOW and SHARE NOW.
- You can load the vehicles from the server you'll start (info on starting it in the "Setup" section)
    - The response from the server is in JSON and can be found in the files `Server/free-now/vehicles.json` and `Server/share-now/vehicles.json`.
- Fill the List with some useful vehicle-information provided by the API. You can create a custom cell with specific vehicle data - simply impress us ;-)
###Task 2: Map
Extend your app, to show the vehicles from the list within a map.


## Server Setup:
- Run `npm install` in the `Server` folder to install the server dependencies.
- Run `npm start` in the `Server` folder to start the server.
    - You should see something like. `Listening on Port: 5000`
- Now you can now start building your application in the `FE` folder.


### Server Info
Server is running at localhost:5000

### API Routes:

#### Get a list of all FREE NOW vehicles:
/free-now/vehicles

#### Get a list of all SHARE NOW vehicles:
/share-now/vehicles

To get the SHARE NOW vehicles for example you can call: http://localhost:5000/share-now/vehicles


## Frontend Setup:
If you'd like you can use Create React App or any other CLI to scaffold your React application.

### Create React App
* Allows you to quickly set up a React application.
* Link: https://github.com/facebook/create-react-app
* How to use:

```
npm install -g create-react-app

create-react-app free-now-test-frontend
cd free-now-test-frontend
npm start
```
