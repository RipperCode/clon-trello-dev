const template = document.createElement('template')
template.innerHTML = `
			<style>
  			*,
			::before,
			::after{
				margin:0;
				padding: 0;
				box-sizing: border-box;
			}

			aside{
				position: relative;
				background-color: var(--background-100);
				color: var(--text-300);
				height:94vh;
				.add{
					display: flex;
					justify-content: space-between;
					align-items: center;
					flex-wrap: nowrap;
					text-indent: 10px;
					border-bottom: 1px solid var(--text-300-hover);
					border-top: 1px solid var(--text-300-hover);
					width: 100%;
					height: 7%;

					div{
						
						position: relative;
						width: 20px;
						height: 20px;
						margin-right:10px ;
						border-radius: 3px;
						&:hover{
							background-color: var(--text-300-hover);
						}
						img{
							position: absolute;
							width: 70%;
							height: 70%;
							margin: 15%;
							top: 0;
							left: 0;
						}
					}

				}

				main{
					position:absolute;
					
					left:0;
					width:100%;
					min-height:93%;
					max-height: 93%;
					overflow-y:auto;
					.tableItems{
						display: flex;
						justify-content: center;
						align-items: center;
						height: 40px;
						background-color: var(--background-300);
						transition: background-color 0.2s ease-in-out;
						p{	
							display:flex;
							align-items:center;
							overflow-wrap:break-word;
							width: 100%;
							height: 100%;
							text-indent: 10px;
							cursor:pointer;
						}
						&:hover{
							background-color: var(--text-300-hover);
						}
						.hidden{
						display: none;
						}
						
					}
				}
			}
  			</style>
  			<aside>
  				<div class="add">
					 mis tableros
					<div class="addButon">
						<img src="/clon-trello-app/icons/plus.svg" alt="boton de add">
					</div>					
  				</div>
  				<main>

  				</main>
				<slot>default content</slot>
  			</aside>
			`
export default class asideComponent extends HTMLElement{
	#html
	
	createTableEvent = new CustomEvent('create:table',
  		{
  			detail:{},
  			bubbles:true,
  			composed:true
  		})
	constructor(){
		super()
		this.attachShadow({ mode: "open" });
	}
	handleEvent(event){
		if(event.type === "click"){
			if(event.target.matches('.tableItems p')){
				console.log('dentro del handleEvent')
				const navigateTo = new CustomEvent('navigateTo:table',{
  				detail:{name: event.target.textContent},
  				bubbles:true,
  				composed:true
  				})
  				event.target.dispatchEvent(navigateTo)
			}
		}
	}
	//propiedades observables
	static get observedAttributes() {
    return [];
  	}
  	//callback que se ejecuta cuando cambia una propiedades
  	attributeChangedCallback(name,old,now){

  	}
  	// metodo que se ejecuta cuando se conecta el componente al DOM
  	connectedCallback() {

  		this.#html = template.content.cloneNode(true)
  		this.shadowRoot.append(this.#html)
  		const addbutton = this.shadowRoot.querySelector('.addButon')

  		addbutton.addEventListener('click', ()=>{
  			const sidenewtable = this.children[0]
  			sidenewtable.setAttribute('isVisible', '')
  			
  		})
  		this.addEventListener('send:tableInfo',(event)=>{
  			const name = event.detail.name
  			this.addTable(name)

  			this.createTable(event.detail.name, event.detail.color)
	  		
  		})
  		this.shadowRoot.querySelector('main').addEventListener("click",this)
  		this.fetchData()
  	}
  	async fetchData(){
  		const res = await fetch('http://localhost:3000/tables')
  		const data = await res.json()
  		this.data = data  		
  		const listTable = this.shadowRoot.querySelector('main');

   		//listTable.innerHTML = '';

    	const fragment = document.createDocumentFragment();

    	// Itera sobre los datos y crea los elementos correspondientes
    	this.data.forEach(table => {
	        const tableItem = document.createElement('div');
	        tableItem.classList.add('tableItems');
	        const tableName = document.createElement('p');
	        tableName.textContent = table.id; // Asume que cada tabla tiene un campo 'name'
	        tableItem.appendChild(tableName);
	        fragment.appendChild(tableItem);
  		})
  		listTable.appendChild(fragment)
  	}
  	addTable(name){
  		
  		const listTable = this.shadowRoot.querySelector('main')
  		const table = document.createElement('div')
  		const nameTable =document.createElement('p')
  		nameTable.textContent = name
  		table.classList.add('tableItems')
  		table.append(nameTable)
  		listTable.append(table)
  		
  	}
  			
  
  	createTable(name, color){
  		this.createTableEvent.detail.name = name
  		this.createTableEvent.detail.color = color
  		
  		this.dispatchEvent(this.createTableEvent)
  	}
  	
}

customElements.define("aside-component", asideComponent);

	