import EmployeeModel from '../models/Employee_Registration_Model.js'

const Edit_Employee_Controller = async (req, res) => {
    const {employeeId} = req.params;
    const {lastname,firstname,middlename,year,month,day,gender,email,contact,role,gradeLevel,branch} = req.body;

    try {
        const isEmployee = await EmployeeModel.findOne({"employee_information.id": employeeId});
        if(!isEmployee) {
            res.status(404).json({message: "Employee's ID can't be found."})
            console.log("Id cant be found")
            return;
        }

        await EmployeeModel.findOneAndUpdate({"employee_information.id": employeeId},
            {
                "personal_information.lastname": lastname,
                "personal_information.firstname": firstname,
                "personal_information.middlename": middlename,
                "personal_information.year": year,
                "personal_information.month": month,
                "personal_information.day": day,
                "personal_information.gender": gender,
                "personal_information.email": email,
                "personal_information.contact": contact,

                "employee_information.role": role,
                "employee_information.gradeLevel": gradeLevel,
                "employee_information.branch": branch,
            })
        
        res.status(200).json({isSuccess: true, message: "Employee account updated successfully"});
        
    } catch (error) {
        console.error(error)
        res.json(500).json({message: "Internal Server Error"})
    }
}
export default Edit_Employee_Controller;