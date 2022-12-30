import React from 'react'
import Card from '../components/Card'

const StarterApps = (props) => {
  //console.log("Starter:" + JSON.stringify(props.apps))
  
  return (
    <>
    {props.apps && (
      <div className='container'>
        <div className="row row-cols-2">
          {props.apps.map((application, index) => (
            <Card
            key={index}
            application={application}
            onClick={props.onClick}
            filteredTag={props.filteredTag}
            filters={props.filters}
          />
          ))}
        </div>
      </div>
    )}
    </>
  )
}

export default StarterApps