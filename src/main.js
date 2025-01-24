 console.log('main.js cargado')
 import Header from './Header.js'
 import asideComponent from './Aside.js'
 import Table from './Table.js'
 import AsideNewTable from './AsideNewTable.js'
 document.addEventListener('DOMContentLoaded', () => {
    const table = document.querySelector('.tables');
    const newTable = new Table('Perro', 'pink')
    fetch('/src/data.json')
        .then(res => res.json())
        .then(data => console.log(data))
    const routes = {
        '/': newTable
    };

    function navigateTo(path) {
    	
        const content = routes[path] || routes['/'];
        if(table.children.length === 0){
            table.append(content)
        }else {
            table.removeChild(table.children[0])
            table.append(content)
        }
        window.history.pushState({ path }, '', path);
    }

    window.addEventListener('popstate', event => {
    	console.log(event.state)
        navigateTo(event.state ? event.state.path : '/');
    });

    document.addEventListener('create:table', (event) => {
        
        let tableName = event.detail.name;
        let tableColor = event.detail.color;
        const newTable = new Table(tableName, tableColor)
        console.log(newTable)
        routes[`/${tableName}`] = newTable
        navigateTo(`/${tableName}`);
       /* let tableName = event.detail.name;
        routes[`/${tableName}`] =`<${tableName}-component name=${tableName}></${tableName}-component>`;
        navigateTo(`/${tableName}`);
        
        customElements.define(`${tableName}-component`, class extends Table{
            constructor(){
                super()
                this.color = event.detail.color
            }
        });*/
        
            
    });
    document.addEventListener('navigateTo:table', (event)=>{
        console.log('se activo el evento navigateTo')

        console.log(event.detail.name, event.detail.color)

        console.log(routes)
        navigateTo(`/${event.detail.name}`)

    })

 

    navigateTo(window.location.pathname);
});
