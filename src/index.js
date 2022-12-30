import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route , Switch} from 'react-router-dom'
import Home from './pages/Home'
import Workshops from './pages/Workshops'
import Header from './components/Header'
import StarterApps from './pages/StarterApps'
import LeftBar from './components/LeftBar'
import "core-js/stable"
import "regenerator-runtime/runtime"
import './App.css'
import './index.css'
import './output.css'
import axios from 'axios'


const App = () => {
  const [tagset, setTags] = useState(null)
  const [filters, setFilters] = useState([]);
  const [starters, setStarters] = useState(null)
  const [workshops, setWorkshops] = useState(null)
  const [home, setHome] = useState(null)

  const fetchHomeApps = async (filterlist) => {
    const results = await axios.get('/.netlify/functions/getCategory?tag=all')
    console.log("HOME" + JSON.stringify(results.data[0]))
    setHome(filterApps(results.data[0].all.apps))
  }

  const fetchWorkshops = async (filterlist) => {
    const results = await axios.get('/.netlify/functions/getCategory?tag=workshop')
    console.log("WORKSHOP RAW" + JSON.stringify(results.data))
    console.log("WORKSHOP" + JSON.stringify(results.data[0].workshop.apps))
    setWorkshops(filterApps(results.data[0].workshop.apps))
  }

  const fetchStarters = async (filterlist) => {
    const results = await axios.get('/.netlify/functions/getCategory?tag=starter')
    setStarters(filterApps(results.data[0].starter.apps))
  }

  const fetchData = async () => {
    const results = await axios.get('/.netlify/functions/getTags')
  
    setTags(Object.values(results.data))
  }

  useEffect(() => {
    let filterlist = filters.join(',')
    fetchWorkshops(filterlist)
    fetchStarters(filterlist)
    fetchHomeApps(filterlist)
    fetchData()
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  function filteredTag(tagname) {
    return (filters.indexOf(tagname) !== -1)
  }

  const handleFilters = (tagname, e) => {
    e.preventDefault();
    console.log("TAGNAME " + tagname)

    if (filters) {
      if (tagname === "all") {
        setFilters()
      }
      if(filteredTag(tagname)){
        setFilters(filters.filter(item => item !== tagname))        
      } else {
       // console.log("Adding filter for" + tag.name)
        setFilters( arr => [...arr, tagname]);
      }
     //console.log(filters)
    }
  }
   
  const filterApps = (filterapps) => {
    if (filters === []) {
      return filterapps
    }
    let newapps = []
    console.log("Processing " + JSON.stringify(filterapps))
    apploop:
    for (const app of filterapps){
      console.log(JSON.stringify(app))
      for (const tag of filters) {
          console.log("Checking app for" + tag)
          if (app.tags.indexOf(tag) === -1) {
            continue apploop
        }
      }
      newapps.push(app)
    }
    return newapps
  }
  
  return (
    <>
      <HashRouter>
        <Header />
        <div className="row">
          <div className='col-2'>
        <LeftBar filters={filters} onClick={handleFilters} tagset={tagset} filteredTag={filteredTag}/>
        </div>
        <div className='col-9'>
            <Switch>
              <Route path= "/workshops" render={(props) => <Workshops apps={workshops} filters={filters} onClick={handleFilters} filteredTag={filteredTag} {...props}/> }/>
              <Route path= "/starters" render={(props) => <StarterApps apps={starters} filters={filters} onClick={handleFilters} filteredTag={filteredTag} {...props} /> }/>
              <Route path= "/" render={(props) => <Home apps={home} filters={filters} onClick={handleFilters} filteredTag={filteredTag} {...props} /> }/>
            </Switch>
            </div>
          </div>
     </HashRouter>
  </>
)}
export default App

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)