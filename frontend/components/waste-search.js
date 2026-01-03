class WasteSearch extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/`
      <style>
        .filter-card { background: white; padding: 25px; border-radius: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .filter-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 15px; margin-top: 15px; }
        .filter-item input, .filter-item select { width: 100%; padding: 10px; border: 1px solid #eee; border-radius: 10px; outline: none; }
      </style>
      <div class="filter-card">
        <h2 style="margin:0">Дахивар тушаах цэг хайх</h2>
        <div class="filter-grid">
          <div class="filter-item">
            <input type="text" id="q" placeholder="Нэрээр хайх...">
          </div>
          <div class="filter-item">
            <select id="t">
              <option value="all">Бүх төрөл</option>
              <option value="Plastic">Хуванцар</option>
              <option value="Paper">Цаас</option>
              <option value="Metal">Металл</option>
            </select>
          </div>
          <div class="filter-item">
            <select id="d">
              <option value="all">Бүх дүүрэг</option>
              <option value="СБД">СБД</option>
              <option value="БГД">БГД</option>
              <option value="ХУД">ХУД</option>
            </select>
          </div>
        </div>
      </div>
    `;

    const trigger = () => {
      this.dispatchEvent(new CustomEvent('filter-change', {
        detail: {
          query: this.querySelector('#q').value,
          type: this.querySelector('#t').value,
          district: this.querySelector('#d').value
        },
        bubbles: true,
        composed: true // Shadow DOM ашиглаж байгаа бол хэрэгтэй
      }));
    };

    this.querySelector('#q').addEventListener('input', trigger);
    this.querySelector('#t').addEventListener('change', trigger);
    this.querySelector('#d').addEventListener('change', trigger);
  }
}
customElements.define('waste-search', WasteSearch);