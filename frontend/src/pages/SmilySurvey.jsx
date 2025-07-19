import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

export const SmilySurvey = ({prop: openSurvey}) => {
  const [selected, setSelected] = useState(null);
   const [questions, setQuestions] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [questIndex, setQuestIndex] = useState(0);
  // const steps = ["Welcome", "Q1", "Q2", "Q3", "Q4", "Finish"];
  const emojis = ["😞", "😕", "😐", "🙂", "😊"];
  

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/survey"); // Adjust if hosted
        setQuestions(res.data);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };

    fetchQuestions();
  }, []);

  // const emojiMsg = ["Strongly Disagree", "Neutral", "Agree", "Strongly Agree"];
  // const questions = ["Question1", "Question2", "Question3", "Question4", "Question5", "Question6",];
  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
       <button className="absolute left-44 top-40 scale-125" onClick={() => openSurvey(false)}><ArrowLeft /></button>
      <div className="w-full max-w-4xl p-4">
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-6">
          {questions.map((label, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col items-center relative"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white z-[5]
                ${index === questIndex ? "bg-blue-600 scale-150 ring-2" : "bg-gray-300"}`}
              > 
                {index + 1}
              </div>
              <div className="text-xs mt-3">Q{index + 1}</div>
              {/* Progress-Line */}
              {index < questions.length - 1 && (
                <div className="absolute top-4  ml-40 w-full h-1 bg-gray-300 z-[0]">
                  <div
                    className={`h-1 ${index < questIndex ? "bg-blue-600" : ""}`}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Question Card */}
        <div className="bg-white shadow-blue-300 shadow-2xl rounded-xl p-6 text-center ring-1 ring-blue-500">
          <h2 className="text-lg font-semibold mb-4">
           {questions.length === 0 ? "Loading..." : questions[questIndex].question}
          </h2>
            
          {/* Emoji Scale */}
          <div className="flex justify-center space-x-4 text-3xl">
            {emojis.map((emoji, index) => (
              <button
                key={index}
                className={`transition transform hover:scale-110 ${
                  selected === index ? "ring-2 ring-blue-500 rounded-full" : ""
                }`}
                onClick={() => {setSelected(index)} }
              >
                {emoji}
              </button>
            ))}
          </div>

          <p className="text-gray-500 text-sm mt-3">
            Select an emoji that best represents your satisfaction level
          </p>

          <div className="flex justify-between mt-6">
            <button
              className="px-6 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
              onClick={() => {
                setCurrentStep(Math.max(1, currentStep - 1));
                setQuestIndex(Math.max(0, questIndex - 1));
              }}
               disabled={questIndex === 0}
            >
              Back
            </button>
            <button
              className="px-6 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-700"
             onClick={() => {
                if (questIndex < questions.length - 1) {
                  setCurrentStep(currentStep + 1);
                  setQuestIndex(questIndex + 1);
                  setSelected(null);
                } else {
                  alert("✅ Survey Completed!");
                  // Optional: submit answers
                }
              }}
              disabled={questions.length === 0}
            >
            {questIndex === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
