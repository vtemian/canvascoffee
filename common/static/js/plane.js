// Generated by CoffeeScript 1.2.1-pre
(function() {
  var Plane;

  Plane = (function() {

    Plane.name = 'Plane';

    function Plane(opts) {
      console.log(opts);
      this.context = opts.context;
      this.position = opts.position;
      this.squareHeight = opts.squareHeight;
      this.startPosition = this.position;
      this.droppingArea = opts.droppingArea;
      this.order = opts.order;
      this.matrixPosition = [];
      this.draggable = false;
      this.droppeable = true;
      this.deltaClickPosition = [];
      this.format = [
        [
          {
            'y': 0,
            'x': 2
          }, {
            'y': 1,
            'x': 0
          }, {
            'y': 1,
            'x': 1
          }, {
            'y': 1,
            'x': 2
          }, {
            'y': 1,
            'x': 3
          }, {
            'y': 1,
            'x': 4
          }, {
            'y': 2,
            'x': 2
          }, {
            'y': 3,
            'x': 1
          }, {
            'y': 3,
            'x': 2
          }, {
            'y': 3,
            'x': 3
          }
        ]
      ];
      this.orientation = 0;
      this.fillStyle = "#71b44b";
      this.collesionFillStyle = '#FFF';
      this.m_canvas = document.createElement('canvas');
      this.m_canvas.width = 1000;
      this.m_canvas.height = 500;
      this.drawRenderedPlane();
    }

    Plane.prototype.drawRenderedPlane = function() {
      var component, m_context, x, y, _i, _len, _ref;
      m_context = this.m_canvas.getContext('2d');
      m_context.fillStyle = this.fillStyle;
      _ref = this.format[this.orientation];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        component = _ref[_i];
        x = component.x * this.squareHeight;
        y = component.y * this.squareHeight;
        m_context.fillRect(x, y, this.squareHeight, this.squareHeight);
      }
      return this.draw();
    };

    Plane.prototype.draw = function() {
      return this.context.drawImage(this.m_canvas, this.position.top, this.position.left);
    };

    Plane.prototype.setPosition = function(newPosition) {
      this.clearRect();
      this.position = newPosition;
      return this.draw();
    };

    Plane.prototype.clearRect = function() {
      return this.context.clearRect(this.position.top, this.position.left, this.squareHeight * 5, this.squareHeight * 5);
    };

    Plane.prototype.checkMouseDown = function(e) {
      var component, componentX, componentY, x, y, _i, _len, _ref;
      x = e.layerX;
      y = e.layerY;
      console.log(x, this.position.top, e, this.context);
      _ref = this.format[this.orientation];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        component = _ref[_i];
        componentX = component.x * this.squareHeight + this.position.top;
        componentY = component.y * this.squareHeight + this.position.left;
        if (x >= componentX && y >= componentY && x <= componentX + this.squareHeight && y <= componentY + this.squareHeight) {
          this.deltaClickPosition = {
            x: x - this.position.top,
            y: y - this.position.left
          };
          this.draggable = true;
          return true;
        }
      }
      this.draggable = false;
      return false;
    };

    Plane.prototype.movePlane = function(e) {
      var newPosition, x, y;
      if (this.draggable) {
        x = e.layerX;
        y = e.layerY;
        newPosition = {
          top: x - this.deltaClickPosition.x,
          left: y - this.deltaClickPosition.y
        };
        if (this.checkDropPosition(newPosition)) {
          this.adjustPosition(newPosition);
          return true;
        } else {
          this.setPosition(newPosition);
          return false;
        }
      }
    };

    Plane.prototype.setMatrixPosition = function() {
      var component, x, y, _i, _len, _ref, _results;
      this.matrixPosition = [];
      x = this.position.top / this.squareHeight;
      y = this.position.left / this.squareHeight;
      _ref = this.format[this.orientation];
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        component = _ref[_i];
        _results.push(this.matrixPosition.push({
          x: x + component.x,
          y: y + component.y
        }));
      }
      return _results;
    };

    Plane.prototype.adjustPosition = function(newPosition) {
      if (newPosition.top % this.squareHeight > this.squareHeight / 2) {
        newPosition.top = parseInt(newPosition.top / this.squareHeight) * this.squareHeight + this.squareHeight;
      } else {
        newPosition.top = parseInt(newPosition.top / this.squareHeight) * this.squareHeight;
      }
      if (newPosition.left % this.squareHeight > this.squareHeight / 2) {
        newPosition.left = parseInt(newPosition.left / this.squareHeight) * this.squareHeight + this.squareHeight;
      } else {
        newPosition.left = parseInt(newPosition.left / this.squareHeight) * this.squareHeight;
      }
      this.setPosition(newPosition);
      return this.setMatrixPosition();
    };

    Plane.prototype.checkDropPosition = function(newPosition) {
      var maxX, maxY, minX, minY, x, y;
      x = newPosition.top;
      y = newPosition.left;
      minX = this.droppingArea.position.top - this.squareHeight / 2;
      minY = this.droppingArea.position.left - this.squareHeight / 2;
      maxX = this.droppingArea.width - this.squareHeight * 5 + this.squareHeight / 2;
      maxY = this.droppingArea.height - this.squareHeight * 4 + this.squareHeight / 2;
      if (x > minX && x < maxX && y > minY && y < maxY) {
        return true;
      } else {
        return false;
      }
    };

    Plane.prototype.dropPlane = function(e) {
      if (this.droppeable) {
        this.draggable = false;
        if (this.checkDropPosition(this.position)) {
          return this.adjustPosition(this.position);
        } else {
          this.setMatrixPosition();
          return this.setPosition(this.startPosition);
        }
      }
    };

    return Plane;

  })();

  window.Plane = Plane;

}).call(this);
