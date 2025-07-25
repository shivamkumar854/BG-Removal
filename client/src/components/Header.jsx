import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Header = () => {
  const { removeBg } = useContext(AppContext); // ✅ Corrected hook usage and typo

  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-4 lg:px-44 mt-10 sm:mt-20 gap-y-10">
      {/* Left side: heading, text and upload button */}
      <div className="max-w-md mx-auto lg:mx-0 text-center lg:text-left">
        <h1 className="text-4xl lg:text-5xl font-bold text-neutral-700 leading-snug">
          Remove the <br className="max-md:hidden" />
          <span className="bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
            background
          </span>{' '}
          from <br className="max-md:hidden" />
          images for free.
        </h1>

        {/* Paragraph */}
        <p className="mt-4 text-sm text-gray-500 leading-relaxed">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          <br />
          Lorem Ipsum has been the industry's standard dummy text ever.
        </p>

        <div className="mt-6">
          <input onChange={e => removeBg(e.target.files[0])}type="file" accept='image/*' id="upload1" hidden />
          <label
            htmlFor="upload1"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:scale-105 transition-all duration-500"
          >
            <img src={assets.upload_btn_icon} alt="Upload icon" className="w-5 h-5" />
            <span className="text-white text-sm">Upload your image</span>
          </label>
        </div>
      </div>

      {/* Right side: image */}
      <div className="flex justify-end w-full lg:w-1/2 p-6">
        <img
          src={assets.header_img}
          alt="Preview"
          className="w-80 sm:w-96 scale-95 -mt-10 rounded-lg"
        />
      </div>
    </div>
  );
};

export default Header;
