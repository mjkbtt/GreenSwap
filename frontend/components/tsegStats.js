// components/TsegStats.js
export class TsegStats extends HTMLElement {
  set tseg(value) {
    this.render(value);
  }

  render(tseg) {
    if (!tseg) {
      this.innerHTML = `<p>Цэг сонгоно уу</p>`;
      return;
    }

    this.innerHTML = `
      <h2>${tseg.name}</h2>
      <p>${tseg.location}</p>
      <p>⏰ ${tseg.working_hours}</p>
      <p>📞 ${tseg.phone}</p>
    `;
  }
}

customElements.define('tseg-stats', TsegStats);
