const crypto = require('crypto');

const script1 = `if (window.trustedTypes && window.trustedTypes.createPolicy) {
                window.trustedTypes.createPolicy('default', {
                  createHTML: (string) => string,
                  createScriptURL: (string) => string,
                  createScript: (string) => string,
                });
              }`;

const script2 = `(function() {
  function applyTheme() {
    var t = localStorage.getItem("theme") || "dark";
    if (t !== "dark") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add(t);
    }
  }
  applyTheme();
  // Handle HTMX swaps to ensure theme persists
  document.addEventListener('htmx:afterOnLoad', applyTheme);
})();`;

const script3 = `window.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('click', function(e) {
    var target = e.target.closest('[data-toggle-theme],[data-toggle-menu],[data-print]');
    if (!target) return;
    var d = document.documentElement;
    if (target.hasAttribute('data-toggle-theme')) {
      var n = d.classList.contains('dark') ? 'light' : 'dark';
      d.classList.remove('dark', 'light');
      d.classList.add(n);
      localStorage.setItem('theme', n);
    } else if (target.hasAttribute('data-toggle-menu')) {
      var m = document.getElementById('mobile-menu');
      if (m) m.classList.toggle('hidden');
    } else if (target.hasAttribute('data-print')) {
      window.print();
    }
  });
});`;

const script4 = `window.addEventListener('load', function() {
              var s = document.createElement('script');
              s.src = '/assets/ga.js';
              s.async = true;
              document.body.appendChild(s);
            });`;

console.log("1:", crypto.createHash('sha256').update(script1).digest('base64'));
console.log("2:", crypto.createHash('sha256').update(script2).digest('base64'));
console.log("3:", crypto.createHash('sha256').update(script3).digest('base64'));
console.log("4:", crypto.createHash('sha256').update(script4).digest('base64'));
