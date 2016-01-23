System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  paths: {
    "github:*": "jspm_packages/github/*",
    "npm:*": "jspm_packages/npm/*"
  },

  packages: {
    "app": {
      "modules": {
        "*.html": {
          "loader": "text"
        },
        "*.scss": {
          "loader": "sass"
        }
      }
    }
  },

  map: {
    "angular": "github:angular/bower-angular@1.4.7",
    "angular-local-storage": "npm:angular-local-storage@0.2.2",
    "angular-messages": "github:angular/bower-angular-messages@1.4.7",
    "angular-mocks": "github:angular/bower-angular-mocks@1.4.7",
    "angular-sanitize": "github:angular/bower-angular-sanitize@1.4.7",
    "angular-sortable": "npm:ng-sortable@1.3.1",
    "angular-ui-router": "npm:angular-ui-router@0.2.15",
    "assert": "github:jspm/nodelibs-assert@0.1.0",
    "babel": "npm:babel-core@5.8.25",
    "babel-runtime": "npm:babel-runtime@5.8.25",
    "bluebird": "npm:bluebird@2.10.2",
    "change-case": "npm:change-case@2.3.0",
    "core-js": "npm:core-js@1.2.3",
    "dedent": "npm:dedent@0.4.0",
    "estemplate": "npm:estemplate@0.4.0",
    "is-var-name": "npm:is-var-name@1.0.0",
    "lodash": "npm:lodash@3.10.1",
    "lodash.compose": "npm:lodash.compose@2.4.1",
    "lodash.flatten": "npm:lodash.flatten@3.0.2",
    "lodash.isnumber": "npm:lodash.isnumber@3.0.1",
    "lodash.isregexp": "npm:lodash.isregexp@3.0.3",
    "lodash.isstring": "npm:lodash.isstring@3.0.1",
    "lodash.isundefined": "npm:lodash.isundefined@3.0.1",
    "lodash.pluck": "npm:lodash.pluck@3.1.2",
    "lodash.uniq": "npm:lodash.uniq@3.2.2",
    "ng-sortable": "npm:ng-sortable@1.3.1",
    "normalize.css": "github:necolas/normalize.css@3.0.3",
    "path": "github:jspm/nodelibs-path@0.1.0",
    "socket.io-client": "github:socketio/socket.io-client@1.3.7",
    "text": "github:systemjs/plugin-text@0.0.2",
    "github:angular/bower-angular-mocks@1.4.7": {
      "angular": "github:angular/bower-angular@1.4.7"
    },
    "github:angular/bower-angular-sanitize@1.4.7": {
      "angular": "github:angular/bower-angular@1.4.7"
    },
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.2": {
      "process": "npm:process@0.11.2"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:necolas/normalize.css@3.0.3": {
      "css": "github:systemjs/plugin-css@0.1.19"
    },
    "npm:angular-ui-router@0.2.15": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.8.25": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:bluebird@2.10.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:camel-case@1.2.0": {
      "sentence-case": "npm:sentence-case@1.1.2",
      "upper-case": "npm:upper-case@1.1.2"
    },
    "npm:change-case@2.3.0": {
      "camel-case": "npm:camel-case@1.2.0",
      "constant-case": "npm:constant-case@1.1.1",
      "dot-case": "npm:dot-case@1.1.1",
      "is-lower-case": "npm:is-lower-case@1.1.1",
      "is-upper-case": "npm:is-upper-case@1.1.1",
      "lower-case": "npm:lower-case@1.1.2",
      "lower-case-first": "npm:lower-case-first@1.0.0",
      "param-case": "npm:param-case@1.1.1",
      "pascal-case": "npm:pascal-case@1.1.1",
      "path-case": "npm:path-case@1.1.1",
      "sentence-case": "npm:sentence-case@1.1.2",
      "snake-case": "npm:snake-case@1.1.1",
      "swap-case": "npm:swap-case@1.1.1",
      "title-case": "npm:title-case@1.1.1",
      "upper-case": "npm:upper-case@1.1.2",
      "upper-case-first": "npm:upper-case-first@1.1.1"
    },
    "npm:constant-case@1.1.1": {
      "snake-case": "npm:snake-case@1.1.1",
      "upper-case": "npm:upper-case@1.1.2"
    },
    "npm:core-js@1.2.3": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.2",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:dot-case@1.1.1": {
      "sentence-case": "npm:sentence-case@1.1.2"
    },
    "npm:esprima@1.2.5": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:estemplate@0.4.0": {
      "esprima": "npm:esprima@1.2.5",
      "estraverse": "npm:estraverse@1.9.3"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:is-lower-case@1.1.1": {
      "lower-case": "npm:lower-case@1.1.2"
    },
    "npm:is-upper-case@1.1.1": {
      "upper-case": "npm:upper-case@1.1.2"
    },
    "npm:lodash._basecallback@3.3.1": {
      "lodash._baseisequal": "npm:lodash._baseisequal@3.0.7",
      "lodash._bindcallback": "npm:lodash._bindcallback@3.0.1",
      "lodash.isarray": "npm:lodash.isarray@3.0.4",
      "lodash.pairs": "npm:lodash.pairs@3.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash._baseeach@3.0.4": {
      "lodash.keys": "npm:lodash.keys@3.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash._baseflatten@3.1.4": {
      "lodash.isarguments": "npm:lodash.isarguments@3.0.4",
      "lodash.isarray": "npm:lodash.isarray@3.0.4"
    },
    "npm:lodash._baseget@3.7.2": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash._baseisequal@3.0.7": {
      "lodash.isarray": "npm:lodash.isarray@3.0.4",
      "lodash.istypedarray": "npm:lodash.istypedarray@3.0.2",
      "lodash.keys": "npm:lodash.keys@3.1.2"
    },
    "npm:lodash._baseuniq@3.0.3": {
      "lodash._baseindexof": "npm:lodash._baseindexof@3.1.0",
      "lodash._cacheindexof": "npm:lodash._cacheindexof@3.0.2",
      "lodash._createcache": "npm:lodash._createcache@3.1.2"
    },
    "npm:lodash._createcache@3.1.2": {
      "lodash._getnative": "npm:lodash._getnative@3.9.1"
    },
    "npm:lodash._topath@3.8.1": {
      "lodash.isarray": "npm:lodash.isarray@3.0.4",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash.compose@2.4.1": {
      "lodash.isfunction": "npm:lodash.isfunction@2.4.1"
    },
    "npm:lodash.flatten@3.0.2": {
      "lodash._baseflatten": "npm:lodash._baseflatten@3.1.4",
      "lodash._isiterateecall": "npm:lodash._isiterateecall@3.0.9"
    },
    "npm:lodash.keys@3.1.2": {
      "lodash._getnative": "npm:lodash._getnative@3.9.1",
      "lodash.isarguments": "npm:lodash.isarguments@3.0.4",
      "lodash.isarray": "npm:lodash.isarray@3.0.4"
    },
    "npm:lodash.map@3.1.4": {
      "lodash._arraymap": "npm:lodash._arraymap@3.0.0",
      "lodash._basecallback": "npm:lodash._basecallback@3.3.1",
      "lodash._baseeach": "npm:lodash._baseeach@3.0.4",
      "lodash.isarray": "npm:lodash.isarray@3.0.4",
      "lodash.keys": "npm:lodash.keys@3.1.2"
    },
    "npm:lodash.pairs@3.0.1": {
      "lodash.keys": "npm:lodash.keys@3.1.2",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash.pluck@3.1.2": {
      "lodash._baseget": "npm:lodash._baseget@3.7.2",
      "lodash._topath": "npm:lodash._topath@3.8.1",
      "lodash.isarray": "npm:lodash.isarray@3.0.4",
      "lodash.map": "npm:lodash.map@3.1.4",
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lodash.uniq@3.2.2": {
      "lodash._basecallback": "npm:lodash._basecallback@3.3.1",
      "lodash._baseuniq": "npm:lodash._baseuniq@3.0.3",
      "lodash._getnative": "npm:lodash._getnative@3.9.1",
      "lodash._isiterateecall": "npm:lodash._isiterateecall@3.0.9",
      "lodash.isarray": "npm:lodash.isarray@3.0.4"
    },
    "npm:lodash@3.10.1": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:lower-case-first@1.0.0": {
      "lower-case": "npm:lower-case@1.1.2"
    },
    "npm:ng-sortable@1.3.1": {
      "path": "github:jspm/nodelibs-path@0.1.0"
    },
    "npm:param-case@1.1.1": {
      "sentence-case": "npm:sentence-case@1.1.2"
    },
    "npm:pascal-case@1.1.1": {
      "camel-case": "npm:camel-case@1.2.0",
      "upper-case-first": "npm:upper-case-first@1.1.1"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.2"
    },
    "npm:path-case@1.1.1": {
      "sentence-case": "npm:sentence-case@1.1.2"
    },
    "npm:process@0.11.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0"
    },
    "npm:sentence-case@1.1.2": {
      "lower-case": "npm:lower-case@1.1.2"
    },
    "npm:snake-case@1.1.1": {
      "sentence-case": "npm:sentence-case@1.1.2"
    },
    "npm:swap-case@1.1.1": {
      "lower-case": "npm:lower-case@1.1.2",
      "upper-case": "npm:upper-case@1.1.2"
    },
    "npm:title-case@1.1.1": {
      "sentence-case": "npm:sentence-case@1.1.2",
      "upper-case": "npm:upper-case@1.1.2"
    },
    "npm:upper-case-first@1.1.1": {
      "upper-case": "npm:upper-case@1.1.2"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.2"
    }
  }
});
