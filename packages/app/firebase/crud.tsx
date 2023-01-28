import { db } from './firebaseInit'
import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  setDoc,
  doc,
  getDoc,
  query,
  getDocs,
  QueryConstraint,
} from 'firebase/firestore'
import { isType } from '../types'

type CreateRecordProps = {
  coll: string
  data: object
  id?: string
}

/**
 * Generic create record function. Adds createdAt, updatedAt fields with server timestamp
 * @param coll Collection name to insert the data
 * @param data object to insert as data
 * @param id (optional) id to use for new record
 * @returns Promise resolving to the ID of the new doc or an empty string on error
 */
export const createRecordAsync = async ({
  coll,
  data,
  id = undefined,
}: CreateRecordProps): Promise<string | null> => {
  try {
    const createData = {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }
    console.log(createData)
    if (id) {
      console.log(`Creating record ${id}`)
      await setDoc(doc(db, coll, id), createData)
      return id
    } else {
      const { id: newId } = await addDoc(collection(db, coll), createData)
      return newId
    }
    // logEvent("record_create", { ...data, _id: id, _coll: coll });
  } catch (e) {
    console.log(e)
    return null
  }
}

type UpdateRecordProps = {
  coll: string
  id: string
  newData: object
}
/**
 * Generic update record function. Updates updatedAt field with server timestamp
 * @param coll Collection to find said document
 * @param id Document ID to update
 * @param newData all fields in newData are updated into database
 * @returns Promise resolving to strings 'success' or 'failure'
 */
export const updateRecordAsync = async ({
  coll,
  id,
  newData,
}: UpdateRecordProps): Promise<'success' | 'error'> => {
  try {
    await updateDoc(doc(db, coll, id), {
      ...newData,
      updatedAt: serverTimestamp(),
    })

    // logEvent("record_update", { ...newData, _id: id, _coll: coll });
    return 'success'
  } catch (e) {
    console.log(e)
    return 'error'
  }
}

interface DeleteRecordProps {
  id: string
  coll: string
}
export const deleteRecordAsync = async ({
  id,
  coll,
}: DeleteRecordProps): Promise<'success' | 'error'> => {
  try {
    await deleteDoc(doc(db, coll, id))
    // logEvent("record_delete", { _id: id, _coll: coll });
    return 'success'
  } catch (e) {
    console.log(e)
    return 'error'
  }
}

export async function getRecordAsync<T extends object>({
  coll,
  id,
  exampleObj,
}: {
  coll: string
  id: string
  exampleObj?: object
}): Promise<T | null> {
  try {
    const newDoc = await getDoc(doc(db, coll, id))
    if (newDoc) {
      const newDocData = {
        ...newDoc.data({ serverTimestamps: 'estimate' }),
        id: newDoc.id,
      }
      if (exampleObj) {
        if (isType(newDocData as object, exampleObj)) {
          return newDocData as T
        } else {
          return null
        }
      } else {
        return newDocData as T
      }
    }
    return null
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function getRecordsAsync<T extends object>({
  coll,
  q,
  exampleObj,
}: {
  coll: string
  q: QueryConstraint[]
  exampleObj?: object
}): Promise<{
  out: T[]
  errors: T[]
  status: 'success' | 'error' | 'success_with_errors'
}> {
  try {
    const querySnapshot = await getDocs(query(collection(db, coll), ...q))
    const out = [] as T[]
    const errors = [] as T[]
    querySnapshot.forEach((record) => {
      const newRec = {
        ...record.data({ serverTimestamps: 'estimate' }),
        id: record.id,
      }
      if (exampleObj) {
        if (isType(newRec, exampleObj)) {
          out.push(newRec as T)
        } else {
          errors.push(newRec as T)
        }
      } else {
        out.push(newRec as T)
      }
    })
    if (errors.length > 0) {
      return { out, errors, status: 'success_with_errors' }
    }
    return { out, errors, status: 'success' }
  } catch (e) {
    console.log(e)
    return { out: [], errors: [], status: 'error' }
  }
}
