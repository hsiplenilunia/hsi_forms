// Nueva versión de la función sendEmail
export interface SendEmailOptions {
    to: string;
    subject: string;
    // Puedes enviar un template_id O el contenido. No ambos.
    // El "content" puede ser HTML o texto plano.
    content?: string;
    template_id?: string;
}

/**
 * Envía un email usando la API de SendGrid.
 * Usa un template_id para emails con diseño, o 'content' para emails sencillos.
 * @param apiKey API Key de SendGrid
 * @param options Opciones del email
 */
export async function sendEmail(apiKey: string, options: SendEmailOptions): Promise<Response> {
    const url = 'https://api.sendgrid.com/v3/mail/send';
    
    // Validamos que se envíe 'content' o 'template_id', pero no ambos
    if (options.content && options.template_id) {
        console.error("Error: No puedes enviar 'content' y 'template_id' al mismo tiempo.");
        return new Response(JSON.stringify({ error: "Cannot use 'content' and 'template_id' simultaneously." }), { status: 400 });
    }

    let body: any = {
        personalizations: [
            {
                to: [{ email: options.to }],
            },
        ],
        from: { email: 'no.reply@foromenopausia.com' },
        subject: options.subject,
    };

    // Añadimos la plantilla si está presente
    if (options.template_id) {
        body.template_id = options.template_id;
    } 
    // Si no hay plantilla, añadimos el contenido
    else if (options.content) {
        // Asumimos que el contenido es HTML si no se especifica.
        // Si quieres texto plano, puedes añadir una opción para eso.
        body.content = [
            {
                type: 'text/html', // Cambiado a text/html para que se vea bien
                value: options.content,
            },
        ];
    }

    return fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });
}