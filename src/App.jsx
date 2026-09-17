import { useState } from "react";
import Container from "./components/Container";
import Header from "./components/Header";
import BoliviaMap from "./components/BoliviaMap";
import InformationSection from "./components/InformationSection";
import CityDetail from "./components/CityDetail";
import { useWeather } from "./hooks/useWeather";

const CITY_COLORS = {
  sucre: "#ec4899",
  laPaz: "#a855f7",
  cochabamba: "#10b981",
  oruro: "#eab308",
  potosi: "#ef4444",
  tarija: "#14b8a6",
  santaCruz: "#3b82f6",
  trinidad: "#06b6d4",
  cobija: "#f97316",
};

function App() {
  const [selectedCity, setSelectedCity] = useState(null);

  const { data, loading, error } = useWeather(selectedCity);

  const handleSelectCity = (cityKey) => {
    setSelectedCity(cityKey);
  };

  const handleBack = () => {
    setSelectedCity(null);
  };

  const accentColor = selectedCity
    ? (CITY_COLORS[selectedCity] ?? "#818cf8")
    : "#818cf8";

  return (
    <Container>
      <Header />
      <main className="grid min-h-[calc(100vh-5rem)] grid-cols-1 gap-6 py-4 lg:grid-cols-2">
        <BoliviaMap
          selectedStation={selectedCity}
          onSelectStation={handleSelectCity}
        />
        <div className="flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[#050813]/95 p-4 shadow-2xl backdrop-blur-xl">
          {selectedCity ? (
            <CityDetail
              cityKey={selectedCity}
              weatherData={data}
              loading={loading}
              error={error}
              accentColor={accentColor}
              onBack={handleBack}
            />
          ) : (
            <InformationSection
              selectedStation={selectedCity}
              onSelectStation={handleSelectCity}
            />
          )}
        </div>
      </main>
    </Container>
  );
}

export default App;
