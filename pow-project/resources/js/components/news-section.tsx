import React from 'react';
import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";

interface NewsItem {
    id: number;
    title: string;
    excerpt: string; // Lo usaremos si queremos descripción larga
    image_path: string;
    published_at: string;
}

// Función para formatear fecha (ej: "7 de noviembre, 2025")
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
};

// Resuelve la URL de la imagen, con placeholder si no hay
function resolveUrl(url: string) {
    if (!url) return 'https://via.placeholder.com/600x400/ECECEC/333333?text=Sin+Imagen';
    
    // Si es un link externo (http) o una imagen manual en public (/images)
    if (url.startsWith("http") || url.startsWith("/images")) {
        return url; 
    }
    
    // Si no, asumimos que es una subida del sistema (storage)
    return `/storage/${url}`;
}

export default function NewsSection({ news = [] }: { news: NewsItem[] }) {
    
    if (!news || news.length === 0) return null;

    return (
        <section className="py-24 px-6 bg-white relative border-t border-[#3A5A40]/10">
            <div className="max-w-6xl mx-auto">
                
                {/* CABECERA DE SECCIÓN */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <span className="text-[#3A5A40] font-bold tracking-[0.2em] text-xs uppercase mb-3 block">
                            Actualidad
                        </span>
                        <h2 className="text-4xl md:text-5xl font-['Montserrat'] font-black text-[#2A332D] uppercase leading-none">
                            Novedades <br/> del Museo
                        </h2>
                    </div>
                    
                </div>

                {/* GRID DE NOTICIAS AL ESTILO MALBA */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {news.map((item) => {
                        const formattedDate = formatDate(item.published_at);
                        
                        return (
                            <Link 
                                href={`/noticias/${item.id}`} // Enlace a la noticia individual (futuro)
                                key={item.id} 
                                className="group block cursor-pointer"
                            >
                                {/* IMAGEN */}
                                <div className="w-full aspect-[3/2] overflow-hidden bg-gray-100 mb-4">
                                    <img 
                                        src={resolveUrl(item.image_path)} 
                                        alt={item.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                                    />
                                </div>

                                {/* CONTENIDO TEXTUAL */}
                                <div>
                                    <p className="text-xs text-gray-500 mb-2 font-['Inter']">
                                        {formattedDate}
                                    </p>
                                    <h3 className="text-lg font-['Montserrat'] font-black text-[#2A332D] leading-tight group-hover:text-[#3A5A40] transition-colors uppercase">
                                        {item.title}
                                    </h3>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </section>
    );
}