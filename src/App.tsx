import { useState } from "react";
import DashboardMapView from "./components/DashboardMapView";

type Location = {
  id: number;
  name: string;
};

const App = () => {
  const [darkMode, setDarkmode] = useState(false);

  const locations: Location[] = [
    { id: 1, name: "United Kingdom" },
    { id: 2, name: "Germany" },
    { id: 3, name: "Ghana" },
    { id: 4, name: "Brazil" },
    { id: 4, name: "Peru" },
  ];

  return (
    <div className="app">
      <button
        onClick={() => setDarkmode((prev) => !prev)}
        className="mt-5 border text-white bg-red-500 p-3 rounded-full"
      >
        Change color
      </button>
      <div className="my-16">
        <h1 className="my-5 text-4xl text-center">Country Coordinates Map</h1>
        <DashboardMapView darkMode={darkMode} locations={locations}/>
      </div>
    </div>
  );
};

export default App;
