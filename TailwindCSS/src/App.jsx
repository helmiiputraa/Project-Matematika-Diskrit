import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import PredictForm from "./components/PredictForm";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow bg-purple-50">
        {/* Homepage Content */}
        <div className="container mx-auto px-4">
          <HomePage />
        </div>

        {/* Prediction Form Section */}
        <div className="py-8">
          <PredictForm />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
