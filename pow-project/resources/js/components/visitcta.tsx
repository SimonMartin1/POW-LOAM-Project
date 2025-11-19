import React, { useState } from 'react';
import VisitModal from './visitmodal';

export default function VisitCTA() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <section className="relative w-full bg-[#3A5A40] text-[#F2EFE9] py-20 px-6 overflow-hidden">
                
                {/* Decoración de fondo (Patrón sutil) */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full border-[40px] border-white/20"></div>
                    <div className="absolute top-1/2 -right-24 w-64 h-64 rounded-full border-[20px] border-white/10"></div>
                </div>

                <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left">
                    
                    <div className="max-w-2xl">
                        <span className="font-bold tracking-[0.2em] text-xs uppercase mb-3 block text-white/60">
                            Área Educativa
                        </span>
                        <h2 className="text-3xl md:text-5xl font-['Montserrat'] font-black uppercase leading-none mb-6">
                            ¿Te gustaría programar <br/> una visita escolar?
                        </h2>
                        <p className="text-lg text-white/80 font-['Inter'] font-light leading-relaxed">
                            Ofrecemos recorridos guiados adaptados a diferentes niveles educativos. 
                            Acercá a tus alumnos a la historia natural de nuestra región.
                        </p>
                    </div>

                    <div className="flex-shrink-0">
                        <button 
                            onClick={() => setIsModalOpen(true)}
                            className="bg-[#F2EFE9] text-[#3A5A40] hover:bg-white hover:scale-105 transition-all duration-300 px-10 py-5 rounded-full font-['Montserrat'] font-black uppercase tracking-widest text-xs shadow-lg"
                        >
                            Solicitar Turno
                        </button>
                    </div>

                </div>
            </section>

            {/* El Modal se renderiza aquí pero solo se ve si isModalOpen es true */}
            <VisitModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
}