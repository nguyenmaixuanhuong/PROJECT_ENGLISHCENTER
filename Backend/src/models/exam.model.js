const mongoose = require('mongoose');
const { Schema } = mongoose;

const examSchema = mongoose.Schema({
    userCreated: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    summary: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        scope: {
            isPublic: {
                type: Boolean,
                default: true,
            },
            classes: [{
                type: Schema.Types.ObjectId,
                ref: 'Class'
            }]
        },
        times: {
            type: Number,
        },
        startTime: {
            type: Date,
        },
        endTime: {
            type: Date,
        },

    },
    part: [{
        type: Schema.Types.ObjectId,
        ref: 'Part',
        required: true
    }],
    isPublicScore: {
        type: Boolean,
        default: false
    }
})
examSchema.pre('findOneAndDelete', async function (next) {
    try {
        console.log('Exam middleware called');
        const docToDelete = await this.model.findOne(this.getFilter());
        if (docToDelete) {
            await mongoose.model('Part').deleteMany({ _id: { $in: docToDelete.part } });
            console.log('Related parts deleted');
        }
        next();
    } catch (err) {
        next(err);
    }
});
const Exam = mongoose.model('Exam', examSchema);
module.exports = Exam;