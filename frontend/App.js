import { HomePage } from './pages/HomePage.js';
import { TseguudPage } from './pages/TseguudPage.js';
import { TushaahPage } from './pages/TushaahPage.js';
import { AngilahPage } from './pages/AngilahPage.js';
import { BidniiTuhai } from './pages/BidniiTuhai.js';
import { ContactPage } from './pages/ContactPage.js';
import { LoginPage } from './pages/LoginPage.js';
import { RegisterPage } from './pages/RegisterPage.js';
import { CenterLoginPage } from './pages/CenterLoginPage.js';
import { CenterRegisterPage } from './pages/CenterRegisterPage.js';
import { UserProfilePage } from './pages/UserProfilePage.js';
import { CenterProfilePage } from './pages/CenterProfilePage.js';

class App {
  constructor() {
    this.contentDiv = document.getElementById('app-content');
    this.routes = {
      '/': HomePage,
      '/home': HomePage,
      '/about': BidniiTuhai,
      '/contact': ContactPage,
      '/tushaah': TushaahPage,
      '/tseguud': TseguudPage,
      '/angilah': AngilahPage,
      '/login': LoginPage,
      '/register': RegisterPage,
      '/center-login': CenterLoginPage,
      '/center-register': CenterRegisterPage,
      '/profile': UserProfilePage,
      '/center-profile': CenterProfilePage,
    };

    this.init();
  }

  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    document.addEventListener('DOMContentLoaded', () => this.handleRoute());

    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-link]');
      if (link) {
        e.preventDefault();
        const path = link.getAttribute('href') || link.dataset.href;
        if (path) {
          window.location.hash = path;
        }
      }
    });
  }

  async handleRoute() {
    const hash = window.location.hash || '#/';
    const path = hash.replace('#', '');

    const PageClass = this.routes[path] || HomePage;

    this.contentDiv.innerHTML = `
      <div style="padding:40px;text-align:center">
        <p>⏳ Ачааллаж байна...</p>
      </div>
    `;

    try {
      const page = new PageClass();
      await page.render(this.contentDiv);
      window.scrollTo(0, 0);
    } catch (err) {
      console.error(err);
      this.contentDiv.innerHTML = `<p>Алдаа гарлаа</p>`;
    }
  }
}

new App();
console.log('♻️ GreenSwap started');
