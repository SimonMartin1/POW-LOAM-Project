import AppLayout from "@/layouts/app-layout";
import { Head, Link } from "@inertiajs/react";

// Definimos el tipo Imagen
interface Imagen {
    id: number;
    nombre: string;
    descripcion: string | null;
    autor: string | null;
    fecha_creacion: string;
    url_imagen: string;
}

// Tipamos las props del componente
export default function Galeria({ imagenes }: { imagenes: Imagen[] }) {
    return (
        <AppLayout
            breadcrumbs={[
                { title: "Galería", href: "/galeria" }
            ]}
        >
            <Head title="Galería" />
            <Link
                href="/dashboard"
                className="inline-block text-[#2F4F39] mb-6 px-4 py-2 rounded-xl border border-[#cbbfae] bg-white hover:bg-[#e8dfd3] transition shadow-sm"
            >
                ← Volver
            </Link>


            <div className="min-h-screen bg-[#F7F3EB] px-6 py-8 max-w-7xl mx-auto">

                <h1 className="text-4xl font-bold text-[#3A5A40] mb-8 text-center">
                    Galería del Museo
                </h1>

                {/* GRID DE IMÁGENES */}
                <div
                    className="
                        grid 
                        grid-cols-1 
                        sm:grid-cols-2 
                        md:grid-cols-3 
                        lg:grid-cols-4 
                        gap-8
                    "
                >
                    {imagenes.map((img) => (
                        <Link
                            key={img.id}
                            href={`/galeria/${img.id}`}
                            className="
                                rounded-2xl overflow-hidden bg-white shadow-md 
                                hover:shadow-xl transition cursor-pointer block
                            "
                        >
                            {/* Imagen */}
                            <img
                                src={
                                    img.url_imagen.startsWith("http")
                                        ? img.url_imagen
                                        : `/storage/${img.url_imagen}`
                                }
                                alt={img.nombre}
                                className="w-full h-56 object-cover"
                            />

                            {/* Info */}
                            <div className="p-4">
                                <h2 className="text-xl font-semibold text-[#3A5A40]">
                                    {img.nombre}
                                </h2>

                                <p className="text-sm text-[#5A5A5A] mt-1">
                                    {img.autor}
                                </p>

                                <p className="text-xs text-[#8A8A8A] mt-1">
                                    {new Date(img.fecha_creacion).toLocaleDateString("es-AR")}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
