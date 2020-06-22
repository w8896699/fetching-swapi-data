# SIMPLE API THAT GET PARTIAL DATA FROM SWAPI

A Star Wars api that fetch all people and starship data and store in mongodb

Create by: Billy Li

### Usage
Before run this application, make sure mongo service is up and runing and you are using correct node version.

I am using node v10.19.0 for this project, if you are using asdf as version control tool, simply run ```asdf reshim nodejs```
after install this version

```
npm install
npm start
```
for local development, this application will run on port 8080
get request to route ``` /api/fetchInfo``` will trigger the fetching process
This Application will create a db __SWData__ and two collections: __people__ and __starships__ 


### Explaination 
For this exercise, goal is to write a small application that pulls people and starship data from https://swapi.dev/ and save that into a database with its relations.

I came up with 3 plan:

#### Plan A
Do not set any endpoint in router, use db-migration to fetch the data and wired up there relation. Benifit for this way is we will have migration record in database and the migration script will only run once against database, so we do not need to check duplication in this case.
down side is also obvious, manully trigger migration script has a bit learning curve for those who never used it before (I have include some instructions in migration folder )

#### Plan B
Use a route to trigger the fetching data process, this way is easy and straight forward. However, its also  have down sides:  Need to check duplication as every time this end point been reached, the fetch and store process will also been trigger.

This project followed Plan B, fetching data will be trigger once /api/fetchInfo router receive a get request. However, because of the limitation, I couldn't finshing up the whole structure, here's some TODO in the future:

### TODO
* Check if item is already exist before insert into database, (I can simply use pre hook and mongoose find(name) or update mongoose and use async custom validators(https://mongoosejs.com/docs/validation.html) )

* Use dotenv to replace some hard coded variable or possiable api key

* We can record every operation that this application try to write in database

* I only wired up the relation for people to starship, haven't code for starship's pilots(its' still a string of url) 

Because I haven't code the check duplication part. please clean ___people__ and ___starship__ collection if you want to test again.

