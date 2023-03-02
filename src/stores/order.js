import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import { format, fromUnixTime } from 'date-fns'

export const useOrderStore = defineStore('order', () => {

    const orders = ref([])
    const selectedOrder = ref({})
    const endpoint = "https://api.shaoye.org"
    
    const getOrder = () => {
        return new Promise( async (resolve) => {
            try {

                var config = {
                    method: 'get',
                    url: `${endpoint}/order`,
                    headers: { }
                };
                const response = await axios(config)
                console.log(response.data)
        
                for(let order of response.data.documents) {
                    let quantity = order.value?.extracted?.product ? order.value.extracted.product.length : 0;
                    
                    if(quantity > 0) {
                        let summary = `${format(fromUnixTime(order.value.timestamp), 'd MMM').toUpperCase()} - 4 爱玉冰, 3 豆奶`
                        let type = 'text'
                        if(order.value.imageUrl) type = 'image'
                        if(order.value.audioUrl) type = 'audio'
            
                        let subtitle = ''
                        if(type == 'text') subtitle = order.value.text
                        
                        orders.value.push({
                            ...order.value,
                            sender: order.value.fromName,
                            summary: summary,
                            type: type,
                            subtitle: subtitle,
                            timestamp: order.value.timestamp,
                            price: order.value.totalPrice,
                            status: order.value.status,
                            quantity: quantity,
                            key: order.id,
                        })
                    }
                }
                console.log(orders.value)
                resolve(orders.value)
            } catch(error) {
                console.error(error)
                resolve([])
            }
        })
    }

    const selectOrder = (order) => {
        selectedOrder.value = order
    }

    return {
        orders,
        getOrder,
        selectedOrder,
        selectOrder,
    }
})
