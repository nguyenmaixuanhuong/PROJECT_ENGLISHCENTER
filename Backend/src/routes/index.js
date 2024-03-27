const courseRouter = require('../routes/course.route');
const adminRouter = require('../routes/admin.route');
const studentRouter = require('../routes/student.route');
const teacherRouter = require('../routes/teacher.route');
const classRouter = require('../routes/class.route');
const roomRouter = require('../routes/room.route');
const scheduleRouter = require('../routes/schedule.route');
const registerRouter = require('../routes/register.route');
const authRouter = require('../routes/auth.route');
const attendanceRouter = require('../routes/attendance.route');
const informationRouter = require('../routes/information.route');
const accountRouter = require('../routes/account.route');
function route(app){
    app.use("/admin/course", courseRouter)
    app.use("/admin", adminRouter)
    app.use("/admin/student", studentRouter)
    app.use("/admin/teacher", teacherRouter)
    app.use("/admin/class", classRouter)
    app.use("/admin/room", roomRouter)
    app.use("/admin/schedule", scheduleRouter)
    app.use("/admin/register", registerRouter)
    app.use("/auth", authRouter)
    app.use("/attendance", attendanceRouter)
    app.use("/information", informationRouter)
    app.use("/account", accountRouter)
}

module.exports = route;
