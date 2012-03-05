// Generated by CoffeeScript 1.2.1-pre
(function() {
  var Map;

  Map = (function() {

    Map.name = 'Map';

    function Map(opts) {
      this.context = opts.context;
      this.position = opts.position;
      this.squareHeight = opts.squareHeight;
      this.format = 9;
      this.fillStyle = "#000";
      this.strokeStyle = "red";
      this.strokeWidth = 2;
      this.width = (this.format + 1) * this.squareHeight;
      this.height = (this.format + 1) * this.squareHeight;
      this.draw();
    }

    Map.prototype.draw = function() {
      var column, line, x, y, _i, _ref, _results;
      console.log(this.format);
      this.context.fillStyle = this.fillStyle;
      this.context.strokeStyle = this.strokeStyle;
      this.context.lineWidth = this.strokeWidth;
      _results = [];
      for (line = _i = 0, _ref = this.format; 0 <= _ref ? _i <= _ref : _i >= _ref; line = 0 <= _ref ? ++_i : --_i) {
        _results.push((function() {
          var _j, _ref2, _results2;
          _results2 = [];
          for (column = _j = 0, _ref2 = this.format; 0 <= _ref2 ? _j <= _ref2 : _j >= _ref2; column = 0 <= _ref2 ? ++_j : --_j) {
            x = line * this.squareHeight + this.position.top;
            y = column * this.squareHeight + this.position.left;
            this.context.beginPath();
            this.context.rect(x, y, this.squareHeight, this.squareHeight);
            this.context.fill();
            _results2.push(this.context.stroke());
          }
          return _results2;
        }).call(this));
      }
      return _results;
    };

    return Map;

  })();

  window.Map = Map;

}).call(this);
