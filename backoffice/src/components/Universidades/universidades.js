import React, { useState, useEffect } from 'react';
import './universidades.css';
import { getToken } from '../../Utils/Common';
import {getAllUniversities, deleteUniversities, createInstitution, updateInstitutionVideo, updateInstitutionWithoutVideo} from '../../services/api';
import Modal from 'react-modal';
import Select from 'react-select';
import {sortTextTables} from '../../Utils/Sort';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkbox from '@material-ui/core/Checkbox';
import * as QueryString from 'query-string';
import { useHistory } from "react-router-dom";
import { useParams, useLocation } from 'react-router-dom';
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
  const [candidatureState, setCandidatureState] = useState('open');
  const [isActive, setIsActive] = useState(true);
  const [modalIsOpen,setIsOpen] = useState(false);
  const [modalIsOpenWarning,setIsOpenWarning] = useState(false);
  const [optionsCandidatureState, setOptionsCandidatureState] = useState(null);
  const [optionsIsActive, setOptionsIsActive] = useState(true);
  const [selectedCandidatureState, setselectedCandidatureState] = useState(null);
  const [selectedOptionsIsActive, setselectedOptionsIsActive] = useState(null);
  //Filters variables
  const [openCandidaturesFilter, setOpenCandidaturesFilter] = useState(false);
  const [closedCandidaturesFilter, setClosedCandidaturesFilter] = useState(false);
  const [openInstitutionsFilter, setOpenInstitutionsFilter] = useState(false);
  const [closedInstitutionsFilter, setClosedInstitutionsFilter] = useState(false);
  const [searchBarFilter, setSearchBarFilter] = useState('');
  const history = useHistory();
  const params = useParams();
  const location = useLocation();
  

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

    console.log(location.search);
    let filters = location.search.substring(1);
    console.log(filters);
    getAllUniversities(token,filters).then(response =>{
      console.log(response);
      if(response.ok){
        console.log(response.data);
        setUniversidades([...response.data]);
        setBackendURL(response.backendURL);
        let arrAux = new Array(response.data.length);
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
    return aux[0].label;
  }

  const renderisActive = (index) =>{
    let aux = optionsIsActive.filter(option => option.value == universidades[index].isActive);
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
    console.log(1)
    let token = getToken();
    if(!token)return;
    

    let index = indexDelete;

    let body = {
      _id : universidades[index]._id,
      presentationVideoPath : universidades[index].presentationVideoPath,
    }

    deleteUniversities(token, body).then(response =>{
      console.log(response);
      closeModalWarning();
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
        toast.success('Universidade eliminada');
      }else{
        toast.error('Ocorreu um erro');
      }

    }).catch(error =>{
      console.log("erro");
    });

    closeModalWarning();
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

    let verificationFailed = false;
    let errorMessage = "";

    if(creating){
      if(video === null) {
        console.log('Obrigatório submeter video.');
        //toast.error('Obrigatório submeter video.');
        errorMessage += ' Obrigatório submeter video.';
        verificationFailed = true;
      }
    }
    
    //Verifications
    //Verification geral

    //Veification name
    if(name.trim() === ''){
      //toast.error("Nome obrigatório.");
      errorMessage += " Nome obrigatório.";
      verificationFailed = true;
    }


    //Veification email
    if(email.trim() === ''){
      //toast.error("Email obrigatório.");
      errorMessage += " Email obrigatório.";
      verificationFailed = true;
    }

    let regexEmail = RegExp(/.+\@.+\..+/);
    let resultEmail = regexEmail.test(email);
    if(!resultEmail ){
      //toast.error("Insira um email válido.");
      errorMessage += " Insira um email válido.";
      console.log(resultEmail);
      verificationFailed = true;
    }
    console.log(resultEmail);

    //Veification phone
    if(phone.trim() === ''){
      //toast.error("Telefone obrigatório.");
      errorMessage += " Telefone obrigatório.";
      verificationFailed = true;
    }

    if(phone.length !== 9){
      //toast.error("Nº Telefónico deve conter 9 caracteres");
      errorMessage += " Nº Telefónico deve conter 9 caracteres.";
      verificationFailed = true;
    }

    //Veification address
    if(adress.trim() === ''){
      //toast.error("Morada obrigatória.");
      errorMessage += " Morada obrigatória.";
      verificationFailed = true;
    }

    //Veification Candidature State
    if(candidatureState === null){
      //toast.error("Campo estado das candidaturas obrigatório.");
      errorMessage += " Campo estado das candidaturas obrigatório.";
      verificationFailed = true;
    }

    //Veification isActive
    if(isActive === null){
      //toast.error("Campo estado da instituição obrigatório.");
      errorMessage += " Campo estado da instituição obrigatório.";
      verificationFailed = true;
    }


    if(verificationFailed){
      toast.error(errorMessage);
      return;
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
        
      console.log(candidatureState);

      if(creating){
        createInstitution(token, formData).then(response => {
          if(response.ok){
            console.log("sucesso criar instituição");
            console.log(response.data);
            universidades.push(response.data);
            setUniversidades([...universidades]);
            resetForm();
            closeModal();
            toast.success('Universidade criada com sucesso.');
          }else{
            console.log("erro criar instituição");
            console.log(response);
            toast.error('Ocorreu um erro');
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
              toast.success('Universidade editada com sucesso.');
            }else{
              console.log("responsta mal sucedida");
              toast.error('Ocorreu um erro');
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
              toast.success('Universidade editada com sucesso.');
            }else{
              console.log("update sem sucesso");
              toast.error('Ocorreu um erro');
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
    setVideo(null);
    setAdress('');
    setCandidatureState('open');
    setIsActive(true);
    setselectedCandidatureState({value:'open',label:'Abertas'});
    setselectedOptionsIsActive({value:true,label:'Aberta'});
  }

  const cutEditTitle = () => {
    if(universidades[indexEditing] && universidades[indexEditing].name.length > 7){
      return "Editar " + universidades[indexEditing].name.substring(0,6) + "...";
    }

    return "Editar " + universidades[indexEditing].name;


  }

  const handlerFiltersChanges = (e, inputName) =>{
  //  console.log(e.target.checked);
    console.log(e);

    switch(inputName) {
      case 'openCandidatures': 
           setOpenCandidaturesFilter(e.target.checked);
           break;
      case 'closedCandidatures': 
           setClosedCandidaturesFilter(e.target.checked);
           break;
      case 'openInstitutions': 
           setOpenInstitutionsFilter(e.target.checked);
           break;
      case 'closedInstitutions': 
           setClosedInstitutionsFilter(e.target.checked);
           break;
      case 'search': 
           setSearchBarFilter(e.target.value);
           break;
           
      default:
           break;
    }
  }

  const searchFilters = () =>{
    const token = getToken();

    if(!token)
      return;

    setLoading(true);
    

    let stringFilters = QueryString.stringify({
      "openCand":openCandidaturesFilter,
      "closCand":closedCandidaturesFilter,
      "opActInst":openInstitutionsFilter,
      "clActInst":closedInstitutionsFilter,
      "search":searchBarFilter,
    },{
      skipNull: true,
      skipEmptyString:true,
      arrayFormat: 'separator',
      arrayFormatSeparator: '|'
    });

    let parsed = QueryString.parse(stringFilters,{parseBooleans: true, parseNumbers: true});
    console.log(parsed);
    console.log(stringFilters);

    getAllUniversities(token, stringFilters).then(response =>{
      console.log(response);
      if(response.ok){
        if(stringFilters){
          history.push({
            // pathname: '/dresses',
            search: stringFilters
           });
        };
        

        console.log(response.data);
        setUniversidades([...response.data]);
        setBackendURL(response.backendURL);
        let arrAux = new Array(response.data.length);
        setShowVideo([...arrAux]);
        setIndexEditing(null);
        setIndexDelete(null);

      }else{
        console.log("não ok");
        
      }
      setLoading(false);

      return;
    }).catch(error =>{
      console.log("Error");
    })

  }

  const cleanSearchFilters = () =>{
    setOpenCandidaturesFilter(false);
    setClosedCandidaturesFilter(false);
    setOpenInstitutionsFilter(false);
    setClosedInstitutionsFilter(false);
    setSearchBarFilter('');
    return;
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
          
          <div className='width-90 margin-auto display-flex-between margin-bottom-m margin-top-xl flex-wrap'>
              <h1 className=' font-semi-bold'>Universidades</h1>
              <button className=' font-size-xs' onClick={() => setCreatingMode() } >Nova universidade</button>
          </div>

          <div className="containerFiltersPrincipalUniv">
            <div style={{'textAlign':'center'}}><h2>Filtrar</h2></div>
            <div className="containerFiltersUniv">
              
              <div className="SearchBarFilterContainerUniv">
                <input className="inputModalUniv" maxLength={35} value={searchBarFilter} onChange={(e) => handlerFiltersChanges(e, 'search')} placeholder='Procurar' />
              </div>
              <div className="checkboxFiltersContainerUniv">
                <div className="checkboxFilterDivUniv">
                  <Checkbox checked={openCandidaturesFilter} onClick={(e)=> handlerFiltersChanges(e, 'openCandidatures')} color="primary"></Checkbox>
                  <label>Candidaturas Abertas</label>
                </div>
                <div className="checkboxFilterDivUniv">
                  <Checkbox checked={closedCandidaturesFilter} onClick={(e)=> handlerFiltersChanges(e, 'closedCandidatures')} color="primary"></Checkbox>
                  <label>Candidaturas Fechadas</label>
                </div>
              </div>
              <div className="checkboxFiltersContainerUniv">
                <div className="checkboxFilterDivUniv">
                  <Checkbox checked={openInstitutionsFilter} onClick={(e)=> handlerFiltersChanges(e, 'openInstitutions')} color="primary"></Checkbox>
                  <label>Instituições Abertas</label>
                </div>
                <div className="checkboxFilterDivUniv">
                  <Checkbox checked={closedInstitutionsFilter} onClick={(e)=> handlerFiltersChanges(e, 'closedInstitutions')} color="primary"></Checkbox>
                  <label>Instituições Fechadas</label>
                </div>
              </div>
            </div>
            <div className="SearchCleanFiltContainer">
              <div className="containerMiddleFilterUniv">
                <button onClick={() => searchFilters()}>Procurar</button>
                <button onClick={() => cleanSearchFilters() }>Limpar</button>
              </div>
            </div>
          </div>
          <table id='tabelaUniversidades' className='tabelaUniversidades' style={{'marginTop':'64px'}}>
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

                                universidades[0] !== undefined ?

                                universidades.map((universidade,index) => (
                                  <tr>
                                    <td className = 'tdUniversidades'><span>{universidade.name}</span></td>
                                    <td className = 'tdUniversidades'><span>{universidade.location}</span></td> 
                                    <td className = 'tdUniversidades'><span>{universidade.phone}</span></td>   
                                    <td className = 'tdUniversidades'><span>{universidade.email}</span></td> 
                                    <td className = 'tdUniversidades'><span>{renderCandidatureState(index)}</span></td>  
                                    <td className = 'tdUniversidades'><span>{renderisActive(index)}</span></td>  
                                    <td className = 'tdUniversidades videoColumn' style={{'textAlign':'center'}}>
                                        <a className='action-link' onClick={() => showVideoHandler(index)}>{showVideo[index] ? "ocultar" : "visualizar" }</a>
                                        <video style={{display: showVideo[index] ? "block" : "none" }} className='vertical-align videoPromotional' src={backendURL + universidade.presentationVideoPath} type='video/mp4' controls></video>
                                    </td> 
                                    <td className = 'tdUniversidades'>
                                    {/**   <div className="containerActionsUniv">
                                         <img className = 'editActionUniv iconsActionsUniv' onClick={() => editAction(index)} src={edit} alt={"Editar"}/> 
                                        <img className = 'trashActionUniv iconsActionsUniv' onClick={() => openModalWarning(index)} src={trash} alt={"Eliminar"}/> 
                                      </div> */}
                                      <span className='icon-wrapper cursor-pointer'>
                                        <AiOutlineEdit size={25} onClick={() => editAction(index)} alt={"Editar"}/>
                                      </span> 
                                      <span className='icon-wrapper cursor-pointer'>
                                        <FiTrash onClick={() => openModalWarning(index)} size={23} alt={"Eliminar"}/>
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
              overlayClassName="ModalOverlay"
            >
              <div>
                <div className="divheadModal">
                  <h2 className="divTitleModalUniv font-size-s margin-bottom-m">{creating ? "Criar Instituição" : universidades[indexEditing] ? cutEditTitle() : '' }</h2>
                  <span className="closeModalIcon" onClick={() => closeModal()} >&#10006;</span>
                </div>
                <form>
                <div>
                  <input className="inputModalUniv inputAuth" maxLength={35} value={name} onChange={(e) => handleInputChange(e, 'name')} placeholder='Nome' />
                </div>
                <div>
                  <input className="inputModalUniv inputAuth" maxLength={60} value={email} onChange={(e) => handleInputChange(e, 'email')}  placeholder='Email' />
                </div>
                <div>
                  <input className="inputModalUniv inputAuth" maxLength={9} value={phone} onChange={(e) => handleInputChange(e, 'phone')}  placeholder='Telefone' />
                </div>
                <div>
                  <input className="inputModalUniv inputAuth" maxLength={100} value={adress} onChange={(e) => handleInputChange(e, 'adress')} placeholder='Morada' />
                </div>
                <div>
                  <div className="dropdownsModalUniv">
                    <label className='label-form'>Candidaturas:</label>
                    <Select value={selectedCandidatureState} options={optionsCandidatureState} onChange={(e) => handleSelectChange(e, 'candidatureState')} isSearchable={false} isClearable={false} className='margin-top-l'/>
                  </div>
                  <div className="dropdownsModalUniv">
                    <label className='label-form'>Estado da instituição:</label>
                    <Select value={selectedOptionsIsActive} options={optionsIsActive} onChange={(e) => handleSelectChange(e, 'isActive')} isSearchable={false} isClearable={false} className='margin-top-l'/>
                  </div>
                </div>
                <div className="dropdownsModalUniv">
                  <label>Video:</label>
                  <input className='input-file' type="file" onChange={(e) => handleInputChange(e, "video")}  ></input>
                </div>

                <div className="divButtonsModal" style={{'marginTop':'10px'}}>
                  <button onClick={submitForm} className='margin-top-l'>Submeter instituição</button>  
                </div>
                </form>
              </div>
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
              overlayClassName="ModalOverlay"
            >
              <div>
                <div className="divheadModal">
                  <span className="closeModalIcon" onClick={() => closeModalWarning()} >&#10006;</span>
                </div>
                <div>
                  <p className='font-size-s'>Tem a certeza que pretende eliminar?</p>
                </div>
                <div className='divButtonsModal margin-top-s'>
                <a onClick={deleteAction} className='margin-top-l action-link'>Eliminar</a>
                <button onClick={closeModalWarning}>Cancelar</button>  
              </div>
              </div>
            </Modal>
        </div>
    );
  }


export default Universidades;