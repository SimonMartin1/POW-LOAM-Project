import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login(props: LoginProps) {
    const { status, canResetPassword } = props;

    return (
        <AuthLayout
            title="Iniciar sesión"
            description="Accedé a tu cuenta del sistema del museo"
        >
            <Head title="Iniciar Sesión" />

            <div className="flex justify-center mb-6">
                <img src="/images/logoPecheras.png" className="w-24 opacity-90" />
            </div>

            <Form
                {...AuthenticatedSessionController.store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6 bg-white p-6 rounded-2xl shadow-md"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    autoComplete="email"
                                    placeholder="usuario@ejemplo.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Contraseña</Label>
                                    {canResetPassword && (
                                        <TextLink href={request()} className="ml-auto text-sm">
                                            ¿Olvidaste la contraseña?
                                        </TextLink>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox id="remember" name="remember" />
                                <Label htmlFor="remember">Recordarme</Label>
                            </div>

                            <Button type="submit" className="w-full" disabled={processing}>
                                {processing && <Spinner />}
                                Iniciar Sesión
                            </Button>
                        </div>

                        <div className="text-center text-sm text-muted-foreground">
                            ¿No tenés cuenta?{' '}
                            <TextLink href={register()}>
                                Registrate
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>

            {status && (
                <div className="mt-4 text-center text-sm font-medium text-green-600">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}
