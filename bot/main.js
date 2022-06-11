import { Client, Intents, MessageEmbed } from 'discord.js';
import axios from 'axios';
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
import {prefix, kittyImgHeaders} from './helpers.js'
import { getFact, getCat } from './fetchers.js'

client.on("messageCreate", msg => {
	if (msg.author.id === client.user.id) return

	const message = msg.content.toLowerCase()

  if (message.includes(prefix)) {
    switch(message) {
      case prefix + 'fact': {
        return getFact().then(res => msg.reply('Cat fact: ' + res))
      }
      case prefix + 'img': {
        return getCat('jpg,png').then(res =>  {
					const img = new MessageEmbed().setImage(res);
					msg.reply({
						content: kittyImgHeaders[Math.floor(Math.random()*kittyImgHeaders.length)],
						embeds: [img]
					})
				})
      }
			case prefix + 'gif': {
       return getCat('gif').then(res =>  {
					const gif = new MessageEmbed().setImage(res);
					msg.reply({
						content: kittyImgHeaders[Math.floor(Math.random()*kittyImgHeaders.length)],
						embeds: [gif]
					})
				})
			}
			case prefix + 'help': {
				const commands = new MessageEmbed()
					.setTitle("Here's the commands you can use:")
					.setColor('#FFB8BF')
					.addFields(
						{ name: 'Fact', value: 'Sends you a random fact about cats' },
						{ name: 'Img', value: 'Sends you a random image of one or more cats' },
						{ name: 'Gif', value: 'Sends you a random gif of one or more cats' }
					)
					.setImage('https://i.redd.it/0z0vcyxc4sz21.jpg');

				return msg.reply({
					content: "You need some help there my dude?",
					embeds: [commands]
				});
			}
      default: {
				return getCat().then(res =>  {
					 const item = new MessageEmbed().setImage(res);
					 msg.reply({
						 content: kittyImgHeaders[Math.floor(Math.random()*kittyImgHeaders.length)],
						 embeds: [item]
					 })
				 })
			}
		}
	}
})

client.login(process.env.TOKEN)