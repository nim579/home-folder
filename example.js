const homefolder = require('./lib');

homefolder.init('test')

console.log(homefolder.config);

homefolder.set({
    foo: Math.random()
});

console.log(homefolder.get());
console.log(homefolder.path('file.txt'));
