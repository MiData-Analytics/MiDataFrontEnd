import * as React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbChecklist } from "react-icons/tb";
import { HiUsers } from "react-icons/hi";
import { BiWallet } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/router";
import { AiOutlineMenu } from "react-icons/ai";
import { AiFillCaretDown } from "react-icons/ai";
import { HiMagnifyingGlass } from "react-icons/hi2";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useCookies } from "react-cookie";

const firstLinks = [
  {
    url: "/dashboard",
    title: "Dashboard",
    icon: <LuLayoutDashboard size={25} />,
  },
  {
    url: "/dashboard/checklists",
    title: "Checklists",
    icon: <TbChecklist size={25} />,
  },
  {
    url: "/dashboard/monitors",
    title: "My Monitors",
    icon: <HiUsers size={25} />,
  },
];

const secondLinks = [
  {
    url: "/dashboard/subscriptions",
    title: "Subscriptions",
    icon: <BiWallet size={25} />,
  },
];

export function Sidebar() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const { push } = useRouter();
  function NavLink({ url, title, icon }) {
    const { pathname } = useRouter();

    return (
      <Link href={url}>
        <div
          className={`flex justify-start gap-4 items-center border w-56 mx-auto p-3  py-5 rounded-xl ${
            pathname === url ? "bg-[#6C3FEE] text-white" : ""
          } hover:bg-[#6C3FEE] hover:text-white hover:shadow-md hover:duration-300`}
        >
          {icon}
          {title}
        </div>
      </Link>
    );
  }

  function logOut() {
    removeCookie("token", {
      path: "/",
      maxAge: 3600 * 24 * 3,
      sameSite: true,
    });
    push("/login");
  }

  return (
    <>
      <nav className="lg:hidden flex w-full border justify-between bg-white shadow-md">
        <Link href="/dashboard">
          <Image
            src="/logo/midata.png"
            alt="MiData Logo"
            height={57}
            width={196}
          />
        </Link>
        <div className="flex items-center gap-3 pr-2">
          <HiMagnifyingGlass size={25} />
          <AiOutlineMenu size={25} />
        </div>
      </nav>
      <nav className="w-72 border bg-white h-[100vh] lg:flex flex-col items-center py-3 justify-start gap-10 hidden">
        <Link href="/dashboard">
          <Image
            src="/logo/midata.png"
            alt="MiData Logo"
            height={57}
            width={196}
          />
        </Link>
        <div className="flex flex-col gap-10 w-full">
          <div className="flex flex-col gap-3">
            {firstLinks.map((link, index) => {
              return (
                <NavLink
                  key={index}
                  url={link.url}
                  title={link.title}
                  icon={link.icon}
                />
              );
            })}
          </div>
          <div className="flex flex-col gap-3">
            {secondLinks.map((link, index) => {
              return (
                <NavLink
                  key={index}
                  url={link.url}
                  title={link.title}
                  icon={link.icon}
                />
              );
            })}
          </div>
          <div className="flex flex-col gap-10 w-full place-items mt-10 cursor-pointer">
            <div
              className={`flex justify-start gap-4 items-center border w-56 mx-auto p-3  py-5 rounded-xl hover:bg-[#6C3FEE] hover:text-white hover:shadow-md hover:duration-300`}
              onClick={logOut}
            >
              <FiLogOut size={25} />
              Logout
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export function Header() {
  const [searchTerm, setSearchTerm] = useState("");

  function Options({ icon, link }) {
    const { pathname } = useRouter();

    return (
      <div className="flex gap-2">
        <Link href="/dashboard">
          <LuLayoutDashboard
            size={20}
            color={pathname === "/dashboard" ? "#6C3FEE" : "#000"}
          />
        </Link>
        <Link href="/dashboard/checklists">
          <TbChecklist
            size={20}
            color={pathname === "/dashboard/checklists" ? "#6C3FEE" : "#000"}
          />
        </Link>
        <Link href="/dashboard/monitors">
          <HiUsers
            size={20}
            color={pathname === "/dashboard/monitors" ? "#6C3FEE" : "#000"}
          />
        </Link>
        <Link href="/dashboard/subscriptions">
          <BiWallet
            size={20}
            color={pathname === "/dashboard/subscriptions" ? "#6C3FEE" : "#000"}
          />
        </Link>
      </div>
    );
  }

  return (
    <>
      <nav className="w-full lg:hidden flex justify-between border-b items-center py-3 gap-1 px-1">
        <Options />
        <p className="text-xs">Kimpact Development Initiative</p>
      </nav>
      <nav className="w-full h-20 bg-white shadow-md items-center p-3 justify-between lg:flex hidden">
        <div className="flex items-center justify-center gap-5">
          <AiOutlineMenu size={35} className="hover:cursor-pointer" />
          <div className="w-3/2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border w-50 p-3 rounded-lg bg-[#f5f5f5]"
              placeholder="Quick Search"
            />
          </div>
        </div>
        <div className="w-fit">
          <p className="inline-flex items-center gap-2 hover:cursor-pointer">
            Kimpact Development Initiative <AiFillCaretDown size={15} />
          </p>
        </div>
      </nav>
    </>
  );
}

export function CheckListSearch({ searchTerm, setSearchTerm }) {
  return (
    <div className="border px-2 py-3 rounded-md w-full flex items-center">
      <Image
        src="/icons/searchnormal.svg"
        width={35}
        height={35}
        alt="Search Icon"
      />
      <input
        type="text"
        name="searchTerm"
        id="searchTerm"
        placeholder="Search by name"
        className="h-full px-2 py-3 w-full outline-none"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

function CountDot({ number }) {
  return (
    <div className="w-[1.25rem] h-[1.25rem] bg-[#6C3FEE] text-white inline-flex justify-center items-center text-sm p-2 rounded-full">
      {number}
    </div>
  );
}

export function CheckListFilter() {
  return (
    <div className="w-40 border rounded-md flex justify-between items-center p-3 hover:cursor-pointer">
      <div className="flex items-center justify-between gap-2">
        <Image
          src="/icons/filtersearch.svg"
          width={25}
          height={25}
          alt="Filter Icon"
          className="h-5 w-5 object-contain"
        />
        <p className="text-xs">Filter</p>
      </div>
      <CountDot number={3} />
    </div>
  );
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const targetDate = new Date("2023-10-28");
      const days = differenceInDays(targetDate, now);
      const hours = differenceInHours(targetDate, now) % 24;
      const minutes = differenceInMinutes(targetDate, now) % 60;
      const seconds = differenceInSeconds(targetDate, now) % 60;
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="shadow-md flex flex-col items-center border justify-center rounded-[30px] bg-[#fff] h-[16rem] text-[#707070]">
      <div className="flex flex-col items-center justify-between">
        <h3 className="text-[#9B75D5] font-medium">Deadline</h3>
        <div>
          <div className="text-3xl font-bold">{timeLeft.days || "0"} Days</div>
        </div>
        <div className="flex flex-col justify-enter items-center">
          <div className="text-[#707070] p-4 rounded-lg text-center flex-row flex items-center">
            <div className="text-4xl">{timeLeft.hours || "0"}</div>:
            <div className="text-4xl">{timeLeft.minutes || "0"}</div>:
            <div className="text-4xl">{timeLeft.seconds || "0"}</div>
          </div>
          <div className="text-[#707070] p-4 rounded-lg text-center flex-row flex items-center gap-x-3 mt-[-2rem]">
            <div className="text-sm">Hours</div>:
            <div className="text-sm">Mins</div>:
            <div className="text-sm">Secs</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MonitorCountCard({ count }) {
  return (
    <div className="shadow-md shadow-[#6C3FEE] flex flex-col items-center justify-center rounded-[30px] bg-[#6C3FEE] py-[6rem] px-[3rem] text-white h-[16rem] border-[#6C3FEE]">
      <p className="text-3xl">{count}</p>
      <p className="text-3xl">{count > 1 ? "Monitors" : "Monitor"}</p>
    </div>
  );
}

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        thickness={5}
        size={100}
        variant="determinate"
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default function CircularWithValueLabel() {
  const [progress, setProgress] = React.useState(100);

  return <CircularProgressWithLabel value={progress} />;
}

export function SubmissionRateCard({ rate }) {
  return (
    <div className="shadow-md flex flex-col border rounded-[30px] bg-[#fff] h-[16rem] w-4/6 text-[#9B75D5]">
      <div className="border-b w-5/6 mx-auto mt-3">
        <h3 className="text-[#9B75D5] font-medium text-xl text-center">
          Submission Rate
        </h3>
      </div>
      <div className="flex justify-center gap-10 items-center">
        <Image
          src="/icons/infograph.svg"
          width={210}
          height={210}
          alt="Infograph"
        />
        <Image
          src="/icons/nigeria.svg"
          width={210}
          height={210}
          alt="Infograph"
        />
        <div className="flex flex-col text-[#636363]">
          <p className="flex text-xl items-center gap-x-3">
            <Image
              src="/icons/unsubmitted.svg"
              width={10}
              height={10}
              alt="unsubmitted icon"
            />
            Unsubmitted
          </p>
          <p className="flex text-xl items-center gap-x-3">
            <Image
              src="/icons/submitted.svg"
              width={10}
              height={10}
              alt="submitted icon"
            />
            Submitted
          </p>
        </div>
      </div>
    </div>
  );
}

export function WorkBoard() {
  const [option, setOption] = useState("Visualization Options");
  const [showOptions, setShowOptions] = useState(false);

  const options = [
    {
      value: "Question",
    },
    {
      value: "Monitor Response",
    },
    {
      value: "Individual Response",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-start border rounded-lg shadow-md min-h-[80vh] h-fit mt-3">
      <div className="flex justify-around rounded-t-lg bg-[#6C3FEE] items-center h-12 gap-5 w-full">
        <h3 className="font-semibold sm:text-3xl text-white">
          Early Warning Signs
        </h3>
        <div
          className="inline-flex items-center bg-[#D9D9D9] sm:w-60 w-32 justify-between rounded-md px-2 py-1 hover:cursor-pointer sm:text-base text-[0.5rem] relative"
          onClick={() => setShowOptions(!showOptions)}
        >
          {option}
          <AiFillCaretDown size={15} />
          {showOptions && (
            <div className="absolute top-8 left-0 bg-primary h-32 w-full flex flex-col items-first text-white justify-between">
              {options.map((option, index) => {
                return (
                  <p
                    className="border-b w-full h-full hover:bg-white hover:text-primary inline-flex justify-start pl-2 items-center"
                    key={index}
                    onClick={() => {
                      setOption(option.value);
                      setShowOptions(false);
                    }}
                  >
                    {option.value}
                  </p>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {/* PC View  */}
      <div className="flex w-full m-3 gap-x-3 justify-between items-center p-3 sm:flex-row flex-col">
        <MonitorCountCard count={600} />
        <SubmissionRateCard />
        <Countdown />
      </div>
      {/* PC View  */}
    </div>
  );
}
