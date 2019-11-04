<template>
  <svg :width="width" :fill="svgColor" viewBox="0 0 612 612" xmlns="http://www.w3.org/2000/svg">
    <circle cx="69.545" cy="306" r="69.545" />
    <circle cx="306" cy="306" r="69.545" />
    <circle cx="542.455" cy="306" r="69.545" />
  </svg>
</template>
<script>
export default {
  computed: {
    svgColor() {
      return this.color || this.theme.colors.text.secondary;
    },
  },
  props: {
    width: {
      type: [String, Number],
      default: 17,
    },
    color: {
      type: String,
      required: false,
    },
  },
};
</script>