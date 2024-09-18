import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import RouterConfig from "./router/routerConfig";


function App() {
  return (
    <Router>
      <div className="App">
        <Toaster position="top-center" />
        <Header />

        <div className="container">
          <RouterConfig />
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
