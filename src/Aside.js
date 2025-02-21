import Star from './Star.js'
import OptionsTable from './OptionsTable.js'
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
				height: 100%;
				.add{
					display: flex;
					justify-content: space-between;
					align-items: center;
					flex-wrap: nowrap;
					text-indent: 10px;
					border-bottom: 1px solid var(--text-300-hover);
					border-top: 1px solid var(--text-300-hover);
					width: 100%;
					height:40px;

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
					min-height:calc(100% - 40px);
					max-height: 90%;
					overflow-y:auto;
					
					.tableItems{
						display: flex;
						position:relative;
						gap:5px;
						justify-content: center;
						align-items: center;
						height: 40px;
						background-color: var(--background-300);
						transition: background-color 0.2s ease-in-out;
						p{	
							display:flex;
							align-items:center;
							overflow-x:hidden;
							
							white-space: nowrap;
							text-overflow:fade;	
							width: 100%;
							height: 100%;
							text-indent: 10px;
							cursor:pointer;
						}
						img{
							width:15px;
							height:15px;
							opacity:0.7;
							
							
							&:hover{
								background-color:var(--text-300-hover);
								width:20px;
								height:20px;
							}
						}
						star-icon{
							margin-right:10px;

						}
						
						&:hover{

							background-color: var(--text-300-hover);
						}
						.hidden{
						display: none;
						}
						
					}
					options-table{
						position:absolute;
						top:20%;
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
				
				const navigateTo = new CustomEvent('navigateTo:table',{
  				detail:{name: event.target.textContent},
  				bubbles:true,
  				composed:true
  				})
  				event.target.dispatchEvent(navigateTo)
			}
			if(event.target.matches('.tableItems img')){
				
				const name = event.target.parentNode.textContent
				const top = event.target.getBoundingClientRect().top
				const left = event.target.getBoundingClientRect().left
				console.log(top)
				const optionsTable = new OptionsTable(name, top, left)

				this.appendChild(optionsTable)
				
			}

		}
	}
	//propiedades observables
	static get observedAttributes(){
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
  		this.addEventListener('delete:table',(event)=>{
  			const toDeleted = this.shadowRoot.querySelector(`div[table="${event.detail.name}"]`)
  			toDeleted.remove()

  		})
  		this.shadowRoot.querySelector('main').addEventListener("click",this)
  		this.fetchData()
  	}
  	async fetchData(){
  		const res = await fetch('http://localhost:3000/tables')
  		const data = await res.json()
  		this.data = data  		
  		const listTable = this.shadowRoot.querySelector('main');
    	const fragment = document.createDocumentFragment();

    	//agregar tableItems 
    	this.data.forEach(table => {
	        const tableItem = document.createElement('div');
	        tableItem.classList.add('tableItems');
	        tableItem.setAttribute('table', table.id)
	        const tableName = document.createElement('p');
	        const points = document.createElement('img')
	        points.src = '/clon-trello-app/icons/puntos-suspensivos.svg'
	        points.alt = 'suspensive points'
	        const star = document.createElement('star-icon')
	        

	        tableName.textContent = table.id; // Asume que cada tabla tiene un campo 'name'
	        tableItem.appendChild(tableName);
	        tableItem.appendChild(points)
	        tableItem.appendChild(star)
	        fragment.appendChild(tableItem);
  		})
  		listTable.appendChild(fragment)
  	}
  	addTable(name){
  			const listTable = this.shadowRoot.querySelector('main')
  			const tableItem = document.createElement('div');
	        tableItem.classList.add('tableItems');
	        tableItem.setAttribute('table', name)
	        const tableName = document.createElement('p');
	        const points = document.createElement('img')
	        points.src = '/clon-trello-app/icons/puntos-suspensivos.svg'
	        points.alt = 'suspensive points'
	        const star = document.createElement('star-icon')
	        tableName.textContent = name; // Asume que cada tabla tiene un campo 'name'
	        tableItem.appendChild(tableName);
	        tableItem.appendChild(points)
	        tableItem.appendChild(star)
	        listTable.appendChild(tableItem)
	        
  	}
  			
  
  	createTable(name, color){
  		this.createTableEvent.detail.name = name
  		this.createTableEvent.detail.color = color
  		
  		this.dispatchEvent(this.createTableEvent)
  	}
  	async eliminarTable(name){
  		
  	}
  	
}

customElements.define("aside-component", asideComponent);

	