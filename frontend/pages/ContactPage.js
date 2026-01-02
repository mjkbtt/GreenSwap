

export class ContactPage {
  async render(container) {
    container.innerHTML = /*html*/`
      <div class="contact-page"> 
        <!-- Contact Content -->
        <div class="contact-content">
          <!-- Contact Form -->
          <div class="contact-form-section">
            <h2>Санал хүсэлт илгээх</h2>
            <form class="contact-form" id="contactForm">
              <div class="form-group">
                <label for="name">Нэр </label>
                <input type="text" id="name" name="name" required placeholder="Таны нэр">
              </div>

              <div class="form-group">
                <label for="email">Имэйл хаяг</label>
                <input type="email" id="email" name="email" required placeholder="example@email.com">
              </div>

              <div class="form-group">
                <label for="phone">Утас</label>
                <input type="tel" id="phone" name="phone" placeholder="+976 9999-9999">
              </div>

              <div class="form-group">
                <label for="subject">Сэдэв </label>
                <select id="subject" name="subject" required>
                  <option value="">Сонгоно уу</option>
                  <option value="general">Ерөнхий асуулт</option>
                  <option value="partnership">Хамтын ажиллагаа</option>
                  <option value="support">Тусламж хэрэгтэй</option>
                  <option value="feedback">Санал хүсэлт</option>
                  <option value="other">Бусад</option>
                </select>
              </div>

              <div class="form-group">
                <label for="message">Мессеж </label>
                <textarea id="message" name="message" rows="5" required placeholder="Таны мессеж..."></textarea>
              </div>

              <button type="submit" class="submit-button">
                Илгээх 
              </button>
            </form>

            <div class="form-message" id="formMessage" style="display: none;"></div>
          </div>

          <!-- Contact Information -->
          <div class="contact-info-section">
            <h2>Бидэнтэй холбоо барих мэдээлэл</h2>
            
            <div class="info-cards">
              <div class="info-card">
              <div class="info-icon">
                  <img src="zurags/location.png" alt="Location">
                </div>
                <div class="info-content">
                  <h3>Хаяг:</h3>
                  <p>Улаанбаатар хот, Сүхбаатар дүүрэг<br>Барилгачдын талбай, GreenHub 3 давхар</p>
                </div>
              </div>

              <div class="info-card">
                <div class="info-icon">
                  <img src="zurags/telephone.png" alt="Phone">
                </div>
                <div class="info-content">
                  <h3>Утас:</h3>
                  <p>+976 7000-1234<br>+976 8000-5678</p>
                </div>
              </div>

              <div class="info-card">
                <div class="info-icon">
                  <img src="zurags/email.png" alt="Email">
                </div>
                <div class="info-content">
                  <h3>Имэйл:</h3>
                  <p>info@greenswap.mn<br>support@greenswap.mn</p>
                </div>
              </div>

              <div class="info-card">
                <div class="info-icon">
                  <img src="zurags/time.png" alt="Clock">
                </div>
                <div class="info-content">
                  <h3>Ажлын цаг:</h3>
                  <p>Даваа - Баасан: 9:00 - 18:00<br>Бямба: 10:00 - 14:00<br>Ням: Амарна</p>
                </div>
              </div>
            </div>

            <!-- Social Links -->
            <div class="social-section">
              <h3>Биднийг дагаарай</h3>
              <div class="social-links">
                <a href="#" class="social-link facebook">
                  <span>📘</span> Facebook
                </a>
                <a href="#" class="social-link instagram">
                  <span>📷</span> Instagram
                </a>
                <a href="#" class="social-link twitter">
                  <span>🐦</span> Twitter
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Map Section -->
        <div class="map-section">
          <h2>Манай байршил</h2>
          <div class="map-placeholder">
            <div class="map-icon">🗺️</div>
            <p>Газрын зураг энд орно</p>
            <p class="map-note">Улаанбаатар хот, Сүхбаатар дүүрэг, Барилгачдын талбай</p>
          </div>
        </div>
      </div>

      <style>
        .contact-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #e8f5e9 0%, #f1f8f4 100%);
        }

        .contact-hero {
          text-align: center;
          padding: 60px 20px 40px 20px;
          background: linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%);
        }

        .contact-hero h1 {
          font-size: 36px;
          font-weight: 700;
          color: --green-dark;
          margin-bottom: 12px;
        }

        .contact-hero p {
          font-size: 18px;
          color: #2e7d32;
        }

        .contact-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 40px;
        }

        .contact-form-section h2,
        .contact-info-section h2 {
          font-size: 24px;
          font-weight: 700;
          color: var(--green-dark);
          margin-bottom: 24px;
        }

        .contact-form-section {
          background: white;
          padding: 40px;
          border-radius: 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .form-group {
          margin-bottom: 20px;
          margin-right: 20px;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          font-family: inherit;
          transition: border-color 0.2s;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #4CAF50;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .submit-button {
          width: 100%;
          padding: 14px;
          background: var(--yellow);
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .submit-button:hover {
          transform: translateY(-2px);
        }

        .form-message {
          margin-top: 16px;
          padding: 12px;
          border-radius: 8px;
          text-align: center;
          font-size: 14px;
        }

        .form-message.success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .form-message.error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .contact-info-section h2 {
          margin-bottom: 24px;
        }

        .info-cards {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 32px;
        }

        .info-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          display: flex;
          gap: 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        .info-card:hover {
          transform: scale(1.05);
        }

        .info-icon {
          font-size: 32px;
          flex-shrink: 0;
        }
        .info-icon img{
          margin-top: 10px;
          height: 30px;
          width: 30px;
        }

        .info-content h3 {
          font-size: 16px;
          font-weight: 600;
          color: #333;
          margin-bottom: 8px;
        }

        .info-content p {
          font-size: 14px;
          color: #666;
          line-height: 1.6;
        }

        .social-section {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .social-section h3 {
          font-size: 18px;
          font-weight: 600;
          color: #333;
          margin-bottom: 16px;
        }

        .social-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .social-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          background: #f5f5f5;
          border-radius: 8px;
          text-decoration: none;
          color: #333;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .social-link span {
          font-size: 20px;
        }

        .social-link:hover {
          background: var(--green1);
          color: white;
          transform: translateX(4px);
        }

        .map-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px 60px 20px;
        }

        .map-section h2 {
          font-size: 28px;
          font-weight: 700;
          color: --green-dark;
          margin-bottom: 24px;
          text-align: center;
        }

        .map-placeholder {
          background: white;
          padding: 80px 40px;
          border-radius: 16px;
          text-align: center;
          border: 2px dashed #ccc;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .map-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .map-placeholder p {
          font-size: 18px;
          color: #999;
          margin-bottom: 8px;
        }

        .map-note {
          font-size: 14px !important;
          color: #666 !important;
        }

        @media (max-width: 968px) {
          .contact-content {
            grid-template-columns: 1fr;
          }

          .contact-hero h1 {
            font-size: 28px;
          }

          .map-placeholder {
            padding: 60px 20px;
          }
        }
      </style>
    `;

    this.addEventListeners(container);
  }

  addEventListeners(container) {
    const form = container.querySelector('#contactForm');
    const messageDiv = container.querySelector('#formMessage');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        subject: form.subject.value,
        message: form.message.value,
        timestamp: new Date().toISOString()
      };

      try {
        // Simulate sending (replace with actual API call)
        await this.submitContactForm(formData);

        // Show success message
        messageDiv.textContent = '✓ Таны мессеж амжилттай илгээгдлээ! Бид удахгүй холбогдох болно.';
        messageDiv.className = 'form-message success';
        messageDiv.style.display = 'block';

        // Reset form
        form.reset();

        // Hide message after 5 seconds
        setTimeout(() => {
          messageDiv.style.display = 'none';
        }, 5000);

      } catch (error) {
        console.error('Error submitting form:', error);
        messageDiv.textContent = '✗ Алдаа гарлаа. Дахин оролдоно уу.';
        messageDiv.className = 'form-message error';
        messageDiv.style.display = 'block';
      }
    });
  }

  async submitContactForm(data) {
    // TODO: Replace with actual API endpoint
    // Example: await fetch('http://localhost:3000/api/contact', { method: 'POST', body: JSON.stringify(data) })
    
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Contact form submitted:', data);
        resolve({ success: true });
      }, 1000);
    });
  }
}

export default ContactPage;