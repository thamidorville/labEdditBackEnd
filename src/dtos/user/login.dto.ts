import z from 'zod'

export interface LoginInputDTO {
    email: string,
    password: string
}

export interface LoginOutputDTO {
    token: string
}

//estrutura de validação que garante que antes de processar o login, ele esteja de acordo com o esquema abaixo
export const LoginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4)
}).transform(data => data as LoginInputDTO)