// frontend/pages/AngilahPage.js
// Хаягдлыг ангилах - Waste sorting guide

export class AngilahPage {
  constructor() {
    this.categories = [];
  }

  async render(container) {
    await this.fetchCategories();
    
    container.innerHTML = /*html*/`
      <div class="guide-page">
        <div class="guide-hero">
          <h1>Хаягдлыг зөв ангилах заавар</h1>
          <p>Хаягдлыг зөв ангилснаар дахин боловсруулах уу даатгал байна</p>
        </div>

        <div class="category-grid">
          ${this.renderCategoryCards()}
        </div>

        <div class="expandable-sections">
          <h2 class="section-title">Дэлгэрэнгүй мэдээлэл</h2>
          ${this.renderExpandableSections()}
        </div>

        <div class="bottom-message">
          <div class="bottom-icon">🌍</div>
          <h3>Хамтдаар байгаль орчноо хамгаалъя!</h3>
        </div>
      </div>

      <style>
        .guide-page {
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
        }

        .guide-hero {
          text-align: center;
          padding: 40px 20px;
          background: linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%);
          border-radius: 24px;
          margin-bottom: 40px;
        }

        .guide-hero h1 {
          font-size: 32px;
          font-weight: 700;
          color: #1b5e20;
          margin-bottom: 12px;
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 60px;
        }

        .category-card {
          background: white;
          padding: 24px;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .category-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 16px rgba(76, 175, 80, 0.2);
        }

        .category-icon {
          font-size: 40px;
          margin-bottom: 12px;
        }

        .expandable-item {
          background: white;
          border-radius: 12px;
          margin-bottom: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .expandable-header {
          display: flex;
          align-items: center;
          padding: 20px;
          cursor: pointer;
        }

        .expandable-header:hover {
          background: #f9f9f9;
        }

        .expandable-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
          padding: 0 20px;
        }

        .expandable-item.active .expandable-content {
          max-height: 800px;
          padding: 0 20px 20px 20px;
        }

        .bottom-message {
          text-align: center;
          padding: 60px 20px;
        }

        .bottom-icon {
          font-size: 64px;
        }
      </style>
    `;

    this.addEventListeners(container);
  }

  async fetchCategories() {
    try {
      const response = await fetch('http://localhost:3000/api/categories');
      this.categories = await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      this.categories = this.getDefaultCategories();
    }
  }

  getDefaultCategories() {
    return [
      { id: 1, name: 'Хуванцар', icon: '♻️', description: 'Дахин боловсруулж болохоор хуванцар' },
      { id: 2, name: 'Цаас', icon: '📄', description: 'Дахин боловсруулж болохоор цаас' },
      { id: 3, name: 'Шил', icon: '🍾', description: 'Дахин боловсруулж болохоор шил' },
      { id: 4, name: 'Төмөр', icon: '🔧', description: 'Дахин боловсруулж болохоор төмөр' },
      { id: 5, name: 'Органик', icon: '🌱', description: 'Бордоо болгож болохоор органик' }
    ];
  }

  renderCategoryCards() {
    return this.categories.map(cat => /*html*/`
      <div class="category-card" data-category-id="${cat.id}">
        <div class="category-icon">${cat.icon}</div>
        <div class="category-name">${cat.name}</div>
        <div class="category-desc">${cat.description}</div>
      </div>
    `).join('');
  }

  renderExpandableSections() {
    return this.categories.map(cat => /*html*/`
      <div class="expandable-item" id="section-${cat.id}">
        <div class="expandable-header">
          <span style="font-size: 32px; margin-right: 16px;">${cat.icon}</span>
          <span style="flex: 1; font-size: 18px; font-weight: 600;">${cat.name}</span>
          <span style="font-size: 24px;">▼</span>
        </div>
        <div class="expandable-content">
          <p>Дэлгэрэнгүй мэдээлэл ${cat.name} талаар...</p>
        </div>
      </div>
    `).join('');
  }

  addEventListeners(container) {
    container.querySelectorAll('.category-card').forEach(card => {
      card.addEventListener('click', () => {
        const categoryId = card.dataset.categoryId;
        const section = container.querySelector(`#section-${categoryId}`);
        section.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          if (!section.classList.contains('active')) {
            section.querySelector('.expandable-header').click();
          }
        }, 500);
      });
    });

    container.querySelectorAll('.expandable-header').forEach(header => {
      header.addEventListener('click', () => {
        const item = header.parentElement;
        item.classList.toggle('active');
      });
    });
  }
}

export default AngilahPage;