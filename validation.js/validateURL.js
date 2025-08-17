const urlValidator = (url)=>{
  const regex = /^(ftp|http|https):\/\/[^ "]+$/
  return regex.test(url)
}

module.exports = urlValidator