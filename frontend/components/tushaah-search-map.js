// frontend/components/tushaah-search-map.js
class TushaahSearchMap extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.map = null;
    this.markers = [];
    this.data = [];
    this.filter = { type: "all", district: "all" };
  }

  async connectedCallback() {
    this.render();
    await this.loadData();
    await this.waitForGoogleMaps();
    this.initMap();
    this.bindEvents();
    this.updateMap(this.data);
  }

  async loadData() {
    const res = await fetch("/api/tseguud");
    const raw = await res.json();

    this.data = raw.map(t => ({
      ...t,
      type: Array.isArray(t.type) ? t.type : [t.type]
    }));
  }

  waitForGoogleMaps() {
    return new Promise(resolve => {
      if (window.google?.maps) return resolve();
      const i = setInterval(() => {
        if (window.google?.maps) {
          clearInterval(i);
          resolve();
        }
      }, 100);
    });
  }

  initMap() {
    const mapEl = this.shadowRoot.querySelector("#map");
    this.map = new google.maps.Map(mapEl, {
      center: { lat: 47.918, lng: 106.918 },
      zoom: 12
    });
  }

  bindEvents() {
    const typeSel = this.shadowRoot.querySelector("#type");
    const distSel = this.shadowRoot.querySelector("#district");
    const btn = this.shadowRoot.querySelector("#search");

    btn.addEventListener("click", () => {
      this.filter.type = typeSel.value;
      this.filter.district = distSel.value;
      this.applyFilter();
    });
  }

  applyFilter() {
    const filtered = this.data.filter(t => {
      const typeOk =
        this.filter.type === "all" || t.type.includes(this.filter.type);
      const distOk =
        this.filter.district === "all" || t.district === this.filter.district;
      return typeOk && distOk;
    });

    this.updateMap(filtered);
    this.renderList(filtered);
  }

  updateMap(list) {
    this.markers.forEach(m => m.setMap(null));
    this.markers = [];

    const bounds = new google.maps.LatLngBounds();

    list.forEach(t => {
      const lat = Number(t.latitude);
      const lng = Number(t.longitude);
      if (isNaN(lat) || isNaN(lng)) return;

      const marker = new google.maps.Marker({
        map: this.map,
        position: { lat, lng },
        title: t.name,
        icon: "https://maps.google.com/mapfiles/ms/icons/red-dot.png"
      });

      this.markers.push(marker);
      bounds.extend(marker.getPosition());
    });

    if (this.markers.length) this.map.fitBounds(bounds);
  }

  renderList(list) {
    const res = this.shadowRoot.querySelector("#results");
    res.innerHTML = list.length
      ? list
          .map(
            t => `
        <div class="item">
          <strong>${t.name}</strong><br>
          ${t.district} – ${t.type.join(", ")}
        </div>`
          )
          .join("")
      : "<p>Илэрц олдсонгүй</p>";
  }

  render() {
    this.shadowRoot.innerHTML = /*html*/`
      <style>
        .container {
          display: grid;
          grid-template-columns: 0.4fr 0.6fr;
          gap: 20px;
          padding: 20px;
        }
        .panel {
          background: var(--white);
          border-radius: 12px;
          padding: 20px;
          border: 1px solid var(--gray-lighter);
        }
        select, button {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
        }
        button {
          background: var(--green2);
          color: white;
          border: none;
          cursor: pointer;
        }
        #map {
          height: 500px;
          border-radius: 12px;
          border: 1px solid var(--gray-lighter);
        }
        .item {
          background: #e8fbe8;
          padding: 10px;
          border-left: 4px solid #2ecc71;
          border-radius: 6px;
          margin-bottom: 8px;
        }
        @media (max-width: 768px) {
          .container {
            grid-template-columns: 1fr;
          }
        }
      </style>

      <div class="container">
        <div class="panel">
          <label>Төрөл</label>
          <select id="type">
            <option value="all">Бүгд</option>
            <option value="Plastic">Plastic</option>
            <option value="Paper">Paper</option>
            <option value="Metal">Metal</option>
          </select>

          <label>Дүүрэг</label>
          <select id="district">
            <option value="all">Бүгд</option>
            <option value="СБД">СБД</option>
            <option value="БЗД">БЗД</option>
            <option value="ЧД">ЧД</option>
          </select>

          <button id="search">Хайх</button>
          <div id="results"></div>
        </div>

        <div id="map"></div>
      </div>
    `;
  }
}

customElements.define("tushaah-search-map", TushaahSearchMap);
