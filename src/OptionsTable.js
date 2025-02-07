export default class OptionsTable extends HTMLElement{
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
  		this.render()
  	}
  	render(){
  		this.shadowRoot.innerHTML = `
  			<style>
  				.container{
  					position:absolute;
  					width:40px;
  					height:20px;
  					background-color:gray;
  					top:40px;
  					left:50%;
  				}
  			</style>
  			<div class="container">
  				<main>
	  				<p>Nombre de la tabla</p>
	  				<div class="delete">
	  					<div class="advertencia"></div>
	  				</div>
  				</main>
  			</div>
  		`
  	}
}

customElements.define("options-table", OptionsTable);

	