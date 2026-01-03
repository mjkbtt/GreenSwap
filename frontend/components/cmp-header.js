class CmpHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.isDarkMode = localStorage.getItem('darkMode') === 'true';
  }

  connectedCallback() {
    this.render();
    this.addEvents();
    this.applyTheme();
    
    // Apply dark mode class to header if needed
    if (this.isDarkMode) {
      const header = this.shadowRoot.querySelector('.header');
      header.classList.add('dark-mode');
    }
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
    localStorage.setItem('darkMode', this.isDarkMode);
    this.applyTheme();
    
    const themeBtn = this.shadowRoot.querySelector('.theme-toggle');
    const header = this.shadowRoot.querySelector('.header');
    
    if (this.isDarkMode) {
      themeBtn.classList.add('dark');
      header.classList.add('dark-mode');
    } else {
      themeBtn.classList.remove('dark');
      header.classList.remove('dark-mode');
    }
  }

  addEvents() {
    const menuBtn = this.shadowRoot.querySelector(".menu-btn");
    const navLinks = this.shadowRoot.querySelector(".nav-links");
    const themeToggle = this.shadowRoot.querySelector(".theme-toggle");
    const trophyImg = this.shadowRoot.querySelector(".trophy-img");
    const popup = this.shadowRoot.querySelector(".trophy-popup");
    const closeBtn = this.shadowRoot.querySelector(".close-popup");
    
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuBtn.classList.toggle("active");
    });

    themeToggle.addEventListener("click", () => {
      this.toggleTheme();
    });

    trophyImg.addEventListener("click", () => {
      popup.classList.add("active");
    });

    closeBtn.addEventListener("click", () => {
      popup.classList.remove("active");
    });

    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        popup.classList.remove("active");
      }
    });

    const links = this.shadowRoot.querySelectorAll(".nav-links a");
    links.forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.classList.remove("active");
      });
    });
  }

  render() {
    this.shadowRoot.innerHTML = /*html*/`
      <style>
        :host {
          display: block;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .header {
          background: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border-bottom: 1px solid #e0e0e0;
          position: sticky;
          top: 0;
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .header.dark-mode {
          background: var(--white);
          box-shadow: 0 2px 8px rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid var(--gray-lighter);
        }

        .nav-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 70px;
          padding: 0 40px;
          max-width: 1400px;
          margin: 0 auto;
          gap: 20px;
        }

        .logo {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }

        .logo img {
          width: 80px;
          height: auto;
        }

        .nav-links {
          display: flex;
          align-items: center;
          flex: 1;
          justify-content: center;
          /* responsive spacing */
          gap: clamp(20px, 4vw, 50px);
        }

        .nav-links a {
          text-decoration: none;
          color: var(--gray);
          font-size: 16px;
          font-weight: 500;
          transition: color 0.3s;
          white-space: nowrap;
          position: relative;
          padding-bottom: 5px;
          margin: 0 30px;
        }

        /* Animated bottom border */
        .nav-links a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--green1);
          transition: width 0.3s ease;
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        .header.dark-mode .nav-links a {
          color: #ffffff;
        }

        .nav-links a:hover {
          color: var(--green1);
        }

        .right-section {
          display: flex;
          align-items: center;
          gap: 15px;
          flex-shrink: 0;
          margin-left: auto;
        }

        .theme-toggle {
          width: 50px;
          height: 26px;
          background: #e0e0e0;
          border: none;
          border-radius: 13px;
          position: relative;
          cursor: pointer;
          transition: background 0.3s;
          flex-shrink: 0;
        }

        .theme-toggle::before {
          content: '';
          position: absolute;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: white;
          top: 2px;
          left: 2px;
          transition: transform 0.3s;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .theme-toggle.dark {
          background: var(--green1);
        }

        .theme-toggle.dark::before {
          transform: translateX(24px);
        }

        .theme-toggle:hover {
          opacity: 0.8;
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          border: 1px solid var(--gray-lighter);
          border-radius: 20px;
          padding: 8px 16px;
          background: var(--gray-lighter);
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .header.dark-mode .search-bar {
          background: #2a2a2a;
          border: 1px solid #444444;
        }

        .search-bar input {
          border: none;
          outline: none;
          background: transparent;
          width: 200px;
          font-size: 14px;
          color: inherit;
        }

        .header.dark-mode .search-bar input {
          color: #ffffff;
        }

        .search-bar input::placeholder {
          color: var(--gray);
        }

        .header.dark-mode .search-bar input::placeholder {
          color: #b0b0b0;
        }
        .trophy-img{
          width: 35px;
          height: 35px;
          cursor: pointer;
          transition: transform 0.3s;
          flex-shrink: 0;
        }
        .trophy-img:hover {
          transform: scale(1.1);
        }
        .profile-img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          cursor: pointer;
          transition: transform 0.3s;
          flex-shrink: 0;
        }

        .profile-img:hover {
          transform: scale(1.1);
        }

        .menu-btn {
          display: none;
          flex-direction: column;
          gap: 4px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          flex-shrink: 0;
        }

        .menu-btn span {
          width: 25px;
          height: 3px;
          background-color: var(--green1);
          border-radius: 2px;
          transition: all 0.3s ease;
        }

        .menu-btn.active span:nth-child(1) {
          transform: rotate(45deg) translate(8px, 8px);
        }

        .menu-btn.active span:nth-child(2) {
          opacity: 0;
        }

        .menu-btn.active span:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -7px);
        }

        @media (max-width: 768px) {
          .nav-bar {
            padding: 0 20px;
            height: 60px;
          }

          .logo img {
            width: 60px;
          }

          .nav-links {
            position: absolute;
            top: 60px;
            left: 0;
            right: 0;
            flex-direction: column;
            background: white;
            padding: 0;
            gap: 0;
            max-height: 0;
            overflow: hidden;
            opacity: 0;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
          }

          .header.dark-mode .nav-links {
            background: #1a1a1a;
            box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
          }

          .nav-links.active {
            max-height: 400px;
            opacity: 1;
            padding: 20px 0;
          }

          .nav-links a {
            padding: 15px 30px;
            width: 100%;
            text-align: left;
          }

          /* Remove bottom border animation on mobile */
          .nav-links a::after {
            display: none;
          }

          .nav-links a:hover {
            background-color: var(--green-light);
            color: var(--green-dark);
            border: 1px solid var(--green-light);
            border-radius: 15px;
          }

          .search-bar {
            display: none;
          }

          .theme-toggle {
            width: 45px;
            height: 24px;
          }

          .theme-toggle::before {
            width: 20px;
            height: 20px;
          }

          .theme-toggle.dark::before {
            transform: translateX(21px);
          }

          .menu-btn {
            display: flex;
          }

          .profile-img {
            width: 40px;
            height: 40px;
          }
        }

        @media (max-width: 480px) {
          .nav-bar {
            padding: 0 15px;
            height: 55px;
          }

          .logo img {
            width: 50px;
          }

          .nav-links {
            top: 55px;
          }

          .profile-img {
            width: 35px;
            height: 35px;
          }
        }

        /* Trophy Popup Styles */
        .trophy-popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .trophy-popup.active {
          opacity: 1;
          visibility: visible;
        }

        .popup-content {
          background: white;
          border-radius: 20px;
          padding: 40px;
          max-width: 500px;
          width: 90%;
          position: relative;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          transform: scale(0.8);
          transition: transform 0.3s ease;
        }

        .trophy-popup.active .popup-content {
          transform: scale(1);
        }

        .header.dark-mode .popup-content {
          background: #2a2a2a;
          color: #ffffff;
        }

        .close-popup {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 35px;
          height: 35px;
          border: none;
          background: #f0f0f0;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: #666;
          transition: all 0.3s ease;
        }

        .header.dark-mode .close-popup {
          background: #3a3a3a;
          color: #ffffff;
        }

        .close-popup:hover {
          background: var(--green1);
          color: white;
          transform: rotate(90deg);
        }

        .popup-header {
          text-align: left;
          margin-bottom: 25px;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .popup-header img {
          width: 50px;
          height: 50px;
        }

        .popup-header-text h2 {
          color: #333;
          font-size: 24px;
          margin-bottom: 5px;
          font-weight: 600;
        }

        .header.dark-mode .popup-header-text h2 {
          color: #ffffff;
        }

        .popup-header-text p {
          color: #666;
          font-size: 14px;
        }

        .header.dark-mode .popup-header-text p {
          color: #b0b0b0;
        }

        .achievements-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 20px;
        }

        .achievement-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px;
          background: #f8f8f8;
          border-radius: 12px;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .achievement-item.gold {
          background: #fff9e6;
          border-color: #ffd700;
        }
        .achievement-item.silver {
          background: var(--gray-lighter);
          border-color: #c0c0c0;
        }

        .achievement-item.bronze {
          background: #fff4e6;
          border-color: #cd7f32;
        }

        .header.dark-mode .achievement-item {
          background: #3a3a3a;
        }

        .header.dark-mode .achievement-item.gold {
          background: #3a3520;
          border-color: #ffd700;
        }

        .header.dark-mode .achievement-item.bronze {
          background: #3a2f20;
          border-color: #cd7f32;
        }

        .achievement-left {
          display: flex;
          align-items: center;
          gap: 15px;
          flex: 1;
        }

        .achievement-icon {
          font-size: 40px;
          flex-shrink: 0;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .achievement-rank {
          font-size: 28px;
          color: #999;
          font-weight: 600;
          width: 50px;
          text-align: center;
          flex-shrink: 0;
        }

        .achievement-info h3 {
          font-size: 18px;
          margin-bottom: 3px;
          color: var(--black);
          font-weight: 600;
        }

        .header.dark-mode .achievement-info h3 {
          color: #ffffff;
        }

        .achievement-info p {
          font-size: 13px;
          color: #999;
        }

        .header.dark-mode .achievement-info p {
          color: #b0b0b0;
        }

        .achievement-score {
          text-align: right;
          flex-shrink: 0;
        }

        .achievement-score .points {
          font-size: 24px;
          font-weight: 700;
          color: var(--green2);
          margin-bottom: 3px;
        }

        .achievement-score .label {
          font-size: 12px;
          color: var(--green2);
        }

        .popup-footer {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 15px 20px;
          background: #f0f7ff;
          border-radius: 12px;
          margin-top: 20px;
        }

        .header.dark-mode .popup-footer {
          background: #2a3540;
        }

        .popup-footer-icon {
          font-size: 24px;
        }

        .popup-footer-text {
          font-size: 14px;
          color: #666;
        }

        .header.dark-mode .popup-footer-text {
          color: #b0b0b0;
        }

        @media (max-width: 768px) {
          .popup-content {
            padding: 30px 20px;
          }

          .popup-header h2 {
            font-size: 24px;
          }

          .achievement-item {
            padding: 12px;
          }
        }
      </style>

      <header class="header">
        <div class="nav-bar">
          <div class="logo">
            <img src="zurags/logo.png" alt="Logo">
          </div>

          <nav class="nav-links">
            <a href="#/">Нүүр</a>
            <a href="#/about">Бидний тухай</a>
            <a href="#/contact">Холбоо барих</a>
          </nav>

          <div class="right-section">
            <button class="theme-toggle ${this.isDarkMode ? 'dark' : ''}" aria-label="Toggle theme"></button>
            <div class="search-bar">
              <img src="zurags/search.png" width="18" alt="Search">
              <input type="text" placeholder="Хайх">
            </div>
            <img src="zurags/trophy2.png" class="trophy-img" alt="Trophy">
            <img src="zurags/profile.png" class="profile-img" alt="Profile">
            <button class="menu-btn">
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <!-- Trophy Popup -->
      <div class="trophy-popup">
        <div class="popup-content">
          <button class="close-popup">×</button>
          
          <div class="popup-header">
            <img src="zurags/trophy2.png" alt="Trophy">
            <div class="popup-header-text">
              <h2>Тэргүүлэгчдийн самбар</h2>
              <p>Дахин боловсруулалтад хамгийн их хувь нэмэр оруулсан хэрэглэгчид</p>
            </div>
          </div>

          <div class="achievements-list">
            <div class="achievement-item gold">
              <div class="achievement-left">
                <div class="achievement-icon">🥇</div>
                <div class="achievement-info">
                  <h3>Болд</h3>
                  <p>47 хаягдал тушаасан</p>
                </div>
              </div>
              <div class="achievement-score">
                <div class="points">2,850</div>
                <div class="label">оноо</div>
              </div>
            </div>

            <div class="achievement-item silver">
              <div class="achievement-left">
                <div class="achievement-icon">🥈</div>
                <div class="achievement-info">
                  <h3>Сарантуяа</h3>
                  <p>42 хаягдал тушаасан</p>
                </div>
              </div>
              <div class="achievement-score">
                <div class="points">2,640</div>
                <div class="label">оноо</div>
              </div>
            </div>

            <div class="achievement-item bronze">
              <div class="achievement-left">
                <div class="achievement-icon">🥉</div>
                <div class="achievement-info">
                  <h3>Ганболд</h3>
                  <p>39 хаягдал тушаасан</p>
                </div>
              </div>
              <div class="achievement-score">
                <div class="points">2,420</div>
                <div class="label">оноо</div>
              </div>
            </div>

            <div class="achievement-item">
              <div class="achievement-left">
                <div class="achievement-rank">4</div>
                <div class="achievement-info">
                  <h3>Үүганбаяр</h3>
                  <p>35 хаягдал тушаасан</p>
                </div>
              </div>
              <div class="achievement-score">
                <div class="points">2,180</div>
                <div class="label">оноо</div>
              </div>
            </div>

            <div class="achievement-item">
              <div class="achievement-left">
                <div class="achievement-rank">5</div>
                <div class="achievement-info">
                  <h3>Нарантуяа</h3>
                  <p>32 хаягдал тушаасан</p>
                </div>
              </div>
              <div class="achievement-score">
                <div class="points">1,950</div>
                <div class="label">оноо</div>
              </div>
            </div>
          </div>

          <div class="popup-footer">
            <div class="popup-footer-icon">💡</div>
            <div class="popup-footer-text">Санамж: Хаягдал тушаах бүрт та оноо цуглуулна</div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("cmp-header", CmpHeader);