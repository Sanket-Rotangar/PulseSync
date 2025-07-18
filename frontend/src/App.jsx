// // import { Pulsesync } from "./components/Pulsesync"
// import { ProgressSurvey } from "./components/ProgressSurvey"
// import { SmilySurvey } from "./components/SmilySurvey"
// import Test from "./components/Test"

import { useState } from "react";
import PulsesyncForm from "./pages/PulsesyncForm";
import { Pulsesync } from "./pages/Pulsesync";
import { SmilySurvey } from "./pages/SmilySurvey";

function App() {
  const [openform, setopenform] = useState(false);
  const [openSurvey, setOpenSurvey] = useState(false);
  return (
    <>
      {/* <Test /> */}
      {/* <ProgressSurvey /> */}
      {/* <SmilySurvey /> */}
      {/* <Pulsesync /> */}

      {openform ? (<PulsesyncForm prop={setopenform} />) : openSurvey ? (<SmilySurvey prop={setOpenSurvey} />) : (<Pulsesync openSurvey={setOpenSurvey} prop={setopenform}/>)}
      
    </>
  );
}

export default App;
