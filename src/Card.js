const template = document.createElement('template')
export default class Card extends HTMLElement{
	constructor(){
		super()
		this.attachShadow({ mode: "open" });
	}
	handleEvent(event){
		if(event.type==="keydown"){
			if(event.key === "Enter"){
				const p = this.shadowRoot.querySelector('p')
				const input = this.shadowRoot.querySelector('input')
				p.textContent = event.target.value
				p.classList.toggle('hidden')
				input.classList.toggle('hidden')

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
  					display:flex;
  					justify-content:space-between;
  					align-items:center;
  					width:272px;
  					height:40px;
  					background-color:var(--background-100);
  					span{
  						margin-right:10px;
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
  					<p class="hidden">tittle</p>
  					<input type="text" >
  					<span>...</span>
  				</div>
  			`
  			const html = template.content.cloneNode(true)
  			this.shadowRoot.append(html)
  			this.shadowRoot.querySelector('p').addEventListener('click',this)
  			const input = this.shadowRoot.querySelector('input')
  			input.addEventListener('keydown',this)
  			input.focus()
  		}
  	}
}

customElements.define("card-component", Card);

	