// // import { Pulsesync } from "./components/Pulsesync"
// import { ProgressSurvey } from "./components/ProgressSurvey"
// import { SmilySurvey } from "./components/SmilySurvey"
// import Test from "./components/Test"

import { useState } from "react"
import PulsesyncForm from "./pages/PulsesyncForm"
import { Pulsesync } from "./pages/Pulsesync"


function App() {
  const [openform , setopenform] = useState(false)
  return (
    <>
    {/* <Test /> */}
    {/* <ProgressSurvey /> */}
    {/* <SmilySurvey /> */}
    <Pulsesync />

    {openform ? <PulsesyncForm prop={setopenform}/> : <Pulsesync prop={setopenform }/>}
    </>
  )
}

export default App


