<script setup>
import { Icon } from "@iconify/vue";
import { computed, ref, onMounted } from "vue";
import { format, fromUnixTime } from 'date-fns'
import { useRouter, useRoute } from 'vue-router'
import { Combobox, ComboboxButton, ComboboxInput, ComboboxLabel, ComboboxOption, ComboboxOptions, } from '@headlessui/vue'

const router = useRouter()

    import { useOrderStore } from "@/stores/order.js";
    const orderStore = useOrderStore();

    import { useProductStore } from "@/stores/product.js";
    const productStore = useProductStore();

const actions = ref([
  // { type: "whatsapp", title: "Reply 阿花 on WhatsApp", article: `收到✅\nOrder Date: 27 Feb 2023`, selected: true },
  // { type: "whatsapp", title: "Inform Bruce Lee on WhatsApp", article: `Delivery to 阿花 on: Tue 28 Feb\n2:00 PM\n Address: BI B.O.D`, selected: true },
  // { type: "attachment", title: "Send PO to Admin", article: `Purchase Order #001`, selected: true },
  // { type: "update-status", title: "Mark as Resolved", article: `Mark this order as resolved`, selected: true },
]);




const order = ref({
    // sender: "阿花",
    // received_datetime: 1677738479,
    // original_message: `BI B.O.D 要订 ( 26/2/23)\n\n 豆浆soymilk ~200\n爱玉冰ice jelly ~20\n*Logo Bod😊\n大吸管 straw besar ~\n小吸管 straw kecil ~\n更换 tukar Soya ~4\nJelly~\nCinca~\nAloe ~`,
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

onMounted( async () => {
  orderStore.selectedOrder = orderStore.selectedOrder;
  actions.value = [
    { type: "whatsapp", title: `Reply ${orderStore.selectedOrder.fromName} on WhatsApp`, article: `收到✅\nOrder Date: ${ format(fromUnixTime(orderStore.selectedOrder.ship_datetime), 'd MMM yyyy') }`, selected: true, phoneNumber: orderStore.selectedOrder.fromPhone },
    { type: "whatsapp", title: "Inform Bruce Lee on WhatsApp", article: `Delivery to ${orderStore.selectedOrder.fromName} on: ${ format(fromUnixTime(orderStore.selectedOrder.ship_datetime), 'd MMM yyyy') }\n Address: ${orderStore.selectedOrder?.extracted?.for}`, selected: true, phoneNumber: "601110653730" },
    // { type: "attachment", title: "Send PO to Admin", article: `Purchase Order #001`, selected: true },
    { type: "update-status", title: "Mark as Resolved", article: `Mark this order as resolved`, selected: true },
  ]
  console.log(orderStore.selectedOrder);
})

const productDetailsShow = ref('quantity')

const toggleProductDetailsShow = () => {
    productDetailsShow.value = productDetailsShow.value=='quantity'?'subtotal':'quantity'
}

const receivedComputed = computed( () => {
  if(orderStore.selectedOrder?.received_datetime) return format( new Date(orderStore.selectedOrder?.received_datetime * 1000), "h:mma d MMMM")
})

const shipDateComputed = computed( () => {
  if(orderStore.selectedOrder?.ship_datetime)  return format( new Date(orderStore.selectedOrder?.ship_datetime * 1000), "h:mma d MMMM")
})

const itemTotal = computed( () => {
  if(orderStore.selectedOrder?.products)  return orderStore.selectedOrder.products.reduce((accumulator, product) => accumulator + product.quantity, 0);
})

const closeView = () => {
    router.push('/')
}

const expandOriginalMessage = ref(false)
const isEditProductActive = ref(false)

const productOperation = ref()

const editProduct = (product) => {
  productOperation.value = "edit"
  isEditProductActive.value = true;
  console.log('editProduct', product)
  selectedProduct.value = product
  requestedAmount.value = product.quantity

}

const addProduct = () => {
  productOperation.value = "add"
  isEditProductActive.value = true;
}



// const allProducts = [
//   { id:0, key: 'soymilk', label: 'Soymilk 少爺豆奶' },
//   { key: 'ice_jelly', label: 'Ice Jelly 少爺愛玉冰' },
//   { key: 'grape_ice_jelly', label: 'Grape Ice Jelly 葡萄味愛玉冰' },
//   { key: 'mango_ice_jelly', label: 'Mango Ice Jelly 芒果味愛玉冰' },
//   { key: 'apple_ice_jelly', label: 'Apple Ice Jelly 蘋果味愛玉冰' },
//   { key: 'pink_guava_ice_jelly', label: 'Pink Guava Ice Jelly 番石榴愛玉冰' },
//   { key: 'wheatgrass_ice_jelly', label: 'Wheatgrass Ice Jelly 小麥草愛玉冰' },
//   { key: 'lychee_ice_jelly', label: 'Lychee Ice Jelly 荔枝味愛玉冰' },
//   { key: 'honey_aloe_vera', label: 'Honey Aloe Vera 蜂蜜蘆薈' },
//   { key: 'coconut_milkshake', label: 'Coconut Milkshake 椰子奶昔' },
//   { key: 'passion_fruit_ice_jelly', label: 'Passion Fruit Ice Jelly 百香果愛玉冰' },
//   { key: 'soursop_ice_jelly', label: 'Soursop Ice Jelly 紅毛榴槤愛玉冰' },
//   { key: 'grassjelly_soymilk', label: 'Grass Jelly Soymilk 仙草豆漿' },
//   { key: 'sour_plum', label: 'Sour Plum 酸酐酸梅' },
//   { key: 'ginseng_chrysanthemum', label: 'Ginseng Chrysanthemum 洋參菊花' },
//   { key: 'herbal_tea', label: 'Herbal Tea 龍眼羅漢果' }
// ];
const query = ref('')
const selectedProduct = ref(null)
const requestedAmount = ref(0)
const fitleredProducts = computed(() => {
    let tmp = []
    if(orderStore.selectedOrder?.products) {
      query.value === ''
        ? tmp = productStore.products.filter((x) => { return !orderStore.selectedOrder?.products.map((y) => { return y.label}).includes(x.label) })
        : tmp = productStore.products.filter((product) => {
            return product.label.toLowerCase().includes(query.value.toLowerCase()) && !orderStore.selectedOrder?.products.map((y) => { return y.label}).includes(product.label)
          })
    }
    return tmp
})

const submitEditProduct = async () => {
  if(productOperation.value == 'add') {
    if(orderStore.selectedOrder.products.map((y) => { return y.label}).includes(selectedProduct.value.label)) return;
    if(!requestedAmount.value || requestedAmount.value <= 0) return;
  
    const success = await orderStore.addProduct(orderStore.selectedOrder, selectedProduct.value, requestedAmount.value);
    resetSelected();
    isEditProductActive.value = false;
  
    if(success) {
      alert('Order updated.')
    } else {
      alert('Order fail to update.')
    }
  } else if(productOperation.value == 'edit') {
    if(!orderStore.selectedOrder.products.map((y) => { return y.label}).includes(selectedProduct.value.label)) return;
    if(!requestedAmount.value || requestedAmount.value <= 0 || requestedAmount.value == selectedProduct.value.quantity) return;
  
    const success = await orderStore.editProduct(orderStore.selectedOrder, selectedProduct.value, requestedAmount.value);
    resetSelected();
    isEditProductActive.value = false;
  
    if(success) {
      alert('Order updated.')
    } else {
      alert('Order fail to update.')
    }
  }

  
}

const resolveOrder = async () => {
  const success = await orderStore.updateOrderCompleted(orderStore.selectedOrder);
  if(success) {
    alert('Order updated.')
  } else {
    alert('Order fail to update.')
  }
  closeView();
}

const resetSelected = () => {
  selectedProduct.value = null;
  requestedAmount.value = 0;
}

const runAllAction = () => {
  for(let action of actions.value) {
    if(action.selected) {
      if(action.type == 'whatsapp') orderStore.sendWhatsapp(action);
      if(action.type == 'update-status') {
        orderStore.updateOrderCompleted(orderStore.selectedOrder);
        closeView();
      }
    }
  }
}

</script>

<template>
  <div class="w-full">
    <header class="w-full grid grid-cols-[auto_1fr] gap-4 p-4 justify-center items-center border-b sticky top-0 bg-white">

      <div class="w-full">
        <button @click="closeView()" class="btn btn-circle btn-sm bg-gray-200 border-none group">
          <Icon class="text-lg text-gray-700 group-hover:text-white" icon="material-symbols:arrow-back"></Icon>
        </button>
      </div>


      <div class="w-full flex space-x-2 justify-start items-center">
        <div class="w-11 h-11 flex justify-end items-end">
          <div class="w-11 h-11 relative">
            <div class="w-full h-full bg-slate-200 rounded-full"></div>
          </div>
          <Icon class="text-lg text-green-500 absolute z-10" icon="ri:whatsapp-fill"></Icon>
        </div>

        <div>
          <h1 class="text-lg font-bold">{{ orderStore.selectedOrder?.sender }}</h1>
          <div class="text-xs font-light text-gray-500/50">+{{ orderStore.selectedOrder?.fromPhone }} on WhatsApp</div>
        </div>
      </div>

      
    </header>
    

    <!-- <section class="w-full flex justify-between items-center p-4 py-2">
      <div class="text-xs font-light text-gray-500/70">Received at 12:34pm</div>
      <button class="btn btn-link btn-xs capitalize">Mark as Resolved</button>
    </section> -->



    <section class="w-full p-6">
      <div class=" mb-2 flex justify-between items-center">
        <div>
            <p class="text-sm">Original Message</p>
            <div class="text-xs font-light text-gray-500/70">Received at {{receivedComputed}}</div>
        </div>

        <button @click="resolveOrder()" class="btn btn-link btn-xs capitalize">Mark as Resolved</button>
      </div>

      
      <div class="bg-gray-100 rounded-md p-2 grid grid-cols-6">
        <div v-if="orderStore.selectedOrder?.type == 'text'" class="text-xs tracking-tight text-gray-500 col-span-5">
            <p>{{orderStore.selectedOrder?.original_message}}</p>
        </div>
        <div v-if="orderStore.selectedOrder?.type == 'image'" class="text-xs tracking-tight text-gray-500 col-span-5 flex items-center">
            <Icon icon="material-symbols:image-outline-rounded"></Icon>&nbsp; Image
        </div>
        <div v-if="orderStore.selectedOrder?.type == 'audio'" class="text-xs tracking-tight text-gray-500 col-span-5 flex items-center">
            <Icon icon="ph:speaker-high-bold"></Icon>&nbsp; Audio
        </div>

        <div class="w-full h-full flex justify-center items-center">
            <div @click="expandOriginalMessage = true" class="btn btn-xs btn-ghost">View</div>
        </div>
      </div>

    </section>

    <!-- <section class="px-4 border">
      <p class="px-1 mb-2">Original Message</p>

      <div class="w-full grid grid-cols-6 justify-center items-center gap-4">
        <div class="bg-gray-100 col-span-5 p-2 rounded-lg text-xs text-gray-500">
          <p>BI B.O.D 要订 ( 26/2/23) 豆浆soymilk ~200 爱玉冰ice jelly ~20 *Logo Bod😊 大吸管 straw besar ~ 小吸管 straw kecil ~ 更换 tukar Soya ~4 Jelly~ Cinca~ Aloe ~</p>
        </div>

        <div class="w-full h-full flex justify-center items-center">
          <div class="btn btn-xs btn-ghost">Expand</div>
        </div>
      </div>
    </section> -->

    <div class="p-2">
      <article class="w-full bg-gray-200 rounded-xl">
        <section class="w-full grid grid-cols-7 justify-center items-center gap-4 p-4">
          <div class="col-span-5">
            <h1 class="text-xl mb-2">Aiyu-BING</h1>
            <p class="text-xs font-light text-gray-500">That’s what i got! If you see anything not right, simply edit them by tapping, Aiyu will learn and do better next time!</p>
          </div>

          <!-- <div class="col-span-2 flex justify-end items-center">
            <div class="flex flex-col justify-center items-center">
              <button class="btn btn-circle btn-sm">
                <Icon class="text-xl" icon="material-symbols:refresh-sharp"></Icon>
              </button>
              <div class="text-xs mt-2">Try Again</div>
            </div>
          </div> -->
        </section>

        <section class="w-full flex justify-between items-center p-4">
          <h2 class="text-lg font-medium">RM {{orderStore.selectedOrder?.price?.toFixed(2)}}</h2>
          <div class="flex space-x-1 justify-center items-center">
            <div class="w-3 h-3 rounded-full bg-green-400"></div>
            <div class="text-xs">All Items In-Stock</div>
          </div>
        </section>

        <!-- material-symbols:calendar-today -->
        <!-- mdi:truck -->

        <section class="p-4 py-0">
          <div class="w-full bg-gray-50 border-none flex justify-between items-center text-black capitalize rounded-t-md p-2">
            <div class="flex justify-center items-center space-x-2 flex-shrink-0">
              <Icon class="text-xl" icon="material-symbols:location-on-rounded"></Icon>
              <div class="text-sm">Ship To</div>
            </div>

            <div class="flex justify-center items-center space-x-2">
              <!-- <div>{{order.ship_to}}</div> -->
              <input v-model="orderStore.selectedOrder.ship_to" type="text" placeholder="ship to..." class="input input-ghost input-sm focus:outline-none focus:border-b focus:border-t-0 border-l-0 border-r-0 rounded-none focus:border-blue-500 text-right">
              <!-- <Icon icon="ph:caret-right"></Icon> -->
            </div>
          </div>

          <div class="w-full bg-gray-50 border-none flex justify-between items-center text-black capitalize p-2">
            <div class="flex justify-center items-center space-x-2 flex-shrink-0">
              <!-- <Icon class="text-xl" icon="material-symbols:location-on-rounded"></Icon> -->
              <Icon class="text-xl" icon="material-symbols:calendar-today"></Icon>
              <div class="text-sm">Date</div>

            </div>

            <div class="flex justify-center items-center space-x-2">
              <!-- <div>{{order.ship_to}}</div> -->
              <input v-model="shipDateComputed" type="text" placeholder="enter date..." class="input input-ghost input-sm focus:outline-none focus:border-b focus:border-t-0 border-l-0 border-r-0 rounded-none focus:border-blue-500 text-right">
              <!-- <Icon icon="ph:caret-right"></Icon> -->
            </div>
          </div>


          <div class="w-full bg-gray-50 border-none flex justify-between items-center text-black capitalize rounded-b-md p-2">
            <div class="flex justify-center items-center space-x-2 flex-shrink-0">
              <!-- <Icon class="text-xl" icon="material-symbols:location-on-rounded"></Icon> -->
              <Icon class="text-xl" icon="mdi:truck"></Icon>
              <div class="text-sm">Assigned To</div>

            </div>

            <div class="flex justify-center items-center space-x-2">
              <!-- <div>{{order.ship_to}}</div> -->
              <input type="text" v-model="orderStore.selectedOrder.logistic_assignee" placeholder="name of the driver..." class="input input-ghost input-sm focus:outline-none focus:border-b focus:border-t-0 border-l-0 border-r-0 rounded-none focus:border-blue-500 text-right">
              <!-- <Icon icon="ph:caret-right"></Icon> -->
            </div>
          </div>

          
        </section>

        <section class="mt-4">
          <div class="w-full flex justify-between items-center p-4 py-0">
            <div>
              <h2 class="font-semibold">Products</h2>
              <div class="text-xs font-light text-gray-500">{{itemTotal}} items</div>
            </div>

            <button @click="toggleProductDetailsShow()" class="btn btn-link btn-xs capitalize">{{productDetailsShow=='quantity'?'Show':'Hide'}} Price Subtotal</button>
          </div>

          <div v-for="product in orderStore.selectedOrder?.products" :key="product" class="border-b border-b-gray-300">
            <button @click="editProduct(product)" class="w-full btn btn-ghost flex justify-between items-center capitalize rounded-none font-medium text-sm">
              <div class="flex justify-center items-center space-x-2">
                <div class="font-normal">{{product.label}}</div>
              </div>
              <div class="flex justify-center items-center space-x-2">
                <div v-if="productDetailsShow =='quantity'">{{product.quantity}}</div>
                <div class="font-normal" v-if="productDetailsShow =='subtotal'">{{product.quantity}} x RM {{product.unit_price}} = RM {{product.subtotal}}</div>
                <Icon icon="ph:caret-right"></Icon>
              </div>
            </button>
          </div>
          <div class="w-full flex justify-center items-center p-2">
            <button class="w-full btn btn-ghost space-x-2 capitalize text-blue-500">
              <Icon class="text-2xl" icon="material-symbols:add-circle-rounded"></Icon>
              <p @click="addProduct()">Add Product</p>
            </button>
          </div>
        </section>
      </article>

      <section class="w-full p-2 mt-4">
        <fieldset>
          <legend class="w-full">
            <div class="w-full flex justify-between items-center">
              <div>
                <h6 class="font-semibold">Action Lineups</h6>
                <div class="text-xs font-light text-gray-500">{{ actions.length }} tasks in lineup ready to go!</div>
              </div>

              <button @click="runAllAction()" class="btn rounded-badge btn-sm capitalize px-4 py-3 h-auto bg-blue-500 border-none">Run All</button>
            </div>
          </legend>
          <div class="mt-4 pr-2">
            <div v-for="action in actions" :key="action" class="relative flex items-center mb-2">
              <div class="min-w-0 flex-1 text-sm">
                <div class="bg-gray-200 p-2 rounded-md">
                  
                  <div class="w-full flex justify-between items-center mb-4">
                    <div class="w-full flex justify-start items-center">
                        <div>
                        <Icon v-if="action.type == 'whatsapp'" class="text-lg text-gray-500 mr-1" icon="ri:whatsapp-fill"></Icon>
                        <Icon v-if="action.type == 'attachment'" class="text-lg text-gray-500 mr-1" icon="mi:attachment"></Icon>
                        <Icon v-if="action.type == 'update-status'" class="text-lg text-gray-500 mr-1" icon="fluent:checkmark-circle-48-filled"></Icon>
                        </div>
                        <p class="text-xs font-light text-gray-500">{{ action.title }}</p>
                    </div>

                    <!-- <div class="text-xs flex-shrink-0 font-light text-gray-500">Ran 0 times</div> -->
                  </div>

                  <div class="w-full grid grid-cols-5 justify-start items-end">
                    <article class="text-sm leading-4 col-span-4">
                      {{ action.article }}
                    </article>

                    <!-- <p v-if="action.type != 'update-status'" class="text-xs font-light text-gray-500 text-right">tap to edit</p> -->
                  </div>
                </div>
              </div>
              <div class="ml-3 flex h-5 items-center">
                <input v-model="action.selected" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              </div>
            </div>
          </div>
        </fieldset>
      </section>
    </div>

    <article :class="[expandOriginalMessage?'modal-open':'','modal']">
      <div class="modal-box relative">
        
        <header class="w-full flex justify-between items-center space-x-2">
          <p>Original Message</p>


          <button @click="expandOriginalMessage = false" class="btn btn-circle btn-sm bg-gray-200 border-none group">
            <Icon class="text-lg text-gray-700 group-hover:text-white" icon="material-symbols:close"></Icon>
          </button>

        </header>
        
        <article class="w-full mt-4">
          
          <p class="text-lg font-medium mb-2">From: {{orderStore.selectedOrder?.sender}}</p>

          <div class="whitespace-pre bg-gray-100 p-4 rounded-md">
            <p v-if="orderStore.selectedOrder?.type == 'text'" >{{orderStore.selectedOrder?.original_message}}</p>
            <div v-if="orderStore.selectedOrder?.type == 'image'" class="flex items-center">
              <!-- <Icon icon="material-symbols:image-outline-rounded"></Icon>&nbsp; Image -->
              <img :src="`https://aiyuworld.s3.ap-southeast-1.amazonaws.com/media/${orderStore.selectedOrder.mediaId}`" >
            </div>
            <div v-if="orderStore.selectedOrder?.type == 'audio'" class="flex items-center">
              <!-- <Icon icon="ph:speaker-high-bold"></Icon>&nbsp; Audio -->
              <audio controls>
                <source :src="`https://aiyuworld.s3.ap-southeast-1.amazonaws.com/media/${orderStore.selectedOrder.mediaId}`" type="audio/ogg">
              </audio>
            </div>
            <p class="text-right mt-4 text-gray-500 italic">
              {{receivedComputed}}
            </p>
          </div>

        </article>

      </div>
    </article>

    <article :class="[isEditProductActive?'modal-open':'','modal ']">
      <div class="modal-box relative">
        
        <header class="w-full flex justify-between items-center space-x-2">
          <p>{{[productOperation == 'edit'?'Edit':false,productOperation == 'add'?'Add':false].find( t => t!=false)}} Product</p>


          <button @click="isEditProductActive = false" class="btn btn-circle btn-sm bg-gray-200 border-none group">
            <Icon class="text-lg text-gray-700 group-hover:text-white" icon="material-symbols:close"></Icon>
          </button>

        </header>
        
        <article class="w-full mt-4">
          
          <Combobox as="div" v-model="selectedProduct">
    <ComboboxLabel class="block text-sm font-medium text-gray-700">Product</ComboboxLabel>
    <div class="relative mt-1">
      <ComboboxInput class="w-full input input-bordered" @change="query = $event.target.value" :display-value="(person) => person?.label" />
      <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
        <!-- <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" /> -->
              <Icon class="h-5 w-5" icon="heroicons:chevron-up-down-20-solid"></Icon>

      </ComboboxButton>

      <ComboboxOptions v-if="fitleredProducts.length > 0" class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
        <ComboboxOption v-for="product in fitleredProducts" :key="product.key" :value="product" as="template" v-slot="{ active, selected }">
          <li :class="['relative cursor-default select-none py-2 pl-3 pr-9', active ? 'bg-indigo-600 text-white' : 'text-gray-900']">
            <span :class="['block truncate', selected && 'font-semibold']">
              {{ product.label }}
            </span>

            <span v-if="selected" :class="['absolute inset-y-0 right-0 flex items-center pr-4', active ? 'text-white' : 'text-indigo-600']">
              <!-- <CheckIcon class="h-5 w-5" aria-hidden="true" /> -->
              <Icon class="h-5 w-5" icon="material-symbols:check-circle"></Icon>
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>


      <div class="form-control w-full max-w-xs mt-8">
  <label class="label">
    <span class="label-text">Quantity</span>
    <span class="label-text-alt">{{ selectedProduct?.stock ? selectedProduct?.stock : 0 }} in stock</span>
  </label>
  <input v-model="requestedAmount" type="number" placeholder="Enter amount..." class="input input-bordered w-full max-w-xs" />
  <label class="label">
  </label>
</div>

<div @click="submitEditProduct()" class="w-full py-4">
  <button class="btn w-full">Update</button>
</div>

        </article>

      </div>
    </article>


<!--     <footer class="w-full fixed bottom-0 z-10 bg-white border-t p-4 grid grid-cols-6 gap-2 justify-center items-center">
        <!~~ <div class="btn btn-sm btn-link capitalize">Resolved</div> ~~>

        <div class="col-span-5">
            <div class="text-lg">Run 4 Tasks</div>
        </div>

        <div class="">
            <button class="btn btn-circle bg-green-500 border-none">
                <Icon class="text-3xl" icon="material-symbols:play-arrow"></Icon>
            </button>
        </div>

    </footer> -->
  </div>
</template>
