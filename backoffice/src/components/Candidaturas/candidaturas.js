import { useState, useEffect } from 'react';
import React, { Component } from 'react';
import './candidaturas.css';
import trash from '../images/trash.svg';
import save from '../images/diskette.svg';
import { getAllCandidatures } from '../../services/api';
import { deleteACandidature } from '../../services/api';
import { updateCandidature } from '../../services/api';
import { getToken } from '../../Utils/Common';

function Candidatures() {

    const [candidatures, setCandidatures] = useState([{}]);
    
    useEffect(() => {
      getAllCandidatures(getToken()).then(result => { // Fetch only once, on render
        if(result.ok) {
          setCandidatures([...result.data]);
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
                            <td className = 'tdCandidaturas'><select name="estados" id="estados">
                              <option value="Em análise">Em análise</option>
                              <option value="Aceite">Aceite</option>
                              <option value="Negado">Negado</option>
                              </select></td>
                            <td className = 'tdCandidaturas'>
                              <img class = 'trash' src={trash} alt={"trash"} onClick={() => { deleteThisCandidature(cSingle._id,index) }}/>
                              <img class = 'save' src={save} alt={"save"} onClick={() => { }}/>
                            </td>  
                        </tr>
               ))}
            </table>
        </div>
    );
  
}

export default Candidatures;