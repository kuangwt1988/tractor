SystemJS.config({
  transpiler: "plugin-typescript",
  packages: {
    "tractor": {
      "format": "esm",
      "main": "app/app.js"
    },
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
    "angular-sortable": "npm:ng-sortable@1.3.1"
  }
});

SystemJS.config({
  packageConfigPaths: [
    "npm:@*/*.json",
    "npm:*.json",
    "github:*/*.json"
  ],
  map: {
    "angular": "github:angular/bower-angular@1.4.7",
    "angular-local-storage": "npm:angular-local-storage@0.2.2",
    "angular-messages": "github:angular/bower-angular-messages@1.4.7",
    "angular-mocks": "github:angular/bower-angular-mocks@1.4.7",
    "angular-sanitize": "github:angular/bower-angular-sanitize@1.4.7",
    "angular-ui-router": "npm:angular-ui-router@0.2.15",
    "assert": "github:jspm/nodelibs-assert@0.2.0-alpha",
    "babel": "npm:babel-core@5.8.25",
    "babel-runtime": "npm:babel-runtime@5.8.25",
    "bluebird": "npm:bluebird@2.10.2",
    "buffer": "github:jspm/nodelibs-buffer@0.2.0-alpha",
    "chai": "npm:chai@3.4.0",
    "change-case": "npm:change-case@2.3.0",
    "core-js": "npm:core-js@1.2.3",
    "dedent": "github:phenomnomnominal/dedent@master",
    "dirty-chai": "npm:dirty-chai@1.2.2",
    "escodegen": "npm:escodegen@1.7.0",
    "estemplate": "npm:estemplate@0.4.0",
    "fs": "github:jspm/nodelibs-fs@0.2.0-alpha",
    "is-var-name": "npm:is-var-name@1.0.0",
    "lodash": "npm:lodash@3.10.1",
    "lodash.compose": "npm:lodash.compose@2.4.1",
    "lodash.flatten": "npm:lodash.flatten@3.0.2",
    "lodash.isregexp": "npm:lodash.isregexp@3.0.3",
    "lodash.pluck": "npm:lodash.pluck@3.1.2",
    "lodash.uniq": "npm:lodash.uniq@3.2.2",
    "module": "github:jspm/nodelibs-module@0.2.0-alpha",
    "ng-sortable": "npm:ng-sortable@1.3.1",
    "normalize.css": "github:necolas/normalize.css@3.0.3",
    "os": "github:jspm/nodelibs-os@0.2.0-alpha",
    "path": "github:jspm/nodelibs-path@0.2.0-alpha",
    "plugin-typescript": "github:frankwallis/plugin-typescript@4.0.5",
    "process": "github:jspm/nodelibs-process@0.2.0-alpha",
    "sinon": "npm:sinon@1.17.2",
    "sinon-chai": "npm:sinon-chai@2.8.0",
    "socket.io-client": "github:socketio/socket.io-client@1.3.7",
    "source-map": "npm:source-map@0.2.0",
    "text": "github:systemjs/plugin-text@0.0.2",
    "typescript": "npm:typescript@1.8.9",
    "util": "github:jspm/nodelibs-util@0.2.0-alpha"
  },
  packages: {
    "github:angular/bower-angular-mocks@1.4.7": {
      "map": {
        "angular": "github:angular/bower-angular@1.4.7"
      }
    },
    "github:angular/bower-angular-sanitize@1.4.7": {
      "map": {
        "angular": "github:angular/bower-angular@1.4.7"
      }
    },
    "github:frankwallis/plugin-typescript@4.0.5": {
      "map": {
        "typescript": "npm:typescript@1.8.9"
      }
    },
    "github:jspm/nodelibs-buffer@0.2.0-alpha": {
      "map": {
        "buffer-browserify": "npm:buffer@4.5.1"
      }
    },
    "github:jspm/nodelibs-os@0.2.0-alpha": {
      "map": {
        "os-browserify": "npm:os-browserify@0.2.1"
      }
    },
    "github:necolas/normalize.css@3.0.3": {
      "map": {
        "css": "github:systemjs/plugin-css@0.1.19"
      }
    },
    "npm:amdefine@1.0.0": {
      "map": {}
    },
    "npm:angular-ui-router@0.2.15": {
      "map": {}
    },
    "npm:babel-runtime@5.8.25": {
      "map": {}
    },
    "npm:bluebird@2.10.2": {
      "map": {}
    },
    "npm:buffer@4.5.1": {
      "map": {
        "base64-js": "npm:base64-js@1.1.2",
        "ieee754": "npm:ieee754@1.1.6",
        "isarray": "npm:isarray@1.0.0"
      }
    },
    "npm:camel-case@1.2.0": {
      "map": {
        "sentence-case": "npm:sentence-case@1.1.2",
        "upper-case": "npm:upper-case@1.1.2"
      }
    },
    "npm:chai@3.4.0": {
      "map": {
        "assertion-error": "npm:assertion-error@1.0.1",
        "deep-eql": "npm:deep-eql@0.1.3",
        "systemjs-json": "github:systemjs/plugin-json@0.1.0",
        "type-detect": "npm:type-detect@1.0.0"
      }
    },
    "npm:change-case@2.3.0": {
      "map": {
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
      }
    },
    "npm:constant-case@1.1.1": {
      "map": {
        "snake-case": "npm:snake-case@1.1.1",
        "upper-case": "npm:upper-case@1.1.2"
      }
    },
    "npm:core-js@1.2.3": {
      "map": {
        "systemjs-json": "github:systemjs/plugin-json@0.1.0"
      }
    },
    "npm:deep-eql@0.1.3": {
      "map": {
        "type-detect": "npm:type-detect@0.1.1"
      }
    },
    "npm:dirty-chai@1.2.2": {
      "map": {
        "chai": "npm:chai@3.4.0"
      }
    },
    "npm:dot-case@1.1.1": {
      "map": {
        "sentence-case": "npm:sentence-case@1.1.2"
      }
    },
    "npm:escodegen@1.7.0": {
      "map": {
        "esprima": "npm:esprima@1.2.5",
        "estraverse": "npm:estraverse@1.9.3",
        "esutils": "npm:esutils@2.0.2",
        "optionator": "npm:optionator@0.5.0",
        "source-map": "npm:source-map@0.2.0",
        "systemjs-json": "github:systemjs/plugin-json@0.1.0"
      }
    },
    "npm:esprima@1.2.5": {
      "map": {}
    },
    "npm:estemplate@0.4.0": {
      "map": {
        "esprima": "npm:esprima@1.2.5",
        "estraverse": "npm:estraverse@1.9.3"
      }
    },
    "npm:formatio@1.1.1": {
      "map": {
        "samsam": "npm:samsam@1.1.2"
      }
    },
    "npm:inherits@2.0.1": {
      "map": {}
    },
    "npm:is-lower-case@1.1.1": {
      "map": {
        "lower-case": "npm:lower-case@1.1.2"
      }
    },
    "npm:is-upper-case@1.1.1": {
      "map": {
        "upper-case": "npm:upper-case@1.1.2"
      }
    },
    "npm:levn@0.2.5": {
      "map": {
        "prelude-ls": "npm:prelude-ls@1.1.2",
        "type-check": "npm:type-check@0.3.1"
      }
    },
    "npm:lodash._basecallback@3.3.1": {
      "map": {
        "lodash._baseisequal": "npm:lodash._baseisequal@3.0.7",
        "lodash._bindcallback": "npm:lodash._bindcallback@3.0.1",
        "lodash.isarray": "npm:lodash.isarray@3.0.4",
        "lodash.pairs": "npm:lodash.pairs@3.0.1"
      }
    },
    "npm:lodash._baseeach@3.0.4": {
      "map": {
        "lodash.keys": "npm:lodash.keys@3.1.2"
      }
    },
    "npm:lodash._baseflatten@3.1.4": {
      "map": {
        "lodash.isarguments": "npm:lodash.isarguments@3.0.4",
        "lodash.isarray": "npm:lodash.isarray@3.0.4"
      }
    },
    "npm:lodash._baseget@3.7.2": {
      "map": {}
    },
    "npm:lodash._baseisequal@3.0.7": {
      "map": {
        "lodash.isarray": "npm:lodash.isarray@3.0.4",
        "lodash.istypedarray": "npm:lodash.istypedarray@3.0.2",
        "lodash.keys": "npm:lodash.keys@3.1.2"
      }
    },
    "npm:lodash._baseuniq@3.0.3": {
      "map": {
        "lodash._baseindexof": "npm:lodash._baseindexof@3.1.0",
        "lodash._cacheindexof": "npm:lodash._cacheindexof@3.0.2",
        "lodash._createcache": "npm:lodash._createcache@3.1.2"
      }
    },
    "npm:lodash._createcache@3.1.2": {
      "map": {
        "lodash._getnative": "npm:lodash._getnative@3.9.1"
      }
    },
    "npm:lodash._topath@3.8.1": {
      "map": {
        "lodash.isarray": "npm:lodash.isarray@3.0.4"
      }
    },
    "npm:lodash.compose@2.4.1": {
      "map": {
        "lodash.isfunction": "npm:lodash.isfunction@2.4.1"
      }
    },
    "npm:lodash.flatten@3.0.2": {
      "map": {
        "lodash._baseflatten": "npm:lodash._baseflatten@3.1.4",
        "lodash._isiterateecall": "npm:lodash._isiterateecall@3.0.9"
      }
    },
    "npm:lodash.keys@3.1.2": {
      "map": {
        "lodash._getnative": "npm:lodash._getnative@3.9.1",
        "lodash.isarguments": "npm:lodash.isarguments@3.0.4",
        "lodash.isarray": "npm:lodash.isarray@3.0.4"
      }
    },
    "npm:lodash.map@3.1.4": {
      "map": {
        "lodash._arraymap": "npm:lodash._arraymap@3.0.0",
        "lodash._basecallback": "npm:lodash._basecallback@3.3.1",
        "lodash._baseeach": "npm:lodash._baseeach@3.0.4",
        "lodash.isarray": "npm:lodash.isarray@3.0.4",
        "lodash.keys": "npm:lodash.keys@3.1.2"
      }
    },
    "npm:lodash.pairs@3.0.1": {
      "map": {
        "lodash.keys": "npm:lodash.keys@3.1.2"
      }
    },
    "npm:lodash.pluck@3.1.2": {
      "map": {
        "lodash._baseget": "npm:lodash._baseget@3.7.2",
        "lodash._topath": "npm:lodash._topath@3.8.1",
        "lodash.isarray": "npm:lodash.isarray@3.0.4",
        "lodash.map": "npm:lodash.map@3.1.4"
      }
    },
    "npm:lodash.uniq@3.2.2": {
      "map": {
        "lodash._basecallback": "npm:lodash._basecallback@3.3.1",
        "lodash._baseuniq": "npm:lodash._baseuniq@3.0.3",
        "lodash._getnative": "npm:lodash._getnative@3.9.1",
        "lodash._isiterateecall": "npm:lodash._isiterateecall@3.0.9",
        "lodash.isarray": "npm:lodash.isarray@3.0.4"
      }
    },
    "npm:lodash@3.10.1": {
      "map": {}
    },
    "npm:lower-case-first@1.0.0": {
      "map": {
        "lower-case": "npm:lower-case@1.1.2"
      }
    },
    "npm:ng-sortable@1.3.1": {
      "map": {}
    },
    "npm:optionator@0.5.0": {
      "map": {
        "deep-is": "npm:deep-is@0.1.3",
        "fast-levenshtein": "npm:fast-levenshtein@1.0.7",
        "levn": "npm:levn@0.2.5",
        "prelude-ls": "npm:prelude-ls@1.1.2",
        "type-check": "npm:type-check@0.3.1",
        "wordwrap": "npm:wordwrap@0.0.3"
      }
    },
    "npm:param-case@1.1.1": {
      "map": {
        "sentence-case": "npm:sentence-case@1.1.2"
      }
    },
    "npm:pascal-case@1.1.1": {
      "map": {
        "camel-case": "npm:camel-case@1.2.0",
        "upper-case-first": "npm:upper-case-first@1.1.1"
      }
    },
    "npm:path-case@1.1.1": {
      "map": {
        "sentence-case": "npm:sentence-case@1.1.2"
      }
    },
    "npm:sentence-case@1.1.2": {
      "map": {
        "lower-case": "npm:lower-case@1.1.2"
      }
    },
    "npm:sinon-chai@2.8.0": {
      "map": {
        "chai": "npm:chai@3.4.0",
        "sinon": "npm:sinon@1.17.2"
      }
    },
    "npm:sinon@1.17.2": {
      "map": {
        "formatio": "npm:formatio@1.1.1",
        "lolex": "npm:lolex@1.3.2",
        "samsam": "npm:samsam@1.1.2",
        "util": "npm:util@0.10.3"
      }
    },
    "npm:snake-case@1.1.1": {
      "map": {
        "sentence-case": "npm:sentence-case@1.1.2"
      }
    },
    "npm:source-map@0.2.0": {
      "map": {
        "amdefine": "npm:amdefine@1.0.0"
      }
    },
    "npm:swap-case@1.1.1": {
      "map": {
        "lower-case": "npm:lower-case@1.1.2",
        "upper-case": "npm:upper-case@1.1.2"
      }
    },
    "npm:title-case@1.1.1": {
      "map": {
        "sentence-case": "npm:sentence-case@1.1.2",
        "upper-case": "npm:upper-case@1.1.2"
      }
    },
    "npm:type-check@0.3.1": {
      "map": {
        "prelude-ls": "npm:prelude-ls@1.1.2"
      }
    },
    "npm:typescript@1.8.9": {
      "map": {}
    },
    "npm:upper-case-first@1.1.1": {
      "map": {
        "upper-case": "npm:upper-case@1.1.2"
      }
    },
    "npm:util@0.10.3": {
      "map": {
        "inherits": "npm:inherits@2.0.1"
      }
    }
  }
});
