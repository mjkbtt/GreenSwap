// frontend/components/tseg-map.js
class TsegMap extends HTMLElement {
  constructor() {
    super();
    this._data = [];
    this.map = null;
    this.markers = [];
  }

  set data(value) {
    this._data = Array.isArray(value) ? value : [];
    if (this.map) {
      this.clearMarkers();
      this.addMarkers();
    }
  }

  async connectedCallback() {
    this.render();
    try {
      await this.waitForGoogleMaps();
      this.initMap();
      this.addMarkers();
    } catch (e) {
      console.error("Google Maps ачаалагдсангүй:", e);
    }
  }

  render() {
    this.innerHTML = `
      <style>
        .map {
          width: 100%;
          height: 500px;
          border: 2px solid #c9e6cb;
          border-radius: 20px;
          margin-top: 10px;
        }
      </style>
      <div id="map" class="map"></div>
    `;
  }

  waitForGoogleMaps() {
    return new Promise((resolve, reject) => {
      if (window.google?.maps) return resolve();
      const maxWait = 15000;
      let waited = 0;
      const check = setInterval(() => {
        if (window.google?.maps) {
          clearInterval(check);
          resolve();
        } else if ((waited += 100) >= maxWait) {
          clearInterval(check);
          reject(new Error("Timeout"));
        }
      }, 100);
    });
  }

  initMap() {
    this.map = new google.maps.Map(this.querySelector('#map'), {
      center: { lat: 47.918, lng: 106.917 },
      zoom: 12
    });
  }

  addMarkers() {
    if (!this.map) return;
    this._data.forEach(tseg => {
      const lat = Number(tseg.lat || tseg.latitude);
      const lng = Number(tseg.lng || tseg.longitude);
      if (isNaN(lat) || isNaN(lng)) return;

      const marker = new google.maps.Marker({
        map: this.map,
        position: { lat, lng },
        title: tseg.name
      });

      marker.addListener('click', () => {
        this.dispatchEvent(new CustomEvent('tseg-select', {
          detail: tseg,
          bubbles: true
        }));
      });
      this.markers.push(marker);
    });
  }

  clearMarkers() {
    this.markers.forEach(m => m.setMap(null));
    this.markers = [];
  }
}

customElements.define('tseg-map', TsegMap);