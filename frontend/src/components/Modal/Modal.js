import Modal from 'react-bootstrap/Modal';
import success from '../../images/success.svg';
import error from '../../images/error.svg';
import './Modal.css';

function CenteredModal(props) {

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
        <Modal.Header closeButton />
      <Modal.Body>
        <p>
          
          {props.isSuccess ? <div><img className='modal-icon' alt='Success icon' src={success} /></div> : <div><img className='modal-icon' alt='Error icon' src={error} /></div>}
          <p className='font-size-m text-center font-semi-bold'>{props.title}</p>
          <p className='font-size-s text-center'>{props.description}</p>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={props.onHide}>Fechar</button>
      </Modal.Footer>
    </Modal>
  );
}

export default CenteredModal;