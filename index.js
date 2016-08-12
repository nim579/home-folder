var path = require('path');
var fs   = require('fs');


var HomeFolder = function(){};
HomeFolder.prototype.CONFIG_FILENAME = 'config.json';
HomeFolder.prototype._inited = false;


// Initialize paths and make home folder if nessessary.
HomeFolder.prototype.init = function(project_name){
    if(typeof project_name !== 'string') throw new Error('Project name not found!');
    if(this._inited) return this;

    // Normalize project folder name.
    if(project_name[0] !== '.') project_name = '.'+project_name;
    project_name = project_name.replace(path.sep, '_');

    if(process.env.HOME && !process.env.HOMEPATH){
    	this.PATH = path.resolve(process.env.HOME, project_name);
    } else if(process.env.HOME || process.env.HOMEPATH){
    	this.PATH = path.resolve(process.env.HOMEDRIVE, process.env.HOME || process.env.HOMEPATH, project_name);
    } else {
    	this.PATH = path.resolve('/etc', project_name);
    }

    this.CONFIG_PATH = path.resolve(this.PATH, this.CONFIG_FILENAME);

    this._initFolder();

    this._inited = true;

    // Protect path variables.
    this._protectVariable('PATH');
    this._protectVariable('CONFIG_PATH');
    this._protectVariable('CONFIG_FILENAME');

    return this;
};

// Save or return config.
HomeFolder.prototype.config = function(config){
    if(config){
        return this.set(config);
    } else {
        return this.get();
    }
};

// Return config from home folder.
HomeFolder.prototype.get = function(){
    this._checkInit();
    var config = null;

    try {
        config = fs.readFileSync(this.CONFIG_PATH).toString();
    } catch(e){
        return {};
    }

    return JSON.parse(config);
};

// Save config in home folder.
HomeFolder.prototype.set = function(config){
    this._checkInit();

    fs.writeFileSync(this.CONFIG_PATH, JSON.stringify(config));

    return this;
};

// Help for get path in project home folder.
HomeFolder.prototype.path = function(){
    this._checkInit();

    var args = Array.prototype.slice.call(arguments, 0);
    args.unshift(this.PATH);
    return path.resolve.apply(path, args);
};
// Alias for path;
HomeFolder.prototype.resolve = HomeFolder.prototype.path;


// Initialize config folder.
HomeFolder.prototype._initFolder = function(){
    try {
        fs.accessSync(this.PATH);           // check folder exixts
    } catch(e){
        fs.mkdirSync(this.PATH, 0o755);     // make folder
        fs.accessSync(this.PATH, fs.W_OK);  // ckeck folder for write access
    }
}

// Return error if folder not inited.
HomeFolder.prototype._checkInit = function(error_text){
    if(!this._inited) throw new Error(error_text || 'Home folder not inited. Please call init() methid.');
}

// Protect variables in this class.
HomeFolder.prototype._protectVariable = function(var_name){
    Object.defineProperty(this, var_name, {
        enumerable:   true,
        writable:     false,
        configurable: false
    });
}

module.exports = new HomeFolder();
