import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loginimg from '../Images/Loginimg.jpg';

const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let res = await fetch('https://notesapp-1-56xy.onrender.com/login', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    let data = await res.json();
    console.log(data);
    if (data.success === true) {
      alert('Login successful');
      localStorage.setItem('token', data.token);
      localStorage.setItem('userID', data.userID);
      navigate('/');
    } else {
      setError(data.message);
      alert(data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex bg-white p-8 shadow-lg rounded-xl max-w-4xl w-full">
        <div className="w-1/2 flex flex-col justify-center p-6">
          <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
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
              Login
            </button>
          </form>
          <p className="text-center mt-4">
            Don't Have An Account?{' '}
            <Link className="text-blue-500 hover:underline" to="/signUp">
              Sign Up
            </Link>
          </p>
        </div>
        <div className="w-1/2 h-full">
  <img src={Loginimg} alt="Notes App" className="w-full h-full object-cover" />
</div>


      </div>
    </div>
  );
};

export default Login;
