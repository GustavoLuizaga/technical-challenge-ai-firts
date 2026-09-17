import { useState } from "react";
import Container from "./components/Container";
import Header from "./components/Header";
import BoliviaMap from "./components/BoliviaMap";
import InformationSection from "./components/InformationSection";

function App() {
  const [selectedStation, setSelectedStation] = useState("trinidad");

  return (
    <Container>
      <Header />
      <main className="grid min-h-[calc(100vh-4rem)] grid-cols-1 gap-6 py-6 lg:grid-cols-[2fr_1fr]">
        <BoliviaMap
          selectedStation={selectedStation}
          onSelectStation={setSelectedStation}
        />
        <InformationSection
          selectedStation={selectedStation}
          onSelectStation={setSelectedStation}
        />
      </main>
    </Container>
  );
}

export default App;
