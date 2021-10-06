/*----------------------------INTRODUCTION---------------------------------------------------------------------------

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
//To get the address mentioned in url of page -  props.query.address
//components folder contains the code common to each web page
//to get the address mentioned in route('campaign/address') - props.query.address
// to start the server - npm run dev

//files in pages directory have url according to their structure in pages directory ,eg for show.js ->
/campaigns/show.js ,index.js -> /, new.js -> /campaigns/new

index.js -> localhost:3000
show.js -> /campaigns/show
new.js -> /campaigns/new

index.js-> '/'

for request folder:
index.js -> /campaigns/requests/index
new.js _> /campaigns/requests/new

// if you get an exception in metamask it means the function you are calling has error or require statements are failing

//Route.pushRoute('<link>') -- go to this link as soon as code gets executed

 */
import React, { Component} from 'react';
import Layout from '../../components/Layout';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from '../../routes';

class CampaignNew extends Component{

    state ={
        minimumContribution:'',
        errorMessage:'',
        loading: false
    };

    onSubmit=async (event)=>{

        //prevents default form submission
        event.preventDefault();

        this.setState({loading: true, errorMessage:''});

        try{
            const accounts = await web3.eth.getAccounts();

            await factory.methods
                .createCampaign(this.state.minimumContribution)
                .send({
                    from: accounts[0]
                });

            //go to homepage after transaction
            Router.pushRoute('/');

        }catch (err){

            this.setState({errorMessage: err.message});

        }

        this.setState({loading:false});
    };

    render() {

        return (
            <Layout>
                <h1>Create a Campaign</h1>

                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                       <Input
                           label="wei"
                           labelPosition="right"
                           value ={this.state.minimumContribution}
                           onChange={event=>this.setState({minimumContribution:event.target.value})}
                       />
                    </Form.Field>

                    <Message error header = "Oops!" content={this.state.errorMessage}/>
                    <Button loading={this.state.loading} primary>Create!</Button>
                </Form>
            </Layout>
        );

    }
}

export default CampaignNew;




