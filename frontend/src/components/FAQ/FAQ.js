import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import './FAQ.css';
import { useState, useEffect } from 'react';
import { getQuestions } from '../../services/api';

function FAQ() {

     const [questions, setQuestions] = useState([]);

     useEffect(() => {
          getQuestions().then(result => { // Fetch only once, on render
               setQuestions([...result.data]);
          })
     }, [])

     return (
          
          <div className='padding-xxl-xl' id='faq'>
               <p className='font-size-l bold text-center margin-bottom-xxl'>Perguntas Frequentes</p>
               <Accordion defaultActiveKey='0'>
                    {
                         questions.length !== 0 ? 

                              questions.map((question) => 
                                   {
                                        return(
                                             <Card key={question._id} className='cursor-pointer margin-bottom-s margin-auto faq-card'>
                                                  <Accordion.Toggle className='padding-s' as={Card.Header} eventKey={question._id}>
                                                       {question.question}
                                                  </Accordion.Toggle>
                                                  <Accordion.Collapse eventKey={question._id}>
                                                  <Card.Body>{question.answer}</Card.Body>
                                                  </Accordion.Collapse>
                                             </Card>
                                        )
                                   }
                              )

                              :

                              <p className='text-center'>Infelizmente, não foi possível encontrar perguntas frequentes. Por favor, tente mais tarde.</p>
                    }
               </Accordion>
          </div>
     );
}

export default FAQ;
