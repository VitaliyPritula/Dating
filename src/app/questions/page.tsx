"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
export default function MultiStepForm() {
  const totalSteps = 3;
  const totalSubSteps = 3;

  // стани
  const [step, setStep] = useState(1);
  const [subStep, setSubStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  // відповіді
  const [subStepAnswers, setSubStepAnswers] = useState<Record<number, string>>(
    {}
  );
  const [step2Data, setStep2Data] = useState({ country: "", city: "" });
  const [step3Data, setStep3Data] = useState({
    date: "2025-10-20",
    message: "",
  });

  const options = [
    "Friends first",
    "Casual dating",
    "Serious relationships",
    "Activity partner",
  ];

  // --- автозавантаження даних з localStorage ---
  useEffect(() => {
    const storedData = localStorage.getItem("multiStepFormData");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setSelected(parsed.selectedOption || null);
      setSubStepAnswers(parsed.subStepAnswers || {});
      setStep2Data(parsed.step2Data || { country: "", city: "" });
      setStep3Data(parsed.step3Data || { date: "2025-10-20", message: "" });

      // Якщо вибрана опція з підкроками, відкриваємо перший підкрок
      if (parsed.selectedOption === "Friends first") {
        setSubStep(1);
      }
    }
  }, []);

  const handleClick = (option: string) => {
    setSelected(option);
    setSubStep(option === "Friends first" ? 1 : 0);
  };

  const handleSubStepAnswer = (value: string) => {
    setSubStepAnswers((prev) => ({ ...prev, [subStep]: value }));
  };

  const nextStep = () => {
    if (subStep > 0 && subStep < totalSubSteps) {
      setSubStep(subStep + 1);
    } else if (subStep === totalSubSteps) {
      setSubStep(0);
      setStep(Math.min(step + 1, totalSteps));
    } else if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (subStep > 1) {
      setSubStep(subStep - 1);
    } else if (subStep === 1) {
      setSubStep(1);
    } else {
      setStep(Math.max(step - 1, 1));
    }
  };

  const progressPercentage =
    subStep > 0 ? (subStep / totalSubSteps) * 100 : (step / totalSteps) * 100;

  // --- збереження всіх даних у localStorage ---
  const handleSubmit = () => {
    const allData = {
      selectedOption: selected,
      subStepAnswers,
      step2Data,
      step3Data,
    };
    localStorage.setItem("multiStepFormData", JSON.stringify(allData));
    localStorage.setItem("isAuth", "true");

    // повертаємо на Step 1
    setStep(1);
    setSubStep(0);
  };

  return (
    <section className="grid items-center justify-items-center sm:pt-[64px] pt-[30px] px-4 gap-16 font-[family-name:var(--font-geist-sans)]">
      <Link href="/">
        <Image src="/Logo.svg" alt="Dating logo" width={48} height={88} />
      </Link>

      <div className="w-full max-w-[596px]">
        <button onClick={prevStep} className="mb-4 flex items-center gap-2">
          <span className="transform">&lt;-</span> Back
        </button>
        <div className="h-[4px] bg-[#D1D1D1] rounded-full mb-6">
          <div
            className="h-[4px] bg-[#1677FF] rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>

      <div className="max-w-[596px] mx-auto py-8 sm:bg-[#F9F9F9] sm:shadow-[0px_2px_8px_0px_#0000001F] rounded-lg w-full">
        {/* Step 1 */}
        {step === 1 && subStep === 0 && (
          <div className="flex flex-col gap-4 max-w-[400px] mx-auto sm:mb-6 mb-40">
            <h2 className="text-xl font-semibold text-center">
              What are you looking for?
            </h2>
            <div className="flex gap-3 flex-wrap">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleClick(option)}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    selected === option
                      ? "bg-[#1677FF] text-[#fff] border-blue-500"
                      : "bg-[#fff] text-black hover:bg-gray-100"
                  }`}>
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Підкроки Step 1 */}
        {step === 1 && subStep > 0 && (
          <div className="flex flex-col gap-4 max-w-[400px] mx-auto">
            <h2 className="text-xl font-semibold">
              Friends first — Step {subStep}
            </h2>
            {[1, 2, 3].map((s) =>
              subStep === s ? (
                <input
                  key={s}
                  type="text"
                  value={subStepAnswers[s] || ""}
                  onChange={(e) => handleSubStepAnswer(e.target.value)}
                  placeholder={`Question ${s} about friendship…`}
                  className="border p-2 rounded w-full"
                />
              ) : null
            )}
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="flex flex-col gap-4 max-w-[400px] mx-auto">
            <h2 className="text-xl font-semibold text-center">
              Where do you live?
            </h2>
            <label>Country</label>
            <select
              value={step2Data.country}
              onChange={(e) =>
                setStep2Data({ ...step2Data, country: e.target.value })
              }
              className="border p-2 rounded w-full">
              <option value="">Select country</option>
              <option value="ua">Ukraine</option>
              <option value="pl">Poland</option>
              <option value="de">Germany</option>
            </select>

            <label>City</label>
            <input
              type="text"
              placeholder="City"
              value={step2Data.city}
              onChange={(e) =>
                setStep2Data({ ...step2Data, city: e.target.value })
              }
              className="border p-2 rounded w-full"
            />
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="flex flex-col gap-4 max-w-[400px] mx-auto">
            <h2 className="text-xl font-semibold text-center">
              Tell us about yourself
            </h2>

            <label>Date of birth</label>
            <input
              type="date"
              value={step3Data.date}
              onChange={(e) =>
                setStep3Data({ ...step3Data, date: e.target.value })
              }
              className="border p-2 rounded w-full"
            />

            <label>Biography</label>
            <textarea
              value={step3Data.message}
              onChange={(e) =>
                setStep3Data({ ...step3Data, message: e.target.value })
              }
              rows={4}
              placeholder="Enter"
              className="border p-2 rounded w-full"
            />
          </div>
        )}

        <button
          onClick={nextStep}
          className="bg-[#1677FF] hover:bg-[#2b7ff5] text-white rounded-[10px] text-base py-2 w-full flex justify-center items-center gap-2 mt-4">
          {step === totalSteps ? "Save" : "Continue"} <span>-&gt;</span>
        </button>
      </div>
    </section>
  );
}
