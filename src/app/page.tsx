import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[0px_1fr_20px] items-center justify-items-center min-h-screen sm:pt-[64px] pt-[30px] gap-16 font-[family-name:var(--font-geist-sans)]">
      <Link href="/">
        <Image src="/Logo.svg" alt="Dating logo" width={48} height={88} />
      </Link>

      <main className="flex flex-col gap-[32px] px-4 row-start-2 items-center max-w-[600px] text-center">
        <div className="sm:mb-0 mb-60 sm:pt-0 pt-20">
          <h1 className="text-[38px] leading-[46px] font-semibold">18 +</h1>
          <p className="text-base font-normal leading-6 ">
            By continuing, you confirm that you are at least 18 years old and
            legally permitted to use this service.
          </p>
        </div>
        <div className="flex flex-wrap md:gap-4 gap-2">
          <Link
            href="/register"
            className="bg-[#1677FF] text-[#fff] rounded-[10px] text-base py-[9px] px-[16px] sm:w-auto w-full  leading-6 h-10">
            I’m over 18 years old
          </Link>
          <Link
            href="/resetPassword"
            className="border-1 rounded-[10px] border-[#D9D9D9] text-base py-[8px] px-[16px] sm:w-auto w-full leading-6 h-10">
            Lrave the service
          </Link>
        </div>
      </main>
    </div>
  );
}
