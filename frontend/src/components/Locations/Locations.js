import universities from '../../Universities';

function Locations() {
  return (
     <div className='padding-xxl-xl text-center' id='locations'>
        <div>
          <h3 className='font-size-l'>Onde nos podes encontrar</h3>
        </div>
        <div className='display-flex-around width-70 margin-auto'>
          {universities.map((university) =>  (
                           <button key={university.id}>
                             {university.location}
                           </button>
          ))}
        </div>
     </div>
  );
}

export default Locations;
