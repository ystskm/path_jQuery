/***/
// THIS FILE IS USED EFFICIENTLY UNDER THE FOONYAH ARCHITECTURE.
(function() {

  var onBws = typeof global == 'undefined';
  if(onBws)
    return;

  //READ EXTERNAL_CONDITION
  var _P = global.EXTERNAL_CONDITION || {}, P = {
    Version: _P.jq_version || '2.1.1',
    VersionOne: _P.jq_version_one || '1.10.2',
    FlagVersionOne: _P.jq_flag_version_one || '1',
    HttpRoot: _P.http_root || '/',
    DircName: _P.jq_dirname || 'path_jquery',
    jquery: 'jquery',
    js: 'js',
    min: 'min'
  };

  var d = __dirname.split('/').slice(0, -1).join('/'), n = P.DircName;
  var r = '', p = require('path');

  var js = P.js, min = P.min, Files = {
    jquery: P.jquery
  };

  var ImportAPI = {
    google: function(ver, min, ext) {
      return '://ajax.googleapis.com/ajax/libs/jquery/' + ver + '/jquery'
        + (min ? '.' + P.min: '') + (ext ? '.' + P.js: '');
    },
    jquery: function(ver, min, ext) {
      return '://code.jquery.com/jquery-' + ver + (min ? '.' + P.min: '')
        + (ext ? '.' + P.js: '');
    }
  };

  var paths = {};

  module.exports = (function() {
    return {
      svr: svr,
      bws: bws
    };
  })();

  function svr(target, options) {
    options = mixin({}, options);
    if(target == 'root')
      target = options.withroot = 'root';
    if(options.withroot == true)
      options.withroot = 'root';
    return makePath(target, options);
  }

  function bws(target, options) {
    options = mixin({}, options);
    if(target == 'root')
      target = options.withroot = 'http_root';
    if(options.withroot == true)
      options.withroot = 'http_root';
    return makePath(target, options);
  }

  function makePath(target, options) {

    if(!target)
      return __dirname;

    options = mixin({
      version: P.Version,
      minified: false,
      withroot: false,
      withname: false,
      withext: true
    }, options);

    if(options.version == P.FlagVersionOne)
      options.version = P.VersionOne;

    var prefix = '', keys = target.split('/'), ret = keys.pop();
    if(options.withroot) {
      prefix = P.HttpRoot, options.withname = true;
      switch(options.withroot) {
      case 'root':
        prefix = d;
        break;
      case 'goog_root':
        return ImportAPI.google(options.version, options.minified,
          options.withext);
      }
    }

    if(options.withname == true)
      prefix = p.join(prefix, n);

    // return root
    if(/root$/.test(target))
      return p.join(prefix, '/');

    return p.join(prefix, Files.jquery) + '-' + options.version
      + (options.minified ? '.' + min: '') + (options.withext ? '.' + js: '');
  };

  function mixin(tgt, obj) {
    tgt = tgt || {}, obj = obj || {};
    for( var i in obj)
      if(typeof obj[i] != 'undefined')
        tgt[i] = obj[i];
    return tgt;
  };

})();
