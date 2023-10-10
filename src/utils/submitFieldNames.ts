const submitFieldNames = (
  fieldNames: string[],
  submit: (values: any) => any
) => {
  return (e: any) => {
    e.preventDefault()
    let res: any = {}

    fieldNames.forEach(fieldName => {
      res[fieldName] = (e.target as any)[fieldName].value
    })

    submit(res)
  }
}


export default submitFieldNames
