import { CarouselProvider, Dot, Slider as PureSlider, Slide } from 'pure-react-carousel';
import ContentBlock from '../ContentBlock';
import { Box } from '@mui/material';
import clsx from 'clsx';
import SliderNextButton from './SliderNextButton';
import SliderBackButton from './SliderBackButton';

interface SliderProps {
    className?: string;
    navigationDots: boolean;
    slides: any[];
    carouselSettings: { type: string; carouselControlsIconsColor: 'primary' | 'secondary' };
    slidesObj: {
        slidesType: string;
        slides: any[]; // ideally use a specific SlideType interface here
    };
}

const CarouselPOC = ({ className, navigationDots, slidesObj, carouselSettings }: SliderProps) => {
    const { slidesType, slides = []} = slidesObj
    const loop = carouselSettings.type === 'autoplay' ? true : false
    const { carouselControlsIconsColor } = carouselSettings
    console.log("loop", loop, carouselSettings)
    return (
        <Box
            className={clsx(className)}
        >
            <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={50}
                isIntrinsicHeight={true}
                visibleSlides={1}
                totalSlides={slides.length}
                infinite={loop}
                isPlaying={loop}
                interval={5000}
            >
                <PureSlider>
                    {slides.map((slide: any, index: number) => {
                        return (
                            <Slide key={index} index={index}>
                                <ContentBlock content={slide} />
                            </Slide>
                        );
                    })}
                </PureSlider>
                <SliderBackButton theme={carouselControlsIconsColor}/>
                <SliderNextButton theme={carouselControlsIconsColor}/>
                <Box style={{ textAlign: 'center'}}>
                    {navigationDots &&
                        slides.map((slide: any, index: number) => {
                            return (
                                <Dot
                                    key={index}
                                    slide={index}
                                    style={{
                                        backgroundColor: '#ccc',
                                        overflow: 'hidden',
                                        border: 0,
                                        marginRight: 15,
                                        width: 12,
                                        height: 12,
                                        borderRadius: '50%',
                                    }}
                                ></Dot>
                            );
                        })}
                </Box>
            </CarouselProvider>
        </Box>
    );
};

export default CarouselPOC;
