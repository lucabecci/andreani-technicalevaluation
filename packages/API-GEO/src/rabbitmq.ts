import * as amqp  from 'amqplib'

class RabbitMQ {
    public _queue: (string)
    public _channel: (amqp.Channel | null)
    constructor(){
        this._channel = null
        this._queue = '' 
    }
    public async connectionBroker(queue: string): Promise<void>{
        try{
            const connection = await amqp.connect('amqp://localhost:5672');

            const channel = await connection.createChannel()

            await channel.assertQueue(queue)
            this._queue = queue
            this._channel = channel
            console.log('RabbitMQ is connected')
        }
        catch(e){
            console.log('error')
        }
    }

    public async sendMessage(info: any): Promise<void>{
        try{
            await this._channel?.sendToQueue(this._queue, info)
            console.log('sending')
        }
        catch(e){
            console.log(e)
        }
        
    }
}

export interface IRabbitMQ {
    _queue: string;
    connectionBroker: (queue: string) => Promise<void>
    sendMessage: (info: any) => Promise<void>
}


export default RabbitMQ