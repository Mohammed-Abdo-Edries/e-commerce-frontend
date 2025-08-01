import {RiExchangeFundsFill} from 'react-icons/ri'
import {TbFreeRights} from 'react-icons/tb'
import { BsHeadset } from 'react-icons/bs';
const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base">
      <div>
        <RiExchangeFundsFill className="text-5xl m-auto mb-5" />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-400">We Offer hassle free exchange policy</p>
      </div>
      <div>
        <TbFreeRights className="text-5xl m-auto mb-5" />
        <p className="font-semibold">7 Days Return Policy</p>
        <p className="text-gray-400">We provide 7 days free return policy</p>
      </div>
      <div>
        <BsHeadset className="text-5xl m-auto mb-5" />
        <p className="font-semibold">Best customer ssupport</p>
        <p className="text-gray-400">We Provides 24/7 customer support</p>
      </div>
    </div>
  );
};
export default OurPolicy;
