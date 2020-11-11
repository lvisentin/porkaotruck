import { UserEndereco } from './user';

export interface PorkaoResponse {
    error: boolean;
    data: Array<any>;
}

export interface UserEnderecoResponse extends PorkaoResponse {
    data: Array<UserEndereco>;
}