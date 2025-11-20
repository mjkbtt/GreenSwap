class CmpHeader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
        this.addEvents();
    }
    addEvents() {
        // Хайх товчлуур дээр дарахад ажиллах логик
        const searchBtn = this.shadowRoot.querySelector(".search-btn");
        searchBtn.addEventListener("click", () => {
            alert("Хайх үйлдэл эхэллээ!");

        });
    }
    render() {  

        this.shadowRoot.innerHTML = /*html*/ `
        <style>
            .header {
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: var(--white); 
            border-bottom: 1px solid var(--gray-lighter);
            padding: 10px 0; 
            height: 50px;
        }
        .nav-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            flex-wrap: wrap;
            gap: 10px;
            
        }
        .logo img {
            margin-left: 15px;
            width: 80px;
            height: 60px;
        }   
        .nav-links {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
        }
        .nav-links a {
            text-decoration: none;
            color: var(--gray);
            margin: 0 50px;  
            font-size: var(--font-size-1);
        }

        .nav-links a:hover {
            color: var(--green1);
        }

        .profile-img {
            width: 40px;
            height: 40px;
            cursor:pointer;
            margin: 15px;
            flex-shrink: 0;

        }

        .search-bar {
            display: flex;
            border: 1px solid #ccc;
            border-radius: 20px;
            padding: 5px 10px; 
            background-color: #f0f0f0; 
            height: 30px;
            flex:1; /*allow stretchig between nav and profile*/
            min-width: 120px;
            max-width: 300px;
            gap: 5px;
            margin: 30px;
        }

        .search-btn {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 8px;
            width: 40px;
            height: 30px;
            background: none;
            border: none;
            cursor: pointer;
            color: var(--gray-light);
        }
        .search-btn img{
            width: 20px;
            height: 20px;
        }
        .search-bar input {
            flex: 1;
            border: none;
            background: transparent;
            outline: none;
            font-size: 16px;
        }


        </style>
        <header class="header">
            <div class="container nav-bar">
                <div class="logo">
                    <img src="logo.png" alt="Green Swap Logo">            
                </div>
                <nav class="nav-links">
                    <a href="#/home">Нүүр</a>
                    <a href="#/about">Бидний тухай</a>
                    <a href="#/contact">Холбоо барих</a>
                </nav>
                <div class="search-bar">
                    <button class="search-btn">
                        <img src="search.png" alt="Search">
                        <input type="text" placeholder="Хайх">
                    </button>
                </div>
                </div>
                    <img src="profile.png" class="profile-img" alt="" >

                </div>
            </div>
        </header>
        `;
    }

    disconnectedCallback() {
    
    }

    attributeChangedCallback(name, oldVal, newVal) {
    
    }

    adoptedCallback() {
    
    }

}

window.customElements.define('cmp-header', CmpHeader);