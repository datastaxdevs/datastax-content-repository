import React, { useEffect } from "react";
import DOMPurify from "dompurify"
import parse from "html-react-parser"
import axios from 'axios'

// Pop-up for each application

const Modal = (props) => {
    const application = props.application;
    const setShowModal = props.setShowModal
    const showModal = props.showModal
    let slugs = props.slugs
    let setSlugs = props.setSlugs
    let setAge = props.setAge


     // Esc or any click closes the modal

    useEffect(() => {
        const close = (e) => {
            if (e.keyCode === 27) {
                setShowModal(false)
            }
        }
        window.addEventListener('keydown', close)
        return () => window.removeEventListener('keydown', close)
    }, [setShowModal])

    // When the modal is created, grab the readme to show
    useEffect(() => {
        getReadme(application)
        getVideo(application)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Read in the README, just once per app, for the modals to show.
    const getVideo = async (app) => {
        let slugobjs = slugs
        
        if (!app["urls"]["youtube"]) {
            return
        } else {
            const url = app["urls"]["youtube"][0]
            const videoId = url.split("=")[1]
            if (slugobjs[videoId]){
                application["video"] = slugobjs[videoId]
                return
            }
            try {
                const results = await axios.get('/.netlify/functions/getVideo?id=' + videoId)
                
                application["video"] = results.data
                slugobjs[videoId] = application["video"]
                setSlugs(slugobjs);
            } catch (e) {
                console.log("No Video for " + videoId)
                slugobjs[videoId] = ' '
                setSlugs(slugobjs);
            }
        }
    }

    const getReadme = async (app) => {
        let slugobjs = slugs
        if (!app["urls"]["github"]) {
            console.log("NO GITHUB" + JSON.stringify(app["urls"]["github"]))
        } else {
            const url = app["urls"]["github"][0]
            const owner = url.split("/")[3]
            const repo = url.split("/")[4]
            const slug = owner + "-" + repo
            if (slug === "undefined-undefined") { return }
            if (slugobjs[slug]){
                application["readme"] = slugobjs[slug]
                return
            }
            
            try {
                const results = await axios.get('/.netlify/functions/getReadme?slug=' + slug)
                const cleanHTML = DOMPurify.sanitize(results.data, {
                    USE_PROFILES: { html: true },
                });
                application["readme"] = parse(cleanHTML)
                slugobjs[slug] = parse(cleanHTML)
                setSlugs(slugobjs);
            } catch (e) {
                slugobjs[slug] = ' '
                setSlugs(slugobjs);
            }
        }
    }
//onClick={() => setShowModal(false)}
    return (
        <>
            {showModal ? (
                <div id='modal' >
                    <div className="flex flex-wrap justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bottom-20 top-20">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                                    <h2 className="text-3xl font=semibold">{props.application.name}</h2>
                                    <button
                                        className="bg-transparent border-0 text-black float-right"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                                            x
                                        </span>
                                    </button>
                                </div>
                                <div className='display: flex; flex-wrap: wrap; flex-direction:column; align-content: flex-start'>
                                    <div key={application.name}
                                        className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
                                        <div className="flex flex-1 flex-col p-8">
                                            {application?.urls?.heroimage && <img className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src={application.urls.heroimage} alt={application.name} width="100px" />}
                                            <h3 className="mt-6 text-sm font-medium text-gray-900"><a href={application?.urls?.github}>{application.name}</a></h3>
                                            <dl className="mt-1 flex flex-grow flex-col justify-between">
                                                <div className="extra-small text-night-300">
                                                    <i className="icon icon--clock icon--night-300 card-gallery__header-icon"></i>
                                                    {application.duration}
                                                    <i className="icon icon--user icon--night-300 card-gallery__header-icon"></i>
                                                    {application.skilllevel}
                                                    <hr/>
                                                    <h4>Github statistics</h4>
                                                    <span className="mt-6 text-sm font-medium text-gray-900">Stars: {application.stargazers} </span>
                                                    <span className="mt-6 text-sm font-medium text-gray-900">Forks: {application.forks} </span>
                                                    <hr />
                                                    {application.video && 
                                                    <>
                                                    <h4>Youtube statistics</h4>
                                                    <span className="mt-6 text-sm font-medium text-gray-900">Viewers: {application.video.statistics.viewCount} </span>
                                                    <span className="mt-6 text-sm font-medium text-gray-900">Likes: {application.video.statistics.likeCount} </span>
                                                    <hr />
                                                    </>}
                                                    <p className="mt-6 text-sm font-medium text-gray-900">{application.description}</p>

                                                </div>
                                                <dt className="sr-only">Tags:</dt>
                                                <dd className="text-sm text-gray-500 p-2">
                                                    {application?.tags?.map((tagname, index) => (

                                                        <button key={index} className={props.filteredTag(tagname) ? 'btn btn-primary btn-sm' : 'btn btn-outline-primary btn-sm'}
                                                            onClick=
                                                            {(e) => props.onClick(tagname, e)}
                                                        >{tagname}</button>
                                                    ))}</dd>
                                            </dl>
                                            <div id="modalreadme" className="readmemd text-left leading-8 overflow-y-scroll box-border ">
                                                {application.readme}
                                            </div>
                                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                                <button
                                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                                    type="button"
                                                    onClick={() => setShowModal(false)}
                                                >
                                                    Close
                                                </button>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
            
            ) : null}
        </>
    );
};

export default Modal;
