'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _typeof =
  typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
    ? function (obj) {
        return typeof obj;
      }
    : function (obj) {
        return obj &&
          typeof Symbol === 'function' &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
          ? 'symbol'
          : typeof obj;
      };

exports.default = defineType;
exports.chain = chain;
exports.assertEach = assertEach;
exports.assertOneOf = assertOneOf;
exports.assertNodeType = assertNodeType;
exports.assertNodeOrValueType = assertNodeOrValueType;
exports.assertValueType = assertValueType;
exports.assertArrayOf = assertArrayOf;
var t = require('../index');

var BUILDER_KEYS = (exports.BUILDER_KEYS = {});
var NODE_FIELDS = (exports.NODE_FIELDS = {});
var ALIAS_KEYS = (exports.ALIAS_KEYS = {});

/**
 * Used to define an AST node.
 * @param {String} type The AST node name
 * @param {Object} opts Type definition object
 * @returns {void}
 */
function defineType(type) {
  var _ref =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref$fields = _ref.fields,
    fields = _ref$fields === undefined ? {} : _ref$fields,
    _ref$aliases = _ref.aliases,
    aliases = _ref$aliases === undefined ? [] : _ref$aliases,
    _ref$builder = _ref.builder,
    builder = _ref$builder === undefined ? [] : _ref$builder;

  for (var key in fields) {
    var field = fields[key];

    // Sets field as optional if builder exist but validator does not.
    if (builder.indexOf(key) === -1) {
      field.optional = true;
    }
  }

  BUILDER_KEYS[type] = builder;
  NODE_FIELDS[type] = fields;
  ALIAS_KEYS[type] = aliases;
}

function getType(val) {
  if (Array.isArray(val)) {
    return 'array';
  } else if (val === null) {
    return 'null';
  } else if (val === undefined) {
    return 'undefined';
  } else {
    return typeof val === 'undefined' ? 'undefined' : _typeof(val);
  }
}

// Validation helpers

function chain() {
  for (
    var _len = arguments.length, fns = Array(_len), _key = 0;
    _key < _len;
    _key++
  ) {
    fns[_key] = arguments[_key];
  }

  return function validate() {
    for (
      var _len2 = arguments.length, args = Array(_len2), _key2 = 0;
      _key2 < _len2;
      _key2++
    ) {
      args[_key2] = arguments[_key2];
    }

    fns.forEach(function (fn) {
      return fn.apply(undefined, args);
    });
  };
}

function assertEach(callback) {
  function validator(node, key, val) {
    if (!Array.isArray(val)) {
      return;
    }

    val.forEach(function (it, i) {
      return callback(node, key + '[' + i + ']', it);
    });
  }
  return validator;
}

function assertOneOf() {
  for (
    var _len3 = arguments.length, vals = Array(_len3), _key3 = 0;
    _key3 < _len3;
    _key3++
  ) {
    vals[_key3] = arguments[_key3];
  }

  function validate(node, key, val) {
    if (vals.indexOf(val.kind) < 0) {
      throw new TypeError(
        'Property ' +
          key +
          ' expected value to be one of ' +
          JSON.stringify(vals) +
          ' but got ' +
          JSON.stringify(val)
      );
    }
  }

  return validate;
}

function assertNodeType() {
  for (
    var _len4 = arguments.length, types = Array(_len4), _key4 = 0;
    _key4 < _len4;
    _key4++
  ) {
    types[_key4] = arguments[_key4];
  }

  function validate(node, key, val) {
    var valid = types.every(function (type) {
      return t.is(type, val);
    });

    if (!valid) {
      throw new TypeError(
        'Property ' +
          key +
          ' of ' +
          node.type +
          ' expected node to be of a type ' +
          JSON.stringify(types) +
          ' ' +
          ('but instead got ' + JSON.stringify(val && val.type))
      );
    }
  }

  return validate;
}

function assertNodeOrValueType() {
  for (
    var _len5 = arguments.length, types = Array(_len5), _key5 = 0;
    _key5 < _len5;
    _key5++
  ) {
    types[_key5] = arguments[_key5];
  }

  function validate(node, key, val) {
    var valid = types.every(function (type) {
      return getType(val) === type || t.is(type, val);
    });

    if (!valid) {
      throw new TypeError(
        'Property ' +
          key +
          ' of ' +
          node.type +
          ' expected node to be of a type ' +
          JSON.stringify(types) +
          ' ' +
          ('but instead got ' + JSON.stringify(val && val.type))
      );
    }
  }

  return validate;
}

function assertValueType(type) {
  function validate(node, key, val) {
    var valid = getType(val) === type;

    if (!valid) {
      throw new TypeError(
        'Property ' +
          key +
          ' expected type of ' +
          type +
          ' but got ' +
          getType(val)
      );
    }
  }

  return validate;
}

function assertArrayOf(cb) {
  return chain(assertValueType('array'), assertEach(cb));
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWZpbml0aW9ucy9pbmRleC5qcyJdLCJuYW1lcyI6WyJkZWZpbmVUeXBlIiwiY2hhaW4iLCJhc3NlcnRFYWNoIiwiYXNzZXJ0T25lT2YiLCJhc3NlcnROb2RlVHlwZSIsImFzc2VydE5vZGVPclZhbHVlVHlwZSIsImFzc2VydFZhbHVlVHlwZSIsImFzc2VydEFycmF5T2YiLCJ0IiwicmVxdWlyZSIsIkJVSUxERVJfS0VZUyIsIk5PREVfRklFTERTIiwiQUxJQVNfS0VZUyIsInR5cGUiLCJmaWVsZHMiLCJhbGlhc2VzIiwiYnVpbGRlciIsImtleSIsImZpZWxkIiwiaW5kZXhPZiIsIm9wdGlvbmFsIiwiZ2V0VHlwZSIsInZhbCIsIkFycmF5IiwiaXNBcnJheSIsInVuZGVmaW5lZCIsImZucyIsInZhbGlkYXRlIiwiYXJncyIsImZvckVhY2giLCJmbiIsImNhbGxiYWNrIiwidmFsaWRhdG9yIiwibm9kZSIsIml0IiwiaSIsInZhbHMiLCJraW5kIiwiVHlwZUVycm9yIiwiSlNPTiIsInN0cmluZ2lmeSIsInR5cGVzIiwidmFsaWQiLCJldmVyeSIsImlzIiwiY2IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O2tCQTBCd0JBLFU7UUFnQ1JDLEssR0FBQUEsSztRQU1BQyxVLEdBQUFBLFU7UUFXQUMsVyxHQUFBQSxXO1FBY0FDLGMsR0FBQUEsYztRQWdCQUMscUIsR0FBQUEscUI7UUFnQkFDLGUsR0FBQUEsZTtRQWNBQyxhLEdBQUFBLGE7QUF0SWhCLElBQU1DLElBQUlDLFFBQVEsVUFBUixDQUFWOztBQU9PLElBQU1DLHNDQUFrRCxFQUF4RDtBQUNBLElBQU1DLG9DQUVULEVBRkc7QUFHQSxJQUFNQyxrQ0FBZ0QsRUFBdEQ7O0FBUVA7Ozs7OztBQU1lLFNBQVNaLFVBQVQsQ0FDYmEsSUFEYSxFQUdiO0FBQUEsaUZBRHNELEVBQ3REO0FBQUEseUJBREVDLE1BQ0Y7QUFBQSxNQURFQSxNQUNGLCtCQURXLEVBQ1g7QUFBQSwwQkFEZUMsT0FDZjtBQUFB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O0FBQ3BELFNBQU81QyxNQUFNSyxnQkFBZ0IsT0FBaEIsQ0FBTixFQUFnQ0osV0FBVzJDLEVBQVgsQ0FBaEMsQ0FBUDtBQUNEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQGZsb3dcbmNvbnN0IHQgPSByZXF1aXJlKFwiLi4vaW5kZXhcIik7XG5cbnR5cGUgVmFsaWRhdG9yID0ge1xuICB2YWxpZGF0ZTogRnVuY3Rpb24sXG4gIG9wdGlvbmFsPzogYm9vbGVhblxufTtcblxuZXhwb3J0IGNvbnN0IEJVSUxERVJfS0VZUzogeyBbdHlwZTogc3RyaW5nXTogQXJyYXk8c3RyaW5nPiB9ID0ge307XG5leHBvcnQgY29uc3QgTk9ERV9GSUVMRFM6IHtcbiAgW3R5cGU6IHN0cmluZ106IHsgW2ZpZWxkS2V5OiBzdHJpbmddOiBWYWxpZGF0b3IgfVxufSA9IHt9O1xuZXhwb3J0IGNvbnN0IEFMSUFTX0tFWVM6IHsgW3R5cGU6IHN0cmluZ106IEFycmF5PHN0cmluZz4gfSA9IHt9O1xuXG50eXBlIE9wdGlvbiA9IHtcbiAgZmllbGRzPzogeyBbZmllbGRLZXk6IHN0cmluZ106IFZhbGlkYXRvciB9LFxuICBhbGlhc2VzPzogQXJyYXk8c3RyaW5nPixcbiAgYnVpbGRlcj86IEFycmF5PHN0cmluZz4gLy8gTm9kZSBwcm9wZXJ0aWVzIHRvIGJlIHRyYW5zZm9ybWVkIGludG8gcGFyYW1zXG59O1xuXG4vKipcbiAqIFVzZWQgdG8gZGVmaW5lIGFuIEFTVCBub2RlLlxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGUgVGhlIEFTVCBub2RlIG5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIFR5cGUgZGVmaW5pdGlvbiBvYmplY3RcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZWZpbmVUeXBlKFxuICB0eXBlOiBzdHJpbmcsXG4gIHsgZmllbGRzID0ge30sIGFsaWFzZXMgPSBbXSwgYnVpbGRlciA9IFtdIH06IE9wdGlvbiA9IHt9XG4pIHtcbiAgZm9yIChjb25zdCBrZXkgaW4gZmllbGRzKSB7XG4gICAgY29uc3QgZmllbGQgPSBmaWVsZHNba2V5XTtcblxuICAgIC8vIFNldHMgZmllbGQgYXMgb3B0aW9uYWwgaWYgYnVpbGRlciBleGlzdCBidXQgdmFsaWRhdG9yIGRvZXMgbm90LlxuICAgIGlmIChidWlsZGVyLmluZGV4T2Yoa2V5KSA9PT0gLTEpIHtcbiAgICAgIGZpZWxkLm9wdGlvbmFsID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBCVUlMREVSX0tFWVNbdHlwZV0gPSBidWlsZGVyO1xuICBOT0RFX0ZJRUxEU1t0eXBlXSA9IGZpZWxkcztcbiAgQUxJQVNfS0VZU1t0eXBlXSA9IGFsaWFzZXM7XG59XG5cbmZ1bmN0aW9uIGdldFR5cGUodmFsKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICByZXR1cm4gXCJhcnJheVwiO1xuICB9IGVsc2UgaWYgKHZhbCA9PT0gbnVsbCkge1xuICAgIHJldHVybiBcIm51bGxcIjtcbiAgfSBlbHNlIGlmICh2YWwgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBcInVuZGVmaW5lZFwiO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0eXBlb2YgdmFsO1xuICB9XG59XG5cbi8vIFZhbGlkYXRpb24gaGVscGVyc1xuXG5leHBvcnQgZnVuY3Rpb24gY2hhaW4oLi4uZm5zOiBBcnJheTxGdW5jdGlvbj4pOiBGdW5jdGlvbiB7XG4gIHJldHVybiBmdW5jdGlvbiB2YWxpZGF0ZSguLi5hcmdzKSB7XG4gICAgZm5zLmZvckVhY2goZm4gPT4gZm4oLi4uYXJncykpO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0RWFjaChjYWxsYmFjazogRnVuY3Rpb24pOiBGdW5jdGlvbiB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRvcihub2RlLCBrZXksIHZhbCkge1xuICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFsLmZvckVhY2goKGl0LCBpKSA9PiBjYWxsYmFjayhub2RlLCBgJHtrZXl9WyR7aX1dYCwgaXQpKTtcbiAgfVxuICByZXR1cm4gdmFsaWRhdG9yO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0T25lT2YoLi4udmFsczogQXJyYXk8c3RyaW5nPik6IEZ1bmN0aW9uIHtcbiAgZnVuY3Rpb24gdmFsaWRhdGUobm9kZSwga2V5LCB2YWwpIHtcbiAgICBpZiAodmFscy5pbmRleE9mKHZhbC5raW5kKSA8IDApIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgIGBQcm9wZXJ0eSAke2tleX0gZXhwZWN0ZWQgdmFsdWUgdG8gYmUgb25lIG9mICR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICAgICAgdmFsc1xuICAgICAgICApfSBidXQgZ290ICR7SlNPTi5zdHJpbmdpZnkodmFsKX1gXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB2YWxpZGF0ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydE5vZGVUeXBlKC4uLnR5cGVzOiBBcnJheTxzdHJpbmc+KTogRnVuY3Rpb24ge1xuICBmdW5jdGlvbiB2YWxpZGF0ZShub2RlLCBrZXksIHZhbCkge1xuICAgIGNvbnN0IHZhbGlkID0gdHlwZXMuZXZlcnkodHlwZSA9PiB0LmlzKHR5cGUsIHZhbCkpO1xuXG4gICAgaWYgKCF2YWxpZCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgYFByb3BlcnR5ICR7a2V5fSBvZiAke25vZGUudHlwZX0gZXhwZWN0ZWQgbm9kZSB0byBiZSBvZiBhIHR5cGUgJHtKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICB0eXBlc1xuICAgICAgICApfSBgICsgYGJ1dCBpbnN0ZWFkIGdvdCAke0pTT04uc3RyaW5naWZ5KHZhbCAmJiB2YWwudHlwZSl9YFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdmFsaWRhdGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnROb2RlT3JWYWx1ZVR5cGUoLi4udHlwZXM6IEFycmF5PHN0cmluZz4pOiBGdW5jdGlvbiB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRlKG5vZGUsIGtleSwgdmFsKSB7XG4gICAgY29uc3QgdmFsaWQgPSB0eXBlcy5ldmVyeSh0eXBlID0+IGdldFR5cGUodmFsKSA9PT0gdHlwZSB8fCB0LmlzKHR5cGUsIHZhbCkpO1xuXG4gICAgaWYgKCF2YWxpZCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgYFByb3BlcnR5ICR7a2V5fSBvZiAke25vZGUudHlwZX0gZXhwZWN0ZWQgbm9kZSB0byBiZSBvZiBhIHR5cGUgJHtKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICB0eXBlc1xuICAgICAgICApfSBgICsgYGJ1dCBpbnN0ZWFkIGdvdCAke0pTT04uc3RyaW5naWZ5KHZhbCAmJiB2YWwudHlwZSl9YFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdmFsaWRhdGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRWYWx1ZVR5cGUodHlwZTogc3RyaW5nKTogRnVuY3Rpb24ge1xuICBmdW5jdGlvbiB2YWxpZGF0ZShub2RlLCBrZXksIHZhbCkge1xuICAgIGNvbnN0IHZhbGlkID0gZ2V0VHlwZSh2YWwpID09PSB0eXBlO1xuXG4gICAgaWYgKCF2YWxpZCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcbiAgICAgICAgYFByb3BlcnR5ICR7a2V5fSBleHBlY3RlZCB0eXBlIG9mICR7dHlwZX0gYnV0IGdvdCAke2dldFR5cGUodmFsKX1gXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB2YWxpZGF0ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFzc2VydEFycmF5T2YoY2I6IEZ1bmN0aW9uKTogRnVuY3Rpb24ge1xuICByZXR1cm4gY2hhaW4oYXNzZXJ0VmFsdWVUeXBlKFwiYXJyYXlcIiksIGFzc2VydEVhY2goY2IpKTtcbn1cbiJdfQ==
