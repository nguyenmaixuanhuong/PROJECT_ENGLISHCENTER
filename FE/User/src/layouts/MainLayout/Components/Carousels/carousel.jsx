import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import './carousel.styles.scss';
const AutoplaySlider = withAutoplay(AwesomeSlider);

function Carousel() {
    return (
        <div className='carousel'>
        <AutoplaySlider
            play={true}
            cancelOnInteraction={false} // should stop playing on user interaction
            interval={2000}
            // fillParent={true}
        >
            <div className='slider' data-src="./assets/image/slider/slider1.png" />
            <div className='slider' data-src="./assets/image/slider/slider2.png" />
        </AutoplaySlider>
        </div>
    )
}
export default Carousel;