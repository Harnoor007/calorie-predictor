import { Flame } from "lucide-react";

function ResultCard({ loading, result }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">

          <div className="w-14 h-14 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <p className="mt-5 text-slate-300">
            Predicting Calories...
          </p>

        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center h-full text-slate-400">
        Your prediction will appear here.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">

      <Flame
        size={60}
        className="text-orange-400"
      />

      <h2 className="text-6xl font-bold mt-6">
        {result.prediction.calories_burned}
      </h2>

      <p className="text-cyan-400 text-xl">
        kcal
      </p>

      <div className="mt-10 w-full space-y-3">

        <Info title="Status" value={result.status} />

        <Info title="Model" value={result.model} />

        <Info title="Unit" value={result.prediction.unit} />

      </div>

    </div>
  );
}

function Info({ title, value }) {
  return (
    <div className="flex justify-between bg-slate-900 rounded-xl px-5 py-3">

      <span className="text-slate-400">
        {title}
      </span>

      <span className="font-semibold">
        {value}
      </span>

    </div>
  );
}

export default ResultCard;