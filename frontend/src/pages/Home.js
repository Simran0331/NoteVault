import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Note from '../components/Note'
import Fotter from '../components/Fotter'
import Oops from '../components/Oops'
import { useNavigate } from 'react-router-dom'
const Home = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [userData, setUserData] = useState(null);
  const [deleteNote, setDeleteNote] = useState(null);
  let getNotes = () => {
    fetch("https://notesapp-1-56xy.onrender.com/getNotes", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: localStorage.getItem("userID") })
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.success === false) setError(data.msg);
      else setData(data);
    });
  };
  function getUserDetails() {
    fetch("https://notesapp-1-56xy.onrender.com/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: localStorage.getItem("userID") })
    })
    .then(resp => resp.json())
    .then(data => {
      if (data.success === false) navigate("/login");
      else setUserData(data);
    })
  }
  useEffect(() => {
    getNotes();
    getUserDetails();
  }, []);
  const handleDelete = () => {
    if (!deleteNote) return;
    fetch("https://notesapp-1-56xy.onrender.com/deleteNote", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ noteId: deleteNote._id })
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.success) {
          setDeleteNote(null);
          window.location.reload();
        } else {
          alert("Something went wrong");
        }
      })
      .catch(err => console.log(err));
  };
  return (
    <>
      <Navbar />
      <div className='mt-6 flex items-center justify-between w-screen px-12'>
        <h1 className='text-3xl font-semibold text-gray-700'>Hi, {userData ? userData.name : ""}</h1>
        <div className="relative w-[380px]">
          <input 
            onKeyUp={(e) => { if (e.key === "Enter") navigate(`/search?query=${query}`); }} 
            onChange={(e) => setQuery(e.target.value)} 
            value={query} 
            type="text" 
            placeholder='Search Notes' 
            className='w-full p-3 rounded-lg text-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-transform duration-300 transform hover:scale-105' 
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-12 py-6">
        {data ? (
          data.map((el, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-105">
              <Note index={index} note={el} setDeleteNote={setDeleteNote} />
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center w-full">
            <Oops 
              title={"No Note Found"} 
              image={require("../Images/oops2.png")} 
              buttonTitle={"Add Note"} 
              buttonLink={"/addNewNote"} 
            />
          </div>
        )}
      </div>
      <Fotter />
      {deleteNote && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-md z-[99999]">
          <div className="bg-white rounded-lg shadow-lg p-5 w-[28vw] h-auto text-center">
            <h3 className="text-[20px] font-semibold">
              Delete Note <span className="text-[#578df5]">“{deleteNote.title}”</span>
            </h3>
            <p className="text-gray-600 text-[16px] my-2 leading-[1.5]">
              Do you want to delete this note?
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <button 
                onClick={handleDelete}
                className="w-[45%] py-2 bg-[#f55757] text-white rounded-md font-medium"
              >
                Delete
              </button>
              <button 
                onClick={() => setDeleteNote(null)}
                className="w-[45%] py-2 bg-[#578df5] text-white rounded-md font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Home;
