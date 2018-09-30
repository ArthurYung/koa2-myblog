var mongoose =  require('mongoose')
var Schema = mongoose.Schema
var uSchema = new Schema({
  email:String,
  name:String
})

var lSchema = new Schema({
  name:String,
  psw:String
})

var mSchema = new Schema({
  msg:String,
  name:String,
  sup:Number,
  time:{
    type: Date,
    default: Date.now
  }
})

var sSchema = new Schema({
  token: String,
  supNum: Number,
})

mongoose.model('usercols',uSchema)
mongoose.model('msgcols',mSchema)
mongoose.model('mysups',sSchema)
mongoose.model('logins',lSchema)
exports.User = mongoose.model('usercols')
exports.Message = mongoose.model('msgcols')
exports.Mysup = mongoose.model('mysups')
exports.Login = mongoose.model('logins')

