import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

function PulsesyncForm() {
  const [active, setactive] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    audience: "",
    dueDate: "",
  });

  const [questions, setQuestions] = useState ([]);

  useEffect(() => {
    if (active === 4 && questions.length === 0) {
      handleAsk();
    }
  }, [active]);

  const handleAsk = async () => {
    setLoading(true);
    try {
      const prompt = `Generate only 5 pulse survey questions (no intro or explanation) for a survey titled "${formData.title}" under category "${formData.category}". Just return questions as plain list.`;

      const response = await axios.post("http://localhost:5000/api/ask", {
        message: prompt,
      });

      const rawText = response.data.reply.trim();

      let parsedQuestions = [];

      try {
        const jsonParsed = JSON.parse(rawText);
        if (Array.isArray(jsonParsed)) {
          parsedQuestions = jsonParsed.map((q) => ({
            text: q.text || q,
            category: formData.category || "",
          }));
        } else {
          throw new Error("Not a valid array");
        }
      } catch (err) {
        parsedQuestions = rawText
          .split("\n")
          .filter((line) => line.trim().match(/^(\*|\d+\.)\s+/))
          .map((line) => ({
            text: line.replace(/^(\*|\d+\.)\s+/, "").trim(),
            category: formData.category || "",
          }));
      }

      setQuestions(parsedQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  function PreviewStep() {
    return (
      <div className="space-y-6 p-10 border bg-white shadow-50 border-gray-400 rounded-lg">
        <h1 className="tab-text">Step 4: Review & Launch</h1>
        <h3 className="text-sm mt-1 text-gray-600">
          Review your setup and edit questions if needed.
        </h3>

        <div className="p-4 space-y-3">
          <div>
            <strong>Survey Title:</strong> {formData.title}
          </div>
          <div>
            <strong>Description:</strong> {formData.description}
          </div>
          <div>
            <strong>Category:</strong> {formData.category}
          </div>
          <div>
            <strong>Audience:</strong> {formData.audience}
          </div>
          <div>
            <strong>Due Date:</strong> {formData.dueDate}
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Generated Questions</h3>
            {questions.length > 0 ? (
              questions.map((q, i) => (
                <div key={i} className="mb-4 space-y-2 p-3 border rounded-md">
                  <textarea
                    value={q.text}
                    onChange={(e) => {
                      const updated = [...questions];
                      updated[i] = { ...updated[i], text: e.target.value };
                      setQuestions(updated);
                    }}
                    rows={1}
                    ref={(el) => {
                      if (el) {
                        el.style.height = "auto";
                        el.style.height = `${el.scrollHeight}px`; 
                      }
                    }}
                    onInput={(e) => {
                      e.target.style.height = "auto"; 
                      e.target.style.height = `${e.target.scrollHeight}px`; 
                    }}
                    className="w-full resize-none p-2 border rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Question text"
                  />

                  <select
                    value={q.category}
                    onChange={(e) => {
                      const updated = [...questions];
                      updated[i] = { ...updated[i], category: e.target.value };
                      setQuestions(updated);
                    }}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select category</option>
                    <option value="Recognition">Recognition</option>
                    <option value="Relationship with Manager">
                      Relationship with Manager
                    </option>
                    <option value="Satisfaction">Satisfaction</option>
                    <option value="Relationship with Peers">
                      Relationship with Peers
                    </option>
                  </select>
                </div>
              ))
            ) : loading ? (
              <p>Loading questions...</p>
            ) : (
              <p>No questions generated.</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  function Changeform() {
    switch (active) {
      case 1:
        return (
          <div className="space-y-6 p-10 border bg-white shadow-50 border-gray-400 rounded-lg">
            <h1 className="tab-text">Step 1: Basic Information</h1>
            <div className="space-y-4 p-4">
              <h3 className="text-sm font-semibold">Survey Title</h3>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g., Q3 Employee Feedback"
                className="w-full p-2 border rounded-md"
              />

              <h3 className="text-sm font-semibold">Description</h3>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              />

              <h3 className="text-sm font-semibold">Category</h3>
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select a category</option>
                <option value="Recognition">Recognition</option>
                <option value="Relationship with Manager">
                  Relationship with Manager
                </option>
                <option value="Satisfaction">Satisfaction</option>
                <option value="Relationship with Peers">
                  Relationship with Peers
                </option>
              </select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 p-10 border bg-white shadow-50 border-gray-400 rounded-lg">
            <h1 className="tab-text">Step 2: Target Audience</h1>
            <div className="space-y-4 p-4">
              <h3 className="text-sm font-semibold">Target Audience</h3>
              <select
                value={formData.audience}
                onChange={(e) =>
                  setFormData({ ...formData, audience: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select audience</option>
                <option value="All Employees">All Employees</option>
                <option value="Managers">Managers</option>
              </select>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 p-10 border bg-white shadow-50 border-gray-400 rounded-lg">
            <h1 className="tab-text">Step 3: Schedule</h1>
            <div className="space-y-4 p-4">
              <h3 className="text-sm font-semibold">Survey Due Date</h3>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
        );
      case 4:
        return <PreviewStep />;
      default:
        return null;
    }
  }

  return (
    <>
      <section className="text-center p-4">
        <h1 className="text-2xl font-bold">Create New Survey</h1>
        <p className="text-gray-600">Set up a new pulse survey for your team</p>
      </section>

      <section className="max-w-3xl md:mx-auto mx-2">
        {Changeform()}
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setactive((prev) => Math.max(1, prev - 1))}
            className="flex items-center gap-2 border px-4 py-2 rounded-lg border-slate-400"
          >
            <ArrowLeft />
            Back
          </button>
          <button
            onClick={() => setactive((prev) => Math.min(4, prev + 1))}
            className="flex items-center gap-2 border px-4 py-2 rounded-lg bg-blue-500 text-white"
          >
            Next
            <ArrowRight />
          </button>
        </div>
      </section>
    </>
  );
}

export default PulsesyncForm;
