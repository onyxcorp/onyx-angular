## Onyx

Main repository of Onyx System

## Installation

This generator relies on several technologies, make sure your system has:
- [Node.js](http://nodejs.org)
- [Bower](http://bower.io/#install-bower)
- [Gulp](http://gulpjs.com)
- [LiveReload](http://feedback.livereload.com/knowledgebase/articles/86242-how-do-i-install-and-use-the-browser-extensions)

## Getting Started

- Pull the repository
- In the repository folder run
  * npm install
  * bower install
- Run :  
  * `gulp` for building to the `build` directory
  * `gulp --release` for building to the `release` directory
- Go to http://localhost:8080
- Have fun coding!

#### Third-Party Dependencies

*(HTML/CSS/JS/Images/etc)*

To install dependencies, run `bower install --save package-name` to get the files, then add an entry into the [browser](generators/app/templates/_package.json#L41) key of your `package.json`.
