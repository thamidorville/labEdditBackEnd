import { BaseDatabase } from "./BaseDatabase";

export class CommentDatabase extends BaseDatabase {
    public static TABLE_COMMENTS = "comments"
    public static TABLE_LIKES_DISLIKES_COMMENTS = "likes_dislikes_comments"
}