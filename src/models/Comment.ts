export interface CommentDB {
    id: string,
    post_id: string,
    user_id: string,
    content: string,
    created_at: string
  }
  
  export interface CommentModel {
    id: string,
    content: string,
    createdAt: string,
    user: {
      id: string,
      nickname: string
    }
    post: {
      id: string,
      content: string
    }
  }
  
  export class Comment {
    constructor(
      private id: string,
      private content: string,
      private createdAt: string,
      private userId: string,
      private userNickname: string,
      private postId: string,
      private postContent: string
    ) {}
  
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
  
    public getCreatedAt(): string {
      return this.createdAt
    }
  
    public setCreatedAt(value: string): void {
      this.createdAt = value
    }
  
    public getUserId(): string {
      return this.userId
    }
  
    public setUserId(value: string): void {
      this.userId = value
    }
  
    public getUserNickname(): string {
      return this.userNickname
    }
  
    public setUserNickname(value: string): void {
      this.userNickname = value
    }
  
    public getPostId(): string {
      return this.postId
    }
  
    public setPostId(value: string): void {
      this.postId = value
    }
  
    public getPostContent(): string {
      return this.postContent
    }
  
    public setPostContent(value: string): void {
      this.postContent = value
    }
  }
  