// src/pages/api/registro.ts
import {
    getSecret
} from 'astro:env/server'
import { supabase } from '../../lib/supabaseClient.ts';
import { sendEmail } from '../../lib/sendgridSender.ts';
import type { SendEmailOptions } from '../../lib/sendgridSender.ts';
import { PreRegistroMenopausiaSupabaseRepository } from '../../lib/persistence/PreRegistroMenopausiaSupabaseRepository.ts';

export async function POST({ request }) {
    const enableEmailSend = true; // Cambiar a true para habilitar el envío de emails
    const datap = await request.json();
    console.log('Received data:', datap);
    const persistence = new PreRegistroMenopausiaSupabaseRepository(supabase);
    const emailOptions: SendEmailOptions = {
        to: datap.correoElectronico,
        subject: 'Confirmación de registro',
        template_id: "d-e6c149b8a4e149918df6cad864e5abb1"
    };

    const curlSendgridApiKey = getSecret('CURL_SENDGRID_API_KEY');

    try {
        const existent = await persistence.checkExistingEmail(datap.correoElectronico);
        console.log('Existing record found:', existent);
        if (existent.length > 0) {
            const newRetry = persistence.newRetryCount(datap.correoElectronico, existent[0].re_try_count);
            if (enableEmailSend) {
                await sendEmail(curlSendgridApiKey, emailOptions);
            }
            return new Response(JSON.stringify({ success: true, message: 'Ya existe un registro con este email' }), { status: 200 });
        }

        const createdRecord = await persistence.createPreRegistro(datap);

        if (enableEmailSend) {
            await sendEmail(curlSendgridApiKey, emailOptions);
        }
        return new Response(JSON.stringify({ success: true }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }


}