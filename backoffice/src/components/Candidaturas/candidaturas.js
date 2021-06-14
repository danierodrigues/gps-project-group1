import { useState, useEffect } from 'react';
import React, { Component } from 'react';
import './candidaturas.css';
import { getAllCandidatures } from '../../services/api';
import { deleteACandidature } from '../../services/api';
import { updateCandidature } from '../../services/api';
import { getToken } from '../../Utils/Common';
import { TiArrowUnsorted } from 'react-icons/ti';
import { AiOutlineEdit } from 'react-icons/ai';
import { FiTrash } from 'react-icons/fi';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import {sortTextTables} from '../../Utils/Sort';

function Candidatures() {

    const [candidatures, setCandidatures] = useState([{}]);
    const [modalIsOpenWarning,setIsOpenWarning] = useState(false);
    const [indexDelete, setIndexDelete] = useState(null);
    const [idDelete, setIdDelete] = useState(null);
    
    useEffect(() => {
      getAllCandidatures(getToken()).then(result => { // Fetch only once, on render
        if(result.ok) {
          setCandidatures([...result.data]);
        }
      })
    }
    , [])

    const deleteThisCandidature = (id, index) => {
      console.log(id, index)
      deleteACandidature(getToken(), id).then(result => { // Fetch only once, on render
        closeModalWarning();
        if(result.ok) {
          candidatures.splice(index,1);
          setCandidatures([...candidatures]);
          toast.success('Candidatura eliminada');
        }
        else {
          toast.error('Ocorreu um erro');
        }
      })
    }

    return ( 
        <div class = 'divUniversidades'>

<div>
            <div className='width-90 margin-auto margin-bottom-m margin-top-xl'>
              <h1 className=' font-semi-bold'>Candidaturas</h1>
            </div>
          </div>
                <table class = 'tabelaUniversidades'>
                  <thead>
                    <tr class = 'rowUniversidades'>
                        <th class = 'headerUniversidades' onClick={() =>sortTextTables("tbodyCandidaturas",0)} ><span className="headerToSort">Nome completo <TiArrowUnsorted style={{verticalAlign: '-10%'}} /></span></th>
                        <th class = 'headerUniversidades' onClick={() =>sortTextTables("tbodyCandidaturas",1)}><span className="headerToSort">Data de submissão <TiArrowUnsorted style={{verticalAlign: '-10%'}} /></span></th>
                        <th class = 'headerUniversidades' ><span>Contacto</span></th>
                        <th class = 'headerUniversidades'><span>Email</span></th>
                        <th class = 'headerUniversidades' onClick={() =>sortTextTables("tbodyCandidaturas",4)}><span className="headerToSort">Instituto <TiArrowUnsorted style={{verticalAlign: '-10%'}} /></span></th>
                        <th class = 'headerUniversidades'><span>Estado</span></th>
                        <th class = 'headerUniversidades'><span>Ações</span></th>
                    </tr>
                  </thead>
                  <tbody id='tbodyCandidaturas'>
                    {candidatures.map((cSingle,index) => (
                      <tr>
                          <td className = 'tdUniversidades'><span>{cSingle.name} {cSingle.surname}</span></td>
                          <td className = 'tdUniversidades'><span>{String(cSingle.createdAt).split("T",1)}</span></td> 
                          <td className = 'tdUniversidades'><span>{cSingle.mobile}</span></td>   
                          <td className = 'tdUniversidades'><span>{cSingle.email}</span></td>  
                          <td className = 'tdUniversidades'><span>{cSingle.institution}</span></td>  
                          <td className = 'tdUniversidades'><span><select name="estados" id="estados">
                            <option value="Em análise">Em análise</option>
                            <option value="Aceite">Aceite</option>
                            <option value="Negado">Negado</option>
                            </select></span></td>
                          <td className = 'tdUniversidades'>
                            <span className='icon-wrapper cursor-pointer'>
                              <AiOutlineEdit size={25} />
                              </span> 
                              <span className='icon-wrapper cursor-pointer'>
                                <FiTrash onClick={() => openModalWarning(cSingle._id, index)} size={23}/>
                              </span>
                          </td>  
                      </tr>
                    ))}
                  </tbody>
            </table>

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
                  <p className='font-size-s'>Tem a certeza que pretende eliminar?</p>
                </div>
                <div className='divButtonsModal margin-top-s'>
                <a onClick={() => deleteThisCandidature(idDelete, indexDelete)} className='margin-top-l action-link'>Eliminar</a>
                <button onClick={closeModalWarning}>Cancelar</button>  
              </div>
              </div>
        </Modal>
        </div>


    );

    function openModalWarning(id, index){
      console.log(id, index)
      setIndexDelete(index);
      setIdDelete(id);
      setIsOpenWarning(true);
    }

    function afterOpenModalWarning(){
      // references are now sync'd and can be accessed.
      
    }
  
    function closeModalWarning(){
      setIsOpenWarning(false);
    }  
}

export default Candidatures;