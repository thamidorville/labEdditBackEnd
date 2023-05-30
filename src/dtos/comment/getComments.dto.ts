import z from 'zod'

export interface GetCommentsInputDTO {
  commentId: string,
  token: string
}

export type GetCommentsOutputDTO = Comment[]

export const GetCommentsSchema = z.object({
  commentId: z.string().min(1),
  token: z.string().min(1),
})
