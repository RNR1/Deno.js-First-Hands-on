import { config } from 'https://deno.land/x/dotenv/mod.ts'
import { Application } from 'https://deno.land/x/oak/mod.ts'

import todos from './routes/todos.ts'
import { connect } from './helpers/db_client.ts'

config()
connect()

const app = new Application()

app.use(async (ctx, next) => {
	ctx.response.headers.set('Access-Control-Allow-Origin', '*')
	ctx.response.headers.set(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, DELETE'
	)
	ctx.response.headers.set('Access-Control-Allow-Headers', 'Content-Type')
	await next()
})

app.use(todos.routes())
app.use(todos.allowedMethods())

await app.listen({ port: 8000 })
