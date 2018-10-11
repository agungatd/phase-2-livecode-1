var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'      
  },
  name: {
      type:String,
      required:true
  },
  location: {
    type:String,
    required:true
  },
  address: {
    type:String,
    required:true
  }
});
EventSchema.index({name: 'text'});


var Event = mongoose.model('Event', EventSchema);

module.exports=Event