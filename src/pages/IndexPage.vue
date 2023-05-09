<template>
  <q-page class="q-pa-sm flex flex-col">
    <q-card class="mb-4">
      <q-card-section class="flex flex-col flex-nowrap">
        <q-input
          type="textarea"
          v-model="prompt"
          label="Prompt"
          outlined
        ></q-input>
        <q-select
          class="w-100px mt-4"
          v-model="model"
          label="Model"
          :options="modelOptions"
          outlined
        ></q-select>
      </q-card-section>
      <q-card-section class="gap-x-4 flex">
        <q-btn label="Ask" color="primary" @click="ask"></q-btn>
        <q-btn label="Clear" color="negative" @click="clear"></q-btn>
      </q-card-section>
    </q-card>

    <div class="flex-grow">
      <q-card class="mb-2 last:mb-0" v-for="chat in chatHistory" :key="chat.id">
        <q-card-section>
          {{ chat.text }}
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { Notify } from 'quasar';
import axios from 'axios';

interface ChatRecord {
  id: number;
  prompt: string;
  model: string;
  text: string;
}

const prompt: Ref<string> = ref('');
const model: Ref<string> = ref('You');

const modelOptions = [
  {
    label: 'Forefront',
    value: 'Forefront',
  },
  {
    label: 'You',
    value: 'You',
  },
];

const chatHistory = ref(<ChatRecord[]>[]);

const ask = async () => {
  if (prompt.value === '') {
    Notify.create({
      message: 'Please enter a prompt',
      type: 'negative',
    });
    return;
  }

  const response = await axios.get('/api/ask', {
    params: {
      prompt: prompt.value,
      model: model.value,
    },
  });

  const chatRecord = {
    id: chatHistory.value.length + 1,
    prompt: prompt.value,
    model: model.value,
    text: response.data.text,
  };
  chatHistory.value.unshift(chatRecord);
};

const clear = () => {
  prompt.value = '';
};
</script>
