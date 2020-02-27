# Rating App - Backend Code

This is a Rest API which is written in Nodejs. It uses PostgreSQL as databse. It is developed to serve both Web and Mobile applications.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

The dependencies are already in package.json so you can just run

```
npm install
```

and it the dependecies will be installed by npm.
### Running.

for run you can just type
```
nodemon server.js
```


## Interface for Ends

Explain how to run the automated tests for this system
## /users
### login
URL end
```
/login
```
request
```
in body
{
  "name":"userx",
  "password":"passx"
}
```
response 
```
in Header
  'token','eyJhbGsdfasdfweruaewrdghjdgsfhw45345345345fsdaf'
  statusCode = 200
```
```
in body
message: "Auth Succesful"
```




















