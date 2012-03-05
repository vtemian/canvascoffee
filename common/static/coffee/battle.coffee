class Battle
    constructor: (opts) ->
        @squareHeight = opts.squareHeight
        @gameHolder = opts.gameHolder

        @canvasWidth = @squareHeight * 10 * 2 + @squareHeight * 2
        @canvasHeight = @squareHeight * 10 + 5 * @squareHeight

        @map = null
        @collissions = null
        @frontend = null

    createMap: ->
        mapCanvas = document.createElement('canvas')
        mapCanvas.width = @canvasWidth
        mapCanvas.height = @canvasHeight

        @gameHolder.append(mapCanvas)

        context = mapCanvas.getContext('2d')
        @map = new Map({
            'context': context,
            'position': {'top': 0, 'left': 0},
            'squareHeight': @squareHeight
        })

    createCollissions:(frontend) ->
        collissionsCanvas = document.createElement('canvas')
        collissionsCanvas.width = @canvasWidth
        collissionsCanvas.height = @canvasHeight

        @gameHolder.append(collissionsCanvas)

        context = collissionsCanvas.getContext('2d')
        @collissions = new Collissions({
            'holder': @map,
            'context': context
            'canvas': collissionsCanvas
        })

        frontend.collissions  = @collissions

        collissionsCanvas.onmousedown = (e) ->
            frontend.checkMouseDown e
        collissionsCanvas.onmousemove = (e) ->
            frontend.checkMouseMove e
        collissionsCanvas.onmouseup = (e) ->
            frontend.checkMouseUp e

    createPlanes: ->
        for order in [0..2]
            planeCanvas = document.createElement('canvas')
            planeCanvas.width = @canvasWidth
            planeCanvas.height = @canvasHeight

            @gameHolder.append(planeCanvas)

            context = planeCanvas.getContext('2d')
            plane = new Plane({
                'context': context,
                'position': {'top': @squareHeight*11, 'left': (@squareHeight * 5 * order)},
                'squareHeight': @squareHeight,
                'droppingArea': @map,
                'order': order
            })
            @frontend.addPlane(plane)

    init: ->
        @createMap()

        @frontend = new Frontend(@map)

        @createPlanes()
        @createCollissions(@frontend)

    

window.Battle = Battle