import { nanoid } from "nanoid";
import React,{useState} from "react";


function App() {
  const [tarea, setTarea] = useState('')
  const [tareas, setTareas] = useState([])
  const [modoEdicion, setModoEdicion] = useState(false)
  const [id, setId] = useState('')
  const [error, setError] = useState(null)
  
  


  const agregarTarea= (e)=>{
    e.preventDefault()
    
    if(!tarea.trim()){
      console.log('no hay nada en tarea')
      setError('Escriba Algo por favor')
      return
    }
    setTareas([
      ...tareas,
      {id:nanoid(10), nombreTarea:tarea}
    ])
    console.log(tarea)
    setTarea('')
    
  }

  const eliminarTarea= (id)=>{
    console.log('tarea eliminada', id)
    // si item.id es distinto al id que le estamos pasadndo lo agragamos anuestro array filtrado
    const filtroDeTareas= tareas.filter(item => item.id !==  id)
    setTareas(filtroDeTareas)
  }

  const editar = (tarea)=>{
    console.log(tarea)
    setModoEdicion(true)
    setTarea(tarea.nombreTarea)
    setId(tarea.id)

  }

  const editarTarea = (e)=>{
    e.preventDefault()
    if(!tarea.trim()){
      console.log('no hay nada en tarea')
      setError('Escriba Algo por favor')
      return
    }
    const arrayEditado = tareas.map(item=> 
      item.id === id ? {id, nombreTarea:tarea}: item
      
      )
    setTareas(arrayEditado)
    setModoEdicion(false)
    setTarea('')
    setId('')
    setError(null)

  }

  return (
    <div className="container mt-5">
     <h1 className="text-center">Crud</h1>
     <hr />
     <div className="row">
       <div className="col-8">
         <h4 className="text-center">Lista de tareas</h4>
         <ul className="list-group">
           {
             tareas.length === 0?(
               <li className="list-group-item">No hay tareas</li>

             ):(

              tareas.map(tarea => (
                <li className="list-group-item" key={tarea.id}>
                  <span className="lead" >{tarea.nombreTarea}</span>
                  <button 
                    className="btn btn-danger btn-sm float-rigth mx-2"
                    onClick={()=>eliminarTarea(tarea.id)}>Eliminar</button>
                  <button 
                    className="btn btn-warning btn-sm float-rigth"
                    onClick={()=>editar(tarea)}
                  >Editar</button>
                </li>
  
               ))

             )
             
           }

          
         </ul>
       </div>
       <div className="col-4">
        <h4 className="text-center">
          {
            modoEdicion?'editar Tarea' : 'agreagar Tarea'
          }
        </h4>
        <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
          {
            error ? (<span className="text-danger">{error}</span>):(
              null
            )
          }
          
          <input type="text" 
          className="form-control mb-2"
          placeholder="IngreseTarea"
          onChange={e=>setTarea(e.target.value)}
          value={tarea}
          />
          {
            modoEdicion ? (
              <button className="btn btn-warning btn-block" type="submit">Editar</button>
            ) : (
              <button className="btn btn-dark btn-block" type="submit">Agregar</button>
            )
          }
          
        </form>
       </div>
     </div>
    </div>
  );
}

export default App;
