import './cmp-leaderboard.js';
class CmpHeader extends HTMLElement {
  constructor() {
    super();
    this.isDarkMode = false;
  }

  connectedCallback() {
    this.render();
    this.addEvents();
    this.applyTheme();
  }

  applyTheme() {
    if (this.isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
    
    const themeBtn = this.querySelector('.theme-toggle');
    const header = this.querySelector('.header');
    
    if (this.isDarkMode) {
      themeBtn.classList.add('dark');
      header.classList.add('dark-mode');
    } else {
      themeBtn.classList.remove('dark');
      header.classList.remove('dark-mode');
    }
  }

  addEvents() {
    const profileImg = this.querySelector(".profile-img");
    const menuBtn = this.querySelector(".menu-btn");
    const navLinks = this.querySelector(".nav-links");
    const themeToggle = this.querySelector(".theme-toggle");
    const trophyImg = this.querySelector(".trophy-img");
    
    // Profile navigation
    profileImg.addEventListener("click", () => {
      const user = JSON.parse(localStorage.getItem("user") || "null");
      const center = JSON.parse(localStorage.getItem("center") || "null");

      if (center?.id) {
        console.log('🏢 Center profile руу шилжиж байна...');
        window.location.hash = "#/center-profile";
      } else if (user?.id) {
        console.log('👤 User profile руу шилжиж байна...');
        window.location.hash = "#/profile";
      } else {
        console.log('🔐 Login хуудас руу шилжиж байна...');
        window.location.hash = "#/login";
      }
    });

    // Mobile menu toggle
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuBtn.classList.toggle("active");
    });

    // Theme toggle
    themeToggle.addEventListener("click", () => {
      this.toggleTheme();
    });

    // Trophy click - Open leaderboard
    trophyImg.addEventListener("click", () => {
      const leaderboard = document.querySelector('cmp-leaderboard');
      if (leaderboard) {
        leaderboard.open();
      } else {
        console.error('cmp-leaderboard component олдсонгүй!');
      }
    });

    // Close mobile menu when clicking nav links
    const links = this.querySelectorAll(".nav-links a");
    links.forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.classList.remove("active");
      });
    });
  }

  render() {
    this.innerHTML = /*html*/ `
      <header class="header">
        <div class="nav-bar">
          <div class="logo">
            <img src="zurags/logo.webp" alt="Logo">
          </div>

          <nav class="nav-links">
            <a href="#/">Нүүр</a>
            <a href="#/about">Бидний тухай</a>
            <a href="#/contact">Холбоо барих</a>
          </nav>

          <div class="right-section">
            <button class="theme-toggle" aria-label="Toggle theme"></button>
            <div class="search-bar">
              <img src="zurags/search.webp" width="18" alt="Search">
              <input type="text" placeholder="Хайх">
            </div>
            <img src="zurags/trophy2.webp" class="trophy-img" alt="Trophy">
            <cmp-leaderboard></cmp-leaderboard>
            <img src="zurags/profile.webp" class="profile-img" alt="Profile">
            <button class="menu-btn">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>
    `;
  }
}

customElements.define("cmp-header", CmpHeader);