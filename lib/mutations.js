'use-strict'
const connectDB = require('./db')
const { ObjectID } = require('mongodb')
module.exports = {
    createCourse: async (root,{input}) =>{
        let db = await connectDB()
        const defaults = {
            teacher:'Luis',
            topic:'Course'
        }
        let newCourse = Object.assign(defaults,input)
        try {
            let course = await db.collection('courses').insertOne(newCourse)
            newCourse._id = course.insertedId            
        } catch (error) {
            console.error(error)
        }
        return newCourse
    },
    editCourse: async (root,{_id,input})=>{
        let db = await connectDB()
        let course,updatedCourse
        try {    
            course = await db.collection('courses').updateOne(
                {_id:ObjectID(_id)},
                {$set:input}
            )
            updatedCourse = await db.collection('courses').findOne({_id:ObjectID(_id)})
        } catch (error) {
            console.error(error)
        }
        return updatedCourse
    },
    deleteCourse: async (root,{_id})=>{
        let db = await connectDB()
        let course
        try {    
            course = await db.collection('courses').deleteOne({_id:ObjectID(_id)})
        } catch (error) {
            console.error(error)
        }
        return true
    }
}