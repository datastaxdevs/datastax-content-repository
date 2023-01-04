import React from 'react'
import Card from '../components/Card'

const Home = (props) => {
  //console.log("HOME:" + JSON.stringify(props.apps))
   return (
    <div className="columns-3">
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
      {props.apps && (<>
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
        </>)}
    </ul>
    </div>
  )
}

export default Home

