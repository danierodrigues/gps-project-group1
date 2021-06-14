import { useState, useEffect } from 'react';
import React, { Component } from 'react';
import './candidaturas.css';
import trash from '../images/trash.svg';
import save from '../images/diskette.svg';
import { getAllCandidatures } from '../../services/api';
import { deleteACandidature } from '../../services/api';
import { updateCandidature } from '../../services/api';
import { getToken } from '../../Utils/Common';
import Select from 'react-select';

function Candidatures() {

    const [candidatures, setCandidatures] = useState([{}]);
    const [optionsCandidatureState, setOptionsCandidatureState] = useState(null);
    const [selectedCandidatureState, setselectedCandidatureState] = useState(null);
    /*const [candidatureState, setCandidatureState] = useState('');*/
    const [allStates, setAllStates] = useState([]);
    const [allEditedStates, setAllEditedStates] = useState([]);

    useEffect(() => {
      /* Populate select component */
      let optionsAux = [
        {value:'pending',label:'Em análise'},
        {value:'denied',label:'Recusada'},
        {value:'accepted',label:'Aceite'}
      ]
      setOptionsCandidatureState([...optionsAux]);
  
      /*setselectedCandidatureState({value:'pending',label:'Em análise'});*/
      //setselectedCandidatureState('pending');

      getAllCandidatures(getToken()).then(result => { // Fetch only once, on render
        if(result.ok) {
          setCandidatures([...result.data]);

          let array = [];
          let arrayEdited = [];

          /* For each candidature, specify the state */
          result.data.forEach((element, index) => {
            array.push(optionsAux.filter(option => option.value === element.state));
            arrayEdited.push(false);
          });
          setAllStates([...array]);
          setAllEditedStates([...arrayEdited]);
        }
      })
    }
    , [])


    const deleteThisCandidature = (id, index) => {
      deleteACandidature(getToken(), id).then(result => { // Fetch only once, on render
        if(result.ok) {
          candidatures.splice(index,1);
          setCandidatures([...candidatures]);
        } 
      })
    }

    const updateCandidatureState = (id, newState, index) => {
      let body = {'_id': id, 'state': newState};
      updateCandidature(getToken(), body).then(result => {
          if(result.ok) {
            allEditedStates[index] = false;
            setAllEditedStates([...allEditedStates]);
          }
      })
    }

    const handleSelectChange = (e,inputName, index) => {
      // eslint-disable-next-line default-case
      switch(inputName){
        case 'candidatureState':
          if(e !== null){
          
            /*setselectedCandidatureState([...optionsCandidatureState.filter(option => option.value === e.value)]);*/
            /*setselectedCandidatureState(e.value);*/
            allStates[index] = e;
            allEditedStates[index] = true;
            setAllStates([...allStates]);
            setAllEditedStates([...allEditedStates]);
          }else
          setselectedCandidatureState(null);
          
          //console.log(candidatureState);
          break;
      }
    } 

    return ( 
        <div class = 'divCandidatura'>
                <table class = 'tabelaCandidatura'>
                        <tr class = 'rowCandidatura'>
                            <th class = 'headerCandidatura'>Primeiro Nome</th>
                            <th class = 'headerCandidatura'>Ultimo Nome</th>
                            <th class = 'headerCandidatura'>Data de submissão</th>
                            <th class = 'headerCandidatura'>Contacto</th>
                            <th class = 'headerCandidatura'>Email</th>
                            <th class = 'headerCandidatura'>Universidade</th>
                            <th class = 'headerCandidatura'>Estado</th>
                            <th class = 'headerCandidatura'>Ações</th>
                        </tr>
                {candidatures.map((cSingle,index) => (

                        <tr>
                            <td className = 'tdCandidaturas'>{cSingle.name} </td>
                            <td className = 'tdCandidaturas'>{cSingle.surname}</td> 
                            <td className = 'tdCandidaturas'>{String(cSingle.createdAt).split("T",1)}</td> 
                            <td className = 'tdCandidaturas'>{cSingle.mobile}</td>   
                            <td className = 'tdCandidaturas'>{cSingle.email}</td>  
                            <td className = 'tdCandidaturas'>{cSingle.institution}</td>  
                            <td className = 'tdCandidaturas'>
                              <Select value={allStates[index]} options={optionsCandidatureState} onChange={(e) => handleSelectChange(e, 'candidatureState', index)} isSearchable={false} className='statesSelector'/>
                            </td>
                            <td className = 'tdCandidaturas'>
                              <img class = 'trash' src={trash} alt={"trash"} onClick={() => { deleteThisCandidature(cSingle._id,index) }}/>
                              {allEditedStates[index] ? <img class = 'save' src={save} alt={"save"} onClick={() => {updateCandidatureState(cSingle._id, allStates[index].value, index)}}/> : <span></span>}
                            </td>  
                        </tr>
               ))}
            </table>
        </div>
    );
  
}

export default Candidatures;