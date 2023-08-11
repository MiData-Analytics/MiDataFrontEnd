import Link from "next/link";

export function Collaborate() {
  return (
    <section className="w-full mt-20">
      <div className="bg-[#583E9C] sm:h-[40vh] h-[50vh] flex w-full py-5 items-center justify-center gap-x-24 sm:flex-row flex-col">
        <div className=" bg-[#DFD4FF] text-[#583E9C] p-10 sm:w-[275px] sm:h-[240px] w-[240px] h-[165px] rounded-[30px] flex items-center justify-center  sm:mt-[-10rem] md:mt-[-8rem] mt-[-5rem] sm:border-0 border-[#583E9C] border-2 sm:ml-0 md:ml-[1rem]">
          <h3 className="sm:text-4xl text-2xl font-bold sm:text-left text-center">
            Collaborate <br /> with your team <br /> or clients.
          </h3>
        </div>
        <div className="py-10 px-5 sm:w-[40%] w-[100%]">
          <p className="text-white text-lg sm:text-left text-center sm:font-medium font-thin">
            The tool aims at simplifying data reporting with analytics and visualization. It will enable researchers to have control over the data reporting process for sensitive data collection without limiting participation.
          </p>
          <div className="flex gap-x-3 items-center my-5 sm:justify-start justify-center">
            <Link
              href="/signup"
              className="rounded-[30px] bg-[#fff] py-3 px-5 font-bold text-[#583E9C]"
            >
              Sign Up Free
            </Link>
            <p className="text-white font-bold">
              Already a user?{" "}
              <Link href="/login" className="border-b pb-1">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
