export class Marquee {
  static init() {
    this.container = document.body
    this.el = this.container.querySelector('img')

    this.containerBox = this.container.getBoundingClientRect()
    this.elBox = this.el.getBoundingClientRect()

    this.maxLeft = Math.floor(this.containerBox.width - this.elBox.width)
    this.maxTop = Math.floor(this.containerBox.height - this.elBox.height)
    
    const horizontalDuration = this.containerBox.width / 150
    const verticalDuration = this.containerBox.height / 150

    this.el.style.transition = `left ${horizontalDuration}s linear, top ${verticalDuration}s linear`

    this.el.addEventListener('transitionend', e => {
      // Waiting until the next tick ensures that we get the correct current
      // position of the element
      setTimeout(() => {
        this.bump()
      }, 0)
    })

    this.left = this.maxLeft
    this.top = this.maxTop
  }

  static set left(val) {
    this.el.style.left = `${val}px`
  }

  static set top(val) {
    this.el.style.top = `${val}px`
  }

  static bump() {
    const box = this.el.getBoundingClientRect()
    const boxLeft = Math.floor(box.left)
    const boxTop = Math.floor(box.top)

    console.log(boxLeft, this.maxLeft, boxTop, this.maxTop)

    if (boxLeft === 0) this.left = this.maxLeft
    if (boxLeft === this.maxLeft) this.left = 0
    if (boxTop === 0) this.top = this.maxTop
    if (boxTop === this.maxTop) this.top = 0
  }
}