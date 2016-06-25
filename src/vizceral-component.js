/**
 *
 *  Copyright 2016 Netflix, Inc.
 *
 *     Licensed under the Apache License, Version 2.0 (the "License");
 *     you may not use this file except in compliance with the License.
 *     You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 *     Unless required by applicable law or agreed to in writing, software
 *     distributed under the License is distributed on an "AS IS" BASIS,
 *     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *     See the License for the specific language governing permissions and
 *     limitations under the License.
 *
 */
/* global Polymer */
/* eslint-disable no-underscore-dangle */
import Vizceral from 'vizceral';

function cleanUpColorString (colorString) {
  // HACK Remove strange \3 and space from some hex codes
  if (colorString.match(/^#\\3\d /)) {
    colorString = colorString.replace(/(\\3| )/g, '');
  }
}

class VizceralComponent {
  // Element Behavior
  /**
  * The `vizceral-node-highlighted` event is fired whenever a node is highlighted.
  *
  * @event vizceral-node-highlighted
  * @property {object} node - The node object that has been highlighted/selected.
  */
  /**
  * The `vizceral-rendered` event is fired whenever a graph is rendered.
  *
  * @event vizceral-rendered
  * @property {string} name - the name of the graph that was rendered
  * @property (boolean} rendered - true only if the graph has been rendered AND has position data
  */
  /**
  * The `vizceral-view-changed` event is fired whenever the view changes
  *
  * @event vizceral-view-changed
  * @property {array} view - The currently selected view (e.g. [] for top level graph, ['us-east-1'] for second level graph, ['us-east-1', 'api'] for node level)
  */
  /**
  * The `nodeFocused` event is fired whenever a node gains focus or the currently focused node is updated
  *
  * @event nodeFocused
  * @property {object} node - The node object that has been focused, or the focused node that has been updated.
  */
  /**
  * The `vizceral-node-context-size-changed` event is fired whenever the size of a node context panel is changed
  *
  * @event vizceral-node-context-size-changed
  * @property {object} dimensions - The dimensions of the node context panel in which to inject context
  */
  /**
  * The `vizceral-matches-found` event is fired whenever a searchString is provided
  *
  * @event vizceral-matches-found
  * @property {object} match counts - { total: number, visible: number}
  */
  /**
  * The `attached` event is fired when the element is attached to the DOM.
  *
  * @event attached
  */

  beforeRegister () {
    this.is = 'vizceral-component';

    this.properties = {

      /**
      * `show-labels` Whether to show node labels or not
      */
      showLabels: {
        type: Boolean,
        value: true,
        observer: '_showLabelsChanged'
      },

      /**
      * `view` Selected view
      * Examples:
      *   [] - global view
      *   ["us-west-2"] - node view for us-west-2
      *   ['us-west-2', 'api-prod'] - node view for api-prod in us-west-2
      */
      view: {
        type: Array,
        value: [],
        observer: 'setView',
        reflectToAttribute: true
      },

      /**
      * `customTrafficColorClasses` Any custom traffic color classes that are going to be used for coloring
      *  Unfortunately, this is needed because of the need to know which css variables exist to access them in javascript
      *  Changes to this property after initial load are not watched; only the initial value is used.
      */
      customTrafficColorClasses: {
        type: Array,
        value: []
      }
    };
  }

  // Element Lifecycle
  ready () {
    // `ready` is called after all elements have been configured, but
    // propagates bottom-up. This element's children are ready, but parents
    // are not.
    //
    // This is the point where you should make modifications to the DOM (when
    // necessary), or kick off any processes the element wants to perform.
  }

  attached () {
    // `attached` fires once the element and its parents have been inserted
    // into a document.
    //
    // This is a good place to perform any work related to your element's
    // visual state or active behavior (measuring sizes, beginning animations,
    // loading resources, etc).

    // Create the vizceral view
    if (!this._vizceral) {
      this._vizceral = new Vizceral();


      // Update styles based on any passed in custom styles
      const styleNames = this._vizceral.getStyles();

      const customStyles = styleNames.reduce((result, styleName) => {
        let passedInStyle = this.getComputedStyleValue(`--${styleName}`).trim();
        if (passedInStyle) {
          passedInStyle = cleanUpColorString(passedInStyle);
          result[styleName] = passedInStyle;
        }
        return result;
      }, {});

      // Use custom styles
      this.customTrafficColorClasses = this.customTrafficColorClasses ||  [];
      Array.prototype.push.apply(this.customTrafficColorClasses, ['normal', 'warning', 'danger']);
      if (this.customTrafficColorClasses) {
        this.customTrafficColorClasses.forEach(customClass => {
          let value = this.getComputedStyleValue(`--colorTraffic${customClass.charAt(0).toUpperCase() + customClass.slice(1)}`).trim();
          if (value) {
            value = cleanUpColorString(value);
            customStyles.colorTraffic = customStyles.colorTraffic || {};
            customStyles.colorTraffic[customClass] = value;
          }
        });
      }

      this._vizceral.updateStyles(customStyles);

      // Add event handlers for vizceral Events
      this._vizceral.on('viewChanged', data => {
        this.fire('vizceral-view-changed', { view: data.view, graph: data.graph });
      });

      this._vizceral.on('nodeHighlighted', node => {
        this.fire('vizceral-node-highlighted', { node: node });
      });

      this._vizceral.on('rendered', data => {
        this.fire('vizceral-rendered', data);
      });

      this._vizceral.on('nodeFocused', node => {
        this.fire('vizceral-node-focused', { node: node });
      });

      this._vizceral.on('nodeContextSizeChanged', dimensions => {
        this.fire('vizceral-node-context-size-changed', { dimensions: dimensions });
      });

      this._vizceral.animate(); // TODO: Should we cancel the animation on detached?
    }

    Polymer.dom(this.root).appendChild(this._vizceral.renderer.domElement);
    this._vizceral.updateBoundingRectCache();
    this.fire('attached');
  }

  detached () {
    // The analog to `attached`, `detached` fires when the element has been
    // removed from a document.
    //
    // Use this to clean up anything you did in `attached`.
  }

  /**
   * If zoomed into a node or a service, zoom out one level up.
   * If in the global view, this is a noop.
   */
  zoomOutViewLevel () {
    this._vizceral.zoomOutViewLevel();
  }

  /**
   * Set the current view of the component to the passed in array. If the passed
   * in array does not match an existing node, the component will try
   * each level up the array until it finds a match, defaulting to the global
   * view.
   *
   * Ex:
   * [] - show the base global view
   * ['us-east-1'] - show the view for 'us-east-1' if it exists
   * ['us-east-1', 'api'] - show the api node in the us-east-1 graph if it exists
   *
   * @param {array} viewArray - the array containing the view to set.
   */
  setView (viewArray) {
    if (this._vizceral) {
      this._vizceral.setView(viewArray);
    }
  }

  /**
   * Clears the highlighted node, if there is one.  If a node is not highlighted,
   * this is a noop.
   */
  clearHighlight () {
    this._vizceral.setHighlightedNode(undefined);
  }

  /**
   * Highlight nodes that match searchString.  Searches the node name and the list
   * of clusters, if nodes have one.
   *
   * @param {string} searchString - The string to match against the nodes.
   */
  findNodes (searchString) {
    return this._vizceral.findNodes(searchString);
  }

  /**
   * Set the new set of traffic data to render. This is expected to be called
   * with the complete set of traffic data anytime there is an update.
   *
   * @param {object} data - The traffic data that matches the format in DATAFORMATS.md
   */
  updateData (data) {
    this._vizceral.updateData(data);
  }

  /**
   * Set the set of filters to apply along with their current values.
   *
   * @param {object} filters - The filters that match the format in DATAFORMATS.md
   */
  setFilters (filters) {
    this._vizceral.setFilters(filters);
  }

  /**
   * Get a specific node object
   *
   * @param {array} nodeArray - e.g. [ node, node ]
   */
  getNode (nodeArray) {
    return this._vizceral.getNode(nodeArray);
  }

  /**
   * Get the currently selected graph object
   */
  getCurrentGraph () {
    return this._vizceral.currentGraph;
  }

  /**
   * Get all the graphs
   */
  getGraphs () {
    return this._vizceral.graphs;
  }

  // Element Behavior

  /**
  * fires when @show-labels is changed
  */
  _showLabelsChanged (showLabels) {
    if (this._vizceral) {
      this._vizceral.setOptions({ showLabels: showLabels });
    }
  }
}

Polymer(VizceralComponent);
