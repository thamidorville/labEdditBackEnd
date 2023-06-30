import { Request, Response } from "express";
import { CommentBusiness } from "../business/CommentBusiness";
import { ZodError } from 'zod'
import { BaseError } from "../errors/BaseError";
import { CreateCommentSchema } from "../dtos/comment/createComment.dto";
import { GetCommentsSchema } from "../dtos/comment/getComments.dto";
import { EditCommentSchema } from "../dtos/comment/editComment.dto";
import { DeleteCommentSchema } from "../dtos/comment/deleteComment.dto";
import { LikeOrDislikeCommentSchema } from "../dtos/comment/likeOrDislikeComment.dto";

export class CommentController {
    constructor(
        private commentBusiness: CommentBusiness
    ) {}

    public createComment = async (req: Request, res: Response) => {
        try {

            const input = CreateCommentSchema.parse({
                // postId: req.params.id,
                content: req.body.content,
                token: req.headers.authorization
            })

            const output = await this.commentBusiness.createComment(input)
            res.status(201).send({ message: 'Comentário criado com sucesso'})

        } catch (error) {
            console.log(error)
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send('Erro inesperado')
            }
        }
    }

    public getComments = async (req: Request, res: Response) => {
        try {

            const input = GetCommentsSchema.parse({
        
                token: req.headers.authorization
            })

            const output = await this.commentBusiness.getComments(input)
            res.status(200).send(output)

        } catch (error) {
            console.log(error)
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send('Erro inesperado')
            }
        }
    }

    public editComment = async (req: Request, res: Response) => {
        try {

            const input = EditCommentSchema.parse({
                commentId: req.params.id,
                content: req.body.content,
                token: req.headers.authorization
            })

            const output = await this.commentBusiness.editComment(input)
            res.status(200).send({ message: 'Comentário atualizado com sucesso'})

        } catch (error) {
            console.log(error)
            if (error instanceof ZodError) {
                res.status(400).send(error.issues)
            } else if (error instanceof BaseError) {
                res.status(error.statusCode).send(error.message)
            } else {
                res.status(500).send('Erro inesperado')
            }
        }
       
}
public deleteComment = async (req: Request, res: Response) => {
    try {

        const input = DeleteCommentSchema.parse({
            commentId: req.params.id,
            token: req.headers.authorization
        })

        const output = await this.commentBusiness.deleteComment(input)
        res.status(200).send({ message: 'Comentário deletado com sucesso'})

    } catch (error) {
        console.log(error)
        if (error instanceof ZodError) {
            res.status(400).send(error.issues)
        } else if (error instanceof BaseError) {
            res.status(error.statusCode).send(error.message)
        } else {
            res.status(500).send('Erro inesperado')
        }
    }

}
public likeOrDislikeComment = async (req: Request, res: Response) => {
    try {

        const input = LikeOrDislikeCommentSchema.parse({
            commentId: req.params.id,
             like: req.body.like, 
             token: req.headers.authorization
        })
        const output = await this.commentBusiness.likeOrDislikeComment(input)
        res.status(200).send({ message: 'Like/Dislike efetuado com sucesso'})

    } catch (error) {
        console.log(error)
        if (error instanceof ZodError) {
            res.status(400).send(error.issues)
        } else if (error instanceof BaseError) {
            res.status(error.statusCode).send(error.message)
        } else {
            res.status(500).send('Erro inesperado')
        }
    }

}

}