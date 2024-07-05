hosted link-
https://yadavlntech.github.io/Video-gallery/


# Video Browsing Web App

## Description
This web application allows users to browse popular videos, search for specific videos, view them in a modal, and manage a favorites list. It features a responsive design and integrates with the Pexels API to fetch video content.

## Features
- **Browse Videos:** View a list of popular videos fetched from the Pexels API.
- **Search Videos:** Search for specific videos using keywords.
- **Pagination:** Load more videos with a pagination feature to enhance browsing.
- **Full-Screen Modal:** Watch videos in a full-screen modal for an immersive experience.
- **Favorites List:** Add and remove videos from a personal favorites list for easy access.

## Technologies Used
- **Frontend:** HTML, CSS, JavaScript, React
- **Backend:** Node.js, Express
- **API Integration:** Pexels API
- **State Management:** Redux (optional)
- **Styling:** CSS, Bootstrap (or any other CSS framework)
- **Build Tool:** Webpack (or any other build tool)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/YadavInTech/video-gallery.git
    cd video-gallery
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env` file in the root directory and add the following:
    ```env
    REACT_APP_PEXELS_API_KEY=***
    ```

4. Start the development server:
    ```bash
    npm start
    ```

## Usage

1. **Browse Videos:** Open the app and browse through the list of popular videos.
2. **Search Videos:** Use the search bar to find videos by keywords.
3. **Load More Videos:** Scroll down to load more videos with the pagination feature.
4. **Watch Videos:** Click on a video to open it in a full-screen modal.
5. **Manage Favorites:** Add videos to your favorites list and remove them as needed.


## Testing

To run tests (if applicable):
```bash
npm test

