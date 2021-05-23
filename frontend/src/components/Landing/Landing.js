import './Landing.css';
import Menu from '../Menu/Menu';
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";

function Landing() {
   return(
      <div className='bg text-white'>
         <Menu />
         <ScrollAnimation animateIn='animate__fadeInLeft' duration={1.5} animateOnce={true}>
            <div className='width-90 margin-auto'>
               <p className='font-size-xxxl font-semi-bold main-title'>BrightStart</p>
               <p className='font-size-l font-semi-bold subtitle'>O futuro pode ser brilhante</p>
               <a href='#candidate'><button className='margin-top-xl'>Candidata-te</button></a>
            </div>
         </ScrollAnimation>
      </div>
   );
}

export default Landing;