import React, { useState, useEffect } from 'react';
import './faqs.css';
import { getToken, setUserSession, removeUserSession } from '../../Utils/Common';
import {getFaqs, deleteAFaq, updateFaq, createFaq, verifyToken} from '../../services/api';
import Modal from 'react-modal';
import Select from 'react-select';
import {sortTextTables} from '../../Utils/Sort';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkbox from '@material-ui/core/Checkbox';
import * as QueryString from 'query-string';
import { useHistory, withRouter } from "react-router-dom";
import { useParams, useLocation } from 'react-router-dom';
import { TiArrowUnsorted } from 'react-icons/ti';
import { AiOutlineEdit } from 'react-icons/ai';
import { FiTrash } from 'react-icons/fi';
import loadingGif from '../images/loading.gif';


// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');


function Faqs({setisLogged}){
  const [faqs, setFaqs] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(true);
  const [indexEditing, setIndexEditing] = useState(null);
  const [indexDelete, setIndexDelete] = useState(null);
  const [id, setId] = useState(null);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [modalIsOpen,setIsOpen] = useState(false);
  const [modalIsOpenWarning,setIsOpenWarning] = useState(false);
  const [optionsIsActive, setOptionsIsActive] = useState(true);
  const [selectedOptionsIsActive, setselectedOptionsIsActive] = useState(null);
  //Filters variables
  const [openInstitutionsFilter, setOpenInstitutionsFilter] = useState(false);
  const [closedInstitutionsFilter, setClosedInstitutionsFilter] = useState(false);
  const [searchBarFilter, setSearchBarFilter] = useState('');
  const history = useHistory();
  const location = useLocation();
  

  useEffect(() => {
    let token = getToken();
    
    console.log("testar");


    

    if(!token){
        console.log("entrou denrtro da verificação - 1");
        //props.history.push('/login');
        return;
    }
    
    verifyToken(token).then(response => {
        if(response.ok){
            setUserSession(token);
            //setIsLogged(true);
            //setisLogged(false);
            //history.push('/login');
            
        }else{
            removeUserSession();
            //setIsLogged(false);
            console.log("redirect to login - faq");
            //setAuthLoading(false);
            setisLogged(false);
            history.push('/login');
            
        }
        
    }).catch(error=>{
        removeUserSession();
        setisLogged(false);
        history.push('/login');
    })


    setOptionsIsActive([
      {value:true,label:'Aberta'},
      {value:false,label:'Fechada'}
    ])

    setselectedOptionsIsActive({value:true,label:'Aberta'});

    console.log(location.search);
    let filters = location.search.substring(1);
    console.log(filters);
    getFaqs(token,filters).then(response =>{
      console.log(response);
      if(response.ok){
        console.log(response.data);
        setFaqs([...response.data]);


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


  const renderisActive = (index) =>{
    if(faqs[index].isActive){
        let aux = optionsIsActive.filter(option => option.value == faqs[index].isActive);
        return aux[0].label;
    }
    return '';
    
  }


  const deleteAction = () =>{
    console.log(1)
    let token = getToken();
    if(!token)return;
    

    let index = indexDelete;


    deleteAFaq(token, faqs[index]._id).then(response =>{
      console.log(response);
      closeModalWarning();
      if(response.ok){
        let arrAuxUni = faqs;
        console.log(arrAuxUni);
        arrAuxUni.splice(index,1);
        console.log(arrAuxUni);
        setFaqs([...arrAuxUni]);

        toast.success('Faq eliminada');
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
    setId(faqs[index]._id);
    setQuestion(faqs[index].question);
    setAnswer(faqs[index].answer);
    setIsActive(faqs[index].isActive);
    let opActive = optionsIsActive.filter(option => option.value === faqs[index].isActive);
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

    console.log("dentro do submit");

    let verificationFailed = false;
    let errorMessage = "";

    
    //Verifications
    //Verification geral

    //Veification name
    if(question.trim() === ''){
      //toast.error("Nome obrigatório.");
      errorMessage += " Questão obrigatória.";
      verificationFailed = true;
    }


    //Veification email
    if(answer.trim() === ''){
      //toast.error("Email obrigatório.");
      errorMessage += " Resposta obrigatória.";
      verificationFailed = true;
    }

    //Veification isActive
    if(isActive === null){
      //toast.error("Campo estado da instituição obrigatório.");
      errorMessage += "Campo de ativo obrigatório.";
      verificationFailed = true;
    }


    if(verificationFailed){
      toast.error(errorMessage);
      return;
    }
    
    let body = { 
        "_id":id,
        "question":question, 
        "answer":answer,
        "isActive":isActive,
    }
    
        
        
      if(creating){
        console.log("criando");
        createFaq(token, body).then(response => {
          if(response.ok){
            console.log("sucesso criar faq");
            console.log(response.data);
            faqs.push(response.data);
            setFaqs([...faqs]);
            resetForm();
            closeModal();
            toast.success('Faq criada com sucesso.');
          }else{
            console.log("erro criar faq");
            console.log(response);
            toast.error('Ocorreu um erro');
          }
        }).catch(error =>{
          console.log("erro criar instituição: ",error);
        });
      }else{//Editing

        console.log("editando");
        console.log("Entro no que não tem o video mudado");
        updateFaq(token, body).then(response =>{
        console.log(response);
        if(response.ok){
            console.log("update com sucesso");
            console.log("responsta bem sucedida");
            console.log(response);
            faqs[indexEditing] = response.data;
            setFaqs([...faqs]);
            resetForm();
            closeModal();
            toast.success('Faq editada com sucesso.');
        }else{
            console.log("update sem sucesso");
            toast.error('Ocorreu um erro');
        }
        }).catch(error => {
        console.log("error: ", error);
        });
        
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
    }
  } 

  const handleInputChange = (e, inputName) => {
    console.log(e.target.value);
    console.log(inputName);
    switch(inputName) {
         case 'questions': 
              setQuestion(e.target.value);
              break;

         case 'answer': 
              setAnswer(e.target.value);
              break;

         default:
              break;
    }
}



  const resetForm = () => {
    setId(null);
    setQuestion('');
    setAnswer('');
    setIsActive(true);
  }

  const cutEditTitle = () => {
    if(faqs[indexEditing] && faqs[indexEditing].question.length > 7){
      return "Editar " + faqs[indexEditing].question.substring(0,6) + "...";
    }

    return "Editar " + faqs[indexEditing].question;


  }

  const handlerFiltersChanges = (e, inputName) =>{
  //  console.log(e.target.checked);
    console.log(e);

    switch(inputName) {
      case 'openFaqs': 
           setOpenInstitutionsFilter(e.target.checked);
           break;
      case 'closedFaqs': 
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
      "opActFaqs":openInstitutionsFilter,
      "clActFaqs":closedInstitutionsFilter,
      "search":searchBarFilter,
    },{
      skipNull: true,
      skipEmptyString:true,
      arrayFormat: 'separator',
      arrayFormatSeparator: '|'
    });


    getFaqs(token, stringFilters).then(response =>{
      console.log(response);
      if(response.ok){
        if(stringFilters){
          history.push({
            // pathname: '/dresses',
            search: stringFilters
           });
        };
        

        console.log(response.data);
        setFaqs([...response.data]);
        setIndexEditing(null);
        setIndexDelete(null);

      }else{
        console.log("não ok");
        toast.error("Erro");
      }
      setLoading(false);

      return;
    }).catch(error =>{
      console.log("Error");
      setLoading(false);
    })

  }

  const cleanSearchFilters = () =>{
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
        <div className = 'divFaqs'>
          
          <div className='width-90 margin-auto display-flex-between margin-bottom-m margin-top-xl flex-wrap'>
              <h1 className=' font-semi-bold'>Faqs</h1>
              <button className=' font-size-xs' onClick={() => setCreatingMode() } >Nova Faq</button>
          </div>

          <div className="containerFiltersPrincipalFaqs">
            <div style={{'textAlign':'center'}}><h2>Filtrar</h2></div>
            <div className="containerFiltersFaqs">
              
              <div className="SearchBarFilterContainerFaqs">
                <input className="inputModalFaqs" maxLength={35} value={searchBarFilter} onChange={(e) => handlerFiltersChanges(e, 'search')} placeholder='Procurar' />
              </div>
              <div className="checkboxFiltersContainerFaqs">
                <div className="checkboxFilterDivFaqs">
                  <Checkbox checked={openInstitutionsFilter} onClick={(e)=> handlerFiltersChanges(e, 'openFaqs')} color="primary"></Checkbox>
                  <label>Faqs Abertas</label>
                </div>
                <div className="checkboxFilterDivFaqs">
                  <Checkbox checked={closedInstitutionsFilter} onClick={(e)=> handlerFiltersChanges(e, 'closedFaqs')} color="primary"></Checkbox>
                  <label>Faqs Fechadas</label>
                </div>
              </div>
            </div>
            <div className="SearchCleanFiltContainerFaqs">
              <div className="containerMiddleFilterFaqs">
                <button onClick={() => searchFilters()}>Procurar</button>
                <button onClick={() => cleanSearchFilters() }>Limpar</button>
              </div>
            </div>
          </div>
          <table id='tabelaFaqs' className='tabelaFaqs' style={{'marginTop':'64px'},{'marginBottom':'30px'}}>
                    <thead>
                        <tr className = 'rowUniversidades'>
                            <th className='headerFaqs' onClick={() =>sortTextTables("tbodyFaqs",0)}><span className="headerToSort">Pergunta<TiArrowUnsorted style={{verticalAlign: '-10%'}} /></span></th>
                            <th className='headerFaqs' onClick={() =>sortTextTables("tbodyFaqs",1)}><span className="headerToSort">Resposta<TiArrowUnsorted style={{verticalAlign: '-10%'}}/></span></th>
                            <th className='headerFaqs' onClick={() =>sortTextTables("tbodyFaqs",2)}><span className="headerToSort">Ativa<TiArrowUnsorted style={{verticalAlign: '-10%'}}/></span></th>
                            <th className='headerFaqs'>Ações</th>
                        </tr>
                    </thead>
                    {
                        loading ?
                        <tr>
                            <td colSpan={4}>
                                <div className="containerLoadingGifFaqs">
                                    <img className="loadingGifFaqs" src={loadingGif} ></img>
                                </div>
                            </td>
                        </tr>
                        
                        :

                    <tbody id='tbodyFaqs'>
                               
                        {
                                faqs[0] !== undefined ?
                                faqs.map((faq,index) => (
                                  <tr>
                                    <td className = 'tdFaqs'><span>{faq.question}</span></td>
                                    <td className = 'tdFaqs'><span>{faq.answer}</span></td> 
                                    <td className = 'tdFaqs'><span>{renderisActive(index)}</span></td>  
                                    <td className = 'tdFaqs'>
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

                                <p>Infelizmente, não foi possível encontrar perguntas frequentes. Por favor, tente mais tarde.</p>
                        }
                    </tbody>
                    }
                            
            </table>

            {/* Create/Edit Modal */}
            <Modal

              isOpen={modalIsOpen}
              onAfterOpen={afterOpenModal}
              onRequestClose={closeModal}
              style={{ overlay: { background: 'rgba(0,0,0,0.8)' } }}
              contentLabel="Universidade"
              className="ModalFaqs"
              overlayClassName="ModalOverlay"
            >
              <div>
                <div className="divheadModal">
                  <h2 className="divTitleModalFaqs font-size-s margin-bottom-m">{creating ? "Criar Faq" : faqs[indexEditing] ? cutEditTitle() : '' }</h2>
                  <span className="closeModalIconFaqs" onClick={() => closeModal()} >&#10006;</span>
                </div>
                <form>
                <div>
                  <input className="inputModalFaqs inputAuth" maxLength={500} value={question} onChange={(e) => handleInputChange(e, 'questions')} placeholder='Questão' />
                </div>
                <div>
                  <input className="inputModalFaqs inputAuth" maxLength={500} value={answer} onChange={(e) => handleInputChange(e, 'answer')}  placeholder='Resposta' />
                </div>
                <div>
                  <div className="dropdownsModalFaqs">
                    <label className='label-form'>Estado da Faq:</label>
                    <Select value={selectedOptionsIsActive} options={optionsIsActive} onChange={(e) => handleSelectChange(e, 'isActive')} isSearchable={false} isClearable={false} className='margin-top-l'/>
                  </div>
                </div>

                <div className="divButtonsModal" style={{'marginTop':'10px'}}>
                  <button onClick={submitForm} className='margin-top-l'>Submeter Faq</button>  
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
              className="ModalFaqs"
              overlayClassName="ModalOverlay"
            >
              <div>
                <div className="divheadModal">
                  <span className="closeModalIconFaqs" onClick={() => closeModalWarning()} >&#10006;</span>
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


export default Faqs;