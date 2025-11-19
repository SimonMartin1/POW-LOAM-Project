import { Link, usePage } from "@inertiajs/react";
import { LogOut } from "lucide-react";

interface PageProps {
    auth?: { user?: { id: number; name: string } | null };
    [key: string]: any;
}

interface AppHeaderProps {
    height: number;
    minHeight: number;
    maxHeight: number;
}

export default function AppHeader({ height, minHeight, maxHeight }: AppHeaderProps) {
    const { auth } = usePage<PageProps>().props;
    const user = auth?.user ?? null;

    const scrollRange = maxHeight - minHeight;
    const scrollProgress = Math.min(1, Math.max(0, (maxHeight - height) / scrollRange));
    
    // --- MATEMÁTICAS DEL SCROLL ---
    
    // Logo: De 160px a 70px (Un poco más grande al final para equilibrar las 2 líneas de texto)
    const logoHeight = 160 - (90 * scrollProgress); 
    
    // Título Principal (MUSEO / NATURAL): De 6rem a 1.8rem
    const titleSize = 6 - (4.2 * scrollProgress); 
    
    // Subtítulo (DE LA PAMPA): De 1.5rem a 0.65rem
    const subTitleSize = 1.5 - (0.85 * scrollProgress); 

    const isCompact = height <= minHeight + 5;

    return (
        <header
            style={{ height: `${height}px` }}
            className={`fixed top-0 left-0 w-full z-50 border-[#E0D8CB] overflow-hidden will-change-height flex flex-col justify-end transition-colors duration-300
            ${isCompact 
                ? "bg-white/95 backdrop-blur-md border-b shadow-sm" 
                : "bg-[#F2EFE9] border-b-0" 
            }`}
        >
            <div className={`w-full px-6 md:px-10 flex justify-between items-end transition-all duration-200
                ${isCompact ? "pb-3" : "pb-10"}`} 
            >
                
                {/* IZQUIERDA: BLOQUE LOGO + TEXTO */}
                <div className="flex items-end gap-4 md:gap-6">
                    <img
                        src="/images/logoPecheras.png"
                        style={{ height: `${logoHeight}px` }}
                        className="object-contain transform-gpu origin-bottom-left"
                        alt="Museo Logo"
                    />
                    
                    {/* TÍTULO APILADO (STACKED) - ESTRUCTURA FIJA */}
                    <h1 className="font-['Montserrat'] leading-[0.85] text-[#2A332D] transform-gpu flex flex-col justify-end">
                        
                        {/* BLOQUE SUPERIOR: MUSEO / NATURAL */}
                        <div className="flex flex-col font-black tracking-tighter uppercase">
                            <span 
                                className="block origin-bottom-left"
                                style={{ fontSize: `${titleSize}rem`, lineHeight: '0.85' }}
                            >
                                Museo
                            </span>
                            <span 
                                className="block origin-bottom-left"
                                style={{ fontSize: `${titleSize}rem`, lineHeight: '0.85' }}
                            >
                                Natural
                            </span>
                        </div>
                        
                        {/* BLOQUE INFERIOR: DE LA PAMPA */}
                        <span 
                            className="block font-bold tracking-[0.15em] text-[#6A7A70] uppercase mt-1 origin-bottom-left"
                            style={{ fontSize: `${subTitleSize}rem` }}
                        >
                            de La Pampa
                        </span>
                    </h1>
                </div>

                {/* NAVEGACION */}
                <nav className={`flex items-center gap-8 font-['Montserrat'] font-bold transition-all duration-300
                    ${isCompact 
                        ? "translate-y-0 opacity-100 pb-2" // Ajuste fino para alinear con el texto de 2 líneas
                        : "mb-4 opacity-100"
                    }`}
                >
                    <Link href="/galeria" className="text-[#3A5A40] hover:text-black text-sm tracking-widest uppercase hidden md:block">
                        Galería
                    </Link>

                    {!user && (
                        <Link
                            href="/login"
                            className="px-6 py-3 rounded-full text-white bg-[#3A5A40] hover:bg-[#1F3022] transition shadow-lg text-xs uppercase tracking-widest font-black"
                        >
                            Entrar
                        </Link>
                    )}

                    {user && (
                        <Link
                            href="/logout"
                            method="post"
                            as="button"
                            className="p-2 rounded-full hover:bg-red-50 group transition-colors"
                        >
                            <LogOut className="h-6 w-6 text-red-500 group-hover:text-red-600" />
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
}