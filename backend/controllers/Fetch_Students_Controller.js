import StudentModel from "../models/Student_Registration_Model.js";
const Fetch_Students_Controller = async (req, res) => {
      
     try {
        const students = await StudentModel.find();
        res.status(200).json({message: "Successfully fetched students", students: students});
     } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
     }
}
export default Fetch_Students_Controller;