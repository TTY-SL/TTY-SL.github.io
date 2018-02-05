const appId = 'eb7df7e8ae6565baede162883238dae9a5516b5b19a2140f05519f92f3fca78f';

new Vue({
  el: '#app',
  data: {
    photos: [],
    totalPhotos: 0,
    perPage: 9,
    currentPage: 1
  },
  
  methods: {
    fetchPhotos: function(page){
      let option = {
        params: {
          client_id: appId,
          page: page,
          per_page: this.perPage
        }
      }
      this.$http.get('https://api.unsplash.com/photos', option).then(function(response){
        this.photos= response.data;
        this.totalPhotos = parseInt(response.headers.get('x-total'));
        this.currentPage = page
      },console.log);
    }
  },
  created: function(){
    this.fetchPhotos(this.currentPage)
  }
})