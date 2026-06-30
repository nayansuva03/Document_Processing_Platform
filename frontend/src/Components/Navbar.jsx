function Navbar({ isLoggedIn, currentView, setCurrentView, onLogin, onLogout }) {

  // Quick dynamic text styling mapper function
  const linkClass = (view) =>
    `font-semibold text-sm px-1 py-5 transition-all border-b-2 ${currentView === view
      ? "text-indigo-600 border-indigo-600"
      : "text-slate-500 border-transparent hover:text-slate-800"
    }`;


  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* App Title Identity */}
          <div onClick={() => setCurrentView("home")} className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <span className="font-extrabold text-slate-800 text-xl tracking-tight">
              Questions<span className="text-indigo-600"> Generator</span>
            </span>
          </div>

          <div className="flex space-x-8 h-full items-center">
            <button onClick={() => setCurrentView("home")} className={linkClass("home")}>
              Home
            </button>
            <button onClick={() => setCurrentView("previous")} className={linkClass("previous")}>
              Previous PDFs
            </button>
            <button onClick={() => setCurrentView("about")} className={linkClass("about")}>
              About
            </button>
          </div>


          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <button
                onClick={onLogin}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                Log In/Sign In
              </button>
            ) : (
              <button
                onClick={onLogout}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              >
                Log out
              </button>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;