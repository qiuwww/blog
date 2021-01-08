(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Readability = require('./lib/Readability');

var _Readability2 = _interopRequireDefault(_Readability);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClearRead = function () {
    function ClearRead() {
        _classCallCheck(this, ClearRead);

        this.tpl = null;
        this.active = false;
        this.hotkeys = [];
        this.addEvents();
    }

    _createClass(ClearRead, [{
        key: 'addReadPage',
        value: function addReadPage() {
            if (this.active) return;
            if (!this.tpl) {
                var article = new _Readability2.default(document.cloneNode(true)).parse();
                var reg = /data-(\w*)src/g;
                var content = article.content.replace(reg, 'src');
                this.tpl = '<div class="center-area" id="clearReadCenterArea">\n                            <div class="article">\n                                <h1 class="title">' + article.title + '</h1>\n                                <div class="content">' + content + '</div>\n                            </div>\n                        </div>';
            }
            var div = document.createElement('div');
            div.id = 'clearRead';
            div.setAttribute('class', 'clearread-mode');
            div.innerHTML = this.tpl;
            document.body.appendChild(div);
            document.body.style.overflow = 'hidden';
            var imgs = div.getElementsByTagName('img');
            var areaWidth = document.getElementById('clearReadCenterArea').clientWidth;
            for (var i = 0; i < imgs.length; i++) {
                var width = imgs[i].naturalWidth;
                if (width) {
                    var centerAreaWidth = areaWidth;
                    if (width < centerAreaWidth - 140) {
                        imgs[i].setAttribute('class', 'img-c');
                    }
                }
                imgs[i].onload = function () {
                    var width = this.naturalWidth;
                    var centerAreaWidth = areaWidth;
                    if (width < centerAreaWidth - 140) {
                        this.setAttribute('class', 'img-c');
                    }
                };
            }
            this.active = true;
            setTimeout(function () {
                div.setAttribute('class', 'clearread-mode clearread-mode-show');
                document.getElementById('clearReadCenterArea').setAttribute('class', 'center-area center-area-show');
            });
        }
    }, {
        key: 'removeReadPage',
        value: function removeReadPage() {
            var _this = this;

            if (!this.active) return;
            var clearRead = document.getElementById('clearRead');
            var clearReadCenterArea = document.getElementById('clearReadCenterArea');
            clearReadCenterArea.setAttribute('class', 'center-area');
            setTimeout(function () {
                clearRead.setAttribute('class', 'clearread-mode');
                setTimeout(function () {
                    document.body.style.overflow = '';
                    var parentNode = clearRead.parentNode;
                    parentNode.removeChild(clearRead);
                    _this.active = false;
                }, 250);
            }, 100);
        }
    }, {
        key: 'addEvents',
        value: function addEvents() {
            var _this2 = this;

            document.addEventListener('click', function (e) {
                if (e.target.id === 'clearRead') {
                    var classNames = e.target.className;
                    if (classNames.indexOf('clearread-mode-show') > -1) {
                        _this2.removeReadPage();
                    }
                }
            });
            document.addEventListener('keydown', function (e) {
                var code = e.keyCode;
                if (_this2.hotkeys.indexOf(code) == -1) {
                    _this2.hotkeys.push(code);
                }
            });
            document.addEventListener('keyup', function (e) {
                chrome.storage.sync.get(function (data) {
                    if (data.hasOwnProperty('state') && data.state == 'close') return;
                    if (data.hasOwnProperty('open')) {
                        var openkeys = data.open;
                        if (JSON.stringify(_this2.hotkeys) == JSON.stringify(openkeys)) {
                            _this2.addReadPage();
                        }
                    } else {
                        if (e.shiftKey && e.keyCode == 13) {
                            _this2.addReadPage();
                        }
                    }
                    if (data.hasOwnProperty('close')) {
                        var closekeys = data.close;
                        if (JSON.stringify(_this2.hotkeys) == JSON.stringify(closekeys)) {
                            _this2.removeReadPage();
                        }
                    } else {
                        if (e.keyCode == 27) {
                            _this2.removeReadPage();
                        }
                    }
                    _this2.hotkeys = [];
                });
            });
        }
    }]);

    return ClearRead;
}();

var clearRead = new ClearRead();

},{"./lib/Readability":2}],2:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*eslint-env es6:false*/
/*
 * Copyright (c) 2010 Arc90 Inc
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * This code is heavily based on Arc90's readability.js (1.7.1) script
 * available at: http://code.google.com/p/arc90labs-readability
 */

/**
 * Public constructor.
 * @param {HTMLDocument} doc     The document to parse.
 * @param {Object}       options The options object.
 */
function Readability(doc, options) {
  // In some older versions, people passed a URI as the first argument. Cope:
  if (options && options.documentElement) {
    doc = options;
    options = arguments[2];
  } else if (!doc || !doc.documentElement) {
    throw new Error("First argument to Readability constructor should be a document object.");
  }
  options = options || {};

  this._doc = doc;
  this._articleTitle = null;
  this._articleByline = null;
  this._articleDir = null;
  this._attempts = [];

  // Configurable options
  this._debug = !!options.debug;
  this._maxElemsToParse = options.maxElemsToParse || this.DEFAULT_MAX_ELEMS_TO_PARSE;
  this._nbTopCandidates = options.nbTopCandidates || this.DEFAULT_N_TOP_CANDIDATES;
  this._charThreshold = options.charThreshold || this.DEFAULT_CHAR_THRESHOLD;
  this._classesToPreserve = this.CLASSES_TO_PRESERVE.concat(options.classesToPreserve || []);

  // Start with all flags set
  this._flags = this.FLAG_STRIP_UNLIKELYS | this.FLAG_WEIGHT_CLASSES | this.FLAG_CLEAN_CONDITIONALLY;

  var logEl;

  // Control whether log messages are sent to the console
  if (this._debug) {
    logEl = function logEl(e) {
      var rv = e.nodeName + " ";
      if (e.nodeType == e.TEXT_NODE) {
        return rv + '("' + e.textContent + '")';
      }
      var classDesc = e.className && "." + e.className.replace(/ /g, ".");
      var elDesc = "";
      if (e.id) elDesc = "(#" + e.id + classDesc + ")";else if (classDesc) elDesc = "(" + classDesc + ")";
      return rv + elDesc;
    };
    this.log = function () {
      if (typeof dump !== "undefined") {
        var msg = Array.prototype.map.call(arguments, function (x) {
          return x && x.nodeName ? logEl(x) : x;
        }).join(" ");
        dump("Reader: (Readability) " + msg + "\n");
      } else if (typeof console !== "undefined") {
        var args = ["Reader: (Readability) "].concat(arguments);
        console.log.apply(console, args);
      }
    };
  } else {
    this.log = function () {};
  }
}

Readability.prototype = {
  FLAG_STRIP_UNLIKELYS: 0x1,
  FLAG_WEIGHT_CLASSES: 0x2,
  FLAG_CLEAN_CONDITIONALLY: 0x4,

  // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
  ELEMENT_NODE: 1,
  TEXT_NODE: 3,

  // Max number of nodes supported by this parser. Default: 0 (no limit)
  DEFAULT_MAX_ELEMS_TO_PARSE: 0,

  // The number of top candidates to consider when analysing how
  // tight the competition is among candidates.
  DEFAULT_N_TOP_CANDIDATES: 5,

  // Element tags to score by default.
  DEFAULT_TAGS_TO_SCORE: "section,h2,h3,h4,h5,h6,p,td,pre".toUpperCase().split(","),

  // The default number of chars an article must have in order to return a result
  DEFAULT_CHAR_THRESHOLD: 500,

  // All of the regular expressions in use within readability.
  // Defined up here so we don't instantiate them repeatedly in loops.
  REGEXPS: {
    unlikelyCandidates: /-ad-|banner|breadcrumbs|combx|comment|community|cover-wrap|disqus|extra|foot|header|legends|menu|related|remark|replies|rss|shoutbox|sidebar|skyscraper|social|sponsor|supplemental|ad-break|agegate|pagination|pager|popup|yom-remote/i,
    okMaybeItsACandidate: /and|article|body|column|main|shadow/i,
    positive: /article|body|content|entry|hentry|h-entry|main|page|pagination|post|text|blog|story/i,
    negative: /hidden|^hid$| hid$| hid |^hid |banner|combx|comment|com-|contact|foot|footer|footnote|masthead|media|meta|outbrain|promo|related|scroll|share|shoutbox|sidebar|skyscraper|sponsor|shopping|tags|tool|widget/i,
    extraneous: /print|archive|comment|discuss|e[\-]?mail|share|reply|all|login|sign|single|utility/i,
    byline: /byline|author|dateline|writtenby|p-author/i,
    replaceFonts: /<(\/?)font[^>]*>/gi,
    normalize: /\s{2,}/g,
    videos: /\/\/(www\.)?(dailymotion|youtube|youtube-nocookie|player\.vimeo)\.com/i,
    nextLink: /(next|weiter|continue|>([^\|]|$)|»([^\|]|$))/i,
    prevLink: /(prev|earl|old|new|<|«)/i,
    whitespace: /^\s*$/,
    hasContent: /\S$/
  },

  DIV_TO_P_ELEMS: ["A", "BLOCKQUOTE", "DL", "DIV", "IMG", "OL", "P", "PRE", "TABLE", "UL", "SELECT"],

  ALTER_TO_DIV_EXCEPTIONS: ["DIV", "ARTICLE", "SECTION", "P"],

  PRESENTATIONAL_ATTRIBUTES: ["align", "background", "bgcolor", "border", "cellpadding", "cellspacing", "frame", "hspace", "rules", "style", "valign", "vspace"],

  DEPRECATED_SIZE_ATTRIBUTE_ELEMS: ["TABLE", "TH", "TD", "HR", "PRE"],

  // The commented out elements qualify as phrasing content but tend to be
  // removed by readability when put into paragraphs, so we ignore them here.
  PHRASING_ELEMS: [
  // "CANVAS", "IFRAME", "SVG", "VIDEO",
  "ABBR", "AUDIO", "B", "BDO", "BR", "BUTTON", "CITE", "CODE", "DATA", "DATALIST", "DFN", "EM", "EMBED", "I", "IMG", "INPUT", "KBD", "LABEL", "MARK", "MATH", "METER", "NOSCRIPT", "OBJECT", "OUTPUT", "PROGRESS", "Q", "RUBY", "SAMP", "SCRIPT", "SELECT", "SMALL", "SPAN", "STRONG", "SUB", "SUP", "TEXTAREA", "TIME", "VAR", "WBR"],

  // These are the classes that readability sets itself.
  CLASSES_TO_PRESERVE: ["page"],

  /**
   * Run any post-process modifications to article content as necessary.
   *
   * @param Element
   * @return void
  **/
  _postProcessContent: function _postProcessContent(articleContent) {
    // Readability cannot open relative uris so we convert them to absolute uris.
    this._fixRelativeUris(articleContent);

    // Remove classes.
    this._cleanClasses(articleContent);
  },

  /**
   * Iterates over a NodeList, calls `filterFn` for each node and removes node
   * if function returned `true`.
   *
   * If function is not passed, removes all the nodes in node list.
   *
   * @param NodeList nodeList The nodes to operate on
   * @param Function filterFn the function to use as a filter
   * @return void
   */
  _removeNodes: function _removeNodes(nodeList, filterFn) {
    for (var i = nodeList.length - 1; i >= 0; i--) {
      var node = nodeList[i];
      var parentNode = node.parentNode;
      if (parentNode) {
        if (!filterFn || filterFn.call(this, node, i, nodeList)) {
          parentNode.removeChild(node);
        }
      }
    }
  },

  /**
   * Iterates over a NodeList, and calls _setNodeTag for each node.
   *
   * @param NodeList nodeList The nodes to operate on
   * @param String newTagName the new tag name to use
   * @return void
   */
  _replaceNodeTags: function _replaceNodeTags(nodeList, newTagName) {
    for (var i = nodeList.length - 1; i >= 0; i--) {
      var node = nodeList[i];
      this._setNodeTag(node, newTagName);
    }
  },

  /**
   * Iterate over a NodeList, which doesn't natively fully implement the Array
   * interface.
   *
   * For convenience, the current object context is applied to the provided
   * iterate function.
   *
   * @param  NodeList nodeList The NodeList.
   * @param  Function fn       The iterate function.
   * @return void
   */
  _forEachNode: function _forEachNode(nodeList, fn) {
    Array.prototype.forEach.call(nodeList, fn, this);
  },

  /**
   * Iterate over a NodeList, return true if any of the provided iterate
   * function calls returns true, false otherwise.
   *
   * For convenience, the current object context is applied to the
   * provided iterate function.
   *
   * @param  NodeList nodeList The NodeList.
   * @param  Function fn       The iterate function.
   * @return Boolean
   */
  _someNode: function _someNode(nodeList, fn) {
    return Array.prototype.some.call(nodeList, fn, this);
  },

  /**
   * Iterate over a NodeList, return true if all of the provided iterate
   * function calls return true, false otherwise.
   *
   * For convenience, the current object context is applied to the
   * provided iterate function.
   *
   * @param  NodeList nodeList The NodeList.
   * @param  Function fn       The iterate function.
   * @return Boolean
   */
  _everyNode: function _everyNode(nodeList, fn) {
    return Array.prototype.every.call(nodeList, fn, this);
  },

  /**
   * Concat all nodelists passed as arguments.
   *
   * @return ...NodeList
   * @return Array
   */
  _concatNodeLists: function _concatNodeLists() {
    var slice = Array.prototype.slice;
    var args = slice.call(arguments);
    var nodeLists = args.map(function (list) {
      return slice.call(list);
    });
    return Array.prototype.concat.apply([], nodeLists);
  },

  _getAllNodesWithTag: function _getAllNodesWithTag(node, tagNames) {
    if (node.querySelectorAll) {
      return node.querySelectorAll(tagNames.join(","));
    }
    return [].concat.apply([], tagNames.map(function (tag) {
      var collection = node.getElementsByTagName(tag);
      return Array.isArray(collection) ? collection : Array.from(collection);
    }));
  },

  /**
   * Removes the class="" attribute from every element in the given
   * subtree, except those that match CLASSES_TO_PRESERVE and
   * the classesToPreserve array from the options object.
   *
   * @param Element
   * @return void
   */
  _cleanClasses: function _cleanClasses(node) {
    var classesToPreserve = this._classesToPreserve;
    var className = (node.getAttribute("class") || "").split(/\s+/).filter(function (cls) {
      return classesToPreserve.indexOf(cls) != -1;
    }).join(" ");

    if (className) {
      node.setAttribute("class", className);
    } else {
      node.removeAttribute("class");
    }

    for (node = node.firstElementChild; node; node = node.nextElementSibling) {
      this._cleanClasses(node);
    }
  },

  /**
   * Converts each <a> and <img> uri in the given element to an absolute URI,
   * ignoring #ref URIs.
   *
   * @param Element
   * @return void
   */
  _fixRelativeUris: function _fixRelativeUris(articleContent) {
    var baseURI = this._doc.baseURI;
    var documentURI = this._doc.documentURI;
    function toAbsoluteURI(uri) {
      // Leave hash links alone if the base URI matches the document URI:
      if (baseURI == documentURI && uri.charAt(0) == "#") {
        return uri;
      }
      // Otherwise, resolve against base URI:
      try {
        return new URL(uri, baseURI).href;
      } catch (ex) {
        // Something went wrong, just return the original:
      }
      return uri;
    }

    var links = articleContent.getElementsByTagName("a");
    this._forEachNode(links, function (link) {
      var href = link.getAttribute("href");
      if (href) {
        // Replace links with javascript: URIs with text content, since
        // they won't work after scripts have been removed from the page.
        if (href.indexOf("javascript:") === 0) {
          var text = this._doc.createTextNode(link.textContent);
          link.parentNode.replaceChild(text, link);
        } else {
          link.setAttribute("href", toAbsoluteURI(href));
        }
      }
    });

    var imgs = articleContent.getElementsByTagName("img");
    this._forEachNode(imgs, function (img) {
      var src = img.getAttribute("src");
      if (src) {
        img.setAttribute("src", toAbsoluteURI(src));
      }
    });
  },

  /**
   * Get the article title as an H1.
   *
   * @return void
   **/
  _getArticleTitle: function _getArticleTitle() {
    var doc = this._doc;
    var curTitle = "";
    var origTitle = "";

    try {
      curTitle = origTitle = doc.title.trim();

      // If they had an element with id "title" in their HTML
      if (typeof curTitle !== "string") curTitle = origTitle = this._getInnerText(doc.getElementsByTagName("title")[0]);
    } catch (e) {/* ignore exceptions setting the title. */}

    var titleHadHierarchicalSeparators = false;
    function wordCount(str) {
      return str.split(/\s+/).length;
    }

    // If there's a separator in the title, first remove the final part
    if (/ [\|\-\\\/>»] /.test(curTitle)) {
      titleHadHierarchicalSeparators = / [\\\/>»] /.test(curTitle);
      curTitle = origTitle.replace(/(.*)[\|\-\\\/>»] .*/gi, "$1");

      // If the resulting title is too short (3 words or fewer), remove
      // the first part instead:
      if (wordCount(curTitle) < 3) curTitle = origTitle.replace(/[^\|\-\\\/>»]*[\|\-\\\/>»](.*)/gi, "$1");
    } else if (curTitle.indexOf(": ") !== -1) {
      // Check if we have an heading containing this exact string, so we
      // could assume it's the full title.
      var headings = this._concatNodeLists(doc.getElementsByTagName("h1"), doc.getElementsByTagName("h2"));
      var trimmedTitle = curTitle.trim();
      var match = this._someNode(headings, function (heading) {
        return heading.textContent.trim() === trimmedTitle;
      });

      // If we don't, let's extract the title out of the original title string.
      if (!match) {
        curTitle = origTitle.substring(origTitle.lastIndexOf(":") + 1);

        // If the title is now too short, try the first colon instead:
        if (wordCount(curTitle) < 3) {
          curTitle = origTitle.substring(origTitle.indexOf(":") + 1);
          // But if we have too many words before the colon there's something weird
          // with the titles and the H tags so let's just use the original title instead
        } else if (wordCount(origTitle.substr(0, origTitle.indexOf(":"))) > 5) {
          curTitle = origTitle;
        }
      }
    } else if (curTitle.length > 150 || curTitle.length < 15) {
      var hOnes = doc.getElementsByTagName("h1");

      if (hOnes.length === 1) curTitle = this._getInnerText(hOnes[0]);
    }

    curTitle = curTitle.trim();
    // If we now have 4 words or fewer as our title, and either no
    // 'hierarchical' separators (\, /, > or ») were found in the original
    // title or we decreased the number of words by more than 1 word, use
    // the original title.
    var curTitleWordCount = wordCount(curTitle);
    if (curTitleWordCount <= 4 && (!titleHadHierarchicalSeparators || curTitleWordCount != wordCount(origTitle.replace(/[\|\-\\\/>»]+/g, "")) - 1)) {
      curTitle = origTitle;
    }

    return curTitle;
  },

  /**
   * Prepare the HTML document for readability to scrape it.
   * This includes things like stripping javascript, CSS, and handling terrible markup.
   *
   * @return void
   **/
  _prepDocument: function _prepDocument() {
    var doc = this._doc;

    // Remove all style tags in head
    this._removeNodes(doc.getElementsByTagName("style"));

    if (doc.body) {
      this._replaceBrs(doc.body);
    }

    this._replaceNodeTags(doc.getElementsByTagName("font"), "SPAN");
  },

  /**
   * Finds the next element, starting from the given node, and ignoring
   * whitespace in between. If the given node is an element, the same node is
   * returned.
   */
  _nextElement: function _nextElement(node) {
    var next = node;
    while (next && next.nodeType != this.ELEMENT_NODE && this.REGEXPS.whitespace.test(next.textContent)) {
      next = next.nextSibling;
    }
    return next;
  },

  /**
   * Replaces 2 or more successive <br> elements with a single <p>.
   * Whitespace between <br> elements are ignored. For example:
   *   <div>foo<br>bar<br> <br><br>abc</div>
   * will become:
   *   <div>foo<br>bar<p>abc</p></div>
   */
  _replaceBrs: function _replaceBrs(elem) {
    this._forEachNode(this._getAllNodesWithTag(elem, ["br"]), function (br) {
      var next = br.nextSibling;

      // Whether 2 or more <br> elements have been found and replaced with a
      // <p> block.
      var replaced = false;

      // If we find a <br> chain, remove the <br>s until we hit another element
      // or non-whitespace. This leaves behind the first <br> in the chain
      // (which will be replaced with a <p> later).
      while ((next = this._nextElement(next)) && next.tagName == "BR") {
        replaced = true;
        var brSibling = next.nextSibling;
        next.parentNode.removeChild(next);
        next = brSibling;
      }

      // If we removed a <br> chain, replace the remaining <br> with a <p>. Add
      // all sibling nodes as children of the <p> until we hit another <br>
      // chain.
      if (replaced) {
        var p = this._doc.createElement("p");
        br.parentNode.replaceChild(p, br);

        next = p.nextSibling;
        while (next) {
          // If we've hit another <br><br>, we're done adding children to this <p>.
          if (next.tagName == "BR") {
            var nextElem = this._nextElement(next.nextSibling);
            if (nextElem && nextElem.tagName == "BR") break;
          }

          if (!this._isPhrasingContent(next)) break;

          // Otherwise, make this node a child of the new <p>.
          var sibling = next.nextSibling;
          p.appendChild(next);
          next = sibling;
        }

        while (p.lastChild && this._isWhitespace(p.lastChild)) {
          p.removeChild(p.lastChild);
        }

        if (p.parentNode.tagName === "P") this._setNodeTag(p.parentNode, "DIV");
      }
    });
  },

  _setNodeTag: function _setNodeTag(node, tag) {
    this.log("_setNodeTag", node, tag);
    if (node.__JSDOMParser__) {
      node.localName = tag.toLowerCase();
      node.tagName = tag.toUpperCase();
      return node;
    }

    var replacement = node.ownerDocument.createElement(tag);
    while (node.firstChild) {
      replacement.appendChild(node.firstChild);
    }
    node.parentNode.replaceChild(replacement, node);
    if (node.readability) replacement.readability = node.readability;

    for (var i = 0; i < node.attributes.length; i++) {
      replacement.setAttribute(node.attributes[i].name, node.attributes[i].value);
    }
    return replacement;
  },

  /**
   * Prepare the article node for display. Clean out any inline styles,
   * iframes, forms, strip extraneous <p> tags, etc.
   *
   * @param Element
   * @return void
   **/
  _prepArticle: function _prepArticle(articleContent) {
    this._cleanStyles(articleContent);

    // Check for data tables before we continue, to avoid removing items in
    // those tables, which will often be isolated even though they're
    // visually linked to other content-ful elements (text, images, etc.).
    this._markDataTables(articleContent);

    // Clean out junk from the article content
    this._cleanConditionally(articleContent, "form");
    this._cleanConditionally(articleContent, "fieldset");
    this._clean(articleContent, "object");
    this._clean(articleContent, "embed");
    this._clean(articleContent, "h1");
    this._clean(articleContent, "footer");
    this._clean(articleContent, "link");
    this._clean(articleContent, "aside");

    // Clean out elements have "share" in their id/class combinations from final top candidates,
    // which means we don't remove the top candidates even they have "share".
    this._forEachNode(articleContent.children, function (topCandidate) {
      this._cleanMatchedNodes(topCandidate, /share/);
    });

    // If there is only one h2 and its text content substantially equals article title,
    // they are probably using it as a header and not a subheader,
    // so remove it since we already extract the title separately.
    var h2 = articleContent.getElementsByTagName("h2");
    if (h2.length === 1) {
      var lengthSimilarRate = (h2[0].textContent.length - this._articleTitle.length) / this._articleTitle.length;
      if (Math.abs(lengthSimilarRate) < 0.5) {
        var titlesMatch = false;
        if (lengthSimilarRate > 0) {
          titlesMatch = h2[0].textContent.includes(this._articleTitle);
        } else {
          titlesMatch = this._articleTitle.includes(h2[0].textContent);
        }
        if (titlesMatch) {
          this._clean(articleContent, "h2");
        }
      }
    }

    this._clean(articleContent, "iframe");
    this._clean(articleContent, "input");
    this._clean(articleContent, "textarea");
    this._clean(articleContent, "select");
    this._clean(articleContent, "button");
    this._cleanHeaders(articleContent);

    // Do these last as the previous stuff may have removed junk
    // that will affect these
    this._cleanConditionally(articleContent, "table");
    this._cleanConditionally(articleContent, "ul");
    this._cleanConditionally(articleContent, "div");

    // Remove extra paragraphs
    this._removeNodes(articleContent.getElementsByTagName("p"), function (paragraph) {
      var imgCount = paragraph.getElementsByTagName("img").length;
      var embedCount = paragraph.getElementsByTagName("embed").length;
      var objectCount = paragraph.getElementsByTagName("object").length;
      // At this point, nasty iframes have been removed, only remain embedded video ones.
      var iframeCount = paragraph.getElementsByTagName("iframe").length;
      var totalCount = imgCount + embedCount + objectCount + iframeCount;

      return totalCount === 0 && !this._getInnerText(paragraph, false);
    });

    this._forEachNode(this._getAllNodesWithTag(articleContent, ["br"]), function (br) {
      var next = this._nextElement(br.nextSibling);
      if (next && next.tagName == "P") br.parentNode.removeChild(br);
    });

    // Remove single-cell tables
    this._forEachNode(this._getAllNodesWithTag(articleContent, ["table"]), function (table) {
      var tbody = this._hasSingleTagInsideElement(table, "TBODY") ? table.firstElementChild : table;
      if (this._hasSingleTagInsideElement(tbody, "TR")) {
        var row = tbody.firstElementChild;
        if (this._hasSingleTagInsideElement(row, "TD")) {
          var cell = row.firstElementChild;
          cell = this._setNodeTag(cell, this._everyNode(cell.childNodes, this._isPhrasingContent) ? "P" : "DIV");
          table.parentNode.replaceChild(cell, table);
        }
      }
    });
  },

  /**
   * Initialize a node with the readability object. Also checks the
   * className/id for special names to add to its score.
   *
   * @param Element
   * @return void
  **/
  _initializeNode: function _initializeNode(node) {
    node.readability = { "contentScore": 0 };

    switch (node.tagName) {
      case "DIV":
        node.readability.contentScore += 5;
        break;

      case "PRE":
      case "TD":
      case "BLOCKQUOTE":
        node.readability.contentScore += 3;
        break;

      case "ADDRESS":
      case "OL":
      case "UL":
      case "DL":
      case "DD":
      case "DT":
      case "LI":
      case "FORM":
        node.readability.contentScore -= 3;
        break;

      case "H1":
      case "H2":
      case "H3":
      case "H4":
      case "H5":
      case "H6":
      case "TH":
        node.readability.contentScore -= 5;
        break;
    }

    node.readability.contentScore += this._getClassWeight(node);
  },

  _removeAndGetNext: function _removeAndGetNext(node) {
    var nextNode = this._getNextNode(node, true);
    node.parentNode.removeChild(node);
    return nextNode;
  },

  /**
   * Traverse the DOM from node to node, starting at the node passed in.
   * Pass true for the second parameter to indicate this node itself
   * (and its kids) are going away, and we want the next node over.
   *
   * Calling this in a loop will traverse the DOM depth-first.
   */
  _getNextNode: function _getNextNode(node, ignoreSelfAndKids) {
    // First check for kids if those aren't being ignored
    if (!ignoreSelfAndKids && node.firstElementChild) {
      return node.firstElementChild;
    }
    // Then for siblings...
    if (node.nextElementSibling) {
      return node.nextElementSibling;
    }
    // And finally, move up the parent chain *and* find a sibling
    // (because this is depth-first traversal, we will have already
    // seen the parent nodes themselves).
    do {
      node = node.parentNode;
    } while (node && !node.nextElementSibling);
    return node && node.nextElementSibling;
  },

  _checkByline: function _checkByline(node, matchString) {
    if (this._articleByline) {
      return false;
    }

    if (node.getAttribute !== undefined) {
      var rel = node.getAttribute("rel");
    }

    if ((rel === "author" || this.REGEXPS.byline.test(matchString)) && this._isValidByline(node.textContent)) {
      this._articleByline = node.textContent.trim();
      return true;
    }

    return false;
  },

  _getNodeAncestors: function _getNodeAncestors(node, maxDepth) {
    maxDepth = maxDepth || 0;
    var i = 0,
        ancestors = [];
    while (node.parentNode) {
      ancestors.push(node.parentNode);
      if (maxDepth && ++i === maxDepth) break;
      node = node.parentNode;
    }
    return ancestors;
  },

  /***
   * grabArticle - Using a variety of metrics (content score, classname, element types), find the content that is
   *         most likely to be the stuff a user wants to read. Then return it wrapped up in a div.
   *
   * @param page a document to run upon. Needs to be a full document, complete with body.
   * @return Element
  **/
  _grabArticle: function _grabArticle(page) {
    this.log("**** grabArticle ****");
    var doc = this._doc;
    var isPaging = page !== null ? true : false;
    page = page ? page : this._doc.body;

    // We can't grab an article if we don't have a page!
    if (!page) {
      this.log("No body found in document. Abort.");
      return null;
    }

    var pageCacheHtml = page.innerHTML;

    while (true) {
      var stripUnlikelyCandidates = this._flagIsActive(this.FLAG_STRIP_UNLIKELYS);

      // First, node prepping. Trash nodes that look cruddy (like ones with the
      // class name "comment", etc), and turn divs into P tags where they have been
      // used inappropriately (as in, where they contain no other block level elements.)
      var elementsToScore = [];
      var node = this._doc.documentElement;

      while (node) {
        var matchString = node.className + " " + node.id;

        if (!this._isProbablyVisible(node)) {
          this.log("Removing hidden node - " + matchString);
          node = this._removeAndGetNext(node);
          continue;
        }

        // Check to see if this node is a byline, and remove it if it is.
        if (this._checkByline(node, matchString)) {
          node = this._removeAndGetNext(node);
          continue;
        }

        // Remove unlikely candidates
        if (stripUnlikelyCandidates) {
          if (this.REGEXPS.unlikelyCandidates.test(matchString) && !this.REGEXPS.okMaybeItsACandidate.test(matchString) && node.tagName !== "BODY" && node.tagName !== "A") {
            this.log("Removing unlikely candidate - " + matchString);
            node = this._removeAndGetNext(node);
            continue;
          }
        }

        // Remove DIV, SECTION, and HEADER nodes without any content(e.g. text, image, video, or iframe).
        if ((node.tagName === "DIV" || node.tagName === "SECTION" || node.tagName === "HEADER" || node.tagName === "H1" || node.tagName === "H2" || node.tagName === "H3" || node.tagName === "H4" || node.tagName === "H5" || node.tagName === "H6") && this._isElementWithoutContent(node)) {
          node = this._removeAndGetNext(node);
          continue;
        }

        if (this.DEFAULT_TAGS_TO_SCORE.indexOf(node.tagName) !== -1) {
          elementsToScore.push(node);
        }

        // Turn all divs that don't have children block level elements into p's
        if (node.tagName === "DIV") {
          // Put phrasing content into paragraphs.
          var p = null;
          var childNode = node.firstChild;
          while (childNode) {
            var nextSibling = childNode.nextSibling;
            if (this._isPhrasingContent(childNode)) {
              if (p !== null) {
                p.appendChild(childNode);
              } else if (!this._isWhitespace(childNode)) {
                p = doc.createElement("p");
                node.replaceChild(p, childNode);
                p.appendChild(childNode);
              }
            } else if (p !== null) {
              while (p.lastChild && this._isWhitespace(p.lastChild)) {
                p.removeChild(p.lastChild);
              }
              p = null;
            }
            childNode = nextSibling;
          }

          // Sites like http://mobile.slate.com encloses each paragraph with a DIV
          // element. DIVs with only a P element inside and no text content can be
          // safely converted into plain P elements to avoid confusing the scoring
          // algorithm with DIVs with are, in practice, paragraphs.
          if (this._hasSingleTagInsideElement(node, "P") && this._getLinkDensity(node) < 0.25) {
            var newNode = node.children[0];
            node.parentNode.replaceChild(newNode, node);
            node = newNode;
            elementsToScore.push(node);
          } else if (!this._hasChildBlockElement(node)) {
            node = this._setNodeTag(node, "P");
            elementsToScore.push(node);
          }
        }
        node = this._getNextNode(node);
      }

      /**
       * Loop through all paragraphs, and assign a score to them based on how content-y they look.
       * Then add their score to their parent node.
       *
       * A score is determined by things like number of commas, class names, etc. Maybe eventually link density.
      **/
      var candidates = [];
      this._forEachNode(elementsToScore, function (elementToScore) {
        if (!elementToScore.parentNode || typeof elementToScore.parentNode.tagName === "undefined") return;

        // If this paragraph is less than 25 characters, don't even count it.
        var innerText = this._getInnerText(elementToScore);
        if (innerText.length < 25) return;

        // Exclude nodes with no ancestor.
        var ancestors = this._getNodeAncestors(elementToScore, 3);
        if (ancestors.length === 0) return;

        var contentScore = 0;

        // Add a point for the paragraph itself as a base.
        contentScore += 1;

        // Add points for any commas within this paragraph.
        contentScore += innerText.split(",").length;

        // For every 100 characters in this paragraph, add another point. Up to 3 points.
        contentScore += Math.min(Math.floor(innerText.length / 100), 3);

        // Initialize and score ancestors.
        this._forEachNode(ancestors, function (ancestor, level) {
          if (!ancestor.tagName || !ancestor.parentNode || typeof ancestor.parentNode.tagName === "undefined") return;

          if (typeof ancestor.readability === "undefined") {
            this._initializeNode(ancestor);
            candidates.push(ancestor);
          }

          // Node score divider:
          // - parent:             1 (no division)
          // - grandparent:        2
          // - great grandparent+: ancestor level * 3
          if (level === 0) var scoreDivider = 1;else if (level === 1) scoreDivider = 2;else scoreDivider = level * 3;
          ancestor.readability.contentScore += contentScore / scoreDivider;
        });
      });

      // After we've calculated scores, loop through all of the possible
      // candidate nodes we found and find the one with the highest score.
      var topCandidates = [];
      for (var c = 0, cl = candidates.length; c < cl; c += 1) {
        var candidate = candidates[c];

        // Scale the final candidates score based on link density. Good content
        // should have a relatively small link density (5% or less) and be mostly
        // unaffected by this operation.
        var candidateScore = candidate.readability.contentScore * (1 - this._getLinkDensity(candidate));
        candidate.readability.contentScore = candidateScore;

        this.log("Candidate:", candidate, "with score " + candidateScore);

        for (var t = 0; t < this._nbTopCandidates; t++) {
          var aTopCandidate = topCandidates[t];

          if (!aTopCandidate || candidateScore > aTopCandidate.readability.contentScore) {
            topCandidates.splice(t, 0, candidate);
            if (topCandidates.length > this._nbTopCandidates) topCandidates.pop();
            break;
          }
        }
      }

      var topCandidate = topCandidates[0] || null;
      var neededToCreateTopCandidate = false;
      var parentOfTopCandidate;

      // If we still have no top candidate, just use the body as a last resort.
      // We also have to copy the body node so it is something we can modify.
      if (topCandidate === null || topCandidate.tagName === "BODY") {
        // Move all of the page's children into topCandidate
        topCandidate = doc.createElement("DIV");
        neededToCreateTopCandidate = true;
        // Move everything (not just elements, also text nodes etc.) into the container
        // so we even include text directly in the body:
        var kids = page.childNodes;
        while (kids.length) {
          this.log("Moving child out:", kids[0]);
          topCandidate.appendChild(kids[0]);
        }

        page.appendChild(topCandidate);

        this._initializeNode(topCandidate);
      } else if (topCandidate) {
        // Find a better top candidate node if it contains (at least three) nodes which belong to `topCandidates` array
        // and whose scores are quite closed with current `topCandidate` node.
        var alternativeCandidateAncestors = [];
        for (var i = 1; i < topCandidates.length; i++) {
          if (topCandidates[i].readability.contentScore / topCandidate.readability.contentScore >= 0.75) {
            alternativeCandidateAncestors.push(this._getNodeAncestors(topCandidates[i]));
          }
        }
        var MINIMUM_TOPCANDIDATES = 3;
        if (alternativeCandidateAncestors.length >= MINIMUM_TOPCANDIDATES) {
          parentOfTopCandidate = topCandidate.parentNode;
          while (parentOfTopCandidate.tagName !== "BODY") {
            var listsContainingThisAncestor = 0;
            for (var ancestorIndex = 0; ancestorIndex < alternativeCandidateAncestors.length && listsContainingThisAncestor < MINIMUM_TOPCANDIDATES; ancestorIndex++) {
              listsContainingThisAncestor += Number(alternativeCandidateAncestors[ancestorIndex].includes(parentOfTopCandidate));
            }
            if (listsContainingThisAncestor >= MINIMUM_TOPCANDIDATES) {
              topCandidate = parentOfTopCandidate;
              break;
            }
            parentOfTopCandidate = parentOfTopCandidate.parentNode;
          }
        }
        if (!topCandidate.readability) {
          this._initializeNode(topCandidate);
        }

        // Because of our bonus system, parents of candidates might have scores
        // themselves. They get half of the node. There won't be nodes with higher
        // scores than our topCandidate, but if we see the score going *up* in the first
        // few steps up the tree, that's a decent sign that there might be more content
        // lurking in other places that we want to unify in. The sibling stuff
        // below does some of that - but only if we've looked high enough up the DOM
        // tree.
        parentOfTopCandidate = topCandidate.parentNode;
        var lastScore = topCandidate.readability.contentScore;
        // The scores shouldn't get too low.
        var scoreThreshold = lastScore / 3;
        while (parentOfTopCandidate.tagName !== "BODY") {
          if (!parentOfTopCandidate.readability) {
            parentOfTopCandidate = parentOfTopCandidate.parentNode;
            continue;
          }
          var parentScore = parentOfTopCandidate.readability.contentScore;
          if (parentScore < scoreThreshold) break;
          if (parentScore > lastScore) {
            // Alright! We found a better parent to use.
            topCandidate = parentOfTopCandidate;
            break;
          }
          lastScore = parentOfTopCandidate.readability.contentScore;
          parentOfTopCandidate = parentOfTopCandidate.parentNode;
        }

        // If the top candidate is the only child, use parent instead. This will help sibling
        // joining logic when adjacent content is actually located in parent's sibling node.
        parentOfTopCandidate = topCandidate.parentNode;
        while (parentOfTopCandidate.tagName != "BODY" && parentOfTopCandidate.children.length == 1) {
          topCandidate = parentOfTopCandidate;
          parentOfTopCandidate = topCandidate.parentNode;
        }
        if (!topCandidate.readability) {
          this._initializeNode(topCandidate);
        }
      }

      // Now that we have the top candidate, look through its siblings for content
      // that might also be related. Things like preambles, content split by ads
      // that we removed, etc.
      var articleContent = doc.createElement("DIV");
      if (isPaging) articleContent.id = "readability-content";

      var siblingScoreThreshold = Math.max(10, topCandidate.readability.contentScore * 0.2);
      // Keep potential top candidate's parent node to try to get text direction of it later.
      parentOfTopCandidate = topCandidate.parentNode;
      var siblings = parentOfTopCandidate.children;

      for (var s = 0, sl = siblings.length; s < sl; s++) {
        var sibling = siblings[s];
        var append = false;

        this.log("Looking at sibling node:", sibling, sibling.readability ? "with score " + sibling.readability.contentScore : "");
        this.log("Sibling has score", sibling.readability ? sibling.readability.contentScore : "Unknown");

        if (sibling === topCandidate) {
          append = true;
        } else {
          var contentBonus = 0;

          // Give a bonus if sibling nodes and top candidates have the example same classname
          if (sibling.className === topCandidate.className && topCandidate.className !== "") contentBonus += topCandidate.readability.contentScore * 0.2;

          if (sibling.readability && sibling.readability.contentScore + contentBonus >= siblingScoreThreshold) {
            append = true;
          } else if (sibling.nodeName === "P") {
            var linkDensity = this._getLinkDensity(sibling);
            var nodeContent = this._getInnerText(sibling);
            var nodeLength = nodeContent.length;

            if (nodeLength > 80 && linkDensity < 0.25) {
              append = true;
            } else if (nodeLength < 80 && nodeLength > 0 && linkDensity === 0 && nodeContent.search(/\.( |$)/) !== -1) {
              append = true;
            }
          }
        }

        if (append) {
          this.log("Appending node:", sibling);

          if (this.ALTER_TO_DIV_EXCEPTIONS.indexOf(sibling.nodeName) === -1) {
            // We have a node that isn't a common block level element, like a form or td tag.
            // Turn it into a div so it doesn't get filtered out later by accident.
            this.log("Altering sibling:", sibling, "to div.");

            sibling = this._setNodeTag(sibling, "DIV");
          }

          articleContent.appendChild(sibling);
          // siblings is a reference to the children array, and
          // sibling is removed from the array when we call appendChild().
          // As a result, we must revisit this index since the nodes
          // have been shifted.
          s -= 1;
          sl -= 1;
        }
      }

      if (this._debug) this.log("Article content pre-prep: " + articleContent.innerHTML);
      // So we have all of the content that we need. Now we clean it up for presentation.
      this._prepArticle(articleContent);
      if (this._debug) this.log("Article content post-prep: " + articleContent.innerHTML);

      if (neededToCreateTopCandidate) {
        // We already created a fake div thing, and there wouldn't have been any siblings left
        // for the previous loop, so there's no point trying to create a new div, and then
        // move all the children over. Just assign IDs and class names here. No need to append
        // because that already happened anyway.
        topCandidate.id = "readability-page-1";
        topCandidate.className = "page";
      } else {
        var div = doc.createElement("DIV");
        div.id = "readability-page-1";
        div.className = "page";
        var children = articleContent.childNodes;
        while (children.length) {
          div.appendChild(children[0]);
        }
        articleContent.appendChild(div);
      }

      if (this._debug) this.log("Article content after paging: " + articleContent.innerHTML);

      var parseSuccessful = true;

      // Now that we've gone through the full algorithm, check to see if
      // we got any meaningful content. If we didn't, we may need to re-run
      // grabArticle with different flags set. This gives us a higher likelihood of
      // finding the content, and the sieve approach gives us a higher likelihood of
      // finding the -right- content.
      var textLength = this._getInnerText(articleContent, true).length;
      if (textLength < this._charThreshold) {
        parseSuccessful = false;
        page.innerHTML = pageCacheHtml;

        if (this._flagIsActive(this.FLAG_STRIP_UNLIKELYS)) {
          this._removeFlag(this.FLAG_STRIP_UNLIKELYS);
          this._attempts.push({ articleContent: articleContent, textLength: textLength });
        } else if (this._flagIsActive(this.FLAG_WEIGHT_CLASSES)) {
          this._removeFlag(this.FLAG_WEIGHT_CLASSES);
          this._attempts.push({ articleContent: articleContent, textLength: textLength });
        } else if (this._flagIsActive(this.FLAG_CLEAN_CONDITIONALLY)) {
          this._removeFlag(this.FLAG_CLEAN_CONDITIONALLY);
          this._attempts.push({ articleContent: articleContent, textLength: textLength });
        } else {
          this._attempts.push({ articleContent: articleContent, textLength: textLength });
          // No luck after removing flags, just return the longest text we found during the different loops
          this._attempts.sort(function (a, b) {
            return a.textLength < b.textLength;
          });

          // But first check if we actually have something
          if (!this._attempts[0].textLength) {
            return null;
          }

          articleContent = this._attempts[0].articleContent;
          parseSuccessful = true;
        }
      }

      if (parseSuccessful) {
        // Find out text direction from ancestors of final top candidate.
        var ancestors = [parentOfTopCandidate, topCandidate].concat(this._getNodeAncestors(parentOfTopCandidate));
        this._someNode(ancestors, function (ancestor) {
          if (!ancestor.tagName) return false;
          var articleDir = ancestor.getAttribute("dir");
          if (articleDir) {
            this._articleDir = articleDir;
            return true;
          }
          return false;
        });
        return articleContent;
      }
    }
  },

  /**
   * Check whether the input string could be a byline.
   * This verifies that the input is a string, and that the length
   * is less than 100 chars.
   *
   * @param possibleByline {string} - a string to check whether its a byline.
   * @return Boolean - whether the input string is a byline.
   */
  _isValidByline: function _isValidByline(byline) {
    if (typeof byline == "string" || byline instanceof String) {
      byline = byline.trim();
      return byline.length > 0 && byline.length < 100;
    }
    return false;
  },

  /**
   * Attempts to get excerpt and byline metadata for the article.
   *
   * @return Object with optional "excerpt" and "byline" properties
   */
  _getArticleMetadata: function _getArticleMetadata() {
    var metadata = {};
    var values = {};
    var metaElements = this._doc.getElementsByTagName("meta");

    // Match "description", or Twitter's "twitter:description" (Cards)
    // in name attribute.
    var namePattern = /^\s*((twitter)\s*:\s*)?(description|title)\s*$/gi;

    // Match Facebook's Open Graph title & description properties.
    var propertyPattern = /^\s*og\s*:\s*(description|title)\s*$/gi;

    // Find description tags.
    this._forEachNode(metaElements, function (element) {
      var elementName = element.getAttribute("name");
      var elementProperty = element.getAttribute("property");

      if ([elementName, elementProperty].indexOf("author") !== -1) {
        metadata.byline = element.getAttribute("content");
        return;
      }

      var name = null;
      if (namePattern.test(elementName)) {
        name = elementName;
      } else if (propertyPattern.test(elementProperty)) {
        name = elementProperty;
      }

      if (name) {
        var content = element.getAttribute("content");
        if (content) {
          // Convert to lowercase and remove any whitespace
          // so we can match below.
          name = name.toLowerCase().replace(/\s/g, "");
          values[name] = content.trim();
        }
      }
    });

    if ("description" in values) {
      metadata.excerpt = values["description"];
    } else if ("og:description" in values) {
      // Use facebook open graph description.
      metadata.excerpt = values["og:description"];
    } else if ("twitter:description" in values) {
      // Use twitter cards description.
      metadata.excerpt = values["twitter:description"];
    }

    metadata.title = this._getArticleTitle();
    if (!metadata.title) {
      if ("og:title" in values) {
        // Use facebook open graph title.
        metadata.title = values["og:title"];
      } else if ("twitter:title" in values) {
        // Use twitter cards title.
        metadata.title = values["twitter:title"];
      }
    }

    return metadata;
  },

  /**
   * Removes script tags from the document.
   *
   * @param Element
  **/
  _removeScripts: function _removeScripts(doc) {
    this._removeNodes(doc.getElementsByTagName("script"), function (scriptNode) {
      scriptNode.nodeValue = "";
      scriptNode.removeAttribute("src");
      return true;
    });
    this._removeNodes(doc.getElementsByTagName("noscript"));
  },

  /**
   * Check if this node has only whitespace and a single element with given tag
   * Returns false if the DIV node contains non-empty text nodes
   * or if it contains no element with given tag or more than 1 element.
   *
   * @param Element
   * @param string tag of child element
  **/
  _hasSingleTagInsideElement: function _hasSingleTagInsideElement(element, tag) {
    // There should be exactly 1 element child with given tag
    if (element.children.length != 1 || element.children[0].tagName !== tag) {
      return false;
    }

    // And there should be no text nodes with real content
    return !this._someNode(element.childNodes, function (node) {
      return node.nodeType === this.TEXT_NODE && this.REGEXPS.hasContent.test(node.textContent);
    });
  },

  _isElementWithoutContent: function _isElementWithoutContent(node) {
    return node.nodeType === this.ELEMENT_NODE && node.textContent.trim().length == 0 && (node.children.length == 0 || node.children.length == node.getElementsByTagName("br").length + node.getElementsByTagName("hr").length);
  },

  /**
   * Determine whether element has any children block level elements.
   *
   * @param Element
   */
  _hasChildBlockElement: function _hasChildBlockElement(element) {
    return this._someNode(element.childNodes, function (node) {
      return this.DIV_TO_P_ELEMS.indexOf(node.tagName) !== -1 || this._hasChildBlockElement(node);
    });
  },

  /***
   * Determine if a node qualifies as phrasing content.
   * https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#Phrasing_content
  **/
  _isPhrasingContent: function _isPhrasingContent(node) {
    return node.nodeType === this.TEXT_NODE || this.PHRASING_ELEMS.indexOf(node.tagName) !== -1 || (node.tagName === "A" || node.tagName === "DEL" || node.tagName === "INS") && this._everyNode(node.childNodes, this._isPhrasingContent);
  },

  _isWhitespace: function _isWhitespace(node) {
    return node.nodeType === this.TEXT_NODE && node.textContent.trim().length === 0 || node.nodeType === this.ELEMENT_NODE && node.tagName === "BR";
  },

  /**
   * Get the inner text of a node - cross browser compatibly.
   * This also strips out any excess whitespace to be found.
   *
   * @param Element
   * @param Boolean normalizeSpaces (default: true)
   * @return string
  **/
  _getInnerText: function _getInnerText(e, normalizeSpaces) {
    normalizeSpaces = typeof normalizeSpaces === "undefined" ? true : normalizeSpaces;
    var textContent = e.textContent.trim();

    if (normalizeSpaces) {
      return textContent.replace(this.REGEXPS.normalize, " ");
    }
    return textContent;
  },

  /**
   * Get the number of times a string s appears in the node e.
   *
   * @param Element
   * @param string - what to split on. Default is ","
   * @return number (integer)
  **/
  _getCharCount: function _getCharCount(e, s) {
    s = s || ",";
    return this._getInnerText(e).split(s).length - 1;
  },

  /**
   * Remove the style attribute on every e and under.
   * TODO: Test if getElementsByTagName(*) is faster.
   *
   * @param Element
   * @return void
  **/
  _cleanStyles: function _cleanStyles(e) {
    if (!e || e.tagName.toLowerCase() === "svg") return;

    // Remove `style` and deprecated presentational attributes
    for (var i = 0; i < this.PRESENTATIONAL_ATTRIBUTES.length; i++) {
      e.removeAttribute(this.PRESENTATIONAL_ATTRIBUTES[i]);
    }

    if (this.DEPRECATED_SIZE_ATTRIBUTE_ELEMS.indexOf(e.tagName) !== -1) {
      e.removeAttribute("width");
      e.removeAttribute("height");
    }

    var cur = e.firstElementChild;
    while (cur !== null) {
      this._cleanStyles(cur);
      cur = cur.nextElementSibling;
    }
  },

  /**
   * Get the density of links as a percentage of the content
   * This is the amount of text that is inside a link divided by the total text in the node.
   *
   * @param Element
   * @return number (float)
  **/
  _getLinkDensity: function _getLinkDensity(element) {
    var textLength = this._getInnerText(element).length;
    if (textLength === 0) return 0;

    var linkLength = 0;

    // XXX implement _reduceNodeList?
    this._forEachNode(element.getElementsByTagName("a"), function (linkNode) {
      linkLength += this._getInnerText(linkNode).length;
    });

    return linkLength / textLength;
  },

  /**
   * Get an elements class/id weight. Uses regular expressions to tell if this
   * element looks good or bad.
   *
   * @param Element
   * @return number (Integer)
  **/
  _getClassWeight: function _getClassWeight(e) {
    if (!this._flagIsActive(this.FLAG_WEIGHT_CLASSES)) return 0;

    var weight = 0;

    // Look for a special classname
    if (typeof e.className === "string" && e.className !== "") {
      if (this.REGEXPS.negative.test(e.className)) weight -= 25;

      if (this.REGEXPS.positive.test(e.className)) weight += 25;
    }

    // Look for a special ID
    if (typeof e.id === "string" && e.id !== "") {
      if (this.REGEXPS.negative.test(e.id)) weight -= 25;

      if (this.REGEXPS.positive.test(e.id)) weight += 25;
    }

    return weight;
  },

  /**
   * Clean a node of all elements of type "tag".
   * (Unless it's a youtube/vimeo video. People love movies.)
   *
   * @param Element
   * @param string tag to clean
   * @return void
   **/
  _clean: function _clean(e, tag) {
    var isEmbed = ["object", "embed", "iframe"].indexOf(tag) !== -1;

    this._removeNodes(e.getElementsByTagName(tag), function (element) {
      // Allow youtube and vimeo videos through as people usually want to see those.
      if (isEmbed) {
        var attributeValues = [].map.call(element.attributes, function (attr) {
          return attr.value;
        }).join("|");

        // First, check the elements attributes to see if any of them contain youtube or vimeo
        if (this.REGEXPS.videos.test(attributeValues)) return false;

        // Then check the elements inside this element for the same.
        if (this.REGEXPS.videos.test(element.innerHTML)) return false;
      }

      return true;
    });
  },

  /**
   * Check if a given node has one of its ancestor tag name matching the
   * provided one.
   * @param  HTMLElement node
   * @param  String      tagName
   * @param  Number      maxDepth
   * @param  Function    filterFn a filter to invoke to determine whether this node 'counts'
   * @return Boolean
   */
  _hasAncestorTag: function _hasAncestorTag(node, tagName, maxDepth, filterFn) {
    maxDepth = maxDepth || 3;
    tagName = tagName.toUpperCase();
    var depth = 0;
    while (node.parentNode) {
      if (maxDepth > 0 && depth > maxDepth) return false;
      if (node.parentNode.tagName === tagName && (!filterFn || filterFn(node.parentNode))) return true;
      node = node.parentNode;
      depth++;
    }
    return false;
  },

  /**
   * Return an object indicating how many rows and columns this table has.
   */
  _getRowAndColumnCount: function _getRowAndColumnCount(table) {
    var rows = 0;
    var columns = 0;
    var trs = table.getElementsByTagName("tr");
    for (var i = 0; i < trs.length; i++) {
      var rowspan = trs[i].getAttribute("rowspan") || 0;
      if (rowspan) {
        rowspan = parseInt(rowspan, 10);
      }
      rows += rowspan || 1;

      // Now look for column-related info
      var columnsInThisRow = 0;
      var cells = trs[i].getElementsByTagName("td");
      for (var j = 0; j < cells.length; j++) {
        var colspan = cells[j].getAttribute("colspan") || 0;
        if (colspan) {
          colspan = parseInt(colspan, 10);
        }
        columnsInThisRow += colspan || 1;
      }
      columns = Math.max(columns, columnsInThisRow);
    }
    return { rows: rows, columns: columns };
  },

  /**
   * Look for 'data' (as opposed to 'layout') tables, for which we use
   * similar checks as
   * https://dxr.mozilla.org/mozilla-central/rev/71224049c0b52ab190564d3ea0eab089a159a4cf/accessible/html/HTMLTableAccessible.cpp#920
   */
  _markDataTables: function _markDataTables(root) {
    var tables = root.getElementsByTagName("table");
    for (var i = 0; i < tables.length; i++) {
      var table = tables[i];
      var role = table.getAttribute("role");
      if (role == "presentation") {
        table._readabilityDataTable = false;
        continue;
      }
      var datatable = table.getAttribute("datatable");
      if (datatable == "0") {
        table._readabilityDataTable = false;
        continue;
      }
      var summary = table.getAttribute("summary");
      if (summary) {
        table._readabilityDataTable = true;
        continue;
      }

      var caption = table.getElementsByTagName("caption")[0];
      if (caption && caption.childNodes.length > 0) {
        table._readabilityDataTable = true;
        continue;
      }

      // If the table has a descendant with any of these tags, consider a data table:
      var dataTableDescendants = ["col", "colgroup", "tfoot", "thead", "th"];
      var descendantExists = function descendantExists(tag) {
        return !!table.getElementsByTagName(tag)[0];
      };
      if (dataTableDescendants.some(descendantExists)) {
        this.log("Data table because found data-y descendant");
        table._readabilityDataTable = true;
        continue;
      }

      // Nested tables indicate a layout table:
      if (table.getElementsByTagName("table")[0]) {
        table._readabilityDataTable = false;
        continue;
      }

      var sizeInfo = this._getRowAndColumnCount(table);
      if (sizeInfo.rows >= 10 || sizeInfo.columns > 4) {
        table._readabilityDataTable = true;
        continue;
      }
      // Now just go by size entirely:
      table._readabilityDataTable = sizeInfo.rows * sizeInfo.columns > 10;
    }
  },

  /**
   * Clean an element of all tags of type "tag" if they look fishy.
   * "Fishy" is an algorithm based on content length, classnames, link density, number of images & embeds, etc.
   *
   * @return void
   **/
  _cleanConditionally: function _cleanConditionally(e, tag) {
    if (!this._flagIsActive(this.FLAG_CLEAN_CONDITIONALLY)) return;

    var isList = tag === "ul" || tag === "ol";

    // Gather counts for other typical elements embedded within.
    // Traverse backwards so we can remove nodes at the same time
    // without effecting the traversal.
    //
    // TODO: Consider taking into account original contentScore here.
    this._removeNodes(e.getElementsByTagName(tag), function (node) {
      // First check if we're in a data table, in which case don't remove us.
      var isDataTable = function isDataTable(t) {
        return t._readabilityDataTable;
      };

      if (this._hasAncestorTag(node, "table", -1, isDataTable)) {
        return false;
      }

      var weight = this._getClassWeight(node);
      var contentScore = 0;

      this.log("Cleaning Conditionally", node);

      if (weight + contentScore < 0) {
        return true;
      }

      if (this._getCharCount(node, ",") < 10) {
        // If there are not very many commas, and the number of
        // non-paragraph elements is more than paragraphs or other
        // ominous signs, remove the element.
        var p = node.getElementsByTagName("p").length;
        var img = node.getElementsByTagName("img").length;
        var li = node.getElementsByTagName("li").length - 100;
        var input = node.getElementsByTagName("input").length;

        var embedCount = 0;
        var embeds = node.getElementsByTagName("embed");
        for (var ei = 0, il = embeds.length; ei < il; ei += 1) {
          if (!this.REGEXPS.videos.test(embeds[ei].src)) embedCount += 1;
        }

        var linkDensity = this._getLinkDensity(node);
        var contentLength = this._getInnerText(node).length;

        var haveToRemove = img > 1 && p / img < 0.5 && !this._hasAncestorTag(node, "figure") || !isList && li > p || input > Math.floor(p / 3) || !isList && contentLength < 25 && (img === 0 || img > 2) && !this._hasAncestorTag(node, "figure") || !isList && weight < 25 && linkDensity > 0.2 || weight >= 25 && linkDensity > 0.5 || embedCount === 1 && contentLength < 75 || embedCount > 1;
        return haveToRemove;
      }
      return false;
    });
  },

  /**
   * Clean out elements whose id/class combinations match specific string.
   *
   * @param Element
   * @param RegExp match id/class combination.
   * @return void
   **/
  _cleanMatchedNodes: function _cleanMatchedNodes(e, regex) {
    var endOfSearchMarkerNode = this._getNextNode(e, true);
    var next = this._getNextNode(e);
    while (next && next != endOfSearchMarkerNode) {
      if (regex.test(next.className + " " + next.id)) {
        next = this._removeAndGetNext(next);
      } else {
        next = this._getNextNode(next);
      }
    }
  },

  /**
   * Clean out spurious headers from an Element. Checks things like classnames and link density.
   *
   * @param Element
   * @return void
  **/
  _cleanHeaders: function _cleanHeaders(e) {
    for (var headerIndex = 1; headerIndex < 3; headerIndex += 1) {
      this._removeNodes(e.getElementsByTagName("h" + headerIndex), function (header) {
        return this._getClassWeight(header) < 0;
      });
    }
  },

  _flagIsActive: function _flagIsActive(flag) {
    return (this._flags & flag) > 0;
  },

  _removeFlag: function _removeFlag(flag) {
    this._flags = this._flags & ~flag;
  },

  _isProbablyVisible: function _isProbablyVisible(node) {
    return node.style.display != "none" && !node.hasAttribute("hidden");
  },

  /**
   * Decides whether or not the document is reader-able without parsing the whole thing.
   *
   * @return boolean Whether or not we suspect parse() will suceeed at returning an article object.
   */
  isProbablyReaderable: function isProbablyReaderable(helperIsVisible) {
    var nodes = this._getAllNodesWithTag(this._doc, ["p", "pre"]);

    // Get <div> nodes which have <br> node(s) and append them into the `nodes` variable.
    // Some articles' DOM structures might look like
    // <div>
    //   Sentences<br>
    //   <br>
    //   Sentences<br>
    // </div>
    var brNodes = this._getAllNodesWithTag(this._doc, ["div > br"]);
    if (brNodes.length) {
      var set = new Set();
      [].forEach.call(brNodes, function (node) {
        set.add(node.parentNode);
      });
      nodes = [].concat.apply(Array.from(set), nodes);
    }

    if (!helperIsVisible) {
      helperIsVisible = this._isProbablyVisible;
    }

    var score = 0;
    // This is a little cheeky, we use the accumulator 'score' to decide what to return from
    // this callback:
    return this._someNode(nodes, function (node) {
      if (helperIsVisible && !helperIsVisible(node)) return false;
      var matchString = node.className + " " + node.id;

      if (this.REGEXPS.unlikelyCandidates.test(matchString) && !this.REGEXPS.okMaybeItsACandidate.test(matchString)) {
        return false;
      }

      if (node.matches && node.matches("li p")) {
        return false;
      }

      var textContentLength = node.textContent.trim().length;
      if (textContentLength < 140) {
        return false;
      }

      score += Math.sqrt(textContentLength - 140);

      if (score > 20) {
        return true;
      }
      return false;
    });
  },

  /**
   * Runs readability.
   *
   * Workflow:
   *  1. Prep the document by removing script tags, css, etc.
   *  2. Build readability's DOM tree.
   *  3. Grab the article content from the current dom tree.
   *  4. Replace the current DOM tree with the new one.
   *  5. Read peacefully.
   *
   * @return void
   **/
  parse: function parse() {
    // Avoid parsing too large documents, as per configuration option
    if (this._maxElemsToParse > 0) {
      var numTags = this._doc.getElementsByTagName("*").length;
      if (numTags > this._maxElemsToParse) {
        throw new Error("Aborting parsing document; " + numTags + " elements found");
      }
    }

    // Remove script tags from the document.
    this._removeScripts(this._doc);

    this._prepDocument();

    var metadata = this._getArticleMetadata();
    this._articleTitle = metadata.title;

    var articleContent = this._grabArticle();
    if (!articleContent) return null;

    this.log("Grabbed: " + articleContent.innerHTML);

    this._postProcessContent(articleContent);

    // If we haven't found an excerpt in the article's metadata, use the article's
    // first paragraph as the excerpt. This is used for displaying a preview of
    // the article's content.
    if (!metadata.excerpt) {
      var paragraphs = articleContent.getElementsByTagName("p");
      if (paragraphs.length > 0) {
        metadata.excerpt = paragraphs[0].textContent.trim();
      }
    }

    var textContent = articleContent.textContent;
    return {
      title: this._articleTitle,
      byline: metadata.byline || this._articleByline,
      dir: this._articleDir,
      content: articleContent.innerHTML,
      textContent: textContent,
      length: textContent.length,
      excerpt: metadata.excerpt
    };
  }
};

if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === "object") {
  module.exports = Readability;
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXZTcmMvY29udGVudFNjcmlwdC5qcyIsImRldlNyYy9saWIvUmVhZGFiaWxpdHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O0FDQUE7Ozs7Ozs7O0lBQ00sUztBQUNGLHlCQUFjO0FBQUE7O0FBQ1YsYUFBSyxHQUFMLEdBQVcsSUFBWDtBQUNBLGFBQUssTUFBTCxHQUFjLEtBQWQ7QUFDQSxhQUFLLE9BQUwsR0FBZSxFQUFmO0FBQ0EsYUFBSyxTQUFMO0FBQ0g7Ozs7c0NBRWE7QUFDVixnQkFBRyxLQUFLLE1BQVIsRUFBZ0I7QUFDaEIsZ0JBQUcsQ0FBQyxLQUFLLEdBQVQsRUFBYztBQUNWLG9CQUFJLFVBQVUsSUFBSSxxQkFBSixDQUFnQixTQUFTLFNBQVQsQ0FBbUIsSUFBbkIsQ0FBaEIsRUFBMEMsS0FBMUMsRUFBZDtBQUNBLG9CQUFJLE1BQU0sZ0JBQVY7QUFDQSxvQkFBSSxVQUFVLFFBQVEsT0FBUixDQUFnQixPQUFoQixDQUF3QixHQUF4QixFQUE2QixLQUE3QixDQUFkO0FBQ0EscUJBQUssR0FBTCxpS0FFd0MsUUFBUSxLQUZoRCxvRUFHMkMsT0FIM0M7QUFNSDtBQUNELGdCQUFJLE1BQU0sU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQVY7QUFDQSxnQkFBSSxFQUFKLEdBQVMsV0FBVDtBQUNBLGdCQUFJLFlBQUosQ0FBaUIsT0FBakIsRUFBMEIsZ0JBQTFCO0FBQ0EsZ0JBQUksU0FBSixHQUFnQixLQUFLLEdBQXJCO0FBQ0EscUJBQVMsSUFBVCxDQUFjLFdBQWQsQ0FBMEIsR0FBMUI7QUFDQSxxQkFBUyxJQUFULENBQWMsS0FBZCxDQUFvQixRQUFwQixHQUErQixRQUEvQjtBQUNBLGdCQUFJLE9BQU8sSUFBSSxvQkFBSixDQUF5QixLQUF6QixDQUFYO0FBQ0EsZ0JBQUksWUFBWSxTQUFTLGNBQVQsQ0FBd0IscUJBQXhCLEVBQStDLFdBQS9EO0FBQ0Es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UCxHQUFpQixXQUFqQjtBQUNEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IFJlYWRhYmlsaXR5IGZyb20gJy4vbGliL1JlYWRhYmlsaXR5JztcbmNsYXNzIENsZWFyUmVhZCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMudHBsID0gbnVsbDtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5ob3RrZXlzID0gW107XG4gICAgICAgIHRoaXMuYWRkRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgYWRkUmVhZFBhZ2UoKSB7XG4gICAgICAgIGlmKHRoaXMuYWN0aXZlKSByZXR1cm47XG4gICAgICAgIGlmKCF0aGlzLnRwbCkge1xuICAgICAgICAgICAgbGV0IGFydGljbGUgPSBuZXcgUmVhZGFiaWxpdHkoZG9jdW1lbnQuY2xvbmVOb2RlKHRydWUpKS5wYXJzZSgpO1xuICAgICAgICAgICAgbGV0IHJlZyA9IC9kYXRhLShcXHcqKXNyYy9nO1xuICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSBhcnRpY2xlLmNvbnRlbnQucmVwbGFjZShyZWcsICdzcmMnKTtcbiAgICAgICAgICAgIHRoaXMudHBsID0gYDxkaXYgY2xhc3M9XCJjZW50ZXItYXJlYVwiIGlkPVwiY2xlYXJSZWFkQ2VudGVyQXJlYVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhcnRpY2xlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMSBjbGFzcz1cInRpdGxlXCI+JHthcnRpY2xlLnRpdGxlfTwvaDE+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+JHtjb250ZW50fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+YDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRpdi5pZCA9ICdjbGVhclJlYWQnO1xuICAgICAgICBkaXYuc2V0QXR0cmlidXRlKCdjbGFzcycsICdjbGVhcnJlYWQtbW9kZScpO1xuICAgICAgICBkaXYuaW5uZXJIVE1MID0gdGhpcy50cGw7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgICAgICBsZXQgaW1ncyA9IGRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJyk7XG4gICAgICAgIGxldCBhcmVhV2lkdGggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xlYXJSZWFkQ2VudGVyQXJlYScpLmNsaWVudFdpZHRoO1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgaW1ncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbGV0IHdpZHRoID0gaW1nc1tpXS5uYXR1cmFsV2lkdGg7XG4gICAgICAgICAgICBpZih3aWR0aCkge1xuICAgICAgICAgICAgICAgIGxldCBjZW50ZXJBcmVhV2lkdGggPSBhcmVhV2lkdGg7XG4gICAgICAgICAgICAgICAgaWYod2lkdGggPCAoY2VudGVyQXJlYVdpZHRoIC0gMTQwKSkge1xuICAgICAgICAgICAgICAgICAgICBpbWdzW2ldLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaW1nLWMnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGltZ3NbaV0ub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGxldCB3aWR0aCA9IHRoaXMubmF0dXJhbFdpZHRoO1xuICAgICAgICAgICAgICAgIGxldCBjZW50ZXJBcmVhV2lkdGggPSBhcmVhV2lkdGg7XG4gICAgICAgICAgICAgICAgaWYod2lkdGggPCAoY2VudGVyQXJlYVdpZHRoIC0gMTQwKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaW1nLWMnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgZGl2LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY2xlYXJyZWFkLW1vZGUgY2xlYXJyZWFkLW1vZGUtc2hvdycpO1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsZWFyUmVhZENlbnRlckFyZWEnKS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2NlbnRlci1hcmVhIGNlbnRlci1hcmVhLXNob3cnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlUmVhZFBhZ2UoKSB7XG4gICAgICAgIGlmKCF0aGlzLmFjdGl2ZSkgcmV0dXJuO1xuICAgICAgICBsZXQgY2xlYXJSZWFkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsZWFyUmVhZCcpO1xuICAgICAgICBsZXQgY2xlYXJSZWFkQ2VudGVyQXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbGVhclJlYWRDZW50ZXJBcmVhJyk7XG4gICAgICAgIGNsZWFyUmVhZENlbnRlckFyZWEuc2V0QXR0cmlidXRlKCdjbGFzcycsICdjZW50ZXItYXJlYScpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNsZWFyUmVhZC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2NsZWFycmVhZC1tb2RlJyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgICAgICAgICAgbGV0IHBhcmVudE5vZGUgPSBjbGVhclJlYWQucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICBwYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNsZWFyUmVhZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIH0sIDI1MCk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgfVxuXG4gICAgYWRkRXZlbnRzKCkge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBpZihlLnRhcmdldC5pZCA9PT0gJ2NsZWFyUmVhZCcpIHtcbiAgICAgICAgICAgICAgICBsZXQgY2xhc3NOYW1lcyA9IGUudGFyZ2V0LmNsYXNzTmFtZTtcbiAgICAgICAgICAgICAgICBpZihjbGFzc05hbWVzLmluZGV4T2YoJ2NsZWFycmVhZC1tb2RlLXNob3cnKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlUmVhZFBhZ2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICAgICAgICAgIGxldCBjb2RlID0gZS5rZXlDb2RlO1xuICAgICAgICAgICAgaWYodGhpcy5ob3RrZXlzLmluZGV4T2YoY29kZSkgPT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhvdGtleXMucHVzaChjb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGUpID0+IHtcbiAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoZGF0YS5oYXNPd25Qcm9wZXJ0eSgnc3RhdGUnKSAmJiBkYXRhLnN0YXRlID09ICdjbG9zZScpIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZihkYXRhLmhhc093blByb3BlcnR5KCdvcGVuJykpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG9wZW5rZXlzID0gZGF0YS5vcGVuO1xuICAgICAgICAgICAgICAgICAgICBpZihKU09OLnN0cmluZ2lmeSh0aGlzLmhvdGtleXMpID09IEpTT04uc3RyaW5naWZ5KG9wZW5rZXlzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRSZWFkUGFnZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZS5zaGlmdEtleSAmJiBlLmtleUNvZGUgPT0gMTMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkUmVhZFBhZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihkYXRhLmhhc093blByb3BlcnR5KCdjbG9zZScpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjbG9zZWtleXMgPSBkYXRhLmNsb3NlO1xuICAgICAgICAgICAgICAgICAgICBpZihKU09OLnN0cmluZ2lmeSh0aGlzLmhvdGtleXMpID09IEpTT04uc3RyaW5naWZ5KGNsb3Nla2V5cykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlUmVhZFBhZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoZS5rZXlDb2RlID09IDI3KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVJlYWRQYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5ob3RrZXlzID0gW107XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuY29uc3QgY2xlYXJSZWFkID0gbmV3IENsZWFyUmVhZCgpOyIsIi8qZXNsaW50LWVudiBlczY6ZmFsc2UqL1xuLypcbiAqIENvcHlyaWdodCAoYykgMjAxMCBBcmM5MCBJbmNcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gKlxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuICpcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4gKi9cblxuLypcbiAqIFRoaXMgY29kZSBpcyBoZWF2aWx5IGJhc2VkIG9uIEFyYzkwJ3MgcmVhZGFiaWxpdHkuanMgKDEuNy4xKSBzY3JpcHRcbiAqIGF2YWlsYWJsZSBhdDogaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2FyYzkwbGFicy1yZWFkYWJpbGl0eVxuICovXG5cbi8qKlxuICogUHVibGljIGNvbnN0cnVjdG9yLlxuICogQHBhcmFtIHtIVE1MRG9jdW1lbnR9IGRvYyAgICAgVGhlIGRvY3VtZW50IHRvIHBhcnNlLlxuICogQHBhcmFtIHtPYmplY3R9ICAgICAgIG9wdGlvbnMgVGhlIG9wdGlvbnMgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBSZWFkYWJpbGl0eShkb2MsIG9wdGlvbnMpIHtcbiAgLy8gSW4gc29tZSBvbGRlciB2ZXJzaW9ucywgcGVvcGxlIHBhc3NlZCBhIFVSSSBhcyB0aGUgZmlyc3QgYXJndW1lbnQuIENvcGU6XG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnMuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgZG9jID0gb3B0aW9ucztcbiAgICBvcHRpb25zID0gYXJndW1lbnRzWzJdO1xuICB9IGVsc2UgaWYgKCFkb2MgfHwgIWRvYy5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJGaXJzdCBhcmd1bWVudCB0byBSZWFkYWJpbGl0eSBjb25zdHJ1Y3RvciBzaG91bGQgYmUgYSBkb2N1bWVudCBvYmplY3QuXCIpO1xuICB9XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHRoaXMuX2RvYyA9IGRvYztcbiAgdGhpcy5fYXJ0aWNsZVRpdGxlID0gbnVsbDtcbiAgdGhpcy5fYXJ0aWNsZUJ5bGluZSA9IG51bGw7XG4gIHRoaXMuX2FydGljbGVEaXIgPSBudWxsO1xuICB0aGlzLl9hdHRlbXB0cyA9IFtdO1xuXG4gIC8vIENvbmZpZ3VyYWJsZSBvcHRpb25zXG4gIHRoaXMuX2RlYnVnID0gISFvcHRpb25zLmRlYnVnO1xuICB0aGlzLl9tYXhFbGVtc1RvUGFyc2UgPSBvcHRpb25zLm1heEVsZW1zVG9QYXJzZSB8fCB0aGlzLkRFRkFVTFRfTUFYX0VMRU1TX1RPX1BBUlNFO1xuICB0aGlzLl9uYlRvcENhbmRpZGF0ZXMgPSBvcHRpb25zLm5iVG9wQ2FuZGlkYXRlcyB8fCB0aGlzLkRFRkFVTFRfTl9UT1BfQ0FORElEQVRFUztcbiAgdGhpcy5fY2hhclRocmVzaG9sZCA9IG9wdGlvbnMuY2hhclRocmVzaG9sZCB8fCB0aGlzLkRFRkFVTFRfQ0hBUl9USFJFU0hPTEQ7XG4gIHRoaXMuX2NsYXNzZXNUb1ByZXNlcnZlID0gdGhpcy5DTEFTU0VTX1RPX1BSRVNFUlZFLmNvbmNhdChvcHRpb25zLmNsYXNzZXNUb1ByZXNlcnZlIHx8IFtdKTtcblxuICAvLyBTdGFydCB3aXRoIGFsbCBmbGFncyBzZXRcbiAgdGhpcy5fZmxhZ3MgPSB0aGlzLkZMQUdfU1RSSVBfVU5MSUtFTFlTIHxcbiAgICAgICAgICAgICAgICB0aGlzLkZMQUdfV0VJR0hUX0NMQVNTRVMgfFxuICAgICAgICAgICAgICAgIHRoaXMuRkxBR19DTEVBTl9DT05ESVRJT05BTExZO1xuXG4gIHZhciBsb2dFbDtcblxuICAvLyBDb250cm9sIHdoZXRoZXIgbG9nIG1lc3NhZ2VzIGFyZSBzZW50IHRvIHRoZSBjb25zb2xlXG4gIGlmICh0aGlzLl9kZWJ1Zykge1xuICAgIGxvZ0VsID0gZnVuY3Rpb24oZSkge1xuICAgICAgdmFyIHJ2ID0gZS5ub2RlTmFtZSArIFwiIFwiO1xuICAgICAgaWYgKGUubm9kZVR5cGUgPT0gZS5URVhUX05PREUpIHtcbiAgICAgICAgcmV0dXJuIHJ2ICsgJyhcIicgKyBlLnRleHRDb250ZW50ICsgJ1wiKSc7XG4gICAgICB9XG4gICAgICB2YXIgY2xhc3NEZXNjID0gZS5jbGFzc05hbWUgJiYgKFwiLlwiICsgZS5jbGFzc05hbWUucmVwbGFjZSgvIC9nLCBcIi5cIikpO1xuICAgICAgdmFyIGVsRGVzYyA9IFwiXCI7XG4gICAgICBpZiAoZS5pZClcbiAgICAgICAgZWxEZXNjID0gXCIoI1wiICsgZS5pZCArIGNsYXNzRGVzYyArIFwiKVwiO1xuICAgICAgZWxzZSBpZiAoY2xhc3NEZXNjKVxuICAgICAgICBlbERlc2MgPSBcIihcIiArIGNsYXNzRGVzYyArIFwiKVwiO1xuICAgICAgcmV0dXJuIHJ2ICsgZWxEZXNjO1xuICAgIH07XG4gICAgdGhpcy5sb2cgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodHlwZW9mIGR1bXAgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgdmFyIG1zZyA9IEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbChhcmd1bWVudHMsIGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICByZXR1cm4gKHggJiYgeC5ub2RlTmFtZSkgPyBsb2dFbCh4KSA6IHg7XG4gICAgICAgIH0pLmpvaW4oXCIgXCIpO1xuICAgICAgICBkdW1wKFwiUmVhZGVyOiAoUmVhZGFiaWxpdHkpIFwiICsgbXNnICsgXCJcXG5cIik7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHZhciBhcmdzID0gW1wiUmVhZGVyOiAoUmVhZGFiaWxpdHkpIFwiXS5jb25jYXQoYXJndW1lbnRzKTtcbiAgICAgICAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgYXJncyk7XG4gICAgICB9XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLmxvZyA9IGZ1bmN0aW9uICgpIHt9O1xuICB9XG59XG5cblJlYWRhYmlsaXR5LnByb3RvdHlwZSA9IHtcbiAgRkxBR19TVFJJUF9VTkxJS0VMWVM6IDB4MSxcbiAgRkxBR19XRUlHSFRfQ0xBU1NFUzogMHgyLFxuICBGTEFHX0NMRUFOX0NPTkRJVElPTkFMTFk6IDB4NCxcblxuICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvTm9kZS9ub2RlVHlwZVxuICBFTEVNRU5UX05PREU6IDEsXG4gIFRFWFRfTk9ERTogMyxcblxuICAvLyBNYXggbnVtYmVyIG9mIG5vZGVzIHN1cHBvcnRlZCBieSB0aGlzIHBhcnNlci4gRGVmYXVsdDogMCAobm8gbGltaXQpXG4gIERFRkFVTFRfTUFYX0VMRU1TX1RPX1BBUlNFOiAwLFxuXG4gIC8vIFRoZSBudW1iZXIgb2YgdG9wIGNhbmRpZGF0ZXMgdG8gY29uc2lkZXIgd2hlbiBhbmFseXNpbmcgaG93XG4gIC8vIHRpZ2h0IHRoZSBjb21wZXRpdGlvbiBpcyBhbW9uZyBjYW5kaWRhdGVzLlxuICBERUZBVUxUX05fVE9QX0NBTkRJREFURVM6IDUsXG5cbiAgLy8gRWxlbWVudCB0YWdzIHRvIHNjb3JlIGJ5IGRlZmF1bHQuXG4gIERFRkFVTFRfVEFHU19UT19TQ09SRTogXCJzZWN0aW9uLGgyLGgzLGg0LGg1LGg2LHAsdGQscHJlXCIudG9VcHBlckNhc2UoKS5zcGxpdChcIixcIiksXG5cbiAgLy8gVGhlIGRlZmF1bHQgbnVtYmVyIG9mIGNoYXJzIGFuIGFydGljbGUgbXVzdCBoYXZlIGluIG9yZGVyIHRvIHJldHVybiBhIHJlc3VsdFxuICBERUZBVUxUX0NIQVJfVEhSRVNIT0xEOiA1MDAsXG5cbiAgLy8gQWxsIG9mIHRoZSByZWd1bGFyIGV4cHJlc3Npb25zIGluIHVzZSB3aXRoaW4gcmVhZGFiaWxpdHkuXG4gIC8vIERlZmluZWQgdXAgaGVyZSBzbyB3ZSBkb24ndCBpbnN0YW50aWF0ZSB0aGVtIHJlcGVhdGVkbHkgaW4gbG9vcHMuXG4gIFJFR0VYUFM6IHtcbiAgICB1bmxpa2VseUNhbmRpZGF0ZXM6IC8tYWQtfGJhbm5lcnxicmVhZGNydW1ic3xjb21ieHxjb21tZW50fGNvbW11bml0eXxjb3Zlci13cmFwfGRpc3F1c3xleHRyYXxmb290fGhlYWRlcnxsZWdlbmRzfG1lbnV8cmVsYXRlZHxyZW1hcmt8cmVwbGllc3xyc3N8c2hvdXRib3h8c2lkZWJhcnxza3lzY3JhcGVyfHNvY2lhbHxzcG9uc29yfHN1cHBsZW1lbnRhbHxhZC1icmVha3xhZ2VnYXRlfHBhZ2luYXRpb258cGFnZXJ8cG9wdXB8eW9tLXJlbW90ZS9pLFxuICAgIG9rTWF5YmVJdHNBQ2FuZGlkYXRlOiAvYW5kfGFydGljbGV8Ym9keXxjb2x1bW58bWFpbnxzaGFkb3cvaSxcbiAgICBwb3NpdGl2ZTogL2FydGljbGV8Ym9keXxjb250ZW50fGVudHJ5fGhlbnRyeXxoLWVudHJ5fG1haW58cGFnZXxwYWdpbmF0aW9ufHBvc3R8dGV4dHxibG9nfHN0b3J5L2ksXG4gICAgbmVnYXRpdmU6IC9oaWRkZW58XmhpZCR8IGhpZCR8IGhpZCB8XmhpZCB8YmFubmVyfGNvbWJ4fGNvbW1lbnR8Y29tLXxjb250YWN0fGZvb3R8Zm9vdGVyfGZvb3Rub3RlfG1hc3RoZWFkfG1lZGlhfG1ldGF8b3V0YnJhaW58cHJvbW98cmVsYXRlZHxzY3JvbGx8c2hhcmV8c2hvdXRib3h8c2lkZWJhcnxza3lzY3JhcGVyfHNwb25zb3J8c2hvcHBpbmd8dGFnc3x0b29sfHdpZGdldC9pLFxuICAgIGV4dHJhbmVvdXM6IC9wcmludHxhcmNoaXZlfGNvbW1lbnR8ZGlzY3Vzc3xlW1xcLV0/bWFpbHxzaGFyZXxyZXBseXxhbGx8bG9naW58c2lnbnxzaW5nbGV8dXRpbGl0eS9pLFxuICAgIGJ5bGluZTogL2J5bGluZXxhdXRob3J8ZGF0ZWxpbmV8d3JpdHRlbmJ5fHAtYXV0aG9yL2ksXG4gICAgcmVwbGFjZUZvbnRzOiAvPChcXC8/KWZvbnRbXj5dKj4vZ2ksXG4gICAgbm9ybWFsaXplOiAvXFxzezIsfS9nLFxuICAgIHZpZGVvczogL1xcL1xcLyh3d3dcXC4pPyhkYWlseW1vdGlvbnx5b3V0dWJlfHlvdXR1YmUtbm9jb29raWV8cGxheWVyXFwudmltZW8pXFwuY29tL2ksXG4gICAgbmV4dExpbms6IC8obmV4dHx3ZWl0ZXJ8Y29udGludWV8PihbXlxcfF18JCl8wrsoW15cXHxdfCQpKS9pLFxuICAgIHByZXZMaW5rOiAvKHByZXZ8ZWFybHxvbGR8bmV3fDx8wqspL2ksXG4gICAgd2hpdGVzcGFjZTogL15cXHMqJC8sXG4gICAgaGFzQ29udGVudDogL1xcUyQvLFxuICB9LFxuXG4gIERJVl9UT19QX0VMRU1TOiBbIFwiQVwiLCBcIkJMT0NLUVVPVEVcIiwgXCJETFwiLCBcIkRJVlwiLCBcIklNR1wiLCBcIk9MXCIsIFwiUFwiLCBcIlBSRVwiLCBcIlRBQkxFXCIsIFwiVUxcIiwgXCJTRUxFQ1RcIiBdLFxuXG4gIEFMVEVSX1RPX0RJVl9FWENFUFRJT05TOiBbXCJESVZcIiwgXCJBUlRJQ0xFXCIsIFwiU0VDVElPTlwiLCBcIlBcIl0sXG5cbiAgUFJFU0VOVEFUSU9OQUxfQVRUUklCVVRFUzogWyBcImFsaWduXCIsIFwiYmFja2dyb3VuZFwiLCBcImJnY29sb3JcIiwgXCJib3JkZXJcIiwgXCJjZWxscGFkZGluZ1wiLCBcImNlbGxzcGFjaW5nXCIsIFwiZnJhbWVcIiwgXCJoc3BhY2VcIiwgXCJydWxlc1wiLCBcInN0eWxlXCIsIFwidmFsaWduXCIsIFwidnNwYWNlXCIgXSxcblxuICBERVBSRUNBVEVEX1NJWkVfQVRUUklCVVRFX0VMRU1TOiBbIFwiVEFCTEVcIiwgXCJUSFwiLCBcIlREXCIsIFwiSFJcIiwgXCJQUkVcIiBdLFxuXG4gIC8vIFRoZSBjb21tZW50ZWQgb3V0IGVsZW1lbnRzIHF1YWxpZnkgYXMgcGhyYXNpbmcgY29udGVudCBidXQgdGVuZCB0byBiZVxuICAvLyByZW1vdmVkIGJ5IHJlYWRhYmlsaXR5IHdoZW4gcHV0IGludG8gcGFyYWdyYXBocywgc28gd2UgaWdub3JlIHRoZW0gaGVyZS5cbiAgUEhSQVNJTkdfRUxFTVM6IFtcbiAgICAvLyBcIkNBTlZBU1wiLCBcIklGUkFNRVwiLCBcIlNWR1wiLCBcIlZJREVPXCIsXG4gICAgXCJBQkJSXCIsIFwiQVVESU9cIiwgXCJCXCIsIFwiQkRPXCIsIFwiQlJcIiwgXCJCVVRUT05cIiwgXCJDSVRFXCIsIFwiQ09ERVwiLCBcIkRBVEFcIixcbiAgICBcIkRBVEFMSVNUXCIsIFwiREZOXCIsIFwiRU1cIiwgXCJFTUJFRFwiLCBcIklcIiwgXCJJTUdcIiwgXCJJTlBVVFwiLCBcIktCRFwiLCBcIkxBQkVMXCIsXG4gICAgXCJNQVJLXCIsIFwiTUFUSFwiLCBcIk1FVEVSXCIsIFwiTk9TQ1JJUFRcIiwgXCJPQkpFQ1RcIiwgXCJPVVRQVVRcIiwgXCJQUk9HUkVTU1wiLCBcIlFcIixcbiAgICBcIlJVQllcIiwgXCJTQU1QXCIsIFwiU0NSSVBUXCIsIFwiU0VMRUNUXCIsIFwiU01BTExcIiwgXCJTUEFOXCIsIFwiU1RST05HXCIsIFwiU1VCXCIsXG4gICAgXCJTVVBcIiwgXCJURVhUQVJFQVwiLCBcIlRJTUVcIiwgXCJWQVJcIiwgXCJXQlJcIlxuICBdLFxuXG4gIC8vIFRoZXNlIGFyZSB0aGUgY2xhc3NlcyB0aGF0IHJlYWRhYmlsaXR5IHNldHMgaXRzZWxmLlxuICBDTEFTU0VTX1RPX1BSRVNFUlZFOiBbIFwicGFnZVwiIF0sXG5cbiAgLyoqXG4gICAqIFJ1biBhbnkgcG9zdC1wcm9jZXNzIG1vZGlmaWNhdGlvbnMgdG8gYXJ0aWNsZSBjb250ZW50IGFzIG5lY2Vzc2FyeS5cbiAgICpcbiAgICogQHBhcmFtIEVsZW1lbnRcbiAgICogQHJldHVybiB2b2lkXG4gICoqL1xuICBfcG9zdFByb2Nlc3NDb250ZW50OiBmdW5jdGlvbihhcnRpY2xlQ29udGVudCkge1xuICAgIC8vIFJlYWRhYmlsaXR5IGNhbm5vdCBvcGVuIHJlbGF0aXZlIHVyaXMgc28gd2UgY29udmVydCB0aGVtIHRvIGFic29sdXRlIHVyaXMuXG4gICAgdGhpcy5fZml4UmVsYXRpdmVVcmlzKGFydGljbGVDb250ZW50KTtcblxuICAgIC8vIFJlbW92ZSBjbGFzc2VzLlxuICAgIHRoaXMuX2NsZWFuQ2xhc3NlcyhhcnRpY2xlQ29udGVudCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEl0ZXJhdGVzIG92ZXIgYSBOb2RlTGlzdCwgY2FsbHMgYGZpbHRlckZuYCBmb3IgZWFjaCBub2RlIGFuZCByZW1vdmVzIG5vZGVcbiAgICogaWYgZnVuY3Rpb24gcmV0dXJuZWQgYHRydWVgLlxuICAgKlxuICAgKiBJZiBmdW5jdGlvbiBpcyBub3QgcGFzc2VkLCByZW1vdmVzIGFsbCB0aGUgbm9kZXMgaW4gbm9kZSBsaXN0LlxuICAgKlxuICAgKiBAcGFyYW0gTm9kZUxpc3Qgbm9kZUxpc3QgVGhlIG5vZGVzIHRvIG9wZXJhdGUgb25cbiAgICogQHBhcmFtIEZ1bmN0aW9uIGZpbHRlckZuIHRoZSBmdW5jdGlvbiB0byB1c2UgYXMgYSBmaWx0ZXJcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBfcmVtb3ZlTm9kZXM6IGZ1bmN0aW9uKG5vZGVMaXN0LCBmaWx0ZXJGbikge1xuICAgIGZvciAodmFyIGkgPSBub2RlTGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIG5vZGUgPSBub2RlTGlzdFtpXTtcbiAgICAgIHZhciBwYXJlbnROb2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgaWYgKHBhcmVudE5vZGUpIHtcbiAgICAgICAgaWYgKCFmaWx0ZXJGbiB8fCBmaWx0ZXJGbi5jYWxsKHRoaXMsIG5vZGUsIGksIG5vZGVMaXN0KSkge1xuICAgICAgICAgIHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIEl0ZXJhdGVzIG92ZXIgYSBOb2RlTGlzdCwgYW5kIGNhbGxzIF9zZXROb2RlVGFnIGZvciBlYWNoIG5vZGUuXG4gICAqXG4gICAqIEBwYXJhbSBOb2RlTGlzdCBub2RlTGlzdCBUaGUgbm9kZXMgdG8gb3BlcmF0ZSBvblxuICAgKiBAcGFyYW0gU3RyaW5nIG5ld1RhZ05hbWUgdGhlIG5ldyB0YWcgbmFtZSB0byB1c2VcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBfcmVwbGFjZU5vZGVUYWdzOiBmdW5jdGlvbihub2RlTGlzdCwgbmV3VGFnTmFtZSkge1xuICAgIGZvciAodmFyIGkgPSBub2RlTGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIG5vZGUgPSBub2RlTGlzdFtpXTtcbiAgICAgIHRoaXMuX3NldE5vZGVUYWcobm9kZSwgbmV3VGFnTmFtZSk7XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBJdGVyYXRlIG92ZXIgYSBOb2RlTGlzdCwgd2hpY2ggZG9lc24ndCBuYXRpdmVseSBmdWxseSBpbXBsZW1lbnQgdGhlIEFycmF5XG4gICAqIGludGVyZmFjZS5cbiAgICpcbiAgICogRm9yIGNvbnZlbmllbmNlLCB0aGUgY3VycmVudCBvYmplY3QgY29udGV4dCBpcyBhcHBsaWVkIHRvIHRoZSBwcm92aWRlZFxuICAgKiBpdGVyYXRlIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gIE5vZGVMaXN0IG5vZGVMaXN0IFRoZSBOb2RlTGlzdC5cbiAgICogQHBhcmFtICBGdW5jdGlvbiBmbiAgICAgICBUaGUgaXRlcmF0ZSBmdW5jdGlvbi5cbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBfZm9yRWFjaE5vZGU6IGZ1bmN0aW9uKG5vZGVMaXN0LCBmbikge1xuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwobm9kZUxpc3QsIGZuLCB0aGlzKTtcbiAgfSxcblxuICAvKipcbiAgICogSXRlcmF0ZSBvdmVyIGEgTm9kZUxpc3QsIHJldHVybiB0cnVlIGlmIGFueSBvZiB0aGUgcHJvdmlkZWQgaXRlcmF0ZVxuICAgKiBmdW5jdGlvbiBjYWxscyByZXR1cm5zIHRydWUsIGZhbHNlIG90aGVyd2lzZS5cbiAgICpcbiAgICogRm9yIGNvbnZlbmllbmNlLCB0aGUgY3VycmVudCBvYmplY3QgY29udGV4dCBpcyBhcHBsaWVkIHRvIHRoZVxuICAgKiBwcm92aWRlZCBpdGVyYXRlIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gIE5vZGVMaXN0IG5vZGVMaXN0IFRoZSBOb2RlTGlzdC5cbiAgICogQHBhcmFtICBGdW5jdGlvbiBmbiAgICAgICBUaGUgaXRlcmF0ZSBmdW5jdGlvbi5cbiAgICogQHJldHVybiBCb29sZWFuXG4gICAqL1xuICBfc29tZU5vZGU6IGZ1bmN0aW9uKG5vZGVMaXN0LCBmbikge1xuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc29tZS5jYWxsKG5vZGVMaXN0LCBmbiwgdGhpcyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEl0ZXJhdGUgb3ZlciBhIE5vZGVMaXN0LCByZXR1cm4gdHJ1ZSBpZiBhbGwgb2YgdGhlIHByb3ZpZGVkIGl0ZXJhdGVcbiAgICogZnVuY3Rpb24gY2FsbHMgcmV0dXJuIHRydWUsIGZhbHNlIG90aGVyd2lzZS5cbiAgICpcbiAgICogRm9yIGNvbnZlbmllbmNlLCB0aGUgY3VycmVudCBvYmplY3QgY29udGV4dCBpcyBhcHBsaWVkIHRvIHRoZVxuICAgKiBwcm92aWRlZCBpdGVyYXRlIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0gIE5vZGVMaXN0IG5vZGVMaXN0IFRoZSBOb2RlTGlzdC5cbiAgICogQHBhcmFtICBGdW5jdGlvbiBmbiAgICAgICBUaGUgaXRlcmF0ZSBmdW5jdGlvbi5cbiAgICogQHJldHVybiBCb29sZWFuXG4gICAqL1xuICBfZXZlcnlOb2RlOiBmdW5jdGlvbihub2RlTGlzdCwgZm4pIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmV2ZXJ5LmNhbGwobm9kZUxpc3QsIGZuLCB0aGlzKTtcbiAgfSxcblxuICAvKipcbiAgICogQ29uY2F0IGFsbCBub2RlbGlzdHMgcGFzc2VkIGFzIGFyZ3VtZW50cy5cbiAgICpcbiAgICogQHJldHVybiAuLi5Ob2RlTGlzdFxuICAgKiBAcmV0dXJuIEFycmF5XG4gICAqL1xuICBfY29uY2F0Tm9kZUxpc3RzOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG4gICAgdmFyIGFyZ3MgPSBzbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgdmFyIG5vZGVMaXN0cyA9IGFyZ3MubWFwKGZ1bmN0aW9uKGxpc3QpIHtcbiAgICAgIHJldHVybiBzbGljZS5jYWxsKGxpc3QpO1xuICAgIH0pO1xuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuY29uY2F0LmFwcGx5KFtdLCBub2RlTGlzdHMpO1xuICB9LFxuXG4gIF9nZXRBbGxOb2Rlc1dpdGhUYWc6IGZ1bmN0aW9uKG5vZGUsIHRhZ05hbWVzKSB7XG4gICAgaWYgKG5vZGUucXVlcnlTZWxlY3RvckFsbCkge1xuICAgICAgcmV0dXJuIG5vZGUucXVlcnlTZWxlY3RvckFsbCh0YWdOYW1lcy5qb2luKFwiLFwiKSk7XG4gICAgfVxuICAgIHJldHVybiBbXS5jb25jYXQuYXBwbHkoW10sIHRhZ05hbWVzLm1hcChmdW5jdGlvbih0YWcpIHtcbiAgICAgIHZhciBjb2xsZWN0aW9uID0gbm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWcpO1xuICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoY29sbGVjdGlvbikgPyBjb2xsZWN0aW9uIDogQXJyYXkuZnJvbShjb2xsZWN0aW9uKTtcbiAgICB9KSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIGNsYXNzPVwiXCIgYXR0cmlidXRlIGZyb20gZXZlcnkgZWxlbWVudCBpbiB0aGUgZ2l2ZW5cbiAgICogc3VidHJlZSwgZXhjZXB0IHRob3NlIHRoYXQgbWF0Y2ggQ0xBU1NFU19UT19QUkVTRVJWRSBhbmRcbiAgICogdGhlIGNsYXNzZXNUb1ByZXNlcnZlIGFycmF5IGZyb20gdGhlIG9wdGlvbnMgb2JqZWN0LlxuICAgKlxuICAgKiBAcGFyYW0gRWxlbWVudFxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIF9jbGVhbkNsYXNzZXM6IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICB2YXIgY2xhc3Nlc1RvUHJlc2VydmUgPSB0aGlzLl9jbGFzc2VzVG9QcmVzZXJ2ZTtcbiAgICB2YXIgY2xhc3NOYW1lID0gKG5vZGUuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgfHwgXCJcIilcbiAgICAgIC5zcGxpdCgvXFxzKy8pXG4gICAgICAuZmlsdGVyKGZ1bmN0aW9uKGNscykge1xuICAgICAgICByZXR1cm4gY2xhc3Nlc1RvUHJlc2VydmUuaW5kZXhPZihjbHMpICE9IC0xO1xuICAgICAgfSlcbiAgICAgIC5qb2luKFwiIFwiKTtcblxuICAgIGlmIChjbGFzc05hbWUpIHtcbiAgICAgIG5vZGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgY2xhc3NOYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZS5yZW1vdmVBdHRyaWJ1dGUoXCJjbGFzc1wiKTtcbiAgICB9XG5cbiAgICBmb3IgKG5vZGUgPSBub2RlLmZpcnN0RWxlbWVudENoaWxkOyBub2RlOyBub2RlID0gbm9kZS5uZXh0RWxlbWVudFNpYmxpbmcpIHtcbiAgICAgIHRoaXMuX2NsZWFuQ2xhc3Nlcyhub2RlKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGVhY2ggPGE+IGFuZCA8aW1nPiB1cmkgaW4gdGhlIGdpdmVuIGVsZW1lbnQgdG8gYW4gYWJzb2x1dGUgVVJJLFxuICAgKiBpZ25vcmluZyAjcmVmIFVSSXMuXG4gICAqXG4gICAqIEBwYXJhbSBFbGVtZW50XG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgX2ZpeFJlbGF0aXZlVXJpczogZnVuY3Rpb24oYXJ0aWNsZUNvbnRlbnQpIHtcbiAgICB2YXIgYmFzZVVSSSA9IHRoaXMuX2RvYy5iYXNlVVJJO1xuICAgIHZhciBkb2N1bWVudFVSSSA9IHRoaXMuX2RvYy5kb2N1bWVudFVSSTtcbiAgICBmdW5jdGlvbiB0b0Fic29sdXRlVVJJKHVyaSkge1xuICAgICAgLy8gTGVhdmUgaGFzaCBsaW5rcyBhbG9uZSBpZiB0aGUgYmFzZSBVUkkgbWF0Y2hlcyB0aGUgZG9jdW1lbnQgVVJJOlxuICAgICAgaWYgKGJhc2VVUkkgPT0gZG9jdW1lbnRVUkkgJiYgdXJpLmNoYXJBdCgwKSA9PSBcIiNcIikge1xuICAgICAgICByZXR1cm4gdXJpO1xuICAgICAgfVxuICAgICAgLy8gT3RoZXJ3aXNlLCByZXNvbHZlIGFnYWluc3QgYmFzZSBVUkk6XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gbmV3IFVSTCh1cmksIGJhc2VVUkkpLmhyZWY7XG4gICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAvLyBTb21ldGhpbmcgd2VudCB3cm9uZywganVzdCByZXR1cm4gdGhlIG9yaWdpbmFsOlxuICAgICAgfVxuICAgICAgcmV0dXJuIHVyaTtcbiAgICB9XG5cbiAgICB2YXIgbGlua3MgPSBhcnRpY2xlQ29udGVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImFcIik7XG4gICAgdGhpcy5fZm9yRWFjaE5vZGUobGlua3MsIGZ1bmN0aW9uKGxpbmspIHtcbiAgICAgIHZhciBocmVmID0gbGluay5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpO1xuICAgICAgaWYgKGhyZWYpIHtcbiAgICAgICAgLy8gUmVwbGFjZSBsaW5rcyB3aXRoIGphdmFzY3JpcHQ6IFVSSXMgd2l0aCB0ZXh0IGNvbnRlbnQsIHNpbmNlXG4gICAgICAgIC8vIHRoZXkgd29uJ3Qgd29yayBhZnRlciBzY3JpcHRzIGhhdmUgYmVlbiByZW1vdmVkIGZyb20gdGhlIHBhZ2UuXG4gICAgICAgIGlmIChocmVmLmluZGV4T2YoXCJqYXZhc2NyaXB0OlwiKSA9PT0gMCkge1xuICAgICAgICAgIHZhciB0ZXh0ID0gdGhpcy5fZG9jLmNyZWF0ZVRleHROb2RlKGxpbmsudGV4dENvbnRlbnQpO1xuICAgICAgICAgIGxpbmsucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQodGV4dCwgbGluayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGluay5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIHRvQWJzb2x1dGVVUkkoaHJlZikpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgaW1ncyA9IGFydGljbGVDb250ZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaW1nXCIpO1xuICAgIHRoaXMuX2ZvckVhY2hOb2RlKGltZ3MsIGZ1bmN0aW9uKGltZykge1xuICAgICAgdmFyIHNyYyA9IGltZy5nZXRBdHRyaWJ1dGUoXCJzcmNcIik7XG4gICAgICBpZiAoc3JjKSB7XG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgdG9BYnNvbHV0ZVVSSShzcmMpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSxcblxuICAvKipcbiAgICogR2V0IHRoZSBhcnRpY2xlIHRpdGxlIGFzIGFuIEgxLlxuICAgKlxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICoqL1xuICBfZ2V0QXJ0aWNsZVRpdGxlOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZG9jID0gdGhpcy5fZG9jO1xuICAgIHZhciBjdXJUaXRsZSA9IFwiXCI7XG4gICAgdmFyIG9yaWdUaXRsZSA9IFwiXCI7XG5cbiAgICB0cnkge1xuICAgICAgY3VyVGl0bGUgPSBvcmlnVGl0bGUgPSBkb2MudGl0bGUudHJpbSgpO1xuXG4gICAgICAvLyBJZiB0aGV5IGhhZCBhbiBlbGVtZW50IHdpdGggaWQgXCJ0aXRsZVwiIGluIHRoZWlyIEhUTUxcbiAgICAgIGlmICh0eXBlb2YgY3VyVGl0bGUgIT09IFwic3RyaW5nXCIpXG4gICAgICAgIGN1clRpdGxlID0gb3JpZ1RpdGxlID0gdGhpcy5fZ2V0SW5uZXJUZXh0KGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRpdGxlXCIpWzBdKTtcbiAgICB9IGNhdGNoIChlKSB7LyogaWdub3JlIGV4Y2VwdGlvbnMgc2V0dGluZyB0aGUgdGl0bGUuICovfVxuXG4gICAgdmFyIHRpdGxlSGFkSGllcmFyY2hpY2FsU2VwYXJhdG9ycyA9IGZhbHNlO1xuICAgIGZ1bmN0aW9uIHdvcmRDb3VudChzdHIpIHtcbiAgICAgIHJldHVybiBzdHIuc3BsaXQoL1xccysvKS5sZW5ndGg7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUncyBhIHNlcGFyYXRvciBpbiB0aGUgdGl0bGUsIGZpcnN0IHJlbW92ZSB0aGUgZmluYWwgcGFydFxuICAgIGlmICgoLyBbXFx8XFwtXFxcXFxcLz7Cu10gLykudGVzdChjdXJUaXRsZSkpIHtcbiAgICAgIHRpdGxlSGFkSGllcmFyY2hpY2FsU2VwYXJhdG9ycyA9IC8gW1xcXFxcXC8+wrtdIC8udGVzdChjdXJUaXRsZSk7XG4gICAgICBjdXJUaXRsZSA9IG9yaWdUaXRsZS5yZXBsYWNlKC8oLiopW1xcfFxcLVxcXFxcXC8+wrtdIC4qL2dpLCBcIiQxXCIpO1xuXG4gICAgICAvLyBJZiB0aGUgcmVzdWx0aW5nIHRpdGxlIGlzIHRvbyBzaG9ydCAoMyB3b3JkcyBvciBmZXdlciksIHJlbW92ZVxuICAgICAgLy8gdGhlIGZpcnN0IHBhcnQgaW5zdGVhZDpcbiAgICAgIGlmICh3b3JkQ291bnQoY3VyVGl0bGUpIDwgMylcbiAgICAgICAgY3VyVGl0bGUgPSBvcmlnVGl0bGUucmVwbGFjZSgvW15cXHxcXC1cXFxcXFwvPsK7XSpbXFx8XFwtXFxcXFxcLz7Cu10oLiopL2dpLCBcIiQxXCIpO1xuICAgIH0gZWxzZSBpZiAoY3VyVGl0bGUuaW5kZXhPZihcIjogXCIpICE9PSAtMSkge1xuICAgICAgLy8gQ2hlY2sgaWYgd2UgaGF2ZSBhbiBoZWFkaW5nIGNvbnRhaW5pbmcgdGhpcyBleGFjdCBzdHJpbmcsIHNvIHdlXG4gICAgICAvLyBjb3VsZCBhc3N1bWUgaXQncyB0aGUgZnVsbCB0aXRsZS5cbiAgICAgIHZhciBoZWFkaW5ncyA9IHRoaXMuX2NvbmNhdE5vZGVMaXN0cyhcbiAgICAgICAgZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaDFcIiksXG4gICAgICAgIGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZShcImgyXCIpXG4gICAgICApO1xuICAgICAgdmFyIHRyaW1tZWRUaXRsZSA9IGN1clRpdGxlLnRyaW0oKTtcbiAgICAgIHZhciBtYXRjaCA9IHRoaXMuX3NvbWVOb2RlKGhlYWRpbmdzLCBmdW5jdGlvbihoZWFkaW5nKSB7XG4gICAgICAgIHJldHVybiBoZWFkaW5nLnRleHRDb250ZW50LnRyaW0oKSA9PT0gdHJpbW1lZFRpdGxlO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIElmIHdlIGRvbid0LCBsZXQncyBleHRyYWN0IHRoZSB0aXRsZSBvdXQgb2YgdGhlIG9yaWdpbmFsIHRpdGxlIHN0cmluZy5cbiAgICAgIGlmICghbWF0Y2gpIHtcbiAgICAgICAgY3VyVGl0bGUgPSBvcmlnVGl0bGUuc3Vic3RyaW5nKG9yaWdUaXRsZS5sYXN0SW5kZXhPZihcIjpcIikgKyAxKTtcblxuICAgICAgICAvLyBJZiB0aGUgdGl0bGUgaXMgbm93IHRvbyBzaG9ydCwgdHJ5IHRoZSBmaXJzdCBjb2xvbiBpbnN0ZWFkOlxuICAgICAgICBpZiAod29yZENvdW50KGN1clRpdGxlKSA8IDMpIHtcbiAgICAgICAgICBjdXJUaXRsZSA9IG9yaWdUaXRsZS5zdWJzdHJpbmcob3JpZ1RpdGxlLmluZGV4T2YoXCI6XCIpICsgMSk7XG4gICAgICAgICAgLy8gQnV0IGlmIHdlIGhhdmUgdG9vIG1hbnkgd29yZHMgYmVmb3JlIHRoZSBjb2xvbiB0aGVyZSdzIHNvbWV0aGluZyB3ZWlyZFxuICAgICAgICAgIC8vIHdpdGggdGhlIHRpdGxlcyBhbmQgdGhlIEggdGFncyBzbyBsZXQncyBqdXN0IHVzZSB0aGUgb3JpZ2luYWwgdGl0bGUgaW5zdGVhZFxuICAgICAgICB9IGVsc2UgaWYgKHdvcmRDb3VudChvcmlnVGl0bGUuc3Vic3RyKDAsIG9yaWdUaXRsZS5pbmRleE9mKFwiOlwiKSkpID4gNSkge1xuICAgICAgICAgIGN1clRpdGxlID0gb3JpZ1RpdGxlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjdXJUaXRsZS5sZW5ndGggPiAxNTAgfHwgY3VyVGl0bGUubGVuZ3RoIDwgMTUpIHtcbiAgICAgIHZhciBoT25lcyA9IGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZShcImgxXCIpO1xuXG4gICAgICBpZiAoaE9uZXMubGVuZ3RoID09PSAxKVxuICAgICAgICBjdXJUaXRsZSA9IHRoaXMuX2dldElubmVyVGV4dChoT25lc1swXSk7XG4gICAgfVxuXG4gICAgY3VyVGl0bGUgPSBjdXJUaXRsZS50cmltKCk7XG4gICAgLy8gSWYgd2Ugbm93IGhhdmUgNCB3b3JkcyBvciBmZXdlciBhcyBvdXIgdGl0bGUsIGFuZCBlaXRoZXIgbm9cbiAgICAvLyAnaGllcmFyY2hpY2FsJyBzZXBhcmF0b3JzIChcXCwgLywgPiBvciDCuykgd2VyZSBmb3VuZCBpbiB0aGUgb3JpZ2luYWxcbiAgICAvLyB0aXRsZSBvciB3ZSBkZWNyZWFzZWQgdGhlIG51bWJlciBvZiB3b3JkcyBieSBtb3JlIHRoYW4gMSB3b3JkLCB1c2VcbiAgICAvLyB0aGUgb3JpZ2luYWwgdGl0bGUuXG4gICAgdmFyIGN1clRpdGxlV29yZENvdW50ID0gd29yZENvdW50KGN1clRpdGxlKTtcbiAgICBpZiAoY3VyVGl0bGVXb3JkQ291bnQgPD0gNCAmJlxuICAgICAgICAoIXRpdGxlSGFkSGllcmFyY2hpY2FsU2VwYXJhdG9ycyB8fFxuICAgICAgICAgY3VyVGl0bGVXb3JkQ291bnQgIT0gd29yZENvdW50KG9yaWdUaXRsZS5yZXBsYWNlKC9bXFx8XFwtXFxcXFxcLz7Cu10rL2csIFwiXCIpKSAtIDEpKSB7XG4gICAgICBjdXJUaXRsZSA9IG9yaWdUaXRsZTtcbiAgICB9XG5cbiAgICByZXR1cm4gY3VyVGl0bGU7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFByZXBhcmUgdGhlIEhUTUwgZG9jdW1lbnQgZm9yIHJlYWRhYmlsaXR5IHRvIHNjcmFwZSBpdC5cbiAgICogVGhpcyBpbmNsdWRlcyB0aGluZ3MgbGlrZSBzdHJpcHBpbmcgamF2YXNjcmlwdCwgQ1NTLCBhbmQgaGFuZGxpbmcgdGVycmlibGUgbWFya3VwLlxuICAgKlxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICoqL1xuICBfcHJlcERvY3VtZW50OiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZG9jID0gdGhpcy5fZG9jO1xuXG4gICAgLy8gUmVtb3ZlIGFsbCBzdHlsZSB0YWdzIGluIGhlYWRcbiAgICB0aGlzLl9yZW1vdmVOb2Rlcyhkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzdHlsZVwiKSk7XG5cbiAgICBpZiAoZG9jLmJvZHkpIHtcbiAgICAgIHRoaXMuX3JlcGxhY2VCcnMoZG9jLmJvZHkpO1xuICAgIH1cblxuICAgIHRoaXMuX3JlcGxhY2VOb2RlVGFncyhkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJmb250XCIpLCBcIlNQQU5cIik7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEZpbmRzIHRoZSBuZXh0IGVsZW1lbnQsIHN0YXJ0aW5nIGZyb20gdGhlIGdpdmVuIG5vZGUsIGFuZCBpZ25vcmluZ1xuICAgKiB3aGl0ZXNwYWNlIGluIGJldHdlZW4uIElmIHRoZSBnaXZlbiBub2RlIGlzIGFuIGVsZW1lbnQsIHRoZSBzYW1lIG5vZGUgaXNcbiAgICogcmV0dXJuZWQuXG4gICAqL1xuICBfbmV4dEVsZW1lbnQ6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgdmFyIG5leHQgPSBub2RlO1xuICAgIHdoaWxlIChuZXh0XG4gICAgICAgICYmIChuZXh0Lm5vZGVUeXBlICE9IHRoaXMuRUxFTUVOVF9OT0RFKVxuICAgICAgICAmJiB0aGlzLlJFR0VYUFMud2hpdGVzcGFjZS50ZXN0KG5leHQudGV4dENvbnRlbnQpKSB7XG4gICAgICBuZXh0ID0gbmV4dC5uZXh0U2libGluZztcbiAgICB9XG4gICAgcmV0dXJuIG5leHQ7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlcGxhY2VzIDIgb3IgbW9yZSBzdWNjZXNzaXZlIDxicj4gZWxlbWVudHMgd2l0aCBhIHNpbmdsZSA8cD4uXG4gICAqIFdoaXRlc3BhY2UgYmV0d2VlbiA8YnI+IGVsZW1lbnRzIGFyZSBpZ25vcmVkLiBGb3IgZXhhbXBsZTpcbiAgICogICA8ZGl2PmZvbzxicj5iYXI8YnI+IDxicj48YnI+YWJjPC9kaXY+XG4gICAqIHdpbGwgYmVjb21lOlxuICAgKiAgIDxkaXY+Zm9vPGJyPmJhcjxwPmFiYzwvcD48L2Rpdj5cbiAgICovXG4gIF9yZXBsYWNlQnJzOiBmdW5jdGlvbiAoZWxlbSkge1xuICAgIHRoaXMuX2ZvckVhY2hOb2RlKHRoaXMuX2dldEFsbE5vZGVzV2l0aFRhZyhlbGVtLCBbXCJiclwiXSksIGZ1bmN0aW9uKGJyKSB7XG4gICAgICB2YXIgbmV4dCA9IGJyLm5leHRTaWJsaW5nO1xuXG4gICAgICAvLyBXaGV0aGVyIDIgb3IgbW9yZSA8YnI+IGVsZW1lbnRzIGhhdmUgYmVlbiBmb3VuZCBhbmQgcmVwbGFjZWQgd2l0aCBhXG4gICAgICAvLyA8cD4gYmxvY2suXG4gICAgICB2YXIgcmVwbGFjZWQgPSBmYWxzZTtcblxuICAgICAgLy8gSWYgd2UgZmluZCBhIDxicj4gY2hhaW4sIHJlbW92ZSB0aGUgPGJyPnMgdW50aWwgd2UgaGl0IGFub3RoZXIgZWxlbWVudFxuICAgICAgLy8gb3Igbm9uLXdoaXRlc3BhY2UuIFRoaXMgbGVhdmVzIGJlaGluZCB0aGUgZmlyc3QgPGJyPiBpbiB0aGUgY2hhaW5cbiAgICAgIC8vICh3aGljaCB3aWxsIGJlIHJlcGxhY2VkIHdpdGggYSA8cD4gbGF0ZXIpLlxuICAgICAgd2hpbGUgKChuZXh0ID0gdGhpcy5fbmV4dEVsZW1lbnQobmV4dCkpICYmIChuZXh0LnRhZ05hbWUgPT0gXCJCUlwiKSkge1xuICAgICAgICByZXBsYWNlZCA9IHRydWU7XG4gICAgICAgIHZhciBiclNpYmxpbmcgPSBuZXh0Lm5leHRTaWJsaW5nO1xuICAgICAgICBuZXh0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobmV4dCk7XG4gICAgICAgIG5leHQgPSBiclNpYmxpbmc7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHdlIHJlbW92ZWQgYSA8YnI+IGNoYWluLCByZXBsYWNlIHRoZSByZW1haW5pbmcgPGJyPiB3aXRoIGEgPHA+LiBBZGRcbiAgICAgIC8vIGFsbCBzaWJsaW5nIG5vZGVzIGFzIGNoaWxkcmVuIG9mIHRoZSA8cD4gdW50aWwgd2UgaGl0IGFub3RoZXIgPGJyPlxuICAgICAgLy8gY2hhaW4uXG4gICAgICBpZiAocmVwbGFjZWQpIHtcbiAgICAgICAgdmFyIHAgPSB0aGlzLl9kb2MuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgIGJyLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHAsIGJyKTtcblxuICAgICAgICBuZXh0ID0gcC5uZXh0U2libGluZztcbiAgICAgICAgd2hpbGUgKG5leHQpIHtcbiAgICAgICAgICAvLyBJZiB3ZSd2ZSBoaXQgYW5vdGhlciA8YnI+PGJyPiwgd2UncmUgZG9uZSBhZGRpbmcgY2hpbGRyZW4gdG8gdGhpcyA8cD4uXG4gICAgICAgICAgaWYgKG5leHQudGFnTmFtZSA9PSBcIkJSXCIpIHtcbiAgICAgICAgICAgIHZhciBuZXh0RWxlbSA9IHRoaXMuX25leHRFbGVtZW50KG5leHQubmV4dFNpYmxpbmcpO1xuICAgICAgICAgICAgaWYgKG5leHRFbGVtICYmIG5leHRFbGVtLnRhZ05hbWUgPT0gXCJCUlwiKVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIXRoaXMuX2lzUGhyYXNpbmdDb250ZW50KG5leHQpKVxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAvLyBPdGhlcndpc2UsIG1ha2UgdGhpcyBub2RlIGEgY2hpbGQgb2YgdGhlIG5ldyA8cD4uXG4gICAgICAgICAgdmFyIHNpYmxpbmcgPSBuZXh0Lm5leHRTaWJsaW5nO1xuICAgICAgICAgIHAuYXBwZW5kQ2hpbGQobmV4dCk7XG4gICAgICAgICAgbmV4dCA9IHNpYmxpbmc7XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAocC5sYXN0Q2hpbGQgJiYgdGhpcy5faXNXaGl0ZXNwYWNlKHAubGFzdENoaWxkKSkge1xuICAgICAgICAgIHAucmVtb3ZlQ2hpbGQocC5sYXN0Q2hpbGQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHAucGFyZW50Tm9kZS50YWdOYW1lID09PSBcIlBcIilcbiAgICAgICAgICB0aGlzLl9zZXROb2RlVGFnKHAucGFyZW50Tm9kZSwgXCJESVZcIik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sXG5cbiAgX3NldE5vZGVUYWc6IGZ1bmN0aW9uIChub2RlLCB0YWcpIHtcbiAgICB0aGlzLmxvZyhcIl9zZXROb2RlVGFnXCIsIG5vZGUsIHRhZyk7XG4gICAgaWYgKG5vZGUuX19KU0RPTVBhcnNlcl9fKSB7XG4gICAgICBub2RlLmxvY2FsTmFtZSA9IHRhZy50b0xvd2VyQ2FzZSgpO1xuICAgICAgbm9kZS50YWdOYW1lID0gdGFnLnRvVXBwZXJDYXNlKCk7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG5cbiAgICB2YXIgcmVwbGFjZW1lbnQgPSBub2RlLm93bmVyRG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICAgIHdoaWxlIChub2RlLmZpcnN0Q2hpbGQpIHtcbiAgICAgIHJlcGxhY2VtZW50LmFwcGVuZENoaWxkKG5vZGUuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIG5vZGUucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQocmVwbGFjZW1lbnQsIG5vZGUpO1xuICAgIGlmIChub2RlLnJlYWRhYmlsaXR5KVxuICAgICAgcmVwbGFjZW1lbnQucmVhZGFiaWxpdHkgPSBub2RlLnJlYWRhYmlsaXR5O1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJlcGxhY2VtZW50LnNldEF0dHJpYnV0ZShub2RlLmF0dHJpYnV0ZXNbaV0ubmFtZSwgbm9kZS5hdHRyaWJ1dGVzW2ldLnZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcGxhY2VtZW50O1xuICB9LFxuXG4gIC8qKlxuICAgKiBQcmVwYXJlIHRoZSBhcnRpY2xlIG5vZGUgZm9yIGRpc3BsYXkuIENsZWFuIG91dCBhbnkgaW5saW5lIHN0eWxlcyxcbiAgICogaWZyYW1lcywgZm9ybXMsIHN0cmlwIGV4dHJhbmVvdXMgPHA+IHRhZ3MsIGV0Yy5cbiAgICpcbiAgICogQHBhcmFtIEVsZW1lbnRcbiAgICogQHJldHVybiB2b2lkXG4gICAqKi9cbiAgX3ByZXBBcnRpY2xlOiBmdW5jdGlvbihhcnRpY2xlQ29udGVudCkge1xuICAgIHRoaXMuX2NsZWFuU3R5bGVzKGFydGljbGVDb250ZW50KTtcblxuICAgIC8vIENoZWNrIGZvciBkYXRhIHRhYmxlcyBiZWZvcmUgd2UgY29udGludWUsIHRvIGF2b2lkIHJlbW92aW5nIGl0ZW1zIGluXG4gICAgLy8gdGhvc2UgdGFibGVzLCB3aGljaCB3aWxsIG9mdGVuIGJlIGlzb2xhdGVkIGV2ZW4gdGhvdWdoIHRoZXkncmVcbiAgICAvLyB2aXN1YWxseSBsaW5rZWQgdG8gb3RoZXIgY29udGVudC1mdWwgZWxlbWVudHMgKHRleHQsIGltYWdlcywgZXRjLikuXG4gICAgdGhpcy5fbWFya0RhdGFUYWJsZXMoYXJ0aWNsZUNvbnRlbnQpO1xuXG4gICAgLy8gQ2xlYW4gb3V0IGp1bmsgZnJvbSB0aGUgYXJ0aWNsZSBjb250ZW50XG4gICAgdGhpcy5fY2xlYW5Db25kaXRpb25hbGx5KGFydGljbGVDb250ZW50LCBcImZvcm1cIik7XG4gICAgdGhpcy5fY2xlYW5Db25kaXRpb25hbGx5KGFydGljbGVDb250ZW50LCBcImZpZWxkc2V0XCIpO1xuICAgIHRoaXMuX2NsZWFuKGFydGljbGVDb250ZW50LCBcIm9iamVjdFwiKTtcbiAgICB0aGlzLl9jbGVhbihhcnRpY2xlQ29udGVudCwgXCJlbWJlZFwiKTtcbiAgICB0aGlzLl9jbGVhbihhcnRpY2xlQ29udGVudCwgXCJoMVwiKTtcbiAgICB0aGlzLl9jbGVhbihhcnRpY2xlQ29udGVudCwgXCJmb290ZXJcIik7XG4gICAgdGhpcy5fY2xlYW4oYXJ0aWNsZUNvbnRlbnQsIFwibGlua1wiKTtcbiAgICB0aGlzLl9jbGVhbihhcnRpY2xlQ29udGVudCwgXCJhc2lkZVwiKTtcblxuICAgIC8vIENsZWFuIG91dCBlbGVtZW50cyBoYXZlIFwic2hhcmVcIiBpbiB0aGVpciBpZC9jbGFzcyBjb21iaW5hdGlvbnMgZnJvbSBmaW5hbCB0b3AgY2FuZGlkYXRlcyxcbiAgICAvLyB3aGljaCBtZWFucyB3ZSBkb24ndCByZW1vdmUgdGhlIHRvcCBjYW5kaWRhdGVzIGV2ZW4gdGhleSBoYXZlIFwic2hhcmVcIi5cbiAgICB0aGlzLl9mb3JFYWNoTm9kZShhcnRpY2xlQ29udGVudC5jaGlsZHJlbiwgZnVuY3Rpb24odG9wQ2FuZGlkYXRlKSB7XG4gICAgICB0aGlzLl9jbGVhbk1hdGNoZWROb2Rlcyh0b3BDYW5kaWRhdGUsIC9zaGFyZS8pO1xuICAgIH0pO1xuXG4gICAgLy8gSWYgdGhlcmUgaXMgb25seSBvbmUgaDIgYW5kIGl0cyB0ZXh0IGNvbnRlbnQgc3Vic3RhbnRpYWxseSBlcXVhbHMgYXJ0aWNsZSB0aXRsZSxcbiAgICAvLyB0aGV5IGFyZSBwcm9iYWJseSB1c2luZyBpdCBhcyBhIGhlYWRlciBhbmQgbm90IGEgc3ViaGVhZGVyLFxuICAgIC8vIHNvIHJlbW92ZSBpdCBzaW5jZSB3ZSBhbHJlYWR5IGV4dHJhY3QgdGhlIHRpdGxlIHNlcGFyYXRlbHkuXG4gICAgdmFyIGgyID0gYXJ0aWNsZUNvbnRlbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoMlwiKTtcbiAgICBpZiAoaDIubGVuZ3RoID09PSAxKSB7XG4gICAgICB2YXIgbGVuZ3RoU2ltaWxhclJhdGUgPSAoaDJbMF0udGV4dENvbnRlbnQubGVuZ3RoIC0gdGhpcy5fYXJ0aWNsZVRpdGxlLmxlbmd0aCkgLyB0aGlzLl9hcnRpY2xlVGl0bGUubGVuZ3RoO1xuICAgICAgaWYgKE1hdGguYWJzKGxlbmd0aFNpbWlsYXJSYXRlKSA8IDAuNSkge1xuICAgICAgICB2YXIgdGl0bGVzTWF0Y2ggPSBmYWxzZTtcbiAgICAgICAgaWYgKGxlbmd0aFNpbWlsYXJSYXRlID4gMCkge1xuICAgICAgICAgIHRpdGxlc01hdGNoID0gaDJbMF0udGV4dENvbnRlbnQuaW5jbHVkZXModGhpcy5fYXJ0aWNsZVRpdGxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aXRsZXNNYXRjaCA9IHRoaXMuX2FydGljbGVUaXRsZS5pbmNsdWRlcyhoMlswXS50ZXh0Q29udGVudCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRpdGxlc01hdGNoKSB7XG4gICAgICAgICAgdGhpcy5fY2xlYW4oYXJ0aWNsZUNvbnRlbnQsIFwiaDJcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9jbGVhbihhcnRpY2xlQ29udGVudCwgXCJpZnJhbWVcIik7XG4gICAgdGhpcy5fY2xlYW4oYXJ0aWNsZUNvbnRlbnQsIFwiaW5wdXRcIik7XG4gICAgdGhpcy5fY2xlYW4oYXJ0aWNsZUNvbnRlbnQsIFwidGV4dGFyZWFcIik7XG4gICAgdGhpcy5fY2xlYW4oYXJ0aWNsZUNvbnRlbnQsIFwic2VsZWN0XCIpO1xuICAgIHRoaXMuX2NsZWFuKGFydGljbGVDb250ZW50LCBcImJ1dHRvblwiKTtcbiAgICB0aGlzLl9jbGVhbkhlYWRlcnMoYXJ0aWNsZUNvbnRlbnQpO1xuXG4gICAgLy8gRG8gdGhlc2UgbGFzdCBhcyB0aGUgcHJldmlvdXMgc3R1ZmYgbWF5IGhhdmUgcmVtb3ZlZCBqdW5rXG4gICAgLy8gdGhhdCB3aWxsIGFmZmVjdCB0aGVzZVxuICAgIHRoaXMuX2NsZWFuQ29uZGl0aW9uYWxseShhcnRpY2xlQ29udGVudCwgXCJ0YWJsZVwiKTtcbiAgICB0aGlzLl9jbGVhbkNvbmRpdGlvbmFsbHkoYXJ0aWNsZUNvbnRlbnQsIFwidWxcIik7XG4gICAgdGhpcy5fY2xlYW5Db25kaXRpb25hbGx5KGFydGljbGVDb250ZW50LCBcImRpdlwiKTtcblxuICAgIC8vIFJlbW92ZSBleHRyYSBwYXJhZ3JhcGhzXG4gICAgdGhpcy5fcmVtb3ZlTm9kZXMoYXJ0aWNsZUNvbnRlbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJwXCIpLCBmdW5jdGlvbiAocGFyYWdyYXBoKSB7XG4gICAgICB2YXIgaW1nQ291bnQgPSBwYXJhZ3JhcGguZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJpbWdcIikubGVuZ3RoO1xuICAgICAgdmFyIGVtYmVkQ291bnQgPSBwYXJhZ3JhcGguZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJlbWJlZFwiKS5sZW5ndGg7XG4gICAgICB2YXIgb2JqZWN0Q291bnQgPSBwYXJhZ3JhcGguZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJvYmplY3RcIikubGVuZ3RoO1xuICAgICAgLy8gQXQgdGhpcyBwb2ludCwgbmFzdHkgaWZyYW1lcyBoYXZlIGJlZW4gcmVtb3ZlZCwgb25seSByZW1haW4gZW1iZWRkZWQgdmlkZW8gb25lcy5cbiAgICAgIHZhciBpZnJhbWVDb3VudCA9IHBhcmFncmFwaC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImlmcmFtZVwiKS5sZW5ndGg7XG4gICAgICB2YXIgdG90YWxDb3VudCA9IGltZ0NvdW50ICsgZW1iZWRDb3VudCArIG9iamVjdENvdW50ICsgaWZyYW1lQ291bnQ7XG5cbiAgICAgIHJldHVybiB0b3RhbENvdW50ID09PSAwICYmICF0aGlzLl9nZXRJbm5lclRleHQocGFyYWdyYXBoLCBmYWxzZSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLl9mb3JFYWNoTm9kZSh0aGlzLl9nZXRBbGxOb2Rlc1dpdGhUYWcoYXJ0aWNsZUNvbnRlbnQsIFtcImJyXCJdKSwgZnVuY3Rpb24oYnIpIHtcbiAgICAgIHZhciBuZXh0ID0gdGhpcy5fbmV4dEVsZW1lbnQoYnIubmV4dFNpYmxpbmcpO1xuICAgICAgaWYgKG5leHQgJiYgbmV4dC50YWdOYW1lID09IFwiUFwiKVxuICAgICAgICBici5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGJyKTtcbiAgICB9KTtcblxuICAgIC8vIFJlbW92ZSBzaW5nbGUtY2VsbCB0YWJsZXNcbiAgICB0aGlzLl9mb3JFYWNoTm9kZSh0aGlzLl9nZXRBbGxOb2Rlc1dpdGhUYWcoYXJ0aWNsZUNvbnRlbnQsIFtcInRhYmxlXCJdKSwgZnVuY3Rpb24odGFibGUpIHtcbiAgICAgIHZhciB0Ym9keSA9IHRoaXMuX2hhc1NpbmdsZVRhZ0luc2lkZUVsZW1lbnQodGFibGUsIFwiVEJPRFlcIikgPyB0YWJsZS5maXJzdEVsZW1lbnRDaGlsZCA6IHRhYmxlO1xuICAgICAgaWYgKHRoaXMuX2hhc1NpbmdsZVRhZ0luc2lkZUVsZW1lbnQodGJvZHksIFwiVFJcIikpIHtcbiAgICAgICAgdmFyIHJvdyA9IHRib2R5LmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICBpZiAodGhpcy5faGFzU2luZ2xlVGFnSW5zaWRlRWxlbWVudChyb3csIFwiVERcIikpIHtcbiAgICAgICAgICB2YXIgY2VsbCA9IHJvdy5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICBjZWxsID0gdGhpcy5fc2V0Tm9kZVRhZyhjZWxsLCB0aGlzLl9ldmVyeU5vZGUoY2VsbC5jaGlsZE5vZGVzLCB0aGlzLl9pc1BocmFzaW5nQ29udGVudCkgPyBcIlBcIiA6IFwiRElWXCIpO1xuICAgICAgICAgIHRhYmxlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGNlbGwsIHRhYmxlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIGEgbm9kZSB3aXRoIHRoZSByZWFkYWJpbGl0eSBvYmplY3QuIEFsc28gY2hlY2tzIHRoZVxuICAgKiBjbGFzc05hbWUvaWQgZm9yIHNwZWNpYWwgbmFtZXMgdG8gYWRkIHRvIGl0cyBzY29yZS5cbiAgICpcbiAgICogQHBhcmFtIEVsZW1lbnRcbiAgICogQHJldHVybiB2b2lkXG4gICoqL1xuICBfaW5pdGlhbGl6ZU5vZGU6IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICBub2RlLnJlYWRhYmlsaXR5ID0ge1wiY29udGVudFNjb3JlXCI6IDB9O1xuXG4gICAgc3dpdGNoIChub2RlLnRhZ05hbWUpIHtcbiAgICAgIGNhc2UgXCJESVZcIjpcbiAgICAgICAgbm9kZS5yZWFkYWJpbGl0eS5jb250ZW50U2NvcmUgKz0gNTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgXCJQUkVcIjpcbiAgICAgIGNhc2UgXCJURFwiOlxuICAgICAgY2FzZSBcIkJMT0NLUVVPVEVcIjpcbiAgICAgICAgbm9kZS5yZWFkYWJpbGl0eS5jb250ZW50U2NvcmUgKz0gMztcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgXCJBRERSRVNTXCI6XG4gICAgICBjYXNlIFwiT0xcIjpcbiAgICAgIGNhc2UgXCJVTFwiOlxuICAgICAgY2FzZSBcIkRMXCI6XG4gICAgICBjYXNlIFwiRERcIjpcbiAgICAgIGNhc2UgXCJEVFwiOlxuICAgICAgY2FzZSBcIkxJXCI6XG4gICAgICBjYXNlIFwiRk9STVwiOlxuICAgICAgICBub2RlLnJlYWRhYmlsaXR5LmNvbnRlbnRTY29yZSAtPSAzO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBcIkgxXCI6XG4gICAgICBjYXNlIFwiSDJcIjpcbiAgICAgIGNhc2UgXCJIM1wiOlxuICAgICAgY2FzZSBcIkg0XCI6XG4gICAgICBjYXNlIFwiSDVcIjpcbiAgICAgIGNhc2UgXCJINlwiOlxuICAgICAgY2FzZSBcIlRIXCI6XG4gICAgICAgIG5vZGUucmVhZGFiaWxpdHkuY29udGVudFNjb3JlIC09IDU7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIG5vZGUucmVhZGFiaWxpdHkuY29udGVudFNjb3JlICs9IHRoaXMuX2dldENsYXNzV2VpZ2h0KG5vZGUpO1xuICB9LFxuXG4gIF9yZW1vdmVBbmRHZXROZXh0OiBmdW5jdGlvbihub2RlKSB7XG4gICAgdmFyIG5leHROb2RlID0gdGhpcy5fZ2V0TmV4dE5vZGUobm9kZSwgdHJ1ZSk7XG4gICAgbm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgIHJldHVybiBuZXh0Tm9kZTtcbiAgfSxcblxuICAvKipcbiAgICogVHJhdmVyc2UgdGhlIERPTSBmcm9tIG5vZGUgdG8gbm9kZSwgc3RhcnRpbmcgYXQgdGhlIG5vZGUgcGFzc2VkIGluLlxuICAgKiBQYXNzIHRydWUgZm9yIHRoZSBzZWNvbmQgcGFyYW1ldGVyIHRvIGluZGljYXRlIHRoaXMgbm9kZSBpdHNlbGZcbiAgICogKGFuZCBpdHMga2lkcykgYXJlIGdvaW5nIGF3YXksIGFuZCB3ZSB3YW50IHRoZSBuZXh0IG5vZGUgb3Zlci5cbiAgICpcbiAgICogQ2FsbGluZyB0aGlzIGluIGEgbG9vcCB3aWxsIHRyYXZlcnNlIHRoZSBET00gZGVwdGgtZmlyc3QuXG4gICAqL1xuICBfZ2V0TmV4dE5vZGU6IGZ1bmN0aW9uKG5vZGUsIGlnbm9yZVNlbGZBbmRLaWRzKSB7XG4gICAgLy8gRmlyc3QgY2hlY2sgZm9yIGtpZHMgaWYgdGhvc2UgYXJlbid0IGJlaW5nIGlnbm9yZWRcbiAgICBpZiAoIWlnbm9yZVNlbGZBbmRLaWRzICYmIG5vZGUuZmlyc3RFbGVtZW50Q2hpbGQpIHtcbiAgICAgIHJldHVybiBub2RlLmZpcnN0RWxlbWVudENoaWxkO1xuICAgIH1cbiAgICAvLyBUaGVuIGZvciBzaWJsaW5ncy4uLlxuICAgIGlmIChub2RlLm5leHRFbGVtZW50U2libGluZykge1xuICAgICAgcmV0dXJuIG5vZGUubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgIH1cbiAgICAvLyBBbmQgZmluYWxseSwgbW92ZSB1cCB0aGUgcGFyZW50IGNoYWluICphbmQqIGZpbmQgYSBzaWJsaW5nXG4gICAgLy8gKGJlY2F1c2UgdGhpcyBpcyBkZXB0aC1maXJzdCB0cmF2ZXJzYWwsIHdlIHdpbGwgaGF2ZSBhbHJlYWR5XG4gICAgLy8gc2VlbiB0aGUgcGFyZW50IG5vZGVzIHRoZW1zZWx2ZXMpLlxuICAgIGRvIHtcbiAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgfSB3aGlsZSAobm9kZSAmJiAhbm9kZS5uZXh0RWxlbWVudFNpYmxpbmcpO1xuICAgIHJldHVybiBub2RlICYmIG5vZGUubmV4dEVsZW1lbnRTaWJsaW5nO1xuICB9LFxuXG4gIF9jaGVja0J5bGluZTogZnVuY3Rpb24obm9kZSwgbWF0Y2hTdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fYXJ0aWNsZUJ5bGluZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChub2RlLmdldEF0dHJpYnV0ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YXIgcmVsID0gbm9kZS5nZXRBdHRyaWJ1dGUoXCJyZWxcIik7XG4gICAgfVxuXG4gICAgaWYgKChyZWwgPT09IFwiYXV0aG9yXCIgfHwgdGhpcy5SRUdFWFBTLmJ5bGluZS50ZXN0KG1hdGNoU3RyaW5nKSkgJiYgdGhpcy5faXNWYWxpZEJ5bGluZShub2RlLnRleHRDb250ZW50KSkge1xuICAgICAgdGhpcy5fYXJ0aWNsZUJ5bGluZSA9IG5vZGUudGV4dENvbnRlbnQudHJpbSgpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuXG4gIF9nZXROb2RlQW5jZXN0b3JzOiBmdW5jdGlvbihub2RlLCBtYXhEZXB0aCkge1xuICAgIG1heERlcHRoID0gbWF4RGVwdGggfHwgMDtcbiAgICB2YXIgaSA9IDAsIGFuY2VzdG9ycyA9IFtdO1xuICAgIHdoaWxlIChub2RlLnBhcmVudE5vZGUpIHtcbiAgICAgIGFuY2VzdG9ycy5wdXNoKG5vZGUucGFyZW50Tm9kZSk7XG4gICAgICBpZiAobWF4RGVwdGggJiYgKytpID09PSBtYXhEZXB0aClcbiAgICAgICAgYnJlYWs7XG4gICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgIH1cbiAgICByZXR1cm4gYW5jZXN0b3JzO1xuICB9LFxuXG4gIC8qKipcbiAgICogZ3JhYkFydGljbGUgLSBVc2luZyBhIHZhcmlldHkgb2YgbWV0cmljcyAoY29udGVudCBzY29yZSwgY2xhc3NuYW1lLCBlbGVtZW50IHR5cGVzKSwgZmluZCB0aGUgY29udGVudCB0aGF0IGlzXG4gICAqICAgICAgICAgbW9zdCBsaWtlbHkgdG8gYmUgdGhlIHN0dWZmIGEgdXNlciB3YW50cyB0byByZWFkLiBUaGVuIHJldHVybiBpdCB3cmFwcGVkIHVwIGluIGEgZGl2LlxuICAgKlxuICAgKiBAcGFyYW0gcGFnZSBhIGRvY3VtZW50IHRvIHJ1biB1cG9uLiBOZWVkcyB0byBiZSBhIGZ1bGwgZG9jdW1lbnQsIGNvbXBsZXRlIHdpdGggYm9keS5cbiAgICogQHJldHVybiBFbGVtZW50XG4gICoqL1xuICBfZ3JhYkFydGljbGU6IGZ1bmN0aW9uIChwYWdlKSB7XG4gICAgdGhpcy5sb2coXCIqKioqIGdyYWJBcnRpY2xlICoqKipcIik7XG4gICAgdmFyIGRvYyA9IHRoaXMuX2RvYztcbiAgICB2YXIgaXNQYWdpbmcgPSAocGFnZSAhPT0gbnVsbCA/IHRydWU6IGZhbHNlKTtcbiAgICBwYWdlID0gcGFnZSA/IHBhZ2UgOiB0aGlzLl9kb2MuYm9keTtcblxuICAgIC8vIFdlIGNhbid0IGdyYWIgYW4gYXJ0aWNsZSBpZiB3ZSBkb24ndCBoYXZlIGEgcGFnZSFcbiAgICBpZiAoIXBhZ2UpIHtcbiAgICAgIHRoaXMubG9nKFwiTm8gYm9keSBmb3VuZCBpbiBkb2N1bWVudC4gQWJvcnQuXCIpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdmFyIHBhZ2VDYWNoZUh0bWwgPSBwYWdlLmlubmVySFRNTDtcblxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICB2YXIgc3RyaXBVbmxpa2VseUNhbmRpZGF0ZXMgPSB0aGlzLl9mbGFnSXNBY3RpdmUodGhpcy5GTEFHX1NUUklQX1VOTElLRUxZUyk7XG5cbiAgICAgIC8vIEZpcnN0LCBub2RlIHByZXBwaW5nLiBUcmFzaCBub2RlcyB0aGF0IGxvb2sgY3J1ZGR5IChsaWtlIG9uZXMgd2l0aCB0aGVcbiAgICAgIC8vIGNsYXNzIG5hbWUgXCJjb21tZW50XCIsIGV0YyksIGFuZCB0dXJuIGRpdnMgaW50byBQIHRhZ3Mgd2hlcmUgdGhleSBoYXZlIGJlZW5cbiAgICAgIC8vIHVzZWQgaW5hcHByb3ByaWF0ZWx5IChhcyBpbiwgd2hlcmUgdGhleSBjb250YWluIG5vIG90aGVyIGJsb2NrIGxldmVsIGVsZW1lbnRzLilcbiAgICAgIHZhciBlbGVtZW50c1RvU2NvcmUgPSBbXTtcbiAgICAgIHZhciBub2RlID0gdGhpcy5fZG9jLmRvY3VtZW50RWxlbWVudDtcblxuICAgICAgd2hpbGUgKG5vZGUpIHtcbiAgICAgICAgdmFyIG1hdGNoU3RyaW5nID0gbm9kZS5jbGFzc05hbWUgKyBcIiBcIiArIG5vZGUuaWQ7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9pc1Byb2JhYmx5VmlzaWJsZShub2RlKSkge1xuICAgICAgICAgIHRoaXMubG9nKFwiUmVtb3ZpbmcgaGlkZGVuIG5vZGUgLSBcIiArIG1hdGNoU3RyaW5nKTtcbiAgICAgICAgICBub2RlID0gdGhpcy5fcmVtb3ZlQW5kR2V0TmV4dChub2RlKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB0aGlzIG5vZGUgaXMgYSBieWxpbmUsIGFuZCByZW1vdmUgaXQgaWYgaXQgaXMuXG4gICAgICAgIGlmICh0aGlzLl9jaGVja0J5bGluZShub2RlLCBtYXRjaFN0cmluZykpIHtcbiAgICAgICAgICBub2RlID0gdGhpcy5fcmVtb3ZlQW5kR2V0TmV4dChub2RlKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlbW92ZSB1bmxpa2VseSBjYW5kaWRhdGVzXG4gICAgICAgIGlmIChzdHJpcFVubGlrZWx5Q2FuZGlkYXRlcykge1xuICAgICAgICAgIGlmICh0aGlzLlJFR0VYUFMudW5saWtlbHlDYW5kaWRhdGVzLnRlc3QobWF0Y2hTdHJpbmcpICYmXG4gICAgICAgICAgICAgICF0aGlzLlJFR0VYUFMub2tNYXliZUl0c0FDYW5kaWRhdGUudGVzdChtYXRjaFN0cmluZykgJiZcbiAgICAgICAgICAgICAgbm9kZS50YWdOYW1lICE9PSBcIkJPRFlcIiAmJlxuICAgICAgICAgICAgICBub2RlLnRhZ05hbWUgIT09IFwiQVwiKSB7XG4gICAgICAgICAgICB0aGlzLmxvZyhcIlJlbW92aW5nIHVubGlrZWx5IGNhbmRpZGF0ZSAtIFwiICsgbWF0Y2hTdHJpbmcpO1xuICAgICAgICAgICAgbm9kZSA9IHRoaXMuX3JlbW92ZUFuZEdldE5leHQobm9kZSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZW1vdmUgRElWLCBTRUNUSU9OLCBhbmQgSEVBREVSIG5vZGVzIHdpdGhvdXQgYW55IGNvbnRlbnQoZS5nLiB0ZXh0LCBpbWFnZSwgdmlkZW8sIG9yIGlmcmFtZSkuXG4gICAgICAgIGlmICgobm9kZS50YWdOYW1lID09PSBcIkRJVlwiIHx8IG5vZGUudGFnTmFtZSA9PT0gXCJTRUNUSU9OXCIgfHwgbm9kZS50YWdOYW1lID09PSBcIkhFQURFUlwiIHx8XG4gICAgICAgICAgICAgbm9kZS50YWdOYW1lID09PSBcIkgxXCIgfHwgbm9kZS50YWdOYW1lID09PSBcIkgyXCIgfHwgbm9kZS50YWdOYW1lID09PSBcIkgzXCIgfHxcbiAgICAgICAgICAgICBub2RlLnRhZ05hbWUgPT09IFwiSDRcIiB8fCBub2RlLnRhZ05hbWUgPT09IFwiSDVcIiB8fCBub2RlLnRhZ05hbWUgPT09IFwiSDZcIikgJiZcbiAgICAgICAgICAgIHRoaXMuX2lzRWxlbWVudFdpdGhvdXRDb250ZW50KG5vZGUpKSB7XG4gICAgICAgICAgbm9kZSA9IHRoaXMuX3JlbW92ZUFuZEdldE5leHQobm9kZSk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5ERUZBVUxUX1RBR1NfVE9fU0NPUkUuaW5kZXhPZihub2RlLnRhZ05hbWUpICE9PSAtMSkge1xuICAgICAgICAgIGVsZW1lbnRzVG9TY29yZS5wdXNoKG5vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gVHVybiBhbGwgZGl2cyB0aGF0IGRvbid0IGhhdmUgY2hpbGRyZW4gYmxvY2sgbGV2ZWwgZWxlbWVudHMgaW50byBwJ3NcbiAgICAgICAgaWYgKG5vZGUudGFnTmFtZSA9PT0gXCJESVZcIikge1xuICAgICAgICAgIC8vIFB1dCBwaHJhc2luZyBjb250ZW50IGludG8gcGFyYWdyYXBocy5cbiAgICAgICAgICB2YXIgcCA9IG51bGw7XG4gICAgICAgICAgdmFyIGNoaWxkTm9kZSA9IG5vZGUuZmlyc3RDaGlsZDtcbiAgICAgICAgICB3aGlsZSAoY2hpbGROb2RlKSB7XG4gICAgICAgICAgICB2YXIgbmV4dFNpYmxpbmcgPSBjaGlsZE5vZGUubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICBpZiAodGhpcy5faXNQaHJhc2luZ0NvbnRlbnQoY2hpbGROb2RlKSkge1xuICAgICAgICAgICAgICBpZiAocCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHAuYXBwZW5kQ2hpbGQoY2hpbGROb2RlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICghdGhpcy5faXNXaGl0ZXNwYWNlKGNoaWxkTm9kZSkpIHtcbiAgICAgICAgICAgICAgICBwID0gZG9jLmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICAgICAgICAgIG5vZGUucmVwbGFjZUNoaWxkKHAsIGNoaWxkTm9kZSk7XG4gICAgICAgICAgICAgICAgcC5hcHBlbmRDaGlsZChjaGlsZE5vZGUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHAgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgd2hpbGUgKHAubGFzdENoaWxkICYmIHRoaXMuX2lzV2hpdGVzcGFjZShwLmxhc3RDaGlsZCkpIHtcbiAgICAgICAgICAgICAgICBwLnJlbW92ZUNoaWxkKHAubGFzdENoaWxkKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBwID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNoaWxkTm9kZSA9IG5leHRTaWJsaW5nO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFNpdGVzIGxpa2UgaHR0cDovL21vYmlsZS5zbGF0ZS5jb20gZW5jbG9zZXMgZWFjaCBwYXJhZ3JhcGggd2l0aCBhIERJVlxuICAgICAgICAgIC8vIGVsZW1lbnQuIERJVnMgd2l0aCBvbmx5IGEgUCBlbGVtZW50IGluc2lkZSBhbmQgbm8gdGV4dCBjb250ZW50IGNhbiBiZVxuICAgICAgICAgIC8vIHNhZmVseSBjb252ZXJ0ZWQgaW50byBwbGFpbiBQIGVsZW1lbnRzIHRvIGF2b2lkIGNvbmZ1c2luZyB0aGUgc2NvcmluZ1xuICAgICAgICAgIC8vIGFsZ29yaXRobSB3aXRoIERJVnMgd2l0aCBhcmUsIGluIHByYWN0aWNlLCBwYXJhZ3JhcGhzLlxuICAgICAgICAgIGlmICh0aGlzLl9oYXNTaW5nbGVUYWdJbnNpZGVFbGVtZW50KG5vZGUsIFwiUFwiKSAmJiB0aGlzLl9nZXRMaW5rRGVuc2l0eShub2RlKSA8IDAuMjUpIHtcbiAgICAgICAgICAgIHZhciBuZXdOb2RlID0gbm9kZS5jaGlsZHJlblswXTtcbiAgICAgICAgICAgIG5vZGUucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobmV3Tm9kZSwgbm9kZSk7XG4gICAgICAgICAgICBub2RlID0gbmV3Tm9kZTtcbiAgICAgICAgICAgIGVsZW1lbnRzVG9TY29yZS5wdXNoKG5vZGUpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoIXRoaXMuX2hhc0NoaWxkQmxvY2tFbGVtZW50KG5vZGUpKSB7XG4gICAgICAgICAgICBub2RlID0gdGhpcy5fc2V0Tm9kZVRhZyhub2RlLCBcIlBcIik7XG4gICAgICAgICAgICBlbGVtZW50c1RvU2NvcmUucHVzaChub2RlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbm9kZSA9IHRoaXMuX2dldE5leHROb2RlKG5vZGUpO1xuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIExvb3AgdGhyb3VnaCBhbGwgcGFyYWdyYXBocywgYW5kIGFzc2lnbiBhIHNjb3JlIHRvIHRoZW0gYmFzZWQgb24gaG93IGNvbnRlbnQteSB0aGV5IGxvb2suXG4gICAgICAgKiBUaGVuIGFkZCB0aGVpciBzY29yZSB0byB0aGVpciBwYXJlbnQgbm9kZS5cbiAgICAgICAqXG4gICAgICAgKiBBIHNjb3JlIGlzIGRldGVybWluZWQgYnkgdGhpbmdzIGxpa2UgbnVtYmVyIG9mIGNvbW1hcywgY2xhc3MgbmFtZXMsIGV0Yy4gTWF5YmUgZXZlbnR1YWxseSBsaW5rIGRlbnNpdHkuXG4gICAgICAqKi9cbiAgICAgIHZhciBjYW5kaWRhdGVzID0gW107XG4gICAgICB0aGlzLl9mb3JFYWNoTm9kZShlbGVtZW50c1RvU2NvcmUsIGZ1bmN0aW9uKGVsZW1lbnRUb1Njb3JlKSB7XG4gICAgICAgIGlmICghZWxlbWVudFRvU2NvcmUucGFyZW50Tm9kZSB8fCB0eXBlb2YoZWxlbWVudFRvU2NvcmUucGFyZW50Tm9kZS50YWdOYW1lKSA9PT0gXCJ1bmRlZmluZWRcIilcbiAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgLy8gSWYgdGhpcyBwYXJhZ3JhcGggaXMgbGVzcyB0aGFuIDI1IGNoYXJhY3RlcnMsIGRvbid0IGV2ZW4gY291bnQgaXQuXG4gICAgICAgIHZhciBpbm5lclRleHQgPSB0aGlzLl9nZXRJbm5lclRleHQoZWxlbWVudFRvU2NvcmUpO1xuICAgICAgICBpZiAoaW5uZXJUZXh0Lmxlbmd0aCA8IDI1KVxuICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAvLyBFeGNsdWRlIG5vZGVzIHdpdGggbm8gYW5jZXN0b3IuXG4gICAgICAgIHZhciBhbmNlc3RvcnMgPSB0aGlzLl9nZXROb2RlQW5jZXN0b3JzKGVsZW1lbnRUb1Njb3JlLCAzKTtcbiAgICAgICAgaWYgKGFuY2VzdG9ycy5sZW5ndGggPT09IDApXG4gICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBjb250ZW50U2NvcmUgPSAwO1xuXG4gICAgICAgIC8vIEFkZCBhIHBvaW50IGZvciB0aGUgcGFyYWdyYXBoIGl0c2VsZiBhcyBhIGJhc2UuXG4gICAgICAgIGNvbnRlbnRTY29yZSArPSAxO1xuXG4gICAgICAgIC8vIEFkZCBwb2ludHMgZm9yIGFueSBjb21tYXMgd2l0aGluIHRoaXMgcGFyYWdyYXBoLlxuICAgICAgICBjb250ZW50U2NvcmUgKz0gaW5uZXJUZXh0LnNwbGl0KFwiLFwiKS5sZW5ndGg7XG5cbiAgICAgICAgLy8gRm9yIGV2ZXJ5IDEwMCBjaGFyYWN0ZXJzIGluIHRoaXMgcGFyYWdyYXBoLCBhZGQgYW5vdGhlciBwb2ludC4gVXAgdG8gMyBwb2ludHMuXG4gICAgICAgIGNvbnRlbnRTY29yZSArPSBNYXRoLm1pbihNYXRoLmZsb29yKGlubmVyVGV4dC5sZW5ndGggLyAxMDApLCAzKTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIGFuZCBzY29yZSBhbmNlc3RvcnMuXG4gICAgICAgIHRoaXMuX2ZvckVhY2hOb2RlKGFuY2VzdG9ycywgZnVuY3Rpb24oYW5jZXN0b3IsIGxldmVsKSB7XG4gICAgICAgICAgaWYgKCFhbmNlc3Rvci50YWdOYW1lIHx8ICFhbmNlc3Rvci5wYXJlbnROb2RlIHx8IHR5cGVvZihhbmNlc3Rvci5wYXJlbnROb2RlLnRhZ05hbWUpID09PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZihhbmNlc3Rvci5yZWFkYWJpbGl0eSkgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX2luaXRpYWxpemVOb2RlKGFuY2VzdG9yKTtcbiAgICAgICAgICAgIGNhbmRpZGF0ZXMucHVzaChhbmNlc3Rvcik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gTm9kZSBzY29yZSBkaXZpZGVyOlxuICAgICAgICAgIC8vIC0gcGFyZW50OiAgICAgICAgICAgICAxIChubyBkaXZpc2lvbilcbiAgICAgICAgICAvLyAtIGdyYW5kcGFyZW50OiAgICAgICAgMlxuICAgICAgICAgIC8vIC0gZ3JlYXQgZ3JhbmRwYXJlbnQrOiBhbmNlc3RvciBsZXZlbCAqIDNcbiAgICAgICAgICBpZiAobGV2ZWwgPT09IDApXG4gICAgICAgICAgICB2YXIgc2NvcmVEaXZpZGVyID0gMTtcbiAgICAgICAgICBlbHNlIGlmIChsZXZlbCA9PT0gMSlcbiAgICAgICAgICAgIHNjb3JlRGl2aWRlciA9IDI7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgc2NvcmVEaXZpZGVyID0gbGV2ZWwgKiAzO1xuICAgICAgICAgIGFuY2VzdG9yLnJlYWRhYmlsaXR5LmNvbnRlbnRTY29yZSArPSBjb250ZW50U2NvcmUgLyBzY29yZURpdmlkZXI7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIEFmdGVyIHdlJ3ZlIGNhbGN1bGF0ZWQgc2NvcmVzLCBsb29wIHRocm91Z2ggYWxsIG9mIHRoZSBwb3NzaWJsZVxuICAgICAgLy8gY2FuZGlkYXRlIG5vZGVzIHdlIGZvdW5kIGFuZCBmaW5kIHRoZSBvbmUgd2l0aCB0aGUgaGlnaGVzdCBzY29yZS5cbiAgICAgIHZhciB0b3BDYW5kaWRhdGVzID0gW107XG4gICAgICBmb3IgKHZhciBjID0gMCwgY2wgPSBjYW5kaWRhdGVzLmxlbmd0aDsgYyA8IGNsOyBjICs9IDEpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZSA9IGNhbmRpZGF0ZXNbY107XG5cbiAgICAgICAgLy8gU2NhbGUgdGhlIGZpbmFsIGNhbmRpZGF0ZXMgc2NvcmUgYmFzZWQgb24gbGluayBkZW5zaXR5LiBHb29kIGNvbnRlbnRcbiAgICAgICAgLy8gc2hvdWxkIGhhdmUgYSByZWxhdGl2ZWx5IHNtYWxsIGxpbmsgZGVuc2l0eSAoNSUgb3IgbGVzcykgYW5kIGJlIG1vc3RseVxuICAgICAgICAvLyB1bmFmZmVjdGVkIGJ5IHRoaXMgb3BlcmF0aW9uLlxuICAgICAgICB2YXIgY2FuZGlkYXRlU2NvcmUgPSBjYW5kaWRhdGUucmVhZGFiaWxpdHkuY29udGVudFNjb3JlICogKDEgLSB0aGlzLl9nZXRMaW5rRGVuc2l0eShjYW5kaWRhdGUpKTtcbiAgICAgICAgY2FuZGlkYXRlLnJlYWRhYmlsaXR5LmNvbnRlbnRTY29yZSA9IGNhbmRpZGF0ZVNjb3JlO1xuXG4gICAgICAgIHRoaXMubG9nKFwiQ2FuZGlkYXRlOlwiLCBjYW5kaWRhdGUsIFwid2l0aCBzY29yZSBcIiArIGNhbmRpZGF0ZVNjb3JlKTtcblxuICAgICAgICBmb3IgKHZhciB0ID0gMDsgdCA8IHRoaXMuX25iVG9wQ2FuZGlkYXRlczsgdCsrKSB7XG4gICAgICAgICAgdmFyIGFUb3BDYW5kaWRhdGUgPSB0b3BDYW5kaWRhdGVzW3RdO1xuXG4gICAgICAgICAgaWYgKCFhVG9wQ2FuZGlkYXRlIHx8IGNhbmRpZGF0ZVNjb3JlID4gYVRvcENhbmRpZGF0ZS5yZWFkYWJpbGl0eS5jb250ZW50U2NvcmUpIHtcbiAgICAgICAgICAgIHRvcENhbmRpZGF0ZXMuc3BsaWNlKHQsIDAsIGNhbmRpZGF0ZSk7XG4gICAgICAgICAgICBpZiAodG9wQ2FuZGlkYXRlcy5sZW5ndGggPiB0aGlzLl9uYlRvcENhbmRpZGF0ZXMpXG4gICAgICAgICAgICAgIHRvcENhbmRpZGF0ZXMucG9wKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIHRvcENhbmRpZGF0ZSA9IHRvcENhbmRpZGF0ZXNbMF0gfHwgbnVsbDtcbiAgICAgIHZhciBuZWVkZWRUb0NyZWF0ZVRvcENhbmRpZGF0ZSA9IGZhbHNlO1xuICAgICAgdmFyIHBhcmVudE9mVG9wQ2FuZGlkYXRlO1xuXG4gICAgICAvLyBJZiB3ZSBzdGlsbCBoYXZlIG5vIHRvcCBjYW5kaWRhdGUsIGp1c3QgdXNlIHRoZSBib2R5IGFzIGEgbGFzdCByZXNvcnQuXG4gICAgICAvLyBXZSBhbHNvIGhhdmUgdG8gY29weSB0aGUgYm9keSBub2RlIHNvIGl0IGlzIHNvbWV0aGluZyB3ZSBjYW4gbW9kaWZ5LlxuICAgICAgaWYgKHRvcENhbmRpZGF0ZSA9PT0gbnVsbCB8fCB0b3BDYW5kaWRhdGUudGFnTmFtZSA9PT0gXCJCT0RZXCIpIHtcbiAgICAgICAgLy8gTW92ZSBhbGwgb2YgdGhlIHBhZ2UncyBjaGlsZHJlbiBpbnRvIHRvcENhbmRpZGF0ZVxuICAgICAgICB0b3BDYW5kaWRhdGUgPSBkb2MuY3JlYXRlRWxlbWVudChcIkRJVlwiKTtcbiAgICAgICAgbmVlZGVkVG9DcmVhdGVUb3BDYW5kaWRhdGUgPSB0cnVlO1xuICAgICAgICAvLyBNb3ZlIGV2ZXJ5dGhpbmcgKG5vdCBqdXN0IGVsZW1lbnRzLCBhbHNvIHRleHQgbm9kZXMgZXRjLikgaW50byB0aGUgY29udGFpbmVyXG4gICAgICAgIC8vIHNvIHdlIGV2ZW4gaW5jbHVkZSB0ZXh0IGRpcmVjdGx5IGluIHRoZSBib2R5OlxuICAgICAgICB2YXIga2lkcyA9IHBhZ2UuY2hpbGROb2RlcztcbiAgICAgICAgd2hpbGUgKGtpZHMubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5sb2coXCJNb3ZpbmcgY2hpbGQgb3V0OlwiLCBraWRzWzBdKTtcbiAgICAgICAgICB0b3BDYW5kaWRhdGUuYXBwZW5kQ2hpbGQoa2lkc1swXSk7XG4gICAgICAgIH1cblxuICAgICAgICBwYWdlLmFwcGVuZENoaWxkKHRvcENhbmRpZGF0ZSk7XG5cbiAgICAgICAgdGhpcy5faW5pdGlhbGl6ZU5vZGUodG9wQ2FuZGlkYXRlKTtcbiAgICAgIH0gZWxzZSBpZiAodG9wQ2FuZGlkYXRlKSB7XG4gICAgICAgIC8vIEZpbmQgYSBiZXR0ZXIgdG9wIGNhbmRpZGF0ZSBub2RlIGlmIGl0IGNvbnRhaW5zIChhdCBsZWFzdCB0aHJlZSkgbm9kZXMgd2hpY2ggYmVsb25nIHRvIGB0b3BDYW5kaWRhdGVzYCBhcnJheVxuICAgICAgICAvLyBhbmQgd2hvc2Ugc2NvcmVzIGFyZSBxdWl0ZSBjbG9zZWQgd2l0aCBjdXJyZW50IGB0b3BDYW5kaWRhdGVgIG5vZGUuXG4gICAgICAgIHZhciBhbHRlcm5hdGl2ZUNhbmRpZGF0ZUFuY2VzdG9ycyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHRvcENhbmRpZGF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAodG9wQ2FuZGlkYXRlc1tpXS5yZWFkYWJpbGl0eS5jb250ZW50U2NvcmUgLyB0b3BDYW5kaWRhdGUucmVhZGFiaWxpdHkuY29udGVudFNjb3JlID49IDAuNzUpIHtcbiAgICAgICAgICAgIGFsdGVybmF0aXZlQ2FuZGlkYXRlQW5jZXN0b3JzLnB1c2godGhpcy5fZ2V0Tm9kZUFuY2VzdG9ycyh0b3BDYW5kaWRhdGVzW2ldKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBNSU5JTVVNX1RPUENBTkRJREFURVMgPSAzO1xuICAgICAgICBpZiAoYWx0ZXJuYXRpdmVDYW5kaWRhdGVBbmNlc3RvcnMubGVuZ3RoID49IE1JTklNVU1fVE9QQ0FORElEQVRFUykge1xuICAgICAgICAgIHBhcmVudE9mVG9wQ2FuZGlkYXRlID0gdG9wQ2FuZGlkYXRlLnBhcmVudE5vZGU7XG4gICAgICAgICAgd2hpbGUgKHBhcmVudE9mVG9wQ2FuZGlkYXRlLnRhZ05hbWUgIT09IFwiQk9EWVwiKSB7XG4gICAgICAgICAgICB2YXIgbGlzdHNDb250YWluaW5nVGhpc0FuY2VzdG9yID0gMDtcbiAgICAgICAgICAgIGZvciAodmFyIGFuY2VzdG9ySW5kZXggPSAwOyBhbmNlc3RvckluZGV4IDwgYWx0ZXJuYXRpdmVDYW5kaWRhdGVBbmNlc3RvcnMubGVuZ3RoICYmIGxpc3RzQ29udGFpbmluZ1RoaXNBbmNlc3RvciA8IE1JTklNVU1fVE9QQ0FORElEQVRFUzsgYW5jZXN0b3JJbmRleCsrKSB7XG4gICAgICAgICAgICAgIGxpc3RzQ29udGFpbmluZ1RoaXNBbmNlc3RvciArPSBOdW1iZXIoYWx0ZXJuYXRpdmVDYW5kaWRhdGVBbmNlc3RvcnNbYW5jZXN0b3JJbmRleF0uaW5jbHVkZXMocGFyZW50T2ZUb3BDYW5kaWRhdGUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsaXN0c0NvbnRhaW5pbmdUaGlzQW5jZXN0b3IgPj0gTUlOSU1VTV9UT1BDQU5ESURBVEVTKSB7XG4gICAgICAgICAgICAgIHRvcENhbmRpZGF0ZSA9IHBhcmVudE9mVG9wQ2FuZGlkYXRlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhcmVudE9mVG9wQ2FuZGlkYXRlID0gcGFyZW50T2ZUb3BDYW5kaWRhdGUucGFyZW50Tm9kZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0b3BDYW5kaWRhdGUucmVhZGFiaWxpdHkpIHtcbiAgICAgICAgICB0aGlzLl9pbml0aWFsaXplTm9kZSh0b3BDYW5kaWRhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmVjYXVzZSBvZiBvdXIgYm9udXMgc3lzdGVtLCBwYXJlbnRzIG9mIGNhbmRpZGF0ZXMgbWlnaHQgaGF2ZSBzY29yZXNcbiAgICAgICAgLy8gdGhlbXNlbHZlcy4gVGhleSBnZXQgaGFsZiBvZiB0aGUgbm9kZS4gVGhlcmUgd29uJ3QgYmUgbm9kZXMgd2l0aCBoaWdoZXJcbiAgICAgICAgLy8gc2NvcmVzIHRoYW4gb3VyIHRvcENhbmRpZGF0ZSwgYnV0IGlmIHdlIHNlZSB0aGUgc2NvcmUgZ29pbmcgKnVwKiBpbiB0aGUgZmlyc3RcbiAgICAgICAgLy8gZmV3IHN0ZXBzIHVwIHRoZSB0cmVlLCB0aGF0J3MgYSBkZWNlbnQgc2lnbiB0aGF0IHRoZXJlIG1pZ2h0IGJlIG1vcmUgY29udGVudFxuICAgICAgICAvLyBsdXJraW5nIGluIG90aGVyIHBsYWNlcyB0aGF0IHdlIHdhbnQgdG8gdW5pZnkgaW4uIFRoZSBzaWJsaW5nIHN0dWZmXG4gICAgICAgIC8vIGJlbG93IGRvZXMgc29tZSBvZiB0aGF0IC0gYnV0IG9ubHkgaWYgd2UndmUgbG9va2VkIGhpZ2ggZW5vdWdoIHVwIHRoZSBET01cbiAgICAgICAgLy8gdHJlZS5cbiAgICAgICAgcGFyZW50T2ZUb3BDYW5kaWRhdGUgPSB0b3BDYW5kaWRhdGUucGFyZW50Tm9kZTtcbiAgICAgICAgdmFyIGxhc3RTY29yZSA9IHRvcENhbmRpZGF0ZS5yZWFkYWJpbGl0eS5jb250ZW50U2NvcmU7XG4gICAgICAgIC8vIFRoZSBzY29yZXMgc2hvdWxkbid0IGdldCB0b28gbG93LlxuICAgICAgICB2YXIgc2NvcmVUaHJlc2hvbGQgPSBsYXN0U2NvcmUgLyAzO1xuICAgICAgICB3aGlsZSAocGFyZW50T2ZUb3BDYW5kaWRhdGUudGFnTmFtZSAhPT0gXCJCT0RZXCIpIHtcbiAgICAgICAgICBpZiAoIXBhcmVudE9mVG9wQ2FuZGlkYXRlLnJlYWRhYmlsaXR5KSB7XG4gICAgICAgICAgICBwYXJlbnRPZlRvcENhbmRpZGF0ZSA9IHBhcmVudE9mVG9wQ2FuZGlkYXRlLnBhcmVudE5vZGU7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIHBhcmVudFNjb3JlID0gcGFyZW50T2ZUb3BDYW5kaWRhdGUucmVhZGFiaWxpdHkuY29udGVudFNjb3JlO1xuICAgICAgICAgIGlmIChwYXJlbnRTY29yZSA8IHNjb3JlVGhyZXNob2xkKVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgaWYgKHBhcmVudFNjb3JlID4gbGFzdFNjb3JlKSB7XG4gICAgICAgICAgICAvLyBBbHJpZ2h0ISBXZSBmb3VuZCBhIGJldHRlciBwYXJlbnQgdG8gdXNlLlxuICAgICAgICAgICAgdG9wQ2FuZGlkYXRlID0gcGFyZW50T2ZUb3BDYW5kaWRhdGU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgbGFzdFNjb3JlID0gcGFyZW50T2ZUb3BDYW5kaWRhdGUucmVhZGFiaWxpdHkuY29udGVudFNjb3JlO1xuICAgICAgICAgIHBhcmVudE9mVG9wQ2FuZGlkYXRlID0gcGFyZW50T2ZUb3BDYW5kaWRhdGUucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRoZSB0b3AgY2FuZGlkYXRlIGlzIHRoZSBvbmx5IGNoaWxkLCB1c2UgcGFyZW50IGluc3RlYWQuIFRoaXMgd2lsbCBoZWxwIHNpYmxpbmdcbiAgICAgICAgLy8gam9pbmluZyBsb2dpYyB3aGVuIGFkamFjZW50IGNvbnRlbnQgaXMgYWN0dWFsbHkgbG9jYXRlZCBpbiBwYXJlbnQncyBzaWJsaW5nIG5vZGUuXG4gICAgICAgIHBhcmVudE9mVG9wQ2FuZGlkYXRlID0gdG9wQ2FuZGlkYXRlLnBhcmVudE5vZGU7XG4gICAgICAgIHdoaWxlIChwYXJlbnRPZlRvcENhbmRpZGF0ZS50YWdOYW1lICE9IFwiQk9EWVwiICYmIHBhcmVudE9mVG9wQ2FuZGlkYXRlLmNoaWxkcmVuLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgdG9wQ2FuZGlkYXRlID0gcGFyZW50T2ZUb3BDYW5kaWRhdGU7XG4gICAgICAgICAgcGFyZW50T2ZUb3BDYW5kaWRhdGUgPSB0b3BDYW5kaWRhdGUucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRvcENhbmRpZGF0ZS5yZWFkYWJpbGl0eSkge1xuICAgICAgICAgIHRoaXMuX2luaXRpYWxpemVOb2RlKHRvcENhbmRpZGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gTm93IHRoYXQgd2UgaGF2ZSB0aGUgdG9wIGNhbmRpZGF0ZSwgbG9vayB0aHJvdWdoIGl0cyBzaWJsaW5ncyBmb3IgY29udGVudFxuICAgICAgLy8gdGhhdCBtaWdodCBhbHNvIGJlIHJlbGF0ZWQuIFRoaW5ncyBsaWtlIHByZWFtYmxlcywgY29udGVudCBzcGxpdCBieSBhZHNcbiAgICAgIC8vIHRoYXQgd2UgcmVtb3ZlZCwgZXRjLlxuICAgICAgdmFyIGFydGljbGVDb250ZW50ID0gZG9jLmNyZWF0ZUVsZW1lbnQoXCJESVZcIik7XG4gICAgICBpZiAoaXNQYWdpbmcpXG4gICAgICAgIGFydGljbGVDb250ZW50LmlkID0gXCJyZWFkYWJpbGl0eS1jb250ZW50XCI7XG5cbiAgICAgIHZhciBzaWJsaW5nU2NvcmVUaHJlc2hvbGQgPSBNYXRoLm1heCgxMCwgdG9wQ2FuZGlkYXRlLnJlYWRhYmlsaXR5LmNvbnRlbnRTY29yZSAqIDAuMik7XG4gICAgICAvLyBLZWVwIHBvdGVudGlhbCB0b3AgY2FuZGlkYXRlJ3MgcGFyZW50IG5vZGUgdG8gdHJ5IHRvIGdldCB0ZXh0IGRpcmVjdGlvbiBvZiBpdCBsYXRlci5cbiAgICAgIHBhcmVudE9mVG9wQ2FuZGlkYXRlID0gdG9wQ2FuZGlkYXRlLnBhcmVudE5vZGU7XG4gICAgICB2YXIgc2libGluZ3MgPSBwYXJlbnRPZlRvcENhbmRpZGF0ZS5jaGlsZHJlbjtcblxuICAgICAgZm9yICh2YXIgcyA9IDAsIHNsID0gc2libGluZ3MubGVuZ3RoOyBzIDwgc2w7IHMrKykge1xuICAgICAgICB2YXIgc2libGluZyA9IHNpYmxpbmdzW3NdO1xuICAgICAgICB2YXIgYXBwZW5kID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5sb2coXCJMb29raW5nIGF0IHNpYmxpbmcgbm9kZTpcIiwgc2libGluZywgc2libGluZy5yZWFkYWJpbGl0eSA/IChcIndpdGggc2NvcmUgXCIgKyBzaWJsaW5nLnJlYWRhYmlsaXR5LmNvbnRlbnRTY29yZSkgOiBcIlwiKTtcbiAgICAgICAgdGhpcy5sb2coXCJTaWJsaW5nIGhhcyBzY29yZVwiLCBzaWJsaW5nLnJlYWRhYmlsaXR5ID8gc2libGluZy5yZWFkYWJpbGl0eS5jb250ZW50U2NvcmUgOiBcIlVua25vd25cIik7XG5cbiAgICAgICAgaWYgKHNpYmxpbmcgPT09IHRvcENhbmRpZGF0ZSkge1xuICAgICAgICAgIGFwcGVuZCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIGNvbnRlbnRCb251cyA9IDA7XG5cbiAgICAgICAgICAvLyBHaXZlIGEgYm9udXMgaWYgc2libGluZyBub2RlcyBhbmQgdG9wIGNhbmRpZGF0ZXMgaGF2ZSB0aGUgZXhhbXBsZSBzYW1lIGNsYXNzbmFtZVxuICAgICAgICAgIGlmIChzaWJsaW5nLmNsYXNzTmFtZSA9PT0gdG9wQ2FuZGlkYXRlLmNsYXNzTmFtZSAmJiB0b3BDYW5kaWRhdGUuY2xhc3NOYW1lICE9PSBcIlwiKVxuICAgICAgICAgICAgY29udGVudEJvbnVzICs9IHRvcENhbmRpZGF0ZS5yZWFkYWJpbGl0eS5jb250ZW50U2NvcmUgKiAwLjI7XG5cbiAgICAgICAgICBpZiAoc2libGluZy5yZWFkYWJpbGl0eSAmJlxuICAgICAgICAgICAgICAoKHNpYmxpbmcucmVhZGFiaWxpdHkuY29udGVudFNjb3JlICsgY29udGVudEJvbnVzKSA+PSBzaWJsaW5nU2NvcmVUaHJlc2hvbGQpKSB7XG4gICAgICAgICAgICBhcHBlbmQgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2libGluZy5ub2RlTmFtZSA9PT0gXCJQXCIpIHtcbiAgICAgICAgICAgIHZhciBsaW5rRGVuc2l0eSA9IHRoaXMuX2dldExpbmtEZW5zaXR5KHNpYmxpbmcpO1xuICAgICAgICAgICAgdmFyIG5vZGVDb250ZW50ID0gdGhpcy5fZ2V0SW5uZXJUZXh0KHNpYmxpbmcpO1xuICAgICAgICAgICAgdmFyIG5vZGVMZW5ndGggPSBub2RlQ29udGVudC5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmIChub2RlTGVuZ3RoID4gODAgJiYgbGlua0RlbnNpdHkgPCAwLjI1KSB7XG4gICAgICAgICAgICAgIGFwcGVuZCA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGVMZW5ndGggPCA4MCAmJiBub2RlTGVuZ3RoID4gMCAmJiBsaW5rRGVuc2l0eSA9PT0gMCAmJlxuICAgICAgICAgICAgICAgICAgICAgICBub2RlQ29udGVudC5zZWFyY2goL1xcLiggfCQpLykgIT09IC0xKSB7XG4gICAgICAgICAgICAgIGFwcGVuZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFwcGVuZCkge1xuICAgICAgICAgIHRoaXMubG9nKFwiQXBwZW5kaW5nIG5vZGU6XCIsIHNpYmxpbmcpO1xuXG4gICAgICAgICAgaWYgKHRoaXMuQUxURVJfVE9fRElWX0VYQ0VQVElPTlMuaW5kZXhPZihzaWJsaW5nLm5vZGVOYW1lKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIC8vIFdlIGhhdmUgYSBub2RlIHRoYXQgaXNuJ3QgYSBjb21tb24gYmxvY2sgbGV2ZWwgZWxlbWVudCwgbGlrZSBhIGZvcm0gb3IgdGQgdGFnLlxuICAgICAgICAgICAgLy8gVHVybiBpdCBpbnRvIGEgZGl2IHNvIGl0IGRvZXNuJ3QgZ2V0IGZpbHRlcmVkIG91dCBsYXRlciBieSBhY2NpZGVudC5cbiAgICAgICAgICAgIHRoaXMubG9nKFwiQWx0ZXJpbmcgc2libGluZzpcIiwgc2libGluZywgXCJ0byBkaXYuXCIpO1xuXG4gICAgICAgICAgICBzaWJsaW5nID0gdGhpcy5fc2V0Tm9kZVRhZyhzaWJsaW5nLCBcIkRJVlwiKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBhcnRpY2xlQ29udGVudC5hcHBlbmRDaGlsZChzaWJsaW5nKTtcbiAgICAgICAgICAvLyBzaWJsaW5ncyBpcyBhIHJlZmVyZW5jZSB0byB0aGUgY2hpbGRyZW4gYXJyYXksIGFuZFxuICAgICAgICAgIC8vIHNpYmxpbmcgaXMgcmVtb3ZlZCBmcm9tIHRoZSBhcnJheSB3aGVuIHdlIGNhbGwgYXBwZW5kQ2hpbGQoKS5cbiAgICAgICAgICAvLyBBcyBhIHJlc3VsdCwgd2UgbXVzdCByZXZpc2l0IHRoaXMgaW5kZXggc2luY2UgdGhlIG5vZGVzXG4gICAgICAgICAgLy8gaGF2ZSBiZWVuIHNoaWZ0ZWQuXG4gICAgICAgICAgcyAtPSAxO1xuICAgICAgICAgIHNsIC09IDE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2RlYnVnKVxuICAgICAgICB0aGlzLmxvZyhcIkFydGljbGUgY29udGVudCBwcmUtcHJlcDogXCIgKyBhcnRpY2xlQ29udGVudC5pbm5lckhUTUwpO1xuICAgICAgLy8gU28gd2UgaGF2ZSBhbGwgb2YgdGhlIGNvbnRlbnQgdGhhdCB3ZSBuZWVkLiBOb3cgd2UgY2xlYW4gaXQgdXAgZm9yIHByZXNlbnRhdGlvbi5cbiAgICAgIHRoaXMuX3ByZXBBcnRpY2xlKGFydGljbGVDb250ZW50KTtcbiAgICAgIGlmICh0aGlzLl9kZWJ1ZylcbiAgICAgICAgdGhpcy5sb2coXCJBcnRpY2xlIGNvbnRlbnQgcG9zdC1wcmVwOiBcIiArIGFydGljbGVDb250ZW50LmlubmVySFRNTCk7XG5cbiAgICAgIGlmIChuZWVkZWRUb0NyZWF0ZVRvcENhbmRpZGF0ZSkge1xuICAgICAgICAvLyBXZSBhbHJlYWR5IGNyZWF0ZWQgYSBmYWtlIGRpdiB0aGluZywgYW5kIHRoZXJlIHdvdWxkbid0IGhhdmUgYmVlbiBhbnkgc2libGluZ3MgbGVmdFxuICAgICAgICAvLyBmb3IgdGhlIHByZXZpb3VzIGxvb3AsIHNvIHRoZXJlJ3Mgbm8gcG9pbnQgdHJ5aW5nIHRvIGNyZWF0ZSBhIG5ldyBkaXYsIGFuZCB0aGVuXG4gICAgICAgIC8vIG1vdmUgYWxsIHRoZSBjaGlsZHJlbiBvdmVyLiBKdXN0IGFzc2lnbiBJRHMgYW5kIGNsYXNzIG5hbWVzIGhlcmUuIE5vIG5lZWQgdG8gYXBwZW5kXG4gICAgICAgIC8vIGJlY2F1c2UgdGhhdCBhbHJlYWR5IGhhcHBlbmVkIGFueXdheS5cbiAgICAgICAgdG9wQ2FuZGlkYXRlLmlkID0gXCJyZWFkYWJpbGl0eS1wYWdlLTFcIjtcbiAgICAgICAgdG9wQ2FuZGlkYXRlLmNsYXNzTmFtZSA9IFwicGFnZVwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGRpdiA9IGRvYy5jcmVhdGVFbGVtZW50KFwiRElWXCIpO1xuICAgICAgICBkaXYuaWQgPSBcInJlYWRhYmlsaXR5LXBhZ2UtMVwiO1xuICAgICAgICBkaXYuY2xhc3NOYW1lID0gXCJwYWdlXCI7XG4gICAgICAgIHZhciBjaGlsZHJlbiA9IGFydGljbGVDb250ZW50LmNoaWxkTm9kZXM7XG4gICAgICAgIHdoaWxlIChjaGlsZHJlbi5sZW5ndGgpIHtcbiAgICAgICAgICBkaXYuYXBwZW5kQ2hpbGQoY2hpbGRyZW5bMF0pO1xuICAgICAgICB9XG4gICAgICAgIGFydGljbGVDb250ZW50LmFwcGVuZENoaWxkKGRpdik7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9kZWJ1ZylcbiAgICAgICAgdGhpcy5sb2coXCJBcnRpY2xlIGNvbnRlbnQgYWZ0ZXIgcGFnaW5nOiBcIiArIGFydGljbGVDb250ZW50LmlubmVySFRNTCk7XG5cbiAgICAgIHZhciBwYXJzZVN1Y2Nlc3NmdWwgPSB0cnVlO1xuXG4gICAgICAvLyBOb3cgdGhhdCB3ZSd2ZSBnb25lIHRocm91Z2ggdGhlIGZ1bGwgYWxnb3JpdGhtLCBjaGVjayB0byBzZWUgaWZcbiAgICAgIC8vIHdlIGdvdCBhbnkgbWVhbmluZ2Z1bCBjb250ZW50LiBJZiB3ZSBkaWRuJ3QsIHdlIG1heSBuZWVkIHRvIHJlLXJ1blxuICAgICAgLy8gZ3JhYkFydGljbGUgd2l0aCBkaWZmZXJlbnQgZmxhZ3Mgc2V0LiBUaGlzIGdpdmVzIHVzIGEgaGlnaGVyIGxpa2VsaWhvb2Qgb2ZcbiAgICAgIC8vIGZpbmRpbmcgdGhlIGNvbnRlbnQsIGFuZCB0aGUgc2lldmUgYXBwcm9hY2ggZ2l2ZXMgdXMgYSBoaWdoZXIgbGlrZWxpaG9vZCBvZlxuICAgICAgLy8gZmluZGluZyB0aGUgLXJpZ2h0LSBjb250ZW50LlxuICAgICAgdmFyIHRleHRMZW5ndGggPSB0aGlzLl9nZXRJbm5lclRleHQoYXJ0aWNsZUNvbnRlbnQsIHRydWUpLmxlbmd0aDtcbiAgICAgIGlmICh0ZXh0TGVuZ3RoIDwgdGhpcy5fY2hhclRocmVzaG9sZCkge1xuICAgICAgICBwYXJzZVN1Y2Nlc3NmdWwgPSBmYWxzZTtcbiAgICAgICAgcGFnZS5pbm5lckhUTUwgPSBwYWdlQ2FjaGVIdG1sO1xuXG4gICAgICAgIGlmICh0aGlzLl9mbGFnSXNBY3RpdmUodGhpcy5GTEFHX1NUUklQX1VOTElLRUxZUykpIHtcbiAgICAgICAgICB0aGlzLl9yZW1vdmVGbGFnKHRoaXMuRkxBR19TVFJJUF9VTkxJS0VMWVMpO1xuICAgICAgICAgIHRoaXMuX2F0dGVtcHRzLnB1c2goe2FydGljbGVDb250ZW50OiBhcnRpY2xlQ29udGVudCwgdGV4dExlbmd0aDogdGV4dExlbmd0aH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2ZsYWdJc0FjdGl2ZSh0aGlzLkZMQUdfV0VJR0hUX0NMQVNTRVMpKSB7XG4gICAgICAgICAgdGhpcy5fcmVtb3ZlRmxhZyh0aGlzLkZMQUdfV0VJR0hUX0NMQVNTRVMpO1xuICAgICAgICAgIHRoaXMuX2F0dGVtcHRzLnB1c2goe2FydGljbGVDb250ZW50OiBhcnRpY2xlQ29udGVudCwgdGV4dExlbmd0aDogdGV4dExlbmd0aH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2ZsYWdJc0FjdGl2ZSh0aGlzLkZMQUdfQ0xFQU5fQ09ORElUSU9OQUxMWSkpIHtcbiAgICAgICAgICB0aGlzLl9yZW1vdmVGbGFnKHRoaXMuRkxBR19DTEVBTl9DT05ESVRJT05BTExZKTtcbiAgICAgICAgICB0aGlzLl9hdHRlbXB0cy5wdXNoKHthcnRpY2xlQ29udGVudDogYXJ0aWNsZUNvbnRlbnQsIHRleHRMZW5ndGg6IHRleHRMZW5ndGh9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9hdHRlbXB0cy5wdXNoKHthcnRpY2xlQ29udGVudDogYXJ0aWNsZUNvbnRlbnQsIHRleHRMZW5ndGg6IHRleHRMZW5ndGh9KTtcbiAgICAgICAgICAvLyBObyBsdWNrIGFmdGVyIHJlbW92aW5nIGZsYWdzLCBqdXN0IHJldHVybiB0aGUgbG9uZ2VzdCB0ZXh0IHdlIGZvdW5kIGR1cmluZyB0aGUgZGlmZmVyZW50IGxvb3BzXG4gICAgICAgICAgdGhpcy5fYXR0ZW1wdHMuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGEudGV4dExlbmd0aCA8IGIudGV4dExlbmd0aDtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIEJ1dCBmaXJzdCBjaGVjayBpZiB3ZSBhY3R1YWxseSBoYXZlIHNvbWV0aGluZ1xuICAgICAgICAgIGlmICghdGhpcy5fYXR0ZW1wdHNbMF0udGV4dExlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYXJ0aWNsZUNvbnRlbnQgPSB0aGlzLl9hdHRlbXB0c1swXS5hcnRpY2xlQ29udGVudDtcbiAgICAgICAgICBwYXJzZVN1Y2Nlc3NmdWwgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXJzZVN1Y2Nlc3NmdWwpIHtcbiAgICAgICAgLy8gRmluZCBvdXQgdGV4dCBkaXJlY3Rpb24gZnJvbSBhbmNlc3RvcnMgb2YgZmluYWwgdG9wIGNhbmRpZGF0ZS5cbiAgICAgICAgdmFyIGFuY2VzdG9ycyA9IFtwYXJlbnRPZlRvcENhbmRpZGF0ZSwgdG9wQ2FuZGlkYXRlXS5jb25jYXQodGhpcy5fZ2V0Tm9kZUFuY2VzdG9ycyhwYXJlbnRPZlRvcENhbmRpZGF0ZSkpO1xuICAgICAgICB0aGlzLl9zb21lTm9kZShhbmNlc3RvcnMsIGZ1bmN0aW9uKGFuY2VzdG9yKSB7XG4gICAgICAgICAgaWYgKCFhbmNlc3Rvci50YWdOYW1lKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIHZhciBhcnRpY2xlRGlyID0gYW5jZXN0b3IuZ2V0QXR0cmlidXRlKFwiZGlyXCIpO1xuICAgICAgICAgIGlmIChhcnRpY2xlRGlyKSB7XG4gICAgICAgICAgICB0aGlzLl9hcnRpY2xlRGlyID0gYXJ0aWNsZURpcjtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYXJ0aWNsZUNvbnRlbnQ7XG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIC8qKlxuICAgKiBDaGVjayB3aGV0aGVyIHRoZSBpbnB1dCBzdHJpbmcgY291bGQgYmUgYSBieWxpbmUuXG4gICAqIFRoaXMgdmVyaWZpZXMgdGhhdCB0aGUgaW5wdXQgaXMgYSBzdHJpbmcsIGFuZCB0aGF0IHRoZSBsZW5ndGhcbiAgICogaXMgbGVzcyB0aGFuIDEwMCBjaGFycy5cbiAgICpcbiAgICogQHBhcmFtIHBvc3NpYmxlQnlsaW5lIHtzdHJpbmd9IC0gYSBzdHJpbmcgdG8gY2hlY2sgd2hldGhlciBpdHMgYSBieWxpbmUuXG4gICAqIEByZXR1cm4gQm9vbGVhbiAtIHdoZXRoZXIgdGhlIGlucHV0IHN0cmluZyBpcyBhIGJ5bGluZS5cbiAgICovXG4gIF9pc1ZhbGlkQnlsaW5lOiBmdW5jdGlvbihieWxpbmUpIHtcbiAgICBpZiAodHlwZW9mIGJ5bGluZSA9PSBcInN0cmluZ1wiIHx8IGJ5bGluZSBpbnN0YW5jZW9mIFN0cmluZykge1xuICAgICAgYnlsaW5lID0gYnlsaW5lLnRyaW0oKTtcbiAgICAgIHJldHVybiAoYnlsaW5lLmxlbmd0aCA+IDApICYmIChieWxpbmUubGVuZ3RoIDwgMTAwKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBBdHRlbXB0cyB0byBnZXQgZXhjZXJwdCBhbmQgYnlsaW5lIG1ldGFkYXRhIGZvciB0aGUgYXJ0aWNsZS5cbiAgICpcbiAgICogQHJldHVybiBPYmplY3Qgd2l0aCBvcHRpb25hbCBcImV4Y2VycHRcIiBhbmQgXCJieWxpbmVcIiBwcm9wZXJ0aWVzXG4gICAqL1xuICBfZ2V0QXJ0aWNsZU1ldGFkYXRhOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbWV0YWRhdGEgPSB7fTtcbiAgICB2YXIgdmFsdWVzID0ge307XG4gICAgdmFyIG1ldGFFbGVtZW50cyA9IHRoaXMuX2RvYy5nZXRFbGVtZW50c0J5VGFnTmFtZShcIm1ldGFcIik7XG5cbiAgICAvLyBNYXRjaCBcImRlc2NyaXB0aW9uXCIsIG9yIFR3aXR0ZXIncyBcInR3aXR0ZXI6ZGVzY3JpcHRpb25cIiAoQ2FyZHMpXG4gICAgLy8gaW4gbmFtZSBhdHRyaWJ1dGUuXG4gICAgdmFyIG5hbWVQYXR0ZXJuID0gL15cXHMqKCh0d2l0dGVyKVxccyo6XFxzKik/KGRlc2NyaXB0aW9ufHRpdGxlKVxccyokL2dpO1xuXG4gICAgLy8gTWF0Y2ggRmFjZWJvb2sncyBPcGVuIEdyYXBoIHRpdGxlICYgZGVzY3JpcHRpb24gcHJvcGVydGllcy5cbiAgICB2YXIgcHJvcGVydHlQYXR0ZXJuID0gL15cXHMqb2dcXHMqOlxccyooZGVzY3JpcHRpb258dGl0bGUpXFxzKiQvZ2k7XG5cbiAgICAvLyBGaW5kIGRlc2NyaXB0aW9uIHRhZ3MuXG4gICAgdGhpcy5fZm9yRWFjaE5vZGUobWV0YUVsZW1lbnRzLCBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICB2YXIgZWxlbWVudE5hbWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcIm5hbWVcIik7XG4gICAgICB2YXIgZWxlbWVudFByb3BlcnR5ID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJwcm9wZXJ0eVwiKTtcblxuICAgICAgaWYgKFtlbGVtZW50TmFtZSwgZWxlbWVudFByb3BlcnR5XS5pbmRleE9mKFwiYXV0aG9yXCIpICE9PSAtMSkge1xuICAgICAgICBtZXRhZGF0YS5ieWxpbmUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImNvbnRlbnRcIik7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIG5hbWUgPSBudWxsO1xuICAgICAgaWYgKG5hbWVQYXR0ZXJuLnRlc3QoZWxlbWVudE5hbWUpKSB7XG4gICAgICAgIG5hbWUgPSBlbGVtZW50TmFtZTtcbiAgICAgIH0gZWxzZSBpZiAocHJvcGVydHlQYXR0ZXJuLnRlc3QoZWxlbWVudFByb3BlcnR5KSkge1xuICAgICAgICBuYW1lID0gZWxlbWVudFByb3BlcnR5O1xuICAgICAgfVxuXG4gICAgICBpZiAobmFtZSkge1xuICAgICAgICB2YXIgY29udGVudCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiY29udGVudFwiKTtcbiAgICAgICAgaWYgKGNvbnRlbnQpIHtcbiAgICAgICAgICAvLyBDb252ZXJ0IHRvIGxvd2VyY2FzZSBhbmQgcmVtb3ZlIGFueSB3aGl0ZXNwYWNlXG4gICAgICAgICAgLy8gc28gd2UgY2FuIG1hdGNoIGJlbG93LlxuICAgICAgICAgIG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvXFxzL2csIFwiXCIpO1xuICAgICAgICAgIHZhbHVlc1tuYW1lXSA9IGNvbnRlbnQudHJpbSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoXCJkZXNjcmlwdGlvblwiIGluIHZhbHVlcykge1xuICAgICAgbWV0YWRhdGEuZXhjZXJwdCA9IHZhbHVlc1tcImRlc2NyaXB0aW9uXCJdO1xuICAgIH0gZWxzZSBpZiAoXCJvZzpkZXNjcmlwdGlvblwiIGluIHZhbHVlcykge1xuICAgICAgLy8gVXNlIGZhY2Vib29rIG9wZW4gZ3JhcGggZGVzY3JpcHRpb24uXG4gICAgICBtZXRhZGF0YS5leGNlcnB0ID0gdmFsdWVzW1wib2c6ZGVzY3JpcHRpb25cIl07XG4gICAgfSBlbHNlIGlmIChcInR3aXR0ZXI6ZGVzY3JpcHRpb25cIiBpbiB2YWx1ZXMpIHtcbiAgICAgIC8vIFVzZSB0d2l0dGVyIGNhcmRzIGRlc2NyaXB0aW9uLlxuICAgICAgbWV0YWRhdGEuZXhjZXJwdCA9IHZhbHVlc1tcInR3aXR0ZXI6ZGVzY3JpcHRpb25cIl07XG4gICAgfVxuXG4gICAgbWV0YWRhdGEudGl0bGUgPSB0aGlzLl9nZXRBcnRpY2xlVGl0bGUoKTtcbiAgICBpZiAoIW1ldGFkYXRhLnRpdGxlKSB7XG4gICAgICBpZiAoXCJvZzp0aXRsZVwiIGluIHZhbHVlcykge1xuICAgICAgICAvLyBVc2UgZmFjZWJvb2sgb3BlbiBncmFwaCB0aXRsZS5cbiAgICAgICAgbWV0YWRhdGEudGl0bGUgPSB2YWx1ZXNbXCJvZzp0aXRsZVwiXTtcbiAgICAgIH0gZWxzZSBpZiAoXCJ0d2l0dGVyOnRpdGxlXCIgaW4gdmFsdWVzKSB7XG4gICAgICAgIC8vIFVzZSB0d2l0dGVyIGNhcmRzIHRpdGxlLlxuICAgICAgICBtZXRhZGF0YS50aXRsZSA9IHZhbHVlc1tcInR3aXR0ZXI6dGl0bGVcIl07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1ldGFkYXRhO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHNjcmlwdCB0YWdzIGZyb20gdGhlIGRvY3VtZW50LlxuICAgKlxuICAgKiBAcGFyYW0gRWxlbWVudFxuICAqKi9cbiAgX3JlbW92ZVNjcmlwdHM6IGZ1bmN0aW9uKGRvYykge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzKGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKSwgZnVuY3Rpb24oc2NyaXB0Tm9kZSkge1xuICAgICAgc2NyaXB0Tm9kZS5ub2RlVmFsdWUgPSBcIlwiO1xuICAgICAgc2NyaXB0Tm9kZS5yZW1vdmVBdHRyaWJ1dGUoXCJzcmNcIik7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlcyhkb2MuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJub3NjcmlwdFwiKSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoaXMgbm9kZSBoYXMgb25seSB3aGl0ZXNwYWNlIGFuZCBhIHNpbmdsZSBlbGVtZW50IHdpdGggZ2l2ZW4gdGFnXG4gICAqIFJldHVybnMgZmFsc2UgaWYgdGhlIERJViBub2RlIGNvbnRhaW5zIG5vbi1lbXB0eSB0ZXh0IG5vZGVzXG4gICAqIG9yIGlmIGl0IGNvbnRhaW5zIG5vIGVsZW1lbnQgd2l0aCBnaXZlbiB0YWcgb3IgbW9yZSB0aGFuIDEgZWxlbWVudC5cbiAgICpcbiAgICogQHBhcmFtIEVsZW1lbnRcbiAgICogQHBhcmFtIHN0cmluZyB0YWcgb2YgY2hpbGQgZWxlbWVudFxuICAqKi9cbiAgX2hhc1NpbmdsZVRhZ0luc2lkZUVsZW1lbnQ6IGZ1bmN0aW9uKGVsZW1lbnQsIHRhZykge1xuICAgIC8vIFRoZXJlIHNob3VsZCBiZSBleGFjdGx5IDEgZWxlbWVudCBjaGlsZCB3aXRoIGdpdmVuIHRhZ1xuICAgIGlmIChlbGVtZW50LmNoaWxkcmVuLmxlbmd0aCAhPSAxIHx8IGVsZW1lbnQuY2hpbGRyZW5bMF0udGFnTmFtZSAhPT0gdGFnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gQW5kIHRoZXJlIHNob3VsZCBiZSBubyB0ZXh0IG5vZGVzIHdpdGggcmVhbCBjb250ZW50XG4gICAgcmV0dXJuICF0aGlzLl9zb21lTm9kZShlbGVtZW50LmNoaWxkTm9kZXMsIGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgIHJldHVybiBub2RlLm5vZGVUeXBlID09PSB0aGlzLlRFWFRfTk9ERSAmJlxuICAgICAgICAgICAgIHRoaXMuUkVHRVhQUy5oYXNDb250ZW50LnRlc3Qobm9kZS50ZXh0Q29udGVudCk7XG4gICAgfSk7XG4gIH0sXG5cbiAgX2lzRWxlbWVudFdpdGhvdXRDb250ZW50OiBmdW5jdGlvbihub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUubm9kZVR5cGUgPT09IHRoaXMuRUxFTUVOVF9OT0RFICYmXG4gICAgICBub2RlLnRleHRDb250ZW50LnRyaW0oKS5sZW5ndGggPT0gMCAmJlxuICAgICAgKG5vZGUuY2hpbGRyZW4ubGVuZ3RoID09IDAgfHxcbiAgICAgICBub2RlLmNoaWxkcmVuLmxlbmd0aCA9PSBub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYnJcIikubGVuZ3RoICsgbm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhyXCIpLmxlbmd0aCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIERldGVybWluZSB3aGV0aGVyIGVsZW1lbnQgaGFzIGFueSBjaGlsZHJlbiBibG9jayBsZXZlbCBlbGVtZW50cy5cbiAgICpcbiAgICogQHBhcmFtIEVsZW1lbnRcbiAgICovXG4gIF9oYXNDaGlsZEJsb2NrRWxlbWVudDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gdGhpcy5fc29tZU5vZGUoZWxlbWVudC5jaGlsZE5vZGVzLCBmdW5jdGlvbihub2RlKSB7XG4gICAgICByZXR1cm4gdGhpcy5ESVZfVE9fUF9FTEVNUy5pbmRleE9mKG5vZGUudGFnTmFtZSkgIT09IC0xIHx8XG4gICAgICAgICAgICAgdGhpcy5faGFzQ2hpbGRCbG9ja0VsZW1lbnQobm9kZSk7XG4gICAgfSk7XG4gIH0sXG5cbiAgLyoqKlxuICAgKiBEZXRlcm1pbmUgaWYgYSBub2RlIHF1YWxpZmllcyBhcyBwaHJhc2luZyBjb250ZW50LlxuICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9HdWlkZS9IVE1ML0NvbnRlbnRfY2F0ZWdvcmllcyNQaHJhc2luZ19jb250ZW50XG4gICoqL1xuICBfaXNQaHJhc2luZ0NvbnRlbnQ6IGZ1bmN0aW9uKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5ub2RlVHlwZSA9PT0gdGhpcy5URVhUX05PREUgfHwgdGhpcy5QSFJBU0lOR19FTEVNUy5pbmRleE9mKG5vZGUudGFnTmFtZSkgIT09IC0xIHx8XG4gICAgICAoKG5vZGUudGFnTmFtZSA9PT0gXCJBXCIgfHwgbm9kZS50YWdOYW1lID09PSBcIkRFTFwiIHx8IG5vZGUudGFnTmFtZSA9PT0gXCJJTlNcIikgJiZcbiAgICAgICAgdGhpcy5fZXZlcnlOb2RlKG5vZGUuY2hpbGROb2RlcywgdGhpcy5faXNQaHJhc2luZ0NvbnRlbnQpKTtcbiAgfSxcblxuICBfaXNXaGl0ZXNwYWNlOiBmdW5jdGlvbihub2RlKSB7XG4gICAgcmV0dXJuIChub2RlLm5vZGVUeXBlID09PSB0aGlzLlRFWFRfTk9ERSAmJiBub2RlLnRleHRDb250ZW50LnRyaW0oKS5sZW5ndGggPT09IDApIHx8XG4gICAgICAgICAgIChub2RlLm5vZGVUeXBlID09PSB0aGlzLkVMRU1FTlRfTk9ERSAmJiBub2RlLnRhZ05hbWUgPT09IFwiQlJcIik7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldCB0aGUgaW5uZXIgdGV4dCBvZiBhIG5vZGUgLSBjcm9zcyBicm93c2VyIGNvbXBhdGlibHkuXG4gICAqIFRoaXMgYWxzbyBzdHJpcHMgb3V0IGFueSBleGNlc3Mgd2hpdGVzcGFjZSB0byBiZSBmb3VuZC5cbiAgICpcbiAgICogQHBhcmFtIEVsZW1lbnRcbiAgICogQHBhcmFtIEJvb2xlYW4gbm9ybWFsaXplU3BhY2VzIChkZWZhdWx0OiB0cnVlKVxuICAgKiBAcmV0dXJuIHN0cmluZ1xuICAqKi9cbiAgX2dldElubmVyVGV4dDogZnVuY3Rpb24oZSwgbm9ybWFsaXplU3BhY2VzKSB7XG4gICAgbm9ybWFsaXplU3BhY2VzID0gKHR5cGVvZiBub3JtYWxpemVTcGFjZXMgPT09IFwidW5kZWZpbmVkXCIpID8gdHJ1ZSA6IG5vcm1hbGl6ZVNwYWNlcztcbiAgICB2YXIgdGV4dENvbnRlbnQgPSBlLnRleHRDb250ZW50LnRyaW0oKTtcblxuICAgIGlmIChub3JtYWxpemVTcGFjZXMpIHtcbiAgICAgIHJldHVybiB0ZXh0Q29udGVudC5yZXBsYWNlKHRoaXMuUkVHRVhQUy5ub3JtYWxpemUsIFwiIFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHRleHRDb250ZW50O1xuICB9LFxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIG51bWJlciBvZiB0aW1lcyBhIHN0cmluZyBzIGFwcGVhcnMgaW4gdGhlIG5vZGUgZS5cbiAgICpcbiAgICogQHBhcmFtIEVsZW1lbnRcbiAgICogQHBhcmFtIHN0cmluZyAtIHdoYXQgdG8gc3BsaXQgb24uIERlZmF1bHQgaXMgXCIsXCJcbiAgICogQHJldHVybiBudW1iZXIgKGludGVnZXIpXG4gICoqL1xuICBfZ2V0Q2hhckNvdW50OiBmdW5jdGlvbihlLCBzKSB7XG4gICAgcyA9IHMgfHwgXCIsXCI7XG4gICAgcmV0dXJuIHRoaXMuX2dldElubmVyVGV4dChlKS5zcGxpdChzKS5sZW5ndGggLSAxO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZW1vdmUgdGhlIHN0eWxlIGF0dHJpYnV0ZSBvbiBldmVyeSBlIGFuZCB1bmRlci5cbiAgICogVE9ETzogVGVzdCBpZiBnZXRFbGVtZW50c0J5VGFnTmFtZSgqKSBpcyBmYXN0ZXIuXG4gICAqXG4gICAqIEBwYXJhbSBFbGVtZW50XG4gICAqIEByZXR1cm4gdm9pZFxuICAqKi9cbiAgX2NsZWFuU3R5bGVzOiBmdW5jdGlvbihlKSB7XG4gICAgaWYgKCFlIHx8IGUudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSBcInN2Z1wiKVxuICAgICAgcmV0dXJuO1xuXG4gICAgLy8gUmVtb3ZlIGBzdHlsZWAgYW5kIGRlcHJlY2F0ZWQgcHJlc2VudGF0aW9uYWwgYXR0cmlidXRlc1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5QUkVTRU5UQVRJT05BTF9BVFRSSUJVVEVTLmxlbmd0aDsgaSsrKSB7XG4gICAgICBlLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLlBSRVNFTlRBVElPTkFMX0FUVFJJQlVURVNbaV0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLkRFUFJFQ0FURURfU0laRV9BVFRSSUJVVEVfRUxFTVMuaW5kZXhPZihlLnRhZ05hbWUpICE9PSAtMSkge1xuICAgICAgZS5yZW1vdmVBdHRyaWJ1dGUoXCJ3aWR0aFwiKTtcbiAgICAgIGUucmVtb3ZlQXR0cmlidXRlKFwiaGVpZ2h0XCIpO1xuICAgIH1cblxuICAgIHZhciBjdXIgPSBlLmZpcnN0RWxlbWVudENoaWxkO1xuICAgIHdoaWxlIChjdXIgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuX2NsZWFuU3R5bGVzKGN1cik7XG4gICAgICBjdXIgPSBjdXIubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogR2V0IHRoZSBkZW5zaXR5IG9mIGxpbmtzIGFzIGEgcGVyY2VudGFnZSBvZiB0aGUgY29udGVudFxuICAgKiBUaGlzIGlzIHRoZSBhbW91bnQgb2YgdGV4dCB0aGF0IGlzIGluc2lkZSBhIGxpbmsgZGl2aWRlZCBieSB0aGUgdG90YWwgdGV4dCBpbiB0aGUgbm9kZS5cbiAgICpcbiAgICogQHBhcmFtIEVsZW1lbnRcbiAgICogQHJldHVybiBudW1iZXIgKGZsb2F0KVxuICAqKi9cbiAgX2dldExpbmtEZW5zaXR5OiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgdmFyIHRleHRMZW5ndGggPSB0aGlzLl9nZXRJbm5lclRleHQoZWxlbWVudCkubGVuZ3RoO1xuICAgIGlmICh0ZXh0TGVuZ3RoID09PSAwKVxuICAgICAgcmV0dXJuIDA7XG5cbiAgICB2YXIgbGlua0xlbmd0aCA9IDA7XG5cbiAgICAvLyBYWFggaW1wbGVtZW50IF9yZWR1Y2VOb2RlTGlzdD9cbiAgICB0aGlzLl9mb3JFYWNoTm9kZShlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYVwiKSwgZnVuY3Rpb24obGlua05vZGUpIHtcbiAgICAgIGxpbmtMZW5ndGggKz0gdGhpcy5fZ2V0SW5uZXJUZXh0KGxpbmtOb2RlKS5sZW5ndGg7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbGlua0xlbmd0aCAvIHRleHRMZW5ndGg7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEdldCBhbiBlbGVtZW50cyBjbGFzcy9pZCB3ZWlnaHQuIFVzZXMgcmVndWxhciBleHByZXNzaW9ucyB0byB0ZWxsIGlmIHRoaXNcbiAgICogZWxlbWVudCBsb29rcyBnb29kIG9yIGJhZC5cbiAgICpcbiAgICogQHBhcmFtIEVsZW1lbnRcbiAgICogQHJldHVybiBudW1iZXIgKEludGVnZXIpXG4gICoqL1xuICBfZ2V0Q2xhc3NXZWlnaHQ6IGZ1bmN0aW9uKGUpIHtcbiAgICBpZiAoIXRoaXMuX2ZsYWdJc0FjdGl2ZSh0aGlzLkZMQUdfV0VJR0hUX0NMQVNTRVMpKVxuICAgICAgcmV0dXJuIDA7XG5cbiAgICB2YXIgd2VpZ2h0ID0gMDtcblxuICAgIC8vIExvb2sgZm9yIGEgc3BlY2lhbCBjbGFzc25hbWVcbiAgICBpZiAodHlwZW9mKGUuY2xhc3NOYW1lKSA9PT0gXCJzdHJpbmdcIiAmJiBlLmNsYXNzTmFtZSAhPT0gXCJcIikge1xuICAgICAgaWYgKHRoaXMuUkVHRVhQUy5uZWdhdGl2ZS50ZXN0KGUuY2xhc3NOYW1lKSlcbiAgICAgICAgd2VpZ2h0IC09IDI1O1xuXG4gICAgICBpZiAodGhpcy5SRUdFWFBTLnBvc2l0aXZlLnRlc3QoZS5jbGFzc05hbWUpKVxuICAgICAgICB3ZWlnaHQgKz0gMjU7XG4gICAgfVxuXG4gICAgLy8gTG9vayBmb3IgYSBzcGVjaWFsIElEXG4gICAgaWYgKHR5cGVvZihlLmlkKSA9PT0gXCJzdHJpbmdcIiAmJiBlLmlkICE9PSBcIlwiKSB7XG4gICAgICBpZiAodGhpcy5SRUdFWFBTLm5lZ2F0aXZlLnRlc3QoZS5pZCkpXG4gICAgICAgIHdlaWdodCAtPSAyNTtcblxuICAgICAgaWYgKHRoaXMuUkVHRVhQUy5wb3NpdGl2ZS50ZXN0KGUuaWQpKVxuICAgICAgICB3ZWlnaHQgKz0gMjU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHdlaWdodDtcbiAgfSxcblxuICAvKipcbiAgICogQ2xlYW4gYSBub2RlIG9mIGFsbCBlbGVtZW50cyBvZiB0eXBlIFwidGFnXCIuXG4gICAqIChVbmxlc3MgaXQncyBhIHlvdXR1YmUvdmltZW8gdmlkZW8uIFBlb3BsZSBsb3ZlIG1vdmllcy4pXG4gICAqXG4gICAqIEBwYXJhbSBFbGVtZW50XG4gICAqIEBwYXJhbSBzdHJpbmcgdGFnIHRvIGNsZWFuXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKiovXG4gIF9jbGVhbjogZnVuY3Rpb24oZSwgdGFnKSB7XG4gICAgdmFyIGlzRW1iZWQgPSBbXCJvYmplY3RcIiwgXCJlbWJlZFwiLCBcImlmcmFtZVwiXS5pbmRleE9mKHRhZykgIT09IC0xO1xuXG4gICAgdGhpcy5fcmVtb3ZlTm9kZXMoZS5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWcpLCBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICAvLyBBbGxvdyB5b3V0dWJlIGFuZCB2aW1lbyB2aWRlb3MgdGhyb3VnaCBhcyBwZW9wbGUgdXN1YWxseSB3YW50IHRvIHNlZSB0aG9zZS5cbiAgICAgIGlmIChpc0VtYmVkKSB7XG4gICAgICAgIHZhciBhdHRyaWJ1dGVWYWx1ZXMgPSBbXS5tYXAuY2FsbChlbGVtZW50LmF0dHJpYnV0ZXMsIGZ1bmN0aW9uKGF0dHIpIHtcbiAgICAgICAgICByZXR1cm4gYXR0ci52YWx1ZTtcbiAgICAgICAgfSkuam9pbihcInxcIik7XG5cbiAgICAgICAgLy8gRmlyc3QsIGNoZWNrIHRoZSBlbGVtZW50cyBhdHRyaWJ1dGVzIHRvIHNlZSBpZiBhbnkgb2YgdGhlbSBjb250YWluIHlvdXR1YmUgb3IgdmltZW9cbiAgICAgICAgaWYgKHRoaXMuUkVHRVhQUy52aWRlb3MudGVzdChhdHRyaWJ1dGVWYWx1ZXMpKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICAvLyBUaGVuIGNoZWNrIHRoZSBlbGVtZW50cyBpbnNpZGUgdGhpcyBlbGVtZW50IGZvciB0aGUgc2FtZS5cbiAgICAgICAgaWYgKHRoaXMuUkVHRVhQUy52aWRlb3MudGVzdChlbGVtZW50LmlubmVySFRNTCkpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KTtcbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSBnaXZlbiBub2RlIGhhcyBvbmUgb2YgaXRzIGFuY2VzdG9yIHRhZyBuYW1lIG1hdGNoaW5nIHRoZVxuICAgKiBwcm92aWRlZCBvbmUuXG4gICAqIEBwYXJhbSAgSFRNTEVsZW1lbnQgbm9kZVxuICAgKiBAcGFyYW0gIFN0cmluZyAgICAgIHRhZ05hbWVcbiAgICogQHBhcmFtICBOdW1iZXIgICAgICBtYXhEZXB0aFxuICAgKiBAcGFyYW0gIEZ1bmN0aW9uICAgIGZpbHRlckZuIGEgZmlsdGVyIHRvIGludm9rZSB0byBkZXRlcm1pbmUgd2hldGhlciB0aGlzIG5vZGUgJ2NvdW50cydcbiAgICogQHJldHVybiBCb29sZWFuXG4gICAqL1xuICBfaGFzQW5jZXN0b3JUYWc6IGZ1bmN0aW9uKG5vZGUsIHRhZ05hbWUsIG1heERlcHRoLCBmaWx0ZXJGbikge1xuICAgIG1heERlcHRoID0gbWF4RGVwdGggfHwgMztcbiAgICB0YWdOYW1lID0gdGFnTmFtZS50b1VwcGVyQ2FzZSgpO1xuICAgIHZhciBkZXB0aCA9IDA7XG4gICAgd2hpbGUgKG5vZGUucGFyZW50Tm9kZSkge1xuICAgICAgaWYgKG1heERlcHRoID4gMCAmJiBkZXB0aCA+IG1heERlcHRoKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICBpZiAobm9kZS5wYXJlbnROb2RlLnRhZ05hbWUgPT09IHRhZ05hbWUgJiYgKCFmaWx0ZXJGbiB8fCBmaWx0ZXJGbihub2RlLnBhcmVudE5vZGUpKSlcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgZGVwdGgrKztcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm4gYW4gb2JqZWN0IGluZGljYXRpbmcgaG93IG1hbnkgcm93cyBhbmQgY29sdW1ucyB0aGlzIHRhYmxlIGhhcy5cbiAgICovXG4gIF9nZXRSb3dBbmRDb2x1bW5Db3VudDogZnVuY3Rpb24odGFibGUpIHtcbiAgICB2YXIgcm93cyA9IDA7XG4gICAgdmFyIGNvbHVtbnMgPSAwO1xuICAgIHZhciB0cnMgPSB0YWJsZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRyXCIpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcm93c3BhbiA9IHRyc1tpXS5nZXRBdHRyaWJ1dGUoXCJyb3dzcGFuXCIpIHx8IDA7XG4gICAgICBpZiAocm93c3Bhbikge1xuICAgICAgICByb3dzcGFuID0gcGFyc2VJbnQocm93c3BhbiwgMTApO1xuICAgICAgfVxuICAgICAgcm93cyArPSAocm93c3BhbiB8fCAxKTtcblxuICAgICAgLy8gTm93IGxvb2sgZm9yIGNvbHVtbi1yZWxhdGVkIGluZm9cbiAgICAgIHZhciBjb2x1bW5zSW5UaGlzUm93ID0gMDtcbiAgICAgIHZhciBjZWxscyA9IHRyc1tpXS5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRkXCIpO1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjZWxscy5sZW5ndGg7IGorKykge1xuICAgICAgICB2YXIgY29sc3BhbiA9IGNlbGxzW2pdLmdldEF0dHJpYnV0ZShcImNvbHNwYW5cIikgfHwgMDtcbiAgICAgICAgaWYgKGNvbHNwYW4pIHtcbiAgICAgICAgICBjb2xzcGFuID0gcGFyc2VJbnQoY29sc3BhbiwgMTApO1xuICAgICAgICB9XG4gICAgICAgIGNvbHVtbnNJblRoaXNSb3cgKz0gKGNvbHNwYW4gfHwgMSk7XG4gICAgICB9XG4gICAgICBjb2x1bW5zID0gTWF0aC5tYXgoY29sdW1ucywgY29sdW1uc0luVGhpc1Jvdyk7XG4gICAgfVxuICAgIHJldHVybiB7cm93czogcm93cywgY29sdW1uczogY29sdW1uc307XG4gIH0sXG5cbiAgLyoqXG4gICAqIExvb2sgZm9yICdkYXRhJyAoYXMgb3Bwb3NlZCB0byAnbGF5b3V0JykgdGFibGVzLCBmb3Igd2hpY2ggd2UgdXNlXG4gICAqIHNpbWlsYXIgY2hlY2tzIGFzXG4gICAqIGh0dHBzOi8vZHhyLm1vemlsbGEub3JnL21vemlsbGEtY2VudHJhbC9yZXYvNzEyMjQwNDljMGI1MmFiMTkwNTY0ZDNlYTBlYWIwODlhMTU5YTRjZi9hY2Nlc3NpYmxlL2h0bWwvSFRNTFRhYmxlQWNjZXNzaWJsZS5jcHAjOTIwXG4gICAqL1xuICBfbWFya0RhdGFUYWJsZXM6IGZ1bmN0aW9uKHJvb3QpIHtcbiAgICB2YXIgdGFibGVzID0gcm9vdC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInRhYmxlXCIpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFibGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgdGFibGUgPSB0YWJsZXNbaV07XG4gICAgICB2YXIgcm9sZSA9IHRhYmxlLmdldEF0dHJpYnV0ZShcInJvbGVcIik7XG4gICAgICBpZiAocm9sZSA9PSBcInByZXNlbnRhdGlvblwiKSB7XG4gICAgICAgIHRhYmxlLl9yZWFkYWJpbGl0eURhdGFUYWJsZSA9IGZhbHNlO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHZhciBkYXRhdGFibGUgPSB0YWJsZS5nZXRBdHRyaWJ1dGUoXCJkYXRhdGFibGVcIik7XG4gICAgICBpZiAoZGF0YXRhYmxlID09IFwiMFwiKSB7XG4gICAgICAgIHRhYmxlLl9yZWFkYWJpbGl0eURhdGFUYWJsZSA9IGZhbHNlO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHZhciBzdW1tYXJ5ID0gdGFibGUuZ2V0QXR0cmlidXRlKFwic3VtbWFyeVwiKTtcbiAgICAgIGlmIChzdW1tYXJ5KSB7XG4gICAgICAgIHRhYmxlLl9yZWFkYWJpbGl0eURhdGFUYWJsZSA9IHRydWU7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICB2YXIgY2FwdGlvbiA9IHRhYmxlLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiY2FwdGlvblwiKVswXTtcbiAgICAgIGlmIChjYXB0aW9uICYmIGNhcHRpb24uY2hpbGROb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRhYmxlLl9yZWFkYWJpbGl0eURhdGFUYWJsZSA9IHRydWU7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiB0aGUgdGFibGUgaGFzIGEgZGVzY2VuZGFudCB3aXRoIGFueSBvZiB0aGVzZSB0YWdzLCBjb25zaWRlciBhIGRhdGEgdGFibGU6XG4gICAgICB2YXIgZGF0YVRhYmxlRGVzY2VuZGFudHMgPSBbXCJjb2xcIiwgXCJjb2xncm91cFwiLCBcInRmb290XCIsIFwidGhlYWRcIiwgXCJ0aFwiXTtcbiAgICAgIHZhciBkZXNjZW5kYW50RXhpc3RzID0gZnVuY3Rpb24odGFnKSB7XG4gICAgICAgIHJldHVybiAhIXRhYmxlLmdldEVsZW1lbnRzQnlUYWdOYW1lKHRhZylbMF07XG4gICAgICB9O1xuICAgICAgaWYgKGRhdGFUYWJsZURlc2NlbmRhbnRzLnNvbWUoZGVzY2VuZGFudEV4aXN0cykpIHtcbiAgICAgICAgdGhpcy5sb2coXCJEYXRhIHRhYmxlIGJlY2F1c2UgZm91bmQgZGF0YS15IGRlc2NlbmRhbnRcIik7XG4gICAgICAgIHRhYmxlLl9yZWFkYWJpbGl0eURhdGFUYWJsZSA9IHRydWU7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBOZXN0ZWQgdGFibGVzIGluZGljYXRlIGEgbGF5b3V0IHRhYmxlOlxuICAgICAgaWYgKHRhYmxlLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwidGFibGVcIilbMF0pIHtcbiAgICAgICAgdGFibGUuX3JlYWRhYmlsaXR5RGF0YVRhYmxlID0gZmFsc2U7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICB2YXIgc2l6ZUluZm8gPSB0aGlzLl9nZXRSb3dBbmRDb2x1bW5Db3VudCh0YWJsZSk7XG4gICAgICBpZiAoc2l6ZUluZm8ucm93cyA+PSAxMCB8fCBzaXplSW5mby5jb2x1bW5zID4gNCkge1xuICAgICAgICB0YWJsZS5fcmVhZGFiaWxpdHlEYXRhVGFibGUgPSB0cnVlO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIC8vIE5vdyBqdXN0IGdvIGJ5IHNpemUgZW50aXJlbHk6XG4gICAgICB0YWJsZS5fcmVhZGFiaWxpdHlEYXRhVGFibGUgPSBzaXplSW5mby5yb3dzICogc2l6ZUluZm8uY29sdW1ucyA+IDEwO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogQ2xlYW4gYW4gZWxlbWVudCBvZiBhbGwgdGFncyBvZiB0eXBlIFwidGFnXCIgaWYgdGhleSBsb29rIGZpc2h5LlxuICAgKiBcIkZpc2h5XCIgaXMgYW4gYWxnb3JpdGhtIGJhc2VkIG9uIGNvbnRlbnQgbGVuZ3RoLCBjbGFzc25hbWVzLCBsaW5rIGRlbnNpdHksIG51bWJlciBvZiBpbWFnZXMgJiBlbWJlZHMsIGV0Yy5cbiAgICpcbiAgICogQHJldHVybiB2b2lkXG4gICAqKi9cbiAgX2NsZWFuQ29uZGl0aW9uYWxseTogZnVuY3Rpb24oZSwgdGFnKSB7XG4gICAgaWYgKCF0aGlzLl9mbGFnSXNBY3RpdmUodGhpcy5GTEFHX0NMRUFOX0NPTkRJVElPTkFMTFkpKVxuICAgICAgcmV0dXJuO1xuXG4gICAgdmFyIGlzTGlzdCA9IHRhZyA9PT0gXCJ1bFwiIHx8IHRhZyA9PT0gXCJvbFwiO1xuXG4gICAgLy8gR2F0aGVyIGNvdW50cyBmb3Igb3RoZXIgdHlwaWNhbCBlbGVtZW50cyBlbWJlZGRlZCB3aXRoaW4uXG4gICAgLy8gVHJhdmVyc2UgYmFja3dhcmRzIHNvIHdlIGNhbiByZW1vdmUgbm9kZXMgYXQgdGhlIHNhbWUgdGltZVxuICAgIC8vIHdpdGhvdXQgZWZmZWN0aW5nIHRoZSB0cmF2ZXJzYWwuXG4gICAgLy9cbiAgICAvLyBUT0RPOiBDb25zaWRlciB0YWtpbmcgaW50byBhY2NvdW50IG9yaWdpbmFsIGNvbnRlbnRTY29yZSBoZXJlLlxuICAgIHRoaXMuX3JlbW92ZU5vZGVzKGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnKSwgZnVuY3Rpb24obm9kZSkge1xuICAgICAgLy8gRmlyc3QgY2hlY2sgaWYgd2UncmUgaW4gYSBkYXRhIHRhYmxlLCBpbiB3aGljaCBjYXNlIGRvbid0IHJlbW92ZSB1cy5cbiAgICAgIHZhciBpc0RhdGFUYWJsZSA9IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgcmV0dXJuIHQuX3JlYWRhYmlsaXR5RGF0YVRhYmxlO1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMuX2hhc0FuY2VzdG9yVGFnKG5vZGUsIFwidGFibGVcIiwgLTEsIGlzRGF0YVRhYmxlKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHZhciB3ZWlnaHQgPSB0aGlzLl9nZXRDbGFzc1dlaWdodChub2RlKTtcbiAgICAgIHZhciBjb250ZW50U2NvcmUgPSAwO1xuXG4gICAgICB0aGlzLmxvZyhcIkNsZWFuaW5nIENvbmRpdGlvbmFsbHlcIiwgbm9kZSk7XG5cbiAgICAgIGlmICh3ZWlnaHQgKyBjb250ZW50U2NvcmUgPCAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fZ2V0Q2hhckNvdW50KG5vZGUsIFwiLFwiKSA8IDEwKSB7XG4gICAgICAgIC8vIElmIHRoZXJlIGFyZSBub3QgdmVyeSBtYW55IGNvbW1hcywgYW5kIHRoZSBudW1iZXIgb2ZcbiAgICAgICAgLy8gbm9uLXBhcmFncmFwaCBlbGVtZW50cyBpcyBtb3JlIHRoYW4gcGFyYWdyYXBocyBvciBvdGhlclxuICAgICAgICAvLyBvbWlub3VzIHNpZ25zLCByZW1vdmUgdGhlIGVsZW1lbnQuXG4gICAgICAgIHZhciBwID0gbm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcInBcIikubGVuZ3RoO1xuICAgICAgICB2YXIgaW1nID0gbm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcImltZ1wiKS5sZW5ndGg7XG4gICAgICAgIHZhciBsaSA9IG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJsaVwiKS5sZW5ndGggLSAxMDA7XG4gICAgICAgIHZhciBpbnB1dCA9IG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJpbnB1dFwiKS5sZW5ndGg7XG5cbiAgICAgICAgdmFyIGVtYmVkQ291bnQgPSAwO1xuICAgICAgICB2YXIgZW1iZWRzID0gbm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcImVtYmVkXCIpO1xuICAgICAgICBmb3IgKHZhciBlaSA9IDAsIGlsID0gZW1iZWRzLmxlbmd0aDsgZWkgPCBpbDsgZWkgKz0gMSkge1xuICAgICAgICAgIGlmICghdGhpcy5SRUdFWFBTLnZpZGVvcy50ZXN0KGVtYmVkc1tlaV0uc3JjKSlcbiAgICAgICAgICAgIGVtYmVkQ291bnQgKz0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsaW5rRGVuc2l0eSA9IHRoaXMuX2dldExpbmtEZW5zaXR5KG5vZGUpO1xuICAgICAgICB2YXIgY29udGVudExlbmd0aCA9IHRoaXMuX2dldElubmVyVGV4dChub2RlKS5sZW5ndGg7XG5cbiAgICAgICAgdmFyIGhhdmVUb1JlbW92ZSA9XG4gICAgICAgICAgKGltZyA+IDEgJiYgcCAvIGltZyA8IDAuNSAmJiAhdGhpcy5faGFzQW5jZXN0b3JUYWcobm9kZSwgXCJmaWd1cmVcIikpIHx8XG4gICAgICAgICAgKCFpc0xpc3QgJiYgbGkgPiBwKSB8fFxuICAgICAgICAgIChpbnB1dCA+IE1hdGguZmxvb3IocC8zKSkgfHxcbiAgICAgICAgICAoIWlzTGlzdCAmJiBjb250ZW50TGVuZ3RoIDwgMjUgJiYgKGltZyA9PT0gMCB8fCBpbWcgPiAyKSAmJiAhdGhpcy5faGFzQW5jZXN0b3JUYWcobm9kZSwgXCJmaWd1cmVcIikpIHx8XG4gICAgICAgICAgKCFpc0xpc3QgJiYgd2VpZ2h0IDwgMjUgJiYgbGlua0RlbnNpdHkgPiAwLjIpIHx8XG4gICAgICAgICAgKHdlaWdodCA+PSAyNSAmJiBsaW5rRGVuc2l0eSA+IDAuNSkgfHxcbiAgICAgICAgICAoKGVtYmVkQ291bnQgPT09IDEgJiYgY29udGVudExlbmd0aCA8IDc1KSB8fCBlbWJlZENvdW50ID4gMSk7XG4gICAgICAgIHJldHVybiBoYXZlVG9SZW1vdmU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIENsZWFuIG91dCBlbGVtZW50cyB3aG9zZSBpZC9jbGFzcyBjb21iaW5hdGlvbnMgbWF0Y2ggc3BlY2lmaWMgc3RyaW5nLlxuICAgKlxuICAgKiBAcGFyYW0gRWxlbWVudFxuICAgKiBAcGFyYW0gUmVnRXhwIG1hdGNoIGlkL2NsYXNzIGNvbWJpbmF0aW9uLlxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICoqL1xuICBfY2xlYW5NYXRjaGVkTm9kZXM6IGZ1bmN0aW9uKGUsIHJlZ2V4KSB7XG4gICAgdmFyIGVuZE9mU2VhcmNoTWFya2VyTm9kZSA9IHRoaXMuX2dldE5leHROb2RlKGUsIHRydWUpO1xuICAgIHZhciBuZXh0ID0gdGhpcy5fZ2V0TmV4dE5vZGUoZSk7XG4gICAgd2hpbGUgKG5leHQgJiYgbmV4dCAhPSBlbmRPZlNlYXJjaE1hcmtlck5vZGUpIHtcbiAgICAgIGlmIChyZWdleC50ZXN0KG5leHQuY2xhc3NOYW1lICsgXCIgXCIgKyBuZXh0LmlkKSkge1xuICAgICAgICBuZXh0ID0gdGhpcy5fcmVtb3ZlQW5kR2V0TmV4dChuZXh0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5leHQgPSB0aGlzLl9nZXROZXh0Tm9kZShuZXh0KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIENsZWFuIG91dCBzcHVyaW91cyBoZWFkZXJzIGZyb20gYW4gRWxlbWVudC4gQ2hlY2tzIHRoaW5ncyBsaWtlIGNsYXNzbmFtZXMgYW5kIGxpbmsgZGVuc2l0eS5cbiAgICpcbiAgICogQHBhcmFtIEVsZW1lbnRcbiAgICogQHJldHVybiB2b2lkXG4gICoqL1xuICBfY2xlYW5IZWFkZXJzOiBmdW5jdGlvbihlKSB7XG4gICAgZm9yICh2YXIgaGVhZGVySW5kZXggPSAxOyBoZWFkZXJJbmRleCA8IDM7IGhlYWRlckluZGV4ICs9IDEpIHtcbiAgICAgIHRoaXMuX3JlbW92ZU5vZGVzKGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoXCIgKyBoZWFkZXJJbmRleCksIGZ1bmN0aW9uIChoZWFkZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldENsYXNzV2VpZ2h0KGhlYWRlcikgPCAwO1xuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIF9mbGFnSXNBY3RpdmU6IGZ1bmN0aW9uKGZsYWcpIHtcbiAgICByZXR1cm4gKHRoaXMuX2ZsYWdzICYgZmxhZykgPiAwO1xuICB9LFxuXG4gIF9yZW1vdmVGbGFnOiBmdW5jdGlvbihmbGFnKSB7XG4gICAgdGhpcy5fZmxhZ3MgPSB0aGlzLl9mbGFncyAmIH5mbGFnO1xuICB9LFxuXG4gIF9pc1Byb2JhYmx5VmlzaWJsZTogZnVuY3Rpb24obm9kZSkge1xuICAgIHJldHVybiBub2RlLnN0eWxlLmRpc3BsYXkgIT0gXCJub25lXCIgJiYgIW5vZGUuaGFzQXR0cmlidXRlKFwiaGlkZGVuXCIpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBEZWNpZGVzIHdoZXRoZXIgb3Igbm90IHRoZSBkb2N1bWVudCBpcyByZWFkZXItYWJsZSB3aXRob3V0IHBhcnNpbmcgdGhlIHdob2xlIHRoaW5nLlxuICAgKlxuICAgKiBAcmV0dXJuIGJvb2xlYW4gV2hldGhlciBvciBub3Qgd2Ugc3VzcGVjdCBwYXJzZSgpIHdpbGwgc3VjZWVlZCBhdCByZXR1cm5pbmcgYW4gYXJ0aWNsZSBvYmplY3QuXG4gICAqL1xuICBpc1Byb2JhYmx5UmVhZGVyYWJsZTogZnVuY3Rpb24oaGVscGVySXNWaXNpYmxlKSB7XG4gICAgdmFyIG5vZGVzID0gdGhpcy5fZ2V0QWxsTm9kZXNXaXRoVGFnKHRoaXMuX2RvYywgW1wicFwiLCBcInByZVwiXSk7XG5cbiAgICAvLyBHZXQgPGRpdj4gbm9kZXMgd2hpY2ggaGF2ZSA8YnI+IG5vZGUocykgYW5kIGFwcGVuZCB0aGVtIGludG8gdGhlIGBub2Rlc2AgdmFyaWFibGUuXG4gICAgLy8gU29tZSBhcnRpY2xlcycgRE9NIHN0cnVjdHVyZXMgbWlnaHQgbG9vayBsaWtlXG4gICAgLy8gPGRpdj5cbiAgICAvLyAgIFNlbnRlbmNlczxicj5cbiAgICAvLyAgIDxicj5cbiAgICAvLyAgIFNlbnRlbmNlczxicj5cbiAgICAvLyA8L2Rpdj5cbiAgICB2YXIgYnJOb2RlcyA9IHRoaXMuX2dldEFsbE5vZGVzV2l0aFRhZyh0aGlzLl9kb2MsIFtcImRpdiA+IGJyXCJdKTtcbiAgICBpZiAoYnJOb2Rlcy5sZW5ndGgpIHtcbiAgICAgIHZhciBzZXQgPSBuZXcgU2V0KCk7XG4gICAgICBbXS5mb3JFYWNoLmNhbGwoYnJOb2RlcywgZnVuY3Rpb24obm9kZSkge1xuICAgICAgICBzZXQuYWRkKG5vZGUucGFyZW50Tm9kZSk7XG4gICAgICB9KTtcbiAgICAgIG5vZGVzID0gW10uY29uY2F0LmFwcGx5KEFycmF5LmZyb20oc2V0KSwgbm9kZXMpO1xuICAgIH1cblxuICAgIGlmICghaGVscGVySXNWaXNpYmxlKSB7XG4gICAgICBoZWxwZXJJc1Zpc2libGUgPSB0aGlzLl9pc1Byb2JhYmx5VmlzaWJsZTtcbiAgICB9XG5cbiAgICB2YXIgc2NvcmUgPSAwO1xuICAgIC8vIFRoaXMgaXMgYSBsaXR0bGUgY2hlZWt5LCB3ZSB1c2UgdGhlIGFjY3VtdWxhdG9yICdzY29yZScgdG8gZGVjaWRlIHdoYXQgdG8gcmV0dXJuIGZyb21cbiAgICAvLyB0aGlzIGNhbGxiYWNrOlxuICAgIHJldHVybiB0aGlzLl9zb21lTm9kZShub2RlcywgZnVuY3Rpb24obm9kZSkge1xuICAgICAgaWYgKGhlbHBlcklzVmlzaWJsZSAmJiAhaGVscGVySXNWaXNpYmxlKG5vZGUpKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB2YXIgbWF0Y2hTdHJpbmcgPSBub2RlLmNsYXNzTmFtZSArIFwiIFwiICsgbm9kZS5pZDtcblxuICAgICAgaWYgKHRoaXMuUkVHRVhQUy51bmxpa2VseUNhbmRpZGF0ZXMudGVzdChtYXRjaFN0cmluZykgJiZcbiAgICAgICAgICAhdGhpcy5SRUdFWFBTLm9rTWF5YmVJdHNBQ2FuZGlkYXRlLnRlc3QobWF0Y2hTdHJpbmcpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5vZGUubWF0Y2hlcyAmJiBub2RlLm1hdGNoZXMoXCJsaSBwXCIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgdmFyIHRleHRDb250ZW50TGVuZ3RoID0gbm9kZS50ZXh0Q29udGVudC50cmltKCkubGVuZ3RoO1xuICAgICAgaWYgKHRleHRDb250ZW50TGVuZ3RoIDwgMTQwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgc2NvcmUgKz0gTWF0aC5zcXJ0KHRleHRDb250ZW50TGVuZ3RoIC0gMTQwKTtcblxuICAgICAgaWYgKHNjb3JlID4gMjApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJ1bnMgcmVhZGFiaWxpdHkuXG4gICAqXG4gICAqIFdvcmtmbG93OlxuICAgKiAgMS4gUHJlcCB0aGUgZG9jdW1lbnQgYnkgcmVtb3Zpbmcgc2NyaXB0IHRhZ3MsIGNzcywgZXRjLlxuICAgKiAgMi4gQnVpbGQgcmVhZGFiaWxpdHkncyBET00gdHJlZS5cbiAgICogIDMuIEdyYWIgdGhlIGFydGljbGUgY29udGVudCBmcm9tIHRoZSBjdXJyZW50IGRvbSB0cmVlLlxuICAgKiAgNC4gUmVwbGFjZSB0aGUgY3VycmVudCBET00gdHJlZSB3aXRoIHRoZSBuZXcgb25lLlxuICAgKiAgNS4gUmVhZCBwZWFjZWZ1bGx5LlxuICAgKlxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICoqL1xuICBwYXJzZTogZnVuY3Rpb24gKCkge1xuICAgIC8vIEF2b2lkIHBhcnNpbmcgdG9vIGxhcmdlIGRvY3VtZW50cywgYXMgcGVyIGNvbmZpZ3VyYXRpb24gb3B0aW9uXG4gICAgaWYgKHRoaXMuX21heEVsZW1zVG9QYXJzZSA+IDApIHtcbiAgICAgIHZhciBudW1UYWdzID0gdGhpcy5fZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiKlwiKS5sZW5ndGg7XG4gICAgICBpZiAobnVtVGFncyA+IHRoaXMuX21heEVsZW1zVG9QYXJzZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJBYm9ydGluZyBwYXJzaW5nIGRvY3VtZW50OyBcIiArIG51bVRhZ3MgKyBcIiBlbGVtZW50cyBmb3VuZFwiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgc2NyaXB0IHRhZ3MgZnJvbSB0aGUgZG9jdW1lbnQuXG4gICAgdGhpcy5fcmVtb3ZlU2NyaXB0cyh0aGlzLl9kb2MpO1xuXG4gICAgdGhpcy5fcHJlcERvY3VtZW50KCk7XG5cbiAgICB2YXIgbWV0YWRhdGEgPSB0aGlzLl9nZXRBcnRpY2xlTWV0YWRhdGEoKTtcbiAgICB0aGlzLl9hcnRpY2xlVGl0bGUgPSBtZXRhZGF0YS50aXRsZTtcblxuICAgIHZhciBhcnRpY2xlQ29udGVudCA9IHRoaXMuX2dyYWJBcnRpY2xlKCk7XG4gICAgaWYgKCFhcnRpY2xlQ29udGVudClcbiAgICAgIHJldHVybiBudWxsO1xuXG4gICAgdGhpcy5sb2coXCJHcmFiYmVkOiBcIiArIGFydGljbGVDb250ZW50LmlubmVySFRNTCk7XG5cbiAgICB0aGlzLl9wb3N0UHJvY2Vzc0NvbnRlbnQoYXJ0aWNsZUNvbnRlbnQpO1xuXG4gICAgLy8gSWYgd2UgaGF2ZW4ndCBmb3VuZCBhbiBleGNlcnB0IGluIHRoZSBhcnRpY2xlJ3MgbWV0YWRhdGEsIHVzZSB0aGUgYXJ0aWNsZSdzXG4gICAgLy8gZmlyc3QgcGFyYWdyYXBoIGFzIHRoZSBleGNlcnB0LiBUaGlzIGlzIHVzZWQgZm9yIGRpc3BsYXlpbmcgYSBwcmV2aWV3IG9mXG4gICAgLy8gdGhlIGFydGljbGUncyBjb250ZW50LlxuICAgIGlmICghbWV0YWRhdGEuZXhjZXJwdCkge1xuICAgICAgdmFyIHBhcmFncmFwaHMgPSBhcnRpY2xlQ29udGVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInBcIik7XG4gICAgICBpZiAocGFyYWdyYXBocy5sZW5ndGggPiAwKSB7XG4gICAgICAgIG1ldGFkYXRhLmV4Y2VycHQgPSBwYXJhZ3JhcGhzWzBdLnRleHRDb250ZW50LnRyaW0oKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgdGV4dENvbnRlbnQgPSBhcnRpY2xlQ29udGVudC50ZXh0Q29udGVudDtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IHRoaXMuX2FydGljbGVUaXRsZSxcbiAgICAgIGJ5bGluZTogbWV0YWRhdGEuYnlsaW5lIHx8IHRoaXMuX2FydGljbGVCeWxpbmUsXG4gICAgICBkaXI6IHRoaXMuX2FydGljbGVEaXIsXG4gICAgICBjb250ZW50OiBhcnRpY2xlQ29udGVudC5pbm5lckhUTUwsXG4gICAgICB0ZXh0Q29udGVudDogdGV4dENvbnRlbnQsXG4gICAgICBsZW5ndGg6IHRleHRDb250ZW50Lmxlbmd0aCxcbiAgICAgIGV4Y2VycHQ6IG1ldGFkYXRhLmV4Y2VycHQsXG4gICAgfTtcbiAgfVxufTtcblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBSZWFkYWJpbGl0eTtcbn1cbiJdfQ==
