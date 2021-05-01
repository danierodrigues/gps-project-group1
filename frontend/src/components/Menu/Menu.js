import menuItems from './MenuItems';
import './Menu.css';
import { GiHamburgerMenu } from 'react-icons/gi';
import logo from '../../images/logo-deloitte.png';
import background from '../../images/background.jpg';

function Menu() {
   return(
      <div className="bg-test">
         {/*<div className='bg-wrapper'>
            <img src={background} className='bg'/>
         </div>*/}
         <nav>
            <input type='checkbox' id='toogle' />
            <label htmlFor='toogle' className='check-btn'>
                  <GiHamburgerMenu />
            </label>
            <span className='logo-wrapper'>
               <img alt='Deloitte logo' src={logo} width='170'/>
            </span>
            <ul className='font-semi-bold'>
                  {menuItems.map((item) =>  (
                        <li key={item.id}>
                           <a href={item.url}>{item.label}</a>
                        </li>
                  ))}
            </ul>
         </nav>
      </div>
   );
}

export default Menu;