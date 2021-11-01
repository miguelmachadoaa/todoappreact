import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Button } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faHome, faCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";



import axios from 'axios';


import reportWebVitals from './reportWebVitals';



function Welcome(porps){
  return <h1>Hola, {  porps.name}</h1>
}

function Buttom2(props){
  return <button class="{props.class}" > { props.text }</button>
}

function Menu (props){
  return   (<Nav className="justify-content-center" activeKey="/home">
    <Nav.Item>
      <Nav.Link href="/home"><FontAwesomeIcon icon={faHome} /></Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="link-1">Link</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="link-2">Link</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="disabled" disabled>
        Disabled
      </Nav.Link>
    </Nav.Item>
  </Nav>)
}

 

class Todo extends React.Component {

  constructor(props){
    super(props);

      this.state={
          tareas:[{'id':'1', 'name':'primera', 'completed':false}],
          mostrarForm:false,
          mostrarFormEdit:false,
          tarea:'',
          id_tarea:'',
          buscar:'',
      }

    this.handleChangeBuscar = this.handleChangeBuscar.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    this.handleSubmitBuscar = this.handleSubmitBuscar.bind(this);
  } 

  componentDidMount() {
    axios.get(`http://localhost:8000/list`)
      .then(res => {
        const tareas = res.data;
        this.setState({ tareas:tareas });
      })
  }


  handleSubmitAdd(e){

    e.preventDefault();

    const name=this.state.tarea;

    axios.post('http://localhost:8000/store',{ name })
      .then(res => {
        const tareas = res.data;
        this.setState({ tareas:tareas });
        this.setState({ tarea:'' });
      })
    }

  handleChange(event) {
    this.setState({tarea: event.target.value});
  }


  handleChangeBuscar(event) {
    this.setState({buscar: event.target.value});
  }

  EliminarTarea(id){

    axios.get('http://localhost:8000/delete/'+id)
    .then(res => {
      const tareas = res.data;
      this.setState({ tareas:tareas });
    });
  }

  EditarTarea(id, name){

    this.setState({ id_tarea:id });
    this.setState({ tarea:name });
    this.setState({ mostrarFormEdit:true });
    
  }

  handleSubmitEdit(e){

    e.preventDefault();

    const name=this.state.tarea;
    const id_tarea=this.state.id_tarea;

    axios.post('http://localhost:8000/update/'+id_tarea,{ name })
      .then(res => {
        const tareas = res.data;
        this.setState({ tareas:tareas });
        this.setState({ tarea:'' });
        this.setState({ mostrarFormEdit:false });
      });
  }

  handleSubmitBuscar(e){

    e.preventDefault();

    const buscar=this.state.buscar;

    axios.get('http://localhost:8000/buscar/'+buscar)
      .then(res => {
        const tareas = res.data;
        this.setState({ tareas:tareas });
        this.setState({ tarea:'' });
        this.setState({ mostrarFormEdit:false });
      });
  }


  completarTarea(id){

    axios.get('http://localhost:8000/complete/'+id)
    .then(res => {
      const tareas = res.data;
      this.setState({ tareas:tareas });
    });

  }

  todas(){

    axios.get('http://localhost:8000/list')
    .then(res => {
      const tareas = res.data;
      this.setState({ tareas:tareas });
    });

  }


  pendientes(){

    axios.get('http://localhost:8000/pendientes')
    .then(res => {
      const tareas = res.data;
      this.setState({ tareas:tareas });
    });

  }


  completadas(id){

    axios.get('http://localhost:8000/completadas')
    .then(res => {
      const tareas = res.data;
      this.setState({ tareas:tareas });
    });

  }

  mostrarFormAction(){

    console.log('mostrarFormAction');

    this.setState({mostrarForm:true});

  }

  ocultarFormAction(){

    console.log('ocultarFormAction');

    this.setState({mostrarForm:false});

  }

  ocultarFormEditAction(){

    console.log('ocultarFormAction');

    this.setState({mostrarFormEdit:false});

  }

  render(){
    return (
    
      <div>
        <Container fluid>
        


        {this.state.mostrarFormEdit ? (

          <Row className="formCaja">
          <Form controlid="tareaFormEdit"  id="tareaFormEdit" name="tareaFormEdit"  className="mb-3"  onSubmit={this.handleSubmitEdit}>

          <Form.Control id="id_tarea" name="id_tarea" type="hidden"  value={this.state.id_tarea}  onChange={this.handleChange}/>
            <Form.Group  className="mb-3" controlId="formBasicEmail">
              <Form.Control id="tarea" name="tarea" type="text" placeholder="Tarea" value={this.state.tarea}  onChange={this.handleChange}/>
            </Form.Group>
            <Button  variant="primary" type="submit">
              Actualizar
            </Button>

            <Button  variant="default" type="button" onClick={()=>this.ocultarFormEditAction()}>
              Cancelar
            </Button>
          </Form>
          </Row>

        ) : (
          null
        )}

        {this.state.mostrarForm ? (

          <Row className="formCaja">
          <Form controlid="tareaForm"  id="tareaForm" name="tareaForm"  className="mb-3"  onSubmit={this.handleSubmitAdd}>
            <Form.Group  className="mb-3" controlId="formBasicEmail">
              <Form.Control id="tarea" name="tarea" type="text" placeholder="Tarea" value={this.state.tarea}  onChange={this.handleChange}/>
            </Form.Group>
            <Button  variant="primary" type="submit">
              Guardar
            </Button>

            <Button  variant="default" type="button" onClick={()=>this.ocultarFormAction()}>
              Cancelar
            </Button>
          </Form>
          </Row>

        ) : (

          <Button className="addTarea"  variant="primary" type="button" onClick={()=>this.mostrarFormAction()}>
              Crear Tarea
            </Button>

        )}
  
          <Row >
            <Col ><h1>Lista de Tareas</h1></Col>
          </Row>


          <Row >

            <Nav className="justify-content-center" activeKey="/home">
             
              <Nav.Item>
                <Nav.Link eventKey="link-1" onClick={()=>this.todas()}   >Todas</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="link-2" onClick={()=>this.pendientes()}>Pendientes</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="link-2" onClick={()=>this.completadas()}> Completadas</Nav.Link>
              </Nav.Item>


              <Nav.Item>
               
              <Form  controlid="buscarForm"  id="buscarForm" name="buscarForm"  className="mb-3"  onSubmit={this.handleSubmitBuscar}>
                <Row>
                  <Col>
                    <Form.Group  className="mb-3" controlId="formBasicEmail">
                      <Form.Control id="buscar" name="buscar" type="text" placeholder="Buscar" value={this.state.buscar}  onChange={this.handleChangeBuscar}/>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Button  variant="primary" type="submit">
                    Buscar
                  </Button>
                  </Col>

                </Row>
               
                

                <Button  variant="default" type="button" onClick={()=>this.ocultarFormAction()}>
                  Cancelar
                </Button>
              </Form>




              </Nav.Item>
              
            </Nav>


          </Row>


          




          {this.state.tareas.map(tareas => (

            <Row key={tareas.id}  className="itemTarea">
              <Col>{tareas.completed=='1' ? (
                <Button   variant="info" ><FontAwesomeIcon icon={faCheckCircle} /></Button>
              ) : (
                <Button  variant="warning"  onClick={()=> this.completarTarea(tareas.id)}   ><FontAwesomeIcon icon={faCircle} /></Button>
              )} </Col>
              <Col>{tareas.name} </Col>
              <Col>
              
              
              <Button  onClick={()=> this.EditarTarea(tareas.id, tareas.name)}  variant="primary"><FontAwesomeIcon icon={faEdit} /></Button>

             
              <Button onClick={()=> this.EliminarTarea(tareas.id)} variant="danger"><FontAwesomeIcon icon={faTrash} /></Button>

              </Col>

            </Row>

          ))}
  
      </Container>

      </div>
    );
  
  }
  
}

ReactDOM.render(
  <Todo></Todo>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
