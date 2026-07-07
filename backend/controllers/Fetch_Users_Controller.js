import User_Registration_Model from "../models/User_Registration_Model.js";
const Fetch_Users_Controller = async (req, res) => {
      
     try {
        const users = await User_Registration_Model.find();
        res.status(200).json({message: "Successfully fetched users", users: users});
     } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
     }
}
export default Fetch_Users_Controller;