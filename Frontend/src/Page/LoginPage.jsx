import { useState, useContext } from "react";
import AuthContext from "../utils/authContext";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../utils/api"; 

function LoginPage() {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false); // Toggle between login & signup

  const [formData, setFormData] = useState({
    userName: "", // Required only for signup
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    const { userName, email, password } = formData;
  
    if (!email || !password || (isSignup && !userName)) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }
  
    try {
      let response;
      if (isSignup) {
        response = await signup({ userName, email, password });
        alert("Signup successful! Please login.");
        setFormData({ userName: "", email: "", password: "" });
        setIsSignup(false);
      } else {
        response = await login({ email, password });
  
        //  Passing user data along with token
        loginUser(response.data.token, response.data.user.userName);
        
        setFormData({ userName: "", email: "", password: "" });
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  }
  

  return (
    <div className="flex items-center justify-center w-full h-full sm:h-[100vh] bg-[rgba(240,244,249,1)]">
      <div className="w-[70%] flex h-[90%] sm:h-[90%] lg:h-[70%] bg-white p-9 rounded-4xl flex-col sm:flex-row items-center justify-between sm:items-baseline">
        <div className="flex flex-col gap-5 w-1/2">
        <img
              src="https://cdn-icons-png.flaticon.com/128/300/300221.png"
              alt="google"
              className="h-14 w-14"
            /> 
          <h2 className="text-4xl">{isSignup ? "Create Account" : "Sign In"}</h2>
          <p>{isSignup ? "Sign up to start using YouTube" : "to continue to YouTube"}</p>
        </div>

        <div className="w-1/2 mt-10">
          <form className="flex flex-col gap-[20px] mb-6" onSubmit={handleSubmit}>
            {isSignup && (
              <input
                type="text"
                name="userName"
                placeholder="Username"
                value={formData.userName}
                onChange={handleChange}
                className="border-1 w-[30vw] p-[1rem] focus:border-gray-400 focus:outline-none rounded-lg"
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border-1 w-[30vw] p-[1rem] focus:border-gray-400 focus:outline-none rounded-lg"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border-1 w-[30vw] p-[1rem] focus:border-gray-400 focus:outline-none rounded-lg"
            />

            {error && <p className="text-red-500">{error}</p>}

            <button
              type="submit"
              className={`bg-blue-700 text-white p-2 w-[100px] rounded-3xl cursor-pointer ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Loading..." : isSignup ? "Sign Up" : "Login"}
            </button>
          </form>

          <p>
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? "Login" : "Create Account"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
