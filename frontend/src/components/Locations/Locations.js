import { useState, useEffect, useLayoutEffect } from 'react';
import { MdEmail } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';
import './Locations.css';
import { getUniversities } from '../../services/api';

function Locations() {

  const [backendURL, setBackendURL] = useState();
  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState({});

  const verifyVideos = () => {

    var video = document.getElementById('institution-video');
    /*var videoError = document.getElementById('institution-video-error');*/
    var videoWrapper = document.getElementById('video-wrapper');
    var universityInfo = document.getElementById('university-info');

    if(video) {
      if(isNaN(video.duration)) {
        /*video.style = 'display: none';
        videoError.style = 'display: block';
        videoError.style = 'display: flex; flex-direction: column; justify-content: center; width: 100%';*/
        videoWrapper.style = 'display: none';
        universityInfo.style = 'text-align: center';

      }
      else {
        /*video.style = 'display: block';
        videoError.style = 'display: none';*/
        videoWrapper.style = 'display: block';
        universityInfo.style = 'text-align: left';
      }
    }
  }

  useEffect(() => {
    getUniversities().then(result => { // Fetch only once, on render
      setBackendURL(result.backendURL);
      setUniversities([...result.data]);
      setSelectedUniversity({...result.data[0]});
      verifyVideos();
    })
  }, [])

  useLayoutEffect(() => {
      verifyVideos();
  }, [selectedUniversity])


  /* Handle the university change */
  const changeUniversity = (university) => {
    setSelectedUniversity(university);
    verifyVideos();
    ;
  }

  return (
     <div className='padding-xxl-xl text-center bg-light-grey' id='locations'>
        <div>
          <h3 className='font-size-l bold'>Onde nos podes encontrar</h3>
        </div>
        <div className='display-flex-around width-70 margin-auto margin-top-xxl buttons-wrapper'>
          {
            universities.length !== 0 ?

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

              <div>Infelizmente, não foi possível encontrar universidades. Por favor, tente mais tarde.</div>
          }
        </div>

          {
            universities.length !== 0 ?

              <div className='display-flex-around width-90 margin-auto'>
                <div id='video-wrapper' className='width-50 display-flex video-wrapper'>
                  <video id='institution-video' src={backendURL + selectedUniversity.presentationVideoPath} controls type='video/mp4'/>                 
                </div>
                <div id='university-info' className='text-left university-info'>
                    <h3 className='font-size-xl font-semi-bold'>{selectedUniversity.location}</h3>
                    <p className='font-size-s margin-top-s text-dark-grey'><span className='icon-wrapper'><MdEmail /></span>{selectedUniversity.email}</p>
                    <p className='font-size-s margin-top-xs text-dark-grey'><span className='icon-wrapper'><FaPhoneAlt /></span>{selectedUniversity.phone}</p>
                    <p className='font-size-s margin-top-xs text-dark-grey'>Conversa com os alunos no <span> </span>
                      <a href='https://discord.gg/RhZ94De5Uc' target='_blank' rel='noreferrer'>Discord</a>
                    </p>
                </div>
              </div>
            :
            <div />
          }
     </div>
  );
}

export default Locations;
