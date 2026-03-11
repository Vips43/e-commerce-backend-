import { Link, useNavigate } from "react-router-dom";
import Signup from "./Signup";
import { useAuthStore } from "../store/loginSignupStore";

function Login() {
  const setLogin = useAuthStore(state => state.setLogin)
  const navigate = useNavigate();

  const handlesubmit = (e) => {

    e.preventDefault();
    console.log("submitted")
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData)
    setLogin(formObj)
    navigate("/")
  }

  return (
    <>
      <section className='bg-gray-100 flex items-center justify-center min-h-[calc(100dvh-4.1rem)]'>

        <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 border border-gray-100 ">
          <h2 id="loginText" className="text-2xl font-bold text-center mb-6 text-gray-800">Welcome Back</h2>

          <form className="login-form space-y-4" onSubmit={handlesubmit}>

            <>
              <label className="text-gray-600 text-sm">Email</label>
              <input type="email" name="email"
                className="w-full mt-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="you@example.com" />
            </>

            <>
              <label className="text-gray-600 text-sm">Password</label>
              <input type="password" name="pass"
                className="w-full mt-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Your password" />
            </>

            <button type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition">
              Login
            </button>

            <p className="text-center text-sm text-gray-600 mt-2">
              Don’t have an account?
              <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
            </p>

          </form>
        </div>
      </section>
    </>
  )
}

export default Login