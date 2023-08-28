import React, { useContext, useEffect } from "react";
import Card from "../../Components/Card";
import Layout from "../../Components/Layout";
import ProductDetail from "../../Components/ProductDetail";
import { ShoppingCartContext } from "../../Context";
import { useParams, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const context = useContext(ShoppingCartContext);
  useEffect(() => {
   // Verifica que el contexto esté disponible
      if (categoryName) {
        console.log("Category Name from URL:", categoryName);
        context.setSelectedCategory(categoryName);
        context.setSearchByTitle('');      }
    
  }, [categoryName, context]);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    context.setSelectedCategory(selectedCategory);
    const categoryPath = `/${selectedCategory}`;
    navigate(categoryPath);
  };
     const renderView = () => {
      if (context.filteredItems?.length > 0) {
        return (
          context.filteredItems?.map(item => (
            <Card key={item.id} data={item} />
          ))
        )
      } else {
        return (
          <div>We don't have anything :(</div>
        )
      }
    }
  
  
  
  
  /* trabajando con input, he envuelto tanto
   el select como el input en un contenedor 
   div con la clase border rounded-lg p-2
    para crear un efecto de contenedor similar.
     He utilizado flex para posicionarlos uno al lado del otro. 
     También he ajustado los anchos (w-1/2 y flex-grow) 
     para queambos elementos ocupen el mismo espacio y
    se vean como uno solo*/
  return (
    <Layout>
    <div className="flex items-center w-50 mb-8">
      <div className="w-full">
        <div className="flex items-center border rounded-lg p-2">
          <div className="w-1/2 mr-2">
            <h2 className="font-medium text-xl mb-2">Select category</h2>
            <select
              value={context.selectedCategory}
              onChange={handleCategoryChange}
              className="w-full rounded-lg border p-2 text-sm focus:outline-none"
            >
          <option value="">Select category</option>
          {context.items &&
            context.items.length > 0 &&
            [...new Set(context.items.map((item) => item.category))].map(
              (category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              )
            )}
        </select>
        </div>
        <div className="flex-grow">
          <h2 className="font-medium text-xl mb-2">Search a product</h2>
          <input
            type="text"
            placeholder="Search a product"
            className="rounded-lg border p-2 text-sm w-full focus:outline-none"
            onChange={(event) => context.setSearchByTitle(event.target.value)}
          />
        </div>
      </div>
    </div>
  </div>

  <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 w-full max-w-screen-lg">
    {renderView()}
  </div>
</Layout>
  );
}

export default Home;