import { CommentDatabase } from "../database/CommentDatabase";
import { CreateCommentInputDTO, CreateCommentOutputDTO } from "../dtos/comment/createComment.dto";
import { DeleteCommentInputDTO, DeleteCommentOutputDTO } from "../dtos/comment/deleteComment.dto";
import { EditCommentInputDTO, EditCommentOutputDTO } from "../dtos/comment/editComment.dto";
import { GetCommentsInputDTO, GetCommentsOutputDTO } from "../dtos/comment/getComments.dto";
import { LikeOrDislikeCommentInputDTO, LikeOrDislikeCommentOutputDTO } from "../dtos/comment/likeOrDislikeComment.dto";
import { ForbiddenError } from "../errors/ForbiddenError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { COMMENT_LIKE, Comment, CommentDB, CommentModel, LikeDislikeDB } from "../models/Comment";
import { USER_ROLES } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class CommentBusiness {
    constructor(
        private commentDatabase: CommentDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }

    public createComment = async (input: CreateCommentInputDTO): Promise<CreateCommentOutputDTO> => {
        const { content, token } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const id = this.idGenerator.generate()
        const comment = new Comment(
            id,
            content,
            0,
            0,
            new Date().toISOString(),
            new Date().toISOString(),
            payload.id,
            payload.nickname
        )

        const commentDB = comment.toDBModel()
        await this.commentDatabase.insertComment(commentDB)

        const output: CreateCommentOutputDTO = undefined

        return output
    }

    public getComments = async (
        input: GetCommentsInputDTO
    ): Promise<GetCommentsOutputDTO> => {

        const { token } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const commentsDBWithCreatorNickname = await this.commentDatabase.getCommentsWithCreatorNickname()

        // const comments: CommentModel[] = commentsDB.map((commentDB) => {
        //     const comment = new Comment(
        //         commentDB.id,
        //         // commentDB.postId,
        //         // commentDB.userId,
        //         commentDB.content,
        //         commentDB.likes,
        //         commentDB.dislikes,
        //         commentDB.created_at,
        //         commentDB.updated_at,
        //         commentDB.creator_id,
        //         commentDB.creator_nickname
        //     )
        //     return comment.toBusinessModel()
        // })

        const comments = commentsDBWithCreatorNickname.map((commentWithCreatorNickname) => {
            const comment = new Comment(
                commentWithCreatorNickname.id,
                commentWithCreatorNickname.content,
                commentWithCreatorNickname.likes,
                commentWithCreatorNickname.dislikes,
                commentWithCreatorNickname.created_at,
                commentWithCreatorNickname.updated_at,
                commentWithCreatorNickname.creator_id,
                commentWithCreatorNickname.creator_nickname
            )
            return comment.toBusinessModel()
        })
        const output: GetCommentsOutputDTO = comments

        return output

    }

    public editComment = async (input: EditCommentInputDTO): Promise<EditCommentOutputDTO> => {
        const { content, commentId, token } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const commentDB = await this.commentDatabase.findCommentById(commentId)

        if (!commentDB) {
            throw new NotFoundError('Comentário com esta id não existe no Banco de Dados')
        }
        if (payload.id !== commentDB.creator_id) { //erro pra quando algum usuário quiser tentar editar comentário de outro usuário
            throw new ForbiddenError('Somente quem criou o comentário pode editá-lo')
        }
        const comment = new Comment(
            commentDB.id,
            // commentDB.postId,
            // commentDB.userId,
            commentDB.content,
            commentDB.likes,
            commentDB.dislikes,
            commentDB.created_at,
            commentDB.updated_at,
            commentDB.creator_id,
            payload.nickname
        )
        //atualização do comentário
        comment.setContent(content) //enviar o conteúdo do comentário e colocar o conteúdo recebido do body

        const updatedCommentDB = comment.toDBModel() //mandando o comentário atualizado para a variável updatedCommentDB
        await this.commentDatabase.updateComment(updatedCommentDB)

        const output: EditCommentOutputDTO = undefined
        return output

    }
    public deleteComment = async (input: DeleteCommentInputDTO): Promise<DeleteCommentOutputDTO> => {
        const { commentId, token } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new UnauthorizedError()
        }

        const commentDB = await this.commentDatabase.findCommentById(commentId)

        if (!commentDB) {
            throw new NotFoundError('Comentário com esta id não existe no Banco de Dados')
        }
        if (payload.role !== USER_ROLES.ADMIN) {
            if (payload.id !== commentDB.creator_id) { //erro pra quando algum usuário quiser excluir comentário de outro usuário
                throw new ForbiddenError('Somente quem criou o comentário pode excluir')
            }
        }

        await this.commentDatabase.deleteCommentById(commentId)

        const output: DeleteCommentOutputDTO = undefined
        return output

    }

    public likeOrDislikeComment = async (input: LikeOrDislikeCommentInputDTO): Promise<LikeOrDislikeCommentOutputDTO> => {
        const { commentId, token, like } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) { //validação do token
            throw new UnauthorizedError()
        }

        const commentDBWithCreatorNickname =
            await this.commentDatabase.findCommentWithCreatorNicknameById(commentId)

        if (!commentDBWithCreatorNickname) {
            throw new NotFoundError('Comentário com esta id não existe no Banco de Dados.')
        }

        const comment = new Comment(
            commentDBWithCreatorNickname.id,
            commentDBWithCreatorNickname.content,
            commentDBWithCreatorNickname.likes,
            commentDBWithCreatorNickname.dislikes,
            commentDBWithCreatorNickname.created_at,
            commentDBWithCreatorNickname.updated_at,
            commentDBWithCreatorNickname.creator_id,
            commentDBWithCreatorNickname.creator_nickname
        )

        const likeSQlite = like ? 1 : 0 //like é verdadeiro? então truthy(1), senão 0(falsy)

        const likeDislikeDB: LikeDislikeDB = {
            user_id: payload.id,
            comment_id: commentId,
            like: likeSQlite
        }

        const likeDislikeExists = await this.commentDatabase.findLikeDislike(likeDislikeDB)

        if (likeDislikeExists === COMMENT_LIKE.ALREADY_LIKED) {
            if (like) {
                await this.commentDatabase.removeLikeDislike(likeDislikeDB)
                comment.removeLike()
            } else {
                await this.commentDatabase.updateLikeDislike(likeDislikeDB)
                comment.removeLike()
                comment.addDislike()
            }
        } else if (likeDislikeExists === COMMENT_LIKE.ALREADY_DISLIKED) {
            if (like === false) {
                comment.removeDislike()
            } else {
                await this.commentDatabase.updateLikeDislike(likeDislikeDB)
                comment.removeDislike()
                comment.addLike()
            }
        } else {
            await this.commentDatabase.insertLikeDislikeComment(likeDislikeDB)
            like ? comment.addLike() : comment.addDislike()
        }
        const updatedCommentDB = comment.toDBModel()
        await this.commentDatabase.updateComment(updatedCommentDB)

        const output: LikeOrDislikeCommentOutputDTO = undefined
        return output
    }
}


