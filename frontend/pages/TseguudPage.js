export class TseguudPage {
  async render(container) {
    container.innerHTML = /*html*/`
      <tseg-cmp></tseg-cmp>
    `;
    
    await this.waitForComponent();
  }
  
  async waitForComponent() {
    return new Promise(resolve => {
      if (customElements.get('tseg-cmp')) {
        resolve();
      } else {
        customElements.whenDefined('tseg-cmp').then(resolve);
      }
    });
  }
}

export default TseguudPage;