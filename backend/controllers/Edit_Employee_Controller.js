import EmployeeModel from '../models/Employee_Registration_Model.js'

const Edit_Employee_Controller = async (req, res) => {
    const {employeeId} = req.params;
    const {lastname,firstname,middlename,year,month,day,gender,email,contact,role,gradeLevel,branch} = req.body;

    try {
        const isEmployee = await EmployeeModel.findOne({id: employeeId});
        if(!isEmployee) {
            res.status(404).json({message: "Employee's ID can't be found."})
            console.log("Id cant be found")
            return;
        }

        await EmployeeModel.findOneAndUpdate({id: employeeId},
            {
                lastname: lastname,
                firstname: firstname,
                middlename: middlename,
                year: year,
                month: month,
                day: day,
                gender: gender,
                email: email,
                contact: contact,
                role: role,
                gradeLevel: gradeLevel,
                branch: branch,
            })
        
        res.status(200).json({isSuccess: true, message: "Employee account updated successfully"});
        
    } catch (error) {
        console.error(error)
        res.json(500).json({message: "Internal Server Error"})
    }
}
export default Edit_Employee_Controller;