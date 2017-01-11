# Trad
Javascript trad lib to use with formated JSON files (works fine with `generator-trad`: https://github.com/Kemicalish/generator-trad)

## Installing / Getting started

Install package
```shell
npm install trad
```
You should have a directory where are located all your localized json files

A localized file should be of the following form 
```json
[
  {
    "id": "MY_TEXT_ID",
    "value": "My Localized Text"
  },
  ...
  {
    "id": "MY_SECOND_TEXT_ID",
    "value": "An other example localized value"
  }
]
```
Again this is easy stuff with the package `generator-trad`

## Example
Assuming our file above is located at: `http://www.example.com/your_localized_folder/en_US.json` 
here is how to use `trad` lib

```javascript
const trad = require('trad');

trad.init('http://www.example.com/path/to/your/localized_folder'); //pass your localized directory root url here

trad.load('en_US')
.then(function(){
  console.log(trad.get('MY_TEXT_ID')); //should output "My Localized Text"
  console.log(trad.get('MY_SECOND_TEXT_ID')); //should output "An other example localized value"
});

```

Note: If requesting localized file from an other domain, ensure that your CORS are correctly set: http://enable-cors.org/index.html

