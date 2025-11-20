import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import { send } from '@/routes/verification';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head, Link, usePage } from '@inertiajs/react';

import DeleteUser from '@/components/delete-user';
import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit } from '@/routes/profile';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Mi Perfil',
        href: edit().url,
    },
];

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Mi Perfil" />

            <SettingsLayout>
                <div className="space-y-10">

                    {/* TÍTULO PRINCIPAL */}
                    <div className="mb-4">
                        <span className="text-[#3A5A40] font-bold tracking-[0.20em] text-xs uppercase block mb-2">
                            Configuración
                        </span>

                        <h1 className="text-3xl md:text-4xl font-black uppercase text-[#2A332D]">
                            Mi Perfil
                        </h1>

                        <div className="w-14 h-1.5 bg-[#3A5A40] mt-3 rounded-full opacity-70"></div>
                    </div>

                    {/* INFORMACIÓN DE PERFIL */}
                    <div className="bg-white p-8 rounded-3xl shadow">
                        <HeadingSmall
                            title="Información de perfil"
                            description="Actualizá tu nombre y dirección de correo"
                        />

                        <Form
                            {...ProfileController.update.form()}
                            options={{ preserveScroll: true }}
                            className="space-y-8 mt-6"
                        >
                            {({ processing, recentlySuccessful, errors }) => (
                                <>
                                    {/* NOMBRE */}
                                    <div className="grid gap-2">
                                        <Label
                                            htmlFor="name"
                                            className="font-semibold text-[#2A332D]"
                                        >
                                            Nombre completo
                                        </Label>

                                        <Input
                                            id="name"
                                            className="mt-1 block w-full px-4 py-3 rounded-xl border-gray-300 focus:border-[#3A5A40] focus:ring-[#3A5A40]"
                                            defaultValue={auth.user.name}
                                            name="name"
                                            required
                                            autoComplete="name"
                                            placeholder="Tu nombre"
                                        />

                                        <InputError className="mt-1" message={errors.name} />
                                    </div>

                                    {/* EMAIL */}
                                    <div className="grid gap-2">
                                        <Label
                                            htmlFor="email"
                                            className="font-semibold text-[#2A332D]"
                                        >
                                            Email
                                        </Label>

                                        <Input
                                            id="email"
                                            type="email"
                                            className="mt-1 block w-full px-4 py-3 rounded-xl border-gray-300 focus:border-[#3A5A40] focus:ring-[#3A5A40]"
                                            defaultValue={auth.user.email}
                                            name="email"
                                            required
                                            autoComplete="username"
                                            placeholder="Email"
                                        />

                                        <InputError className="mt-1" message={errors.email} />
                                    </div>

                                    {/* VERIFICACIÓN EMAIL */}
                                    {mustVerifyEmail && auth.user.email_verified_at === null && (
                                        <div>
                                            <p className="text-sm text-gray-600">
                                                Tu email no está verificado.{' '}
                                                <Link
                                                    href={send()}
                                                    as="button"
                                                    className="text-[#3A5A40] underline-offset-4 hover:underline"
                                                >
                                                    Reenviar enlace de verificación
                                                </Link>
                                            </p>

                                            {status === 'verification-link-sent' && (
                                                <div className="mt-2 text-sm font-medium text-green-600">
                                                    ¡Te enviamos un nuevo enlace!
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* BOTÓN GUARDAR */}
                                    <div className="flex items-center gap-4">
                                        <Button
                                            disabled={processing}
                                            className="bg-[#3A5A40] hover:bg-[#1F3022] text-white font-bold px-6 py-3 rounded-xl shadow"
                                        >
                                            Guardar cambios
                                        </Button>

                                        <Transition
                                            show={recentlySuccessful}
                                            enter="transition ease-in-out"
                                            enterFrom="opacity-0"
                                            leave="transition ease-in-out"
                                            leaveTo="opacity-0"
                                        >
                                            <p className="text-sm text-neutral-600">Guardado</p>
                                        </Transition>
                                    </div>
                                </>
                            )}
                        </Form>
                    </div>

                    {/* ELIMINAR CUENTA */}
                    <DeleteUser />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
