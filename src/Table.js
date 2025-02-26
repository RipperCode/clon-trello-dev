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
            
            const list = new List(event.detail.name, this.tableId)
            this.addList(event.detail.name, this.name).then(()=>{
                const main = this.shadowRoot.querySelector('.addList')
                main.insertAdjacentElement('beforebegin', list)                
              
            })
            
        }
        /*if(event.type === "update:table"){
            this.name = event.detail.name
            this.color = event.detail.color
            this.table()
        }*/
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
        this.name = data.name
        this.color = data.color
        this.tableId = data.id
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
                
                min-width:100%;
                min-height:100%;

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
                background-color: ${this.color};     
                color:var(--text-300);
                position:absolute;
                overflow:auto;
                min-height:100%;
                min-width: 100%;
            }
            main{
                display:flex;
                gap:10px;
                padding:10px;
                height:100%;
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
                <table-header name="${this.name}"></table-header>
                <main>
                    ${this.data.lists.map(list => `
                        <list-component name="${list.name}" table="${list.tableId}"></list-component>`).join('')
                    }
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
            /*document.addEventListener('update:table',this)*/
            
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
    async addList(name, table){
    
      try{
        const res = await fetch(`http://localhost:3000/tables?name=${table}`)
        const [{id}] = await res.json()
        await fetch(`http://localhost:3000/lists`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify(    
              {
                name,
                tableId:id
              }
          )
        })
      }catch(error){
        console.log(error)
      }
  }
}   

customElements.define('table-component', Table)