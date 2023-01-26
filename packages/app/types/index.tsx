const getType = (v: object) => {
  if (Array.isArray(v)) {
    return 'array'
  } else if (v === null) {
    return 'null'
  } else {
    return typeof v
  }
}

const isType = (obj: object, exampleObj: object) => {
  // TODO recursive check for nested objects and arrays
  const objKeys = Object.keys(obj).sort()
  const exampleObjKeys = Object.keys(exampleObj).sort()
  // check if every key in exampleObj is in obj
  if (objKeys.length !== exampleObjKeys.length) {
    console.log('keys length mismatch, not same type')
    // Get the keys that are in exampleObj but not in obj, and vice versa
    const extraKeys = exampleObjKeys.filter((x) => !objKeys.includes(x))
    const missingKeys = objKeys.filter((x) => !exampleObjKeys.includes(x))
    console.log(`extraKeys: ${extraKeys}`)
    console.log(`missingKeys: ${missingKeys}`)
    return false
  }
  for (let i = 0; i < objKeys.length; i++) {
    const objKey = objKeys[i]
    const exampleObjKey = exampleObjKeys[i]
    if (objKey !== exampleObjKey) {
      return false
    }
    if (
      getType(obj[objKey as keyof object]) !== getType(exampleObj[exampleObjKey as keyof object])
    ) {
      return false
    }
  }
  return true
}

export { isType }
