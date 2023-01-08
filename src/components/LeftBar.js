const LeftBar = (props) => {
  props.tagset && props.tagset.sort((a, b) => parseFloat(b.count) - parseFloat(a.count));

  return (
      <>
        {props.tagset && (
          <div className="flex flex-column">
            {
              props.tagset.map(
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
