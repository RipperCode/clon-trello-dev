const template = document.createElement('template')
template.innerHTML = `
	<style>
	*,::before,::after{
		margin:0;
		padding:0;
		box-sizing: border-box;
	}
		:host{
			display:none;
			position: absolute;
    		left: 100%;
    		top:0;
			width:100%;
			height: 100%;
    		background-color: var(--background-100-hover);
			backdrop-filter: blur(100px);
			
		}
		:host([isVisible]){
			display:block;

		}
	aside{
	
	width:100%;
		input{
			width:100%;
		}
	}
	</style>
	<aside>
		<label htmlFor="color">Color: </label>
		<input type="text" id="color">
		<label htmlFor="name">Nombre: </label>
		<input type="text" id="name">
		<button>Crear tablero</button>
		<button class="cancel">cancelar</button>
	</aside>`
export default class AsideNewTable extends HTMLElement{
	color
	name
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
  		this.html = template.content.cloneNode(true)
  		this.shadowRoot.append(this.html)
  		
  		const colorInput = this.shadowRoot.getElementById('color')
  		const nombreInput = this.shadowRoot.getElementById('name')
  		colorInput.addEventListener('change', (event)=>{
  			this.color = event.target.value

  		})
  		nombreInput.addEventListener('change', (event)=>{
  			this.name = event.target.value
  			
  		})
  		
  		
  		const sendButton = this.shadowRoot.querySelector('button')
  		const cancelButton = this.shadowRoot.querySelector('.cancel')
  		sendButton.addEventListener('click', (event)=>{
  			const sendInfo = new CustomEvent('send:tableInfo',{
	  			detail:{color: this.color, name: this.name},
	  			bubbles:true,
	  			composed:true
  			})
  			colorInput.value = ""
  			nombreInput.value = ""
  			sendButton.dispatchEvent(sendInfo)
  			this.removeAttribute('isVisible')
  		})
  		cancelButton.addEventListener('click',()=>{
  			this.removeAttribute('isVisible')
  			colorInput.value = ""
  			nombreInput.value = ""
  		})
  	}
}

customElements.define("aside-new-table", AsideNewTable);

	