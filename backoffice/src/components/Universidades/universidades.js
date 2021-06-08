import React, { useState, useEffect } from 'react';
import './universidades.css';
import trash from '../images/trash.svg';
import edit from '../images/edit.svg';
import { getToken } from '../../Utils/Common';
import {getAllUniversities, deleteUniversities, createInstitution, updateInstitutionVideo, updateInstitutionWithoutVideo} from '../../services/api';
import Modal from 'react-modal';
import Select from 'react-select';
import {sortTextTables} from '../../Utils/Sort';
import { TiArrowUnsorted } from 'react-icons/ti';
import { AiOutlineEdit } from 'react-icons/ai';
import { FiTrash } from 'react-icons/fi';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    textAlign            : 'center',
    backgroundColor       : 'black',
    padding:'30px'
  }
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');


function Universidades(){
  const [universidades, setUniversidades] = useState([{}]);
  const [backendURL, setBackendURL] = useState();
  const [showVideo, setShowVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(true);
  const [indexEditing, setIndexEditing] = useState(null);
  const [indexDelete, setIndexDelete] = useState(null);
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setphone] = useState('');
  const [video, setVideo] = useState(null);
  const [adress, setAdress] = useState('');
  const [candidatureState, setCandidatureState] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [modalIsOpen,setIsOpen] = useState(false);
  const [modalIsOpenWarning,setIsOpenWarning] = useState(false);
  const [optionsCandidatureState, setOptionsCandidatureState] = useState(null);
  const [optionsIsActive, setOptionsIsActive] = useState(true);
  const [selectedCandidatureState, setselectedCandidatureState] = useState(null);
  const [selectedOptionsIsActive, setselectedOptionsIsActive] = useState(null);


  useEffect(() => {
    let token = getToken();
    if(!token)return;

    setOptionsCandidatureState([
      {value:'open',label:'Abertas'},
      {value:'closed',label:'Fechadas'}
    ]);

    setOptionsIsActive([
      {value:true,label:'Aberta'},
      {value:false,label:'Fechada'}
    ])

    setselectedCandidatureState({value:'open',label:'Abertas'});
    setselectedOptionsIsActive({value:true,label:'Aberta'});


    getAllUniversities(token).then(response =>{
      console.log(response);
      if(response.ok){
        console.log(response.data);
        setUniversidades([...response.data]);
        setBackendURL(response.backendURL);
        console.log(universidades);
        console.log("lenght");
        console.log(response.data.length);
        console.log("aqui");
        let arrAux = new Array(response.data.length);
        console.log(arrAux);
        setShowVideo([...arrAux]);
       
      }else{
        console.log("não ok");
        
      }
      setLoading(false);

      return;
    }).catch(error =>{
      console.log("erro");
      setLoading(false);
      return;
    })

  }, [])

  const renderCandidatureState = (index) =>{
    let aux = optionsCandidatureState.filter(option => option.value == universidades[index].candidatureState);
    console.log(aux);
    return aux[0].label;
  }

  const renderisActive = (index) =>{
    console.log("dentro da função do isActive");
    let aux = optionsIsActive.filter(option => option.value == universidades[index].isActive);
    console.log("aux");
    console.log(aux[0].label);
    return aux[0].label;
  }

  const showVideoHandler = (index) =>{
    let arrAux = showVideo;
    console.log(arrAux);
    arrAux[index] = !arrAux[index];
    console.log(arrAux);
    setShowVideo([...arrAux]);
    console.log(showVideo);
    console.log(showVideo[index]);
  }

  const deleteAction = () =>{
    let token = getToken();
    if(!token)return;

    let index = indexDelete;

    let body = {
      _id : universidades[index]._id,
      presentationVideoPath : universidades[index].presentationVideoPath,
    }

    deleteUniversities(token, body).then(response =>{
      console.log(response);
      if(response.ok){
        let arrAuxUni = universidades;
        console.log(arrAuxUni);
        arrAuxUni.splice(index,1);
        console.log(arrAuxUni);
        setUniversidades([...arrAuxUni]);
        console.log(universidades);

        let arrAuxShow = showVideo;
        console.log(arrAuxShow);
        arrAuxShow.splice(index, 1)
        console.log(arrAuxShow);
        setShowVideo([...arrAuxShow]);
      }else{
        console.log("não ok");
      }

    }).catch(error =>{
      console.log("erro");
    });

  }

  const editAction = (index) => {
    setCreating(false);
    resetForm();
    setId(universidades[index]._id);
    setName(universidades[index].name);
    setEmail(universidades[index].email);
    setphone(universidades[index].phone);
    setAdress(universidades[index].location);
    console.log(universidades[index].isActive);
    let opCandState = optionsCandidatureState.filter(option => option.value === universidades[index].candidatureState);
    let opActive = optionsIsActive.filter(option => option.value === universidades[index].isActive);
    console.log(opCandState);
    setselectedCandidatureState([...opCandState]);
    setCandidatureState(opCandState[0].value);
    setselectedOptionsIsActive([...opActive]);
    setIsActive(opActive[0].value);
    setIndexEditing(index);
    openModal();
  }

  const setCreatingMode = () =>{
    if(!creating){
      resetForm();
      setCreating(true);
    }

    openModal();
    
  }


  const submitForm = e => {
    e.preventDefault();
    let token = getToken();
    if(!token)return;

    if(creating){
      if(name.trim() === '' || email.trim() === '' || phone.trim() === '' || adress.trim() === '' || candidatureState === null || isActive === null || video === null) {
        console.log('Certifica-te que todos os campos estão preenchidos antes de submeter a tua candidatura.');
        return;
      }
    }else{
      //verifications on edit
    }
    

    let formData = new FormData(); 

    if(!creating){
      formData.append( 
        "_id", id
      );
    }
       
      formData.append( 
        "name", name
      );
      formData.append( 
        "email" , email
      );
      formData.append( 
        "phone" , phone
      );
      if(video){
        formData.append( 
          "video" , video
        );
      }
      formData.append( 
        "location", adress
      );
      formData.append( 
        "candidatureState",candidatureState
      );
      formData.append( 
        "isActive",isActive
      );
        
        

      if(creating){
        createInstitution(token, formData).then(response => {
          if(response.ok){
            console.log("sucesso criar instituição");
            console.log(response.data);
            universidades.push(response.data);
            setUniversidades([...universidades]);
            resetForm();
            closeModal();
          }else{
            console.log("erro criar instituição");
          }
        }).catch(error =>{
          console.log("erro criar instituição: ",error);
        });
      }else{//Editing

        if(video){//Video Changed
          console.log("Entro no video changed");

          updateInstitutionVideo(token,formData).then(response=>{
            if(response.ok){
              console.log("responsta bem sucedida");
              console.log(response);
              universidades[indexEditing] = response.data;
              setUniversidades([...universidades]);
              resetForm();
              closeModal();
            }else{
              console.log("responsta mal sucedida");
            }
          }).catch(error=>{
            console.log("erro");
          })


        }else{//Video not changed

          let body = { 
            "_id":id,
            "name":name, 
            "email":email,
            "phone":phone,
            "location":adress, 
            "candidatureState":candidatureState,
            "isActive":isActive,
          }

          console.log("Entro no que não tem o video mudado");
          updateInstitutionWithoutVideo(token, body).then(response =>{
            console.log(response);
            if(response.ok){
              console.log("update com sucesso");
              console.log("responsta bem sucedida");
              console.log(response);
              universidades[indexEditing] = response.data;
              setUniversidades([...universidades]);
              resetForm();
              closeModal();
            }else{
              console.log("update sem sucesso");
            }
          }).catch(error => {
            console.log("error: ", error);
          });
        }
      }

  }





  const handleSelectChange = (e,inputName) => {
    console.log(isActive);
    switch(inputName){
      case 'isActive':
        if(e !== null){
          setselectedOptionsIsActive([...optionsIsActive.filter(option => option.value === e.value)]);
          setIsActive(e.value);
        }else
          setIsActive(null);
        console.log(e.value);
        console.log(isActive);
        break;
      case 'candidatureState':
        if(e !== null){
          setselectedCandidatureState([...optionsCandidatureState.filter(option => option.value === e.value)]);
          setCandidatureState(e.value);
        }else
          setCandidatureState(null);
        
        console.log(candidatureState);
        break;
    }
  } 

  const handleInputChange = (e, inputName) => {
    switch(inputName) {
         case 'name': 
              setName(e.target.value);
              break;

         case 'email': 
              setEmail(e.target.value);
              break;

         case 'phone': 
              setphone(e.target.value);
              break;

         case 'video': 
              setVideo(e.target.files[0]);
              break;
        case 'adress': 
              setAdress(e.target.value);
              break;
        case 'video':
              setVideo(e.target.files[0]);
              break;
              
         default:
              break;
    }
}



  const resetForm = () => {
    setId(null);
    setName('');
    setEmail('');
    setphone('');
    setVideo('');
    setAdress('');
    setselectedCandidatureState({value:'open',label:'Abertas'});
    setselectedOptionsIsActive({value:true,label:'Aberta'});
  }



  function openModal(){
    setIsOpen(true);
  }

  function afterOpenModal(){
    // references are now sync'd and can be accessed.
    
  }

  function closeModal(){
    setIsOpen(false);
  }


  function openModalWarning(index){
    setIndexDelete(index);
    setIsOpenWarning(true);
  }

  function afterOpenModalWarning(){
    // references are now sync'd and can be accessed.
    
  }

  function closeModalWarning(){
    setIsOpenWarning(false);
  }


    
    return (
        <div className = 'divUniversidades'>

          <div>
            <div className='width-90 margin-auto display-flex-between margin-bottom-m margin-top-xl flex-wrap'>
              <h1 className=' font-semi-bold'>Universidades</h1>
              <button className=' font-size-xs' onClick={() => setCreatingMode() } >Nova universidade</button>
            </div>
          </div>
          <table id='tabelaUniversidades' className='tabelaUniversidades'>
                    <thead>
                        <tr className = 'rowUniversidades'>
                            <th className='headerUniversidades' onClick={() =>sortTextTables("tbodyUniversidades",0)}><span className="headerToSort">Nome <TiArrowUnsorted style={{verticalAlign: '-10%'}} /></span></th>
                            <th className='headerUniversidades' onClick={() =>sortTextTables("tbodyUniversidades",1)}><span className="headerToSort">Localização <TiArrowUnsorted style={{verticalAlign: '-10%'}}/></span></th>
                            <th className='headerUniversidades'><span>Contacto</span></th>
                            <th className='headerUniversidades' onClick={() =>sortTextTables("tbodyUniversidades",3)}><span className="headerToSort">Email <TiArrowUnsorted style={{verticalAlign: '-10%'}}/></span></th>
                            <th className='headerUniversidades' onClick={() =>sortTextTables("tbodyUniversidades",4)}><span className="headerToSort">Candidaturas <TiArrowUnsorted style={{verticalAlign: '-10%'}} /></span></th>
                            <th className='headerUniversidades' onClick={() =>sortTextTables("tbodyUniversidades",5)}><span className="headerToSort">Estado <TiArrowUnsorted style={{verticalAlign: '-10%'}}/></span></th>
                            <th className='headerUniversidades videoColumn' style={{'textAlign':'center'}}>Video</th>
                            <th className='headerUniversidades'>Ações</th>
                        </tr>
                    </thead>
                    <tbody id='tbodyUniversidades'>
                          {

                              loading ?
                                <h1>Loading...</h1>

                              :

                                universidades[0]._id !== undefined ?

                                universidades.map((universidade,index) => (
                                  <tr>
                                    <td className = 'tdUniversidades'><span>{universidade.name}</span></td>
                                    <td className = 'tdUniversidades'><span>{universidade.location}</span></td> 
                                    <td className = 'tdUniversidades'><span>{universidade.phone}</span></td>   
                                    <td className = 'tdUniversidades'><span>{universidade.email}</span></td> 
                                    <td className = 'tdUniversidades'><span>{renderCandidatureState(index)}</span></td>  
                                    <td className = 'tdUniversidades'><span>{renderisActive(index)}</span></td>  
                                    <td className = 'tdUniversidades videoColumn' style={{'textAlign':'center'}}>
                                        <a className='video-action' onClick={() => showVideoHandler(index)}>{showVideo[index] ? "ocultar" : "visualizar" }</a>
                                        <video style={{display: showVideo[index] ? "block" : "none" }} className='vertical-align videoPromotional' src={backendURL + universidade.presentationVideoPath} type='video/mp4' controls></video>
                                    </td> 
                                    <td className = 'tdUniversidades'>
                                      <span className='icon-wrapper cursor-pointer'>
                                        <AiOutlineEdit size={25} />
                                      </span> 
                                      <span className='icon-wrapper cursor-pointer'>
                                        <FiTrash onClick={() => openModalWarning(index)} size={23}/>
                                      </span>
                                     </td>  
                                  </tr>
                                ))


                              :

                                <p>Infelizmente, não foi possível encontrar universidades. Por favor, tente mais tarde.</p>
                          }
                </tbody>
                            
            </table>

            {/* Create/Edit Modal */}
            <Modal

              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={{ overlay: { background: 'rgba(0,0,0,0.8)' } }}
              contentLabel="Universidade"
              className="ModalUniv"
            >
              <h2>{creating ? "Criar Instituição" : "Editar " + universidades[indexEditing].name}</h2>

              <form>
              <div>
                <input className="inputModalUniv" maxLength={35} value={name} onChange={(e) => handleInputChange(e, 'name')} placeholder='Nome' />
              </div>
              <div>
                <input className="inputModalUniv" maxLength={60} value={email} onChange={(e) => handleInputChange(e, 'email')}  placeholder='Email' />
              </div>
              <div>
                <input className="inputModalUniv" maxLength={9} value={phone} onChange={(e) => handleInputChange(e, 'phone')}  placeholder='Telefone' />
              </div>
              <div>
                <input className="inputModalUniv" maxLength={100} value={adress} onChange={(e) => handleInputChange(e, 'adress')} placeholder='Morada' />
              </div>
              <div>
                <div className="dropdownsModalUniv">
                  <label>Candidaturas:</label>
                  <Select value={selectedCandidatureState} options={optionsCandidatureState} onChange={(e) => handleSelectChange(e, 'candidatureState')} isSearchable={false} isClearable={true} className='margin-top-l'/>
                </div>
                <div className="dropdownsModalUniv">
                  <label>Estado da instituição:</label>
                  <Select value={selectedOptionsIsActive} options={optionsIsActive} onChange={(e) => handleSelectChange(e, 'isActive')} isSearchable={false} isClearable={true} className='margin-top-l'/>
                </div>
              </div>
              <div className="dropdownsModalUniv">
                <label>Video:</label>
                <input type="file" onChange={(e) => handleInputChange(e, "video")}  ></input>
              </div>

              <div className="divButtonsModal" style={{'marginTop':'10px'}}>
                <button onClick={submitForm} className='margin-top-l'>Submeter instituição</button>
                <button onClick={closeModal}>Fechar janela</button>  
              </div>
              </form>
            </Modal>
            
            {/* Warning Modal */}
            <Modal
              isOpen={modalIsOpenWarning}
              onAfterOpen={afterOpenModalWarning}
              onRequestClose={closeModalWarning}
              style={{ overlay: { background: 'rgba(0,0,0,0.8)' } }}
            //  style={customStyles}
              //className="modalUniversitys"
              contentLabel="Aviso"
              className="ModalUniv"
            >
              <div>
                <div>
                  <h2>Tem a certeza que pretende eliminar?</h2>
                </div>
                <div className="divButtonsModal" style={{'marginTop':'10px'}}>
                <button onClick={deleteAction} className='margin-top-l'>Sim</button>
                <button onClick={closeModalWarning}>Fechar janela</button>  
              </div>
              </div>
            </Modal>
        </div>
    );
  }


export default Universidades;