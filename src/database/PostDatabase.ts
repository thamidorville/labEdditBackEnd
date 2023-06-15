import { LikeDislikeDB, POST_LIKE, PostDB, PostDBWithCreatorNickname } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts"
    public static TABLE_LIKES_DISLIKES = "likes_dislikes"

    //metodos db

    public insertPost = async (postDB: PostDB): Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
            .insert(postDB)
    }

    public getPostWithCreatorNickname = async (): Promise<PostDBWithCreatorNickname[]> => {
        const result = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .select(
                `${PostDatabase.TABLE_POSTS}.id`,
                `${PostDatabase.TABLE_POSTS}.creator_id`,
                `${PostDatabase.TABLE_POSTS}.content`,
                `${PostDatabase.TABLE_POSTS}.likes`,
                `${PostDatabase.TABLE_POSTS}.dislikes`,
                `${PostDatabase.TABLE_POSTS}.created_at`,
                `${PostDatabase.TABLE_POSTS}.updated_at`,
                `${UserDatabase.TABLE_USERS}.nickname as creator_nickname`

            )
            .join(`${UserDatabase.TABLE_USERS}`, `${PostDatabase.TABLE_POSTS}.creator_id`,
                "=",
                `${UserDatabase.TABLE_USERS}.id`
            )

        return result as PostDBWithCreatorNickname[]
    }

    public findPostById = async (id: string): Promise<PostDB | undefined> => {
        const [result] = await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
            .select()
            .where({ id })

        return result as PostDB | undefined
    }

    public updatePost = async (postDB: PostDB): Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
            .update(postDB)
            .where({ id: postDB.id })
    }

    public deletePostById = async (id: string): Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
            .delete()
            .where({ id })
    }

    public findPostWithCreatorNicknameById = async (id: string): Promise<PostDBWithCreatorNickname | undefined> => {
        const [result] = await BaseDatabase
            .connection(PostDatabase.TABLE_POSTS)
            .select(
                `${PostDatabase.TABLE_POSTS}.id`,
                `${PostDatabase.TABLE_POSTS}.creator_id`,
                `${PostDatabase.TABLE_POSTS}.content`,
                `${PostDatabase.TABLE_POSTS}.likes`,
                `${PostDatabase.TABLE_POSTS}.dislikes`,
                `${PostDatabase.TABLE_POSTS}.created_at`,
                `${PostDatabase.TABLE_POSTS}.updated_at`,
                `${UserDatabase.TABLE_USERS}.nickname as creator_nickname`

            )
            .join(`${UserDatabase.TABLE_USERS}`, `${PostDatabase.TABLE_POSTS}.creator_id`,
                "=",
                `${UserDatabase.TABLE_USERS}.id`
            )
            .where({ id })
        return result as PostDBWithCreatorNickname | undefined
    }

    public findLikeDislike = async (likeDislikeDB: LikeDislikeDB
    ): Promise<POST_LIKE | undefined> => {

        const [result]: Array<LikeDislikeDB | undefined> = await BaseDatabase
            .connection(PostDatabase.TABLE_LIKES_DISLIKES)
            .select()
            .where({
                user_id: likeDislikeDB.user_id,
                post_id: likeDislikeDB.post_id
            })

        if(result === undefined) {
            return undefined
        } else if (result.like === 1){
            return POST_LIKE.ALREADY_LIKED
        } else {
            return POST_LIKE.ALREADY_DISLIKED
        }
    }

    public removeLikeDislike = async (likeDislikeDB: LikeDislikeDB): Promise<void> => {
        await BaseDatabase
            .connection(PostDatabase.TABLE_LIKES_DISLIKES)
            .delete()
            .where({
                user_id: likeDislikeDB.user_id,
                post_id: likeDislikeDB.post_id
            })

    }
    public updateLikeDislike = async (
        likeDislikeDB: LikeDislikeDB
    ): Promise<void> => {

        await BaseDatabase
            .connection(PostDatabase.TABLE_LIKES_DISLIKES)
            .update(likeDislikeDB)
            .where({
                user_id: likeDislikeDB.user_id,
                post_id: likeDislikeDB.post_id
            })

    }

    public insertLikeDislike = async (
        likeDislikeDB: LikeDislikeDB
    ): Promise<void> => {

        await BaseDatabase
            .connection(PostDatabase.TABLE_LIKES_DISLIKES)
            .insert(likeDislikeDB)

    }
}
