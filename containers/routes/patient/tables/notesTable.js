import React from 'react';
import * as utils from '../../../../components/functions/functions'
import {reduxForm, FieldArray} from 'redux-form'
import * as rdField from '../../../../components/form/renderField'

class SimpleTable extends React.Component {
  
  handleChangePage() {

  }
  render() {
    const { classes, patients, subjects, deleteNote } = this.props;
    console.log('subj', subjects)
    return (
      <div style={{height:'94%'}}>
          <div className="notes-list">
            <FieldArray 
                    name='events'
                    component={rdField.renderPaymentEvents} 
                    classes={classes} 
                    deleteNote={(e)=>deleteNote(e)}
                    // selectItem={selectPayment}
                    // utils={utils}
                    options={subjects}
                    />
          </div>
         
      </div>
    );
  }
}



export default reduxForm({
    form: 'paymentsCollectionsForm' // a unique name for this form
})(SimpleTable);