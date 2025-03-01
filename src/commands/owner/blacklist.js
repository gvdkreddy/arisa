const { EmbedBuilder } = require("discord.js");
const AvonCommand = require('../../structures/avonCommand');
const Blacklist = require('../../models/blacklist'); // Assuming your schema is defined in Blacklist.js

class BlacklistCommand extends AvonCommand {
    get name() {
        return 'blacklist';
    }

    get cat() {
        return 'owner';
    }

    async run(client, message, args, prefix) {
       let ok = ["1057674644905279498", "924144335535091744", "1180995684380459018"];
        if(!ok.includes(message.author.id)) return;

        if (!args.length) {
            return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Usage : \`${prefix}blacklist <add/remove/show> <user/user_id>\``)]});
        }

        const subCommand = args[0].toLowerCase();
        const userId = args[1]?.replace(/[<@!>]/g, '');

        switch (subCommand) {
            case 'add':
                if (!userId || isNaN(userId)) {
                    return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Please provide me a valid user`)]});
                }

                try {
                    const existingEntry = await Blacklist.findOne({ userId });

                    if (!existingEntry) {
                        const newBlacklistEntry = new Blacklist({ userId });
                        await newBlacklistEntry.save();
                        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.tick} | Blacklisted the User: <@${userId}>`)]});
                    } else {
                        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.tick} | This user is already blacklisted`)]});
                    }
                } catch (error) {
                    console.error(error);
                    return message.channel.send('An error occurred while blacklisting the user.');
                }

            case 'remove':
                if (!userId || isNaN(userId)) {
                    return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Please provide me a valid user`)]});
                }

                try {
                    const existingEntry = await Blacklist.findOne({ userId });

                    if (existingEntry) {
                        await Blacklist.deleteOne({ userId });
                        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.tick} | Removed <@${userId}> From Blacklisted Users.`)]});
                    } else {
                        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.tick} | This user is not blacklisted`)]});
                    }
                } catch (error) {
                    console.error(error);
                    return message.channel.send('An error occurred while removing the user from the blacklist.');
                }

            case 'list':
                try {
                    const blacklistEntries = await Blacklist.find();
                    if (blacklistEntries.length === 0) {
                        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | No Blacklisted User's Found.!`)]});
                    } else {
                        const blacklistedUsers = blacklistEntries.map(entry => `<@${entry.userId}>`).join('\n');
                        return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setTitle(`Showing All Blacklisted Users`).setDescription(blacklistedUsers)]});
                    }
                } catch (error) {
                    console.error(error);
                    return message.channel.send('An error occurred while fetching the blacklist.');
                }

            default:
                return message.channel.send({embeds : [new EmbedBuilder().setColor(client.config.color).setDescription(`${client.emoji.cross} | Usage : \`${prefix}blacklist <add/remove/show> <user/user_id>\``)]});
        }
    }
}

module.exports = BlacklistCommand;
