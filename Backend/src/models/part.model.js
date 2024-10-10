const mongoose = require('mongoose');
const question = require('./questions.model');
const { Schema } = mongoose;

const partSchema = mongoose.Schema({
    title: {
        type: String,
    },
    number: {
        type: Number,
    },
    type: {
        type: String,
    },
    audioFile: {
        url: {
            type: String,
        },
        publicId: {
            type: String,
        }
    },
    passage: {
        type: String,
    },
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'Question',
    }],
    score: {
        type: Number,
    }
})

partSchema.pre('findOneAndDelete', async function (next) {
    try {
        console.log('Part middleware called');
        const docToDelete = await this.model.findOne(this.getFilter());
        if (docToDelete) {
            await mongoose.model('Question').deleteMany({ _id: { $in: docToDelete.questions } });
            console.log('Related questions deleted');
        }
        next();
    } catch (err) {
        next(err);
    }
});

const Part = mongoose.model('Part', partSchema);
module.exports = Part;