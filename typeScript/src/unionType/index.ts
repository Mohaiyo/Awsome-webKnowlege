let unionType: number | string = '1'
unionType = 7

// unionType = false

// 访问联合类型的属性或者方法

// function getLength(buildingLength: string | number): number {
//   return buildingLength.length
// }

function getString(buildingLength: string | number): string {
  return buildingLength.toString()
}

