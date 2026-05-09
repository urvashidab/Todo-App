import mongoose from "mongoose";

const idValidation = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    const error = new Error("Invalid ID Format");
    error.statusCode = 400;
    return next(error);
  }
  next();
};

export default idValidation;
