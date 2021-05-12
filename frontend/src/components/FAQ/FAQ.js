import questions from './QuestionsItems';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import './FAQ.css';

function FAQ() {
     return (
          
          <div className='padding-xxl-xl' id='faq'>
               <p className='font-size-l bold text-center margin-bottom-xxl'>Perguntas Frequentes</p>
               <Accordion defaultActiveKey='0'>
                    {
                         questions.map((question) => 
                              {
                                   return(

                                        <Card className='cursor-pointer margin-bottom-s margin-auto faq-card'>
                                             <Accordion.Toggle className='padding-s' as={Card.Header} eventKey={question.id}>
                                                  {question.question}
                                             </Accordion.Toggle>
                                             <Accordion.Collapse eventKey={question.id}>
                                             <Card.Body>{question.response}</Card.Body>
                                             </Accordion.Collapse>
                                        </Card>
                                   )
                              }
                         )
                    }
               </Accordion>
          </div>
     );
}

export default FAQ;
