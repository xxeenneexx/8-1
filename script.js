let highestZ = 1;
class Paper {
  holdingPaper = false;
  touchX = 0;
  touchY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;
  init(paper) {
    const moveHandler = (e) => {
      e.preventDefault();
      if (!this.rotating) {
        if (e.type === 'mousemove') {
          this.mouseX = e.clientX;
          this.mouseY = e.clientY;
          this.velX = this.mouseX - this.prevMouseX;
          this.velY = this.mouseY - this.prevMouseY;
        } else if (e.type === 'touchmove') {
          this.touchX = e.touches[0].clientX;
          this.touchY = e.touches[0].clientY;
          this.velX = this.touchX - this.prevTouchX;
          this.velY = this.touchY - this.prevTouchY;
        }
      }
      let dirX, dirY;
      if (e.type === 'mousemove') {
        dirX = e.clientX - this.mouseTouchX;
        dirY = e.clientY - this.mouseTouchY;
      } else if (e.type === 'touchmove') {
        dirX = e.touches[0].clientX - this.touchX;
        dirY = e.touches[0].clientY - this.touchY;
      }
      const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
      const dirNormalizedX = dirX / dirLength;
      const dirNormalizedY = dirY / dirLength;
      const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
      let degrees = 180 * angle / Math.PI;
      degrees = (360 + Math.round(degrees)) % 360;
      if (this.rotating) {
        this.rotation = degrees;
      }
      if (this.holdingPaper) {
        if (!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }
        if (e.type === 'mousemove') {
          this.prevMouseX = this.mouseX;
          this.prevMouseY = this.mouseY;
        } else if (e.type === 'touchmove') {
          this.prevTouchX = this.touchX;
          this.prevTouchY = this.touchY;
        }
        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    };
    
    paper.addEventListener('mousedown', (e) => {
      e.preventDefault();
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      paper.style.zIndex = highestZ;
      highestZ += 1;
      this.mouseTouchX = e.clientX;
      this.mouseTouchY = e.clientY;
      this.prevMouseX = this.mouseTouchX;
      this.prevMouseY = this.mouseTouchY;
    });

    paper.addEventListener('touchstart', (e) => {
      e.preventDefault();
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      paper.style.zIndex = highestZ;
      highestZ += 1;
      this.touchX = e.touches[0].clientX;
      this.touchY = e.touches[0].clientY;
      this.prevTouchX = this.touchX;
      this.prevTouchY = this.touchY;
    });

    paper.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

    window.addEventListener('mouseup', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });

    window.addEventListener('touchend', () => {
      this.holdingPaper = false;
      this.rotating = false;
    });

    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('touchmove', moveHandler);
  }
}
const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});
