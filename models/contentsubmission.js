import mongoose, { Schema, models } from "mongoose";

const contentSubmissionSchema = new Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the 'User' model
      required: true,
    },
    page_title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    admin_comment: {
      type: String,
      default: "",
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ContentSubmission = models.ContentSubmission || mongoose.model("ContentSubmission", contentSubmissionSchema);
export default ContentSubmission;