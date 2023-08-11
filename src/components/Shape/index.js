import Image from "next/image";

export function Tag({ iconURI, heading, text, color, direction }) {
  return (
    <div className="relative">
      <div
        className={`absolute top-5 z-10 flex items-start w-[80%] ${
          direction === "left" ? "flex-row left-2" : "flex-row-reverse right-0"
        }`}
      >
        <Image
          src={iconURI ? iconURI : "/icons/db.png"}
          width={145}
          height={145}
          alt={heading}
          className="relative object-contain"
        />
        <div className="flex flex-col gap-y-3">
          <h3 className="text-3xl font-bold">
            {heading ? heading : "Data Collection"}
          </h3>
          <p className="font-thin text-md">
            {text}
          </p>
        </div>
      </div>
      {direction === "left" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="571"
          height="218"
          viewBox="0 0 571 218"
          fill="none"
        >
          <path
            d="M0 37C0 16.5655 16.5655 0 37 0H511.349C527.625 0 541.989 10.6355 546.739 26.2027L568.706 98.2027C570.853 105.241 570.853 112.759 568.706 119.797L546.739 191.797C541.989 207.364 527.625 218 511.349 218H37C16.5654 218 0 201.435 0 181V37Z"
            fill={color ? color : "#DFD4FF"}
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="571"
          height="218"
          viewBox="0 0 571 218"
          fill="none"
        >
          <path
            d="M571 181C571 201.435 554.435 218 534 218L59.6509 218C43.3753 218 29.0109 207.364 24.2614 191.797L2.29425 119.797C0.146973 112.759 0.146973 105.241 2.29425 98.2027L24.2614 26.2027C29.0109 10.6355 43.3753 0 59.6509 0L534 0C554.435 0 571 16.5655 571 37V181Z"
            fill={color ? color : "#DFD4FF"}
          />
        </svg>
      )}
    </div>
  );
}

export function Clip({ iconURI, heading, text, color, clip }) {
  if (clip === "top") {
    return (
      <div className="relative">
        <div
          className={`absolute top-8 z-10 flex items-center justify-center flex-col text-center`}
        >
          <Image
            src={iconURI ? iconURI : "/icons/db.png"}
            width={45}
            height={45}
            alt={heading}
            className="relative object-contain"
          />
          <div className="flex flex-col gap-y-3 justify-center items-center">
            <h3 className="text-xl font-bold">
              {heading ? heading : "Data Collection"}
            </h3>
            <p className="font-thin text-[0.68rem]  w-[95%]">{text}</p>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="298"
          height="226"
          viewBox="0 0 298 186"
          fill="none"
        >
          <path
            d="M298 161C298 174.807 286.807 186 273 186L25.0001 186C11.1929 186 2.95119e-05 174.807 2.82713e-05 161L2.30748e-05 103.166L1.73245e-05 39.1679C1.61809e-05 26.4402 9.56233 15.7442 22.2106 14.324L146.982 0.314847C148.845 0.105604 150.726 0.106717 152.59 0.318143L275.819 14.3009C288.454 15.7346 298 26.425 298 39.1415L298 161Z"
            fill={color ? color : "#DFD4FF"}
          />
        </svg>
      </div>
    );
  }

  if (clip === "middle") {
    return (
      <div className="relative h-fit">
        <div
          className={`absolute top-2 z-10 flex items-center justify-center flex-col text-center`}
        >
          <Image
            src={iconURI ? iconURI : "/icons/db.png"}
            width={45}
            height={45}
            alt={heading}
            className="relative object-contain"
          />
          <div className="flex flex-col gap-y-3 justify-center items-center">
            <h3 className="text-xl font-bold">
              {heading ? heading : "Data Collection"}
            </h3>
            <p className="font-thin text-[0.68rem] w-[95%]">{text}</p>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="298"
          height="169"
          viewBox="0 0 298 169"
          fill="none"
        >
          <path
            d="M-4.25135e-06 25C-1.90339e-06 11.1929 11.1929 1.95703e-06 25 4.37114e-06L273 4.77328e-05C286.807 5.0147e-05 298 11.1929 298 25.0001L298 82.7448L298 144C298 157.807 286.807 169 273 169L145.959 169L25 169C11.1928 169 -2.68357e-05 157.807 -2.44878e-05 144L-4.25135e-06 25Z"
            fill={color}
          />
        </svg>
      </div>
    );
  }

  if (clip === "bottom") {
    return (
      <div className="relative">
        <div
          className={`absolute top-0 z-10 flex items-center justify-center flex-col text-center`}
        >
          <Image
            src={iconURI ? iconURI : "/icons/db.png"}
            width={45}
            height={45}
            alt={heading}
            className="relative object-contain"
          />
          <div className="flex flex-col gap-y-3 justify-center items-center">
            <h3 className="text-xl font-bold">
              {heading ? heading : "Data Collection"}
            </h3>
            <p className="font-thin text-[0.68rem] w-[95%]">{text}</p>
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="298"
          height="186"
          viewBox="0 0 298 186"
          fill="none"
        >
          <path
            d="M-4.25135e-06 25C-1.9034e-06 11.1929 11.1929 1.95703e-06 25 4.37114e-06L273 4.77328e-05C286.807 5.0147e-05 298 11.1929 298 25.0001L298 82.834L298 146.832C298 159.56 288.438 170.256 275.789 171.676L151.018 185.685C149.155 185.894 147.274 185.893 145.41 185.682L22.1813 171.699C9.54588 170.265 -2.71364e-05 159.575 -2.49739e-05 146.858L-4.25135e-06 25Z"
            fill={color}
          />
        </svg>
      </div>
    );
  }
}
