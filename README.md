![](https://raw.githubusercontent.com/Netflix/vizceral/master/logo.png)

# vizceral-component

vizceral-component is a web component that wraps [vizceral](https://github.com/Netflix/vizceral) for displaying traffic data on a webgl canvas. If a graph of nodes and edges with data about traffic volume is provided, it will render a traffic graph animating the connection volume between nodes.

This component can take multiple traffic graphs and will generate a 'global' graph showing all incoming traffic into each of the 'regions', with support for cross-region traffic.

## Using
1. Add vizceral-component to bower.json (and [webcomponentsjs](https://github.com/webcomponents/webcomponentsjs))

   ```js
   "dependencies": {
     "vizceral-component": "git+ssh://git@github.com:Netflix/vizceral-component.git#master",
     "webcomponentsjs": "^0.7.21"
   }
   ```

* Install bower dependencies

  ```
  $ bower install
  ```

* Make sure webcomponentsjs and vizceral-component get copied to the public folder for your project
* Add the appropriate import statements

  ```html
  <script type="text/javascript" src="js/webcomponents-lite.js"></script>
  <link rel="import" href="components/vizceral-component/vizceral-component.html"></link>
  ```

* Now you can add the vizceral-component component anywhere in your page structure

  ```html
  <vizceral-component view="['us-west-2']" show-labels="true" />
  ```

The component will not show anything unless you call `updateData` on the component with relevant traffic data.

### Styling
The component uses CSS variables to set all the styles. For example, if you apply the class `vizceral-component` to the component:

```css
.vizceral-component {
  --colorText: rgb(214, 214, 214);
  --colorTextDisabled: rgb(129, 129, 129);
  --colorNormal: rgb(186, 213, 237);
  --colorWarning: rgb(268, 185, 73);
  --colorDanger: rgb(184, 36, 36);
  --colorNormalDimmed: rgb(101, 117, 128);
  --colorBackgroundDark: rgb(35, 35, 35);
  --colorNormalDonut: rgb(91, 91, 91);
  --colorLabelBorder: rgb(16, 17, 18);
  --colorLabelText: rgb(0, 0, 0);
  --colorDonutInternalColor: rgb(35, 35, 35);
  --colorDonutInternalColorHighlighted: rgb(255, 255, 255);
  --colorConnectionLine: rgb(91, 91, 91);
  --colorPageBackground: rgb(45, 45, 45);
  --colorPageBackgroundTransparent: rgba(45, 45, 45, 0);
  --colorBorderLines: rgb(137, 137, 137);
}
```

Since the main underlying rendering is done via three.js, the component needed an easy way to use the same values for CSS and JS variables.  CSS variables are easily parsed in JS, so it provided a good way to declare all the styles in one place via CSS.

### Events
See [ELEMENT.md](ELEMENT.md#events)

## Developing Locally
To see your changes to `vizceral-component` locally, you'll need to link the package with bower:

```
$ git clone ssh://git@stash.corp.netflix.com:7999/traffic/vizceral-component.git
$ cd vizceral-component
$ bower link
$ cd /path/to/project-using-vizceral-component
$ bower link vizceral-component
```

## Contributing
1. Clone this repo
2. Create a branch: `git checkout -b your-feature`
3. Make some changes
4. Test your changes by [running your local version](#developing-locally)
5. Push your branch and open a Pull Request

## License

Code released under [the Apache 2.0 license](./LICENSE).

## Data Structures
Example data in the format expected by the component
