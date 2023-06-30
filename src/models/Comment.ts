export interface CommentDB {
  id: string,
  creator_id: string,
  content: string,
  likes: number,
  dislikes: number,
  created_at: string,
  updated_at: string,
  // creator_nickname:string
}

export interface CommentDBWithCreatorNickname {
  id: string,
  creator_id: string,
  content: string,
  likes: number,
  dislikes: number,
  created_at: string,
  updated_at: string,
  creator_nickname: string
}

export interface CommentModel {

  id: string,
  content: string,
  likes: number,
  dislikes: number,
  createdAt: string,
  updatedAt: string,
  creator: {
    id: string,
    nickname: string

  }
}

export interface LikeDislikeDB {
  user_id: string,
  comment_id: string,
  like: number
}


export enum COMMENT_LIKE {
  ALREADY_LIKED = "ALREADY LIKED",
  ALREADY_DISLIKED = "ALREADY DISLIKED"
}

export class Comment {
  constructor(

    private id: string,
    private content: string,
    private likes: number,
    private dislikes: number,
    private createdAt: string,
    private updatedAt: string,
    private creatorId: string,
    private creatorNickname: string
  ) { }

  public getId(): string {
    return this.id
  }
  public setId(value: string): void {
    this.id = value
  }
  public getContent(): string {
    return this.content
  }
  public setContent(value: string): void {
    this.content = value
  }
  public getLikes(): number {
    return this.likes
  }
  public setLikes(value: number): void {
    this.likes = value
  }

  public addLike = (): void => {
    this.likes++ //adiciona 1 like
  }

  public removeLike = (): void => {
    this.likes-- //remove 1 like
  }

  public getDislikes(): number {
    return this.dislikes
  }
  public setDislikes(value: number): void {
    this.dislikes = value
  }

  public addDislike = (): void => {
    this.dislikes++
  }

  public removeDislike = (): void => {
    this.dislikes--
  }

  public getCreatedAt(): string {
    return this.createdAt
  }
  public setCreatedAt(value: string): void {
    this.createdAt = value
  }
  public getUpdatedAt(): string {
    return this.updatedAt
  }
  public setUpdated(value: string): void {
    this.updatedAt = value
  }
  public getCreatorId(): string {
    return this.creatorId
  }
  public setCreatorId(value: string): void {
    this.creatorId = value
  }
  public getCreatorNickname(): string {
    return this.creatorNickname
  }
  public setCreatorNickname(value: string): void {
    this.creatorNickname = value
  }

  public toDBModel(): CommentDB {
    return {
      id: this.id,
      creator_id: this.creatorId,
      content: this.content,
      likes: this.likes,
      dislikes: this.dislikes,
      created_at: this.createdAt,
      updated_at: this.updatedAt
      // creator_nickname: this.creatorNickname
    }
  }
  public toBusinessModel(): CommentModel {
    return {
      id: this.id,
      content: this.content,
      likes: this.likes,
      dislikes: this.dislikes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      creator: {
        id: this.creatorId,
        nickname: this.creatorNickname
      }
    }
  }
}