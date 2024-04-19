export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export interface UserData {
    id: number;
    name: string;
    email: string;
    whatsapp: string;
    idade: number;
    nascimento: string;
    sexo: string;
    bairro: string;
    cidade: string;
    zona_eleitoral: string;
    created_at: string;
}

export interface RankUserData extends UserData {
    id: number;
    user_id: number;
}

export interface Count {
    name: string;
    count: number;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
