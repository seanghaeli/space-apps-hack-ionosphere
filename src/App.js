import './App.css';
import Globe from 'react-globe.gl';
import { useEffect, useState } from 'react';
import jsonData from "./dat.json";


function App() {
  const [pointData, setPointData] = useState([]);

  useEffect(() => {
    const pointData = [...Array(1000).keys()].map((i) => ({
      lat: jsonData.latitude[i],
      lng: jsonData.longitude[i],
      size: 0,
      color: ['red', 'red', 'red', 'red'][Math.round(1/(1+Math.exp(-(250000000000-jsonData.electronDensity[i])/250000000000)) * 3)]
    }));

    setPointData(pointData);

    console.log(pointData)
  }, []);

  return (
    <div className="App">
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        pointData={pointData}
        pointAltitude="size"
        pointColor="color"
      />
    </div>
  );
}

export default App;
