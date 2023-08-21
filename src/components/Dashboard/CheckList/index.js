import Image from "next/image";
import Link from "next/link";

export const CheckList = ({
  title,
  monitors,
  author,
  percentageComplete,
  daysRemaining,
  status,
}) => {
  return (
    <div className="flex w-full mx-auto border rounded-md shadow-md justify-between p-3 hover:cursor-default sm:flex-row flex-col">
      <div className="flex flex-col gap-3 items-start justify-between">
        <div className="flex justify-between gap-3">
          <h3 className="text-2xl">{title}</h3>
          <Image
            src={`${
              status === "open"
                ? "/icons/checklistactive.svg"
                : "/icons/checklistclosed.svg"
            }`}
            width={20}
            height={20}
          />
        </div>
        <div className="flex gap-2 w-full">
          <div className="py-1 sm:px-8 px-3 bg-[#AAAAAA] flex justify-center gap-x-1 rounded-md">
            <span className="text-primary font-medium">{monitors} </span>
            <span className="text-[#666666]">Monitors</span>
          </div>
          <Link href={``} className="py-1 sm:px-8 px-3 bg-[#2ACDA6] flex justify-center gap-x-1 rounded-md">
            Preview Form
          </Link>
        </div>
      </div>
      <div className="flex flex-col sm:gap-3 gap-1">
        <span className="text-xl font-semibold text-[#666666]">
          {percentageComplete}% Complete
        </span>
        <span className="text-[#666666] font-medium">Created by {author}</span>
        <span className="text-primary font-semibold">
          {daysRemaining} days remaining
        </span>
      </div>
    </div>
  );
};
