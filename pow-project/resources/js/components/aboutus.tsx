import React from 'react';

export default function AboutUs() {
    return (
        <section className="relative py-24 px-6 border-t border-[#3A5A40]/10">
            
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    
                    {/* COLUMNA IZQUIERDA: TÍTULO Y DATA DURA */}
                    <div className="lg:col-span-4 flex flex-col justify-between h-full">
                        <div>
                            <span className="text-[#3A5A40] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
                                Nuestra Institución
                            </span>
                            {/* TITULO SOLIDO Y NITIDO */}
                            <h2 className="text-4xl md:text-6xl font-['Montserrat'] font-black text-[#2A332D] leading-[0.9] uppercase mb-6">
                                Legado <br />
                                <span className="text-[#3A5A40]">Histórico</span>
                            </h2>
                            {/* Pequeña línea decorativa */}
                            <div className="w-16 h-1.5 bg-[#2A332D] mt-2"></div>
                        </div>

                        {/* DATOS ESTADÍSTICOS */}
                        <div className="hidden lg:block space-y-10 mt-16">
                            <div>
                                <span className="block text-6xl font-['Montserrat'] font-black text-[#3A5A40] leading-none">
                                    80+
                                </span>
                                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mt-2 block">
                                    Años de Historia
                                </span>
                            </div>
                            
                            <div>
                                <span className="block text-5xl font-['Montserrat'] font-black text-[#2A332D] leading-none">
                                    17K
                                </span>
                                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mt-2 block">
                                    Especímenes
                                </span>
                            </div>
                            
                            <div>
                                <span className="block text-5xl font-['Montserrat'] font-black text-[#2A332D] leading-none">
                                    10
                                </span>
                                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mt-2 block">
                                    Salas de Exposición
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: TEXTO NARRATIVO */}
                    <div className="lg:col-span-8 relative lg:pt-4">
                        {/* Borde lateral decorativo sutil */}
                        <div className="hidden lg:block absolute left-0 top-4 bottom-0 w-px bg-[#3A5A40]/20"></div>
                        
                        <div className="lg:pl-12 space-y-8">
                            <p className="text-xl md:text-2xl text-[#2A332D] font-['Montserrat'] font-bold leading-tight">
                                El Museo de Historia Natural de La Pampa es una institución fundada hace más de 80 años con la misión de exponer, difundir e investigar el Patrimonio Natural y Cultural.
                            </p>
                            
                            <div className="text-base md:text-lg text-gray-700 font-['Inter'] font-light leading-relaxed space-y-6 text-justify">
                                <p>
                                    En colaboración con otros organismos desarrolla proyectos de investigación y programas educativos centrados en la <strong className="text-[#3A5A40] font-semibold">conservación de la biodiversidad</strong>, puesta en valor de las áreas protegidas y el uso sustentable de los recursos naturales.
                                </p>
                                <p>
                                    Sus diez salas de exposición introducen al visitante en la rica biodiversidad de La Pampa y la relevancia de su patrimonio arqueológico y paleontológico. Asimismo, sus colecciones científicas resguardan más de <strong className="text-[#3A5A40] font-semibold">17 mil especímenes biológicos</strong> disponibles para consulta y estudio.
                                </p>
                                <p>
                                    El museo organiza regularmente conferencias, cursos y talleres destinados a estimular el intercambio de conocimientos entre el ámbito científico-técnico y distintos sectores de la comunidad.
                                </p>
                            </div>

                            {/* BOTÓN CONOCER MÁS (Opcional) */}
                            <div className="pt-4">
                                <button className="text-[#3A5A40] font-bold uppercase text-xs tracking-widest border-b-2 border-[#3A5A40] pb-1 hover:text-black hover:border-black transition-colors">
                                    Leer historia completa
                                </button>
                            </div>
                        </div>

                        {/* DATOS PARA MÓVIL (Horizontal) */}
                        <div className="lg:hidden flex justify-between mt-12 pt-8 border-t border-[#3A5A40]/20">
                            <div className="text-center">
                                <span className="block text-3xl font-['Montserrat'] font-black text-[#3A5A40]">80+</span>
                                <span className="text-[10px] uppercase tracking-widest text-gray-500 block mt-1">Años</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-3xl font-['Montserrat'] font-black text-[#2A332D]">17K</span>
                                <span className="text-[10px] uppercase tracking-widest text-gray-500 block mt-1">Piezas</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-3xl font-['Montserrat'] font-black text-[#2A332D]">10</span>
                                <span className="text-[10px] uppercase tracking-widest text-gray-500 block mt-1">Salas</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}