import { useState } from "react";

export const ProgressSurvey = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [questIndex, setQuestIndex] = useState(0);
  const steps = ["Welcome", "Q1", "Q2", "Q3", "Q4", "Finish"];

  const questions = [
    "Question1",
    "Question2",
    "Question3",
    "Question4",
    "Question5",
    "Question6",
  ];

  const [value, setValue] = useState(50);
  const marks = [
    { label: "Strongly Disagree", value: 0 },
    { label: "Disagree", value: 25 },
    { label: "Neutral", value: 50 },
    { label: "Agree", value: 75 },
    { label: "Strongly Agree", value: 100 },
  ];

  const handleChange = (e) => {
    const rawValue = Number(e.target.value);
    // Snap to nearest mark
    const closest = marks.reduce((prev, curr) =>
      Math.abs(curr.value - rawValue) < Math.abs(prev.value - rawValue)
        ? curr
        : prev
    );
    setValue(closest.value);
  };
  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="w-full max-w-4xl p-4">
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-6">
          {steps.map((label, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col items-center relative"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white z-[5]
                ${
                  index + 1 === currentStep
                    ? "bg-blue-600 scale-150 ring-2"
                    : "bg-gray-300"
                }`}
              >
                {/* {" "} */}
                {index + 1}
              </div>
              <div className="text-xs mt-3">{label}</div>
              {/* Progress-Line */}
              {index < steps.length - 1 && (
                <div className="absolute top-4  ml-40 w-full h-1 bg-gray-300 z-[0]">
                  <div
                    className={`h-1 ${
                      index + 1 < currentStep ? "bg-blue-600" : ""
                    }`}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Question Card */}
        <div className="bg-white shadow-blue-300 shadow-2xl rounded-xl p-6 text-center ring-1 ring-blue-500">
          <h2 className="text-lg font-semibold mb-4">
            {questions[questIndex]}
          </h2>

          <div className="w-full p-6 text-black rounded-lg ">
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-semibold">
                Select your opinion
              </label>
              <span className="text-sm font-semibold">
                {marks.find((m) => m.value === value)?.label}
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              step="25"
              value={value}
              onChange={handleChange}
              className="w-full h-2 rounded-lg appearance-none bg-blue-200 accent-blue-500"
            />

            {/* Labels */}
            <div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
              {marks.map((mark) => (
                <span
                  key={mark.value}
                  className={`w-16 text-center ${
                    mark.value === value ? "text-blue font-semibold" : ""
                  }`}
                >
                  {mark.label}
                </span>
              ))}
            </div>
          </div>

          <p className="text-gray-500 text-sm mt-3">
            Rate your best satisfaction level
          </p>

          <div className="flex justify-between mt-6">
            <button
              className="px-6 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
              onClick={() => {
                setCurrentStep(Math.max(1, currentStep - 1));
                setQuestIndex(Math.max(0, questIndex - 1));
              }}
            >
              Back
            </button>
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-700"
              onClick={() => {
                setCurrentStep(Math.min(steps.length, currentStep + 1));
                setQuestIndex(Math.min(questions.length - 1, questIndex + 1));
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
