import { configureStore } from '@reduxjs/toolkit' // Импортируйте configureStore
import userReducer from './userReducer' // Импортируйте редюсеры
import fileReducer from './fileReducer' // Импортируйте редюсеры

export const store = configureStore({
	reducer: {
		user: userReducer,
		files: fileReducer,
	},
})
