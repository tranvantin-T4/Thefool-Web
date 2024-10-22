import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}

},{minimize:false}) //thu nho sizw neu khong them
const userModel=mongoose.models.user || mongoose.model('user',userSchema);//Nếu mô hình user đã được định nghĩa và tạo trước đó, mongoose.models.user sẽ trả về mô hình này.
//không tồn tại (chưa được tạo), Mongoose sẽ tạo một mô hình mới bằng cách sử dụng mongoose.model('user', userSchema).
export default userModel;