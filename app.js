const express = require(`express`)
const cors = require(`cors`)
const session = require(`express-session`)
const cookieParser = require(`cookie-parser`)
const passport = require(`passport`)
const morgan = require(`morgan`)
const path = require(`path`)
const userRouter = require(`./routes/user`)
const ticketRouter = require(`./routes/ticket`)
const performanceRouter = require(`./routes/performance`)
const db = require(`./models`)

const passportConfigure = require(`./passport`)

const app = express()



db.sequelize.sync()
    .then(() =>{
        console.log(`db 연결 성공`)
    })
    .catch(console.error)
passportConfigure()

app.use(morgan(`dev`))
app.use(cors({
    // frontserver address
    origin: true,
    credentials: true
}))

app.use(`/`, express.static(path.join(__dirname, `uploads`)))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET
}))
app.use(passport.initialize())
app.use(passport.session())


app.use(`/user`, userRouter)
// app.use(`/ticket`, ticketRouter)
// app.use(`/performance`, performanceRouter)

app.listen(3066, () =>{
    console.log(`서버 실행 중..`)
})
