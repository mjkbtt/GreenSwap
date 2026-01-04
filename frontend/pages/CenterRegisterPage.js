export class CenterRegisterPage {
  async render(container) {
    container.innerHTML = /*html*/`
      <div class="auth-page center">
        <div class="auth-container">
          <div class="auth-header">
            <img src="zurags/industry.png">
            <h1>Хог цэгийн бүртгэл</h1>
            <p>Дахин боловсруулах цэгээ бүртгүүлнэ үү</p>
          </div>

          <form class="auth-form" id="centerRegisterForm">
            <div class="form-group">
              <label for="centerName">Цэгийн нэр *</label>
              <input
                type="text"
                id="centerName"
                name="name"
                required
                placeholder="Green Point СБД"
              >
            </div>

            <div class="form-group">
              <label for="centerEmail">Цэгийн имэйл *</label>
              <input
                type="email"
                id="centerEmail"
                name="email"
                required
                placeholder="center@greenswap.mn"
              >
            </div>

            <div class="form-group">
              <label for="centerDistrict">Дүүрэг *</label>
              <select id="centerDistrict" name="district" required>
                <option value="">Сонгох</option>
                <option value="СБД">Сүхбаатар дүүрэг (СБД)</option>
                <option value="БЗД">Баянзүрх дүүрэг (БЗД)</option>
                <option value="ЧД">Чингэлтэй дүүрэг (ЧД)</option>
                <option value="ХУД">Хан-Уул дүүрэг (ХУД)</option>
                <option value="СХД">Сонгинохайрхан дүүрэг (СХД)</option>
                <option value="БГД">Баянгол дүүрэг (БГД)</option>
              </select>
            </div>

            <div class="form-group">
              <label for="centerAddress">Хаяг *</label>
              <input
                type="text"
                id="centerAddress"
                name="address"
                required
                placeholder="1-р хороо, 5-р байр"
              >
            </div>

            <div class="form-group">
              <label for="centerPhone">Утасны дугаар</label>
              <input
                type="tel"
                id="centerPhone"
                name="phone"
                placeholder="+976 7000-1234"
              >
            </div>

            <div class="form-group">
              <label for="centerPassword">Нууц үг *</label>
              <input
                type="password"
                id="centerPassword"
                name="password"
                required
                placeholder="••••••••"
                minlength="6"
              >
              <small class="hint">Хамгийн багадаа 6 тэмдэгт</small>
            </div>

            <div class="form-group">
              <label for="centerConfirm">Нууц үг давтах *</label>
              <input
                type="password"
                id="centerConfirm"
                name="confirm"
                required
                placeholder="••••••••"
              >
            </div>

            <div class="form-group checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" name="terms" required>
                <span>Би үйлчилгээний нөхцөлтэй танилцсан</span>
              </label>
            </div>

            <button type="submit" class="auth-button center-button">
              Бүртгүүлэх
            </button>
          </form>

          <div class="auth-footer">
            <p>Аль хэдийн бүртгэлтэй юу?
              <a href="#/center-login" data-link>Нэвтрэх</a>
            </p>
            <p class="center-link">
              <a href="#/login" data-link>👤 Хэрэглэгчээр нэвтрэх</a>
            </p>
          </div>

          <div class="message" id="message" style="display:none;"></div>
        </div>

        <!-- Info panel -->
        <div class="info-panel">
          <h2>Цэг бүртгүүлснээр</h2>
          <ul class="benefits-list">
            <li>
              <span class="benefit-icon">🗺️</span>
              <div>
                <strong>Газрын зураг дээр харагдана</strong>
                <p>Хэрэглэгчид таны цэгийг амархан олно</p>
              </div>
            </li>
            <li>
              <span class="benefit-icon">📈</span>
              <div>
                <strong>Автомат тайлан</strong>
                <p>Хүлээн авсан хаягдлын статистик</p>
              </div>
            </li>
            <li>
              <span class="benefit-icon">🤝</span>
              <div>
                <strong>Илүү хэрэглэгч</strong>
                <p>Eco community-д нэгдэнэ</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <style>
        ${this.sharedStyles()}
      </style>
    `;

    this.addEventListeners(container);
  }

  addEventListeners(container) {
    const form = container.querySelector('#centerRegisterForm');
    const messageDiv = container.querySelector('#message');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Password match validation
      if (form.password.value !== form.confirm.value) {
        messageDiv.textContent = '✗ Нууц үг таарахгүй байна';
        messageDiv.className = 'message error';
        messageDiv.style.display = 'block';
        return;
      }

      // ✅ ЗАСВАРЛАСАН: Бүх шаардлагатай өгөгдөл цуглуулах
      const payload = {
        name: form.name.value,
        email: form.email.value,
        district: form.district.value,      // ✅ name="district" ашигласан
        address: form.address.value,        // ✅ address нэмсэн
        phone: form.phone.value || '',      // ✅ optional
        password: form.password.value,
        role: 'center'
      };

      console.log('📤 Илгээж буй өгөгдөл:', payload);

      try {
        const response = await fetch('/api/center-register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Бүртгэл амжилтгүй');
        }

        messageDiv.textContent = '✓ Амжилттай бүртгэгдлээ! Нэвтэрч байна...';
        messageDiv.className = 'message success';
        messageDiv.style.display = 'block';

        setTimeout(() => {
          window.location.hash = '#/center-login';
        }, 1500);

      } catch (err) {
        console.error('❌ Center register error:', err);
        messageDiv.textContent = '✗ ' + err.message;
        messageDiv.className = 'message error';
        messageDiv.style.display = 'block';
      }
    });
  }

  sharedStyles() {
    return /*css*/`
      .auth-page.center {
        display: grid;
        grid-template-columns: 500px 1fr;
        gap: 40px;
        padding: 40px;
        min-height: 100vh;
      }
      
      .auth-container {
        background: white;
        border-radius: 24px;
        padding: 40px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.15);
        max-height: 95vh;
        overflow-y: auto;
      }
      
      .auth-header { 
        text-align: center; 
        margin-bottom: 32px; 
      }
      
      .auth-header img {
        width: 80px;
        height: 80px;
        margin-bottom: 16px;
      }
      
      .auth-header h1 { 
        color: #1e293b;
        font-size: 24px;
        margin-bottom: 8px;
      }

      .auth-header p {
        color: #64748b;
        font-size: 14px;
      }
      
      .form-group { 
        margin-bottom: 18px;
      }
      
      label { 
        font-weight: 600; 
        font-size: 14px; 
        margin-bottom: 6px; 
        display: block;
        color: #333;
      }
      
      input, select {
        width: 100%;
        padding: 12px 16px;
        border-radius: 8px;
        border: 2px solid #e5e7eb;
        font-size: 14px; 
        outline: none;
        transition: border-color 0.2s;
        background-color: white; 
        box-sizing: border-box;
      }

      select {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 12px center;
        background-size: 16px;
        padding-right: 40px; 
        cursor: pointer;
      }

      input:focus, select:focus {
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      }

      .hint {
        display: block;
        font-size: 12px;
        color: #999;
        margin-top: 4px;
      }

      .checkbox-group {
        margin: 20px 0;
      }

      .checkbox-label {
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        font-size: 14px;
        color: #64748b;
      }

      .checkbox-label input {
        width: 16px;
        height: 16px;
        margin: 0;
        cursor: pointer;
      }
      
      .center-button {
        width: 100%;
        height: 48px;
        background: #667eea;
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.2s;
      }
      
      .center-button:hover {
        background: #5a67d8;
        transform: translateY(-2px);
      }

      .center-button:disabled {
        background: #ccc;
        cursor: not-allowed;
      }
      
      .auth-footer { 
        text-align: center; 
        margin-top: 20px;
        font-size: 14px;
      }

      .auth-footer p {
        margin: 8px 0;
        color: #64748b;
      }
      
      .auth-footer a { 
        color: #667eea;
        font-weight: 600; 
        text-decoration: none; 
      }

      .auth-footer a:hover {
        text-decoration: underline;
      }

      .center-link {
        padding-top: 12px;
        margin-top: 12px;
        border-top: 1px solid #e5e7eb;
      }
      
      .info-panel {
        border-radius: 24px;
        padding: 48px;
        background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .info-panel h2 {
        font-size: 28px;
        color: #166534;
        margin-bottom: 32px;
      }
      
      .benefits-list { 
        list-style: none; 
        padding: 0; 
        display: flex; 
        flex-direction: column; 
        gap: 28px; 
      }
      
      .benefits-list li { 
        display: flex; 
        gap: 16px;
        align-items: flex-start;
      }
      
      .benefit-icon { 
        font-size: 40px;
        flex-shrink: 0;
      }

      .benefits-list strong {
        display: block;
        font-size: 18px;
        color: #166534;
        margin-bottom: 4px;
      }

      .benefits-list p {
        font-size: 14px;
        color: #64748b;
        margin: 0;
      }
      
      .message { 
        margin-top: 16px; 
        padding: 12px; 
        border-radius: 8px; 
        text-align: center;
        font-size: 14px;
      }
      
      .message.success { 
        background: #d1fae5; 
        color: #065f46; 
      }
      
      .message.error { 
        background: #fee2e2; 
        color: #991b1b; 
      }
      
      @media(max-width: 1024px) {
        .auth-page.center {
          grid-template-columns: 1fr;
          padding: 20px;
        }
        
        .info-panel {
          display: none;
        }

        .auth-container {
          max-height: none;
        }
      }
    `;
  }
}

export default CenterRegisterPage;