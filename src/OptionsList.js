import OptionsTable from './OptionsTable.js'
export default class OptionsList extends OptionsTable{
	constructor(context,name, top, left){
		super()
		this.context = context
		this.name = name
		this.top = top
		this.left = left 
	}
	//propiedades observables
	static get observedAttributes() {
    return [];
  	}
  	//callback que se ejecuta cuando cambia una propiedades
  	attributeChangedCallback( name,old,now){

  	}
  	connectedCallback(){
  		
  		super.connectedCallback()

  	}
  	clickDeleteButton(){
  		
  		const deleteButton = this.shadowRoot.querySelector('.deleteButton')
  		deleteButton.addEventListener('click',()=>{
  			if(this.context === 'Card'){
  				const deleteCardEvent = new CustomEvent('delete:card',{
  					detail:{name: this.name},
  					composed:true,
  					bubbles:true
  				})
  				this.dispatchEvent(deleteCardEvent)
  				
  			}
  			if(this.context === 'list'){
  				const deleteListEvent = new CustomEvent('delete:list',{
  					detail:{name: this.name},
  					composed:true,
  					bubbles:true
  				})
  				this.dispatchEvent(deleteListEvent)
  			}

  		})
  	}
  	// metodo que se ejecuta cuando se conecta el componente al DOM
  	render(){
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
  						<p>Estas seguro de elimniar esta ${this.context}?</p>
  						<button class="deleteButton">Eliminar</button>
  					</div>
  					<p class="editar">Editar</p>
  				</main>
  			</div>
  		`
  	
  	}
}

customElements.define("options-list", OptionsList);

	