import { Tag, Clip } from "@/components/Shape";

const dataReporting = [
  {
    iconURI: "/icons/db.png",
    heading: "Data Collection",
    text: "The tool aims at simplifying data reporting with analytics and visualization. It will enable researchers to have control over the data reporting process for sensitive data collection without limiting participation.",
    color: "#DFD4FF",
    direction: "left",
    clip: "top",
  },
  {
    iconURI: "/icons/analysis.png",
    heading: "Data Analysis",
    text: "The tool aims at simplifying data reporting with analytics and visualization. It will enable researchers to have control over the data reporting process for sensitive data collection without limiting participation.",
    color: "#F8C6C6",
    direction: "right",
    clip: "middle",
  },
  {
    iconURI: "/icons/insight.png",
    heading: "Insight Sharing",
    text: "The tool aims at simplifying data reporting with analytics and visualization. It will enable researchers to have control over the data reporting process for sensitive data collection without limiting participation.",
    color: "#AAEBDB",
    direction: "left",
    clip: "middle",
  },
  {
    iconURI: "/icons/visualization.png",
    heading: "Data Visualization",
    text: "The tool aims at simplifying data reporting with analytics and visualization. It will enable researchers to have control over the data reporting process for sensitive data collection without limiting participation.",
    color: "#EFD2A7",
    direction: "right",
    clip: "bottom",
  },
];

export function DataReport() {
  return (
    <section className="my-10">
      <div className="text-center w-[80%] mx-auto">
        <h3 className="text-[#583E9C] text-5xl font-bold">Data Reporting</h3>
        <p className="font-semibold">
          The tool aims at simplifying data reporting with analytics and
          visualization. It will enable researchers to have control over
          the data reporting process for sensitive data collection
          without limiting participation.
        </p>
      </div>
      <div className="w-[85%] mx-auto my-10 space-y-5 sm:flex items-baseline gap-5 justify-center flex-wrap sm:flex-row flex-col hidden">
        {dataReporting.map((data, index) => {
          return (
            <Tag
              key={index}
              iconURI={data.iconURI}
              heading={data.heading}
              text={data.text}
              color={data.color}
              direction={data.direction}
            />
          );
        })}
      </div>
      <div className="w-[85%] mx-auto my-10 flex items-center gap-y-3 justify-center flex-wrap sm:flex-row flex-col sm:hidden">
        {dataReporting.map((data, index) => {
          return (
            <Clip
              key={index}
              iconURI={data.iconURI}
              heading={data.heading}
              text={data.text}
              color={data.color}
              clip={data.clip}
            />
          );
        })}
      </div>
    </section>
  );
}
