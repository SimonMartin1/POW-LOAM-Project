import { Link } from "@inertiajs/react";

export default function MuseoHeader() {
    return (
        <header
            style={{
                backgroundColor: "#3A5A40",
                padding: "16px 32px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottomLeftRadius: "12px",
                borderBottomRightRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
            }}
        >
            {/* LOGO / NOMBRE */}
            <div
                style={{
                    color: "#F5F1E8",
                    fontSize: "24px",
                    fontWeight: 600,
                    letterSpacing: "1px",
                }}
            >
                Museo Digital
            </div>

            {/* NAV */}
            <nav
                style={{
                    display: "flex",
                    gap: "24px",
                }}
            >
                {[
                    { href: "/", label: "Inicio" },
                    { href: "/dashboard", label: "Dashboard" },
                    { href: "/imagenes", label: "Galería" },
                    { href: "/imagenes/agregar", label: "Agregar imagen" },
                ].map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        style={{
                            color: "#F5F1E8",
                            fontSize: "16px",
                            textDecoration: "none",
                            padding: "8px 14px",
                            borderRadius: "8px",
                            transition: "0.2s",
                        }}
                        className="hover-link"
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
        </header>
    );
}
