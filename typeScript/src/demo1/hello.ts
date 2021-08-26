function sayPersonHello(person: string) {
  console.log('person', person)
  return `Hello: ${person}`
}

let user = 'Tom'

sayPersonHello(user)