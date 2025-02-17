export default class ArrowLeft extends HTMLElement{
	constructor(){
		super()
		this.attachShadow({ mode: "open" });
	}
  	// metodo que se ejecuta cuando se conecta el componente al DOM
  	connectedCallback() {
  		this.shadowRoot.innerHTML = `
  			<style>
  				svg{
  					fill:var(--text-300);
  					opacity:0.8;
  					&:hover{
  						background-color:var(--text-300-hover);
  					}
  				}
  			</style>	
  			<svg xmlns="http://www.w3.org/2000/svg" 
  				height="24px" viewBox="0 -960 960 960" 
  				width="24px" 
  				fill="#FFFF55">
  				<path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
  			</svg>
  		`
  	}
}

customElements.define("arrow-left", ArrowLeft);

	