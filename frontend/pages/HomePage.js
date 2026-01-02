export class HomePage {
  constructor() {
    this.impactData = null;
  }

  async render(container) {
    await this.fetchImpactData();
    
    container.innerHTML = /*html*/`
      <main class="hero-section">
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
        <div class="hero-content">
          <h1>Өнөөдрийн дахин боловсруулалт</h1>
          <h2>Маргаашийн ирээдүй</h2>
        </div>

      </main>

      <div class="cards-container">
        <gs-ad-card 
          img="ad-pic2.png"
          ttl="Хоосон шил саваа яахаа мэдэхгүй байна уу?">
        </gs-ad-card>

        <gs-ad-card 
          img="Crumpled Paper Bag Character.png"
          ttl="Таны халаасанд арай базсан цаас байгаа юм биш биз?">
        </gs-ad-card>

        <gs-ad-card 
          img="ad-pics.png"
          ttl="Энд тэндгүй л хуванцар...">
        </gs-ad-card>
      </div>

      <article class="eco-card">
        <div class="eco-icon">
          <img src="zurags/delguur-ad.png" alt="">
        </div>
        <div class="eco-text">
          <h3>Хаягдлаа өг - Оноогоо цуглуул - Эко бүтээгдэхүүнээ ав</h3>
          <p>Та дахин боловсруулагдах хаягдлаа тушааснаар оноо цуглуулах боломжтой бөгөөд 
              түүнийгээ ашиглан манай эко дэлгүүрээс бүтээгдэхүүн авах боломжтой</p>
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
    this.initCarousel();
  }

  initCarousel() {
  customElements.whenDefined('gs-ad-card').then(() => {

    const cards = Array.from(
      document.querySelectorAll('.cards-container gs-ad-card .card')
    );

    let index = 0;

    const update = () => {
      cards.forEach(c => c.classList.remove('left', 'center', 'right'));

      const left = (index + cards.length - 1) % cards.length;
      const center = index;
      const right = (index + 1) % cards.length;

      cards[left].classList.add('left');
      cards[center].classList.add('center');
      cards[right].classList.add('right');
    };

    update();

    this.carouselInterval = setInterval(() => {
      index = (index + 1) % cards.length;
      update();
    }, 3000);
  });
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
        waste: '7000',
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
        img="zurags/recycling-truck.png">
      </gs-impact-card>
      
      <gs-impact-card 
        ttl="+${this.impactData.water}л" 
        inf="Ус хэмнэсэн" 
        img="zurags/recycling-water.png">
      </gs-impact-card>
      
      <gs-impact-card 
        ttl="+${this.impactData.users}" 
        inf="Идэвхитэй хэрэглэгчид" 
        img="zurags/group.png">
      </gs-impact-card>
      
      <gs-impact-card 
        ttl="+${this.impactData.co2}кг" 
        inf="Ялгарлыг бууруулсан" 
        img="zurags/co2-2.png">
      </gs-impact-card>
    `;
  }
}

export default HomePage;