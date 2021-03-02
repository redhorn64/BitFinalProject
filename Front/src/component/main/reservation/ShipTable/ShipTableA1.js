import React, {Component} from "react";
import ShipNoticeA from "./ShipNoticeA";
import ShipFareTableA from "./ShipFareTableA";
import ShipIntro from "./ShipIntro";
import ShipFareAMobile from "./ShipFareAMobile";

class ShipTableA1 extends Component {
    constructor(props) {
        super(props);
        console.log("ShipPageComp constructor", props);
    }
    render() {
        return (
            <div className="ShipTable">
                <ShipIntro month={this.props.month} title="성산 ↔ 우도"/>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <td>회수</td>
                            <td>우도발</td>
                            <td>성산발</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>07:30</td>
                            <td>08:30</td>
                        </tr>                         
                        <tr>
                            <td>2</td>
                            <td>08:00</td>
                            <td>08:30</td>
                        </tr>                         
                        <tr>
                            <td>3</td>
                            <td>08:30</td>
                            <td>09:00</td>
                        </tr>                         
                        <tr>
                            <td>4</td>
                            <td>09:00</td>
                            <td>09:30</td>
                        </tr>                         
                        <tr>
                            <td>5</td>
                            <td>09:30</td>
                            <td>10:00</td>
                        </tr>                        
                        <tr>
                            <td>6</td>
                            <td>10:00</td>
                            <td>10:30</td>
                        </tr>                         
                        <tr>
                            <td>7</td>
                            <td>10:30</td>
                            <td>11:00</td>
                        </tr>                         
                        <tr>
                            <td>8</td>
                            <td>11:00</td>
                            <td>11:30</td>
                        </tr>                         
                        <tr>
                            <td>9</td>
                            <td>11:30</td>
                            <td>12:00</td>
                        </tr>                         
                        <tr>
                            <td>10</td>
                            <td>12:00</td>
                            <td>12:30</td>
                        </tr>                         
                        <tr>
                            <td>11</td>
                            <td>12:30</td>
                            <td>13:00</td>
                        </tr>                         
                        <tr>
                            <td>12</td>
                            <td>13:00</td>
                            <td>13:30</td>
                        </tr>                         
                        <tr>
                            <td>13</td>
                            <td>13:30</td>
                            <td>14:00</td>
                        </tr>                         
                        <tr>
                            <td>14</td>
                            <td>14:00</td>
                            <td>14:30</td>
                        </tr>                         
                        <tr>
                            <td>15</td>
                            <td>14:30</td>
                            <td>15:00</td>
                        </tr>                         
                        <tr>
                            <td>16</td>
                            <td>15:00</td>
                            <td>15:30</td>
                        </tr>                         
                        <tr>
                            <td>17</td>
                            <td>15:30</td>
                            <td>16:00</td>
                        </tr>                         
                        <tr>
                            <td>18</td>
                            <td>16:00</td>
                            <td>16:30</td>
                        </tr>                         
                        <tr>
                            <td>19</td>
                            <td>16:30</td>
                            <td>17:00</td>
                        </tr>                         
                        <tr>
                            <td>20</td>
                            <td>17:00</td>
                            <td>&nbsp;&nbsp;-</td>
                        </tr>                        
                    </tbody>
                </table>
                <br/>
                <ShipNoticeA/>
                <br/>
                {document.body.offsetWidth > 600?<ShipFareTableA/>:<ShipFareAMobile/>}
                
            </div>
        )
    }
}

export default ShipTableA1;