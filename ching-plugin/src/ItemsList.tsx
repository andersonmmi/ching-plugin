// @ts-nocheck
import React, { Component} from 'react';
import Item from './Item';
import axios from 'axios';
import ChingPlugin from './ChingPlugin';

const regex = /(http:\/\/localhost:3000\/)/gm;

class ItemsList extends Component{
  state = {
    items: []
  }

  async componentDidMount() {
    console.log("this props", this.props)
    const plugin = this.props.plugin as ChingPlugin;
    // console.log()
    const items = await plugin.getOrderDetails(this.props.orderId);
    this.setState({ items });
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
