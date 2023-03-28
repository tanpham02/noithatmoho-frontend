import { useState, useEffect, useRef, memo } from 'react'
import './Slider.css'

const Slider = ({ sliders }) => {

  const [currentIndex, setCurrentIndex] = useState(0)

  const handleNextSlide = () => {
    setCurrentIndex(currentIndex + 1)
    if(currentIndex >= sliders.length -1 ) {
      setCurrentIndex(0)
    }
  }

  const timerId = useRef()
  useEffect(() => {
    timerId.current = setInterval(() => {
      setCurrentIndex(currentIndex + 1)
      if(currentIndex >= sliders.length -1 ) {
        setCurrentIndex(0)
      }
    }, 4000)

    return () => clearInterval(timerId.current)
  }, [currentIndex]) 


  const handlePrevSlide = () => {
    setCurrentIndex(currentIndex - 1)
    if(currentIndex <=0) {
      setCurrentIndex(sliders.length - 1)
    }
  }

  const handleWitchSlider = (index) => {
    setCurrentIndex(index)
  }

  return (
    <div style={{}} className='slider'>
      <div className={`slider__image active `} style={{backgroundImage: `url(${sliders[currentIndex].url})`, transition: 'all linear 0.5s'}}></div>

      <div 
        className='slider__prev'
        onClick={handlePrevSlide}
      >
        <i className="fa-solid fa-arrow-left"></i>
      </div>

      <div 
        className='slider__next'
        onClick={handleNextSlide}
      >
        <i className="fa-solid fa-arrow-right"></i>
      </div>

      <div className='slider__dots'>
        {sliders.map((slider, index) => (
          <span
            className={`slider__dot ${index === currentIndex && 'active'}`}
            key={index}
            onClick={() => handleWitchSlider(index)}
          >
          </span>
        ))}
      </div>
    </div>
  )
}
export default memo(Slider)