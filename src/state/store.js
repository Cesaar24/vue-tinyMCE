import { reactive } from 'vue'

export const store = reactive({
  Blogs: [],
  addBlog(blog) {
    this.Blogs.push(blog)
  },
  BlogSelected:null,
  selectBlog(blogId) {
    this.BlogSelected = blogId
  },
})