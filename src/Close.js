export default class Close extends HTMLElement{
	constructor(){
		super()
		this.attachShadow({ mode: "open" });
	}
	
  	// metodo que se ejecuta cuando se conecta el componente al DOM
  	connectedCallback() {
  		this.shadowRoot.innerHTML = `
  			<style>
  				:host{
  					display:block;
  				}
  				svg{
  					display:flex;
  					align-items:center;
  					fill:var(--text-300);
  					opacity:0.8;
  					margin: auto 0;
  					&:hover{
  						background-color: var(--text-300-hover);
  					}
  				}
  			</style>
  			<svg xmlns="http://www.w3.org/2000/svg" 
  				height="24px" 
	  			viewBox="0 -960 960 960" 
	  			width="24px" 
	  			fill="#FFFF55">
	  			<path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
  			</svg>
  		`
  	}
}

customElements.define("close-icon", Close);

	