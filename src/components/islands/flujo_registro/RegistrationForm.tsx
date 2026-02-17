import React, { useState } from "react";
import { ladasByCountry } from "../../data/ladasByCountry";
import { CountryLadaSelect, type Country } from "../atoms/LadaSelect";
export interface RegistrationFormProps {
    setCurrentState: React.Dispatch<React.SetStateAction<string>>;
    queryParams?: Record<string, string>;
}

export interface FormDataPayload {
    nombre?: string;
    apellido?: string;
    correoElectronico: string;
    whatsappCountry?: Country | null;
    whatsapp: string;
    especialidad: string;
    aceptaPrivacidad: boolean;
    role?: string;
}

// Errores de validación
export interface FormErrors {
    nombre?: string;
    apellido?: string;
    correoElectronico?: string;
    whatsapp?: string;
    whatsappCountry?: string;
    especialidad?: string;
    aceptaPrivacidad?: string;
    role?: string;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({ setCurrentState, queryParams = {} }) => {
    console.log("Renderizando RegistrationForm con queryParams:", queryParams);

    const [FormDataPayload, setFormDataPayload] = useState<FormDataPayload>({
        nombre: '',
        apellido: '',
        correoElectronico: '',
        whatsapp: '',
        whatsappCountry: ladasByCountry[0], // Por defecto el primer país
        especialidad: '',
        aceptaPrivacidad: false,
        role: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});

    // Generar años para el select (1920 - 2005)
    const generateYears = () => {
        const years = [];
        for (let year = 2005; year >= 1920; year--) {
            years.push(year);
        }
        return years;
    };

    // Validaciones
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Validación nombre completo (al menos 1 palabra, solo texto)
        const nameWords = FormDataPayload.nombre.trim().split(/\s+/);
        if (nameWords.length < 1) {
            newErrors.nombre = 'Debe incluir nombre';
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(FormDataPayload.nombre)) {
            newErrors.nombre = 'Solo se permiten letras y espacios';
        }

        const lastNameWords = FormDataPayload.apellido.trim().split(/\s+/);
        if (lastNameWords.length < 1) {
            newErrors.apellido = 'Debe incluir apellido';
        } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(FormDataPayload.apellido)) {
            newErrors.apellido = 'Solo se permiten letras y espacios';
        }

        // Validación email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(FormDataPayload.correoElectronico)) {
            newErrors.correoElectronico = 'Ingresa un email válido';
        }

        // Validación WhatsApp (número mexicano, 10-13 dígitos)
        const phoneRegex = /^\d{8,13}$/;
        if (!phoneRegex.test(FormDataPayload.whatsapp.replace(/\s/g, ''))) {
            newErrors.whatsapp = 'Debe ser un número telefónico válido (8 a 13 dígitos)';
        }

        // Validación especialidad
        if (!FormDataPayload.especialidad) {
            newErrors.especialidad = 'Selecciona tu especialidad';
        }

        // Validación checkbox privacidad
        if (!FormDataPayload.aceptaPrivacidad) {
            newErrors.aceptaPrivacidad = 'Debes aceptar el aviso de privacidad';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Manejar cambios en el formulario
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormDataPayload(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Limpiar error específico cuando el usuario empiece a escribir
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    // Manejar envío del formulario
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            // Aquí puedes agregar la lógica para enviar los datos
            console.log('Datos del formulario:', FormDataPayload);

            FormDataPayload.role = queryParams.r || '';

            const res = await fetch('/api/nuevo_colaborador', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...FormDataPayload }),
            });
            const result = await res.json();
            if (result.success) {
                setCurrentState('success');
                localStorage.setItem('flujoRegistroCompletado', 'true');
            } else {
                // Maneja el error
                console.error('Error al registrar:', result.error);
            }
        }
    };

    function handleCountryChange(country: Country, field: string): void {
        setFormDataPayload(prev => ({
            ...prev,
            [field]: country
        }));

        // Limpiar error específico cuando el usuario cambie el país
        if (errors[field as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [field]: undefined
            }));
        }
    }
    return (
        <div className="space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-purple-800 text-center">
                { queryParams?.r ? ` ${queryParams.r}` : `Registro` }
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="hidden" name="role" value={FormDataPayload.role} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nombre*/}
                    <div>
                        <label className="block text-sm font-medium text-purple-700 mb-1">
                            Nombre
                        </label>
                        <input
                            type="text"
                            name="nombre"
                            value={FormDataPayload.nombre}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.nombre ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Ingresa tu nombre"
                        />
                        {errors.nombre && (
                            <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>
                        )}
                    </div>

                    {/* Apellido */}
                    <div>
                        <label className="block text-sm font-medium text-purple-700 mb-1">
                            Apellido
                        </label>
                        <input
                            type="text"
                            name="apellido"
                            value={FormDataPayload.apellido}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.apellido ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Ingresa tu apellido"
                        />
                        {errors.apellido && (
                            <p className="text-red-500 text-xs mt-1">{errors.apellido}</p>
                        )}
                    </div>

                    {/* Especialidad */}
                    <div>
                        <label className="block text-sm font-medium text-purple-700 mb-1">
                            Especialidad
                        </label>
                        <input
                            type="text"
                            name="especialidad"
                            value={FormDataPayload.especialidad}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.correoElectronico ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="Tu especialidad"
                        />
                        {errors.especialidad && (
                            <p className="text-red-500 text-xs mt-1">{errors.especialidad}</p>
                        )}
                    </div>

                    {/* Correo Electrónico */}
                    <div>
                        <label className="block text-sm font-medium text-purple-700 mb-1">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            name="correoElectronico"
                            value={FormDataPayload.correoElectronico}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.correoElectronico ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="tu@email.com"
                        />
                        {errors.correoElectronico && (
                            <p className="text-red-500 text-xs mt-1">{errors.correoElectronico}</p>
                        )}
                    </div>

                    {/* WhatsApp */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-purple-700 mb-1">
                            Whatsapp
                        </label>
                        <div className="flex flex-col items-start space-y-2 md:flex-row md:space-y-0 md:space-x-2 w-full">

                            <CountryLadaSelect
                                countries={ladasByCountry}
                                value={FormDataPayload.whatsappCountry}
                                className="w-full bg-white border-gray-300 focus:ring-purple-500 focus:border-purple-500 rounded-lg"
                                onChange={(country) => handleCountryChange(country, 'whatsappCountry')}
                            />
                            <input
                                type="tel"
                                name="whatsapp"
                                value={FormDataPayload.whatsapp}
                                onChange={handleInputChange}
                                className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.whatsapp ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                placeholder="5551234567"
                            />
                        </div>
                        {errors.whatsapp && (
                            <p className="text-red-500 text-xs mt-1">{errors.whatsapp}</p>
                        )}
                    </div>

                    
                </div>

                {/* Checkbox Privacidad */}
                <div className="space-y-2">
                    <label className="flex items-start space-x-3">
                        <input
                            type="checkbox"
                            name="aceptaPrivacidad"
                            checked={FormDataPayload.aceptaPrivacidad}
                            onChange={handleInputChange}
                            className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-600">
                            Acepto el{' '}
                            <a href="https://hospitalsininfecciones.com/formularios-aviso-de-privacidad" target='_blank' className="font-bold text-purple-700 hover:underline">
                                Aviso de Privacidad
                            </a>
                        </span>
                    </label>
                    {errors.aceptaPrivacidad && (
                        <p className="text-red-500 text-xs">{errors.aceptaPrivacidad}</p>
                    )}
                </div>

                {/* Botón de envío */}
                <button
                    type="submit"
                    className="w-full bg-purple hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-200"
                >
                    REGISTRARME
                </button>
            </form>
        </div>
    );
}