import ilustrasiimage from "../assets/Images/ilustrasi.png";
import paisalimage from "../assets/Images/paisal.jpeg";
import helmiimage from "../assets/Images/helmi.jpeg";
import supriimage from "../assets/Images/supri.jpeg";
import gambarimage from "../assets/Images/gambar.jpeg";
import botimage from "../assets/Images/bot.jpg";

const HomePage = () => {
  return (
    <div className="homepage pb-10 px-6">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="hero grid md:grid-cols-2 grid-cols-1 items-center gap-20 pt-16">
          <div className="box">
            <h1 className="lg:text-7xl text-4xl font-bold mb-7 transform -translate-y-2">
              Students <br /> Performance <br /> Prediction
            </h1>
            <p className="text-base leading-7 mb-7">
              Mengubah data menjadi strategi yang efektif dan terukur untuk
              mendukung kesuksesan belajar siswa secara optimal
            </p>
            <a
              href="#tentangkami"
              className="bg-purple-500 hover:bg-purple-600 transition-all py-3 px-6 text-white shadow rounded-full text-lg"
            >
              Tentang Kami <i className="ri-eye-line ms-1"></i>
            </a>
          </div>
          <div className="box">
            <img
              src={ilustrasiimage}
              alt="ilustrasi Image"
              className="md:w-full w-[400px] mx-auto md:m-0 rounded-lg"
            />
          </div>
        </div>

        {/* Tentang Kami Section */}
        <div className="about py-16" id="tentangkami">
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-4 text-purple-700">
            Tentang Kami
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Kami adalah mahasiswa Teknik Informatika Universitas Negeri Semarang
            yang berfokus menciptakan solusi teknologi inovatif untuk mendukung
            siswa.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 md:px-16">
            {/* Card 1 */}
            <div className="card bg-white shadow-md rounded-lg overflow-hidden transition-all transform hover:scale-105">
              <img
                src={helmiimage}
                alt="Halmi Image"
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Helmi Putra Noor Pratama
                </h3>
                <p className="text-sm text-gray-600">
                  Seorang yang sedang mendalami web development, saya juga
                  menikmati aktivitas gowes dan hiking sebagai hobi yang
                  membantu saya menjaga keseimbangan antara kuliah dan
                  kesehatan.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="card bg-white shadow-md rounded-lg overflow-hidden transition-all transform hover:scale-105">
              <img
                src={supriimage}
                alt="supri Image"
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Syahrindra Rafli Santosa
                </h3>
                <p className="text-sm text-gray-600">
                  Seorang yang sedang mendalami ilmu cyber security, dengan lari
                  dan hiking sebagai hobi yang memberikan energi dan inspirasi
                  dalam belajar.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="card bg-white shadow-md rounded-lg overflow-hidden transition-all transform hover:scale-105">
              <img
                src={paisalimage}
                alt="paisal Image"
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Muhammad Faisal
                </h3>
                <p className="text-sm text-gray-600">
                  Seseorang yang sedang mendalami UI/UX, dengan voli dan hiking
                  sebagai hobi yang membantu saya menjaga semangat dan
                  kreativitas dalam desain.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Konsep Random Forest */}
        <div
          id="konsep"
          className="konsep  p-8 rounded-xl max-w-4xl mx-auto my-10"
        >
          <h1 className="text-3xl font-extrabold text-center text-purple-800 mb-6">
            Konsep Random Forest
          </h1>
          <p className="text-base text-gray-700 mb-6 text-center leading-relaxed">
            Random Forest adalah metode pembelajaran mesin yang menggabungkan
            banyak pohon keputusan untuk meningkatkan akurasi prediksi dan
            mengurangi risiko overfitting. Algoritma ini memberikan hasil yang
            stabil dan dapat diandalkan.
          </p>

          <div className="image-container flex flex-col md:flex-row justify-center gap-6 mb-6">
            {/* Gambar Kiri */}
            <div className="image flex-1 max-w-[320px] md:max-w-[400px] mx-auto overflow-hidden rounded-lg shadow-md hover:scale-105 transform transition duration-300 my-4">
              <img
                src={gambarimage}
                alt="gambarImage1"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Gambar Kanan */}
            <div className="image flex-1 max-w-[320px] md:max-w-[400px] mx-auto overflow-hidden rounded-lg shadow-md hover:scale-105 transform transition duration-300 my-4">
              <img
                src={botimage}
                alt="bot image"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Penjelasan lebih lanjut */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-6 transition duration-300 hover:shadow-lg my-4">
            <h2 className="text-xl font-semibold text-purple-600 mb-3">
              Cara Kerja Random Forest
            </h2>
            <p className="text-sm text-gray-700 mb-3 leading-relaxed">
              Random Forest bekerja dalam dua fase utama.
            </p>
            <ul className="list-disc pl-5 text-sm text-gray-700">
              <li>
                Pertama, algoritma ini menggabungkan sejumlah N pohon keputusan
                (decision tree) secara acak untuk membentuk sebuah hutan
                keputusan.
              </li>

              <li>
                Kedua, setiap pohon membuat prediksi berdasarkan data yang
                diberikan, dan hasil akhir didapat dengan menggabungkan prediksi
                dari semua pohon, baik melalui voting mayoritas (untuk
                klasifikasi) atau rata-rata (untuk regresi).
              </li>
            </ul>
          </div>

          {/* Bagian Kelebihan */}
          <div className="advantages bg-gray-50 p-6 rounded-lg shadow-md transition duration-300 hover:shadow-lg my-6">
            <h2 className="text-xl font-semibold text-purple-600 mb-3">
              Kelebihan Random Forest
            </h2>
            <ul className="list-disc pl-5 text-sm text-gray-700 leading-relaxed">
              <li>Robust terhadap overfitting dengan banyak pohon.</li>
              <li>Cocok untuk dataset dengan banyak fitur.</li>
              <li>Mampu menangani data yang hilang dengan baik.</li>
              <li>Sederhana untuk dipahami dan diterapkan.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
