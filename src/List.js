import Card from './Card.js'
import OptionsList from './OptionsList.js'
const template = document.createElement('template')


export default class List extends HTMLElement{
	constructor(name, tableName){
		super()
		this.attachShadow({ mode: "open" });
		this.name = name ?? this.getAttribute('name')
		this.tableId = tableName ?? this.getAttribute('table')
		
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
				const card = new Card(this.name , this.tableId, true )
				const addcard = this.shadowRoot.querySelector('.add-card')
				addcard.insertAdjacentElement("beforebegin", card)
				card.closeOption()
			}
			if(event.target.matches('.tittle-list img')){
				const top = event.target.offsetTop  + 40
				const left = event.target.offsetLeft
				
				const options = new OptionsList('list',this.name, top, left)
				
				this.shadowRoot.querySelector('.container').appendChild(options)
			}
		}
		if(event.type === "keydown"){
			if(event.key === "Enter"){
				const p = this.shadowRoot.querySelector('.tittle')
				p.textContent = event.target.value				
				const input = this.shadowRoot.querySelector('.inputTittle')
				p.classList.toggle('hidden')
				input.classList.toggle('hidden')
				event.target.value = ""
				this.editList(p.textContent)

			}		
		}
		if(event.type=== 'delete:card'){
			const name = event.detail.name
			
			this.deleteCard(name)
		}
		if(event.type === 'delete:list'){
			this.deleteList(event.detail.name)
			
		}
		if(event.type === 'edit:list'){
			const input = this.shadowRoot.querySelector('.inputTittle')
			const inputTittle = this.shadowRoot.querySelector('.tittle')
				
			input.classList.toggle('hidden')
			inputTittle.classList.toggle('hidden')
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
  		this.getCards().then(()=>this.render())
 		this.addEventListener('delete:card', this)
 		this.addEventListener('delete:list',this)		
  	}

  	render(){
  		const table = this.getAttribute('table')
  		
  		template.innerHTML = `
	  		<style>
	  			*,::before,::after{
	  				margin:0;
	  				padding:0;
	  				box-sizing: border-box;
	  			}
  				:host{
  					
  				}
	  			.container{
  					position:relative;
	  				color:var(--text-300);
	  				.tittle-list{
	  					display:flex;
	  					align-items:center;
	  					justify-content: space-between;
	  					width:272px;
	  					height:40px;
	  					text-indent: 10px;
	  					background-color:var(--background-100);
	  					font-weight: 500;
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
	  					img{	
	  						cursor:pointer;
	  						margin-right:10px;
  							border-radius:5px;
  							&:hover{
  								background-color:var(--text-300-hover);
  							}
	  					}
	  					&:hover{
	  						background-color:var(--background-300);
	  					}
	  				&:first-child{
	  					border-radius: 10px 10px 0 0;
	  						
	  					}

	  			}
	  			.add-card{
  						display:flex;
	  					align-items:center;
	  					justify-content: space-between;
	  					width:272px;
	  					height:40px;
	  					text-indent: 10px;
	  					background-color:var(--background-100-hover);
	  					font-weight: 500;
  						border-radius: 0 0 10px 10px;
  						&:hover{
  							cursor:pointer;
  							background-color:#2d173a47;
  						}
	  			}
	  			
	  		}
	  		</style>	
	  		<div class="container">
	  			<div class="tittle-list">
		  			<p class="tittle">${this.name}</p>
		  			<input type="text" placeholder="list name" class="inputTittle hidden">
		  			<img src="/clon-trello-app/icons/puntos-suspensivos.svg" alt="supensive points">
	  			</div>
	  			${this.data.map(card => `<card-component name="${card.name}" table="${table}"></card-component>`).join('')}
	  			<p class="add-card" tabindex="-1">add card</p>
	  			
	  		</div>`
	  	const html =  template.content.cloneNode(true)
	  	this.shadowRoot.append(html)
	  	const p = this.shadowRoot.querySelector('.tittle-list p')
	  	const input = this.shadowRoot.querySelector('.tittle-list input')
	  	p.addEventListener('click',this)
	  	input.addEventListener('keydown',this)
	  	const addcard = this.shadowRoot.querySelector('.add-card')
	  	addcard.addEventListener('click',this)
	  	this.shadowRoot.querySelector('.tittle-list img').addEventListener('click', this)
	  	this.addEventListener('edit:list',this)
  	}
  	async getCards(){
  		
  		//el fetch de abajo me trae las list segun el nombre
  		const res = await fetch(`http://localhost:3000/lists?name=${this.name}&_embed=cards`)
  		const data = await res.json()
  		
  		const [{cards}] = data
  		this.data = cards
  		

  	}
  	async deleteCard(name){
  		
  		const getCard = await fetch(`http://localhost:3000/cards?name=${name}`)
  		const getCardJSON = await getCard.json()
  		
  		const [{id}] = getCardJSON

  		await fetch(`http://localhost:3000/cards/${id}`,{
  			method:'DELETE'
  		})
  		const toDeleteCard = this.shadowRoot.querySelector(`card-component[name="${name}"]`)
		toDeleteCard.remove()

  	}

  	async deleteList(name){
  		
  		const getCard = await fetch(`http://localhost:3000/lists?name=${name}&_embed=cards`)
  		const [{cards, id}] = await getCard.json()
  		
  		const cardsToDelete = cards.map(card => fetch(`http://localhost:3000/cards/${card.id}`,{method:'DELETE'}))
  		await Promise.all(cardsToDelete)
 
  		await fetch(`http://localhost:3000/lists/${id}`,{
  			method:'DELETE'
  		})
  		this.remove()
  	}
  	async editList(name){
  		
  		const res = await fetch(`http://localhost:3000/lists?name=${this.name}`)
  		this.name = name
  		const [{id}] = await res.json()
  		fetch(`http://localhost:3000/lists/${id}`,{
  			method:'PATCH',
  			headers:{
  				"Content-Type":"application/json"
  			},
  			body: JSON.stringify({name})
  		})
  	}

}

customElements.define("list-component", List);

	
	