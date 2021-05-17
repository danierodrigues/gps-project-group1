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
        <div>
                <table>
                        <tr>
                            <th>Primeiro Nome</th>
                            <th>Ultimo Nome</th>
                            <th>Data de submissão</th>
                            <th>Contacto</th>
                            <th>Email</th>
                            <th>Universidade</th>
                            <th>Estado</th>
                            <th>Ações</th>
                        </tr>
                {candidatura.map(person => (
                    
                        <tr>
                            <td class = 'primeiroNome'>{person.name} </td>
                            <td>{person.surname}</td> 
                            <td>{person.date}</td> 
                            <td>{person.mobile}</td>   
                            <td>{person.email}</td>  
                            <td>{person.institution}</td>  
                            <td>{person.status}</td>
                            <td><img class = 'trash' src={trash} alt={"trash"}/></td>  
                        </tr>
               ))}
            </table>
        </div>
    );
  }
}

export default Candidaturas;