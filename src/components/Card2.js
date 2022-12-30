import React from 'react'

const Card = ({ props }) => {
  console.log("CARD PROPS" + JSON.stringify(props))
  if (!props.application) {
    return null
  }
  let stacklist = ""
  return (
    <div className="col">
    <div className="card card-gallery shadow shadow--dark h-100">
      <div className="break" />
      <div className="card-body">
        <div className="row mb-1">
        {props.application.type==="workshop" && props.application?.urls?.badge && <img className="heroImage card-gallery--image" alt={props.application?.name} src={props.application?.urls?.badge} width="150"/>}
          {props.application?.heroimage && <img className="heroImage card-gallery--image" alt={props.application.name} src={props.application.heroimage}/>}
          <h4><a className="card-gallery--title"  href={props.application?.urls?.github}>{props.application.name}</a></h4>
          <span className="extra-small text-night-300"> 
            <i className="icon icon--clock icon--night-300 card-gallery__header-icon"></i>
            {props.application.duration}
            <i className="icon icon--user icon--night-300 card-gallery__header-icon"></i>
            {props.application.skilllevel}
            </span>
            <>
              {props.application?.tags?.map((tag, index) => (
                <button key={index} className={props.filteredTag(tag) ? 'btn btn-primary' : 'btn btn-secondary'}
                onClick=
                {(e) => props.onClick(tag, e)}
                >{tag.name}</button>
            ))}
              {stacklist && <span> {stacklist}</span>}
            </>
            {props.application.language && <h4><span className="card-gallery--title">Language: {props.application.language?.toString()}</span></h4>}
            {props.application.description}
            </div>
            <div className="break" />
        </div>
    </div>
    </div>
  )
}

export default Card