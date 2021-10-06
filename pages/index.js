/*---------------------------------INTRODUCTION--------------------------------------------------------
-index.js is the main web page
/files of components folder are imported here and used as tags
//code between the tags are stored as props.children and used in tag files
// when app runs, the code inside the tag files are executed in browser
//for navigating , you use the links provided in Router.add(<link>,<path of page to open>)
//value returned by getInitialProps will be stored in props as key-value pair, variable name as key and it's value as value
//Router.pushRoute('<path>')- go to this page as soon as code gets executed
//Message tag used to show error if it occurs
//routes.js is used to define routes which can be used by pages , routes.add('<link>','<page to show>')
//server.js is used to make react app use the routes defined in routes.js
//links defined in Router.add('<link>','<page to show>') is used by web pages to navigate to different web page
//To get the address mentioned in url of page -  props.query.address
//files inside pages folder gets converted into individual web pages based on the path -
 new.js and show.js inside campaigns folder will have a url - campaigns/new and /campaigns/show , index.js will have a path - /

//components folder contains the code common to each web page
//to get the address mentioned in route('campaign/address') - props.query.address
// to start the server - npm run dev

/*files in pages directory have url according to their structure in pages directory ,eg for show.js -> /campaigns/show.js ,index.js -> /, new.js -> /campaigns/new
index.js -> localhost:3000
show.js -> /campaigns/show
new.js -> /campaigns/new

index.js-> '/'

for request folder:
index.js -> /campaigns/requests/index
new.js _> /campaigns/requests/new

// if you get an exception in metamask it means the function you are calling has error or require statements are failing

*/
import React, {Component} from 'react';
import { Card, Button } from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';
import { Link } from '../routes';


class CampaignIndex extends Component {

    //gets executed whenever the component is rendered automatically
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();

        //campaigns variable gets stored in props object as property(key)
        return {campaigns};
    }

    renderCampaigns() {

        const items = this.props.campaigns.map(address => {

            // < link route = ...> tells navigates us to the specified link after clicking it
            return {
                header: address,
                description: (
                    <Link route = {`/campaigns/${address}`}>
                        <a>View Campaign</a>
                    </Link>
                ),
                fluid: true
            };
        });

        return <Card.Group items={items}/>
    }

    render() {

        return (
            <Layout>
                <div>

                    <h3>Open Campaigns</h3>

                    <Link route = "/campaigns/new">
                        <a>
                    <Button
                        floated="right"
                        content="Create Campaign"
                        icon="add circle"
                        primary={true}
                    />
                        </a>
                    </Link>
                    {this.renderCampaigns()}
                </div>
            </Layout>
        );
    }
}


export default CampaignIndex;

