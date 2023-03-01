<script setup>

    import { Icon } from '@iconify/vue';

</script>


<template>
    <div class="w-full">

        <header class="w-full grid grid-cols-[1fr_auto] p-4 justify-center items-center border-b">
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
                <button class="btn btn-circle btn-sm bg-gray-200 border-none group">
                    <Icon class="text-lg text-gray-700 group-hover:text-white" icon="material-symbols:close-rounded"></Icon>
                </button>
            </div>
        </header>

        <section class="w-full flex justify-between items-center p-4 py-2">
            <div class="text-xs font-light text-gray-500/70">Received at 12:34pm</div>
            <button class="btn btn-link btn-xs capitalize">Mark as Resolved</button>
        </section>

        <section class="px-4">
            <p class="px-1 mb-2">Original Message</p>

            <div class="w-full grid grid-cols-6 justify-center items-center gap-4">
                <div class="bg-gray-100 col-span-5 p-2 rounded-lg text-xs text-gray-500">
                    <p>BI B.O.D 要订      ( 26/2/23) 豆浆soymilk ~200 爱玉冰ice jelly ~20 *Logo Bod😊 大吸管 straw besar ~ 小吸管 straw kecil ~ 更换 tukar Soya ~4 Jelly~ Cinca~ Aloe ~</p>
                </div>

                <div class="w-full h-full flex justify-center items-center">
                    <div class="btn btn-xs btn-ghost">Expand</div>
                </div>
            </div>
        </section>

        <div class="p-2">
                <article class="w-full p-4 bg-gray-200 rounded-xl">
                
                    <div class="w-full grid grid-cols-7 justify-center items-center gap-4">
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
                    </div>

            </article>
        </div>


    </div>
</template>