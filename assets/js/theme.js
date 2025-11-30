(function() {
  var D = document;
  var H = D.documentElement;
  var themeSwitcher = D.getElementById('theme-switcher');
  if (themeSwitcher) {
    themeSwitcher.addEventListener('click', function(e) {
      e.preventDefault();
      var currentTheme = H.getAttribute('data-theme');
      var newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      localStorage.setItem('theme', newTheme);
      H.setAttribute('data-theme', newTheme);
    });
  }
})();