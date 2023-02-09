import "./App.css";

import TodoSection from "./TodoSection";
import logo from "./assets/Todo.gif";

function App() {
  return (
    <>
      <nav className="navbar">
        <img className="image" src={logo} alt="loading..." />
      </nav>
      <div className="container">
        <TodoSection />
      </div>
    </>
  );
}

export default App;
