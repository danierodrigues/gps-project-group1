import './Advantages.css';
import advantagesItems from './AdvantagesItems';

function Advantages() {
   return(
      <div className='text-center padding-xxl-xl'>
            <div>
                <p className='font-size-l bold'>Porquê o BrightStart?</p>
            </div>
            <div className='margin-top-xxl'>
                <div className='display-flex-center'>
                    {advantagesItems.map((item) =>  (
                           <div key={item.id} className="itemDiv">
                              <img alt='Advantage item' className="imgAdvantages" src={item.image}/>
                              <h3 className='font-size-m font-semi-bold margin-top-s'>{item.title}</h3>
                              <p className='font-size-s width-50 margin-auto margin-top-s text-dark-grey'>{item.description}</p>
                           </div>
                     ))}
                </div>
            </div>
      </div>
   );
}

export default Advantages;