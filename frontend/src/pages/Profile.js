import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Note from '../components/Note';
import Fotter from '../components/Fotter';
import { useNavigate } from 'react-router-dom';
import Avatar from 'react-avatar';
const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [notes, setNotes] = useState([]);
  const [importantNotes, setImportantNotes] = useState([]);
  const [normalNotes, setNormalNotes] = useState([]);
  const [deleteNote, setDeleteNote] = useState(null);
  const navigate = useNavigate();
  function getUserDetails() {
    fetch("https://notesapp-1-56xy.onrender.com/getUserDetails", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: localStorage.getItem("userID") })
    })
      .then(res => res.json())
      .then(data => setUserDetails(data))
      .catch(error => console.error("Error fetching user details:", error));
  }
  function getNotes() {
    fetch("https://notesapp-1-56xy.onrender.com/getNotes", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: localStorage.getItem("userID") })
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setNotes(data);
          setImportantNotes(data.filter(note => note.isImportant));
          setNormalNotes(data.filter(note => !note.isImportant));
        } else {
          setNotes([]);
          setImportantNotes([]);
          setNormalNotes([]);
        }
      })
      .catch(() => {
        setNotes([]);
        setImportantNotes([]);
        setNormalNotes([]);
      });
  }
  useEffect(() => {
    getUserDetails();
    getNotes();
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
          getNotes();
        } else {
          alert("Something went wrong");
        }
      })
      .catch(err => console.log(err));
  };
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center w-screen py-10 bg-gradient-to-b from-gray-400 to-gray-600 text-white shadow-lg">
        <Avatar name={userDetails ? userDetails.name : ""} size="160" round="50%" className="shadow-lg" />
        <h2 className="mt-4 text-2xl font-semibold">{userDetails ? userDetails.name : ""}</h2>
        <p className="text-sm opacity-75">Joined on {userDetails ? new Date(userDetails.date).toDateString() : ""}</p>
        <button onClick={() => {
          localStorage.removeItem("userID");
          navigate("/login");
        }} className="mt-4 px-5 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600">Logout</button>
      </div>
      <div className='w-screen px-10 py-5'>
        <h3 className='text-3xl font-semibold text-center text-gray-700'>Your <span className="text-gray-600">Important</span> Notes</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-10"> 
        {importantNotes.length > 0 ? importantNotes.map((note, index) => (
          <Note key={note._id} note={note} index={index} setDeleteNote={setDeleteNote} />
        )) : <p className="text-center text-gray-500">No important notes found.</p>}
      </div>
      <div className='w-screen px-10 py-5 mt-6'>
        <h3 className='text-3xl font-semibold text-center text-gray-700'>Your <span className="text-gray-600">Normal</span> Notes</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-10 mb-10"> 
        {normalNotes.length > 0 ? normalNotes.map((note, index) => (
          <Note key={note._id} note={note} index={index} setDeleteNote={setDeleteNote} />
        )) : <p className="text-center text-gray-500">No normal notes found.</p>}
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
};
export default Profile;
