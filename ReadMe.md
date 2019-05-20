[![Build Status](https://travis-ci.org/Technologeek/api-panda-backend.svg?branch=master)](https://travis-ci.org/Technologeek/api-panda-backend)

# Assignment 2 - MERN Application

🔸 _Web-Application Name_ : API-Panda-Backend  
🔸 _Author_ : Rahul Patil  
🔸 _Student Reg No_ : 20083299

## Repositories

🐼 API-Panda takes an Isomorphic approach and runs the front-end isolated from the back-end in it's own container. The configuration, architecture, and deployment cycle for the front-end of the application has no depdendencies on the backend. The back-end is deployed as a standlone API which can be utilzied by any application using the provided routes. This is ideal for scaling and fits the scenario in an Enterprise where a team comprises of different front-end and back-end developers.

📌 API-Panda Front-end Repo : https://github.com/Technologeek/react-assignment . 

📌 API-Panda Back-end Repo : https://github.com/Technologeek/api-panda-backend . 

📌 API-Panda Postman Collection : https://www.getpostman.com/collections/c9c83a1f6f459ca967ff . 


❗️ Note : The documentation for each part will be located in their respective ReadMe files in the root directory of the repos.

## Overview

🐼 API-Panda is an in-browser alternative to to a API management library like Postman. API-Panda is lightweight, fast & supports **GET** & **POST** requests at the moment. This is ideal for developers who quickly like to see the _request/response_ format of the backend API endpoints to plan out their front-end architecture. Under the hood, API-Panda makes an actual API call for the given end-points along with their _content-type_ specifications and displays the response in a pretty format. It is similar to making an API call from a promise based liblary like _axios_ but instead of using browser's network cell to analyise the response, you use API-Panda to view the data returned by the network. After siging up, users can save their URL's in collections and access them later with one click.

🐼 API-Panda back-end offers a comprehensive API which goes beyond the scope of main application to implement new features if needed. The provided back-end is secure, tested, verified, and written to scale in terms of the application architecture & design philosophy.

## Application Philosophy

> One difference between a smart programmer and a professional programmer is that the professional understands that clarity is king. Professionals use their powers for good and write code that others can understand.
> — Robert C. Martin

API-Panda back-end takes an approach where the architecture design is shaped in a way that is abides by the principles of SOLID. Even though JavaScript is not an Object-Oriented programming language, by seperating the application logic from the views or models can give us a much cleaner code. API-Panda utilises such practices to ensure the written code is understandable , readable, changeable, extendable, and maintainable. To assure Seperation Of Concerns, each function, each class, each module exposes a single-minded attitude that remains entirely undistracted, and unpolluted, by the surrounding details.

## Application Architecture

It's important to understand the approaches taken to design the architecture. Let's have a look at the directory structure first.

![Directory Structure](https://res.cloudinary.com/doefdz9w7/image/upload/v1558366610/Api-panda/Screenshot_2019-05-20_at_16.36.20.png)

- 🔘 Decomposition : Every module is intended to perform only a specific task. For further decomposition, the modules are categorized into sub-directories. There is technically no "View" layer but the models & controllers are primary modules that utilize different methods.

- 🔘 Single Point of Action : In an express application, a single point of action ensures we have a dedicated middleware that performs an action on receiving the request/response.

Below is the brief description of every module in the directory.

- 🔘 Root of the project contains general configurations like babel, eslint, prettier, Travis and other files that will be utilized by the application on a global level.

  ➕ EsLint : Uses the famous airbnb plugin for the industry level linting policies. 
  
  ➕ Babel : Configured to use the latest ES6 features and transform runtimes while creating the production build.

- 🔘 Config : DataBase config goes here. This module is responsible for connecting to the Test/Production database depending on the variable received from the .env.

- 🔘 Controllers : The driver programs for business logic taking into account the other utility methods.

- 🔘 Errors : Returns a ValidationError. Further can be expanded to handle other errors in the application.

- 🔘 MiddleWares : Express middleware functions responsible for taking an action on the request/response received. Further classified as

  ➕ coreMiddleWares.js : All global middlewares will go here.
  
  ➕ errorHandler.js : Error handling middleware for the entire application. Will be responsible for throwing a specific error on the request received. Ideally, every error will be forwarded here by the next() callback.
  
  ➕ logger.js : Logger for the application using winston module.
  
  ➕ passport.js : Authentication middleware.
  
  ➕ promiseResolver.js : MiddleWare for resolving promises as the application is highly asynchronous.
  
  ➕ responseSender.js : General middleware for sending appropriate responses.
  
  ➕ Validation.js : This middleware currently handles only Validation for login/sign-up but the idea is to used a centralized middleware of handle all validations.

- 🔘 Models : Mongo Models/Schema of the application.

- 🔘 Queries : Provides a sort of Abstraction layer between the modles and the controllers. This also defines the general mongoose queries that can be resued throughout the application.

- 🔘 : Routes : Contains routes classified by the route-type and an index route. The primary motive while designing the route was to keep the routes clean and seperate all the business/application logic from the routes. For instance, a route with authentication will look like:

```
router.get(
  "/username/:username",
  passport.authenticate("jwt", { session: false }),
  promiseResolver(userController.getUserInformation),
  responseSender
)
```

- 🔘 : Server : Defines the entry point of the application.

- 🔘 : Test : Holds Testing strategies for the application seperated by the test type. (more in the testing section)

- 🔘 : Utils : Contains the Utility functions.

- 🔘 : Validation : Contains the custom validation utilities.

- 🔘 Misc

  ➕ combined.log : Logger file shows log messages.
  
  ➕ new_relic_agent.log : Shows logs from new_relic analytics system.
  
  ➕ Procfile : Heroku config.
  
  ➕ mochaawesome-report : Test/Coverage reports.
  
  ➕coverage : Coverage reports generated from NYC.

## Application Features

- 💊 Create a collection with an URL which will be persisted to a database.
- 💊 One-Click access to previous collections.
- 💊 One-Click make-request to previous API's.
- 💊 Search function to filter the existing collections.
- 💊 Perform instant GET/POST requests without creating a collection.
- 💊 View a request's Response/Error data in a pretty format.
- 💊 One click access for adding, updating & deleting collections.
- 💊 Auto-generation of a profile image based on the user's initials.
- 💊 Appropriate display of loaders, errors and strict validation when necessary.
- 💊 Intuitive User-Interface design.
- 💊 Bonus : System generated random quotes to keep developers motivated.

# Web API Endpoint Reference

| End-Point                                           | Request-Type | Request-Body                                                      | Response                                                                         |
| --------------------------------------------------- | ------------ | ----------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| _/api/auth/signup_                                  | `POST`       | {username,email,password}                                         | {userId,email,token,success,status}                                              |
| _/api/auth/login_                                   | `POST`       | {email,password}                                                  | {userId,email,token,success,status}                                              |
| _/api/users/:userId_                                | `GET`        | NA                                                                | {collections,id,username,email,created,updated,success,status}                   |
| _/api/users/email/:email_                           | `GET`        | NA                                                                | {collections,id,username,email,created,updated,success,status}                   |
| _/api/users/username/:username_                     | `GET`        | NA                                                                | {collections,id,username,email,created,updated,success,status}                   |
| _/api/users/:userid/collections_                    | `POST`       | {collectionname, method,url/description,userid,urls,imagedetails} | {collectionname, method,url/description,userid,urls,imagedetails,success,status} |
| _/api/users/:userid/collections_                    | `GET`        | NA                                                                | {collectionname, method,url/description,userid,urls,imagedetails,success,status} |
| _/api/users/:userid/collections/recent-collection_  | `GET`        | NA                                                                | {recent 10 collections user}                                                     |
| _/api/users/:userid/collections/search/:searchText_ | `GET`        | NA                                                                | { found collection}                                                              |
| _/api/collections/recent-collection_                | `GET`        | NA                                                                | {recent 10 collections all users }                                               |
| _/api/collections/:collectionId_                    | `GET`        | {}                                                                | {found collection}                                                               |
| _/api/collections/:collectionId_                    | `PUT`        | {collection data to update}                                       | {updated collection data,success,status,message}                                 |
| _/api/collections/:collectionId_                    | `DELETE`     | {}                                                                | {hash,signature,deletecount,success,status}                                      |
| _/api/quote_                                        | `GET`        | NA                                                                | {quote,id,author,success}                                                        |
| _/api/health_                                       | `GET`        | NA                                                                | {ok}                                                                             |

## Installation requirements.

This application is packaged for development & deployment builds with proper environment configurations. To use the application end-points, the live version should be used - https://api-panda-backend-server.herokuapp.com as it comes pre-configured with a mongoDb instance that is deployed to a Cloud.

To run the project locally,

1. Git clone this repository
   `git clone https://github.com/Technologeek/api-panda-backend.git`
   Cd into **api-panda-backend**
2. Ensure you've Node/Npm/Yarn installed to download the dependencies. The project uses following versions.
   - Node : v8.12.0
   - NPM : 6.4.1
   - Yarn : 1.9.4
3. It is recommended to use Yarn for downloading all the dependencies. But in it's absence, NPM would do the job. Perform the following commands from inside the project folder (directory where package.json is located)
   `yarn install` or `npm install`

4. Once the dependencies are downloaded, you can run the development project server by `npm start` . This should run the application on port 3000.

5. The environment variables file needs to be created manually (.env) and the data for the same will be sent to via slack. You can copy,paste that data and re-run the application to get the enviroment varibales working.

6. You need to configure the mongoDb url-string to point towards your local running instance or use the default that is the one deployed to the cloud.

7. Other commands are listed below
   `npm run start` - Starts the development server (uses nodemon).
   
   `npm run build` - Generates the Production build of the application in the dist folder.
   
   `npm run serve` - Serves the Production build of the application.
   
   `npm run test` - Initiates a test runner to run all the tests in parallel.
   
   `npm run generateTestReport` - Generates a test report in mochaawesome-report folder.
   
   `npm run coverage` - Generates test coverage report in the terminal.

8. If the above steps executed accurately, you'll have a server running locally as expected. Post-Man collection (linked above) can be used to test the API.

## Data Model Design.

![Data Model MongoDb](https://res.cloudinary.com/doefdz9w7/image/upload/v1558391378/Api-panda/Untitled_Diagram_1.png)

## Application Configuration

A .env file needs to be created in the root directory of the project with the following configurations.

```bash
PORT = 3000
JWT_ENCRYPTION_KEY = YourEncryptionKey
JWT_EXPIRATION_TIME = 10000
DB_URL = your_db_server_url_goes-here
````

## Security and Authentication

- 🔘 : API-Panda backend uses JWT based authentication along with passport for verification. Once the token is generated, the subsequent requests expect the same to be passed in the request header as a bearer token.

- 🔘 : The token then is verified before processing the request.

- 🔘 : Every route in the application is protected except _api/user/signup_, _/api/user/login_, _/api/quote_, _/api/health_

## Testing Strategies

- 🔘 : 'test' folder contains the test for all the components in the project. It will conduct two type of test- Integration Test, Unit Test, and end-to-end testing for one of the flows. The test are run through mocha and assertion are made through chai

- 🔘 : Integration Test
  Integration Test is placed in e2e folder. Integration test run through chai-http package. It also provides us the capability of spawning new Server at the destined port and then running all the test.
  The test includes -

Registering New User

Login User with the above credentials

Make a collection

Read a collection

Update a collection

Delete collection

All the corner cases in which the api should return an error are also covered. The major case of unauthorized user and the validation tests are also covered in this tests.
We have also use mockgoose which mimics the mongo db server and keeps the data in memory. The main advantage for using mockgoose is that every time test runs we get new set of database to run the test into.

- 🔘 : Unit Test
  All other folder includes the unit test for the respective modules. We have used sinon for making spies, stubbing and mocking function so that we can run the test in isolation. The main focus of the test is to mock each and every function so that the test scope can be narrowed.

Simarly, models, schemas are also tested.

- 🔘 : Below are screenshots of the tests ran [**40 tests in total along with test coverage, and report** ]

![Total Tests](https://res.cloudinary.com/doefdz9w7/image/upload/v1558390156/Api-panda/Screenshot_2019-05-20_at_23.01.10.png)
![Total Tests](https://res.cloudinary.com/doefdz9w7/image/upload/v1558390133/Api-panda/Screenshot_2019-05-20_at_23.08.00.png)
![Total Tests](https://res.cloudinary.com/doefdz9w7/image/upload/v1558390138/Api-panda/Screenshot_2019-05-20_at_23.07.10.png)
![Total Tests](https://res.cloudinary.com/doefdz9w7/image/upload/v1558390133/Api-panda/Screenshot_2019-05-20_at_23.08.00.png)
![Total Tests](https://res.cloudinary.com/doefdz9w7/image/upload/v1558390141/Api-panda/Screenshot_2019-05-20_at_23.04.45.png)
![Total Tests](https://res.cloudinary.com/doefdz9w7/image/upload/v1558390129/Api-panda/Screenshot_2019-05-20_at_23.07.48.png)
![Coverage Report](https://res.cloudinary.com/doefdz9w7/image/upload/v1558390157/Api-panda/Screenshot_2019-05-20_at_23.05.21.png)

## CI/CD Pipeline

- 🔘 : API-Panda backend uses a Travis CI build process to run the build, verify all tests are passing and then deploy the error free application to Heroku. The free Heroku plan is limited to just couple of builds so instead I've used Heroku's Automatic deploy feature where every successful build from Travis will trigger a auto-deployment in Heroku from the specified branch.

- 🔘 : The current build status of the Application from Travis is highlighted in the GitHub's ReadMe File.

- 🔘 : ProcFile is used to tell Heroku to run a command after building the dist folder. In our case, it is `npm run serve`.

- 🔘 : Below are the screenshots for the Travis and Heroku builds.
  ![Travis Build](https://res.cloudinary.com/doefdz9w7/image/upload/v1558381162/Api-panda/Screenshot_2019-05-20_at_20.39.04.png)
  ![Heroku Build](https://res.cloudinary.com/doefdz9w7/image/upload/v1558381351/Api-panda/Screenshot_2019-05-20_at_20.42.16.png)

## Extra features

- 🔘 Analytics : API-Panda uses NewRelic APM to check the applications performence measures. New-Relic APM records all the activities on the application including the network errors, response times, 404's, database, service maps, transactions etc to give useful insights in form of visualizations on the dashboard. These visualizations can help in determining which API is taking long time to respond or what are the common causes of error and other similar use-cases. New Relic is currently one of the most widely used analytics system for the Node.js applications.

![New Relic](https://res.cloudinary.com/doefdz9w7/image/upload/v1558381553/Api-panda/Screenshot_2019-05-20_at_20.45.36.png)

- 🔘

## Libraries Used

- 🔹[express](https://expressjs.com/)
- 🔹[express-validation](https://express-validator.github.io/docs/)
- 🔹[express-boom](https://www.npmjs.com/package/express-boom) : Pretty Format Errors with custom Error messages.
- 🔹[body-parser](https://github.com/expressjs/body-parser)
- 🔹[cors](https://expressjs.com/en/resources/middleware/cors.html) : To allow cross orgin scripts.
- 🔹[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- 🔹[mockgoose](https://www.npmjs.com/package/mockgoose) : Mocking models for testing.
- 🔹[mongoose](https://mongoosejs.com/)
- 🔹[mongoose-unique-validator](https://github.com/blakehaswell/mongoose-unique-validator/)
- 🔹[Husky](https://github.com/typicode/husky) : Pre-Commit Utility.
- 🔹[ES-Lint](https://eslint.org/) : Code Linting.
- 🔹[eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base)
- 🔹[morgan](https://github.com/expressjs/morgan) : Logging.
- 🔹[newrelic](https://www.npmjs.com/package/newrelic) : New Relic Analytics
- 🔹[winston](https://www.npmjs.com/package/winston) : Beautified Console Logs.
- 🔹[request](https://www.npmjs.com/package/request) : Making external http/https calls.
- 🔹[supertest](https://github.com/visionmedia/supertest)
- 🔹[chai](https://www.npmjs.com/package/chai)
- 🔹[chai-http](https://www.npmjs.com/package/chai-http)
- 🔹[mocha](https://mochajs.org/)
- 🔹[mochawesome](https://www.npmjs.com/package/mochawesome)
- 🔹[sinon](https://www.npmjs.com/package/sinon)
- 🔹[nyc](https://www.npmjs.com/package/nyc) : Test Coverage Generator
- 🔹[sinon](https://www.npmjs.com/package/sinon)
- 🔹[bluebird](https://www.npmjs.com/package/bluebird) : Full Featured Promise based library
and other standard liblaries.
#### Third Party Web API's

- 🔹[Random Programming Quotes](https://quotes.stormconsultancy.co.uk/random.json) : Api to generate random quotes

## Extra features

- 🔘 Validating on the front-end, and back-end express level before data hits the databse to avoid unnesessay delay.

- 🔘 Using CORS to allow secure access from the browser.

- 🔘 Pretty formatted logging on the console every request along with the request's status code and the response time.

- 🔘 Using NYC to generate detail test coverage reports in the console.

- 🔘 The application uses full-fledged promise based asynchronous architecture that non-blocking.

- 🔘 Application uses Comprehensive testing strategies from unit, integration to end-to-end tests including mocking.

- 🔘 The written architecture is production ready and can be scaled as needed. I've ran load tests from an external service comprising of 1000 requests from different origins per second and application performs normally in these conditions.


## Independent learning.

- 💡 I've designed the entire architecture myself by taking a few references into consideration. I came across a few good boilerplates but they lacked model and query seperation. I wanted to focus on Seperation of Concerns and reusability as much as possible so I structured it according to my requirements.

- 💡 I'm not very keen on using third party libraries for basic operations like async-await. I wrote my own utility functions instead to hanlde the promises.

- 💡 To enhance the developer experience, I've tried to decompose components as much as possible to avoid strong binding. ES6 features are utilized as much as possible.

- 💡 To demonstrate an external API call from the server, I've used request package that calls the quote end-point and forwards data as a response to the server.

- 💡 Standard error codes for responses have been used. Not only limiting to 200 and 400, I send appropriate response like 422 for validation, and other accepted response codes. 
