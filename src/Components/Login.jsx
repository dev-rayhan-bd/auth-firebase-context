import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProviders";

const Login = () => {
const {signIn,signInWithGoogle} =useContext(AuthContext);

const [error,setError] = useState('')
const handleLogin=event=>{
    event.preventDefault()
    const form =event.target;
    const email =form.email.value;
    const password=form.password.value;
    setError('')
    console.log(email,password);
    signIn(email,password)
    .then(result=>{
      const loggedUser = result.user;
      console.log(loggedUser);
      form.reset()
    })
    .catch(error=>{
      setError(error.message)
    })
}
const handleGoogleSignIn =()=>{
signInWithGoogle()
.then(result=>{
  const loggedUser =result.user;
  console.log(loggedUser);
})
.catch(error=>{
  setError(error.message)
})
}
  return (
    <div className=" min-h-screen bg-base-200">
      <h1 className=" mb-12 text-5xl font-bold text-center">Login now!</h1>
      <form onSubmit={handleLogin} className="flex   items-center justify-center">
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="abc@gmail.com"
                name="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                placeholder="password"
                name="password"
                className="input input-bordered"
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </div>
        </div>
      </form>
      <div className="text-center">
        <Link to="/register">
          Didn't have account?Go to
          <button className="btn btn-link">Register</button>
        </Link>
        <div>
        <button onClick={handleGoogleSignIn} className="btn btn-primary">Google</button>
        </div>
      </div>
      <p className="text-1xl font-bold text-red-700">{error}</p>
    </div>
  );
};

export default Login;
