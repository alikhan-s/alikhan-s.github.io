// Wait for the document to be fully loaded before running scripts
$(document).ready(function() {

    // --- THEME SWITCHER LOGIC ---
    // (This is global, it runs on every page)
    const themeToggle = $('#theme-toggle');
    const body = $('body');

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
    applySavedTheme();

    themeToggle.on('click', function() {
        body.toggleClass('dark-mode');
        if (body.hasClass('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.removeClass('bi-moon-fill').addClass('bi-sun-fill');
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.removeClass('bi-sun-fill').addClass('bi-moon-fill');
        }
    });
    // --- END OF THEME SWITCHER LOGIC ---


    
    // --- JQUERY: SKILLS FADE-IN (ONLY FOR HOME PAGE) ---
    // We check if '.skill-card-item' exists before running
    if ($('.skill-card-item').length > 0) {
        
        function isElementInView(element) {
            var rect = element[0].getBoundingClientRect();
            var windowHeight = (window.innerHeight || document.documentElement.clientHeight);
            return (rect.top <= windowHeight - 50);
        }

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
        
        animateSkills();
        $(window).on('scroll', function() {
            animateSkills();
        });
    }
    // --- END OF FADE-IN LOGIC ---



    // --- JQUERY: PROJECT MODAL LOGIC (ONLY FOR PROJECTS PAGE) ---
    // We check if '#projectModal' exists before running
    if ($('#projectModal').length > 0) {
        
        var projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
        var $modalElement = $('#projectModal');
        var $modalContent = $modalElement.find('.modal-content');
        var $modalTitle = $modalElement.find('.modal-title');
        var $modalBody = $modalElement.find('.modal-body');

        $('[data-bs-target="#projectModal"]').on('click', function() {
            var $button = $(this);
            var title = $button.data('title');
            var imageUrl = $button.data('image');
            var $card = $button.closest('.card');
            var fullDescriptionHtml = $card.find('.project-full-description').html();

            $modalTitle.text(title);
            $modalBody.html(fullDescriptionHtml);
            $modalContent.css('background-image', 'url(' + imageUrl + ')');
        });
    }
    // --- END OF MODAL LOGIC ---



    // --- JQUERY: FORM VALIDATION LOGIC (ONLY FOR CONTACT PAGE) ---
    // We check if '#contactForm' exists before running
    if ($('#contactForm').length > 0) {
        
        const $contactForm = $('#contactForm');
        const $name = $('#name');
        const $email = $('#email');
        const $message = $('#message');
        const $formMessage = $('#form-message');

        function setError($input, message) {
            const $feedback = $input.siblings('.invalid-feedback');
            $feedback.text(message);
            $input.removeClass('is-valid').addClass('is-invalid');
        }

        function setSuccess($input) {
            $input.removeClass('is-invalid').addClass('is-valid');
        }

        function isValidEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        function showAlert(message, type) {
            var alertHTML = `
                <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                    ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
            $formMessage.html(alertHTML);
        }

        function validateForm() {
            let isValid = true;
            const nameValue = $name.val().trim();
            const emailValue = $email.val().trim();
            const messageValue = $message.val().trim();

            if (nameValue === '') {
                setError($name, 'Please enter your name.');
                isValid = false;
            } else {
                setSuccess($name);
            }

            if (emailValue === '') {
                setError($email, 'Please enter your email.');
                isValid = false;
            } else if (!isValidEmail(emailValue)) {
                setError($email, 'Please enter a valid email address.');
                isValid = false;
            } else {
                setSuccess($email);
            }

            if (messageValue === '') {
                setError($message, 'Please enter a message.');
                isValid = false;
            } else {
                setSuccess($message);
            }
            
            return isValid;
        }

        $contactForm.on('submit', function(event) {
            event.preventDefault(); 
            
            if (validateForm()) {
                showAlert('Thank you! Your message has been sent (simulation).', 'success');
                $contactForm[0].reset();
                $('.form-control').removeClass('is-valid is-invalid');
            } else {
                showAlert('Please correct the errors in the form.', 'danger');
            }
        });
    }
    // --- END OF FORM VALIDATION LOGIC ---

});