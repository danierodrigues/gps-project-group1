import React from "react";
import './footer.css';
import logoFacebook from '../../images/logoFacebook.png';
import logoLinkedin from '../../images/logoLinkedin.png';

function Footer() {
return (
  <footer>
    <div class = 'main'>
      <div class ='div1'>
        <div class = 'whereToFindUs'>
          <b>Onde nos encontrar</b>
            <div class = 'images'>
              <a href="https://www.facebook.com/DeloittePortugal/" target="_blank">
                <img src={logoFacebook} class = 'facebookImg'/>
              </a>
              <a href="https://pt.linkedin.com/company/deloitte?trk=public_profile_topcard-current-company" target="_blank">
                <img src={logoLinkedin} class = "linkedinImg"/>
              </a>
            </div>
            <div class = 'locationText'>
              <div>Deloitte Hub</div>
              <div>Av. Eng. Duarte Pacheco, 7</div>
              <div>Lisboa, 1070-100</div>
              <div>Portugal</div>
              <div class = 'telephone'>Telefone: <b>+351 210 422 500</b></div>
            </div>
          </div>
          <div class = 'aboutTheProgram'>
            <b>Sobre o programa</b>
              <div class = "menu">
                <div class = 'menuItems'>BRIGHTSTART</div>
                <div class = 'menuItems'>ONDE ESTAMOS?</div>
                <div class = 'menuItems'>PROCESSO DE SELEÇÃO</div>
                <div class = 'menuItems'>CANDIDATA-TE</div>
                <div class = 'menuItems'>FAQ</div>
              </div>
          </div>
          <div class = 'button'>
            <button class = 'button1'>Desejo Candidatar-me</button>
          </div>
      </div>
    </div> 
    <div class = 'legaltext'>
          <div class = 'div2'>
            “Deloitte” refere-se a Deloitte Touche Tohmatsu Limited, uma sociedade privada de responsabilidade limitada do Reino Unido (DTTL), ou a uma ou mais entidades da sua rede de firmas membro e respetivas entidades relacionadas. A DTTL e cada uma das firmas membro da sua rede são entidades legais separadas e independentes. A DTTL (também referida como "Deloitte Global") não presta serviços a clientes. Aceda a www.deloitte.com/pt/about para saber mais sobre a nossa rede global de firmas membro.
          </div>
      </div>    
  </footer>
);
}

export default Footer;
