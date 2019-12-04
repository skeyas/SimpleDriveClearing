const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

/*client.on('greeting', greeting =>	{
	greeting.channel.send('Welcome to roulette. Would you like to play?')
});*/

var oddOrEvenFlag = false;
var numberFlag = false;
var colourFlag = false;
var redFlag = false;
var blackFlag = false;
var oddFlag = false;
var evenFlag = false;
var receivedInput = false;
var blackNumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
var redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
var bet;
var amount;
var actual;

client.on('message', msg => {
	if(msg.author.id === client.user.id)	{
		return;
	}
	var val = msg.content;
	if (val === 'Roulette') {
		msg.reply('Welcome to Roulette. Would you like to play?');
	}
	if (val === 'Yes')	{
		msg.reply('What kind of bet would you like to place?');
	}
	else if(val === 'No')	{
		msg.reply('Thank you. Goodbye.');
	}
	else if(val === 'Number')	{
		numberFlag = true;
		msg.reply('Enter the number you want to bet on and the amount you wish to bet on it, separated by a space');
		
	}
	else if(val === 'Colour')	{
		colourFlag = true;
		msg.reply('Enter the colour upon which you want to bet');
		
	}
	else if(val === 'OE')	{
		oddOrEvenFlag = true;
		msg.reply('Would you like to bet on odd or even?');
	}
	else if(val === 'Odd')	{
		oddFlag = true;
		msg.reply('How much would you like to bet?');
	}
	else if (val === 'Even')	{
		evenFlag = true;
		msg.reply('How much would you like to bet?');
	}
	else if (val === 'Red')	{
		redFlag = true;
		msg.reply('How much would you like to bet?');
	}
	else if(val === 'Black')	{
		blackFlag = true;
		msg.reply('How much would you like to bet?');
	}
	else if(isNaN(val) == false)	{
		amount = val;
		actual = Math.ceil(Math.random()*38);
		msg.reply('You landed on ' + actual);
		if(colourFlag == true)	{
			if(blackNumbers.includes(actual))	{
				if(blackFlag == true)	{
					msg.reply('You win!');
					msg.reply('Would you like to play again?');
				}
				else	{
					msg.reply('You lose.');
					msg.reply('Would you like to play again?');
				}
			}
			if(redNumbers.includes(actual))	{
				if(redFlag == true)	{
					msg.reply('You win!');
					msg.reply('Would you like to play again?');
				}
				else	{
					msg.reply('You lose.');
					msg.reply('Would you like to play again?');
				}
			}
			colourFlag = false;
		}
		if(oddOrEvenFlag == true)	{
			if(actual % 2 == 0)	{
				if(evenFlag == true)	{
					msg.reply('You win!');
					msg.reply('Would you like to play again?');
				}
				else	{
					msg.reply('You lose.');
					msg.reply('Would you like to play again?');
				}
			}
			else	{
				if(oddFlag == true)	{
					msg.reply('You win!');
					msg.reply('Would you like to play again?');
				}
				else	{
					msg.reply('You lose.');
					msg.reply('Would you like to play again?');
				}
			}
			oddOrEvenFlag = false;
		}
	}
	
	else if(numberFlag == true) {
		ans = val.split(" ");
		bet = ans[0];
		amount = ans[1];
		actual = Math.ceil(Math.random()*38);
		msg.reply('You landed on ' + actual);
		if(bet == actual)	{
			msg.reply('You win!');
			msg.reply('Would you like to play again?');
		}
		else	{
			msg.reply('You lose.');
			msg.reply('Would you like to play again?');
		}
		numberFlag = false;
	}
});

client.login(auth.token);