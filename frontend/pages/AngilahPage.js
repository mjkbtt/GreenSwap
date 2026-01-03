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
          <div class="action-btns">
                    <section class="action-buttons ">
                        <a href="#/tseguud" class="action-btn" data-link>
                            <img src="zurags/map.png" alt="">
                            <span>Цэгүүд</span>
                        </a>
                        <a href="#/tushaah" class="action-btn" data-link>
                            <img src="zurags/recycle-2.png" alt="">
                            <span>Тушаах</span>
                        </a>
                        <a href="#/angilah" class="action-btn" data-link>
                            <img src="zurags/waste.png" alt="">
                            <span>Хаягдлыг ангилах</span>
                        </a>
                    </section>
          </div>
          <div class="angilah-info">
            <div class="guide-hero">
              <h1>Хаягдлыг зөв ангилах заавар</h1>
              <img src="zurags/haygdal.jpg" alt="waste sorting bg">
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
              <h3>Хамтдаа байгаль орчноо хамгаалъя!</h3>
            </div>
          </div>
        </div>

      <style>
        .guide-page {
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
        }
        .action-btns{
          margin-top:10px;
        }
        .guide-hero {
          display: flex;
          position: relative;
          height: 300px;
          overflow: hidden;
          text-align: center;
          padding: 40px 20px;
          background: linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%);
          border-radius: 24px;
          margin-bottom: 40px;
          justify-content: center; 
          align-items: center;
        }

        .guide-hero h1 {
          position: absolute;
          margin: 0;
          top: 5px;
          font-size: 40px;
          font-weight: 700;
          color: white;
          z-index: 2;
          text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
        }
        .guide-hero img{
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          object-fit: cover;
          z-index: 1;
          max-width: 100%;
          height: auto;
          border-radius: 12px;
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 60px;
        }
        .angilah-info {
          margin-top: 30px;
        }
        .category-card {
          background: var(--white);
          padding: 24px;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          border: 1px solid var(--gray-lighter);
          color: var(--black);
        }

        .category-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 16px rgba(76, 175, 80, 0.2);
        }

        .category-icon {
          font-size: 40px;
          margin-bottom: 12px;
        }
        .expandable-sections {
          color: var(--black);
        }

        .expandable-item {
          background: var(--white);
          border-radius: 12px;
          margin-bottom: 12px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          border: 1px solid var(--gray-lighter);
          color: var(--black);
        }

        .expandable-header {
          display: flex;
          align-items: center;
          padding: 20px;
          cursor: pointer;
        }

        .expandable-header:hover {
          background: var(--white);
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
          color: var(--black);
        }

        .bottom-icon {
          font-size: 64px;
        }
        @media (max-width: 768px) {
          .guide-hero {
            height: 150px;
          }
        }
      </style>
    `;

    this.addEventListeners(container);
  }

  async fetchCategories() {
    try {
      const response = await fetch('/api/categories');
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