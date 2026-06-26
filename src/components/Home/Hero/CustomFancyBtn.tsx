import { ShoppingBagIcon } from '@heroicons/react/solid';

type FancyButton = {
  text:string,
  customStyle?:string
}

function CustomFancyBtn({text="Buy Now",customStyle="w-40"}:FancyButton) {
  return (
    <div
          data-aos="zoom-in"
          data-aos-delay="400"
          className="aos-init aos-animate"
        >
         
          <button className={`before:ease flex justify-center items-center bg-[#afc946] ${customStyle} text-[17px] relative h-full py-2 overflow-hidden  shadow-2xl before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-blue-900 before:transition-all before:duration-300 hover:text-white hover:shadow-black hover:before:-rotate-180`}>
            <ShoppingBagIcon className="w-[1.2rem] relative z-10 h-[1.2rem] text-white"/>
            <span className="relative z-10 text-sm text-white">{text}</span>
          </button>
        </div>
  );
}

export default CustomFancyBtn;
