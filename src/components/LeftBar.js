import { Sidebar } from 'react-pro-sidebar';

const LeftBar = (props) => {
  props.tagset && props.tagset.sort((a, b) => parseFloat(b.count) - parseFloat(a.count));
  
  return (
    <div class="container-fluid width=200px">
        <div class="row">
            <div class="col-3 side" id="green">
            <div>
              <h3>Filters</h3>
            </div>
            {props.tagset && (
        <div >
            {
            props.tagset.map(
              (tag, index) => 
              <button key={index} className={props.filteredTag(tag.name) ? 'btn btn-primary' : 'btn btn-secondary'}
              onClick=
              {(e) => props.onClick(tag.name, e)}
              >{tag.name}</button>
              
            )}
          </div>
      )}
            </div>
            
        </div>
    </div>
  );
 }

           
      
          

export default LeftBar
