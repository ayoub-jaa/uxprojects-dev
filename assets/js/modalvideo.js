document.getElementById('closeVideoModal').addEventListener('click', () => {
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  modal.style.display = 'none';
  modalVideo.pause();
  modalVideo.currentTime = 0;
  modalVideo.src = '';
});