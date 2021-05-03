import './AdvantagesSection.css';
import advantages from './Advantages';

function AdvantagesSection() {
   return(
      <div className='text-center'>
            <div className="titleContainer">
                <h3 className="--size-l">Porquê o BrightStart?</h3>
            </div>
            <div className="totalWidht containerFlexBox">
                <div className="display-flex-center flexboxAlign margin-auto">
                    {advantages.map((item) =>  (
                           <div className="itemDiv">
                               <img className="imgAdvantages" src={item.image}/>
                               <h3 className="--size-m">{item.title}</h3>
                                <span className="--size-s">{item.description}</span>
                           </div>
                     ))}
                </div>
            </div>
      </div>
   );
}

export default AdvantagesSection;