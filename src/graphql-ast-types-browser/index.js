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

exports.is = is;
exports.isType = isType;
exports.validate = validate;
exports.shallowEqual = shallowEqual;
require('./definitions/init');

var _require = require('./definitions'),
  ALIAS_KEYS = _require.ALIAS_KEYS,
  NODE_FIELDS = _require.NODE_FIELDS,
  BUILDER_KEYS = _require.BUILDER_KEYS;

var t = exports; // Maps all exports to t

/**
 * Registers `is[Type]` and `assert[Type]` generated functions for a given `type`.
 * Pass `skipAliasCheck` to force it to directly compare `node.type` with `type`.
 */

function registerType(type) {
  var key = 'is' + type;

  var _isType =
    t[key] !== undefined
      ? t[key]
      : (t[key] = function (node, opts) {
          return t.is(type, node, opts);
        });

  t['assert' + type] = function (node) {
    var opts =
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!_isType(node, opts)) {
      throw new Error(
        'Expected type "' + type + '" with option ' + JSON.stringify(opts)
      );
    }
  };
}

exports.ALIAS_KEYS = ALIAS_KEYS;
exports.NODE_FIELDS = NODE_FIELDS;
exports.BUILDER_KEYS = BUILDER_KEYS;

/**
 * Registers `is[Type]` and `assert[Type]` for all types.
 */

for (var type in t.NODE_FIELDS) {
  registerType(type);
}

/**
 * Flip `ALIAS_KEYS` for faster access in the reverse direction.
 */

var TYPES = (exports.TYPES = []);

t.FLIPPED_ALIAS_KEYS = Object.keys(t.ALIAS_KEYS).reduce(function (acc, type) {
  var aliasKeys = t.ALIAS_KEYS[type];

  aliasKeys.forEach(function (alias) {
    if (acc[alias] === undefined) {
      TYPES.push(alias); // Populate `TYPES` with FLIPPED_ALIAS_KEY(S)

      // Registers `is[Alias]` and `assert[Alias]` functions for all aliases.
      t[alias.toUpperCase() + '_TYPES'] = acc[alias];
      registerType(alias);

      acc[alias] = [];
    }

    acc[alias].push(type);
  });

  return acc;
}, {});

/**
 * Returns whether `node` is of given `type`.
 *
 * For better performance, use this instead of `is[Type]` when `type` is unknown.
 * Optionally, pass `skipAliasCheck` to directly compare `node.type` with `type`.
 */

function is(type, node, opts) {
  if (
    node === null ||
    (typeof node === 'undefined' ? 'undefined' : _typeof(node)) !== 'object'
  ) {
    return false;
  }

  var matches = isType(node.kind, type);
  if (!matches) {
    return false;
  }

  if (typeof opts === 'undefined') {
    return true;
  } else {
    return t.shallowEqual(node, opts);
  }
}

/**
 * Test if a `nodeType` is a `targetType` or if `targetType` is an alias of `nodeType`.
 */

function isType(nodeType, targetType) {
  if (nodeType === targetType) {
    return true;
  }

  // This is a fast-path. If the test above failed, but an alias key is found, then the
  // targetType was a primary node type, so there's no need to check the aliases.
  if (t.ALIAS_KEYS[targetType]) {
    return false;
  }

  var aliases = t.FLIPPED_ALIAS_KEYS[targetType];
  if (aliases) {
    if (aliases[0] === nodeType) {
      return true;
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (
        var _iterator = aliases[Symbol.iterator](), _step;
        !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
        _iteratorNormalCompletion = true
      ) {
        var alias = _step.value;

        if (nodeType === alias) {
          return true;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  return false;
}

/**
 * For each call of #defineType, the following expression evalutates and generates
 * a builder function that validates incoming arguments and returns a valid AST node.
 */

var _loop = function _loop(_type) {
  var keys = t.BUILDER_KEYS[_type];
  var fields = t.NODE_FIELDS[_type];

  function builder() {
    for (
      var _len = arguments.length, args = Array(_len), _key = 0;
      _key < _len;
      _key++
    ) {
      args[_key] = arguments[_key];
    }

    if (args.length > keys.length) {
      throw new Error(
        't.' +
          _type +
          ': Too many arguments passed. Received ' +
          args.length +
          ' but can receive ' +
          ('no more than ' + keys.length)
      );
    }

    var node = keys.reduce(
      function (node, key, i) {
        node[key] = args[i] === undefined ? fields[key].default : args[i];
        return node;
      },
      { kind: _type }
    );

    for (var key in node) {
      validate(node, key, node[key]);
    }

    return node;
  }

  t[_type[0].toLowerCase() + _type.slice(1)] = builder;
};

for (var _type in t.BUILDER_KEYS) {
  _loop(_type);
}

/**
 * Executes the field validators for a given node
 */

function validate(node, key, val) {
  if (
    node === null ||
    (typeof node === 'undefined' ? 'undefined' : _typeof(node)) !== 'object'
  ) {
    return;
  }

  var fields = t.NODE_FIELDS[node.kind];
  if (fields === undefined) {
    return;
  }

  var field = fields[key];
  if (field === undefined || field.validate === undefined) {
    return;
  }

  if (field.optional && (val === undefined || val === null)) {
    return;
  }

  field.validate(node, key, val);
}

/**
 * Test if an object is shallowly equal.
 */

function shallowEqual(actual, expected) {
  for (var key in expected) {
    if (expected.hasOwnProperty(key) && actual[key] !== expected[key]) {
      return false;
    }
  }

  return true;
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJpcyIsImlzVHlwZSIsInZhbGlkYXRlIiwic2hhbGxvd0VxdWFsIiwicmVxdWlyZSIsIkFMSUFTX0tFWVMiLCJOT0RFX0ZJRUxEUyIsIkJVSUxERVJfS0VZUyIsInQiLCJleHBvcnRzIiwicmVnaXN0ZXJUeXBlIiwidHlwZSIsImtleSIsIl9pc1R5cGUiLCJ1bmRlZmluZWQiLCJub2RlIiwib3B0cyIsIkVycm9yIiwiSlNPTiIsInN0cmluZ2lmeSIsIlRZUEVTIiwiRkxJUFBFRF9BTElBU19LRVlTIiwiT2JqZWN0Iiwia2V5cyIsInJlZHVjZSIsImFjYyIsImFsaWFzS2V5cyIsImZvckVhY2giLCJhbGlhcyIsInB1c2giLCJ0b1VwcGVyQ2FzZSIsIm1hdGNoZXMiLCJraW5kIiwibm9kZVR5cGUiLCJ0YXJnZXRUeXBlIiwiYWxpYXNlcyIsImZpZWxkcyIsImJ1aWxkZXIiLCJhcmdzIiwibGVuZ3RoIiwiaSIsImRlZmF1bHQiLCJ0b0xvd2VyQ2FzZSIsInNsaWNlIiwidmFsIiwiZmllbGQiLCJvcHRpb25hbCIsImFjdHVhbCIsImV4cGVjdGVkIiwiaGFzT3duUHJvcGVydHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O1FBc0VnQkEsRSxHQUFBQSxFO1FBcUJBQyxNLEdBQUFBLE07UUFrRUFDLFEsR0FBQUEsUTtRQTBCQUMsWSxHQUFBQSxZO0FBckxoQkMsUUFBUSxvQkFBUjs7ZUFFa0RBLFFBQVEsZUFBUixDO0lBQTFDQyxVLFlBQUFBLFU7SUFBWUMsVyxZQUFBQSxXO0lBQWFDLFksWUFBQUEsWTs7QUFFakMsSUFBTUMsSUFBSUMsT0FBVixDLENBQW1COztBQUVuQjs7Ozs7QUFLQSxTQUFTQyxZQUFULENBQXNCQyxJQUF0QixFQUFvQztBQUNsQyxNQUFNQyxhQUFXRCxJQUFqQjs7QUFFQSxNQUFNRSxVQUFVTCxFQUFFSSxHQUFGLE1BQVdFLFNBQVgsR0FDWk4sRUFBRUksR0FBRixDQURZLEdBRVpKLEVBQUVJLEdB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QW1DO0FBQUEsUUFBeEJJLEtBQXdCO0FBNEJsQzs7QUFFRDs7OztBQUlPLFNBQVNULFFBQVQsQ0FBa0JhLElBQWxCLEVBQWlDSCxHQUFqQyxFQUE4Q2dDLEdBQTlDLEVBQXdEO0FBQzdELE1BQUk3QixTQUFTLElBQVQsSUFBaUIsUUFBT0EsSUFBUCx5Q0FBT0EsSUFBUCxPQUFnQixRQUFyQyxFQUErQztBQUM3QztBQUNEOztBQUVELE1BQU1xQixTQUFTNUIsRUFBRUYsV0FBRixDQUFjUyxLQUFLaUIsSUFBbkIsQ0FBZjtBQUNBLE1BQUlJLFdBQVd0QixTQUFmLEVBQTBCO0FBQ3hCO0FBQ0Q7O0FBRUQsTUFBTStCLFFBQVFULE9BQU94QixHQUFQLENBQWQ7QUFDQSxNQUFJaUMsVUFBVS9CLFNBQVYsSUFBdUIrQixNQUFNM0MsUUFBTixLQUFtQlksU0FBOUMsRUFBeUQ7QUFDdkQ7QUFDRDs7QUFFRCxNQUFJK0IsTUFBTUMsUUFBTixLQUFtQkYsUUFBUTlCLFNBQVIsSUFBcUI4QixRQUFRLElBQWhELENBQUosRUFBMkQ7QUFDekQ7QUFDRDs7QUFFREMsUUFBTTNDLFFBQU4sQ0FBZWEsSUFBZixFQUFxQkgsR0FBckIsRUFBMEJnQyxHQUExQjtBQUNEOztBQUVEOzs7O0FBSU8sU0FBU3pDLFlBQVQsQ0FBc0I0QyxNQUF0QixFQUFzQ0MsUUFBdEMsRUFBaUU7QUFDdEUsT0FBSyxJQUFNcEMsR0FBWCxJQUFrQm9DLFFBQWxCLEVBQTRCO0FBQzFCLFFBQUlBLFNBQVNDLGNBQVQsQ0FBd0JyQyxHQUF4QixLQUFnQ21DLE9BQU9uQyxHQUFQLE1BQWdCb0MsU0FBU3BDLEdBQVQsQ0FBcEQsRUFBbUU7QUFDakUsYUFBTyxLQUFQO0FBQ0Q7QUFDRjs7QUFFRCxTQUFPLElBQVA7QUFDRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEBmbG93XG5cbnJlcXVpcmUoJy4vZGVmaW5pdGlvbnMvaW5pdCcpO1xuXG5jb25zdCB7IEFMSUFTX0tFWVMsIE5PREVfRklFTERTLCBCVUlMREVSX0tFWVMgfSA9IHJlcXVpcmUoJy4vZGVmaW5pdGlvbnMnKTtcblxuY29uc3QgdCA9IGV4cG9ydHM7IC8vIE1hcHMgYWxsIGV4cG9ydHMgdG8gdFxuXG4vKipcbiAqIFJlZ2lzdGVycyBgaXNbVHlwZV1gIGFuZCBgYXNzZXJ0W1R5cGVdYCBnZW5lcmF0ZWQgZnVuY3Rpb25zIGZvciBhIGdpdmVuIGB0eXBlYC5cbiAqIFBhc3MgYHNraXBBbGlhc0NoZWNrYCB0byBmb3JjZSBpdCB0byBkaXJlY3RseSBjb21wYXJlIGBub2RlLnR5cGVgIHdpdGggYHR5cGVgLlxuICovXG5cbmZ1bmN0aW9uIHJlZ2lzdGVyVHlwZSh0eXBlOiBzdHJpbmcpIHtcbiAgY29uc3Qga2V5ID0gYGlzJHt0eXBlfWA7XG5cbiAgY29uc3QgX2lzVHlwZSA9IHRba2V5XSAhPT0gdW5kZWZpbmVkXG4gICAgPyB0W2tleV1cbiAgICA6IHRba2V5XSA9IChub2RlLCBvcHRzKSA9PiB0LmlzKHR5cGUsIG5vZGUsIG9wdHMpO1xuXG4gIHRbYGFzc2VydCR7dHlwZX1gXSA9IChub2RlLCBvcHRzID0ge30pID0+IHtcbiAgICBpZiAoIV9pc1R5cGUobm9kZSwgb3B0cykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgdHlwZSBcIiR7dHlwZX1cIiB3aXRoIG9wdGlvbiAke0pTT04uc3RyaW5naWZ5KG9wdHMpfWApO1xuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IHsgQUxJQVNfS0VZUywgTk9ERV9GSUVMRFMsIEJVSUxERVJfS0VZUyB9O1xuXG4vKipcbiAqIFJlZ2lzdGVycyBgaXNbVHlwZV1gIGFuZCBgYXNzZXJ0W1R5cGVdYCBmb3IgYWxsIHR5cGVzLlxuICovXG5cbmZvciAoY29uc3QgdHlwZSBpbiB0Lk5PREVfRklFTERTKSB7XG4gIHJlZ2lzdGVyVHlwZSh0eXBlKTtcbn1cblxuLyoqXG4gKiBGbGlwIGBBTElBU19LRVlTYCBmb3IgZmFzdGVyIGFjY2VzcyBpbiB0aGUgcmV2ZXJzZSBkaXJlY3Rpb24uXG4gKi9cblxuZXhwb3J0IGNvbnN0IFRZUEVTID0gW107XG5cbnQuRkxJUFBFRF9BTElBU19LRVlTID0gT2JqZWN0LmtleXModC5BTElBU19LRVlTKS5yZWR1Y2UoKGFjYywgdHlwZSkgPT4ge1xuICBjb25zdCBhbGlhc0tleXMgPSB0LkFMSUFTX0tFWVNbdHlwZV07XG5cbiAgYWxpYXNLZXlzLmZvckVhY2goYWxpYXMgPT4ge1xuICAgIGlmIChhY2NbYWxpYXNdID09PSB1bmRlZmluZWQpIHtcbiAgICAgIFRZUEVTLnB1c2goYWxpYXMpOyAvLyBQb3B1bGF0ZSBgVFlQRVNgIHdpdGggRkxJUFBFRF9BTElBU19LRVkoUylcblxuICAgICAgLy8gUmVnaXN0ZXJzIGBpc1tBbGlhc11gIGFuZCBgYXNzZXJ0W0FsaWFzXWAgZnVuY3Rpb25zIGZvciBhbGwgYWxpYXNlcy5cbiAgICAgIHRbYCR7YWxpYXMudG9VcHBlckNhc2UoKX1fVFlQRVNgXSA9IGFjY1thbGlhc107XG4gICAgICByZWdpc3RlclR5cGUoYWxpYXMpO1xuXG4gICAgICBhY2NbYWxpYXNdID0gW107XG4gICAgfVxuXG4gICAgYWNjW2FsaWFzXS5wdXNoKHR5cGUpO1xuICB9KTtcblxuICByZXR1cm4gYWNjO1xufSwge30pO1xuXG4vKipcbiAqIFJldHVybnMgd2hldGhlciBgbm9kZWAgaXMgb2YgZ2l2ZW4gYHR5cGVgLlxuICpcbiAqIEZvciBiZXR0ZXIgcGVyZm9ybWFuY2UsIHVzZSB0aGlzIGluc3RlYWQgb2YgYGlzW1R5cGVdYCB3aGVuIGB0eXBlYCBpcyB1bmtub3duLlxuICogT3B0aW9uYWxseSwgcGFzcyBgc2tpcEFsaWFzQ2hlY2tgIHRvIGRpcmVjdGx5IGNvbXBhcmUgYG5vZGUudHlwZWAgd2l0aCBgdHlwZWAuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGlzKHR5cGU6IHN0cmluZywgbm9kZTogT2JqZWN0LCBvcHRzPzogT2JqZWN0KTogYm9vbGVhbiB7XG4gIGlmIChub2RlID09PSBudWxsIHx8IHR5cGVvZiBub2RlICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IG1hdGNoZXMgPSBpc1R5cGUobm9kZS5raW5kLCB0eXBlKTtcbiAgaWYgKCFtYXRjaGVzKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvcHRzID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB0LnNoYWxsb3dFcXVhbChub2RlLCBvcHRzKTtcbiAgfVxufVxuXG4vKipcbiAqIFRlc3QgaWYgYSBgbm9kZVR5cGVgIGlzIGEgYHRhcmdldFR5cGVgIG9yIGlmIGB0YXJnZXRUeXBlYCBpcyBhbiBhbGlhcyBvZiBgbm9kZVR5cGVgLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBpc1R5cGUobm9kZVR5cGU6IHN0cmluZywgdGFyZ2V0VHlwZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGlmIChub2RlVHlwZSA9PT0gdGFyZ2V0VHlwZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gVGhpcyBpcyBhIGZhc3QtcGF0aC4gSWYgdGhlIHRlc3QgYWJvdmUgZmFpbGVkLCBidXQgYW4gYWxpYXMga2V5IGlzIGZvdW5kLCB0aGVuIHRoZVxuICAvLyB0YXJnZXRUeXBlIHdhcyBhIHByaW1hcnkgbm9kZSB0eXBlLCBzbyB0aGVyZSdzIG5vIG5lZWQgdG8gY2hlY2sgdGhlIGFsaWFzZXMuXG4gIGlmICh0LkFMSUFTX0tFWVNbdGFyZ2V0VHlwZV0pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBhbGlhc2VzOiA/QXJyYXk8c3RyaW5nPiA9IHQuRkxJUFBFRF9BTElBU19LRVlTW3RhcmdldFR5cGVdO1xuICBpZiAoYWxpYXNlcykge1xuICAgIGlmIChhbGlhc2VzWzBdID09PSBub2RlVHlwZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBhbGlhcyBvZiBhbGlhc2VzKSB7XG4gICAgICBpZiAobm9kZVR5cGUgPT09IGFsaWFzKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBGb3IgZWFjaCBjYWxsIG9mICNkZWZpbmVUeXBlLCB0aGUgZm9sbG93aW5nIGV4cHJlc3Npb24gZXZhbHV0YXRlcyBhbmQgZ2VuZXJhdGVzXG4gKiBhIGJ1aWxkZXIgZnVuY3Rpb24gdGhhdCB2YWxpZGF0ZXMgaW5jb21pbmcgYXJndW1lbnRzIGFuZCByZXR1cm5zIGEgdmFsaWQgQVNUIG5vZGUuXG4gKi9cblxuZm9yIChjb25zdCB0eXBlIGluIHQuQlVJTERFUl9LRVlTKSB7XG4gIGNvbnN0IGtleXMgPSB0LkJVSUxERVJfS0VZU1t0eXBlXTtcbiAgY29uc3QgZmllbGRzID0gdC5OT0RFX0ZJRUxEU1t0eXBlXTtcblxuICBmdW5jdGlvbiBidWlsZGVyKC4uLmFyZ3MpIHtcbiAgICBpZiAoYXJncy5sZW5ndGggPiBrZXlzLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgdC4ke3R5cGV9OiBUb28gbWFueSBhcmd1bWVudHMgcGFzc2VkLiBSZWNlaXZlZCAke2FyZ3MubGVuZ3RofSBidXQgY2FuIHJlY2VpdmUgYCArXG4gICAgICAgICAgYG5vIG1vcmUgdGhhbiAke2tleXMubGVuZ3RofWBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3Qgbm9kZSA9IGtleXMucmVkdWNlKFxuICAgICAgKG5vZGUsIGtleSwgaSkgPT4ge1xuICAgICAgICBub2RlW2tleV0gPSAoYXJnc1tpXSA9PT0gdW5kZWZpbmVkID8gZmllbGRzW2tleV0uZGVmYXVsdCA6IGFyZ3NbaV0pO1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAgIH0sXG4gICAgICB7IGtpbmQ6IHR5cGUgfVxuICAgICk7XG5cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBub2RlKSB7XG4gICAgICB2YWxpZGF0ZShub2RlLCBrZXksIG5vZGVba2V5XSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGU7XG4gIH1cblxuICB0W3R5cGVbMF0udG9Mb3dlckNhc2UoKSArIHR5cGUuc2xpY2UoMSldID0gYnVpbGRlcjtcbn1cblxuLyoqXG4gKiBFeGVjdXRlcyB0aGUgZmllbGQgdmFsaWRhdG9ycyBmb3IgYSBnaXZlbiBub2RlXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkYXRlKG5vZGU/OiBPYmplY3QsIGtleTogc3RyaW5nLCB2YWw6IGFueSkge1xuICBpZiAobm9kZSA9PT0gbnVsbCB8fCB0eXBlb2Ygbm9kZSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBmaWVsZHMgPSB0Lk5PREVfRklFTERTW25vZGUua2luZF07XG4gIGlmIChmaWVsZHMgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGZpZWxkID0gZmllbGRzW2tleV07XG4gIGlmIChmaWVsZCA9PT0gdW5kZWZpbmVkIHx8IGZpZWxkLnZhbGlkYXRlID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoZmllbGQub3B0aW9uYWwgJiYgKHZhbCA9PT0gdW5kZWZpbmVkIHx8IHZhbCA9PT0gbnVsbCkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBmaWVsZC52YWxpZGF0ZShub2RlLCBrZXksIHZhbCk7XG59XG5cbi8qKlxuICogVGVzdCBpZiBhbiBvYmplY3QgaXMgc2hhbGxvd2x5IGVxdWFsLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBzaGFsbG93RXF1YWwoYWN0dWFsOiBPYmplY3QsIGV4cGVjdGVkOiBPYmplY3QpOiBib29sZWFuIHtcbiAgZm9yIChjb25zdCBrZXkgaW4gZXhwZWN0ZWQpIHtcbiAgICBpZiAoZXhwZWN0ZWQuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBhY3R1YWxba2V5XSAhPT0gZXhwZWN0ZWRba2V5XSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuIl19
