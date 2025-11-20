import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Link } from '@inertiajs/react';
import { Fragment } from 'react';
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({
    breadcrumbs,
}: {
    breadcrumbs: BreadcrumbItemType[];
}) {
    if (!breadcrumbs || breadcrumbs.length === 0) return null;

    return (
        <div className="py-5 px-3">
            <Breadcrumb>
                <BreadcrumbList
                    className="
                        text-[#3A5A40]
                        font-['Montserrat']
                        text-base   /* ⭐ Aumenta el tamaño (antes text-sm) */
                        font-semibold
                        flex items-center gap-1
                    "
                >
                    {breadcrumbs.map((item, index) => {
                        const isLast = index === breadcrumbs.length - 1;

                        return (
                            <Fragment key={index}>
                                <BreadcrumbItem>
                                    {isLast ? (
                                        <BreadcrumbPage className="opacity-70">
                                            {item.title}
                                        </BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink asChild>
                                            <Link
                                                href={item.href}
                                                className="
                                                    hover:underline 
                                                    underline-offset-4
                                                "
                                            >
                                                {item.title}
                                            </Link>
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>

                                {!isLast && (
                                    <BreadcrumbSeparator>
                                        <ChevronRight className="h-5 w-5 text-[#6A7A70]" />
                                    </BreadcrumbSeparator>
                                )}
                            </Fragment>
                        );
                    })}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}
