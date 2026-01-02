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
    this.innerHTML = /*html*/`
      <style>
        body { background-color: #f9fff9; font-family: 'Inter', sans-serif; margin: 0; padding: 0; }
        .main-body { display: flex; gap: 40px; padding: 20px; max-width: 1400px; margin: 0 auto; min-height: calc(100vh - 40px); }
        .body-container { flex: 0 0 60%; }
        .tseg-stats { flex: 0 0 40%; }
        article { background: white; border-radius: 20px; padding: 30px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); }
        .map { width: 100%; height: 600px; border: 1px solid #e5e7eb; border-radius: 15px; margin-top: 20px; }
        .tseg-count { margin-top: 15px; font-size: 0.9em; color: #666; font-weight: 500; }
        
        /* Stats & Detail Card Styles */
        .tseg-detail-card { background: white; border-radius: 20px; padding: 25px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); margin-bottom: 20px; }
        .tseg-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 25px; }
        .tseg-title { font-size: 22px; font-weight: 700; margin: 0; color: #111; }
        .tseg-subtitle { color: #6b7280; font-size: 14px; margin: 4px 0 0 0; }
        .status-badge { background: #dcfce7; color: #166534; padding: 4px 12px; border-radius: 12px; font-size: 13px; font-weight: 600; }
        .info-row { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 20px; }
        .info-icon { width: 20px; height: 20px; color: #22c55e; flex-shrink: 0; margin-top: 2px; }
        .info-content h3 { font-size: 13px; font-weight: 600; color: #9ca3af; text-transform: uppercase; margin: 0 0 4px 0; letter-spacing: 0.5px; }
        .info-content p { font-size: 15px; margin: 0; color: #374151; line-height: 1.5; }
        
        .types-section { margin-top: 25px; border-top: 1px solid #f3f4f6; pt: 20px; }
        .types-section h3 { font-size: 14px; font-weight: 600; margin-bottom: 12px; }
        .types-badges { display: flex; flex-wrap: wrap; gap: 8px; }
        .type-badge { background: #f3f4f6; padding: 6px 14px; border-radius: 20px; font-size: 13px; color: #4b5563; }
        
        .stats-card { background: #111827; color: white; border-radius: 20px; padding: 25px; }
        .stats-header { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
        .stats-header svg { width: 20px; height: 20px; color: #22c55e; }
        .stats-header h2 { font-size: 18px; font-weight: 600; margin: 0; }
        .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .stat-box { background: rgba(255,255,255,0.05); border-radius: 12px; padding: 15px; text-align: center; }
        .stat-box h3 { font-size: 11px; color: #9ca3af; margin: 0 0 8px 0; text-transform: uppercase; }
        .stat-box p { font-size: 18px; font-weight: 700; margin: 0; color: #22c55e; }

        @media (max-width: 1024px) { .main-body { flex-direction: column; } .body-container, .tseg-stats { flex: 1; width: 100%; } }
      </style>
      <div class="main-body">
        <div class="body-container">
          <article>
            <h1>Дахивар авах цэгүүд</h1>
            <p>Газрын зураг дээр цэг сонгоод дэлгэрэнгүй мэдээлэл аваарай.</p>
            <div id="map" class="map"></div>
            <p class="tseg-count">Нийт цэг: <span id="tseg-count">0</span></p>
          </article>
        </div>
        <div class="tseg-stats" id="stats-container">
          <div style="height: 100%; display: flex; align-items: center; justify-content: center; border: 2px dashed #e5e7eb; border-radius: 20px; color: #9ca3af; padding: 40px; text-align: center;">
            <p>Газрын зураг дээрх цэг дээр дарж дэлгэрэнгүй мэдээллийг үзнэ үү.</p>
          </div>
        </div>
      </div>`;
  }

  async loadData() {
    try {
      const res = await fetch('/api/tseguud');
      this.data = await res.json();
      const countElement = this.querySelector('#tseg-count');
      if (countElement) countElement.textContent = this.data.length;
    } catch (e) {
      console.error("Data load error:", e);
    }
  }

waitForGoogleMaps() {
    return new Promise((resolve, reject) => {
      if (window.google && window.google.maps) {
        resolve();
        return;
      }
      let attempts = 0;
      const interval = setInterval(() => {
        attempts++;
        if (window.google && window.google.maps) {
          clearInterval(interval);
          resolve();
        } else if (attempts > 50) { // 5 секунд хүлээнэ
          clearInterval(interval);
          reject(new Error("Google Maps API ачаалсангүй."));
        }
      }, 100);
    });
  }

  initMap() {
    const mapElement = this.querySelector("#map");
    this.map = new google.maps.Map(mapElement, {
      center: { lat: 47.9184, lng: 106.9177 },
      zoom: 12,
      styles: [{ featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }]
    });
  }

  addMarkers() {
    this.data.forEach((tseg) => {
      const marker = new google.maps.Marker({
        position: { lat: Number(tseg.lat), lng: Number(tseg.lng) },
        map: this.map,
        title: tseg.name,
        animation: google.maps.Animation.DROP
      });
      marker.addListener("click", () => this.showStats(tseg));
      this.markers.push(marker);
    });
  }

  showStats(tseg) {
    const container = this.querySelector("#stats-container");
    const types = Array.isArray(tseg.type) ? tseg.type : tseg.type.split(',');

    container.innerHTML = /*html*/`
      <div class="tseg-detail-card">
        <div class="tseg-header">
          <div>
            <h1 class="tseg-title">${tseg.name}</h1>
            <p class="tseg-subtitle">${tseg.district}</p>
          </div>
          <span class="status-badge">Нээлттэй</span>
        </div>
        
        <div class="info-row">
          <svg class="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><circle cx="12" cy="11" r="3"/></svg>
          <div class="info-content"><h3>Хаяг</h3><p>${tseg.location}</p></div>
        </div>

        <div class="info-row">
          <svg class="info-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <div class="info-content"><h3>Цагийн хуваарь</h3><p>${tseg.working_hours}</p></div>
        </div>

        <div class="types-section">
          <h3>Хүлээн авах төрөл</h3>
          <div class="types-badges">
            ${types.map(type => `<span class="type-badge">${type.trim()}</span>`).join('')}
          </div>
        </div>
      </div>

      <div class="stats-card">
        <div class="stats-header">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
          <h2>Цэгийн статистик</h2>
        </div>
        <div class="stats-grid">
          <div class="stat-box"><h3>Нийт кг</h3><p>${tseg.total_collected_kg}</p></div>
          <div class="stat-box"><h3>Хэрэглэгч</h3><p>${tseg.active_users}</p></div>
          <div class="stat-box"><h3>Үнэлгээ</h3><p>${tseg.rating}</p></div>
        </div>
      </div>`;
  }

  disconnectedCallback() {
    this.markers.forEach(m => m.setMap(null));
  }
}

customElements.define('tseg-cmp', TsegCmp);