import React from 'react'

import { ChevronDownIcon } from '@heroicons/react/20/solid'
const LeftBar = (props) => {
  const searchString = props.searchString
  const setSearchString = props.setSearchString
  //props.tagset && props.tagset.sort((a, b) => parseFloat(b.count) - parseFloat(a.count));

  // group the tags by type, to create the groupings in the left pane.

  let languages = []
  let frameworks = []
  let apis = []
  let secret = []
  let other = []
  let integrations = []
  let technology = []
  let usecases = []

  for (let tag in props.tagset) {
    let tagobj = props.tagset[tag]
    if (["javascript", "csharp", "java", "nodejs", "python", "c#", "scala", "ios", "android"].includes(tagobj.name)) {
      languages.push(tagobj)
    } else if (["doc api", "graphql api", "rest api", "grpc api", "devops-apis", "json-api"].includes(tagobj.name)) {
      apis.push(tagobj)
    } else if (["workshop", "apps", "starters", "dev", "tools", "examples"].includes(tagobj.name)) {
      secret.push(tagobj)
    } else if (["selenium", "react", "spark", "spark-ml", "pyspark", "spring", "django", "nextjs", "mongoose", "nestjs", "angular", "redux", "webflux", "elixir", "serverless-framework", "streaming", "video"].includes(tagobj.name)) {
      frameworks.push(tagobj)
    } else if (["kubernetes", "k8ssandra", "docker", "stargate", "pulsar", "cql", "nosql", "vector", "astradb", "dse", "cassandra", "fastapi", "datastax", "keyspaces"].includes(tagobj.name)) {
      technology.push(tagobj)
    } else if (["eddiehub", "jamstack", "pandas", "jupyter", "httpie", "netlify", "gitpod", "template", "google-cloud"].includes(tagobj.name)) {
      integrations.push(tagobj)
    } else if (["change data capture", "search", "todolist", "order management", "social media", "crypto application", "social network", "e-commerce", "real-time", "certification", "cms", "digital library", "gaming", "data modeling", "performance", "chat server", "data-science", "data-engineering", "game development", "benchmark", "graphql federation", "building-sample-apps", "ansible-playbooks", "machine learning", "graph", "ai", "game", "performance testing", "ds-bulk", "timeseries db", "killrvideo", "devops"].includes(tagobj.name)) {
      usecases.push(tagobj)
    } else {
      other.push(tagobj)
    }
  }

  const filter = (e) => {
    setSearchString(e.target.value)
  };

  const filterAge = (e) => {
    console.log(JSON.stringify(e.target.value))
    props.setMonthFilter(e.target.value)
  }

  return (
    <>
      {props.tagset && (
        <div className="flex flex-column justify-center">
          <div className="flex justify-center">
            <div className="mb-1 xl:w-96">
              <div className="input-group relative flex flex-wrap items-stretch w-full mb-1">
                <input type="search"
                  id="default-input"
                  value={searchString}
                  onChange={filter}
                  width="200px"
                  className="input form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />

              </div>
            </div>
          </div>
          <button type="button" className="reset-button" onClick={() => { props.resetFilters() }}> <h3 align="left"><b>Reset Filters</b></h3></button>

          <hr />
          <h4>Languages <button type="button" onClick={() => { props.showHide.setLang(!props.showHide.showLang) }}> <ChevronDownIcon className=" h-5 w-3 " /></button>
          </h4>
          {
            props.showHide.showLang && <span name="languages">
              {
                languages.map(
                  (tag, index) =>
                    <button key={index} className={props.filteredTag(tag.name) ?
                      'inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-xs font-bold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2' :
                      'inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-center text-xs font-bold text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'}
                      onClick=
                      {(e) => props.onClick(tag.name, e)}
                    >{tag.name}</button>

                )}
            </span>
          }
          <h4>Technology <button type="button" onClick={() => { props.showHide.setTech(!props.showHide.showTech) }}> <ChevronDownIcon className=" h-5 w-3 " /></button>
          </h4>
          {
            props.showHide.showTech && <span name="technology">
              {
                technology.map(
                  (tag, index) =>
                    <button key={index} className={props.filteredTag(tag.name) ?
                      'inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-xs font-bold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2' :
                      'inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-center text-xs font-bold text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'}
                      onClick=
                      {(e) => props.onClick(tag.name, e)}
                    >{tag.name}</button>

                )}
            </span>
          }
          <h4>Integrations <button type="button" onClick={() => { props.showHide.setInt(!props.showHide.showInt) }}> <ChevronDownIcon className=" h-5 w-3 " /></button>
          </h4>
          {
            props.showHide.showInt && <span name="integrations">
              {
                integrations.map(
                  (tag, index) =>
                    <button key={index} className={props.filteredTag(tag.name) ?
                      'inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-xs font-bold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2' :
                      'inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-center text-xs font-bold text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'}
                      onClick=
                      {(e) => props.onClick(tag.name, e)}
                    >{tag.name}</button>

                )}
            </span>
          }
          <h4>APIs <button type="button" onClick={() => { props.showHide.setAPI(!props.showHide.showAPI) }}> <ChevronDownIcon className=" h-5 w-3 " /></button>
          </h4>
          {
            props.showHide.showAPI && <span name="apis">
              {
                apis.map(
                  (tag, index) =>
                    <button key={index} className={props.filteredTag(tag.name) ?
                      'inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-xs font-bold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2' :
                      'inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-center text-xs font-bold text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'}
                      onClick=
                      {(e) => props.onClick(tag.name, e)}
                    >{tag.name}</button>

                )}
            </span>
          }
          <h4>Frameworks <button type="button" onClick={() => { props.showHide.setFrame(!props.showHide.showFrame) }}> <ChevronDownIcon className=" h-5 w-3 " /></button>
          </h4>
          {
            props.showHide.showFrame && <span name="frameworks">
              {
                frameworks.map(
                  (tag, index) =>
                    <button key={index} className={props.filteredTag(tag.name) ?
                      'inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-xs font-bold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2' :
                      'inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-center text-xs font-bold text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'}
                      onClick=
                      {(e) => props.onClick(tag.name, e)}
                    >{tag.name}</button>

                )}
            </span>
          }
          <h4>Use Cases <button type="button" onClick={() => { props.showHide.setUse(!props.showHide.showUse) }}> <ChevronDownIcon className=" h-5 w-3 " /></button>
          </h4>
          {
            props.showHide.showUse && <span name="usecases">
              {
                usecases.map(
                  (tag, index) =>
                    <button key={index} className={props.filteredTag(tag.name) ?
                      'inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-xs font-bold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2' :
                      'inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-center text-xs font-bold text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'}
                      onClick=
                      {(e) => props.onClick(tag.name, e)}
                    >{tag.name}</button>

                )}
            </span>
          }
          <h4>Other <button type="button" onClick={() => { props.showHide.setOther(!props.showHide.showOther) }}> <ChevronDownIcon className=" h-5 w-3 " /></button>
          </h4>
          {
            props.showHide.showOther && <span name="other">
              {
                other.map(
                  (tag, index) =>
                    <button key={index} className={props.filteredTag(tag.name) ?
                      'inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-center text-xs font-bold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2' :
                      'inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-center text-xs font-bold text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'}
                      onClick=
                      {(e) => props.onClick(tag.name, e)}
                    >{tag.name}</button>

                )}
            </span>
          }
        </div >
      )
      }
    </>
  );
}





export default LeftBar
