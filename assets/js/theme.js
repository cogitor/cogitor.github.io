(function() {
  var D = document;
  var H = D.documentElement;
  var theme = localStorage.getItem('theme');
  var themeSwitcher = D.getElementById('theme-switcher');

  function applyTheme(t) {
    H.setAttribute('data-theme', t);
    themeSwitcher.innerHTML = t === 'dark' ? '&#127769;' : '&#9728;&#65039;';
  }

  if (theme) {
    applyTheme(theme);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    applyTheme('dark');
  } else {
    applyTheme('light'); // Explicitly set light as default fallback
  }

  themeSwitcher.addEventListener('click', function(e) {
    e.preventDefault();
    var currentTheme = H.getAttribute('data-theme');
    var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  });
})();