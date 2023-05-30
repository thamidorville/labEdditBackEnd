import z from 'zod'
export interface createPostInputDTO {
    content: string,
    token: string
}

export type createPostOutputDTO = undefined

export const CreatePostSchema = z.object({
    content: z.string().min(1),
    token: z.string().min(1)
})