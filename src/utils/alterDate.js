// change birthday
export const changeBirthday = (date, type = 1) => {
  const newBirthday = new Date(date)
  const day =
    newBirthday.getDate() < Number(10)
      ? `0${newBirthday.getDate()}`
      : newBirthday.getDate()
  const month =
    newBirthday.getMonth() + 1 < Number(10)
      ? `0${newBirthday.getMonth() + 1}`
      : newBirthday.getMonth() + 1
  const year = newBirthday.getFullYear()
  console.log(date)
  if (type === 1) {
    return `${day}/${month}/${year}`
  } else {
    return { day: day, month: month, year: year }
  }
}
