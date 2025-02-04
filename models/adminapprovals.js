import mongoose, { Schema, models } from "mongoose";

const adminApprovalSchema = new Schema(
  {
    content_submission_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ContentSubmission", // Reference to the 'ContentSubmission' model
      required: true,
    },
    admin_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the 'User' model (Admin)
      required: true,
    },
    action: {
      type: String,
      enum: ['approve', 'reject'],
      required: true,
    },
    approval_comment: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const AdminApproval = models.AdminApproval || mongoose.model("AdminApproval", adminApprovalSchema);
export default AdminApproval;