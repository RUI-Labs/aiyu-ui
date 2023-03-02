<script setup>

    import { Icon } from '@iconify/vue';
    import { ref, onMounted, computed } from 'vue';
    import { useRouter, useRoute } from 'vue-router'
    import { format, fromUnixTime } from 'date-fns'
    const router = useRouter()

    import { useOrderStore } from "@/stores/order.js";
    const orderStore = useOrderStore();

    import { useProductStore } from "@/stores/product.js";
    const productStore = useProductStore();

    const chats = ref([])
    // for(let i =0;i<10;i++){
    //     chats.value.push({
    //         sender: '阿花',
    //         summary:'27 FEB - 4 爱玉冰, 3 豆奶',
    //         subtitle: 'Johor jaya pou wok 要订   (27/2/23) 豆浆soymilk ~0爱玉冰ice...',
    //         timestamp:'12:34pm',
    //         price:'12.34',
    //         status: i > 5 ? 'completed': 'pending'
    //     })
    // }

    const selectChat = (chat) => {
        orderStore.selectOrder(chat);
        router.push('/order')
    }

    const sorters = ref([
        {label:'Date',key:'date',mode:'desc'},
        {label:'Quantity',key:'quantity',mode:false},
        {label:'Value',key:'value',mode:false},
    ])

    const hideCompleted = ref(true)

    const toggleHideComplete = () => {
        hideCompleted.value = !hideCompleted.value 
    }

    const switchMode = (_sorter) => {
        if(!_sorter.mode) _sorter.mode = 'asc'
        else if(_sorter.mode == 'asc') _sorter.mode = 'desc'
        else if(_sorter.mode == 'desc') _sorter.mode = false
    }

    onMounted( async () => {
        productStore.getProduct();
        chats.value = await orderStore.getOrder();
    })

    const sortedChat = computed(() => {
        if(!chats.value.length) return [];
        let formattedChat = chats.value
        for(let sort of sorters.value) {
            if(sort.mode) {
                // if(sort.key == 'value') {
                //     if(sort.mode == 'asc') formattedChat = formattedChat.sort((a,b) => { return a.timestamp - b.timestamp })
                //     if(sort.mode == 'desc') formattedChat = formattedChat.sort((a,b) => { return b.timestamp - a.timestamp })
                // } 
                if(sort.key == 'quantity') {
                    if(sort.mode == 'asc') formattedChat = formattedChat.sort((a,b) => { return a.quantity - b.quantity })
                    if(sort.mode == 'desc') formattedChat = formattedChat.sort((a,b) => { return b.quantity - a.quantity })
                } 
                if(sort.key == 'date') {
                    if(sort.mode == 'asc') formattedChat = formattedChat.sort((a,b) => { return a.timestamp - b.timestamp })
                    if(sort.mode == 'desc') formattedChat = formattedChat.sort((a,b) => { return b.timestamp - a.timestamp })
                } 
            }
        }
        if(hideCompleted.value) formattedChat = formattedChat.filter((x) => x.status != 'completed')
        return formattedChat;
    })

    const viewTrain = () => {
        router.push('/train')
    }

</script>


<template>
    
    <main class="w-full flex justify-start items-start flex-col">
        <header class="w-full grid grid-cols-4 px-4 pt-10 pb-6">
            <div class="w-full col-span-3">
                <h1 class="text-4xl font-bold">Aiyu</h1>
            </div>
            <div class="w-full flex justify-end items-center">
                <button @click="viewTrain()" class="btn btn-ghost btn-sm text-base font-bold text-blue-500 capitalize">Train</button>
            </div>
        </header>
    </main>
    
    <div class="pl-3 mb-1">
        <button @click="toggleHideComplete()" class="btn btn-ghost btn-xs text-blue-500 capitalize">{{hideCompleted?'Show':'Hide'}} Completed</button>
    </div>
    <section class="px-4">
        <div class="bg-gray-100 rounded-xl flex justify-start items-center p-2 px-4">
            <Icon class="text-xl" icon="ph:magnifying-glass"></Icon>
            <input class="input input-sm bg-transparent input-ghost focus:outline-none focus:ring-transparent focus:border-none" type="text" placeholder="Search">
        </div>
    </section>
    <section class="w-full mt-2 flex justify-between items-center">

        <h3 class="font-medium text-sm w-1/4 pl-6">Sort By: </h3>

        <div class="w-3/4 flex justify-end items-center space-x-2 pr-4">
            <div v-for="sorter in sorters" :key="sorter" @click="switchMode(sorter)" :class="[sorter.mode ? '':'btn-ghost', 'btn btn-xs flex justify-center items-center p-1 px-2 w-auto h-auto']">
                <div class="capitalize mr-2 text-sm">{{sorter.label}}</div>
                <Icon :class="[sorter.mode == 'desc' ? '':'rotate-180', 'transition-all duration-300 text-lg']" v-if="sorter.mode == 'asc' || sorter.mode == 'desc'" icon="ph:caret-down-duotone"></Icon>
            </div>
        </div>
    </section>

    <section class="w-full">

        <div @click="selectChat(chat)" v-for="chat in sortedChat" :key="chat" class="active:bg-gray-300 active:scale-90 transition-all duration-200 w-full grid grid-cols-[auto_1fr_auto] justify-center items-center py-6 gap-4 border-b px-4">

            <div class="flex justify-start items-center">
                <div class="w-12 h-12 flex justify-end items-end">
                    <div class="w-12 h-12 relative">
                        <div class="w-full h-full bg-slate-200 rounded-full"></div>
                    </div>
                    <Icon class="text-lg text-green-500 absolute z-10" icon="ri:whatsapp-fill"></Icon>
                </div>
            </div>

            <div class="w-full text-left flex flex-col justify-start items-start h-full pr-4">
                <div class="flex justify-center items-center">
                    <!-- <Icon class="text-xl mr-1 text-yellow-400" :icon="[chat.status == 'completed'?'ion:checkmark-round':'',chat.status == 'pending'?'material-symbols:label-important':'']"></Icon> -->
                    <Icon v-if="chat.status == 'pending'" class="text-xl mr-1 text-yellow-400" icon="material-symbols:label-important"></Icon>
                    <Icon v-if="chat.status == 'completed'" class="text-xl mr-1 text-green-400" icon="ion:checkmark-round"></Icon>
                    <h6 class="text-lg font-bold">{{chat.sender}}</h6>
                </div>
                <div class="text-sm font-medium text-blue-500">{{chat.summary}}</div>
                <!-- <div class="text-sm font-medium text-blue-500">{{chat.quantity}}</div> -->
                <!-- <div class="text-sm font-medium text-blue-500">{{chat.key}}</div> -->
                <div v-if="chat.type == 'text'" class="text-xs text-gray-400 font-light">{{ chat.subtitle.substring(0, 50) }}...</div>
                <div v-if="chat.type == 'image'" class="text-xs text-gray-400 font-light flex items-center">
                    <Icon icon="material-symbols:image-outline-rounded"></Icon>&nbsp; Image
                </div>
                <div v-if="chat.type == 'audio'" class="text-xs text-gray-400 font-light flex items-center">
                    <Icon icon="ph:speaker-high-bold"></Icon>&nbsp; Audio
                </div>
            </div>

            <div class="w-full h-full flex flex-col justify-between items-end">
                <div class="font-light text-gray-400">{{ format(fromUnixTime(chat.timestamp), 'h:mm aaa') }}</div>
                <div class="font-medium text-lg">RM {{chat.price}}</div>
            </div>

        </div>

    </section>


</template>