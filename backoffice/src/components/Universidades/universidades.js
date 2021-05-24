import React, { Component } from 'react';
import './universidades.css';
import trash from '../images/trash.svg';

class Universidades extends Component {
  render() {
    const universidades = [
      { location: 'Viseu', candidatureState: 'Closed', name: 'Instituto Politécnico de Viseu', phone: '23287556', email: 'brightstartIPV@deloitte.pt'},
      { location: 'Setúbal', candidatureState: 'Closed', name: 'Instituto Politécnico de Setúbal', phone: '23287556', email: 'brightstartIPV@deloitte.pt'}
    ];
    return (
        <div class = 'divUniversidades'>
          <table class = 'tabelaUniversidades'>
                        <tr class = 'rowUniversidades'>
                            <th class = 'headerUniversidades'>Localização</th>
                            <th class = 'headerUniversidades'>Nome</th>
                            <th class = 'headerUniversidades'>Contacto</th>
                            <th class = 'headerUniversidades'>Email</th>
                            <th class = 'headerUniversidades'>Disponibilidade de Candidaturas</th>
                            <th class = 'headerUniversidades'>Ações</th>
                        </tr>
                {universidades.map(universidade => (
                        <tr>
                            <td class = 'tdUniversidades'>{universidade.location} </td>
                            <td class = 'tdUniversidades'>{universidade.name}</td> 
                            <td class = 'tdUniversidades'>{universidade.phone}</td>   
                            <td class = 'tdUniversidades'>{universidade.email}</td> 
                            <td class = 'tdUniversidades'><select name="estados" id="estados">
                              <option value="Aberto">Aberto</option>
                              <option value="Fechado">Fechado</option>
                              </select></td>  
                            <td class = 'tdUniversidades'><img class = 'trash' src={trash} alt={"trash"}/></td>  
                        </tr>
               ))}
            </table>
        </div>
    );
  }
}

export default Universidades;