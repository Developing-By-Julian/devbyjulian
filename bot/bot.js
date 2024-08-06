const { Client, Intents, MessageEmbed, EmbedBuilder, IntentsBitField } = require('discord.js');
const client = new Client({ intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent, IntentsBitField.Flags.GuildMessageReactions] });

// Zorg ervoor dat je je rol-ID en emoji hier invult
const ROLE_ID = '1233930403912613919'; // Vervang dit door je rol-ID
const EMOJI = '✅'; // Vervang dit door je emoji

client.once('ready', () => {
    console.log(`Ingelogd als ${client.user.tag}`);
});

client.on('messageCreate', async message => {
    if (message.content === '!rolemessage') {
        if (!message.guild) return; // Zorg ervoor dat het een serverbericht is

        const embed = new EmbedBuilder()
            .setTitle(`Reageer om de bezoekers rol te krijgen!`)
            .setDescription(`Door je te verifiëren, accepteer je de <#1233925702814928896> `);

        const msg = await message.channel.send({ embeds: [embed] });
        await msg.react(EMOJI);
    }
});

client.on('messageReactionAdd', async (reaction, user) => {
    if (user.bot) return; // Negeer reacties van bots

    if (reaction.emoji.name === EMOJI && reaction.message.author.bot) {
        const guild = reaction.message.guild;
        const role = guild.roles.cache.get(ROLE_ID);
        const member = guild.members.cache.get(user.id);
        
        if (role && member) {
            await member.roles.add(role);
            console.log(`Rol toegevoegd aan ${member.user.tag}`);
        }
    }
});

client.on('messageReactionRemove', async (reaction, user) => {
    if (user.bot) return; // Negeer reacties van bots

    if (reaction.emoji.name === EMOJI && reaction.message.author.bot) {
        const guild = reaction.message.guild;
        const role = guild.roles.cache.get(ROLE_ID);
        const member = guild.members.cache.get(user.id);
        
        if (role && member) {
            await member.roles.remove(role);
            console.log(`Rol verwijderd van ${member.user.tag}`);
        }
    }
});

module.exports = client