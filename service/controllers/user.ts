import { Request, Response } from 'express'
import * as user from '../services/user'
import { error } from '../libs/bindError'

const login = async (req: Request<any>, res: Response<any>) => {
    try {
        const email = req.body.email
        const password = req.body.password

        const userLogged = await user.login({ email, password })
        return res.json(userLogged)
    } catch (err: any) {
        return error(res, err)
    }  
}

const register = async (req: Request<any>, res: Response<any>) => {
    try {
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password

        const userRegister = await user.register({ name, email, password })
        return res.json(userRegister)
    } catch (err: any) {
        return error(res, err)
    }  
}

export {
    login,
    register
}