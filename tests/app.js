'use strict';

require.config({
  baseUrl: '../',
  paths: {
    'jasmine': ['./lib/jasmine-2.0.0/jasmine'],
    'jasmine-html': ['./lib/jasmine-2.0.0/jasmine-html'],
    'jasmine-boot': ['./lib/jasmine-2.0.0/boot'],
    'jquery': './scripts/lib/jquery.min',
    'lodash': './scripts/lib/lodash.min',
    'tests': './tests',
    'scripts': './scripts'
  },
  shim: {
    'jasmine-html': {
      deps : ['jasmine']
    },
    'jasmine-boot': {
      deps : ['jasmine', 'jasmine-html']
    }
  }
});

require(['jasmine-boot'], function () {
  require(['tests/navigation'], function() {
    window.onload();
  })
});
