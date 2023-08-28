import { useState } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
// cards de my ordesn ya compradas
const OrdersCard = (props) => {
  const { totalPrice, totalProducts } = props;

  const [colorIndex, setColorIndex] = useState(0);

  const backgroundColors = [
    'bg-blue-200',
    'bg-green-200',
    'bg-yellow-200',
    'bg-pink-200',
    'bg-purple-200',
  ];

  const selectedBackgroundColor = backgroundColors[colorIndex % backgroundColors.length];

  const handleColorChange = () => {
    setColorIndex((prevIndex) => (prevIndex + 1) % backgroundColors.length);
  };

  return (
    <div
      className={`flex justify-between items-center mb-3 border rounded-lg p-4 w-80 ${selectedBackgroundColor}`}
      onClick={handleColorChange}
    >
      <div className='flex justify-between w-full'>
        <p className='flex flex-col'>
          <span className='font-light'>01.02.23</span>
          <span className='font-light'>{totalProducts} articles</span>
        </p>
        <p className='flex items-center gap-2'>
          <span className='font-medium text-2xl'>${totalPrice}</span>
          <ChevronRightIcon className='h-6 w-6 text-black cursor-pointer' />
        </p>
      </div>
    </div>
  );
};

export default OrdersCard;