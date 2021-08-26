interface Hand {
  width: number,
  height: number,
  length: number,
  weight?: number,
  name?: string,
  readonly id: number
}

let myHand: Hand = {
  width: 100,
  height: 20,
  length: 200,
  id: 1
}

myHand.id = 12321