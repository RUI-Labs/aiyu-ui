import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import { format, fromUnixTime } from 'date-fns'

import { useProductStore } from "@/stores/product.js";
import { useOrderStore } from "@/stores/order.js";
import { useBusinessStore } from "@/stores/business.js";


export const useSocketStore = defineStore('socket', () => {

    const productStore = useProductStore();
    const orderStore = useOrderStore();
    const businessStore = useBusinessStore();

    const connectSocket = () => {
        return new Promise( async (resolve) => {
            try {

                const ws = new WebSocket("wss://websocket.shaoye.org");

                ws.onmessage = async function (evt) {
                    let res = JSON.parse(evt?.data);
                    console.log(res);
                    if(res.message == 'order') {
                        await orderStore.getOrder();
                        if(orderStore.selectedOrder) {
                            console.log(orderStore.orders.find(x => x.key == orderStore.selectedOrder.key ))
                            orderStore.selectOrder( orderStore.orders.find(x => x.key == orderStore.selectedOrder.key ) )
                        }
                    }

                    if(res.message == 'product') {
                        productStore.getProduct();
                    }

                    if(res.message == 'business') {
                        businessStore.getBusiness();
                    }
                }

                ws.onopen = function () {
                    console.log("WS CONNECTED");
                };

                ws.onclose = function () {
                    connectSocket()
                };
                
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
