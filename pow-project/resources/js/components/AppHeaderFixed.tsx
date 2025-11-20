import { Link, usePage } from "@inertiajs/react";
import { LogOut, LogIn, LayoutDashboard } from "lucide-react";

export default function AppHeaderFixed() {
    const page = usePage();
    const auth = page.props?.auth;
    const url = page.url ?? "";

    const user = auth?.user ?? null;
    const current = url;

    return (
        <header
            className="
                fixed top-0 left-0 w-full z-50
                bg-white/95 backdrop-blur-md border-b shadow-sm
                flex justify-between items-end
                px-6 md:px-10
                h-[110px]
            "
        >

            {/* IZQUIERDA: LOGO + TEXTO */}
            <div className="flex items-end gap-4 md:gap-6 pb-2">
                <img
                    src="/images/logoPecheras.png"
                    className="object-contain"
                    style={{ height: "70px" }}
                    alt="Museo Logo"
                />

                <h1 className="font-['Montserrat'] leading-[0.85] text-[#2A332D] flex flex-col font-black uppercase">
                    <span className="text-[1.8rem] tracking-tighter">Museo</span>
                    <span className="text-[1.8rem] tracking-tighter">Natural</span>

                    <span
                        className="block font-bold tracking-[0.15em] text-[#6A7A70] uppercase mt-1"
                        style={{ fontSize: "0.65rem" }}
                    >
                        de La Pampa
                    </span>
                </h1>
            </div>

            {/* MENÚ */}
            <nav
                className="
                    flex items-center gap-8
                    font-['Montserrat'] font-bold uppercase tracking-widest
                    text-sm text-[#3A5A40]
                    pb-3
                "
            >

                {/* INICIO */}
                {current === "/" ? (
                    <span className="opacity-40 cursor-default">INICIO</span>
                ) : (
                    <Link href="/" className="hover:text-black transition">INICIO</Link>
                )}

                {/* GALERÍA */}
                {current.startsWith("/galeria") ? (
                    <span className="opacity-40 cursor-default">GALERÍA</span>
                ) : (
                    <Link href="/galeria" className="hover:text-black transition">GALERÍA</Link>
                )}

                {/* DASHBOARD */}
                {user && (
                    current.startsWith("/dashboard") ? (
                        <span className="opacity-40 cursor-default flex items-center gap-1">
                            <LayoutDashboard className="w-5 h-5" /> DASHBOARD
                        </span>
                    ) : (
                        <Link
                            href="/dashboard"
                            className="flex items-center gap-1 hover:text-black transition"
                        >
                            <LayoutDashboard className="w-5 h-5" /> DASHBOARD
                        </Link>
                    )
                )}

                {/* INGRESAR */}
                {!user && (
                    <Link
                        href="/login"
                        className="
                            flex items-center gap-2
                            px-6 py-3 rounded-full 
                            text-white bg-[#3A5A40] 
                            hover:bg-[#1F3022] 
                            transition shadow-lg 
                            text-xs uppercase tracking-widest font-black
                        "
                    >
                        <LogIn className="w-4 h-4 text-white" />
                        Ingresar
                    </Link>
                )}

                {/* SALIR */}
                {user && (
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="
                            p-2 rounded-full text-red-600
                            hover:text-white hover:bg-red-600 transition
                        "
                    >
                        <LogOut className="h-5 w-5" />
                    </Link>
                )}
            </nav>
        </header>
    );
}
