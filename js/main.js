
        // Loader
        window.addEventListener('load', function() {
            const loaderContainer = document.querySelector('.loader-container');
            loaderContainer.style.opacity = '0';
            setTimeout(() => {
                loaderContainer.style.display = 'none';
            }, 500);
        });
        
        // Mobile Menu Toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenuClose = document.querySelector('.mobile-menu-close');
        const mobileMenu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.overlay');
        
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        overlay.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
        
        // Mobile Dropdown Toggle
        const dropdownBtns = document.querySelectorAll('.mobile-dropdown-btn');
        
        dropdownBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                this.classList.toggle('active');
                const dropdown = this.nextElementSibling;
                dropdown.classList.toggle('active');
            });
        });
