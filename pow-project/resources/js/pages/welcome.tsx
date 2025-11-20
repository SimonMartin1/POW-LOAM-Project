import React, { useState, useEffect, useRef } from 'react';
import AppHeader from "@/components/AppHeader"; 
import Carousel from "@/components/carousel"; 
import MarqueeText from "@/components/marquee-text"; 
import { Link } from "@inertiajs/react";
import AboutUs from '@/components/aboutus';
import VisitCTA from '@/components/visitcta';
import NewsSection from "@/components/news-section";

interface Imagen {
    id: number;
    nombre: string;
    autor: string;
    descripcion: string;
    url_imagen: string;
}

interface NewsItem {
    id: number;
    title: string;
    excerpt: string;
    image_path: string;
    published_at: string;
}

export default function Welcome({ imagenes = [], noticias = [] }: { imagenes: Imagen[], noticias: NewsItem[] }){
    
    const MAX_HEIGHT = 280; 
    const MIN_HEIGHT = 110; 
    
    const [headerHeight, setHeaderHeight] = useState(MAX_HEIGHT);
    const ticking = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            if (!ticking.current) {
                window.requestAnimationFrame(() => {
                    const newHeight = Math.max(MIN_HEIGHT, MAX_HEIGHT - currentScroll);
                    const roundedHeight = Math.round(newHeight);
                    setHeaderHeight((prev) => (prev === roundedHeight ? prev : roundedHeight));
                    ticking.current = false;
                });
                ticking.current = true;
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // MENSAJES PARA LA CINTA
    const marqueeMessages = [
        "Entrada Libre y Gratuita.",
        "Horarios: Lunes a Viernes de 8 a 13hs. Y de 14 a 18hs. Sábado y Domingo de 18 a 21hs.",
    ];

    return (
        <div className="min-h-screen bg-[#F2EFE9] text-[#2A332D] font-['Inter']">

            <AppHeader height={headerHeight} minHeight={MIN_HEIGHT} maxHeight={MAX_HEIGHT} />
            <div style={{ height: `${headerHeight}px` }} className="w-full will-change-height" />

            <main>
                {/* BANNER PRINCIPAL */}
                <section className="w-full h-[450px] relative">
                    <img
                        src="/images/banner.jpg"
                        className="w-full h-full object-cover object-center brightness-90"
                        alt="Museo Banner"
                    />
                </section>

                {/* TEXTO INTRODUCTORIO */}
                <section className="py-20 px-6 max-w-4xl mx-auto text-center">
                    <span className="text-[#3A5A40] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
                        Bienvenidos
                    </span>
                    <h2 className="text-4xl md:text-6xl font-['Montserrat'] font-black text-[#2A332D] mb-6 leading-tight uppercase">
                        Museo Natural <br/><span className="text-[#6A7A70]">de La Pampa</span>
                    </h2>
                    <div className="w-20 h-1.5 bg-[#3A5A40] mx-auto mb-8 rounded-full opacity-80"></div>
                    <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light max-w-2xl mx-auto">
                        Conservación, historia y tecnología se unen para preservar el patrimonio natural de nuestra provincia.
                    </p>
                </section>

                {/* --- AQUÍ ESTÁ LA CINTA (MARQUEE) --- */}
                {/* 'my-16' agrega mucho espacio arriba y abajo para que no esté pegada */}
                <div className="w-full my-16">
                     <MarqueeText messages={marqueeMessages} speed="normal" />
                </div>

                {/* SECCIÓN CARRUSEL FULL WIDTH */}
                {imagenes.length > 0 ? (
                    <section className="w-full pb-20">
                        <div className="px-6 max-w-6xl mx-auto mb-12 flex items-end justify-between">
                            <div>
                                <span className="block text-[#3A5A40] font-bold tracking-[0.2em] text-xs uppercase mb-2">
                                    Exhibición Actual
                                </span>
                                <h3 className="text-3xl md:text-4xl font-['Montserrat'] font-black text-[#2A332D] uppercase tracking-tight leading-none">
                                    Colección Digital
                                </h3>
                            </div>
                            <Link 
                                href="/galeria" 
                                className="hidden md:block text-[#3A5A40] font-bold uppercase text-xs tracking-widest hover:text-black transition border-b border-transparent hover:border-black pb-1"
                            >
                                Ver galería completa →
                            </Link>
                        </div>

                        <Carousel items={imagenes} />
                        
                        {/* Botón móvil para ver galería */}
                        <div className="md:hidden text-center mt-8">
                             <Link 
                                href="/galeria" 
                                className="text-[#3A5A40] font-bold uppercase text-xs tracking-widest border-b border-[#3A5A40] pb-1"
                            >
                                Ver todo
                            </Link>
                        </div>
                    </section>
                ) : (
                    <div className="text-center py-20 bg-gray-50">
                        <p className="text-gray-500 italic">Cargando colección...</p>
                    </div>
                )}

                <AboutUs />
                <VisitCTA />
                <NewsSection news={noticias} />

                {/* FOOTER */}
                <footer className="bg-[#2F2F2F] text-[#E5E5E5] py-16 border-t border-[#3A5A40] mt-0">
                    <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
                        <div className="flex gap-8 mb-10">
                            {['linkedin', 'facebook', 'x', 'instagram', 'youtube'].map((social) => (
                                <img 
                                    key={social}
                                    src={`/images/social/${social}.png`}
                                    className="h-6 w-6 opacity-50 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"
                                    alt={social}
                                />
                            ))}
                        </div>
                        <div className="w-20 h-1 bg-[#3A5A40] mx-auto mb-6 rounded-full opacity-50"></div>
                        <div className="text-center space-y-3">
                            <p className="font-['Montserrat'] font-bold tracking-widest text-sm text-white">
                                MUSEO NATURAL DE LA PAMPA
                            </p>
                            <p className="text-xs text-gray-500 font-['Inter']">
                                © {new Date().getFullYear()} Facultad de Ingeniería UNLPam
                            </p>
                        </div>
                    </div>
                </footer>

            </main>
        </div>
    );
}