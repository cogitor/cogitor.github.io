(function() {
  var D = document;
  var H = D.documentElement;
  
  function updateThemeIcon(theme) {
    var themeSwitcher = D.getElementById('theme-switcher');
    var themeIcon = themeSwitcher ? themeSwitcher.querySelector('span') : null;
    if (themeIcon) {
      themeIcon.innerHTML = theme === 'dark' ? '&#127769;' : '&#9728;&#65039;';
    }
  }

  // Set initial icon based on current theme
  var currentTheme = H.getAttribute('data-theme') || 'light';
  updateThemeIcon(currentTheme);

  // Handle theme switcher clicks
  var themeSwitcher = D.getElementById('theme-switcher');
  if (themeSwitcher) {
    themeSwitcher.addEventListener('click', function(e) {
      e.preventDefault();
      var theme = H.getAttribute('data-theme');
      var newTheme = theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      H.setAttribute('data-theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }
})();
