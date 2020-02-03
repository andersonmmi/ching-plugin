// @ts-nocheck
import React, { Component} from 'react';
import Item from './Item';
import axios from 'axios';
import { getTxDetails } from './ChingPlugin';

const regex = /(http:\/\/localhost:3000\/)/gm;
const txDetails = getTxDetails(location.pathname);
const orderId: string = txDetails.orderId;

class ItemsList extends Component{
  state = {
    items: []
  }
  
  componentDidMount() {
    this.loadOrder(orderId);
  }

  renderItems = () => {
    try {
      if(!this.state.items) return "loading..."
      return  this.state.items.map((item, i) =>
          <Item key={i} qty={item.quantity} item={item.name} price={item.price}/>
      )

    } catch (err) {
      console.log(err)
    }
  }

  loadItems = async(itemIds) => {
    let itemResponses = await Promise.all(itemIds.map(itemId =>
      window.location.href.match(regex)
      ? axios.get("/itemDetails?itemId=" + itemId)
      : axios.get("https://us-central1-daipos.cloudfunctions.net/itemDetails?itemId=" + itemId)
    ))
    console.log("itemResponses", itemResponses)
    const items = itemResponses.map(response => response.data.items)
    return items;
  }

  loadOrder = async(orderId) => {
    let res;
    try {
      console.log("href", window.location.href)
      window.location.href.match(regex)
      ? res = await axios.get("/orderDetails?orderId=" + orderId)
      : res = await axios.get("https://us-central1-daipos.cloudfunctions.net/orderDetails?orderId=" + orderId);
      const orderItems = res.data.items
      console.log("Orders",res)
      let itemIds = orderItems.map(item=>item.id);
      console.log("itemIds", itemIds)

      const items = await this.loadItems(itemIds)
      const mergedItems = orderItems.map((orderItem, index)=>({
        ...orderItem, ...items[index]
      }))
      this.setState({
        items: mergedItems
      })

    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        <div className="list-group list-group-flush">
          {this.renderItems()}
        </div>
      </div>
    );
  }
}

export default ItemsList;
