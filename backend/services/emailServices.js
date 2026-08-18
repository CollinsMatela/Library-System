import "dotenv/config"
import { Resend } from 'resend';

const resend = new Resend(process.env.EMAIL_API);

export const sendEmail = async ({userData, borrowData}) => {

    try {
        const {data, error} = await resend.emails.send({
        from: "Naic Municipal Library <onboarding@resend.dev>",
        to: userData.email,
        subject: 'Request Approved',
        html: `<p>
                    Hello, Mr./Ms. ${userData.firstname},
                </p>

                <p>
                    Your borrow request has been 
                    <strong>Approved</strong>!
                </p>

                <p>
                    Please proceed to the Naic Municipal Library 
                    to claim your requested book.
                </p>`
        })

        if(error){
            throw new Error(error)
        }

        return data
    } catch (error) {
        console.error("Email sending failed:", error);
        throw error;
    }
        
}

