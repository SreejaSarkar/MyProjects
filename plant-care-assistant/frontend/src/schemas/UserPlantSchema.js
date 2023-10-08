import * as Yup from "yup";

export const UserPlantSchema = Yup.object().shape({
  name: Yup.string().min(2).max(25).required("Please enter a name"),
  description: Yup.string().min(10).max(100).required("Please enter a description"),
  image: Yup.mixed()
    .required('Image File is required')
    // .test('fileSize', 'File size is too large', (value) => {
    //   return value && value.size <= 2000000; // 1MB
    // })
    // .test('fileType', 'Unsupported file format', (value) => {
    //   return value && ['image/jpeg', 'image/png', 'application/pdf'].includes(value.type);
    // })
});