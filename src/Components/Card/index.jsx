import React from 'react';
import { useContext } from 'react';
import {  ShoppingCartContext } from '../../Context';
import { PlusIcon,CheckIcon } from '@heroicons/react/24/solid'

const Card = (data) => {
    const context = useContext( ShoppingCartContext)
    const showProduct = (productDetail)=>{
        context.openProductDetail()
        context.setProductToShow(productDetail)
    }
         const addProductsToCart=(event,productData)=>{
            event.stopPropagation()
            context.setCount(context.count+1)
              context.setCartProduct([...context.cartProducts,productData])
            context.openCheckoutSideMenu()
            context.closeProductDetail()
            
            
            
                }

                const renderIcon=(id)=>{

                  const isInCart= context.cartProducts.filter(product => product.id ===id).length>0
                  if(isInCart){

                   return(
                      <div
                      className="absolute top-0 right-0 flex justify-center items-center
                       bg-white/60 rounded-lg
                        text-black p-2 rounded-full 
                        transform translate-x-1/2 -translate-y-1/2"
                       >
                           <CheckIcon className="h-6 w-6 text-black" ></CheckIcon>
             
                     </div>
                    )
                  } else{ 
                    return(
                    <div
                    className="absolute top-0 right-0 flex justify-center items-center
                     bg-white/60 rounded-lg
                      text-black p-2 rounded-full 
                      transform translate-x-1/2 -translate-y-1/2"
                      onClick={(event)=>addProductsToCart(event,data.data)}
                     >
                         <PlusIcon    className="h-6 w-6 text-black" ></PlusIcon>
           
                   </div>

                                  )
                  } 
                }
  return (
    <div 
    className="bg-white cursor-pointer w-50 h-65 rounded-bg"
    onClick={()=>showProduct(data.data)}>
        
      <figure className="relative mb-2 h-4/5">
        <span className="absolute bottom-0 left-0 bg-blue-500 text-white text-xs m-2 rounded-md text-sm font-semibold">{data.data.category}</span>
        <img
    className="w-full h-full object-cover rounded-lg opacity-100"
    src={data.data.image}
          alt="Producto"
        />
        {renderIcon(data.data.id)}
      </figure>
      <p className="mt-2">
        <span className="block text-lg font-light truncate">{data.data.title}</span>
        <span className="block text-lg font-medium">${data.data.price}</span>
      </p>
    </div>
  );
};


export default Card;
