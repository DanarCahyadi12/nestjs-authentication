## NestJS authentication with passport-jwt and prisma

## Description
<p>
 This authentication is include a access token for a protected route and refresh token when access token is expired.
</p>
<p>Access token will expired after 20 seconds <p>

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

## Quick tutorial with postman
<p>1. Sign up first </p>
<img src="https://user-images.githubusercontent.com/110749286/277598748-7762bb6a-b7e4-430b-9d15-74fce6d37607.png">
<br>

<p>2. Login to your account</p>
<img src="https://user-images.githubusercontent.com/110749286/277598993-b4afa5fc-f988-409c-813d-7706594cfee6.png">
<br>

<p>3. After login success. Server will give you access token and refresh token</p>
<img src="https://user-images.githubusercontent.com/110749286/277599825-0fd3cfc0-1383-4710-acce-6fe782d874fb.png">
<br>

<p>4. Paste access token in headers authorization user route. <strong>Note: Make sure it contain a Bearer before the token.</strong></p>
<img src="https://user-images.githubusercontent.com/110749286/277600080-9bcc570a-0bb0-4025-8591-921082065d1f.png">
<br>

<p>5. If your access token is valid or not expired, server will give your credentials like your email, name and id</p>
<img src="https://user-images.githubusercontent.com/110749286/277608305-bf8b5534-9e1b-489f-b347-ec2f503f9ef5.png">
<br>

<p>6. If your access token is expired: <ul>
  <li>Login to your account</li>
  <li>Copy the refresh token</li>
  <li>Go to auth/token route</li>
  <li>Paste refresh token in authorization headers. <strong>Make sure contain a Bearer before the token</strong></li>
  <li>Server will give you a access token</li>
 </ul> </p>

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
