import express from 'express';
import path from 'path'
import 'dotenv/config'
const PORT = process.env.PORT || 5000
import http from "http";
import("./bot/main.js")
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

setInterval(function() {
		http.get('http://best-cat-bot.herokuapp.com/');
}, 1200000 ); // every 20 minutes (1200000 )

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
