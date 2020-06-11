import { MongoClient, Database } from 'https://deno.land/x/mongo@v0.8.0/mod.ts'
import 'https://deno.land/x/dotenv/load.ts'

let db: Database

export function connect() {
	const client = new MongoClient()
	client.connectWithUri(Deno.env.get('MONGODB_URI')!)

	db = client.database('todo-app')
}

export function getDb() {
	return db
}
