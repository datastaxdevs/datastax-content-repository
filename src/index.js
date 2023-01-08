import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
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
    setHome(filterApps(results.data[0].all.apps))
  }

  const fetchWorkshops = async (filterlist) => {
    const results = await axios.get('/.netlify/functions/getCategory?tag=workshop')
    setWorkshops(filterApps(results.data[0].workshop.apps))
  }

  const fetchStarters = async (filterlist) => {
    const results = await axios.get('/.netlify/functions/getCategory?tag=starters')
    setStarters(filterApps(results.data[0].starters.apps))
  }

  const fetchData = async () => {
    const allTags = await axios.get('/.netlify/functions/getAllTags')
    let newtags = Object.values(allTags.data);
    newtags.sort((a, b) => b.count - a.count);
    setTags(Object.values(newtags))
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
    if (tagname === "all") {
      setFilters([])
      return;
    }

    if (filters) {
      if (filteredTag(tagname)) {
        setFilters(filters.filter(item => item !== tagname))
      } else {
        setFilters(arr => [...arr, tagname]);
      }
    }
  }

  const filterApps = (filterapps) => {
    if (filters === []) {
      return filterapps
    }
    let newapps = []
    apploop:
    for (const app of filterapps) {
      for (const tag of filters) {
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
        <div name="wrapper" className="row">
          <div name="Leftbar" className='col-3'>
            <LeftBar filters={filters} onClick={handleFilters} tagset={tagset} filteredTag={filteredTag} />
          </div>
          <div name="gallery cards" className='col-9'>
            <Switch>
              <Route path="/workshops" render={(props) => <Workshops apps={workshops} filters={filters} onClick={handleFilters} filteredTag={filteredTag} {...props} />} />
              <Route path="/starters" render={(props) => <StarterApps apps={starters} filters={filters} onClick={handleFilters} filteredTag={filteredTag} {...props} />} />
              <Route path="/" render={(props) => <Home apps={home} filters={filters} onClick={handleFilters} filteredTag={filteredTag} {...props} />} />
            </Switch>
          </div>
        </div>
      </HashRouter>
    </>
  )
}
export default App

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)