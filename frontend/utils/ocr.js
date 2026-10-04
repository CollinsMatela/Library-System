import Tesseract from "tesseract.js";

export const extractTextFromImage = async (imageFile) => {
    try {
        if(!imageFile) return "";
        let result = await Tesseract.recognize(imageFile, 'fil+eng', {
            logger: (m) => console.log(m),
            config: {
                    tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK
                }
        });
        return result.data.text;
    } catch (error) {
        console.error("Error extracting text from image:", error);
        return "";
    }
};
    export default extractTextFromImage;