class Plane
    constructor: (opts) ->
        console.log(opts)
        @context = opts.context
        @position = opts.position
        @squareHeight = opts.squareHeight
        @startPosition = @position
        @droppingArea = opts.droppingArea
        @order = opts.order

        @matrixPosition = []

        @draggable = false
        @droppeable = true
        @deltaClickPosition = []

        @format = [[
              {'y': 0, 'x':2},
              {'y': 1, 'x':0},
              {'y': 1, 'x':1},
              {'y': 1, 'x':2},
              {'y': 1, 'x':3},
              {'y': 1, 'x':4},
              {'y': 2, 'x':2},
              {'y': 3, 'x':1},
              {'y': 3, 'x':2},
              {'y': 3, 'x':3},
            ]]
        @orientation = 0
        @fillStyle = "#71b44b"
        @collesionFillStyle = '#FFF'

        @m_canvas = document.createElement('canvas')
        @m_canvas.width = 1000
        @m_canvas.height = 500

        @drawRenderedPlane()

    drawRenderedPlane: ->
        m_context = @m_canvas.getContext('2d')
        m_context.fillStyle = @fillStyle
        for component in @format[@orientation]
            x = component.x * @squareHeight
            y = component.y * @squareHeight
            m_context.fillRect x, y, @squareHeight, @squareHeight

        @draw()

    draw: ->
        @context.drawImage(@m_canvas, @position.top, @position.left)

    setPosition: (newPosition) ->
        @clearRect()
        @position = newPosition
        @draw()

    clearRect: ->
        @context.clearRect @position.top, @position.left, @squareHeight * 5, @squareHeight * 5


    checkMouseDown: (e) ->
        x = e.layerX
        y = e.layerY
        console.log(x, @position.top, e, @context)
        for component in @format[@orientation]
            componentX = component.x * @squareHeight + @position.top

            componentY = component.y * @squareHeight + @position.left
            if x >= componentX and y >= componentY and x <= componentX + @squareHeight and y <=componentY + @squareHeight
                @deltaClickPosition =
                    x: x - @position.top
                    y: y - @position.left
                @draggable = true
                return true

        @draggable = false
        return false

    movePlane: (e) ->
        if @draggable
            x = e.layerX
            y = e.layerY

            newPosition =
                top: x - @deltaClickPosition.x
                left: y - @deltaClickPosition.y

            if @checkDropPosition newPosition
                @adjustPosition newPosition
                return true
            else
                @setPosition newPosition
                return false

    setMatrixPosition: ->
        @matrixPosition = []
#       line:0 column:0 in pixels of the plane
        x = @position.top / @squareHeight
        y = @position.left / @squareHeight

        for component in @format[@orientation]
            @matrixPosition.push
                x: x + component.x
                y: y + component.y


    adjustPosition: (newPosition) ->
        if newPosition.top % @squareHeight > @squareHeight / 2
            newPosition.top = parseInt(newPosition.top / @squareHeight) * @squareHeight + @squareHeight
        else
            newPosition.top = parseInt(newPosition.top / @squareHeight) * @squareHeight

        if newPosition.left % @squareHeight > @squareHeight / 2
            newPosition.left = parseInt(newPosition.left / @squareHeight) * @squareHeight+ @squareHeight
        else
            newPosition.left = parseInt(newPosition.left / @squareHeight) * @squareHeight

        @setPosition(newPosition)
        @setMatrixPosition()


    checkDropPosition: (newPosition) ->
        x = newPosition.top
        y = newPosition.left

        minX = @droppingArea.position.top - @squareHeight / 2
        minY = @droppingArea.position.left - @squareHeight / 2

        maxX = @droppingArea.width - @squareHeight * 5 + @squareHeight / 2
        maxY = @droppingArea.height - @squareHeight * 4 + @squareHeight / 2

#        check if plane is on the map

        if x > minX and x < maxX and y > minY and y < maxY
            return true
        else
            return false

    dropPlane: (e) ->
        if @droppeable
            @draggable = false
            if @checkDropPosition @position
                @adjustPosition @position
            else
                @setMatrixPosition()
                @setPosition(@startPosition)


window.Plane = Plane