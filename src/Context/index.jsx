import { createContext,useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export const  ShoppingCartContext= createContext()

export const ShoppingCartProvider =({children})=>{
  const [isLogged, setIsLogged] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [redirected, setRedirected] = useState(false);

  const handleSignIn = (inputEmail, inputUsername) => {
    // Simulación de inicio de sesión

    if (inputEmail === 'ivan.sosatovar@gmail.com' && inputUsername === 'ivan') {
      setIsLogged(true);
      setEmail(inputEmail);
      setUsername(inputUsername);
      setRedirected(true);
    }
  };
   
    //Shopping cart -Increment quantity
    const[count,setCount] =useState(0);
    //Product Detail - Open/Close
    const openProductDetail =()=>setProductDetailOpen(true)
    const closeProductDetail =()=>setProductDetailOpen(false)
    const[isProductDetailOpen,setProductDetailOpen] =useState(false);

    //Prduct Detail-Show Product
    const[productToShow,setProductToShow] =useState({});
        //shopping Cart add products to cart

    const[cartProducts,setCartProduct] = useState([]);
       
     // shopping cart order
     const[order,setOrder] = useState([]);

     //Checkout side Menu
     const openCheckoutSideMenu =()=>setCheckoutSideMenuOpen(true)
     const closeCheckoutSideMenu =()=>setCheckoutSideMenuOpen(false)
     const[isCheckoutSideMenuOpen,setCheckoutSideMenuOpen] =useState(false);
     // Get products
    
     const[items,setItems] =useState(null);
     const[filteredItems,setFilteredItems] =useState(null);

     // get products by title
     const[searchByTitle,setSearchByTitle] =useState(null);
         //Get product by category
         const[searchByCategory,setSearchByCategory] =useState(null);

         const [selectedCategory, setSelectedCategory] = useState(""); 
  

     useEffect(() =>{
        fetch('https://fakestoreapi.com/products')          
       .then(response => response.json())
       .then(data=>setItems(data))
       },[])

       const filteredItemsByTitle = (items, searchByTitle) => {
        return items?.filter(
          item =>
            item.title &&
            item.title.toLowerCase().includes(searchByTitle.toLowerCase())
        );
      };
      const filteredItemsByCategory = (items, searchByCategory) => {
        return items?.filter(item => item.category.name.toLowerCase().includes(searchByCategory.toLowerCase()))
      }
    
      const filteredItemsBySelected=(items,selectedCategory) => {

        return items?.filter(

            item =>
            item.category &&
            item.category.toLowerCase().includes(selectedCategory.toLowerCase()) 
        );
      }
        
      const filterBy =(searchType,items,searchByTitle,searchByCategory,selectedCategory)=>{
       if(searchType === 'BY_TITLE'){
       return filteredItemsByTitle(items,searchByTitle)
       }
       if(searchType === 'BY_SELECTED_CATEGORY'){
        return filteredItemsBySelected(items,selectedCategory)
        }
       if(searchType==='BY_CATEGORY'){
         return filteredItemsByTitle(items,searchByCategory)
       }
       if (searchType === 'BY_TITLE_AND_CATEGORY') {
        return filteredItemsByCategory(items, selectedCategory).filter(item => item.title.toLowerCase().includes(searchByTitle.toLowerCase()))
      }
    
      if(!searchType){
        return items
      }
     }
     useEffect(() => {
        // Aplicar filtro por categoría seleccionada primero
        let itemsToDisplay = filterBy('BY_SELECTED_CATEGORY', items, searchByTitle, searchByCategory, selectedCategory);
    
        // Aplicar filtro por título si hay texto de búsqueda
        if (searchByTitle) {
          itemsToDisplay = filterBy('BY_TITLE', itemsToDisplay, searchByTitle, searchByCategory, selectedCategory);
        }
    
        // Actualizar el estado de los elementos filtrados
        setFilteredItems(itemsToDisplay);
      }, [items, searchByTitle, searchByCategory, selectedCategory]);
    console.log("Filtered Items after Filtering:", filteredItems);

     return(
    <ShoppingCartContext.Provider value={{
        count,
        setCount,
        openProductDetail,
        closeProductDetail,
        isProductDetailOpen,
        productToShow,
        setProductToShow,
        cartProducts,
        setCartProduct,
        isCheckoutSideMenuOpen,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        order,
        setOrder,
        items,
        setItems,
        searchByTitle,
        setSearchByTitle,
        filteredItems,
        setFilteredItems,
        searchByCategory,
        setSearchByCategory,
        selectedCategory,
        setSelectedCategory,
        isLogged,
        handleSignIn,
        email,
        setEmail,
        username,
        setUsername,
        redirected,
        setRedirected

    }}>

        {children}
    </ShoppingCartContext.Provider>
 )

}