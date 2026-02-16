import React from "react";
export interface SuccessScreenProps { 
    closePopup: () => void;
}
export const SuccessScreen: React.FC<SuccessScreenProps> = ({ closePopup }) => {
    return (
        <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-purple-800">
                ¡Gracias por registrarte!
            </h2>
            <div className="space-y-4">
                <p className="text-gray-600">
                    Tu registro ha sido exitoso. Te notificaremos por email cuando se abra la venta de boletos.
                </p>
                <p className="text-sm text-gray-500">
                    Mantén un ojo en tu bandeja de entrada para no perderte ninguna actualización.
                </p>
            </div>
            <button
                onClick={closePopup}
                className="w-full bg-purple hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-200"
            >
                CERRAR
            </button>
        </div>
    );
};
