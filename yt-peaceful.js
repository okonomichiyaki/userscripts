// ==UserScript==
// @name         youtube peaceful mode
// @namespace    http://tampermonkey.net/
// @version      0.1
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  let theaterModeToggled = false;

  function toggle() {
    var nodes = document.querySelectorAll('button.ytp-button');
    for (let node of nodes) {
      let label = node.getAttribute('aria-label');
      if (label) {
        if (label.includes('Autoplay is on')) {
          node.click();
        }
      }
    }

    var theaterMode = document.querySelector('.ytp-size-button');
    if (!theaterModeToggled && theaterMode && theaterMode.getAttribute('title') === "Theater mode (t)") {
      theaterMode.click();
    } else if (!theaterModeToggled && theaterMode && theaterMode.getAttribute('title') === "Default view (t)") {
      theaterModeToggled = true;
    }

    const queries = ["#comments", "#related"];
    for (let query of queries) {
      var node = document.querySelector(query);
      if (node) {
        node.parentNode.removeChild(node);
      }
    }
  }

  setInterval(toggle, 1000);
})();
