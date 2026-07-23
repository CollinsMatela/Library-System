import LogBook_Model from "../models/LogBook_Model.js"
const FetchLogBookController = async (req, res) => {
      try {
        const LogBookList = await LogBook_Model.find();
        await res.status(200).json({message: "Successfully fetched logbook", logBookList: LogBookList})
      } catch (error) {
        res.status(500).json({message: 'Internal Error'});
      }
}
export default FetchLogBookController