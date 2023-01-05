const LeftBar = (props) => {
  props.tagset && props.tagset.sort((a, b) => parseFloat(b.count) - parseFloat(a.count));

  return (
      <>
        <div>
          <h3>Filters</h3>
        </div>
        {props.tagset && (
          <div className="flex flex-column">
            {
              props.tagset.map(
                (tag, index) =>
                  <button key={index} className={props.filteredTag(tag.name) ? 'btn btn-primary btn-sm' : 'btn btn-outline-primary btn-sm'}
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
