import Recap from './components/Recap';
import './App.scss';
import { useEffect, useState } from "react";

function App() {

  const [recaps, setRecaps] = useState(null)

  useEffect(() => {
    fetch('http://staccah.fattureincloud.it/testfrontend/data.json')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setRecaps(data)
      })
  }, [])

  return (
    <>
      {recaps && <Recap data={recaps} />}
    </>
  )
}

export default App;
