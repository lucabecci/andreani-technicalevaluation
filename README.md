# Andreani technical evaluation. 

> This is a RESTFUL API developed for Andreani's technical evaluation. This API use Lerna for the monorepos(api and geocodificator service). For the Broker Message i use RabbitMQ.

I used Typescript/Node.js/MongoDB/RabbitMQ

> Created by Luca Becci

## 1. Started ⌨️

for get the project you will use:

```tsx
git clone "https://github.com/lucabecci/andreani-technicalevaluation"

```

## 2. Pre-requeriments 🛠

You will need this requeriments for good rendiment:

- Node.JS > 10.X
- MongoDB(if you don't have docker)
- RabbitMQ(if you don't have docker)
- npm > 6.X
- Docker(if you will run this project with Docker)

## 3. Installation 🔩

You will need run this comands for the installation:

```
With npm: 
npm install //install the backend dependencies.

With yarn:
yarn install //install the backend dependencies.

```

## 4. Use the project

### About the app

the API use Node/Express/Typescript/MongoDB/RabbitMQ.

### How to run the API

1. In your terminal, navigate to the main directory.
2. Run `npm install` to install all dependencies.
3. Run `npm run prod` for create the build.
4. Run `npm run start:prod` for run the api and the services.

### How to run with Docker

1. You need Docker and docker-compose.
2. In your terminal, navigate to the main directory.
3. Run `docker-compose up` to create the image.

## 5. Project structure 📁

### ROOT 📂

```tsx
|-- node_modules
|-- packages
	|-- API-GEO
	|-- GEOCODIFICADOR
|-- .gitignore
|-- CHANGELOG.md
|-- docker-compoe.yml
|-- lerna.json
|-- package.json
|-- README.md
|-- yarn.lock
```

### API-GEO 📂

```tsx
|-- API-GEO
	|-- src
		|-- config
			|-- config.ts
		|-- controllers
			|-- api.controller.ts
		|-- database
			|-- Database.ts
		|-- helpers
			|-- check.ts
		|-- models
			|-- GeoLocation.ts
			|-- Location.ts
		|-- routes
			|-- api.routes.ts
		|-- app.ts
		|-- index.ts
		|-- rabbitmq.ts
	|-- CHANGELOG.md
	|-- Dockerfile
	|-- package.json
	|-- tsconfig.json
```

### GEODOFICADOR 📂

```tsx
|-- GEOCODIFICADOR
	|-- src
		|-- config
			|-- config.ts
		|-- index.ts
		|-- sendMessages.ts
	|-- CHANGELOG.md
	|-- Dockerfile
	|-- package.json
	|-- tsconfig.json
```

## 6. Build with 🛠

DEPENDENCIES:

- [express](https://expressjs.com/)- Fast, unopinionated, minimalist web framework for node.
- [Lerna](https://github.com/lerna/lerna) - Splitting up large codebases into separate independently versioned packages is extremely useful for code sharing. However, making changes across many repositories is messy and difficult to track, and testing across repositories becomes complicated very quickly.
- [Mongoose](https://mongoosejs.com/) - Let's face it, writing MongoDB validation, casting and business logic boilerplate is a drag. That's why we wrote Mongoose.
- [Amqplib](https://www.npmjs.com/package/amqplib) - A library for making AMQP 0-9-1 clients for Node.JS, and an AMQP 0-9-1 client for Node.JS v0.8-0.12, v4-v14, and the intervening io.js releases.
- [Morgan](https://www.npmjs.com/package/morgan) - HTTP request logger middleware for node.js
- [dotenv](https://www.npmjs.com/package/dotenv) - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.

DEV-DEPENDENCIES:

- [typescript](https://www.typescriptlang.org/) - TypeScript is a language for application-scale JavaScript.
- [prettier](https://prettier.io/) - Prettier is an opinionated code formatter.
- [ts-node](https://www.npmjs.com/package/ts-node)-dev - TypeScript execution and REPL for node.js, with source map support.
- [husky](https://www.npmjs.com/package/husky) - Husky can prevent bad git commit, git push and more 🐶 woof!

## 7. Broker 📫

For the broker i use RabbitMQ

- RabbitMQ
- Version: 3.7.6

## 8. Database 📫

For the database i use MongoDB

- MongoDB
- Version: 3.6.8

## 9. Versioned 1️⃣

For the versioning i use [ConventionalCommits] ([https://www.conventionalcommits.org/en/v1.0.0/](https://www.conventionalcommits.org/en/v1.0.0/))

## 10. Author 🙎🏻‍♂️

***Luca Becci -** code, documentation and implementation.*

- [github](https://github.com/lucabecci)
- [twitter](https://twitter.com/lucabecci)
- [linkedin](https://www.linkedin.com/in/luca-becci-b8044b198/)
