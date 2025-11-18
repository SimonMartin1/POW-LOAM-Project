import AppLayoutTemplate from '@/layouts/app/app-header-layout';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs = [] }: AppLayoutProps) {
    return (
        <AppLayoutTemplate>
            {/* Top header breadcrumbs */}
            <div className="px-6 py-4">
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            {/* Page content */}
            <main className="px-6 py-4">
                {children}
            </main>
        </AppLayoutTemplate>
    );
}
