const LeftBar = (props) => {
  //props.tagset && props.tagset.sort((a, b) => parseFloat(b.count) - parseFloat(a.count));

  let languages = []
  let frameworks = []
  let apis = []
  let secret = []
  let standard = []

  for (let tag in props.tagset) {
    let tagobj = props.tagset[tag]
    if (["javascript","csharp","java","nodejs","python", "c#"].includes(tagobj.name)) {
      languages.push(tagobj)
    } else if (["doc api","graphql api","rest api","gprc api"].includes(tagobj.name)) {
      apis.push(tagobj)
    } else if (["workshop","apps","starters"].includes(tagobj.name)) {
      secret.push(tagobj)
    } else if (["react","spring","django", "nextjs","nestjs",""].includes(tagobj.name)) {
      frameworks.push(tagobj)
    } else {
      standard.push(tagobj)
    }
  }

  console.log(languages)

  return (
      <>
        {props.tagset && (
          <div className="flex flex-column">
            <h3>Languages</h3>
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
              <h3>APIs</h3>
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
                <h3>Frameworks</h3>
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
              <h3>Other</h3>
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
  
              </div>
        )}
      </>
  );
}





export default LeftBar
