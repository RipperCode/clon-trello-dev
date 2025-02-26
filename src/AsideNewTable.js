import ButtonSolid from './ButtonSolid.js'
import 'vanilla-colorful/hex-alpha-color-picker.js'
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
		display:flex;
		flex-direction: column;
		align-items:center;

		input{
			width: 80%;
			border-radius:5px;
			margin: 0 auto;
			opacity:0.6;
			border:none;
			&:focus{
				opacity:1;
			}
		}
		label{
			text-align:center;
			font-weight: 500;
		}
		.bottons{
			
			display:flex;
			width:80%;
			justify-content:space-around;
			align-content: stretch; 
			text-align:center;
			margin-top:5px;
			button-solid{
				height:100%;
			}
		}
		small{
			color:white;
			font-weight: 500

		}
		small.hidden{
			display: none;
		}
		.colorPicker{
			display:flex;
			flex-direction:column;
			justify-content:space-evenly;
			align-items: center;
			gap:5px;
			width:100%;
			hex-alpha-color-picker{
				width:80%;
				height:150px;
			}
			
			hex-alpha-color-picker::part(saturation-pointer),
			hex-alpha-color-picker::part(hue-pointer),
			hex-alpha-color-picker::part(alpha-pointer){
				width:15px;
				height:15px;
			}
		
			.color{
				width:50px;
				height:25px;
				background-color:#1e88e5;
			}
		}
		
	}
	</style>
	<aside>
		<label htmlFor="name">Nombre: </label>
		<input type="text" id="name">
		<label htmlFor="color">Color: </label>
		<div class="colorPicker">
			<hex-alpha-color-picker color="#1e88e5"></hex-alpha-color-picker>	
			<div class="color"></div>
			
		</div>
		<small>name is required</small>
		<div class='bottons'>
			<button-solid class="send">crear</button-solid>
			<button-solid class="cancel">cancel</button-solid>
		</div>
	</aside>`
export default class AsideNewTable extends HTMLElement{
	
	constructor(){
		super()
		this.attachShadow({ mode: "open" });
		this.name = undefined
		this.color = '#1e88e5'
	}
	handleEvent(event){
		const nombreInput = this.shadowRoot.getElementById('name')
  		const sendButton = this.shadowRoot.querySelector('button-solid')
  		const cancelButton = this.shadowRoot.querySelector('.cancel')

		if(event.type === 'click'){

			if(event.target.matches('.send')){
				console.log(this.edit, 'name: ',this.name,'oldName: ',this.oldName, 'color: ', this.color)
				if(this.edit){
					const updateTable = new CustomEvent('update:table',{
						detail:{ name: this.name, color: this.color, oldName: this.oldName},
						bubbles:true,
						composed:true
					})
					this.dispatchEvent(updateTable)
					sendButton.textContent = 'crear'
					this.removeAttribute('isVisible')
					nombreInput.value = ''
					sendButton.disabled()
					this.edit = false
					this.oldName = null
					return
				}
				const sendTableInfo = new CustomEvent('send:tableInfo',{
					detail:{ name: this.name, color: this.color},
					bubbles:true,
					composed:true
				})
				this.dispatchEvent(sendTableInfo)
				this.removeAttribute('isVisible')
				nombreInput.value = ''
				sendButton.disabled()
				return
			}
			if(event.target.matches('.cancel')){
				if(this.edit){
					this.removeAttribute('isVisible')
					this.name = undefined
					this.color = '#1e88e5'
					nombreInput.value = ''
					sendButton.disabled()
					this.edit = false
					return
				}
				this.removeAttribute('isVisible')
				this.name = undefined
				this.color = '#1e88e5'
				nombreInput.value = ''
				sendButton.disabled()
				return
			}
		}
		if(event.type === 'input'){
			
			if(event.target.value.trim() === ''){
				sendButton.disabled()
				this.shadowRoot.querySelector('small').classList.remove('hidden')
				this.name = event.target.value	
				return
			}
			this.name = event.target.value.trim()

			sendButton.removeDisabled()
			this.shadowRoot.querySelector('small').classList.add('hidden')
			
		}
		if (event.type === 'change') {
			console.log('name en change ', this.name)
			if(event.target.value.trim() === ''){
				alert('no se puede enviar un valor vacio')
				return	
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

  		this.html = template.content.cloneNode(true)
  		this.shadowRoot.append(this.html)

  		const nombreInput = this.shadowRoot.getElementById('name')
  		const sendButton = this.shadowRoot.querySelector('button-solid')
  		const cancelButton = this.shadowRoot.querySelector('.cancel')
  		const picker = this.shadowRoot.querySelector('hex-alpha-color-picker')
  		const displayColor = this.shadowRoot.querySelector('.color')
  		sendButton.disabled()
  		
  		nombreInput.addEventListener('input',this)
  		nombreInput.addEventListener('change',this)
  		sendButton.addEventListener('click',this)
  		cancelButton.addEventListener('click',this)

  		picker.addEventListener('color-changed', (event) => {
		    
		    if(this.name?.trim() === '') return
		    this.color = event.detail.value;
		    sendButton.removeDisabled()
		    displayColor.style.backgroundColor = event.detail.value;
		 });
  	}
  	// name: nombre de la tabla que se editara
  	editTable(name){
  		const nombreInput = this.shadowRoot.getElementById('name')
  		const sendButton = this.shadowRoot.querySelector('button-solid')
  		this.setAttribute('isVisible','')
  		this.edit = true
  		this.oldName = name
  		this.name = name
  		nombreInput.value = name
  		nombreInput.focus()
  		sendButton.textContent = 'edit'
  	}
  	createTable(){
  		const nombreInput = this.shadowRoot.getElementById('name')
  		const sendButton = this.shadowRoot.querySelector('button-solid')
  		this.edit = false
  		nombreInput.value = ""
  		sendButton.textContent = 'crear'
  	}

}

customElements.define("aside-new-table", AsideNewTable);

	