const routes = require('next-routes')();

//routes.add('url','page to show')

routes
    .add('campaigns/new','/campaigns/new')
    .add('/campaigns/:address','/campaigns/show')
    .add('/campaigns/:address/requests','/campaigns/requests/index')
    .add('/campaigns/:address/requests/new','/campaigns/requests/new');




module.exports = routes;


//router.js is used to define routes which can be used by pages , routes.add('<link>','<page to show>')
//server.js is used to make react app use the routes defined in routes.js
//files of components folder are imported here and used as tags
//code between the tags are stored as props.children and used in tag files
// when app runs, the code inside the tag files are executed in browser
//for navigating , you use the links provided in Router.add(<link>,<path of page to open>)
//links defined in Router.add('<link>','<page to show>') is used by web pages to navigate to different web page
//value returned by getInitialProps will be stored in props as key-value pair, variable name as key and it's value as value
//Router.pushRoute('<path>')- go to this page as soon as code gets executed
//Message used to show error if it occurs
//router.js is used to define routes which can be used by pages , routes.add('<link>','<page to show>')
//server.js is used to make react app use the routes defined in routes.js
/*files inside pages folder gets converted into individual web pages based on the path - new.js and show.js inside campaigns folder will have a url -
campaigns/new and /campaigns/show , index.js will have a path - /
 */
//components folder contains the code common to each web page
