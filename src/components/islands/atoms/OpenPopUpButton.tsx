import React, { useState } from 'react';
import { useFlujoRegistroStore } from '../../../store/flujoRegistroStore.tsx';

const OpenPopUpButton: React.FC = () => {
    const { openFlow } = useFlujoRegistroStore();

    return (
        <button 
        className="flex w-full justify-center md:w-auto md:inline-block 
  bg-[#A2AB8E] 
  text-white hover:text-purple font-bold py-2 px-6 rounded-full 
  border-2 border-white hover:border-apple shadow-xl hover:bg-white transition focus:outline-none focus:ring-2 focus:ring-apple focus:ring-opacity-50"
        onClick={openFlow}>
            QUIERO ASISTIR
        </button>
    );
};

export default OpenPopUpButton;
