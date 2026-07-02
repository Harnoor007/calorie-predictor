function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-slate-950/70">

      <div className="max-w-7xl mx-auto h-20 px-6 flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">

            CalorieAI

          </h1>

          <p className="text-xs text-slate-400">

            Machine Learning Prediction

          </p>

        </div>

        <div className="hidden md:flex gap-8 text-slate-300">

          <span>React</span>

          <span>FastAPI</span>

          <span>XGBoost</span>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;