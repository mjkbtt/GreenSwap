class CmpHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
    this.addEvents();
  }

  addEvents() {
    const menuBtn = this.shadowRoot.querySelector(".menu-btn");
    const header = this.shadowRoot.querySelector(".header");

    menuBtn.addEventListener("click", () => {
      header.classList.toggle("open");
    });
  }

  render() {
    this.shadowRoot.innerHTML = /*html*/`
      <style>
        :root {
          --green1: #3ca054;
          --gray: #555;
          --gray-light: #888;
          --gray-lighter: #eee;
          --white: #fff;
        }

        /* ================= DESKTOP (DEFAULT) ================= */
        .header {
          background: var(--white);
          border-bottom: 1px solid var(--gray-lighter);
        }

        .nav-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 60px;
          padding: 0 16px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .logo img {
          width: 80px;
          height: auto;
        }

        .nav-links {
          display: flex;
          gap: 40px;
        }

        .nav-links a {
          text-decoration: none;
          color: var(--gray);
          font-size: 1em;
        }

        .nav-links a:hover {
          color: var(--green1);
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 6px;
          border: 1px solid #ccc;
          border-radius: 20px;
          padding: 4px 10px;
        }

        .search-bar input {
          border: none;
          outline: none;
          background: transparent;
        }

        .profile-img {
          width: 40px;
          height: 40px;
          cursor: pointer;
        }

        .menu-btn {
          display: none;
        }

        /* ================= MOBILE ================= */
        @media (max-width: 768px) {

          /* header өөрөө доош сунана */
          .header {
            display: flex;
            flex-direction: column;
          }

          /* top row */
          .nav-bar {
            width: 100%;
            height: 56px;
          }

          /* search mobile дээр байхгүй */
          .search-bar {
            display: none;
          }

          .right {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .menu-btn {
            display: inline-block;
            font-size: 26px;
            background: none;
            border: none;
            cursor: pointer;
          }

          /* nav-links ганц удаа, header-ийн доор */
          .nav-links {
            display: none;
            flex-direction: column;
            width: 100%;
            padding: 12px 16px;
            border-top: 1px solid var(--gray-lighter);
            background: var(--white);
          }

          .header.open .nav-links {
            display: flex;
          }
        }
      </style>

      <header class="header">
        <!-- TOP ROW -->
        <div class="nav-bar">
          <div class="logo">
            <img src="zurags/logo.png" alt="Logo">
          </div>

          <!-- DESKTOP NAV -->
          <nav class="nav-links">
            <a href="#/">Нүүр</a>
            <a href="#/about">Бидний тухай</a>
            <a href="#/contact">Холбоо барих</a>
          </nav>

          <!-- DESKTOP SEARCH -->
          <div class="search-bar">
            <img src="zurags/search.png" width="18">
            <input type="text" placeholder="Хайх">
          </div>

          <!-- RIGHT SIDE -->
          <div class="right">
            <img src="zurags/profile.png" class="profile-img" alt="Profile">
            <button class="menu-btn">☰</button>
          </div>
        </div>
      </header>
    `;
  }
}

customElements.define("cmp-header", CmpHeader);
