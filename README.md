# adretiro-api

[![GitHub license](https://img.shields.io/github/license/alcalcides/adretiro)](https://github.com/alcalcides/adretiro/blob/master/LICENSE)

🚧 Under construction 🚧

This API RESTful is to server the app [adretiro](https://github.com/alcalcides/adretiro) that is like a sticker album. The complete project description is explained in [adretiro's README file](https://github.com/alcalcides/adretiro/blob/master/README.md)

## Development environment

This project began with:

```shell
npm init -y
npm i express
```

So, after clone the project and set up database, you can run with:

```shell
npm install
npm start
```


### Database setup

This projetct used [Postgres](https://www.postgresql.org/) and [knex.js](https://knexjs.org/). The following describes how it can be done.

1) Install Postgres.
2) Install knex and postgres driver.

```shell
$ npm install knex -g
~ npm install pg
~ knex init
```

3) Set up knexfile.js ([see the result](https://github.com/alcalcides/adretiro-api/blob/master/knexfile.js)).
4) Implement migration to create table "Jacob's Sons":

```shell
~ knex migrate:make jacobs_sons
```

Code migration script and run:

```shell
~ knex migrate:latest
```

To perform migration in heroku environment, you can run locally:

```shell
~ heroku run knex migrate:latest
```

5) See the table created in database. You can use [PgAdmin4](https://www.pgadmin.org).

6) Fill convenient tables with knex's feature seed. First set up the seed directory in knexfile and so: 

```shell
~ knex seed:make 001_fill_jacobs_sons
```

Code the seed script and run:

```shell
~ knex seed:run 001_fill_jacobs_sons
```

If you want run all seeds, use:

```shell
~ knex seed:run
```

7) Set up knex queries features. Consider the file src/database/connection.js and import knex like in src/controllers/JacobsSonsControllers.js (see function read)

8) Set up environments variables according with file .env.example. If Heroku, use:

```shell
~ heroku config:set PASSWORD_ENCRYPTION_ROUNDS=XXXX
~ heroku config:set JWT_PRIVATE_KEY=XXXX
~ heroku config:set MAIL_USER=XXXX
~ heroku config:set MAIL_PASSWORD=XXXX
```

9) Build the main table (stickers):

```shel 
~ npm run fill-table-stickers
```
This table is to be build only once in the program lifecycle. Be careful, keep a backup and avoid problems....

10) Finally, enjoy!
