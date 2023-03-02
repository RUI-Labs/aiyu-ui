<script setup>

    import { Icon } from '@iconify/vue';
import { ref } from 'vue';
    import { useRouter, useRoute } from 'vue-router'

    const router = useRouter()

    const backHome = () => {
        router.push('/')
    }

    

    const settingOptions = ref([
        {label:"Aiyu-BING", icon:"carbon:magic-wand-filled", desc:"Tune Aiyu to improve order recognition", key:'aiyubing', path:'/train/aiyubing'},
        {label:"Voice Notes", icon:"ic:baseline-record-voice-over", desc:"Configure voice notes recognition", key:'whisper', path:'/train/whisper'},
        {label:"Products", icon:"fluent:box-24-filled", desc:"Edit your products", key:'whisper'},
    ])

    const useOption = (option) => {
        router.push(option.path)
    }

</script>

<template>
    <div class="w-full">
        <section class="w-full p-4 flex justify-start items-center space-x-2">
            <button @click="backHome()" class="btn btn-circle btn-sm bg-gray-200 border-none group">
                <Icon class="text-lg text-gray-700 group-hover:text-white" icon="material-symbols:arrow-back"></Icon>
            </button>
            <p>Back</p>
        </section>

        <section class="w-full">
            <button @click="useOption(option)" v-for="option in settingOptions" :key="option" class="btn h-auto w-full rounded-none btn-ghost grid grid-cols-9 p-4 gap-4">
                <div class="w-full h-full flex justify-center items-center col-span-2">
                    <Icon class="text-3xl" :icon="option.icon"></Icon>
                </div>

                <div class="col-span-6 text-left capitalize">
                    <div class="font-semibold text-lg mb-1">{{option.label}}</div>
                    <p class="font-light">{{option.desc}}</p>
                </div>

                <div class="w-full flex justify-center items-center">
                    <Icon class="text-lg" icon="ph:caret-right"></Icon>
                </div>
            </button>
        </section>

    </div>
</template>