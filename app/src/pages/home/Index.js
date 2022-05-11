
import axios from "axios"
import { useCallback, useContext, useEffect, useState } from 'react';
import GitList from "./GifList";
import PhraseList from "./PhraseList";
import { Serverless, Giphy } from "../../config"
import { UserContext } from "../../context/userContext";
import { ToastContainer, toast } from 'react-toastify';

const toastDefaultConfig = {
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
}

function Home() {

  const notifyAdd = () => toast.success("Frase adicionada com sucesso!", toastDefaultConfig);
  const notifyErrorAdd = (phrase) => toast.error(`Frase ${phrase} já foi adicionada`, toastDefaultConfig);
  const notifyRemove = (phrase) => toast.success(`Frase ${phrase} foi removida!`, toastDefaultConfig);

  const { signOut, user } = useContext(UserContext)

  const [phrase, setPhrase] = useState("")
  const [phrases, setPhrases] = useState([])
  const [gifs, setGifs] = useState([])

  useEffect(() => {
    init()
  }, [])

  async function init() {
    const result = await axios.post(Serverless.API.handler("/list-phrases"), { userId: user.id })
    setPhrases(result.data.body)
    getGifs(result.data.body)
  }

  async function getGifs(phrases) {
    phrases.forEach(async item => {
      const result = await axios.get(Giphy.API.handler(item.phrase))
      setGifs(state => [...state, { id: item.id, url: result.data.data[0].images.original.url }])
    })
  }

  async function addGif(id, phrase) {
    const result = await axios.get(Giphy.API.handler(phrase))
    setGifs(state => [{ id: id, url: result.data.data[0].images.original.url }, ...state])
  }

  async function deleteGif(id) {
    setGifs(state => state.filter(item => item.id !== id))
  }

  async function addPhrase() {
    try {
      const result = await axios.put(Serverless.API.handler("/create-phrase"), {
        userId: user.id,
        phrase
      })

      if(result.data.body.error) {
        return notifyErrorAdd(phrase)
      }

      setPhrase("")
      setPhrases(state => [...state, result.data.body])
      addGif(result.data.body.id, phrase)
      notifyAdd()

    } catch (error) {
      console.log(error)
    }
  }

  async function deletePhrase(id, name) {
    try {

      const result = await axios.post(Serverless.API.handler("/delete-phrase"), { userId: user.id, id })
      setPhrases(state => state.filter(item => item.id !== id))
      deleteGif(id)
      notifyRemove(name)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 40 }}>
        <button type="button" className="btn btn-light" onClick={_ => signOut()}>Sair</button>
      </div>
      <div className="row justify-content-center">
        <PhraseList
          phrases={phrases}
          phrase={phrase}
          setPhrase={setPhrase}
          addPhrase={addPhrase}
          deletePhrase={deletePhrase}
        />
      </div>
      <div className="row">
        <GitList gifs={gifs} />
      </div>
      <ToastContainer />
    </div>
  )
}

export default Home;
