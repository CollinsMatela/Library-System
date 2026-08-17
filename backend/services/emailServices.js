import "dotenv/config"
import { Resend } from 'resend';

const resend = new Resend(process.env.EMAIL_API);

export const sendEmail = async ({to, subject}) => {

    try {
        const {data, error} = await resend.emails.send({
        from: "Naic Municipal Library <onboarding@resend.dev>",
        to: to,
        subject: subject,
        html: '<p>Your Request has been <strong>Approved</strong>! Please proceed to the library.</p>'
        })

        if(error){
            throw new Error(error)
        }
        console.log("Check API:", process.env.EMAIL_API);
        console.log('Email Sent!')

        return data
    } catch (error) {
        console.error("Email sending failed:", error);
        throw error;
    }
        
}
