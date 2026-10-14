import ReportModel from "../models/Report_Model.js";

export const SubmitReport = async (req, res) => {
    const { reportData } = req.body;

    try {

        if (!reportData) {
            return res.status(400).json({
                message: "No report data provided"
            });
        }

        if (
            !reportData.month ||
            reportData.year === undefined ||
            reportData.year === null ||
            reportData.month < 1 ||
            reportData.month > 12 ||
            !Number.isInteger(Number(reportData.year)) ||
            Number(reportData.year) < 1
        ) {
            return res.status(400).json({
                message: "Valid month and year are required"
            });
        }


        const monthlyReport = await ReportModel.findOne({
            month: String(reportData.month),
            year: Number(reportData.year)
        });

        if (monthlyReport) {
            return res.status(409).json({
                message: "A report for this month and year already exists"
            });
        }


        const newReport = await ReportModel.create(reportData);


        return res.status(201).json({
            message: "Successfully created report",
            report: newReport
        });

    } catch (error) {
        console.error("SubmitReport error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const fetchReports = async (req, res) => {
    try {
        let reports = await ReportModel.find()
            .sort({ year: -1, month: -1 });

        return res.status(200).json({
            message: "Successfully fetched all reports",
            reports: reports
        });
    } catch (error) {
        console.error("fetchReports error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

export const fetchReportsByMonthAndYear = async (req, res) => {
    let { month, year } = req.body;

    try {
        if (
            !month ||
            year === undefined ||
            year === null ||
            Number(month) < 1 ||
            Number(month) > 12 ||
            !Number.isInteger(Number(year)) ||
            Number(year) < 1
        ) {
            return res.status(400).json({
                message: "Valid month and year are required"
            });
        }

        let report = await ReportModel.findOne({
            month: String(month),
            year: Number(year)
        });

        if (!report) {
            return res.status(404).json({
                message: "No report found for the selected month and year"
            });
        }

        return res.status(200).json({
            message: "Successfully fetched report",
            report: report
        });
    } catch (error) {
        console.error("fetchReportsByMonthAndYear error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
