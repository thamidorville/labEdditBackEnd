import { COMMENT_LIKE, CommentDB, CommentDBWithCreatorNickname, LikeDislikeDB } from "../models/Comment";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class CommentDatabase extends BaseDatabase {
    public static TABLE_COMMENTS = "comments"
    public static TABLE_LIKES_DISLIKES_COMMENTS = "likes_dislikes_comments"

    public insertComment = async (commentDB: CommentDB): Promise<void> => {
        await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS)
            .insert(commentDB)
    }

    public getCommentsWithCreatorNickname = async () => {
        const result = await BaseDatabase
            .connection(CommentDatabase.TABLE_COMMENTS)
            .select(
                `${CommentDatabase.TABLE_COMMENTS}.id`,
                `${CommentDatabase.TABLE_COMMENTS}.creator_id`,
                `${CommentDatabase.TABLE_COMMENTS}.content`,
                `${CommentDatabase.TABLE_COMMENTS}.likes`,
                `${CommentDatabase.TABLE_COMMENTS}.dislikes`,
                `${CommentDatabase.TABLE_COMMENTS}.created_at`,
                `${CommentDatabase.TABLE_COMMENTS}.updated_at`
            )
            .join(`${UserDatabase.TABLE_USERS}`,
                `${CommentDatabase.TABLE_COMMENTS}.creator_id`,
                "=",
                `${UserDatabase.TABLE_USERS}.id`)

        return result as CommentDBWithCreatorNickname[]
    }

    public findCommentById = async (id: string): Promise<CommentDB | undefined> => {
        const [result] = await BaseDatabase
            .connection(CommentDatabase.TABLE_COMMENTS)
            .select()
            .where({ id })

        return result as CommentDB | undefined
    }

    public updateComment = async (commentDB: CommentDB): Promise<void> => {
        await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS)
            .update(commentDB)
            .where({ id: commentDB.id })
    }

    public deleteCommentById = async (id: string): Promise<void> => {
        await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS)
            .delete()
            .where({ id })
    }

    public findCommentWithCreatorNicknameById = 
    async (id: string): Promise<CommentDBWithCreatorNickname | undefined> => {
        const [result] = await BaseDatabase
            .connection(CommentDatabase.TABLE_COMMENTS)
            .select(
                `${CommentDatabase.TABLE_COMMENTS}.id`,
                `${CommentDatabase.TABLE_COMMENTS}.creator_id`,
                `${CommentDatabase.TABLE_COMMENTS}.content`,
                `${CommentDatabase.TABLE_COMMENTS}.likes`,
                `${CommentDatabase.TABLE_COMMENTS}.dislikes`,
                `${CommentDatabase.TABLE_COMMENTS}.created_at`,
                `${CommentDatabase.TABLE_COMMENTS}.updated_at`,
                `${UserDatabase.TABLE_USERS}.nickname as creator_nickname`
            )
            .join(`${UserDatabase.TABLE_USERS}`,
                `${CommentDatabase.TABLE_COMMENTS}.creator_id`,
                "=",
                `${UserDatabase.TABLE_USERS}.id`)
            .where({ [`${CommentDatabase.TABLE_COMMENTS}.id`]: id })

        return result as CommentDBWithCreatorNickname | undefined
    }

    public findLikeDislike = async (
        likeDislikeDB: LikeDislikeDB
    ): Promise<COMMENT_LIKE | undefined> => { //o like ou undefined se não der like

        const [result]: Array<LikeDislikeDB | undefined> = await BaseDatabase
            .connection(CommentDatabase.TABLE_LIKES_DISLIKES_COMMENTS)
            .select()
            .where({
                user_id: likeDislikeDB.user_id,
                comment_id: likeDislikeDB.comment_id
            })

            if(result === undefined) {
                return undefined
            } else if (result.like === 1) {
              return COMMENT_LIKE.ALREADY_LIKED 
            } else {
                return COMMENT_LIKE.ALREADY_DISLIKED // aqui like é 0
            }
    }

    public removeLikeDislike = async (
        likeDislikeDB: LikeDislikeDB
    ): Promise<void> => {
        await BaseDatabase
            .connection(CommentDatabase.TABLE_LIKES_DISLIKES_COMMENTS)
            .delete()
            .where({
                user_id: likeDislikeDB.user_id,
                comment_id: likeDislikeDB.comment_id
            })
    }

    public updateLikeDislike = async (
        likeDislikeDB: LikeDislikeDB
    ): Promise<void> => {
        await BaseDatabase
            .connection(CommentDatabase.TABLE_LIKES_DISLIKES_COMMENTS)
            .update(likeDislikeDB)
            .where({
                user_id: likeDislikeDB.user_id,
                comment_id: likeDislikeDB.comment_id
            })
    }

    public insertLikeDislikeComment = async (
        likeDislikeDB: LikeDislikeDB
    ): Promise<void> => {
        await BaseDatabase
            .connection(CommentDatabase.TABLE_LIKES_DISLIKES_COMMENTS)
            .insert(likeDislikeDB)
    }
}