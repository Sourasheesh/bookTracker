document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-mode');
    const body = document.body;
  
    // Check localStorage for mode preference
    if (localStorage.getItem('mode') === 'dark') {
      body.classList.add('dark-mode');
    }
  
    toggleButton.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
  
      // Save the current mode to localStorage
      if (body.classList.contains('dark-mode')) {
        localStorage.setItem('mode', 'dark');
      } else {
        localStorage.setItem('mode', 'light');
      }
    });
  });
  