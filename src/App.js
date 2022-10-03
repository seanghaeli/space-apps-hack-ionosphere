import './App.css';
import Globe from 'react-globe.gl';
import { useEffect, useState, useRef } from 'react';
import jsonData from "./dat.json";


function App() {
  const [pointData, setPointData] = useState([]);
  const globeEl = useRef();
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const N = jsonData.latitude.length;
    const pointData = [];
    let min = jsonData.electronDensity[10];
    let max = jsonData.electronDensity[10];
    let avg = 0;

    for (let i = 0; i < N; i++) {
      if (i % 100 === 0) {
        pointData.push({
          lat: jsonData.latitude[i],
          lng: jsonData.longitude[i],
          size: 0,
          weight: jsonData.electronDensity[i]
        })
      }
      if (jsonData.electronDensity[i] > max) {
        max = jsonData.electronDensity[i];
      }
      if (jsonData.electronDensity[i] > 0 && jsonData.electronDensity[i] < min) {
        min = jsonData.electronDensity[i]
      }
      if (jsonData.electronDensity[i] > 0) {
        avg += jsonData.electronDensity[i]
      }
    }
    avg = avg / N;

    setStats([max, min, avg])
    setPointData(pointData);
  }, []);

  // useEffect(() => {
  //   // Auto-rotate
  //   globeEl.current.controls().autoRotate = true;
  //   globeEl.current.controls().autoRotateSpeed = 0.3;
  // }, []);

  let colorPicker = (weight) => {
    const distFromMin = Math.abs(weight - stats[1]);
    const distFromMax = Math.abs(weight - stats[0]);
    const distFromAvg = Math.abs(weight - stats[2]);
    if (distFromMin < distFromMax && distFromMin < distFromAvg) {
      return '#fff33b'
    }
    if (distFromAvg < distFromMax && distFromAvg < distFromMin) {
      return '#f3903f'
    }
    if (distFromMax < distFromAvg && distFromMax < distFromMin) {
      return '#e93e3a'
    }
  }

  return (
    <div className="App">
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"

        hexBinPointsData={pointData}
        hexBinPointWeight="weight"
        hexAltitude={d => 1 / (1 + Math.exp(-(stats[2] - d.sumWeight) / stats[2])) / 100}
        hexBinResolution={3}
        hexMargin={0}
        hexTopColor={d => colorPicker(d.sumWeight)}
        hexSideColor={d => colorPicker(d.sumWeight)}
        hexBinMerge={true}
      />,
      {console.log(stats)}
    </div>
  );
}

export default App;
