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
            var windowHeight = (window.innerHeight || document.documentElement.clientHeight);
            
            return (rect.top <= windowHeight - 50);
        }

        // Function for animating cards
        function animateSkills() {
            $('.skill-card-item').each(function(index) {
                var $this = $(this);
                
                if ($this.css('opacity') === '0' && isElementInView($this)) {

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

    // --- JQUERY: PROJECT MODAL LOGIC (GLASSMORPHISM) ---

        // Find our modal (Bootstrap object)
        var projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
        
        // Find the elements inside the modal we need to change
        var $modalElement = $('#projectModal');
        var $modalContent = $modalElement.find('.modal-content'); // The outer wrapper (for the background)
        var $modalTitle = $modalElement.find('.modal-title');
        var $modalBody = $modalElement.find('.modal-body');

        // Listen for a click on ANY button that should open this modal
        $('[data-bs-target="#projectModal"]').on('click', function() {
            // 'this' is the button that was clicked
            var $button = $(this);
            
            // 1. Get the data from the button's 'data-*' attributes
            var title = $button.data('title');
            var imageUrl = $button.data('image');

            // 2. Get the full description HTML from the .project-full-description
            // (We search for it *inside* the same card the button is in)
            var $card = $button.closest('.card');
            var fullDescriptionHtml = $card.find('.project-full-description').html();

            // 3. Dynamically inject the data into the modal
            $modalTitle.text(title);
            $modalBody.html(fullDescriptionHtml);
            
            // 4. THE MOST IMPORTANT PART: Set the background for the glassmorphism effect
            $modalContent.css('background-image', 'url(' + imageUrl + ')');
        });

    // --- END OF MODAL LOGIC ---

});