import './Header.css';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../images/logo-deloitte-black.png';

function Menu(props) {
   return(
      <nav>
         <input type='checkbox' id='toogle' />
         <label htmlFor='toogle' className='check-btn'>
               <GiHamburgerMenu />
         </label>
         <span>
            <img alt='Deloitte logo' src={logo} width='170'/>
         </span>
         <ul className='font-semi-bold display-inline font-size-s'>
              <li><a><Link to={'/candidaturas'} className="nav-link">Candidaturas</Link></a></li>
              <li><a><Link to={'/universidades'} className="nav-link">Universidades</Link></a></li>
              <li><a><Link onClick={props.handleLogout} className="nav-link">Sair</Link></a></li>
         </ul>
      </nav>
   );
}

export default Menu;