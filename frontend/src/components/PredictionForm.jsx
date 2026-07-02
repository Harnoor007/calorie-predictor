import { useState } from "react";
import {
  User,
  Calendar,
  Ruler,
  Weight,
  Timer,
  HeartPulse,
  Thermometer,
} from "lucide-react";
import api from "../services/api";
import toast from "react-hot-toast";

function PredictionForm({ setLoading, setResult }) {
  const [formData, setFormData] = useState({
    gender: "male",
    age: "",
    height: "",
    weight: "",
    duration: "",
    heart_rate: "",
    body_temp: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
  e.preventDefault();

  try {
    setLoading(true);

    const response = await api.post("/predict", {
      gender: formData.gender,
      age: Number(formData.age),
      height: Number(formData.height),
      weight: Number(formData.weight),
      duration: Number(formData.duration),
      heart_rate: Number(formData.heart_rate),
      body_temp: Number(formData.body_temp),
    });

    setResult(response.data);

    toast.success("Prediction Successful!");

  } catch (error) {

    console.error(error);

    toast.error("Prediction Failed");

  } finally {

    setLoading(false);

  }
}

  const inputClass =
    "w-full rounded-xl bg-slate-900 border border-slate-700 px-4 py-3 outline-none focus:border-cyan-400 transition";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 mt-8"
    >
      <div className="grid md:grid-cols-2 gap-5">

        {/* Gender */}

        <div>
          <label className="block mb-2 text-sm text-slate-300">
            Gender
          </label>

          <div className="relative">
            <User
              size={18}
              className="absolute left-3 top-4 text-slate-400"
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`${inputClass} pl-10`}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        {/* Age */}

        <InputField
          label="Age"
          name="age"
          icon={<Calendar size={18} />}
          value={formData.age}
          onChange={handleChange}
        />

        <InputField
          label="Height (cm)"
          name="height"
          icon={<Ruler size={18} />}
          value={formData.height}
          onChange={handleChange}
        />

        <InputField
          label="Weight (kg)"
          name="weight"
          icon={<Weight size={18} />}
          value={formData.weight}
          onChange={handleChange}
        />

        <InputField
          label="Duration (min)"
          name="duration"
          icon={<Timer size={18} />}
          value={formData.duration}
          onChange={handleChange}
        />

        <InputField
          label="Heart Rate"
          name="heart_rate"
          icon={<HeartPulse size={18} />}
          value={formData.heart_rate}
          onChange={handleChange}
        />

        <div className="md:col-span-2">
          <InputField
            label="Body Temperature (°C)"
            name="body_temp"
            icon={<Thermometer size={18} />}
            value={formData.body_temp}
            onChange={handleChange}
          />
        </div>

      </div>

      <button
        type="submit"
        className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 font-semibold text-lg hover:scale-[1.02] transition"
      >
        Predict Calories 🔥
      </button>
    </form>
  );
}

function InputField({
  label,
  name,
  icon,
  value,
  onChange,
}) {
  return (
    <div>
      <label className="block mb-2 text-sm text-slate-300">
        {label}
      </label>

      <div className="relative">

        <div className="absolute left-3 top-4 text-slate-400">
          {icon}
        </div>

        <input
          type="number"
          step="any"
          name={name}
          value={value}
          onChange={onChange}
          required
          className="w-full rounded-xl bg-slate-900 border border-slate-700 px-10 py-3 outline-none focus:border-cyan-400 transition"
        />

      </div>
    </div>
  );
}

export default PredictionForm;