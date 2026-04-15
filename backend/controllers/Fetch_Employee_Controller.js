import EmployeeModel from "../models/Employee_Registration_Model.js";

const Fetch_Employee_Controller = async (req, res) => {
     try {
        const employees = await EmployeeModel.find();
        res.status(200).json({ message: "Employees fetched successfully", employees: employees });
     } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
     }
}
export default Fetch_Employee_Controller;