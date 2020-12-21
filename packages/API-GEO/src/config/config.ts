import dotenv from 'dotenv'

dotenv.config()

export interface IConfig {
    DB_URI: string,
    AMQP_URI: string,
    AMQP_INITIAL: string,
    AMQP_FINAL: string,
    PORT: number | string
    MORGAN_STATE: string
}


const config: IConfig = {
    DB_URI: process.env.DB_URI || 'mongodb://mongo:27017/andreani',
    AMQP_URI: process.env.AMQP_URI || 'amqp://rabbitmq',
    AMQP_INITIAL: process.env.AMQP_INITIAL || 'initial',
    AMQP_FINAL: process.env.AMQP_FINAL || 'final',
    PORT: process.env.PORT || 4000,
    MORGAN_STATE: process.env.MORGAN_STATE || 'dev'
}

export default config