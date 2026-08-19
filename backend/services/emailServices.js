import "dotenv/config"
import { Resend } from 'resend';

const resend = new Resend(process.env.EMAIL_API);

export const sendEmail = async ({userData, subject, message}) => {

    try {
        const {data, error} = await resend.emails.send({
        from: "Naic Municipal Library <onboarding@resend.dev>",
        to: 'naicwebsitelibrary@gmail.com',
        subject: subject,
        html: `<p>
                    Hello, Mr./Ms. ${userData.firstname},
                </p>

                <p>
                    ${message}
                </p>
               `
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

