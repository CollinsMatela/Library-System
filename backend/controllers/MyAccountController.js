import UserModel from "../models/User_Registration_Model.js"

export const ChangeProfileController = async (req, res) => {
    try {
        const {userId, newProfile} = req.body;
        console.log('Hello World!')

        if(!userId || !newProfile){
            res.status(400).json({message: 'Missing userId and image file.'})
            return;
        }

        const changeProfile = await UserModel.findByIdAndUpdate(userId,
            {
                avatar: newProfile
            },
            {
                new: true
            }
        )

        if(!changeProfile){
            res.status(400).json({message: 'User was not found.'})
            return;
        }

        res.status(200).json({message: 'Successfully update profile.', updatedUser: changeProfile})

    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Error: Change Profile'})
    }
}

