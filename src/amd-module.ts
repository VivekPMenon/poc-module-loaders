//declare var define:any;

define(function(){
    var privateValue = 0;
    return {
        hello: function(){
            return "Hello from AMD";
        },

        decrement: function(){
            privateValue--;
        },

        getValue: function(){
            return privateValue;
        }
    };
});
