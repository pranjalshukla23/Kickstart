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

import React, { Component } from "react";
import {Card, Grid, GridColumn, Button} from "semantic-ui-react";
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from "../../components/ContributeForm";
import { Link } from '../../routes'


class CampaignShow extends Component{

    static async getInitialProps(props){

        //to get the address mentioned in route('campaign/address') - props.query.address
        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getSummary().call();

        //object gets stored in props object as key-value pairs
        return {
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4],
            address: props.query.address
        };
    }

    renderCards(){

        //destructuring the props object
        const{
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount
        } = this.props;

        const items = [
            {
                header:manager,
                meta:'Address of Manager',
                description:'The manager created this campaign and can create request to withdraw money',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least this much wei to become an approver',
            },
            {
               header: requestsCount,
                meta: 'Number of Requests',
                description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers'
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description: 'Number of people who have already donated to the contract'
            },
            {
                header: web3.utils.fromWei(balance,'ether'),
                meta: 'Campaign Balance (ether)',
                description: 'The balance is how much money this campaign has left to spend'
            }
        ];

        return <Card.Group items = {items}/>
    }

    render() {

        return (
            <Layout>
            <h3>Campaign Show</h3>
                <Grid>
                    <Grid.Row>
                    <Grid.Column width={10}>
                        {this.renderCards()}

                    </Grid.Column>

                    <Grid.Column width={6}>
                        <ContributeForm address={this.props.address}/>
                    </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                        <Link route={`/campaigns/${this.props.address}/requests`}>
                            <a>
                                <Button primary>View Requests</Button>
                            </a>
                        </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        )
    }
}

export default CampaignShow;

