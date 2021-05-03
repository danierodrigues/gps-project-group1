import menuItems from './MenuItems';
import './Menu.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../images/logo-deloitte.png';

function Menu() {
   return(
      <div className='bg text-white'>
         <div>
            <nav>
               <input type='checkbox' id='toogle' />
               <label htmlFor='toogle' className='check-btn'>
                     <GiHamburgerMenu />
               </label>
               <span>
                  <img alt='Deloitte logo' src={logo} width='170'/>
               </span>
               <ul className='font-semi-bold display-inline'>
                     {menuItems.map((item) =>  (
                           <li key={item.id}>
                              <a href={item.url}>{item.label}</a>
                           </li>
                     ))}
               </ul>
            </nav>
         </div>
      </div>
   );
}

export default Menu;