import React, { Component } from 'react';
import './candidaturas.css';
import trash from '../images/trash.svg';

class Candidaturas extends Component {
  render() {
    const candidatura = [
        { name: 'Paulo', surname: 'Silva', date: '10-05-2021', mobile: '967391762', email: 'email@email.com', institution: 'Viseu', status: 'Em análise' },
        { name: 'João', surname: 'Manel', date: '10-05-2021', mobile: '923812061', email: 'email1@email.com', institution: 'Lisboa', status: 'Em análise'}
      ];
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
                {candidatura.map(person => (
                    
                        <tr>
                            <td class = 'tdCandidaturas'>{person.name} </td>
                            <td class = 'tdCandidaturas'>{person.surname}</td> 
                            <td class = 'tdCandidaturas'>{person.date}</td> 
                            <td class = 'tdCandidaturas'>{person.mobile}</td>   
                            <td class = 'tdCandidaturas'>{person.email}</td>  
                            <td class = 'tdCandidaturas'>{person.institution}</td>  
                            <td class = 'tdCandidaturas'><select name="estados" id="estados">
                              <option value="Em análise">Em análise</option>
                              <option value="Aceite">Aceite</option>
                              <option value="Negado">Negado</option>
                              </select></td>
                            <td class = 'tdCandidaturas'><img class = 'trash' src={trash} alt={"trash"}/></td>  
                        </tr>
               ))}
            </table>
        </div>
    );
  }
}

export default Candidaturas;