import React from "react";
import HeroSection from "./HeroSection";
import FeaturedProducts from "./FeaturedProducts";
import HowItWorks from "./HowItWorks";
import SupplierSpotlight from "./SupplierSpotlight";
import WhyChooseUs from "./WhyChooseUs";
import Testimonials from "./Testimonials";
import CallToAction from "./CallToAction";
import Footer from "../../components/Footer/Footer";
const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <HowItWorks />
      <SupplierSpotlight />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Home;
