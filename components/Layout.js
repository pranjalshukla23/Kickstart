import React from 'react';
import { Container } from "semantic-ui-react";
import Header from './Header';
import Head from 'next/head';

export default (props)=>{

    return(
        <Container>
            <Head>
            <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
            ></link>
            </Head>

            <Header/>
            {props.children}
        </Container>
    )
};

//props.children contains the content stored inside <Layout> tag
//<Header> contains the render () code of Header.js

//Layout.js code will be executed inside each component of pages directory
//files inside components folder will be imported in files of pages and will be used as tags
//code between the tags will be stored in props.children and will be used in tag files respectively
//Header file is imported in Layout.js and used as tag



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
