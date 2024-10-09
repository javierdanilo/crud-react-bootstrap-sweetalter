import './App.css';
import {useState} from "react"
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

import Swal from 'sweetalert2'


function App() {

  const [nombre,setNombre] =useState("");
  const [edad,setEdad] =useState();
  const [pais,setPais] =useState("");
  const [cargo,setCargo] =useState("");
  const [anios,setAnios] =useState();
  const [id,setId] =useState();

  const [editar,setEditar] =useState(false);


  const [empleadosList,setEmpleados] = useState([]);
  const add = ()=>{
    Axios.post("http://localhost:3001/create",{
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios
    }).then(()=>{
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "registro exitoso",
        text: "el empleado"+ nombre+ "fue registrado con exito!",
        icon: "success",
        timer:3000
      });  
    }).catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message === "Network Error" ? "Error de red. Verifique su conexión." : error.message
      });
    });
  }
  const update = ()=>{
    Axios.put ("http://localhost:3001/update",{
      id:id,
      nombre:nombre,
      edad:edad,
      pais:pais,
      cargo:cargo,
      anios:anios
    }).then(()=>{
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "actualizacion  exitoso",
        text: "el empleado"+ nombre+ "fue actualizado con exito!",
        icon: "success",
        timer:3000
      });  
    }).catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message === "Network Error" ? "Error de red. Verifique su conexión." : error.message
      });
    });
  }
 
  const deleteEmple = (val) => {
    Swal.fire({
      title: "¿Confirmar eliminado?",
      text: "¿Realmente desea eliminar a " + val.nombre + "?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`).then(() => {
          getEmpleados();
          limpiarCampos();
          Swal.fire({
            title: "¡Eliminado!",
            text: val.nombre + " fue eliminado",
            showConfirmButton: false,
            icon: "success",
            timer: 2000
          });
        }).catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se logró eliminar el empleado',
            footer: error.message === "Network Error" ? "Error de red. Verifique su conexión." : error.message
          });
        });
      }
    });
  };
   
  const limpiarCampos = ()=>{
    setAnios();
    setNombre("");
    setCargo("");
    setEdad("");
    setPais("");
    setId("");
  }

  const editarEmpleado = (val) =>{
    setEditar(true);

    setNombre(val.nombre);
    setEdad(val.edad);
    setCargo(val.cargo);
    setPais(val.pais);
    setAnios(val.anios);
    setId(val.id);
    
  }
  const getEmpleados = ()=>{
    Axios.get("http://localhost:3001/empleados",).then((response)=>{
      setEmpleados(response.data);  
    })
  }

getEmpleados();

  
  return (
    <div className="container">
    <div className="App">
       </div>
       <div className="card text-center">
          <div className="card-header">
            GESTON DE EMPLEADOS
          
          
          
          
          </div>
          <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">nombre: </span>
            <input type="text"
            onChange={(event) =>{
              setNombre(event.target.value);
            }}    
            className="form-control" value={nombre} placeholder="ingrese un nombre" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>



          </div>
          <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">edad: </span>
            <input type="number" value={edad}
            onChange={(event) =>{
              setEdad(event.target.value);
            }}    
            className="form-control" placeholder="ingrese una edad" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
         
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">pais: </span>
            <input type="text" value={pais}
         onChange={(event) =>{
          setPais(event.target.value);
        }}
           className="form-control" placeholder="ingrese un pais" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">cargo: </span>
            <input type="text" value={cargo}
         onChange={(event) =>{
          setCargo(event.target.value);
        }}
           className="form-control" placeholder="ingrese un cargo" aria-label="Username" aria-describedby="basic-addon1"/>
          </div> 
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">años de experiencia: </span>
            <input type="number" value={anios}
         onChange={(event) =>{
          setAnios(event.target.value);
        }}
           className="form-control" placeholder="ingrese años" aria-label="Username" aria-describedby="basic-addon1"/>
          </div>
           </div>
          <div className="card-footer text-body-secondary">
            {
              editar? 
              <div>
              <button className='btn btn-warning m-2' onClick={update}> actualizar</button> 
              <button className='btn btn-info m-2 ' onClick={limpiarCampos}>cancelar</button>
              </div>
              :<button className='btn btn-succes' onClick={add}>Registrar</button>

            }
          <button className='btn btn-succes' onClick={add}>Registrar</button>

           </div>
        </div>
        <table className="table table-striped-columns">
        
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">nombre</th>
              <th scope="col">edad</th>
              <th scope="col">pais</th>
              <th scope="col">cargo</th>
              <th scope="col">experiencia</th>
              <th scope="col">acciones</th>
            </tr>
          </thead>
          <tbody>
          {
            empleadosList.map((val,key) => {
              return( 
              <tr key={val.id}>
              <th scope="row">{val.id}</th>
              <td>{val.nombre}</td>
              <td>{val.edad}</td>
              <td>{val.pais}</td>
              <td>{val.cargo}</td>
              <td>{val.anios}</td>
              <td>
              <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button" 
                  onClick={()=>{
                    editarEmpleado(val);
                  }}
                  className="btn btn-info">editar</button>
                  <button type="button" onClick={()=>{
                    deleteEmple(val);  
                  }} className="btn btn-danger">eliminar</button>
                  </div>
                </td>
              </tr>
              );

            } )
          }

          </tbody>

          
        
        </table>

       </div>
  );
}

export default App;
