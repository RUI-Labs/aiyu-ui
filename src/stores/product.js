import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios';
import { format, fromUnixTime } from 'date-fns'

export const useProductStore = defineStore('product', () => {

    const products = ref([])
    const endpoint = "https://api.shaoye.org"
    
    const getProduct = () => {
        return new Promise( async (resolve) => {
            try {

                var config = {
                    method: 'get',
                    url: `${endpoint}/product`,
                    headers: { }
                };
                const response = await axios(config)
                // console.log(response.data)

                products.value = []
                for(let product of response.data.documents) {
                    products.value.push({
                        ...product.value,
                        key: product.id,
                        label: product.value.fullName,
                        stock: 200,
                    })
                }
                console.log('products.value',products.value)
                resolve(products.value);
            } catch(error) {
                console.error(error)
                resolve([])
            }
        })
    }


    return {
        products,
        getProduct,
    }
})
