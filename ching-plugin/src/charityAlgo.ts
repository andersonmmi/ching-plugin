// @ts-nocheck
import axios from 'axios';

const charityAlgo = async(txDetails) => {
  const orderId = txDetails.orderId
  console.log("Algo", orderId);
  let charityArray = [];

  const loadItems = async(itemIds) => {
    let itemResponses = await Promise.all(itemIds.map(itemId =>
      axios.get("https://us-central1-daipos.cloudfunctions.net/itemDetails?itemId=" + itemId)
    ))
    console.log("itemResponses", itemResponses)
    const items = itemResponses.map(response => response.data.items)
    return items;
  }

  const loadOrder = async(orderId) => {
    let res;
    try {
      res = await axios.get("https://us-central1-daipos.cloudfunctions.net/orderDetails?orderId=" + orderId);
      const orderItems = res.data.items
      console.log("Orders",res)
      let itemIds = orderItems.map(item=>item.id);
      console.log("itemIds", itemIds)

      const items = await loadItems(itemIds)
      const mergedItems = orderItems.map((orderItem, index)=>({
        ...orderItem, ...items[index]
      }))
      mergedItems;
      console.log('mergedItems', mergedItems[0])

      mergedItems.forEach(e => {
        if (e.name === "Castro Limon") charityArray.push("CL")
        if (e.name === "Givethio") charityArray.push("GI")
        if (e.name === "GRACERefugeeAid") charityArray.push("GR")
        if (e.name === "Heifer") charityArray.push("HE")
      })
      console.log("charityArray", charityArray)

    } catch (err) {
      console.log(err);
    }
  }

  loadOrder(orderId);


  return charityArray
}

export default charityAlgo;
