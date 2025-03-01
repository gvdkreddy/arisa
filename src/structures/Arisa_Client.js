const { Client , GatewayIntentBits , Collection , WebhookClient, Partials , EmbedBuilder } = require(`discord.js`);
const { Guilds , MessageContent , GuildInvites , GuildVoiceStates , GuildMessages , DirectMessages } = GatewayIntentBits;
const { User , Channel , Reaction , Message , GuildMember } = Partials;
const { errors } = require(`../../config.json`);
const { Database } = require("quickmongo");
const { ClusterClient , getInfo } = require(`discord-hybrid-sharding`);
const AvonEvents = require("./Arisa_Events");
const AvonCommands = require("./Arisa_CommandHandler");
const config = require(`../../config.json`);
const Shoukaku = require("./Shoukaku");
const Lavasfy = require("./Lavasfy");
const web = new WebhookClient({url : errors});
class Arisa extends Client {
    constructor(){
        super({
            intents : [Guilds,MessageContent,GuildInvites,GuildMessages,DirectMessages,GuildVoiceStates],
            shardCount : getInfo().TOTAL_SHARDS,
            shards : getInfo().SHARD_LIST,
            partials : [Channel,User,Reaction,Message,GuildMember],
            allowedMentions : {
                repliedUser : true,
                parse : ['users']
            }
        });
        this.cluster = new ClusterClient(this);
        this.data = new Database(config.mongourl);
        this.data.connect();
        this.data2 = new Database(config.mongourl);
        this.data2.connect();
        this.poru = new Shoukaku(this);   
        this.lavasfy = new Lavasfy(this);
        this.poru.shoukaku.on('ready',(name) => { console.log(`NODE | Connected | ${name}`) } )
        this.poru.shoukaku.on('error',(name,error) => { console.log(`NODE | Error | ${error}`) })
        this.poru.shoukaku.on('close',(name,code,reason) => {console.log(`NODE | CLOSED | ${reason}`)})
        this.poru.shoukaku.on('debug',(name,info) => {console.log(`DEBUG | ${info}`)})
        this.poru.shoukaku.on('disconnect', (name, players, moved) => {
            if (moved) return;
            console.warn(`NODE | Disonnected | ${name}`);
        });
        this.poru.on("playerClosed",(player) => {
            player.destroy();
            console.log(player);
        })
        this.emoji = require(`${process.cwd()}/emoji.json`);
        this.config = require(`${process.cwd()}/config.json`);
        this.AvonCommands = new AvonCommands(this).loadCommands();
        this.events = new AvonEvents(this).loadEvents();
        this.login(process.env.token);
        process.on('unhandledRejection',async(er) => {
            console.error(er);
            web.send({embeds : [new EmbedBuilder().setColor(`#2f3136`).setDescription(`\`\`\`js\n${er}\`\`\``)]});
        });
        process.on('uncaughtException',async(err) => {
            console.error(err);
            web.send({embeds : [new EmbedBuilder().setColor(`#2f3136`).setDescription(`\`\`\`js\n${err}\`\`\``)]});
        });
    }
    
}
module.exports = Arisa;