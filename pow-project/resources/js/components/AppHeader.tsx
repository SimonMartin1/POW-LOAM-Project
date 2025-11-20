import { Link, usePage } from "@inertiajs/react";
import { LogIn, LayoutDashboard } from "lucide-react";

interface AppHeaderProps {
    height: number;
    minHeight: number;
    maxHeight: number;
}

export default function AppHeader({ height, minHeight, maxHeight }: AppHeaderProps) {
    const page = usePage();
    const auth = page.props?.auth;
    const url = page.url ?? "";

    const user = auth?.user ?? null;
    const current = url;

    const scrollRange = maxHeight - minHeight;
    const scrollProgress = Math.min(1, Math.max(0, (maxHeight - height) / scrollRange));

    const logoHeight = 160 - (90 * scrollProgress);
    const titleSize = 6 - (4.2 * scrollProgress);
    const subTitleSize = 1.5 - (0.85 * scrollProgress);

    const isCompact = height <= minHeight + 5;

    return (
        <header
            style={{ height: `${height}px` }}
            className={`
                fixed top-0 left-0 w-full z-50 overflow-hidden
                will-change-height flex flex-col justify-end
                transition-colors duration-300
                ${isCompact ? "bg-white/95 backdrop-blur-md border-b shadow-sm" : "bg-[#F2EFE9]"}
            `}
        >
            <div className={`
                w-full px-6 md:px-10 flex justify-between items-end
                transition-all duration-200
                ${isCompact ? "pb-3" : "pb-10"}
            `}>

                {/* IZQUIERDA */}
                <div className="flex items-end gap-4 md:gap-6">
                    <img
                        src="/images/logoPecheras.png"
                        style={{ height: `${logoHeight}px` }}
                        className="object-contain origin-bottom-left"
                        alt="Museo Logo"
                    />

                    <h1 className="font-['Montserrat'] leading-[0.85] text-[#2A332D] font-black flex flex-col">
                        <span style={{ fontSize: `${titleSize}rem`, lineHeight: "0.85" }}>
                            Museo
                        </span>
                        <span style={{ fontSize: `${titleSize}rem`, lineHeight: "0.85" }}>
                            Natural
                        </span>

                        <span
                            className="mt-1 tracking-[0.15em] text-[#6A7A70] uppercase font-bold"
                            style={{ fontSize: `${subTitleSize}rem` }}
                        >
                            de La Pampa
                        </span>
                    </h1>
                </div>

                {/* DERECHA */}
                <nav className={`
                    flex items-center gap-8 font-['Montserrat'] font-bold uppercase tracking-widest text-sm
                    transition-all duration-300
                    ${isCompact ? "pb-2" : "mb-4"}
                `}>

                    {/* GALERIA */}
                    {current.startsWith("/galeria") ? (
                        <span className="opacity-40 cursor-default text-[#3A5A40]">Galería</span>
                    ) : (
                        <Link href="/galeria" className="hover:text-black transition">
                            Galería
                        </Link>
                    )}

                    {/* DASHBOARD (si user) */}
                    {user && (
                        current.startsWith("/dashboard") ? (
                            <span className="opacity-40 cursor-default flex items-center gap-1 text-[#3A5A40]">
                                <LayoutDashboard className="w-5 h-5" /> Dashboard
                            </span>
                        ) : (
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-1 hover:text-black transition"
                            >
                                <LayoutDashboard className="w-5 h-5" /> Dashboard
                            </Link>
                        )
                    )}

                    {/* INGRESAR */}
                    {!user && (
                        <Link
                            href="/login"
                            className="
                                flex items-center gap-2
                                px-6 py-3 rounded-full text-white bg-[#3A5A40]
                                hover:bg-[#1F3022] transition shadow-lg
                                text-xs uppercase tracking-widest font-black
                            "
                        >
                            <LogIn className="w-4 h-4 text-white" />
                            Ingresar
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
}
