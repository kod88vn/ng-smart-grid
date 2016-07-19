![Alt text](/sample.png?raw=true)
# ng-smart-input
## Intro
Fancy performance input box


## Installing
* `npm install -g gulp gulp-cli` install global cli dependencies
* `npm install` to install dependencies

## Usage
1. `<script type='text/javascript' src='ng-smart-input/dist/app.min.js'></script>`
2. `angular.module('myApp', ['ng-smart-input'])`
3. provide a config object

## Config Example
```javascript
this.smartInputConfig = {
	id: 'fancy-input',
	placeholders: [
		'fancy smart input...',
		'your search text goes here'
	],
	delay: 500,
	suggestions: [
		'angular', 
		'angoala', 
		'kola', 
		'ant', 
		'angry',
		'anthem',
		'apple',
		'ak',
		'car',
		'arse',
		'anker',
		'antler',
		'obama',
		'omaha',
		'alabama'
	]
};
```
