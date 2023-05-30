import z from 'zod' //valida dados de entrada com base em um esquema predefinido.

export interface SignupInputDTO { //dado de entrada será um objeto, por isso la embaixo no SignupSchema colocamos z.object
    nickname: string,
    email: string,
    password: string
}

export interface SignupOutputDTO {
    token: string
}

// o Zod está sendo usado para definir os esquemas de entrada e saída do endpoint de 
// cadastro (signup). A biblioteca permite especificar as regras e restrições para os 
// dados que são esperados nesse endpoint.

//estrutura do dado de entrada que o zod irá validar
export const SignupSchema = z.object({
    nickname: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(4)
}) //objeto de entrada