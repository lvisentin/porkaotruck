import { UserEndereco } from './user';

export interface PorkaoResponse {
    error: boolean;
    data: Array<any>;
}

export interface UserEnderecoResponse extends PorkaoResponse {
    data: Array<UserEndereco>;
}

export interface SearchResponse extends PorkaoResponse {
    current_page?: number;
    first_page_url?: string;
    from?: number;
    last_page?: number;
    last_page_url?: string;
    next_page_url?: any;
    path?: string;
    per_page?: number;
    prev_page_url?: any;
    to?: number;
    total?: number;
}