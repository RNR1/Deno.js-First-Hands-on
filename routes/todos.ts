import { Router } from 'https://deno.land/x/oak/mod.ts'
import { ObjectId } from 'https://deno.land/x/mongo@v0.8.0/mod.ts'

import { getDb } from '../helpers/db_client.ts'

const router = new Router()

interface Todo {
	id?: string
	text: string
}

let todos: Todo[] = []

router.get('/todos', async (ctx) => {
	const todos = await getDb().collection('todos').find()
	const transformedTodos = todos.map(
		(todo: { _id: ObjectId; text: string }) => {
			return { id: todo._id.$oid, text: todo.text }
		}
	)
	ctx.response.body = { todos: transformedTodos }
})
router.post('/todos', async (ctx) => {
	const data = await ctx.request.body()
	const newTodo: Todo = { text: data.value.text }

	const id = await getDb().collection('todos').insertOne(newTodo)

	newTodo.id = id.$oid

	todos.push(newTodo)

	ctx.response.body = { message: 'Created todo!', todo: newTodo }
})
router.put('/todos/:todoId', async (ctx) => {
	const id = ctx.params.todoId!
	const data = await ctx.request.body()

	await getDb()
		.collection('todos')
		.updateOne({ _id: ObjectId(id) }, { text: data.value.text })

	ctx.response.body = { message: 'Updated Todo!' }
})

router.delete('/todos/:todoId', async (ctx) => {
	const id = ctx.params.todoId!
	await getDb()
		.collection('todos')
		.deleteOne({ _id: ObjectId(id) })

	ctx.response.body = { message: 'Deleted Todo!' }
})

export default router