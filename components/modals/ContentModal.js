
import React, {Component} from 'react';

const ContentModal = ({body}) => (
  <section dangerouslySetInnerHTML={{__html:body}} style={{marginBottom:0}}></section>
);

export default ContentModal;