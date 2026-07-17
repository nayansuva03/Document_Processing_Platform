import { useState } from "react";
import { useDispatch } from "react-redux";
import { setusername } from '../../Redux/userSlice'; 

function Register({ onClose, onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()){
      alert("Please enter both username and password");
      return;
    }
      try{
        const responce = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({username,password}),
        })

        const data = await responce.json();
        if (data.success) {
          console.log("User created:", data.data);
          dispatch(setusername(username));
          onLoginSuccess();
          onClose();  
        } else {
          alert("Registration failed: " + data.error);
        }
      }catch(err){
        console.error(err)
      }
    
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Box */}
      <div className="relative bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl border border-slate-100 transform transition-all animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 text-xl transition-colors"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-extrabold text-slate-800 mt-2">Sign in to access your dashboard</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 mt-2"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;