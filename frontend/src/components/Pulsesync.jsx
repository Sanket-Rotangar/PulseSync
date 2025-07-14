import { CalendarCheck2, Plus, ChartColumn, PanelLeft } from "lucide-react";
import { useState } from "react";

export const Pulsesync = () => {
  const [value, setToValue] = useState("overview");
  const [active, setactive] = useState(1);
  function changeContent(value) {
    switch (value) {
      case "overview":
        return (
          <>
            <div className="flex flex-col md:flex-row w-full gap-6 rounded-xl">
              {/* left-section */}
              <div className="flex-1 rounded-xl p-4 border shadow-md">
                <div className="p-3">
                  <h1 className="text-2xl font-medium">
                    Recent Survey Performance
                  </h1>
                  <h1 className="text-sm">Latest engagement metrics</h1>
                </div>
                <div className="details flex flex-row border justify-between p-3 mx-2 rounded-xl">
                  <div>
                    <h1 className="text-base font-semibold">
                      Q4 Team Collaboration Check
                    </h1>
                    <h1 className="text-sm">Do Great Things Together</h1>
                  </div>
                  <div>
                    <h1 className="text-xl text-right font-bold">4.2</h1>
                    <h1 className="text-sm">24 responses</h1>
                  </div>
                </div>
                <div className="details flex flex-row border justify-between p-3 mx-2 rounded-xl my-3">
                  <div>
                    <h1 className="text-base font-semibold">
                      Q4 Team Collaboration Check
                    </h1>
                    <h1 className="text-sm">Do Great Things Together</h1>
                  </div>
                  <div>
                    <h1 className="text-xl text-right font-bold">4.2</h1>
                    <h1 className="text-sm">24 responses</h1>
                  </div>
                </div>
              </div>

              {/* right-section */}
              <div className="flex-1 rounded-xl p-4 border shadow-mdx">
                <div className="p-3">
                  <h1 className="text-2xl font-medium">Quick Actions</h1>
                  <h1 className="text-sm">Common tasks</h1>
                </div>
                <div className="details border mt-3 mx-2 rounded-xl hover:bg-gray-100">
                  <button className="rounded-md h-11 flex flex-row justify-center items-center px-5 gap-2">
                    <div>
                      <Plus size={20} color="blue" />
                    </div>
                    <div className="text-base ">Create Survey</div>
                  </button>
                </div>
                <div className="details border mt-3 mx-2 rounded-xl hover:bg-gray-100">
                  <button className="rounded-md h-11 flex flex-row justify-center items-center px-5 gap-2">
                    <div>
                      <ChartColumn size={20} color="green" />
                    </div>
                    <div className="text-base ">View Analytics</div>
                  </button>
                </div>
                <div className="details border mt-3 mx-2 rounded-xl  hover:bg-gray-100">
                  <button className="rounded-md h-11 flex flex-row justify-center items-center px-5 gap-2">
                    <div>
                      <Plus size={20} />
                    </div>
                    <div className="text-base">Review Feedback</div>
                  </button>
                </div>
              </div>
            </div>
          </>
        );

      case "categories":
        return (
          <>
            <div className="md:flex-row w-full border shadow-md">
              <div className="flex-1 rounded-xl p-7">
                <h1 className="text-2xl font-medium">Pulse Categories</h1>
                <h1 className="text-sm">
                  Core values and custom categories for surveys
                </h1>
              </div>
              <div className="grid grid-cols-1 grid-rows-6 my-4 md:grid-cols-3 md:grid-rows-2 border-l-green-200 gap-x-1 gap-y-3">
                <div className="details flex flex-row border justify-between p-3 mx-2 rounded-xl">
                  <div>
                    <h1 className="text-base font-semibold">
                      Q4 Team Collaboration Check
                    </h1>
                    <h1 className="text-sm">Do Great Things Together</h1>
                  </div>
                  <div className="rounded-xl text-white bg-black h-1/2 px-2 flex items-center justify-center">
                    Core
                  </div>
                </div>
                <div className="details flex flex-row border justify-between p-3 mx-2 md:mx-0 rounded-xl">
                  <div>
                    <h1 className="text-base font-semibold">
                      Q4 Team Collaboration Check
                    </h1>
                    <h1 className="text-sm">Do Great Things Together</h1>
                  </div>
                  <div className="rounded-xl text-white bg-black h-1/2 px-2 flex items-center justify-center">
                    Core
                  </div>
                </div>
                <div className="details flex flex-row border justify-between p-3 mx-2 rounded-xl">
                  <div>
                    <h1 className="text-base font-semibold">
                      Q4 Team Collaboration Check
                    </h1>
                    <h1 className="text-sm">Do Great Things Together</h1>
                  </div>
                  <div className="rounded-xl text-white bg-black h-1/2 px-2 flex items-center justify-center">
                    Core
                  </div>
                </div>
                <div className="details flex flex-row border justify-between p-3 mx-2 rounded-xl ">
                  <div>
                    <h1 className="text-base font-semibold">
                      Q4 Team Collaboration Check
                    </h1>
                    <h1 className="text-sm">Do Great Things Together</h1>
                  </div>
                  <div className="rounded-xl text-white bg-black h-1/2 px-2 flex items-center justify-center">
                    Core
                  </div>
                </div>
                <div className="details flex flex-row border justify-between p-3 mx-2 md:mx-0 rounded-xl ">
                  <div>
                    <h1 className="text-base font-semibold">
                      Q4 Team Collaboration Check
                    </h1>
                    <h1 className="text-sm">Do Great Things Together</h1>
                  </div>
                  <div className="rounded-xl text-white bg-black h-1/2 px-2 flex items-center justify-center">
                    Core
                  </div>
                </div>
                <div className="details flex flex-row border justify-between p-3 mx-2 rounded-xl">
                  <div>
                    <h1 className="text-base font-semibold">
                      Q4 Team Collaboration Check
                    </h1>
                    <h1 className="text-sm">Do Great Things Together</h1>
                  </div>
                  <div className="rounded-xl text-white bg-black h-1/2 px-2 flex items-center justify-center">
                    Core
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case "activeSurveys":
        return (
          <>
            <div className="md:flex-row w-full border shadow-md pb-2">
              <div className="flex-1 rounded-xl p-7">
                <h1 className="text-2xl font-medium">Active Surveys</h1>
                <h1 className="text-sm">Currently running pulse surveys</h1>
              </div>
              {/* data */}
              <div className="flex flex-col gap-3 mx-3">
                <div className="details flex flex-row border justify-between p-4 mx-2 rounded-xl">
                  <div className="gap-2 flex flex-col">
                    <h1 className="text-base font-semibold">
                      Q4 Team Collaboration Check
                    </h1>
                    <h1 className="text-sm">
                      How well are we working together this quarter?
                    </h1>
                    <h1 className="text-sm">
                      Category: Do Great Things Together
                    </h1>
                  </div>
                  <div className="gap-4 flex flex-col">
                    <div className="rounded-xl text-white bg-black h-fit  px-2 flex items-center justify-center">
                      active
                    </div>
                    <h1 className="text-sm">Due: 27/07/2025</h1>
                  </div>
                </div>
                <div className="details flex flex-row border justify-between p-4   mx-2 rounded-xl">
                  <div className="gap-2 flex flex-col">
                    <h1 className="text-base font-semibold">
                      Client Success Focus
                    </h1>
                    <h1 className="text-sm">
                      Are we effectively prioritizing client success?
                    </h1>
                    <h1 className="text-sm">
                      Category: Work to Make Client Successful
                    </h1>
                  </div>
                  <div className="gap-4 flex flex-col">
                    <div className="rounded-xl text-white bg-black h-fit px-2 flex items-center justify-center">
                      active
                    </div>
                    <h1 className="text-sm">Due: 27/07/2025</h1>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case "feedback":
        return <>Hello this is feedback</>;
    }
  }

  return (
    <div className="pulsesyncpage">
      {/* Reteamnow Logo */}
      <div className="h-16 flex items-center p-7 border">
        <PanelLeft size={18} strokeWidth={1.5} />
        <h1 className="text-xl font-semibold p-5">Reteamnow</h1>
      </div>

      <div className="flex flex-col gap-8 ">
        {/* PulseSync */}
        <div className="w-full p-7 flex flex-row justify-between justify-items-center">
          <div className="flex flex-col">
            <span className="text-3xl font-bold">PulseSync</span>
            <span className="text-base mt-1">
              Monitor employee engagement and gather valuable feedback
            </span>
          </div>
          <button className="bg-blue-600 rounded-md h-11">
            <h1 className="text-sm font-medium px-2 text-white w-36 flex items-center justify-center">
              + Create Survey
            </h1>
          </button>
        </div>

        {/* 4-cards/ ShowsAnalytics */}
        <div className="w-full flex flex-col md:flex-row md:justify-around gap-4 px-4">
          <div className="flex flex-row md:w-1/2 w-full gap-4 ">
            <div className="boxes flex-1 rounded-xl px-10 py-5 border shadow-md">
              <div className="flex flex-row justify-between">
                <h1 className="text-base font-medium">Active Surveys</h1>
                <CalendarCheck2 size={20} strokeWidth={1.5} />
              </div>
              <div className="text-3xl font-bold">2</div>
              <div className="text-sm">Currently running</div>
            </div>
            <div className="boxes flex-1 border shadow-md rounded-xl px-10 py-5">
              <div className="flex flex-row justify-between">
                <h1 className="text-base font-medium">Total Responses</h1>
                <CalendarCheck2 size={20} strokeWidth={1.5} />
              </div>
              <div className="text-3xl font-bold">66</div>
              <div className="text-sm">This Month</div>
            </div>
          </div>
          <div className="flex flex-row w-full md:w-1/2 gap-4 h-32">
            <div className="boxes flex-1 border shadow-md rounded-xl px-10 py-5">
              <div className="flex flex-row justify-between">
                <h1 className="text-base font-medium">Response Rate</h1>
                <CalendarCheck2 size={20} strokeWidth={1.5} />
              </div>
              <div className="text-3xl font-bold">
                80.3<span className="font-medium">%</span>
              </div>
              <div className="text-sm">Average across surveys</div>
            </div>
            <div className="boxes flex-1  border shadow-md rounded-xl px-10 py-5">
              <div className="flex flex-row justify-between">
                <h1 className="text-base font-medium">Overall Rating</h1>
                <CalendarCheck2 size={20} strokeWidth={1.5} />
              </div>
              <div className="text-3xl font-bold">4.0/5</div>
              <div className="text-sm">Average engagement</div>
            </div>
          </div>
        </div>

        {/* 4-optionsToSelect */}
        <div className="bg-blue-50 flex flex-row gap-8 h-fit py-1 ml-10 w-fit px-4 rounded-lg ">
          <button
            className={`activeClass flex justify-center items-center ${active == 1 ? "bg-blue-500 p-1 rounded-lg px-2 text-white font-semibold": ""}`}
            onClick={() => {
              setToValue("overview");
              setactive(1);
            }}
          >
            Overview
          </button>
          <button
            className={`activeClass flex justify-center items-center ${active == 2 ? "bg-blue-500 p-1 rounded-lg px-2 text-white font-semibold": ""}`}
            onClick={() => {
              setToValue("categories");
              setactive(2);
            }}
          >
            Categories
          </button>
          <button
            className={`activeClass flex justify-center items-center ${active == 3 ? "bg-blue-500 p-1 rounded-lg px-2 text-white font-semibold": ""}`}
            onClick={() => {
              setToValue("activeSurveys");
              setactive(3);
            }}
          >
            Active Serveys
          </button>
            <button
              className={`flex justify-center items-center ${active == 4 ? "bg-blue-500 p-1 rounded-lg px-2 text-white font-semibold": ""}`}
              onClick={() => {
                setToValue("feedback");
                setactive(4);
              }}
            >
              Feedback
            </button>
        </div>

        <div className="p-4">{changeContent(value)}</div>
      </div>
    </div>
  );
};
