// src/pages/api/testenv.ts
import {
  
  getSecret
} from 'astro:env/server'

import { sendEmail } from '../../lib/sendgridSender.ts';
export async function GET() {
    const appp = getSecret('CURL_SENDGRID_API_KEY');
    console.log("Testing environment variables");
    console.log('appp:', appp);

    const res= await sendEmail(appp, {
        to: "ennimandroid@gmail.com",
        subject: 'Sending with Twilio SendGrid is Fun',
        template_id: "d-e6c149b8a4e149918df6cad864e5abb1"
    });
    console.log('Response from SendGrid:', JSON.stringify(res));
  return new Response(JSON.stringify(res) || 'undefined');
}