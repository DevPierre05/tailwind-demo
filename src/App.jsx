import Hero from "./components/Hero";
import Card from "./components/Card";


const App = () => {
  return (
    <div className="app">
      <Hero />
      <div className="card-container">
        <Card title="Spring rolls" content="This is the content of card 1." />
        <Card title="Meatpie" content="This is the content of card 2." />
        <Card title="Shortbreads" content="This is the content of card 3." />
        <Card title="Samosas" content="This is the content of card 4." />
      </div>
    </div>
  );
};

export default App;
