// @ts-nocheck
import axios from 'axios';

const apiCall = async(txDetails) => {
  const orderId = txDetails.orderId
  console.log("Algo", orderId);
  let itemizedListDetails = [];

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
      itemizedListDetails = mergedItems;
      console.log('itemizedListDetails', itemizedListDetails)

    } catch (err) {
      console.log(err);
    }
  }

  loadOrder(orderId);


  return itemizedListDetails;
}

export default apiCall;
