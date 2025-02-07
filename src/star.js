export default class Star extends HTMLElement{
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
  		this.shadowRoot.innerHTML = `
  			<style>
				.estrella {
  				  display:flex;
  				  align-items:center;
				  width: 15px;
				  height: 15px;
				  fill: var(--text-300); /* Color inicial de la estrella */
				  transition: fill 0.3s ease; /* Transición suave para el cambio de color */
				  cursor: pointer; /* Indica que es un elemento interactivo */
				}

				.estrella:hover{
				  fill: yellow; /* Color amarillo al pasar el cursor o hacer clic */
  				  width: 20px;
				  height: 20px;
				}
  				svg:hover{
  					background-color:var(--text-300-hover);
  				}
  			</style>	
  			<svg class="estrella" viewBox="0 0 24 24">
  				<path d="M12 2L15.09 8.26L22 9.27L17 14.43L18.18 21.02L12 17.77L5.82 21.02L7 14.43L2 9.27L8.91 8.26L12 2Z"/>
			</svg>
  		`
  	}
}

customElements.define("star-icon", Star);

	