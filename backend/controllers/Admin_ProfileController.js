import Librarian_Model from '../models/Librarian_Model.js'

export const FetchAdminProfileController = async (req, res) => {
    try {
        const { id } = req.params

        if(!id){
            res.status(400).json({message: 'Missing admin id'})
            return;
        }

        const admin = await Librarian_Model.findById(id)

        if(!admin){
            res.status(404).json({message: 'Admin not found'})
            return;
        }

        res.status(200).json({message: 'Successfully fetched admin profile', admin: admin})

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Error: Fetch Admin Profile'})
    }
}

export const UpdateAdminProfileController = async (req, res) => {
    try {
        const { id } = req.params
        const {avatar} = req.body
        
        console.log(id)
        console.log(avatar)
        
        if(!id){
            res.status(400).json({message: 'Missing admin id'})
            return;
        }
        if(!avatar){
            res.status(400).json({message: 'Missing admin avatar'})
            return;
        }

        const findAdmin = await Librarian_Model.findById(id)

        if(!findAdmin){
            res.status(404).json({message: 'Admin not found'})
            return;
        }

        const updatedAdmin = await Librarian_Model.findByIdAndUpdate(id,
            {
                avatar
            },
            {
                new: true
            }
        )

        res.status(200).json({message: 'Avatar updated successfully', updatedAdmin: updatedAdmin})

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Error: Update Admin Profile'})
    }
}