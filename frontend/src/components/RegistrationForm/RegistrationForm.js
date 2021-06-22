import { useState, useEffect } from 'react';
import Select from 'react-select';
import CenteredModal from '../Modal/Modal';
import './RegistrationForm.css';
import { createCandidature, getUniversities } from '../../services/api';

function RegistrationForm() {

     /* Defaults */
     const [options, setOptions] = useState([]);
     const [selectedUniversity, setSelectedUniversity] = useState();
     const [firstName, setFirstName] = useState('');
     const [lastName, setLastName] = useState('');
     const [phoneNumber, setPhoneNumber] = useState('');
     const [email, setEmail] = useState('');
     const [showModal, setShowModal] = useState(false);
     const [modalTitle, setModalTitle] = useState('');
     const [modalDescription, setModalDescription] = useState('');
     const [isSuccessModal, setIsSuccessModal] = useState();


     useEffect(() => {
          
          getUniversities().then(result => { // Fetch only once, on render
          
               /* Populate select with universities */
               const options = [];

               for(var i = 0; i < result.data.length; i++) {
                    const option = {
                         value: result.data[i].name,
                         label: result.data[i].candidatureState === 'open' ? result.data[i].name : result.data[i].name + ' (candidaturas fechadas)',
                         isDisabled: result.data[i].candidatureState === 'open' ? false : true,
                    }
                    options.push(option);
               }
               setOptions([...options]);
          })
          
     }, [])

     /* Handle universities select change */
     const handleSelectChange = e => {
          if(e !== null)
               setSelectedUniversity(e.value);
          else
               setSelectedUniversity(null);
     } 

     /* Handle inputs change */
     const handleInputChange = (e, inputName) => {
          switch(inputName) {
               case 'firstName': 
                    setFirstName(e.target.value);
                    break;

               case 'lastName': 
                    setLastName(e.target.value);
                    break;

               case 'phoneNumber': 
                    setPhoneNumber(e.target.value);
                    break;

               case 'email': 
                    setEmail(e.target.value);
                    break;
                    
               default:
                    break;
          }
     }

     /* Handle form submit */
     const submitForm = e => {
          e.preventDefault();

          if(firstName.trim() === '' || lastName.trim() === '' || phoneNumber.trim() === '' || email.trim() === '' || selectedUniversity === null) {
               setModalTitle('Erro na submissão da candidatura');
               setModalDescription('Certifica-te que todos os campos estão preenchidos antes de submeter a tua candidatura.');
               setIsSuccessModal(false);
               setShowModal(true);
          }
          else {

               const candidature = {
                    "name": firstName,
                    "surname": lastName,
                    "mobile": phoneNumber,
                    "email": email,
                    "institution": selectedUniversity
               }

               createCandidature(candidature).then((res) => {

                    if(res.ok === true) {
                         setModalTitle('Candidatura submetida com sucesso');
                         setModalDescription('A candidatura foi submetida com sucesso. Entraremos em contacto contigo por email para seguires a evolução da tua candidatura.');
                         resetCandidature();
                         setIsSuccessModal(true);
                    }
                    else{
                         setModalTitle('Erro na submissão da candidatura');
                         setModalDescription('Certifica-te que todos os campos estão preenchidos antes de submeter a tua candidatura.');
                         setIsSuccessModal(false);
                    }
                    setShowModal(true);
               });
          }
     } 

     /* Reset candidature form fields */
     const resetCandidature = () => {
          setFirstName('');
          setLastName('');
          setPhoneNumber('');
          setEmail('');
     }

  return (
    <div className='padding-xxl-xl bg-candidature' id='candidate'>
         <div className='display-flex-center candidature-wrapper'>
               <div className='width-45 text-white candidature-section'>
                    <p className='font-size-xl font-semi-bold'>Candidata-te</p>
                    <p className='margin-top-s width-70 section-text font-size-s'>
                         Não esperes mais e junta-te a nós. Se quiseres fazer
                         parte da próxima edição do BrightStart, submete a tua
                         candidatura. 
                    </p>
               </div>
               <div className='width-45 candidature-section'>
                    <form id='candidature-form' autoComplete='false'>
                         <div className='display-flex-between input-wrapper'>
                              <input maxLength={35} value={firstName} onChange={(e) => handleInputChange(e, 'firstName')} className='width-45' placeholder='Nome' />
                              <input maxLength={35} value={lastName} onChange={(e) => handleInputChange(e, 'lastName')} className='width-45' placeholder='Apelido' />
                         </div>
                         <div className='display-flex-between input-wrapper'>
                              <input value={phoneNumber} onChange={(e) => handleInputChange(e, 'phoneNumber')} className='width-45' type='number' placeholder='Contacto móvel' />
                              <input value={email} onChange={(e) => handleInputChange(e, 'email')} className='width-45' type='email' placeholder='Email' />
                         </div>
                         <Select options={options} onChange={handleSelectChange} isSearchable={false} isClearable={true} className='margin-top-l'/>
                         <button onClick={submitForm} disabled={options.length === 0} className='margin-top-l'>Submeter candidatura</button>
                    </form>
               </div>
         </div>
         <CenteredModal  show={showModal} onHide={() => setShowModal(false)} title={modalTitle} description={modalDescription} isSuccess={isSuccessModal}/>
    </div>
    
  );
}

export default RegistrationForm;
