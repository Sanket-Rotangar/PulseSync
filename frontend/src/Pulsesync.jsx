export const Pulsesync = () => {
  return (
    <div className="pulse sync page w-screen h-screen">
      <div className="container flex flex-col gap-4">
        <div className="bg-primary-color w-screen p-5 flex flex-row justify-between justify-items-center">
          <div className="flex flex-col">
            <span className="text-3xl font-semibold">PulseSync</span>
          <span className="text-xl ">
            Monitor employee engagement and gather valuable feedback
          </span>
          </div>
            <button className="bg-card-color p-3 h-fit mt-2">+ Create Survey</button>
        </div>
        <div className="bg-primary-text w-screen flex flex-row justify-around h-32">
          <div className="boxes bg-accent-color w-1/5">1</div>
          <div className="boxes  bg-primary-color w-1/5">2</div>
          <div className="boxes  bg-accent-color w-1/5">3</div>
          <div className="boxes  bg-primary-color w-1/5">4</div>
        </div>
        <div className="bg-secondary-text flex flex-row gap-6 h-12 p-1 w-auto ml-10">
          <button className="bg-primary-color p-2 w-auto">Overview</button>
          <button className="p-2 w-auto">Categories</button>
          <button className="p-2 w-auto">Active Serveys</button>
          <button className="p-2 w-auto">Feedback</button>
        </div>
        <div className="bg-primary-text w-screen">
          <div className="bg-secondary-text flex flex-row gap-4 mx-4 min-h-[400px]">
            <div className="bg-primary-color flex-1">1</div>
            <div className="bg-accent-color flex-1">2</div>
          </div>
        </div>
      </div>
    </div>
  );
};
