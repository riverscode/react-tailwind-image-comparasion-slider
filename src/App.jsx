import { useState, useRef } from "react";

function App() {
  const [imageRevelFraq, setImageRevelFraq] = useState(0.4);
  const imageContainer = useRef(undefined);

  const slide = (xPosition) => {
    const containerBoundingRect =
      imageContainer.current.getBoundingClientRect();
    setImageRevelFraq(() => {
      if (xPosition < containerBoundingRect.left) {
        return 0;
      } else if (xPosition > containerBoundingRect.right) {
        return 1;
      } else {
        return (
          (xPosition - containerBoundingRect.left) / containerBoundingRect.width
        );
      }
    });
  };

  const handleMouseDown = (e) => {
    window.onmousemove = handleMouseMove;
    window.onmouseup = handleMouseUp;
  };

  const handleMouseMove = (e) => {
    slide(e.clientX);
  };

  const handleMouseUp = (e) => {
    window.onmousemove = undefined;
    window.onmouseup = undefined;
  };

  const handleTouchMove = (e) => {
    slide(e.touches[0].clientX);
  };

  return (
    <div className="px-4">
      <div
        ref={imageContainer}
        className="max-w-lg w-full mx-auto mt-20 relative select-none"
      >
        <img
          src="https://images.unsplash.com/photo-1729867799265-34a921d70baf?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="pointer-events-none"
        />
        <img
          src="https://images.unsplash.com/photo-1729867799265-34a921d70baf?q=80&w=1885&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          style={{
            filter: "grayscale(100%)",
            clipPath: `polygon(0 0, ${imageRevelFraq * 100}% 0, ${
              imageRevelFraq * 100
            }% 100%, 0 100%)`,
          }}
          className="absolute inset-0 pointer-events-none"
        />
        <div
          style={{ left: `${imageRevelFraq * 100}%` }}
          className="absolute inset-y-0"
        >
          <div className="relative h-full">
            <div className="absolute inset-y-0 bg-indigo-400 w-0.5 -ml-px">
              <div
                style={{ touchAction: "none" }}
                className="size-10 rounded-full bg-indigo-400 -ml-5 top-1/2 absolute -mt-5 shadow-lg flex justify-center items-center cursor-pointer transform rotate-90 border-4 border-white/20 hover:border-white/50 transition-all duration-300"
                onMouseDown={handleMouseDown}
                onTouchMove={handleTouchMove}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6 text-white"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
