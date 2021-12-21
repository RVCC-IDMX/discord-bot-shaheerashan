import { Message, MessageEmbed } from 'discord.js';
import axios from 'axios';
import dotenv from 'dotenv';
import moment from 'moment';

dotenv.config();
const api = process.env.OPEN_WEATHER;
export default {
  callback: async (message: Message, ...args: string[]) => {
    console.log(args);
    const city = args.join(' ');
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${api}`;
    let response;
    try {
      response = await axios.get(url);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      message.reply('How does one weather again?');
      return;
    }

    const { data } = response;
    const { name } = data;
    const lowTemp = data.main.temp_min.toFixed(0);
    const highTemp = data.main.temp_max.toFixed(0);
    const currentTemp = data.main.temp.toFixed(0);
    const Icon = data.weather[0].icon;
    const { country } = data.sys;
    const { description } = data.weather[0];
    const rawSunrise = data.sys.sunrise;
    const rawSunset = data.sys.sunset;
    const tz = data.timezone;
    const sunrise = moment
      .unix(rawSunrise + tz)
      .utc()
      .format('h:mm:ss A');
    const sunset = moment
      .unix(rawSunset + tz)
      .utc()
      .format('h:mm:ss A');

    const embed = new MessageEmbed()
      .setColor('BLUE')
      .setTitle(`Current Weather In ${name}, ${country}`)
      .setAuthor('Shaheer Ashan')
      .setDescription(`${currentTemp} °F and ${description}`)

      .addFields(
        { name: 'Low', value: `${lowTemp} °F`, inline: true },
        { name: 'High', value: `${highTemp} °F`, inline: true }
      )
      .addField('\u200b', '\u200b')
      .addFields(
        { name: 'Sunrise', value: `${sunrise}`, inline: true },
        { name: 'Sunset', value: `${sunset}`, inline: true }
      )
      .setThumbnail(`http://openweathermap.org/img/wn/${Icon}@2x.png`)
      .setFooter('Just simply enter a city name.');

    message.reply({ embeds: [embed] });
  },
};
