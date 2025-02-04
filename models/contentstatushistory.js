import mongoose, { Schema, models } from "mongoose";

const contentStatusHistorySchema = new Schema(
  {
    content_submission_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ContentSubmission", // Reference to the 'ContentSubmission' model
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      required: true,
    },
  },
  { timestamps: true }
);

const ContentStatusHistory = models.ContentStatusHistory || mongoose.model("ContentStatusHistory", contentStatusHistorySchema);
export default ContentStatusHistory;