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
class App {
  constructor() {
    this.contentDiv = document.getElementById('app-content');
    this.currentPage = null;
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
          this.navigateTo(path);
        }
      }
    });
    console.log('Available routes:', Object.keys(this.routes));
  }
  
  navigateTo(path) {
    window.location.hash = path;
    this.handleRoute();
  }
  
  async handleRoute() {
    const hash = window.location.hash || '#/';
    const path = hash.replace('#', '');
    console.log('📍 Navigating to:', path);
    let PageClass = this.routes[path];
    
    if (!PageClass) {
      console.warn('⚠️ Route not found:', path, '- Loading HomePage');
      PageClass = HomePage;
    }
    
    this.showLoading();
    
    try {
      const page = new PageClass();
      await page.render(this.contentDiv);
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.updateActiveNavLinks(path);
      
      console.log('✓ Page loaded successfully:', path);
      
    } catch (error) {
      console.error('❌ Error loading page:', error);
      this.showError(error);
    }
  }
  
  showLoading() {
    this.contentDiv.innerHTML = `
      <div class="loading-screen">
        <div class="loader">♻️</div>
        <p>Ачааллаж байна...</p>
      </div>
    `;
  }
  
  showError(error) {
    this.contentDiv.innerHTML = /*html*/`
      <div class="error-screen" style="text-align: center; padding: 60px 20px; min-height: 400px;">
        <div style="font-size: 64px; margin-bottom: 20px;">⚠️</div>
        <h2 style="color: #d32f2f; margin-bottom: 12px;">Алдаа гарлаа</h2>
        <p style="color: #666; margin-bottom: 12px;">Хуудас ачаалахад алдаа гарлаа</p>
        <p style="color: #999; font-size: 12px; margin-bottom: 24px;">
          ${error ? error.message : 'Unknown error'}
        </p>
        <button onclick="window.location.reload()" 
                style="background: #4CAF50; color: white; border: none; 
                       padding: 12px 32px; border-radius: 8px; cursor: pointer;
                       font-size: 16px; font-weight: 600;">
          Дахин оролдох
        </button>
      </div>
    `;
  }
  
  updateActiveNavLinks(currentPath) {
    const header = document.querySelector('cmp-header');
    if (!header || !header.shadowRoot) return;
    
    const navLinks = header.shadowRoot.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href')?.replace('#', '');
      if (href === currentPath || (currentPath === '/' && href === '/')) {
        link.classList.add('active');
      }
    });
  }
}

new App();

console.log('♻️ GreenSwap started successfully');