import React, { useContext } from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/frontend_assets/assets";
import StoreContext from "../../context/create_storeContex.jsx";

const ExploreMenu = ({category,setCategory}) => {
  const { categories } = useContext(StoreContext);

  const getCategoryImage = (categoryName) => {
    const menuItem = menu_list.find(item => item.menu_name.toLowerCase() === categoryName.toLowerCase());
    return menuItem ? menuItem.menu_image : menu_list[0].menu_image;
  };

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a detectable array of dishes. Our
        mission is to satisfy your cravings and elevate your dining experience,
        one delicious meal at a time.
      </p>
      <div className="explore-menu-list">
        {categories.map((cat, index) => {
          return (
            <div onClick={()=>setCategory(prev=>prev===cat?"All":cat)} key={index} className="explore-menu-list-item">
              <img className={category===cat?"active":""} src={getCategoryImage(cat)} alt={cat} />
              <p>{cat}</p>
            </div>
          );
        })}
      </div>
      <hr/>
    </div>
  );
};

export default ExploreMenu;
