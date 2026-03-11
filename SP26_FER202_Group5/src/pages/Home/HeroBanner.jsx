import { Carousel } from "react-bootstrap";
const HeroBanner = () => {
  const banners = [1,2,3,4,5];
  return (
    <Carousel className="hero-banner shadow-sm mt-3">
      {banners.map((num) => (
        <Carousel.Item key={num}>
          <img  src={`/images/banner-${num}.webp`} className="d-block w-100" alt="banner" />
        </Carousel.Item>
      ))}

    </Carousel>

  );
};

export default HeroBanner;