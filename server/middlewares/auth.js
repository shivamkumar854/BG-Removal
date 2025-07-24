import jwt from 'jsonwebtoken';




// Middleware Function to declare jwt token to get clerkId
export const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({ success: false, message: "Not Authorized Login Again" });
    }

    const token_decode = jwt.decode(token);
    req.body.clerkId = token_decode.clerkId;
    next();
  } catch (error) {
    console.error("Webhook Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
