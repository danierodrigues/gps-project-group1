import { useState } from 'react';
import universities from '../../Universities';
import Select from 'react-select';
import './RegistrationForm.css';

function RegistrationForm() {

     /* Defaults */
     const options = [];
     const [selectedUniversity, setSelectedUniversity] = useState(null);
     const [firstName, setFirstName] = useState('');
     const [lastName, setLastName] = useState('');
     const [phoneNumber, setPhoneNumber] = useState('');
     const [email, setEmail] = useState('');
     
     /* Populate select with universities */
     for(var i = 0; i < universities.length; i++) {
          const university = {
               value: universities[i].id,
               label: universities[i].isOpen ? universities[i].name : universities[i].name + ' (candidaturas fechadas)',
               isDisabled: !universities[i].isOpen,
          }
          options.push(university);
     }

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
          
          const candidature = {
               'name': firstName,
               'surname': lastName,
               'mobile': phoneNumber,
               'email': email,
               'institution': selectedUniversity
          }
          console.log(candidature);
     } 

  return (
    <div className='padding-xxl-xl bg-candidature' id='candidate'>
         <div className='display-flex-center candidature-wrapper'>
               <div className='width-45 text-white candidature-section'>
                    <p className='font-size-xl font-semi-bold'>Candidata-te</p>
                    <p className='text-justify margin-top-s width-70 section-text font-size-s'>
                         Não esperes mais e junta-te a nós. Se quiseres fazer
                         parte da próxima edição do BrightStart, submete a tua
                         candidatura. 
                    </p>
               </div>
               <div className='width-45 candidature-section'>
                    <form autoComplete='false'>
                         <div className='display-flex-between input-wrapper'>
                              <input maxLength={35} onChange={(e) => handleInputChange(e, 'firstName')} className='width-45' placeholder='Nome' />
                              <input maxLength={35} onChange={(e) => handleInputChange(e, 'lastName')} className='width-45' placeholder='Apelido' />
                         </div>
                         <div className='display-flex-between input-wrapper'>
                              <input onChange={(e) => handleInputChange(e, 'phoneNumber')} className='width-45' type='number' placeholder='Contacto móvel' />
                              <input onChange={(e) => handleInputChange(e, 'email')} className='width-45' type='email' placeholder='Email' />
                         </div>
                         <Select options={options} onChange={handleSelectChange} isSearchable={false} isClearable={true} className='margin-top-l'/>
                         <button onClick={submitForm} className='margin-top-l'>Submeter candidatura</button>
                    </form>
               </div>
         </div>
         
         
          <form>

          </form>
    </div>
    
  );
}

export default RegistrationForm;
