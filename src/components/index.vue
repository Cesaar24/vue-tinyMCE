<template>
  <main class="main  rounded">
    <div class="w-full h-full overflow-y-scroll" ref="top">
      <section class="action relative h-full z-10 content-center">
        <div class="flex flex-wrap items-center">
          <div class="w-full px-4 lg:w-1/2">
            <div class="text-center lg:text-left ">
              <div class="mb-10 lg:mb-0 ml-4">
                <h1
                  class="mt-0 mb-3 text-3xl font-bold  sm:text-4xl sm:leading-tight md:text-[40px] md:leading-tight  ">
                  Start building automated serverless forms</h1>
              </div>
            </div>
          </div>
          <div class="w-full px-4 lg:w-1/2">
            <div class="text-center lg:text-right">
              <span class=" bg-[var(--vt-green-text)] hover:scale-110 hover:bg-[var(--vt-green-text-hover)] hover:text-white transition-all duration-200 cursor-pointer font-semibold rounded-lg mx-auto inline-flex items-center justify-center py-4 px-9 "
                @click="goBotton">
                Create Your First Form
              </span>
            </div>
          </div>
        </div>
      </section>
      
      <div class="container mx-auto form h-full mt-2" ref="formu">
        <form action="#" ref="formulate"  class="" >
          <div class="bg-white rounded-md">
            <div class="p-2">
              <span>Title: </span>
            </div>
            <div class="flex bg-inherit p-2">
              <input type="text" 
                
                v-model="title"
                @focusin="focus = true "
                @focusout="focus = false"
                class="bg-transparent h-10 w-72 rounded-lg ring-2 px-2 ring-gray-500 focus:ring-[var(--vt-green-text)] focus:outline-none"
              />
              
              <div
                class="w-48   rounded-lg shadow-lg ml-3"
                :class="[focus ? 'opacity-100 visible' : 'opacity-0 invisible']"
                
              >
                <p 
                  class="px-4 py-1  "
                  :class="[validate.title ? 'text-[var(--vt-green-text-hover)]':'']"
                > The title must be between 10 and 70 in length.</p>    
              </div>
            </div>
            <div class="p-2">
              <span>Description: </span>
            </div>
            <div class="flex bg-inherit p-2">
              <input type="text" 
                @focusin="focus = true"
                @focusout="focus = false"
                v-model="description"
                class=" bg-transparent h-10 w-72 rounded-lg ring-2 px-2 ring-gray-500 focus:ring-[var(--vt-green-text)] focus:outline-none"
              />
              <div
                class="w-48 rounded-lg shadow-lg ml-3"
                :class="[focus ? 'opacity-100 visible' : 'opacity-0 invisible']"
              >
                <p class="px-4  py-1"
                  :class="[validate.description ? 'text-[var(--vt-green-text-hover)]':'']"
                >The description must be between 10 and 200 in length</p>    
              </div>
            </div>
            <div class="p-2 mb-2">
              <span>Content:</span>

            </div>
          </div>
          <editor
            class="editor"
            v-model="texthtml"
            :api-key="api_key"
            :init="initConfigure"
          ></editor>
        </form>
      </div>
    </div>
  </main>
  <div class="bottom-0 right-0 left-0 m-auto text-center p-3 h-20 bg-white">
    <button id="button-upload" class="relative z-10 p-3 rounded-full button-send w-32 hidden" @click="uploadBlog">Upload Blog</button>
  </div>
  <div id="snackbar" class="bg-[var(--vt-green-text)] text-white p-4 rounded-md absolute bottom-6 z-20 right-6 flex justify-between items-center" style="display: none;">
    {{snackMessage}}
  </div>
</template>
<script>
import Editor from '@tinymce/tinymce-vue'
import { store } from '.././state/store.js'
export default {
  components:{
    Editor
  },
  data() {
    return {
      api_key:'pra5i3co2jenfgfr0qgoanw3uup4itcc18jatxgw4y54g5s0',
      texthtml:'',
      useDarkMode:window.matchMedia('(prefers-color-scheme: dark)').matches,
      initConfigure:{
        selector: 'textarea#classic',
        width: "100%",
        height: 600,
        resize: false,
        autosave_ask_before_unload: false,
        powerpaste_allow_local_images: true,
        plugins: [
          'image','preview,','code','advcode','advlist', 'anchor', 'autolink', 'codesample', 'fullscreen', 'help',
          'editimage','lists', 'link', 'media', 'powerpaste','searchreplace', 'table', 'tinymcespellchecker', 'visualblocks',
        ],
        toolbar: 'insertfile a11ycheck undo redo | bold italic | forecolor backcolor | codesample | alignleft aligncenter alignright alignjustify | bullist numlist | link image',
        image_title: true,
        file_picker_types: 'image',
        file_picker_callback: (cb, value, meta) => {
          let input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          input.onchange = function () {
            let file = this.files[0];
            let reader = new FileReader();
            reader.onload = function () {
              let id = 'blobid' + (new Date()).getTime();
              let blobCache =  tinymce.activeEditor.editorUpload.blobCache;
              let base64 = reader.result.split(',')[1];
              let blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);

              cb(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
          };

          input.click();
        },
      },
      store,
      title:'',
      description:'',
      snackMessage:'',
      focus:false

    }
  },
  /* plugins:'a11ychecker', */
  mounted(){
    console.log("app mounted:",window.matchMedia('(prefers-color-scheme: dark)'))

    this.$nextTick(()=>{
      const scrollTop = this.$refs.top
      const button = document.getElementById('button-upload')
      const formuOffsetHeight = this.$refs.formu.offsetHeight
      scrollTop.onscroll = () => {
        if (scrollTop.scrollTop >= formuOffsetHeight || scrollTop.scrollTop >= formuOffsetHeight) {
          button.classList.remove("hidden");
        } else {
          button.classList.add("hidden");
        }
      };
    })
  },
  computed:{
    validate(){
      return{
        title:this.title.length >= 10 && this.title.length <= 70,
        description:this.description.length >= 10 && this.description.length <= 200,
        content:this.texthtml.length >= 55
      }
    },
  },
  methods:{
    uploadBlog(){
      const valTitle = this.title.length >= 10 && this.title.length <= 70
      const valDescription = this.description.length >= 10 && this.description.length <= 200
      const valHtml = this.texthtml.length >= 55
      
      if(!(valTitle && valDescription && valHtml ) ){
        this.showSnackbar('Error')
        return
      }
      const newBlog = {
        id:this.store.Blogs.length + 1,
        by:'Admin',
        title:this.title,
        description:this.description,
        content:this.texthtml,
        date:new Date()
      }
      this.store.addBlog(newBlog)
      this.showSnackbar('Success')

      this.texthtml = ''
      this.title = ''
      this.description = ''
    },
    goBotton(){
      this.$refs.top.scrollTo({
        top: this.$refs.formu.offsetHeight,
        behavior: "smooth",
      })
    },
    showSnackbar(type) {
      let snackbar = document.getElementById("snackbar");

      if(type == 'Error'){
        snackbar.style.display = "block";
        snackbar.style.background = "red";
        this.snackMessage = "Input Error"
      }
      if(type == 'Success'){
        snackbar.style.display = "block";
        snackbar.style.background = "var(--vt-green-text)";
        this.snackMessage = "Blog upload success, go to view blogs to see"
      }
      setTimeout(function() {
        this.snackMessage = ""
        snackbar.style.display = "none";
      }, 3000)
    },
  }
}

</script>
<style scoped>
.main{
  height: calc(100% - 11rem);
}
.button-send{
  background: var(--vt-green-text);
  transition: all 0.3s;
}
.button-send:hover{
  color: #fff;
  background: var(--vt-green-text-hover);
  scale: 1.2;
}
.hidden{
  opacity: 0;
}
.action{
  background: var(--vt-green-text);
  background: linear-gradient(133deg, var(--vt-green-text) 0%, var(--vt-green-text) 25%, rgba(255,255,255,1) 59%);
}

</style>