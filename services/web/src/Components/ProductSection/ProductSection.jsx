/* eslint-disable react/prop-types */
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Fragment, useEffect, useState } from "react";
import "./product_section.css";

const addToFavorites = async (data, sessionId) => {
  const response = await fetch("http://localhost:6969/api/v1/items/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  return response.json();
};

const removeFromFavorites = async (data, sessionId) => {
  const response = await fetch("http://localhost:6969/api/v1/items/favorites", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  return response.json();
};

const Product = ({
  name,
  description,
  img,
  stars,
  price,
  sale,
  sessionID,
  productID,
  selectedCategory,
  removeProductFromList,
}) => {
  const [buttonText, setButtonText] = useState(
    selectedCategory === "favorites"
      ? "Remove from Favorites"
      : "Add to Favorites",
  );
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const hasSale = typeof sale === "number" && sale < price;

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const handleAddToCart = async () => {
    setButtonText("Adding...");
    setIsButtonDisabled(true);

    try {
      const data = { item_id: productID };
      await addToFavorites(data, sessionID);

      setButtonText("Added to Favorites!");
      setNotificationMessage(`${name} successfully added to favorites!`);
      setShowNotification(true);

      setTimeout(() => {
        setButtonText("Remove from Favorites");
        setIsButtonDisabled(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to add to favorites:", error);
      setButtonText("Add to Favorites");
      setIsButtonDisabled(false);
    }
  };

  const handleRemoveFromCart = async () => {
    setButtonText("Removing...");
    setIsButtonDisabled(true);

    try {
      const data = { item_id: productID };
      await removeFromFavorites(data, sessionID);

      setButtonText("Removed!");
      setNotificationMessage(`${name} successfully removed from favorites!`);
      setShowNotification(true);

      setTimeout(() => {
        removeProductFromList(productID);
      }, 3000);
    } catch (error) {
      console.error("Failed to remove from favorites:", error);
      setButtonText("Remove from Favorites");
      setIsButtonDisabled(false);
    }
  };

  return (
    <div className="product_box">
      <div className="product_img">
        <img src={img} alt={name} />
      </div>
      <div className="product_name">
        <p>{name}</p>
      </div>
      <div className="product_description">
        <p>{description}</p>
      </div>
      <div className="product_stars">
        <Stars count={stars} />
      </div>
      <div className={`product_price ${hasSale ? "sale" : ""}`}>
        {hasSale && (
          <>
            <p className="discounted_price">${sale}</p>
            <p className="original_price">${price}</p>
          </>
        )}
        {!hasSale && <p>${price}</p>}
      </div>
      {sessionID && (
        <Fragment>
          <div className="buy_btn">
            <button
              onClick={
                selectedCategory === "favorites"
                  ? handleRemoveFromCart
                  : handleAddToCart
              }
              disabled={isButtonDisabled}
              className={isButtonDisabled ? "disabled" : ""}
            >
              {selectedCategory === "favorites"
                ? buttonText
                : "Add to Favorites"}
            </button>
          </div>
          {showNotification && (
            <div className="toast">
              <span>{notificationMessage}</span>
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default Product;

const Stars = ({ count }) => {
  const filledStars = Array.from({ length: count }, (_, index) => (
    <span key={index} className="star filled">
      <AiFillStar />
    </span>
  ));

  const emptyStars = Array.from({ length: 5 - count }, (_, index) => (
    <span key={index} className="star empty">
      <AiOutlineStar />
    </span>
  ));

  return (
    <div className="stars">
      {filledStars}
      {emptyStars}
    </div>
  );
};

export const ProductSection = ({
  selectedCategory,
  filteredState,
  sortedState,
  sessionID,
}) => {
  const [products, setProducts] = useState([]);
  const [productsToShow, setProductsToShow] = useState(20);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://localhost:6969/api/v1/items/${selectedCategory}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Cookie:
                selectedCategory === "favorites"
                  ? `SessionID=${sessionID}`
                  : "same-origin",
            },
            credentials: "include",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const removeProductFromList = (productID) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== productID),
    );
  };

  const productsWithEffectivePrice = products.map((product) => ({
    ...product,
    effectivePrice: product.sale !== undefined ? product.sale : product.price,
  }));

  let categorisedProducts = productsWithEffectivePrice.filter((product) => {
    if (filteredState.color && product.color !== filteredState.color) {
      return false;
    }

    if (
      filteredState.minPrice &&
      product.effectivePrice < filteredState.minPrice
    ) {
      return false;
    }

    if (
      filteredState.maxPrice &&
      product.effectivePrice > filteredState.maxPrice
    ) {
      return false;
    }

    return true;
  });

  let limitedProducts = categorisedProducts.slice(0, productsToShow);

  if (sortedState) {
    if (sortedState === "price-asc") {
      limitedProducts = [...limitedProducts].sort(
        (a, b) => a.effectivePrice - b.effectivePrice,
      );
    }
    if (sortedState === "price-des") {
      limitedProducts = [...limitedProducts].sort(
        (a, b) => b.effectivePrice - a.effectivePrice,
      );
    }
    if (sortedState === "alphabetical") {
      limitedProducts = [...limitedProducts].sort((a, b) =>
        a.name.localeCompare(b.name),
      );
    }
    if (sortedState === "alphabetical-rev") {
      limitedProducts = [...limitedProducts].sort((a, b) =>
        b.name.localeCompare(a.name),
      );
    }
  }

  const handleLoadMore = () => {
    setProductsToShow((prevProductsToShow) => prevProductsToShow + 5);
  };

  if (limitedProducts.length === 0) {
    return (
      <div className="product_section no_products">
        <h1>No products are available for the selected filters</h1>
      </div>
    );
  }

  return (
    <div className="product_section">
      <div className="product_grid">
        {limitedProducts.map((product) => (
          <Product
            key={product._id}
            name={product.name}
            description={product.description}
            img={product.image}
            stars={product.stars}
            price={product.price}
            sale={product.sale}
            sessionID={sessionID}
            selectedCategory={selectedCategory}
            productID={product._id}
            removeProductFromList={removeProductFromList}
          />
        ))}
      </div>
      {productsToShow < categorisedProducts.length && (
        <div className="load_more">
          <button onClick={handleLoadMore}>Load More</button>
        </div>
      )}
    </div>
  );
};
