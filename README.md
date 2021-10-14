# contact_keeper

## Setup for this app

1. Initialize npm: Run 'npm init'

- update package.json: change main -> server.js
- add description

2. Add packages/dependencies: Run 'npm i express bcryptjs jsonwebtoken config express-validator mongoose'

- express: server
- bcryptjs: hashes passwords
- jsonwebtokn: for authentication (acess protected rooutes oon our server)
- config: for global variables
- express-validator: to validate any body data that's coming in
- mongoose: abstraction layer too interact with database; allows us to create models

3. Add _dev_ dependencies (-D): Run 'npm i -D nodemon concurrently'

- nodemon: keeps our server running to see changes live
- concurrently: allows us to run the backend and frontend react server at the same time

4. Add scripts in package.json

- "start": "node server.js",
  "server": "nodemon server.js"

## Mongoose

- need a model for each database resource

## Setup for Frontend

1. Run 'npx create-react-app client'

- adds react part of app in a folder called 'client'

2. Go into backend's package.json and add more scripts:

- "client": "npm start --prefix client" (to run it in the client folder)
- "clientinstall": "npm install --prefix client"
- "dev": "concurrently \"npm run server\" \"npm run client\""

3. Add proxy in package.json of client folder

- "proxy": "http://localhost:5000" (placed at the bottom on its own)
- this makes it to where we don't have to type the localhost every single time we make an api call

4. Add our dependencies for React (must be from client folder!)

- npm i axios react-router-dom uuid react-transition-group

## Small Notes

- any requests to the backend from the frontend should be async
- to see tokens:

* go to 'Application' in Developer Tools
* View under 'Local Storage'

- If you get a warning in the console saying 'Each child in a list should have a unique "key" prop.', remember MongoDB uses '.\_id' instead of '.id'.
