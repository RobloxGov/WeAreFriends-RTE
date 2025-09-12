window.addEventListener("DOMContentLoaded", () => {
    const header = document.getElementById("header");
    const mobileMenu = document.getElementById("mobile-menu");

    // HTML header-container
    const headerHTML = `
        <div class="header-container">
            <div class="logo-container">
                <img src="/img/KMITL_Sublogo.svg.png" alt="KMITL Logo">
                <img src="/img/rte13.png" alt="RTE13 Logo">
            </div>
            
            <nav class="nav-desktop">
                <ul>
                    <li>
                        <a href="#">เกี่ยวกับ</a>
                        <ul class="dropdown-menu">
                            <li><a href="#">สมาชิก</a></li>
                            <li><a href="#">ตารางเรียน/สอบ</a></li>
                            <li><a href="/file/เล่มหลักสูตร.pdf">หลักสูตร</a></li>
                            <li><a href="#">ปฏิทิน</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">สำหรับนักศึกษา</a>
                        <ul class="dropdown-menu">
                            <li><a href="#">ลงทะเบียนเรียน</a></li>
                            <li><a href="#">ตารางเรียน/สอบ</a></li>
                            <li><a href="#">REG KMITL</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">ผู้บริหาร</a>
                        <ul class="dropdown-menu">
                            <li><a href="/executive/info-executive">คณะกรรมการบริหาร</a></li>
                            <li><a href="#">โครงสร้างองค์กร</a></li>
                        </ul>
                    </li>
                </ul>
                <a href="/login" class="login-btn">เข้าสู่ระบบ</a>
            </nav>
            
            <div class="mobile-menu-btn">
                <i class="fa-solid fa-bars" id="menu-icon"></i>
            </div>
        </div>
    `;

    // HTML mobile-menu
    const mobileMenuHTML = `
        <div class="mobile-menu-header">
            <div class="logo-container">
                <img src="/img/KMITL_Sublogo.svg.png" alt="KMITL Logo" style="height: 40px;">
                <img src="/img/rte13.png" alt="RTE13 Logo" style="height: 40px;">
            </div>
            <div class="mobile-menu-close"><i class="fa-solid fa-xmark"></i></div>
        </div>

        <ul class="mobile-nav">
            <li>
                <button class="mobile-dropdown-btn">เกี่ยวกับ</button>
                <ul class="mobile-dropdown">
                    <li><a href="#">สมาชิก</a></li>
                    <li><a href="#">ตารางเรียน/สอบ</a></li>
                    <li><a href="/file/เล่มหลักสูตร.pdf">หลักสูตร</a></li>
                    <li><a href="#">ปฏิทิน</a></li>
                </ul>
            </li>
            <li>
                <button class="mobile-dropdown-btn">สำหรับนักศึกษา</button>
                <ul class="mobile-dropdown">
                    <li><a href="#">ลงทะเบียนเรียน</a></li>
                    <li><a href="#">ตารางเรียน/สอบ</a></li>
                    <li><a href="#">REG KMITL</a></li>
                </ul>
            </li>
            <li>
                <button class="mobile-dropdown-btn">ผู้บริหาร</button>
                <ul class="mobile-dropdown">
                    <li><a href="#">คณะกรรมการบริหาร</a></li>
                    <li><a href="#">โครงสร้างองค์กร</a></li>
                </ul>
            </li>
            <li>
                <a href="#"
                    style="display: block; background-color: #f16322; color: white; text-align: center; margin: 10px; border-radius: 5px; padding: 10px;">
                    เข้าสู่ระบบ(สมาชิก RTE13)
                </a>
            </li>
        </ul>
    `;

    // แทรก HTML
    header.innerHTML = headerHTML;
    mobileMenu.innerHTML = mobileMenuHTML;

    // ซ่อน loader
    const loader = document.querySelector(".loader-container");
    if (loader) {
        loader.style.opacity = "0";
        loader.style.display = "none";
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
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
});


