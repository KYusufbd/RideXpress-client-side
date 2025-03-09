import ThemeToggle from "./components/ThemeToggle";

function App() {
  return (
    <>
      <ThemeToggle />
      <div className="bg-white min-h-screen">
        <h1 className="text-5xl text-center text-primary">
          Welcome to RideXpress
        </h1>
        <h1 className="text-5xl text-center text-primary-content">
          Welcome to RideXpress
        </h1>
        <h1 className="text-5xl text-center text-secondary">
          Welcome to RideXpress
        </h1>
        <h1 className="text-5xl text-center text-secondary-content">
          Welcome to RideXpress
        </h1>
        <h1 className="text-5xl text-center text-accent">
          Welcome to RideXpress
        </h1>
        <h1 className="text-5xl text-center text-accent-content">
          Welcome to RideXpress
        </h1>
        <h1 className="text-5xl text-center text-neutral">
          Welcome to RideXpress
        </h1>
        <h1 className="text-5xl text-center text-neutral-content">
          Welcome to RideXpress
        </h1>
      </div>
    </>
  );
}

export default App;
