import * as utils from './lib-utils@1.0.js'


let first = utils.range(10);
first.forEach(el => console.log(el));
console.log('Jetzt gemischt ...');
let second = utils.shuffle(first);
second.forEach(el => console.log(el));