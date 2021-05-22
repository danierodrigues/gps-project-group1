import { useState, useEffect } from 'react';
import { MdEmail } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';
import './Locations.css';
import { getUniversities } from '../../services/api';

function Locations() {

  const [universities, setUniversities] = useState([{}]);
  const [selectedUniversity, setSelectedUniversity] = useState({});

  useEffect(() => {
    getUniversities().then(result => { // Fetch only once, on render
      setUniversities([...result.data]);
      setSelectedUniversity({...result.data[0]});
    })
  }, [])

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
            universities[0]._id !== undefined ?

              universities.map((university) => 
                {
                  var className = '';

                  if(selectedUniversity._id === university._id)
                    className = 'university-number';
                    
                  else
                    className = 'university-number not-selected';
                  
                  return(
                    <button key={university._id} onClick={() => changeUniversity(university)} className={className}>
                      {university.location}
                    </button>
                  )
                }
              )

            :

              <p>Infelizmente, não foi possível encontrar universidades. Por favor, tente mais tarde.</p>
          }
        </div>

          {
            universities[0]._id !== undefined ?

              <div className='display-flex-around width-90 margin-auto'>
                <div className='width-35 display-flex video-wrapper'>
                  <video className='vertical-align' controls>
                    <source src={selectedUniversity.presentationVideoPath} type='video/mp4' />
                  </video>
                </div>
                <div className='text-left university-info'>
                    <h3 className='font-size-xl font-semi-bold'>{selectedUniversity.location}</h3>
                    <p className='font-size-s margin-top-s text-dark-grey'><span className='icon-wrapper'><MdEmail /></span>{selectedUniversity.email}</p>
                    <p className='font-size-s margin-top-xs text-dark-grey'><span className='icon-wrapper'><FaPhoneAlt /></span>{selectedUniversity.phone}</p>
                    <p className='font-size-s margin-top-xs text-dark-grey'>Conversa com os alunos no <a href=''>Discord</a></p>
                </div>
              </div>
            :
            <div />
          }
     </div>
  );
}

export default Locations;
