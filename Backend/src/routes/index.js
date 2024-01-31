const courseRouter = require('../routes/course.route');
const adminRouter = require('../routes/admin.route');
const studentRouter = require('../routes/student.route');
const teacherRouter = require('../routes/teacher.route');
const classRouter = require('../routes/class.route');
function route(app){
    app.use("/admin/course", courseRouter)
    app.use("/admin", adminRouter)
    app.use("/admin/student", studentRouter)
    app.use("/admin/teacher", teacherRouter)
    app.use("/admin/class", classRouter)
}

module.exports = route;
