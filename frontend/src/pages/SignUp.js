import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignUpimg from '../Images/signupimg.jpg';
const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch('https://notesapp-1-56xy.onrender.com/signUp', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, username }),
    });
    let data = await res.json();
    console.log(data);
    if (data.success === true) {
      alert('Registration successful');
      navigate('/login');
    } else {
      setError(data.message);
      alert(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex bg-white p-8 shadow-lg rounded-xl max-w-4xl w-full">
        <div className="w-1/2 flex justify-center items-center">
          <img src={SignUpimg} alt="Sign Up" className="w-full transition-transform duration-300 hover:scale-105" />
        </div>
        <div className="w-1/2 flex flex-col justify-center p-6">
          <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition transform hover:scale-105"
              type="submit"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center mt-4">
            Already Have An Account?{' '}
            <Link className="text-blue-500 hover:underline" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignUp;
