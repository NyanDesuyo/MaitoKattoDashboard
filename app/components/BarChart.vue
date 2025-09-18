<template>
  <div>
    <svg :viewBox="`0 0 ${width} ${height}`" class="w-full h-auto">
      <g v-for="(bar, index) in bars" :key="index">
        <rect :x="bar.x" :y="bar.y" :width="bar.width" :height="bar.height" :fill="bar.color" />
        <text 
          :x="bar.x + bar.width / 2" 
          :y="bar.y > 20 ? bar.y + 15 : bar.y - 5" 
          text-anchor="middle" 
          :fill="bar.y > 20 ? 'white' : 'black'" 
          font-size="12">
          {{ bar.value }}
        </text>
        <text :x="bar.x + bar.width / 2" :y="height - 5" text-anchor="middle">{{ bar.label }}</text>
      </g>
    </svg>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  width: {
    type: Number,
    default: 400
  },
  height: {
    type: Number,
    default: 200
  },
  color: {
    type: String,
    default: '#42b983'
  }
})

const bars = computed(() => {
  const labels = Object.keys(props.data)
  const values = Object.values(props.data)
  const maxValue = Math.max(...values)
  const barWidth = props.width / labels.length

  return labels.map((label, index) => ({
    label,
    value: values[index],
    x: index * barWidth,
    y: props.height - (values[index] / maxValue) * props.height,
    width: barWidth - 2,
    height: (values[index] / maxValue) * props.height,
    color: props.color
  }))
})
</script>
