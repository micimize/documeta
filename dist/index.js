'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _templateObject = _taggedTemplateLiteral(['\n  Get the documentation attached to the given object\n'], ['\n  Get the documentation attached to the given object\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  es6 template string tag that expands into meta({ docstring }).\n  If terminated with "meta:" on an othewise empty line,\n  will instead return a function for accepting more metadata.\n\n  meta: '], ['\n  es6 template string tag that expands into meta({ docstring }).\n  If terminated with "meta:" on an othewise empty line,\n  will instead return a function for accepting more metadata.\n\n  meta: ']);

var _objectMetadata = require('object-metadata');

var _objectMetadata2 = _interopRequireDefault(_objectMetadata);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function normal(template) {
  for (var _len = arguments.length, expressions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    expressions[_key - 1] = arguments[_key];
  }

  return template.reduce(function (accumulator, part, i) {
    return accumulator + expressions[i - 1] + part;
  });
}

var metaMonadRegex = /\n\s*meta:\s*$/;

function documentation() {
  var documentation = normal.apply(undefined, arguments);
  if (metaMonadRegex.test(documentation)) {
    return function (data) {
      return (0, _objectMetadata2.default)(_extends({
        documentation: documentation.replace(metaMonadRegex, '')
      }, data));
    };
  } else {
    return (0, _objectMetadata2.default)({ documentation: documentation });
  }
}

var get = exports.get = documentation(_templateObject)(function get(obj) {
  return _objectMetadata2.default.get(obj).documentation;
});

documentation.get = get;

exports.default = documentation(_templateObject2)({
  examples: [{
    input: ['docstring'],
    output: function output() {
      var f = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (_) {
        return _;
      };
      return (0, _objectMetadata2.default)({ documentation: 'docustring' })(f);
    }
  }, {
    input: ['docstring\n\n  meta:'],
    output: function output() {
      var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { meta: 'data' };
      return function () {
        var f = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function (_) {
          return _;
        };
        return (0, _objectMetadata2.default)(_extends({ documentation: 'docstring' }, o))(f);
      };
    }
  }]
})(documentation);