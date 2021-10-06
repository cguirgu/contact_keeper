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
