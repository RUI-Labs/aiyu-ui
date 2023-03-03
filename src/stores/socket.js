import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import { format, fromUnixTime } from 'date-fns'
// import { createClient } from 'redis';

export const useSocketStore = defineStore('socket', () => {

    const connectionString = "redis-12925.c252.ap-southeast-1-1.ec2.cloud.redislabs.com:12925"
    // const client = createClient({
    //     url: connectionString
    // });


    const connectSocket = () => {
        return new Promise( async (resolve) => {
            try {


                // const subscriber = client.duplicate();
                // subscriber.on('error', err => console.error(err));
                // await subscriber.connect();

                // redis.crea
                // console.log(client)
                

                // await client.connect();


                // client.subscribe("message", (message, channel) => {
                //     console.log(channel, message)
                // })

                // const ws = new WebSocket(connectionString);

                // ws.on("message", (channel, message) => {
                //     console.log("Received data :" + message)
                // })

                // ws.onopen = function () {
                //     console.log("WS CONNECTED");
                //   };

                // client.on("connect", (channel, message) => {
                //     console.log("Received data :" + message)
                // })
                

                
                resolve(true);
            } catch(error) {
                console.error(error)
                resolve(false)
            }
        })
    }


    return {
        connectSocket
    }
})
