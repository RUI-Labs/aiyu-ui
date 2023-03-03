import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import { format, fromUnixTime } from 'date-fns'
import { useProductStore } from "@/stores/product.js";

export const useOrderStore = defineStore('order', () => {

    const orders = ref([])
    const selectedOrder = ref({})
    const endpoint = "https://api.shaoye.org"

    const productStore = useProductStore();
    
    const getOrder = () => {
        return new Promise( async (resolve) => {
            try {

                var config = {
                    method: 'get',
                    url: `${endpoint}/order`,
                    headers: { }
                };
                const response = await axios(config)
                // console.log(response.data)
                orders.value = []
                for(let order of response.data.documents) {
                    let quantity = order.value?.extracted?.product ? order.value.extracted.product.length : 0;
                    
                    if(quantity > 0) {
                        let summary_product = ''
                        for(let p of order.value?.extracted?.product) {
                            if(p.zh_name) summary_product += `${p.quantity} ${p.zh_name}, `
                        }
                        summary_product = summary_product.substring(0, summary_product.length-1)
                        summary_product = summary_product.substring(0, 10)
                        let summary = `${format(fromUnixTime(order.value.timestamp), 'd MMM').toUpperCase()} - ${summary_product}...`
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
                            price: order.value?.extracted?.totalPrice ? order.value?.extracted?.totalPrice : 0,
                            status: order.value.status,
                            quantity: quantity,
                            key: order.id,
                        })
                    }
                }
                console.log('orders.value', orders.value)
                resolve(orders.value)
            } catch(error) {
                console.error(error)
                resolve([])
            }
        })
    }

    const selectOrder = (order) => {
        selectedOrder.value = order
        selectedOrder.value['received_datetime'] = order.timestamp;
        selectedOrder.value['ship_datetime'] = order.extracted?.timestamp;
        selectedOrder.value['original_message'] = order.text;
        selectedOrder.value['ship_to'] = order.extracted?.for;
        selectedOrder.value['logistic_assignee'] = order?.driver;
        selectedOrder.value['products'] = [];

        for(let product of order.extracted.product) {
            selectedOrder.value['products'].push({
                ...product,
                'label': product?.fullName,
                'unit_price': product?.unitPrice ? product?.unitPrice : 0,
                'subtotal': product?.subtotalPrice ? product?.subtotalPrice : 0,
            })
        }
        
    }

    const updateOrderCompleted = (order) => {
        console.log('order', order)
        return new Promise( async (resolve) => {
            try {

                const data = JSON.stringify({
                    "key": order.key
                });
                var config = {
                    method: 'post',
                    url: `${endpoint}/completeOrder`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };
                const response = await axios(config)
                console.log(response.data)
                resolve(true)
            } catch(error) {
                console.error(error);
                resolve(false)
            }
        })
    }

    const addProduct = (order, product, quantity) => {
        console.log('product', order, product, quantity)
        return new Promise( async (resolve) => {
            try {
                const data = JSON.stringify({
                    "order": order.key,
                    "product": product.key,
                    "quantity": quantity
                });
                var config = {
                    method: 'post',
                    url: `${endpoint}/addProductToOrder`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };
                const response = await axios(config)
                console.log(response.data)
                resolve(true)
            } catch(error) {
                console.error(error);
                resolve(false)
            }
        })
    }

    const editProduct = (order, product, quantity) => {
        console.log('product', order, product, quantity)
        return new Promise( async (resolve) => {
            try {
                const data = JSON.stringify({
                    "order": order.key,
                    "product": product.key,
                    "quantity": quantity
                });
                var config = {
                    method: 'post',
                    url: `${endpoint}/editProductToOrder`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };
                const response = await axios(config)
                console.log(response.data)
                resolve(true)
            } catch(error) {
                console.error(error);
                resolve(false)
            }
        })
    }



    const sendWhatsapp = (action) => {
        return new Promise( async (resolve) => {
            try {
                console.log(action)
                const url = `https://api.whatsapp.com/send?phone=${action.phoneNumber}&text=${ encodeURI(action.article) }`
                const response = await axios.get(url)
                console.log(response.data)
                resolve(true);
            } catch(error) {
                console.error(error)
                resolve(false)
            }
        })
    }

    return {
        orders,
        getOrder,
        selectedOrder,
        selectOrder,
        updateOrderCompleted,
        addProduct,
        editProduct,
        sendWhatsapp,
    }
})
