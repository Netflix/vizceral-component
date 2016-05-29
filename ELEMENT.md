# vizceral-component #



es6 class name: *VizceralComponent*



### Properties ###

| property |  | description |
| ------------- | ------------- | ------------- |
| [regions](src/vizceral-component.js#75) | type: String<br>value: ""<br>reflectToAttribute: true<br>observer: _regionsChanged | `regions` Which regions to pre-load in a csv |
| [showLabels](src/vizceral-component.js#85) | type: Boolean<br>value: true<br>observer: _showLabelsChanged | `show-labels` Whether to show node labels or not |
| [view](src/vizceral-component.js#98) | type: Array<br>value: undefined<br>reflectToAttribute: true<br>observer: setView | `view` Selected view (global, region, node)<br>Examples:<br>[] - global view<br>["us-west-2"] - region view for us-west-2<br>['us-west-2', 'api-prod'] - node view for api-prod in us-west-2 |



### Events ###

| event | fired on | description |
| ------------- | ------------- | ------------- |
| vizceral-node-highlighted | fired on: [150](src/vizceral-component.js#150) | The `vizceral-node-highlighted` event is fired whenever a node is highlighted.<br><br>@event vizceral-node-highlighted<br>@property {object} node - The node object that has been highlighted/selected. |
| vizceral-rendered | fired on: [154](src/vizceral-component.js#154) | The `vizceral-rendered` event is fired whenever a graph is rendered.<br><br>@event vizceral-rendered<br>@property {string} name - the name of the graph that was rendered<br>@property (boolean} rendered - true only if the graph has been rendered AND has position data |
| vizceral-view-changed | fired on: [146](src/vizceral-component.js#146) | The `vizceral-view-changed` event is fired whenever the view changes between global, regional, and node<br><br>@event vizceral-view-changed<br>@property {array} view - The currently selected view (e.g. [] for global, ['us-east-1'] for regional, ['us-east-1', 'api'] for node level) |
| nodeFocused |  | The `nodeFocused` event is fired whenever a node gains focus or the currently focused node is updated<br><br>@event nodeFocused<br>@property {object} node - The node object that has been focused, or the focused node that has been updated. |
| vizceral-region-context-size-changed | fired on: [162](src/vizceral-component.js#162) | The `vizceral-region-context-size-changed` event is fired whenever the size of a region context panel is changed<br><br>@event vizceral-region-context-size-changed<br>@property {object} dimensions - The dimensions of the regional context panel in which to inject context |
| vizceral-matches-found |  | The `vizceral-matches-found` event is fired whenever a searchString is provided<br><br>@event vizceral-matches-found<br>@property {object} match counts - { total: number, visible: number} |
| attached | fired on: [174](src/vizceral-component.js#174) | The `attached` event is fired when the element is attached to the DOM.<br><br>@event attached |
| vizceral-node-focused | fired on: [158](src/vizceral-component.js#158) |  |



### Methods ###

| method |  |
| ------------- | ------------- |
| [ready](src/vizceral-component.js#108) | `ready` is called after all elements have been configured, but<br>propagates bottom-up. This element's children are ready, but parents<br>are not.<br><br>This is the point where you should make modifications to the DOM (when<br>necessary), or kick off any processes the element wants to perform. |
| [attached](src/vizceral-component.js#117) | `attached` fires once the element and its parents have been inserted<br>into a document.<br><br>This is a good place to perform any work related to your element's<br>visual state or active behavior (measuring sizes, beginning animations,<br>loading resources, etc). |
| [detached](src/vizceral-component.js#177) | The analog to `attached`, `detached` fires when the element has been<br>removed from a document.<br><br>Use this to clean up anything you did in `attached`.<br>The analog to `attached`, `detached` fires when the element has been<br>removed from a document.<br><br>Use this to clean up anything you did in `attached`. |
| [zoomOutViewLevel](src/vizceral-component.js#188) | If zoomed into a region or a service, zoom out one level up.<br>If in the global view, this is a noop. |
| [setView](src/vizceral-component.js#205) | Set the current view of the component to the passed in array. If the passed<br>in array does not match an existing region or node, the component will try<br>each level up the array until it finds a match, defaulting to the global<br>view.<br><br>Ex:<br>[] - show the base global view<br>['us-east-1'] - show the regional view for 'us-east-1' if it exists<br>['us-east-1', 'api'] - show the api node in the us-east-1 region if it exists<br><br>@param {array} viewArray - the array containing the view to set. |
| [clearHighlight](src/vizceral-component.js#215) | Clears the highlighted node, if there is one.  If a node is not highlighted,<br>this is a noop. |
| [findNodes](src/vizceral-component.js#225) | Highlight nodes that match searchString.  Searches the node name and the list<br>of clusters, if nodes have one.<br><br>@param {string} searchString - The string to match against the nodes. |
| [updateData](src/vizceral-component.js#236) | Set the new set of traffic data to render. This is expected to be called<br>with the complete set of traffic data anytime there is an update.<br><br>@param {object} data - The traffic data that matches the format in DATAFORMATS.md<br>@param {array} excludedEdgeNodes - An array of node names that are at the edge that you want excluded from the global totals |
| [setFilters](src/vizceral-component.js#246) | Set the set of filters to apply along with their current values.<br><br>@param {object} filters - The filters that match the format in DATAFORMATS.md |
| [getNode](src/vizceral-component.js#255) | Get a specific node object<br><br>@param {array} nodeArray - e.g. [ region, nodeName ] |
| [getCurrentGraph](src/vizceral-component.js#262) | Get the currently selected graph object |
| [getGraphs](src/vizceral-component.js#269) | Get all the graphs, global and regional |
| [_regionsChanged](src/vizceral-component.js#278) | fires when @regions is changed |
| [_showLabelsChanged](src/vizceral-component.js#288) | fires when @show-labels is changed |

