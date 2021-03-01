(function () {
    /**
     * 定义非规则闭合图形的类
     */
    function Irregular(points, center, fill, stroke) {
        this.Shape_constructor()

        this.points = points || '0,0 0,100,50,50'
        this.fill = fill || 'rgb(255,255,255)'
        this.stroke = stroke || 'rgb(0,0,0)'
        this.center = center || { x: 0, y: 0 }

        this.x = this.center.x
        this.y = this.center.y
    }

    let p = createjs.extend(Irregular, createjs.Shape)

    p.isVisible = function () { return true }

    p.draw = function (ctx, ignoreCache) {
        this.graphics.clear()
            .f(this.fill).s(this.stroke)
        this.points.split(' ').forEach((point, index) => {
            let [mapX, mapY] = point.split(',')
            let { x, y } = this.center
            index == 0 ? this.graphics.mt(mapX - x, mapY - y) : this.graphics.lt(mapX - x, mapY - y)
        })

        this.Shape_draw(ctx, true)
    }

    createjs.Irregular = createjs.promote(Irregular, 'Shape')
})()