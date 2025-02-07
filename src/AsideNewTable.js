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
			<hex-input color="#1e88e5"></hex-input>
		</div>
		<small>name is required</small>
		<div class='bottons'>
			<button-solid>crear</button-solid>
			<button-solid class="cancel">cancel</button-solid>
		</div>
	</aside>`
export default class AsideNewTable extends HTMLElement{
	
	constructor(){
		super()
		this.attachShadow({ mode: "open" });
		this.color = '#1e88e5'
		this.name = undefined
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
  		
  		
  		nombreInput.addEventListener('change', (event)=>{
  			this.name = event.target.value || undefined
  			this.name = this.name?.trim()
  			if(this.name != undefined && this.name.length != 0){
		  		sendButton.removeDisabled()
  			}
  			
  		})
  		nombreInput.addEventListener('input',(event)=>{
  			const value = event.target.value?.trim()
  			if(value && value.length != 0){
  				this.shadowRoot.querySelector('small').classList.add('hidden')
  			}else{
  				this.shadowRoot.querySelector('small').classList.remove('hidden')
  			}
  		})
  		if(this.name === undefined){		  	
		  	sendButton.disabled()
  		}
  		
  		
  		sendButton.addEventListener('click', (event)=>{
  			this.color = this.color || '#1e88e5'
  			console.log('en sendButton:', this.name, this.color)
  			const sendInfo = new CustomEvent('send:tableInfo',{
	  			detail:{color: this.color, name: this.name},
	  			bubbles:true,
	  			composed:true
  			})
  			
  			nombreInput.value = ""
  			this.color = ""
  			this.name = ""
  			sendButton.dispatchEvent(sendInfo)
  			this.removeAttribute('isVisible')
  			sendButton.disabled()
  		})
  		cancelButton.addEventListener('click',()=>{
  			this.removeAttribute('isVisible')
  			
  			nombreInput.value = ""
  			this.color = ""
  			this.name = ""
  		})
  		const picker = this.shadowRoot.querySelector('hex-alpha-color-picker');
		picker.addEventListener('color-changed', (event) => {
			this.shadowRoot.querySelector('.color')
				.style.background = event.detail.value
				this.color = event.detail.value
			
		  });
  		
  	}
}

customElements.define("aside-new-table", AsideNewTable);

	