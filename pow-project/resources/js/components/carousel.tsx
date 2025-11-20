import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@inertiajs/react";

interface Imagen {
    id: number;
    nombre: string;
    autor: string;
    descripcion: string;
    url_imagen: string;
}

function resolveUrl(url: string) {
    return url.startsWith("http") ? url : `/storage/${url}`;
}

export default function Carousel({ items }: { items: Imagen[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    if (!items || items.length === 0) return null;

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
    }, [items.length]);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(nextSlide, 3500);
        return () => clearInterval(interval);
    }, [isPaused, nextSlide]);

    const currentItem = items[currentIndex];

    return (
        <div 
            className="relative w-full h-[500px] md:h-[650px] group overflow-hidden bg-black"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* IMAGEN DE FONDO */}
            <div 
                className="w-full h-full flex transition-transform duration-1000 ease-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {items.map((img) => (
                    <div key={img.id} className="min-w-full h-full relative">
                        <img 
                            src={resolveUrl(img.url_imagen)} 
                            alt={img.nombre} 
                            className="w-full h-full object-cover"
                        />
                        {/* CAPA OSCURA GENERAL (Vignette) para que la imagen no compita con el texto */}
                        <div className="absolute inset-0 bg-black/10"></div>
                    </div>
                ))}
            </div>

            {/* GRADIENTE INFERIOR (Sombra limpia, SIN BLUR) */}
            <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none"></div>

            {/* INFO FLOTANTE */}
            <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white z-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
                
                <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <span className="inline-block px-3 py-1 bg-[#3A5A40] text-white text-[10px] font-bold uppercase tracking-widest mb-4 shadow-sm">
                        Colección Digital
                    </span>
                    
                    <h3 className="text-4xl md:text-7xl font-['Montserrat'] font-black uppercase leading-none mb-4 drop-shadow-2xl tracking-tighter">
                        {currentItem.nombre}
                    </h3>
                    
                    <p className="text-gray-200 font-['Montserrat'] text-sm md:text-lg font-medium uppercase tracking-widest border-l-2 border-[#3A5A40] pl-4">
                        {currentItem.autor}
                    </p>
                </div>

                <Link 
                    href="/galeria"
                    className="hidden md:inline-flex items-center justify-center h-14 px-10 border border-white/30 bg-white/10 hover:bg-white hover:text-black text-white font-bold text-sm uppercase tracking-widest transition-all duration-300 backdrop-blur-sm"
                >
                    Explorar Obras
                </Link>
            </div>

            {/* FLECHAS DE NAVEGACIÓN (Grandes y minimalistas) */}
            <button onClick={prevSlide} className="absolute left-0 top-0 bottom-0 w-24 flex items-center justify-center hover:bg-black/20 transition-colors duration-300 group/btn z-30">
                <ChevronLeft size={56} className="text-white/50 group-hover/btn:text-white transition-all scale-75 group-hover/btn:scale-100" strokeWidth={1} />
            </button>

            <button onClick={nextSlide} className="absolute right-0 top-0 bottom-0 w-24 flex items-center justify-center hover:bg-black/20 transition-colors duration-300 group/btn z-30">
                <ChevronRight size={56} className="text-white/50 group-hover/btn:text-white transition-all scale-75 group-hover/btn:scale-100" strokeWidth={1} />
            </button>

            {/* PUNTOS INDICADORES */}
            <div className="absolute top-8 right-8 flex gap-2 z-30">
                {items.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`transition-all duration-500 h-1 rounded-full shadow-sm ${
                            currentIndex === index 
                                ? "w-12 bg-white" 
                                : "w-4 bg-white/40 hover:bg-white/80" 
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}