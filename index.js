const Discord = require('discord.js');
const { Client, MessageEmbed } = require('discord.js');
const bot = new Discord.Client();

const token = '#tokenhere';


bot.on('message', msg=> {
    if(msg.content == "website" || msg.content == "site" || msg.content == "ucp" || msg.content == "portal") {
        msg.reply('www.liberty-roleplay.net');
    }

});


bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
    if (!channel) return;
    channel.send(`Hi ${member}. Welcome to **Liberty Roleplay**. You may have noticed that our discord looks a little empty, make your way over to the  \`#verification\` to gain full access!.`);
});

bot.on('message', message => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
        if (message.content.startsWith("bot-say:")) {
            if (message.mentions.channels.size == 0) {
                message.reply("please mention a channel first.");
            }
            else {
                let targetChannel = message.mentions.channels.first();
    
                const args = message.content.split(" ").slice(2);
                let saytext = args.join(" ");
                targetChannel.send(saytext);
                message.delete();
            }
        }
    }
});

bot.on('message', message => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
        if (message.content.startsWith("say:")) {
            const args = message.content.split(" ").slice(1);
            let saytext = args.join(" ");
            message.channel.send(saytext);
            message.delete();
            }
        }
});


bot.on('ready', () => {
    bot.user.setActivity('Liberty Roleplay', { type: 'PLAYING' });
});


bot.on('message', async (message) => {

    if (message.content.toLowerCase() === '?rules') {
      const embed = new Discord.MessageEmbed()
        .setTitle('Discord Rules')
        .setColor('#d7c695')
        .addFields({
          name: '1. Do not spam any section on this discord.',
          value: '__________________________________'
        },{
            name: '2. Do not private message staff members. Use respective categories if you seek help, or the forums here(link).',
            value: '__________________________________'
        },{
            name: '3. Do not make racist comments or harass others.',
            value: '__________________________________'
        },{
            name: '4. Advertisements of any kind not regarding Liberty Roleplay will result in a permanent ban.',
            value: '__________________________________'
        },{
            name: '5. Any rules on the forum that can be applied to discord.',
            value: '__________________________________'
        },{
            name: '6. Posting vulgar or sexual content will result in a permanent ban.',
            value: '__________________________________'
        },{
            name: '7. Any type of trolling will be met with a ban.',
            value: '__________________________________'
        },{
            name: '8. Remain civil at all times. Do no disrespect others.',
            value: '__________________________________'
        })
        .setTimestamp();

      message.channel.send(embed);
    }
});



bot.on('message', async message => {
	if (message.content === 'l!verify') {
		const reactmessage = await message.channel.send('React with ✅ to get your verification role !');
		await reactmessage.react('✅');

		const filter = (reaction, user) => reaction.emoji.name === '✅' && !user.bot;
		const collector = reactmessage.createReactionCollector(filter, { time: 15000 });

		collector.on('collect', async reaction => {
            const user = reaction.users.cache.last();
			const guild = reaction.message.guild;
			const member = guild.member(user) || await guild.fetchMember(user);
			member.roles.add("761782199145201664");
		});
	}
});



bot.login(token);