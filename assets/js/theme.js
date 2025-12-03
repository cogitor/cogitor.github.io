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

      // Force a complete reload of the Disqus iframe
      var disqusThread = document.getElementById('disqus_thread');
      if (disqusThread && window.DISQUS) {
        // Clear the old iframe
        disqusThread.innerHTML = '';
        
        // Re-run the Disqus loading script
        window.disqus_config = function () {
            this.page.url = disqusThread.getAttribute('post-url');
            this.page.identifier = disqusThread.getAttribute('post-id');
            this.page.theme = newTheme;
        };
        var d = document, s = d.createElement('script');
        s.src = 'https://emvar.disqus.com/embed.js';
        s.setAttribute('data-timestamp', + new Date());
        (d.head || d.body).appendChild(s);
      }
    });
  }
})();