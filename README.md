JSObject Stuff
==================

The JSObject Stuff project is a couple of JavaScript classes and unit tests I wrote as exercises while I was reading the "Object Oriented Javascript book". I was using this repository as a way to better understand the power of the JS prototype and inheritance.

The examples in this repository use NODE as the main environment with all unit testing done in mocha/chai/sinon.


## Getting Started

* Get all source from this git repo
* **Node** - Node JS is the execution environment


### Dependencies

Refer to the package.json for a complete listing of all dependencies. 

### Configuring the Project

Since the project uses a package.json file all dependencies are installed using NPM.

* **NPM** - `npm install`

### Running the Project
There are some classes/unit tests so just run the suite of unit tests using a mocha test runner. There is no single "program" to run.

* run all tests - `./node_modules/mocha/bin/mocha`
* run only unit tests using sinon - `./node_modules/mocha/bin/mocha --grep UsingSinon*.*`
* run only Object unit tests - `./node_modules/mocha/bin/mocha --grep Object*.*`
* * run only Shape unit tests - `./node_modules/mocha/bin/mocha --grep Shape*.*`


## Testing

Unit testing uses various tools

* **mocha framework** - unit test framework (https://mochajs.org/)
* **sinon** - mocking/stubbing/spy for unit tests (http://sinonjs.org/)
* **chai** - BDD assertion library (e.g. expect) (http://chaijs.com/)

## Deployment

N/A

## TODO

* Fix the Objects
* Add some examples of inheritance (since it's just so easy in JS - that's a joke if you've used other languages)

## Getting Help

### Documentation

* None
