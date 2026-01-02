class TsegCmp extends HTMLElement {
  constructor() {
    super();
    this.data = [];
    this.map = null;
    this.markers = [];
  }

  async connectedCallback() {
    this.render();
    await this.loadData();
    await this.waitForGoogleMaps();
    this.initMap();
    this.addMarkers();
  }

  render() {
    this.innerHTML = /*html*/ `
      <style>
        .main-body {
          display: flex;
          gap: 40px;
          padding: 20px;
        }
        .map {
          width: 60%;
          height: 500px;
          border-radius: 16px;
          border: 2px solid #c9e6cb;
        }
        .stats {
          width: 40%;
          background: white;
          padding: 20px;
          border-radius: 16px;
        }
        @media (max-width: 900px) {
          .main-body {
            flex-direction: column;
          }
          .map, .stats {
            width: 100%;
          }
        }
      </style>

      <div class="main-body">
        <div id="map" class="map"></div>
        <div id="stats" class="stats">
          <p style="color:#777">Газрын зураг дээр цэг дарна уу</p>
        </div>
      </div>
    `;
  }

  async loadData() {
    try {
      const res = await fetch('/api/tseguud');
      this.data = await res.json();
      console.log('📦 Tseguud loaded:', this.data);
    } catch (e) {
      console.error('❌ Data load error:', e);
      this.data = [];
    }
  }

  waitForGoogleMaps() {
    return new Promise((resolve, reject) => {
      if (window.google?.maps) {
        resolve();
        return;
      }

      const maxWait = 15000;
      let waited = 0;

      const check = () => {
        if (window.google?.maps) {
          resolve();
        } else {
          waited += 100;
          if (waited >= maxWait) {
            reject(new Error('Google Maps not loaded'));
          } else {
            setTimeout(check, 100);
          }
        }
      };

      check();
    });
  }

  initMap() {
    const mapEl = this.querySelector('#map');
    this.map = new google.maps.Map(mapEl, {
      center: { lat: 47.9184, lng: 106.9177 },
      zoom: 12,
    });

    // SPA resize fix
    setTimeout(() => {
      google.maps.event.trigger(this.map, 'resize');
      this.map.setCenter({ lat: 47.9184, lng: 106.9177 });
    }, 0);
  }

  addMarkers() {
    this.data.forEach(tseg => {
      if (typeof tseg.lat !== 'number' || typeof tseg.lng !== 'number') return;

      const marker = new google.maps.Marker({
        map: this.map,
        position: { lat: tseg.lat, lng: tseg.lng },
        title: tseg.name,
      });

      marker.addListener('click', () => this.showStats(tseg));
      this.markers.push(marker);
    });
  }

  showStats(tseg) {
    const stats = this.querySelector('#stats');
    const types = Array.isArray(tseg.type)
      ? tseg.type
      : (tseg.type || '').split(',').map(t => t.trim());

    stats.innerHTML = `
      <h2>${tseg.name}</h2>
      <p><b>Дүүрэг:</b> ${tseg.district}</p>
      <p><b>Хаяг:</b> ${tseg.location}</p>
      <p><b>Цаг:</b> ${tseg.working_hours}</p>
      <p><b>Утас:</b> ${tseg.phone}</p>

      <h4>Хаягдал:</h4>
      <ul>
        ${types.map(t => `<li>${t}</li>`).join('')}
      </ul>

      <hr>
      <p>♻️ Цуглуулсан: ${tseg.total_collected_kg} кг</p>
      <p>⭐ Үнэлгээ: ${tseg.rating}</p>
    `;
  }

  disconnectedCallback() {
    this.markers.forEach(m => m.setMap(null));
    this.markers = [];
    this.map = null;
  }
}

customElements.define('tseg-cmp', TsegCmp);
export default TsegCmp;
