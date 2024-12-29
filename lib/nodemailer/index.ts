"use server"

import { EmailContent, EmailProductInfo, NotificationType } from '@/types'
import nodemailer from 'nodemailer'


const Notification = {
    WELCOME: 'WELCOME',
    CHANGE_OF_STOCK: 'CHANGE_OF_STOCK',
    LOWEST_PRICE: 'LOWEST_PRICE',
    THRESHOLD_MET: 'THRESHOLD_MET',
}

export async function generateEmailBody(product: EmailProductInfo, type: NotificationType){
    const THRESHOLD_PERCENTAGE = 40;
    const shortenedTitle = product.title.length > 20 ? `${product.title.substring(0,20)}...`
    : product.title;

    let subject = ''
    let body = ''

    switch (type) {
        case Notification.WELCOME:
            subject = 'Welcome to Pricewise'
            body = `
                <div>
                <h2>Hey there, welcome aboard PriceWise! 🚀</h2>
                <p>We've got you set up to track <strong>${product.title}</strong>.</p>
                <p>Below is an example of the kind of update you'll receive:</p>
                <div style="border: 1px solid #ccc; padding: 10px; background-color: #f8f8f8;">
                    <h3>${product.title} just came back in stock!</h3>
                    <p>We're happy to let you know that <strong>${product.title}</strong> is available for purchase again.</p>
                    <p>Hurry and <a href="${product.url}" target="_blank" rel="noopener noreferrer">grab it now</a> before it sells out!</p>
                    <img src="https://i.ibb.co/pwFBRMC/Screenshot-2023-09-26-at-1-47-50-AM.png" alt="Product Image" style="max-width: 100%;" />
                </div>
                <p>You’ll be the first to know about any price changes or restocks for <strong>${product.title}</strong> and other products you track!</p>
                </div>`;
            break;

        case Notification.CHANGE_OF_STOCK:
            subject = `${shortenedTitle} is Restocked!`;
            body = `
                <div>
                <h4>Great news—${product.title} is available again!</h4>
                <p>Check it out <a href="${product.url}" target="_blank" rel="noopener noreferrer">here</a> and get yours before they're gone once more!</p>
                </div>`;
            break;

        case Notification.LOWEST_PRICE:
            subject = `Lowest Price Alert for ${shortenedTitle}`;
            body = `
                <div>
                <h4>Price drop alert! ${product.title} is at its lowest price yet.</h4>
                <p>Snag yours now: <a href="${product.url}" target="_blank" rel="noopener noreferrer">Buy here</a>.</p>
                </div>`;
            break;

        case Notification.THRESHOLD_MET:
            subject = `Major Discount on ${shortenedTitle}!`;
            body = `
                <div>
                <h4>Heads up—${product.title} now has a discount over ${THRESHOLD_PERCENTAGE}%!</h4>
                <p>Don’t wait! <a href="${product.url}" target="_blank" rel="noopener noreferrer">Check it out</a> to grab this deal.</p>
                </div>`;
            break;

        default:
        throw new Error("Invalid notification type.");
    }
    return {subject,body};
}

const trasnporter = nodemailer.createTransport({
    pool: true,
    service: 'yahoo',
    port: 2525,
    auth: {
        user: 'quincyhunter03@yahoo.com',
        pass: process.env.EMAIL_PASSWORD,
    },
    maxConnections: 1
})

export const sendEmail = async (emailContent: EmailContent, sendTo: string[]) => {
    const mailOptions = {
        from: 'quincyhunter03@yahoo.com',
        to: sendTo,
        html: emailContent.body,
        subject: emailContent.subject,
    }
    console.log("HERE");
    trasnporter.sendMail(mailOptions, (error: any, info: any) => {
        if(error) return console.log(error);

        console.log("Email sent: ", info);
    })
}