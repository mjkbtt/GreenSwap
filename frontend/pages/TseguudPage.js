export class TseguudPage {
  async render(container) {
    container.innerHTML = `
      <div class="page-wrapper">
        <tseg-cmp></tseg-cmp>
      </div>
    `;
    await this.waitForComponent();
  }

  async waitForComponent() {
    return new Promise((resolve) => {
      if (customElements.get('tseg-cmp')) {
        resolve();
      } else {
        customElements.whenDefined('tseg-cmp').then(resolve);
      }
    });
  }

  async loadCenters() {
    try {
      const response = await fetch('/api/tseguud');
      const centers = await response.json();
      return centers;
    } catch (error) {
      console.error("Failed to load recycling centers:", error);
      return [];
    }
  }
}

export default TseguudPage;