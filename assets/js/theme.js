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

      // Reload Disqus with the new theme
      if (window.DISQUS) {
        DISQUS.reset({
          reload: true,
          config: function () {
            this.page.theme = newTheme;
            // Make sure to also pass the original URL and identifier
            var disqusThread = document.getElementById('disqus_thread');
            if (disqusThread) {
              this.page.url = disqusThread.getAttribute('post-url');
              this.page.identifier = disqusThread.getAttribute('post-id');
            }
          }
        });
      }
    });
  }
})();