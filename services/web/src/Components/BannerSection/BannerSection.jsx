import React, { useEffect } from "react";
import "./banner_section.css";
import slide1 from "../../Assets/SliderImg/slide1.webp";
import slide2 from "../../Assets/SliderImg/slide2.webp";
import slide3 from "../../Assets/SliderImg/slide3.webp";

export const BannerSection = () => {
  useEffect(() => {
    let counter = 1;
    const interval = setInterval(() => {
      document.getElementById("radio" + counter).checked = true;
      counter++;
      if (counter > 4) {
        counter = 1;
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="banner_section">
      <div className="slider">
        <div className="slides">
          <input type="radio" name="radio-btn" id="radio1" />
          <input type="radio" name="radio-btn" id="radio2" />
          <input type="radio" name="radio-btn" id="radio3" />
          <input type="radio" name="radio-btn" id="radio4" />

          <div className="slide first">
            <img src={slide1} alt="Slide 1" />
          </div>
          <div className="slide">
            <img src={slide2} alt="Slide 2" />
          </div>
          <div className="slide">
            <img src={slide3} alt="Slide 3" />
          </div>
          <div className="slide">
            <img src={slide2} alt="Slide 4" />
          </div>

          <div className="navigation_auto">
            <div className="auto_btn1"></div>
            <div className="auto_btn2"></div>
            <div className="auto_btn3"></div>
            <div className="auto_btn4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
