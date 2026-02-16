import React, { useState } from 'react';
import { InitialScreen } from './flujo_registro/InitialScreen.tsx';
import { SuccessScreen } from './flujo_registro/SuccessScreen.tsx';
import { RegistrationForm, type FormErrors, type FormDataPayload } from './flujo_registro/RegistrationForm.tsx';
import { useFlujoRegistroStore } from '../../store/flujoRegistroStore.tsx';
import FloatingWhatsApp from './atoms/FloatingWhatsApp.tsx';

// Estados del flujo
type FlowState = 'invitation' | 'form' | 'success';


const FlujoRegistroIsland: React.FC = () => {
    const { step, isRegistered, isFlowOpen, setCurrentStep, openFlow, closeFlow, registerOk } = useFlujoRegistroStore();
    const [isOpen, setIsOpen] = useState(false);
    const [currentState, setCurrentState] = useState<FlowState>('invitation');
    const [FormDataPayload, setFormDataPayload] = useState<FormDataPayload>({
        nombre: '',
        apellido: '',
        correoElectronico: '',
        whatsapp: '',
        anoNacimiento: '',
        aceptaPrivacidad: false,
    });
    const [errors, setErrors] = useState<FormErrors>({});

    // Abrir popup al cargar la página solo si no se ha registrado antes
    React.useEffect(() => {
        console.log("Island montado");
        const flujoRegistrado = JSON.parse(localStorage.getItem('flujo-registro-storage'));
        console.log(flujoRegistrado);    
        //console.log("Es flujoRegistroCompletado:", flujoRegistrado.state.isRegistered);
        const registrado = flujoRegistrado?.state?.isRegistered || false;
        if (!registrado) {
            console.log("No hay registro previo, abriendo popup");
            openFlow();
        }
        
        console.log("flujoRegistroCompletado:", registrado);
        if (!registrado) {
            openFlow();
        } else {
            closeFlow();
        }
    }, []);

    // Cerrar popup
    const closePopup = () => {
        closeFlow();
        if (step === 'success') {
            registerOk(); // Marcar como registrado
        }
        /* setIsOpen(false);
        setCurrentState('invitation');
        setFormDataPayload({
            nombre: '',
            apellido: '',
            correoElectronico: '',
            whatsapp: '',
            anoNacimiento: '',
            aceptaPrivacidad: false,
        });
        setErrors({}); */
    };

    // Renderizar contenido según el estado
    const renderContent = () => {
        switch (step) {
            case 'invitation':
                return (
                    <InitialScreen setCurrentState={setCurrentStep} />
                );

            case 'form':
                return (
                    <RegistrationForm
                        setCurrentState={setCurrentStep}
                    />
                );

            case 'success':
                return (
                    <SuccessScreen closePopup={closePopup} />
                );

            default:
                return null;
        }
    };

    return (
        <>
            {/* Overlay y Modal */}
            {isFlowOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50"
                        onClick={closePopup}
                    ></div>

                    {/* Modal */}
                    <div className="relative bg-pink-fresh rounded-2xl shadow-xl max-w-md w-full mx-0 p-6 max-h-[90vh] overflow-y-auto">
                        {/* Botón cerrar */}
                        <button
                            onClick={closePopup}
                            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                        >
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>

                        {/* Contenido del modal */}
                        <div className="mt-4 ">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            )}
            {!isFlowOpen && !isRegistered && (<FloatingWhatsApp className='z-50 bg-apple shadow-md shadow-[rgba(57,35,80,0.9)] rounded-full' size={60} positionX="rigth" positionY="bottom" waNumber="525540701018" />)}
            {!isFlowOpen && (<FloatingWhatsApp className='z-50 bg-apple shadow-md shadow-[rgba(57,35,80,0.9)] rounded-full' size={60} positionX="rigth" positionY="bottom" waNumber="525540701018" />)}
        </>
    );
};

export default FlujoRegistroIsland;
