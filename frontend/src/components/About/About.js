import './About.css';
import aboutVideo from '../../videos/about-brightstart.mp4';

function About() {
  return (
    <div className='padding-xxl-xl' id='about'>
          <div className='display-flex-around width-90 margin-auto'>
               <div className='width-45 about-section'>
                    <p className='font-size-xl font-semi-bold'>Sobre o curso</p>
                    <p className='text-justify margin-top-s width-70 section-text font-size-s'>
                         O BrightStart é a oportunidade perfeita se pretendes 
                         realizar uma licenciatura em Engenharia Informática, 
                         ao mesmo tempo que ganhas experiência profissional em 
                         contexto real, sem te preocupares com propinas e ainda 
                         seres recompensado mensalmente com uma bolsa.
                    </p>
               </div>
               <div className='width-35 display-flex video-wrapper'>
                    <video className='vertical-align' controls>
                    <source src={aboutVideo} type='video/mp4' />
                    </video>
               </div>
          </div>
          
    </div>
    
  );
}

export default About;
