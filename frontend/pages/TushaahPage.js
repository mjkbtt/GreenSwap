export class TushaahPage {
  async render(container) {
    container.innerHTML = /*html*/`
      <search-waste></search-waste>
    `;
    
    await this.waitForComponent();
  }
  
  async waitForComponent() {
    return new Promise(resolve => {
      if (customElements.get('search-waste')) {
        resolve();
      } else {
        customElements.whenDefined('search-waste').then(resolve);
      }
    });
  }
}

export default TushaahPage;