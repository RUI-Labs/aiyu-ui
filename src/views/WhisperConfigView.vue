<script setup>
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import VoiceSampleConfigModal from "../components/VoiceSampleConfigModal.vue"

const voiceSampleConfigModal = ref(null)

import { useRouter, useRoute } from "vue-router";

const router = useRouter();

const back = () => {
  router.push("/train");
};

// const samples = ref([
//     {input:'Aus分店 pou wok \n要订   (26/2/23) \n\n豆浆soymilk ~30\n爱玉冰ice jelly ~3O\n洋参 ginseng ~40\n\n自助餐：爱玉冰20杯\n\n大吸管 straw besar ~1\n小吸管 straw kecil ~2'},
//     {input:'Johor jaya pou wok \n要订   (27/2/23)\n豆浆soymilk ~0\n爱玉冰ice jelly ~30\n洋参 ginseng ~30\n\n\n大吸管 straw besar ~1\n小吸管 straw kecil ~'}
// ])

const addSample = () => {
    voiceSampleConfigModal.value.openModal()
}

const expandSample = (sample) => {
    voiceSampleConfigModal.value.openModal(sample)
}



import { useBusinessStore } from "@/stores/business.js";
const businessStore = useBusinessStore();
onMounted(() => {
    businessStore.getBusiness();
})

const appendCorrection = () => {
    businessStore?.businessData?.whisper_substitute.push({
        'from': "",
        "to": ""
    })
}

const removeCorrection = (index) => {
    businessStore?.businessData?.whisper_substitute.splice(index, 1);
}

const saveWhisper = async () => {
    const [s1, s2] = await Promise.all([
        // businessStore.saveExtraParameter(businessStore.businessData.extra_parameter),
        // businessStore.saveCorrection(businessStore?.businessData?.aiyu_correction)

    ]) 
    if(s1 && s2) {
        alert('Whisper updated.')
    } else {
        alert('Whisper failed to update.')
    }

    back();
}

</script>

<template>
  <div class="w-full">
    <section class="w-full p-4 grid justify-center items-center grid-cols-5 border-b">
      <div class="flex justify-start items-center space-x-2">
        <button @click="back()" class="btn btn-circle btn-sm bg-gray-200 border-none group">
            <Icon class="text-lg text-gray-700 group-hover:text-white" icon="material-symbols:arrow-back"></Icon>
        </button>
        <!-- <p class="text-sm font-light">Back</p> -->
      </div>

      <div class="col-span-3 text-center font-medium text-lg">Whisper Tuning</div>

      <div>

      </div>
    </section>

    <section class="p-4">
        
        <div class="w-full grid grid-cols-5">
            <div class="col-span-4">
                <h3 class="font-bold mb-1">Corrections</h3>
                <p class="font-light text-sm mb-4">Correct Aiyu's word recognition to improve its future performance.</p>
            </div>

            <div class="w-full flex justify-center items-center flex-col">
                <button @click="appendCorrection()" class="btn btn-circle btn-sm bg-lime-400 border-none text-lime-800 hover:text-white">
                    <Icon class="text-2xl" icon="material-symbols:add"></Icon>
                </button>

                <p class="text-xs mt-2">Add Pair</p>
            </div>
        </div>        
        <div v-for="(correction,index) in businessStore?.businessData?.whisper_substitute" :key="correction" class="w-full grid grid-cols-8 justify-center items-center">
            <div class="w-full flex justify-start">
                <button @click="removeCorrection(index)" class="btn btn-circle btn-xs btn-ghost">
                    <Icon class="text-red-400 text-xl" icon="ic:baseline-remove-circle"></Icon>
                </button>
            </div>

            <div class="w-full col-span-3">
                <input v-model="correction.from" class="w-full input input-bordered input-sm" type="text" name="" id="">
            </div>
            <div class="w-full flex justify-center items-center">
                <Icon class="text-lg" icon="material-symbols:arrow-right-alt"></Icon>
            </div>
            <div class="w-full col-span-3">
                <input v-model="correction.to" class="w-full input input-bordered input-sm" type="text" name="" id="">
            </div>
        </div>

        <!-- <div class="w-full btn mt-2 btn-ghost text-lime-500 flex justify-center items-center capitalize1">
            <Icon class="text-2xl mr-2" icon="material-symbols:add-circle"></Icon>
            <p>Add Correction Pair</p>
        </div> -->

    </section>

    <section class="p-4">
                <div class="w-full">
            <h3 class="font-bold mb-1">Prompt</h3>
            <p class="font-light text-sm mb-4">Tell Aiyu directly what it should do.</p>
        </div>

        <textarea v-model="businessStore.businessData.prompt" class="w-full textarea textarea-bordered" placeholder="Always represent number using Arabic numbers..."></textarea>
    </section>

    <section class="p-4">
      <h3 class="font-bold mb-1">Samples</h3>
      <p class="font-light text-sm mb-4">Adding more samples will help Aiyu understand your customers better.</p>
      
      
      <Flicking class="w-full" :options="{ renderOnlyVisible: true, align: 'prev' }">
        <div class="w-[120px]  min-h-[100px] p-2">
            <div class="btn btn-ghost w-full h-full border border-gray-300 rounded-md flex justify-center items-center" @click="addSample()">Add</div>
        </div>
      <div @click="expandSample(sample)" v-for="sample in samples" class="flicking-panel max-w-[200px] p-2" :key="sample">

        <div class="w-full h-full border rounded-md flex justify-center items-center flex-col" style="white-space: pre;">
            <div class="w-full max-h-[120px] overflow-hidden p-4">
                <p class="text-sm">{{sample.input}}</p>
            </div>

            <div class="w-full h-[100px] rounded-b-md text-right bg-gradient-to-b from-transparent to-white z-10 py-2 mt-[-100px] flex justify-end items-end p-2 text-sm text-lime-600 font-medium">
                Expand
            </div>
        </div>

      </div>
    </Flicking>
    </section>

    <VoiceSampleConfigModal ref="voiceSampleConfigModal"></VoiceSampleConfigModal>

    <div class="w-full fixed bottom-0 p-4">
        <button class="btn w-full">Save</button>
    </div>
  </div>
</template>
