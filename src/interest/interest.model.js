var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var interestSchema = new Schema({
    
  game:{
      type:String,
      required:true
  },
  date:{
      type:[Date],
      required:true
  }

})

var Interst = mongoose.model('Interst',interestSchema);
module.exports = Interst;