import React from 'react';

export interface InitialScreenProps {
    setCurrentState: React.Dispatch<React.SetStateAction<string>>;
}

export const InitialScreen: React.FC<InitialScreenProps> = ({ setCurrentState }) => {

    return (
        <div className="text-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-purple-800">
                ¿Te interesa asistir?
            </h2>
            <div className="space-y-4">
                <p className="text-gray-600">
                    Regístrate para ser de las primeras en obtener&nbsp;

                    <span className="text-base font-semibold text-purple-700">
                        precio preferente &nbsp;
                    </span>
                    en tu entrada
                </p>
                <p className="text-sm text-gray-500">
                    Válido del 11 de agosto al 07 de septiembre
                </p>
            </div>
            <button
                onClick={() => setCurrentState('form')}
                className="w-full bg-purple hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-200 text-lg"
            >
                QUIERO MI PRECIO PREFERENTE
            </button>
        </div>
    );
}