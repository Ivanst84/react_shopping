import Layout from "../../Components/Layout";
import React, { useState, useContext,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate

import { ShoppingCartContext } from '../../Context';
 function SignIn() {

  const context = useContext(ShoppingCartContext);
  const navigate = useNavigate(); // Obtén la función de navegación

  const [inputEmail, setInputEmail] = useState('');
  const [inputUsername, setInputUsername] = useState('');
  useEffect(() => {
    if (context.isLogged) {
      context.setSelectedCategory(''); // Reiniciar la categoría seleccionada
      // Redirigir al menú principal (/all)
      // Reemplaza con la ruta correcta si es diferente
    navigate('/all');
    }
  }, [context.isLogged]);
  return (
    <Layout>
      <div className="flex justify-center items-center h-screen">
        {!context.isLogged && !context.redirected ? (
          <div className="bg-white shadow-lg p-8 rounded-lg w-80">
            <h2 className="text-xl font-semibold mb-4">Sign In</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
                className="w-full border rounded-lg p-2 text-sm focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Username</label>
              <input
                type="text"
                value={inputUsername}
                onChange={(e) => setInputUsername(e.target.value)}
                className="w-full border rounded-lg p-2 text-sm focus:outline-none"
              />
            </div>
            <button
              onClick={() => context.handleSignIn(inputEmail, inputUsername)}
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Sign In
            </button>
          </div>
        ) : (
          <div className="bg-white shadow-lg p-8 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Welcome, {context.username}!</h2>
            <p>You are now logged in.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default SignIn;