import Close from './Close.js'
import ArrowLeft from './ArrowLeft.js'
export default class OptionsTable extends HTMLElement{
	constructor(name, top, left){
		super()
		this.attachShadow({ mode: "open" });
		this.name = name
		this.top = top
		this.left = left 

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
  		this.render()
  	
  		const container = this.shadowRoot.querySelector('.container')
  		container.focus()
  		let blurTimeout
  		container.addEventListener('blur', ()=>{
  			
  			if(! container.contains(document.activeElement)){
  				blurTimeout = setTimeout(()=>{
  					this.remove()
  				}, 250)
  			}
  			
  		})
  		container.addEventListener('mousedown', (event) => {
        // Si el clic ocurre dentro del contenedor, limpiamos el temporizador
	        if (container.contains(event.target)) {
	            clearTimeout(blurTimeout);
	        }
    	});
  		this.shadowRoot.querySelector('close-icon').addEventListener('click',()=>{
  			this.remove()
  		})
  		this.shadowRoot.querySelector('arrow-left').addEventListener('click',()=>{
  			const back = this.shadowRoot.querySelector('arrow-left')
  			back.style.display = 'none'
  			const small = this.shadowRoot.querySelector('header small')
  			small.textContent = `${this.name}`
  			const pDelete = this.shadowRoot.querySelector('.delete')
  			const pEditar = this.shadowRoot.querySelector('.editar')
  			const divDelete = this.shadowRoot.querySelector('.divDelete')
  			pDelete.classList.toggle('hidden')
  			pEditar.classList.toggle('hidden')
  			divDelete.classList.toggle('hidden')
  		})
  		this.shadowRoot.querySelector('.delete').addEventListener('click',()=>{
  			const pDelete = this.shadowRoot.querySelector('.delete')
  			const pEditar = this.shadowRoot.querySelector('.editar')
  			const divDelete = this.shadowRoot.querySelector('.divDelete')
  			const small = this.shadowRoot.querySelector('header small')
  			small.textContent = `Eliminar ${this.name}`
  			const back = this.shadowRoot.querySelector('arrow-left')
  			back.style.display = 'block'
  			pDelete.classList.toggle('hidden')
  			pEditar.classList.toggle('hidden')
  			divDelete.classList.toggle('hidden')

  		})
  		
  		this.clickDeleteButton()

  	}
  	clickDeleteButton(){
  		const deleteButton = this.shadowRoot.querySelector('.deleteButton')
  		const deleteTable = new CustomEvent('delete:table',
		  		{
		  			detail:{name: this.name},
		  			bubbles:true,
		  			composed:true
		  		})
  		deleteButton.addEventListener('click',()=>{
  			
  			deleteButton.dispatchEvent(deleteTable)

  		})
  	}
  	render(){
  		console.log('render options en table')
  		this.shadowRoot.innerHTML = `
  			<style>
	  			*,
				::before,
				::after{
					margin:0;
					padding: 0;
					box-sizing: border-box;
				}
  				:host{
  					display:block;
  				}
  				.container{
  					display: flex;
  					flex-direction: column;
  					width:fit-content;
  					min-width:150px;
  					color:var(--text-300);
  					position:absolute;
  					min-height:100px;
  					background-color:var(--background-100);
  					border:thin solid gray;
  					border-radius:10px;
  					text-indent:5px;
  					top: calc(${this.top}px - 10px);
  					left: ${this.left}px;
  					z-index:1000;
  					&:focus{
  						outline:none;  					}
  					
  				}
  				header{
  					text-wrap:nowrap;
  					
  					display:flex;
  					align-items:flex-start;
  					height:30px;
  					display:flex;
  					justify-content:space-between;
  					arrow-left{
  						display:none;
  					}
  					small{
  						font-weight:500;
  					}
  				}
  				main{
  					flex-grow:1;
  					display:flex;
  					flex-direction:column;
  					
  					.delete, .editar{
  						width:100%;
  						height:30px;
  						cursor: pointer;
  						&:hover{
  							background-color:var(--background-300);
  						}
  						~ div{
  							text-align:center;
  						}
  					}
  					p.hidden{
  						display:none;
  					}
  					div{
  						display:flex;
  						flex-direction:column;
  						justify-content:space-between;
  						flex-grow:1;
  						width:100%;
  						height: 100%;
  						
  						button{
	  						width:80%;
	  						background-color:#ee1818;
	  						margin: 0 auto;
  							margin-bottom:5px;
  						}
  					}
  					.divDelete.hidden{
  						display:none;
  					}
  					
  				}

  			</style>
  			<div class="container" tabindex="-1">
  				<header>
  					<arrow-left></arrow-left>
  					<small>${this.name}</small>
  					<close-icon></close-icon>
  				</header>
  				<main>		
	  				<p class="delete">Delete</p>
  					<div class="divDelete hidden">
  						<p>Estas seguro de elimniar esta tabla?</p>
  						<button class="deleteButton">Eliminar</button>
  					</div>
  					<p class="editar">Editar</p>
  				</main>
  			</div>
  		`
  	}
}

customElements.define("options-table", OptionsTable);

	