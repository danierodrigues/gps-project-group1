import universities from '../../Universities';
import { useState } from 'react';
import aboutVideo from '../../videos/about-brightstart.mp4';
import { MdEmail } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';
import './Locations.css';

function Locations() {

  const [selectedUniversity, setSelectedUniversity] = useState(universities[0]);

  /* Handle the university change */
  const changeUniversity = (university) => {
    setSelectedUniversity(university);
  }

  return (
     <div className='padding-xxl-xl text-center bg-light-grey' id='locations'>
        <div>
          <h3 className='font-size-l bold'>Onde nos podes encontrar</h3>
        </div>
        <div className='display-flex-around width-70 margin-auto margin-top-xxl buttons-wrapper'>
          {
            universities.map((university) => 
              {
                var className = '';

                if(selectedUniversity.id === university.id)
                  className = 'university-number';
                  
                else
                  className = 'university-number not-selected';
                
                return(
                  <button key={university.id} onClick={() => changeUniversity(university)} className={className}>
                    {university.location}
                  </button>
                )
              }
            )
          }
        </div>
        <div className='display-flex-around width-90 margin-auto'>
          <div className='width-35 display-flex video-wrapper'>
            <video className='vertical-align' controls>
              <source src={aboutVideo} type='video/mp4' />
            </video>
          </div>
          <div className='text-left university-info'>
              <h3 className='font-size-xl font-semi-bold'>{selectedUniversity.location}</h3>
              <p className='font-size-s margin-top-s'><span className='icon-wrapper'><MdEmail /></span>{selectedUniversity.email}</p>
              <p className='font-size-s margin-top-xs'><span className='icon-wrapper'><FaPhoneAlt /></span>{selectedUniversity.phone}</p>
              <p className='font-size-s margin-top-xs'>Conversa com os alunos no <a href=''>Discord</a></p>
          </div>
        </div>
     </div>
  );
}

export default Locations;
