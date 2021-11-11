import { ITask } from "../types/ITask"
import { connect } from '../libs/mongodb'
import { Task } from '../models/taskModel'
import { Log } from '../models/logModel'

const list = async (userId?: string, page = 1, perPage= 50) => {
    await connect()
    const maxPages = Math.min(perPage, 100)
    const skip = (+page - 1) * (+maxPages)
    const result = await Task.find({user: userId}).skip(skip).limit(maxPages)
    await Log.create({ user: userId, description: 'Listagem de tarefa'})
    return result
}

const get = async (userId?: string, id?: string) => {
    if (!id) {
      throw new Error("Informe o campo id!")
    }
    
    const task = await Task.findById(id)
  
    if (!task) {
        throw new Error("Nenhuma tarefa encontrada para o id informado!")
    }

    await Log.create({ user: userId, description: 'Detalhes de tarefas'})
  
    return task
}

const create = async (task: ITask, userId?: string) => {
  
    if (!task.description) {
        throw new Error("Informe o campo description!")
    }
    task.user = userId

    await connect()
    await Task.create(task)
    await Log.create({ user: userId, description: 'Criação de tarefas'})

    return true
  
}

const update = async (task: ITask, userId?: string) => {
    if (!task.id) {
        throw new Error("Informe o campo id!")
    }
  
    if (!task.description) {
        throw new Error("Informe o campo description!")
    }

    await connect()
    const taskFound = await Task.findByIdAndUpdate(task.id, task)
  
    if (!taskFound) {
      throw new Error("Nenhuma tarefa encontrada para o id informado!")
    }

    await Log.create({ user: userId, description: 'Alteração de tarefas'})
  
    return true
}

const remove = async (userId?: string, id?: string) => {
    if (!id) {
        throw new Error("Informe o campo id!")
    }
    await connect()
    const task = await Task.findByIdAndRemove(id)
    if (!task) {
        throw new Error("Nenhuma tarefa encontrada para o id informado!")
    }

    await Log.create({ user: userId, description: 'Exclusão de tarefas'})
  
    return true
}

export {
    list,
    get,
    create,
    update,
    remove
}
