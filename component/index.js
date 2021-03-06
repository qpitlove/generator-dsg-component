'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var util = require('util');
var ngUtil = require('../util');
var ScriptBase = require('../script-base.js');

var Generator = module.exports = function Generator() {
  ScriptBase.apply(this, arguments);
};

util.inherits(Generator, ScriptBase);

Generator.prototype.askFor = function askFor() {
  var self = this;
  var done = this.async();

  var prompts = [
    {
      name: 'dir',
      message: 'Where would you like to create this component?',
      default: self.config.get('componentDirectory')
    },
    {
      name: 'scriptAppName',
      message: 'What\'s your module name?',
      default: self.scriptAppName
    },
    {
      type:'confirm',
      name: 'complex',
      message: 'Does this component need an external html file?',
      default: true
    }
  ];

  this.prompt(prompts, function (props) {
    this.dir = path.join(props.dir, this.name);
    this.scriptAppName = props.scriptAppName;
    this.complex = props.complex;
    done();
  }.bind(this));
};

Generator.prototype.createFiles = function createFiles() {
  var configName = 'componentSimple';
  var templateDir = path.join(this.sourceRoot(), 'componentSimple');
  if (this.complex) {
    configName = 'componentComplex';
    templateDir = path.join(this.sourceRoot(), 'componentComplex');
  }

  var basePath = this.config.get('basePath') || '';
  this.htmlUrl = ngUtil.relativeUrl(basePath, path.join(this.dir, this.name + '.html'));
  ngUtil.copyTemplates(this, 'component', templateDir, configName);
};
