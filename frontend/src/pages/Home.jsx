import { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PredictionForm from "../components/PredictionForm";
import ResultCard from "../components/ResultCard";

function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen overflow-hidden bg-slate-950 text-white relative">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/20 blur-[140px]" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/20 blur-[140px]" />

      <div className="absolute top-1/3 left-1/2 w-80 h-80 -translate-x-1/2 bg-purple-600/20 blur-[140px]" />

      <Navbar />

      <main className="max-w-7xl mx-auto px-6">

        {/* Hero Section */}

        <section className="text-center py-20">

          <span className="px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">

            🚀 AI Powered Machine Learning

          </span>

          <h1 className="mt-8 text-6xl md:text-7xl font-black leading-tight">

            Predict

            <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent">

              Calories Burned

            </span>

          </h1>

          <p className="mt-8 max-w-3xl mx-auto text-lg text-slate-400 leading-8">

            Predict calories burned during exercise using an
            XGBoost Machine Learning model deployed with
            FastAPI and powered by a modern React frontend.

          </p>

        </section>

        {/* Cards */}

        <section className="grid lg:grid-cols-2 gap-8">

          <div className="rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl shadow-2xl p-10">

            <h2 className="text-3xl font-bold">
              Prediction Form
            </h2>

            <PredictionForm
              setLoading={setLoading}
              setResult={setResult}
            />

          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/40 backdrop-blur-xl shadow-2xl p-10">

            <h2 className="text-3xl font-bold mb-8">
              Prediction Result
            </h2>

            <ResultCard
              loading={loading}
              result={result}
            />

          </div>

        </section>

      </main>

      <Footer />

    </div>
  );
}

export default Home;