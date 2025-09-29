"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPassword() {
  const totalSteps = 5;
  const [step, setStep] = useState(1);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState(""); // якщо хочеш показувати телефон

  // стани введених даних
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // 🔹 додано стан для 6-значного коду
  const [recoveryCode, setRecoveryCode] = useState<string[]>(Array(6).fill(""));

  // --- автозавантаження даних з localStorage ---
  useEffect(() => {
    const stored = localStorage.getItem("resetPasswordData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setEmailOrPhone(parsed.emailOrPhone || "");
      setVerificationCode(parsed.verificationCode || "");
      setNewPassword(parsed.newPassword || "");
      setConfirmPassword(parsed.confirmPassword || "");
    }
  }, []);

  // --- збереження даних ---
  const saveData = () => {
    const allData = {
      emailOrPhone,
      verificationCode,
      newPassword,
      confirmPassword,
    };
    localStorage.setItem("resetPasswordData", JSON.stringify(allData));
  };

  const nextStep = () => {
    saveData();
    setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    saveData();
    setStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <section className="grid grid-rows-[0px_1fr_20px] items-center justify-items-center min-h-screen sm:pt-[64px] pt-[30px] gap-16 font-[family-name:var(--font-geist-sans)]">
      {/* Логотип з посиланням на головну */}
      <Link href="/">
        <Image src="/Logo.svg" alt="Dating logo" width={48} height={88} />
      </Link>

      <div className="max-w-[596px] mx-auto sm:p-[48px] px-4 sm:bg-[#F9F9F9] sm:shadow-[0px_2px_8px_0px_#0000001F] rounded-lg w-full flex flex-col gap-6 ">
        {/* --- Step 1: Welcome Back --- */}
        {step === 1 && (
          <div className="">
            <div className="flex flex-col gap-4 text-center sm:mb-4 mb-48">
              <h2 className="text-[24px] font-semibold">Welcome Back!</h2>
              <input
                type="text"
                placeholder="Email or Phone"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="border rounded-[8px] placeholder-black placeholder-opacity-10 bg-[#fff] px-[12px] py-[9px] h-[40px] w-full focus:outline-none
                border-[#D9D9D9]"
              />
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="border rounded-[8px] bg-[#fff] bg-[#fff] px-[12px] py-[9px] h-[40px] w-full focus:outline-none
                border-[#D9D9D9]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black focus:outline-none ">
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
              <div className="text-left">
                <a href="" className="">
                  Forgot password?
                </a>
              </div>
            </div>
            <button
              onClick={nextStep}
              className="bg-[#1677FF] hover:bg-[#2b7ff5] text-[#fff] rounded-[10px] text-base py-[9px] px-[16px] w-full leading-6 h-10">
              Log In
              <span className="transition-transform duration-200  group-hover:translate-x-1 pl-2 tex-[20px] font-bold">
                -&gt;
              </span>
            </button>
          </div>
        )}

        {/* --- Step 2: Email/Phone --- */}
        {step === 2 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-[24px] font-semibold text-center">
              Forgot password?
            </h2>
            <p className="text-base font-normal text-center text-[#000000A3] leading-6 ">
              Provide your account’s email for which you want to restore
              password!
            </p>

            <input
              type="text"
              placeholder="Email"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
              className="border bg-[#fff] p-2 rounded w-full sm:mb-8 mb-40"
            />
            <button
              onClick={nextStep}
              className="bg-[#1677FF] hover:bg-[#2b7ff5] text-[#fff] rounded-[10px] text-base py-[9px] px-[16px] w-full leading-6 h-10">
              Send code
              <span className="transition-transform duration-200  group-hover:translate-x-1 pl-2 tex-[20px] font-bold">
                -&gt;
              </span>
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-6 text-center">
            <h2 className="text-[24px] font-semibold">Make selection</h2>
            <p className="text-base font-normal text-black/60 leading-6 text-[#000000A3]">
              Select which contact detail we should use to reset your password.
            </p>

            <div className="flex flex-col gap-4 sm:mb-2 mb-36">
              {/* Email card */}
              <button
                onClick={() => setSelectedContact(emailOrPhone)}
                className={`flex items-center gap-4 p-4 border rounded-lg w-full text-left hover:bg-blue-50 transition ${
                  selectedContact === emailOrPhone
                    ? "bg-blue-50 border-blue-400"
                    : "bg-white border-gray-200"
                }`}>
                <span className="text-gray-400">
                  <Image src="/Mail.svg" alt="mail" width={36} height={36} />
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-gray-500 text-sm">via mail:</span>
                  <span className="font-semibold">{emailOrPhone}</span>
                </div>
              </button>

              {/* Phone card */}
              <button
                onClick={() => setSelectedContact(phoneNumber)}
                className={`flex items-center gap-4 p-4 border rounded-lg w-full text-left hover:bg-blue-50 transition ${
                  selectedContact === phoneNumber
                    ? "bg-blue-50 border-blue-400"
                    : "bg-white border-gray-200"
                }`}>
                <span className="text-gray-400">
                  <Image
                    src="/Mobile.svg"
                    alt="mobile"
                    width={36}
                    height={36}
                  />
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-gray-500 text-sm">via sms:</span>
                  <span className="font-semibold">{phoneNumber}</span>
                </div>
              </button>
            </div>

            <button
              onClick={nextStep}
              className="mt-4 bg-[#1677FF] text-[#fff] hover:bg-[#2b7ff5] text-white rounded-lg py-2 px-4 w-full">
              Next &rarr;
            </button>

            {/* Cancel */}
            <button onClick={prevStep} className="mt-2 text-gray-500 underline">
              Cancel
            </button>
          </div>
        )}

        {/* --- Step 4: Recovery Code --- */}
        {step === 4 && (
          <div className="flex flex-col gap-4">
            <h2 className="text-[24px] font-semibold text-center">
              Enter 6-digit recovery code
            </h2>
            <p className="text-base font-normal text-center text-[#000000A3] leading-6">
              The recovery code was sent to {emailOrPhone}. Please enter the
              code.
              <a
                href="#"
                className="underline decoration-black decoration-2 underline-offset-4 hover:decoration-[#1677FF] hover:text-[#1677FF]">Change email address</a>
            </p>

            <div className="flex justify-center gap-3 sm:mb-2 mb-36">
              {Array.from({ length: 6 }).map((_, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  inputMode="numeric"
                  className="border rounded-[8px] w-10 h-12 text-center text-lg focus:outline-none focus:border-[#1677FF]"
                  value={recoveryCode[i] || ""}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/, ""); // тільки цифри
                    const newCode = [...recoveryCode];
                    newCode[i] = val;
                    setRecoveryCode(newCode);

                    // автофокус на наступний
                    if (val && i < 5) {
                      const nextInput = document.getElementById(`otp-${i + 1}`);
                      nextInput?.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !recoveryCode[i] && i > 0) {
                      const prevInput = document.getElementById(`otp-${i - 1}`);
                      prevInput?.focus();
                    }
                  }}
                  id={`otp-${i}`}
                />
              ))}
            </div>

            <button
              onClick={nextStep}
              className="mt-6 bg-[#1677FF] text-[#fff] rounded-lg py-2 px-4 w-full">
              Verify Code
            </button>
          </div>
        )}

        {/* --- Step 5: Success --- */}
        {step === 5 && (
          <div className="flex flex-col gap-4 text-center">
            <h2 className="text-2xl font-semibold text-green-600">
              Enter new password
            </h2>

            {/* Новий пароль */}
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border rounded-[8px] px-[12px] py-[9px] h-[40px] w-full focus:outline-none border-[#D9D9D9]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black">
                {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>

            {/* Підтвердження пароля */}
            <div className="relative w-full">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border rounded-[8px] px-[12px] py-[9px] h-[40px] w-full focus:outline-none border-[#D9D9D9]"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black">
                {showConfirm ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>

            {/* Повідомлення про помилку */}
            {newPassword &&
              confirmPassword &&
              newPassword !== confirmPassword && (
                <p className="text-sm text-dd">Passwords do not match</p>
              )}

            <button
              onClick={() => {
                if (newPassword === confirmPassword && newPassword) {
                  // тут можна зробити submit або nextStep
                  alert("Password successfully reset!");
                }
              }}
              disabled={
                !newPassword ||
                !confirmPassword ||
                newPassword !== confirmPassword
              }
              className="bg-[#1677FF] text-[#fff] rounded-lg py-2 px-4 w-full disabled:bg-gray-400 disabled:cursor-not-allowed">
              Save
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
