import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PredictionForm from "../components/PredictionForm";
import { useState } from "react";
import ResultCard from "../components/ResultCard";

function Home() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-white relative">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-[120px]" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/20 blur-[120px]" />

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* Hero */}

        <div className="text-center">

          <p className="text-cyan-400 font-semibold tracking-widest uppercase">
            Machine Learning Project
          </p>

          <h1 className="text-6xl font-extrabold mt-4 leading-tight">

            Predict Calories
            <br />

            Burned During Exercise

          </h1>

          <p className="mt-6 text-slate-400 max-w-2xl mx-auto text-lg">

            Predict the number of calories burned during a workout using
            an XGBoost Machine Learning model deployed with FastAPI.

          </p>

        </div>

        {/* Cards */}

        <div className="grid lg:grid-cols-2 gap-8 mt-20">

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 min-h-[520px]">

            <h2 className="text-2xl font-bold">
              Prediction Form
            </h2>

            <PredictionForm
                setLoading={setLoading}
                setResult={setResult}
            />

          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 min-h-[520px]">

            <h2 className="text-2xl font-bold">
              Prediction Result
            </h2>

            <ResultCard
                loading={loading}
                result={result}
            />

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default Home;