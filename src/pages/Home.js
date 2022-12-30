import React from 'react'
import Card from '../components/Card'

const Home = (props) => {
  //console.log("HOME:" + JSON.stringify(props.apps))
   return (
    <div className="columns-3">
    <ul role="list" className="grid grid-cols-1 gap-2 ">
      {props.apps && (<span>
        {props.apps.map((application, index) => (
            <Card
            key={index}
            application={application}
            onClick={props.onClick}
            filteredTag={props.filteredTag}
            filters={props.filters}
            {...props} 
          />
        ))}
        </span>)}
    </ul>
    </div>
  )
}

export default Home

