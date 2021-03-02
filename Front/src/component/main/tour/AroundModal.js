import React from 'react';
import ReactDOM from 'react-dom';
import './kakaomap.css';
import {URL} from '../../../redux/config';
import AroundModalDetail from './AroundModalDetail';

const AroundModal = ({ isShowing, hide, wishTitle, wishContent, category }) => isShowing ? ReactDOM.createPortal(

  <React.Fragment>
    <div className="aroundmodal-overlay"/>
    <div className="aroundmodal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="aroundmodal">
        <div className="aroundmodal-header">
          <button type="button" className="aroundmodal-close-button" data-dismiss="aroundmodal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
          <AroundModalDetail wishTitle={wishTitle} wishContent={wishContent} category={category}/>
          
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default AroundModal;