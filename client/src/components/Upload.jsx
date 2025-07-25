import React, { useContext } from 'react'; // ✅ Fix here
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const Upload = () => {
  const { removeBg } = useContext(AppContext); // ✅ Now it works

  return (
    <div className="pb-16">
      {/* Title */}
      <h1 className="text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-gradient-to-r from-gray-900 to-gray-400 bg-clip-text text-transparent py-6 md:py-16">
        See the magic. Try now
      </h1>

      <div className="text-center mb-24">
        <input
          onChange={e => removeBg(e.target.files[0])}
          type="file"
          accept="image/*"
          id="upload2"
          hidden
        />
        <label
          htmlFor="upload2"
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:scale-105 transition-all duration-500"
        >
          <img src={assets.upload_btn_icon} alt="Upload icon" className="w-5 h-5" />
          <span className="text-white text-sm">Upload your image</span>
        </label>
      </div>
    </div>
  );
};

export default Upload;
