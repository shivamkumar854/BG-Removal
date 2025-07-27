import { getAuth } from '@clerk/express';

const authUser = (req, res, next) => {
  try {
    const { userId } = getAuth(req); // ✅ Properly extract user info

    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    req.body.clerkId = userId;
    next();
  } catch (error) {
    console.error('Auth Error:', error.message);
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};

export default authUser;
