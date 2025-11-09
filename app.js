// Wait for the document to be fully loaded before running scripts
$(document).ready(function() {

    // --- THEME SWITCHER LOGIC ---

    const themeToggle = $('#theme-toggle');
    const body = $('body');

    // Function to apply the saved theme on page load
    function applySavedTheme() {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.addClass('dark-mode');
            themeToggle.removeClass('bi-moon-fill').addClass('bi-sun-fill');
        } else {
            body.removeClass('dark-mode');
            themeToggle.removeClass('bi-sun-fill').addClass('bi-moon-fill');
        }
    }

    // Apply the theme when the page loads
    applySavedTheme();

    // Click event handler for the theme toggle button
    themeToggle.on('click', function() {
        body.toggleClass('dark-mode');

        // Save the new theme preference to localStorage
        if (body.hasClass('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.removeClass('bi-moon-fill').addClass('bi-sun-fill');
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.removeClass('bi-sun-fill').addClass('bi-moon-fill');
        }
    });

    // --- END OF THEME SWITCHER LOGIC ---

});