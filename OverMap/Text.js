(function () {

    let text, stage, angle

    let canvas = document.createElement('canvas')
    canvas.id = 'examCanvas'
    canvas.style.position = 'absolute'
    canvas.style.zIndex = 10

    canvas.style.pointerEvents = 'none'

    function init() {
        angle = 0
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        window.onresize = function () {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight

            text.set({ x: canvas.width / 2, y: canvas.height / 2 - text.getMeasuredLineHeight() })

            stage.update()
        }

        document.querySelector('#map_container')
            .insertBefore(canvas, document.querySelector('canvas'))

        stage = new createjs.Stage(canvas);

        text = new createjs.Text('新春快乐，🐂年大吉！', '48px 微软雅黑', '#d83516')
        text.x = canvas.width / 2
        text.y = canvas.height / 2 - text.getMeasuredLineHeight()
        text.textAlign = 'center'
        text.shadow = new createjs.Shadow('#8e562e', 5, 5, 5)

        stage.addChild(text)

        stage.update()

        createjs.Ticker.timingMode = createjs.Ticker.RAF
        createjs.Ticker.addEventListener('tick', tick)
    }

    function tick(event) {
        angle += 0.01
        let value = Math.sin(angle) * 360

        text.rotation = value
        text.scale = value / 360
        stage.update(event)
    }


    window.text = init
})()