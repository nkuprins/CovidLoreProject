// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"kHvGx":[function(require,module,exports) {
"use strict";
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "096dc584dd7395d0";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"k5sOC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "processSortUpdate", ()=>processSortUpdate);
var _navView = require("../view/navView");
var _navViewDefault = parcelHelpers.interopDefault(_navView);
var _forumView = require("../view/forumView");
var _forumViewDefault = parcelHelpers.interopDefault(_forumView);
var _logginController = require("../logginController");
var _logginControllerDefault = parcelHelpers.interopDefault(_logginController);
var _forumData = require("../data/forumData");
var _forumDataDefault = parcelHelpers.interopDefault(_forumData);
const init = function() {
    (0, _logginControllerDefault.default).initKeyCloak();
    new (0, _navViewDefault.default)(2).addHandlerNavHover();
    (0, _forumViewDefault.default).addSortButtonsListener();
    (0, _forumViewDefault.default).addNewThreadListener();
    (0, _forumDataDefault.default).fetchForumData().then((data)=>(0, _forumViewDefault.default).showForumTopicView(data));
};
const processSortUpdate = function(sortOption, isAscending) {
    if (!(0, _forumDataDefault.default).forumData) return;
    const sortBy = sortOption === "Like" ? (a, b)=>isAscending ? a.sumLike - b.sumLike : b.sumLike - a.sumLike : (a, b)=>isAscending ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
    (0, _forumDataDefault.default).forumData.sort(sortBy);
    (0, _forumViewDefault.default).showForumTopicView((0, _forumDataDefault.default).forumData);
};
init();

},{"../view/navView":"pEWxL","../view/forumView":"es64f","../logginController":"dqzYx","../data/forumData":"jSfBV","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"pEWxL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
class NavView {
    _navBox = document.querySelector(".nav__box");
    _navButtons = document.querySelectorAll(".nav__button");
    constructor(navId){
        this._navId = navId;
        this._selectById(String(this._navId));
    }
    addHandlerNavHover() {
        this._navBox.addEventListener("mouseover", this._handleNavHover.bind(this));
        this._navBox.addEventListener("mouseout", this._handleNavHover.bind(this));
    }
    _selectById(id) {
        this._navButtons.forEach((button)=>{
            if (id !== button.id) button.style.opacity = "0.5";
            else button.style.opacity = "1.0";
        });
    }
    _handleNavHover(e) {
        const navItem = e.target.closest(".nav__button");
        if (!navItem?.classList.contains("nav__button")) return;
        if (e.type === "mouseover") this._selectById(navItem.id);
        else this._selectById(String(this._navId));
    }
}
exports.default = NavView;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || dest.hasOwnProperty(key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"es64f":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _likePng = require("../../img/like.png");
var _likePngDefault = parcelHelpers.interopDefault(_likePng);
var _dislikePng = require("../../img/dislike.png");
var _dislikePngDefault = parcelHelpers.interopDefault(_dislikePng);
var _forumController = require("../controller/forumController");
class ForumView {
    constructor(){
        this._addNewsBody = document.querySelector(".absolute__block__body");
        this._forumTableBody = document.querySelector(`tbody`);
    }
    showForumTopicView(data) {
        this._forumTableBody.innerHTML = ``;
        Object.entries(data).forEach((entry)=>{
            const [_, post] = entry;
            const markup = `<tr class="thread__body"
                onclick="window.location.href='/discussion.html?p=${post.postId}'">
                <td class="col1">${post.title}</td>
                <td>${post.user.username}</td>
                <td>
                    <div>
                        <p class="thread__score-block">${post.sumLike}</p>
                        <img class="thread__score-block thread__image" src=${(0, _likePngDefault.default)} alt="like">
                    </div>
                    <div>
                        <p class="thread__score-block">${post.sumDisLike}</p>
                        <img class="thread__score-block thread__image" src=${(0, _dislikePngDefault.default)} alt="dislike">
                    </div>
                </td>
                <td>${post.date}</td>
            </tr>`;
            this._forumTableBody.insertAdjacentHTML("afterbegin", markup);
        });
    }
    _rotateImage(sortOption, isAscending) {
        let sortImage;
        if (sortOption === "Like") sortImage = document.querySelector("#top");
        else if (sortOption === "Date") sortImage = document.querySelector("#latest");
        sortImage.querySelector(".sort__icon").classList.toggle("rotate__sort__icon");
    }
    addSortButtonsListener() {
        document.querySelectorAll(".sort__element").forEach((el)=>el.addEventListener("click", this._handleSort.bind(this)));
    }
    _handleSort(e) {
        const el = e.target.closest(".sort__element");
        const sortOption = el.id === "top" ? "Like" : "Date";
        const isAscending = !el.querySelector(".sort__icon").classList.contains("rotate__sort__icon");
        this._rotateImage(sortOption, isAscending);
        (0, _forumController.processSortUpdate)(sortOption, isAscending);
    }
    addNewThreadListener() {
        document.querySelector(".add__new__thread").addEventListener("click", this._handleNewThread.bind(this));
        document.querySelector(".absolute__block__button").addEventListener("click", this._handleNewThread.bind(this));
    }
    _handleNewThread() {
        document.querySelector(".absolute__block__background").classList.toggle("no__event-obj");
        this._addNewsBody.classList.toggle("disabled-obj");
    }
}
exports.default = new ForumView();

},{"../../img/like.png":"g1dVQ","../../img/dislike.png":"iFXZH","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../controller/forumController":"k5sOC"}],"g1dVQ":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ObJuQ") + "like.74d36320.png" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"lgJ39":[function(require,module,exports) {
"use strict";
var bundleURL = {};
function getBundleURLCached(id) {
    var value = bundleURL[id];
    if (!value) {
        value = getBundleURL();
        bundleURL[id] = value;
    }
    return value;
}
function getBundleURL() {
    try {
        throw new Error();
    } catch (err) {
        var matches = ("" + err.stack).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^)\n]+/g);
        if (matches) // The first two stack frames will be this function and getBundleURLCached.
        // Use the 3rd one, which will be a runtime in the original bundle.
        return getBaseURL(matches[2]);
    }
    return "/";
}
function getBaseURL(url) {
    return ("" + url).replace(/^((?:https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/.+)\/[^/]+$/, "$1") + "/";
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.
function getOrigin(url) {
    var matches = ("" + url).match(/(https?|file|ftp|(chrome|moz|safari-web)-extension):\/\/[^/]+/);
    if (!matches) throw new Error("Origin not found");
    return matches[0];
}
exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;

},{}],"iFXZH":[function(require,module,exports) {
module.exports = require("./helpers/bundle-url").getBundleURL("ObJuQ") + "dislike.20ceb363.png" + "?" + Date.now();

},{"./helpers/bundle-url":"lgJ39"}],"dqzYx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _keycloakJs = require("keycloak-js");
var _keycloakJsDefault = parcelHelpers.interopDefault(_keycloakJs);
var _jwtDecode = require("jwt-decode");
var _jwtDecodeDefault = parcelHelpers.interopDefault(_jwtDecode);
class SecureLogin {
    _logoutButton = document.getElementById("logout_button");
    initKeyCloak() {
        const config = {
            url: "http://localhost:8080",
            realm: "MyRealm",
            clientId: "frontend-login-client"
        };
        const keycloak = new (0, _keycloakJsDefault.default)(config);
        keycloak.init({
            onLoad: `login-required`,
            checkLoginIframe: false
        }).then((authenticated)=>{
            if (authenticated) localStorage.setItem("accessToken", keycloak.token);
        });
        this._logoutButton.addEventListener("click", ()=>keycloak.logout({
                redirectUri: "http://localhost:1234"
            }));
    }
}
exports.default = new SecureLogin();

},{"keycloak-js":"3RfCw","jwt-decode":"ljM1w","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3RfCw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>Keycloak);
var _base64Js = require("base64-js");
var _base64JsDefault = parcelHelpers.interopDefault(_base64Js);
var _jsSha256 = require("js-sha256");
var _jsSha256Default = parcelHelpers.interopDefault(_jsSha256);
/*
 * Copyright 2016 Red Hat, Inc. and/or its affiliates
 * and other contributors as indicated by the @author tags.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ if (typeof Promise === "undefined") throw Error("Keycloak requires an environment that supports Promises. Make sure that you include the appropriate polyfill.");
var loggedPromiseDeprecation = false;
function logPromiseDeprecation() {
    if (!loggedPromiseDeprecation) {
        loggedPromiseDeprecation = true;
        console.warn("[KEYCLOAK] Usage of legacy style promise methods such as `.error()` and `.success()` has been deprecated and support will be removed in future versions. Use standard style promise methods such as `.then() and `.catch()` instead.");
    }
}
function Keycloak(config) {
    if (!(this instanceof Keycloak)) return new Keycloak(config);
    var kc = this;
    var adapter;
    var refreshQueue = [];
    var callbackStorage;
    var loginIframe = {
        enable: true,
        callbackList: [],
        interval: 5
    };
    var scripts = document.getElementsByTagName("script");
    for(var i = 0; i < scripts.length; i++)if ((scripts[i].src.indexOf("keycloak.js") !== -1 || scripts[i].src.indexOf("keycloak.min.js") !== -1) && scripts[i].src.indexOf("version=") !== -1) kc.iframeVersion = scripts[i].src.substring(scripts[i].src.indexOf("version=") + 8).split("&")[0];
    var useNonce = true;
    var logInfo = createLogger(console.info);
    var logWarn = createLogger(console.warn);
    kc.init = function(initOptions) {
        kc.authenticated = false;
        callbackStorage = createCallbackStorage();
        var adapters = [
            "default",
            "cordova",
            "cordova-native"
        ];
        if (initOptions && adapters.indexOf(initOptions.adapter) > -1) adapter = loadAdapter(initOptions.adapter);
        else if (initOptions && typeof initOptions.adapter === "object") adapter = initOptions.adapter;
        else if (window.Cordova || window.cordova) adapter = loadAdapter("cordova");
        else adapter = loadAdapter();
        if (initOptions) {
            if (typeof initOptions.useNonce !== "undefined") useNonce = initOptions.useNonce;
            if (typeof initOptions.checkLoginIframe !== "undefined") loginIframe.enable = initOptions.checkLoginIframe;
            if (initOptions.checkLoginIframeInterval) loginIframe.interval = initOptions.checkLoginIframeInterval;
            if (initOptions.onLoad === "login-required") kc.loginRequired = true;
            if (initOptions.responseMode) {
                if (initOptions.responseMode === "query" || initOptions.responseMode === "fragment") kc.responseMode = initOptions.responseMode;
                else throw "Invalid value for responseMode";
            }
            if (initOptions.flow) {
                switch(initOptions.flow){
                    case "standard":
                        kc.responseType = "code";
                        break;
                    case "implicit":
                        kc.responseType = "id_token token";
                        break;
                    case "hybrid":
                        kc.responseType = "code id_token token";
                        break;
                    default:
                        throw "Invalid value for flow";
                }
                kc.flow = initOptions.flow;
            }
            if (initOptions.timeSkew != null) kc.timeSkew = initOptions.timeSkew;
            if (initOptions.redirectUri) kc.redirectUri = initOptions.redirectUri;
            if (initOptions.silentCheckSsoRedirectUri) kc.silentCheckSsoRedirectUri = initOptions.silentCheckSsoRedirectUri;
            if (typeof initOptions.silentCheckSsoFallback === "boolean") kc.silentCheckSsoFallback = initOptions.silentCheckSsoFallback;
            else kc.silentCheckSsoFallback = true;
            if (initOptions.pkceMethod) {
                if (initOptions.pkceMethod !== "S256") throw "Invalid value for pkceMethod";
                kc.pkceMethod = initOptions.pkceMethod;
            }
            if (typeof initOptions.enableLogging === "boolean") kc.enableLogging = initOptions.enableLogging;
            else kc.enableLogging = false;
            if (typeof initOptions.scope === "string") kc.scope = initOptions.scope;
            if (typeof initOptions.messageReceiveTimeout === "number" && initOptions.messageReceiveTimeout > 0) kc.messageReceiveTimeout = initOptions.messageReceiveTimeout;
            else kc.messageReceiveTimeout = 10000;
        }
        if (!kc.responseMode) kc.responseMode = "fragment";
        if (!kc.responseType) {
            kc.responseType = "code";
            kc.flow = "standard";
        }
        var promise = createPromise();
        var initPromise = createPromise();
        initPromise.promise.then(function() {
            kc.onReady && kc.onReady(kc.authenticated);
            promise.setSuccess(kc.authenticated);
        }).catch(function(error) {
            promise.setError(error);
        });
        var configPromise = loadConfig();
        function onLoad() {
            var doLogin = function(prompt) {
                if (!prompt) options.prompt = "none";
                kc.login(options).then(function() {
                    initPromise.setSuccess();
                }).catch(function(error) {
                    initPromise.setError(error);
                });
            };
            var checkSsoSilently = function() {
                var ifrm = document.createElement("iframe");
                var src = kc.createLoginUrl({
                    prompt: "none",
                    redirectUri: kc.silentCheckSsoRedirectUri
                });
                ifrm.setAttribute("src", src);
                ifrm.setAttribute("title", "keycloak-silent-check-sso");
                ifrm.style.display = "none";
                document.body.appendChild(ifrm);
                var messageCallback = function(event) {
                    if (event.origin !== window.location.origin || ifrm.contentWindow !== event.source) return;
                    var oauth = parseCallback(event.data);
                    processCallback(oauth, initPromise);
                    document.body.removeChild(ifrm);
                    window.removeEventListener("message", messageCallback);
                };
                window.addEventListener("message", messageCallback);
            };
            var options = {};
            switch(initOptions.onLoad){
                case "check-sso":
                    if (loginIframe.enable) setupCheckLoginIframe().then(function() {
                        checkLoginIframe().then(function(unchanged) {
                            if (!unchanged) kc.silentCheckSsoRedirectUri ? checkSsoSilently() : doLogin(false);
                            else initPromise.setSuccess();
                        }).catch(function(error) {
                            initPromise.setError(error);
                        });
                    });
                    else kc.silentCheckSsoRedirectUri ? checkSsoSilently() : doLogin(false);
                    break;
                case "login-required":
                    doLogin(true);
                    break;
                default:
                    throw "Invalid value for onLoad";
            }
        }
        function processInit() {
            var callback = parseCallback(window.location.href);
            if (callback) window.history.replaceState(window.history.state, null, callback.newUrl);
            if (callback && callback.valid) return setupCheckLoginIframe().then(function() {
                processCallback(callback, initPromise);
            }).catch(function(error) {
                initPromise.setError(error);
            });
            else if (initOptions) {
                if (initOptions.token && initOptions.refreshToken) {
                    setToken(initOptions.token, initOptions.refreshToken, initOptions.idToken);
                    if (loginIframe.enable) setupCheckLoginIframe().then(function() {
                        checkLoginIframe().then(function(unchanged) {
                            if (unchanged) {
                                kc.onAuthSuccess && kc.onAuthSuccess();
                                initPromise.setSuccess();
                                scheduleCheckIframe();
                            } else initPromise.setSuccess();
                        }).catch(function(error) {
                            initPromise.setError(error);
                        });
                    });
                    else kc.updateToken(-1).then(function() {
                        kc.onAuthSuccess && kc.onAuthSuccess();
                        initPromise.setSuccess();
                    }).catch(function(error) {
                        kc.onAuthError && kc.onAuthError();
                        if (initOptions.onLoad) onLoad();
                        else initPromise.setError(error);
                    });
                } else if (initOptions.onLoad) onLoad();
                else initPromise.setSuccess();
            } else initPromise.setSuccess();
        }
        function domReady() {
            var promise = createPromise();
            var checkReadyState = function() {
                if (document.readyState === "interactive" || document.readyState === "complete") {
                    document.removeEventListener("readystatechange", checkReadyState);
                    promise.setSuccess();
                }
            };
            document.addEventListener("readystatechange", checkReadyState);
            checkReadyState(); // just in case the event was already fired and we missed it (in case the init is done later than at the load time, i.e. it's done from code)
            return promise.promise;
        }
        configPromise.then(function() {
            domReady().then(check3pCookiesSupported).then(processInit).catch(function(error) {
                promise.setError(error);
            });
        });
        configPromise.catch(function(error) {
            promise.setError(error);
        });
        return promise.promise;
    };
    kc.login = function(options) {
        return adapter.login(options);
    };
    function generateRandomData(len) {
        // use web crypto APIs if possible
        var array = null;
        var crypto = window.crypto || window.msCrypto;
        if (crypto && crypto.getRandomValues && window.Uint8Array) {
            array = new Uint8Array(len);
            crypto.getRandomValues(array);
            return array;
        }
        // fallback to Math random
        array = new Array(len);
        for(var j = 0; j < array.length; j++)array[j] = Math.floor(256 * Math.random());
        return array;
    }
    function generateCodeVerifier(len) {
        return generateRandomString(len, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");
    }
    function generateRandomString(len, alphabet) {
        var randomData = generateRandomData(len);
        var chars = new Array(len);
        for(var i = 0; i < len; i++)chars[i] = alphabet.charCodeAt(randomData[i] % alphabet.length);
        return String.fromCharCode.apply(null, chars);
    }
    function generatePkceChallenge(pkceMethod, codeVerifier) {
        switch(pkceMethod){
            // The use of the "plain" method is considered insecure and therefore not supported.
            case "S256":
                // hash codeVerifier, then encode as url-safe base64 without padding
                var hashBytes = new Uint8Array((0, _jsSha256Default.default).arrayBuffer(codeVerifier));
                var encodedHash = (0, _base64JsDefault.default).fromByteArray(hashBytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "");
                return encodedHash;
            default:
                throw "Invalid value for pkceMethod";
        }
    }
    function buildClaimsParameter(requestedAcr) {
        var claims = {
            id_token: {
                acr: requestedAcr
            }
        };
        return JSON.stringify(claims);
    }
    kc.createLoginUrl = function(options) {
        var state = createUUID();
        var nonce = createUUID();
        var redirectUri = adapter.redirectUri(options);
        var callbackState = {
            state: state,
            nonce: nonce,
            redirectUri: encodeURIComponent(redirectUri)
        };
        if (options && options.prompt) callbackState.prompt = options.prompt;
        var baseUrl;
        if (options && options.action == "register") baseUrl = kc.endpoints.register();
        else baseUrl = kc.endpoints.authorize();
        var scope = options && options.scope || kc.scope;
        if (!scope) // if scope is not set, default to "openid"
        scope = "openid";
        else if (scope.indexOf("openid") === -1) // if openid scope is missing, prefix the given scopes with it
        scope = "openid " + scope;
        var url = baseUrl + "?client_id=" + encodeURIComponent(kc.clientId) + "&redirect_uri=" + encodeURIComponent(redirectUri) + "&state=" + encodeURIComponent(state) + "&response_mode=" + encodeURIComponent(kc.responseMode) + "&response_type=" + encodeURIComponent(kc.responseType) + "&scope=" + encodeURIComponent(scope);
        if (useNonce) url = url + "&nonce=" + encodeURIComponent(nonce);
        if (options && options.prompt) url += "&prompt=" + encodeURIComponent(options.prompt);
        if (options && options.maxAge) url += "&max_age=" + encodeURIComponent(options.maxAge);
        if (options && options.loginHint) url += "&login_hint=" + encodeURIComponent(options.loginHint);
        if (options && options.idpHint) url += "&kc_idp_hint=" + encodeURIComponent(options.idpHint);
        if (options && options.action && options.action != "register") url += "&kc_action=" + encodeURIComponent(options.action);
        if (options && options.locale) url += "&ui_locales=" + encodeURIComponent(options.locale);
        if (options && options.acr) {
            var claimsParameter = buildClaimsParameter(options.acr);
            url += "&claims=" + encodeURIComponent(claimsParameter);
        }
        if (kc.pkceMethod) {
            var codeVerifier = generateCodeVerifier(96);
            callbackState.pkceCodeVerifier = codeVerifier;
            var pkceChallenge = generatePkceChallenge(kc.pkceMethod, codeVerifier);
            url += "&code_challenge=" + pkceChallenge;
            url += "&code_challenge_method=" + kc.pkceMethod;
        }
        callbackStorage.add(callbackState);
        return url;
    };
    kc.logout = function(options) {
        return adapter.logout(options);
    };
    kc.createLogoutUrl = function(options) {
        var url = kc.endpoints.logout() + "?client_id=" + encodeURIComponent(kc.clientId) + "&post_logout_redirect_uri=" + encodeURIComponent(adapter.redirectUri(options, false));
        if (kc.idToken) url += "&id_token_hint=" + encodeURIComponent(kc.idToken);
        return url;
    };
    kc.register = function(options) {
        return adapter.register(options);
    };
    kc.createRegisterUrl = function(options) {
        if (!options) options = {};
        options.action = "register";
        return kc.createLoginUrl(options);
    };
    kc.createAccountUrl = function(options) {
        var realm = getRealmUrl();
        var url = undefined;
        if (typeof realm !== "undefined") url = realm + "/account" + "?referrer=" + encodeURIComponent(kc.clientId) + "&referrer_uri=" + encodeURIComponent(adapter.redirectUri(options));
        return url;
    };
    kc.accountManagement = function() {
        return adapter.accountManagement();
    };
    kc.hasRealmRole = function(role) {
        var access = kc.realmAccess;
        return !!access && access.roles.indexOf(role) >= 0;
    };
    kc.hasResourceRole = function(role, resource) {
        if (!kc.resourceAccess) return false;
        var access = kc.resourceAccess[resource || kc.clientId];
        return !!access && access.roles.indexOf(role) >= 0;
    };
    kc.loadUserProfile = function() {
        var url = getRealmUrl() + "/account";
        var req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Authorization", "bearer " + kc.token);
        var promise = createPromise();
        req.onreadystatechange = function() {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    kc.profile = JSON.parse(req.responseText);
                    promise.setSuccess(kc.profile);
                } else promise.setError();
            }
        };
        req.send();
        return promise.promise;
    };
    kc.loadUserInfo = function() {
        var url = kc.endpoints.userinfo();
        var req = new XMLHttpRequest();
        req.open("GET", url, true);
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("Authorization", "bearer " + kc.token);
        var promise = createPromise();
        req.onreadystatechange = function() {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    kc.userInfo = JSON.parse(req.responseText);
                    promise.setSuccess(kc.userInfo);
                } else promise.setError();
            }
        };
        req.send();
        return promise.promise;
    };
    kc.isTokenExpired = function(minValidity) {
        if (!kc.tokenParsed || !kc.refreshToken && kc.flow != "implicit") throw "Not authenticated";
        if (kc.timeSkew == null) {
            logInfo("[KEYCLOAK] Unable to determine if token is expired as timeskew is not set");
            return true;
        }
        var expiresIn = kc.tokenParsed["exp"] - Math.ceil(new Date().getTime() / 1000) + kc.timeSkew;
        if (minValidity) {
            if (isNaN(minValidity)) throw "Invalid minValidity";
            expiresIn -= minValidity;
        }
        return expiresIn < 0;
    };
    kc.updateToken = function(minValidity) {
        var promise = createPromise();
        if (!kc.refreshToken) {
            promise.setError();
            return promise.promise;
        }
        minValidity = minValidity || 5;
        var exec = function() {
            var refreshToken = false;
            if (minValidity == -1) {
                refreshToken = true;
                logInfo("[KEYCLOAK] Refreshing token: forced refresh");
            } else if (!kc.tokenParsed || kc.isTokenExpired(minValidity)) {
                refreshToken = true;
                logInfo("[KEYCLOAK] Refreshing token: token expired");
            }
            if (!refreshToken) promise.setSuccess(false);
            else {
                var params = "grant_type=refresh_token&refresh_token=" + kc.refreshToken;
                var url = kc.endpoints.token();
                refreshQueue.push(promise);
                if (refreshQueue.length == 1) {
                    var req = new XMLHttpRequest();
                    req.open("POST", url, true);
                    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    req.withCredentials = true;
                    params += "&client_id=" + encodeURIComponent(kc.clientId);
                    var timeLocal = new Date().getTime();
                    req.onreadystatechange = function() {
                        if (req.readyState == 4) {
                            if (req.status == 200) {
                                logInfo("[KEYCLOAK] Token refreshed");
                                timeLocal = (timeLocal + new Date().getTime()) / 2;
                                var tokenResponse = JSON.parse(req.responseText);
                                setToken(tokenResponse["access_token"], tokenResponse["refresh_token"], tokenResponse["id_token"], timeLocal);
                                kc.onAuthRefreshSuccess && kc.onAuthRefreshSuccess();
                                for(var p = refreshQueue.pop(); p != null; p = refreshQueue.pop())p.setSuccess(true);
                            } else {
                                logWarn("[KEYCLOAK] Failed to refresh token");
                                if (req.status == 400) kc.clearToken();
                                kc.onAuthRefreshError && kc.onAuthRefreshError();
                                for(var p = refreshQueue.pop(); p != null; p = refreshQueue.pop())p.setError(true);
                            }
                        }
                    };
                    req.send(params);
                }
            }
        };
        if (loginIframe.enable) {
            var iframePromise = checkLoginIframe();
            iframePromise.then(function() {
                exec();
            }).catch(function(error) {
                promise.setError(error);
            });
        } else exec();
        return promise.promise;
    };
    kc.clearToken = function() {
        if (kc.token) {
            setToken(null, null, null);
            kc.onAuthLogout && kc.onAuthLogout();
            if (kc.loginRequired) kc.login();
        }
    };
    function getRealmUrl() {
        if (typeof kc.authServerUrl !== "undefined") {
            if (kc.authServerUrl.charAt(kc.authServerUrl.length - 1) == "/") return kc.authServerUrl + "realms/" + encodeURIComponent(kc.realm);
            else return kc.authServerUrl + "/realms/" + encodeURIComponent(kc.realm);
        } else return undefined;
    }
    function getOrigin() {
        if (!window.location.origin) return window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
        else return window.location.origin;
    }
    function processCallback(oauth, promise) {
        var code = oauth.code;
        var error = oauth.error;
        var prompt = oauth.prompt;
        var timeLocal = new Date().getTime();
        if (oauth["kc_action_status"]) kc.onActionUpdate && kc.onActionUpdate(oauth["kc_action_status"]);
        if (error) {
            if (prompt != "none") {
                var errorData = {
                    error: error,
                    error_description: oauth.error_description
                };
                kc.onAuthError && kc.onAuthError(errorData);
                promise && promise.setError(errorData);
            } else promise && promise.setSuccess();
            return;
        } else if (kc.flow != "standard" && (oauth.access_token || oauth.id_token)) authSuccess(oauth.access_token, null, oauth.id_token, true);
        if (kc.flow != "implicit" && code) {
            var params = "code=" + code + "&grant_type=authorization_code";
            var url = kc.endpoints.token();
            var req = new XMLHttpRequest();
            req.open("POST", url, true);
            req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            params += "&client_id=" + encodeURIComponent(kc.clientId);
            params += "&redirect_uri=" + oauth.redirectUri;
            if (oauth.pkceCodeVerifier) params += "&code_verifier=" + oauth.pkceCodeVerifier;
            req.withCredentials = true;
            req.onreadystatechange = function() {
                if (req.readyState == 4) {
                    if (req.status == 200) {
                        var tokenResponse = JSON.parse(req.responseText);
                        authSuccess(tokenResponse["access_token"], tokenResponse["refresh_token"], tokenResponse["id_token"], kc.flow === "standard");
                        scheduleCheckIframe();
                    } else {
                        kc.onAuthError && kc.onAuthError();
                        promise && promise.setError();
                    }
                }
            };
            req.send(params);
        }
        function authSuccess(accessToken, refreshToken, idToken, fulfillPromise) {
            timeLocal = (timeLocal + new Date().getTime()) / 2;
            setToken(accessToken, refreshToken, idToken, timeLocal);
            if (useNonce && (kc.tokenParsed && kc.tokenParsed.nonce != oauth.storedNonce || kc.refreshTokenParsed && kc.refreshTokenParsed.nonce != oauth.storedNonce || kc.idTokenParsed && kc.idTokenParsed.nonce != oauth.storedNonce)) {
                logInfo("[KEYCLOAK] Invalid nonce, clearing token");
                kc.clearToken();
                promise && promise.setError();
            } else if (fulfillPromise) {
                kc.onAuthSuccess && kc.onAuthSuccess();
                promise && promise.setSuccess();
            }
        }
    }
    function loadConfig(url) {
        var promise = createPromise();
        var configUrl;
        if (!config) configUrl = "keycloak.json";
        else if (typeof config === "string") configUrl = config;
        function setupOidcEndoints(oidcConfiguration) {
            if (!oidcConfiguration) kc.endpoints = {
                authorize: function() {
                    return getRealmUrl() + "/protocol/openid-connect/auth";
                },
                token: function() {
                    return getRealmUrl() + "/protocol/openid-connect/token";
                },
                logout: function() {
                    return getRealmUrl() + "/protocol/openid-connect/logout";
                },
                checkSessionIframe: function() {
                    var src = getRealmUrl() + "/protocol/openid-connect/login-status-iframe.html";
                    if (kc.iframeVersion) src = src + "?version=" + kc.iframeVersion;
                    return src;
                },
                thirdPartyCookiesIframe: function() {
                    var src = getRealmUrl() + "/protocol/openid-connect/3p-cookies/step1.html";
                    if (kc.iframeVersion) src = src + "?version=" + kc.iframeVersion;
                    return src;
                },
                register: function() {
                    return getRealmUrl() + "/protocol/openid-connect/registrations";
                },
                userinfo: function() {
                    return getRealmUrl() + "/protocol/openid-connect/userinfo";
                }
            };
            else kc.endpoints = {
                authorize: function() {
                    return oidcConfiguration.authorization_endpoint;
                },
                token: function() {
                    return oidcConfiguration.token_endpoint;
                },
                logout: function() {
                    if (!oidcConfiguration.end_session_endpoint) throw "Not supported by the OIDC server";
                    return oidcConfiguration.end_session_endpoint;
                },
                checkSessionIframe: function() {
                    if (!oidcConfiguration.check_session_iframe) throw "Not supported by the OIDC server";
                    return oidcConfiguration.check_session_iframe;
                },
                register: function() {
                    throw 'Redirection to "Register user" page not supported in standard OIDC mode';
                },
                userinfo: function() {
                    if (!oidcConfiguration.userinfo_endpoint) throw "Not supported by the OIDC server";
                    return oidcConfiguration.userinfo_endpoint;
                }
            };
        }
        if (configUrl) {
            var req = new XMLHttpRequest();
            req.open("GET", configUrl, true);
            req.setRequestHeader("Accept", "application/json");
            req.onreadystatechange = function() {
                if (req.readyState == 4) {
                    if (req.status == 200 || fileLoaded(req)) {
                        var config = JSON.parse(req.responseText);
                        kc.authServerUrl = config["auth-server-url"];
                        kc.realm = config["realm"];
                        kc.clientId = config["resource"];
                        setupOidcEndoints(null);
                        promise.setSuccess();
                    } else promise.setError();
                }
            };
            req.send();
        } else {
            if (!config.clientId) throw "clientId missing";
            kc.clientId = config.clientId;
            var oidcProvider = config["oidcProvider"];
            if (!oidcProvider) {
                if (!config["url"]) {
                    var scripts = document.getElementsByTagName("script");
                    for(var i = 0; i < scripts.length; i++)if (scripts[i].src.match(/.*keycloak\.js/)) {
                        config.url = scripts[i].src.substr(0, scripts[i].src.indexOf("/js/keycloak.js"));
                        break;
                    }
                }
                if (!config.realm) throw "realm missing";
                kc.authServerUrl = config.url;
                kc.realm = config.realm;
                setupOidcEndoints(null);
                promise.setSuccess();
            } else if (typeof oidcProvider === "string") {
                var oidcProviderConfigUrl;
                if (oidcProvider.charAt(oidcProvider.length - 1) == "/") oidcProviderConfigUrl = oidcProvider + ".well-known/openid-configuration";
                else oidcProviderConfigUrl = oidcProvider + "/.well-known/openid-configuration";
                var req = new XMLHttpRequest();
                req.open("GET", oidcProviderConfigUrl, true);
                req.setRequestHeader("Accept", "application/json");
                req.onreadystatechange = function() {
                    if (req.readyState == 4) {
                        if (req.status == 200 || fileLoaded(req)) {
                            var oidcProviderConfig = JSON.parse(req.responseText);
                            setupOidcEndoints(oidcProviderConfig);
                            promise.setSuccess();
                        } else promise.setError();
                    }
                };
                req.send();
            } else {
                setupOidcEndoints(oidcProvider);
                promise.setSuccess();
            }
        }
        return promise.promise;
    }
    function fileLoaded(xhr) {
        return xhr.status == 0 && xhr.responseText && xhr.responseURL.startsWith("file:");
    }
    function setToken(token, refreshToken, idToken, timeLocal) {
        if (kc.tokenTimeoutHandle) {
            clearTimeout(kc.tokenTimeoutHandle);
            kc.tokenTimeoutHandle = null;
        }
        if (refreshToken) {
            kc.refreshToken = refreshToken;
            kc.refreshTokenParsed = decodeToken(refreshToken);
        } else {
            delete kc.refreshToken;
            delete kc.refreshTokenParsed;
        }
        if (idToken) {
            kc.idToken = idToken;
            kc.idTokenParsed = decodeToken(idToken);
        } else {
            delete kc.idToken;
            delete kc.idTokenParsed;
        }
        if (token) {
            kc.token = token;
            kc.tokenParsed = decodeToken(token);
            kc.sessionId = kc.tokenParsed.session_state;
            kc.authenticated = true;
            kc.subject = kc.tokenParsed.sub;
            kc.realmAccess = kc.tokenParsed.realm_access;
            kc.resourceAccess = kc.tokenParsed.resource_access;
            if (timeLocal) kc.timeSkew = Math.floor(timeLocal / 1000) - kc.tokenParsed.iat;
            if (kc.timeSkew != null) {
                logInfo("[KEYCLOAK] Estimated time difference between browser and server is " + kc.timeSkew + " seconds");
                if (kc.onTokenExpired) {
                    var expiresIn = (kc.tokenParsed["exp"] - new Date().getTime() / 1000 + kc.timeSkew) * 1000;
                    logInfo("[KEYCLOAK] Token expires in " + Math.round(expiresIn / 1000) + " s");
                    if (expiresIn <= 0) kc.onTokenExpired();
                    else kc.tokenTimeoutHandle = setTimeout(kc.onTokenExpired, expiresIn);
                }
            }
        } else {
            delete kc.token;
            delete kc.tokenParsed;
            delete kc.subject;
            delete kc.realmAccess;
            delete kc.resourceAccess;
            kc.authenticated = false;
        }
    }
    function decodeToken(str) {
        str = str.split(".")[1];
        str = str.replace(/-/g, "+");
        str = str.replace(/_/g, "/");
        switch(str.length % 4){
            case 0:
                break;
            case 2:
                str += "==";
                break;
            case 3:
                str += "=";
                break;
            default:
                throw "Invalid token";
        }
        str = decodeURIComponent(escape(atob(str)));
        str = JSON.parse(str);
        return str;
    }
    function createUUID() {
        var hexDigits = "0123456789abcdef";
        var s = generateRandomString(36, hexDigits).split("");
        s[14] = "4";
        s[19] = hexDigits.substr(s[19] & 0x3 | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = "-";
        var uuid = s.join("");
        return uuid;
    }
    function parseCallback(url) {
        var oauth = parseCallbackUrl(url);
        if (!oauth) return;
        var oauthState = callbackStorage.get(oauth.state);
        if (oauthState) {
            oauth.valid = true;
            oauth.redirectUri = oauthState.redirectUri;
            oauth.storedNonce = oauthState.nonce;
            oauth.prompt = oauthState.prompt;
            oauth.pkceCodeVerifier = oauthState.pkceCodeVerifier;
        }
        return oauth;
    }
    function parseCallbackUrl(url) {
        var supportedParams;
        switch(kc.flow){
            case "standard":
                supportedParams = [
                    "code",
                    "state",
                    "session_state",
                    "kc_action_status"
                ];
                break;
            case "implicit":
                supportedParams = [
                    "access_token",
                    "token_type",
                    "id_token",
                    "state",
                    "session_state",
                    "expires_in",
                    "kc_action_status"
                ];
                break;
            case "hybrid":
                supportedParams = [
                    "access_token",
                    "token_type",
                    "id_token",
                    "code",
                    "state",
                    "session_state",
                    "expires_in",
                    "kc_action_status"
                ];
                break;
        }
        supportedParams.push("error");
        supportedParams.push("error_description");
        supportedParams.push("error_uri");
        var queryIndex = url.indexOf("?");
        var fragmentIndex = url.indexOf("#");
        var newUrl;
        var parsed;
        if (kc.responseMode === "query" && queryIndex !== -1) {
            newUrl = url.substring(0, queryIndex);
            parsed = parseCallbackParams(url.substring(queryIndex + 1, fragmentIndex !== -1 ? fragmentIndex : url.length), supportedParams);
            if (parsed.paramsString !== "") newUrl += "?" + parsed.paramsString;
            if (fragmentIndex !== -1) newUrl += url.substring(fragmentIndex);
        } else if (kc.responseMode === "fragment" && fragmentIndex !== -1) {
            newUrl = url.substring(0, fragmentIndex);
            parsed = parseCallbackParams(url.substring(fragmentIndex + 1), supportedParams);
            if (parsed.paramsString !== "") newUrl += "#" + parsed.paramsString;
        }
        if (parsed && parsed.oauthParams) {
            if (kc.flow === "standard" || kc.flow === "hybrid") {
                if ((parsed.oauthParams.code || parsed.oauthParams.error) && parsed.oauthParams.state) {
                    parsed.oauthParams.newUrl = newUrl;
                    return parsed.oauthParams;
                }
            } else if (kc.flow === "implicit") {
                if ((parsed.oauthParams.access_token || parsed.oauthParams.error) && parsed.oauthParams.state) {
                    parsed.oauthParams.newUrl = newUrl;
                    return parsed.oauthParams;
                }
            }
        }
    }
    function parseCallbackParams(paramsString, supportedParams) {
        var p = paramsString.split("&");
        var result = {
            paramsString: "",
            oauthParams: {}
        };
        for(var i = 0; i < p.length; i++){
            var split = p[i].indexOf("=");
            var key = p[i].slice(0, split);
            if (supportedParams.indexOf(key) !== -1) result.oauthParams[key] = p[i].slice(split + 1);
            else {
                if (result.paramsString !== "") result.paramsString += "&";
                result.paramsString += p[i];
            }
        }
        return result;
    }
    function createPromise() {
        // Need to create a native Promise which also preserves the
        // interface of the custom promise type previously used by the API
        var p = {
            setSuccess: function(result) {
                p.resolve(result);
            },
            setError: function(result) {
                p.reject(result);
            }
        };
        p.promise = new Promise(function(resolve, reject) {
            p.resolve = resolve;
            p.reject = reject;
        });
        p.promise.success = function(callback) {
            logPromiseDeprecation();
            this.then(function handleSuccess(value) {
                callback(value);
            });
            return this;
        };
        p.promise.error = function(callback) {
            logPromiseDeprecation();
            this.catch(function handleError(error) {
                callback(error);
            });
            return this;
        };
        return p;
    }
    // Function to extend existing native Promise with timeout
    function applyTimeoutToPromise(promise, timeout, errorMessage) {
        var timeoutHandle = null;
        var timeoutPromise = new Promise(function(resolve, reject) {
            timeoutHandle = setTimeout(function() {
                reject({
                    "error": errorMessage || "Promise is not settled within timeout of " + timeout + "ms"
                });
            }, timeout);
        });
        return Promise.race([
            promise,
            timeoutPromise
        ]).finally(function() {
            clearTimeout(timeoutHandle);
        });
    }
    function setupCheckLoginIframe() {
        var promise = createPromise();
        if (!loginIframe.enable) {
            promise.setSuccess();
            return promise.promise;
        }
        if (loginIframe.iframe) {
            promise.setSuccess();
            return promise.promise;
        }
        var iframe = document.createElement("iframe");
        loginIframe.iframe = iframe;
        iframe.onload = function() {
            var authUrl = kc.endpoints.authorize();
            if (authUrl.charAt(0) === "/") loginIframe.iframeOrigin = getOrigin();
            else loginIframe.iframeOrigin = authUrl.substring(0, authUrl.indexOf("/", 8));
            promise.setSuccess();
        };
        var src = kc.endpoints.checkSessionIframe();
        iframe.setAttribute("src", src);
        iframe.setAttribute("title", "keycloak-session-iframe");
        iframe.style.display = "none";
        document.body.appendChild(iframe);
        var messageCallback = function(event) {
            if (event.origin !== loginIframe.iframeOrigin || loginIframe.iframe.contentWindow !== event.source) return;
            if (!(event.data == "unchanged" || event.data == "changed" || event.data == "error")) return;
            if (event.data != "unchanged") kc.clearToken();
            var callbacks = loginIframe.callbackList.splice(0, loginIframe.callbackList.length);
            for(var i = callbacks.length - 1; i >= 0; --i){
                var promise = callbacks[i];
                if (event.data == "error") promise.setError();
                else promise.setSuccess(event.data == "unchanged");
            }
        };
        window.addEventListener("message", messageCallback, false);
        return promise.promise;
    }
    function scheduleCheckIframe() {
        if (loginIframe.enable) {
            if (kc.token) setTimeout(function() {
                checkLoginIframe().then(function(unchanged) {
                    if (unchanged) scheduleCheckIframe();
                });
            }, loginIframe.interval * 1000);
        }
    }
    function checkLoginIframe() {
        var promise = createPromise();
        if (loginIframe.iframe && loginIframe.iframeOrigin) {
            var msg = kc.clientId + " " + (kc.sessionId ? kc.sessionId : "");
            loginIframe.callbackList.push(promise);
            var origin = loginIframe.iframeOrigin;
            if (loginIframe.callbackList.length == 1) loginIframe.iframe.contentWindow.postMessage(msg, origin);
        } else promise.setSuccess();
        return promise.promise;
    }
    function check3pCookiesSupported() {
        var promise = createPromise();
        if (loginIframe.enable || kc.silentCheckSsoRedirectUri) {
            var iframe = document.createElement("iframe");
            iframe.setAttribute("src", kc.endpoints.thirdPartyCookiesIframe());
            iframe.setAttribute("title", "keycloak-3p-check-iframe");
            iframe.style.display = "none";
            document.body.appendChild(iframe);
            var messageCallback = function(event) {
                if (iframe.contentWindow !== event.source) return;
                if (event.data !== "supported" && event.data !== "unsupported") return;
                else if (event.data === "unsupported") {
                    loginIframe.enable = false;
                    if (kc.silentCheckSsoFallback) kc.silentCheckSsoRedirectUri = false;
                    logWarn("[KEYCLOAK] 3rd party cookies aren't supported by this browser. checkLoginIframe and silent check-sso are not available.");
                }
                document.body.removeChild(iframe);
                window.removeEventListener("message", messageCallback);
                promise.setSuccess();
            };
            window.addEventListener("message", messageCallback, false);
        } else promise.setSuccess();
        return applyTimeoutToPromise(promise.promise, kc.messageReceiveTimeout, "Timeout when waiting for 3rd party check iframe message.");
    }
    function loadAdapter(type) {
        if (!type || type == "default") return {
            login: function(options) {
                window.location.replace(kc.createLoginUrl(options));
                return createPromise().promise;
            },
            logout: function(options) {
                window.location.replace(kc.createLogoutUrl(options));
                return createPromise().promise;
            },
            register: function(options) {
                window.location.replace(kc.createRegisterUrl(options));
                return createPromise().promise;
            },
            accountManagement: function() {
                var accountUrl = kc.createAccountUrl();
                if (typeof accountUrl !== "undefined") window.location.href = accountUrl;
                else throw "Not supported by the OIDC server";
                return createPromise().promise;
            },
            redirectUri: function(options, encodeHash) {
                if (options && options.redirectUri) return options.redirectUri;
                else if (kc.redirectUri) return kc.redirectUri;
                else return location.href;
            }
        };
        if (type == "cordova") {
            loginIframe.enable = false;
            var cordovaOpenWindowWrapper = function(loginUrl, target, options) {
                if (window.cordova && window.cordova.InAppBrowser) // Use inappbrowser for IOS and Android if available
                return window.cordova.InAppBrowser.open(loginUrl, target, options);
                else return window.open(loginUrl, target, options);
            };
            var shallowCloneCordovaOptions = function(userOptions) {
                if (userOptions && userOptions.cordovaOptions) return Object.keys(userOptions.cordovaOptions).reduce(function(options, optionName) {
                    options[optionName] = userOptions.cordovaOptions[optionName];
                    return options;
                }, {});
                else return {};
            };
            var formatCordovaOptions = function(cordovaOptions) {
                return Object.keys(cordovaOptions).reduce(function(options, optionName) {
                    options.push(optionName + "=" + cordovaOptions[optionName]);
                    return options;
                }, []).join(",");
            };
            var createCordovaOptions = function(userOptions) {
                var cordovaOptions = shallowCloneCordovaOptions(userOptions);
                cordovaOptions.location = "no";
                if (userOptions && userOptions.prompt == "none") cordovaOptions.hidden = "yes";
                return formatCordovaOptions(cordovaOptions);
            };
            return {
                login: function(options) {
                    var promise = createPromise();
                    var cordovaOptions = createCordovaOptions(options);
                    var loginUrl = kc.createLoginUrl(options);
                    var ref = cordovaOpenWindowWrapper(loginUrl, "_blank", cordovaOptions);
                    var completed = false;
                    var closed = false;
                    var closeBrowser = function() {
                        closed = true;
                        ref.close();
                    };
                    ref.addEventListener("loadstart", function(event) {
                        if (event.url.indexOf("http://localhost") == 0) {
                            var callback = parseCallback(event.url);
                            processCallback(callback, promise);
                            closeBrowser();
                            completed = true;
                        }
                    });
                    ref.addEventListener("loaderror", function(event) {
                        if (!completed) {
                            if (event.url.indexOf("http://localhost") == 0) {
                                var callback = parseCallback(event.url);
                                processCallback(callback, promise);
                                closeBrowser();
                                completed = true;
                            } else {
                                promise.setError();
                                closeBrowser();
                            }
                        }
                    });
                    ref.addEventListener("exit", function(event) {
                        if (!closed) promise.setError({
                            reason: "closed_by_user"
                        });
                    });
                    return promise.promise;
                },
                logout: function(options) {
                    var promise = createPromise();
                    var logoutUrl = kc.createLogoutUrl(options);
                    var ref = cordovaOpenWindowWrapper(logoutUrl, "_blank", "location=no,hidden=yes,clearcache=yes");
                    var error;
                    ref.addEventListener("loadstart", function(event) {
                        if (event.url.indexOf("http://localhost") == 0) ref.close();
                    });
                    ref.addEventListener("loaderror", function(event) {
                        if (event.url.indexOf("http://localhost") == 0) ref.close();
                        else {
                            error = true;
                            ref.close();
                        }
                    });
                    ref.addEventListener("exit", function(event) {
                        if (error) promise.setError();
                        else {
                            kc.clearToken();
                            promise.setSuccess();
                        }
                    });
                    return promise.promise;
                },
                register: function(options) {
                    var promise = createPromise();
                    var registerUrl = kc.createRegisterUrl();
                    var cordovaOptions = createCordovaOptions(options);
                    var ref = cordovaOpenWindowWrapper(registerUrl, "_blank", cordovaOptions);
                    ref.addEventListener("loadstart", function(event) {
                        if (event.url.indexOf("http://localhost") == 0) {
                            ref.close();
                            var oauth = parseCallback(event.url);
                            processCallback(oauth, promise);
                        }
                    });
                    return promise.promise;
                },
                accountManagement: function() {
                    var accountUrl = kc.createAccountUrl();
                    if (typeof accountUrl !== "undefined") {
                        var ref = cordovaOpenWindowWrapper(accountUrl, "_blank", "location=no");
                        ref.addEventListener("loadstart", function(event) {
                            if (event.url.indexOf("http://localhost") == 0) ref.close();
                        });
                    } else throw "Not supported by the OIDC server";
                },
                redirectUri: function(options) {
                    return "http://localhost";
                }
            };
        }
        if (type == "cordova-native") {
            loginIframe.enable = false;
            return {
                login: function(options) {
                    var promise = createPromise();
                    var loginUrl = kc.createLoginUrl(options);
                    universalLinks.subscribe("keycloak", function(event) {
                        universalLinks.unsubscribe("keycloak");
                        window.cordova.plugins.browsertab.close();
                        var oauth = parseCallback(event.url);
                        processCallback(oauth, promise);
                    });
                    window.cordova.plugins.browsertab.openUrl(loginUrl);
                    return promise.promise;
                },
                logout: function(options) {
                    var promise = createPromise();
                    var logoutUrl = kc.createLogoutUrl(options);
                    universalLinks.subscribe("keycloak", function(event) {
                        universalLinks.unsubscribe("keycloak");
                        window.cordova.plugins.browsertab.close();
                        kc.clearToken();
                        promise.setSuccess();
                    });
                    window.cordova.plugins.browsertab.openUrl(logoutUrl);
                    return promise.promise;
                },
                register: function(options) {
                    var promise = createPromise();
                    var registerUrl = kc.createRegisterUrl(options);
                    universalLinks.subscribe("keycloak", function(event) {
                        universalLinks.unsubscribe("keycloak");
                        window.cordova.plugins.browsertab.close();
                        var oauth = parseCallback(event.url);
                        processCallback(oauth, promise);
                    });
                    window.cordova.plugins.browsertab.openUrl(registerUrl);
                    return promise.promise;
                },
                accountManagement: function() {
                    var accountUrl = kc.createAccountUrl();
                    if (typeof accountUrl !== "undefined") window.cordova.plugins.browsertab.openUrl(accountUrl);
                    else throw "Not supported by the OIDC server";
                },
                redirectUri: function(options) {
                    if (options && options.redirectUri) return options.redirectUri;
                    else if (kc.redirectUri) return kc.redirectUri;
                    else return "http://localhost";
                }
            };
        }
        throw "invalid adapter type: " + type;
    }
    var LocalStorage = function() {
        if (!(this instanceof LocalStorage)) return new LocalStorage();
        localStorage.setItem("kc-test", "test");
        localStorage.removeItem("kc-test");
        var cs = this;
        function clearExpired() {
            var time = new Date().getTime();
            for(var i = 0; i < localStorage.length; i++){
                var key = localStorage.key(i);
                if (key && key.indexOf("kc-callback-") == 0) {
                    var value = localStorage.getItem(key);
                    if (value) try {
                        var expires = JSON.parse(value).expires;
                        if (!expires || expires < time) localStorage.removeItem(key);
                    } catch (err) {
                        localStorage.removeItem(key);
                    }
                }
            }
        }
        cs.get = function(state) {
            if (!state) return;
            var key = "kc-callback-" + state;
            var value = localStorage.getItem(key);
            if (value) {
                localStorage.removeItem(key);
                value = JSON.parse(value);
            }
            clearExpired();
            return value;
        };
        cs.add = function(state) {
            clearExpired();
            var key = "kc-callback-" + state.state;
            state.expires = new Date().getTime() + 3600000;
            localStorage.setItem(key, JSON.stringify(state));
        };
    };
    var CookieStorage = function() {
        if (!(this instanceof CookieStorage)) return new CookieStorage();
        var cs = this;
        cs.get = function(state) {
            if (!state) return;
            var value = getCookie("kc-callback-" + state);
            setCookie("kc-callback-" + state, "", cookieExpiration(-100));
            if (value) return JSON.parse(value);
        };
        cs.add = function(state) {
            setCookie("kc-callback-" + state.state, JSON.stringify(state), cookieExpiration(60));
        };
        cs.removeItem = function(key) {
            setCookie(key, "", cookieExpiration(-100));
        };
        var cookieExpiration = function(minutes) {
            var exp = new Date();
            exp.setTime(exp.getTime() + minutes * 60000);
            return exp;
        };
        var getCookie = function(key) {
            var name = key + "=";
            var ca = document.cookie.split(";");
            for(var i = 0; i < ca.length; i++){
                var c = ca[i];
                while(c.charAt(0) == " ")c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
            }
            return "";
        };
        var setCookie = function(key, value, expirationDate) {
            var cookie = key + "=" + value + "; " + "expires=" + expirationDate.toUTCString() + "; ";
            document.cookie = cookie;
        };
    };
    function createCallbackStorage() {
        try {
            return new LocalStorage();
        } catch (err) {}
        return new CookieStorage();
    }
    function createLogger(fn) {
        return function() {
            if (kc.enableLogging) fn.apply(console, Array.prototype.slice.call(arguments));
        };
    }
}

},{"base64-js":"eIiSV","js-sha256":"ahVaM","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eIiSV":[function(require,module,exports) {
"use strict";
exports.byteLength = byteLength;
exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for(var i = 0, len = code.length; i < len; ++i){
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
}
// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup["-".charCodeAt(0)] = 62;
revLookup["_".charCodeAt(0)] = 63;
function getLens(b64) {
    var len = b64.length;
    if (len % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    // Trim off extra bytes after placeholder bytes are found
    // See: https://github.com/beatgammit/base64-js/issues/42
    var validLen = b64.indexOf("=");
    if (validLen === -1) validLen = len;
    var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
    return [
        validLen,
        placeHoldersLen
    ];
}
// base64 is 4/3 + up to two characters of the original data
function byteLength(b64) {
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function _byteLength(b64, validLen, placeHoldersLen) {
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function toByteArray(b64) {
    var tmp;
    var lens = getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
    var curByte = 0;
    // if there are placeholders, only get up to the last complete 4 chars
    var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
    var i;
    for(i = 0; i < len; i += 4){
        tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
        arr[curByte++] = tmp >> 16 & 0xFF;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
    }
    if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
        arr[curByte++] = tmp & 0xFF;
    }
    if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
    }
    return arr;
}
function tripletToBase64(num) {
    return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
}
function encodeChunk(uint8, start, end) {
    var tmp;
    var output = [];
    for(var i = start; i < end; i += 3){
        tmp = (uint8[i] << 16 & 0xFF0000) + (uint8[i + 1] << 8 & 0xFF00) + (uint8[i + 2] & 0xFF);
        output.push(tripletToBase64(tmp));
    }
    return output.join("");
}
function fromByteArray(uint8) {
    var tmp;
    var len = uint8.length;
    var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
    ;
    var parts = [];
    var maxChunkLength = 16383 // must be multiple of 3
    ;
    // go through the array every three bytes, we'll deal with trailing stuff later
    for(var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength)parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
    // pad the end with zeros, but make sure to not forget the extra bytes
    if (extraBytes === 1) {
        tmp = uint8[len - 1];
        parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 0x3F] + "==");
    } else if (extraBytes === 2) {
        tmp = (uint8[len - 2] << 8) + uint8[len - 1];
        parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 0x3F] + lookup[tmp << 2 & 0x3F] + "=");
    }
    return parts.join("");
}

},{}],"ahVaM":[function(require,module,exports) {
var process = require("process");
var global = arguments[3];
/**
 * [js-sha256]{@link https://github.com/emn178/js-sha256}
 *
 * @version 0.9.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */ /*jslint bitwise: true */ (function() {
    "use strict";
    var ERROR = "input is invalid type";
    var WINDOW = typeof window === "object";
    var root = WINDOW ? window : {};
    if (root.JS_SHA256_NO_WINDOW) WINDOW = false;
    var WEB_WORKER = !WINDOW && typeof self === "object";
    var NODE_JS = !root.JS_SHA256_NO_NODE_JS && typeof process === "object" && process.versions && process.versions.node;
    if (NODE_JS) root = global;
    else if (WEB_WORKER) root = self;
    var COMMON_JS = !root.JS_SHA256_NO_COMMON_JS && true && module.exports;
    var AMD = typeof define === "function" && define.amd;
    var ARRAY_BUFFER = !root.JS_SHA256_NO_ARRAY_BUFFER && typeof ArrayBuffer !== "undefined";
    var HEX_CHARS = "0123456789abcdef".split("");
    var EXTRA = [
        -2147483648,
        8388608,
        32768,
        128
    ];
    var SHIFT = [
        24,
        16,
        8,
        0
    ];
    var K = [
        0x428a2f98,
        0x71374491,
        0xb5c0fbcf,
        0xe9b5dba5,
        0x3956c25b,
        0x59f111f1,
        0x923f82a4,
        0xab1c5ed5,
        0xd807aa98,
        0x12835b01,
        0x243185be,
        0x550c7dc3,
        0x72be5d74,
        0x80deb1fe,
        0x9bdc06a7,
        0xc19bf174,
        0xe49b69c1,
        0xefbe4786,
        0x0fc19dc6,
        0x240ca1cc,
        0x2de92c6f,
        0x4a7484aa,
        0x5cb0a9dc,
        0x76f988da,
        0x983e5152,
        0xa831c66d,
        0xb00327c8,
        0xbf597fc7,
        0xc6e00bf3,
        0xd5a79147,
        0x06ca6351,
        0x14292967,
        0x27b70a85,
        0x2e1b2138,
        0x4d2c6dfc,
        0x53380d13,
        0x650a7354,
        0x766a0abb,
        0x81c2c92e,
        0x92722c85,
        0xa2bfe8a1,
        0xa81a664b,
        0xc24b8b70,
        0xc76c51a3,
        0xd192e819,
        0xd6990624,
        0xf40e3585,
        0x106aa070,
        0x19a4c116,
        0x1e376c08,
        0x2748774c,
        0x34b0bcb5,
        0x391c0cb3,
        0x4ed8aa4a,
        0x5b9cca4f,
        0x682e6ff3,
        0x748f82ee,
        0x78a5636f,
        0x84c87814,
        0x8cc70208,
        0x90befffa,
        0xa4506ceb,
        0xbef9a3f7,
        0xc67178f2
    ];
    var OUTPUT_TYPES = [
        "hex",
        "array",
        "digest",
        "arrayBuffer"
    ];
    var blocks = [];
    if (root.JS_SHA256_NO_NODE_JS || !Array.isArray) Array.isArray = function(obj) {
        return Object.prototype.toString.call(obj) === "[object Array]";
    };
    if (ARRAY_BUFFER && (root.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) ArrayBuffer.isView = function(obj) {
        return typeof obj === "object" && obj.buffer && obj.buffer.constructor === ArrayBuffer;
    };
    var createOutputMethod = function(outputType, is224) {
        return function(message) {
            return new Sha256(is224, true).update(message)[outputType]();
        };
    };
    var createMethod = function(is224) {
        var method = createOutputMethod("hex", is224);
        if (NODE_JS) method = nodeWrap(method, is224);
        method.create = function() {
            return new Sha256(is224);
        };
        method.update = function(message) {
            return method.create().update(message);
        };
        for(var i = 0; i < OUTPUT_TYPES.length; ++i){
            var type = OUTPUT_TYPES[i];
            method[type] = createOutputMethod(type, is224);
        }
        return method;
    };
    var nodeWrap = function(method, is224) {
        var crypto = eval("require('crypto')");
        var Buffer = eval("require('buffer').Buffer");
        var algorithm = is224 ? "sha224" : "sha256";
        var nodeMethod = function(message) {
            if (typeof message === "string") return crypto.createHash(algorithm).update(message, "utf8").digest("hex");
            else {
                if (message === null || message === undefined) throw new Error(ERROR);
                else if (message.constructor === ArrayBuffer) message = new Uint8Array(message);
            }
            if (Array.isArray(message) || ArrayBuffer.isView(message) || message.constructor === Buffer) return crypto.createHash(algorithm).update(new Buffer(message)).digest("hex");
            else return method(message);
        };
        return nodeMethod;
    };
    var createHmacOutputMethod = function(outputType, is224) {
        return function(key, message) {
            return new HmacSha256(key, is224, true).update(message)[outputType]();
        };
    };
    var createHmacMethod = function(is224) {
        var method = createHmacOutputMethod("hex", is224);
        method.create = function(key) {
            return new HmacSha256(key, is224);
        };
        method.update = function(key, message) {
            return method.create(key).update(message);
        };
        for(var i = 0; i < OUTPUT_TYPES.length; ++i){
            var type = OUTPUT_TYPES[i];
            method[type] = createHmacOutputMethod(type, is224);
        }
        return method;
    };
    function Sha256(is224, sharedMemory) {
        if (sharedMemory) {
            blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
            this.blocks = blocks;
        } else this.blocks = [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0
        ];
        if (is224) {
            this.h0 = 0xc1059ed8;
            this.h1 = 0x367cd507;
            this.h2 = 0x3070dd17;
            this.h3 = 0xf70e5939;
            this.h4 = 0xffc00b31;
            this.h5 = 0x68581511;
            this.h6 = 0x64f98fa7;
            this.h7 = 0xbefa4fa4;
        } else {
            this.h0 = 0x6a09e667;
            this.h1 = 0xbb67ae85;
            this.h2 = 0x3c6ef372;
            this.h3 = 0xa54ff53a;
            this.h4 = 0x510e527f;
            this.h5 = 0x9b05688c;
            this.h6 = 0x1f83d9ab;
            this.h7 = 0x5be0cd19;
        }
        this.block = this.start = this.bytes = this.hBytes = 0;
        this.finalized = this.hashed = false;
        this.first = true;
        this.is224 = is224;
    }
    Sha256.prototype.update = function(message) {
        if (this.finalized) return;
        var notString, type = typeof message;
        if (type !== "string") {
            if (type === "object") {
                if (message === null) throw new Error(ERROR);
                else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) message = new Uint8Array(message);
                else if (!Array.isArray(message)) {
                    if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) throw new Error(ERROR);
                }
            } else throw new Error(ERROR);
            notString = true;
        }
        var code, index = 0, i, length = message.length, blocks = this.blocks;
        while(index < length){
            if (this.hashed) {
                this.hashed = false;
                blocks[0] = this.block;
                blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
            }
            if (notString) for(i = this.start; index < length && i < 64; ++index)blocks[i >> 2] |= message[index] << SHIFT[(i++) & 3];
            else for(i = this.start; index < length && i < 64; ++index){
                code = message.charCodeAt(index);
                if (code < 0x80) blocks[i >> 2] |= code << SHIFT[(i++) & 3];
                else if (code < 0x800) {
                    blocks[i >> 2] |= (0xc0 | code >> 6) << SHIFT[(i++) & 3];
                    blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[(i++) & 3];
                } else if (code < 0xd800 || code >= 0xe000) {
                    blocks[i >> 2] |= (0xe0 | code >> 12) << SHIFT[(i++) & 3];
                    blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[(i++) & 3];
                    blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[(i++) & 3];
                } else {
                    code = 0x10000 + ((code & 0x3ff) << 10 | message.charCodeAt(++index) & 0x3ff);
                    blocks[i >> 2] |= (0xf0 | code >> 18) << SHIFT[(i++) & 3];
                    blocks[i >> 2] |= (0x80 | code >> 12 & 0x3f) << SHIFT[(i++) & 3];
                    blocks[i >> 2] |= (0x80 | code >> 6 & 0x3f) << SHIFT[(i++) & 3];
                    blocks[i >> 2] |= (0x80 | code & 0x3f) << SHIFT[(i++) & 3];
                }
            }
            this.lastByteIndex = i;
            this.bytes += i - this.start;
            if (i >= 64) {
                this.block = blocks[16];
                this.start = i - 64;
                this.hash();
                this.hashed = true;
            } else this.start = i;
        }
        if (this.bytes > 4294967295) {
            this.hBytes += this.bytes / 4294967296 << 0;
            this.bytes = this.bytes % 4294967296;
        }
        return this;
    };
    Sha256.prototype.finalize = function() {
        if (this.finalized) return;
        this.finalized = true;
        var blocks = this.blocks, i = this.lastByteIndex;
        blocks[16] = this.block;
        blocks[i >> 2] |= EXTRA[i & 3];
        this.block = blocks[16];
        if (i >= 56) {
            if (!this.hashed) this.hash();
            blocks[0] = this.block;
            blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
        }
        blocks[14] = this.hBytes << 3 | this.bytes >>> 29;
        blocks[15] = this.bytes << 3;
        this.hash();
    };
    Sha256.prototype.hash = function() {
        var a = this.h0, b = this.h1, c = this.h2, d = this.h3, e = this.h4, f = this.h5, g = this.h6, h = this.h7, blocks = this.blocks, j, s0, s1, maj, t1, t2, ch, ab, da, cd, bc;
        for(j = 16; j < 64; ++j){
            // rightrotate
            t1 = blocks[j - 15];
            s0 = (t1 >>> 7 | t1 << 25) ^ (t1 >>> 18 | t1 << 14) ^ t1 >>> 3;
            t1 = blocks[j - 2];
            s1 = (t1 >>> 17 | t1 << 15) ^ (t1 >>> 19 | t1 << 13) ^ t1 >>> 10;
            blocks[j] = blocks[j - 16] + s0 + blocks[j - 7] + s1 << 0;
        }
        bc = b & c;
        for(j = 0; j < 64; j += 4){
            if (this.first) {
                if (this.is224) {
                    ab = 300032;
                    t1 = blocks[0] - 1413257819;
                    h = t1 - 150054599 << 0;
                    d = t1 + 24177077 << 0;
                } else {
                    ab = 704751109;
                    t1 = blocks[0] - 210244248;
                    h = t1 - 1521486534 << 0;
                    d = t1 + 143694565 << 0;
                }
                this.first = false;
            } else {
                s0 = (a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^ (a >>> 22 | a << 10);
                s1 = (e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^ (e >>> 25 | e << 7);
                ab = a & b;
                maj = ab ^ a & c ^ bc;
                ch = e & f ^ ~e & g;
                t1 = h + s1 + ch + K[j] + blocks[j];
                t2 = s0 + maj;
                h = d + t1 << 0;
                d = t1 + t2 << 0;
            }
            s0 = (d >>> 2 | d << 30) ^ (d >>> 13 | d << 19) ^ (d >>> 22 | d << 10);
            s1 = (h >>> 6 | h << 26) ^ (h >>> 11 | h << 21) ^ (h >>> 25 | h << 7);
            da = d & a;
            maj = da ^ d & b ^ ab;
            ch = h & e ^ ~h & f;
            t1 = g + s1 + ch + K[j + 1] + blocks[j + 1];
            t2 = s0 + maj;
            g = c + t1 << 0;
            c = t1 + t2 << 0;
            s0 = (c >>> 2 | c << 30) ^ (c >>> 13 | c << 19) ^ (c >>> 22 | c << 10);
            s1 = (g >>> 6 | g << 26) ^ (g >>> 11 | g << 21) ^ (g >>> 25 | g << 7);
            cd = c & d;
            maj = cd ^ c & a ^ da;
            ch = g & h ^ ~g & e;
            t1 = f + s1 + ch + K[j + 2] + blocks[j + 2];
            t2 = s0 + maj;
            f = b + t1 << 0;
            b = t1 + t2 << 0;
            s0 = (b >>> 2 | b << 30) ^ (b >>> 13 | b << 19) ^ (b >>> 22 | b << 10);
            s1 = (f >>> 6 | f << 26) ^ (f >>> 11 | f << 21) ^ (f >>> 25 | f << 7);
            bc = b & c;
            maj = bc ^ b & d ^ cd;
            ch = f & g ^ ~f & h;
            t1 = e + s1 + ch + K[j + 3] + blocks[j + 3];
            t2 = s0 + maj;
            e = a + t1 << 0;
            a = t1 + t2 << 0;
        }
        this.h0 = this.h0 + a << 0;
        this.h1 = this.h1 + b << 0;
        this.h2 = this.h2 + c << 0;
        this.h3 = this.h3 + d << 0;
        this.h4 = this.h4 + e << 0;
        this.h5 = this.h5 + f << 0;
        this.h6 = this.h6 + g << 0;
        this.h7 = this.h7 + h << 0;
    };
    Sha256.prototype.hex = function() {
        this.finalize();
        var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4, h5 = this.h5, h6 = this.h6, h7 = this.h7;
        var hex = HEX_CHARS[h0 >> 28 & 0x0F] + HEX_CHARS[h0 >> 24 & 0x0F] + HEX_CHARS[h0 >> 20 & 0x0F] + HEX_CHARS[h0 >> 16 & 0x0F] + HEX_CHARS[h0 >> 12 & 0x0F] + HEX_CHARS[h0 >> 8 & 0x0F] + HEX_CHARS[h0 >> 4 & 0x0F] + HEX_CHARS[h0 & 0x0F] + HEX_CHARS[h1 >> 28 & 0x0F] + HEX_CHARS[h1 >> 24 & 0x0F] + HEX_CHARS[h1 >> 20 & 0x0F] + HEX_CHARS[h1 >> 16 & 0x0F] + HEX_CHARS[h1 >> 12 & 0x0F] + HEX_CHARS[h1 >> 8 & 0x0F] + HEX_CHARS[h1 >> 4 & 0x0F] + HEX_CHARS[h1 & 0x0F] + HEX_CHARS[h2 >> 28 & 0x0F] + HEX_CHARS[h2 >> 24 & 0x0F] + HEX_CHARS[h2 >> 20 & 0x0F] + HEX_CHARS[h2 >> 16 & 0x0F] + HEX_CHARS[h2 >> 12 & 0x0F] + HEX_CHARS[h2 >> 8 & 0x0F] + HEX_CHARS[h2 >> 4 & 0x0F] + HEX_CHARS[h2 & 0x0F] + HEX_CHARS[h3 >> 28 & 0x0F] + HEX_CHARS[h3 >> 24 & 0x0F] + HEX_CHARS[h3 >> 20 & 0x0F] + HEX_CHARS[h3 >> 16 & 0x0F] + HEX_CHARS[h3 >> 12 & 0x0F] + HEX_CHARS[h3 >> 8 & 0x0F] + HEX_CHARS[h3 >> 4 & 0x0F] + HEX_CHARS[h3 & 0x0F] + HEX_CHARS[h4 >> 28 & 0x0F] + HEX_CHARS[h4 >> 24 & 0x0F] + HEX_CHARS[h4 >> 20 & 0x0F] + HEX_CHARS[h4 >> 16 & 0x0F] + HEX_CHARS[h4 >> 12 & 0x0F] + HEX_CHARS[h4 >> 8 & 0x0F] + HEX_CHARS[h4 >> 4 & 0x0F] + HEX_CHARS[h4 & 0x0F] + HEX_CHARS[h5 >> 28 & 0x0F] + HEX_CHARS[h5 >> 24 & 0x0F] + HEX_CHARS[h5 >> 20 & 0x0F] + HEX_CHARS[h5 >> 16 & 0x0F] + HEX_CHARS[h5 >> 12 & 0x0F] + HEX_CHARS[h5 >> 8 & 0x0F] + HEX_CHARS[h5 >> 4 & 0x0F] + HEX_CHARS[h5 & 0x0F] + HEX_CHARS[h6 >> 28 & 0x0F] + HEX_CHARS[h6 >> 24 & 0x0F] + HEX_CHARS[h6 >> 20 & 0x0F] + HEX_CHARS[h6 >> 16 & 0x0F] + HEX_CHARS[h6 >> 12 & 0x0F] + HEX_CHARS[h6 >> 8 & 0x0F] + HEX_CHARS[h6 >> 4 & 0x0F] + HEX_CHARS[h6 & 0x0F];
        if (!this.is224) hex += HEX_CHARS[h7 >> 28 & 0x0F] + HEX_CHARS[h7 >> 24 & 0x0F] + HEX_CHARS[h7 >> 20 & 0x0F] + HEX_CHARS[h7 >> 16 & 0x0F] + HEX_CHARS[h7 >> 12 & 0x0F] + HEX_CHARS[h7 >> 8 & 0x0F] + HEX_CHARS[h7 >> 4 & 0x0F] + HEX_CHARS[h7 & 0x0F];
        return hex;
    };
    Sha256.prototype.toString = Sha256.prototype.hex;
    Sha256.prototype.digest = function() {
        this.finalize();
        var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4, h5 = this.h5, h6 = this.h6, h7 = this.h7;
        var arr = [
            h0 >> 24 & 0xFF,
            h0 >> 16 & 0xFF,
            h0 >> 8 & 0xFF,
            h0 & 0xFF,
            h1 >> 24 & 0xFF,
            h1 >> 16 & 0xFF,
            h1 >> 8 & 0xFF,
            h1 & 0xFF,
            h2 >> 24 & 0xFF,
            h2 >> 16 & 0xFF,
            h2 >> 8 & 0xFF,
            h2 & 0xFF,
            h3 >> 24 & 0xFF,
            h3 >> 16 & 0xFF,
            h3 >> 8 & 0xFF,
            h3 & 0xFF,
            h4 >> 24 & 0xFF,
            h4 >> 16 & 0xFF,
            h4 >> 8 & 0xFF,
            h4 & 0xFF,
            h5 >> 24 & 0xFF,
            h5 >> 16 & 0xFF,
            h5 >> 8 & 0xFF,
            h5 & 0xFF,
            h6 >> 24 & 0xFF,
            h6 >> 16 & 0xFF,
            h6 >> 8 & 0xFF,
            h6 & 0xFF
        ];
        if (!this.is224) arr.push(h7 >> 24 & 0xFF, h7 >> 16 & 0xFF, h7 >> 8 & 0xFF, h7 & 0xFF);
        return arr;
    };
    Sha256.prototype.array = Sha256.prototype.digest;
    Sha256.prototype.arrayBuffer = function() {
        this.finalize();
        var buffer = new ArrayBuffer(this.is224 ? 28 : 32);
        var dataView = new DataView(buffer);
        dataView.setUint32(0, this.h0);
        dataView.setUint32(4, this.h1);
        dataView.setUint32(8, this.h2);
        dataView.setUint32(12, this.h3);
        dataView.setUint32(16, this.h4);
        dataView.setUint32(20, this.h5);
        dataView.setUint32(24, this.h6);
        if (!this.is224) dataView.setUint32(28, this.h7);
        return buffer;
    };
    function HmacSha256(key, is224, sharedMemory) {
        var i, type = typeof key;
        if (type === "string") {
            var bytes = [], length = key.length, index = 0, code;
            for(i = 0; i < length; ++i){
                code = key.charCodeAt(i);
                if (code < 0x80) bytes[index++] = code;
                else if (code < 0x800) {
                    bytes[index++] = 0xc0 | code >> 6;
                    bytes[index++] = 0x80 | code & 0x3f;
                } else if (code < 0xd800 || code >= 0xe000) {
                    bytes[index++] = 0xe0 | code >> 12;
                    bytes[index++] = 0x80 | code >> 6 & 0x3f;
                    bytes[index++] = 0x80 | code & 0x3f;
                } else {
                    code = 0x10000 + ((code & 0x3ff) << 10 | key.charCodeAt(++i) & 0x3ff);
                    bytes[index++] = 0xf0 | code >> 18;
                    bytes[index++] = 0x80 | code >> 12 & 0x3f;
                    bytes[index++] = 0x80 | code >> 6 & 0x3f;
                    bytes[index++] = 0x80 | code & 0x3f;
                }
            }
            key = bytes;
        } else {
            if (type === "object") {
                if (key === null) throw new Error(ERROR);
                else if (ARRAY_BUFFER && key.constructor === ArrayBuffer) key = new Uint8Array(key);
                else if (!Array.isArray(key)) {
                    if (!ARRAY_BUFFER || !ArrayBuffer.isView(key)) throw new Error(ERROR);
                }
            } else throw new Error(ERROR);
        }
        if (key.length > 64) key = new Sha256(is224, true).update(key).array();
        var oKeyPad = [], iKeyPad = [];
        for(i = 0; i < 64; ++i){
            var b = key[i] || 0;
            oKeyPad[i] = 0x5c ^ b;
            iKeyPad[i] = 0x36 ^ b;
        }
        Sha256.call(this, is224, sharedMemory);
        this.update(iKeyPad);
        this.oKeyPad = oKeyPad;
        this.inner = true;
        this.sharedMemory = sharedMemory;
    }
    HmacSha256.prototype = new Sha256();
    HmacSha256.prototype.finalize = function() {
        Sha256.prototype.finalize.call(this);
        if (this.inner) {
            this.inner = false;
            var innerHash = this.array();
            Sha256.call(this, this.is224, this.sharedMemory);
            this.update(this.oKeyPad);
            this.update(innerHash);
            Sha256.prototype.finalize.call(this);
        }
    };
    var exports = createMethod();
    exports.sha256 = exports;
    exports.sha224 = createMethod(true);
    exports.sha256.hmac = createHmacMethod();
    exports.sha224.hmac = createHmacMethod(true);
    if (COMMON_JS) module.exports = exports;
    else {
        root.sha256 = exports.sha256;
        root.sha224 = exports.sha224;
        if (AMD) define(function() {
            return exports;
        });
    }
})();

},{"process":"d5jf4"}],"d5jf4":[function(require,module,exports) {
// shim for using process in browser
var process = module.exports = {};
// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.
var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
    throw new Error("setTimeout has not been defined");
}
function defaultClearTimeout() {
    throw new Error("clearTimeout has not been defined");
}
(function() {
    try {
        if (typeof setTimeout === "function") cachedSetTimeout = setTimeout;
        else cachedSetTimeout = defaultSetTimout;
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === "function") cachedClearTimeout = clearTimeout;
        else cachedClearTimeout = defaultClearTimeout;
    } catch (e1) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) //normal enviroments in sane situations
    return setTimeout(fun, 0);
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e1) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) //normal enviroments in sane situations
    return clearTimeout(marker);
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e1) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
    if (!draining || !currentQueue) return;
    draining = false;
    if (currentQueue.length) queue = currentQueue.concat(queue);
    else queueIndex = -1;
    if (queue.length) drainQueue();
}
function drainQueue() {
    if (draining) return;
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;
    var len = queue.length;
    while(len){
        currentQueue = queue;
        queue = [];
        while(++queueIndex < len)if (currentQueue) currentQueue[queueIndex].run();
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}
process.nextTick = function(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) for(var i = 1; i < arguments.length; i++)args[i - 1] = arguments[i];
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) runTimeout(drainQueue);
};
// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function() {
    this.fun.apply(null, this.array);
};
process.title = "browser";
process.browser = true;
process.env = {};
process.argv = [];
process.version = ""; // empty string to avoid regexp issues
process.versions = {};
function noop() {}
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;
process.listeners = function(name) {
    return [];
};
process.binding = function(name) {
    throw new Error("process.binding is not supported");
};
process.cwd = function() {
    return "/";
};
process.chdir = function(dir) {
    throw new Error("process.chdir is not supported");
};
process.umask = function() {
    return 0;
};

},{}],"ljM1w":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "InvalidTokenError", ()=>n);
function e(e) {
    this.message = e;
}
e.prototype = new Error, e.prototype.name = "InvalidCharacterError";
var r = "undefined" != typeof window && window.atob && window.atob.bind(window) || function(r) {
    var t = String(r).replace(/=+$/, "");
    if (t.length % 4 == 1) throw new e("'atob' failed: The string to be decoded is not correctly encoded.");
    for(var n, o, a = 0, i = 0, c = ""; o = t.charAt(i++); ~o && (n = a % 4 ? 64 * n + o : o, (a++) % 4) && (c += String.fromCharCode(255 & n >> (-2 * a & 6))))o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(o);
    return c;
};
function t(e) {
    var t = e.replace(/-/g, "+").replace(/_/g, "/");
    switch(t.length % 4){
        case 0:
            break;
        case 2:
            t += "==";
            break;
        case 3:
            t += "=";
            break;
        default:
            throw "Illegal base64url string!";
    }
    try {
        return function(e) {
            return decodeURIComponent(r(e).replace(/(.)/g, function(e, r) {
                var t = r.charCodeAt(0).toString(16).toUpperCase();
                return t.length < 2 && (t = "0" + t), "%" + t;
            }));
        }(t);
    } catch (e1) {
        return r(t);
    }
}
function n(e) {
    this.message = e;
}
function o(e, r) {
    if ("string" != typeof e) throw new n("Invalid token specified");
    var o = !0 === (r = r || {}).header ? 0 : 1;
    try {
        return JSON.parse(t(e.split(".")[o]));
    } catch (e1) {
        throw new n("Invalid token specified: " + e1.message);
    }
}
n.prototype = new Error, n.prototype.name = "InvalidTokenError";
exports.default = o;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jSfBV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _helper = require("../helper");
class ForumData {
    forumData;
    async fetchForumData() {
        const header = {
            "headers": {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            }
        };
        this.forumData = await (0, _helper.AJAX_JSON_HEADER)("http://192.168.1.113:8090/posts", header);
        return this.forumData;
    }
}
exports.default = new ForumData();

},{"../helper":"5MBeC","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5MBeC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "AJAX_JSON", ()=>AJAX_JSON);
parcelHelpers.export(exports, "AJAX_JSON_HEADER", ()=>AJAX_JSON_HEADER);
parcelHelpers.export(exports, "AJAX_PLAIN", ()=>AJAX_PLAIN);
const AJAX_JSON = async function(url) {
    return AJAX_JSON_HEADER(url);
};
const AJAX_JSON_HEADER = async function(url, header) {
    const fetchData = fetch(url, header);
    const response = (await fetchData).json();
    return await response;
};
const AJAX_PLAIN = async function(url) {
    const fetchData = fetch(url);
    const response = (await fetchData).text();
    return await response;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["kHvGx","k5sOC"], "k5sOC", "parcelRequire10c2")

//# sourceMappingURL=forum.dd7395d0.js.map
