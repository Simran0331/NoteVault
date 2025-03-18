import React from "react";
import LinkedinImg from "../Images/linkedin.png";
import InstagramImg from "../Images/instagram.png";
import Mailimg from "../Images/gmail.png";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-6 px-10 flex items-center justify-between shadow-lg">
      <h3 className="text-3xl font-bold tracking-wide px-3 py-1 rounded-lg">NotePad</h3>

      <div className="text-center">
        <p className="text-lg">
          Designed By <span className="font-semibold">Sourabh</span> @2024
        </p>
        <p className="text-sm">&copy; 2024 All Rights Reserved</p>
      </div>

      <div className="text-center">
        <p className="font-semibold text-lg">We Are Social</p>
        <div className="flex items-center gap-3 mt-2">
          <a
            href="https://www.linkedin.com/in/sourabh1112/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition duration-300"
          >
            <img src={LinkedinImg} alt="LinkedIn" className="w-6 h-6" />
          </a>
          <a
            href="https://www.instagram.com/sourabh_._verma/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition duration-300"
          >
            <img src={InstagramImg} alt="Instagram" className="w-6 h-6" />
          </a>
          <a
            href="mailto:sourabhvr8482@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white rounded-full shadow-md hover:scale-110 transition duration-300"
          >
            <img src={Mailimg} alt="Mail" className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;