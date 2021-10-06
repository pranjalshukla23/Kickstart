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
import { Form, Button, Message, Input } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";
import Layout from "../../../components/Layout";

class RequestNew extends Component {
    state = {
        value: "",
        description: "",
        recipient: "",
        loading: false,
        errorMessage:""
    };

    static async getInitialProps(props) {
        const { address } = props.query;

        return { address };
    }

    onSubmit = async (event) => {
        event.preventDefault();

        const campaign = Campaign(this.props.address);
        const { description, value, recipient } = this.state;

        //reset spiner and error
        this.setState({loading:true, errorMessage:''})
        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods
                .createRequest(description, web3.utils.toWei(value, "ether"), recipient)
                .send({ from: accounts[0] });

            //navigate to this page as soon as transaction is done
            Router.pushRoute(`/campaigns/${this.props.address}/requests`);
        } catch (err) {
            this.setState({errorMessage:err.message});
        }

        //reset the spiner
        this.setState({loading:false})
    };

    render() {
        return (
            <Layout>
                <Link route={`/campaigns/${this.props.address}/requests`}>
                    <a>
                        Back
                    </a>
                </Link>
                <h3>Create a Request</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Description</label>
                        <Input
                            value={this.state.description}
                            onChange={(event) =>
                                this.setState({ description: event.target.value })
                            }
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Value in Ether</label>
                        <Input
                            value={this.state.value}
                            onChange={(event) => this.setState({ value: event.target.value })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Recipient</label>
                        <Input
                            value={this.state.recipient}
                            onChange={(event) =>
                                this.setState({ recipient: event.target.value })
                            }
                        />
                    </Form.Field>

                    <Message error header ="Oops!" content={this.state.errorMessage}/>
                    <Button primary loading={this.state.loading}>Create!</Button>
                </Form>
            </Layout>
        );
    }
}

export default RequestNew;
