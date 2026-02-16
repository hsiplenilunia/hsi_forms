import React, { useState } from 'react';
import { InitialScreen } from './flujo_registro/InitialScreen.tsx';
import { SuccessScreen } from './flujo_registro/SuccessScreen.tsx';
import { RegistrationForm, type FormErrors, type FormDataPayload } from './flujo_registro/RegistrationForm.tsx';
import { useFlujoRegistroStore } from '../../store/flujoRegistroStore.tsx';
import FloatingWhatsApp from './atoms/FloatingWhatsApp.tsx';

// Estados del flujo
type FlowState = 'invitation' | 'form' | 'success';


const FlujoRegistroSectionIsland: React.FC = () => {
    const { step, isRegistered, isFlowOpen, setCurrentStep, openFlow, closeFlow, registerOk } = useFlujoRegistroStore();
    const [isOpen, setIsOpen] = useState(false);
    const [currentState, setCurrentState] = useState<FlowState>('form');
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
        setCurrentStep('form');
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
            <div className="relative bg-pink-fresh rounded-2xl shadow-xl max-w-md w-full mx-0 p-6 max-h-[90vh] overflow-y-auto">
                

                {/* Contenido del modal */}
                <div className="mt-4 ">
                    {renderContent()}
                </div>
            </div>
        </>
    );
};

export default FlujoRegistroSectionIsland;
