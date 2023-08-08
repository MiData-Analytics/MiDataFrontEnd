import Image from "next/image";

export default function Partners() {
  return (
    <div className="flex flex-col justify-center items-center my-[5rem]">
      <h3 className="text-5xl font-bold text-[#373737]">Powered By</h3>
      <div className="flex items-center justify-center">
        <Image src="/partners/KDI.png" width={203} height={136} alt="KDI" />
        <Image src="/partners/USAID.png" width={210} height={63} alt="USAID" />
        <Image src="/partners/UKAID.png" width={178} height={200} alt="UKAID" />
        <Image src="/partners/NEDD.png" width={281} height={72} alt="NEDD" />
      </div>
    </div>
  );
}
