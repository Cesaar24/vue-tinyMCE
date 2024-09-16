<template>
  <header class="h-24 w-full content-center bg-white relative">
    <div class="absolute flex top-1/3 ">
      <div class="mx-2 transition duration-300 hover:scale-125 "><a href="#"><img src="/public/github-logo.png" alt="github" width="32px" height="32px"></a></div>
      <div class="mx-2 transition duration-300 hover:scale-125"><a href="#"><img src="/public/linkedin-icon.png" alt="linkedin" width="32px" height="32px"></a></div>
    </div>
    <div class="text-center ">
      <ul class="inline-flex ">
        <li class=" list-item p-5 mb-1 text-base "><a href="#/">Create blog</a></li>
        <li class=" list-item p-5 mb-1 text-base "><a href="#/view-blogs">View blogs</a></li>
      </ul>
    </div>
  </header>
  <component :is="currentView" />
  <footer class="fixed bottom-0 right-0 left-0 m-auto text-center bg-white">
    <div class="w-full text-end mt-auto p-2  ">
      <span class="text-xs lg:text-sm " >© 2024 - Todos los derechos reservados.</span>
    </div>
  </footer>
</template>
<script>
import Blogs from './components/pages/Blogs.vue'
import ViewBlog from './components/pages/ViewBlog.vue'
import Home from './components/index.vue'
import NotFound from './components/NotFound.vue'
/* const API_KEY = 'pra5i3co2jenfgfr0qgoanw3uup4itcc18jatxgw4y54g5s0' */
const routes = {
  '/': Home,
  '/view-blogs': Blogs,
  '/view-blog/': ViewBlog
}
export default {
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      let lenHash = this.currentPath.length > 11 && this.currentPath.slice(11,12) == '/'
      return routes[(lenHash && this.currentPath.slice(1,12)) || this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  mounted() { 
    window.addEventListener('hashchange', () => {
		  this.currentPath = window.location.hash
		})
  }
}
</script>
<style scoped>
.list-item{
  transition: ease-in-out 0.3s;
}
.list-item:hover{
  color: var(--vt-green-text);
  scale: 1.5;
  /* border-bottom: 1px solid var(--vt-green-text-hover); */
  cursor: pointer;
}



</style>
