/*
* Slider
* Visit http://createjs.com/ for documentation, updates and examples.
*
* Copyright (c) 2010 gskinner.com, inc.
* 
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the "Software"), to deal in the Software without
* restriction, including without limitation the rights to use,
* copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the
* Software is furnished to do so, subject to the following
* conditions:
* 
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
* OTHER DEALINGS IN THE SOFTWARE.
*/

(function () {

    /**
     * Simple slider control for EaselJS examples.
     **/
    function Slider(min, max, width, height) {
        this.Shape_constructor();

        // public properties:
        this.min = this.value = min || 0;
        this.max = max || 100;

        this.width = width || 100;
        this.height = height || 20;

        this.values = {};

        this.trackColor = "#EEE";
        this.thumbColor = "#666";

        this.cursor = "pointer";

        /**
         * 一种使用addEventListener的快捷方法，它使指定执行范围，使侦听器仅运行一次，将任意数据与侦听器关联以及删除侦听器变得更加容易。
         * 此方法通过创建一个匿名包装函数并使用addEventListener进行订阅来起作用。返回包装函数以与removeEventListener（或off）一起使用。
         * 
         * type 串
         * 事件的字符串类型。
         * listener 功能| 目的
         * 具有handleEvent方法的对象，或在分派事件时将调用的函数。
         * [scope] 对象 可选
         * 在其中执行侦听器的范围。对于函数侦听器，默认为调度程序/ currentTarget；对于对象侦听器，默认为侦听器本身（即，使用handleEvent）。
         * [once=false] 布尔型 可选
         * 如果为true，则侦听器将在第一次触发后将其自身删除。
         * [data] 可选的
         * 调用侦听器时将包含为第二个参数的任意数据。
         * [useCapture=false] 布尔型 可选
         * 对于冒泡的事件，指示是在捕获阶段还是冒泡/目标阶段监听事件。
         */
        this.on("mousedown", this._handleInput, this);
        this.on("pressmove", this._handleInput, this);
    }
    /**
     * extend(subclass  superclass)
     * 为新类设置原型链和构造函数属性。
     * 创建类构造函数后应立即调用此方法。
     * 
     * subclass 子类
     * superclass 扩展的超类
     */
    var p = createjs.extend(Slider, createjs.Shape);


    // public methods:
    p.isVisible = function () { return true; };

    /**
     * 将Shape绘制到指定的上下文中，而忽略其可见，alpha，阴影和变换。如果已处理绘制，则返回true（用于重写功能）。
     * @param {要绘制的画布2D上下文对象} ctx 
     * @param {指示绘图操作是否应忽略任何当前缓存。例如，用于绘制缓存（以防止它简单地将现有的缓存绘制回自身）} ignoreCache 
     */
    p.draw = function (ctx, ignoreCache) {
        if (this._checkChange()) {
            // 利用this.value 获取水平位置
            var x = (this.width - this.height) * Math.max(0, Math.min(1, (this.value - this.min) / (this.max - this.min)));
            this.graphics.clear()
                .beginFill(this.trackColor).drawRect(0, 0, this.width, this.height)
                .beginFill(this.thumbColor).drawRect(x, 0, this.height, this.height);
        }
        this.Shape_draw(ctx, true);
    };


    // private methods:
    p._checkChange = function () {
        var a = this, b = a.values;
        if (a.value !== b.value || a.min !== b.min || a.max !== b.max || a.width !== b.width || a.height !== b.height) {
            b.min = a.min;
            b.max = a.max;
            b.value = a.value;
            b.width = a.width;
            b.height = a.height;
            return true;
        }
        return false;
    };

    p._handleInput = function (evt) {
        var val = (evt.localX - this.height / 2) / (this.width - this.height) * (this.max - this.min) + this.min;
        val = Math.max(this.min, Math.min(this.max, val));
        if (val == this.value) { return; }
        this.value = val;
        this.dispatchEvent("change");
    };

    /**
     * 通过以format创建别名来提升超类上所有被覆盖的方法prefix_methodName。建议使用超类的名称作为前缀。始终以format添加超类的构造函数的别名prefix_constructor。这允许子类在不使用的情况下调用超类方法function.call，从而提供更好的性能。
     * 例如，如果MySubClassextendsMySuperClass都定义了一个draw方法，则调用promote(MySubClass, "MySuperClass") 将向MySuperClass_constructorMySubClass添加一个方法，并将该draw方法提升MySuperClass为MySubClassas的原型MySuperClass_draw。
     * 在完全定义了类的原型之后，应调用此方法。
     */
    window.Slider = createjs.promote(Slider, "Shape");
}());