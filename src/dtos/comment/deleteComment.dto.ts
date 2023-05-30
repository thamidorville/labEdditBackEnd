import z from 'zod'

export interface DeleteCommentInputDTO {
  commentId: string,
  token: string
}

export type DeleteCommentOutputDTO = undefined

export const DeleteCommentSchema = z.object({
  commentId: z.string().min(1),
  token: z.string().min(1)
})
