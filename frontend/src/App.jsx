import { useState } from "react"
import PulsesyncForm from "./pages/PulsesyncForm"
import { Pulsesync } from "./pages/Pulsesync"

function App() {
  const [openform , setopenform] = useState(false)
  return (
    <>

    {openform ? <PulsesyncForm prop={setopenform}/> : <Pulsesync prop={setopenform }/>}
    </>
  )
}

export default App


