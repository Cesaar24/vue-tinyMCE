<template>
  <div class=" ">
    <section class="action w-full h-96 shadow-xl">
      <div class="flex flex-col container mx-auto py-6  h-full">
        <div class="w-full md:w-2/3 h-full ">
          <div class="text-center lg:text-left ">
            <div class="lg:mb-0 ">
              <h1 class="mt-0 mb-3 font-bold text-2xl md:text-[35px] lg:text-4xl ">
                {{ blogFormatted?.title }}
              </h1>
              <p class="text-[15px] md:text-[20px] lg:text-xl"> {{ blogFormatted?.description }}</p>
            </div>
          </div>
        </div>
        <div class="flex w-full justify-between mt-auto mb-3 text-[14px] md:text-[18px] lg:text-lg">
          <span class="mr-5">By:Admin</span> 
          <span>Date: {{ blogFormatted?.date?.toDateString() }}</span> 
        </div>
      </div>
    </section>
    <div class="w-full  bg-white">
      <section class="content container mx-auto pb-20 pt-10" ref="content">
      
      </section>
    </div>
  </div>  
</template>
<script>
import { store } from '../../state/store.js'
export default {
  data() {
    return {
      store
    }
  },
  computed:{
    blogFormatted(){
      return this.store.Blogs[this.store.BlogSelected - 1 ] ? this.store.Blogs[this.store.BlogSelected - 1 ] : {}
    }
  },
  mounted(){
    console.log("view mounted:",window.matchMedia('(prefers-color-scheme: dark)'))

    this.$nextTick(()=>{
      this.$refs.content.innerHTML = this.store.Blogs[this.store.BlogSelected - 1].content
      /* console.log(this.$refs.content) */
    })
  },
  beforeUnmount(){
    console.log("view Unmounted:")
    store.selectBlog(null)
  }

}
</script>
<style scoped>
.action{
  background: var(--vt-green-text);
  background: linear-gradient(180deg, var(--vt-green-text) 0%, rgba(255,255,255,1) 95%);
}
</style>
