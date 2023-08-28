import * as go from 'gojs';

// custom shape for gender badge panel
export const registerCustomShapes = () => {
  go.Shape.defineFigureGenerator(
    'RoundedBottomRectangle',
    function (shape, w, h) {
      // this figure takes one parameter, the size of the corner
      let p1 = 5; // default corner size
      if (shape !== null) {
        const param1 = shape.parameter1;
        if (!isNaN(param1) && param1 >= 0) p1 = param1;
      }
      p1 = Math.min(p1, w / 2);
      p1 = Math.min(p1, h / 2); // limit by whole height or by half height?
      const geo = new go.Geometry();
      // a single figure consisting of straight lines and quarter-circle arcs
      geo.add(
        new go.PathFigure(0, 0)
          .add(new go.PathSegment(go.PathSegment.Line, w, 0))
          .add(new go.PathSegment(go.PathSegment.Line, w, h - p1))
          .add(
            new go.PathSegment(
              go.PathSegment.Arc,
              0,
              90,
              w - p1,
              h - p1,
              p1,
              p1,
            ),
          )
          .add(new go.PathSegment(go.PathSegment.Line, p1, h))
          .add(
            new go.PathSegment(
              go.PathSegment.Arc,
              90,
              90,
              p1,
              h - p1,
              p1,
              p1,
            ).close(),
          ),
      );
      // don't intersect with two bottom corners when used in an "Auto" Panel
      geo.spot1 = new go.Spot(0, 0, 0.3 * p1, 0);
      geo.spot2 = new go.Spot(1, 1, -0.3 * p1, -0.3 * p1);
      return geo;
    },
  );
};
