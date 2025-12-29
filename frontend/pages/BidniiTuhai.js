// frontend/pages/BidniiTuhai.js
// Бидний тухай - About Us page

export class BidniiTuhai {
  async render(container) {
    container.innerHTML = /*html*/`
      <div class="about-page">
        <div class="about-hero">
          <h1>Бидний тухай</h1>
          <p class="subtitle">Байгаль орчноо хамгаалах нь Бидний хамтын үүрэг</p>
        </div>
        <div class="about-content">
          <section class="mission-section">
            <p class="intro-text">
              Эко Монгол нь Монгол улсад дахин боловсруулалтыг өргөжүүлж, байгаль 
              орчны асуудлыг шийдвэрлэхэд хувь нэмрээ оруулах зорилготой төсөл юм.
            </p>

            <p class="description-text">
              Бид өргөдлөө хог хаягдлын зөв ангилах, дахин боловсруулах боломжийг олгох замаар 
              байгаль орчинд ээлтэй амьдралын хэв маягийг төлөвшүүлэхийг зорьж байна. Манай 
              систем нь хэрэглэгчдэд дахин боловсруулалтад орохцүүлөх онсо чуулгуулах, эко 
              бүтээгдэхүүнээр шагнуулах боломжийг олгодог.
            </p>
          </section>

          <div class="features-grid">
            <div class="features-column">
              <div class="feature-section green">
                <div class="feature-icon">✓</div>
                <h3>Бидний яғаам зорилго</h3>
                <ul class="feature-list">
                  <li>Дахин боловсруулалтын мэдлэг, соёлыг түгээх</li>
                  <li>Хог хаягдлын зөв ангилалтыг нэмэгдүүлэх</li>
                  <li>Байгаль орчинд ээлтэй амьдралын төлөвшүүлэх</li>
                  <li>Дахин боловсруулалтын үр дүнг нэмэгдүүлэх</li>
                </ul>
              </div>

              <div class="feature-section">
                <h4>Бидний баг</h4>
                <p class="team-description">
                  Эко Монгол төслийг байгаль орчны мэргэжилтнүүд, програм хангамжийн инженерүүд, 
                  дизайнеруудаас бүрдсэн залуу, идэвхтэй баг хэрэгжүүлж байна. Бид Монгол улсад 
                  цэвэр орон болтой хослуудыг хэрэгжүүлж хэрэгсэжүүлэр.
                </p>
                <a href="#" class="team-link">✓ Хамтаар бид илүү хүч үргэлүүх бүхэнд нээгээдэй! Бүхэнээ!</a>
              </div>
            </div>

            <div class="features-column">
              <div class="feature-section blue">
                <div class="feature-icon">💙</div>
                <h3>Бидний үнэт зүйлс</h3>
                <ul class="feature-list">
                  <li>Байгаль орчны эрэмлэх</li>
                  <li>Хамтын ажиллагаа</li>
                  <li>Инновац, шинэлэг санаа</li>
                  <li>Боловсрол, мэдлэг</li>
                </ul>
              </div>

              <div class="feature-section yellow">
                <div class="feature-icon">⭐</div>
                <h3>Бололөстол, мэдлэг</h3>
                <p>Манай зорилго бол Монгол улсыг цэвэр, ногоон орон болгоод цаашид төслө орголсон орны 
                жишиг байх явдал.</p>
              </div>
            </div>
          </div>

          <section class="impact-banner">
            <div class="impact-content">
              <h2>Бидний нөлөө</h2>
              <p>
                Эко Монгол төслийг байгаль орчны мэргэжлүүд, програм хангамжын инженерүүд, 
                дизайнеруудаас бүрдсэн залуу, цэвэр орон болтой төслийү нч эргэхгүйлэхэд нөгөөд, цаашид ор 
                болгох болтоой хослуудыг төслө эргэхгүйлэр.
              </p>
            </div>
          </section>

          <section class="cta-section">
            <div class="cta-content">
              <div class="cta-icon">♻️</div>
              <div class="cta-text">
                <h3>Танд бид байгаль орчны танилцуулагч хүснэгт!</h3>
                <p>Байгаль орчноо хамгаалаарай!</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <style>
        .about-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #e8f5e9 0%, #f1f8f4 100%);
        }

        .about-hero {
          text-align: center;
          padding: 60px 20px 40px 20px;
          background: linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%);
        }

        .about-hero h1 {
          font-size: 36px;
          font-weight: 700;
          color: #1b5e20;
          margin-bottom: 12px;
        }

        .subtitle {
          font-size: 18px;
          color: #2e7d32;
          font-weight: 500;
        }

        .about-content {
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .mission-section {
          background: white;
          padding: 40px;
          border-radius: 16px;
          margin-bottom: 32px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .intro-text {
          font-size: 16px;
          line-height: 1.8;
          color: #333;
          margin-bottom: 20px;
        }

        .description-text {
          font-size: 14px;
          line-height: 1.8;
          color: #666;
        }

        .features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 32px;
        }

        .features-column {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .feature-section {
          background: white;
          padding: 32px;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .feature-section.green {
          background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
        }

        .feature-section.blue {
          background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
        }

        .feature-section.yellow {
          background: linear-gradient(135deg, #fff9c4 0%, #fff59d 100%);
        }

        .feature-icon {
          font-size: 32px;
          margin-bottom: 16px;
        }

        .feature-section h3 {
          font-size: 20px;
          font-weight: 700;
          color: #1b5e20;
          margin-bottom: 16px;
        }

        .feature-section h4 {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 12px;
        }

        .feature-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .feature-list li {
          padding: 10px 0;
          padding-left: 28px;
          position: relative;
          color: #333;
          font-size: 14px;
          line-height: 1.6;
        }

        .feature-list li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #4CAF50;
          font-weight: bold;
          font-size: 18px;
        }

        .team-description {
          font-size: 14px;
          line-height: 1.8;
          color: #666;
          margin-bottom: 16px;
        }

        .team-link {
          display: inline-block;
          color: #4CAF50;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
        }

        .team-link:hover {
          text-decoration: underline;
        }

        .impact-banner {
          background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
          padding: 48px;
          border-radius: 16px;
          margin-bottom: 32px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .impact-content h2 {
          color: white;
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .impact-content p {
          color: white;
          font-size: 15px;
          line-height: 1.8;
          opacity: 0.95;
        }

        .cta-section {
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .cta-content {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .cta-icon {
          font-size: 64px;
          flex-shrink: 0;
        }

        .cta-text h3 {
          font-size: 22px;
          font-weight: 700;
          color: #1b5e20;
          margin-bottom: 8px;
        }

        .cta-text p {
          font-size: 16px;
          color: #666;
        }

        @media (max-width: 768px) {
          .features-grid {
            grid-template-columns: 1fr;
          }

          .about-hero h1 {
            font-size: 28px;
          }

          .cta-content {
            flex-direction: column;
            text-align: center;
          }
        }
      </style>
    `;
  }
}

export default BidniiTuhai;