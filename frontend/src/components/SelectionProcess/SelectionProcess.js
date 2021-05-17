import './SelectionProcess.css';

function SelectionProcess() {
  return (
     <div className='bg-primary text-white text-center padding-xxl-xl' id='selection'>
        <p className='font-size-l bold'>Processo de Seleção</p>
        <div className='display-flex-center margin-top-xl'>
          <div className='process-card'>
            <p className='font-size-xxxl font-semi-bold'>01</p>
            <p className='font-size-m font-semi-bold'>Dinamicas de Grupo</p>
            <p className='margin-auto margin-top-s width-45 font-size-s'>Interação  entre os candidatos focando no trabalho de grupo.</p>
          </div>
          <div className='process-card'>
            <p className='font-size-xxxl font-semi-bold'>02</p>
            <p className='font-size-m font-semi-bold'>Entrevista com um Manager</p>
            <p className='margin-auto margin-top-s width-45  font-size-s'>Conversa com um Manager da Deloitte sobre as tuas motivações.</p>
          </div>
          <div className='process-card'>
            <p className='font-size-xxxl font-semi-bold'>03</p>
            <p className='font-size-m font-semi-bold'>Entrevista com um Sócio</p>
            <p className='margin-auto margin-top-s width-45  font-size-s'>Conversa com um Sócio da Deloitte sobre a tua pessoa.</p>
          </div>
        </div>
     </div>
  );
}

export default SelectionProcess;