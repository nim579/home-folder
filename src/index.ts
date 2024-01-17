import { resolve } from 'node:path';
import fs from 'node:fs';

class HomeFolder {
  private _project: string;

  get HOMEPATH() {
    if (process.env['HOME'] && !process.env['HOMEPATH']) {
      return resolve(process.env['HOME']);
    } else if (process.env['HOME']) {
      return resolve(process.env['HOMEDRIVE'] || '', process.env['HOME']);
    } else if (process.env['HOMEPATH']) {
      return resolve(process.env['HOMEDRIVE'] || '', process.env['HOMEPATH']);
    } else {
      return resolve('/etc');
    }
  }
  get CONFIG_FILENAME() {
    return process.env['CONFIG_FILENAME'] || 'config.json';
  }
  get PROJECT_NAME() {
    if (this._project) return this._project;

    if (process.env['npm_package_json']) {
      try {
        const pkg: any = JSON.stringify(fs.readFileSync(process.env['npm_package_json']).toString());

        if (pkg?.name) {
          this.init(pkg.name);
        }
      } catch (e) {}
    }

    return this._project;
  }
  get CONFIG_PATH() {
    return process.env['CONFIG_PATH'] || resolve(this.HOMEPATH, this.PROJECT_NAME);
  }

  init(projectName: string) {
    this._project = `.${projectName.replace(/^\./, '').split(/\/|\\|\s/).join('_')}`;
    this._init();

    return this;
  }

  get config(): any | null {
    this._checkInit();

    return this.get();
  }
  set config(config: any) {
    this._checkInit();

    this.set(config);
  }

  get<T>(): T | null {
    this._checkInit();

    try {
      const configPath = this.path(this.CONFIG_FILENAME);

      return JSON.parse(
        fs.readFileSync(configPath).toString()
      );
    } catch (e) {
      return null;
    }
  }
  set<T>(config: T) {
    this._checkInit();

    const configPath = this.path(this.CONFIG_FILENAME);
    fs.writeFileSync(configPath, JSON.stringify(config));

    return this;
  }

  path(...parts: string[]) {
    return resolve(this.CONFIG_PATH, ...parts);
  }

  resolve(...parts: string[]) {
    return this.path(...parts);
  }

  private _checkInit(message?: string) {
    if (!this.PROJECT_NAME) throw new Error(message || 'Home folder not inited. Please call init() methid.');
  }

  private _init() {
    try {
      fs.accessSync(this.CONFIG_PATH);
    } catch (e) {
      fs.mkdirSync(this.CONFIG_PATH, 0o755);
      fs.accessSync(this.CONFIG_PATH, fs.constants.W_OK);
    }
  }
}

export = new HomeFolder();
