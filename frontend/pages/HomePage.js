export class HomePage {
  constructor() {
    this.impactData = null;
  }

  async render(container) {
    await this.fetchImpactData();
    
    container.innerHTML = /*html*/`
      <main class="hero-section">
        <div class="hero-content">
          <h1>Өнөөдрийн дахин боловсруулалт</h1>
          <h2>Маргаашийн ирээдүй</h2>
        </div>
      </main>

      <div class="cards-container">
        <gs-ad-card 
          img="Crumpled Paper Bag Character.png"
          ttl="Таны халаасанд арай базсан цаас байгаа юм биш биз?">
        </gs-ad-card>

        <gs-ad-card 
          class="selCard" 
          img="Crumpled Paper Bag Character.png"
          ttl="Хоосон шил саваа яахаа мэдэхгүй байна уу?">
        </gs-ad-card>

        <gs-ad-card 
          img="Crumpled Paper Bag Character.png"
          ttl="Энд тэндгүй л хуванцар...">
        </gs-ad-card>
      </div>

      <article class="eco-card">
        <div class="eco-icon">
          <img src="zurags/Crumpled Paper Bag Character.png" alt="">
        </div>
        <div class="eco-text">
          <h3>Хаягдлаа өг - Оноогоо цуглуул - Эко бүтээгдэхүүн ав</h3>
          <p>Та дахин боловсруулагдах хаягдлаа тушааснаар манай эко дэлгүүрээс бүтээгдэхүүн авах боломжтой</p>
          <button class="eco-btn" onclick="alert('Дэлгүүр удахгүй нээгдэнэ!')">
            Дэлгүүр <img src="zurags/store.png" alt="eco delguur icon">
          </button>
        </div>
      </article>

      <!-- Impact Section -->
      <div class="impact-section">
        <h2>Бидний нөлөө</h2>
        <section class="impact-cards" id="impact-cards">
          ${this.renderImpactCards()}
        </section>
      </div>
    `;
  }

  async fetchImpactData() {
    try {
      const response = await fetch('http://localhost:3000/api/items/stats/summary');
      const stats = await response.json();
      
      this.impactData = {
        waste: (stats.collected * 8).toFixed(0),        // kg per item average
        water: (stats.collected * 20).toFixed(0),       // liters saved
        users: stats.total,                              // total items as proxy
        co2: (stats.collected * 0.2).toFixed(0)         // kg CO2 reduced
      };
    } catch (error) {
      console.error('Error fetching impact data:', error);
      this.impactData = {
        waste: '2000',
        water: '5000',
        users: '250',
        co2: '50'
      };
    }
  }

  renderImpactCards() {
    if (!this.impactData) {
      return /*html*/`<p>Loading impact data...</p>`;
    }

    return /*html*/`
      <gs-impact-card 
        ttl="+${this.impactData.waste}кг" 
        inf="Хаягдал цуглуулсан" 
        img="zurags/recycle.png">
      </gs-impact-card>
      
      <gs-impact-card 
        ttl="+${this.impactData.water}л" 
        inf="Ус хэмнэсэн" 
        img="zurags/recycle.png">
      </gs-impact-card>
      
      <gs-impact-card 
        ttl="+${this.impactData.users}" 
        inf="Идэвхитэй хэрэглэгчид" 
        img="zurags/recycle.png">
      </gs-impact-card>
      
      <gs-impact-card 
        ttl="+${this.impactData.co2}кг" 
        inf="CO₂ ялгарлыг бууруулсан" 
        img="zurags/recycle.png">
      </gs-impact-card>
    `;
  }
}

export default HomePage;