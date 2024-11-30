/* eslint-disable react/prop-types */
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Fragment, useEffect, useState } from "react";
import "./product_section.css";
import { getCookie } from "../Navigation/utils";

const Product = ({ name, description, img, stars, price, sale, sessionID }) => {
  const [showNotification, setShowNotification] = useState(false);
  const hasSale = typeof sale === "number" && sale < price;

  const handleAddToCart = () => {
    setShowNotification(true);
  };

  const dismissNotification = () => {
    setShowNotification(false);
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
            <a onClick={handleAddToCart}>Add to Cart</a>
          </div>
          {showNotification && (
            <div className="notification">
              Item added to cart!
              <a onClick={dismissNotification}>Dismiss</a>
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
    fetch(`http://localhost:6969/api/v1/items/${selectedCategory}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [selectedCategory, filteredState, sortedState]);

  const productsWithEffectivePrice = products.map((product) => ({
    ...product,
    effectivePrice: product.sale !== undefined ? product.sale : product.price,
  }));

  let categorisedProducts = productsWithEffectivePrice.filter((product) => {
    if (!selectedCategory.includes(product.category)) {
      return false;
    }

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
        (a, b) => a.effectivePrice - b.effectivePrice
      );
    }
    if (sortedState === "price-des") {
      limitedProducts = [...limitedProducts].sort(
        (a, b) => b.effectivePrice - a.effectivePrice
      );
    }
    if (sortedState === "alphabetical") {
      limitedProducts = [...limitedProducts].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }
    if (sortedState === "alphabetical-rev") {
      limitedProducts = [...limitedProducts].sort((a, b) =>
        b.name.localeCompare(a.name)
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

  console.log(sessionID);

  return (
    <div className="product_section">
      <div className="product_grid">
        {limitedProducts.map((product) => (
          <Product
            key={product.id}
            name={product.name}
            description={product.description}
            img={product.image}
            stars={product.stars}
            price={product.price}
            sale={product.sale}
            sessionID={sessionID}
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
