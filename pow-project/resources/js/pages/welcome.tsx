import AppHeader from "@/components/AppHeader";
import { Link } from "@inertiajs/react";

interface Imagen {
    id: number;
    nombre: string;
    url_imagen: string;
}

export default function Welcome({ imagenes = [] }: { imagenes: Imagen[] }) {

    function resolveUrl(img?: Imagen) {
        if (!img?.url_imagen) return null;

        return img.url_imagen.startsWith("http")
            ? img.url_imagen
            : `/storage/${img.url_imagen}`;
    }

    const img1 = resolveUrl(imagenes[0]);
    const img2 = resolveUrl(imagenes[1]);

    return (
        <div className="min-h-screen bg-[#F7F3EB] text-[#3E3E3E]">

            <AppHeader />

            {/* BANNER */}
            <section className="w-full h-[420px]">
                <img
                    src="/images/banner.jpg"
                    className="w-full h-full object-cover"
                    alt="Museo Banner"
                />
            </section>

            {/* INTRO */}
            <section className="py-16 px-6 max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-[#3A5A40] mb-4">
                    Bienvenido al Museo Digital
                </h2>
                <p className="text-lg text-[#5A5A5A] leading-relaxed">
                    Un espacio donde las colecciones naturales e históricas se conservan
                    y se comparten con toda la comunidad pampeana.
                </p>
            </section>

            {/* OBRA 1 */}
            {img1 && (
                <section className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-[#3A5A40]">Obra destacada</h3>
                        <p className="mt-3 text-[#5A5A5A]">
                            Una pieza seleccionada al azar de nuestra colección.
                        </p>
                        <Link
                            href="/galeria"
                            className="mt-4 inline-block px-5 py-2 bg-[#3A5A40] text-white rounded-lg hover:bg-[#2F4F39]"
                        >
                            Ver más obras
                        </Link>
                    </div>
                    <img src={img1} className="flex-1 rounded-xl shadow-lg max-h-[300px] object-cover" />
                </section>
            )}

            {/* OBRA 2 */}
            {img2 && (
                <section className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row-reverse items-center gap-10">
                    <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-[#3A5A40]">Colección en expansión</h3>
                        <p className="mt-3 text-[#5A5A5A]">
                            Cada imagen cargada preserva el patrimonio cultural del museo.
                        </p>
                        <Link
                            href="/galeria"
                            className="mt-4 inline-block px-5 py-2 bg-[#7F5539] text-white rounded-lg hover:bg-[#5B3C28]"
                        >
                            Ver más obras
                        </Link>
                    </div>
                    <img src={img2} className="flex-1 rounded-xl shadow-lg max-h-[300px] object-cover" />
                </section>
            )}

            {/* FOOTER */}
            <footer className="mt-20 w-full bg-[#2F2F2F] text-[#E5E5E5] py-10">
                <div className="max-w-6xl mx-auto px-6">

                    {/* REDES */}
                    <div className="flex justify-center gap-8 mb-6">
                        <img src="/images/social/linkedin.png"
                            className="h-7 opacity-70 hover:opacity-100 transition cursor-pointer" />
                        <img src="/images/social/facebook.png"
                            className="h-7 opacity-70 hover:opacity-100 transition cursor-pointer" />
                        <img src="/images/social/x.png"
                            className="h-7 opacity-70 hover:opacity-100 transition cursor-pointer" />
                        <img src="/images/social/instagram.png"
                            className="h-7 opacity-70 hover:opacity-100 transition cursor-pointer" />
                        <img src="/images/social/youtube.png"
                            className="h-7 opacity-70 hover:opacity-100 transition cursor-pointer" />
                    </div>

                    {/* COPYRIGHT */}
                    <p className="text-center text-sm tracking-wide">
                        © {new Date().getFullYear()} Museo de Ciencias Naturales — Pecheras & Pategras · Facultad de Ingeniería UNLPam
                    </p>

                </div>
            </footer>

        </div>
    );
}
