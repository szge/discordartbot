const {token} = require('./secret');
const Discord = require('discord.js');

const client = new Discord.Client();

var didDailyCheck = false;

// list of assignment submission channels
const assignmentList = [
    "992479016009343046", // test channel
    "989252740662308934", // assignment share channel
];

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log('I am ready to do stuff');
});

client.on('message', msg => {
    if (msg.author.bot) return;
    if (msg.content.startsWith('artbot')){// commands
        switch (msg.content) {
            case 'artbot': {
                msg.reply('artbot v1.3 for commands type \'artbot help\'');
                break;
            }
            case 'artbot help': {
                var help_text = '__**Available commands:**__\n';
                help_text += '**artbot ping**: test if the bot is working\n';
                help_text += '**artbot embed test**\n';
                help_text += '**artbot get channel**: get information about the channel\n';
                help_text += '**artbot admin test**\n';
                help_text += '**artbot kick test**\n';
                help_text += '**artbot clear submissions**: [admin] clear the assignment submission role manually '
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
                    clear_role(msg, "posted");
                    msg.reply('cleared assignment submissions');
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
        message += '(if you don\'t have the "posted" role message an admin to report a bot issue)';
        msg.reply(message);
        var role = msg.guild.roles.cache.find(role => role.name === "posted");
        msg.member.roles.add(role);
    }
});

function give_strike() {
    
}

// remove all users from a given role provided a name
function clear_role(message, role_name) {
    // actually removing the role from users reaches the Discord API rate limit
    // so just delete the role and create a new one with the same stuff
    const role = message.guild.roles.cache.find(role => role.name === role_name);
    message.guild.roles.create({
        data: {
            name: role.name,
            color: role.color,
            hoist: role.hoist,
            position: role.position,
            permissions: role.permissions,
            mentionable: role.mentionable
        }
    });
    role.delete();
}

client.login(token);