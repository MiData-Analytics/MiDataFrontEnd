import { Sidebar, Header } from "@/components/Dashboard";

export function DashboardLayout({children}){
    return (
      <section className="w-full flex lg:bg-[#f5f5f5] bg-[#fff] lg:flex-row flex-col">
        <Sidebar />
        <div className="flex w-full flex-col">
          <Header />
          <div className="w-full h-fit p-5">{children}</div>
        </div>
      </section>
    );
}