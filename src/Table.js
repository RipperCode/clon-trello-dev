import TableHeader from './TableHeader'
import List from './List.js'
import NewListForm from './NewListForm.js'

 
export default class Table extends HTMLElement{

	constructor(){
		super()
		this.attachShadow({ mode: "open" });   
	}
	 static get observedAttributes() {
        return [];
    }
    handleEvent(event){
        
    }
    // Callback que se ejecuta cuando cambia una propiedad
    attributeChangedCallback(name, oldValue, newValue) {
       
    }

    // Método que se ejecuta cuando se conecta el componente al DOM
    connectedCallback() {
        
    }
    setData(data, type){
        this.data = data
        this.type = type
        
        this.render()
    } 

    render(){
        
        if(this.type === 'home'){
            this.home()
        }else if(this.type ==='table'){
            this.table()     
        }else if(this.type === 'NotFound'){
            this.notfound()
        }

        console.log(this.shadowRoot)   
    }

    home(){
        this.shadowRoot.innerHTML = `
            <style>
            *,
            ::before,
            ::after{
                margin:0;
                padding: 0;
                box-sizing: border-box;
            }
            .container{
                background-color: skyblue;
                opacity:0.5;
                min-width:100%;
                min-height:94vh;
                color:var(--text-300);
            }
            
            </style>
            <article class="container">
                <h1>Home</h1> 
             </article>
            `
    }
    table(){
        this.shadowRoot.innerHTML = `
            <style>
            *,
            ::before,
            ::after{
                margin:0;
                padding: 0;
                box-sizing: border-box;
            }
            .container{
                background-color: ${this.data.color};
                
                min-width:100%;
                min-height:94vh;
                color:var(--text-300);
            }
            
            </style>
            <article class="container">
                <h1>${this.data.id}</h1> 
             </article>      
            `
    }
    notfound(){
        this.shadowRoot.innerHTML = `
            <style>
            *,
            ::before,
            ::after{
                margin:0;
                padding: 0;
                box-sizing: border-box;
            }
            .container{
                background-color: gray;
                opacity:0.5;
                min-width:100%;
                min-height:94vh;
                color:var(--text-300);
            }
            
            </style>
            <article class="container">
                <h1>${this.data.message}</h1> 
             </article>      
            `
    }
}   

customElements.define('table-component', Table)