requirejs.config({
  baseUrl: 'scripts',
  paths: {
    'jquery': 'lib/jquery.min',
    'lodash': 'lib/lodash.min'
  }
});

requirejs(['./main']);
