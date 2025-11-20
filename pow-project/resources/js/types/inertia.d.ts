// resources/js/types/inertia.d.ts

import "@inertiajs/core";

declare module "@inertiajs/core" {
    interface PageProps {
        auth?: {
            user?: {
                id: number;
                name: string;
                email?: string;
                roles?: string[];
                permissions?: string[];
            } | null;
        };
        url?: string;
    }
}
