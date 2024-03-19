import {Schema, model} from 'mongoose'

const tokensWhitelistSchema = new Schema({
    jtiToken:String,
    lastActivity: Date
},{
    versionKey:false
})

export default model('tokensWhitelist', tokensWhitelistSchema)