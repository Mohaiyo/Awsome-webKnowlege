type name = string
type nameResolver = (name: string) => string

type nameOrNameResolver = name | nameResolver

function getName(n: nameOrNameResolver, name?: string): name {
  if (typeof n === 'string') {
    return n
  } else if (typeof n === 'function') {
    return n(name)
  }
}

// 类型别名用来给一个类型起个新名字。 类型别名常用于联合类型。