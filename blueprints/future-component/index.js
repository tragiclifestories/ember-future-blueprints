/* eslint-env node */

var stringUtil         = require('ember-cli-string-utils');
var pathUtil           = require('ember-cli-path-utils');
var validComponentName = require('ember-cli-valid-component-name');
var getPathOption      = require('ember-cli-get-component-path-option');
var path               = require('path');

var normalizeEntityName = require('ember-cli-normalize-entity-name');

module.exports = {
  description: 'Generates a component. Name must contain a hyphen.',

  availableOptions: [
    {
      name: 'path',
      type: String,
      default: 'components',
      aliases: [
        { 'no-path': '' }
      ]
    },
    {
      name: 'extend-style',
      type: Boolean,
      default: false,
      aliases: [
        {'class-style': false}
      ]
    }
  ],

  fileMapTokens: function() {
    return {
      __root__(options) {
        if (options.inRepoAddon) {
          return path.join('lib', options.inRepoAddon, 'addon');
        }
        if (options.inDummy) {
          return path.join('tests', 'dummy', 'src');
        }
        if (options.inAddon) {
          return 'addon';
        }
        return 'src';
      }
    };
  },

  normalizeEntityName: function(entityName) {
    entityName = normalizeEntityName(entityName);

    return validComponentName(entityName);
  },

  locals: function(options) {
    var templatePath   = '';
    var importTemplate = '';
    var contents       = '';
    // if we're in an addon, build import statement
    if (options.project.isEmberCLIAddon() || options.inRepoAddon && !options.inDummy) {
      templatePath     = './template';
      importTemplate   = 'import layout from \'' + templatePath + '\';\n';
      if (options.extendStyle) {
        contents       = '\n  layout';
      } else {
        contents       = '\n  get layout() { return layout; }';

      }
    }

    return {
      importTemplate: importTemplate,
      contents: contents,
      extendStyle: options.extendStyle,
      path: getPathOption(options)
    };
  }
};
