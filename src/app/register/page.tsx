"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Regester() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = "Full name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = "Invalid email format";

    if (!phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\+?[0-9]{10,15}$/.test(phone.replace(/\s/g, "")))
      newErrors.phone = "Phone must be 10-15 digits";

    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (!agree) newErrors.agree = "You must agree to continue";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleContinue = () => {
    if (!validate()) return;

    // зберігаємо дані юзера
    const user = { name, email, phone, password };
    console.log("Saving user:", user); // <-- для перевірки
    localStorage.setItem("userData", JSON.stringify(user));
    // прапорець авторизації
    localStorage.setItem("isAuth", "true");
    // редірект на дашборд
    router.push("../dashboard");
  };

  return (
    <div className="grid grid-rows-[0px_1fr_20px] items-center justify-items-center min-h-screen sm:pt-[64px] pt-[30px] gap-16 font-[family-name:var(--font-geist-sans)]">
      <Link href="/">
        <Image src="/Logo.svg" alt="Dating logo" width={48} height={88} />
      </Link>

      <main className="sm:bg-[#F9F9F9] sm:p-[48px] px-4 row-start-2 items-cente text-center">
        <div className="sm:mb-[32px] mb-36 sm:pt-0 pt-20 flex flex-col gap-[16px] max-w-[400px]">
          <h3 className="text-[24px] leading-[32px] font-semibold mb-8">
            Registration
          </h3>
          <input
            placeholder="Full name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`border rounded-[8px] placeholder-black placeholder-opacity-10 text-[14px] bg-[#fff] px-[12px] py-[9px] h-[40px] w-full focus:outline-none
                ${errors.name ? "border-dd" : "border-[#D9D9D9]"} `}
          />
          {errors.name && (
            <p className=" text-dd text-xs mt-1">{errors.name}</p>
          )}
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`border-1 rounded-[8px] text-[14px] focus:outline-none bg-[#fff] px-[12px] py-[9px] h-[40px] w-full
                ${errors.email ? "border-dd" : "border-[#D9D9D9]"} `}
          />
          {errors.email && (
            <p className="text-dd text-xs mt-1">{errors.email}</p>
          )}
          <input
            placeholder="Phone"
            type="tel"
            pattern="\+?[0-9\s]{10,15}"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`border rounded-[8px] text-[14px] px-[12px] py-[9px] focus:outline-none bg-[#fff] h-[40px] w-full 
                ${errors.phone ? "border-dd" : "border-[#D9D9D9]"} `}
          />
          {errors.phone && (
            <p className="text-dd text-xs mt-1">{errors.phone}</p>
          )}

          <div className="relative w-full mb-2">
            <input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`border rounded-[8px] text-[14px] px-[12px] pr-[40px] focus:outline-none bg-[#fff] py-[9px] h-[40px] w-full 
                ${errors.password ? "border-dd" : "border-[#D9D9D9]"} `}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
              tabIndex={-1}>
              {showPassword ? (
                <Eye size={16} className="text-[#8C8C8C]" />
              ) : (
              <EyeOff
                size={16}
                className="transform -scale-x-100 text-[#8C8C8C]"
              />
              )}
            </button>
          </div>

          <div className="flex gap-2">
            <input
              id="agree"
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:outline-none"
            />
            <label htmlFor="agree" className="text-sm text-left">
              By continuing, you agree to our{" "}
              <a
                href="#"
                className="underline decoration-black decoration-2 underline-offset-4 hover:decoration-[#1677FF] hover:text-[#1677FF]">
                Terms of Use and Privacy Policy
              </a>
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={handleContinue}
            className="bg-[#1677FF] hover:bg-[#2b7ff5] text-[#fff] rounded-[10px] text-base py-[9px] px-[16px] w-full leading-6 h-10">
            Continue{" "}
            <span className="transition-transform duration-200  group-hover:translate-x-1">
              -&gt;
            </span>
          </button>
        </div>
      </main>
    </div>
  );
}
