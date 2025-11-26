(function() {
  var D = document;
  var H = D.documentElement;
  var theme = localStorage.getItem('theme');

  // Apply theme immediately to avoid FOUC
  var initialTheme = 'light';
  if (theme) {
    initialTheme = theme;
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    initialTheme = 'dark';
  }
  H.setAttribute('data-theme', initialTheme);

  // Defer switcher logic until DOM is ready
  D.addEventListener('DOMContentLoaded', (event) => {
    var themeSwitcher = D.getElementById('theme-switcher');
    var themeIcon = themeSwitcher ? themeSwitcher.querySelector('span') : null;
    
    // Set initial icon
    if (themeIcon) {
        themeIcon.innerHTML = H.getAttribute('data-theme') === 'dark' ? '&#127769;' : '&#9728;&#65039;';
    }

    if (themeSwitcher) {
      themeSwitcher.addEventListener('click', function(e) {
        e.preventDefault();
        var currentTheme = H.getAttribute('data-theme');
        var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        H.setAttribute('data-theme', newTheme);
        if (themeIcon) {
            themeIcon.innerHTML = newTheme === 'dark' ? '&#127769;' : '&#9728;&#65039;';
        }
      });
    }
  });
})();