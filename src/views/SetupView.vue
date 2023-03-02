<script setup>

    import { ref } from "vue";

    const steps = ref([
        {'label':'Business Type'},
        {'label':'Setup Products'},
        {'label':'Example Order'},
        {'label':'Fine Tune Response'},
        
    ])

</script>


<template>
    <div class="w-full min-h-[100vh] grid grid-cols-[300px_1fr]">
        <div class="border-r w-full">
            <div class="p-4 w-full border-b">
                <h1 class="text-lg font-bold">Setup</h1>
                <p>Setup your AI</p>
            </div>
            <div class="p-4">
                <div class="p-4 border rounded-md mb-2 grid grid-cols-6 gap-2 justify-center items-center" v-for="(step,idx) in steps" :key="step">
                    <div class="border rounded-full p-1 aspect-square flex justify-center items-center w-full">{{idx+1}}</div>
                    <p class="col-span-5 text-sm">{{step.label}}</p>
                </div>
            </div>
        </div>
        <div class="w-full">
            <flicking
    :options="{ circular: true, moveType: 'freeScroll', horizontal:true }"
    :viewportTag="'div'"
    :cameraTag="'div'"
    :cameraClass="''"
    class="w-full h-full"
  >
    <div class="w-full h-full">CONTENTS OF PANEL 0</div>
    <div class="w-full h-full">CONTENTS OF PANEL 1</div>
    <div class="w-full h-full">CONTENTS OF PANEL 2</div>
  </flicking>
        </div>
    </div>
</template>