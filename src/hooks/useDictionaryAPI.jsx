function useDictionaryAPI() {

  const isWord = async (word) => {
    try {
      let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      response = await response.json()

      if(response.length > 0 && response[0].hasOwnProperty("word")) {
        return true
      } 
      return false

    } catch (error) {
      return false
    }
  }

  return{
    isWord
  }
}

export default useDictionaryAPI