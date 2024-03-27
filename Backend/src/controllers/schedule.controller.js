const Schedule = require('../models/schedule.model')
const Student = require('../models/student.model')
exports.createSchedule = async (req, res) => {
    const schedule = req.body.schedule
    const { id, allDay, ...inforSchedule } = schedule;
    try {
        const newSchedule = await new Schedule(inforSchedule);
        newSchedule.save();
        res.status(200).send(newSchedule);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.getAllSchedule = async (req, res) => {
    try {
        const listSchedule = await Schedule.find().populate('class')
        const schedules = await listSchedule.map((schedule) => {
            return {
                title: schedule.class?.className,
                teacher: schedule.teacher,
                startDate: schedule.startDate,
                endDate: schedule.endDate,
                room: schedule.room,
                class: schedule.class?._id,
                id: schedule._id,
            }
        })
        res.status(200).send(schedules);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

exports.getSchedules = async(req,res)=>{
    const id = req.query.id;
    const role = req.query.role;
    let  listSchedule; 
    try {
        if(role === 'Student'){
            const student = await Student.findById(id);
            const classes = student.class;   
            listSchedule = await Schedule.find({ class: { $in: classes }}).populate('class')
        }
        else{
            listSchedule = await Schedule.find({teacher:id}).populate('class');
        }

        const schedules = await listSchedule.map((schedule) => {
            return {
                title: schedule.class?.className,
                teacher: schedule.teacher,
                startDate: schedule.startDate,
                endDate: schedule.endDate,
                room: schedule.room,
                class: schedule.class?._id,
                id: schedule._id,
            }
        })
        res.status(200).send(schedules);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

exports.updateSchedule = async (req, res) => {
    const { id, update } = req.body.schedule
    try {
        const updateSchedule = await Schedule.findByIdAndUpdate(id, update)
        res.status(200).send(updateSchedule)
    } catch (error) {
        res.status(500).send(error);
    }

};

exports.deleteSchedule = async (req, res) => {
    const id = req.query.id
    try {
        const deleteSchedule = await Schedule.findOneAndDelete({_id: id})
        res.status(200).send(deleteSchedule)

    } catch (error) {
        console.log(error);
        res.status(500).send(error);

    }
};