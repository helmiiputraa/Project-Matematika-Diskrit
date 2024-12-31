import React, { useState } from "react";
import axios from "axios";

const PredictForm = () => {
  const [formData, setFormData] = useState({
    fullName: "", // Menambahkan properti untuk Nama Lengkap
    studyHours: "",
    attendanceRate: "",
    previousGrades: "",
    extracurricular: "",
    parentEducation: "",
  });
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const mapEducationLevel = (level) => {
    const mapping = {
      "SMA/SMK": 1,
      S1: 2,
      S2: 3,
      S3: 4,
    };
    return mapping[level] || 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        fullName: formData.fullName, // Mengirim Nama Lengkap
        studyHours: parseFloat(formData.studyHours),
        attendanceRate: parseFloat(formData.attendanceRate),
        previousGrades: parseFloat(formData.previousGrades),
        extracurricular: formData.extracurricular === "Ya" ? 1 : 0,
        parentEducation: mapEducationLevel(formData.parentEducation),
      });

      if (response.data.status === "error") {
        setError(response.data.message);
      } else if (response.data.status === "fail") {
        setPrediction({
          result: response.data.prediction,
          message: response.data.message,
        });
        setMessage(
          "Jangan patah semangat! Tetap belajar dengan giat dan perbaiki hal-hal yang perlu ditingkatkan. Anda pasti bisa mencapai kelulusan di masa mendatang."
        );
      } else {
        setPrediction({
          result: response.data.prediction,
        });
        if (response.data.prediction === "Lulus") {
          setMessage(
            "Selamat! Anda dinyatakan lulus. Pertahankan prestasi Anda dan tetap semangat dalam menggapai cita-cita."
          );
        } else {
          setMessage(
            "Jangan patah semangat! Tetap belajar dengan giat dan perbaiki hal-hal yang perlu ditingkatkan. Anda pasti bisa mencapai kelulusan di masa mendatang."
          );
        }
      }
    } catch (error) {
      setError("Terjadi kesalahan saat memproses prediksi. Silakan coba lagi.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="proyek"
      className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-bold text-purple-600 text-center mb-6">
        Input Data Siswa
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Kolom Nama Lengkap */}
        <div>
          <label className="block text-gray-700 mb-2">Nama Lengkap</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Masukkan Nama Lengkap"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Kolom Jam Belajar per Minggu */}
        <div>
          <label className="block text-gray-700 mb-2">
            Jam Belajar per Minggu
          </label>
          <input
            type="number"
            name="studyHours"
            value={formData.studyHours}
            onChange={handleChange}
            placeholder="Contoh: 20"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Kolom Persentase Kehadiran */}
        <div>
          <label className="block text-gray-700 mb-2">
            Persentase Kehadiran dalam Satu Semester (%)
          </label>
          <input
            type="number"
            name="attendanceRate"
            value={formData.attendanceRate}
            onChange={handleChange}
            placeholder="Contoh: 90"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Kolom Nilai Semester Sebelumnya */}
        <div>
          <label className="block text-gray-700 mb-2">
            Nilai Semester Sebelumnya
          </label>
          <input
            type="number"
            name="previousGrades"
            value={formData.previousGrades}
            onChange={handleChange}
            placeholder="Contoh: 85"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        {/* Kolom Partisipasi Ekstrakurikuler */}
        <div>
          <label className="block text-gray-700 mb-2">
            Partisipasi dalam Kegiatan Ekstrakurikuler
          </label>
          <select
            name="extracurricular"
            value={formData.extracurricular}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500"
            required
          >
            <option value="">Pilih Jawaban</option>
            <option value="Ya">Ya</option>
            <option value="Tidak">Tidak</option>
          </select>
        </div>

        {/* Kolom Tingkat Pendidikan Orang Tua */}
        <div>
          <label className="block text-gray-700 mb-2">
            Tingkat Pendidikan Orang Tua
          </label>
          <select
            name="parentEducation"
            value={formData.parentEducation}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-purple-500"
            required
          >
            <option value="">Pilih Jawaban</option>
            <option value="SMA/SMK">SMA/SMK</option>
            <option value="S1">S1</option>
            <option value="S2">S2</option>
            <option value="S3">S3</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          {loading ? "Memproses..." : "Kirim"}
        </button>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {prediction && (
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h2 className="font-semibold text-gray-700">Hasil Prediksi:</h2>
          <p className="mt-2 text-lg font-bold text-purple-600">
            {prediction.result}
          </p>
          {prediction.message && (
            <p className="mt-2 text-sm text-gray-600">{prediction.message}</p>
          )}
          {message && <p className="mt-4 text-gray-700">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default PredictForm;
