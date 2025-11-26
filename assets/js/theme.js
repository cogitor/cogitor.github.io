(function() {
  var D = document;
  var H = D.documentElement;
  
  // SVG paths for sun and moon icons
  var sunIcon = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
  var moonIcon = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';

  function updateThemeIcon(theme) {
    var themeIcon = D.getElementById('theme-icon');
    if (themeIcon) {
      themeIcon.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
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

