import express from 'express'
import student from '../models/student.js'

const router = express.Router()

// GET all students (SAFE)
router.get('/', async (req, res) => {
  try {
    const students = await student.find()

    // always return array
    return res.status(200).json(students)

  } catch (err) {
    console.log("GET ERROR:", err)

    return res.status(500).json([])
  }
})

// ADD student
router.post('/', async (req, res) => {
  try {

    console.log("BODY:", req.body)

    const newStudent = new student(req.body)
    const savedStudent = await newStudent.save()

    return res.status(201).json(savedStudent)

  } catch (err) {
    console.log("POST ERROR:", err)

    return res.status(500).json({
      message: err.message
    })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const updated = await student.findByIdAndUpdate(
      req.params.id,
      { $set: req.body }, // ✅ எல்லாத்தையும் update பண்ணும்!
      { new: true }
    )
    return res.json(updated)
  } catch (err) {
    console.log("PUT ERROR:", err)
    return res.status(500).json({ message: err.message })
  }
})

// DELETE
router.delete('/:id', async (req, res) => {
  try {

    await student.findByIdAndDelete(req.params.id)

    return res.json({ message: 'Student deleted!' })

  } catch (err) {
    console.log("DELETE ERROR:", err)

    return res.status(500).json({
      message: err.message
    })
  }
})

export default router