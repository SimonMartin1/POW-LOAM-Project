import AppLayout from "@/layouts/app-layout";
import { Head, Link, usePage } from "@inertiajs/react";

import {
    FilePlus,
    Images,
    Settings,
    Heart,
    MessageCircle
} from "lucide-react";

export default function Dashboard() {
    const { auth, stats } = usePage().props as any;
    const user = auth.user;

    // Igual que en AppHeader: roles viene del backend (Spatie)
    const isAdmin: boolean = user?.roles?.includes("admin") ?? false;

    return (
        <AppLayout breadcrumbs={[{ title: "Dashboard", href: "/dashboard" }]}>
            <Head title="Dashboard" />

            <div className="min-h-screen bg-[#F7F3EB] px-6 py-12 max-w-7xl mx-auto">

                {/* TÍTULO COMÚN PARA TODOS */}
                <div className="text-center mb-10">
                    <span className="text-[#3A5A40] font-bold tracking-[0.20em] text-xs uppercase block mb-3">
                        {isAdmin ? "Panel de Administración" : "Panel del Usuario"}
                    </span>

                    <h1 className="text-4xl md:text-5xl font-['Montserrat'] font-black uppercase tracking-tight text-[#2A332D]">
                        {isAdmin ? "Bienvenido" : "Hola"},{" "}
                        {user.name}
                    </h1>

                    <div className="w-20 h-1.5 bg-[#3A5A40] mx-auto mt-5 rounded-full opacity-70"></div>
                </div>

                {/* SI ES ADMIN → ESTADÍSTICAS + TARJETAS ADMIN */}
                {isAdmin && (
                    <>
                        {/* ESTADÍSTICAS RÁPIDAS */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-20">

                            <div className="bg-white rounded-3xl shadow p-8 text-center">
                                <p className="text-sm uppercase tracking-widest text-[#6A7A70] font-bold">
                                    Obras cargadas
                                </p>
                                <p className="text-4xl font-black text-[#2A332D] mt-3">
                                    {stats.total_obras}
                                </p>
                            </div>

                            <div className="bg-white rounded-3xl shadow p-8 text-center">
                                <p className="text-sm uppercase tracking-widest text-[#6A7A70] font-bold">
                                    Usuarios registrados
                                </p>
                                <p className="text-4xl font-black text-[#2A332D] mt-3">
                                    {stats.total_usuarios}
                                </p>
                            </div>

                            <div className="bg-white rounded-3xl shadow p-8 text-center">
                                <p className="text-sm uppercase tracking-widest text-[#6A7A70] font-bold">
                                    Visitas solicitadas
                                </p>
                                <p className="text-4xl font-black text-[#2A332D] mt-3">
                                    {stats.total_visitas}
                                </p>
                            </div>
                        </div>                    

                        {/* TARJETAS DE ACCIONES ADMIN */}
                        <div
                            className="
                                grid 
                                grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
                                gap-10
                            "
                        >
                            {/* VISITAS SOLICITADAS */}
                            <Link
                                href="/visitas"
                                className="
                                    block bg-white rounded-3xl p-8 shadow-md 
                                    hover:shadow-2xl transition transform hover:-translate-y-1
                                "
                            >
                                <Images className="w-12 h-12 text-[#3A5A40] mb-6" />
                                <h2 className="text-2xl font-bold text-[#2A332D] mb-2">
                                    Visitas solicitadas
                                </h2>
                                <p className="text-[#6A7A70] text-sm">
                                    Consultá los pedidos enviados desde el formulario web.
                                </p>
                            </Link>

                            {/* AGREGAR OBRA */}
                            <Link
                                href="/imagenes/agregar"
                                className="
                                    block bg-white rounded-3xl p-8 shadow-md 
                                    hover:shadow-2xl transition transform hover:-translate-y-1
                                "
                            >
                                <FilePlus className="w-12 h-12 text-[#3A5A40] mb-6" />
                                <h2 className="text-2xl font-bold text-[#2A332D] mb-2">
                                    Agregar Obra
                                </h2>
                                <p className="text-[#6A7A70] text-sm">
                                    Subí nuevas imágenes para incluirlas en la galería del museo.
                                </p>
                            </Link>

                            {/* ADMINISTRAR OBRAS */}
                            <Link
                                href="/imagenes"
                                className="
                                    block bg-white rounded-3xl p-8 shadow-md 
                                    hover:shadow-2xl transition transform hover:-translate-y-1
                                "
                            >
                                <Images className="w-12 h-12 text-[#3A5A40] mb-6" />
                                <h2 className="text-2xl font-bold text-[#2A332D] mb-2">
                                    Administrar Obras
                                </h2>
                                <p className="text-[#6A7A70] text-sm">
                                    Editá, actualizá o eliminá obras existentes en el sistema.
                                </p>
                            </Link>

                            {/* PERFIL */}
                            <Link
                                href="/settings/profile"
                                className="
                                    block bg-white rounded-3xl p-8 shadow-md 
                                    hover:shadow-2xl transition transform hover:-translate-y-1
                                "
                            >
                                <Settings className="w-12 h-12 text-[#3A5A40] mb-6" />
                                <h2 className="text-2xl font-bold text-[#2A332D] mb-2">
                                    Mi Perfil
                                </h2>
                                <p className="text-[#6A7A70] text-sm">
                                    Actualizá tu información personal y configuración de la cuenta.
                                </p>
                            </Link>
                        </div>
                    </>
                )}

                {/* SI NO ES ADMIN → DASHBOARD DE USUARIO COMÚN */}
                {!isAdmin && (
                    <div
                        className="
                            grid 
                            grid-cols-1 sm:grid-cols-3 
                            gap-10
                        "
                    >
                        <Link
                            href="/mis-comentarios"
                            className="
                                block bg-white rounded-3xl p-8 shadow-md
                                hover:shadow-2xl transition transform hover:-translate-y-1
                            "
                        >
                            <MessageCircle className="w-12 h-12 text-[#3A5A40] mb-6" />
                            <h2 className="text-2xl font-bold text-[#2A332D] mb-2">
                                Mis Comentarios
                            </h2>
                            <p className="text-[#6A7A70] text-sm">
                                Revisá y gestioná los comentarios que dejaste en las obras.
                            </p>
                        </Link>

                        {/* MIS ME GUSTA (después hacemos /mis-likes) */}
                        <Link
                            href="/mis-likes"
                            className="
                                block bg-white rounded-3xl p-8 shadow-md 
                                hover:shadow-2xl transition transform hover:-translate-y-1
                            "
                        >
                            <Heart className="w-12 h-12 text-[#3A5A40] mb-6" />
                            <h2 className="text-2xl font-bold text-[#2A332D] mb-2">
                                Mis Me Gusta
                            </h2>
                            <p className="text-[#6A7A70] text-sm">
                                Accedé a tu colección de obras marcadas con me gusta.
                            </p>
                        </Link>

                        {/* PERFIL */}
                        <Link
                            href="/settings/profile"
                            className="
                                block bg-white rounded-3xl p-8 shadow-md 
                                hover:shadow-2xl transition transform hover:-translate-y-1
                            "
                        >
                            <Settings className="w-12 h-12 text-[#3A5A40] mb-6" />
                            <h2 className="text-2xl font-bold text-[#2A332D] mb-2">
                                Mi Perfil
                            </h2>
                            <p className="text-[#6A7A70] text-sm">
                                Configurá tu cuenta y datos personales.
                            </p>
                        </Link>
                    </div>
                )}

            </div>
        </AppLayout>
    );
}
