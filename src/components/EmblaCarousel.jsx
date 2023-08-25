import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton.jsx";
import Autoplay from "embla-carousel-autoplay";
import imageByIndex from "../byIndex/imageByIndex";
import imageByIndexPFP from "../byIndex/imageByIndexPFP.js";
import nameByIndex from "../byIndex/nameByIndex.js";
import linksByIndex from "../byIndex/linksByIndex.js";

const EmblaCarousel = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const onButtonClick = useCallback((emblaApi) => {
    const { autoplay } = emblaApi.plugins();
    if (!autoplay) return;
    if (autoplay.options.stopOnInteraction !== false) autoplay.stop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onButtonClick
  );

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    margin: "10px",
                    filter: "grayscale(100%)",
                  }}
                  src={imageByIndexPFP(index)}
                  alt="PFP"
                />
                <a
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    fontSize: "3rem",
                    color: "white",
                    cursor: "pointer",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    letterSpacing: "0.1rem",
                    
                  }}
                  href={linksByIndex(index)}
                  target="_blank"
                >
                  {nameByIndex(index)}
                </a>
              </div>
              <img
                className="embla__slide__img"
                src={imageByIndex(index)}
                alt="Tattoos"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="embla__dots">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={"embla__dot".concat(
              index === selectedIndex ? " embla__dot--selected" : ""
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default EmblaCarousel;
