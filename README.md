# home-folder

Helper for make and use project home folder.

## Install

```shell
npm install home-folder
```

## Usage

Call **init()** method for start working with *project name* argument.
It will make a folder with first dot. For example, if you call `init('test')`, your home folder path will be `~/.test`.

If you run your project from `npm run` your project name (from package.json) will be used by default and no need to call `init()` method.

```js
var home = require('home-folder');

home.init('project_name');

home.config = {
    login: 'nim579',
    foo: 'bar'
};

fs.writeFileSync(home.resolve('tmp'), 'ololo');
```

See [example.js](example.js).

## Methods

* `init(projectName: string)` — inits home folder (if nessessary), and sets variables;
* `set<T>(config: T)` — sets config to your project;
* `get<T>(): T` — returns config of your project;
* `path(...paths: string[])` or `resolve(...paths: string[])` — resolves path from project home folder. Works like  in [**path.resolve()**](https://nodejs.org/dist/latest/docs/api/path.html#pathresolvepaths).
* `get config`, `set config` — getter/setter alias for `get()`/`set()`;

## Properties

* **HOMEPATH** — path to os home folder. You can use *HOME* env variable for manage it;
* **CONFIG_FILENAME** — file name of project config file (default: *config.json*). You can override it by *CONFIG_FILENAME* env variable;
* **CONFIG_PATH** — path to project home folder. You can override it by *CONFIG_FILENAME* env variable;
* **PROJECT_NAME** — project name will be available after `init()` method or from package.json if you run your script by `npm run`;
