import OptionsList from './OptionsList.js'
const template = document.createElement('template')
export default class Card extends HTMLElement{
	constructor(list, tableName, add){
		super()
		this.attachShadow({ mode: "open" });
		this.add = add
		this.list = list
		this.tableName = tableName
		this.name = this.getAttribute('name')
		console.log('en card',this.tableName)
	}
	handleEvent(event){
		if(event.type === "keydown"){
			if(event.key === "Enter"){
				const p = this.shadowRoot.querySelector('p')
				const input = this.shadowRoot.querySelector('input')
				p.textContent = event.target.value
				this.setAttribute('name', event.target.value)
				this.name = this.getAttribute('name')
				p.classList.toggle('hidden')
				input.classList.toggle('hidden')
				
				this.addCard(event.target.value,this.tableName)
			}

		}
		if(event.type === "click"){
			if(event.target.matches('img')){
				const top = event.target.offsetTop + 40
				const left = event.target.offsetLeft
				 
				const optionsCard = new OptionsList('Card', this.name, top, left)
				this.shadowRoot.querySelector('.container').appendChild(optionsCard)
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
  			console.log('this.name al crear una card', this.name)
  			template.innerHTML = `
  				<style>
  				*,::before,::after{
	  				margin:0;
	  				padding:0;
	  				box-sizing: border-box;
	  			}
  				.container{
  					position:relative;
  					display:flex;
  					justify-content:space-between;
  					align-items:center;
  					width:272px;
  					height:40px;
  					background-color:var(--background-100);
  					img{
  						cursor:pointer;
	  					margin-right:10px;
  						border-radius:5px;
  						opacity:0.6;
  						&:hover{
  							background-color:var(--text-300-hover);
  							opacity:1;
  						}
  					}
  					input{
  						margin-left:10px;
  					}
  					p{
  						display:flex;
  						align-items:center;
  						flex-grow:1;
  						height:100%;
  						text-indent: 10px;
  						
  					}
  					p.hidden, input.hidden{
  						display:none;
  					}
	  				&:hover{
	  					background-color:var(--background-300);
	  				}
  				}
  				
  				</style>
  				<div class="container">
  					<p class=${this.add ? "hidden": ""}>${this.name}</p>
  					<input type="text" class=${this.add? "": "hidden"}>
  					<img src="/clon-trello-app/icons/puntos-suspensivos.svg" alt="supensive points">
  				</div>
  			`
  			const html = template.content.cloneNode(true)
  			this.shadowRoot.append(html)
  			this.shadowRoot.querySelector('p').addEventListener('click',this)
  			const input = this.shadowRoot.querySelector('input')
  			input.addEventListener('keydown',this)
  			this.shadowRoot.querySelector('img').addEventListener('click', this)
  			input.focus()
  		
  	}
  	async addCard(name, tableName){
  		console.log('dentro del addCard', this.tableName)
  		try{    		
	        await fetch(`http://localhost:3000/cards`,{
	        	method:'POST',
		        headers:{
		            'Content-Type':'application/json'
		        },
		        body: JSON.stringify({
		           name,
		           listId: this.list,
		           tableId: tableName    
		        })

	        })	       
      	}catch(error){
        	console.log(error)
      	}
  	}
}

customElements.define("card-component", Card);

	