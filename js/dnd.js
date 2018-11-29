export class DragAndDrop {
  static init() {
    this.el = document.querySelector('img')
    this.elBox = this.el.getBoundingClientRect()
    this.viewport = document.body.getBoundingClientRect()

    this.dragging = false
    this.offsetLeft = 0
    this.offsetTop = 0
    this.maxLeft = Math.floor(this.viewport.width - this.elBox.width)
    this.maxTop = Math.floor(this.viewport.height - this.elBox.height)

    this.el.ondragstart = () => false

    this.el.addEventListener('mousedown', e => {
      this.dragStart(e)
    })

    document.addEventListener('mousemove', e => {
      this.dragMove(e)
    })

    document.addEventListener('mouseup', e => {
      this.dragStop(e)
    })

    document.addEventListener('mouseleave', e => {
      this.dragStop(e)
    })
  }

  static dragStart(e) {
    this.dragging = true
    this.originLeft = e.clientX
    this.originTop = e.clientY
  }

  static dragMove(e) {
    if (!this.dragging) {
      return
    }

    let left = Math.floor(e.clientX - this.originLeft + this.offsetLeft)
    let top = Math.floor(e.clientY - this.originTop + this.offsetTop)

    if (left < 0) left = 0
    if (left > this.maxLeft) left = this.maxLeft
    if (top < 0) top = 0
    if (top > this.maxTop) top = this.maxTop

    this.el.style.top = `${top}px`
    this.el.style.left = `${left}px`
  }

  static dragStop(e) {
    if (!this.dragging) {
      return
    }

    this.offsetLeft = Math.floor(e.clientX - this.originLeft + this.offsetLeft)
    this.offsetTop = Math.floor(e.clientY - this.originTop + this.offsetTop)

    this.dragging = false
  }
}