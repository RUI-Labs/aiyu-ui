import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';

import { useProductStore } from "@/stores/product.js";
import { useOrderStore } from "@/stores/order.js";

export const useBusinessStore = defineStore('business', () => {

    const productStore = useProductStore();
    const orderStore = useOrderStore();
    const endpoint = "https://api.shaoye.org"
    const businessData = ref({})
    const businessId = 'shaoye2'

    const getBusiness = () => {
        return new Promise( async (resolve) => {
            try {

                var config = {
                    method: 'get',
                    url: `${endpoint}/business?business=${businessId}`,
                    headers: { }
                };
                  
                const response  = await axios(config)
                businessData.value = response.data;
                console.log(businessData.value)
                resolve(true);
            } catch(error) {
                console.error(error)
                resolve(false)
                businessData.value = {}
            }
        })
    }


    const editSample = (input, output, index) => {
        return new Promise( async (resolve) => {
            try {

                const data = JSON.stringify({
                    "business": businessId,
                    "index": index,
                    "data": {
                      "input": input,
                      "output": output,
                    }
                });
                var config = {
                    method: 'post',
                    url: `${endpoint}/editSample`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };
                const response = await axios(config)
                console.log(response.data)
                resolve(true)
            } catch(error) {
                console.error(error)
                resolve(false)
            }
        })
    }


    const addSample = (input, output) => {
        return new Promise( async (resolve) => {
            try {

                const data = JSON.stringify({
                    "business": businessId,
                    "data": {
                      "input": input,
                      "output": output,
                    }
                });
                var config = {
                    method: 'post',
                    url: `${endpoint}/addSample`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };
                const response = await axios(config)
                console.log(response.data)
                resolve(true)
            } catch(error) {
                console.error(error)
                resolve(false)
            }
        })
    }

    const openAiParse = (input) => {
        return new Promise( async (resolve) => {
            try {
                const data = JSON.stringify({
                    "id": businessId,
                    "input": input
                });
                var config = {
                    method: 'post',
                    url: "https://aiyu-parse-text.junyaoc.repl.co",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: data
                };
                console.log('data', data)
                const response = await axios(config)
                console.log(response.data)
                resolve(response.data)
            } catch(error) {
                console.error(error)
                resolve(false)
            }
        })
    }


    const saveExtraParameter = (input) => {
        return new Promise( async (resolve) => {
            try {
                var data = JSON.stringify({
                    "business": businessId,
                    "data": input
                });
                
                var config = {
                    method: 'post',
                    url: `${endpoint}/editExtraParameter`,
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    data : data
                };
                
                const response = await axios(config)
                resolve(true)
            } catch(error) {
                console.error(error)
                resolve(false)
            }
        })
    }

    const saveCorrection = (input) => {
        return new Promise( async (resolve) => {
            try {
                var data = JSON.stringify({
                    "business": businessId,
                    "data": input
                });
                
                var config = {
                    method: 'post',
                    url: `${endpoint}/editCorrection`,
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    data : data
                };
                
                const response = await axios(config)
                resolve(true)
            } catch(error) {
                console.error(error)
                resolve(false)
            }
        })
    }


    return {
        getBusiness,
        businessData,
        editSample,
        openAiParse,
        addSample,
        saveExtraParameter,
        saveCorrection,
    }
})
