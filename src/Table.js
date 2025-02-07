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
        if(event.type === 'click'){
           if(event.target.matches('.addList button')){
                
                const form = this.shadowRoot.querySelector('new-list-form')
                form.classList.add('isVisible')
                form.focus()
           }
        }
        if(event.type === 'add:list'){
            this.addList(event.detail.name, this.name).then(()=>{
                this.shadowRoot.querySelector('main')
                    .insertAdjacentElement('afterbegin', new List(event.detail.name))
            })
            
        }
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
        this.name = data.id
        this.render()
        console.log(this.data)
    } 

    render(){
        
        if(this.type === 'home'){
            this.home()
        }else if(this.type ==='table'){
            this.table()     
        }else if(this.type === 'NotFound'){
            this.notfound()
        }

           
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
            main{
                display:flex;
                gap:10px;
                padding:10px;
                .addList{
                    position:relative;
                    width:272px;
                    button{
                        text-align:center;
                        width:100%;
                        min-height:40px;
                        background-color:var(--background-100);
                        color:var(--text-300);
                        border-radius:5px;
                    }                        
                }
                
                
            }
            
            </style>
            <article class="container">
                <table-header name=${this.name}></table-header>
                <main>
                    ${this.data.lists.map(list => `
                        <list-component name="${list.name}"></list-component>`).join('')}
                   <div class="addList">
                    <button>add list</button>
                    <new-list-form table=${this.name}></new-list-form>
                   </div>
                   
                </main> 
             </article>      
            `
            this.shadowRoot.querySelector('.addList button')
                .addEventListener('click',this)
            this.shadowRoot.addEventListener('add:list', this)
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
    async addList(nameList, table){
    console.log('en addList:', nameList, table)
      try{
        const listID = crypto.randomUUID()
        await fetch(`http://localhost:3000/lists`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            id: listID,
            name: nameList,
            tableId: table
          })
        })
      }catch(error){
        console.log(error)
      }
  }
}   

customElements.define('table-component', Table)