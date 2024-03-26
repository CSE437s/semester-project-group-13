import DonationContext from "./Donations";
import FamilyContext from "./Families";
import GoodNeighborContext from "./GoodNeighbors";
import RefugeeContext from "./Refugees";
import VolunteerContext from "./Volunteers";

export const ContextProvider = (type) => {
  switch (type) {
    case "refugee":
      return RefugeeContext;
    case "family":
      return FamilyContext;
    case "donation":
      return DonationContext;
    case "goodNeighbor":
      return GoodNeighborContext;
    case "volunteer":
      return VolunteerContext;
    default:
      throw new Error(`Unsupported context type: ${type}`);
  }
};

export function getDisplayString(context, data) {
  let displayString = "";
  switch(context.type){
    case 'refugee':
      displayString = `${data.first_name} ${data.last_name}`
      break;
    case 'volunteer':
      displayString = `${data.first_name} ${data.last_name}`
      break;
    case 'family':
      if(data.head_of_household){
        displayString = `${data.head_of_household} ${data.last_name}`
      }
      break;
    case 'donation':
      displayString = `${data.item} ${data.quantity}`
      break;
    case 'goodNeighbor':
      //displayString = `${entry.first_name} ${entry.last_name}`
      break;
    default:
      console.log("Invalid Display String :", data);
  }
  return displayString
}

export function getAllContexts(){
  return {
    refugee: RefugeeContext,
    volunteer: VolunteerContext,
    family: FamilyContext,
    donation: DonationContext,
    goodNeighbor: GoodNeighborContext
  }
}



