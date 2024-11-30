/* eslint-disable react/prop-types */
import "./category.css";
import shoe from "../../Assets/CategoryImg/shoe.webp";
import clothes from "../../Assets/CategoryImg/clothes.png";
import accessories from "../../Assets/CategoryImg/accessories.png";
import slippers from "../../Assets/CategoryImg/slippers.png";
import hats from "../../Assets/CategoryImg/hats.png";
import limited from "../../Assets/CategoryImg/limited.webp";

const CategoryIcon = ({ img, category, description, onClick }) => (
  <div
    className="category_option"
    onClick={() => onClick(category, description)}
  >
    <img src={img} alt={category} />
    <p>{category.toUpperCase()}</p>
  </div>
);

export const Category = ({ onCategoryClick }) => {
  const handleCategoryClick = (category, description) => {
    onCategoryClick(category, description);
  };

  return (
    <div className="category_menu">
      <CategoryIcon
        onClick={handleCategoryClick}
        img={shoe}
        category="shoes"
        description="The shoe category refers to a wide range of footwear products designed to be worn on the feet for various purposes. Shoes are essential accessories that provide protection, support, and comfort during daily activities and special occasions. They come in diverse styles, designs, and materials, catering to different needs and fashion preferences."
      />
      <CategoryIcon
        onClick={handleCategoryClick}
        img={clothes}
        category="clothes"
        description="The clothing category encompasses a diverse array of garments designed to be worn on the body for various purposes and occasions. Clothes are fundamental articles that not only serve to cover and protect the body but also express individuality, style, and cultural identity. They play a significant role in reflecting personal tastes, fashion trends, and societal norms."
      />
      <CategoryIcon
        onClick={handleCategoryClick}
        img={accessories}
        category="accessories"
        description="The category of accessories encompasses a wide array of supplemental items and adornments that enhance and complete one's overall appearance and functionality. From subtle accents to bold statement pieces, accessories play a vital role in adding flair, personal style, and utility to different outfits and settings."
      />
      <CategoryIcon
        onClick={handleCategoryClick}
        img={slippers}
        category="slippers"
        description="Slippers are a delightful category of footwear, cherished for their comfort, warmth, and cozy appeal. These soft, lightweight shoes are specifically designed for indoor use, providing a gentle and soothing experience for tired feet after a long day of work or activities. Slippers are an essential part of relaxing at home, offering a perfect blend of functionality and comfort."
      />
      <CategoryIcon
        onClick={handleCategoryClick}
        img={hats}
        category="hats"
        description="Hats are an iconic and timeless category of headwear that not only serve practical purposes but also make a bold fashion statement. From shielding us from the elements to elevating our style, hats have been an integral part of human culture for centuries, transcending trends and fads."
      />
      <CategoryIcon
        onClick={handleCategoryClick}
        img={limited}
        category="limited"
        description="Limited edition items are unique and exclusive products that are produced in restricted quantities, making them highly sought after and prized by collectors and enthusiasts alike. These special creations are meticulously crafted to showcase exceptional quality, design, and attention to detail, setting them apart from their mass-produced counterparts."
      />
      <CategoryIcon
        onClick={handleCategoryClick}
        img={limited}
        category="favorites"
        description="This section shows items that you have favorited"
      />
    </div>
  );
};
