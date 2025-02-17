
 console.log('main.js cargado')
 import asideComponent from './Aside.js'
 import Header from './Header.js'
 import Table from './Table.js'
 import AsideNewTable from './AsideNewTable.js'
 const $table = document.querySelector('table-component')
 document.addEventListener('DOMContentLoaded', () => {
   
   async function loadData(path){
      if(path === '/clon-trello-app/') {
        
        try {
            const response = await fetch(`http://localhost:3000/tables`);
            const data = await response.json();
            
            $table.setData(data, 'home'); // Pasar los datos al componente
        } catch (error) {
            console.error('Error loading data:', error);
        }
        
      }else{
        if(window.location.pathname.includes('/clon-trello-app/')){
          path = window.location.pathname.split('/')[2]
          
        }
        try {
            const response = await fetch(`http://localhost:3000/tables/${path}?_embed=lists`);
            const data = await response.json();

            $table.setData(data, 'table'); // Pasar los datos al componente
        } catch (error) {
            console.log('Error loading data:', error);
            $table.setData({message:'no se encontro esta tabla'}, 'NotFound')
        }
      }
      
   }

  

    window.addEventListener('popstate', () => {
        loadData(window.location.pathname);
    });
    document.addEventListener('home',  (event)=>{
      window.history.pushState({path:'/clon-trello-app/'}, '', '/clon-trello-app/' )
      loadData('/clon-trello-app/')
    })
    document.addEventListener("create:table",(event)=>{
      const data = {
        id: event.detail.name,
        color:event.detail.color || 'white',
        favorite: false
      }
      fetch('http://localhost:3000/tables',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
      }).then(()=>{
        window.history.pushState({path:`/clon-trello-app/${data.id}`}, '', `/clon-trello-app/${data.id}`)
        loadData(data.id, 'table')
      })

      
      
    })
    document.addEventListener("navigateTo:table",(event)=>{
      console.log('navegar a', event.detail.name)
      const currentTable = window.location.pathname.split('/')[2] ?? '/clon-trello-app/'
      if(currentTable != event.detail.name){
        window.history.pushState({path:`/clon-trello-app/${event.detail.name}`}, '', `/clon-trello-app/${event.detail.name}`)
        loadData(event.detail.name)
      }
      
    })
    
    document.addEventListener('delete:table',  event =>{
      console.log('tabla eliminada')
      deleteTable(event.detail.name)
      loadData('/clon-trello-app/')

    })
    loadData(window.location.pathname);
});

async function deleteTable(name){
  const deleteURLs = [
    fetch(`http://localhost:3000/tables/${name}`),
    fetch(`http://localhost:3000/lists?tableId=${name}`),
    fetch(`http://localhost:3000/cards?tableId=${name}`)

  ]
  
  const getData = await Promise.all(deleteURLs)
  const dataJSON = await Promise.all(getData.map(pro => pro.json()))
  console.log(dataJSON)

  for(let i=0; i<dataJSON.length;i++){
     if(i === 0){
        fetch(`http://localhost:3000/tables/${name}`,{
          method:'DELETE'
        })
     }else if(i === 1){
       for(const list of dataJSON[1]){
        fetch(`http://localhost:3000/lists/${list.id}`,{
            method:'DELETE'
          })
       }
     }else {
        for(const card of dataJSON[2]){
          fetch(`http://localhost:3000/cards/${card.id}`,{
            method:'DELETE'
          })
        }
     }
      
  }

}