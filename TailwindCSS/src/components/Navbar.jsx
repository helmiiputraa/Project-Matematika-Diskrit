import { useEffect, useState } from "react";

const Navbar = () => {
  const [show, setshow] = useState(false);
  const [scroll, setscroll] = useState(false);

  const handleClick = () => {
    setshow(!show);
    // console.log(show);
  };

  let menuActive = show ? "left-0" : "-left-full";

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 5) {
        // console.log("testing");
        setscroll(true);
        setshow(false);
      } else {
        setscroll(false);
      }
    });
  });

  let scrollActive = scroll ? "py-3 bg-white shadow" : "py-2";

  return (
    <div
      className={`navbar fixed top-0 w-full px-6 transition-all ${scrollActive}`}
      style={{ zIndex: 1000 }}
    >
      <div className="container mx-auto px-4">
        <div className="navbar-box flex items-center justify-between">
          <div className="logo">
            <h1 className="sm:text-2xl text-xl font-bold">Analisis Pintar</h1>
          </div>
          <ul
            className={`flex flex-col lg:flex-row lg:gap-12 fixed lg:static lg:w-auto lg:h-auto ${menuActive} top-1/2 -translate-y-1/2 lg:translate-y-0 px-8 py-6 lg:p-0 shadow-lg lg:shadow-none bg-purple-500 lg:bg-transparent font-bold text-white lg:text-black transition-all`}
          >
            <li className="flex items-center gap-3 md:gap-1">
              <i className="ri-home-2-line text-3xl block lg:hidden"></i>
              <a
                href="#"
                className="font-medium opacity-75 text-sm lg:text-base hover:text-purple-600 transition-all"
              >
                Beranda 
              </a>
            </li>
            <li className="flex items-center gap-3 md:gap-1">
              <i className="ri-home-2-line text-3xl block lg:hidden"></i>
              <a
                href="#tentangkami"
                className="font-medium opacity-75 text-sm lg:text-base  hover:text-purple-600 transition-all"
              >
                Tentang Kami
              </a>
            </li>
            <li className="flex items-center gap-3 md:gap-1">
              <i className="ri-home-2-line text-3xl block md:hidden"></i>
              <a
                href="#konsep"
                className="font-medium opacity-75 text-sm md:text-base hover:text-purple-600 transition-all"
              >
                Konsep
              </a>
            </li>
            <li className="flex items-center gap-3 md:gap-1">
              <i className="ri-home-2-line text-3xl block lg:hidden"></i>
              <a
                href="#proyek"
                className="font-medium opacity-75 text-sm lg:text-base hover:text-purple-600 transition-all"
              >
                Proyek
              </a>
            </li>
          </ul>
          <div className="social flex items-center gap-2">
            <a
              href="#proyek"
              className="bg-purple-500 px-5 py-2 rounded-full text-white font-bold hover:bg-purple-600 transition-all"
            >
              Tes Uji
            </a>
            <i
              className="ri-menu-3-line text-3xl block lg:hidden"
              onClick={handleClick}
            ></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
