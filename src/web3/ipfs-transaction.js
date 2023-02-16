import { create } from "ipfs-http-client";

export default class IPFSTransaction{
    async init(){

        window.Buffer = window.Buffer || require("buffer").Buffer;
        const secretKey = "27283bbb0b0d545ebafb7897a22eb4e2";
        const projectId = "2LYCQNQXgHa9gv6juTAHxV3dZUo";
        const auth = 'Basic '+ window.Buffer.from(projectId+":"+secretKey).toString('base64');

        let ipfs = await create({
            host: "ipfs.infura.io",
            port: 5001, 
            protocol: "https",
            headers: {
                authorization: auth
            }
        });
        return ipfs;
    }

    async save(file){
        let ipfs = await this.init();
        //let result = await ipfs.add(file);
        return await ipfs.add(file);
        
    }
}