import { Router } from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt'
import { check, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import config from 'config'
const router = new Router()

router.post(
	'/registration',
	[
		check('email', 'Incorrect email').isEmail(),
		check(
			'password',
			'Password must be longer than 4 and shorter than 12'
		).isLength({ min: 4, max: 12 }),
	],
	async (req, res) => {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return res
					.status(400)
					.json({ message: 'Incorrect request', errors })
			}

			const { email, password } = req.body
			const candidate = await User.findOne({ email }) // Добавлено await

			if (candidate) {
				return res.status(400).json({
					message: `User with email ${email} already exists`,
				}) // Исправлено сообщение
			}

			const hashPassword = await bcrypt.hash(password, 8) // Исправлено использование bcrypt
			const user = new User({ email, password: hashPassword })
			await user.save()
			return res.json({ message: 'User was created' }) // Исправлено сообщение
		} catch (error) {
			console.error(error) // Логируем ошибку для отладки
			return res.status(500).send({ message: 'Server error' }) // Исправлен статус ответа
		}
	}
)

router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body
		const user = await User.findOne({ email })
		if (!user) {
			return res.status(404).json({ message: 'User not found ' })
		}
		const isPassValid = bcrypt.compareSync(password, user.password)
		if (!isPassValid) {
			return res.status(400).json({ message: 'Invalid Password ' })
		}
		const token = jwt.sign({ id: user.id }, config.get('secretKey'), {
			expiresIn: '1h',
		})
		return res.json({
			token,
			email: user.email,
			diskSpace: user.diskSpace,
			usedSpace: user.usedSpace,
			avatar: user.avatar,
		})
	} catch (error) {
		console.error(error) // Логируем ошибку для отладки
		return res.status(500).send({ message: 'Server error' }) // Исправлен статус ответа
	}
})

export default router
