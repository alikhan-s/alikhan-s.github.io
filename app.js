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

    // --- JQUERY: SMOOTH DEVELOPMENT OF SKILLS (FADE-IN) ---

        // Function to check whether an element is visible on the screen
        function isElementInView(element) {
            var rect = element[0].getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }

        // Function for animating cards
        function animateSkills() {
            $('.skill-card-item').each(function(index) {
                // 'this' - this is the current DOM element .skill-card-item
                var $this = $(this); 
                
                // We check whether it is visible.
                if (isElementInView($this)) {
                    $this.delay(index * 100).css({
                        'opacity': 1,
                        'transform': 'translateY(0)'
                    });
                }
            });
        }

        // Call the function when the page loads and when scrolling
        animateSkills(); // First run
        $(window).on('scroll', function() {
            animateSkills(); // Check
        });

    // --- THE END OF LOGIC FADE-IN ---

});