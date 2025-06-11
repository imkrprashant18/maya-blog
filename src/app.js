import express from "express"
import cookieParser from "cookie-parser"
const app = express()


app.use(express.json())
app.use(cookieParser())


// impored routes
import userRouter from "./routes/user.routes.js"



// routes
app.use("/api/v1/users", userRouter)


export default app