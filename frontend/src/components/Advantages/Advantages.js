import './Advantages.css';
import advantagesItems from './AdvantagesItems';

function AdvantagesSection() {
   return(
      <div className='text-center padding-xxl-xl'>
            <div>
                <h3 className='font-size-l'>Porquê o BrightStart?</h3>
            </div>
            <div className='margin-top-xxl'>
                <div className='display-flex-center'>
                    {advantagesItems.map((item) =>  (
                           <div className="itemDiv">
                              <img alt='Advantage item' className="imgAdvantages" src={item.image}/>
                              <h3 className='font-size-m font-semi-bold margin-top-s'>{item.title}</h3>
                              <p className='font-size-s width-50 margin-auto margin-top-s'>{item.description}</p>
                           </div>
                     ))}
                </div>
            </div>
      </div>
   );
}

export default AdvantagesSection;