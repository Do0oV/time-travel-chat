# time-travel-chat
<p align="center">
  <img src="https://legal-beast.surge.sh/static/media/logo.cdfbc7b1.svg" height="200" width="200"/>
</p>

Time Travel Chat is an application that allows you to write and read comments in sync with a movie timeline. Simply search for the movie you are about to start watching, start the timer, share your thoughts and see other's people comments at a specific moment of the movie.

If you are busy or currently living far from your friends or family but still want to share your thoughts about movies without spoiling it, Time Travel Chat is what you need.

Watch the movie when you want, write comments, then share the link. People will see your messages appearing at the right moment on their screen!


## Screenshots

<p align="center">
  <img src="" />
</p>


## Getting started

This repo contains both Front-End (/client) and Back-End (/server) of the application.
### Prerequisites

* Node
* Npm

BACK-END:
* MongoDb
* [TheMovieDb](https://www.themoviedb.org/) account and API key

## Installation

1. Clone the repo and enter

```
git clone https://github.com/Do0oV/time-travel-chat.git
cd time-travel-chat
```

2. Install dependencies

FRONT-END:
```
cd client
npm install
```
Create a __.env__ file - following the __.env.example__


BACK-END:
```
cd server
npm install
```
Create a __.env__ file - following the __.env.example__

3. Start development server

FRONT-END:
```
cd client
npm start
```
BACK-END:
```
cd server
nodemon index.js
```

## Built with

* [React](https://reactjs.org/) - Front-End Framework
* [Koa](https://koajs.com/) - Front-End Framework
* [MongoDb](https://www.mongodb.com) - Database


## Author

Dorothee Viard - [Github](https://github.com/Do0oV) - [LinkedIn](https://www.linkedin.com/in/dorotheeviard/)


## License

This project is licensed under the MIT License.
