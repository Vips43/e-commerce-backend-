import { Link } from "react-router-dom";
import { useAuthStore } from "../store/loginSignupStore";

function Signup() {
  const setSignup = useAuthStore(state => state.setSignup)
  const signup = useAuthStore(state => state.signup)

  const handlesubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData)

    setSignup(formObj)
    console.log(signup)
  }
  return (
    <>
      <section className='bg-gray-100 flex items-center justify-center min-h-[calc(100dvh-4.1rem)]'>
        <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Create Account</h2>

          <form className="signup-form space-y-4" onSubmit={handlesubmit}>

            <>
              <label className="text-gray-600 text-sm">Full Name</label>
              <input name="name" type="text" className="w-full mt-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter your name" />
            </>

            <>
              <label className="text-gray-600 text-sm">Email</label>
              <input name="email" type="email"
                className="w-full mt-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="you@example.com" />
            </>

            <>
              <label className="text-gray-600 text-sm">Password</label>
              <input name="pass" type="password"
                className="w-full mt-1 px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Create a password" />
            </>

            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition">
              Sign Up
            </button>

            <p className="text-center text-sm text-gray-600 mt-2">
              Already have an account?
              <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
            </p>

          </form>
        </div>

      </section>
    </>
  )
}

export default Signup