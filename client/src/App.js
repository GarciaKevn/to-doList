import "./App.css";
import ListTaskComponent from "./components/ListTaskComponent";


function App() {
  return (
    <div className="App">
      <div className="tareas-lista-principal">
        <h1> My Tasks</h1>
        <div className="container">
          <ListTaskComponent />
        </div>
      </div>
    </div>
  );
}

export default App;
