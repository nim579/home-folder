# home-folder

Helper for make and use project home folder.

## Install

```
npm install home-folder
```

## Useage

User **init()** method for start working. Return folder name for your project in this method.

**init()** method make folder with first dot. For example, if you call `init('test')`, your path home folder will be `~/.test`.

```js
var home = require('home-folder');

home.init('project_name');

home.config({
    login: 'nim579',
    foo: 'bar'
});

fs.writeFileSync(home.resolve('tmp'), 'ololo');
```

See [example.js](example.js).

## Variables
* *PATH* — path to project home folder;
* *CONFIG_PATH* — path to config file in home folder;
* *CONFIG_FILENAME* — config file name, default: *config.json*. You can change it before calling **init()**.

You can't change the variables after calling **init()** method.

## Methods
* **init(project_name)** — init home folder (make it if nessessary), and sets variables.
* **config([config_object])** — save or load config from home folder;
* **get()** — load and return config from home folder. Works like **config()** without arguments;
* **set([config_object])** — save config to home folder. Works like **config(config_object)** with argument;
* **path([paths...])** or **resolve([paths...])** — resolves paths to an home folder path. Works like **path.resolve()** in [Node.js](https://nodejs.org/dist/latest-v4.x/docs/api/path.html#path_path_resolve_from_to).
