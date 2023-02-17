import React from "react";
import './investment.css';
import Table from "react-bootstrap/esm/Table";
export default class Investment extends React.Component{
    render(){
        return(<section>
            <div className="investment-container">
                <p>My Investment
                    
                </p>

                <Table striped>
                    <thead>
                        <tr>
                            <th>Campaign Id</th>
                            <th>Campaign name</th>
                            <th>Address</th>
                            <th>Ammount</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                            <tbody>
                                {this.props.data.map(d=>{
                                    return( d.fund.map(f=>{
                                        return(
                                            f._address === this.props.myAddress ? 
                                            <tr key={f._id}>    
                                                <td>{f._id}</td>
                                                <td>{d.data._campaignTitle}</td>
                                                <td>{d.data._address}</td>
                                                <td>Wei {f._fund} GoerliETH</td>
                                                <td>{f._date}</td>
                                            </tr> : <></>

                                        );
                                    })) 
                                    //   return(<tr>
                                    // <td>{d.fund._id}</td>
                                    // <td>{d['_id']}</td>
                                    // <td>{d['_address']}</td>
                                    // <td>{d['_fund']}</td>
                                    // <td>{d['_date']}</td>
                            //</tr>);
                        })}
                                    
                    </tbody>
                </Table>
            </div>
        </section>);
    }
}



