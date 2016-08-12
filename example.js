var home = require('./');

home.init('test');

console.log(home.init('test').config());

var c = {
    foo: Math.random()
}

console.log(home.set(c).config());
console.log(home.path('some_file'));
