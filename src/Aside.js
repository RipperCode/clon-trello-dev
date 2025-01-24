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
					display: block;
					
					.tableItems{
						display: flex;
						justify-content: center;
						align-items: center;
						height: 40px;
						background-color: var(--background-300);
						transition: background-color 0.2s ease-in-out;
						p{	
							overflow-wrap:break-word;
							width: 100%;
							height: 80%;
							margin: 5%;
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
						<img src="/src/icons/plus.svg" alt="boton de add">
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

  	}

  	addTable(name){
  		const temp = document.createElement('template')
  		const listTable = this.shadowRoot.querySelector('main')
  		const table = document.createElement('div')
  		const nameTable =document.createElement('p')
  		nameTable.textContent = name
  		table.classList.add('tableItems')
  		table.append(nameTable)
  		listTable.append(table)
  		table.addEventListener('click',(event)=>{
  			
  			const navigateTo = new CustomEvent('navigateTo:table',{
  				detail:{name: event.target.textContent},
  				bubbles:true,
  				composed:true
  			})
  			table.dispatchEvent(navigateTo)
  		})
  	}
  			
  
  	createTable(name, color){
  		this.createTableEvent.detail.name = name
  		this.createTableEvent.detail.color = color
  		
  		this.dispatchEvent(this.createTableEvent)
  	}
  	navigate(name){

  	}
}

customElements.define("aside-component", asideComponent);

	