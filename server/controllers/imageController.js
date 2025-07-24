import axios from "axios"
import  fs from 'fs'
import FormData from 'form-data'
import userModel from "../models/userModel.js"

//Controller function to remove bg from image
const removeBgImage = async (req,res) => {
    try {

      const {clerkId} = req.body 
        
    } catch (error) {
           console.error("Webhook Error:", error.message)
    res.status(500).json({ success: false, message: error.message })
    }
}
export {removeBgImage}