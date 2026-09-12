import Librarian_Model from '../models/Librarian_Model.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const Admin_LoginController = async (req, res) => {
    const {email, password} = req.body
      try {
        
        if(!email || !password){
            res.status(400).json({message: 'Incomplete Credential'})
            return
        }

        const librarian = await Librarian_Model.findOne({email});
        if(!librarian){
            res.status(404).json({message: 'Librarian cannot found'})
            return
        }

        console.log('Librarian Password', librarian.password);
        console.log('Current Password', password);

        const isMatch = await bcrypt.compare(password, librarian.password);
        if (!isMatch) {
        console.log('Password is not match')
        res.status(401).json({ message: "Login failed. Please try again." });
        return 
        } else {
        console.log('Password is Mathced!')
        }

        const token = jwt.sign(
            {id: librarian._id, role: librarian.role},
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        )

        res.status(200).json({
            message: 'successfully login',
            isSuccess: true,
            librarian: librarian,
            role: librarian.role,
            token: token
        })

      } catch (error) {
        console.log("LOGIN ERROR:", error);
        res.status(500).json({message: 'Internal Server Error'})
      }
}
export default Admin_LoginController