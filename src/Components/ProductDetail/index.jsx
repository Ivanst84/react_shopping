
/*Aqui esta la logica de detalle de producto de lado izquierdo */
import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';
import { useContext } from 'react';
import './style.css';

const ProductDetail = () => {
  const context = useContext(ShoppingCartContext);
  const isProductDetailOpen = context.isProductDetailOpen;

  if (!isProductDetailOpen) {
    return null; // No renderizar si el detalle no está abierto
  }


  return (
    <aside className=' product-detail product-detail-open fixed right-0 top-0 bg-white border border-black rounded-lg p-2' style={{ marginTop: '80px' }}>
      <div className='flex justify-end p-2'>
        <button
          onClick={() => context.closeProductDetail()}
          className='text-gray-500 hover:text-black focus:outline-none'
        >
          <XMarkIcon className='h-6 w-6' />
        </button>
      </div>
      <figure className='px-6'>
        <img
          className='w-full max-h-60 rounded-lg' // Ajustar el tamaño máximo de la imagen
          src={context.productToShow.image}
          alt={context.productToShow.title}
        />
        <div className='flex flex-col text-xs mt-1'>
          <span className='font-medium text-2xl'>${context.productToShow.price}</span>
          <div className='mt-2 max-w-220px'>
            <span className='font-medium text-md'>{context.productToShow.title}</span>
          </div>
          <div className='mt-1 max-w-220px'>
            <span className='font-medium text-sm'>{context.productToShow.description}</span>
          </div>
       
        </div>
      </figure>
    </aside>
  );
};

export default ProductDetail;