/*
Challenge #1: What is the function split doing? What does split return? Research the function online.

The first instance of the split method contains an argument of " ", what this does is it takes the value inside of authHeader and finds every instance of " ", and places a delimiter or a comma, thus 'splitting' the items both to the right and to the left of this delimiter and creating separate strings inside of an array. This converts 'Basic YWRtaW46a2Zrd29lcmY=' into [ 'Basic', 'YWRtaW46a2Zrd29lcmY=' ] .

Challenge #2: Why do we use (' ') in the first "split"? Why use [1]?

As stated above, the argument (' ') will find every instance of ' ' and convert what is to the left and to the right into separate string elements. The bracket notation at the end indicates that we are grabbing only the element in the first index of the newly created array. //  'YWRtaW46a2Zrd29lcmY='


Challenge #3: Why is the function Buffer used, what does "base64" do?

The Buffer.from function allows us to step outside of normal node memory space in order to work with, and manipulate the encoded data within the request header. Base64 is an encoding system and it allows us to encode the username and password to more safely and reliable transfer.  

Challenge #4: Why is .toString() used? 

The toString() method allows us to translate the encoded data back to its original human-readable form. // "admin:password"

Challenge #5: Why is .split(':') used? 

The split() method is used to separate the string at the point of (':'), creating two separate strings in an array. // [ "admin", "password" ]

Final Challenge: What is the type of the variable auth at the end of this code sequence? What's inside the variable auth at the end?

Type: Object, value: [ 'admin', 'password' ]


*/

const buffer = new Buffer.from("hey");
console.log(buffer);
console.log(buffer.toJSON());
