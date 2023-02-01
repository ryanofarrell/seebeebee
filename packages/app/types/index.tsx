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
  // Get the type of each object
  const objType = getType(obj)
  const exampleObjType = getType(exampleObj)
  // console.log(obj)
  // console.log(`objType: ${objType}`)
  // console.log(exampleObj)
  // console.log(`exampleObjType: ${exampleObjType}`)
  // Check if the types are the same
  if (objType !== exampleObjType) {
    console.log('types mismatch, not same type')
    console.log(`objType: ${objType}`)
    console.log(`exampleObjType: ${exampleObjType}`)
    return false
  }
  // If the types are both objects, check if the keys are the same
  if (objType === 'object') {
    const objKeys = Object.keys(obj).sort()
    const exampleObjKeys = Object.keys(exampleObj).sort()
    // console.log(`objKeys: ${objKeys}`)
    // console.log(`exampleObjKeys: ${exampleObjKeys}`)
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
    // Loop through each key and check if the value is the same type
    for (let i = 0; i < objKeys.length; i++) {
      const objKey = objKeys[i]
      const exampleObjKey = exampleObjKeys[i]
      if (typeof objKey === undefined) {
        throw new Error('objKey is undefined')
      }
      if (typeof exampleObjKey === undefined) {
        throw new Error('exampleObjKey is undefined')
      }
      // console.log(`objKey: ${objKey}`)
      if (objKey !== exampleObjKey) {
        return false
      }
      const val = obj[objKey as keyof object] as object
      const exampleVal = exampleObj[exampleObjKey as keyof object] as object

      // Check if the type is the same
      if (!isType(val, exampleVal)) {
        return false
      }
    }
  }

  // If the types are both arrays, check if the length is the same
  else if (objType === 'array') {
    const exampleVal = exampleObj[0] as object
    for (let i = 0; i < obj.length; i++) {
      const val = obj[i] as object
      if (!isType(val, exampleVal)) {
        return false
      }
    }
  }

  // If the types are both null, return true
  else if (objType === 'null') {
    return true
  }

  // Otherwise, return true
  return true
}

import { SeasonTeam, exampleSeasonTeam, Team, exampleTeam } from './DataTypes'

export { isType, SeasonTeam, exampleSeasonTeam, Team, exampleTeam }
