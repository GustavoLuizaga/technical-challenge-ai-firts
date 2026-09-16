import Container from "./components/Container";
import Header  from "./components/Header";
import InformationSection from "./components/InformationSection";

function App() {
  return (
    <>
      <Container>
        <Header />
        <main className="grid min-h-[calc(100vh-4rem)] grid-cols-1 gap-6 py-8 md:grid-cols-[2fr_1fr]">
          <section className="rounded-lg border border-white/10 bg-bg-panel p-6">
            <h2 className="text-xl font-semibold">Map Section</h2>
          </section>
          <InformationSection />
        </main>
      </Container>
    </>
  );
}

export default App;
