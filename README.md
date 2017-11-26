# Universal code beautifier

![citaralab](https://user-images.githubusercontent.com/20716798/28749145-62359dba-7494-11e7-8fdf-a2e10f07dd03.png)

[![Maintainability](https://api.codeclimate.com/v1/badges/f2d47b6738c1508024bc/maintainability)](https://codeclimate.com/github/LukasMeine/universal-code-beautifer/maintainability)

## About the project
This project was born from a need we were having to have a consistent, easy to install and maintain wrapper to the existent code beautifiers available on the market. We found the amazing [Atom beautify](https://atom.io/packages/atom-beautify) package while looking for such solution, but it required an enourmous amount of effort to configure locally, and we found no alternative when we wanted to use it as a service.

## So, what is this?
This is an api coded in node.js that wraps a lot of existent code beautifiers. It's purpose is to be easy to install, use and maintain. You can run it locally to use it on any existent IDE ( we are planning to release some atom packages on the near future to demonstrate the usage) or deploy it on a server to use it as a service.

## Running

To start a web server for the application, run:

    npm start

## Documentation and API Reference

After starting the web server for the application, full documentation can be found at:

    http://localhost:3000/documentation
    
## Deploy
    npm run deploy

## What is under the hood?
We are using the following third party projects to power this project. If you like this, please support them as well.
- [Prettier](https://github.com/prettier/prettier)
- [Gofmt](https://golang.org/cmd/gofmt/)
- [Node-cljfmt](https://github.com/snoe/node-cljfmt)
- [php cs-fixer](https://github.com/FriendsOfPHP/PHP-CS-Fixer)

## Language Support

| Language | Supported | 
|----------|:-------------:|
|PHP| &#10004; |
Clojure| &#10004; |
typescript| &#10004; |
Go| &#10004; |
javascript| &#10004; |
CSS| &#10004; |
Less| &#10004; |
SCSS| &#10004; |


    
    
