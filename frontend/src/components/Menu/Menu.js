import menuItems from './MenuItems';
import './Menu.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../images/logo-deloitte-black.png';

function Menu() {
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
               {menuItems.map((item) =>  (
                     <li key={item.id}>
                        <a href={item.url} onClick={() => document.getElementById('toogle').click()}>{item.label}</a>
                     </li>
               ))}
         </ul>
      </nav>
   );
}

export default Menu;