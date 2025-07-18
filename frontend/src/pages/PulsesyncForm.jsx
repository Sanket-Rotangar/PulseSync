import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

const STEP_TITLES = ["Basic Information", "Target Audience", "Schedule", "Review & Launch"];
const STEP_DESCRIPTIONS = [
  "Survey title and category",
  "Who should take this survey",
  "When the survey should close",
  "Confirm and publish"
];
const CATEGORY_OPTIONS = ["Recognition", "Relationship with Manager", "Satisfaction", "Relationship with Peers"];
const TYPE_OPTIONS = [
  "emoji-scale",
  "slider",
  "toggle",
  "star-rating",
  "radio-group",
  "checkbox-group",
  "open-ended"
];

const mapType = (type) =>
  ({
    smiley: "emoji-scale",
    bar: "slider",
    text: "open-ended",
    ...Object.fromEntries(TYPE_OPTIONS.map((t) => [t, t]))
  }[type.toLowerCase()] || "open-ended");

const sanitizeJSON = (raw) => raw.replace(/```json|```/g, "").trim();

function PulsesyncForm({ prop: formopen }) {
  const [active, setActive] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    audience: "",
    dueDate: ""
  });
  const [questions, setQuestions] = useState([]);

  const handleAsk = async (count = 5) => {
    setLoading(true);
    try {
      const prompt = count === 1
        ? `Give me 1 pulse survey question and a recommended question type (emoji-scale, slider, toggle, star-rating, radio-group, checkbox-group, open-ended) for the topic "${formData.title}" under category "${formData.category}". Respond as JSON: { "question": "...", "type": "..." }`
        : `Generate ${count} pulse survey questions for a survey titled "${formData.title}" under category "${formData.category}". Each question should have a 'question' and 'type'. Respond with only a JSON array.`;

      const { data } = await axios.post("http://localhost:5000/api/ask", { message: prompt });
      const parsed = JSON.parse(sanitizeJSON(data.reply));
      const newQuestions = Array.isArray(parsed) ? parsed : [parsed];

      setQuestions((prev) => [
        ...prev,
        ...newQuestions.map((q) => ({
          question: q.question || "",
          category: formData.category || "",
          questionType: mapType(q.type),
          answer: "",
          skipped: false,
        }))
      ]);
    } catch (err) {
      console.error("Failed to fetch questions:", err);
      alert("Question generation failed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (active === 4 && questions.length === 0) handleAsk();
  }, [active]);

  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const renderStep = () => {
    const commonInputClass = "w-full p-2 border rounded-md";

    switch (active) {
      case 1:
        return (
          <StepWrapper title="Step 1: Basic Information">
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Survey Title"
              className={commonInputClass}
            />
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Description"
              className={commonInputClass}
            />
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className={commonInputClass}
            >
              <option value="">Select category</option>
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </StepWrapper>
        );

      case 2:
        return (
          <StepWrapper title="Step 2: Target Audience">
            <select
              value={formData.audience}
              onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
              className={commonInputClass}
            >
              <option value="">Select audience</option>
              <option value="All Employees">All Employees</option>
            </select>
          </StepWrapper>
        );

      case 3:
        return (
          <StepWrapper title="Step 3: Schedule">
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className={commonInputClass}
            />
          </StepWrapper>
        );

      case 4:
        return (
          <StepWrapper title="Step 4: Review & Launch" subtitle="Review your setup and edit questions if needed.">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key}><strong>{key[0].toUpperCase() + key.slice(1)}:</strong> {value}</div>
            ))}
            <h3 className="font-semibold mt-4 mb-2">Generated Questions</h3>
            {loading ? <p>Loading questions...</p> : questions.length === 0 ? <p>No questions generated.</p> : (
              questions.map((q, i) => (
                <div key={i} className="relative mb-6 p-4 border rounded-md hover:shadow-md group space-y-3">
                  <textarea
                    value={q.question}
                    onChange={(e) => updateQuestion(i, "question", e.target.value)}
                    rows={1}
                    onInput={(e) => {
                      e.target.style.height = "auto";
                      e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                    className="w-full resize-none p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />

                  <select
                    value={q.category}
                    onChange={(e) => updateQuestion(i, "category", e.target.value)}
                    className={commonInputClass}
                  >
                    <option value="">Select category</option>
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>

                  <select
                    value={q.questionType}
                    onChange={(e) => updateQuestion(i, "questionType", e.target.value)}
                    className={commonInputClass}
                  >
                    <option value="">Select question type</option>
                    {TYPE_OPTIONS.map((t) => (
                      <option key={t} value={t}>{t.replace("-", " ")}</option>
                    ))}
                  </select>

                  <label className="flex items-center gap-2 text-sm text-gray-700 mt-2">
                    <input
                      type="checkbox"
                      checked={q.skipped}
                      onChange={(e) => updateQuestion(i, "skipped", e.target.checked)}
                    />
                    Mark as skippable
                  </label>

                  <button
                    onClick={() => setQuestions(questions.filter((_, idx) => idx !== i))}
                    className="absolute bottom-2 right-12 font-semibold p-1 shadow-sm shadow-black rounded-lg bg-red-500 text-white hidden group-hover:block"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
            <button
              onClick={() => handleAsk(1)}
              className="mt-2 text-sm px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
            >
              + Add Question
            </button>
          </StepWrapper>
        );

      default:
        return null;
    }
  };

  const isStepValid = () => {
    const { title, category, audience, dueDate } = formData;
    return (active === 1 && title && category) ||
      (active === 2 && audience) ||
      (active === 3 && dueDate) ||
      active === 4;
  };

  return (
    <>
      <section className="relative p-4 flex items-center justify-center gap-4">
        <button className="absolute left-12" onClick={() => formopen(false)}><ArrowLeft /></button>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Create New Survey</h1>
          <p className="text-gray-600">Set up a new pulse survey for your team</p>
        </div>
      </section>

      <section className="my-6 flex md:flex-row w-full gap-14 rounded-xl items-center justify-center">
        {STEP_TITLES.map((label, index) => (
          <div key={index} className="text-center">
            <h1 className={`tab-text ${active === index + 1 ? "text-blue-500" : ""}`}>{label}</h1>
            <p className="text-gray-600 text-xs md:text-sm">{STEP_DESCRIPTIONS[index]}</p>
          </div>
        ))}
      </section>

      <section className="max-w-3xl md:mx-auto mx-2">
        {renderStep()}
        <div className="flex justify-between mt-4">
          <button onClick={() => setActive((prev) => Math.max(1, prev - 1))} className="flex items-center gap-2 border px-4 py-2 rounded-lg border-slate-400">
            <ArrowLeft /> Back
          </button>
          <button
            disabled={!isStepValid()}
            onClick={() => {
              if (!isStepValid()) {
                alert("Please fill all required fields.");
                return;
              }

              if (active === 4) {
                axios.post("http://localhost:5000/survey", questions)
                  .then((res) => console.log(res))
                  .catch((err) => console.log(err));
                alert("Survey published! Check the console.");
              } else {
                setActive((prev) => Math.min(4, prev + 1));
              }
            }}
            className={`flex items-center gap-2 border px-4 py-2 rounded-lg text-white ${isStepValid() ? (active === 4 ? "bg-green-600" : "bg-blue-500") : "bg-gray-400 cursor-not-allowed"}`}
          >
            {active === 4 ? "Publish" : "Next"} <ArrowRight />
          </button>
        </div>
      </section>
    </>
  );
}

function StepWrapper({ title, subtitle, children }) {
  return (
    <div className="space-y-6 p-10 border bg-white shadow-50 border-gray-400 rounded-lg">
      <h1 className="tab-text">{title}</h1>
      {subtitle && <h3 className="text-sm mt-1 text-gray-600">{subtitle}</h3>}
      <div className="space-y-4 p-4">{children}</div>
    </div>
  );
}

export default PulsesyncForm;
