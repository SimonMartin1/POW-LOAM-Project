import AppLayout from "@/layouts/app-layout";
import { Head, Link, router } from "@inertiajs/react";
import { Heart, ArrowLeft } from "lucide-react";

interface Like {
    id: number;
    imagen: {
        id: number;
        nombre: string;
        autor: string | null;
        fecha_creacion: string;
        url_imagen: string;
    };
}

export default function MisLikes({ likes }: { likes: Like[] }) {

    const quitarLike = (imagenId: number) => {
        router.post("/likes/toggle", { imagen_id: imagenId }, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: "Mis Me Gusta", href: "/mis-likes" }]}>
            <Head title="Mis Me Gusta" />

            <div className="min-h-screen bg-[#F7F3EB] px-6 py-12 max-w-7xl mx-auto">

                {/* BOTÓN VOLVER */}
                <Link
                    href="/dashboard"
                    className="
                        inline-flex items-center gap-2
                        text-[#3A5A40] font-semibold mb-10
                        px-5 py-2 rounded-full border border-[#c4c4c4]
                        bg-white hover:bg-[#ebebeb] transition shadow-sm
                    "
                >
                    <ArrowLeft size={16} /> Volver
                </Link>

                {/* TÍTULO */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-['Montserrat'] font-black uppercase tracking-tight text-[#2A332D]">
                        Mis Me Gusta
                    </h1>
                    <div className="w-20 h-1.5 bg-[#3A5A40] mx-auto mt-4 rounded-full opacity-70"></div>
                </div>

                {/* SI NO TIENE LIKES */}
                {likes.length === 0 && (
                    <p className="text-center text-gray-600 text-lg italic mt-20">
                        Todavía no marcaste ninguna obra con ❤️
                    </p>
                )}

                {/* GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">

                    {likes.map((like) => (
                        <div
                            key={like.id}
                            className="group block text-left rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all hover:-translate-y-1"
                        >
                            {/* IMAGEN */}
                            <Link href={`/galeria/${like.imagen.id}`}>
                                <div className="relative w-full h-56 overflow-hidden">
                                    <img
                                        src={
                                            like.imagen.url_imagen.startsWith("http")
                                                ? like.imagen.url_imagen
                                                : `/storage/${like.imagen.url_imagen}`
                                        }
                                        alt={like.imagen.nombre}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>
                            </Link>

                            {/* INFO */}
                            <div className="p-5">
                                <h2 className="text-xl font-bold text-[#2A332D]">
                                    {like.imagen.nombre}
                                </h2>

                                {like.imagen.autor && (
                                    <p className="text-sm mt-1 text-[#6A7A70]">
                                        {like.imagen.autor}
                                    </p>
                                )}

                                <p className="text-xs mt-3 text-[#777]">
                                    {new Date(like.imagen.fecha_creacion).toLocaleDateString("es-AR")}
                                </p>

                                {/* QUITAR LIKE */}
                                <button
                                    onClick={() => quitarLike(like.imagen.id)}
                                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-700 transition"
                                >
                                    <Heart size={18} fill="red" className="text-red-500" />
                                    Quitar me gusta
                                </button>
                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </AppLayout>
    );
}
