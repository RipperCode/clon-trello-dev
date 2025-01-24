import Card from './Card.js'
const template = document.createElement('template')

export default class List extends HTMLElement{
	constructor(name){
		super()
		this.attachShadow({ mode: "open" });
		this.name = name
		
		
	}
	handleEvent(event){
		if(event.type === "click"){
			if(event.target.classList.contains('tittle')){
				const input = this.shadowRoot.querySelector('.inputTittle')
				const inputTittle = this.shadowRoot.querySelector('.tittle')
				
				input.classList.toggle('hidden')
				inputTittle.classList.toggle('hidden')
			}
			if(event.target.classList.contains('add-card')){
				const card = new Card()
				const addcard = this.shadowRoot.querySelector('.add-card')
				addcard.insertAdjacentElement("beforebegin", card)
			}
		}
		if(event.type === "keydown"){
			if(event.key === "Enter"){
				const p = this.shadowRoot.querySelector('.tittle')
				console.log(p)
				p.textContent = event.target.value
				const input = this.shadowRoot.querySelector('.inputTittle')
				p.classList.toggle('hidden')
				input.classList.toggle('hidden')
				event.target.value = ""
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
  		if(this.shadowRoot.children.length <2){
	  		template.innerHTML = `
	  		<style>
	  			*,::before,::after{
	  				margin:0;
	  				padding:0;
	  				box-sizing: border-box;
	  			}
	  			.container{
	  				color:var(--text-300);
	  				.tittle-list, .add-card {
	  					display:flex;
	  					align-items:center;
	  					justify-content: space-between;
	  					width:272px;
	  					height:40px;
	  					text-indent: 10px;
	  					background-color:var(--background-100);
	  					p{	
	  						display:flex;
	  						align-items:center;
	  						cursor:pointer;
	  						width:100%;
	  						flex-grow:1;
	  						height:100%;
	  					}
	  					p.hidden{
	  						display:none;
	  					}
	  					input{
	  						margin-left:10px;
	  					}
	  					input.hidden{
	  						display:none;
	  					}
	  					span{	
	  						cursor:pointer;
	  						margin-right:10px;
	  					}
	  					&:hover{
	  						background-color:var(--background-300);
	  					}
	  				&:first-child{
	  					border-radius: 10px 10px 0 0;
	  					
	  					}
	  				&:last-child{
	  					border-radius: 0 0 10px 10px;
	  					
	  					background-color:var(--background-100-hover);
	  					&:hover{
	  						background-color:#2d173a3d;
	  						cursor:pointer;
	  						}
	  					}
	  				
	  					
	  			}
	  			
	  			
	  		}
	  		</style>	
	  		<div class="container">
	  			<div class="tittle-list">
		  			<p class="tittle">${this.name}</p>
		  			<input type="text" placeholder="list name" class="inputTittle hidden">
		  			<span>...</span>
	  			</div>
	  			<p class="add-card">add card</p>
	  		</div>`
	  		const html =  template.content.cloneNode(true)
	  		this.shadowRoot.append(html)
	  		const p = this.shadowRoot.querySelector('.tittle-list p')
	  		const input = this.shadowRoot.querySelector('.tittle-list input')
	  		p.addEventListener('click',this)
	  		input.addEventListener('keydown',this)
	  		const addcard = this.shadowRoot.querySelector('.add-card')
	  		addcard.addEventListener('click',this)
	  		
  		}

  			
  	}
  	addList(){
  		
  	}
}

customElements.define("list-component", List);

	
	