// La estructura de tu usuario basada en Laravel + Spatie
export interface User {
    id: number;
    name: string;
    email: string;
    roles: string[];       // Nombres de roles de Spatie
    permissions: string[]; // Nombres de permisos de Spatie
}

// La respuesta que esperamos del endpoint /login
export interface LoginResponse {
    token?: string;
    user?: User;
    require_2fa?: boolean;
    temp_id?: number;      // ID temporal si pide 2FA
    message?: string;
}

// El resultado que devolverá nuestra función de login al componente
export type LoginResult = 
    | { status: 'SUCCESS' } 
    | { status: '2FA_REQUIRED'; userId: number };