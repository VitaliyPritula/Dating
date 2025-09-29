"use client";
import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    const userData = localStorage.getItem("userData");

    if (!userData) {
      setError("No users found. Please register first.");
      return;
    }

    const parsedUser = JSON.parse(userData);

    if (parsedUser.email === email && parsedUser.password === password) {
      localStorage.setItem("isAuth", "true");
      router.push("../dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="grid grid-rows-[0px_1fr_20px] items-center justify-items-center min-h-screen sm:pt-[64px] pt-[30px] gap-16 font-[family-name:var(--font-geist-sans)]">
      <Link href="/">
        <Image src="/Logo.svg" alt="Dating logo" width={48} height={88} />
      </Link>

      <main className="sm:bg-[#F9F9F9] sm:p-[48px] px-4 row-start-2 items-center text-center min-w-[400px]">
        <div className="sm:mb-[32px] mb-36 sm:pt-0 pt-20 flex flex-col gap-[16px] max-w-[400px]">
          <h3 className="text-[24px] leading-[32px] font-semibold mb-8">
            Login
          </h3>

          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-[8px] text-[14px] px-[12px] py-[9px] h-[40px] w-full focus:outline-none border-[#D9D9D9]"
          />
          <div className="relative w-full mb-2">
            <input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-[8px] text-[14px] px-[12px] py-[9px] h-[40px] w-full focus:outline-none border-[#D9D9D9]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
              tabIndex={-1}>
              {showPassword ? (
                <EyeOff
                  size={16}
                  className="transform -scale-x-100 text-[#8C8C8C]"
                />
              ) : (
                <Eye size={16} className="text-[#8C8C8C]" />
              )}
            </button>
          </div>

          {error && <p className="text-dd text-xs mt-1">{error}</p>}
        </div>
        <button
          onClick={handleLogin}
          className="bg-[#1677FF] hover:bg-[#2b7ff5] text-[#fff] rounded-[10px] text-base py-[9px] px-[16px] w-full leading-6 h-10">
          Login
        </button>
      </main>
    </div>
  );
}
