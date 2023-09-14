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
  const [results, setResults] = useState({})
  const [tagset, setTags] = useState(null)
  const [filters, setFilters] = useState([]);
  const [samples, setSamples] = useState(null)
  const [datatools, setDataTools] = useState(null)
  const [starters, setStarters] = useState(null)
  const [workshops, setWorkshops] = useState(null)
  const [home, setHome] = useState(null)
  const [searchString, setSearchString] = useState('')
  const [monthFilter, setMonthFilter] = useState("0")
  const [slugs, setSlugs] = useState([])


  const fetchHomeApps = async (filterlist) => {
    let temp = results
    if (home === null) {
      const results = await axios.get('/.netlify/functions/getCategory?tag=all')
      temp["home"] = results.data[0].all.apps
      setResults(temp)
    }
    setHome(filterApps(results["home"]))
  }

  const fetchWorkshops = async (filterlist) => {
    let temp = results
    if (workshops === null) {
      const results = await axios.get('/.netlify/functions/getCategory?tag=workshop')
      temp["workshops"] = results.data[0].workshop.apps
      setResults(temp)
    }
    setWorkshops(filterApps(results["workshops"]))
  }

  const fetchStarters = async (filterlist) => {
    let temp = results
    if (starters === null) {
      const results = await axios.get('/.netlify/functions/getCategory?tag=starter')
      console.log("RESULTS" + JSON.stringify(results))
      temp["starter"] = results.data[0].starter.apps

      setResults(temp)
    }
    setStarters(filterApps(results["starter"]))
  }

  const fetchDataTools = async (filterlist) => {
    let temp = results
    if (datatools === null) {
      const results = await axios.get('/.netlify/functions/getCategory?tag=tools')
      temp["datatools"] = results.data[0].tools.apps
      setResults(temp)
    }
    setDataTools(filterApps(results["datatools"]))
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
      } else if (["doc api", "graphql api", "rest api", "gprc api", "devops-apis"].includes(tagobj.name)) {
        apis.push(tagobj)
        sections[tagset[tag]["name"]] = "apis"
      } else if (["workshop", "apps", "starters", "dev", "tools", "examples"].includes(tagobj.name)) {
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
      } else if (["change data capture", "building-sample-apps", "ansible-playbooks", "machine learning", "graph", "ai", "game", "performance testing", "ds-bulk", "timeseries db", "killrvideo", "devops"].includes(tagobj.name)) {
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
    setMonthFilter("0")
    setFilters([])
  }

  useEffect(() => {
    let filterlist = filters.join(',')
    fetchWorkshops(filterlist)
    fetchStarters(filterlist)
    fetchHomeApps(filterlist)
    fetchDataTools(filterlist)
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, searchString, monthFilter])

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
    let slugdone = []
    if (filters === []) {
      return filterapps
    }

    let newapps = []
    // eslint-disable-next-line
    apploop:
    for (const app of filterapps) {
      if (!app["urls"] || !app["urls"]["github"] || app["urls"]["github"].length === 0) {
        //eslint-disable-next-line
        continue apploop
      }
      const url = app["urls"]["github"][0]
      const owner = url.split("/")[3]
      const repo = url.split("/")[4]
      const slug = owner + "-" + repo

      for (const tag of filters) {
        if (app.tags.indexOf(tag) === -1) {
          // eslint-disable-next-line
          continue apploop
        }
      }
      if (searchString !== '') {
        const readme = JSON.stringify(slugs[slug])

        console.log(searchString + "is searchString")
        if (readme) {
          const appReadMe = readme.toLowerCase()
          if (!appReadMe.includes(searchString.toLowerCase())) {
            // eslint-disable-next-line
            continue apploop
          }
        }
      }

      if (monthFilter !== "0") {
        if (parseInt(app.months) >= parseInt(monthFilter)) {
          console.log("Filtering out " + app.name)
          // eslint-disable-next-line
          continue apploop
        }
      }

      if (slugdone.includes(slug)) {
        continue apploop
      }
      newapps.push(app)
      slugdone.push(slug)
    }
    newapps.sort((a, b) => b.stargazers - a.stargazers);
    return newapps
  }

  return (
    <>

      <HashRouter>
        <Header />
        <div className="row">
          <div name="Leftbar" className='col-2 ml-2'>
            <LeftBar filters={filters} onClick={handleFilters}
              tagset={tagset}
              filteredTag={filteredTag}
              showHide={showHide}
              resetFilters={resetFilters}
              searchString={searchString}
              setSearchString={setSearchString}
              monthFilter={monthFilter}
              setMonthFilter={setMonthFilter}
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