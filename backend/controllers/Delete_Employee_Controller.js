import EmployeeModel from "../models/Employee_Registration_Model.js";

const Delete_Employee_Controller = async (req, res) => {
    const { employeeId } = req.params;
    try {
        const employee = await EmployeeModel.findOneAndDelete({"id": employeeId });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export default Delete_Employee_Controller;