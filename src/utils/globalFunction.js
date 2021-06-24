export const missingFieldsCheckOut = (fields) => {
  let keys = Object.keys(fields)
  let missingFields = ''
  if (keys?.length > 0) {
    keys.map((val) => {
      if (fields[val].length > 0) {
      } else {
        missingFields += missingFields.length > 0 ? `, ${val}` : val
      }
    })
  } else {
    return ''
  }
  return missingFields
}
