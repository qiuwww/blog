<template>
  <div style="padding: 0 15px;" @click="toggleClick">
    <!--<svg
      :class="{'is-active':isActive}"
      class="hamburger"
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
    >
      <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z" />
    </svg>-->
    <svg
      :class="{'is-active':isActive}"
      class="hamburger"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="50px"
      height="50px"
      viewBox="0 0 50 50"
      enable-background="new 0 0 50 50"
      xml:space="preserve"
    >
      <path
        fill="#FFFFFF"
        d="M25.5,27.625h30c0.275,0,0.5-0.225,0.5-0.5v-3.5c0-0.275-0.225-0.5-0.5-0.5h-30c-0.275,0-0.5,0.225-0.5,0.5
	v3.5C25,27.4,25.225,27.625,25.5,27.625z M25,40.375c0,0.275,0.225,0.5,0.5,0.5h30c0.275,0,0.5-0.225,0.5-0.5v-3.5
	c0-0.275-0.225-0.5-0.5-0.5h-30c-0.275,0-0.5,0.225-0.5,0.5V40.375z M56.5,10h-49C7.225,10,7,10.225,7,10.5V14
	c0,0.275,0.225,0.5,0.5,0.5h49c0.275,0,0.5-0.225,0.5-0.5v-3.5C57,10.225,56.775,10,56.5,10z M56.5,49.5h-49
	C7.225,49.5,7,49.725,7,50v3.5C7,53.775,7.225,54,7.5,54h49c0.275,0,0.5-0.225,0.5-0.5V50C57,49.725,56.775,49.5,56.5,49.5z
	 M8.9,40.131l9.769-7.693c0.24-0.188,0.281-0.536,0.093-0.776c-0.027-0.035-0.059-0.066-0.093-0.093l-9.769-7.7
	C8.538,23.581,8,23.837,8,24.3v15.394c0,0.308,0.249,0.557,0.556,0.557C8.681,40.25,8.802,40.209,8.9,40.131z"
      />
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick() {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style scoped>
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
</style>
