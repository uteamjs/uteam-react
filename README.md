[@uteamjs/react](https://u.team/document/uteam-react/overview) is a framework that lets developers create **React-Redux** applications easily.  Developers immediately produce quality applications without any steep learning curve.  Experienced developers can focus more on business logic rather than coding a bunch of boilerplate.  

Using [@uteamjs/react](https://u.team/document/uteam-react/overview), there are no additional boilerplate files generated.  The **Redux reducer** logic and React layout components can be easily put together in a **single JSX** file.  It minimizes the development and maintenance effort substantially.

# Installation
[uteam CLI](https://u.team/document/uteam-react/overview) helps you automate the creation, deletion and generation of application modules and packages.
```
$ npm install -g uteam
```
Use **uteam create** to generate React-Redux application based on [@uteamjs/react](https://u.team/document/uteam-react/overview) framework:
```
$ uteam create -a tutorial-react -p get-started -g

```
Change to __...packages/main__ folder, then start the webpack development server:
```
$ npm start
```
Open your browser with URL http://localhost:3000, then click the __Get Started__ link:

![Get Started](https://u.team/assets/img/kix.sznz2xcqhgjb.png)

Refer to [Get Started](https://u.team/document/introduction/getstart) for more details.

# @uteamjs Element
**@uteamjs \<Element>** is a special React Element created by [utCreateElement()](https://u.team/document/uteam-react/utCreateElement) function, which is the core of the framework.
## Reducer
```jsx
const reducer = utReducer('react-example/hello-world', {
   init: {
       fields: {
           name: {
               label: 'Please enter your name'
           },
         ...
       },
      
   },
   actions: {
       clear: (state, value) => state.fields.name.value = '',
       ...
   }
})
```
[Reducer](https://u.team/document/uteam-react/reducer) is an object which has:
- A unique identifier in the form of **\<Module>/\<Component>**.
- An **init** object for initializing the state variable
- **actions** to be dispatched by the [call() / api()](https://u.team/document/uteam-react/callapi) functions
## Layout
```jsx
const layout = ({ _, Field }) => <>
       <h4>Hello World (use hook)</h4>
       <Field id='name' />
       Your name is: {_.fields.name.value}
   </>
```
[Layout](https://u.team/document/uteam-react/layout) is the **@uteamjs** Component with different properties injected. A special **_** object refers to the state object inside the **Redux** store connected to this component.  Other variables include Form elements such as **Field, Section ...** and helper functions such [call() / api()](https://u.team/document/uteam-react/callapi).
## utCreateElement
```jsx
export default utCreateElement({ reducer, layout })
```
Finally, a standard **React JSX Element** is created using the [utCreateElement()](https://u.team/document/uteam-react/utCreateElement) function by passing the reducer and layout object to it.  

At the back, [@uteamjs/react](https://u.team/document/uteam-react/overview) helps to:
- Initialize the **Redux store** with the init object
- Create the action dispatcher
- Connect the [reducer](https://u.team/document/uteam-react/reducer) to [layout](https://u.team/document/uteam-react/layout) component automatically
- Inject state object, Form element and helper functions as properties in Layout component
- Fetching data with backend [RESTful Api](https://u.team/document/uteam-node/api)
- Setup the React-Router

# License
[MIT](LICENSE)

