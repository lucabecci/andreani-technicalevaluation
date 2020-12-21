import dotenv from 'dotenv'

dotenv.config()

export interface IConfig {
    AMQP_URI: string,
    AMQP_INITIAL: string,
    AMQP_FINAL: string,
}


const config: IConfig = {
    AMQP_URI: process.env.AMQP_URI || 'amqp://rabbitmq',
    AMQP_INITIAL: process.env.AMQP_INITIAL || 'initial',
    AMQP_FINAL: process.env.AMQP_FINAL || 'final'
}

export default config