import React from 'react';

interface MarqueeTextProps {
    messages: string[];
    speed?: 'slow' | 'normal' | 'fast';
}

const MarqueeText: React.FC<MarqueeTextProps> = ({ messages, speed = 'normal' }) => {
    // Duplicamos los mensajes para el efecto infinito
    const duplicatedMessages = [...messages, ...messages]; 

    let animationDuration = '20s';
    if (speed === 'slow') animationDuration = '90s';
    if (speed === 'fast') animationDuration = '40s';

    return (
        <div 
            className="w-full bg-[#2A332D] text-white py-3 overflow-hidden whitespace-nowrap relative z-30 border-b border-[#3A5A40]"
            // Pasamos la variable de velocidad al CSS
            style={{ '--animation-duration': animationDuration } as React.CSSProperties}
        >
            {/* Usamos la clase .animate-marquee que definimos en app.css */}
            <div className="animate-marquee">
                {duplicatedMessages.map((msg, index) => (
                    <span key={index} className="mx-8 text-sm md:text-base font-['Montserrat'] font-medium tracking-wider uppercase inline-flex items-center text-gray-200">
                        {msg}
                        {/* Pequeño separador visual */}
                        <span className="w-1.5 h-1.5 bg-[#3A5A40] rounded-full ml-8"></span>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default MarqueeText;