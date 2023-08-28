export const onMouseEnterPart = (_: go.InputEvent, obj: go.GraphObject) => {
  obj.part && (obj.part.isHighlighted = true);
};

export const onMouseLeavePart = (_: go.InputEvent, obj: go.GraphObject) => {
  obj.part && (obj.part.isHighlighted = false);
};
