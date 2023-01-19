import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Workshops from './pages/Workshops'
import Header from './components/Header'
import StarterApps from './pages/StarterApps'
import SampleApps from './pages/SampleApps'
import DataTools from './pages/DataTools'
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
  const [samples, setSamples] = useState(null)
  const [datatools, setDataTools] = useState(null)
  const [starters, setStarters] = useState(null)
  const [workshops, setWorkshops] = useState(null)
  const [home, setHome] = useState(null)
  const [slugs, setSlugs] = useState([])

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
    console.log("RESULTS: " + JSON.stringify(results.data))
    setStarters(filterApps(results.data[0].starters.apps))
  }

  const fetchSamples = async (filterlist) => {
    const results = await axios.get('/.netlify/functions/getCategory?tag=apps')
    setSamples(filterApps(results.data[0].apps.apps))
  }

  const fetchDataTools = async (filterlist) => {
    const results = await axios.get('/.netlify/functions/getCategory?tag=tools')
    setDataTools(filterApps(results.data[0].tools.apps))
  }

  const fetchData = async () => {
    const allTags = await axios.get('/.netlify/functions/getAllTags')
    let newtags = Object.values(allTags.data);
    newtags.sort((a, b) => b.count - a.count);
    setTags(Object.values(newtags))
    await setSections(newtags)
  }

  /*
  This section is to build the left navigation pane.
  Tags are separated by section, and the sections are
  closed to start with.  When a tag is selected on a
  card the appropriate section opens on the left, and
  the displayed applications are filtered by that tag
  */

  const [showLang, setLang] = useState(false)
  const [showAPI, setAPI] = useState(false)
  const [showFrame, setFrame] = useState(false)
  const [showInt, setInt] = useState(false)
  const [showTech, setTech] = useState(false)
  const [showUse, setUse] = useState(false)
  const [showOther, setOther] = useState(false)
  const [section, setSection] = useState({})

  const showHide = {
    showAPI: showAPI,
    setAPI: setAPI,
    showLang: showLang,
    setLang: setLang,
    showInt: showInt,
    setInt: setInt,
    showTech: showTech,
    setTech: setTech,
    showOther: showOther,
    setOther: setOther,
    showFrame: showFrame,
    setFrame: setFrame,
    showUse: showUse,
    setUse: setUse
  }

  let languages = []
  let frameworks = []
  let apis = []
  let secret = []
  let other = []
  let integrations = []
  let technology = []
  let usecases = []

  const setSections = async (tagset) => {
    let sections = {}

    for (let tag in tagset) {
      let tagobj = tagset[tag]
      if (["javascript", "csharp", "java", "nodejs", "python", "c#", "scala", "ios", "android"].includes(tagobj.name)) {
        languages.push(tagobj)
        sections[tagset[tag]["name"]] = "languages"
        console.log("SET LANGUAGES FOR " + tagset[tag]["name"])
      } else if (["doc api", "graphql api", "rest api", "gprc api", "devops-apis"].includes(tagobj.name)) {
        apis.push(tagobj)
        sections[tagset[tag]["name"]] = "apis"
      } else if (["workshop", "apps", "starters", "dev", "tools", "examples", "building-sample-apps"].includes(tagobj.name)) {
        secret.push(tagobj)
      } else if (["selenium", "react", "spring", "django", "nextjs", "nestjs", "angular", "redux", "webflux", "elixir", "serverless-framework", "streaming", "video"].includes(tagobj.name)) {
        frameworks.push(tagobj)
        sections[tagset[tag]["name"]] = "frameworks"
      } else if (["kubernetes", "k8ssandra", "cql", "nosql", "astradb", "dse", "cassandra", "fastapi", "datastax", "keyspaces"].includes(tagobj.name)) {
        technology.push(tagobj)
        sections[tagset[tag]["name"]] = "technology"
      } else if (["eddiehub", "jamstack", "netlify", "gitpod", "template", "google-cloud"].includes(tagobj.name)) {
        integrations.push(tagobj)
        sections[tagset[tag]["name"]] = "integrations"
      } else if (["change data capture", "ansible-playbooks", "machine learning", "graph", "ai", "game", "performance testing", "ds-bulk", "timeseries db", "killrvideo", "devops"].includes(tagobj.name)) {
        usecases.push(tagobj)
        sections[tagset[tag]["name"]] = "usecases"
      } else {
        other.push(tagobj)
        sections[tagset[tag]["name"]] = "other"
      }
    }
    setSection(sections)

  }

  const resetFilters = () => {
    setLang(false)
    setTech(false)
    setInt(false)
    setAPI(false)
    setFrame(false)
    setUse(false)
    setOther(false)
    setFilters([])
  }

  useEffect(() => {
    let filterlist = filters.join(',')
    fetchWorkshops(filterlist)
    fetchStarters(filterlist)
    fetchHomeApps(filterlist)
    fetchSamples(filterlist)
    fetchDataTools(filterlist)
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])


  useEffect(() => {
    console.log("Re-rendering")
  }, [showLang, showAPI, showTech, showInt, showOther, showFrame])


  function filteredTag(tagname) {
    return (filters.indexOf(tagname) !== -1)
  }

  const handleFilters = (tagname, e) => {
    e.preventDefault();

    // Open the left hand nav section for
    // the tag that was selected
    if (section[tagname] === "languages") {
      setLang(true)
    } else if (section[tagname] === "technology") {
      setTech(true)
    } else if (section[tagname] === "integrations") {
      setInt(true)
    } else if (section[tagname] === "apis") {
      setAPI(true)
    } else if (section[tagname] === "frameworks") {
      setFrame(true)
    } else if (section[tagname] === "usecases") {
      setUse(true)
    } else if (section[tagname] === "other") {
      setOther(true)
    }

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
    newapps.sort((a, b) => b.tags.length - a.tags.length);
    return newapps
  }

  return (
    <>

      <HashRouter>
        <Header />
        <div name="wrapper" className="row">
          <div name="Leftbar" className='col-2 ml-2'>
            <LeftBar filters={filters} onClick={handleFilters}
              tagset={tagset}
              filteredTag={filteredTag}
              showHide={showHide}
              resetFilters={resetFilters}
            />
          </div>
          <div name="gallery cards" className='col-9'>
            <Switch>
              <Route path="/workshops"
                render={(props) =>
                  <Workshops apps={workshops}
                    filters={filters} onClick={handleFilters} filteredTag={filteredTag}
                    tagset={tagset}
                    showHide={showHide}
                    slugs={slugs}
                    setSlugs={setSlugs}

                    {...props} />} />
              <Route path="/starters" render={(props) => <StarterApps apps={starters}
                filters={filters} onClick={handleFilters}
                tagset={tagset}
                filteredTag={filteredTag}
                showHide={showHide}
                slugs={slugs}
                setSlugs={setSlugs}
                {...props} />} ></Route>
              <Route path="/datatools" render={(props) => <DataTools apps={datatools}
                tagset={tagset}
                filteredTag={filteredTag}
                showHide={showHide}
                slugs={slugs}
                setSlugs={setSlugs}
                filters={filters} onClick={handleFilters} {...props} />} />
              <Route path="/samples" render={(props) => <SampleApps apps={samples}
                tagset={tagset}
                filteredTag={filteredTag} showHide={showHide}
                slugs={slugs}
                setSlugs={setSlugs}
                filters={filters} onClick={handleFilters} {...props} />} />
              <Route path="/" render={(props) => <Home apps={home} filters={filters}
                tagset={tagset}
                filteredTag={filteredTag}
                showHide={showHide}
                slugs={slugs}
                setSlugs={setSlugs}
                onClick={handleFilters} {...props} />} />
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