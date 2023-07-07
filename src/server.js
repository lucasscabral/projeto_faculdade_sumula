import app from "./app.js"
import chalk from "chalk"
import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT
app.listen(PORT,()=>console.log(chalk.bold.magenta(`Server rodando na porta ${PORT}...`)))
