import { Webhook } from 'svix';
import userModel from '../models/userModel.js';

const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await whook.verify(
      JSON.stringify(req.body),
      {
        'svix-id': req.headers['svix-id'],
        'svix-timestamp': req.headers['svix-timestamp'],
        'svix-signature': req.headers['svix-signature'],
      }
    );

    const { data, type } = req.body;
    if (!data || !type) {
      return res.status(400).json({ success: false, message: 'Invalid webhook payload' });
    }
    console.log("Webhook received:", type, data);

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };

        await userModel.create(userData);
        res.json({});
        return;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };

        await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
        res.json({});
        return;
      }

      case "user.deleted": {
        await userModel.findOneAndDelete({ clerkId: data.id });
        res.json({});
        return;
      }

      default:
        res.status(400).json({ success: false, message: `Unhandled event type: ${type}` });
        return;
    }

  } catch (error) {
    console.error("Webhook Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { clerkWebhooks };
