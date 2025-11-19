import React, { useState, useEffect, useRef } from 'react';
import AppHeader from "@/components/AppHeader"; 
import { Link } from "@inertiajs/react";

interface Imagen {
    id: number;
    nombre: string;
    url_imagen: string;
}

export default function Welcome({ imagenes = [] }: { imagenes: Imagen[] }) {


    const MAX_HEIGHT = 300; 
    const MIN_HEIGHT = 110; 
    
    const [headerHeight, setHeaderHeight] = useState(MAX_HEIGHT);
    const ticking = useRef(false);

    // Lógica de scroll optimizada con requestAnimationFrame y redondeo para evitar vibración
    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;

            if (!ticking.current) {
                window.requestAnimationFrame(() => {
                    const newHeight = Math.max(MIN_HEIGHT, MAX_HEIGHT - currentScroll);
                    
                    // Redondeamos para evitar valores decimales que causan "jitter" (temblequeo)
                    const roundedHeight = Math.round(newHeight);
                    
                    setHeaderHeight((prev) => {
                        if (prev === roundedHeight) return prev;
                        return roundedHeight;
                    });

                    ticking.current = false;
                });

                ticking.current = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    function resolveUrl(img?: Imagen) {
        if (!img?.url_imagen) return null;
        return img.url_imagen.startsWith("http") 
            ? img.url_imagen 
            : `/storage/${img.url_imagen}`;
    }

    const img1 = resolveUrl(imagenes[0]);
    const img2 = resolveUrl(imagenes[1]);

    return (
        <div className="min-h-screen bg-[#F7F3EB] text-[#3E3E3E] font-['Inter']">

            {/* 1. HEADER DINÁMICO */}
            <AppHeader 
                height={headerHeight} 
                minHeight={MIN_HEIGHT} 
                maxHeight={MAX_HEIGHT} 
            />

            {/* 2. ESPACIADOR SINCRONIZADO (Evita que el contenido salte) */}
            <div style={{ height: `${headerHeight}px` }} className="w-full will-change-height" />

            <main>
                {/* BANNER PRINCIPAL */}
                <section className="w-full h-[500px]">
                    <img
                        src="/images/banner.jpg"
                        className="w-full h-full object-cover object-center"
                        alt="Museo Banner"
                    />
                </section>

                {/* INTRODUCCIÓN */}
                <section className="py-16 px-6 max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-[#3A5A40] mb-4">
                        Bienvenido al Museo Digital
                    </h2>
                    <p className="text-lg text-[#5A5A5A] leading-relaxed">
                        Un espacio donde las colecciones naturales e históricas se conservan
                        y se comparten con toda la comunidad pampeana.
                    </p>
                </section>

                {/* OBRA DESTACADA 1 */}
                {img1 && (
                    <section className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center gap-10">
                        <div className="flex-1">
                            <h3 className="text-2xl font-semibold text-[#3A5A40]">Obra destacada</h3>
                            <p className="mt-3 text-[#5A5A5A]">
                                Una pieza seleccionada al azar de nuestra colección.
                            </p>
                            <Link
                                href="/galeria"
                                className="mt-4 inline-block px-5 py-2 bg-[#3A5A40] text-white rounded-lg hover:bg-[#2F4F39] transition"
                            >
                                Ver más obras
                            </Link>
                        </div>
                        <img 
                            src={img1} 
                            className="flex-1 rounded-xl shadow-lg max-h-[300px] object-cover transform hover:scale-105 transition duration-500" 
                            alt="Obra destacada" 
                        />
                    </section>
                )}

                {/* OBRA DESTACADA 2 */}
                {img2 && (
                    <section className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row-reverse items-center gap-10">
                        <div className="flex-1">
                            <h3 className="text-2xl font-semibold text-[#3A5A40]">Colección en expansión</h3>
                            <p className="mt-3 text-[#5A5A5A]">
                                Cada imagen cargada preserva el patrimonio cultural del museo.
                            </p>
                            <Link
                                href="/galeria"
                                className="mt-4 inline-block px-5 py-2 bg-[#7F5539] text-white rounded-lg hover:bg-[#5B3C28] transition"
                            >
                                Ver más obras
                            </Link>
                        </div>
                        <img 
                            src={img2} 
                            className="flex-1 rounded-xl shadow-lg max-h-[300px] object-cover transform hover:scale-105 transition duration-500" 
                            alt="Colección" 
                        />
                    </section>
                )}

                {/* FOOTER */}
                <footer className="mt-20 w-full bg-[#2F2F2F] text-[#E5E5E5] py-12">
                    <div className="max-w-6xl mx-auto px-6">

                        {/* REDES SOCIALES */}
                        <div className="flex justify-center gap-8 mb-8">
                            {['linkedin', 'facebook', 'x', 'instagram', 'youtube'].map((social) => (
                                <img 
                                    key={social}
                                    src={`/images/social/${social}.png`}
                                    className="h-7 opacity-60 hover:opacity-100 hover:scale-110 transition-all duration-300 cursor-pointer"
                                    alt={social}
                                />
                            ))}
                        </div>

                        {/* LÍNEA DIVISORIA */}
                        <div className="w-20 h-1 bg-[#3A5A40] mx-auto mb-6 rounded-full opacity-50"></div>

                        {/* COPYRIGHT */}
                        <div className="text-center space-y-2">
                            <p className="text-sm font-medium tracking-wide text-gray-400">
                                © {new Date().getFullYear()} Museo Natural de La Pampa
                            </p>
                            <p className="text-xs text-gray-500">
                                Facultad de Ingeniería UNLPam — Pecheras & Pategras
                            </p>
                        </div>

                    </div>
                </footer>

            </main>
        </div>
    );
}