import  * as shortid from 'shortid'
import {IModel}  from '../interfaces/IModel'
/**
 * Model
 */
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@')

export let lib = {
    generateId : shortid.generate
}

export class BaseModel {
  id: string
  insertedAt: Date
  userId: string
  constructor(obj: IModel) {
    if (!obj.id) {
      this.id = shortid.generate()
    } else {
      this.id = obj.id
    }
    this.userId = obj.userId || null
    this.insertedAt = new Date()
  }
}

export const baseModel = (T: any) : Object => {
  return {
    id: T.type.string().default(() => shortid.generate()),
    name: T.type.string().required(),
    userId: T.type.string(),
    insertedAt: T.type.date().default(new Date(Date.now()))
  }
}

export interface DAO<T extends BaseModel> {
    create(t: T): Promise<T>
    find(id: string): Promise<T>
    findAll(): Promise<T[]>
    update(t: T): Promise<T>
    delete(id: string): Promise<boolean>
}
