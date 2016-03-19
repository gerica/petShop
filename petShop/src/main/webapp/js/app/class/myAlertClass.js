function MyAlert() {	
    var _messages = [];    
	this.addMessage = function(type, text) {        	
		_messages.push({
			type: type,
			text: text
		});
    };    
    this.removeMessage = function(ind) {    	
    	_messages.splice(ind, 1);
    };    
    this.getMessages = function() {
    	return _messages;
    };
}