import axios from "axios";
import fs from 'fs';
import FormData from 'form-data';
import userModel from "../models/userModel.js";

const removeBgImage = async (req, res) => {
  try {
    const { clerkId } = req.body;

    const user = await userModel.findOne({ clerkId });

    if (!user) {
      return res.json({ success: false, message: 'User Not Found' });
    }

    if (user.creditBalance <= 0) {
      return res.json({
        success: false,
        message: 'No Credit Balance',
        creditBalance: user.creditBalance
      });
    }

    const imagePath = req.file.path;
    const imageFile = fs.createReadStream(imagePath);

    const formdata = new FormData();
    formdata.append('image_file', imageFile);

    const { data } = await axios.post(
      'https://clipdrop-api.co/remove-background/v1',
      formdata,
      {
        headers: {
          'x-api-key': process.env.CLIPDROP_API, // ✅ check .env
          ...formdata.getHeaders(),
        },
        responseType: 'arraybuffer',
      }
    );

    const base64Image = Buffer.from(data, 'binary').toString('base64');
    const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

    // ✅ Reduce credit and save
    user.creditBalance -= 1;
    await user.save();

    res.json({
      success: true,
      resultImage,
      creditBalance: user.creditBalance,
      message: 'Background removed successfully',
    });
  } catch (error) {
    console.error("Remove BG Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { removeBgImage };
