## Node App Boilerplate

This is a simple node app that can be used as
boilerplate to kick off a project. It comes with
several built in packages that you might need
along with a lot of things already "set up" which
will be explained below.

### Dependencies

- Node 10.16+ (This project has an `.nvmrc` so you can run `nvm use`)
- PostgreSQL

### Set Up

1. Clone the repo
1. Run `rm -rf .git/` and `git init`
1. `npm install`
1. Set up your local Postgres database. One will be needed
   for development and for testing
1. Copy the `.env.example` file to create an `.env`
   file (e.g. `cp .env.example .env`)
1. Add the new Postgres database connection strings to the `.env` file
1. Run `npm run start` or `npm run test`
1. You're good to go!

### Running The Server

To run the server in development mode locally, run:

```bash
npm run start
```

To run the server in debug mode (open Chrome
and go to `chrome://inspect` and
click `Open dedicated DevTools for Node`), run:

```bash
npm run start:debug
```

### Linting

Linting is set up with [ESLint](https://eslint.org/) to help
maintain code quality. To lint, run:

```bash
npm run lint
```

### Automatic Code Formatting

Automatic Code Formatting is set up with
[Prettier](https://prettier.io/) using a pre-commit hook.

### Testing

Testing is set up with the following technologies:

- [Chai](https://www.chaijs.com/api/bdd/)
- [Faker.js](https://github.com/marak/Faker.js/)
- [Mocha](https://mochajs.org/)
- [Rosie](https://github.com/rosiejs/rosie)
- [Sinon.js](https://sinonjs.org/)
- [Supertest](https://github.com/visionmedia/supertest)

and the following add ons:

- [dirty-chai](https://github.com/prodatakey/dirty-chai)
- [sinon-chai](https://github.com/domenic/sinon-chai)

To run the tests, run:

```bash
npm run test
```

Tests can also be run in debug mode by running:

```
npm run test:debug
```
