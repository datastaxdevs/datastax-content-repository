import React, { useState } from 'react'

import { ChevronDownIcon } from '@heroicons/react/20/solid'
const LeftBar = (props) => {
  //props.tagset && props.tagset.sort((a, b) => parseFloat(b.count) - parseFloat(a.count));

  let languages = []
  let frameworks = []
  let apis = []
  let secret = []
  let standard = []
  let integrations = []
  let technology = []
  let usecases = []

  for (let tag in props.tagset) {
    let tagobj = props.tagset[tag]
    if (["javascript", "csharp", "java", "nodejs", "python", "c#", "scala", "ios", "android"].includes(tagobj.name)) {
      languages.push(tagobj)
    } else if (["doc api", "graphql api", "rest api", "gprc api", "devops-apis"].includes(tagobj.name)) {
      apis.push(tagobj)
    } else if (["workshop", "apps", "starters", "dev", "tools", "examples", "building-sample-apps"].includes(tagobj.name)) {
      secret.push(tagobj)
    } else if (["selenium", "react", "spring", "django", "nextjs", "nestjs", "angular", "redux", "webflux", "elixir", "serverless-framework", "streaming", "video"].includes(tagobj.name)) {
      frameworks.push(tagobj)
    } else if (["kubernetes", "k8ssandra", "cql", "nosql", "astradb", "dse", "cassandra", "fastapi", "datastax", "keyspaces"].includes(tagobj.name)) {
      technology.push(tagobj)
    } else if (["eddiehub", "jamstack", "netlify", "gitpod", "template", "google-cloud"].includes(tagobj.name)) {
      integrations.push(tagobj)
    } else if (["change data capture", "ansible-playbooks", "machine learning", "graph", "ai", "game", "performance testing", "ds-bulk", "timeseries db", "killrvideo", "devops"].includes(tagobj.name)) {
      usecases.push(tagobj)
    } else {
      standard.push(tagobj)
    }
  }

  return (
    <>
      {props.tagset && (
        <div className="flex flex-column">
          <h4>Languages <button type="button" onClick={() => { props.setLang(!props.showLang) }}> <ChevronDownIcon className=" h-5 w-3 " /></button>
          </h4>
          {props.showLang && <span name="languages">
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
          <h4>Technology <button type="button" onClick={() => { props.setTech(!props.showTech) }}> <ChevronDownIcon className=" h-5 w-3 " /></button>
          </h4>
          {props.showTech && <span name="technology">
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
          <h4>Integrations <button type="button" onClick={() => { props.setInt(!props.showInt) }}> <ChevronDownIcon className=" h-5 w-3 " /></button>
          </h4>
          {props.showInt && <span name="integrations">
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
          <h4>APIs <button type="button" onClick={() => { props.setAPI(!props.showAPI) }}> <ChevronDownIcon className=" h-5 w-3 " /></button>
          </h4>
          {props.showAPI && <span name="apis">
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
          <h4>Frameworks <button type="button" onClick={() => { props.setFrame(!props.showFrame) }}> <ChevronDownIcon className=" h-5 w-3 " /></button>
          </h4>
          {props.showFrame && <span name="frameworks">
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
          <h4>Use Cases <button type="button" onClick={() => { props.setUse(!props.showUse) }}> <ChevronDownIcon className=" h-5 w-3 " /></button>
          </h4>
          {props.showUse && <span name="usecases">
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
          <h4>Other <button type="button" onClick={() => { props.setOther(!props.showOther) }}> <ChevronDownIcon className=" h-5 w-3 " /></button>
          </h4>
          {props.showOther && <span name="other">
            {
              standard.map(
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

        </div>
      )
      }
    </>
  );
}





export default LeftBar
