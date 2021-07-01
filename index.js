const {token} = require('./secret');
const Discord = require('discord.js');

const client = new Discord.Client();

var didDailyCheck = false;

// list of assignment submission channels
const assignmentList = [
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

// figures submission channel
const figuresChannel = "853855324259745792";

const assignmentSubRole = "859794283878678568";

const figuresSubRole = "858450559852740609";

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log('I am ready to do stuff');
});

function dailyCheck() {
    
}

client.on('message', msg => {
    if (msg.author.bot) return;
    if (msg.content.startsWith('artbot')){// commands
        switch (msg.content) {
            case 'artbot': {
                msg.reply('artbot v1.2 for commands type \'artbot help\'');
                break;
            }
            case 'artbot help': {
                var help_text = '__**Available commands:**__\n';
                help_text += '**artbot ping**: test if the bot is working\n';
                help_text += '**artbot embed test**\n';
                help_text += '**artbot get channel**: get information about the channel\n';
                help_text += '**artbot admin test**\n';
                help_text += '**artbot kick test**\n';
                help_text += '**artbot clear assignment submissions**: [admin] clear the assignment submission role manually '
                help_text += '(ONLY if you know what you\'re doing)\n';
                msg.reply(help_text);
                break;
            }
            case 'artbot ping': {
                msg.reply('pong');
                break;
            }
            case 'artbot embed test': {
                const embed = new Discord.MessageEmbed()
                .setTitle('A slick little embed')
                .setColor(0xff0000)
                .setDescription('Hello, this is a slick embed!');
                msg.channel.send(embed);
                break;
            }
            case 'artbot get channel': {
                msg.reply('this channel is ' + msg.channel.name + ' id: ' + msg.channel.id);
                break;
            }
            case 'artbot admin test': {
                if (msg.member.hasPermission(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
                    msg.reply('you are an admin');
                } else {
                    msg.reply('you do not have permissions to do that (admin)');
                }
                break;
            }
            case 'artbot kick test': {
                if (msg.member.hasPermission(Discord.Permissions.FLAGS.KICK_MEMBERS)) {
                    msg.reply('you can kick people');
                } else {
                    msg.reply('you do not have permissions to do that');
                }
                break;
            }
            case 'artbot clear assignment submissions': {
                if (msg.member.hasPermission(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
                    msg.reply('test');
                } else {
                    msg.reply('you do not have permissions to do that (admin)');
                }
                break;
            }
            default: {
                msg.reply('sorry, your command was not recognized');
                break;
            }
        }
    }

    // if user posts in submission channel
    if (assignmentList.includes(msg.channel.id) && msg.attachments.size > 0) {
        // submitted assignment
        var message = 'your assignment submission has been acknowledged! good job\n';
        message += '(if you don\'t have the "posted in assignments" role message a mod to report a bot issue)';
        msg.reply(message);
        msg.member.roles.add(assignmentSubRole);
    } else if (msg.channel.id == figuresChannel && msg.attachments.size > 0) {
        // submitted figures
        var message = 'your figures submission has been acknowledged! good job\n';
        message += '(if you don\'t have the "posted in figures" role message a mod to report a bot issue)';
        msg.reply(message);
        msg.member.roles.add(figuresSubRole);
    }
});

client.login(token);