import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { type PropsWithChildren, useState, useEffect, useRef } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    usePage<SharedData>().props;

    // LISTA DE VIDEOS
    const videos = [

        "/videos/video2.mp4",
        "/videos/video3.mp4",
    ];

    // VIDEO ACTUAL
    const [currentIndex, setCurrentIndex] = useState(0);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    // CUANDO TERMINA EL VIDEO → SIGUIENTE
    const handleVideoEnd = () => {
        setCurrentIndex((prev) => (prev + 1) % videos.length);
    };

    // CAMBIAR SRC del video sin recrear el elemento
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.src = videos[currentIndex];
            videoRef.current.play().catch(() => {});
        }
    }, [currentIndex]);

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
            
            {/* LADO IZQUIERDO → VIDEO ROTATIVO */}
            <div className="relative hidden h-full lg:flex">

                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    onEnded={handleVideoEnd}
                    src={videos[0]} // primer video al cargar
                />

                {/* CAPA DE OSCURECIMIENTO */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* LADO DERECHO — FORMULARIO */}
            <div className="w-full lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">

                    {/* LOGO SOLO EN MOBILE */}
                    <Link
                        href={home()}
                        className="relative z-20 flex items-center justify-center lg:hidden"
                    >
                        <AppLogoIcon className="h-10 fill-current text-black sm:h-12" />
                    </Link>

                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-xl font-medium">{title}</h1>
                        <p className="text-sm text-balance text-muted-foreground">
                            {description}
                        </p>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}
