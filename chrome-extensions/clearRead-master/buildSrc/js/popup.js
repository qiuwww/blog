(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hotkeys = [];
var editType = '';
var sysState = 'open';

var addEvents = function addEvents() {
    document.getElementById('editOpen').addEventListener('click', function (e) {
        editType = 'open';
        openDialog();
    });
    document.getElementById('editClose').addEventListener('click', function (e) {
        editType = 'close';
        openDialog();
    });
    document.getElementById('dialogCancel').addEventListener('click', function (e) {
        closeDialog();
    });
    document.getElementById('dialogConfirm').addEventListener('click', function (e) {
        if (hotkeys.length > 0) {
            saveHotKey();
        }
        closeDialog();
    });
    document.getElementById('hotkey').addEventListener('keydown', function (e) {
        var code = e.keyCode;
        if (hotkeys.indexOf(code) == -1) {
            hotkeys.push(code);
        }
        e.preventDefault();
    });
    document.getElementById('hotkey').addEventListener('keyup', function (e) {
        keyToName();
        document.getElementById('hotkey').blur();
        var classNames = document.getElementById('hotkeyWrap').className;
        document.getElementById('hotkeyWrap').setAttribute('class', classNames + ' is-dirty');
        e.preventDefault();
    });
    document.getElementById('hotkey').addEventListener('focus', function (e) {
        hotkeys = [];
    });
    document.getElementById('isOpen').addEventListener('change', function (e) {
        var state = e.target.checked ? 'open' : 'close';
        chrome.storage.sync.set({ state: state }, function () {
            switchState();
            snackbar('ClearRead ' + (e.target.checked ? 'enable' : 'disable') + ' success!');
        });
    });
};
var keyToName = function keyToName() {
    var keyNames = '';
    hotkeys.map(function (data, k) {
        keyNames += '' + _keycode2.default.names[data] + (k < hotkeys.length - 1 ? ' + ' : '');
    });
    document.getElementById('hotkey').value = keyNames;
};

var keyToLabel = function keyToLabel(keys) {
    var keyNames = '';
    keys.map(function (data, k) {
        keyNames += '' + _keycode2.default.names[data] + (k < keys.length - 1 ? '+' : '');
    });
    return keyNames;
};

var saveHotKey = function saveHotKey() {
    var obj = {};
    obj[editType] = hotkeys;
    chrome.storage.sync.set(obj, function () {
        initSetLabel();
        snackbar('The hotkey was successfully modified!');
    });
};

var snackbar = function snackbar(msg) {
    var snackbarContainer = document.querySelector('#toast');
    var data = { message: msg };
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
};

var openDialog = function openDialog() {
    if (sysState == 'close') return;
    hotkeys = [];
    chrome.storage.sync.get(editType, function (data) {
        if (data.hasOwnProperty(editType)) {
            hotkeys = data[editType];
        }
        keyToName();
        document.getElementsByClassName('hot-key-dialog')[0].style.display = 'flex';
        document.getElementById('hotkey').focus();
    });
};
var closeDialog = function closeDialog() {
    document.getElementsByClassName('hot-key-dialog')[0].style.display = 'none';
};
var initSetLabel = function initSetLabel() {
    chrome.storage.sync.get('open', function (data) {
        if (data.hasOwnProperty('open')) {
            var label = keyToLabel(data.open);
            document.getElementById('openLabel').innerText = label;
        } else {
            document.getElementById('openLabel').innerText = 'shift+enter';
        }
    });
    chrome.storage.sync.get('close', function (data) {
        if (data.hasOwnProperty('close')) {
            var label = keyToLabel(data.close);
            document.getElementById('closeLabel').innerText = label;
        } else {
            document.getElementById('closeLabel').innerText = 'esc';
        }
    });
};
var switchState = function switchState(init) {
    chrome.storage.sync.get('state', function (data) {
        if (data.hasOwnProperty('state')) {
            sysState = data.state;
        } else {
            sysState = 'open';
        }
        var wrap = document.getElementsByClassName('popup-wrap')[0];
        if (sysState == 'open') {
            chrome.browserAction.setIcon({
                path: 'icon.png'
            }, function () {});
            wrap.setAttribute('class', 'popup-wrap');
        } else {
            chrome.browserAction.setIcon({
                path: 'icon_gray.png'
            }, function () {});
            wrap.setAttribute('class', 'popup-wrap popup-disable');
        }
        if (init) {
            var switchEl = document.getElementsByClassName('mdl-switch')[0];
            var classNames = switchEl.className;
            if (sysState == 'open') {
                if (classNames.indexOf('is-checked') == -1) {
                    switchEl.setAttribute('class', classNames + ' is-checked');
                }
            } else {
                if (classNames.indexOf('is-checked') > -1) {
                    switchEl.setAttribute('class', '' + classNames.replace('is-checked', ''));
                }
            }
            document.getElementById('isOpen').checked = sysState == 'open' ? true : false;
        }
    });
};
switchState(true);
addEvents();
initSetLabel();

},{"keycode":2}],2:[function(require,module,exports){
// Source: http://jsfiddle.net/vWx8V/
// http://stackoverflow.com/questions/5603195/full-list-of-javascript-keycodes

/**
 * Conenience method returns corresponding value for given keyName or keyCode.
 *
 * @param {Mixed} keyCode {Number} or keyName {String}
 * @return {Mixed}
 * @api public
 */

function keyCode(searchInput) {
  // Keyboard Events
  if (searchInput && 'object' === typeof searchInput) {
    var hasKeyCode = searchInput.which || searchInput.keyCode || searchInput.charCode
    if (hasKeyCode) searchInput = hasKeyCode
  }

  // Numbers
  if ('number' === typeof searchInput) return names[searchInput]

  // Everything else (cast to string)
  var search = String(searchInput)

  // check codes
  var foundNamedKey = codes[search.toLowerCase()]
  if (foundNamedKey) return foundNamedKey

  // check aliases
  var foundNamedKey = aliases[search.toLowerCase()]
  if (foundNamedKey) return foundNamedKey

  // weird character?
  if (search.length === 1) return search.charCodeAt(0)

  return undefined
}

/**
 * Compares a keyboard event with a given keyCode or keyName.
 *
 * @param {Event} event Keyboard event that should be tested
 * @param {Mixed} keyCode {Number} or keyName {String}
 * @return {Boolean}
 * @api public
 */
keyCode.isEventKey = function isEventKey(event, nameOrCode) {
  if (event && 'object' === typeof event) {
    var keyCode = event.which || event.keyCode || event.charCode
    if (keyCode === null || keyCode === undefined) { return false; }
    if (typeof nameOrCode === 'string') {
      // check codes
      var foundNamedKey = codes[nameOrCode.toLowerCase()]
      if (foundNamedKey) { return foundNamedKey === keyCode; }
    
      // check aliases
      var foundNamedKey = aliases[nameOrCode.toLowerCase()]
      if (foundNamedKey) { return foundNamedKey === keyCode; }
    } else if (typeof nameOrCode === 'number') {
      return nameOrCode === keyCode;
    }
    return false;
  }
}

exports = module.exports = keyCode;

/**
 * Get by name
 *
 *   exports.code['enter'] // => 13
 */

var codes = exports.code = exports.codes = {
  'backspace': 8,
  'tab': 9,
  'enter': 13,
  'shift': 16,
  'ctrl': 17,
  'alt': 18,
  'pause/break': 19,
  'caps lock': 20,
  'esc': 27,
  'space': 32,
  'page up': 33,
  'page down': 34,
  'end': 35,
  'home': 36,
  'left': 37,
  'up': 38,
  'right': 39,
  'down': 40,
  'insert': 45,
  'delete': 46,
  'command': 91,
  'left command': 91,
  'right command': 93,
  'numpad *': 106,
  'numpad +': 107,
  'numpad -': 109,
  'numpad .': 110,
  'numpad /': 111,
  'num lock': 144,
  'scroll lock': 145,
  'my computer': 182,
  'my calculator': 183,
  ';': 186,
  '=': 187,
  ',': 188,
  '-': 189,
  '.': 190,
  '/': 191,
  '`': 192,
  '[': 219,
  '\\': 220,
  ']': 221,
  "'": 222
}

// Helper aliases

var aliases = exports.aliases = {
  'windows': 91,
  '⇧': 16,
  '⌥': 18,
  '⌃': 17,
  '⌘': 91,
  'ctl': 17,
  'control': 17,
  'option': 18,
  'pause': 19,
  'break': 19,
  'caps': 20,
  'return': 13,
  'escape': 27,
  'spc': 32,
  'spacebar': 32,
  'pgup': 33,
  'pgdn': 34,
  'ins': 45,
  'del': 46,
  'cmd': 91
}

/*!
 * Programatically add the following
 */

// lower case chars
for (i = 97; i < 123; i++) codes[String.fromCharCode(i)] = i - 32

// numbers
for (var i = 48; i < 58; i++) codes[i - 48] = i

// function keys
for (i = 1; i < 13; i++) codes['f'+i] = i + 111

// numpad keys
for (i = 0; i < 10; i++) codes['numpad '+i] = i + 96

/**
 * Get by code
 *
 *   exports.name[13] // => 'Enter'
 */

var names = exports.names = exports.title = {} // title for backward compat

// Create reverse mapping
for (i in codes) names[codes[i]] = i

// Add aliases
for (var alias in aliases) {
  codes[alias] = aliases[alias]
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXZTcmMvcG9wdXAuanMiLCJub2RlX21vZHVsZXMva2V5Y29kZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDR0E7Ozs7OztBQUhBLElBQUksVUFBVSxFQUFkO0FBQ0EsSUFBSSxXQUFXLEVBQWY7QUFDQSxJQUFJLFdBQVcsTUFBZjs7QUFFQSxJQUFNLFlBQVksU0FBWixTQUFZLEdBQU07QUFDcEIsYUFBUyxjQUFULENBQXdCLFVBQXhCLEVBQW9DLGdCQUFwQyxDQUFxRCxPQUFyRCxFQUE4RCxVQUFDLENBQUQsRUFBTztBQUNqRSxtQkFBVyxNQUFYO0FBQ0E7QUFDSCxLQUhEO0FBSUEsYUFBUyxjQUFULENBQXdCLFdBQXhCLEVBQXFDLGdCQUFyQyxDQUFzRCxPQUF0RCxFQUErRCxVQUFDLENBQUQsRUFBTztBQUNsRSxtQkFBVyxPQUFYO0FBQ0E7QUFDSCxLQUhEO0FBSUEsYUFBUyxjQUFULENBQXdCLGNBQXhCLEVBQXdDLGdCQUF4QyxDQUF5RCxPQUF6RCxFQUFrRSxVQUFDLENBQUQsRUFBTztBQUNyRTtBQUNILEtBRkQ7QUFHQSxhQUFTLGNBQVQsQ0FBd0IsZUFBeEIsRUFBeUMsZ0JBQXpDLENBQTBELE9BQTFELEVBQW1FLFVBQUMsQ0FBRCxFQUFPO0FBQ3RFLFlBQUcsUUFBUSxNQUFSLEdBQWlCLENBQXBCLEVBQXVCO0FBQ25CO0FBQ0g7QUFDRDtBQUNILEtBTEQ7QUFNQSxhQUFTLGNBQVQsQ0FBd0IsUUFBeEIsRUFBa0MsZ0JBQWxDLENBQW1ELFNBQW5ELEVBQThELFVBQUMsQ0FBRCxFQUFPO0FBQ2pFLFlBQUksT0FBTyxFQUFFLE9BQWI7QUFDQSxZQUFHLFFBQVEsT0FBUixDQUFnQixJQUFoQixLQUF5QixDQUFDLENBQTdCLEVBQWdDO0FBQzVCLG9CQUFRLElBQVIsQ0FBYSxJQUFiO0FBQ0g7QUFDRCxVQUFFLGNBQUY7QUFDSCxLQU5EO0FBT0Es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QSxZQUFZLElBQVo7QUFDQTtBQUNBOzs7QUNwSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImxldCBob3RrZXlzID0gW107XG5sZXQgZWRpdFR5cGUgPSAnJztcbmxldCBzeXNTdGF0ZSA9ICdvcGVuJztcbmltcG9ydCBrZXljb2RlIGZyb20gJ2tleWNvZGUnO1xuY29uc3QgYWRkRXZlbnRzID0gKCkgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlZGl0T3BlbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgZWRpdFR5cGUgPSAnb3Blbic7XG4gICAgICAgIG9wZW5EaWFsb2coKTtcbiAgICB9KTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZWRpdENsb3NlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBlZGl0VHlwZSA9ICdjbG9zZSc7XG4gICAgICAgIG9wZW5EaWFsb2coKTtcbiAgICB9KTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlhbG9nQ2FuY2VsJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBjbG9zZURpYWxvZygpO1xuICAgIH0pO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkaWFsb2dDb25maXJtJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBpZihob3RrZXlzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHNhdmVIb3RLZXkoKTtcbiAgICAgICAgfVxuICAgICAgICBjbG9zZURpYWxvZygpO1xuICAgIH0pO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdob3RrZXknKS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICAgICAgbGV0IGNvZGUgPSBlLmtleUNvZGU7XG4gICAgICAgIGlmKGhvdGtleXMuaW5kZXhPZihjb2RlKSA9PSAtMSkge1xuICAgICAgICAgICAgaG90a2V5cy5wdXNoKGNvZGUpO1xuICAgICAgICB9XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaG90a2V5JykuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xuICAgICAgICBrZXlUb05hbWUoKTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvdGtleScpLmJsdXIoKTtcbiAgICAgICAgbGV0IGNsYXNzTmFtZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaG90a2V5V3JhcCcpLmNsYXNzTmFtZTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvdGtleVdyYXAnKS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgYCR7Y2xhc3NOYW1lc30gaXMtZGlydHlgKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdob3RrZXknKS5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIChlKSA9PiB7XG4gICAgICAgIGhvdGtleXMgPSBbXTtcbiAgICB9KTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaXNPcGVuJykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcbiAgICAgICAgbGV0IHN0YXRlID0gZS50YXJnZXQuY2hlY2tlZD8nb3Blbic6J2Nsb3NlJztcbiAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoe3N0YXRlOiBzdGF0ZX0sICgpID0+IHtcbiAgICAgICAgICAgIHN3aXRjaFN0YXRlKCk7XG4gICAgICAgICAgICBzbmFja2JhcihgQ2xlYXJSZWFkICR7ZS50YXJnZXQuY2hlY2tlZD8nZW5hYmxlJzonZGlzYWJsZSd9IHN1Y2Nlc3MhYCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcbmNvbnN0IGtleVRvTmFtZSA9ICgpID0+IHtcbiAgICBsZXQga2V5TmFtZXMgPSBgYDtcbiAgICBob3RrZXlzLm1hcCgoZGF0YSwgaykgPT4ge1xuICAgICAgICBrZXlOYW1lcyArPSBgJHtrZXljb2RlLm5hbWVzW2RhdGFdfSR7ayA8IChob3RrZXlzLmxlbmd0aCAtIDEpPycgKyAnOicnfWA7XG4gICAgfSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvdGtleScpLnZhbHVlID0ga2V5TmFtZXM7XG59O1xuXG5jb25zdCBrZXlUb0xhYmVsID0gKGtleXMpID0+IHtcbiAgICBsZXQga2V5TmFtZXMgPSBgYDtcbiAgICBrZXlzLm1hcCgoZGF0YSwgaykgPT4ge1xuICAgICAgICBrZXlOYW1lcyArPSBgJHtrZXljb2RlLm5hbWVzW2RhdGFdfSR7ayA8IChrZXlzLmxlbmd0aCAtIDEpPycrJzonJ31gO1xuICAgIH0pO1xuICAgIHJldHVybiBrZXlOYW1lcztcbn07XG5cbmNvbnN0IHNhdmVIb3RLZXkgPSAoKSA9PiB7XG4gICAgbGV0IG9iaiA9IHt9O1xuICAgIG9ialtlZGl0VHlwZV0gPSBob3RrZXlzO1xuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KG9iaiwgKCkgPT4ge1xuICAgICAgICBpbml0U2V0TGFiZWwoKTtcbiAgICAgICAgc25hY2tiYXIoJ1RoZSBob3RrZXkgd2FzIHN1Y2Nlc3NmdWxseSBtb2RpZmllZCEnKTtcbiAgICB9KTtcbn07XG5cbmNvbnN0IHNuYWNrYmFyID0gKG1zZykgPT4ge1xuICAgIGxldCBzbmFja2JhckNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0b2FzdCcpO1xuICAgIGxldCBkYXRhID0ge21lc3NhZ2U6IG1zZ307XG4gICAgc25hY2tiYXJDb250YWluZXIuTWF0ZXJpYWxTbmFja2Jhci5zaG93U25hY2tiYXIoZGF0YSk7XG59O1xuXG5jb25zdCBvcGVuRGlhbG9nID0gKCkgPT4ge1xuICAgIGlmKHN5c1N0YXRlID09ICdjbG9zZScpIHJldHVybjtcbiAgICBob3RrZXlzID0gW107XG4gICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoZWRpdFR5cGUsIChkYXRhKSA9PiB7XG4gICAgICAgIGlmKGRhdGEuaGFzT3duUHJvcGVydHkoZWRpdFR5cGUpKSB7XG4gICAgICAgICAgICBob3RrZXlzID0gZGF0YVtlZGl0VHlwZV07XG4gICAgICAgIH1cbiAgICAgICAga2V5VG9OYW1lKCk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2hvdC1rZXktZGlhbG9nJylbMF0uc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hvdGtleScpLmZvY3VzKCk7XG4gICAgfSk7XG59O1xuY29uc3QgY2xvc2VEaWFsb2cgPSAoKSA9PiB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaG90LWtleS1kaWFsb2cnKVswXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xufTtcbmNvbnN0IGluaXRTZXRMYWJlbCA9ICgpID0+IHtcbiAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLmdldCgnb3BlbicsIChkYXRhKSA9PiB7XG4gICAgICAgIGlmKGRhdGEuaGFzT3duUHJvcGVydHkoJ29wZW4nKSkge1xuICAgICAgICAgICAgbGV0IGxhYmVsID0ga2V5VG9MYWJlbChkYXRhLm9wZW4pO1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29wZW5MYWJlbCcpLmlubmVyVGV4dCA9IGxhYmVsO1xuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3BlbkxhYmVsJykuaW5uZXJUZXh0ID0gYHNoaWZ0K2VudGVyYDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KCdjbG9zZScsIChkYXRhKSA9PiB7XG4gICAgICAgIGlmKGRhdGEuaGFzT3duUHJvcGVydHkoJ2Nsb3NlJykpIHtcbiAgICAgICAgICAgIGxldCBsYWJlbCA9IGtleVRvTGFiZWwoZGF0YS5jbG9zZSk7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VMYWJlbCcpLmlubmVyVGV4dCA9IGxhYmVsO1xuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VMYWJlbCcpLmlubmVyVGV4dCA9IGBlc2NgO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuY29uc3Qgc3dpdGNoU3RhdGUgPSAoaW5pdCkgPT4ge1xuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KCdzdGF0ZScsIChkYXRhKSA9PiB7XG4gICAgICAgIGlmKGRhdGEuaGFzT3duUHJvcGVydHkoJ3N0YXRlJykpIHtcbiAgICAgICAgICAgIHN5c1N0YXRlID0gZGF0YS5zdGF0ZTtcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgc3lzU3RhdGUgPSAnb3Blbic7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHdyYXAgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwb3B1cC13cmFwJylbMF07XG4gICAgICAgIGlmKHN5c1N0YXRlID09ICdvcGVuJykge1xuICAgICAgICAgICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0SWNvbih7XG4gICAgICAgICAgICAgICAgcGF0aDogJ2ljb24ucG5nJ1xuICAgICAgICAgICAgfSwgKCkgPT4ge30pO1xuICAgICAgICAgICAgd3JhcC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgYHBvcHVwLXdyYXBgKTtcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgY2hyb21lLmJyb3dzZXJBY3Rpb24uc2V0SWNvbih7XG4gICAgICAgICAgICAgICAgcGF0aDogJ2ljb25fZ3JheS5wbmcnXG4gICAgICAgICAgICB9LCAoKSA9PiB7fSk7XG4gICAgICAgICAgICB3cmFwLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBgcG9wdXAtd3JhcCBwb3B1cC1kaXNhYmxlYCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoaW5pdCkge1xuICAgICAgICAgICAgbGV0IHN3aXRjaEVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWRsLXN3aXRjaCcpWzBdO1xuICAgICAgICAgICAgbGV0IGNsYXNzTmFtZXMgPSBzd2l0Y2hFbC5jbGFzc05hbWU7XG4gICAgICAgICAgICBpZihzeXNTdGF0ZSA9PSAnb3BlbicpIHtcbiAgICAgICAgICAgICAgICBpZihjbGFzc05hbWVzLmluZGV4T2YoJ2lzLWNoZWNrZWQnKSA9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2hFbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgYCR7Y2xhc3NOYW1lc30gaXMtY2hlY2tlZGApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICBpZihjbGFzc05hbWVzLmluZGV4T2YoJ2lzLWNoZWNrZWQnKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHN3aXRjaEVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBgJHtjbGFzc05hbWVzLnJlcGxhY2UoJ2lzLWNoZWNrZWQnLCAnJyl9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lzT3BlbicpLmNoZWNrZWQgPSAoc3lzU3RhdGUgPT0gJ29wZW4nKT90cnVlOmZhbHNlO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuc3dpdGNoU3RhdGUodHJ1ZSk7XG5hZGRFdmVudHMoKTtcbmluaXRTZXRMYWJlbCgpOyIsIi8vIFNvdXJjZTogaHR0cDovL2pzZmlkZGxlLm5ldC92V3g4Vi9cbi8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTYwMzE5NS9mdWxsLWxpc3Qtb2YtamF2YXNjcmlwdC1rZXljb2Rlc1xuXG4vKipcbiAqIENvbmVuaWVuY2UgbWV0aG9kIHJldHVybnMgY29ycmVzcG9uZGluZyB2YWx1ZSBmb3IgZ2l2ZW4ga2V5TmFtZSBvciBrZXlDb2RlLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IGtleUNvZGUge051bWJlcn0gb3Iga2V5TmFtZSB7U3RyaW5nfVxuICogQHJldHVybiB7TWl4ZWR9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGtleUNvZGUoc2VhcmNoSW5wdXQpIHtcbiAgLy8gS2V5Ym9hcmQgRXZlbnRzXG4gIGlmIChzZWFyY2hJbnB1dCAmJiAnb2JqZWN0JyA9PT0gdHlwZW9mIHNlYXJjaElucHV0KSB7XG4gICAgdmFyIGhhc0tleUNvZGUgPSBzZWFyY2hJbnB1dC53aGljaCB8fCBzZWFyY2hJbnB1dC5rZXlDb2RlIHx8IHNlYXJjaElucHV0LmNoYXJDb2RlXG4gICAgaWYgKGhhc0tleUNvZGUpIHNlYXJjaElucHV0ID0gaGFzS2V5Q29kZVxuICB9XG5cbiAgLy8gTnVtYmVyc1xuICBpZiAoJ251bWJlcicgPT09IHR5cGVvZiBzZWFyY2hJbnB1dCkgcmV0dXJuIG5hbWVzW3NlYXJjaElucHV0XVxuXG4gIC8vIEV2ZXJ5dGhpbmcgZWxzZSAoY2FzdCB0byBzdHJpbmcpXG4gIHZhciBzZWFyY2ggPSBTdHJpbmcoc2VhcmNoSW5wdXQpXG5cbiAgLy8gY2hlY2sgY29kZXNcbiAgdmFyIGZvdW5kTmFtZWRLZXkgPSBjb2Rlc1tzZWFyY2gudG9Mb3dlckNhc2UoKV1cbiAgaWYgKGZvdW5kTmFtZWRLZXkpIHJldHVybiBmb3VuZE5hbWVkS2V5XG5cbiAgLy8gY2hlY2sgYWxpYXNlc1xuICB2YXIgZm91bmROYW1lZEtleSA9IGFsaWFzZXNbc2VhcmNoLnRvTG93ZXJDYXNlKCldXG4gIGlmIChmb3VuZE5hbWVkS2V5KSByZXR1cm4gZm91bmROYW1lZEtleVxuXG4gIC8vIHdlaXJkIGNoYXJhY3Rlcj9cbiAgaWYgKHNlYXJjaC5sZW5ndGggPT09IDEpIHJldHVybiBzZWFyY2guY2hhckNvZGVBdCgwKVxuXG4gIHJldHVybiB1bmRlZmluZWRcbn1cblxuLyoqXG4gKiBDb21wYXJlcyBhIGtleWJvYXJkIGV2ZW50IHdpdGggYSBnaXZlbiBrZXlDb2RlIG9yIGtleU5hbWUuXG4gKlxuICogQHBhcmFtIHtFdmVudH0gZXZlbnQgS2V5Ym9hcmQgZXZlbnQgdGhhdCBzaG91bGQgYmUgdGVzdGVkXG4gKiBAcGFyYW0ge01peGVkfSBrZXlDb2RlIHtOdW1iZXJ9IG9yIGtleU5hbWUge1N0cmluZ31cbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5rZXlDb2RlLmlzRXZlbnRLZXkgPSBmdW5jdGlvbiBpc0V2ZW50S2V5KGV2ZW50LCBuYW1lT3JDb2RlKSB7XG4gIGlmIChldmVudCAmJiAnb2JqZWN0JyA9PT0gdHlwZW9mIGV2ZW50KSB7XG4gICAgdmFyIGtleUNvZGUgPSBldmVudC53aGljaCB8fCBldmVudC5rZXlDb2RlIHx8IGV2ZW50LmNoYXJDb2RlXG4gICAgaWYgKGtleUNvZGUgPT09IG51bGwgfHwga2V5Q29kZSA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIGlmICh0eXBlb2YgbmFtZU9yQ29kZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIC8vIGNoZWNrIGNvZGVzXG4gICAgICB2YXIgZm91bmROYW1lZEtleSA9IGNvZGVzW25hbWVPckNvZGUudG9Mb3dlckNhc2UoKV1cbiAgICAgIGlmIChmb3VuZE5hbWVkS2V5KSB7IHJldHVybiBmb3VuZE5hbWVkS2V5ID09PSBrZXlDb2RlOyB9XG4gICAgXG4gICAgICAvLyBjaGVjayBhbGlhc2VzXG4gICAgICB2YXIgZm91bmROYW1lZEtleSA9IGFsaWFzZXNbbmFtZU9yQ29kZS50b0xvd2VyQ2FzZSgpXVxuICAgICAgaWYgKGZvdW5kTmFtZWRLZXkpIHsgcmV0dXJuIGZvdW5kTmFtZWRLZXkgPT09IGtleUNvZGU7IH1cbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBuYW1lT3JDb2RlID09PSAnbnVtYmVyJykge1xuICAgICAgcmV0dXJuIG5hbWVPckNvZGUgPT09IGtleUNvZGU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBrZXlDb2RlO1xuXG4vKipcbiAqIEdldCBieSBuYW1lXG4gKlxuICogICBleHBvcnRzLmNvZGVbJ2VudGVyJ10gLy8gPT4gMTNcbiAqL1xuXG52YXIgY29kZXMgPSBleHBvcnRzLmNvZGUgPSBleHBvcnRzLmNvZGVzID0ge1xuICAnYmFja3NwYWNlJzogOCxcbiAgJ3RhYic6IDksXG4gICdlbnRlcic6IDEzLFxuICAnc2hpZnQnOiAxNixcbiAgJ2N0cmwnOiAxNyxcbiAgJ2FsdCc6IDE4LFxuICAncGF1c2UvYnJlYWsnOiAxOSxcbiAgJ2NhcHMgbG9jayc6IDIwLFxuICAnZXNjJzogMjcsXG4gICdzcGFjZSc6IDMyLFxuICAncGFnZSB1cCc6IDMzLFxuICAncGFnZSBkb3duJzogMzQsXG4gICdlbmQnOiAzNSxcbiAgJ2hvbWUnOiAzNixcbiAgJ2xlZnQnOiAzNyxcbiAgJ3VwJzogMzgsXG4gICdyaWdodCc6IDM5LFxuICAnZG93bic6IDQwLFxuICAnaW5zZXJ0JzogNDUsXG4gICdkZWxldGUnOiA0NixcbiAgJ2NvbW1hbmQnOiA5MSxcbiAgJ2xlZnQgY29tbWFuZCc6IDkxLFxuICAncmlnaHQgY29tbWFuZCc6IDkzLFxuICAnbnVtcGFkIConOiAxMDYsXG4gICdudW1wYWQgKyc6IDEwNyxcbiAgJ251bXBhZCAtJzogMTA5LFxuICAnbnVtcGFkIC4nOiAxMTAsXG4gICdudW1wYWQgLyc6IDExMSxcbiAgJ251bSBsb2NrJzogMTQ0LFxuICAnc2Nyb2xsIGxvY2snOiAxNDUsXG4gICdteSBjb21wdXRlcic6IDE4MixcbiAgJ215IGNhbGN1bGF0b3InOiAxODMsXG4gICc7JzogMTg2LFxuICAnPSc6IDE4NyxcbiAgJywnOiAxODgsXG4gICctJzogMTg5LFxuICAnLic6IDE5MCxcbiAgJy8nOiAxOTEsXG4gICdgJzogMTkyLFxuICAnWyc6IDIxOSxcbiAgJ1xcXFwnOiAyMjAsXG4gICddJzogMjIxLFxuICBcIidcIjogMjIyXG59XG5cbi8vIEhlbHBlciBhbGlhc2VzXG5cbnZhciBhbGlhc2VzID0gZXhwb3J0cy5hbGlhc2VzID0ge1xuICAnd2luZG93cyc6IDkxLFxuICAn4oenJzogMTYsXG4gICfijKUnOiAxOCxcbiAgJ+KMgyc6IDE3LFxuICAn4oyYJzogOTEsXG4gICdjdGwnOiAxNyxcbiAgJ2NvbnRyb2wnOiAxNyxcbiAgJ29wdGlvbic6IDE4LFxuICAncGF1c2UnOiAxOSxcbiAgJ2JyZWFrJzogMTksXG4gICdjYXBzJzogMjAsXG4gICdyZXR1cm4nOiAxMyxcbiAgJ2VzY2FwZSc6IDI3LFxuICAnc3BjJzogMzIsXG4gICdzcGFjZWJhcic6IDMyLFxuICAncGd1cCc6IDMzLFxuICAncGdkbic6IDM0LFxuICAnaW5zJzogNDUsXG4gICdkZWwnOiA0NixcbiAgJ2NtZCc6IDkxXG59XG5cbi8qIVxuICogUHJvZ3JhbWF0aWNhbGx5IGFkZCB0aGUgZm9sbG93aW5nXG4gKi9cblxuLy8gbG93ZXIgY2FzZSBjaGFyc1xuZm9yIChpID0gOTc7IGkgPCAxMjM7IGkrKykgY29kZXNbU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpIC0gMzJcblxuLy8gbnVtYmVyc1xuZm9yICh2YXIgaSA9IDQ4OyBpIDwgNTg7IGkrKykgY29kZXNbaSAtIDQ4XSA9IGlcblxuLy8gZnVuY3Rpb24ga2V5c1xuZm9yIChpID0gMTsgaSA8IDEzOyBpKyspIGNvZGVzWydmJytpXSA9IGkgKyAxMTFcblxuLy8gbnVtcGFkIGtleXNcbmZvciAoaSA9IDA7IGkgPCAxMDsgaSsrKSBjb2Rlc1snbnVtcGFkICcraV0gPSBpICsgOTZcblxuLyoqXG4gKiBHZXQgYnkgY29kZVxuICpcbiAqICAgZXhwb3J0cy5uYW1lWzEzXSAvLyA9PiAnRW50ZXInXG4gKi9cblxudmFyIG5hbWVzID0gZXhwb3J0cy5uYW1lcyA9IGV4cG9ydHMudGl0bGUgPSB7fSAvLyB0aXRsZSBmb3IgYmFja3dhcmQgY29tcGF0XG5cbi8vIENyZWF0ZSByZXZlcnNlIG1hcHBpbmdcbmZvciAoaSBpbiBjb2RlcykgbmFtZXNbY29kZXNbaV1dID0gaVxuXG4vLyBBZGQgYWxpYXNlc1xuZm9yICh2YXIgYWxpYXMgaW4gYWxpYXNlcykge1xuICBjb2Rlc1thbGlhc10gPSBhbGlhc2VzW2FsaWFzXVxufVxuIl19
