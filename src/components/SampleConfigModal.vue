<script setup>
import { computed, ref } from "vue";
import { Icon } from "@iconify/vue";
import { format, fromUnixTime } from 'date-fns'
import dJSON from 'dirty-json';

const isActive = ref(false);

const targetPosition = ref(null);
const mode = ref('add')
const openModal = (message,index) => {
  mode.value = 'add'

  if (message) {
    console.log('sample', message,index)
    mode.value = 'edit'
    targetPosition.value = index;
    // originalMessage.value = message;
    order.value.original_message = message.input;
    const output = dJSON.parse(message.output);
    
    order.value.ship_to = output.for;
    order.value.ship_datetime = Math.floor(new Date(`${output.date_year}.${output.date_month}.${output.date_day}`).getTime() / 1000);
    order.value.ship_datetime_object = new Date(output.timestamp * 1000)
    order.value.products = output.product ? output.product?.map((x) => ({label: x.name, quantity: x.quantity})) : [];
    order.value.remark = output.remarks

    // products:[
    //     {label:'豆浆 Soy Milk', quantity: 20, unit_price: 5, subtotal: 100},
    //     {label:'爱玉冰 Ice Jelly', quantity: 50, unit_price: 5, subtotal: 250},
    //     {label:'仙草豆奶 Grass Jelly', quantity: 30, unit_price: 5, subtotal: 150},
    // ]

    flicking.value.moveTo(2)
    disableNextButton.value = false
    
  }

  
  isActive.value = true;
};

const closeModal = () => {
    flicking.value.moveTo(0)
  isActive.value = false;
};

// const originalMessage = ref("Aus分店 pou wok \n要订   (26/2/23) \n\n豆浆soymilk ~30\n爱玉冰ice jelly ~3O\n洋参 ginseng ~40\n\n自助餐：爱玉冰20杯\n\n大吸管 straw besar ~1\n小吸管 straw kecil ~2");
const products = ref([
  { label: "豆浆", quantity: 20 },
  { label: "爱玉冰", quantity: 50 },
  { label: "仙草豆奶", quantity: 30 },
]);

const flicking = ref(null)
const flickingReady = (ev) => {
    console.log(ev)
}

const inferBusy = ref(false)

const nextButton = async () => {
    console.log(flicking.value.index)

    switch(flicking.value?.index){
        
        case 0 :{
            if(inputTextarea.value.length > 0){
                
                await flicking.value.moveTo(1)
                nextButton()
            }
            break;
        }

        case 1:{
            await getInference()
            await flicking.value.moveTo(2)
            break;
        }

        case 2 :{
            saveSample()
            break;
        }
    }


    rerenderDisable()
}

const getInference = () => {
    return new Promise( async (resolve) => {
        inferBusy.value =true

        const output = await businessStore.openAiParse(inputTextarea.value)
        console.log('response', output)

        order.value.original_message = inputTextarea.value;
        order.value.ship_to = output.for;
        order.value.ship_datetime = Math.floor(new Date(`${output.date_year}.${output.date_month}.${output.date_day}`).getTime() / 1000);
        order.value.ship_datetime_object = new Date(order.value.ship_datetime * 1000)
        order.value.products = output.product ? output.product?.map((x) => ({label: x.name, quantity: x.quantity})) : [];
        order.value.remark = output.remarks

        inferBusy.value = false
        mode.value = 'add'
        resolve(true)
        // setTimeout(() => {


        //     inferBusy.value = false
        //     resolve(true)
        // }, 1000)
    })
}

import { useBusinessStore } from "@/stores/business.js";
const businessStore = useBusinessStore();
const saveSample = async () => {

    // alert('to be implemented!')
    let payload = {}
    payload['sender_phone'] = ''
    payload['sender_name'] = ''
    payload['for'] = order.value?.ship_to
    payload['product'] = order.value?.products?.map((x) => ({name: x.label, quantity: x.quantity}));
    payload['remarks'] = order.value?.remark
    payload['intent'] = 'buy'
    payload['timestamp'] = Math.floor(order.value.ship_datetime_object.getTime() / 1000)
    payload['date'] = format( fromUnixTime(payload['timestamp']), 'd/M/yyyy' )
    payload['date_year'] = format( fromUnixTime(payload['timestamp']), 'yyyy' )
    payload['date_month'] = format( fromUnixTime(payload['timestamp']), 'M' )
    payload['date_day'] = format( fromUnixTime(payload['timestamp']), 'd' )

    console.log('payload', payload)
    
    if(mode.value == 'edit') {
  
  
      const success = await businessStore.editSample(order.value.original_message, JSON.stringify(payload), targetPosition.value)

      if(success) {
        alert('Sample updated')
      } else {
        alert('Sample fail to update.')
      }

    } else if(mode.value == 'add') {


      const success = await businessStore.addSample(inputTextarea.value, JSON.stringify(payload))

      if(success) {
        alert('Sample added')
      } else {
        alert('Sample fail to add.')
      }

    }

    closeModal();

}

const inputTextarea = ref()
const disableNextButton = ref(true)
const rerenderDisable = () => {
console.log(flicking.value?.index)
    switch(flicking.value?.index){

            case 0:
                if(inputTextarea.value?.length > 0){
                    disableNextButton.value = false
                }
                else disableNextButton.value = true
                break;
            
            case 1:
                disableNextButton.value = true
                break;

            case 2:
                disableNextButton.value = false
                break;

        }
    return true
}

const order = ref({
    // received_datetime: 1677738479,
    // original_message: `BI B.O.D 要订 ( 26/2/23) 豆浆soymilk ~200 爱玉冰ice jelly ~20 *Logo Bod😊 大吸管 straw besar ~ 小吸管 straw kecil ~ 更换 tukar Soya ~4 Jelly~ Cinca~ Aloe ~`,
    // price: 12.34,
    // ship_to:'BI BOD',
    // ship_datetime: 1677796079,
    // logistic_assignee: 'Bruce Lee',
    // products:[
    //     {label:'豆浆 Soy Milk', quantity: 20, unit_price: 5, subtotal: 100},
    //     {label:'爱玉冰 Ice Jelly', quantity: 50, unit_price: 5, subtotal: 250},
    //     {label:'仙草豆奶 Grass Jelly', quantity: 30, unit_price: 5, subtotal: 150},
    // ]
})


const shipDateComputed = computed( () => {
  if(order.value?.ship_datetime) return format( new Date(order.value?.ship_datetime * 1000), "h:mma d MMMM")
})

const addProduct = () => {
    order.value.products.push({
        label:undefined, quantity:undefined
    })
}

defineExpose({
  openModal,
});

const removeProduct = (index) => {
  order.value.products.splice(index,1)
}
</script>

<template>
  <div :class="[isActive ? 'modal-open' : '', 'modal']">
    <div :class="['modal-box']">
      <div class="w-full flex justify-between items-center">
        <h1 class="text-xl w-full text-center">Configure Sample</h1>

        <button @click="closeModal()" class="btn btn-circle btn-sm bg-gray-200 border-none group">
          <Icon class="text-lg text-gray-700 group-hover:text-white" icon="material-symbols:close-rounded"></Icon>
        </button>
      </div>

      <div class="w-full mt-8">
        <Flicking ref="flicking" class="w-full h-full" :options="{ align: 'prev', default:0, inputType:[] }" :viewportTag="'article'" :cameraTag="'article'" :cameraClass="''">
          <article key="0" class="panel w-full h-[60vh] flex justify-center items-center flex-col">
            <div class="w-full">
              <h2 class="text-lg font-semibold">Input</h2>
              <p>The message from your customer.</p>
            </div>

            <textarea v-model="inputTextarea" @input="rerenderDisable()" class="mt-8 w-full textarea focus:outline-none textarea-bordered h-full" placeholder="Always represent number using Arabic numbers..."></textarea>
          </article>
          <article key="1" class="panel w-full h-[60vh] flex justify-center items-center flex-col">
            <img v-if="inferBusy" class="w-[200px] h-[200px] object-contain animate animate-bounce" src="@/assets/mascot.png" alt="" />

            <h2 v-if="inferBusy" class="text-xl">Aiyu is Processing</h2>
          </article>
        
          <article key="2" class="panel w-full h-[60vh] overflow-y-scroll flex justify-start items-start flex-col">
            <div class="w-full">
              <p class="text-center text-sm mb-2">Original Message</p>
              <div class="bg-gray-100 rounded-md p-2">
                <div class="text-xs tracking-tight text-gray-500">
                  <p>{{ order.original_message }}</p>
                </div>
              </div>
            </div>

            <div class="w-full h-full">
              <div class="w-full my-4">
                <h1 class="text-lg font-bold">Aiyu-BING</h1>
                <p class="text-sm font-light mt-1 text-gray-500">This is what Aiyu got, feel free to edit if there's anything wrong.</p>
              </div>

              <div class="form-control w-full max-w-xs">
                <label class="label">
                  <span class="label-text">Ship To</span>
                </label>
                <input v-model="order.ship_to" type="text" placeholder="Type here" class="input input-sm input-bordered w-full max-w-xs" />
              </div>

              <div class="form-control w-full max-w-xs">
                <label class="label">
                  <span class="label-text">Date</span>
                </label>

                <!-- <v-date-picker v-model="order.ship_datetime_object" mode="dateTime" /> -->
                <v-date-picker v-model="order.ship_datetime_object" mode="datetime">
                  <template v-slot="{ inputValue, inputEvents }">
                    <input
                      class="bg-white border px-2 py-1 rounded"
                      :value="inputValue"
                      v-on="inputEvents"
                    />
                  </template>
                </v-date-picker>
                <!-- <input v-model="shipDateComputed" type="text" placeholder="Type here" class="input input-sm input-bordered w-full max-w-xs" /> -->
              </div>

              <div class="form-control w-full max-w-xs">
                <label class="label">
                  <span class="label-text">Remarks</span>
                </label>
                <input v-model="order.remark" type="text" placeholder="Type here" class="input input-sm input-bordered w-full max-w-xs" />
              </div>

              <p class="p-1 py-4">Products</p>

              <div v-for="(product,index) in order.products" :key="product" class="w-full grid grid-cols-12 gap-2 mb-2">
                <div class="w-full flex justify-center items-center">
                  <button @click="removeProduct(index)" class="btn btn-circle btn-xs btn-ghost">
                    <Icon class="text-red-400 text-xl" icon="ic:baseline-remove-circle"></Icon>
                  </button>
                </div>
                <div class="w-full col-span-7">
                  <input v-model="product.label" type="text" placeholder="product" class="input input-sm input-bordered w-full max-w-xs" />
                </div>

                <div class="col-span-4">
                  <input v-model="product.quantity" type="text" placeholder="quantity" class="input input-sm input-bordered w-full max-w-xs" />
                </div>
              </div>

              <div @click="addProduct()" class="w-full py-4">
                <button class="btn btn-link btn-xs">Add Product</button>
              </div>
            </div>
          </article>
        </Flicking>

        <div class="w-full flex justify-end items-center mt-4">
          <button :disabled="disableNextButton" @click="nextButton()" class=" btn rounded-badge px-8 disabled:bg-gray-500 bg-lime-500 border-none">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>
