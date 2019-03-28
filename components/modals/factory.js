
import React, { Component } from "react";


/*
<div style={{padding:10}}>
              <button
                type="button"
                className="text-muted close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                ×
              </button>
              
            </div>


*/


class ModalFromFactory extends Component {
  render() {
    let size = this.props.large ? "modal-lg" : "modal-md";
    if (this.props.small) {
      size = "modal-sm";
    }

    var ModalComponent = this.props.factory;
    const {title} = this.props
    return (
      <div
        className="modal fade"
        id={this.props.modalref}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
        style={{zIndex:'9002', justifyContent:'center', alignItems:'center'}}
      >
        <div className={`modal-dialog ${size}`}>

          <div className="modal-content" >
            <div style={{padding:'3px 0 3px 15px', fontWeight:'600', borderRadius:'6px', borderTop:'none'}} className="d-flex justify-content-between table-title align-items-center">
              <div>
                {title}
              </div>
              <div>
                <button
                  type="button"
                  className="text-muted close"
                  data-dismiss="modal"
                  aria-hidden="true"
                  style={{background:'transparent', border:'none', fontSize:'1.7rem'}}
                >
                  <i className="fa fa-times-circle cross-icon"></i>
                </button>
              </div>
              
              
            </div>
            <div className="modal-body">
              <ModalComponent {...this.props} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default {
  show: function(modalRef) {
    $("#" + modalRef).modal({});

    $("#" + modalRef).find(".modal-dialog").css({
      height: "auto",
      "max-height": "100%"
    });
  },
  hide: function(modalRef) {
    $("#" + modalRef).modal("hide");
  },
  modalFromFactory: ModalFromFactory
};
