import { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PredictionForm from "../components/PredictionForm";
import ResultCard from "../components/ResultCard";
import { useEffect } from "react";
import api from "../services/api";
import GraphCard from "../components/GraphCard";

function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [graphs,setGraphs]=useState(null);

  useEffect(()=>{

    async function loadGraphs(){

        try{

            const res=await api.get("/analytics");

            setGraphs(res.data);

        }

        catch(err){

            console.log(err);

        }

    }

    loadGraphs();

},[]);

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

        {/* Graphs */}

        <section className="mt-28">

<h1 className="text-5xl font-bold text-center mb-16">

Machine Learning Analytics

</h1>

<div className="grid lg:grid-cols-2 gap-10">

<GraphCard

title="Height vs Weight"

description="This graph shows the relationship between a person's height and weight. Taller individuals generally tend to weigh more."

figure={graphs?.height_weight}

/>

<GraphCard

title="Age vs Calories"

description="Age alone does not strongly determine calories burned. Workout intensity has a much greater effect."

figure={graphs?.age_calories}

/>

<GraphCard

title="Duration vs Calories"

description="Longer workouts generally burn more calories, making Duration one of the strongest predictors."

figure={graphs?.duration_calories}

/>

<GraphCard

title="Heart Rate vs Calories"

description="Higher heart rates usually correspond to more intense exercise and greater calorie expenditure."

figure={graphs?.heart_rate}

/>

<GraphCard

title="Correlation Heatmap"

description="The heatmap displays correlations between all numerical features, helping identify strong relationships."

figure={graphs?.heatmap}

/>

<GraphCard

title="Feature Importance"

description="This chart shows how much each feature contributes to the XGBoost model's predictions."

figure={graphs?.feature_importance}

/>

</div>

</section>

      </main>

      <Footer />

    </div>
  );
}

export default Home;