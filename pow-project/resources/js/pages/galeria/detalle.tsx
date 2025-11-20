import AppLayout from "@/layouts/app-layout";
import { Head, Link, useForm, usePage, router } from "@inertiajs/react";
import { Heart, MessageCircle, ArrowLeft } from "lucide-react";
import { useState } from "react";

interface Imagen {
    id: number;
    nombre: string;
    descripcion: string | null;
    autor: string | null;
    fecha_creacion: string;
    url_imagen: string;
}

interface Comment {
    id: number;
    body: string;
    created_at: string;
    user_name: string;
    is_owner: boolean;
}

// Page props mínimas + índice para satisfacer el constraint de Inertia
interface Props {
    auth: {
        user: {
            id: number;
            name: string;
        } | null;
    };
    [key: string]: any;
}

export default function Detalle({
    imagen,
    comments,
    likesCount,
    userLiked,
}: {
    imagen: Imagen;
    comments: Comment[];
    likesCount: number;
    userLiked: boolean;
}) {
    const { auth } = usePage<Props>().props;

    const [likedLocal, setLikedLocal] = useState(userLiked);
    const [likesLocal, setLikesLocal] = useState(likesCount);
    const [animateHeart, setAnimateHeart] = useState(false);

    // Form para COMENTARIOS
    const { data, setData, post, reset, processing, errors } = useForm({
        imagen_id: imagen.id,
        body: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post("/comentarios", {
            onSuccess: () => {
                reset("body");
            },
            preserveScroll: true,
        });
    };

    // LIKE estilo Instagram
    const toggleLike = () => {
        if (!auth.user) return;

        // Animación tipo POP
        setAnimateHeart(true);
        setTimeout(() => setAnimateHeart(false), 250);

        // Actualizamos UI inmediatamente
        if (likedLocal) {
            setLikedLocal(false);
            setLikesLocal((n) => Math.max(0, n - 1));
        } else {
            setLikedLocal(true);
            setLikesLocal((n) => n + 1);
        }

        // Enviamos al backend usando router.post (no useForm.post)
        router.post(
            "/likes/toggle",
            { imagen_id: imagen.id },
            { preserveScroll: true },
        );
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: "Galería", href: "/galeria" },
                { title: imagen.nombre, href: `/galeria/${imagen.id}` },
            ]}
        >
            <Head title={imagen.nombre} />

            <div className="min-h-screen bg-[#F7F3EB] px-6 py-10 flex justify-center">
                <div className="max-w-5xl w-full bg-white rounded-3xl shadow-xl p-10">

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

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                        {/* IMAGEN PRINCIPAL */}
                        <div className="w-full rounded-3xl overflow-hidden shadow-lg bg-black flex items-center justify-center">
                            <img
                                src={
                                    imagen.url_imagen.startsWith("http")
                                        ? imagen.url_imagen
                                        : `/storage/${imagen.url_imagen}`
                                }
                                alt={imagen.nombre}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        {/* INFO + LIKE */}
                        <div className="flex flex-col">
                            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-[#2A332D] mb-4 font-['Montserrat']">
                                {imagen.nombre}
                            </h1>

                            {imagen.autor && (
                                <p className="text-lg text-[#6A7A70] mb-1">
                                    <span className="font-semibold text-[#2A332D]">Autor:</span>{" "}
                                    {imagen.autor}
                                </p>
                            )}

                            <p className="text-lg text-[#6A7A70] mb-4">
                                <span className="font-semibold text-[#2A332D]">Fecha:</span>{" "}
                                {new Date(imagen.fecha_creacion).toLocaleDateString("es-AR")}
                            </p>

                            {imagen.descripcion && (
                                <p className="text-[#444] leading-relaxed text-md mb-6 whitespace-pre-line">
                                    {imagen.descripcion}
                                </p>
                            )}

                            {/* LIKE + CONTADOR DE COMENTARIOS */}
                            <div className="mt-auto flex items-center gap-6 pt-4 border-t border-gray-200">

                                {/* ❤️ Botón estilo Instagram */}
                                <button
                                    type="button"
                                    onClick={toggleLike}
                                    disabled={!auth.user}
                                    className={`
                                        flex items-center gap-2 text-lg transition
                                        ${auth.user ? "cursor-pointer" : "opacity-40 cursor-not-allowed"}
                                    `}
                                >
                                    <Heart
                                        size={28}
                                        className={`
                                            transition-all duration-200 
                                            ${likedLocal ? "text-red-500 fill-red-500" : "text-gray-700"} 
                                            ${animateHeart ? "scale-[1.35]" : "scale-100"}
                                        `}
                                    />
                                    <span className="text-gray-700 text-base">{likesLocal}</span>
                                </button>

                                {/* 💬 Comentarios (icono) */}
                                <div className="flex items-center gap-2 text-gray-600">
                                    <MessageCircle size={22} />
                                    <span className="text-base">{comments.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECCIÓN COMENTARIOS */}
                    <div className="mt-14 border-t border-gray-200 pt-8">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <MessageCircle className="text-[#3A5A40]" size={20} />
                            Comentarios
                        </h2>

                        {/* FORM PARA COMENTAR */}
                        {auth.user ? (
                            <form onSubmit={handleSubmit} className="mb-8 flex flex-col gap-3">
                                <textarea
                                    value={data.body}
                                    onChange={(e) => setData("body", e.target.value)}
                                    className="
                                        w-full min-h-[80px] px-4 py-3 rounded-xl border border-gray-300
                                        focus:ring-2 focus:ring-[#3A5A40] focus:border-[#3A5A40]
                                        outline-none text-gray-700
                                    "
                                    placeholder="Escribí un comentario sobre esta obra..."
                                />
                                {errors.body && (
                                    <p className="text-sm text-red-500">{errors.body}</p>
                                )}

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={processing || !data.body.trim()}
                                        className="
                                            px-6 py-2 rounded-full bg-[#3A5A40] text-white 
                                            text-sm font-semibold
                                            hover:bg-[#1f3022] transition
                                            disabled:bg-gray-300 disabled:cursor-not-allowed
                                        "
                                    >
                                        Publicar
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="mb-8 text-sm text-gray-600">
                                Para comentar esta obra necesitás{" "}
                                <Link
                                    href="/login"
                                    className="text-[#3A5A40] font-semibold underline"
                                >
                                    iniciar sesión
                                </Link>
                                .
                            </div>
                        )}

                        {/* LISTADO DE COMENTARIOS */}
                        {comments.length === 0 ? (
                            <p className="text-sm text-gray-500">
                                Aún no hay comentarios. Sé el primero en comentar.
                            </p>
                        ) : (
                            <ul className="space-y-4">
                                {comments.map((c) => (
                                    <li
                                        key={c.id}
                                        className="rounded-2xl bg-[#F7F7F7] px-4 py-3"
                                    >
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-semibold text-[#2A332D]">
                                                {c.user_name}
                                            </span>
                                            <span className="text-[11px] text-gray-500">
                                                {c.created_at}
                                            </span>
                                        </div>
                                        <p className="text-sm text-[#444]">{c.body}</p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
