import * as Yup from "yup";

export const AddTaskSchema = Yup.object({
  title: Yup.string().matches(/^[a-zA-Z0-9\s.]+$/, "Title can only contain letters, numbers, spaces, and dots").min(2).max(25).required("Please enter a title"),
  description: Yup.string().min(10).max(100).required("Please enter a description")
});