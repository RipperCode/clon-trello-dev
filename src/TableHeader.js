
const template = document.createElement('template')
export default class TableHeader extends HTMLElement{
	name
	color
	constructor(){
		super()
		this.attachShadow({ mode: "open" });
	}
	//propiedades observables
	static get observedAttributes() {
    return ['name'];
  	}
  	//callback que se ejecuta cuando cambia una propiedades
  	attributeChangedCallback(name,old,now){
  		
  	}
  	// metodo que se ejecuta cuando se conecta el componente al DOM
  	connectedCallback() {
  		this.name = this.getAttribute('name')
  		
  		console.log('color y name en table-header', this.name)
  		template.innerHTML = `
  			<style>
  			*,
			::before,
			::after{
				margin:0;
				padding: 0;
				box-sizing: border-box;
			}
			header{
	  			width:100%;
	  			height:8vh;
	  			background: #ffffff3b;
				color: var(--background-100);
				font-weight: 800;
				font-size: 1.2rem;
				backdrop-filter: blur(10px);
				border-bottom: 1px solid rgba(255,255,255,1);
	  			z-index:-1;
  				margin-bottom:20px;
			}
  			</style>
  			<header>
  				<div>${this.name}</div>
  			</header>
  		`
  		const html = template.content.cloneNode(true)
  		if(this.shadowRoot.children.length < 2){
  			this.shadowRoot.append(html)
  		}
  	}
}

customElements.define("table-header", TableHeader);

	