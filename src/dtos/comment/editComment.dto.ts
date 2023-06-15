import z from 'zod'

export interface EditCommentInputDTO {
  commentId: string,
  content: string,
  token: string
}

export type EditCommentOutputDTO = undefined

export const EditCommentSchema = z.object({
  commentId: z.string().min(1),
  content: z.string().min(1),
  token: z.string().min(1)
}).transform(data => data as EditCommentInputDTO)
