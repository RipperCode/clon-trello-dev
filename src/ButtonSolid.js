const template = document.createElement('template')

export default class ButtonSolid extends HTMLElement{
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
  		if(this.shadowRoot.children.length <2){
	  		template.innerHTML = `
	  			<style>
	  				button{
						border-radius: 5px;
						height: 80%;
						margin: auto 0;
						padding: 5px;
						text-align: center;
						background: linear-gradient(84deg, #57a0bf 0%, #357f9f 100%);
						color: var(--text-300);
						box-shadow: none;
						border: none;
						&:hover{
							outline:1px solid var(--text-300);
						}
						&:active{
							outline: 1px solid black;
						}
					}
	  			</style>
	  			<button><slot></slot></button>
	  		`
	  		const html = template.content.cloneNode(true)
			this.shadowRoot.append(html)
  		}
  		
  	}
}

customElements.define("button-solid", ButtonSolid);

	