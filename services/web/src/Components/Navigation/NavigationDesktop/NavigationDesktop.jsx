/* eslint-disable react/prop-types */
import "./navigation_desktop.css";
import logo from "../../../Assets/logo.png";
import { useEffect } from "react";
import { useState } from "react";
import { getCookie, logoutUser } from "../utils";
//todo add check if session to not show login register and show logout

const CategoryLink = ({ category, description, onClick }) => (
  <li
    className="category_option_desk"
    onClick={() => onClick(category, description)}
  >
    <a>{category.toUpperCase()}</a>
  </li>
);

export const NavigationDesktop = ({ onCategoryClick, sessionID }) => {
  const handleCategoryClick = (category, description) => {
    onCategoryClick(category, description);
  };

  return (
    <div className="navigation_desk">
      <div className="logo_desk">
        <a href="/">
          <img src={logo} />
        </a>
      </div>
      <div className="category_desk">
        <ul>
          <CategoryLink
            onClick={handleCategoryClick}
            category="shoes"
            description="The shoe category refers to a wide range of footwear products designed to be worn on the feet for various purposes. Shoes are essential accessories that provide protection, support, and comfort during daily activities and special occasions. They come in diverse styles, designs, and materials, catering to different needs and fashion preferences."
          />
          <CategoryLink
            onClick={handleCategoryClick}
            category="clothes"
            description="The clothing category encompasses a diverse array of garments designed to be worn on the body for various purposes and occasions. Clothes are fundamental articles that not only serve to cover and protect the body but also express individuality, style, and cultural identity. They play a significant role in reflecting personal tastes, fashion trends, and societal norms."
          />
          <CategoryLink
            onClick={handleCategoryClick}
            category="accessories"
            description="The category of accessories encompasses a wide array of supplemental items and adornments that enhance and complete one's overall appearance and functionality. From subtle accents to bold statement pieces, accessories play a vital role in adding flair, personal style, and utility to different outfits and settings."
          />
          <CategoryLink
            onClick={handleCategoryClick}
            category="slippers"
            description="Slippers are a delightful category of footwear, cherished for their comfort, warmth, and cozy appeal. These soft, lightweight shoes are specifically designed for indoor use, providing a gentle and soothing experience for tired feet after a long day of work or activities. Slippers are an essential part of relaxing at home, offering a perfect blend of functionality and comfort."
          />
          <CategoryLink
            onClick={handleCategoryClick}
            category="hats"
            description="Hats are an iconic and timeless category of headwear that not only serve practical purposes but also make a bold fashion statement. From shielding us from the elements to elevating our style, hats have been an integral part of human culture for centuries, transcending trends and fads."
          />
          <CategoryLink
            onClick={handleCategoryClick}
            category="limited"
            description="Limited edition items are unique and exclusive products that are produced in restricted quantities, making them highly sought after and prized by collectors and enthusiasts alike. These special creations are meticulously crafted to showcase exceptional quality, design, and attention to detail, setting them apart from their mass-produced counterparts."
          />
          {/* todo add a check if there is session todo pass inside the category */}
          {/* the id of the user to directly pass it to the backend */}
          <CategoryLink
            onClick={handleCategoryClick}
            category="favorites"
            description="Show favorites"
          />
          {/* Other CategoryLink components */}
          {sessionID ? (
            <>
              <CategoryLink
                onClick={handleCategoryClick}
                category="favorites"
                description="Show favorites"
              />
              <li className="category_option_desk">
                <a
                  href=""
                  onClick={() => {
                    logoutUser(sessionID);
                  }}
                >
                  LOGOUT
                </a>
              </li>
            </>
          ) : (
            <>
              <li className="category_option_desk">
                <a href="/register">REGISTER</a>
              </li>
              <li className="category_option_desk">
                <a href="/login">LOGIN</a>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
