export type Token = string
export type Hash = string
export type Payload = {
    id: string,
    username: string
}
export interface IAuthenticator {
    login: (password: string, hash: string, payload: Payload) => Token | null,
    signup: (password: string) => Hash | null,
    authenticate: (token: Token, id?: number, role?: string) => boolean
}