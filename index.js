const {token} = require('./secret');
const Discord = require('discord.js');

const client = new Discord.Client();

var didDailyCheck = false;

// list of submission channels
const submissionList = [
    "859266797680984095", // test channel
    "853820913955110942", // colour theory
    "853822141992796191", // environments
    "853822656531791872", // perspective
    "853823062968762378", // interiors
    "853825764419960872", // concept art
    "853826924455264286", // anatomy
    "853828342079815740", // character design
    "859260394900029471", // foreshortening
    "853829336910397450", // interaction
    "853829700051664897"  // storyboard
];

const adminRole = "853808936133591080";

const submittedRole = "859794283878678568";

client.on('ready', () => {
    console.log('Logged in as ${client.user.tag}!');
    console.log('I am ready to do stuff');
    dailyCheck();
});

function dailyCheck() {
    
}

client.on('message', msg => {
    if (msg.author.bot) return;

    // commands
    switch (msg.content) {
        case 'ping': {
            msg.reply('pong');
            break;
        }
        case 'artbot help': {
            var help_text = '__**Available commands:**__\n';
            help_text += '**ping**: test if the bot is working\n';
            help_text += '**embed test**\n';
            help_text += '**get channel**: get information about the channel\n';
            help_text += '**admin test**\n';
            help_text += '**kick test**\n';
            msg.reply(help_text);
            break;
        }
        case 'embed test': {
            const embed = new Discord.MessageEmbed()
            .setTitle('A slick little embed')
            .setColor(0xff0000)
            .setDescription('Hello, this is a slick embed!');
            msg.channel.send(embed);
            break;
        }
        case 'get channel': {
            msg.reply('this channel is ' + msg.channel.name + ' id: ' + msg.channel.id);
            break;
        }
        case 'admin test': {
            if (msg.member.hasPermission(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
                msg.reply('you are an admin');
            } else {
                msg.reply('you do not have permissions to do that');
            }
            break;
        }
        case 'kick test': {
            if (msg.member.hasPermission(Discord.Permissions.FLAGS.KICK_MEMBERS)) {
                msg.reply('you can kick people');
            } else {
                msg.reply('you do not have permissions to do that');
            }
            break;
        }
    }

    // if user posts in submission channel
    if (submissionList.includes(msg.channel.id) && msg.attachments.size > 0) {
        msg.reply('your assignment submission has been acknowledged! good job');
        msg.member.roles.add(submittedRole);
    }
});

client.login(token);