<template>
  <section class="container mx-auto">
    <div >
      <h1 class="text-4xl py-2">Blogs:</h1>
    </div>  
    <div class="items content-start grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 w-full h-full ">
      <!--  -->
      <article 
        v-for="(blog,i) in store.Blogs"
        :key="i"
        class="card flex flex-col rounded-lg shadow-lg mx-auto my-2 p-8 w-72 sm:w-72 md:w-80 lg:w-[21rem] xl:w-96 "
        @click="view(blog.id)"
      >
        <div class="">
          <h1 class="md:text-lg lg:text-xl xl:text-2xl font-bold mb-4">
            {{ blog.title.slice(0,49) + '...' }}
          </h1>
        </div>
        <div class="">
          <p class="md:text-md xl:text-lg  mb-8">
            {{ blog.description.slice(0,110) + '...' }}
          </p>
        </div>
        <div class="mt-auto flex text-gray-300 ">
          <div>
            <span>By:{{ blog.by }}</span>
          </div>
          <div class="ml-auto ">{{ blog.date.toDateString() }}</div>

        </div>
      </article>
    </div>
  </section>
</template>
<script>
import { store } from '../../state/store.js'

export default {

  data() {
    return {
      store
    }
  },
  mounted(){
    console.log("blogs mounted:",window.matchMedia('(prefers-color-scheme: dark)'))
  },
  methods:{
    view(blogId){
      console.log("safsaf",blogId)
      let a = document.createElement("a")
      a.setAttribute("href","#/view-blog/"+blogId)
      store.selectBlog(blogId)
      a.click()
    }
  }
}
</script>
<style scoped>
.card{
  cursor: pointer;
  height: 20rem;
  background: var(--vt-green-text-hover);
  background: linear-gradient(0deg, var(--vt-green-text-hover) 0%, rgba(255,255,255,1) 58%);
  transition: all 300ms;
}

.card:hover{
  scale:1.05;
  box-shadow: 0 0 10px 8px rgba(62,117,62,0.7);
}
.view{
  background: var(--vt-green-text);
  transition: all 0.3s;

}
.view:hover{
  color: #fff;
  background: var(--vt-green-text-hover);
  
}
</style>
