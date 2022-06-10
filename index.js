const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Client, Intents, MessageEmbed } = require('discord.js');
const axios = require('axios').default;
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const prefix = 'cat?'
const errorMsg = (err) => {return `Oopsie whoopsie! uwu we made a ficky wucky. The cattos are working VEWU HAWD to fix this!! \nError: ${err}`}

const kittyImgHeaders = [
	"Here's kitty!!",
	"Here, have a cat",
	"One cat, coming right up!",
	"Here kitty kitty...",
	"This not a catastrophy, here comes a cat",
	
]

async function getFact() {
  try {
    const response = await axios.get("https://catfact.ninja/fact")
    return response.data.fact
  } catch (err) { return 'oopsie wopsie' }
}

async function getCat(val) {
	const type = val ?? 'gif,jpg,png'
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?mime_types=${type}`)
    return response.data[0].url
  } catch (err) { return errorMsg(err) }
}

client.on("messageCreate", msg => {
	if (msg.author.id === client.user.id) return
	
	const message = msg.content.toLowerCase()
		
  if (message.includes('cat?')) {
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
      default: {
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
		}
	}
})

client.login(process.env.TOKEN)

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
