import React, { useState } from "react";

function Carousel({ products = [] }) {
  const [current, setCurrent] = useState(0);

  // Use first 5 products to avoid overcrowding
  const slides = products.slice(0, 5);

  const prevSlide = () =>
    setCurrent((current - 1 + slides.length) % slides.length);

  const nextSlide = () => setCurrent((current + 1) % slides.length);

  // Show loading if no slides
  if (slides.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-lg font-semibold text-gray-600">
        Loading products...
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-8">
      {/* Slides */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-700 ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
          } bg-gradient-to-r from-blue-500 to-blue-400`}
        >
          <div className="flex items-center justify-center h-full px-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <img
                src={slide.image || "https://via.placeholder.com/150"}
                alt={slide.title || "Product"}
                className="w-40 h-40 object-cover rounded-xl shadow-lg bg-white"
              />
              <div className="text-white text-center md:text-left">
                <div className="text-2xl md:text-3xl font-bold mb-2">
                  {slide.title || "No Title"}
                </div>
                <div className="text-xl md:text-2xl font-semibold mb-1">
                  {slide.price || "No Price"}
                </div>
                <div className="text-base md:text-lg opacity-90">
                  {slide.subtitle || "Amazing Offers"}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-700 rounded-l px-3 py-4 focus:outline-none z-20"
        aria-label="Previous"
      >
        &#60;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-700 rounded-r px-3 py-4 focus:outline-none z-20"
        aria-label="Next"
      >
        &#62;
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full ${
              idx === current ? "bg-white" : "bg-gray-400 bg-opacity-60"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
