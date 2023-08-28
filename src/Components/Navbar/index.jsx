import { ShoppingBagIcon } from '@heroicons/react/24/solid'

import React from "react";
import { NavLink } from "react-router-dom";
import { useContext } from 'react';

import {  ShoppingCartContext } from '../../Context';

const Navbar = () => {
  const context = useContext(ShoppingCartContext)
   const  activeStyle = 'underline underline-offset-4'

  return (
    <nav className="flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light">
      <ul className="flex items-center gap-4">
        <li className="font-semibold text-lg">
          <NavLink 
          to="/" 
    >     
            Shopi
          </NavLink>
        </li>
        <li>
          <NavLink 
          to="/all"
          onClick={() => context.setSelectedCategory('')}

          className={({isActive}) =>
        
          isActive ? activeStyle:undefined
       }
          >
            All
          </NavLink>
        </li>
        <li>
          <NavLink 
          to="/men"
          onClick={() => context.setSelectedCategory("men's clothing")}

          className={({isActive}) =>
        
          isActive ? activeStyle:undefined
       }
          >
            Men Clothes

          </NavLink>
        </li>

        <li>
          <NavLink
           to="/electronics"
           onClick={() => context.setSelectedCategory('electronics')}
             
                      
           className={({isActive}) =>
        
           isActive ? activeStyle:undefined
        }
           >
            Electronics
          </NavLink>
        </li>
        <li>
          <NavLink
           to="/jewelery"
                 onClick={() => context.setSelectedCategory('jewelery')}
           className={({isActive}) =>
        
           isActive ? activeStyle:undefined
        }>
            Jewelery
          </NavLink>
          
        </li>
        <li>
          <NavLink to="/women"
onClick={() => context.setSelectedCategory("women's clothing")}

           className={({isActive}) =>
        
           isActive ? activeStyle:undefined
        }
          >
           Women
          </NavLink>
        </li>
        <li>
          <NavLink to="/others"
           className={({isActive}) =>
        
           isActive ? activeStyle:undefined
        }
          >
            Others
          </NavLink>
        </li>

      </ul>


      <ul className="flex items-center gap-3">
  <li>
   
  {context.isLogged && (
    <span className="text-black/60">{context.email}</span>          
    )}  </li>
            <li>
        <NavLink to="/my-orders" className={({ isActive }) => isActive ? activeStyle : undefined}>
          My Orders
        </NavLink>
        </li>
        <li>

        <NavLink to="/my-account" className={({ isActive }) => isActive ? activeStyle : undefined}>
          My Account
        </NavLink>
     
    
  </li>
  <li>
    <NavLink to="/sing-in" className={({ isActive }) => isActive ? activeStyle : undefined}>
      Sign In
    </NavLink>
  </li>
  <li className='flex items-center'>
    <NavLink to="/cart" className={({ isActive }) => isActive ? activeStyle : undefined}>
      <ShoppingBagIcon className="h-6 w-6 text-black" />
      {context.cartProducts.length}
    </NavLink>
  </li>
</ul>
    </nav>
  );
};

export default Navbar;