import Shopify, { DataType } from "@shopify/shopify-api";

const openingHoursMetafieldExists = async (host, token) => {
  const query = `
    {
      shop {
        metafields(first: 100) {
          edges {
            cursor
            node {
              id
              key
              namespace
              value
            }
          }
        }
      }
    }
  `;
  const client = new Shopify.Clients.Graphql(host, token);
  const result = await client.query({ data: query });
  const body = result.body;
  if (!body) return false;
  const metafields = body.data.shop.metafields.edges;
  if (metafields.length == 0) {
    return false;
  } else {
    console.log(metafields);
    let exists = false;
    metafields.forEach((element) => {
      if (element.node.namespace == "openinghours") {
        exists = true;
      }
    });
    return exists;
  }
};

const dataobject = {
  monday: "O-06:00-22:00",
  tuesday: "O-06:00-22:00",
  wednesday: "O-06:00-22:00",
  thursday: "O-10:00-18:00",
  friday: "O-10:00-22:00",
  saturday: "O-06:00-22:00",
  sunday: "C-06:00-22:00",
};

const createOpeningHoursMetafield = async (domain, token) => {
  try {
    const client = new Shopify.Clients.Rest(domain, token);
    const response = await client.post({
      path: "metafields",
      data: {
        metafield: {
          namespace: "openinghours",
          key: "currenthours",
          value: JSON.stringify(dataobject),
          type: "json",
        },
      },
      type: DataType.JSON,
    });
    if (response) {
      console.log("successfully created inital openinghours");
    }
  } catch (error) {
    console.log(error);
  }
};

const updateOpeningHoursMetafield = async (
  domain,
  token,
  metafieldId,
  dataobject
) => {
  try {
    const client = new Shopify.Clients.Rest(domain, token);
    const metafieldIdValue = metafieldId.split("/")[4];
    const response = await client.post({
      path: `metafields/${metafieldIdValue}`,
      data: {
        metafield: {
          id: metafieldId,
          value: JSON.stringify(dataobject),
          type: "json",
        },
      },
      type: DataType.JSON,
    });
    if (response) {
      console.log("successfully updated inital openinghours");
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  openingHoursMetafieldExists,
  createOpeningHoursMetafield,
  updateOpeningHoursMetafield,
};

// <script>console.log({{ shop.metafields.openinghours | json }});</script>
/*
{% assign openinghours = shop.metafields.openinghours.currenthours %}
<script>
  var date = new Date();
  var data = {{ openinghours | string}}
  var todayInt = date.getDay();
  var todayObj;
  switch(todayInt){
    case 1: todayObj = data.monday;
      break;
    case 2: todayObj = data.tuesday;
    break;
    case 3: todayObj = data.wednesday;
    break;
    case 4: todayObj = data.thursday;
    break;
    case 5: todayObj = data.friday;
    break;
    case 6: todayObj = data.saturday;
    break;
    case 0: todayObj = data.sunday;
    break;
  } 
  
  var splitarr = todayObj.split("-")
  var openClosed = splitarr[0]
  var fromData = splitarr[1].split(":")[0]
  var toData = splitarr[2].split(":")[0]
  
  if(openClosed=="O"){
  	alert("Shop is closed")
  }else{
  	var currentHour = date.getHours()
    console.log(currentHour)
    console.log(fromData)
    console.log(toData)

    if(currentHour >= fromData && currentHour < toData){
      
     console.log("open") 
    }else{
     console.log("closed")
    }
    
    
  }
  console.log(todayObj)
  console.log(data.saturday)
  console.log({{ openinghours | string }})
  
;</script>


*/