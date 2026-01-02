// frontend/pages/BidniiTuhai.js
// Бидний тухай - About Us page

export class BidniiTuhai {
  async render(container) {
    container.innerHTML = /*html*/`
      <div class="about-page">
        <div class="about-hero">
          <img src="zurags/about-us2.png">
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
                <img src="zurags/target.png">
                <h3>Бидний эрхэм зорилго</h3>
                <ul class="feature-list">
                  <li>Дахин боловсруулалтын мэдлэг, соёлыг түгээх</li>
                  <li>Хог хаягдлын зөв ангилалтыг нэмэгдүүлэх</li>
                  <li>Байгаль орчинд ээлтэй амьдралын төлөвшүүлэх</li>
                  <li>Дахин боловсруулалтын үр дүнг нэмэгдүүлэх</li>
                </ul>
              </div>

              <div class="feature-section">
                <img src="zurags/community.png">
                <h4>Бидний хамт олон</h4>
                <p class="team-description">
                  Эко Монгол төслийг байгаль орчны мэргэжилтнүүд, програм хангамжийн инженерүүд, 
                  дизайнеруудаас бүрдсэн залуу, идэвхтэй баг хэрэгжүүлж байна. Бид Монгол улсад 
                  цэвэр орон болтой хослуудыг хэрэгжүүлж хэрэгсэжүүлэр.
                </p>
              </div>
            </div>

            <div class="features-column">
              <div class="feature-section blue">
                <img src="zurags/unet.png">
                <h3>Бидний үнэт зүйлс</h3>
                <ul class="feature-list">
                  <li>Байгаль орчны эрэмлэх</li>
                  <li>Хамтын ажиллагаа</li>
                  <li>Инновац, шинэлэг санаа</li>
                  <li>Боловсрол, мэдлэг</li>
                </ul>
              </div>

              <div class="feature-section yellow">
                <img src="zurags/star.png">
                <h3>Бидний мөрөөдөл</h3>
                <p>Манай зорилго бол Монгол улсыг цэвэр, ногоон орон болгоод цаашид төслө орголсон орны 
                жишиг байх явдал.</p>
              </div>
            </div>
          </div>

          <section class="impact-banner">
            <div class="impact-content">
              <img src="zurags/ecological.png">
              <h2>Та бидэнтэй нэгдээрэй</h2>
              <p>
                Дахин боловсруулалтыг дэмжиж, байгаль орчныг хамгаалахад хувь нэмрээ оруулцгаая.
              </p>
            </div>
          </section>

          
        </div>
      </div>

      <style>
        .about-page {
          min-height: 100vh;
          background: var(--background);
        }

        .about-hero {
          position: relative;
          text-align: center;
          padding: 60px 20px 40px 20px;
          height: 20em;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden; /* Зураг хүрээнээс гарахгүй байх */
          margin-right: 20px;
          margin-left: 20px;
        }

        .about-hero img {
          width: 600px ;
          height: auto;
          object-fit: contain; /* contain - зураг бүтэн харагдана */
          border-radius: 12px;
        }

        .about-content {
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .mission-section {
          background: var(--white);
          padding: 40px;
          border-radius: 16px;
          margin-bottom: 32px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          border: 1px solid var(--gray-lighter);
        }

        .intro-text {
          font-size: 16px;
          line-height: 1.8;
          color: var(--black);
          margin-bottom: 20px;
        }

        .description-text {
          font-size: 14px;
          line-height: 1.8;
          color: var(--gray);
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
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .feature-section img {
          width: 32px;
          height: 32px;
          margin-right: 12px;
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

        .feature-section:hover {
          transform: scale(1.05);
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
          text-align: center;
        }

        .impact-content p {
          color: white;
          font-size: 15px;
          line-height: 1.8;
          opacity: 0.95;
          text-align: center;
        }
        .impact-content img {
          height: 80px;
          width: 80px;
          display: block;   /* Зургийг блок болгох, доош нь*/
          margin-left: auto; 
          margin-right: auto;
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