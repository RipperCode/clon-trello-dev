
console.log('main.js cargado')
 import asideComponent from './Aside.js'
 import Header from './Header.js'
 import Table from './Table.js'
 import AsideNewTable from './AsideNewTable.js'
 const $table = document.querySelector('table-component')
 document.addEventListener('DOMContentLoaded', () => {
   
   async function loadData(state){
      console.log(state)
      if(state === null) {
        
        try {
            const response = await fetch(`http://localhost:3000/tables`);
            const data = await response.json();
            
            $table.setData(data, 'home'); // Pasar los datos al componente

        } catch (error) {
            console.error('Error loading data:', error);
        }
        
      }else{
        /*if(window.location.pathname.includes('/clon-trello-app/')){
          path = window.location.pathname.split('/')[2]
          
        }*/
        try {
            const response = await fetch(`http://localhost:3000/tables?${state.table}&_embed=lists`);
            const [data] = await response.json();
            console.log(data)
            $table.setData(data, 'table'); // Pasar los datos al componente
        } catch (error) {
            
            $table.setData({message:'no se encontro esta tabla'}, 'NotFound')

        }
      }
      
   }

  

    window.addEventListener('popstate', () => {
        loadData(window.history.state);
    });
    document.addEventListener('home',  (event)=>{
      window.history.pushState({path:'/clon-trello-app/'}, '', '/clon-trello-app/' )
      loadData(null)
    })
    document.addEventListener("create:table",(event)=>{
      const data = {
        name: event.detail.name,
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
        let url
        if(data.name.trim().includes(' ')) {
          url = data.name.split(' ').join('-')
        }else url = data.name

        
        window.history.pushState({path:`/clon-trello-app/${url}`,table:data.name}, '', `/clon-trello-app/${url}`)
        loadData(window.history.state)
      })

      
      
    })
    document.addEventListener("navigateTo:table",(event)=>{
      
      const currentTable = window.history.state?.table 
      if(currentTable != event.detail.name || event.detail.color){
        
        let url
        if(event.detail.name.trim().includes(' ')) {
          url = event.detail.name.split(' ').join('-')
        }else url = event.detail.name
        
        window.history.pushState({
          path:`/clon-trello-app/${url}`,
          table:event.detail.name},
           '',
          `/clon-trello-app/${url}`)
        console.log(window.history.state)
        
      }
      loadData(window.history.state)
    })
    
    document.addEventListener('delete:table',  event =>{
      console.log(event.detail.name)
      deleteTable(event.detail.name)
      loadData(null)
      
    })
    loadData(window.history.state);
});
// hasta aqui termina DOMContentLoaded


async function deleteTable(name){
  
  const res = await fetch(`http://localhost:3000/tables?name=${name}`)
  const table = await res.json()
  const [{id}] = table
  
  const deleteURLs = [
    fetch(`http://localhost:3000/lists?tableId=${id}`),
    fetch(`http://localhost:3000/cards?tableId=${id}`)
  ]
  
  const getData = await Promise.all(deleteURLs)
  const dataJSON = await Promise.all(getData.map(pro => pro.json()))
  console.log(dataJSON)

  for(let i=0; i<dataJSON.length;i++){
   if(i === 0){
       for(const list of dataJSON[0]){
        fetch(`http://localhost:3000/lists/${list.id}`,{
            method:'DELETE'
          })
       }
     }else {
        for(const card of dataJSON[1]){
          fetch(`http://localhost:3000/cards/${card.id}`,{
            method:'DELETE'
          })
        }
     }
      
  }
  await fetch(`http://localhost:3000/tables/${id}`,{method:'DELETE'})

}