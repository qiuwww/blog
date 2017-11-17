import React from 'react';
import {render} from 'react-dom';
import App from './Components/App';
import PainterStore from './Store/PainterStore';
import * as mobx from 'mobx';
import {observer, Provider, inject} from 'mobx-react';

render(<Provider PainterStore={new PainterStore()}>
    <App></App>
</Provider>, document.getElementById('container'));
