import React from 'react';
import './Footer.css';
import logoFacebook from '../../images/logo-facebook.png';
import logoLinkedIn from '../../images/logo-linkedin.png';
import menuItems from '../Menu/MenuItems';

function Footer() {
     return (
          <footer className='padding-xxl-xl'>
               <div className='display-flex-between width-90 margin-auto footer-wrapper'>
                    <div>
                         <p className='font-size-s font-semi-bold'>Onde nos encontrar</p>
                         <div className='margin-top-s'>
                              <a href='https://www.facebook.com/DeloittePortugal/' target='_blank' rel='noreferrer'>
                                   <img alt='Facebook logo'src={logoFacebook} className='social-img'/>
                              </a>
                              <a href='https://pt.linkedin.com/company/deloitte?trk=public_profile_topcard-current-company' target='_blank' rel='noreferrer'>
                                   <img alt='LinkedIn logo' src={logoLinkedIn} className='social-img'/>
                              </a>
                         </div>
                         <div className = 'margin-top-s font-size-xs'>
                              <p>Deloitte Hub</p>
                              <p>Av. Eng. Duarte Pacheco, 7</p>
                              <p>Lisboa, 1070-100</p>
                              <p>Portugal</p>
                              <p className = 'telephone'>Telefone: <span className='bold'>+351 210 422 500</span></p>
                         </div>
                    </div>
                    <div>
                         <p className='font-semi-bold font-size-s footer-section'>Sobre o programa</p>
                         <div className='font-size-xs'>

                              {menuItems.map((item) =>  (
                              <p className='margin-top-xs' key={item.id}>
                                   <a className='footer-links' href={item.url}>{item.label}</a>
                              </p>
                               ))}
                         </div>
                    </div>
                    <div className='padding-top-xxl'>
                         <a href='#candidate'>
                              <button className='font-size-xs'>Desejo Candidatar-me</button>
                         </a>
                    </div>
               </div>
               <div className = 'font-size-xs margin-top-xl width-90 margin-auto'>
                    ???Deloitte??? refere-se a Deloitte Touche Tohmatsu Limited,
                    uma sociedade privada de responsabilidade limitada do Reino Unido (DTTL), 
                    ou a uma ou mais entidades da sua rede de firmas membro e respetivas 
                    entidades relacionadas. A DTTL e cada uma das firmas membro da sua 
                    rede s??o entidades legais separadas e independentes. A DTTL (tamb??m referida
                    como 'Deloitte Global') n??o presta servi??os a clientes. Aceda a 
                    www.deloitte.com/pt/about para saber mais sobre a nossa rede global de firmas membro.
               </div>  
          </footer>
     );
}

export default Footer;