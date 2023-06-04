import HomeImage from '../../images/doroga-zvezdy-gory-noch-nochnaia-doroga-long-exposure-dlinna.jpg'
import HomeImage2 from '../../images/yeshi-kangrang-14RqNPmDOno-unsplash.jpg'
import HomeImage3 from '../../images/sky.jpeg'


import Style from './home.module.css'
import Carousel from 'react-bootstrap/Carousel';
export const HomePage = () => {
  return (
    <Carousel  fade>

      <Carousel.Item className={ Style.container}>
        <img
          className={ Style.homeImg }
          src={ HomeImage }
          alt="image"
        />
        <Carousel.Caption>
          <h3 className={ Style.carouselText}>Уверенность за рулем на всю жизнь.</h3>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item className={ Style.container}>
        <img
          className={ Style.homeImg }
          src={ HomeImage2 }
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Самый короткий путь к безопасному вождению.</h3>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item className={ Style.container}>
        <img
          className={ Style.homeImg }
          src={ HomeImage3 }
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Придай ускорение мечте!</h3>
          
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>
  );
}




