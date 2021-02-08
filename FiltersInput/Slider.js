(function () {
    /**
     * 定义滑块shape类
     * @param {最小值} min 
     * @param {最大值} max 
     * @param {元素宽度} width 
     * @param {元素高度} height 
     */
    function Slider(min, max, width, height) {
        this.Shape_constructor()

        this.min = this.value = min || 0
        this.max = max || 100
        this.width = width || 100
        this.height = height || 20

        this.values = {}

        this.trackColor = '#eee'
        this.thumbColor = '#666'

        this.cursor = 'pointer'

        this.on('mousedown', this._handleInput, this)
        this.on('pressmove', this._handleInput, this)
    }

    let p = createjs.extend(Slider, createjs.Shape)

    p.isVisible = function () { return true }

    p.draw = function (ctx, ignoreCache) {
        if (this._checkChange()) {
            let x = (this.width - this.height) * Math.min(1, Math.max(0, (this.value - this.min) / (this.max - this.min)))
            this.graphics.clear()
                .beginFill(this.trackColor).drawRect(0, 0, this.width, this.height)
                .beginFill(this.thumbColor).drawRect(x, 0, this.height, this.height)
        }

        this.Shape_draw(ctx, true)
    }

    p._checkChange = function () {
        if (this.values.value != this.value) {
            this.values.value = this.value
            return true
        }
        return false
    }

    /**
     * 处理滑块上的鼠标事件
     * @param {触发事件对象} evt 
     */
    p._handleInput = function (evt) {
        let val = (evt.localX - this.height / 2) / (this.width - this.height) * (this.max - this.min) + this.min
        val = Math.max(Math.min(val, this.max), this.min)

        if (this.value == val) {
            return
        }

        this.value = val
        this.dispatchEvent('change')
    }
    
    window.Slider = createjs.promote(Slider, 'Shape')
})()