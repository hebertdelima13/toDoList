import { Request, Response } from 'express'
import * as task from '../services/task'
import { error } from '../libs/bindError'

const list = async (req: Request<any>, res: Response<any>) => {
    try {
        const { _id: userId } = req.user
        const tasks = await task.list(userId)
        return res.json(tasks)
    } catch (err: any) {
        return error(res, err)
    }
}

const get = async (req: Request<any>, res: Response<any>) => {
    try {
        const id = req.params.id
        const { _id: userId } = req.user
        if(!id) return res.status(400).json({ message: 'Informe o campo id!' })    

        const taskFound = await task.get(userId, id)
        res.json(taskFound)
    } catch (err: any) {
        return error(res, err)
    }

}

const create = async (req: Request<any>, res: Response<any>) => {
    try {
        const description = req.body.description
        const { _id: userId } = req.user

        const taskCreated = await task.create({ description }, userId)
        return res.json(taskCreated)
    } catch (err: any) {
        return error(res, err)
    }

  
}

const update = async (req: Request<any>, res: Response<any>) => {
    try {
        const id = req.params.id
        const description = req.body.description
        const completed = req.body.completed
        const { _id: userId } = req.user

        if (!id) {
            return res.status(400).json({ message: 'Informe o campo id!' })
        }

        const taskUpdated = await task.update({ id, description, completed }, userId)
        return res.json(taskUpdated)
    } catch (err: any) {
        return error(res, err)
    }

}

const remove = async (req: Request<any>, res: Response<any>) => {
    try {
        const id = req.params.id
        const { _id: userId } = req.user

        if (!id) {
            return res.status(400).json({ message: 'Informe o campo id!' })
        }
        await task.remove(userId, id)
        res.json({ success: true })

    } catch (err: any) {
        return error(res, err)
    }
}

export {
    list,
    get, 
    create,
    update, 
    remove
}