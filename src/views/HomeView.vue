<script setup>

    import { Icon } from '@iconify/vue';
    import { ref } from 'vue';

    const chats = ref([])
    for(let i =0;i<10;i++){
        chats.value.push({
            sender: '阿花',
            summary:'27 FEB - 4 爱玉冰, 3 豆奶',
            subtitle: 'Johor jaya pou wok 要订   (27/2/23) 豆浆soymilk ~0爱玉冰ice...',
            timestamp:'12:34pm',
            price:'12.34',
            status: i > 5 ? 'completed': 'pending'
        })
    }

</script>


<template>
    
    <main class="w-full flex justify-start items-start flex-col">
        <header class="w-full grid grid-cols-4 px-4 pt-10 pb-6">
            <div class="w-full col-span-3">
                <h1 class="text-4xl font-bold">Aiyu</h1>
            </div>
            <div class="w-full flex justify-end items-center">
                <button class="btn btn-ghost btn-sm text-base font-bold text-blue-500 capitalize">Train</button>
            </div>
        </header>
    </main>

    <section class="px-4">
        <div class="bg-gray-100 rounded-xl flex justify-start items-center p-2 px-4">
            <Icon class="text-xl" icon="ph:magnifying-glass"></Icon>
            <input class="input input-sm bg-transparent input-ghost focus:outline-none focus:ring-transparent focus:border-none" type="text" placeholder="Search">
        </div>
    </section>
    <section class="w-full mt-2 flex justify-between items-center">
        <h3 class="font-medium text-sm w-1/4 pl-6">Sort By: </h3>

        <div class="w-3/4 flex justify-end items-center space-x-2 pr-4">
            <div class="btn btn-xs flex justify-center items-center p-1 px-2 w-auto h-auto">
                <div class="capitalize mr-2 text-sm">Date</div>
                <Icon icon="ph:caret-down-duotone"></Icon>
            </div>

            <div class="btn btn-ghost btn-xs flex justify-center items-center p-1 px-2 w-auto h-auto">
                <div class="capitalize mr-2 text-sm">Quantity</div>
                <!-- <Icon icon="ph:caret-down-duotone"></Icon> -->
            </div>

            <div class="btn btn-ghost btn-xs flex justify-center items-center p-1 px-2 w-auto h-auto">
                <div class="capitalize mr-2 text-sm">Value</div>
                <!-- <Icon icon="ph:caret-down-duotone"></Icon> -->
            </div>
        </div>
    </section>

    <section class="w-full">

        <div v-for="chat in chats" :key="chat" class="w-full grid grid-cols-[auto_1fr_auto] justify-center items-center py-6 gap-4 border-b px-4">

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
                <div class="text-xs text-gray-400 font-light">{{chat.subtitle}}</div>
            </div>

            <div class="w-full h-full flex flex-col justify-between items-end">
                <div class="font-light text-gray-400">{{chat.timestamp}}</div>
                <div class="font-medium text-lg">RM {{chat.price}}</div>
            </div>

        </div>

    </section>


</template>