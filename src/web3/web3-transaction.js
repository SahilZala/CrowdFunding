import Web3 from "web3";
export default class Web3Transaction{
    constructor(){   
        this.accounts = [];
        this.web3 = new Web3(Web3.givenProvider || 'ws://localhost:7545');    
    }

    async connect(){
        return await this.getRequestAccount();
    }

    async getRequestAccount() {
        return await this.web3.eth.requestAccounts();
    }

    async isConnected(){
        if((await this.web3.eth.requestAccounts()).length > 0)
            return true;
        else 
            return false;
    }
    async getNetworkId(){
        return await this.web3.eth.net.getId();
    }

    async initContract(){
        const networkId = await this.getNetworkId();
        const artifact = require("../contracts/CrowdFunding.json");
        const deployNetwork = artifact.networks[networkId];
        this.instance = new this.web3.eth.Contract(artifact.abi,deployNetwork && deployNetwork.address);
    }

    async createCampaign(name,label,title,story,goal,endDate,image){
        await this.initContract();
        var accounts = await this.getRequestAccount();
        var id = Math.floor(Math.random()*10000000);
        return await this.instance.methods.createCampaign(id,name,title,label,story,goal,endDate,image).send({
            from: accounts[0]
        });
    }

    async getCampaignList(){
        this.accounts = await this.getRequestAccount();
        
        var data = [];
        await this.initContract();
        var list = await this.instance.methods.getAddressList().call();
        
        for(var i = 0;i < list.length;i++){
            //if(list[i] !== this.accounts[0]){
                var value = await this.instance.methods.getCampaignList(list[i]).call();
                
                for(var j = 0;j<value.length;j++){
                    
                    var temp = {};
                    var val = await this.getBalanceAndDonarsLength(value[j]._id);
                    var fund = await this.getFundingList(value[j]._id);
                    temp.data = value[j];
                    temp.donations = val[0];
                    temp.totalDonar = val[1];
                    temp.fund = fund;
                    
                    data.push(temp);
              //  }
            }
        }
        return data;
    }

    async getCampaignListByAccount(){
        var accounts = await this.getRequestAccount();
        var data = [];
        await this.initContract();
        var list = await this.instance.methods.getAddressList().call();
        
        for(var i = 0;i < list.length;i++){
            if(list[i] === accounts[0])
            {
                var value = await this.instance.methods.getCampaignList(list[i]).call();
                
                for(var j = 0;j<value.length;j++){
                    
                    var temp = {};
                    var val = await this.getBalanceAndDonarsLength(value[j]._id);
                    
                    
                    temp.data = value[j];
                    temp.donations = val[0];
                    temp.totalDonar = val[1];

                    data.push(temp);
                }
                break;
            }
        }
        return data;
    }

    async getFundingList(cid){
        var val = await this.instance.methods.getFunding(cid).call();
        return val;
    }

    async getBalanceAndDonarsLength(id){
        var data = await this.instance.methods.getBalance(id).call();

        return data;
    }

    async donate(campId,address,ammount){
        await this.initContract();
        var accounts = await this.getRequestAccount();
        var id = Math.floor(Math.random()*10000000);
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        // This arrangement can be altered based on how we want the date's format to appear.
        let currentDate = `${day}-${month}-${year}`;

        return await this.instance.methods.donate(id,ammount,campId,address,currentDate).send({
            from: accounts[0],
            value: ammount
        });
    }
    async getAccount(){
        var account = await this.getRequestAccount();
        return account;
    }

    isMetamaskInstalled(){
        
        if(typeof window.ethereum !== 'undefined') {
            return true;
        }
        else{
            alert("Metamask is not installed");
            return false;
        }

    }
}