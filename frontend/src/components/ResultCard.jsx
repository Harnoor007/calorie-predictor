import { Flame } from "lucide-react";

function ResultCard({ loading, result }) {

  if (loading) {

    return (

      <div className="flex justify-center items-center h-full">

        <div className="text-center">

          <div className="w-14 h-14 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin mx-auto"></div>

          <p className="mt-6 text-slate-300">

            Predicting...

          </p>

        </div>

      </div>

    );

  }

  if (!result) {

    return (

      <div className="flex justify-center items-center h-full text-slate-400">

        Prediction will appear here

      </div>

    );

  }

  return (

    <div className="flex flex-col justify-center items-center">

      <Flame
        size={70}
        className="text-orange-400"
      />

      <h1 className="mt-6 text-7xl font-black bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">

        {result.prediction.calories_burned}

      </h1>

      <p className="text-cyan-400 text-xl">

        kcal

      </p>

      <div className="mt-10 w-full space-y-4">

        <Info
          title="Status"
          value={result.status}
        />

        <Info
          title="Model"
          value={result.model}
        />

        <Info
          title="Unit"
          value={result.prediction.unit}
        />

      </div>

    </div>

  );

}

function Info({ title, value }) {

  return (

    <div className="flex justify-between bg-slate-800 rounded-xl px-5 py-4">

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