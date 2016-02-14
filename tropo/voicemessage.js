call(number);
say('This is an automated call from Fifteenth Night');
say('on behalf of');
say(reply.split().join(' '))
say('Message follows.');
wait(750);
say(msg);
var result = ask('Please press one to be connected to the sender', {
	choices: '[1 DIGIT]'
});
if (result.value === 1) {
	say('Transferring you now.');
	transfer(reply);
} else {
	say(result.value);
	say('Goodbye.');
}
