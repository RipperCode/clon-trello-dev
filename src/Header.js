import ButtonSolid from './ButtonSolid.js'
const template = document.createElement('template')
template.innerHTML = `
	<style>
			*,
		::before,
		::after{
			margin: 0;
			padding: 0;
		}
		.icon{
			&::before,&::after{
				content: '';
			  	display: block;
			  	position: absolute;
			  	width: 100%;
			  	height: 100%;
			  	color: var(--text-300);
			  	background-image: url('/titleIcon.gif');
			  	background-size: contain;
			  	background-repeat: no-repeat;
			  	background-position: center;
			}

		&::after{
			background-image: url('/titleIconAnimated.gif');
			opacity: 0;
			
		}
		&:hover::before{
			opacity: 0;
		}
		&:hover::after{
			opacity: 1;
		}
		position: relative;
		width: 55px;
		padding-left: 5px;
		margin-left: 5px;
		}
		.container{
			display: flex;
			height:6vh;
			justify-content: space-between;
			background-color: var(--background-100);
			gap: 2px;
			
		nav ul{
			display: flex;
			gap: 20px;
			height: 100%;
			list-style: none;
			img{
				width: 20px;
			}
			li{
				flex-wrap: nowrap;
				display: flex;
				position: relative;
				justify-content: center;
				align-items: center;
				text-align: center;
				cursor: pointer;
				padding:5px;
				color: var(--text-300);
				&:hover{
					background-color: var(--background-300);

				}
				.dropdown{
					position: absolute;
					display: none;
					background-color: var(--background-100);
					width: 200px;
					height: fit-content;
					top: 6vh;
					left: 0;
					border-radius: 0 0 5px 5px ;

					z-index: 100;
					a{	
						box-sizing: border-box;
						display: block;
						list-style: none;
						width: 100%;
						height: 40px;
						color: var(--text-100);
						text-decoration: none;
						padding-left: 5px;
						overflow-x: none;
						text-align: left;
						border-radius: 0 5px 5px 0;
						&:hover{
							background-color: var(--primary-100-hover);
						}
					}
				}
				&:hover .dropdown{
					display: block;
					
					border: 1px solid rgba(31,16,40,0.25);
				}
			}
				
		}
		input{
			height: 70%;
			border-radius: 5px;
			margin: auto 0;
			border: 1px solid var(--text-300);
			background-color: var(--background-100);
			margin-right: 20px;
			color: var(--text-300);
			
			&:active{
				border: 1px solid gray;
			}

		}
		button-solid{
			margin: auto 0;
		}
				
	}
	</style>
	<div class="container">
		<div class="icon">
		</div>
		<nav>
			<ul>
				<li>
					Recientes
					<img src="/src/icons/small-down.svg" alt="dropdown Icon">
					<div class="dropdown">
						<a href="">reciente 1</a>
						<a href="">reciente 2</a>
					</div>
				</li>
				<li>
					Marcado
					<img src="/src/icons/small-down.svg" alt="dropdown Icon">
					<div class="dropdown">
						<a href="">marca 1</a>
						<a href="">marca 2</a>
					</div>
				</li>
			</ul>			
		</nav>
		<button-solid>crear</button-solid>
		<input type="text" placeholder="buscar">
	</div>
`

export default class Header extends HTMLElement{
	#html
	constructor(){
		super()
		this.attachShadow({ mode: "open" });
	}
	handleEvent(event){

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
  		this.#html = template.content.cloneNode(true);
    	this.shadowRoot.append(this.#html);
  	}
}

customElements.define("header-component", Header);

	