import express from "express"
import cookieParser from "cookie-parser"
const app = express()


app.use(express.json())
app.use(cookieParser())


// impored routes
import userRouter from "./routes/user.routes.js"
import blogRoutes from "./routes/blog.routes.js"



// routes
app.use("/api/v1/users", userRouter)
app.use("/api/v1/blogs", blogRoutes)


export default app