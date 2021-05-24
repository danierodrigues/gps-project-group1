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
                            <td className = 'tdCandidaturas'>{person.name} </td>
                            <td className = 'tdCandidaturas'>{person.surname}</td> 
                            <td className = 'tdCandidaturas'>{person.date}</td> 
                            <td className = 'tdCandidaturas'>{person.mobile}</td>   
                            <td className = 'tdCandidaturas'>{person.email}</td>  
                            <td className = 'tdCandidaturas'>{person.institution}</td>  
                            <td className = 'tdCandidaturas'><select name="estados" id="estados">
                              <option value="Em análise">Em análise</option>
                              <option value="Aceite">Aceite</option>
                              <option value="Negado">Negado</option>
                              </select></td>
                            <td className = 'tdCandidaturas'><img class = 'trash' src={trash} alt={"trash"}/></td>  
                        </tr>
               ))}
            </table>
        </div>
    );
  }
}

export default Candidaturas;