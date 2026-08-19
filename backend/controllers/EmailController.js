import { sendEmail } from "../services/emailServices.js";
import UserModel from '../models/User_Registration_Model.js'

export const SendEmailController = async (req, res) => {
       
       try {
        const {userId, subject, message} = req.body;

        if (
            !userId ||
            !subject ||
            !message
        ) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }
        console.log("userId:", userId);
        console.log("subject:", subject);
        console.log("message:", message);

        const user = await UserModel.findById(userId);
        if(!user){
            res.status(400).json({message: 'SendEmailController: User not found.'})
            return
        }

        await sendEmail({userData: user, subject: subject, message: message});

       } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Error", error})
       }
}