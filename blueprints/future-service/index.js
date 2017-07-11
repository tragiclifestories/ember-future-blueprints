/* eslint-env node */

let path = require('path');

module.exports = {
  description: '',

  locals(options) {
    return {
      extendStyle: options.extendStyle
    }
  },

  fileMapTokens() {
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
    }
  }
};
