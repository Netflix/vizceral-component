# vizceral-component #



es6 class name: *VizceralComponent*



### Properties ###

| property |  | description |
| ------------- | ------------- | ------------- |
| [showLabels](src/vizceral-component.js#82) | type: Boolean<br>value: true<br>observer: _showLabelsChanged | `show-labels` Whether to show node labels or not |
| [view](src/vizceral-component.js#95) | type: Array<br>value: undefined<br>reflectToAttribute: true<br>observer: setView | `view` Selected view<br>Examples:<br>[] - global view<br>['us-west-2'] - node view for us-west-2<br>['us-west-2', 'api-prod'] - node view for api-prod in us-west-2 |
| [customTrafficColorClasses](src/vizceral-component.js#107) | type: Array<br>value: undefined | `customTrafficColorClasses` Any custom traffic color classes that are going to be used for coloring<br>Unfortunately, this is needed because of the need to know which css variables exist to access them in javascript<br>Changes to this property after initial load are not watched; only the initial value is used. |



### Events ###

| event | fired on | description |
| ------------- | ------------- | ------------- |
| vizceral-node-highlighted | fired on: [172](src/vizceral-component.js#172) | The `vizceral-node-highlighted` event is fired whenever a node is highlighted.<br><br>@event vizceral-node-highlighted<br>@property {object} node - The node object that has been highlighted/selected. |
| vizceral-rendered | fired on: [176](src/vizceral-component.js#176) | The `vizceral-rendered` event is fired whenever a graph is rendered.<br><br>@event vizceral-rendered<br>@property {string} name - the name of the graph that was rendered<br>@property (boolean} rendered - true only if the graph has been rendered AND has position data |
| vizceral-view-changed | fired on: [168](src/vizceral-component.js#168) | The `vizceral-view-changed` event is fired whenever the view changes<br><br>@event vizceral-view-changed<br>@property {array} view - The currently selected view (e.g. [] for top level graph, ['us-east-1'] for second level graph, ['us-east-1', 'api'] for node level) |
| nodeFocused |  | The `nodeFocused` event is fired whenever a node gains focus or the currently focused node is updated<br><br>@event nodeFocused<br>@property {object} node - The node object that has been focused, or the focused node that has been updated. |
| vizceral-node-context-size-changed | fired on: [184](src/vizceral-component.js#184) | The `vizceral-node-context-size-changed` event is fired whenever the size of a node context panel is changed<br><br>@event vizceral-node-context-size-changed<br>@property {object} dimensions - The dimensions of the node context panel in which to inject context |
| vizceral-matches-found |  | The `vizceral-matches-found` event is fired whenever a searchString is provided<br><br>@event vizceral-matches-found<br>@property {object} match counts - { total: number, visible: number} |
| attached | fired on: [192](src/vizceral-component.js#192) | The `attached` event is fired when the element is attached to the DOM.<br><br>@event attached |
| vizceral-node-focused | fired on: [180](src/vizceral-component.js#180) |  |



### Methods ###

| method | params |  |
| ------------- | ------------- | ------------- |
| [ready](src/vizceral-component.js#115) |  | `ready` is called after all elements have been configured, but<br>propagates bottom-up. This element's children are ready, but parents<br>are not.<br><br>This is the point where you should make modifications to the DOM (when<br>necessary), or kick off any processes the element wants to perform. |
| [attached](src/vizceral-component.js#124) |  | `attached` fires once the element and its parents have been inserted<br>into a document.<br><br>This is a good place to perform any work related to your element's<br>visual state or active behavior (measuring sizes, beginning animations,<br>loading resources, etc). |
| [detached](src/vizceral-component.js#195) |  | The analog to `attached`, `detached` fires when the element has been<br>removed from a document.<br><br>Use this to clean up anything you did in `attached`.<br>The analog to `attached`, `detached` fires when the element has been<br>removed from a document.<br><br>Use this to clean up anything you did in `attached`. |
| [zoomOutViewLevel](src/vizceral-component.js#206) |  | If zoomed into a node or a service, zoom out one level up.<br>If in the global view, this is a noop. |
| [setView](src/vizceral-component.js#224) | viewArray, highlightedNode | Set the current view of the component to the passed in array. If the passed<br>in array does not match an existing node, the component will try<br>each level up the array until it finds a match, defaulting to the global<br>view.<br><br>Ex:<br>[] - show the base global view<br>['us-east-1'] - show the view for 'us-east-1' if it exists<br>['us-east-1', 'api'] - show the api node in the us-east-1 graph if it exists<br><br>@param {array} viewArray - the array containing the view to set.<br>@param {string} nodeToHighlight - a node to highlight in the passed in view. |
| [clearHighlight](src/vizceral-component.js#235) |  | Clears the highlighted node, if there is one.  If a node is not highlighted,<br>this is a noop. |
| [findNodes](src/vizceral-component.js#245) | searchString | Highlight nodes that match searchString.  Searches the node name and the list<br>of clusters, if nodes have one.<br><br>@param {string} searchString - The string to match against the nodes. |
| [updateData](src/vizceral-component.js#255) | data | Set the new set of traffic data to render. This is expected to be called<br>with the complete set of traffic data anytime there is an update.<br><br>@param {object} data - The traffic data that matches the format in DATAFORMATS.md |
| [setFilters](src/vizceral-component.js#264) | filters | Set the set of filters to apply along with their current values.<br><br>@param {object} filters - The filters that match the format in DATAFORMATS.md |
| [setDefinitions](src/vizceral-component.js#273) | definitions | Update the mode definitions. Refer to github.com/Netflix/vizceral/DATAFORMATS.md#definitions<br><br>@param {object} definitions - Object map of definitions |
| [setModes](src/vizceral-component.js#282) | modes | Set the lost of modes to apply along with their current values.<br><br>@param {object} modes - Map of modes to mode type, e.g. { detailedNode: 'volume' } |
| [getNode](src/vizceral-component.js#291) | nodeArray | Get a specific node object<br><br>@param {array} nodeArray - e.g. [ node, node ] |
| [getCurrentGraph](src/vizceral-component.js#298) |  | Get the currently selected graph object |
| [getGraphs](src/vizceral-component.js#305) |  | Get all the graphs |
| [_showLabelsChanged](src/vizceral-component.js#314) | showLabels | fires when @show-labels is changed |

