import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Fotter from '../components/Fotter';
import { useNavigate, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
const SingleNotePage = () => {
  let { id } = useParams();
  const [data, setData] = useState(null);
  const [deleteNote, setDeleteNote] = useState(null);
  const navigate = useNavigate();
  function getNote() {
    fetch("https://notesapp-1-56xy.onrender.com/getNote", {
      mode: "cors",
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ noteId: id })
    })
      .then(res => res.json())
      .then(data => setData(data));
  }

  const editNote = () => {
    navigate(`/editNote/${id}`);
  };
  const handleDelete = () => {
    if (!deleteNote) return;

    fetch("https://notesapp-1-56xy.onrender.com/deleteNote", {
      mode: "cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ noteId: id })
    })
      .then(resp => resp.json())
      .then(data => {
        if (data.success) {
          setDeleteNote(null);
          navigate("/");
        } else {
          alert("Something went wrong");
        }
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getNote();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container px-[50px] w-screen min-h-[68vh] h-auto">
        <div className="flex items-start justify-between h-auto my-3">
          <div className="left w-[80%] h-full">
            <h3 className='m-0 p-0 text-3xl text-[#000] line-clamp-1 min-w-[90%]'>
              {data ? data.title : ""}
            </h3>
            <p className='text-[gray]'>
              {data ? new Date(data.date).toDateString() : ""}
            </p>
          </div>
          <div className="right flex items-start gap-1 w-[20%] h-full justify-end">
            <img className='w-[30px] h-[30px] cursor-pointer' onClick={() => setDeleteNote(data)} src={require("../Images/delete.png")} alt="" />
            <img className='w-[35px] h-[35px] cursor-pointer' onClick={editNote} src={require("../Images/edit.png")} alt="" />
          </div>
        </div>
        <p className='text-gray'>{data ? data.description : ""}</p>
        <div className='my-3 w-full'>
          {parse(data ? data.content : "")}
        </div>
      </div>
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
                className="w-[45%] py-2 bg-[#f55757] text-white rounded-md font-medium">
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
      <Fotter />
    </>
  );
};
export default SingleNotePage;
