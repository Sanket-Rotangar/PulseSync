import { useState } from "react";
import PulsesyncForm from "./pages/PulsesyncForm";
import { Pulsesync } from "./pages/Pulsesync";
import { SmilySurvey } from "./pages/SmilySurvey";
// import PdfUploader from "./pages/PdfJs";
// import PdfJs from "./pages/PdfJs";

function App() {
  const [openform, setopenform] = useState(false);
  const [openSurvey, setOpenSurvey] = useState(false);
  return (
    <>
      {/* <Test /> */}
      {/* <ProgressSurvey /> */}
      {/* <SmilySurvey /> */}
      {/* <Pulsesync /> */}
      {/* <PdfJs src='/Fayaz.pdf'/> */}
      {openform ? (<PulsesyncForm prop={setopenform} />) : openSurvey ? (<SmilySurvey prop={setOpenSurvey} />) : (<Pulsesync openSurvey={setOpenSurvey} prop={setopenform}/>)}
      
    </>
  );
}

export default App;
