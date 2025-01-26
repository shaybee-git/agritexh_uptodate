import React from "react";
import Slider from "react-slick";
import "./Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

// Importing local images (update the paths accordingly)
import supplierLogo1 from "../../Images/home/pf1.jpg";
// import supplierLogo2 from "../../../assets/Images/Home/pf2.jpg";
import supplierLogo3 from "../../Images/home/pf3.jpg";

const SupplierSpotlight = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024, // For medium devices
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600, // For small devices
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const suppliers = [
    {
      id: 1,
      name: "GreenHarvest Seeds",
      description:
        "GreenHarvest Seeds provides premium seeds for diverse crops. Their offerings include vegetables, grains, and legumes known for high germination rates and resilience.",
      logo: supplierLogo1,
      link: `/sale`, // Correctly pointing to the supplier's detail page
    },
    {
      id: 2,
      name: "AgriBoost Fertilizers",
      description:
        "AgriBoost Fertilizers offers top-grade fertilizers for soil health and enhanced crop yields. Suitable for both organic and conventional farming practices.",
      logo: supplierLogo3,
      link: "/sale",
    },
    {
      id: 3,
      name: "FarmTech Equipment",
      description:
        "FarmTech Equipment delivers advanced machinery and tools for farming. Their products, including tractors and irrigation systems, ensure efficiency and durability.",
      logo: supplierLogo3,
      link: "/rent",
    },
  ];

  return (
    <section className="supplier-spotlight">
      <h2 className="supplier-spotlight-title">Supplier Spotlight</h2>
      <Slider {...settings} className="supplier-spotlight-slider">
        {suppliers.map((supplier) => (
          <div key={supplier.id} className="supplier-spotlight-item">
            <img
              src={supplier.logo}
              alt={supplier.name}
              className="supplier-spotlight-logo"
            />
            <h3 className="supplier-spotlight-name">{supplier.name}</h3>
            <p className="supplier-spotlight-description">
              {supplier.description}
            </p>
            <Link to={supplier.link} className="supplier-spotlight-link">
              View Supplier
            </Link>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default SupplierSpotlight;
