import React, { Component } from 'react';
import OrgChart from '@balkangraph/orgchart.js';
import './Chart.css';


export default class extends Component {

  constructor(props) {
    super(props);
    this.divRef = React.createRef();
  }

shouldComponentUpdate() {
  return false;
}

componentDidMount() {
  this.chart = new OrgChart(this.divRef.current , {
    nodes: this.props.nodes,
    nodeContextMenu: {
      edit: { text: "Edit", icon: OrgChart.icon.edit(18, 18, '#039BE5')  },
      add: { text: "Add", icon: OrgChart.icon.add(18, 18, '#FF8304') }
    },
    enableDragDrop: true,
    enableSearch: false,
    nodeBinding: {
        field_0: "name",
        field_1: "title"
    }
  });
}

render() {
  return (
    <div id="tree" ref={this.divRef}></div>
  );
}
}