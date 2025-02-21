import OptionsList from './OptionsList.js'
import Close from './Close.js'
const template = document.createElement('template')
export default class Card extends HTMLElement{
	constructor(list, tableName, add){
		super()
		this.attachShadow({ mode: "open" });
		this.add = add
		this.list = list
		this.tableName = tableName
		this.name = this.getAttribute('name')
		
	}
	handleEvent(event){
		if(event.type === "keydown"){
			if(event.key === "Enter"){
				const p = this.shadowRoot.querySelector('p')
				const input = this.shadowRoot.querySelector('input')
				const close = this.shadowRoot.querySelector('close-icon')
				if (event.target.value.trim() === "") {
					alert('no se puede dejar el nombre vacio')
					return
				}
				if(this.editar){
					this.editarCard(event.target.value, p.textContent)
				}else{
					this.addCard(event.target.value,this.tableName)
				}	
				
				if(close) close.remove()
				
				p.textContent = event.target.value
				this.setAttribute('name', event.target.value)
				this.name = this.getAttribute('name')
				p.classList.toggle('hidden')
				input.classList.toggle('hidden')
					
			}

		}
		if(event.type === "click"){
			if(event.target.matches('img')){
				const top = event.target.offsetTop + 40
				const left = event.target.offsetLeft
				 
				const optionsCard = new OptionsList('Card', this.name, top, left)
				this.shadowRoot.querySelector('.container').appendChild(optionsCard)
			}
			if(event.target.matches('close-icon')){
				this.remove()
			}
		}
		if(event.type === "editar:card"){
				const p = this.shadowRoot.querySelector('p')
				const input = this.shadowRoot.querySelector('input')
				this.editar = true
				p.classList.toggle('hidden')
				input.classList.toggle('hidden')
				input.focus()

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
  			this.addEventListener('editar:card',this)
  			input.focus()
  		
  	}
  	closeOption(){
  		const closeIcon = document.createElement('close-icon')
  		closeIcon.addEventListener('click', this)
  		const input = this.shadowRoot.querySelector('input')
  		console.log(input)
  		input.insertAdjacentElement('afterend', closeIcon)
  	}
  	async addCard(name, tableName){
  		console.log('dentro del addCard', this.tableName)
  		try{
  			const res = await fetch(`http://localhost:3000/lists?name=${this.list}`)
  			const data = await res.json()
  			const [{id}] = data
  			console.log(id)
  			console.log(data)    		
	        await fetch(`http://localhost:3000/cards`,{
	        	method:'POST',
		        headers:{
		            'Content-Type':'application/json'
		        },
		        body: JSON.stringify({
		           name,
		           listId: id,
		           tableId: tableName    
		        })

	        })	       
      	}catch(error){
        	console.log(error)
      	}
  	}
  	async editarCard(name, oldName){
  		console.log(oldName, name)
  		const card = await fetch(`http://localhost:3000/cards?name=${oldName}`)
  		const [cardJSON] = await card.json()
  		fetch(`http://localhost:3000/cards/${cardJSON.id}`,{
  			method:'PATCH',
  			headers: {
    			'Content-Type': 'application/json'
  			},
  			body: JSON.stringify({ name: name})
  		})
  	}
}

customElements.define("card-component", Card);

	