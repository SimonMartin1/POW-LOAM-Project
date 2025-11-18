import { Link, usePage } from "@inertiajs/react";
import { LogOut } from "lucide-react";

/**
 * PageProps universal para evitar errores de TypeScript
 * sin romper Inertia.
 */
interface PageProps {
    auth?: {
        user?: {
            id: number;
            name: string;
            email: string;
        } | null;
    };
    [key: string]: any; // ← ESTA LÍNEA RESUELVE EL ERROR
}

export default function AppHeader() {
    const { auth } = usePage<PageProps>().props;
    const user = auth?.user ?? null;

    return (
        <header className="w-full bg-white/90 backdrop-blur-sm shadow-sm px-8 py-4 flex justify-between items-center border-b border-[#E0D8CB]">
            
            {/* LEFT: LOGO + NOMBRE */}
            <div className="flex items-center gap-3">
                <img
                    src="/images/logoPecheras.png"
                    className="h-10 w-auto"
                    alt="Museo Logo"
                />
                <h1 className="text-2xl font-bold text-[#3A5A40]">
                    Museo de Ciencias Naturales
                </h1>
            </div>

            {/* RIGHT NAV */}
            <nav className="flex items-center gap-6 text-[#3A5A40] font-medium">

                <Link href="/galeria" className="hover:underline">Galería</Link>

                {!user && (
                    <Link
                        href="/login"
                        className="px-4 py-2 rounded-lg text-white bg-[#3A5A40] hover:bg-[#2F4F39] transition"
                    >
                        Ingresar
                    </Link>
                )}

                {user && (
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="p-2 rounded-full hover:bg-red-100 group"
                    >
                        <LogOut className="h-5 w-5 text-red-500 group-hover:text-red-600" />
                    </Link>
                )}
            </nav>
        </header>
    );
}
