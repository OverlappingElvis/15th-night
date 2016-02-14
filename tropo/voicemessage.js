call(number);
say('This is an automated call from Fifteenth Night. Message follows.');
wait(750);
say(msg);
var result = ask('To accept this message and be connected to the sender, say yes. Otherwise, say no or hang up now.', {
	choices: 'yes, no'
});
switch (result.value) {
	case 'yes':
		say('Connecting you to');
		say_as(reply, 'phone');
		transfer(reply, {
			playvalue: 'http://www.phono.com/audio/holdmusic.mp3',
			onTimeout: function() {
				say('Sorry,');
				say_as(reply, 'phone');
				say('did not answer. Goodbye.');
				hangup();
			}
		});
		break;
	default:
		say('Goodbye.');
		hangup();
}
