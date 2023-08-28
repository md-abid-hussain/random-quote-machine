import {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareTwitter, faSquareInstagram } from '@fortawesome/free-brands-svg-icons'
import quoteApi from './api'

function App() {
  const [quote,setQuote] = useState('')
  const [author,setAuthor] = useState('')

  const colors = ['#183D3D','#4D3C77','#19376D','#3C2A21','#A13333','#B85C38','#A12568','#1597BB','#F39422','#F9D276']
  const [currentColor,setCurrentColor] = useState('gray')

  const setRandomColor = ()=>{
    let random = Math.floor(Math.random() * colors.length);
    setCurrentColor(colors[random])
  }

  const backgroundChange = {
    background:currentColor,
    transition:'all 2s'
  }

  const colorChange = {color:currentColor, transition:'all 2s'}

  const fetchQuote = async ()=>{
    try{
      const response = await quoteApi.get('/random')
      setRandomColor()
      setQuote(response.data.content)
      setAuthor(response.data.author)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    fetchQuote()
  },[])

  return (
    <section className={`min-h-screen grid place-content-center text-center`} style={backgroundChange}>

      <div id="quote-box" className='w-[600px] bg-white p-10 rounded-lg'>

        <h1
          className='text-2xl '
          id="text"
          style={colorChange}
        >{quote}</h1>

        <p
          className='text-right before:content-["\2014"] py-5'
          id="author"
          style={colorChange}
        >{author}</p>

        <section
          className='flex items-center'
        >
          <div className='flex gap-2'>
            <a href="#" className='text-[53px]' style={colorChange}><FontAwesomeIcon icon={faSquareTwitter}/></a>
            <a href="#" className='text-[53px]' style={colorChange}><FontAwesomeIcon icon={faSquareInstagram}/></a>
          </div>

          <button
            className='ml-auto text-white p-[0.75rem] rounded hover:opacity-75'
            id="new-quote"
            style={backgroundChange}
            onClick={fetchQuote}
          >New Quote</button>

        </section>
      </div>
      <footer className='sticky bottom-0 text-center my-[1rem] text-white'>Made by -<a href="https://github.com/md-abid-hussain" target='blank' className='hover:underline'>MD ABID HUSSAIN</a></footer>
    </section>
  )
}

export default App
