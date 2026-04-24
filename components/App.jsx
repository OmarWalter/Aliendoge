function App() {
  return (
    <Web3Provider>
      <FloatingDogs />
      <Nav />
      <Hero />
      <TickerBar />
      {/* <LiveStats /> */}
      <HowItWorks />
      {/* <DashboardPreview /> */}
      <Roadmap />
      <Crew />
      <FAQ />
      <CTAFooter />
    </Web3Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
