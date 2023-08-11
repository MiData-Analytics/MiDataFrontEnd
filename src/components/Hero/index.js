import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section
      className="w-full h-fit bg-[#5D43A9] 
md:rounded-br-[355px] rounded-none"
    >
      <div className="w-full flex md:flex-row flex-col-reverse gap-x-5 p-5 mx-auto justify-center items-center">
        <div className="flex flex-col sm:w-[45%] w-full">
          <h1 className="text-white lg:text-7xl md:text-5xl text-6xl font-bold sm:text-left text-center">
            Create Checklists in a click
          </h1>
          <p className="text-white md:text-sm lg:text-lg sm:text-left text-center">
            Create, edit and access your checklists, from anywhere around the
            world, With 0ver 3million users, MiData has gained a lot of
            credibility among organizations. Sign up to get started.
          </p>
          <div className="flex gap-3 lg:items-center items-center md:items-start my-5 sm:justify-start justify-center flex-col lg:flex-row">
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
        <div>
          <Image
            src="/gif/phone.gif"
            width={580}
            height={580}
            className="object-contain rounded-full"
            alt="MiData Animation"
          />
        </div>
      </div>
    </section>
  );
}
