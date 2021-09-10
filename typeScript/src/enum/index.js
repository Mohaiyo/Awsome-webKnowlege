var Direction;
(function (Direction) {
    Direction[Direction["EAST"] = 0] = "EAST";
    Direction[Direction["SOUTH"] = 1] = "SOUTH";
    Direction[Direction["WEST"] = 2] = "WEST";
    Direction[Direction["NORTH"] = 3] = "NORTH";
})(Direction || (Direction = {}));
var direction = Direction.NORTH;
console.log(direction);
console.log(console.log(Direction[0]));
