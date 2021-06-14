import Accordion from 'react-bootstrap/Accordion';
import AccordionContext from "react-bootstrap/AccordionContext";
import Card from 'react-bootstrap/Card'
import './FAQ.css';
import { useState, useEffect, useContext } from 'react';
import { getQuestions } from '../../services/api';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

function ContextAwareToggle({ children, eventKey, callback }) {
     const currentEventKey = useContext(AccordionContext);
   
     const decoratedOnClick = useAccordionToggle(
       eventKey,
       () => callback && callback(eventKey),
     );
   
     const isCurrentEventKey = currentEventKey === eventKey;
   
     return (
       <span
         type="button"
         /*style={{ backgroundColor: isCurrentEventKey ? 'lightgrey' : 'lightgrey' }}*/
         className= { isCurrentEventKey ? 'card-header font-semi-bold padding-s' : 'card-header padding-s'}
         onClick={decoratedOnClick}
       >
         {children}
       </span>
     );
   }

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
                                                  <ContextAwareToggle className='padding-s' as={Card.Header} onClick={() => console.log(question._id)} eventKey={question._id}>
                                                       <span className = 'font-size-s'>{question.question}</span>
                                                  </ContextAwareToggle>
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
