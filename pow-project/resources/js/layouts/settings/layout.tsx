import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

import { edit as editAppearance } from '@/routes/appearance';
import { edit as editPassword } from '@/routes/password';
import { edit } from '@/routes/profile';
import { show } from '@/routes/two-factor';

import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

import { User, Lock, KeyRound, SunMedium } from 'lucide-react';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Perfil',
        href: edit(),
        icon: User,
    },
    {
        title: 'Contraseña',
        href: editPassword(),
        icon: Lock,
    },
    {
        title: 'Autenticación en dos pasos',
        href: show(),
        icon: KeyRound,
    },
    {
        title: 'Apariencia',
        href: editAppearance(),
        icon: SunMedium,
    },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;

    return (
        <div className="px-6 py-10 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:space-x-12">
                {/* MENÚ LATERAL */}
                <aside className="w-full max-w-xs lg:w-56 mb-8 lg:mb-0">
                    <nav className="flex flex-col space-y-2">
                        {sidebarNavItems.map((item, index) => {
                            const href =
                                typeof item.href === 'string'
                                    ? item.href
                                    : item.href.url;

                            const isActive = currentPath === href;

                            const Icon = item.icon ?? User;

                            return (
                                <Button
                                    key={`${href}-${index}`}
                                    size="lg"
                                    variant={isActive ? 'secondary' : 'ghost'}
                                    asChild
                                    className={cn(
                                        'w-full justify-start gap-3 rounded-xl px-4 py-5 text-sm font-medium',
                                        isActive && 'bg-[#E4E8E2]'
                                    )}
                                >
                                    <Link href={item.href}>
                                        <Icon className="h-5 w-5 text-[#3A5A40]" />
                                        {item.title}
                                    </Link>
                                </Button>
                            );
                        })}
                    </nav>
                </aside>

                {/* SEPARADOR SOLO EN MOBILE */}
                <Separator className="my-8 lg:hidden" />

                {/* COLUMNA DERECHA (TÍTULO + CONTENIDO) */}
                <div className="flex-1 md:max-w-3xl">
                    <section className="space-y-10">
                        {/* 🔹 AHORA EL TÍTULO ESTÁ A LA DERECHA DEL MENÚ */}
                        <Heading
                            title="Configuración"
                            description="Administrá tus datos personales, seguridad y preferencias visuales."
                        />

                        {/* AQUÍ VAN PROFILE / PASSWORD / ETC. */}
                        {children}
                    </section>
                </div>
            </div>
        </div>
    );
}
