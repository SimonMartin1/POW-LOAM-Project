import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link} from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Imagenes',
        href: '/imagenes',
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Imagenes" />
            <div className= 'm-4'>
                <Link href="/imagenes/agregar">
                    <Button>Agregar una Imagen</Button>
                </Link>
            </div>

        </AppLayout>
    );
}