// frontend/pages/TseguudPage.js
import '../components/tseg-map.js';
import '../components/tseg-info.js';

export class TseguudPage {
  async render(container) {
    container.innerHTML = /*html*/`
      <style>
        * { box-sizing: border-box; }

        .main-body {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: 20px;
          
        }

        .tseguud-container {
          display: flex;
          gap: 20px;
        }

        .body-container {
          flex: 0 0 65%;
        }

        .tseg-stats {
          flex: 0 0 35%;
        }

        article {
          border-radius: 16px;
          padding: 20px;
          background: var(--white);
          border: 1px solid var(--gray-lighter);
          color: var(--black);
        }
        


        .map {
          width: 100%;
          height: 500px;
          border-radius: 16px;
          
        }

        .tseg-detail-card {
          background: var(--white);
          border-radius: 16px;
          padding: 20px;
        }

        .type-badge {
          display: inline-block;
          padding: 6px 12px;
          border-radius: 20px;
          background: #e6f4ea;
          margin: 4px;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .tseguud-container {
            flex-direction: column;
          }
        }
      </style>

      <div class="main-body">
        <div class="action-btns">
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
        </div>
        <div class="tseguud-container">
          <div class="body-container">
            <article>
              <h1>Дахивар авах цэгүүд</h1>
              <p>Газрын зураг дээр цэг дарж дэлгэрэнгүй үзнэ үү</p>
              <tseg-map></tseg-map>
              <p>Нийт цэг: <strong id="tseg-count">0</strong></p>
            </article>
          </div>

          <div class="tseg-stats">
            <tseg-info></tseg-info>
          </div>
        </div>
      </div>
    `;

    const res = await fetch('/api/tseguud');
    const data = await res.json();

    const map = container.querySelector('tseg-map');
    const info = container.querySelector('tseg-info');

    map.data = data;
    container.querySelector('#tseg-count').textContent = data.length;

    map.addEventListener('tseg-select', e => {
      info.data = e.detail;
    });
  }
}

export default TseguudPage;
