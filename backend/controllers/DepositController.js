import DepositModel from "../models/Deposit_Model.js";

export const createDeposit = async (req, res) => {
       try {
        const { idType, idNumber, idName, receivedBy } = req.body;

        // Validate required fields
        if (!idType || !idNumber || !idName || !receivedBy) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const exsistingDeposit = await DepositModel.findOne({ idNumber });
        if (exsistingDeposit) {
            return res.status(400).json({ success: false, message: "This ID is already deposited" });
        }

        await DepositModel.create({
            idType,
            idNumber,
            idName,
            receivedBy
        });

        return res.status(201).json({ success: true, message: "Deposit created successfully" });
       } catch (error) {
            return res.status(500).json({ success: false, message: "Internal server error" });
       }
}

export const getDeposits = async (req, res) => {
       try {
            const deposits = await DepositModel.find();
            return res.status(200).json({ message: 'Deposits retrieved successfully', deposits });
       } catch (error) {
            return res.status(500).json({ success: false, message: "Internal server error" });
       }
}