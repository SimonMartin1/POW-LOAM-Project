import { type ReactNode } from "react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { LogOut } from "lucide-react";
import type { SharedData } from "@/types";

interface Props {
    children: ReactNode;
}

export default function AppHeaderLayout({ children }: Props) {
    const { post } = useForm();
    const { props } = usePage<SharedData>();
    const user = props.auth?.user;

    const logout = () => post("/logout");

    return (
        <div className="min-h-screen flex flex-col bg-[#F7F3EB] text-[#3E3E3E]">

            <header className="bg-[#9CAF88] px-8 py-4 shadow flex items-center justify-between">

                <Link href="/" className="flex items-center gap-3">
                    <img src="/images/logoPecheras.png" className="h-10 w-auto" />
                    <span className="text-2xl font-semibold text-white drop-shadow">
                        Museo de Ciencias Naturales
                    </span>
                </Link>

                <nav className="flex items-center gap-6 text-white font-medium">

                    <Link href="/" className="hover:underline">Inicio</Link>
                    <Link href="/galeria" className="hover:underline">Galería</Link>

                    {user && (
                        <>
                            <Link href="/imagenes/agregar" className="hover:underline">
                                Agregar Imagen
                            </Link>

                            <button
                                onClick={logout}
                                className="flex items-center gap-2 px-3 py-2 rounded-xl 
                                           bg-[#EEE7DC] text-[#8B1E1E] border border-[#D9CBB8]
                                           hover:bg-[#F3D4D4] transition"
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Salir</span>
                            </button>
                        </>
                    )}

                    {!user && (
                        <Link href="/login" className="hover:underline">
                            Iniciar sesión
                        </Link>
                    )}

                </nav>
            </header>

            <main className="flex-1 px-4 py-4">
                {children}
            </main>
        </div>
    );
}
