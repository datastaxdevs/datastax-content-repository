import React, {useState} from 'react'
import Modal from './Modal'
import DropDown from './DropDown'
const Card = (props) => {
  let application = props.application
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='display: flex; flex-wrap: wrap; flex-direction:column; align-content: flex-start;'>
      <div key={application.name}
        className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
        <div className="flex flex-1 flex-col p-8">
          <div className="heroimage"
            onClick={() => setShowModal(true)}
          >
            {application?.urls?.heroimage && <img className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src={application.urls.heroimage} alt={application.name} width="100px" />}
          </div>
          <h3 className="mt-6 text-sm font-medium text-gray-900"><a target="_blank" rel="noreferrer" href={application?.urls?.github}>{application.name}</a></h3>
          <dl className="mt-1 flex flex-grow flex-col justify-between">
            <div className="extra-small text-night-300">
              <i className="icon icon--clock icon--night-300 card-gallery__header-icon"></i>
              {application.duration}
              <i className="icon icon--user icon--night-300 card-gallery__header-icon"></i>
              {application.skilllevel}
              <p className="mt-6 text-sm font-medium text-gray-900">{application.description}</p>

            </div>
            <dt className="sr-only">Tags:</dt>
            <dd className="text-sm text-gray-500">
              {application?.tags?.map((tagname, index) => (

                <button key={index} className={props.filteredTag(tagname) ? 'btn btn-primary btn-sm' : 'btn btn-outline-primary btn-sm'}
                  onClick=
                  {(e) => props.onClick(tagname, e)}
                >{tagname}</button>
              ))}</dd>

          </dl>
          <div className="row float-right">
            <div className="col-auto">
              <button
                className="bg-slate-200 text-indigo-700 active:bg-sky-500 
      font-bold px-6 mt-16 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => setShowModal(true)}
              >
                Learn More
              </button>
            </div>
            <Modal application={application} filteredTag={props.filteredTag} slugs={props.slugs}
              setSlugs={props.setSlugs} showModal={showModal} setShowModal={setShowModal} 
             />
            <DropDown application={application} />
          </div>
        </div>
        <div>

        </div>
      </div>
      <div className="break" />

    </div>
  )
}

export default Card