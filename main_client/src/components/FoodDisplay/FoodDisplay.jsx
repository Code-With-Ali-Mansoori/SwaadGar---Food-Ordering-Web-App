import React, { useContext, useState, useEffect, useMemo } from "react";
import "./FoodDisplay.css";
import StoreContext from "../../context/create_storeContex.jsx";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  
  const { food_list } = useContext(StoreContext);
  const [screenSize, setScreenSize] = useState('pc');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setScreenSize('mobile');
      } else if (window.innerWidth < 1024) {
        setScreenSize('tablet');
      } else {
        setScreenSize('pc');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const displayList = useMemo(() => {
    const filtered = food_list.filter((item) => {
      const itemCategory = item.dish_category?.toLowerCase().trim();
      const currentCategory = category?.toLowerCase().trim();
      return currentCategory === "all" || currentCategory === itemCategory;
    });
    
    if (category?.toLowerCase().trim() === "all") {
      const limit = screenSize === 'pc' ? 8 : 5;
      return filtered.slice(0, limit);
    }
    
    return filtered;
  }, [category, screenSize, food_list]);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {displayList.map((item, index) => (
          <FoodItem
            key={index}
            id={item._id}
            name={item.dish_name}
            description={item.dish_description}
            price={item.amount}
            image={item.dish_img}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
