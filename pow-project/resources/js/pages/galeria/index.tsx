import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";
import { useState, useMemo } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

import { Heart, MessageCircle, ArrowLeft } from "lucide-react";

interface Imagen {
    id: number;
    nombre: string;
    descripcion: string | null;
    autor: string | null;
    fecha_creacion: string;
    url_imagen: string;
    comments_count: number;
    likes_count: number;
}

const ITEMS_PER_PAGE = 8;
type OrderMode = "desc" | "asc";

export default function Galeria({ imagenes }: { imagenes: Imagen[] }) {

    const [search, setSearch] = useState("");
    const [autor, setAutor] = useState("");
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const [order, setOrder] = useState<OrderMode | "none">("none");

    const [selectedImagen, setSelectedImagen] = useState<Imagen | null>(null);

    // Autores únicos para el filtro
    const autoresUnicos = useMemo(() => {
        const setAutores = new Set(
            imagenes
                .map((img) => img.autor)
                .filter((a): a is string => !!a)
        );
        return Array.from(setAutores);
    }, [imagenes]);

    // Filtrado por búsqueda + autor
    const imagenesFiltradas = useMemo(() => {
        const term = search.trim().toLowerCase();

        return imagenes.filter((img) => {
            const nombre = img.nombre.toLowerCase();
            const descripcion = (img.descripcion ?? "").toLowerCase();
            const autorNombre = (img.autor ?? "").toLowerCase();

            const matchSearch =
                term === "" ||
                nombre.includes(term) ||
                descripcion.includes(term) ||
                autorNombre.includes(term);

            const matchAutor = autor ? img.autor === autor : true;

            return matchSearch && matchAutor;
        });
    }, [search, autor, imagenes]);

    // Ordenar por fecha
    const imagenesOrdenadas = useMemo(() => {
        // Si no eligió un orden → mostrar tal como vienen desde Laravel
        if (order === "none") {
            return [...imagenesFiltradas];
        }

        const copia = [...imagenesFiltradas];

        copia.sort((a, b) => {
            const da = new Date(a.fecha_creacion).getTime();
            const db = new Date(b.fecha_creacion).getTime();
            return order === "desc" ? db - da : da - db;
        });

        return copia;
    }, [imagenesFiltradas, order]);

    const imagenesMostradas = imagenesOrdenadas.slice(0, visibleCount);
    const puedeCargarMas = visibleCount < imagenesOrdenadas.length;

    return (
        <AppLayout breadcrumbs={[{ title: "Galería", href: "/galeria" }]}>
            <Head title="MUSEO NATURAL DE LA PAMPA" />

            <div className="bg-[#F7F3EB] min-h-screen px-6 py-12 max-w-7xl mx-auto">

                {/* BOTÓN VOLVER */}
                <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 text-[#3A5A40] font-semibold mb-10 px-5 py-2 rounded-full border border-[#c4c4c4] bg-white hover:bg-[#ebebeb] transition shadow-sm"
                >
                    <ArrowLeft size={16} /> Volver
                </Link>


                {/* TÍTULO */}
                <div className="text-center mb-14">
                    <span className="text-[#3A5A40] font-bold tracking-[0.20em] text-xs uppercase block mb-3">
                        Colección Digital
                    </span>
                    <h1 className="text-4xl md:text-5xl font-['Montserrat'] font-black uppercase tracking-tight text-[#2A332D]">
                        Galería del Museo
                    </h1>
                    <div className="w-20 h-1.5 bg-[#3A5A40] mx-auto mt-5 rounded-full opacity-70"></div>
                </div>

                {/* FILTROS */}
                <div className="bg-white rounded-3xl shadow-md p-6 mb-12 flex flex-col lg:flex-row gap-6 items-center">

                    <input
                        type="text"
                        placeholder="Buscar por nombre, descripción o autor..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setVisibleCount(ITEMS_PER_PAGE);
                        }}
                        className="w-full lg:flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#3A5A40] focus:border-[#3A5A40] transition outline-none text-gray-700"
                    />

                    <select
                        value={autor}
                        onChange={(e) => {
                            setAutor(e.target.value);
                            setVisibleCount(ITEMS_PER_PAGE);
                        }}
                        className="w-full lg:w-56 px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-700 focus:ring-2 focus:ring-[#3A5A40] focus:border-[#3A5A40] transition"
                    >
                        <option value="">Todos los autores</option>
                        {autoresUnicos.map((a) => (
                            <option key={a} value={a}>{a}</option>
                        ))}
                    </select>

                    <div className="flex flex-col w-full lg:w-56">
                       

                        <select
                            value={order}
                            onChange={(e) => {
                                const val = e.target.value as OrderMode | "none";
                                setOrder(val);
                                setVisibleCount(ITEMS_PER_PAGE);
                            }}
                            className="
                                px-4 py-3 rounded-xl border border-gray-300
                                bg-white text-gray-700
                                focus:ring-2 focus:ring-[#3A5A40] 
                                focus:border-[#3A5A40]
                                transition
                            "
                        >
                            <option value="none">-- Ordenar --</option>
                            <option value="desc">Orden descendente (Año)</option>
                            <option value="asc">Orden ascendente (Año)</option>
                        </select>
                    </div>


                    {(search !== "" || autor !== "") && (
                        <button
                            onClick={() => {
                                setSearch("");
                                setAutor("");
                                setVisibleCount(ITEMS_PER_PAGE);
                            }}
                            className="w-full lg:w-auto px-5 py-3 rounded-xl bg-[#3A5A40] text-white font-semibold hover:bg-[#1f3022] transition"
                        >
                            Limpiar
                        </button>
                    )}
                </div>

                {/* GRID */}
                {imagenesMostradas.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">

                        {imagenesMostradas.map((img) => (
                            <button
                                key={img.id}
                                type="button"
                                onClick={() => setSelectedImagen(img)}
                                className="group block text-left rounded-3xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all hover:-translate-y-1 cursor-pointer"
                            >
                                <div className="relative w-full h-56 overflow-hidden">
                                    <img
                                        src={
                                            img.url_imagen.startsWith("http")
                                                ? img.url_imagen
                                                : `/storage/${img.url_imagen}`
                                        }
                                        alt={img.nombre}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>

                                <div className="p-5">
                                    <h2 className="text-xl font-bold text-[#2A332D]">{img.nombre}</h2>

                                    {img.autor && (
                                        <p className="text-sm mt-1 text-[#6A7A70]">{img.autor}</p>
                                    )}

                                    {/* ÍCONOS */}
                                    <div className="mt-4 flex items-center justify-between text-xs text-[#777]">
                                        <div className="flex items-center gap-4">

                                            {/* LIKE */}
                                            <span className="inline-flex items-center gap-1">
                                                <Heart size={16} className="text-gray-600" />
                                                {img.likes_count}
                                            </span>

                                            {/* COMENTARIOS */}
                                            <span className="inline-flex items-center gap-1">
                                                <MessageCircle size={16} className="text-gray-600" />
                                                {img.comments_count}
                                            </span>
                                        </div>

                                        <span className="text-[11px] text-[#aaa]">
                                            {new Date(img.fecha_creacion).toLocaleDateString("es-AR")}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        ))}

                    </div>
                ) : (
                    <p className="text-center text-gray-500 italic mt-20">No se encontraron resultados.</p>
                )}

                {puedeCargarMas && (
                    <div className="text-center mt-14">
                        <button
                            onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                            className="px-10 py-4 rounded-full bg-[#3A5A40] text-white font-bold uppercase hover:bg-[#1f3022] transition shadow-md"
                        >
                            Cargar más obras
                        </button>
                    </div>
                )}
            </div>

            {/* MODAL REESTILIZADO */}
            <Dialog open={!!selectedImagen} onOpenChange={(open) => !open && setSelectedImagen(null)}>
            {selectedImagen && (
                <DialogContent
                    className="
                        max-w-3xl w-full 
                        bg-white 
                        text-[#2A332D]
                        rounded-3xl 
                        shadow-2xl 
                        p-8 
                        max-h-[90vh]
                        overflow-hidden 
                        flex flex-col
                    "
                >

                    {/* TÍTULO Y DATOS */}
                    <h1 className="text-3xl font-black mb-1">
                        {selectedImagen.nombre}
                    </h1>

                    <p className="text-sm text-[#6A7A70] mb-4">
                        <span className="font-semibold">Autor:</span> {selectedImagen.autor ?? "Desconocido"} •{" "}
                        <span className="font-semibold">Fecha:</span>{" "}
                        {new Date(selectedImagen.fecha_creacion).toLocaleDateString("es-AR")}
                    </p>

                    {/* IMAGEN - ÁREA FIJA */}
                    <div className="w-full h-[300px] rounded-2xl overflow-hidden bg-black mb-4 flex items-center justify-center">
                        <img
                            src={selectedImagen.url_imagen.startsWith("http")
                                ? selectedImagen.url_imagen
                                : `/storage/${selectedImagen.url_imagen}`}
                            alt={selectedImagen.nombre}
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {/* DESCRIPCION TRUNCADA */}
                    <p
                        className="
                            text-[#444]
                            leading-relaxed
                            mb-6
                            line-clamp-4
                        "
                    >
                        {selectedImagen.descripcion}
                    </p>

                    {/* BOTÓN PRINCIPAL */}
                    <div className="mt-auto flex justify-center">
                        <Link
                            href={`/galeria/${selectedImagen.id}`}
                            className="
                                inline-flex items-center gap-3
                                px-6 py-3 rounded-full
                                bg-[#3A5A40] text-white font-semibold
                                hover:bg-[#1f3022] transition shadow-md
                            "
                        >
                            <Heart size={18} className="opacity-90" />
                            <MessageCircle size={18} className="opacity-90" />
                            Ver más detalles y comentarios →
                        </Link>
                    </div>

                </DialogContent>
            )}
            </Dialog>


        </AppLayout>
    );
}
