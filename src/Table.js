import TableHeader from './TableHeader'
import List from './List.js'
import NewListForm from './NewListForm.js'
const template = document.createElement('template')
 
export default class Table extends HTMLElement{
	html
	name
    color

	constructor(name, color){
		super()
		this.attachShadow({ mode: "open" });
        this.name = name
        this.color = color
	}
	 static get observedAttributes() {
        return [];
    }
    handleEvent(event){
        if(event.type ==="click"){
            if(event.target.classList.contains('addListButton')){
                    const element = this.shadowRoot.querySelector('new-list-form')
                    element.classList.add('isVisible')
                }

        }
        if(event.type === "add:list"){
            const main = this.shadowRoot.querySelector('main')
            
            const list = new List(event.detail.name)
            main.append(list)
        }
    }
    // Callback que se ejecuta cuando cambia una propiedad
    attributeChangedCallback(name, oldValue, newValue) {
       
    }

    // Método que se ejecuta cuando se conecta el componente al DOM
    connectedCallback() {
        console.log('nombre en Table', this.name)
        template.innerHTML = `
        <style>
        *,::before,::after{
            margin:0;
            padding:0;
            box-sizing: border-box;
        }
        .container{
            background-color:${this.color};
            min-height:94vh;
            max-height:100%;
        }
        button{
            position:relative;
            display:flex;
            gap:20px;
            
            align-items: center;
            background: var(--text-300-hover);
            font-size: 1.2rem;
            backdrop-filter: blur(10px);
            border: 1px solid var(--text-100);
            border-radius:10px;
            width:272px;
            height:40px;
            color: var(--background-100);
            font-weight: 600;
            img{
                margin-left:10px;
                width:18px;
                height:18px;
            }
            &:hover{
                background-color: ffffff3b ;
            }
            &:active{
            background-color: #ffffff3b;
            }
        }
        main{
            display:flex;
            gap:20px;
            padding:20px;
        }
        
        :host{

        }    
        </style>
        <div class="container">
            <table-header name='${this.name}'></table-header>
            <main>
                <button class="addListButton">
                    <img src="/clon-trello-app/icons/plus.svg" alt="boton de add">
                    new list
                    <new-list-form></new-list-form>
                </button>  
            </main>
        </div>`
        
        this.html = template.content.cloneNode(true);
        if(this.shadowRoot.children.length < 2){
           this.shadowRoot.append(this.html)
           const addListButton = this.shadowRoot.querySelector('.addListButton')
            addListButton.addEventListener('click', this)
            this.addEventListener('add:list',this)
        }

        
    }
}

customElements.define('table-component', Table)