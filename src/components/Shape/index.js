import Image from "next/image";

export function Tag({ iconURI, heading, text, color, direction }) {
  return (
    <div className="relative">
      <div
        className={`absolute top-5 z-10 flex items-start ${
          direction === "left" ? "flex-row left-2" : "flex-row-reverse right-0"
        }`}
      >
        <Image
          src={iconURI ? iconURI : "/icons/db.png"}
          width={125}
          height={125}
          alt={heading}
          className="relative object-contain"
        />
        <div className="flex flex-col gap-y-3">
          <h3 className="text-3xl font-bold">
            {heading ? heading : "Data Collection"}
          </h3>
          {text ? (
            text
          ) : (
            <p>
              The tool aims at simplifying data reporting
              <br /> with analytics and visualization. It will enable <br />{" "}
              researchers to have control over the data <br />
              reporting process for sensitive data collection
              <br /> without limiting participation.
            </p>
          )}
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
