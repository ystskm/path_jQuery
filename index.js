/***/
// THIS FILE IS USED EFFICIENTLY UNDER THE FOONYAH ARCHITECTURE.
(function() {

  var onBws = typeof global == 'undefined';
  if(onBws)
    return;

  //READ EXTERNAL_CONDITION
  var _C = global.EXTERNAL_CONDITION || {}, Cons = {
    Version: _C.jQuery_version || '2.1.1',
    VersionOne: _C.jQuery_version_one || '1.10.2',
    FlagVersionOne: _C.jQuery_flag_version_one || '1',
    HttpRoot: _C.http_root || '/',
    DircName: _C.jQuery_dirname || 'jQuery',
    Jquery: 'jquery',
    Js: 'js',
    Min: 'min'
  };

  var d = __dirname.split('/').slice(0, -1).join('/'), n = Cons.DircName;
  var r = '', p = require('path');

  var js = Cons.Js, min = Cons.Min, Files = {
    jquery: Cons.Jquery
  };

  var ImportAPI = {
    google: function(ver, min, ext) {
      return '://ajax.googleapis.com/ajax/libs/jquery/' + ver + '/jquery'
        + (min ? '.' + Cons.Min: '') + (ext ? '.' + Cons.Js: '');
    },
    jquery: function(ver, min, ext) {
      return '://code.jquery.com/jquery-' + ver + (min ? '.' + Cons.Min: '')
        + (ext ? '.' + Cons.Js: '');
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
      version: Cons.Version,
      minified: false,
      withroot: false,
      withname: false,
      withext: true
    }, options);

    if(options.version == Cons.FlagVersionOne)
      options.version = Cons.VersionOne;

    var prefix = '', keys = target.split('/'), ret = keys.pop();
    if(options.withroot) {
      prefix = Cons.HttpRoot, options.withname = true;
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
