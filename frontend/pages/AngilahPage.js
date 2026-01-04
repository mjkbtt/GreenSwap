export class AngilahPage {
  constructor() {
    this.categories = [];
  }

  async render(container) {
    await this.fetchCategories();
    
    container.innerHTML = /*html*/`
      <div class="guide-page">
        <div class="action-btns">
          <section class="action-buttons">
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
        </div>

        <div class="bottom-message">
          <div class="bottom-icon">🌍</div>
          <h3>Хамтдаа байгаль орчноо хамгаалъя!</h3>
        </div>
      </div>

      <style>
        .guide-page { max-width: 1000px; margin: 0 auto; padding: 20px; }
        .action-btns { margin-top: 10px; }
        
        .guide-hero {
          display: flex; position: relative; height: 300px; overflow: hidden;
          text-align: center; padding: 40px 20px; border-radius: 24px;
          margin-bottom: 40px; justify-content: center; align-items: center;
          background: #c8e6c9;
        }
        .guide-hero h1 { position: absolute; top: 20px; font-size: 40px; color: white; z-index: 2; text-shadow: 2px 2px 10px rgba(0,0,0,0.5); }
        .guide-hero img { position: absolute; width: 100%; height: 100%; object-fit: cover; z-index: 1; }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        /* Картны загвар */
        .category-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          border: 1px solid #eee;
          display: flex;
          flex-direction: column;
        }

        .card-main-info {
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .category-icon { font-size: 40px; }
        .category-name { font-size: 20px; font-weight: 600; color: #333; }

        /* Дэлгэрэнгүй хэсэг (нуугдсан) */
        .card-details {
          max-height: 0;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0, 1, 0, 1);
          background: #f9f9f9;
          padding: 0 24px;
        }

        /* Карт идэвхтэй үед */
        .category-card.active {
          grid-column: span 2; /* Бүтэн мөр эзэлнэ */
          border-color: #4CAF50;
        }

        .category-card.active .card-details {
          max-height: 1000px;
          padding: 20px 24px;
          border-top: 1px solid #eee;
        }

        .detail-section { margin-bottom: 15px; }
        .detail-title { font-weight: bold; display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
        .do { color: #2e7d32; }
        .dont { color: #d32f2f; }
         .bottom-message {
          text-align: center;
          padding: 60px 20px;
          color: var(--black);
        }

        .bottom-icon {
          font-size: 64px;
        }

        
        @media (max-width: 768px) {
          .category-grid { grid-template-columns: 1fr; }
          .category-card.active { grid-column: span 1; }
          .guide-hero { height: 180px; }
          .guide-hero h1 { font-size: 24px; }
        }
      </style>
    `;

    this.addEventListeners(container);
  }

  getDefaultCategories() {
    return [
      { 
        id: 1, name: 'Хуванцар', icon: '♻️', 
        do: 'Савлагааны хуванцар лонх (PET), Хуванцар сав (HDPE), Хуванцар уут, Хатуу хуванцар сав',
        dont: 'Бохирдсон хуванцар, Хальс, уут, Төрөл бүрийн гялгарнуур, Хэт жижиг хэлтэрхийнүүд',
        tip: 'Хуванцар савыг угааж, хатааж хаяна. Таг, шошгыг авна.'
      },
      { 
        id: 2, name: 'Цаас', icon: '📄', 
        do: 'Бичгийн цаас, Картон хайрцаг, Сонин, Сэтгүүл',
        dont: 'Тостой цаас, Ариун цэврийн цаас, Лаажуулсан цаас',
        tip: 'Цаасыг үрчийлгэхгүй, хавтгай болгож тушаана.'
      },
      { 
        id: 3, name: 'Шил', icon: '🍾', 
        do: 'Ундааны шил, Хүнсний шилэн сав, Эмийн шил',
        dont: 'Цонхны шил, Хагархай шил, Толь',
        tip: 'Шилэн савны тагийг заавал авч тушаана.'
      },
      { 
        id: 4, name: 'Төмөр', icon: '🔧', 
        do: 'Лааз, Төмөр таг, Хөнгөн цагаан сав',
        dont: 'Будагны лааз, Химийн бодистой сав',
        tip: 'Лаазыг доторхыг нь цэвэрлэж, хавтгай болгоно.'
      }
    ];
  }

  async fetchCategories() {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      // Хэрэв API-аас өгөгдөл ирвэл default-той нэгтгэх эсвэл шууд ашиглах
      this.categories = data.length > 0 ? data : this.getDefaultCategories();
    } catch (error) {
      this.categories = this.getDefaultCategories();
    }
  }

  renderCategoryCards() {
    return this.categories.map(cat => /*html*/`
      <div class="category-card" data-category-id="${cat.id}">
        <div class="card-main-info">
          <div class="category-icon">${cat.icon}</div>
          <div class="category-name">${cat.name}</div>
        </div>
        
        <div class="card-details">
          <div class="detail-section">
            <div class="detail-title do">✅ Хүлээн авдаг:</div>
            <p>${cat.do || 'Мэдээлэл алга'}</p>
          </div>
          <div class="detail-section">
            <div class="detail-title dont">❌ Хүлээн авахгүй:</div>
            <p>${cat.dont || 'Мэдээлэл алга'}</p>
          </div>
          <div class="detail-section" style="background: #e3f2fd; padding: 10px; border-radius: 8px;">
            <div class="detail-title" style="color: #1976d2;">ℹ️ Зөвлөмж:</div>
            <p>${cat.tip || 'Цэвэрхэн тушаана уу.'}</p>
          </div>
        </div>
      </div>
    `).join('');
  }

  addEventListeners(container) {
    container.querySelectorAll('.category-card').forEach(card => {
      card.addEventListener('click', (e) => {
        container.querySelectorAll('.category-card').forEach(c => {
          if (c !== card) c.classList.remove('active');
        });
        
        card.classList.toggle('active');
      });
    });
  }
}

export default AngilahPage;