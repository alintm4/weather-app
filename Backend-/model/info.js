const mongoose=require("mongoose")

const infoSchema=new mongoose.Schema(
    {
        city_name:{
            type:String,
            required:true,
        },
        temperature:{
            type:String,
            required:true,
        },
        weather_condition:{
            type:String,
            required:true,
        }
    },
    {timestamps:true}
)

const Info=mongoose.model("Info",infoSchema)
module.exports=Info;