import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const colors = ["#B2FFFF", "#FFFF00", "#FFB6C1", "#98FB98", "#E6E6FA"];

const Note = ({ note, height, index, setDeleteNote }) => {
  let navigate = useNavigate();

  const editNote = (id) => {
    navigate(`/editNote/${id}`);
  };

  return (
    <>
      <div 
        className="note p-4 rounded-md shadow-md flex flex-col justify-between"
        id={`note${index}`}
        style={{ 
          height: height, 
          backgroundColor: colors[index % colors.length],
          fontFamily: "'Comic Sans MS', cursive, sans-serif",
          border: "3px solid black",
          position: "relative",
        }}
      >
        <div onClick={() => navigate(`/singleNotePage/${note._id}`)}>
          <div className="flex items-center justify-between">
            <p className="text-gray-600 text-[14px] font-semibold">Note {index + 1}</p>
            {note.isImportant && (
              <p className="px-3 py-1 bg-green-500 text-white rounded-md text-sm">
                Important
              </p>
            )}
          </div>
          <h1 className="text-black text-lg font-semibold line-clamp-1 mt-1">{note.title}</h1>
          <p className="text-gray-700 line-clamp-4 text-[15px] leading-[1.4]">{note.description}</p>
        </div>

        <div className="noteBottom flex justify-between items-center mt-auto pt-2">
          <p className="text-gray-500 text-[13px]">{new Date(note.date).toDateString()}</p>
          <div className="flex items-center gap-2">
            <img 
              className="w-8 h-8 cursor-pointer hover:opacity-80" 
              onClick={() => setDeleteNote(note)}
              src={require("../Images/delete.png")} 
              alt="Delete" 
            />
            <img 
              className="w-9 h-9 cursor-pointer hover:opacity-80" 
              onClick={() => editNote(note._id)} 
              src={require("../Images/edit.png")} 
              alt="Edit" 
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Note;
