import './Header.css';
import { NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FiLogOut } from 'react-icons/fi';
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
              <li><NavLink exact to={'/candidaturas'} activeClassName='active-menu'>Candidaturas</NavLink></li>
              <li><NavLink exact to={'/universidades'} activeClassName='active-menu'>Universidades</NavLink></li>
              <li><NavLink exact to={'/faqs'} activeClassName='active-menu'>Faqs</NavLink></li>
              <li><a className='cursor-pointer' onClick={props.handleLogout}>Sair <FiLogOut style={{verticalAlign: '-3%', marginLeft: '5px'}} /></a></li>
         </ul>
      </nav>
   );
}

export default Menu;