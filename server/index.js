import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import authRouter from './routes/auth.routes.js'

const app = express()

app.use(express.json())
app.use('/api/auth', authRouter)

const PORT = config.get('serverPort') || 5000
const uri = config.get('dbUrl')

const start = async () => {
	try {
		await mongoose.connect(uri)
		console.log('MongoDB подключен успешно')

		app.listen(PORT, () => {
			console.log(`Сервер запущен на порту: ${PORT}`)
		})
	} catch (error) {
		console.error('Ошибка подключения к базе данных:', error)
		process.exit(1)
	}
}

start()
