## NestJS authentication with passport-jwt

## Description
<p>
 This authentication is include a access token for a protected route and refresh token when access token is expired.
</p>

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Requirement
<p>Database called <strong>nestjs</strong></p>

## Installation

```bash
# clone this repository
$ git clone https://github.com/DanarCahyadi12/nestjs-authentication.git

# change directory
$ cd nestjs-authentication

# install dependencies
$ npm install

# migrate prisma tables to your database
$ npx prisma migrate dev --name initial_migrate

```
## Routes
```bash
# sign up route
http://localhost:3000/signup

```

```bash
# login route
http://localhost:3000/auth/login

```
```bash
# Get access token  route
http://localhost:3000/auth/token

```
```bash
# Protected route
http://localhost:3000/user

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
