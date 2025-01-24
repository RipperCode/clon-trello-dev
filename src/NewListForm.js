import ButtonSolid from './ButtonSolid.js'
const template = document.createElement('template')
template.innerHTML = `
	<style>
		.container{
			
			display:flex;
			flex-wrap:wrap;
			background-color:var(--background-100);
			width:272px;
			height:80px;
			gap:10px;
			align-items:center;
			padding:5px;
			border-radius: 10px;
		}
		input{
			border:1px solid gray;
			padding:1px;
			height:30px;
			border-radius:3px;
			background-color:var(--background-100);
			color: var(--text-300);
			&::placeholder{
				background-color:var(--background-100);
				color: var(--text-300);
			}
		}
		:host{
			display:none;
			position:absolute;
			top:0;
			left:0;
		}
		:host(.isVisible){
			display:block;
		}
	</style>
	<div class="container">
		<input type="text" placeholder="add name list">
		<button-solid class=addList>crear list</button-solid>
		<button-solid class=cancel>cancelar</button-solid>
	</div>
`
export default class NewListForm extends HTMLElement{
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
  		console.log('renderizado newListForm')
  		const html = template.content.cloneNode(true)
  		if(this.shadowRoot.children.length <2){
  			this.shadowRoot.append(html)
 			const cancel = this.shadowRoot.querySelector('.cancel')
	 		cancel.addEventListener('click', (event)=>{
	 			if(event.target.classList.contains('cancel'))
	 			this.classList.remove('isVisible')
	 		})
	 		const input = this.shadowRoot.querySelector('input')
	 		input.addEventListener('change', (event)=>{
	 			this.name = event.target.value
	 		})
	 		const addList = this.shadowRoot.querySelector('.addList')
	 		
	 		addList.addEventListener('click', (event)=>{
	 			
	 			if(event.target.classList.contains('addList')){
	 				const add = new CustomEvent('add:list',{
			  			detail:{name: this.name},
				  		bubbles:true,
				  		composed:true
			  		})
			  		addList.dispatchEvent(add)
			  		this.classList.remove('isVisible')
	 			}
	 		})
  		}
  		
  	}
  	addListComponent(){
  		
  	}
}

customElements.define("new-list-form", NewListForm);

	