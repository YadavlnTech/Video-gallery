

class VideoGallery {
    constructor() {
      this.API_KEY = 'M5RYCBRyyJ5t74rgXEt4drbqBXgHayn9TJ3jRqCYd5XgJv5Hg5TY31Yh';
      this.galleryDiv = document.querySelector('.gallery');
      this.searchForm = document.querySelector('.header form');
      this.searchInput = document.getElementById('search-input');
      this.suggestionsList = document.getElementById('suggestions-list');
      this.loadMore = document.querySelector('.load-more');
      this.logo = document.querySelector('.logo');
      this.videoModal = document.querySelector('.video-modal');
      this.videoElement = this.videoModal.querySelector('video');
      this.closeBtn = this.videoModal.querySelector('.close-btn');
      this.pageIndex = 1;
      this.searchValueGlobal = '';
      this.videos = [];
      this.eventHandle();
    }
  
    eventHandle() {
      document.addEventListener('DOMContentLoaded', () => {
        this.getVideos(1);
      });
  
      this.searchForm.addEventListener('submit', (e) => {
        this.pageIndex = 1;
        this.getSearchedVideos(e);
      });
  
    //   this.searchInput.addEventListener('input', (e) => {
    //     this.displaySuggestions(e.target.value);
    //   });
  
      this.loadMore.addEventListener('click', (e) => {
        this.loadMoreVideos(e);
      });
  
      this.logo.addEventListener('click', () => {
        this.pageIndex = 1;
        this.galleryDiv.innerHTML = '';
        this.getVideos(this.pageIndex);
      });
  
      this.closeBtn.addEventListener('click', () => {
        this.videoModal.classList.add('hidden');
        this.videoElement.pause();
      });
  
      window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          this.loadMoreVideos({ target: { getAttribute: () => this.loadMore.getAttribute('data-img') } });
        }
      });
    }
  
    async getVideos(index) {
      this.loadMore.setAttribute('data-img', 'curated');
      const baseURL = `https://api.pexels.com/videos/popular?page=${index}&per_page=12`;
      const data = await this.fetchMedia(baseURL);
      this.videos = data.videos;
      this.GenerateHTML(this.videos);
    }
  
    async fetchMedia(baseURL) {
      const response = await fetch(baseURL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: this.API_KEY,
        },
      });
      const data = await response.json();
      return data;
    }
  
    GenerateHTML(videos) {
      videos.forEach((video, index) => {
        const item = document.createElement('div');
        item.classList.add('item');
        item.innerHTML = `
          <video src="${video.video_files[0].link}" data-index="${index}" muted></video>
        `;
        item.addEventListener('click', () => this.openModal(index));
        this.galleryDiv.appendChild(item);
      });
    }
  
    async getSearchedVideos(e) {
      e.preventDefault();
      this.galleryDiv.innerHTML = '';
      this.searchValueGlobal = this.searchInput.value;
      const baseURL = `https://api.pexels.com/videos/search?query=${this.searchValueGlobal}&page=1&per_page=12`;
      const data = await this.fetchMedia(baseURL);
      this.videos = data.videos;
      this.GenerateHTML(this.videos);
      this.searchInput.value = '';
      this.suggestionsList.innerHTML = '';
    }
  
    async displaySuggestions(query) {
      if (query.length < 3) {
        this.suggestionsList.innerHTML = '';
        return;
      }
      const baseURL = `https://api.pexels.com/videos/search?query=${query}&per_page=5`;
      const data = await this.fetchMedia(baseURL);
      this.suggestionsList.innerHTML = '';
      data.videos.forEach(video => {
        const li = document.createElement('li');
        li.textContent = video.user.name; // Display video user name or any other relevant property
        li.addEventListener('click', () => {
          this.searchInput.value = video.user.name; // Set input value to the selected suggestion
          this.suggestionsList.innerHTML = ''; // Clear suggestions
          this.getSearchedVideosByTitle(video.user.name); // Search for videos by selected suggestion
        });
        this.suggestionsList.appendChild(li);
      });
    }
  
    async getSearchedVideosByTitle(title) {
      this.galleryDiv.innerHTML = '';
      const baseURL = `https://api.pexels.com/videos/search?query=${title}&page=1&per_page=12`;
      const data = await this.fetchMedia(baseURL);
      this.videos = data.videos;
      this.GenerateHTML(this.videos);
    }
  
    async loadMoreVideos(e) {
      let index = ++this.pageIndex;
      const loadMoreData = e.target.getAttribute('data-img');
      if (loadMoreData === 'curated') {
        this.getVideos(index);
      } else {
        this.getMoreSearchedVideos(index);
      }
    }
  
    async getMoreSearchedVideos(index) {
      const baseURL = `https://api.pexels.com/videos/search?query=${this.searchValueGlobal}&page=${index}&per_page=12`;
      const data = await this.fetchMedia(baseURL);
      this.videos = data.videos;
      this.GenerateHTML(this.videos);
    }
  
    openModal(index) {
      const videoSrc = this.videos[index].video_files[0].link;
      this.videoElement.src = videoSrc;
      this.videoModal.classList.remove('hidden');
      this.videoElement.play();
    }
  }
  
  const gallery = new VideoGallery();
  