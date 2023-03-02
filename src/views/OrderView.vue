<script setup>
import { Icon } from "@iconify/vue";
import { computed, ref } from "vue";
import { format } from 'date-fns'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()

const actions = ref([
  { type: "whatsapp", title: "Reply 阿花 on WhatsApp", article: `收到✅\nOrder Date: 27 Feb 2023`, selected: true },
  { type: "whatsapp", title: "Inform Bruce Lee on WhatsApp", article: `Delivery to 阿花 on: Tue 28 Feb\n2:00 PM\n Address: BI B.O.D`, selected: true },
  { type: "attachment", title: "Send PO to Admin", article: `Purchase Order #001`, selected: true },
  { type: "update-status", title: "Mark as Resolved", article: `Mark this order as resolved`, selected: true },
]);


const order = ref({
    received_datetime: 1677738479,
    original_message: `BI B.O.D 要订 ( 26/2/23) 豆浆soymilk ~200 爱玉冰ice jelly ~20 *Logo Bod😊 大吸管 straw besar ~ 小吸管 straw kecil ~ 更换 tukar Soya ~4 Jelly~ Cinca~ Aloe ~`,
    price: 12.34,
    ship_to:'BI BOD',
    ship_datetime: 1677796079,
    logistic_assignee: 'Bruce Lee',
    products:[
        {label:'豆浆 Soy Milk', quantity: 20, unit_price: 5, subtotal: 100},
        {label:'爱玉冰 Ice Jelly', quantity: 50, unit_price: 5, subtotal: 250},
        {label:'仙草豆奶 Grass Jelly', quantity: 30, unit_price: 5, subtotal: 150},
    ]
})

const productDetailsShow = ref('quantity')

const toggleProductDetailsShow = () => {
    productDetailsShow.value = productDetailsShow.value=='quantity'?'subtotal':'quantity'
}

const receivedComputed = computed( () => {
    return format( new Date(order.value.received_datetime * 1000), "h:mma d MMMM")
})

const shipDateComputed = computed( () => {
    return format( new Date(order.value.ship_datetime * 1000), "h:mma d MMMM")
})

const itemTotal = computed( () => {
    return order.value.products.reduce((accumulator, product) => accumulator + product.quantity, 0);
})

const closeView = () => {
    router.push('/')
}

</script>

<template>
  <div class="w-full">
    <header class="w-full grid grid-cols-[1fr_auto] p-4 justify-center items-center border-b sticky top-0 bg-white">
      <div class="w-full flex space-x-2 justify-start items-center">
        <div class="w-11 h-11 flex justify-end items-end">
          <div class="w-11 h-11 relative">
            <div class="w-full h-full bg-slate-200 rounded-full"></div>
          </div>
          <Icon class="text-lg text-green-500 absolute z-10" icon="ri:whatsapp-fill"></Icon>
        </div>

        <div>
          <h1 class="text-lg font-bold">阿花</h1>
          <div class="text-xs font-light text-gray-500/50">+601234567890 on WhatsApp</div>
        </div>
      </div>

      <div class="w-full">
        <button @click="closeView()" class="btn btn-circle btn-sm bg-gray-200 border-none group">
          <Icon class="text-lg text-gray-700 group-hover:text-white" icon="material-symbols:close-rounded"></Icon>
        </button>
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

        <button class="btn btn-link btn-xs capitalize">Mark as Resolved</button>
      </div>

      
      <div class="bg-gray-100 rounded-md p-2 grid grid-cols-6">
        <div class="text-xs tracking-tight text-gray-500 col-span-5">
            <p>{{order.original_message}}</p>
        </div>

        <div class="w-full h-full flex justify-center items-center">
            <div class="btn btn-xs btn-ghost">View</div>
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

          <div class="col-span-2 flex justify-end items-center">
            <div class="flex flex-col justify-center items-center">
              <button class="btn btn-circle btn-sm">
                <Icon class="text-xl" icon="material-symbols:refresh-sharp"></Icon>
              </button>
              <div class="text-xs mt-2">Try Again</div>
            </div>
          </div>
        </section>

        <section class="w-full flex justify-between items-center p-4">
          <h2 class="text-lg font-medium">RM {{order.price}}</h2>
          <div class="flex space-x-1 justify-center items-center">
            <div class="w-3 h-3 rounded-full bg-green-400"></div>
            <div class="text-xs">All Items In-Stock</div>
          </div>
        </section>

        <!-- material-symbols:calendar-today -->
        <!-- mdi:truck -->

        <section class="p-4 py-0">
          <button class="w-full btn bg-gray-50 border-none flex justify-between items-center text-black capitalize hover:text-white rounded-b-none">
            <div class="flex justify-center items-center space-x-2">
              <Icon class="text-xl" icon="material-symbols:location-on-rounded"></Icon>
              <div>Ship To</div>
            </div>

            <div class="flex justify-center items-center space-x-2">
              <div>{{order.ship_to}}</div>
              <Icon icon="ph:caret-right"></Icon>
            </div>
          </button>
          <button class="w-full btn bg-gray-50 border-none flex justify-between items-center text-black capitalize hover:text-white rounded-none">
            <div class="flex justify-center items-center space-x-2">
              <Icon class="text-xl" icon="material-symbols:calendar-today"></Icon>
              <div>Date</div>
            </div>

            <div class="flex justify-center items-center space-x-2">
              <div>{{shipDateComputed}}</div>
              <Icon icon="ph:caret-right"></Icon>
            </div>
          </button>
          <button class="w-full btn bg-gray-50 border-none flex justify-between items-center text-black capitalize hover:text-white rounded-t-none">
            <div class="flex justify-center items-center space-x-2">
              <Icon class="text-xl" icon="mdi:truck"></Icon>
              <div>Assigned To</div>
            </div>

            <div class="flex justify-center items-center space-x-2">
              <div>{{order.logistic_assignee}}</div>
              <Icon icon="ph:caret-right"></Icon>
            </div>
          </button>
        </section>

        <section class="mt-4">
          <div class="w-full flex justify-between items-center p-4 py-0">
            <div>
              <h2 class="font-semibold">Products</h2>
              <div class="text-xs font-light text-gray-500">{{itemTotal}} items</div>
            </div>

            <button @click="toggleProductDetailsShow()" class="btn btn-link btn-xs capitalize">{{productDetailsShow=='quantity'?'Show':'Hide'}} Price Subtotal</button>
          </div>

          <div v-for="product in order.products" :key="product" class="border-b border-b-gray-300">
            <button class="w-full btn btn-ghost flex justify-between items-center capitalize rounded-none font-medium text-sm">
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
              <p>Add Product</p>
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
                <div class="text-xs font-light text-gray-500">3 tasks in lineup ready to go!</div>
              </div>

              <button class="btn rounded-badge btn-sm capitalize px-4 py-3 h-auto bg-blue-500 border-none">Run All</button>
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

                    <div class="text-xs flex-shrink-0 font-light text-gray-500">Ran 0 times</div>
                  </div>

                  <div class="w-full grid grid-cols-5 justify-start items-end">
                    <article class="text-sm leading-4 col-span-4">
                      {{ action.article }}
                    </article>

                    <p v-if="action.type != 'update-status'" class="text-xs font-light text-gray-500 text-right">tap to edit</p>
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
