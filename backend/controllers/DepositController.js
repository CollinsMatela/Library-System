import DepositModel from "../models/Deposit_Model.js";

export const createDeposit = async (req, res) => {
       try {
        const { userId, idType, idNumber, idName, receivedBy } = req.body;

        // Validate required fields
        if (!userId || !idType || !idNumber || !idName || !receivedBy) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const existingDeposit = await DepositModel.findOne({userId, status: "held"}); // check if the user already has a held deposit
        if (existingDeposit) {
            return res.status(400).json({ success: false, message: "The user already has a held deposit" });
        }

        await DepositModel.create({
            userId,
            idType,
            idNumber,
            idName,
            receivedBy,
            status: "held"
        });

        return res.status(201).json({ success: true, message: "Deposit created successfully" });
       } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
       }
}

export const getDeposits = async (req, res) => {
       try {
            const deposits = await DepositModel.find();
            return res.status(200).json({ message: 'Deposits retrieved successfully', deposits });
       } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
       }
}

export const returnDeposit = async (req, res) => {
    try {
        const {id} = req.params;
        const {firstname, lastname} = req.body;

        console.log("Returning deposit for ID:", id, "by user:", firstname, lastname);

        if(!id || !firstname || !lastname) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        
        const deposit = await DepositModel.findById(id);
        if(!deposit) {
            return res.status(404).json({ success: false, message: "Deposit not found" });
        }
        if (deposit.status !== "held") {
            return res.status(400).json({
                success: false,
                message: "Deposit has already been returned"
            });
        }

        deposit.status = "returned";
        deposit.returnedDate = new Date();
        deposit.returnedBy = `${firstname} ${lastname}`;
        await deposit.save();
        
        res.status(200).json({message: "Deposit returned successfully", deposit });
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}