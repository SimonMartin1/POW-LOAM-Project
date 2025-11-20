import AppLayout from "@/layouts/app-layout";
import { Head, Link, router } from "@inertiajs/react";
import { ArrowLeft, MessageCircle, Trash2 } from "lucide-react";

interface Comentario {
    id: number;
    comment: string;
    created_at: string;
    imagen: {
        id: number;
        nombre: string;
        autor: string | null;
        fecha_creacion: string;
        url_imagen: string;
    };
}

export default function MisComentarios({ comentarios }: { comentarios: Comentario[] }) {

    const eliminarComentario = (id: number) => {
        if (!confirm("¿Eliminar este comentario?")) return;

        router.delete(`/comentarios/${id}`, {
            preserveScroll: true
        });
    };

    return (
        <AppLayout breadcrumbs={[{ title: "Mis Comentarios", href: "/mis-comentarios" }]}>
            <Head title="Mis Comentarios" />

            <div className="min-h-screen bg-[#F7F3EB] px-6 py-12 max-w-7xl mx-auto">

                {/* VOLVER */}
                <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 text-[#3A5A40] font-semibold mb-10 px-5 py-2 rounded-full border border-[#c4c4c4] bg-white hover:bg-[#ebebeb] transition shadow-sm"
                >
                    <ArrowLeft size={16} /> Volver
                </Link>

                {/* TÍTULO */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-['Montserrat'] font-black uppercase tracking-tight text-[#2A332D]">
                        Mis Comentarios
                    </h1>
                    <div className="w-20 h-1.5 bg-[#3A5A40] mx-auto mt-4 rounded-full opacity-70"></div>
                </div>

                {/* No hay comentarios */}
                {comentarios.length === 0 && (
                    <p className="text-center text-gray-600 italic mt-20">
                        Todavía no realizaste comentarios.
                    </p>
                )}

                {/* LISTA */}
                <div className="grid grid-cols-1 gap-6">

                    {comentarios.map((c) => (
                        <div
                            key={c.id}
                            className="bg-white rounded-3xl shadow-md p-6 flex gap-6 hover:shadow-xl transition"
                        >
                            {/* Imagen miniatura */}
                            <Link href={`/galeria/${c.imagen.id}`}>
                                <img
                                    src={
                                        c.imagen.url_imagen.startsWith("http")
                                            ? c.imagen.url_imagen
                                            : `/storage/${c.imagen.url_imagen}`
                                    }
                                    alt={c.imagen.nombre}
                                    className="w-32 h-32 object-cover rounded-xl shadow"
                                />
                            </Link>

                            {/* Contenido */}
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-[#2A332D] mb-1">
                                    {c.imagen.nombre}
                                </h2>

                                <p className="text-sm text-[#6A7A70] mb-3">
                                    {new Date(c.created_at).toLocaleString("es-AR")}
                                </p>

                                <p className="text-gray-800 text-md flex items-center gap-2">
                                    <MessageCircle size={18} />
                                    {c.comment}
                                </p>
                            </div>

                            {/* Botón borrar */}
                            <button
                                onClick={() => eliminarComentario(c.id)}
                                className="h-fit p-2 rounded-full bg-red-600 hover:bg-red-700 text-white"
                            >
                                <Trash2 size={18} />
                            </button>

                        </div>
                    ))}

                </div>
            </div>
        </AppLayout>
    );
}
