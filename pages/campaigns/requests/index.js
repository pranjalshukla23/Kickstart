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
import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/campaign';
import RequestRow from "../../../components/RequestRow";

class RequestIndex extends Component{

    static async getInitialProps(props){

        //get the address in url and store it in props object as key value pair
        const { address } = props.query;

        //get an instance of campaign contract from function
        const campaign = Campaign(address);

        const requestCount = await campaign.methods.getRequestsCount().call();

        const approversCount = await campaign.methods.approversCount().call();

        const requests = await Promise.all(

            Array(parseInt(requestCount))
                .fill()
                .map((element,index)=>{
                return campaign.methods.requests(index).call();

            })
        );

        return {address, requests, requestCount, approversCount };
    }

    renderRow(){

        return this.props.requests.map((request,index)=>{

            //storing data in props object to be used in RequestRow file
            //using components file as a tag for storing data between the tags in props object and then displaying the code of RequestRow file in web page
            return (
                <RequestRow
                key={index}
                id={index}
                request={request}
                address={this.props.address}
                approversCount ={this.props.approversCount}
                />
            );
        });
    }
    render() {

        const { Header, Row, HeaderCell, Body } = Table;

        return(
            <Layout>
                <h3>Requests</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary floated="right" style={{marginBottom:10}}>Add Request</Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell>Recipient</HeaderCell>
                        <HeaderCell>Approval Count</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                        <HeaderCell>Finalize</HeaderCell>
                    </Row>
                    </Header>
                    <Body>
                        {this.renderRow()}
                    </Body>
                </Table>
                <div>Found {this.props.requestCount} requests</div>
            </Layout>
        )
    }
}
export default RequestIndex;
