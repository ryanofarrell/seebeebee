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
    if (typeof objKey === undefined) {
      throw new Error('objKey is undefined')
    }
    if (typeof exampleObjKey === undefined) {
      throw new Error('exampleObjKey is undefined')
    }

    if (objKey !== exampleObjKey) {
      return false
    }
    const val = obj[objKey as keyof object] as object
    const exampleVal = exampleObj[exampleObjKey as keyof object] as object
    if (getType(val) !== getType(exampleVal)) {
      console.log('type mismatch on key ' + objKey + ', not same type')
      console.log(`val: ${val}`)
      console.log(`exampleVal: ${exampleVal}`)

      return false
    }
    const type = getType(val)
    if (type === 'array') {
      console.log('recursing due to array!')
      const arrayExample = exampleVal[0]
      // Recursively loop through
      for (let j = 0; j < val.length; j++) {
        const arrayVal = val[j]
        if (!isType(arrayVal, arrayExample)) {
          return false
        }
      }
    }
  }
  return true
}

import { SeasonTeam, exampleSeasonTeam } from './DataTypes'

export { isType, SeasonTeam, exampleSeasonTeam }
