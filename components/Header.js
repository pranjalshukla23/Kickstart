import React from 'react';
import { Link } from '../routes';
import { Menu } from 'semantic-ui-react';

export default () =>{

    return (

        <Menu style={{ marginTop: '10px' }}>
           <Link route = "/">
               <a className="item">
                   CrowdCoin
               </a>
           </Link>

            <Menu.Menu position="right">
                <Link route = "/">
                    <a className="item">
                        Campaigns
                    </a>
                </Link>
                <Link route = "/campaigns/new">
                    <a className="item">
                       +
                    </a>
                </Link>
            </Menu.Menu>
        </Menu>
    )
}

// header tag will be used in layout.js


//files of components folder are imported here and used as tags
//code between the tags are stored as props.children and used in tag files
// when app runs, the code inside the tag files are executed in browser
//for navigating , you use the links provided in Router.add(<link>,<path of page to open>)
//value returned by getInitialProps will be stored in props as key-value pair, variable name as key and it's value as value
//Router.pushRoute('<path>')- go to this page as soon as code gets executed
//Message used to show error if it occurs
//router.js is used to define routes which can be used by pages , routes.add('<link>','<page to show>')
//server.js is used to make react app use the routes defined in routes.js
//links defined in Router.add('<link>','<page to show>') is used by web pages to navigate to different web page
/*files inside pages folder gets converted into individual web pages based on the path - new.js and show.js inside campaigns folder will have a url -
campaigns/new and /campaigns/show , index.js will have a path - /
 */
//components folder contains the code common to each web page
